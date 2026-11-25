/**
 * Cohort Calibration Suite (scripts/calibrate_cohorts.js)
 * Runs multi-cohort life simulations and Historical Mode decoupling checks.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const ctx = { window: {}, console, Math, Date, JSON, Object, Array, Number, String, Boolean, RegExp, Error };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "data/tw_bundle.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(root, "js/tw_engine.js"), "utf8"), ctx);

const engine = new ctx.TaiwanLifeEngine(ctx.TW_DATA);

function pct(arr, p) {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const pos = (s.length - 1) * p;
  const lo = Math.floor(pos), hi = Math.ceil(pos);
  return Math.round(s[lo] + (s[hi] - s[lo]) * (pos - lo));
}

function checkMajorCareerViolation(life) {
  const m = life.major;
  const c = life.careerId;
  if (!m || !c) return false;
  const cross = !!(life.flags && life.flags.uni_cross_coding);
  if (m === "stem_eng" && ["car_lawyer_cpa", "car_doctor_pharma", "car_healthcare_ltc"].includes(c)) return true;
  if (m === "humanities_biz") {
    if (["car_doctor_pharma", "car_healthcare_ltc"].includes(c)) return true;
    if (!cross && ["car_hsinchu_semi", "car_software_remote"].includes(c)) return true;
  }
  if (m === "med_health" && ["car_lawyer_cpa", "car_hsinchu_semi", "car_software_remote"].includes(c)) {
    if (!(cross && ["car_hsinchu_semi", "car_software_remote"].includes(c))) return true;
  }
  return false;
}

const cohorts = [1955, 1975, 1995, 2015];
const N = 500;

let majorViolations = 0;
let nonSouthMorakotHits = 0;
let nonEastTarokoHits = 0;
let elderlyRentRejectCount = 0;
const abroadCountriesSeen = new Set();

const cohortReport = [];
for (const by of cohorts) {
  let uni = 0, everMarried = 0, totalKids = 0, home = 0, office = 0, sme = 0, sumAge = 0;
  const endRealWans = [];
  for (let i = 0; i < N; i++) {
    const l = engine.createLife({ birthYear: by });
    let hitMarry = false;
    while (l.alive && l.age < 105) {
      engine.stepYear(l, { eduMode: false, historicalMode: false, autoMode: true });
      if (l.married || l.triggeredDecisions["D18_marriage_choice"] && l.married) hitMarry = true;
      if (l.abroad && l.abroad.countryId) abroadCountriesSeen.add(l.abroad.countryId);
      if (checkMajorCareerViolation(l)) majorViolations++;
    }
    if (l.married || (l.decisionHistory || []).some(d => d.title.includes("結婚") && !d.choice.includes("不婚"))) hitMarry = true;
    if (l.eduLevel >= 4) uni++;
    if (hitMarry) everMarried++;
    totalKids += (l.children || 0);
    if (l.homeowner) home++;
    if (l.careerId === "car_office_white_collar") office++;
    if (l.careerId === "car_sme_boss") sme++;
    if (l.flags && l.flags.elderly_rent_hit_done) elderlyRentRejectCount++;
    sumAge += l.age;
    const endEra = engine.getEraParams(l.currentYear);
    endRealWans.push(Math.round((engine.getNetWorthNominal(l) / Math.max(0.07, endEra.cpi)) / 10000));
  }
  cohortReport.push({
    birthYear: by,
    n: N,
    meanAge: +(sumAge / N).toFixed(1),
    uniPct: +(uni * 100 / N).toFixed(1),
    everMarriedPct: +(everMarried * 100 / N).toFixed(1),
    avgChildren: +(totalKids / N).toFixed(2),
    homePct: +(home * 100 / N).toFixed(1),
    officePct: +(office * 100 / N).toFixed(1),
    smePct: +(sme * 100 / N).toFixed(1),
    p50Wan: pct(endRealWans, 0.5),
    p90Wan: pct(endRealWans, 0.9)
  });
}

// Historical mode audit: showAll = false vs true + Morakot/Taroko geography gating
const histCases = [
  { regionId: "central", birthYear: 1960 },
  { regionId: "north_taipei", birthYear: 1970 },
  { regionId: "east_islands", birthYear: 1975 },
  { regionId: "north_taipei", birthYear: 1990 }
];
const histReport = [];
for (const hc of histCases) {
  for (const showAll of [false, true]) {
    let piHits = 0, pi2Plus = 0, fatal = 0, sumAge = 0;
    let incident2Plus = 0;
    for (let i = 0; i < N; i++) {
      const l = engine.createLife({ regionMode: "manual", manualRegionId: hc.regionId, birthYear: hc.birthYear });
      while (l.alive && l.age < 105) {
        const prevReg = l.regionId;
        const prevCount = (l.protagonistEvents || []).length;
        engine.stepYear(l, { eduMode: false, historicalMode: true, autoMode: true, showAllHistoricalEvents: showAll });
        const newPes = (l.protagonistEvents || []).slice(prevCount);
        for (const pe of newPes) {
          if (pe.eventId === "EV_2009_morakot_88_flood" && !["south_kaohsiung", "south_tainan", "east_islands"].includes(prevReg)) {
            nonSouthMorakotHits++;
          }
          if (pe.eventId === "EV_2021_taroko_408" && prevReg !== "east_islands" && l.birthRegionId !== "east_islands") {
            nonEastTarokoHits++;
          }
        }
      }
      sumAge += l.age;
      const pes = l.protagonistEvents || [];
      if (pes.length > 0) piHits++;
      if (pes.length >= 2) pi2Plus++;
      if ((l.flags.incident_pi_count || 0) >= 2) incident2Plus++;
      if (l.fatalByHistoricalMode) fatal++;
    }
    histReport.push({
      cohort: `${hc.birthYear}/${hc.regionId}`,
      showAll,
      meanAge: +(sumAge / N).toFixed(1),
      piPct: +(piHits * 100 / N).toFixed(1),
      pi2PlusPct: +(pi2Plus * 100 / N).toFixed(1),
      incident2Plus,
      fatalPct: +(fatal * 100 / N).toFixed(1)
    });
  }
}

console.log("=== COHORT CALIBRATION (500 lives each) ===");
console.table(cohortReport);
console.log("=== HISTORICAL MODE AUDIT (500 lives each) ===");
console.table(histReport);
console.log("Integrity checks:", {
  majorViolations,
  nonSouthMorakotHits,
  nonEastTarokoHits,
  elderlyRentRejectCount,
  abroadCountriesSeen: Array.from(abroadCountriesSeen).sort()
});
