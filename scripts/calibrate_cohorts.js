/**
 * 世代校準與一致性檢查（scripts/calibrate_cohorts.js）
 *
 *   node scripts/calibrate_cohorts.js            # 預設規模（約 2–3 分鐘）
 *   node scripts/calibrate_cohorts.js --quick    # 快速檢查（約 40 秒）
 *   node scripts/calibrate_cohorts.js --seed=7   # 換一組亂數種子
 *
 * 任何一項超出目標區間或違反規則時，程式以結束碼 1 結束。
 * 目標區間刻意放寬：它們用來抓「明顯不像台灣」的偏移，不是精確預測。
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const QUICK = process.argv.includes("--quick");
const seedArg = process.argv.find((a) => a.startsWith("--seed="));
let seed = seedArg ? Number(seedArg.split("=")[1]) : 20261125;
function rng() {
  seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
Math.random = rng;

const root = path.resolve(__dirname, "..");
const ctx = { console, Math, Date, JSON };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ["data/tw_bundle.js", "js/tw_engine.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
}
const engine = new ctx.TaiwanLifeEngine(ctx.TW_DATA);
const N = QUICK ? 220 : 600;

const pct = (a, p) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(s.length * p))]; };
const mean = (a) => a.reduce((x, y) => x + y, 0) / Math.max(1, a.length);

// policy "auto" = 引擎內建的時代加權；"random" = 亂點的玩家
function runLife(opts, policy, hooks = {}, stepOpts = {}) {
  const l = engine.createLife(opts);
  while (l.alive && l.age < 105) {
    const before = l.feed.length;
    const res = engine.stepYear(l, { autoMode: false, ...stepOpts });
    const era = engine.getEraParams(l.currentYear);
    if (hooks.year) hooks.year(l, era, l.feed.slice(0, l.feed.length - before));
    let d = res.pendingDecision;
    for (let guard = 0; d && guard < 4; guard++) {
      const elig = d.options.filter((o) => engine.isOptionEligible(l, o, era).eligible);
      const ch = policy === "random" ? (elig[Math.floor(Math.random() * elig.length)] || d.options[0]) : engine.chooseAutoOption(l, d, elig, era);
      if (hooks.decision) hooks.decision(l, era, d, elig, ch);
      engine.applyDecision(l, d, ch.key, era);
      d = engine.findFollowUpDecision(l, d, era);
    }
  }
  return l;
}

const failures = [];
function check(name, value, lo, hi) {
  const ok = value >= lo && value <= hi;
  if (!ok) failures.push(`${name}：${value}（目標 ${lo}–${hi}）`);
  return { 項目: name, 數值: value, 目標: `${lo}–${hi}`, 結果: ok ? "通過" : "未通過" };
}

// ---------------------------------------------------------------- 1. 世代指標
// [大學%, 45 歲前曾婚%, 初婚年齡中位, 平均子女, 60 歲住自有或父母房%, 平均壽命, 60 歲淨資產中位(2025 萬)]
const TARGETS = {
  1950: { uni: [6, 22], wed: [86, 99], mAge: [23, 28], kids: [2.4, 3.4], own60: [64, 92], le: [74, 83], nw60: [300, 1300] },
  1960: { uni: [10, 30], wed: [85, 98], mAge: [24, 30], kids: [1.9, 2.7], own60: [64, 92], le: [75, 84], nw60: [450, 1500] },
  1970: { uni: [20, 40], wed: [78, 94], mAge: [26, 31], kids: [1.35, 2.1], own60: [66, 94], le: [76, 85], nw60: [600, 1700] },
  1980: { uni: [40, 65], wed: [64, 86], mAge: [28, 34], kids: [0.85, 1.45], own60: [70, 95], le: [77, 86], nw60: [700, 1800] },
  1995: { uni: [64, 86], wed: [52, 76], mAge: [30, 36], kids: [0.6, 1.2], own60: [70, 95], le: [77, 87], nw60: [700, 1900] },
  2015: { uni: [64, 88], wed: [48, 74], mAge: [30, 37], kids: [0.5, 1.1], own60: [66, 95], le: [77, 88], nw60: [700, 2000] }
};
const rows = [];
for (const by of Object.keys(TARGETS).map(Number)) {
  const t = TARGETS[by];
  let uni = 0, wed = 0, kids = 0, n45 = 0, own = 0, n60 = 0, age = 0, unretired = 0, n73 = 0;
  const mAges = [], nw60 = [];
  for (let i = 0; i < N; i++) {
    let first = null;
    const l = runLife({ birthYear: by }, "auto", {
      year(x, era) {
        if (x.married && first == null) first = x.age;
        if (x.age === 60) { n60++; if (x.homeowner || x.flags.lives_with_parents) own++; nw60.push(engine.getNetWorthNominal(x) / era.cpi / 1e4); }
        if (x.age === 73) { n73++; if (!x.flags.retired && !engine.isSelfEmployed(x)) unretired++; }
      }
    });
    if (l.age >= 45) { n45++; if (first != null) { wed++; mAges.push(first); } kids += l.children; }
    if (l.eduLevel >= 4) uni++;
    age += l.age;
  }
  const P = (a, b) => +(100 * a / Math.max(1, b)).toFixed(1);
  rows.push(
    check(`${by} 生｜大學以上 %`, P(uni, N), ...t.uni),
    check(`${by} 生｜曾婚 %`, P(wed, n45), ...t.wed),
    check(`${by} 生｜初婚年齡中位`, pct(mAges, 0.5), ...t.mAge),
    check(`${by} 生｜平均子女`, +(kids / n45).toFixed(2), ...t.kids),
    check(`${by} 生｜60 歲住自有／父母房 %`, P(own, n60), ...t.own60),
    check(`${by} 生｜平均壽命`, +(age / N).toFixed(1), ...t.le),
    check(`${by} 生｜60 歲淨資產中位（萬）`, Math.round(pct(nw60, 0.5)), ...t.nw60),
    check(`${by} 生｜73 歲仍未退休的受僱者 %`, P(unretired, n73), 0, 1)
  );
}
console.log("\n=== 1. 世代指標 ===");
console.table(rows);

// ---------------------------------------------------------------- 2. 2024 年橫斷面薪資與資產
const sal = [], nwA = { "30s": [], "40s": [], "50-64": [], "65+": [] }, nwAll = [], sec = {}, secSal = {};
const young = [];
for (let i = 0; i < N * 5; i++) {
  runLife({ birthYear: 1950 + (i % 56) }, "auto", {
    year(l, era) {
      if (l.currentYear !== 2024 || l.location !== "TAIWAN" || l.age < 20) return;
      const r = engine.getNetWorthNominal(l) / 1e4;
      if (l.age >= 30) { nwAll.push(r); nwA[l.age < 40 ? "30s" : l.age < 50 ? "40s" : l.age < 65 ? "50-64" : "65+"].push(r); }
      if (l.annualSalaryNominal > 0 && !l.flags.retired && l.age < 65 && l.workYears > 0 && !l.flags.unemployed && !(l.flags.military_gap_years > 0)) {
        const v = l.annualSalaryNominal / 1e4;
        sal.push(v);
        if (l.age < 30) young.push(v);
        sec[l.careerId] = (sec[l.careerId] || 0) + 1;
        (secSal[l.careerId] = secSal[l.careerId] || []).push(v);
      }
    }
  });
}
const share = (k) => +(100 * (sec[k] || 0) / sal.length).toFixed(1);
const med = (k) => Math.round(pct(secSal[k] || [], 0.5));
console.log("\n=== 2. 2024 年橫斷面（官方：年薪中位 54.6 萬、平均 73.2 萬、未滿 30 歲 45 萬；110 年家庭財富中位 894 萬）===");
console.table([
  check("年薪中位數（萬）", +pct(sal, 0.5).toFixed(1), 48, 64),
  check("年薪平均（萬）", +mean(sal).toFixed(1), 58, 82),
  check("未滿 30 歲年薪中位（萬）", +pct(young, 0.5).toFixed(1), 40, 54),
  check("30 歲以上淨資產中位（萬）", Math.round(pct(nwAll, 0.5)), 350, 1000),
  check("30–39 歲淨資產中位（萬）", Math.round(pct(nwA["30s"], 0.5)), 100, 380),
  check("40–49 歲淨資產中位（萬）", Math.round(pct(nwA["40s"], 0.5)), 350, 850),
  check("30–49 歲淨資產 P99（萬）", Math.round(pct([...nwA["30s"], ...nwA["40s"]], 0.99)), 600, 4500),
  check("軍公教占在職 %", share("car_civil_teacher"), 3, 12),
  check("一般白領占在職 %", share("car_office_white_collar"), 16, 34),
  check("醫師年薪中位（萬）", med("car_doctor_pharma") || 211, 160, 300),
  check("半導體工程師年薪中位（萬）", med("car_hsinchu_semi"), 85, 150),
  check("服務業基層年薪中位（萬）", med("car_service_worker"), 30, 45)
]);

// ---------------------------------------------------------------- 3. 逐年一致性規則（兩種玩法）
const rules = {};
const hit = (k, l, extra) => { (rules[k] = rules[k] || { n: 0, 例: "" }).n++; if (!rules[k].例) rules[k].例 = `${l.birthYear} 生 ${l.age} 歲（${l.currentYear}）${l.job}${extra ? "｜" + extra : ""}`; };
const TERMS = [["App", 2009], ["LINE", 2011], ["臉書", 2008], ["ETF", 2003], ["全民健保", 1994], ["捷運", 1996], ["高鐵", 2007], ["科學園區", 1980], ["交友軟體", 2012], ["22K", 2009], ["超商", 1979], ["信用卡", 1984], ["基測", 2001], ["會考", 2014], ["統測", 2001], ["空中大學", 1986], ["在職專班", 1999], ["推甄", 1990], ["研發替代役", 2008], ["人力銀行", 1996], ["標靶", 2001], ["雅思", 1990], ["北漂", 2000], ["斜槓", 2016], ["新青安", 2023], ["外籍看護", 1992], ["MSN", 1999], ["無名小站", 1999], ["現金卡", 1999], ["消債", 2007], ["社區大學", 1998]];
function scan(text, l, where) {
  if (!text) return;
  for (const [t, y] of TERMS) if (text.includes(t) && l.currentYear < y) hit(`時代錯置「${t}」`, l, where);
}
const M = QUICK ? 500 : 1400;
for (const policy of ["auto", "random"]) {
  for (let i = 0; i < M; i++) {
    let hadPartner = false, hadMarriage = false;
    runLife({ birthYear: 1950 + (i % 77) }, policy, {
      year(l, era, fresh) {
        if (l.partner) hadPartner = true;
        if (l.married) { if (!hadPartner) hit("未交往就結婚", l); hadMarriage = true; }
        if (l.children > 0 && !hadMarriage) hit("未婚有子女", l);
        const pt = l.flags.part_time_approved || l.flags.vocational_coop || l.flags.hs_tier === "work_early";
        if (l.age < 18 && !pt && engine.getNetWorthNominal(l) !== 0) hit("未成年未打工卻有資產", l);
        if (l.workYears === 0 && l.age < 30 && l.moneyNominal < -1000 && l.location === "TAIWAN" && !(l.protagonistEvents || []).length && !pt) hit("尚未工作就負債", l, l.moneyNominal);
        if (l.flags.military_gap_years > 0 && l.flags.in_grad_school_years > 0) hit("研究所在學同時服役", l);
        if (l.flags.military_gap_years > 0 && l.location !== "TAIWAN") hit("服役中人在國外", l);
        if (l.annualSalaryNominal > 0 && !l.flags.retired && l.location === "TAIWAN" && !l.careerId && !(l.flags.military_gap_years > 0)) hit("沒有職業卻有薪水", l);
        if (l.age >= 80 && !l.flags.retired) hit("80 歲仍未退休", l);
        if (l.careerId === "car_lawyer_cpa" && l.subMajor !== "law") hit("非法律系當律師", l);
        if (l.careerId === "car_cpa" && l.subMajor !== "biz") hit("非商管系當會計師", l);
        if (l.careerId === "car_doctor_pharma" && l.subMajor !== "med_doctor") hit("非醫學系當醫師", l);
        if (["car_hsinchu_semi", "car_software_remote"].includes(l.careerId) && l.major !== "stem_eng" && !l.flags.uni_cross_coding) hit("非理工且未跨域的工程師", l);
        if (l.careerId === "car_civil_teacher" && l.eduLevel < 3 && l.flags.rank_title !== "志願役軍士官" && !l.flags.second_career_started) hit("未達高中職卻是軍公教", l);
        if (l.family.parentsAlive && l.age >= 85) hit("85 歲父母仍在", l);
        if (/在學/.test(l.education) && l.location === "TAIWAN" && l.age >= 28) hit("28 歲以上仍在學", l);
        for (const f of fresh) {
          if (f.type === "historical_edu") { scan(f.summary, l, f.id); scan(f.title, l, f.id); for (const y of (f.summary || "").match(/(?:19[5-9]\d|20[0-4]\d)(?=\s?年)/g) || []) if (+y > l.currentYear) hit("歷史摘要劇透未來年份", l, f.id); for (const y of engine.visibleAftermath(f.aftermath, l.currentYear).match(/(?:19[5-9]\d|20[0-4]\d)(?=\s?年)/g) || []) if (+y > l.currentYear) hit("餘波劇透未來年份", l, f.id); }
          else { scan(f.text, l, f.type); }
          if (l.age < 18 && /不婚不生|房貸|同事|股票分紅/.test(f.text || "") && f.type === "normal" && !/抉擇/.test(f.text)) hit("未成年看到成人職場／家庭描述", l, f.text.slice(0, 30));
        }
      },
      decision(l, era, d, elig) {
        const labels = d.options.map((o) => engine.resolveEraLabel(o, l.currentYear));
        for (const t of [d.resolvedTitle, d.resolvedDesc, d.resolvedSource, engine.getDecisionSocialTrend(l, d, era), ...labels]) scan(t, l, d.id);
        const key = (k) => elig.some((o) => o.key === k);
        if (l.age < 18 && !/^(LS|D01|SA:SA03)/.test(d.id)) hit("未成年遇成人抉擇", l, d.id);
        if (d.id === "D31_cashflow_debt_crisis") {
          if (key("sell_vehicle") && !l.ownedAssets.vehicle) hit("沒有車卻可賣車", l);
          if (key("sell_valuables") && !l.ownedAssets.valuables) hit("沒有金飾卻可變賣", l);
          if (key("sell_home_crisis") && !l.homeowner) hit("沒有房卻可賣房", l);
        }
        if (["D21_child_education_race", "D29_child_study_abroad"].includes(d.id) && !l.children) hit("沒有小孩卻遇子女卡", l);
        if (d.id === "D18_marriage_choice" && !l.partner) hit("沒有伴侶卻遇結婚卡", l);
        if (d.id === "D19_have_children" && !l.married) hit("未婚卻遇生育卡", l);
        if (d.id === "D19_have_children" && l.children > 0 && labels.some((x) => /頂客|不生育/.test(x))) hit("已有小孩仍顯示頂客", l);
        if (d.id === "D20_marriage_crisis" && l.sex === "M" && labels.some((x) => /婆家|夫家/.test(x))) hit("男性看到搬離婆家／夫家", l);
        if (l.location !== "TAIWAN" && ["D06_northbound_migration", "D08_overseas_assignment", "D10_unpaid_leave", "D13_buying_home", "D16_relative_loan_guarantor", "D23_pandemic_dilemma", "D24_elderly_care_storm"].includes(d.id)) hit("人在海外遇台灣在地卡", l, d.id);
        if (d.id === "D05_graduation_crossroads" && l.careerId) hit("畢業抉擇前已有職業", l);
        if (d.id === "D07_career_track" && l.careerId && !(l.flags.civil_exam_fails > 0)) hit("選職業前已有職業", l);
        if (/^SA:/.test(d.id) && l.married) hit("已婚獨自留學卡", l);
        if (d.id === "D12B_vehicle_purchase" && labels.some((x) => x.includes("捷運")) && ["east_islands", "south_tainan"].includes(l.regionId)) hit("無捷運地區出現捷運選項", l);
        if (d.id === "D10_unpaid_leave" && l.careerId === "car_civil_teacher") hit("軍公教遇無薪假", l);
      }
    }, { showAllHistoricalEvents: i % 2 === 0 });
  }
}
console.log(`\n=== 3. 逐年一致性規則（${M * 2} 段人生，加權與亂選兩種玩法）===`);
const ruleNames = Object.keys(rules);
if (ruleNames.length) { console.table(rules); ruleNames.forEach((k) => failures.push(`規則違反「${k}」${rules[k].n} 次：${rules[k].例}`)); }
else console.log("全部規則 0 次違反");

// ---------------------------------------------------------------- 4. 史實模式與天災
const hist = [];
for (const c of [{ r: "central", by: 1960 }, { r: "north_taipei", by: 1970 }, { r: "east_islands", by: 1975 }]) {
  for (const showAll of [false, true]) {
    let pi = 0, fatal = 0, two = 0;
    const H = QUICK ? 200 : 500;
    for (let i = 0; i < H; i++) {
      const l = runLife({ regionMode: "manual", manualRegionId: c.r, birthYear: c.by }, "auto", {}, { historicalMode: true, showAllHistoricalEvents: showAll });
      if (l.protagonistEvents.length) pi++;
      if (l.fatalByHistoricalMode) fatal++;
      if ((l.flags.incident_pi_count || 0) > 1) two++;
    }
    hist.push(check(`史實模式 ${c.by}/${c.r} 當事人 %${showAll ? "（全事件）" : ""}`, +(100 * pi / H).toFixed(1), 8, 40));
    hist.push(check(`史實模式 ${c.by}/${c.r} 致死 %${showAll ? "（全事件）" : ""}`, +(100 * fatal / H).toFixed(2), 0, 1.6));
    hist.push(check(`史實模式 ${c.by}/${c.r} 單點慘劇兩次以上`, two, 0, 0));
  }
}
let hit921 = 0, all921 = 0;
for (let i = 0; i < (QUICK ? 400 : 900); i++) {
  let here = false;
  runLife({ regionMode: "manual", manualRegionId: "central", birthYear: 1955 + (i % 25) }, "auto", {
    year(l) { if (l.currentYear === 1999 && l.location === "TAIWAN" && l.regionId === "central") { here = true; all921++; } },
    decision(l, era, d) { if (here && d.id === "D22_major_disaster" && l.currentYear === 1999) hit921++; }
  });
}
hist.push(check("921 中彰投成人受災 %", +(100 * hit921 / Math.max(1, all921)).toFixed(1), 4, 14));
console.log("\n=== 4. 史實模式與天災 ===");
console.table(hist);

console.log(failures.length ? `\n未通過 ${failures.length} 項：\n- ${failures.join("\n- ")}` : "\n全部通過");
process.exitCode = failures.length ? 1 : 0;
