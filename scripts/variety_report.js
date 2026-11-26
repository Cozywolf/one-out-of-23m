/**
 * 重玩多樣性檢測（scripts/variety_report.js）
 *
 *   node scripts/variety_report.js            # 預設規模（約 2–3 分鐘）
 *   node scripts/variety_report.js --quick    # 快速檢查
 *   node scripts/variety_report.js --seed=7
 *
 * 量三件事，任何一項超出門檻就以結束碼 1 結束：
 *   1. 各年代開局的體驗密度：每段人生遇到的抉擇、時代卡、歷史與未來事件數，以及成年後最長的「什麼都沒發生」空白期。
 *   2. 2026 年後的不可預測性：未來事件組合在不同人生之間的重疊度、最常見事件的出現率、未來卡選項的結果是否固定。
 *   3. 同起點的差異：同年、同地區出生的人生，職業、資產、壽命與抉擇路徑分散的程度。
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const QUICK = process.argv.includes("--quick");
const seedArg = process.argv.find((a) => a.startsWith("--seed="));
let seed = seedArg ? Number(seedArg.split("=")[1]) : 20261126;
Math.random = function rng() {
  seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const root = path.resolve(__dirname, "..");
const ctx = { console, Math, Date, JSON };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ["data/tw_bundle.js", "js/tw_engine.js"]) vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
const engine = new ctx.TaiwanLifeEngine(ctx.TW_DATA);

const N = QUICK ? 150 : 400;
const mean = (a) => a.reduce((x, y) => x + y, 0) / Math.max(1, a.length);
const pct = (a, p) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(s.length * p))]; };
const jaccard = (a, b) => { const u = new Set([...a, ...b]); if (!u.size) return 1; let i = 0; for (const x of a) if (b.has(x)) i++; return i / u.size; };
const meanPairJaccard = (sets, pairs = 3000) => {
  const v = [];
  for (let k = 0; k < pairs && sets.length > 1; k++) {
    const i = Math.floor(Math.random() * sets.length); let j = Math.floor(Math.random() * sets.length);
    if (i === j) j = (j + 1) % sets.length;
    v.push(jaccard(sets[i], sets[j]));
  }
  return mean(v);
};
const entropyNorm = (counts) => {
  const vals = Object.values(counts); const tot = vals.reduce((a, b) => a + b, 0);
  if (vals.length < 2) return 0;
  return -vals.reduce((h, c) => h + (c / tot) * Math.log(c / tot), 0) / Math.log(vals.length);
};

// 玩一段人生：policy "auto" = 引擎的時代加權選擇，"random" = 亂點
function play(opts, policy = "auto") {
  const l = engine.createLife(opts);
  const marks = {}; // age -> 有沒有值得一提的事
  const choices = [];
  let decisions = 0, parentDecisions = 0;
  while (l.alive && l.age < 105) {
    const before = l.feed.length;
    const res = engine.stepYear(l, { autoMode: false });
    const era = engine.getEraParams(l.currentYear);
    const fresh = l.feed.slice(0, l.feed.length - before);
    if (fresh.some((f) => ["historical_edu", "historical_protagonist", "future_forecast", "parent_decision", "overseas_event", "market_event"].includes(f.type) || f.highlight)) marks[l.age] = true;
    parentDecisions += fresh.filter((f) => f.type === "parent_decision").length;
    let d = res.pendingDecision;
    for (let g = 0; d && g < 4; g++) {
      marks[l.age] = true;
      decisions++;
      const elig = d.options.filter((o) => engine.isOptionEligible(l, o, era).eligible);
      const ch = policy === "random" ? (elig[Math.floor(Math.random() * elig.length)] || d.options[0]) : engine.chooseAutoOption(l, d, elig, era);
      choices.push(`${String(d.id).replace(/:.*/, "")}=${ch.key}`);
      engine.applyDecision(l, d, ch.key, era);
      d = engine.findFollowUpDecision(l, d, era);
    }
  }
  // 成年後最長空白期（18 歲到過世）
  let gap = 0, run = 0;
  for (let a = 18; a <= l.age; a++) { if (marks[a]) run = 0; else { run++; gap = Math.max(gap, run); } }
  const fw = (l.futureWorld && l.futureWorld.triggered) || {};
  return {
    l, decisions, parentDecisions, gap, choices,
    eraCards: (l.eraHistory || []).length,
    history: l.feed.filter((f) => f.type === "historical_edu").length,
    future: Object.keys(fw),
    echoes: l.feed.filter((f) => /時代的回聲/.test(f.text || "")).length
  };
}

const failures = [];
const check = (name, v, lo, hi) => { const ok = v >= lo && v <= hi; if (!ok) failures.push(`${name}：${v}（目標 ${lo}–${hi}）`); return { 項目: name, 數值: v, 目標: `${lo}–${hi}`, 結果: ok ? "通過" : "未通過" }; };

// ---------------------------------------------------------------- 1. 各年代開局
console.log("\n=== 1. 各年代開局的體驗密度（自動模式）===");
const rows1 = [];
const decadeStats = {};
for (const dec of [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]) {
  const runs = [];
  for (let i = 0; i < N; i++) runs.push(play({ birthYear: dec + Math.floor(Math.random() * (dec === 2020 ? 7 : 10)) }));
  const adults = runs.filter((r) => r.l.age >= 40);
  const s = {
    抉擇: +mean(runs.map((r) => r.decisions)).toFixed(1),
    時代卡: +mean(runs.map((r) => r.eraCards)).toFixed(1),
    歷史事件: +mean(runs.map((r) => r.history)).toFixed(1),
    未來事件: +mean(runs.map((r) => r.future.length)).toFixed(1),
    時代回聲: +mean(runs.map((r) => r.echoes)).toFixed(1),
    最長空白期中位: pct(adults.map((r) => r.gap), 0.5),
    "空白≥10年%": +(100 * adults.filter((r) => r.gap >= 10).length / Math.max(1, adults.length)).toFixed(0)
  };
  decadeStats[dec] = s;
  rows1.push({ 出生年代: `${dec}s`, ...s });
}
console.table(rows1);
for (const [dec, s] of Object.entries(decadeStats)) {
  check(`${dec}s 每段人生抉擇數`, s.抉擇, 24, 60);
  check(`${dec}s 時代卡（含父母代選）`, s.時代卡, 2.5, 12);
  check(`${dec}s 成年最長空白期中位（年）`, s.最長空白期中位, 0, 7);
  check(`${dec}s 空白期 ≥10 年的人生 %`, s["空白≥10年%"], 0, 20);
}

// ---------------------------------------------------------------- 2. 2026 年後的不可預測性
console.log("\n=== 2. 2026 年後的不可預測性（1995–2026 出生）===");
const futRuns = [];
for (let i = 0; i < N * 2; i++) futRuns.push(play({ birthYear: 1995 + Math.floor(Math.random() * 32) }));
const longLived = futRuns.filter((r) => r.l.currentYear >= 2070);
const futSets = longLived.map((r) => new Set(r.future));
const freq = {};
for (const s of futSets) for (const id of s) freq[id] = (freq[id] || 0) + 1;
const freqList = Object.entries(freq).map(([id, n]) => [id, +(100 * n / Math.max(1, futSets.length)).toFixed(0)]).sort((a, b) => b[1] - a[1]);
const futCardOpts = (ctx.TW_DATA.decisions.era_choices || []).filter((c) => c.tier === "future").flatMap((c) => c.options);
const fixedOpts = futCardOpts.filter((o) => !o.roll && !(o.outcomes || []).some((oc) => oc.roll || oc.p != null) && Object.keys(o.effects || {}).length > 0);
const pairSeq = (r) => new Set(r.choices.filter((c) => /^(F|FF)/.test(c)));
const rows2 = [
  check("活到 2070 後的人生數", longLived.length, 30, 1e9),
  check("每段人生經歷的未來事件數（平均）", +mean(futSets.map((s) => s.size)).toFixed(1), 6, 30),
  check("兩段人生的未來事件組合重疊度（Jaccard 平均）", +meanPairJaccard(futSets).toFixed(2), 0, 0.45),
  check("最常見未來事件的出現率 %", freqList.length ? freqList[0][1] : 0, 0, 80),
  check("未來事件種類（被觸發過的）", freqList.length, 30, 1e9),
  check("未來卡中結果固定（無擲骰）的選項 %", +(100 * fixedOpts.length / Math.max(1, futCardOpts.length)).toFixed(0), 0, 45)
];
console.table(rows2);
console.log("最常見的 5 個未來事件：", freqList.slice(0, 5).map(([id, p]) => `${id} ${p}%`).join("、"));
void pairSeq;

// ---------------------------------------------------------------- 3. 同起點的差異
console.log("\n=== 3. 同年、同地區出生的差異（每組 " + N + " 段人生）===");
const rows3 = [];
for (const [by, reg] of [[1960, "central"], [1985, "north_taipei"], [2005, "south_kaohsiung"]]) {
  const runs = [];
  for (let i = 0; i < N; i++) runs.push(play({ birthYear: by, regionMode: "manual", manualRegionId: reg }, i % 2 ? "random" : "auto"));
  const careers = {};
  for (const r of runs) if (r.l.careerId) careers[r.l.careerId] = (careers[r.l.careerId] || 0) + 1;
  const nwEnd = runs.filter((r) => r.l.age >= 60).map((r) => engine.getNetWorthNominal(r.l) / engine.getEraParams(r.l.currentYear).cpi / 1e4);
  const p10 = pct(nwEnd, 0.1), p90 = pct(nwEnd, 0.9);
  const paths = runs.map((r) => new Set(r.choices));
  const first30 = new Set(runs.map((r) => r.choices.slice(0, 12).join("|")));
  const tag = `${by}/${reg}`;
  rows3.push(
    check(`${tag} 出現過的職業種類`, Object.keys(careers).length, 8, 99),
    check(`${tag} 職業分布均勻度（0–1）`, +entropyNorm(careers).toFixed(2), 0.55, 1),
    check(`${tag} 60 歲後淨資產 P90／P10 倍數`, p10 > 0 ? +(p90 / p10).toFixed(1) : 99, 3, 999),
    check(`${tag} 壽命 P10–P90 差距（年）`, pct(runs.map((r) => r.l.age), 0.9) - pct(runs.map((r) => r.l.age), 0.1), 15, 99),
    check(`${tag} 兩段人生抉擇路徑重疊度（Jaccard）`, +meanPairJaccard(paths).toFixed(2), 0, 0.4),
    check(`${tag} 前 12 個抉擇完全相同的比例 %`, +(100 * (1 - first30.size / runs.length)).toFixed(0), 0, 5)
  );
}
console.table(rows3);

if (failures.length) {
  console.log(`\n未通過 ${failures.length} 項：`);
  for (const f of failures) console.log("- " + f);
  process.exit(1);
}
console.log("\n全部通過。");
