/**
 * 內容稽核（scripts/audit_content.js）
 *
 *   node scripts/audit_content.js              # 靜態檢查＋20,000 段人生蒙地卡羅
 *   node scripts/audit_content.js --lives=5000 # 指定人生數
 *   node scripts/audit_content.js --static     # 只做靜態檢查
 *
 * 一、靜態檢查：資料檔的空白欄位、重複 id、效果與條件參數是否被引擎讀取、跨檔引用（職業、地區、事件、記憶標籤）是否存在、
 *     引擎裡沒被呼叫的方法。
 * 二、蒙地卡羅：混合自動與亂選、教學版、史實模式、顯示全部歷史事件，記錄每張抉擇卡、每個選項、每個歷史／未來事件、
 *     周圍的人與事、習俗、海外事件、延後後果、疾病事故與死因是否真的出現過。
 * 有任何「錯誤」級問題時以結束碼 1 結束；「從未觸發」列為警告，供人工判斷是否為設計上的稀有內容。
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split("=")[1] : d; };
const LIVES = Number(arg("lives", 20000));
const STATIC_ONLY = process.argv.includes("--static");
let seed = Number(arg("seed", 20261126));
Math.random = function rng() {
  seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const root = path.resolve(__dirname, "..");
const engineSrc = fs.readFileSync(path.join(root, "js/tw_engine.js"), "utf8");
const uiSrc = fs.readFileSync(path.join(root, "js/tw_ui.js"), "utf8");
const ctx = { console, Math, Date, JSON };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ["data/tw_bundle.js", "js/tw_engine.js"]) vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
const D = ctx.TW_DATA;
const engine = new ctx.TaiwanLifeEngine(D);

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// ==================================================================== 一、靜態檢查
// 1. 空白欄位
const ALLOW_EMPTY = new Set(["exp_tags", "preferred_majors", "margin_call_threshold", "sets_world_flags", "note", "regions_note", "historical_note", "source_note", "flags", "unset_flags", "effects", "outcomes", "notes"]);
function walkEmpty(obj, where) {
  if (Array.isArray(obj)) { obj.forEach((v, i) => walkEmpty(v, `${where}[${i}]`)); return; }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      const w = `${where}.${k}`;
      if ((v === "" || v === null || (Array.isArray(v) && v.length === 0)) && !ALLOW_EMPTY.has(k)) err(`空白欄位：${w}`);
      else walkEmpty(v, w);
    }
  }
}
for (const [k, v] of Object.entries(D)) walkEmpty(v, k);

// 2. 重複 id
function collectIds(list, label) {
  const seen = {};
  for (const x of list || []) { if (!x || !x.id) continue; if (seen[x.id]) err(`重複 id（${label}）：${x.id}`); seen[x.id] = true; }
  return new Set(Object.keys(seen));
}
const decisionIds = collectIds(D.decisions.decisions, "抉擇卡");
const eraIds = collectIds(D.decisions.era_choices, "時代卡");
const histIds = collectIds(D.events.events, "歷史事件");
const futIds = collectIds(D.futureForecasts.events, "未來事件");
const lsIds = collectIds(D.lifeStages.stage_events, "人生階段");
const vigIds = collectIds(D.ambientPeers.vignettes, "周圍的人與事");
const customIds = collectIds(D.cultureEras.taiwan_customs, "習俗");
const careerIds = collectIds(D.educationCareers.careers, "職業");
const regionIds = collectIds(D.regions.regions, "地區");
for (const id of eraIds) if (decisionIds.has(id) || lsIds.has(id)) err(`時代卡與其他卡 id 重複：${id}`);

// 3. 效果參數是否被引擎讀取
const handled = (key, prefixes) => prefixes.some((p) => engineSrc.includes(`${p}${key}`)) || engineSrc.includes(`"${key}"`) || engineSrc.includes(`'${key}'`);
const optionLists = [
  ["抉擇卡", D.decisions.decisions.flatMap((d) => d.options.map((o) => [d.id, o]))],
  ["人生階段", D.lifeStages.stage_events.flatMap((d) => (d.options || []).map((o) => [d.id, o]))],
  ["返台抉擇", (D.studyAbroad.return_decision_template.options || []).map((o) => ["D27", o])]
];
const efKeys = {};
for (const [label, list] of optionLists) for (const [id, o] of list) for (const k of Object.keys(o.effects || {})) (efKeys[k] = efKeys[k] || []).push(`${label}:${id}/${o.key}`);
for (const [k, where] of Object.entries(efKeys)) if (!handled(k, ["ef.", "effects."])) err(`效果參數沒有被引擎讀取：${k}（${where.slice(0, 3).join("、")}）`);
// 時代卡效果（含擲骰分支與延後後果）
const eraEfKeys = {};
const pushEra = (ef, w) => { for (const k of Object.keys(ef || {})) (eraEfKeys[k] = eraEfKeys[k] || []).push(w); };
for (const c of D.decisions.era_choices) for (const o of c.options) {
  pushEra(o.effects, `${c.id}/${o.key}`);
  if (o.roll) { pushEra(o.roll.success && o.roll.success.effects, `${c.id}/${o.key}`); pushEra(o.roll.fail && o.roll.fail.effects, `${c.id}/${o.key}`); }
  for (const oc of o.outcomes || []) {
    pushEra(oc.success && oc.success.effects, `${c.id}/${o.key}`); pushEra(oc.fail && oc.fail.effects, `${c.id}/${o.key}`);
    if (oc.roll) { pushEra(oc.roll.success && oc.roll.success.effects, `${c.id}/${o.key}`); pushEra(oc.roll.fail && oc.roll.fail.effects, `${c.id}/${o.key}`); }
  }
}
const eraHandled = engineSrc.slice(engineSrc.indexOf("applyEraEffects(life, ef, era) {"), engineSrc.indexOf("applyEraChoice(life, decision"));
for (const [k, where] of Object.entries(eraEfKeys)) if (!eraHandled.includes(`ef.${k}`) && !["health", "happiness", "knowledge", "social"].includes(k)) err(`時代卡效果沒有被處理：${k}（${where.slice(0, 3).join("、")}）`);
// 選項的 requires_* 欄位
const optReq = new Set();
for (const [, list] of optionLists) for (const [, o] of list) for (const k of Object.keys(o)) if (k.startsWith("requires")) optReq.add(k);
for (const c of D.decisions.era_choices) for (const o of c.options) for (const k of Object.keys(o)) if (k.startsWith("requires")) optReq.add(k);
for (const k of optReq) if (!engineSrc.includes(`opt.${k}`)) err(`選項條件沒有被檢查：${k}`);
// 條件欄位
const condKeys = (list, label, srcFrag) => {
  const ks = new Set(); for (const x of list) for (const k of Object.keys(x.conditions || {})) ks.add(k);
  for (const k of ks) if (!srcFrag.includes(`c.${k}`)) err(`${label} 條件沒有被檢查：${k}`);
};
const between = (a, b) => engineSrc.slice(engineSrc.indexOf(a), engineSrc.indexOf(b, engineSrc.indexOf(a)));
condKeys(D.decisions.decisions, "抉擇卡", between("findEligibleDecision(life, era, eduMode", "findFollowUpDecision(life, prevDecision"));
condKeys(D.decisions.era_choices, "時代卡", between("isEraCardEligible(life, card, era) {", "findEraChoice(life, era, isPauseYear) {"));
condKeys(D.lifeStages.stage_events, "人生階段", between("checkLifeStageEvent(life, era, isPauseYear) {", "findEligibleDecision(life, era, eduMode"));
// 未來事件與歷史事件影響
const futImp = between("applyFutureForecastImpact(life, ev, era) {", "maybeTriggerFutureForecast(life, era, cultEra) {");
for (const ev of D.futureForecasts.events) for (const k of Object.keys(ev.gameplay_impact || {})) if (!futImp.includes(`imp.${k}`)) err(`未來事件影響沒有被處理：${ev.id}.${k}`);
const histImp = between("applyHistoricalImpact(life, ev, era, eduMode) {", "resolvePendingTraps(life, era) {");
const histKeys = new Set(); for (const ev of D.events.events) for (const k of Object.keys(ev.gameplay_impact || {})) histKeys.add(k);
for (const k of histKeys) if (!histImp.includes(`imp.${k}`) && !engineSrc.includes(`gameplay_impact.${k}`) && !engineSrc.includes(`impact.${k}`)) err(`歷史事件影響沒有被處理：${k}`);
// 周圍的人與事欄位
const peerSrc = between("maybeTriggerAmbientPeer(life, era) {", "applyFutureForecastImpact(life, ev, era) {");
const vigKeys = new Set(); for (const v of D.ambientPeers.vignettes) for (const k of Object.keys(v)) vigKeys.add(k);
for (const k of vigKeys) if (!["id", "text", "relation", "historical_note", "category", "memory_echo"].includes(k) && !peerSrc.includes(`v.${k}`) && !peerSrc.includes(`picked.${k}`)) err(`周圍的人與事欄位沒有被讀取：${k}`);

// 4. 跨檔引用
const careerRefs = [];
const scanCareer = (arr, w) => (arr || []).forEach((id) => careerRefs.push([id, w]));
for (const d of D.decisions.decisions) { const c = d.conditions || {}; scanCareer(c.career_in, d.id); scanCareer(c.career_not_in, d.id); }
for (const c of D.decisions.era_choices) {
  scanCareer(c.conditions.careers_in, c.id); scanCareer(c.conditions.careers_not_in, c.id);
  for (const v of c.desc_variants || []) scanCareer(v.careers_in, c.id);
  for (const o of c.options) {
    const all = [o.effects, o.roll && o.roll.success && o.roll.success.effects, o.roll && o.roll.fail && o.roll.fail.effects];
    for (const e of all) if (e && e.assign_career) careerRefs.push([e.assign_career, `${c.id}/${o.key}`]);
    for (const oc of o.outcomes || []) if (oc.if_career) careerRefs.push([oc.if_career, c.id]);
    if (o.roll && o.roll.career_p) for (const id of Object.keys(o.roll.career_p)) careerRefs.push([id, c.id]);
  }
}
for (const [id, w] of careerRefs) if (!careerIds.has(id)) err(`引用不存在的職業：${id}（${w}）`);
const regionRefs = [];
for (const c of D.decisions.era_choices) { (c.conditions.regions_in || []).forEach((r) => regionRefs.push([r, c.id])); (c.conditions.regions_not_in || []).forEach((r) => regionRefs.push([r, c.id])); }
for (const d of D.decisions.decisions) (d.conditions && d.conditions.region_not_in || []).forEach((r) => regionRefs.push([r, d.id]));
for (const v of D.ambientPeers.vignettes) (v.regions || []).forEach((r) => regionRefs.push([r, v.id]));
for (const ev of D.futureForecasts.events) for (const r of [...(ev.regions || []), ...((ev.gameplay_impact || {}).region_bonus_ids || []), ...((ev.gameplay_impact || {}).region_housing_shock_ids || [])]) if (r !== "ALL") regionRefs.push([r, ev.id]);
for (const [id, w] of regionRefs) if (!regionIds.has(id)) err(`引用不存在的地區：${id}（${w}）`);
for (const d of D.decisions.decisions) for (const id of (d.conditions && d.conditions.trigger_events) || []) if (!histIds.has(id)) err(`抉擇卡引用不存在的歷史事件：${d.id} → ${id}`);
for (const c of D.decisions.era_choices) for (const id of c.conditions.future_events_any || []) if (!futIds.has(id)) err(`時代卡引用不存在的未來事件：${c.id} → ${id}`);
const setFlags = new Set(D.futureForecasts.events.flatMap((e) => e.sets_world_flags || []));
for (const ev of D.futureForecasts.events) for (const f of [...(ev.requires_world_flags || []), ...(ev.excludes_world_flags || [])]) if (!setFlags.has(f)) err(`未來事件需要的世界旗標沒有人會設定：${ev.id} → ${f}`);
const axes = { ai: ["fast", "slow"], climate: ["mild", "harsh"], economy: ["boom", "stagnant", "crisis"], geo: ["calm", "tense"], demo: ["rebound", "decline"] };
const checkAxis = (obj, w) => { for (const [ax, vals] of Object.entries(obj || {})) { if (!axes[ax]) { err(`未知的世界線面向：${ax}（${w}）`); continue; } for (const v of Array.isArray(vals) ? vals : Object.keys(vals)) if (!axes[ax].includes(v)) err(`未知的世界線取值：${ax}.${v}（${w}）`); } };
for (const ev of D.futureForecasts.events) { checkAxis(ev.world_bias, ev.id); checkAxis(ev.requires_world_line, ev.id); }
for (const c of D.decisions.era_choices) { checkAxis(c.conditions.world_line, c.id); for (const o of c.options) { if (o.roll) checkAxis(o.roll.world_p, c.id); } }
// 記憶標籤
const memTags = new Set(D.ambientPeers.vignettes.map((v) => v.memory).filter(Boolean));
const hookSrc = engineSrc.slice(engineSrc.indexOf("const MEMORY_HOOKS"), engineSrc.indexOf("};", engineSrc.indexOf("const MEMORY_HOOKS")));
const hookTags = new Set([...hookSrc.matchAll(/\["([a-z_]+)",/g)].map((m) => m[1]));
for (const t of hookTags) if (!memTags.has(t)) err(`抉擇記憶鉤子沒有對應的周圍事件：${t}`);
for (const t of memTags) if (!hookTags.has(t)) warn(`周圍事件的記憶沒有被任何抉擇用到：${t}`);
const hookIds = [...hookSrc.matchAll(/^\s{4}([A-Z][A-Za-z0-9_]+):/gm)].map((m) => m[1]);
for (const id of hookIds) if (!decisionIds.has(id) && !eraIds.has(id)) err(`記憶鉤子指向不存在的抉擇卡：${id}`);
for (const id of hookIds) { const hk = hookSrc.slice(hookSrc.indexOf(`${id}:`)).split("\n")[0]; const keys = [...hk.matchAll(/([a-z0-9_]+): [0-9.]+/g)].map((m) => m[1]); const card = [...D.decisions.decisions, ...D.decisions.era_choices].find((c) => c.id === id); if (card) for (const k of keys) if (!card.options.some((o) => o.key === k)) err(`記憶鉤子指向不存在的選項：${id}/${k}`); }
// 性格偏好表的選項
const biasSrc = engineSrc.slice(engineSrc.indexOf("const TRAIT_BIAS"), engineSrc.indexOf("};", engineSrc.indexOf("const TRAIT_BIAS")));
for (const m of biasSrc.matchAll(/^\s{4}([A-Z][A-Za-z0-9_]+): (.*)$/gm)) {
  const card = D.decisions.decisions.find((c) => c.id === m[1]);
  if (!card) { err(`性格偏好表指向不存在的抉擇卡：${m[1]}`); continue; }
  for (const k of [...m[2].matchAll(/([a-z0-9_]+): [0-9.]+/g)].map((x) => x[1])) if (!card.options.some((o) => o.key === k) && !/^(switch|career)/.test(k)) err(`性格偏好表指向不存在的選項：${m[1]}/${k}`);
}
// 5. 沒被呼叫的方法
const methods = [...engineSrc.matchAll(/^ {4}([a-zA-Z_][A-Za-z0-9_]*)\([^)]*\) \{/gm)].map((m) => m[1]).filter((n) => !["constructor", "if", "for", "while", "switch"].includes(n));
for (const m of new Set(methods)) {
  const calls = (engineSrc.match(new RegExp(`\\.${m}\\(`, "g")) || []).length + (uiSrc.match(new RegExp(`\\.${m}\\(`, "g")) || []).length;
  if (calls === 0) warn(`引擎方法沒有被呼叫：${m}`);
}

console.log(`\n=== 一、靜態檢查 ===\n錯誤 ${errors.length} 項、警告 ${warnings.length} 項`);
for (const e of errors) console.log("✗ " + e);
for (const w of warnings) console.log("△ " + w);
if (STATIC_ONLY) process.exit(errors.length ? 1 : 0);

// ==================================================================== 二、蒙地卡羅
const hit = { decision: {}, option: {}, era: {}, eraOption: {}, ls: {}, history: {}, protagonist: {}, future: {}, vignette: {}, custom: {}, abroad: {}, returnTrig: {}, echo: {}, incident: {}, death: {}, sa: {}, daily: {} };
const inc = (m, k) => { m[k] = (m[k] || 0) + 1; };
const texts = new Set();
const t0 = Date.now();
let deaths = [], decisionsTotal = 0, crashes = 0;
for (let i = 0; i < LIVES; i++) {
  const eduMode = Math.random() < 0.15;
  const historicalMode = !eduMode && Math.random() < 0.35;
  const showAll = Math.random() < 0.3;
  const policy = Math.random() < 0.5 ? "auto" : "random";
  const regionMode = ["birth_weight", "pop_weight", "manual"][Math.floor(Math.random() * 3)];
  const l = engine.createLife({ birthYear: 1950 + Math.floor(Math.random() * 56), regionMode, manualRegionId: D.regions.regions[Math.floor(Math.random() * 6)].id });
  try {
    while (l.alive && l.age < 105) {
      const before = l.feed.length;
      const res = engine.stepYear(l, { eduMode, historicalMode, showAllHistoricalEvents: showAll });
      const era = engine.getEraParams(l.currentYear);
      for (const f of l.feed.slice(0, l.feed.length - before)) {
        if (f.type === "historical_edu" && f.id) inc(hit.history, f.id);
        if (f.type === "overseas_event" && f.id) inc(hit.abroad, f.id);
        if (f.type === "future_forecast" && f.id) inc(hit.future, f.id);
        if (f.text) texts.add(f.text);
        if (f.text && /時代的回聲/.test(f.text)) inc(hit.echo, "any");
        if (f.text && /【🚑 意外】|【🏥 疾病】/.test(f.text)) inc(hit.incident, f.text.slice(0, 9));
      }
      let d = res.pendingDecision;
      for (let g = 0; d && g < 4; g++) {
        decisionsTotal++;
        const id = String(d.id);
        if (d.isLifeStageCard) inc(hit.ls, id); else if (id.startsWith("SA:")) inc(hit.sa, id); else if (!d.isEraCard) inc(hit.decision, id);
        const elig = d.options.filter((o) => engine.isOptionEligible(l, o, era).eligible);
        const ch = policy === "random" ? (elig[Math.floor(Math.random() * elig.length)] || d.options[0]) : engine.chooseAutoOption(l, d, elig, era);
        if (!d.isEraCard) inc(hit.option, `${id.replace(/:.*/, "")}/${["D07_career_track", "D07B_career_switch"].includes(id) || id.startsWith("SA:") ? ch.key.replace(/^(career_|switch_|go_).*$/, "$1*") : ch.key}`);
        engine.applyDecision(l, d, ch.key, era);
        d = engine.findFollowUpDecision(l, d, era);
      }
    }
  } catch (e) {
    crashes++;
    if (crashes <= 3) err(`模擬中發生錯誤（${l.birthYear} 生 ${l.age} 歲）：${e.message}`);
  }
  for (const h of l.eraHistory || []) { inc(hit.era, h.cardId); inc(hit.eraOption, `${h.cardId}/${h.key}`); }
  for (const id of Object.keys(l.triggeredCustoms || {})) inc(hit.custom, id);
  for (const id of Object.keys((l.flags && l.flags.seenPeers) || {})) inc(hit.vignette, id);
  for (const pe of l.protagonistEvents || []) inc(hit.protagonist, pe.eventId || pe.title);
  for (const [k] of Object.entries(l.triggeredDecisions || {})) if (/^SA:/.test(k)) inc(hit.sa, k);
  if (l.abroad) for (const id of Object.keys(l.abroad.triggeredReturnTriggers || {})) inc(hit.returnTrig, id);
  for (const id of Object.keys((l.flags && l.flags.seenReturnTriggers) || {})) inc(hit.returnTrig, id);
  if (l.causeOfDeath) inc(hit.death, l.causeOfDeath.label);
  deaths.push(l.age);
  if ((i + 1) % 5000 === 0) console.log(`  …已跑 ${i + 1} 段人生（${((Date.now() - t0) / 1000).toFixed(0)} 秒）`);
}

const never = (label, all, m, fmt = (x) => x) => {
  const miss = all.filter((x) => !m[x]);
  console.log(`${label}：${all.length - miss.length}/${all.length} 觸發過`);
  for (const x of miss) warn(`從未觸發｜${label}｜${fmt(x)}`);
  return miss;
};
console.log(`\n=== 二、蒙地卡羅 ${LIVES.toLocaleString()} 段人生（${((Date.now() - t0) / 1000).toFixed(0)} 秒，崩潰 ${crashes} 次）===`);
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
console.log(`平均壽命 ${mean(deaths).toFixed(1)} 歲，平均每段人生 ${(decisionsTotal / LIVES).toFixed(1)} 次抉擇`);
const nameOf = (list) => (id) => { const x = list.find((y) => y.id === id); return `${id}（${(x && (x.title || x.title_zh || x.relation || x.name)) || ""}）`; };
never("抉擇卡", D.decisions.decisions.filter((d) => !d.deprecated_by).map((d) => d.id), hit.decision, nameOf(D.decisions.decisions));
const allOpts = D.decisions.decisions.filter((d) => !d.deprecated_by && !["D07_career_track", "D07B_career_switch"].includes(d.id)).flatMap((d) => d.options.map((o) => `${d.id}/${o.key}`));
never("抉擇卡選項", allOpts, hit.option);
never("人生階段卡", D.lifeStages.stage_events.map((e) => e.id), hit.ls, nameOf(D.lifeStages.stage_events));
never("人生階段選項", D.lifeStages.stage_events.flatMap((e) => (e.options || []).map((o) => `${e.id}/${o.key}`)), hit.option);
never("時代卡", D.decisions.era_choices.map((c) => c.id), hit.era, nameOf(D.decisions.era_choices));
never("時代卡選項", D.decisions.era_choices.flatMap((c) => c.options.map((o) => `${c.id}/${o.key}`)), hit.eraOption);
never("留學路徑", D.studyAbroad.pathways.map((p) => `SA:${p.id}`), hit.sa);
never("歷史事件", D.events.events.map((e) => e.id), hit.history, nameOf(D.events.events));
never("未來事件", D.futureForecasts.events.map((e) => e.id), hit.future, nameOf(D.futureForecasts.events));
never("周圍的人與事", D.ambientPeers.vignettes.map((v) => v.id), hit.vignette, nameOf(D.ambientPeers.vignettes));
never("台灣習俗", D.cultureEras.taiwan_customs.map((c) => c.id), hit.custom, nameOf(D.cultureEras.taiwan_customs));
never("海外當地事件", D.studyAbroad.countries.flatMap((c) => (c.era_events || []).map((e) => e.id)), hit.abroad);
const dailyAll = D.cultureEras.era_atmospheres.flatMap((a) => (a.daily_vignettes || []).map((v) => (typeof v === "string" ? v : v.text)));
const dailyMiss = dailyAll.filter((t) => ![...texts].some((x) => x.includes(t)));
console.log(`時代日常切片：${dailyAll.length - dailyMiss.length}/${dailyAll.length} 出現過`);
for (const t of dailyMiss) warn(`從未觸發｜時代日常｜${t.slice(0, 30)}`);
const flavorAll = D.educationCareers.education_eras.flatMap((a) => (a.flavor_events || []).map((v) => (typeof v === "string" ? v : v.text)));
const flavorMiss = flavorAll.filter((t) => ![...texts].some((x) => x.includes(t)));
console.log(`教育時代插曲：${flavorAll.length - flavorMiss.length}/${flavorAll.length} 出現過`);
for (const t of flavorMiss) warn(`從未觸發｜教育插曲｜${t.slice(0, 30)}`);
console.log("疾病與事故：", JSON.stringify(hit.incident));
console.log("時代的回聲：", hit.echo.any || 0, "次");
const deathTop = Object.entries(hit.death).sort((a, b) => b[1] - a[1]);
console.log("死因分布：", deathTop.map(([k, n]) => `${k} ${(100 * n / LIVES).toFixed(1)}%`).join("、"));

const neverWarn = warnings.filter((w) => w.startsWith("從未觸發"));
console.log(`\n從未觸發 ${neverWarn.length} 項：`);
for (const w of neverWarn) console.log("△ " + w);
console.log(`\n結論：錯誤 ${errors.length} 項，警告 ${warnings.length} 項。`);
for (const e of errors) console.log("✗ " + e);
process.exit(errors.length ? 1 : 0);
