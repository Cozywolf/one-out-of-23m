#!/usr/bin/env python3
"""
修改 data/tw_*.json 後，執行 `python3 sync_data.py` 即可同步更新 data/tw_bundle.js（共 11 份資料庫），
讓直接雙擊 index.html（file:// 協議）也能載入最新修改的資料。
"""
import json
from pathlib import Path

BASE = Path(__file__).resolve().parent / "data"
FILES = {
    "regions": "tw_regions.json",
    "eras": "tw_eras.json",
    "lifetable": "tw_lifetable.json",
    "events": "tw_events_history.json",
    "decisions": "tw_decisions.json",
    "names": "tw_names.json",
    "educationCareers": "tw_education_careers.json",
    "cultureEras": "tw_culture_eras.json",
    "studyAbroad": "tw_study_abroad.json",
    "lifeStages": "tw_life_stages.json",
    "marketHistory": "tw_market_history.json",
}

bundle = {}
for key, fname in FILES.items():
    p = BASE / fname
    with p.open("r", encoding="utf-8") as f:
        bundle[key] = json.load(f)
    print(f"Loaded {fname}")

out = BASE / "tw_bundle.js"
with out.open("w", encoding="utf-8") as f:
    f.write("// Auto-generated from 11 data/tw_*.json files by sync_data.py\n")
    f.write("window.TW_DATA = ")
    json.dump(bundle, f, ensure_ascii=False, indent=2)
    f.write(";\n")

print(f"Updated {out} ({out.stat().st_size / 1024:.1f} KB)")
