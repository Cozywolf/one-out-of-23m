#!/usr/bin/env python3
"""
遊戲事件 ⇄ Excel 審閱工具（scripts/events_excel.py）

  python scripts/events_excel.py export                 # 匯出 review/tw_events_review.xlsx
  python scripts/events_excel.py import                 # 把改過的 Excel 寫回 data/tw_*.json 並重建 tw_bundle.js
  python scripts/events_excel.py import --dry-run       # 只列出會改動的欄位，不寫檔
  python scripts/events_excel.py roundtrip              # 自我驗證：匯出 → 原樣匯回 → 資料必須一字不差

需要 openpyxl（pip install openpyxl）。

Excel 格式：
  • 每個分頁一種事件，每列一個事件（或一個選項／一個當事人結果）。
  • 第 1 列是欄位分類（識別／觸發條件／機率／影響／內容／其他），第 2 列是欄位路徑，匯入時以第 2 列為準。
  • `_位置` 指出這列對應 JSON 的哪個物件，請勿修改。新增一列時把 `_位置` 寫成清單路徑加 [+]，
    例如 `events[+]`、`decisions[3].options[+]`。
  • `_刪除` 填 Y 會刪除該物件。`_所屬` 只是參考用，匯入時忽略。
  • 儲存格留空 = 該欄位不存在（原本有就刪除）。空字串寫成 ""。
  • 清單或物件型的值以 JSON 文字呈現，例如 ["ALL"]、{"civic_minded": 2.8}。
  • 「引擎內建機率（唯讀）」分頁列出寫死在 js/tw_engine.js 的機率，只供參考，改了不會匯回。
"""
import argparse
import copy
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
DEFAULT_XLSX = ROOT / "review" / "tw_events_review.xlsx"

# 每個分頁：名稱、檔案、物件路徑（[*] 展開）、排除欄位（由子分頁處理）、說明
SHEETS = [
    dict(name="歷史事件", file="tw_events_history.json", items="events[*]",
         exclude=["protagonist_involvement.outcomes"],
         desc="1950–2026 台灣重大歷史事件。gameplay_impact 為全體影響；protagonist_involvement 為史實模式下主角捲入的機率。"),
    dict(name="歷史事件_當事人結果", file="tw_events_history.json",
         items="events[*].protagonist_involvement.outcomes[*]",
         desc="史實模式中主角捲入歷史事件後的各種結局；weight 為各結局的相對權重。"),
    dict(name="未來事件", file="tw_future_forecasts.json", items="events[*]",
         desc="2027 年後的虛構推演事件；probability 為該年代區間內發生的機率。"),
    dict(name="人生決策", file="tw_decisions.json", items="decisions[*]", exclude=["options"],
         desc="關鍵決策卡；conditions 為出現條件。選項在「人生決策_選項」分頁。"),
    dict(name="人生決策_選項", file="tw_decisions.json", items="decisions[*].options[*]",
         desc="每張決策卡的選項與 effects（影響）。"),
    dict(name="時代抉擇", file="tw_decisions.json", items="era_choices[*]", exclude=["options"],
         desc="時代抉擇卡：conditions 的 year_range 為年份區間，另可限定省籍、家境、地區、職業、學歷；chance 為符合條件時每年出現機率，trait_chance 依性格加乘。選項在「時代抉擇_選項」分頁。"),
    dict(name="時代抉擇_選項", file="tw_decisions.json", items="era_choices[*].options[*]",
         desc="時代抉擇卡的選項：effects 為立即影響、roll 為依屬性與性格擲骰的成敗、outcomes 為延後到指定年份才發生的後果；auto_weight 與 trait_weight 決定自動模式的選擇。"),
    dict(name="人生階段事件", file="tw_life_stages.json", items="stage_events[*]", exclude=["options"],
         desc="童年到退休的環境養成事件。選項在「人生階段事件_選項」分頁。"),
    dict(name="人生階段事件_選項", file="tw_life_stages.json", items="stage_events[*].options[*]",
         desc="人生階段事件的選項與 effects（影響）。"),
    dict(name="同儕插曲", file="tw_ambient_peers.json", items="vignettes[*]",
         desc="穿插在時間軸的同學、親友與鄰居微故事（純敘事）。"),
    dict(name="台灣習俗", file="tw_culture_eras.json", items="taiwan_customs[*]",
         desc="依年齡與身分觸發的台灣習俗事件。"),
    dict(name="時代日常", file="tw_culture_eras.json", items="era_atmospheres[*].daily_vignettes[*]",
         desc="各時代氛圍的日常切片（純敘事）。"),
    dict(name="教育時代插曲", file="tw_education_careers.json", items="education_eras[*].flavor_events[*]",
         desc="各教育時期的校園插曲（純敘事）。"),
    dict(name="留學國家事件", file="tw_study_abroad.json", items="countries[*].era_events[*]",
         desc="身在海外時依年代觸發的當地事件。"),
    dict(name="回流觸發", file="tw_study_abroad.json", items="return_triggers[*]",
         desc="海外生活中觸發返台念頭的事件（機率寫在引擎內，見唯讀分頁）。"),
    dict(name="回流決策_選項", file="tw_study_abroad.json", items="return_decision_template.options[*]",
         desc="D27 回台或留在海外抉擇的選項。"),
    dict(name="天災年度機率", file="tw_lifetable.json",
         items="epidemiology_and_hazard_stats.natural_hazard_annual_rolls",
         desc="颱風與強震的年度機率參數。"),
]

META_LOC, META_DEL, META_PARENT = "_位置", "_刪除", "_所屬"
ENGINE_SHEET = "引擎內建機率（唯讀）"
GUIDE_SHEET = "說明"

# ---------------------------------------------------------------- 路徑工具

TOKEN_RE = re.compile(r"\[(\d+|\*|\+)\]|\.?([^.\[\]]+)")


def parse_path(path):
    toks, pos = [], 0
    while pos < len(path):
        m = TOKEN_RE.match(path, pos)
        if not m or m.end() == pos:
            raise ValueError(f"無法解析路徑：{path}")
        if m.group(1) is not None:
            g = m.group(1)
            toks.append(int(g) if g.isdigit() else g)
        else:
            toks.append(m.group(2))
        pos = m.end()
    return toks


def fmt_path(toks):
    out = ""
    for t in toks:
        if isinstance(t, int) or t in ("*", "+"):
            out += f"[{t}]"
        else:
            out += ("." if out else "") + t
    return out


def get_at(obj, toks):
    for t in toks:
        obj = obj[t]
    return obj


def expand(obj, toks, prefix=()):
    """把含 [*] 的路徑展開成實際路徑。缺少的中間節點直接略過。"""
    if not toks:
        yield list(prefix)
        return
    t, rest = toks[0], toks[1:]
    if t == "*":
        if isinstance(obj, list):
            for i, v in enumerate(obj):
                yield from expand(v, rest, prefix + (i,))
    elif isinstance(t, int):
        if isinstance(obj, list) and t < len(obj):
            yield from expand(obj[t], rest, prefix + (t,))
    elif isinstance(obj, dict) and t in obj:
        yield from expand(obj[t], rest, prefix + (t,))


def parent_label(data, toks):
    """找出這個物件上一層的事件名稱（給 _所屬 欄參考用）。"""
    for cut in range(len(toks) - 1, 0, -1):
        node = get_at(data, toks[:cut])
        if isinstance(node, dict):
            for k in ("id", "label", "title", "name_zh"):
                if k in node:
                    extra = node.get("title") or node.get("label") or ""
                    return f"{node[k]}｜{extra}" if extra and extra != node[k] else str(node[k])
    return ""


# ---------------------------------------------------------------- 欄位分類

CONTENT_KEYS = {"title", "summary", "text", "desc", "label", "narrative", "institutional_aftermath",
                "historical_note", "cultural_footnote_en", "sources", "trend_basis", "era_labels",
                "era_labels_male", "era_titles", "impact_note", "relation", "disaster_name",
                "label_context", "career_labels", "self_employed_variant", "era_variants", "name"}
TRIGGER_KEYS = {"year", "year_end", "year_range", "year_start", "regions", "impact_regions", "age_range",
                "stage", "condition_type", "trigger_years", "mutually_exclusive_group",
                "once_per_era_variant", "disaster_year", "career_in", "career_not_in", "years",
                "exp_tags", "pi_track", "deprecated_by", "transit_year_by_region", "category",
                "sensitive"}
ID_KEYS = {"id", "key", "variant_id"}
CATEGORIES = ["識別", "觸發條件", "機率", "影響", "內容", "其他"]
CAT_COLORS = {"識別": "D9D9D9", "觸發條件": "DDEBF7", "機率": "FFF2CC", "影響": "E2EFDA",
              "內容": "FCE4D6", "其他": "EDEDED", "_": "BFBFBF"}


def categorize(col):
    toks = col.split(".")
    top, leaf = toks[0], toks[-1]
    if col in ID_KEYS:
        return "識別"
    if any("prob" in t for t in toks) or leaf in ("probability", "weight", "chance", "trait_mult") or leaf.endswith("_chance"):
        return "機率"
    if top in ("conditions",) or leaf in TRIGGER_KEYS or leaf.startswith(("requires_", "min_", "max_")):
        return "觸發條件"
    if leaf in CONTENT_KEYS:
        return "內容"
    if top in ("gameplay_impact", "effects") or leaf.endswith(("_delta", "_mult", "_boost")) \
            or leaf in ("flag_set", "sets_world_flags", "severity", "job_lost", "money_mult"):
        return "影響"
    return "其他"


# ---------------------------------------------------------------- 值編碼

def encode(v):
    if v is None:
        return "null"
    if isinstance(v, str):
        return '""' if v == "" else v
    if isinstance(v, (bool, int, float)):
        return v
    return json.dumps(v, ensure_ascii=False)


def same(a, b):
    """嚴格比較（bool 與數字不混用；數值相等的 int/float 視為相同）。"""
    if isinstance(a, bool) or isinstance(b, bool):
        return type(a) is type(b) and a == b
    if isinstance(a, (int, float)) and isinstance(b, (int, float)):
        return a == b
    return json.dumps(a, ensure_ascii=False) == json.dumps(b, ensure_ascii=False)


MISSING = object()


class CellError(Exception):
    pass


def decode(cell, old):
    """把儲存格還原成 JSON 值；回傳 MISSING 表示該欄位應不存在。"""
    if cell is None or (isinstance(cell, str) and cell.strip() == ""):
        return MISSING
    if isinstance(cell, bool):
        val = cell
    elif isinstance(cell, (int, float)):
        val = cell
        if isinstance(cell, float) and cell.is_integer() and not isinstance(old, float):
            val = int(cell)
    elif isinstance(cell, str):
        if cell == '""':
            val = ""
        elif isinstance(old, str):
            val = cell
        else:
            try:
                val = json.loads(cell)
            except ValueError:
                if old is not MISSING and isinstance(old, (list, dict, int, float)) and not isinstance(old, bool):
                    raise CellError(f"不是合法的 JSON／數字：{cell[:60]}")
                val = cell
    else:  # 日期等 Excel 自動轉型
        raise CellError(f"不支援的儲存格型別 {type(cell).__name__}：{cell}（請改成文字）")
    if old is not MISSING and same(val, old):
        return old
    return val


# ---------------------------------------------------------------- 匯出

def load_all():
    files = sorted({s["file"] for s in SHEETS})
    return {f: json.loads((DATA / f).read_text(encoding="utf-8")) for f in files}


def sheet_rows(spec, data):
    """回傳 (columns, rows, flatten_keys)。rows 為 dict：欄位 → 儲存格值。"""
    exclude = set(spec.get("exclude", []))
    pattern = parse_path(spec["items"])
    paths = list(expand(data, pattern))
    objs = [get_at(data, p) for p in paths]
    # 只有「每次出現都是 dict」的 key 才展開成子欄位（空 dict 匯入時原樣保留）
    flatten = {}
    for o in objs:
        for k, v in o.items():
            flatten[k] = flatten.get(k, True) and isinstance(v, dict)
    cols, rows = [], []

    def add_col(c):
        if c not in cols:
            cols.append(c)

    for p, o in zip(paths, objs):
        row = {META_LOC: fmt_path(p)}
        for k, v in o.items():
            if k in exclude:
                continue
            if flatten.get(k):
                for k2, v2 in v.items():
                    c = f"{k}.{k2}"
                    if c in exclude:
                        continue
                    add_col(c)
                    row[c] = encode(v2)
            else:
                add_col(k)
                row[k] = encode(v)
        row[META_PARENT] = parent_label(data, p)
        rows.append(row)

    has_parent = any(r[META_PARENT] for r in rows) and len(pattern) > 2
    order = {c: i for i, c in enumerate(CATEGORIES)}
    prio = {"id": 0, "key": 0, "variant_id": 0, "title": 1, "label": 1, "name": 1, "text": 2}
    first = {c: i for i, c in enumerate(cols)}
    cols.sort(key=lambda c: (order[categorize(c)], prio.get(c, 9), first[c]))
    meta = [META_LOC, META_DEL] + ([META_PARENT] if has_parent else [])
    return meta + cols, rows


def engine_rolls():
    src = (ROOT / "js" / "tw_engine.js").read_text(encoding="utf-8").splitlines()
    fn_re = re.compile(r"^\s{4}(?:static\s+)?(?:async\s+)?([A-Za-z_]\w*)\s*\([^)]*\)\s*\{\s*$")
    out, fn = [], ""
    for i, line in enumerate(src, 1):
        m = fn_re.match(line)
        if m and m.group(1) not in ("if", "for", "while", "switch", "catch"):
            fn = m.group(1)
        if re.search(r"Math\.random\(\)\s*[<>]", line):
            out.append((i, fn, line.strip()[:400]))
    return out


def export(xlsx_path):
    from openpyxl import Workbook
    from openpyxl.styles import Alignment, Font, PatternFill
    from openpyxl.utils import get_column_letter

    data = load_all()
    wb = Workbook()
    guide = wb.active
    guide.title = GUIDE_SHEET
    summary = []
    wrap = Alignment(wrap_text=True, vertical="top")
    top = Alignment(vertical="top")

    for spec in SHEETS:
        cols, rows = sheet_rows(spec, data[spec["file"]])
        ws = wb.create_sheet(spec["name"])
        summary.append((spec["name"], spec["file"], len(rows), spec["desc"]))
        for j, c in enumerate(cols, 1):
            cat = "_" if c.startswith("_") else categorize(c)
            fill = PatternFill("solid", fgColor=CAT_COLORS[cat])
            h1 = ws.cell(row=1, column=j, value="參考" if c == META_PARENT else ("控制" if cat == "_" else cat))
            h2 = ws.cell(row=2, column=j, value=c)
            for h in (h1, h2):
                h.fill = fill
                h.font = Font(bold=True)
                h.alignment = top
        for i, r in enumerate(rows, 3):
            for j, c in enumerate(cols, 1):
                v = r.get(c)
                if v is None:
                    continue
                cell = ws.cell(row=i, column=j, value=v)
                if isinstance(v, str):
                    cell.data_type = "s"  # 避免以 = 開頭的文字被當成公式
                    cell.alignment = wrap if len(v) > 30 else top
                else:
                    cell.alignment = top
        for j, c in enumerate(cols, 1):
            longest = max([len(str(r.get(c, ""))) for r in rows] + [len(c)])
            ws.column_dimensions[get_column_letter(j)].width = max(8, min(50, longest * 1.6 + 2))
        freeze = 4 if cols[2] == META_PARENT else 3
        ws.freeze_panes = ws.cell(row=3, column=freeze + 1 if len(cols) > freeze else freeze)
        ws.auto_filter.ref = f"A2:{get_column_letter(len(cols))}{len(rows) + 2}"

    # 唯讀：引擎內建機率
    ws = wb.create_sheet(ENGINE_SHEET)
    ws.append(["行號", "所在函式", "程式碼（js/tw_engine.js，僅供參考，修改不會匯回）"])
    for c in ws[1]:
        c.font = Font(bold=True)
        c.fill = PatternFill("solid", fgColor=CAT_COLORS["_"])
    rolls = engine_rolls()
    for ln, fn, code in rolls:
        ws.append([ln, fn, code])
    ws.column_dimensions["A"].width = 8
    ws.column_dimensions["B"].width = 28
    ws.column_dimensions["C"].width = 140
    ws.freeze_panes = "A2"

    # 說明分頁
    lines = [
        ["遊戲事件審閱表（由 scripts/events_excel.py 產生）"],
        [],
        ["怎麼改"],
        ["1. 直接修改儲存格。第 1 列是分類，第 2 列是欄位路徑（匯入以第 2 列為準，請勿改動前兩列）。"],
        ["2. 留空代表該欄位不存在；空字串請寫 \"\"；清單／物件以 JSON 文字表示，例如 [\"ALL\"]。"],
        ["3. 新增事件：在分頁底部加一列，_位置 寫清單路徑加 [+]（如 events[+]、decisions[3].options[+]）。"],
        ["4. 刪除事件：在 _刪除 欄填 Y。不要直接刪掉整列（直接刪列只會被警告、不會刪資料）。"],
        ["5. 改完存檔後執行：python scripts/events_excel.py import --dry-run 先看會改哪些欄位，"
         "確認後再執行 python scripts/events_excel.py import（會自動重建 data/tw_bundle.js）。"],
        ["6. 「" + ENGINE_SHEET + "」列出寫死在引擎裡的機率，只供參考；要改請直接改程式。"],
        [],
        ["分類顏色", "", "說明"],
        ["識別", "", "id／key，用來辨識事件或選項"],
        ["觸發條件", "", "年份、年齡、地區、身分等出現條件"],
        ["機率", "", "發生機率、權重與機率倍率"],
        ["影響", "", "gameplay_impact／effects 等對角色數值的影響"],
        ["內容", "", "標題、敘述與出處等文字"],
        ["其他", "", "其餘參數"],
        [],
        ["分頁", "資料檔", "筆數", "內容"],
    ] + [[n, "data/" + f, c, d] for n, f, c, d in summary] + [
        [ENGINE_SHEET, "js/tw_engine.js", len(rolls), "引擎內寫死的 Math.random() 判定（唯讀）"],
    ]
    for row in lines:
        guide.append(row)
    guide["A1"].font = Font(bold=True, size=14)
    for r in (3, 11, 19):
        for c in guide[r]:
            c.font = Font(bold=True)
    for i, cat in enumerate(CATEGORIES, 12):
        guide.cell(row=i, column=1).fill = PatternFill("solid", fgColor=CAT_COLORS[cat])
    guide.column_dimensions["A"].width = 24
    guide.column_dimensions["B"].width = 30
    guide.column_dimensions["C"].width = 8
    guide.column_dimensions["D"].width = 90

    xlsx_path.parent.mkdir(parents=True, exist_ok=True)
    wb.save(xlsx_path)
    total = sum(s[2] for s in summary)
    print(f"已匯出 {total} 筆到 {xlsx_path}（{len(SHEETS)} 個可編輯分頁＋{len(rolls)} 條引擎內建機率）")


# ---------------------------------------------------------------- 匯入

def set_or_delete(obj, col, val, created_dicts):
    keys = col.split(".")
    if val is MISSING:
        node = obj
        for k in keys[:-1]:
            if not isinstance(node, dict) or k not in node:
                return
            node = node[k]
        if isinstance(node, dict) and keys[-1] in node:
            del node[keys[-1]]
        return
    node = obj
    for k in keys[:-1]:
        if k not in node:
            node[k] = {}
            created_dicts.add(id(node[k]))
        node = node[k]
        if not isinstance(node, dict):
            raise CellError(f"{col}：上層欄位 {k} 不是物件")
    node[keys[-1]] = val


def get_col(obj, col):
    node = obj
    for k in col.split("."):
        if not isinstance(node, dict) or k not in node:
            return MISSING
        node = node[k]
    return node


def apply_workbook(xlsx_path, data):
    """把 Excel 套用到 data（就地修改）。回傳 (變更清單, 警告清單)。"""
    from openpyxl import load_workbook

    wb = load_workbook(xlsx_path, data_only=True)
    changes, warnings, errors = [], [], []
    deletions = []  # (file, list_path_tokens, index, label)

    for spec in SHEETS:
        if spec["name"] not in wb.sheetnames:
            warnings.append(f"找不到分頁「{spec['name']}」，略過")
            continue
        ws = wb[spec["name"]]
        fdata = data[spec["file"]]
        header = [c.value for c in ws[2]]
        while header and header[-1] is None:
            header.pop()
        if META_LOC not in header:
            errors.append(f"[{spec['name']}] 第 2 列找不到 {META_LOC} 欄")
            continue
        exported = {fmt_path(p) for p in expand(fdata, parse_path(spec["items"]))}
        seen = set()
        for r_idx, row in enumerate(ws.iter_rows(min_row=3, max_col=len(header), values_only=True), 3):
            cells = dict(zip(header, row))
            if all(v is None or (isinstance(v, str) and not v.strip()) for k, v in cells.items() if k != META_PARENT):
                continue
            where = f"[{spec['name']}] 第 {r_idx} 列"
            loc = cells.get(META_LOC)
            if not isinstance(loc, str) or not loc.strip():
                errors.append(f"{where}：{META_LOC} 是空的")
                continue
            loc = loc.strip()
            try:
                toks = parse_path(loc)
            except ValueError as e:
                errors.append(f"{where}：{e}")
                continue
            is_new = toks[-1] == "+"
            if not is_new and loc not in exported:
                errors.append(f"{where}：{META_LOC}={loc} 不屬於這個分頁（新增請用 [+]）")
                continue
            if loc in seen and not is_new:
                errors.append(f"{where}：{META_LOC}={loc} 重複出現")
                continue
            seen.add(loc)
            flag = cells.get(META_DEL)
            if flag is not None and str(flag).strip().upper() in ("Y", "YES", "1", "TRUE", "刪除", "是"):
                if is_new:
                    continue
                deletions.append((spec["file"], toks[:-1], toks[-1], f"{spec['name']} {loc}"))
                continue
            if is_new:
                try:
                    lst = get_at(fdata, toks[:-1])
                except (KeyError, IndexError, TypeError):
                    errors.append(f"{where}：找不到清單 {fmt_path(toks[:-1])}")
                    continue
                if not isinstance(lst, list):
                    errors.append(f"{where}：{fmt_path(toks[:-1])} 不是清單")
                    continue
                obj = {}
            else:
                obj = get_at(fdata, toks)
            before = copy.deepcopy(obj)
            created = set()
            ok = True
            for col, cell in cells.items():
                if col is None or col.startswith("_"):
                    continue
                old = get_col(obj, col)
                try:
                    val = decode(cell, old)
                    set_or_delete(obj, col, val, created)
                except CellError as e:
                    errors.append(f"{where} 欄 {col}：{e}")
                    ok = False
            if not ok:
                continue
            if is_new:
                if not obj:
                    continue
                lst.append(obj)
                new_loc = fmt_path(toks[:-1] + [len(lst) - 1])
                changes.append(f"新增 {spec['name']} {new_loc}：{obj.get('id') or obj.get('key') or obj.get('title') or ''}")
            else:
                for col in [c for c in header if c and not c.startswith("_")]:
                    a, b = get_col(before, col), get_col(obj, col)
                    if (a is MISSING) != (b is MISSING) or (a is not MISSING and not same(a, b)):
                        fa = "（無）" if a is MISSING else json.dumps(a, ensure_ascii=False)
                        fb = "（刪除）" if b is MISSING else json.dumps(b, ensure_ascii=False)
                        changes.append(f"修改 {spec['name']} {loc} {col}：{fa[:80]} → {fb[:80]}")
        for loc in sorted(exported - seen):
            warnings.append(f"[{spec['name']}] Excel 裡少了 {loc}（若要刪除請填 {META_DEL}=Y；本次保留原資料）")

    # 刪除最後做，同一清單由後往前刪，避免索引位移
    deletions.sort(key=lambda d: (d[0], fmt_path(d[1]), -d[2]))
    for f, list_toks, idx, label in deletions:
        lst = get_at(data[f], list_toks)
        item = lst.pop(idx)
        changes.append(f"刪除 {label}：{item.get('id') or item.get('key') or item.get('title') or ''}")
    return changes, warnings, errors


def dump(obj):
    return json.dumps(obj, ensure_ascii=False, indent=2)


def do_import(xlsx_path, dry_run):
    originals = load_all()
    data = copy.deepcopy(originals)
    changes, warnings, errors = apply_workbook(xlsx_path, data)
    for w in warnings:
        print("⚠", w)
    if errors:
        for e in errors:
            print("✗", e)
        print(f"有 {len(errors)} 個錯誤，未寫入任何檔案。")
        return 1
    changed_files = [f for f in data if dump(data[f]) != dump(originals[f])]
    for c in changes:
        print("•", c)
    if not changed_files:
        print("沒有任何變更，資料檔維持原樣。")
        return 0
    if dry_run:
        print(f"（試跑）會改動：{', '.join(changed_files)}")
        return 0
    for f in changed_files:
        (DATA / f).write_text(dump(data[f]), encoding="utf-8")
        print(f"已寫入 data/{f}")
    subprocess.run([sys.executable, str(ROOT / "sync_data.py")], check=True)
    print("建議接著執行 node scripts/calibrate_cohorts.js --quick 確認數值仍合理。")
    return 0


def roundtrip(xlsx_path):
    originals = load_all()
    raw = {f: (DATA / f).read_bytes() for f in originals}
    export(xlsx_path)
    data = copy.deepcopy(originals)
    changes, warnings, errors = apply_workbook(xlsx_path, data)
    problems = errors + warnings + changes
    for f in data:
        if dump(data[f]) != dump(originals[f]):
            problems.append(f"{f} 的內容有差異")
        if (DATA / f).read_bytes() != raw[f]:
            problems.append(f"{f} 檔案被改動了")
    if problems:
        for p in problems:
            print("✗", p)
        print("往返驗證失敗")
        return 1
    print(f"往返驗證通過：{len(data)} 個資料檔原樣匯回，零差異。")
    return 0


def main():
    ap = argparse.ArgumentParser(description="遊戲事件 ⇄ Excel 審閱工具")
    ap.add_argument("command", choices=["export", "import", "roundtrip"])
    ap.add_argument("xlsx", nargs="?", default=str(DEFAULT_XLSX), help="Excel 路徑（預設 review/tw_events_review.xlsx）")
    ap.add_argument("--dry-run", action="store_true", help="匯入時只列出變更，不寫檔")
    args = ap.parse_args()
    try:
        import openpyxl  # noqa: F401
    except ImportError:
        print("需要 openpyxl：pip install openpyxl")
        return 1
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    path = Path(args.xlsx)
    if args.command == "export":
        export(path)
        return 0
    if args.command == "import":
        return do_import(path, args.dry_run)
    return roundtrip(path)


if __name__ == "__main__":
    sys.exit(main())
