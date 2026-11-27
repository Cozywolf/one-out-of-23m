/* === Taiwan Life Simulation Engine (js/tw_engine.js) — v6.13 (13 Databases Integrated) ===
 * Pure data-driven microsimulation consuming all 13 data/tw_*.json modules (or window.TW_DATA):
 * 1. tw_regions.json           6 macro-regions, quintiles, migration rates
 * 2. tw_eras.json              1950–2070+ anchors, year overrides, 26 institutional switches
 * 3. tw_lifetable.json         calibrated mortality, causes, typhoon & lifestyle risks
 * 4. tw_events_history.json    85 single-year historical & legal-aftermath events (3-part edu cards)
 * 5. tw_decisions.json         34 Taiwan localized decisions + 5 pause questions
 * 6. tw_names.json             weighted surnames & 6 cohort given-name pools
 * 7. tw_education_careers.json 4 education eras & 21 era/region/major-gated Taiwan careers
 * 8. tw_culture_eras.json      era social/family atmospheres, customs & overseas comm channels
 * 9. tw_study_abroad.json      6 study-abroad pathways, 6 countries' era events, 12 return triggers + D27
 * 10-13. tw_life_stages, tw_market_history, tw_ambient_peers, tw_future_forecasts
 */
(function (global) {
  "use strict";

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const toROC = (y) => (y >= 1912 ? `民國${y - 1911}年` : `民前${1912 - y}年`);

  function weightedPick(items, weightFn) {
    const total = items.reduce((s, x) => s + Math.max(0, weightFn(x)), 0);
    if (total <= 0) return items[0];
    let r = Math.random() * total;
    for (const item of items) {
      r -= Math.max(0, weightFn(item));
      if (r <= 0) return item;
    }
    return items[items.length - 1];
  }

  const DECISION_COOLDOWN = 2;
  const ERA_TIER_ICONS = { era: "🕰", trend: "🧭", future: "🔮" };
  // 年度重心：依人生階段提供不同選項。數值為每年基礎效果（實際會依目前數值邊際遞減、連續太久會倦怠）
  const FOCUS_STAGES = {
    student: {
      label: "求學時期",
      options: {
        study: { name: "升學衝刺", desc: "補習、刷題，考試加分", fx: { knowledge: 2, happiness: -1.5, health: -0.5 } },
        club: { name: "社團與朋友", desc: "人際與快樂，課業普通", fx: { social: 2.5, happiness: 1.5, knowledge: 0.5 } },
        parttime: { name: "打工存錢", desc: "提早存錢、社會化，課業稍退", fx: { social: 1, knowledge: -1, health: -0.5 }, minAge: 15 },
        balanced: { name: "均衡生活", desc: "各方面都顧一點", fx: { knowledge: 1, social: 0.8, happiness: 0.5 } }
      }
    },
    work: {
      label: "工作時期",
      options: {
        work: { name: "衝刺事業", desc: "升遷機會變多，但傷身、少陪家人；連續太久容易過勞", fx: { health: -0.8, social: -0.5 } },
        balanced: { name: "工作生活平衡", desc: "穩穩過日子", fx: { happiness: 0.8, health: 0.3 } },
        save: { name: "省吃儉用存錢", desc: "生活費大幅降低，生活樂趣變少", fx: { happiness: -1 } },
        study: { name: "下班進修", desc: "知識成長、轉職門檻更好達到，比較累", fx: { knowledge: 2, health: -0.5, happiness: -0.5 } },
        family: { name: "陪伴家人", desc: "人際與幸福提升，婚姻危機機率減半，升遷較慢", fx: { social: 1.5, happiness: 1.5 } },
        health: { name: "規律運動養生", desc: "健康提升、降低中風與病死風險", fx: { health: 1.8, happiness: 0.5 } }
      }
    },
    retired: {
      label: "退休時期",
      options: {
        health: { name: "規律運動養生", desc: "延緩老化、降低跌倒與中風風險", fx: { health: 1.8, happiness: 0.5 } },
        community: { name: "社區志工與樂齡學習", desc: "人際與知識不退化，對抗孤老", fx: { social: 2, happiness: 1.5, knowledge: 0.8 } },
        travel: { name: "旅行與享受生活", desc: "幸福提升，每年花一筆旅費", fx: { happiness: 2.5, health: 0.3 } },
        family: { name: "含飴弄孫、陪伴家人", desc: "親情與幸福，體力消耗", fx: { social: 1.5, happiness: 2, health: -0.3 } },
        balanced: { name: "隨遇而安", desc: "過自己的步調", fx: { happiness: 0.5 } }
      }
    }
  };
  const FOCUS_TRAIT_PREF = {
    workaholic: { work: 2.2, study: 1.4 }, family_first: { family: 2.2, community: 1.4 }, cautious: { save: 2.0, health: 1.4 },
    risk_taker: { work: 1.4, travel: 1.6, parttime: 1.4 }, sociable: { club: 2.0, community: 1.8, family: 1.3, travel: 1.4 },
    sensitive_introvert: { study: 1.6, health: 1.3, balanced: 1.3 }, civic_minded: { community: 2.0, study: 1.3, club: 1.3 }
  };
  // 失能時不能再做的工作：重度排除所有勞力與久站工作，輕度排除重體力工作
  const PHYSICAL_CAREERS = ["car_craft_apprentice", "car_farmer_fisher", "car_epz_worker", "car_gig_delivery", "car_driver_logistics", "car_service_worker", "car_tourism_hospitality", "car_healthcare_ltc"];
  const HEAVY_CAREERS = ["car_craft_apprentice", "car_farmer_fisher", "car_gig_delivery", "car_driver_logistics"];
  const STAT_NAMES = { health: "健康", happiness: "幸福", knowledge: "知識", social: "人際" };
  // 周圍的人與事留下的記憶：日後相關抉擇時會被想起，並輕微影響自動模式的選擇
  const MEMORY_HOOKS = {
    D05_graduation_crossroads: [["friend_abroad_thriving", { study_abroad: 1.5 }]],
    D06_northbound_migration: [["town_declining", { move_north: 1.4 }], ["friend_returned_home", { stay_home: 1.3 }], ["neighborhood_boom", { stay_home: 1.3 }]],
    D08_overseas_assignment: [["friend_abroad_thriving", { accept_expat: 1.4 }], ["friend_left_lonely", { decline_stay: 1.4 }]],
    D09_return_hometown_dilemma: [["friend_returned_home", { return_home: 1.5 }], ["town_declining", { stay_north: 1.3 }]],
    D11_health_red_flags: [["friend_burnout", { slow_down: 1.8 }], ["relative_died_young", { slow_down: 1.8 }], ["relative_cancer_regret", { slow_down: 1.6 }]],
    D12_first_pot_of_gold: [["friend_scammed", { time_deposit: 1.3, margin_speculation: 0.5 }], ["friend_rich_from_stocks", { etf_dca: 1.3, margin_speculation: 1.4 }]],
    D13_buying_home: [["neighborhood_boom", { buy_core_40yr: 1.3, buy_suburb: 1.2 }], ["town_declining", { rent_and_invest: 1.4 }]],
    D14_financial_trap: [["friend_scammed", { reject: 1.8 }], ["relative_rosca_collapse", { reject: 1.6 }], ["friend_rich_from_stocks", { small_try: 1.4 }]],
    D16_relative_loan_guarantor: [["relative_guarantor_ruin", { refuse: 2.0, co_sign: 0.4 }]],
    D19_have_children: [["friend_happy_parent", { have_child: 1.2 }], ["friend_childfree_happy", { dink_pets: 1.4 }]],
    D20_marriage_crisis: [["friend_divorced", { divorce: 1.3 }]],
    D24_elderly_care_storm: [["relative_caregiver_burnout", { hire_caregiver: 1.6, share_with_siblings: 1.3 }], ["neighbor_died_alone", { quit_fulltime_care: 1.3 }], ["relative_inheritance_feud", { hire_caregiver: 1.3 }]],
    D25_retirement_timing: [["relative_died_young", { early_fire: 1.5, standard_retire: 1.2 }], ["relative_cancer_regret", { early_fire: 1.4, standard_retire: 1.2 }]],
    E1976_suitcase_trade: [["friend_startup_success", { start_trading: 1.5 }], ["friend_startup_fail", { stay_company: 1.5 }]],
    E1986_dajiale: [["relative_rosca_collapse", { no_bet: 1.6 }]],
    E1987_stock_mania: [["friend_rich_from_stocks", { follow_small: 1.4 }]],
    E2017_crypto_boom: [["friend_scammed", { no: 1.6 }], ["friend_rich_from_stocks", { small: 1.4 }]],
    T1965_rotating_credit: [["relative_rosca_collapse", { no_join: 1.8 }]],
    E2012_working_holiday: [["friend_abroad_thriving", { go_aus: 1.5 }], ["friend_left_lonely", { stay: 1.3 }]],
    E2015_low_wage_exodus: [["friend_abroad_thriving", { go_abroad_job: 1.5 }], ["friend_left_lonely", { stay: 1.3 }]],
    T2005_online_shop: [["friend_startup_success", { open_shop: 1.4 }], ["friend_startup_fail", { no_shop: 1.4 }]],
    T2010_overtime_culture: [["friend_burnout", { clock_out: 1.6, change_company: 1.6 }]],
    E2025_ai_wave: [["colleague_laid_off", { reskill_ai: 1.5 }]],
    T2020_pets_not_kids: [["friend_childfree_happy", { adopt_pet: 1.3 }], ["friend_happy_parent", { plan_kids: 1.4 }]],
    F2050_remote_return_home: [["friend_returned_home", { go_home: 1.4 }]],
    F2058_elder_care_choice: [["neighbor_died_alone", { move_child: 1.4 }]],
    F2048_midlife_pivot: [["friend_startup_success", { pivot: 1.3 }], ["colleague_laid_off", { pivot: 1.3 }]]
  };
  // 每段人生在 2026 年後走一條隱藏的未來世界線：決定哪些未來事件較可能發生、未來抉擇的成敗機率
  const WORLD_LINE_AXES = {
    ai: { label: "AI 發展", values: { fast: { w: 0.5, name: "AI 快速普及" }, slow: { w: 0.5, name: "AI 進展趨緩" } } },
    climate: { label: "氣候", values: { mild: { w: 0.55, name: "氣候大致穩定" }, harsh: { w: 0.45, name: "極端氣候加劇" } } },
    economy: { label: "經濟", values: { boom: { w: 0.38, name: "經濟繁榮" }, stagnant: { w: 0.4, name: "長期停滯" }, crisis: { w: 0.22, name: "金融危機頻仍" } } },
    geo: { label: "兩岸與國際", values: { calm: { w: 0.55, name: "兩岸大致和緩" }, tense: { w: 0.45, name: "區域局勢緊張" } } },
    demo: { label: "人口", values: { rebound: { w: 0.3, name: "生育率回升" }, decline: { w: 0.7, name: "人口持續萎縮" } } }
  };
  const ORIGIN_LABELS = {
    minnan: "閩南家庭",
    hakka: "客家家庭",
    waisheng: "外省家庭",
    indigenous: "原住民家庭",
    new_immigrant: "新住民家庭（母親來自東南亞或中國大陸）"
  };
  // 性格對既有抉擇的偏好：在時代加權之上再乘一層（「switch_*」= 所有轉職選項）
  const TRAIT_BIAS = {
    D05_graduation_crossroads: { risk_taker: { study_abroad: 1.5 }, workaholic: { domestic_master: 1.2 } },
    D06_northbound_migration: { risk_taker: { move_north: 1.4 }, workaholic: { move_north: 1.3 }, sociable: { move_north: 1.15 }, family_first: { stay_home: 1.6 } },
    D07B_career_switch: { risk_taker: { "switch_*": 1.6 }, cautious: { stay_current_grow: 1.5 }, workaholic: { "switch_*": 1.2 } },
    D08_overseas_assignment: { risk_taker: { accept_expat: 1.8 }, workaholic: { accept_expat: 1.5 }, family_first: { decline_stay: 1.8 } },
    D09_return_hometown_dilemma: { family_first: { return_home: 2.0 }, workaholic: { stay_north: 1.4 } },
    D10_unpaid_leave: { cautious: { gig_side_job: 1.3, borrow_credit: 0.5 }, risk_taker: { resign_retrain: 1.6 } },
    D13_buying_home: { cautious: { buy_suburb: 1.3, buy_core_40yr: 0.7 }, risk_taker: { buy_core_40yr: 1.4 }, family_first: { buy_suburb: 1.2 } },
    D15_stock_crash_panic: { cautious: { panic_sell: 1.6, buy_the_dip: 0.5 }, risk_taker: { buy_the_dip: 2.2, panic_sell: 0.7 }, sensitive_introvert: { panic_sell: 1.4 } },
    D17B_romance_encounter: { sociable: { start_romance: 1.25 }, sensitive_introvert: { start_romance: 0.85 } },
    D20_marriage_crisis: { family_first: { endure_for_kids: 1.6, divorce: 0.6 }, risk_taker: { divorce: 1.3 } },
    D21_child_education_race: { workaholic: { private_cram: 1.4 }, cautious: { private_cram: 1.2 } },
    D23_pandemic_dilemma: { cautious: { strict_stay_home: 1.7 }, sensitive_introvert: { strict_stay_home: 1.4 }, sociable: { keep_working: 1.4 } },
    D24_elderly_care_storm: { family_first: { quit_fulltime_care: 2.2, share_with_siblings: 1.2 }, workaholic: { hire_caregiver: 1.5 } },
    D25_retirement_timing: { workaholic: { second_career: 1.8, early_fire: 0.6 }, cautious: { second_career: 1.2 }, family_first: { standard_retire: 1.2 } },
    D29_child_study_abroad: { family_first: { fund_abroad_full: 1.5, mortgage_home_for_child: 1.5 }, cautious: { cannot_afford_abroad: 1.3 } }
  };
  const FIRE_ASSET_THRESHOLD_2025 = 15000000;
  const WAGE_K = 0.73;

  class TaiwanLifeEngine {
    constructor(data) {
      this.data = data;
      this.regionMap = Object.fromEntries(data.regions.regions.map((r) => [r.id, r]));
      this.eventMap = Object.fromEntries(data.events.events.map((e) => [e.id, e]));
      this.abroadCountryMap = Object.fromEntries(
        ((data.studyAbroad && data.studyAbroad.countries) || []).map((c) => [c.id, c])
      );
    }

    getRegion(id) {
      return this.regionMap[id] || this.data.regions.regions[0];
    }

    getAbroadCountry(id) {
      return this.abroadCountryMap[id] || null;
    }

    getEduEra(year) {
      const list = (this.data.educationCareers && this.data.educationCareers.education_eras) || [];
      return list.find((e) => year >= e.year_range[0] && year <= e.year_range[1]) || list[list.length - 1] || null;
    }

    getCultureEra(year) {
      const list = (this.data.cultureEras && this.data.cultureEras.era_atmospheres) || [];
      return list.find((e) => year >= e.year_range[0] && year <= e.year_range[1]) || list[list.length - 1] || null;
    }



    getMarketYear(year) {
      const mh = this.data.marketHistory;
      if (!mh) return { price_pct: 0.075, div_yield: 0.036, max_drawdown: -0.10, housing_pct: 0.02, note: "" };
      const rec = mh.taiex_annual && mh.taiex_annual[String(year)];
      if (rec) {
        return {
          price_pct: rec.price_pct,
          div_yield: rec.div_yield != null ? rec.div_yield : (mh.meta.default_dividend_yield || 0.036),
          max_drawdown: rec.max_drawdown != null ? rec.max_drawdown : Math.min(0, rec.price_pct - 0.08),
          housing_pct: rec.housing_pct != null ? rec.housing_pct : 0.02,
          note: rec.note || "",
          isHistorical: true
        };
      }
      if (year < 1967) {
        return { price_pct: 0.06, div_yield: 0.03, max_drawdown: -0.08, housing_pct: 0.05, note: "", isHistorical: false };
      }
      // Post-2026 stochastic projection (calibrated ~6.2% nominal total return + ~10% cyclical bear pullback)
      const vol = mh.meta.post_2026_stock_vol || 0.16;
      const mean = mh.meta.post_2026_stock_mean != null ? mh.meta.post_2026_stock_mean : 0.032;
      const isBearCycle = Math.random() < 0.10;
      const rawPct = isBearCycle
        ? -(0.18 + Math.random() * 0.14)
        : (mean + (Math.random() - 0.5) * vol * 1.9);
      const pct = +clamp(rawPct, -0.35, 0.28).toFixed(3);
      return {
        price_pct: pct,
        div_yield: mh.meta.post_2026_div_yield != null ? mh.meta.post_2026_div_yield : 0.030,
        max_drawdown: pct < 0 ? clamp(pct - 0.08, -0.45, 0) : -0.08,
        housing_pct: +((mh.meta.post_2026_housing_mean != null ? mh.meta.post_2026_housing_mean : 0.015) + (Math.random() - 0.5) * 0.04).toFixed(3),
        note: isBearCycle ? "全球景氣循環回檔，台股進入修正期" : "",
        isHistorical: false
      };
    }

    // Non-tradable prices (medical bills, weddings, courses) moved with local wages, not just CPI
    wageScale(era) {
      return clamp(((era.avg_monthly_wage_twd || 48000) / Math.max(0.07, era.cpi)) / 62500, 0.16, 1.15);
    }

    getVehicleCostNominal(type, era) {
      const realWageRatio = clamp(((era.avg_monthly_wage_twd || 48000) / Math.max(0.07, era.cpi)) / 62500, 0.35, 1.15);
      // Cars were relatively much more expensive before 1985; scooters always accessible
      const carEraMult = era.year < 1980 ? 1.55 : (era.year < 1995 ? 1.20 : 1.0);
      const base2025 = type === "car" ? Math.round(780000 * carEraMult) : 85000;
      return Math.round(base2025 * realWageRatio * era.cpi);
    }

    getOwnedAssetResaleNominal(life, kind, era) {
      const oa = life.ownedAssets || {};
      if (kind === "vehicle" && oa.vehicle) {
        const ageYrs = Math.max(0, life.currentYear - (oa.vehicle.acquiredYear || life.currentYear));
        const dep = Math.max(0.22, Math.pow(0.86, ageYrs));
        return Math.round((oa.vehicle.baseValue2025 || 0) * dep * era.cpi);
      }
      if (kind === "valuables" && oa.valuables) {
        // Gold / heirloom jewelry retains value well against inflation
        return Math.round((oa.valuables.baseValue2025 || 0) * 0.92 * era.cpi);
      }
      return 0;
    }

    // 匯出一段人生的完整除錯資料（逐年屬性、資產結構、事件、抉擇與門檻判定）
    buildLifeExport(life, meta) {
      const era = this.getEraParams(life.currentYear || life.birthYear || 2025);
      const flags = life.flags || {};
      const feed = (life.feed || []).slice().reverse().map((f) => ({ year: f.year, age: f.age, type: f.type, title: f.title || "", text: f.text || "", impactChips: f.impactChips || undefined }));
      return {
        exportVersion: 1,
        exportedAt: new Date().toISOString(),
        app: meta || {},
        notes: "金額欄位 *Nom 為當年名目新台幣；*Real2025 為折合 2025 年購買力（名目 ÷ cpi）。",
        profile: {
          id: life.id, name: life.name, sex: life.sex, birthYear: life.birthYear, endYear: life.currentYear, age: life.age,
          alive: life.alive, birthRegionId: life.birthRegionId, regionId: life.regionId, location: life.location,
          quintile: life.quintile, quintileLabel: life.quintileLabel, family: life.family,
          personalities: (life.personalities || []).map((p) => p.name || p),
          education: life.education, job: life.job, careerId: life.careerId,
          married: life.married, children: life.children, homeowner: life.homeowner, homeSource: flags.home_source || null,
          causeOfDeath: life.causeOfDeath || null, worldLine: (life.futureWorld && life.futureWorld.line) || null
        },
        finalFinance: this.financeSnapshot(life, era),
        financialBarriers: flags.financialBarriers || [],
        financialBarrierLog: flags.financialBarrierLog || [],
        homeAcquisitions: flags.homeAcquisitions || [],
        yearly: life.trajectory || [],
        decisions: life.debugDecisions || [],
        decisionHistory: life.decisionHistory || [],
        salaryHistory: (life.salaryHistory || []).slice().reverse(),
        marketLog: life.marketLogSummary || [],
        milestones: life.milestones || [],
        events: feed,
        flags
      };
    }

    getNetWorthNominal(life) {
      const era = this.getEraParams(life.currentYear || life.birthYear || 2025);
      const homeEq = life.homeowner ? Math.max(0, (life.homeValueNominal || 0) - (life.mortgageBalanceNominal || 0)) : 0;
      const vehVal = this.getOwnedAssetResaleNominal(life, "vehicle", era);
      const valVal = this.getOwnedAssetResaleNominal(life, "valuables", era);
      return Math.round((life.moneyNominal || 0) + (life.stockNominal || 0) + homeEq + vehVal + valVal - (life.studentLoanNominal || 0));
    }

    isSelfEmployed(life) {
      return ["car_farmer_fisher", "car_sme_boss", "car_craft_apprentice", "car_creator_ecom", "car_gig_delivery"].includes(life.careerId);
    }

    isStudentNow(life) {
      if (life.flags.hs_tier === "work_early" && !life.education.includes("在學")) return false;
      if (life.education.includes("在學") || life.flags.in_grad_school_years > 0 || life.flags.retaking_exam) return true;
      return life.age >= 15 && life.age < 18 && ["top_hs", "normal_hs", "vocational"].includes(life.flags.hs_tier);
    }

    // Career label group used to keep decision wording consistent with what the protagonist actually does
    getCareerWordingGroup(life) {
      const id = life.careerId;
      if (["car_hsinchu_semi", "car_software_remote"].includes(id)) return "tech";
      if (id === "car_farmer_fisher") return "farm";
      if (id === "car_civil_teacher") return "civil";
      if (["car_sme_boss", "car_craft_apprentice", "car_creator_ecom", "car_gig_delivery"].includes(id)) return "self";
      return "default";
    }

    // Only reveal the parts of an event's aftermath that have already happened in the player's timeline
    visibleAftermath(text, currentYear) {
      if (!text) return "";
      const parts = String(text).split(/(?<=[；。])/);
      const kept = parts.filter((p) => !(p.match(/(?:19[5-9]\d|20\d\d|21[0-4]\d)(?=\s?年|[）)、，])/g) || []).some((y) => Number(y) > currentYear));
      const hidden = kept.length < parts.length;
      const body = kept.join("").replace(/；$/, "。");
      return body + (hidden ? (body ? "（其餘影響，要等時間揭曉）" : "這件事的影響，要等時間揭曉。") : "");
    }

    resumeCareer(life) {
      const cars = (this.data.educationCareers && this.data.educationCareers.careers) || [];
      const c = cars.find((x) => x.id === life.careerId);
      if (!c) return false;
      life.sector = life.sector || this.getCareerDisplayName(c, life.currentYear);
      life.job = life.flags.rank_title || life.sector;
      return true;
    }

    getLiquidNominal(life) {
      return Math.round((life.moneyNominal || 0) + (life.stockNominal || 0));
    }

    getHomeCostSpec(life, tier, era) {
      const th = (this.data.marketHistory && this.data.marketHistory.financial_thresholds_2025) || {};
      const reg = this.getRegion(life.regionId);
      const ratio = reg.house_price_to_income_ratio.regional_avg || 9.5;
      // Anchor household income to contemporary era average wage (1.45x avg annual wage ≈ dual/1.5-earner household)
      const eraHH = Math.round((era.avg_monthly_wage_twd || 48000) * 12 * 1.45);
      const tierMult = tier === "suburb" ? (th.suburb_price_discount || 0.72) : 1.0;
      // Reflect historical Taiwan house-price-to-income curve (4-6x before 1986, surge 1987-90, dip 1991-03, peak 2016+)
      let eraRatioScale = 1.0;
      if (life.currentYear < 1986) eraRatioScale = 0.48;
      else if (life.currentYear <= 1990) eraRatioScale = 0.82;
      else if (life.currentYear <= 2003) eraRatioScale = 0.66;
      else if (life.currentYear <= 2015) eraRatioScale = 0.86;
      else eraRatioScale = 1.0;

      const totalPrice = Math.round(eraHH * ratio * eraRatioScale * tierMult);
      const dpRate = life.currentYear >= 2023 ? (th.downpayment_ratio_new_youth_2023 || 0.15) : (th.downpayment_ratio_standard || 0.20);
      const downpayment = Math.round(totalPrice * dpRate);
      // Q4/Q5 parental downpayment support
      const parentHelp = life.family.parentsAlive ? Math.round(downpayment * ([0, 0, 0.06, 0.14, 0.28, 0.5][life.quintile] || 0)) : 0;
      const requiredOwnCash = Math.max(0, downpayment - parentHelp);
      const loanAmount = Math.max(0, totalPrice - downpayment);
      const termYears = life.currentYear >= 2023 ? 35 : 25;
      const annualPayment = Math.round(loanAmount * (0.022 + 1 / termYears));
      const minAnnualIncome = Math.round(annualPayment / (th.mortgage_max_dti || 0.50));
      return { totalPrice, downpayment, parentHelp, requiredOwnCash, loanAmount, annualPayment, minAnnualIncome };
    }

    getMedicalSelfPayNominal(life, era) {
      const th = (this.data.marketHistory && this.data.marketHistory.financial_thresholds_2025) || {};
      const hasNHI = this.hasSwitch(life.currentYear, "nhi_universal_healthcare") && life.location === "TAIWAN";
      const base2025 = hasNHI ? (th.med_advanced_post_1995 || 750000) : (th.med_advanced_pre_1995 || 2400000);
      return Math.round(base2025 * Math.min(1, this.wageScale(era) * 1.1) * era.cpi);
    }

    recordFinancialBarrier(life, era, label, detail) {
      if (!life.flags.financialBarriers) life.flags.financialBarriers = [];
      const entry = `${life.age} 歲（${life.currentYear} 年）：${label}`;
      if (!life.flags.financialBarriers.includes(entry)) {
        life.flags.financialBarriers.push(entry);
        // 結構化紀錄：當下的資產快照，方便除錯與事後檢查「門檻判定是否和期末資產矛盾」
        if (!life.flags.financialBarrierLog) life.flags.financialBarrierLog = [];
        life.flags.financialBarrierLog.push({ ...this.financeSnapshot(life, era), label, detail: detail || "" });
      }
    }

    // 某一刻的財務快照（名目與折合 2025 購買力）
    financeSnapshot(life, era) {
      const cpi = Math.max(0.07, era.cpi);
      const homeEq = life.homeowner ? Math.max(0, (life.homeValueNominal || 0) - (life.mortgageBalanceNominal || 0)) : 0;
      const spouseInc = (life.married && life.spouse && !life.spouse.retired) ? (life.spouse.incomeNominal || 0) : 0;
      const nw = this.getNetWorthNominal(life);
      return {
        age: life.age, year: life.currentYear, cpi: +cpi.toFixed(4),
        cashNom: Math.round(life.moneyNominal || 0), stockNom: Math.round(life.stockNominal || 0),
        homeowner: Boolean(life.homeowner), homeValueNom: Math.round(life.homeValueNominal || 0),
        mortgageNom: Math.round(life.mortgageBalanceNominal || 0), homeEqNom: Math.round(homeEq),
        salaryNom: Math.round(life.annualSalaryNominal || 0), spouseIncomeNom: Math.round(spouseInc),
        netWorthNom: nw, netWorthReal2025: Math.round(nw / cpi)
      };
    }

    // 取得自住房時，回頭在「無力購屋」的轉折後面註明後來怎麼有房的，避免敘事和期末房產互相矛盾
    noteHomeAcquired(life, source) {
      life.flags.homeAcquisitions = life.flags.homeAcquisitions || [];
      life.flags.homeAcquisitions.push({ age: life.age, year: life.currentYear, source, valueNom: Math.round(life.homeValueNominal || 0) });
      const bars = life.flags.financialBarriers || [];
      for (let i = 0; i < bars.length; i++) {
        if (bars[i].includes("無力購屋") && !bars[i].includes("→")) {
          bars[i] += ` → 後於 ${life.age} 歲（${life.currentYear} 年）${source}取得自住房`;
        }
      }
    }

    spendLiquid(life, amountNominal) {
      let rem = Math.round(Math.max(0, amountNominal));
      if (life.moneyNominal >= rem) {
        life.moneyNominal -= rem;
        return;
      }
      if (life.moneyNominal > 0) {
        rem -= life.moneyNominal;
        life.moneyNominal = 0;
      }
      if (life.stockNominal >= rem) {
        life.stockNominal -= rem;
        return;
      }
      rem -= Math.max(0, life.stockNominal);
      life.stockNominal = 0;
      life.moneyNominal -= rem;
    }

    drawPersonalities() {
      const pool = (this.data.cultureEras && this.data.cultureEras.personality_traits) || [];
      if (!pool.length) return [];
      const first = pick(pool);
      const rest = pool.filter((x) => {
        if (x.id === first.id) return false;
        if ((first.id === "cautious" && x.id === "risk_taker") || (first.id === "risk_taker" && x.id === "cautious")) return false;
        if ((first.id === "sociable" && x.id === "sensitive_introvert") || (first.id === "sensitive_introvert" && x.id === "sociable")) return false;
        return true;
      });
      const second = rest.length ? pick(rest) : null;
      return second ? [first, second] : [first];
    }

    // Historical Mode: evaluate if protagonist directly becomes a party to a major historical event
    evaluateProtagonistInvolvement(life, ev, era) {
      const rule = ev.protagonist_involvement;
      if (!rule || life.location !== "TAIWAN") return null;

      // Age check
      if (rule.age_range && (life.age < rule.age_range[0] || life.age > rule.age_range[1])) return null;

      // Region check
      const regHit = rule.regions.includes("ALL") || rule.regions.includes(life.regionId);
      const eastSpecial = (rule.exp_tags || []).includes("east_origin_or_resident") &&
        (life.birthRegionId === "east_islands" || life.regionId === "east_islands");
      if (!regHit && !eastSpecial) return null;

      // Mandatory experience gates for specific events so involvement is realistic
      const expTags = rule.exp_tags || [];
      const matchedExpLabels = [];
      const hasTag = (tag) => {
        if (tag === "has_savings") return life.moneyNominal > 120000 * era.cpi;
        if (tag === "has_stocks") return life.stockNominal > 0;
        if (tag === "homeowner") return Boolean(life.homeowner);
        if (tag === "higher_ed") return life.eduLevel >= 4;
        if (tag === "has_children") return life.children > 0;
        if (tag === "healthcare_sector") return Boolean(life.sector && (life.sector.includes("醫療") || life.sector.includes("醫") || life.sector.includes("護理")));
        if (tag === "finance_sector") return Boolean(life.sector && (life.sector.includes("金融") || life.sector.includes("證券") || life.sector.includes("銀行")));
        if (tag === "tourism_sector") return Boolean(life.sector && (life.sector.includes("觀光") || life.sector.includes("旅宿") || life.sector.includes("餐飲")));
        if (tag === "in_military") return life.sex === "M" && (life.flags.military_gap_years > 0 || (life.age >= 20 && life.age <= 24));
        if (tag === "low_quintile") return life.quintile <= 2;
        if (tag === "east_origin_or_resident") return life.birthRegionId === "east_islands" || life.regionId === "east_islands";
        return false;
      };

      const tagLabelMap = {
        has_savings: "擁有積蓄",
        has_stocks: "持有股票資產",
        homeowner: "自購房產",
        higher_ed: "大專以上學歷",
        has_children: "育有子女",
        healthcare_sector: "醫療照護從業背景",
        finance_sector: "金融相關經歷",
        tourism_sector: "觀光旅宿從業",
        in_military: "服役／役齡經歷",
        low_quintile: "經濟資源較緊",
        east_origin_or_resident: "花東原籍或居住"
      };

      // Hard gates for highly specific roles
      if (expTags.includes("in_military") && !hasTag("in_military")) return null;
      if (expTags.includes("has_children") && !hasTag("has_children")) return null;
      if (expTags.includes("has_stocks") && ev.id === "EV_2004_procomp_scandal" && !hasTag("has_stocks")) return null;
      if (expTags.includes("east_origin_or_resident") && !hasTag("east_origin_or_resident")) return null;

      // Two-track historical mode: cap single-point tragedies to <= 1 per lifetime
      const isIncident = rule.pi_track === "incident";
      if (isIncident && (life.flags.incident_pi_count || 0) >= 1) return null;

      // Default odds are low; personality, place and experience are what make someone a likely target
      let prob = (rule.base_prob || (isIncident ? 0.012 : 0.08)) * (isIncident ? 0.35 : 0.4);
      const matchedTraitLabels = [];

      // Personality trait multipliers
      const tMultMap = rule.trait_mult || {};
      for (const tr of (life.personalities || [])) {
        if (tMultMap[tr.id] != null) {
          prob *= tMultMap[tr.id];
          if (tMultMap[tr.id] > 1.0) matchedTraitLabels.push(tr.name);
        }
      }

      // Experience multipliers
      for (const tag of expTags) {
        if (hasTag(tag)) {
          prob *= isIncident ? 1.7 : 1.9;
          matchedExpLabels.push(tagLabelMap[tag] || tag);
        }
      }

      // Slight proximity boost if specifically in primary non-ALL region
      if (!rule.regions.includes("ALL") && rule.regions.includes(life.regionId)) {
        prob *= 1.5;
      }

      prob = isIncident ? clamp(prob, 0.0005, 0.02) : clamp(prob, 0.002, 0.2);
      if (Math.random() >= prob) return null;

      if (isIncident) {
        life.flags.incident_pi_count = (life.flags.incident_pi_count || 0) + 1;
      }

      // Pick outcome
      const outcome = weightedPick(rule.outcomes, (o) => o.weight || 1);
      const regName = this.getRegion(life.regionId).name_zh;
      const reasonParts = [`地理位置（${regName}）`];
      if (matchedTraitLabels.length) reasonParts.push(`個性（${matchedTraitLabels.join("、")}）`);
      if (matchedExpLabels.length) reasonParts.push(`經歷（${matchedExpLabels.join("、")}）`);

      // Apply outcome effects to protagonist
      const impactSummary = [];
      if (outcome.money_ratio_delta) {
        const before = life.moneyNominal;
        if (before > 0) {
          const loss = Math.round(before * Math.abs(outcome.money_ratio_delta));
          life.moneyNominal = Math.round(before * (1 + outcome.money_ratio_delta));
          impactSummary.push(`現金資產減少約 NT$${loss.toLocaleString()}`);
        } else if (life.age >= 18 && ((life.workYears || 0) > 0 || life.flags.part_time_approved)) {
          const flatLoss = Math.round(250000 * era.cpi * Math.abs(outcome.money_ratio_delta));
          life.moneyNominal -= flatLoss;
          impactSummary.push(`新增損失約 NT$${flatLoss.toLocaleString()}`);
        }
      }
      if (outcome.stock_ratio_delta && life.stockNominal > 0) {
        const sLoss = Math.round(life.stockNominal * Math.abs(outcome.stock_ratio_delta));
        life.stockNominal = Math.max(0, Math.round(life.stockNominal * (1 + outcome.stock_ratio_delta)));
        impactSummary.push(`股票資產蒸發約 NT$${sLoss.toLocaleString()}`);
      }
      if (outcome.extra_debt_2025 && life.age >= 18) {
        const debtNom = Math.round(outcome.extra_debt_2025 * era.cpi);
        life.moneyNominal -= debtNom;
        impactSummary.push(`背負額外債務約 NT$${debtNom.toLocaleString()}`);
      }
      if (outcome.lose_home && life.homeowner && life.age >= 18) {
        life.homeowner = false;
        life.homeValueNominal = 0;
        life.mortgageDTI = 0;
        life.mortgageBalanceNominal = Math.round((life.mortgageBalanceNominal || 0) * 0.4);
        impactSummary.push("自購房屋受毀或遭法拍");
      }
      if (outcome.heavy_debt && life.age >= 18) life.flags.heavy_debt = true;
      if (outcome.job_lost && life.age >= 18) {
        life.flags.unemployed = true;
        life.flags.temp_unemployed_years = 1;
        life.job = "重大事件後職涯中斷";
        impactSummary.push("職涯中斷／失業");
      }
      if (outcome.force_relocate) {
        const others = this.data.regions.regions.map((r) => r.id).filter((id) => id !== life.regionId);
        const dest = pick(others);
        life.regionId = dest;
        life.migrated = dest !== life.birthRegionId;
        impactSummary.push(`被迫遷徙至${this.getRegion(dest).name_zh}`);
      }
      if (outcome.health_delta) {
        life.stats.health += outcome.health_delta;
        impactSummary.push(`健康 ${outcome.health_delta}`);
      }
      if (outcome.happiness_delta) {
        life.stats.happiness += outcome.happiness_delta;
        impactSummary.push(`幸福 ${outcome.happiness_delta}`);
      }
      if (outcome.knowledge_delta) life.stats.knowledge += outcome.knowledge_delta;
      if (outcome.social_delta) life.stats.social += outcome.social_delta;
      if (outcome.set_flag) life.flags[outcome.set_flag] = true;

      if (outcome.fatal) {
        impactSummary.push("致命生命損失");
      }

      const record = {
        eventId: ev.id,
        year: life.currentYear,
        roc: era.roc,
        age: life.age,
        title: ev.title,
        narrative: outcome.narrative,
        reasons: reasonParts.join(" × "),
        impacts: impactSummary.join("、") || "人生軌跡重大轉折",
        fatal: Boolean(outcome.fatal),
        deathCause: outcome.death_cause || ev.title,
        aftermath: ev.institutional_aftermath,
        cultural_footnote_en: ev.cultural_footnote_en,
        sources: ev.sources
      };
      life.protagonistEvents.push(record);
      return record;
    }

    getCareerDisplayName(career, year) {
      if (!career) return "";
      if (career.id === "car_epz_worker") return year < 1966 ? "紡織／食品工廠工人" : year <= 1995 ? "加工出口區作業員／紡織成衣員" : "科技廠／工廠作業員";
      if (career.id === "car_export_sales" && year > 2005) return "國外業務／採購專員";
      if (career.id === "car_creator_ecom" && year < 2017) return "自媒體／網拍電商經營者";
      if (career.id === "car_service_worker" && year < 1980) return "店員／服務員／雜工";
      if (career.id === "car_tourism_hospitality" && year < 1985) return "旅社／餐館從業人員";
      if (career.id === "car_hsinchu_semi" && year < 1995) return "電子／半導體工程師";
      if (career.id === "car_hsinchu_semi" && year < 2018) return "半導體／IC 設計／科技工程師";
      if (career.id === "car_healthcare_ltc" && year < 2007) return "醫療護理師／醫院照護員";
      return career.name;
    }

    isCareerEligibleForLife(life, c) {
      if (!c) return false;
      if (life.flags.disability_level === "severe" && PHYSICAL_CAREERS.includes(c.id)) return false;
      if (life.flags.disability_level === "mild" && HEAVY_CAREERS.includes(c.id)) return false;
      if (life.currentYear < c.era_range[0] || life.currentYear > c.era_range[1]) return false;
      if (life.eduLevel < c.min_edu_level) return false;
      if (Array.isArray(c.required_majors) && c.required_majors.length) {
        if (life.eduLevel < 4) return false;
        const hasMajor = Boolean(life.major && c.required_majors.includes(life.major));
        const hasCross = Boolean(c.allow_cross_coding && life.flags && life.flags.uni_cross_coding);
        if (!hasMajor && !hasCross) return false;
      }
      if (Array.isArray(c.required_sub_majors) && c.required_sub_majors.length) {
        const hasSub = c.required_sub_majors.includes(life.subMajor || life.major);
        const hasCross2 = Boolean(c.allow_cross_coding && life.flags && life.flags.uni_cross_coding);
        if (life.eduLevel < 4 || (!hasSub && !hasCross2)) return false;
      }
      if (c.max_edu_level != null && life.eduLevel > c.max_edu_level) return false;
      if (Array.isArray(c.required_majors_if_uni) && c.required_majors_if_uni.length && life.eduLevel >= 4) {
        if (!life.major || !c.required_majors_if_uni.includes(life.major)) return false;
      }
      return true;
    }

    // Get era- and education-eligible Taiwan careers sorted by fit (major, region, skills)
    getEligibleCareers(life, excludeCareerId = null) {
      const careers = (this.data.educationCareers && this.data.educationCareers.careers) || [];
      if (!careers.length) return [];
      let eligible = careers.filter((c) =>
        this.isCareerEligibleForLife(life, c) &&
        (!excludeCareerId || c.id !== excludeCareerId)
      );
      if (!eligible.length) {
        eligible = careers.filter((c) =>
          !c.required_majors && !c.required_majors_if_uni && !c.required_sub_majors && !c.entry &&
          (!excludeCareerId || c.id !== excludeCareerId)
        );
      }
      const scored = eligible.map((c) => {
        let score = (c.pick_weight != null ? c.pick_weight - 1 : 0) * 0.5;
        if (c.required_sub_majors && c.required_sub_majors.includes(life.subMajor || life.major)) score += 3;
        if (life.major && c.preferred_majors.includes(life.major)) score += 3;
        if (c.preferred_regions.includes(life.regionId)) score += 2;
        if (life.flags && life.flags.uni_cross_coding && (c.id === "car_software_remote" || c.id === "car_hsinchu_semi")) score += 1;
        if (life.flags && life.flags.master_craftsman && c.id === "car_craft_apprentice") score += 3;
        return { career: c, sortKey: score + Math.random() * 1.4 };
      });
      scored.sort((a, b) => b.sortKey - a.sortKey);
      return scored.map((x) => x.career);
    }

    // Single salary formula shared by estimates and actual pay (calibrated to 2024 DGBAS median 546k / mean 732k)
    baseSalaryNominal(life, era, reg, careerMult) {
      const eduMult = life.eduLevel >= 5 ? 1.12 : life.eduLevel === 4 ? 1.0 : life.eduLevel === 3 ? 0.91 : 0.84;
      const yrs = Math.min(Math.max(1, life.workYears || 1), 25);
      const expMult = 0.84 + yrs * 0.0145;
      const ageMult = life.age > 55 ? Math.max(0.82, 1 - (life.age - 55) * 0.012) : 1.0;
      let jobCap = 1.28;
      if (life.flags.career_ceiling_local && !["north_taipei", "north_hsinchu"].includes(life.regionId)) jobCap = 1.14;
      const jobMult = clamp((life.flags && life.flags.wage_mult) || 1.0, 0.55, jobCap);
      const focusMult = life.focus === "work" ? 1.06 : life.focus === "family" ? 0.98 : 1.0;
      const regMult = 1 + (((reg && reg.income_multiplier) || 1.0) - 1) * 0.7;
      const annual = era.avg_monthly_wage_twd * 12 * regMult * careerMult * eduMult * expMult * ageMult * jobMult * focusMult * WAGE_K;
      return Math.max(era.min_wage_twd * 12, annual);
    }

    getLicensePassProb(life, car) {
      const base = this.interpByYear(car.pass_rate_points || [[1955, 0.05], [1990, 0.08], [2011, 0.12], [2100, 0.12]], life.currentYear);
      return clamp(base + (life.stats.knowledge - 70) * 0.007 + (life.flags.uni_civil_prep ? 0.08 : 0), 0.03, 0.5);
    }

    estimateCareerMonthlySalary(life, career, era, reg) {
      if (!career) return 0;
      const midMult = (career.salary_mult_min + career.salary_mult_max) / 2;
      const estAnnual = this.baseSalaryNominal(life, era, reg, midMult);
      return Math.round(estAnnual / 12 / 1000) * 1000;
    }

    filterEraTexts(list, year, life = null, isWorking = false) {
      if (!Array.isArray(list)) return [];
      const out = [];
      for (const item of list) {
        if (typeof item === "string") {
          out.push(item);
        } else if (item && typeof item === "object" && item.text) {
          const minY = item.min_year != null ? item.min_year : -Infinity;
          const maxY = item.max_year != null ? item.max_year : Infinity;
          if (year < minY || year > maxY) continue;
          if (life) {
            if (item.min_age != null && life.age < item.min_age) continue;
            if (item.max_age != null && life.age > item.max_age) continue;
            if (item.requires_working && !isWorking && (life.workYears || 0) < 1) continue;
            if (item.requires_parents_alive && !(life.family && life.family.parentsAlive)) continue;
            if (item.requires_student && !this.isStudentNow(life)) continue;
            if (item.requires_renter && (life.homeowner || life.flags.stay_home || life.flags.lives_with_parents)) continue;
          }
          out.push(item.text);
        }
      }
      return out;
    }

    getOverseasCommChannel(year) {
      if (year < 1970) return "航空家書與越洋接線長途電話";
      if (year < 1990) return "航空郵簡、越洋電話卡與傳真機";
      if (year < 1993) return "越洋電話、傳真與航空書信";
      if (year < 1999) return "越洋電話、傳真與早期 BBS／電子郵件";
      if (year < 2003) return "BBS／PTT 看板與 MSN 即時通";
      if (year < 2010) return "BBS／PTT、MSN 即時通與 Skype 網路電話";
      if (year < 2012) return "Facebook、Skype 與即時通訊";
      return "LINE 家族群組、即時視訊與台灣社群媒體";
    }

    interpByYear(points, year) {
      if (year <= points[0][0]) return points[0][1];
      for (let i = 0; i < points.length - 1; i++) {
        const [y0, v0] = points[i], [y1, v1] = points[i + 1];
        if (year <= y1) return v0 + (v1 - v0) * (year - y0) / (y1 - y0);
      }
      return points[points.length - 1][1];
    }

    drawDesiredKids(birthYear) {
      const mean = this.interpByYear([[1950, 3.5], [1960, 2.75], [1970, 2.15], [1980, 1.75], [1990, 1.55], [2005, 1.45], [2026, 1.5]], birthYear);
      const noise = (Math.random() + Math.random() + Math.random() - 1.5) * 1.5;
      return clamp(Math.round(mean + noise), 0, 5);
    }

    getTypicalMarriageAge(life) {
      const base = this.interpByYear([[1970, 24], [1980, 25.5], [1990, 27], [2000, 28.5], [2010, 30.5], [2024, 32], [2100, 33]], life.currentYear);
      return base + (life.sex === "M" ? 1.2 : -1.2);
    }

    // Partner / spouse is a real person: name, age, work status and income all feed the household
    createPartnerInfo(life, era) {
      const sex = life.sex === "M" ? "F" : "M";
      const gap = Math.round(Math.random() * 4.5 - 0.5);
      const birthYear = life.birthYear + (life.sex === "M" ? gap : -gap);
      const ownRatio = life.annualSalaryNominal > 0 ? life.annualSalaryNominal / (era.avg_monthly_wage_twd * 12) : 0.7;
      const spread = Math.exp((Math.random() + Math.random() + Math.random() - 1.5) * 0.75 - 0.32);
      const genderGap = sex === "F" ? this.interpByYear([[1970, 0.62], [1990, 0.7], [2010, 0.8], [2025, 0.85]], life.currentYear) : 1.0;
      return {
        name: this.generateName(sex, Math.max(1950, birthYear)),
        sex, birthYear, alive: true, retired: false, working: true,
        wageRatio: +clamp((0.35 * ownRatio + 0.65 * spread) * genderGap, 0.38, 1.9).toFixed(2),
        incomeNominal: 0
      };
    }

    spouseWorkProb(sp, life) {
      if (sp.sex === "M") return 0.94;
      const base = this.interpByYear([[1970, 0.36], [1980, 0.43], [1990, 0.5], [2000, 0.58], [2010, 0.67], [2020, 0.75], [2050, 0.82]], life.currentYear);
      const hasYoung = (life.childrenBirthYears || []).some((by) => life.currentYear - by >= 0 && life.currentYear - by < 6);
      return clamp(base - (hasYoung ? 0.14 : 0), 0.15, 0.9);
    }

    marry(life, era) {
      life.flags.focusPromptReason = "married";
      life.married = true;
      life.partner = true;
      life.spouse = life.partnerInfo || this.createPartnerInfo(life, era);
      life.partnerInfo = null;
      life.flags.ever_married = true;
      life.flags.widowed = false;
      life.spouse.working = Math.random() < this.spouseWorkProb(life.spouse, life);
      // Assets merge at marriage: remember what each side brought in and track who earns what afterwards
      life.flags.premarital_net = this.getNetWorthNominal(life);
      life.flags.premarital_cpi = this.getEraParams(life.currentYear).cpi;
      life.flags.marital_own_income = 0;
      life.flags.marital_spouse_income = 0;
      const stayProb = life.currentYear < 1980 ? 0.72 : life.currentYear < 2000 ? 0.5 : 0.26;
      if (life.flags.lives_with_parents && Math.random() > stayProb) life.flags.moved_out = true;
    }

    // Divorce: premarital assets stay with each side; assets built during the marriage are split by each side's income share
    divideMaritalAssets(life, era) {
      const own = life.flags.marital_own_income || 0;
      const sp = life.flags.marital_spouse_income || 0;
      const ownShare = own + sp > 0 ? clamp(own / (own + sp), 0.15, 0.85) : 0.5;
      const premarital = Math.round((life.flags.premarital_net || 0) * era.cpi / Math.max(0.07, life.flags.premarital_cpi || era.cpi));
      const net = this.getNetWorthNominal(life);
      const marital = net - premarital;
      const keep = Math.round(premarital + marital * ownShare);
      let homeNote = "";
      if (life.homeowner && ownShare < 0.5) {
        homeNote = "房子歸對方，";
        life.homeowner = false; life.homeValueNominal = 0; life.mortgageBalanceNominal = 0; life.mortgageAnnualPayment = 0;
      } else if (life.homeowner) {
        homeNote = "房子留給你，";
      }
      // Settle the difference in cash (and stocks first if cash runs short)
      const diff = keep - this.getNetWorthNominal(life);
      if (diff >= 0) life.moneyNominal += diff;
      else this.spendLiquid(life, -diff);
      ["premarital_net", "premarital_cpi", "marital_own_income", "marital_spouse_income"].forEach((k) => { delete life.flags[k]; });
      const pctOwn = Math.round(ownShare * 100);
      return { ownShare, note: `（婚前財產各自保留，婚後共同累積的財產依兩人收入貢獻分配：你 ${pctOwn}%、對方 ${100 - pctOwn}%；${homeNote}重新開始。）` };
    }

    endRelationship(life) {
      life.partner = false;
      life.partnerInfo = null;
      life.married = false;
      life.spouse = null;
      delete life.triggeredDecisions["D17B_romance_encounter"];
      delete life.triggeredDecisions["D18_marriage_choice"];
      life.flags.next_romance_age = life.age + 2;
    }

    // Returns the spouse's income for the year; handles retirement, career breaks and widowhood
    stepSpouse(life, era, eduMode) {
      if (!life.married) {
        if (life.partner && life.age >= 18) {
          const p = life.flags.military_gap_years >= 2 ? 0 : (life.flags.declined_marriage ? 0.07 : 0.045);
          if (Math.random() < p) {
            const nm = life.partnerInfo ? `與${life.partnerInfo.name}` : "與交往對象";
            this.endRelationship(life);
            life.stats.happiness -= 6;
            life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: `聚少離多、對未來想法不同，你${nm}決定分手，重新回到一個人的生活。` });
          }
        }
        return 0;
      }
      if (!life.spouse) life.spouse = this.createPartnerInfo(life, era);
      const sp = life.spouse;
      const spAge = life.currentYear - sp.birthYear;
      const { qx } = this.calcAnnualDeathProb({ age: clamp(spAge, 1, 104), sex: sp.sex, currentYear: life.currentYear, regionId: life.regionId, location: life.location, stats: { health: 68 }, flags: {} }, era);
      if (Math.random() < qx || spAge >= 103) {
        life.married = false; life.partner = false;
        life.spouse = null;
        life.flags.widowed = true;
        ["premarital_net", "premarital_cpi", "marital_own_income", "marital_spouse_income"].forEach((k) => { delete life.flags[k]; });
        life.flags.spouseLostAge = life.age;
        delete life.triggeredDecisions["D17B_romance_encounter"];
        delete life.triggeredDecisions["D18_marriage_choice"];
        life.flags.next_romance_age = life.age + 4;
        life.stats.happiness -= 15; life.stats.social -= 3;
        life.feed.unshift({
          type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
          text: `相伴多年的${sp.sex === "F" ? "妻子" : "先生"}${sp.name}（${spAge} 歲）離世。${life.children > 0 ? "你和孩子一起辦完後事，" : ""}家裡突然安靜了下來。`,
          highlight: true
        });
        return 0;
      }
      if (!sp.retired && spAge >= 58 + Math.round(sp.wageRatio * 3) && (spAge >= 66 || Math.random() < 0.22)) {
        sp.retired = true; sp.working = false;
        life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: `${sp.sex === "F" ? "太太" : "先生"}${sp.name}從職場退下來，家裡的收入與作息都要重新安排。` });
      }
      if (sp.retired) {
        sp.incomeNominal = Math.round(era.avg_monthly_wage_twd * 12 * (life.currentYear < 2009 ? 0.12 : 0.1 + 0.2 * Math.min(1.2, sp.wageRatio)));
      } else {
        if (Math.random() < 0.14 && !(life.flags.spouse_homemaker_until > life.currentYear)) sp.working = Math.random() < this.spouseWorkProb(sp, life);
        const exp = clamp(0.8 + (spAge - 24) * 0.012, 0.8, 1.1);
        sp.incomeNominal = sp.working ? Math.round(Math.max(era.min_wage_twd * 10, era.avg_monthly_wage_twd * 12 * sp.wageRatio * exp)) : 0;
      }
      return sp.incomeNominal;
    }

    // Father and mother age and pass away individually; the estate is settled after the second passing
    stepParents(life, era) {
      const fam = life.family;
      if (!fam.parentsAlive) return;
      if (life.age < 18) return;
      const inTW = life.location === "TAIWAN";
      for (const who of ["father", "mother"]) {
        if (!fam[who + "Alive"]) continue;
        const pAge = life.currentYear - fam[who + "BirthYear"];
        const { qx } = this.calcAnnualDeathProb({ age: clamp(pAge, 18, 104), sex: who === "father" ? "M" : "F", currentYear: life.currentYear, regionId: life.birthRegionId, location: "TAIWAN", stats: { health: 66 }, flags: {} }, era);
        if (!(Math.random() < qx || pAge >= 103)) continue;
        fam[who + "Alive"] = false;
        fam.parentPassedYear = life.currentYear;
        const label = who === "father" ? "父親" : "母親";
        const last = !fam.fatherAlive && !fam.motherAlive;
        life.stats.happiness -= 7;
        let note = "";
        if (last) {
          fam.parentsAlive = false;
          life.flags.monthly_care_cost_twd_2025 = 0;
          if (life.flags.fulltime_caregiver) this.endCaregiving(life, era);
          note = this.settleInheritance(life, era);
        }
        life.feed.unshift({
          type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
          text: (inTW ? `${label}以 ${pAge} 歲離世，你和家人一起送完最後一程。` : `台灣傳來${label}（${pAge} 歲）離世的消息，你趕回奔喪，內心充滿不捨。`) + (note ? " " + note : ""),
          highlight: Boolean(note)
        });
        if (!life.alive) return;
      }
    }

    endCaregiving(life, era) {
      life.flags.fulltime_caregiver = false;
      life.flags.caregiver_years = 0;
      life.flags.unemployed = false;
      if (life.age >= 62) {
        this.retireNow(life, "退休");
      } else if (this.resumeCareer(life)) {
        life.careerSalaryMult = +(life.careerSalaryMult * 0.82).toFixed(2);
        life.flags.switch_prompt = life.currentYear + 2;
      }
    }

    settleInheritance(life, era) {
      const heirs = Math.max(1, (life.family.siblings || 0) + 1);
      const ownRate = [0, 0.38, 0.62, 0.74, 0.84, 0.93][life.quintile] || 0.7;
      life.ownedAssets = life.ownedAssets || { vehicle: null, valuables: null };
      if (Math.random() < ownRate) {
        const spec = this.getHomeCostSpec({ ...life, regionId: life.birthRegionId }, "suburb", era);
        const value = Math.round(spec.totalPrice * ([0, 0.42, 0.5, 0.62, 0.8, 1.15][life.quintile] || 0.6));
        const wan = (n) => Math.round(n / 10000).toLocaleString();
        const livesThere = life.flags.lives_with_parents || life.regionId === life.birthRegionId;
        if (!life.homeowner && livesThere && (heirs === 1 || Math.random() < 1.8 / heirs)) {
          life.homeowner = true;
          life.homeValueNominal = value;
          life.mortgageBalanceNominal = 0;
          life.mortgageAnnualPayment = 0;
          life.flags.home_source = "繼承";
          this.noteHomeAcquired(life, "繼承老家");
          return `老家房子由你承接（估值約 NT$${wan(value)} 萬）。`;
        }
        const share = Math.round(value * 0.95 / heirs);
        life.moneyNominal += share;
        return heirs > 1 ? `手足商議後賣掉老家，你分得約 NT$${wan(share)} 萬。` : `老家出售後，你得到約 NT$${wan(share)} 萬。`;
      }
      if (life.quintile >= 3 && !life.ownedAssets.valuables && Math.random() < 0.45) {
        const val2025 = life.quintile >= 5 ? 360000 : (life.quintile === 4 ? 220000 : 120000);
        life.ownedAssets.valuables = { name: life.quintile >= 4 ? "長輩遺留傳家金飾與名錶" : "長輩遺留紀念金飾", baseValue2025: val2025, acquiredYear: life.currentYear, source: "繼承" };
        return `整理遺物時，你承接了「${life.ownedAssets.valuables.name}」（約值 NT$${Math.round(val2025 * era.cpi).toLocaleString()}）。`;
      }
      return "";
    }

    getPensionAge(life) {
      if (life.careerId === "car_civil_teacher") return life.currentYear < 2018 ? 55 : life.currentYear < 2032 ? 60 : 65;
      if (life.careerId === "car_farmer_fisher") return 65;
      if (life.currentYear < 2009) return life.sex === "F" ? 55 : 60;
      if (life.birthYear <= 1957) return 60;
      return clamp(60 + (life.birthYear - 1957), 60, 65);
    }

    retireNow(life, jobLabel) {
      life.flags.retired = true;
      life.flags.unemployed = false;
      life.flags.temp_unemployed_years = 0;
      life.flags.work_hours_high = false;
      life.job = jobLabel || "退休";
    }

    // Old-age income linked to occupation, seniority and the institutions of the day
    computePensionNominal(life, era) {
      const yrs = Math.min(40, life.workYears || 0);
      const ratio = (life.flags.wage_ratio_years > 0) ? life.flags.wage_ratio_sum / life.flags.wage_ratio_years : 0.6;
      const annualAvg = era.avg_monthly_wage_twd * 12;
      if (life.age < this.getPensionAge(life)) return Math.round(annualAvg * 0.04); // 提早退休：請領年齡前只有少量利息與零星收入
      const floor = life.currentYear < 1993 ? 0.03 : life.currentYear < 2008 ? 0.07 : 0.11;
      let share;
      if (life.careerId === "car_civil_teacher") {
        share = Math.min(life.currentYear < 2018 ? 0.75 : 0.6, 0.02 * yrs) * Math.min(1.7, ratio);
      } else if (["car_farmer_fisher"].includes(life.careerId)) {
        share = floor + 0.02;
      } else {
        const insured = Math.min(0.73, ratio);
        const laborRate = life.currentYear < 1985 ? 0.004 : life.currentYear < 2009 ? 0.009 : 0.0155;
        const newYears = Math.min(yrs, Math.max(0, life.currentYear - 2005));
        share = insured * laborRate * yrs + Math.min(2.4, ratio) * 0.0034 * newYears + (life.currentYear >= 1986 ? Math.min(1.5, ratio) * 0.0016 * Math.max(0, yrs - newYears) : 0);
      }
      return Math.round(annualAvg * clamp(share, floor, 0.95));
    }

    // Selling the home when the household really leaves the region
    relocateTo(life, target, era, saleRatio = 0.95) {
      if (!target || target === life.regionId) return "";
      let note = "";
      if (life.homeowner) {
        const net = Math.round((life.homeValueNominal || 0) * saleRatio) - (life.mortgageBalanceNominal || 0);
        life.moneyNominal += net;
        life.homeowner = false; life.homeValueNominal = 0; life.mortgageBalanceNominal = 0; life.mortgageAnnualPayment = 0;
        delete life.triggeredDecisions["D13_buying_home"];
        life.flags.next_home_age = life.age + 2;
        note = `（原本的房子出售，還清房貸後${net >= 0 ? "入袋" : "仍欠"}約 NT$${Math.round(Math.abs(net) / 10000).toLocaleString()} 萬，改為租屋）`;
      }
      life.regionId = target;
      life.migrated = target !== life.birthRegionId;
      if (target === "north_taipei" || target === "north_hsinchu") { if (target !== life.birthRegionId) life.flags.migrated_north = true; }
      life.flags.stay_home = false;
      return note;
    }

    // One roll per disaster: only the truly affected households face rebuild-or-leave
    isHitByDisaster(life, ev) {
      life.flags.disasterRolls = life.flags.disasterRolls || {};
      if (life.flags.disasterRolls[ev.id] == null) {
        const p = (ev.impact_prob && ev.impact_prob[life.regionId]) || 0;
        life.flags.disasterRolls[ev.id] = Math.random() < p;
      }
      return life.flags.disasterRolls[ev.id];
    }

    // Pick an era- and region-matched Taiwan career from tw_education_careers.json
    pickEraCareer(life) {
      const careers = (this.data.educationCareers && this.data.educationCareers.careers) || [];
      if (!careers.length) return null;
      const eligible = careers.filter((c) => this.isCareerEligibleForLife(life, c));
      const open = eligible.filter((c) => !c.entry);
      const pool = open.length ? open : careers.filter((c) => !c.required_majors && !c.required_majors_if_uni && !c.required_sub_majors && !c.entry);
      return weightedPick(pool, (c) => {
        let w = c.pick_weight != null ? c.pick_weight : 1.0;
        if (life.sex === "F" && c.female_weight != null) w *= c.female_weight;
        if (c.preferred_regions.includes(life.regionId)) w *= 2.4;
        if (life.major && c.preferred_majors.includes(life.major)) w *= 3.0;
        return w;
      });
    }

    assignCareer(life, career) {
      if (!career) return;
      const dispName = this.getCareerDisplayName(career, life.currentYear || 2025);
      life.careerId = career.id;
      life.sector = dispName;
      life.job = dispName;
      life.careerSalaryMult = +(career.salary_mult_min + Math.random() * (career.salary_mult_max - career.salary_mult_min)).toFixed(2);
      life.flags.job_stability = career.stability;
      life.flags.rank_title = null;
      life.flags.career_health_drain = career.health_drain || 0.5;
      life.flags.remote_capable = Boolean(career.remote_capable);
    }

    getEraParams(year) {
      const anchors = this.data.eras.anchor_years;
      const first = anchors[0];
      const last = anchors[anchors.length - 1];
      let base;

      if (year < first.year) {
        const dy = first.year - year;
        const factor = Math.max(0.7, Math.pow(0.97, dy));
        base = {
          year, roc: toROC(year),
          cpi: +(first.cpi_index_2025_base * factor).toFixed(4),
          avg_monthly_wage_twd: Math.round(first.avg_monthly_wage_twd * factor),
          min_wage_twd: Math.round(first.min_wage_twd * factor),
          unemployment_rate: first.unemployment_rate,
          uni_admission_rate: Math.max(0.15, first.uni_admission_rate - dy * 0.008),
          tfr: Math.min(7.0, first.tfr + dy * 0.08),
          deposit_rate_1yr: first.deposit_rate_1yr,
          era_summary: "戰後初期農村社會、戒嚴體制與物資重整期",
          overrides: {}
        };
      } else if (year > last.year) {
        const dy = year - last.year;
        const factor = Math.pow(1.015, dy);
        base = {
          year, roc: toROC(year),
          cpi: +(last.cpi_index_2025_base * factor).toFixed(4),
          avg_monthly_wage_twd: Math.round(last.avg_monthly_wage_twd * factor),
          min_wage_twd: Math.round(last.min_wage_twd * factor),
          unemployment_rate: last.unemployment_rate,
          uni_admission_rate: last.uni_admission_rate,
          tfr: last.tfr,
          deposit_rate_1yr: last.deposit_rate_1yr,
          era_summary: "2070 年後延續推估：超高齡與少子化常態社會（CPI 依年通膨 1.5% 推估）",
          overrides: {}
        };
      } else {
        let a = first, b = last;
        for (let i = 0; i < anchors.length - 1; i++) {
          if (year >= anchors[i].year && year <= anchors[i + 1].year) {
            a = anchors[i]; b = anchors[i + 1]; break;
          }
        }
        const t = b.year === a.year ? 0 : (year - a.year) / (b.year - a.year);
        const lerp = (k) => a[k] + (b[k] - a[k]) * t;
        base = {
          year, roc: toROC(year),
          cpi: +lerp("cpi_index_2025_base").toFixed(4),
          avg_monthly_wage_twd: Math.round(lerp("avg_monthly_wage_twd")),
          min_wage_twd: Math.round(lerp("min_wage_twd")),
          unemployment_rate: lerp("unemployment_rate"),
          uni_admission_rate: lerp("uni_admission_rate"),
          tfr: lerp("tfr"),
          deposit_rate_1yr: lerp("deposit_rate_1yr"),
          era_summary: t < 0.5 ? a.era_summary : b.era_summary,
          overrides: {}
        };
      }

      const ov = this.data.eras.year_overrides[String(year)];
      if (ov) {
        base.overrides = ov;
        if (ov.unemployment_rate != null) base.unemployment_rate = ov.unemployment_rate;
        if (ov.uni_admission_rate != null) base.uni_admission_rate = ov.uni_admission_rate;
        if (ov.tfr != null) base.tfr = ov.tfr;
        if (ov.min_wage_twd != null) base.min_wage_twd = ov.min_wage_twd;
        if (ov.deposit_rate_1yr != null) base.deposit_rate_1yr = ov.deposit_rate_1yr;
      }
      return base;
    }

    getActiveSwitches(year) {
      return this.data.eras.institutional_switches.filter(
        (s) => year >= s.start_year && (!s.end_year || year <= s.end_year)
      );
    }

    hasSwitch(year, id) {
      return this.getActiveSwitches(year).some((s) => s.id === id);
    }

    getConscriptionMonths(birthYear, currentYear, roll = 0.5) {
      if (birthYear >= 2005 && currentYear >= 2024) return 12;
      if (birthYear >= 1994 && birthYear <= 2004) return 4;
      if (currentYear >= 2008) return 12;
      if (currentYear >= 2007) return 14;
      if (currentYear >= 2006) return 16;
      if (currentYear >= 2005) return 18;
      if (currentYear >= 2004) return 20;
      if (currentYear >= 2000) return 22;
      if (currentYear >= 1990) return 24;
      return roll < 0.35 ? 36 : 24;
    }

    generateName(sex, birthYear) {
      const sData = this.data.names.surnames;
      const surname = Math.random() < 0.527
        ? weightedPick(sData.top_10_weighted, (x) => x.weight).surname
        : pick(sData.other_common_pool);
      const cohorts = this.data.names.given_names_by_cohort;
      let cohort = cohorts[cohorts.length - 1];
      if (birthYear < 1970) cohort = cohorts[0];
      else if (birthYear < 1980) cohort = cohorts[1];
      else if (birthYear < 1990) cohort = cohorts[2];
      else if (birthYear < 2000) cohort = cohorts[3];
      else if (birthYear <= 2010) cohort = cohorts[4];
      return surname + pick(sex === "M" ? cohort.male : cohort.female);
    }

    drawRegion(mode, manualRegionId) {
      const list = this.data.regions.regions;
      if (mode === "manual" && manualRegionId && this.regionMap[manualRegionId]) {
        return this.regionMap[manualRegionId];
      }
      const key = mode === "pop_weight" ? "population_share_2025" : "birth_weight_estimate";
      return weightedPick(list, (r) => r[key]);
    }

    // Dynamic Era- & Context-Aware Statistics / Social Trends shown on EVERY decision modal (anti-spoiler)
    getDecisionSocialTrend(life, dec, era) {
      if (!dec || !life) return "";
      if (dec.isEraCard) return "";
      const y = life.currentYear;
      const reg = this.getRegion(life.regionId);
      const uniPct = Math.round((era.uni_admission_rate || 0.5) * 100);
      const isF = life.sex === "F";

      // Study Abroad departure cards (SA01-SA06)
      if (dec.isStudyAbroadCard) {
        if (y < 1976) return "📊 時代趨勢：此時期出國須通過嚴格公／自費留學考試，全台每年留學生僅約兩至三千人，超過八成前往美國深造。";
        if (y < 2004) return "📊 時代趨勢：廢除自費留考後出國門檻大降，每年約 6,000–25,000 名台灣學子赴海外深造，美國仍為最大宗，海外歷練逐步擴展至英日澳加。";
        if (y < 2010) return "📊 時代趨勢：台灣留學版圖擴展至美、英、日、澳、加，加上海外打工度假與交換生興起，出國歷練不再是極少數家庭專利。";
        return "📊 時代趨勢：近年台灣海外留學生約維持 6 萬餘人，前五大去向為美、日、澳、英、加，約半數以上留學生傾向先於當地累積工作年資再評估返台。";
      }

      switch (dec.id) {
        case "D01_junior_high_track":
        case "LS02_junior_high_exam_branch":
          if (y < 1968) return `📊 時代趨勢：此時尚未實施九年國教，全台國小畢業生僅約 55%–62% 繼續升學初中${isF ? "（女童升學比例更顯著低於男童）" : ""}，逾三成學童畢業即投入農工貼補家用。`;
          if (y < 2001) return "📊 時代趨勢：九年國教後國中升學率躍升至 85%–94%，但台灣長期採高中職 3：7 政策，約 70% 升學青年就讀高職與五專，僅約 30% 進入普通高中。";
          if (y < 2014) return "📊 時代趨勢：基測時期全台國中畢業升學率達 95%–98%，高中與高職／五專就讀比例逐步拉近至約 5：5。";
          return "📊 時代趨勢：十二年國教會考時期，全台國中畢業升學率高達 99.7%，普通高中與技術型高中比例約 52% vs 48%。";

        case "D01B_youth_parttime_request":
          if (y < 1984) return "📊 時代趨勢：此時工廠與店家雇用少年工相當普遍，15 歲起常見青少年在工廠、餐飲店半工半讀貼補家用，但升學家庭多半仍嚴禁孩子課餘打工。";
          return "📊 時代趨勢：依《勞動基準法》規範，滿 15 歲未滿 16 歲屬童工、16–17 歲須經法定代理人同意方可受僱；台灣高中職在學學生約一至兩成有課餘工讀經驗。";

        case "D02_university_major":
          if (y < 1990) return `📊 時代趨勢：此年代大學錄取率僅約 ${uniPct}%；女性大學生中約 78%–85% 選擇人文、商管、教育或護理領域，工程類科女性比例長期低於 10%。`;
          if (y < 2010) return `📊 時代趨勢：此年代大學錄取率約 ${uniPct}%；約 68%–74% 女性與 46% 男性選填商管文史領域，電資理工則由男性占近八成。`;
          return `📊 時代趨勢：此年代大學錄取率約 ${uniPct}%；女性選擇文商與醫護約占 68%，電資工程女性比例緩步升至約 18%–22%；電資起薪平均高於文組約 13%–20%。`;

        case "D03_exam_retake":
          if (y < 1996) return `📊 時代趨勢：聯考錄取率僅約 ${uniPct}% 的窄門年代，約三成以上落榜考生選擇進重考班再戰一年，台北南陽街高峰期聚集數萬名重考生。`;
          return `📊 時代趨勢：多元入學時期大學錄取率已達 ${uniPct}%，整體重考比例下降，但鎖定頂大電資與醫學系的考生中仍有約 10%–15% 選擇重考衝刺。`;

        case "D04_military_service": {
          const mo = this.getConscriptionMonths(life.birthYear, y, life.conscriptRoll);
          if (y < 2000) return `📊 時代趨勢：此時期役男一般義務役長達 ${mo} 個月，逾九成男性須中斷學業或職涯入伍，大專以上學歷中約一至兩成報考預官。`;
          if (y < 2008) return `📊 時代趨勢：此時期役期縮為約 ${mo} 個月並開辦國防役／替代役，理工碩士以上約兩成爭取國防工業訓儲制度銜接產業。`;
          if (y < 2013) return `📊 時代趨勢：此時期役期縮為約 ${mo} 個月並開辦研發替代役，理工碩士以上約 20%–30% 爭取科技研發替代役無縫銜接職場。`;
          return `📊 時代趨勢：役男現行役期為 ${mo} 個月，多數青年選擇服完義務役即投入職場，僅約 10%–15% 因穩定薪資考量轉簽志願役。`;
        }

        case "D05_graduation_crossroads":
          if (y < 1995) return "📊 時代趨勢：此時期台灣研究所名額稀少，逾八成大學畢業生選擇直接就業或服役，具學士學位即屬職場前段稀缺人才。";
          if (y < 2010) return "📊 時代趨勢：大學學歷普及後，約 25%–32% 畢業生選擇繼續報考國內研究所或出國深造，以拉開與大學起薪的差距。";
          return "📊 時代趨勢：統計顯示台灣碩士學歷者年薪中位數較大學畢業生高出逾四成，約 28%–35% 理工與商管畢業生選擇先念研究所再入職場。";

        case "D06_northbound_migration":
          if (y < 2000) return "📊 時代趨勢：工廠與公司行號集中在北部，中南部與東部的年輕人畢業後離鄉找頭路十分常見，過年返鄉車票一票難求。";
          return "📊 時代趨勢：跨區就業統計顯示，中彰投畢業生約 27.7%、雲嘉南與高屏約 23.0%、宜花東與離島更高達 40%–50% 選擇北漂或赴西部都會區工作。";

        case "D07_career_track":
          if (y < 1985) return "📊 時代趨勢：加工製造與中小企業出口鼎盛期，逾四成勞動力投入製造業與家族工廠，軍公教則以穩定配給與退休保障吸引近一成青壯年。";
          if (y < 2008) return "📊 時代趨勢：台灣服務業與電子代工並進，科技業股票分紅吸引大量理工人才，中小企業創業家比例居亞洲前段。";
          return "📊 時代趨勢：景氣與薪資呈現明顯產業分化，科技與金融業年薪中位數居各業之冠；同時每年仍有數十萬青年報考公職國營尋求穩定。";

        case "D07B_career_switch":
          if (y < 1990) return "📊 時代趨勢：台灣產業快速升級，不少有經驗的技術員與業務轉向新興外銷或自營工廠，跨業跳槽往往帶來顯著薪資跳升。";
          if (y < 2010) return "📊 時代趨勢：隨著電子與服務業擴張，30–45 歲跨領域轉職逐漸普遍，資深年資與人脈是談薪的關鍵籌碼。";
          return "📊 時代趨勢：調查顯示具備 4 年以上資歷的上班族，透過轉職或跨領域跳槽的調薪幅度平均達 12%–25%，遠高於留在原職的年度調薪。";

        case "D08_overseas_assignment":
          if (y < 2000) return "📊 時代趨勢：台幣升值與工資上揚促使傳統製造業大舉外移東南亞與中國大陸，第一代台幹常須忍受長期與家人分隔兩地。";
          return "📊 時代趨勢：高峰期約有逾 40 萬名台灣人長期外派海外（含中國大陸、東南亞與歐美據點），外派薪資普遍高出台灣本薪 1.4–1.8 倍。";

        case "D09_return_hometown_dilemma":
          if (y < 1997) return "📊 時代趨勢：離鄉打拚多年的中壯年，常在父母年邁、孩子就學與老家工作機會之間掙扎。";
          if (y < 2012) return "📊 時代趨勢：中南部薪資與職缺仍低於北部，多數離鄉者一面想照顧父母，一面擔心返鄉後收入打折。";
          return "📊 時代趨勢：人力銀行調查顯示，68.6% 北漂族曾動念返鄉（主因照顧家人 49.1%），但高達 71.4% 陷入掙扎，其中 67.6% 最擔憂返鄉後薪資打折。";

        case "D10_unpaid_leave":
          return `📊 時代趨勢：景氣寒冬時期（當年失業率約 ${(era.unemployment_rate * 100).toFixed(1)}%），約六成遭遇減班休息的勞工選擇咬牙撐過並兼差補貼，約兩至三成選擇趁機轉職或參訓。`;

        case "D11_health_red_flags":
          return "📊 時代趨勢：台灣受僱者年總工時長期名列前段，中壯年健檢出現三高紅字比例逾四成，但僅約三成上班族願意為健康主動減班或降薪換工時。";

        case "D12B_vehicle_purchase":
          if (y < 1980) return "📊 時代趨勢：此時台灣小客車普及率極低，多數家庭以腳踏車、公車或國產機車代步，擁有自用小客車屬高所得家庭象徵。";
          if (y < 1996) return "📊 時代趨勢：台灣邁入「機車王國」與國產汽車普及期，都會區仰賴公車與機車通勤，中南部與郊區逾七成上班族自備汽機車。";
          if (y < 2005) return "📊 時代趨勢：台北捷運剛通車但路網仍在擴建，雙北通勤族逐漸轉向軌道運輸，中南部與其他縣市仍高度仰賴機車或自用小客車。";
          return "📊 時代趨勢：全台登記機車逾 1,400 萬輛、自小客車逾 700 萬輛；雙北捷運族逾半不買車，但非雙北地區自備汽機車仍是日常剛需。";

        case "D12_first_pot_of_gold":
          if (y < 1985) return `📊 時代趨勢：銀行一年期定存利率高達 ${(era.deposit_rate_1yr * 100).toFixed(1)}%，超過七成台灣家庭將積蓄存放銀行定存或參與民間標會，股市參與率仍偏低。`;
          if (y < 2003) return `📊 時代趨勢：台股開戶數快速突破百萬戶，定存利率約 ${(era.deposit_rate_1yr * 100).toFixed(1)}%；約半數民眾仍偏好保守定存，但投身股市個股與融資炒作比例顯著攀升。`;
          return `📊 時代趨勢：低利率時代（定存約 ${(era.deposit_rate_1yr * 100).toFixed(1)}%），台灣股民與 ETF 定期定額人數屢創新高，越來越多上班族以大盤指數對抗通膨。`;

        case "D13_buying_home":
          if (y < 1990) return `📊 時代趨勢：${reg.name_zh}自有住宅率已逾七成，房貸利率雖偏高但房價所得比相對可控，多數雙薪家庭工作 5–8 年仍有機會籌出頭期款。`;
          if (y < 2015) return `📊 時代趨勢：${reg.name_zh}房價所得比逐步攀升，約四成首購族選擇退居蛋白區以通勤換空間，亦有愈來愈多青年仰賴長輩贊助頭期款。`;
          return `📊 時代趨勢：${reg.name_zh}平均房價所得比約 ${reg.house_price_to_income_ratio.regional_avg} 倍，首購族逾半數須拉長房貸期數或退居蛋白區，約三成無房青年選擇先租屋並將資金投入股市。`;

        case "D14_financial_trap":
          if (y < 1995) return "📊 時代趨勢：民間游資充沛但合法理財管道有限，高息地下投資公司與民間互助會蔚為風潮，許多中產家庭誤信親友口碑而將積蓄全數投入。";
          if (y < 2004) return "📊 時代趨勢：股市投顧節目與未上市盤商當道，許多散戶靠小道消息追逐題材，資訊落差極大。";
          if (y < 2010) return "📊 時代趨勢：金融商品快速推陳出新，超過三成散戶過度信賴理專話術或高循環利率現金卡，低估了市場反轉時的槓桿殺傷力。";
          return "📊 時代趨勢：網路假投資群組與高息話術盛行，受害族群橫跨上班族與退休長者，超過六成受騙者最初都是從「小額試水溫」逐步加碼。";

        case "D15_stock_crash_panic":
          return "📊 時代趨勢：歷次台股重挫期間，統計顯示逾六成散戶在恐慌低點選擇停損殺出或從此退出市場，僅約一至兩成能紀律持有或逢低分批加碼。";

        case "D16_relative_loan_guarantor":
          return "📊 時代趨勢：台灣傳統人情社會重視親戚互助，但金融糾紛統計顯示，民間連帶保證人最終被迫代償違約的比例高達約三成，常連帶拖垮自家財務。";

        case "D17_critical_illness_cost":
          if (y < 1995) return "📊 時代趨勢：除公保、勞保外多數家屬沒有醫療保險，重大傷病住院與手術常耗盡一般家庭大半積蓄，約有四成中低所得家庭因此陷入「因病而貧」或被迫中斷治療。";
          if (y < 2003) return "📊 時代趨勢：全民健保開辦後大幅減輕住院與手術負擔，但進口特效藥與部分新療法仍須自費。";
          return "📊 時代趨勢：全民健保覆蓋絕大多數基礎醫療，但癌症標靶與新式自費療程動輒數十萬至百萬元，有無商業保險與流動存款仍明顯影響預後品質。";

        case "D17B_romance_encounter":
          if (y < 1985) return "📊 時代趨勢：此時期約半數以上情侶透過親友媒妁、同事或社團聯誼相識，交往多以步入婚姻為前提。";
          if (y < 1993) return "📊 時代趨勢：自由戀愛成為主流，校園社團、職場與舞會聯誼是青年結識伴侶的主要管道。";
          if (y < 2005) return "📊 時代趨勢：自由戀愛成為主流，校園社團、職場與 BBS 聯誼是青年結識伴侶的主要管道。";
          return "📊 時代趨勢：數位時代多元交友普及，但工時長與生活壓力也讓許多適婚青年選擇先專注自我與事業。";

        case "D18_marriage_choice":
          if (y < 1985) return "📊 時代趨勢：此年代台灣 30 歲前已婚比例逾八成五，傳統聘金、喜餅與盛大宴客幾乎是必經禮俗，不婚比例極低。";
          if (y < 2010) return "📊 時代趨勢：台灣初婚年齡逐步延後至 28–31 歲，約六成新人仍辦傳統婚宴，但公證與簡約婚禮開始被都會雙薪族接受。";
          return "📊 時代趨勢：晚婚與不婚趨勢顯著（平均初婚年齡突破 31–33 歲），逾四成新人選擇簡單登記不辦大宴客，把預算轉作居住或生活基金。";

        case "D19_have_children":
          return `📊 時代趨勢：台灣此時總生育率約為每位婦女 ${era.tfr.toFixed(2)} 名子女${era.tfr < 1.2 ? "，高房價與育兒成本使約三至四成伴侶選擇少生或不生（頂客族）" : era.tfr < 2.2 ? "，雙薪小家庭多以生育 1–2 胎為主" : "，多子多孫仍是普遍家庭觀念"}。`;

        case "D20_marriage_crisis":
          if (y < 1990) return "📊 時代趨勢：社會觀念仍高度強調「勸合不勸離」，多數夫妻面臨婆媳或經濟摩擦時選擇隱忍維繫，離婚率相對偏低。";
          return "📊 時代趨勢：台灣粗離婚率居亞洲前段，面臨婚姻危機的伴侶約有四成選擇協議離婚重整人生，另有約六成嘗試搬離婆家或透過諮商磨合。";

        case "D21_child_education_race":
          if (y < 1995) return "📊 時代趨勢：聯考競爭白熱化，雙北與都會區逾六成中產家庭送孩子進課後補習班衝刺升學，教育支出占家戶可支配所得比例持續攀升。";
          return "📊 時代趨勢：全台補習班家數已逾 1.8 萬家（超越超商），約七成都會家庭讓孩子參加安親、美語或學科補習，經濟富裕家庭更傾向私校雙語路線。";

        case "D22_major_disaster":
          return "📊 時代趨勢：台灣歷次重大水患與強震後，追蹤調查顯示約 65%–75% 受災家庭選擇原地重建或於同縣市安頓，另有約 25%–35% 因地質安全、產業流失或創傷而決定舉家搬離原鄉。";

        case "D23_pandemic_dilemma":
          if (y <= 2004) return "📊 時代趨勢：2003 年 SARS 疫情期間全台進出場所量測體溫、醫院與社區嚴格隔離，觀光餐飲與零售門市承受劇烈人流萎縮，多數上班族仍須戴口罩通勤。";
          return "📊 時代趨勢：疫情衝擊期間，約 40% 白領與科技業得以切換遠距辦公保住收入，但餐飲、旅遊與第一線服務業逾半數面臨減班或染疫暴露兩難。";

        case "D24_elderly_care_storm":
          if (y < 1992) return "📊 時代趨勢：當時尚未開放外籍看護與政府長照制度，長輩失能多仰賴家人辭職親力照顧、手足輪流分擔或聘請本籍看護。";
          if (y < 2007) return "📊 時代趨勢：開放外籍家庭看護工後成為許多雙薪家庭的支柱，但台灣約仍有逾兩成照顧者因高昂照護費與人手不足而被迫離開職場。";
          return "📊 時代趨勢：長照調查顯示，台灣約有 20%–25% 家庭照顧者曾因長輩失能被迫離職或留停（平均照護期長達 7–9 年），其餘多仰賴外籍看護、政府長照或手足分擔。";

        case "D25_retirement_timing":
          if (y < 2009) return "📊 時代趨勢：此時勞工退休多以一次領取老年給付與退休金為主，晚年生活常仰賴積蓄與子女奉養；軍公教則可月領退休俸。";
          return "📊 時代趨勢：台灣勞工實際平均退休年齡約 61–63 歲，逾五成上班族因通膨與長壽風險擔憂退休金不足，選擇延後退休或退而不休從事二度就業。";

        case "D26_end_of_life_autonomy":
          return "📊 時代趨勢：近年台灣簽署預立安寧緩和醫療與醫療決定人數持續攀升，越來越多長者傾向提早與家人溝通善終意願，減少家屬臨終決策煎熬。";

        case "D27_return_to_taiwan":
          if (y < 1995) return "📊 時代趨勢：此時期留學生學成後多數留在海外就業，返台者常因父母年邁、學術職缺或國內產業起飛而動念。";
          return "📊 時代趨勢：海外台灣人社群調查顯示，父母年邁照護、健保醫療可近性與故鄉人情是返台三大主因；留居海外者則多考量薪資天花板與子女教育環境。";

        case "D28_debt_clearance":
          return "📊 時代趨勢：《消費者債務清理條例》施行後，歷年累計已有逾數萬名陷入卡債或事業失敗的民眾透過法院更生方案減免債務、重回正常經濟生活。";

        case "D29_child_study_abroad":
          return "📊 時代趨勢：海外留學一年學費加生活費動輒 NT$150–250 萬元，逾七成自費留學生仍須仰賴家庭存款贊助或房屋增貸，僅約兩成能靠全額獎學金或留學貸款獨立完成。";

        case "D31_cashflow_debt_crisis":
          if (y < 1995) return "📊 時代趨勢：收支長期入不敷出時，約半數家庭優先縮減開支或變賣車輛家當止血，約三成向親友或標會周轉，若轉向民間高息借貸，極易落入債務雪球。";
          return "📊 時代趨勢：收支長期入不敷出時，約半數家庭優先縮減開支或變賣車輛家當止血，約三成向親友周轉，若轉向高利率信貸與預借現金，極易落入以債養債的惡性循環。";

        case "D30_forced_home_sale":
          return "📊 時代趨勢：金融風暴與景氣急凍期，高房貸比家庭一旦遭遇失業或斷頭，約半數選擇提前降價急售止血保住剩餘淨值，硬撐未果者則面臨遭銀行低價法拍風險。";

        case "LS01_childhood_env":
          if (y < 1990) return "📊 時代趨勢：此時期多數孩子放學後在戶外玩耍或回家幫忙家務農事，僅約 25%–35% 都會家庭額外送孩子上才藝或課後補習。";
          return "📊 時代趨勢：雙薪家庭普及後，全台國小學童課後進安親班、美語或才藝補習的比例已超過 65%，城鄉與家境落差在此階段開始浮現。";

        case "LS03_high_school_track":
          return `📊 時代趨勢：台灣普通高中應屆升學率高達 95% 以上；選組趨勢上${isF ? "，女性約 60%–70% 傾向社會組（一類組），約 30%–40% 選擇自然組" : "，男性約 60%–65% 選擇自然組（二／三類組），約 35%–40% 選擇社會組"}。`;

        case "LS04_vocational_path":
          if (y < 2001) return "📊 時代趨勢：此時期高職與五專為台灣產業骨幹，約六至七成技職生畢業即直接進入工廠或企業就業，擁有一技之長起薪不亞於大學生。";
          return "📊 時代趨勢：技專校院廣設後，高職應屆升學率大幅攀升至逾 81%，多數學生選擇拚統測升科大，約兩成則專攻乙級證照與建教合作提早入行。";

        case "LS05_early_apprentice":
          return "📊 時代趨勢：提早進入社會的少年學徒中，約三成堅持熬過三至五年出師成為獨當一面師傅，約兩成利用下班念夜校補齊學歷，翻轉職涯天花板。";

        case "LS06_university_campus_life":
          if (y < 1995) return "📊 時代趨勢：此時大學生是少數，家教是最熱門的打工，社團、舞會與郊遊聯誼是主要的校園社交。";
          return "📊 時代趨勢：勞動部調查顯示，台灣大二學生約 45.0% 具課餘打工經驗；另有約三至四成投入社團系學會累積人脈，約一至兩成提前進入教授實驗室做專題。";

        case "LS07_university_career_prep":
          if (y < 1995) return "📊 時代趨勢：大學畢業生仍屬稀少，多數在畢業前後決定就業、服役、報考研究所、公職或申請出國留學。";
          return "📊 時代趨勢：調查顯示近七成大學高年級生將企業實習視為畢業轉正跳板；同時約有 15%–20% 文商與法政學生在大三、大四便提前報名補習班備考公職或研究所。";

        case "LS08_workplace_levelup":
          return "📊 時代趨勢：台灣職場 30–40 歲是薪資拉開差距的關鍵期，約三成透過人脈介紹跳槽加薪，約四分之一考取證照或轉考公職，其餘則選擇在原職尋求工作生活平衡。";

        case "LS09_midlife_community":
          return "📊 時代趨勢：40–55 歲三明治世代工時與家庭壓力雙重夾擊，規律維持運動社群者中壯年慢性病風險顯著偏低，但多數人因忙碌而縮減了社交圈。";

        case "LS10_retirement_third_life":
          return "📊 時代趨勢：退休族研究顯示，持續參與社區大學、志工或運動社團的長者，認知退化與孤獨憂鬱比例較純待在家中者低逾三成；另有約三成五長輩協助照顧孫輩。";

        default:
          return `📊 時代背景參考：${y} 年（${era.roc}）全國失業率約 ${(era.unemployment_rate * 100).toFixed(1)}%、大學錄取率約 ${uniPct}%、一年期定存利率約 ${(era.deposit_rate_1yr * 100).toFixed(1)}%。`;
      }
    }

    // Era-scoped option label resolver & future-year anti-spoiler guard
    resolveEraLabel(opt, currentYear) {
      if (!opt) return "";
      if (Array.isArray(opt.era_labels)) {
        const hit = opt.era_labels.find(
          (r) => currentYear >= (r.min_year != null ? r.min_year : -Infinity) &&
                 currentYear <= (r.max_year != null ? r.max_year : Infinity)
        );
        if (hit && hit.label) return hit.label;
      }
      return this.stripFutureYearMentions(opt.label || "", currentYear);
    }

    stripFutureYearMentions(text, currentYear) {
      if (!text) return "";
      return String(text).replace(/（[^（）]*?(?:19[5-9]\d|20[0-9]\d|21[0-4]\d)[^（）]*?）/g, (m) => {
        const yrs = (m.match(/19[5-9]\d|20[0-9]\d|21[0-4]\d/g) || []).map(Number);
        return yrs.some((y) => y > currentYear) ? "" : m;
      });
    }

    getLegalAdultAge(year) {
      return year >= 2023 ? 18 : 20;
    }

    calcYouthPocketMoneyNominal(life, era) {
      if (life.age < 15) return 0;
      if (life.flags.hs_tier === "work_early") {
        return Math.round(era.min_wage_twd * 7.5);
      }
      if (life.flags.part_time_approved || life.flags.vocational_coop || life.flags.uni_parttime) {
        return Math.round(era.min_wage_twd * (life.age >= 18 ? 4.2 : 2.4));
      }
      return 0;
    }

    calcAnnualLivingExpenseNominal(life, era, reg, isWorking) {
      if (life.age < 18 && !isWorking) {
        if (life.age >= 15 && (life.flags.hs_tier === "work_early" || life.flags.part_time_approved || life.flags.vocational_coop)) {
          return Math.round(era.min_wage_twd * 1.0);
        }
        return 0;
      }
      if (life.flags.military_gap_years > 0) return Math.round(era.min_wage_twd * 1.4);
      // Overseas tuition + living were already paid up-front by family / savings / student loan
      if (life.location !== "TAIWAN" && life.abroad && life.abroad.studyYearsLeft > 0 && life.abroad.pathwayId !== "SA05_working_holiday") return 0;
      // First-time job seekers and exam candidates are still supported by parents
      if (!isWorking && life.location === "TAIWAN" && life.family.parentsAlive && life.age < 30 && !life.married &&
          (this.isAwaitingGraduationChoice(life) || (!life.careerId && !life.flags.retired) || life.flags.exam_prep_years > 0)) {
        return 0;
      }
      const inSchoolLocal = life.location === "TAIWAN" && (
        life.education.includes("在學") ||
        life.flags.in_grad_school_years > 0 ||
        life.flags.retaking_exam
      );
      if (inSchoolLocal && !isWorking) {
        // Full-time student in Taiwan: parents cover room & board unless earning approved part-time income
        const hasPT = Boolean(life.flags.part_time_approved || life.flags.uni_parttime);
        return hasPT ? Math.round(era.min_wage_twd * 1.8) : 0;
      }
      const regionCostMult = {
        north_taipei: 1.24,
        north_hsinchu: 1.10,
        central: 0.96,
        south_tainan: 0.88,
        south_kaohsiung: 0.91,
        east_islands: 0.86
      }[reg.id] || 1.0;

      // Count only dependent children (< 22 years old) if birth years are tracked
      const births = life.childrenBirthYears || [];
      const dependentChildren = births.length > 0
        ? births.filter((by) => (life.currentYear - by) >= 0 && (life.currentYear - by) < 22).length
        : (life.children || 0);

      // Marital status factor: married households share housing/utilities, slight family obligation overhead
      const maritalBaseMult = life.married ? 1.42 : 1.0;
      const austerityMult = (life.flags.austerity_years > 0) ? 0.82 : 1.0;

      // Households live within their means: rent and daily spending flex with income relative to the era's average wage
      const hhIncomeNom = (life.annualSalaryNominal || 0) + ((life.married && life.spouse) ? (life.spouse.incomeNominal || 0) : 0);
      const incomeRatio = hhIncomeNom / Math.max(1, era.avg_monthly_wage_twd * 12);
      const livingFlex = clamp(0.62 + 0.4 * incomeRatio, 0.66, 1.15);
      const rentFlex = clamp(incomeRatio / 0.85, 0.45, 1.25);
      let baseLiving2025 = 168000 * livingFlex * regionCostMult * maritalBaseMult * austerityMult;
      if (life.focus === "save") baseLiving2025 *= 0.84;
      if (life.flags.retired) baseLiving2025 *= 0.88;
      if (life.flags.future_living_cost_mult) baseLiving2025 *= life.flags.future_living_cost_mult;
      if (life.location !== "TAIWAN" && life.abroad) {
        const cObj = this.getAbroadCountry(life.abroad.countryId);
        baseLiving2025 *= (cObj ? cObj.living_cost_mult_vs_tw : 1.5);
      }

      // Scale contemporary living standards (base living, rent, childcare) by era real-wage ratio so 1950-1985 cohorts pay era-appropriate costs
      const realWageRatio = clamp(((era.avg_monthly_wage_twd || 48000) / Math.max(0.07, era.cpi)) / 62500, 0.15, 1.15);

      let housingNom = 0;
      if (life.homeowner && life.mortgageBalanceNominal > 0) {
        housingNom = Math.min(
          life.mortgageBalanceNominal,
          life.mortgageAnnualPayment || Math.round(life.mortgageBalanceNominal * 0.06)
        );
      } else if (!life.homeowner) {
        // Larger rental space needed if married / raising dependent children
        const familyRentScale = dependentChildren > 0 ? 1.28 : (life.married ? 1.14 : 1.0);
        if (life.location !== "TAIWAN" && life.abroad) {
          const cObj = this.getAbroadCountry(life.abroad.countryId);
          housingNom = Math.round(160000 * (cObj ? cObj.living_cost_mult_vs_tw : 1.5) * familyRentScale * realWageRatio * era.cpi);
        } else if (life.flags.lives_with_parents || (life.age < 22 && life.education.includes("在學"))) {
          housingNom = isWorking ? Math.round(78000 * rentFlex * (life.married ? 1.25 : 1.0) * realWageRatio * era.cpi) : 0;
        } else {
          const rentBase = reg.id === "north_taipei" ? 168000 : reg.id === "north_hsinchu" ? 132000 : 96000;
          const rentMult = (life.flags.rent_cost_mult || 1.0) * (life.flags.future_rent_mult || 1.0) * (1 + (life.flags.elderly_rent_surcharge || 0)) * familyRentScale;
          housingNom = Math.round(rentBase * rentMult * rentFlex * realWageRatio * era.cpi);
        }
      }

      // Economies of scale: each additional child costs less than the first
      const childUnits = dependentChildren <= 0 ? 0 : 1 + (dependentChildren - 1) * 0.65;
      const childNom = Math.round(childUnits * (life.flags.private_cram_kids ? 145000 : this.interpByYear([[1970, 58000], [1990, 72000], [2010, 88000], [2100, 92000]], life.currentYear)) * realWageRatio * era.cpi);
      const careBase2025 = (life.flags.monthly_care_cost_twd_2025 || 0) * (life.flags.future_care_cost_mult || 1.0);
      const careNom = (careBase2025 > 0 && life.family.parentsAlive) ? Math.round(careBase2025 * 12 * realWageRatio * era.cpi) : 0;
      const commuterOpt = ((this.data.studyAbroad && this.data.studyAbroad.return_decision_template.options) || []).find((o) => o.key === "commuter_nomad");
      const commuterNom = (life.abroad && life.abroad.commuterMode) ? Math.round(((commuterOpt && commuterOpt.effects.annual_travel_cost_twd_2025) || 220000) * era.cpi) : 0;

      // Progressive income tax, labor/NHI premiums & lifestyle scaling (scales with real annual salary)
      const realAnnualSalary = (life.annualSalaryNominal || 0) / Math.max(0.07, era.cpi);
      const isSave = life.focus === "save";
      let lifestyleRate;
      if (incomeRatio <= 0.62) lifestyleRate = isSave ? 0.08 : 0.11;
      else if (realAnnualSalary <= 700000) lifestyleRate = isSave ? 0.13 : 0.18;
      else if (realAnnualSalary <= 1400000) lifestyleRate = isSave ? 0.19 : 0.26;
      else if (realAnnualSalary <= 2500000) lifestyleRate = isSave ? 0.26 : 0.33;
      else lifestyleRate = isSave ? 0.34 : 0.42;
      lifestyleRate = Math.max(0.06, lifestyleRate - clamp(life.flags.savings_rate_bonus || 0, 0, 0.3) * 0.2);
      const spouseInc = (life.married && life.spouse) ? (life.spouse.incomeNominal || 0) : 0;
      const taxAndLifestyleNom = ((isWorking && life.annualSalaryNominal > 0)
        ? Math.round(life.annualSalaryNominal * lifestyleRate)
        : 0) + Math.round(spouseInc * (life.spouse && life.spouse.retired ? 0.04 : Math.min(lifestyleRate, 0.2)));
      // Retirees gradually draw down liquid wealth for retirement living, travel & medical care (4.2%/yr)
      const liqWealth = Math.max(0, (life.moneyNominal || 0) + (life.stockNominal || 0));
      const retireeSpendNom = life.flags.retired
        ? Math.round(liqWealth * 0.042)
        : 0;

      const selfCareNom = life.flags.bedridden
        ? Math.round(Math.min(264000, 90000 + Math.max(0, liqWealth / Math.max(0.07, era.cpi)) * 0.05) * (life.flags.future_care_cost_mult || 1) * realWageRatio * era.cpi)
        : 0;
      const veh = life.ownedAssets && life.ownedAssets.vehicle;
      const vehUpkeepNom = veh ? Math.round((veh.annualUpkeep2025 || 0) * realWageRatio * era.cpi) : 0;

      const scaledBaseNom = Math.round(baseLiving2025 * realWageRatio * era.cpi);
      const loanPayNom = (life.studentLoanNominal > 0 && isWorking)
        ? Math.min(life.studentLoanNominal, Math.max(Math.round(life.studentLoanNominal * 0.1), Math.round(36000 * era.cpi)))
        : 0;

      return Math.max(0, scaledBaseNom + housingNom + childNom + careNom + selfCareNom + commuterNom + taxAndLifestyleNom + retireeSpendNom + vehUpkeepNom + loanPayNom);
    }

    isAwaitingGraduationChoice(life) {
      return life.location === "TAIWAN" && life.eduLevel === 4 && life.flags.university_grad &&
        life.age === life.uniGradAge && !life.triggeredDecisions["D05_graduation_crossroads"];
    }

    computeCurrentAnnualSalaryNominal(life, era, reg) {
      const inSchool = life.education.includes("在學") || life.flags.in_grad_school_years > 0 || life.flags.retaking_exam || (life.abroad && life.abroad.studyYearsLeft > 0 && life.abroad.pathwayId !== "SA05_working_holiday");
      if (life.flags.military_gap_years > 0) {
        return life.currentYear >= 2024 ? Math.round(era.min_wage_twd * 10) : Math.round(era.min_wage_twd * 2.5);
      }
      if (life.flags.retired) return this.computePensionNominal(life, era);
      if (life.age < 18 || inSchool || this.isAwaitingGraduationChoice(life) || life.flags.exam_prep_years > 0 || life.flags.unemployed || life.flags.fulltime_caregiver) {
        return 0;
      }
      const tempMult = life.flags.temp_income_mult || 1.0;
      if (life.location !== "TAIWAN" && life.abroad) {
        const cObj = this.getAbroadCountry(life.abroad.countryId);
        const abMult = cObj ? cObj.salary_mult_vs_tw : 1.6;
        return Math.round(this.baseSalaryNominal(life, era, null, 1.0) * abMult * 1.05 * tempMult);
      }
      if (!life.careerId) return 0;
      const expatMult = life.flags.expat_years_left > 0
        ? (life.flags.expat_wage_mult || 1.45)
        : (life.flags.expat_completed ? 1.06 : 1.0);
      let annualBase = this.baseSalaryNominal(life, era, reg, life.careerSalaryMult || 1.0) * expatMult * tempMult;
      if (life.workYears <= 2 && life.currentYear >= 2009 && life.currentYear <= 2013 && life.flags.hit_22k_anchor) {
        annualBase = Math.min(annualBase, 25246 * 12.5);
      }
      return Math.round(annualBase);
    }

    // For minors (age < 18), adult household crises (pandemics, major disasters) are decided by parents automatically!
    addHardship(life, level, years) {
      life.flags.child_hardship = clamp((life.flags.child_hardship || 0) + level, 0, 3);
      life.flags.hardship_until = Math.max(life.flags.hardship_until || 0, life.currentYear + years);
    }

    setQuintile(life, q) {
      life.quintile = clamp(q, 1, 5);
      const t = this.data.regions.income_quintiles.tiers.find((x) => x.quintile === life.quintile);
      if (t) life.quintileLabel = t.label;
    }

    // Parents make the big household calls while the protagonist is a minor; the consequences follow the child for years
    stepChildhoodFamily(life, era) {
      if (life.age >= 18 || life.location !== "TAIWAN") return;
      if (life.flags.child_hardship > 0 && life.currentYear >= (life.flags.hardship_until || 0)) {
        life.flags.child_hardship -= 1;
        life.flags.hardship_until = life.currentYear + 3;
      }
      if (life.flags.child_hardship >= 2) { life.stats.health -= 0.6; life.stats.happiness -= 1; }
      if (life.age < 2 || life.age - (life.flags.lastParentEventAge != null ? life.flags.lastParentEventAge : -10) < 4) return;
      const y = life.currentYear;
      const push = (title, text, impactNote) => {
        life.flags.lastParentEventAge = life.age;
        life.feed.unshift({ type: "parent_decision", age: life.age, year: y, roc: era.roc, title: `👨‍👩‍👧 父母的決定：${title}`, text: `當時你 ${life.age} 歲。${text}`, impactNote: `由父母決定 ｜ ${impactNote}` });
      };
      const crisisYear = [1974, 1975, 1982, 1985, 1998, 2001, 2002, 2008, 2009, 2020].includes(y);
      const r = Math.random();
      // 1. A parent loses a job / the family shop closes
      const pJob = era.unemployment_rate * (crisisYear ? 1.5 : 0.7) * (life.quintile <= 2 ? 1.4 : life.quintile >= 4 ? 0.6 : 1);
      if (r < pJob) {
        const who = Math.random() < 0.65 ? "父親" : "母親";
        const choice = weightedPick([
          { k: "work_more", w: 0.45 }, { k: "stall", w: y < 2005 ? 0.3 : 0.15 }, { k: "move_cheap", w: life.regionId === "north_taipei" ? 0.3 : 0.15 }
        ], (x) => x.w).k;
        const drop = life.quintile > 1 && Math.random() < 0.4;
        if (drop) this.setQuintile(life, life.quintile - 1);
        this.addHardship(life, choice === "stall" ? 1 : 2, 4);
        life.flags.uni_admit_bonus = (life.flags.uni_admit_bonus || 0) - 0.04;
        life.stats.happiness -= 5;
        if (choice === "work_more") {
          push(`${who}失業後，${who === "父親" ? "母親也出去工作" : "父親多兼一份差"}`, `${who}任職的${y < 1990 ? "工廠" : "公司"}裁員，家裡收入一下少了一大截。大人決定${who === "父親" ? "讓母親也出去上班" : "由父親晚上再兼一份差"}，你放學後常一個人在家，補習和才藝課都停了。`,
            `家境${drop ? "下滑一級" : "吃緊"} ｜ 未來幾年升學資源減少、生活較清苦`);
        } else if (choice === "stall") {
          life.flags.family_business = true;
          push(`${who}失業後，擺攤做小生意`, `${who}丟了工作，父母拿出積蓄${y < 2000 ? "在市場擺攤" : "開了間小吃店"}。你下課後要幫忙顧店、洗碗，寫功課常常在攤位旁邊。`,
            `家境${drop ? "下滑一級" : "吃緊"} ｜ 課後時間被家務占用，升學資源減少`);
          life.stats.social += 2;
        } else {
          const others = this.data.regions.regions.map((x) => x.id).filter((id) => id !== life.regionId && id !== "north_taipei");
          const dest = life.birthRegionId !== life.regionId ? life.birthRegionId : pick(others);
          life.regionId = dest; life.flags.family_region = dest; life.migrated = dest !== life.birthRegionId;
          life.stats.social -= 5;
          push(`${who}失業後，全家搬到${this.getRegion(dest).name_zh}`, `${who}丟了工作，付不起原本的房租。父母決定帶全家搬去${this.getRegion(dest).name_zh}投靠親戚、省下房租，你也跟著轉學，重新認識新同學。`,
            `改住${this.getRegion(dest).name_zh}（日後住家裡、找工作都以這裡為起點） ｜ 生活清苦、升學資源減少`);
        }
        return;
      }
      // 2. Parents move the family north for work (the classic 1960s–1990s internal migration)
      if (Math.random() < 0.012 && y >= 1960 && y <= 2005 && !["north_taipei", "north_hsinchu"].includes(life.regionId)) {
        const dest = Math.random() < 0.7 ? "north_taipei" : "north_hsinchu";
        life.regionId = dest; life.flags.family_region = dest; life.migrated = true;
        this.addHardship(life, 1, 3);
        life.flags.uni_admit_bonus = (life.flags.uni_admit_bonus || 0) + 0.03;
        life.stats.social -= 4;
        push(`全家搬到${this.getRegion(dest).name_zh}打拚`, `家鄉工作機會少，父母決定帶著全家北上${y < 1985 ? "到工廠和工地找頭路" : "找工作"}。剛開始擠在小小的租屋處，但學校和補習班選擇多了很多。`,
          `改住${this.getRegion(dest).name_zh} ｜ 頭幾年生活較擠，但日後升學與就業機會較多`);
        return;
      }
      // 3. Family business / promotion pays off
      if (Math.random() < 0.02 && life.quintile < 5 && y >= 1965 && y <= 1997) {
        this.setQuintile(life, life.quintile + 1);
        life.flags.child_hardship = 0;
        life.stats.happiness += 4;
        push(y < 1985 ? "接外銷訂單，家裡做起家庭代工" : "把握景氣，家裡的小生意做起來了", `${y < 1985 ? "父母在客廳接外銷代工、日夜趕工" : "父母抓住景氣好的那幾年擴大生意"}，家裡的經濟明顯寬裕，買了新家電，也開始送你去補習。`,
          "家境提升一級 ｜ 日後的補習、升學與成家時，家裡較有餘力支援");
        return;
      }
      // 4. Parents divorce
      const pDiv = y < 1985 ? 0.002 : y < 2000 ? 0.005 : 0.007;
      if (Math.random() < pDiv && !life.flags.parents_divorced) {
        life.flags.parents_divorced = true;
        this.addHardship(life, 1, 5);
        life.stats.happiness -= 10;
        const withMom = Math.random() < 0.6;
        push("離婚", `父母長期不合，最後決定離婚，你跟著${withMom ? "母親" : "父親"}生活。家裡少了一份收入，${withMom ? "母親" : "父親"}一個人撐起家計。`,
          "幸福 -10 ｜ 單親家庭，往後幾年生活較吃緊");
        return;
      }
      // 5. Parents with means pick a better school district
      if (Math.random() < 0.06 * (life.quintile - 2) && life.quintile >= 3 && y >= 1975 && (life.age === 6 || life.age === 12) && !life.flags.school_district_move) {
        life.flags.school_district_move = true;
        life.flags.uni_admit_bonus = (life.flags.uni_admit_bonus || 0) + 0.04;
        life.flags.hs_exam_bonus = (life.flags.hs_exam_bonus || 0) + 3;
        life.stats.social -= 2;
        push("越區就讀明星學校", `父母把你的戶籍遷到親戚家，讓你${life.age === 6 ? "越區念明星國小" : "越區念升學率高的國中"}。每天要早起搭車，班上競爭也更激烈。`,
          "升學考試與大學錄取機會提高 ｜ 通勤辛苦、離開原本的朋友");
      }
    }

    resolveMinorHouseholdCrisis(life, era) {
      if (life.age >= 18 || life.location !== "TAIWAN") return;

      // 1. Pandemic crisis while child/minor (2003 SARS, 2020-2022 COVID-19)
      const pandemicWaveKey = life.currentYear <= 2004 ? "MINOR_D23_SARS" : "MINOR_D23_COVID";
      if ([2003, 2020, 2021, 2022].includes(life.currentYear) && !life.triggeredDecisions[pandemicWaveKey]) {
        life.triggeredDecisions[pandemicWaveKey] = true;
        const stayHomeProb = life.quintile >= 4 ? 0.65 : (life.quintile === 3 ? 0.45 : 0.28);
        const parentsStayHome = Math.random() < stayHomeProb;
        const isCovid = life.currentYear >= 2020;
        const schoolNote = life.age >= 6 ? (isCovid ? "學校改採線上遠距停課，" : "進出校園天天量體溫戴口罩，") : "";
        if (parentsStayHome) {
          life.flags.pandemic_exposure_mult = 0.45;
          life.stats.happiness -= 4;
          if (life.quintile <= 3) this.addHardship(life, 1, 2);
          life.feed.unshift({
            type: "parent_decision",
            age: life.age, year: life.currentYear, roc: era.roc,
            title: `👨‍👩‍👧 父母的決定：疫情下暫停營業／居家避險`,
            text: `當時你才 ${life.age} 歲，面對${isCovid ? " COVID-19 疫情" : " SARS 疫情"}，父母為了保護年幼的你，決定暫停手邊生意或請假在家避險。${schoolNote}家中氣氛因收入縮水有些緊繃，你整天待在家裡悶得發慌，但全家平安避開了染疫風險。`,
            impactNote: "由父母代為決定：幸福 -4 ｜ 染疫風險大幅降低"
          });
        } else {
          life.flags.pandemic_exposure_mult = 1.35;
          life.stats.happiness -= 2;
          life.stats.health -= 2;
          life.feed.unshift({
            type: "parent_decision",
            age: life.age, year: life.currentYear, roc: era.roc,
            title: `👨‍👩‍👧 父母的決定：為了家計仍冒險出門上班`,
            text: `當時你才 ${life.age} 歲，面對${isCovid ? " COVID-19 疫情" : " SARS 疫情"}，父母為了維持一家生計仍須天天戴著口罩出門工作。${schoolNote}你隱約感受到大人的疲憊與焦慮，全家的健康暴露風險也隨之升高。`,
            impactNote: "由父母代為決定：健康 -2 ｜ 幸福 -2 ｜ 家庭暴露風險上升"
          });
        }
      }

      // 2. Major Disaster while child/minor (87 Flood, Gloria, 921, Morakot, 0403 Hualien, Guangfu)
      const d22 = (this.data.decisions.decisions || []).find((x) => x.id === "D22_major_disaster");
      const trigEvs = (d22 && d22.conditions && d22.conditions.trigger_events) || [];
      const activeDisaster = trigEvs
        .map((id) => this.eventMap[id])
        .find((ev) => ev && ev.disaster_year === life.currentYear && (ev.impact_regions || []).includes(life.regionId));
      if (activeDisaster && !life.triggeredDecisions[`MINOR_D22_${activeDisaster.id}`] && this.isHitByDisaster(life, activeDisaster)) {
        life.triggeredDecisions[`MINOR_D22_${activeDisaster.id}`] = true;
          const relocateProb = life.quintile >= 4 ? 0.35 : 0.25;
          const parentsRelocate = Math.random() < relocateProb;
          if (parentsRelocate) {
            const otherIds = this.data.regions.regions.map((r) => r.id).filter((id) => id !== life.regionId);
            const destId = pick(otherIds);
            const destReg = this.getRegion(destId);
            life.regionId = destId;
            life.flags.family_region = destId;
            life.migrated = destId !== life.birthRegionId;
            this.addHardship(life, 1, 3);
            life.stats.happiness -= 6;
            life.stats.social -= 7;
            life.feed.unshift({
              type: "parent_decision",
              age: life.age, year: life.currentYear, roc: era.roc,
              title: `👨‍👩‍👧 父母的決定：災後舉家搬遷至${destReg.name_zh}`,
              text: `當時你才 ${life.age} 歲，遭遇${activeDisaster.disaster_name || activeDisaster.title}重創家園後，父母徹夜商量決定帶著全家搬離受災地，前往${destReg.name_zh}重新開始。你被迫告別熟悉的家鄉與玩伴，重新適應陌生環境。`,
              impactNote: `由父母代為決定：遷居${destReg.name_zh}（日後住家裡、找工作以這裡為起點） ｜ 幸福 -6 ｜ 人際 -7 ｜ 頭幾年生活清苦`
            });
          } else {
            life.stats.happiness -= 6;
            life.stats.health -= 2;
            life.stats.social += 4;
            this.addHardship(life, life.quintile <= 3 ? 2 : 1, 3);
            life.feed.unshift({
              type: "parent_decision",
              age: life.age, year: life.currentYear, roc: era.roc,
              title: `👨‍👩‍👧 父母的決定：災後留在故鄉原地重建`,
              text: `當時你才 ${life.age} 歲，家裡在${activeDisaster.disaster_name || activeDisaster.title}中受損，父母決定咬牙申請補助、留在故鄉與街坊鄰居一起整理家園原地重建。雖然生活一度克難，但鄰里互助讓你留下深刻記憶。`,
              impactNote: "由父母代為決定：留守原鄉重建 ｜ 幸福 -6 ｜ 健康 -2 ｜ 人際 +4 ｜ 重建期間家計吃緊、升學資源減少"
            });
          }
      }
    }

    maybeTriggerAmbientPeer(life, era) {
      const list = (this.data.ambientPeers && this.data.ambientPeers.vignettes) || [];
      if (!list.length) return false;
      if (life.age - (life.flags.lastPeerVignetteAge != null ? life.flags.lastPeerVignetteAge : -10) < 3) return false;
      if (Math.random() > 0.42) return false;

      const seen = life.flags.seenPeers || {};
      const pool = list.filter((v) => {
        if (seen[v.id]) return false;
        if (life.currentYear < v.year_range[0] || life.currentYear > v.year_range[1]) return false;
        if (life.age < v.age_range[0] || life.age > v.age_range[1]) return false;
        if (v.regions && !v.regions.includes(life.regionId)) return false;
        if (v.min_edu_level && life.eduLevel < v.min_edu_level) return false;
        if (v.requires_working && (life.workYears || 0) < 1) return false;
        if (v.requires_flag && !(life.flags && life.flags[v.requires_flag])) return false;
        if (v.requires_hs && !["top_hs", "normal_hs"].includes(life.flags.hs_tier)) return false;
        if (v.sex && life.sex !== v.sex) return false;
        if (v.memory && life.flags.memories && life.flags.memories[v.memory]) return false;
        return true;
      });
      if (!pool.length) return false;

      const picked = pick(pool);
      life.flags.seenPeers = seen;
      life.flags.seenPeers[picked.id] = true;
      life.flags.lastPeerVignetteAge = life.age;
      if (picked.memory) {
        life.flags.memories = life.flags.memories || {};
        life.flags.memories[picked.memory] = { year: life.currentYear, age: life.age, echo: picked.memory_echo || picked.text };
      }
      life.feed.unshift({
        type: "peer_vignette",
        category: picked.category || "friend",
        age: life.age,
        year: life.currentYear,
        roc: era.roc,
        relation: picked.relation,
        text: picked.text,
        historical_note: picked.historical_note || ""
      });
      return true;
    }

    applyFutureForecastImpact(life, ev, era) {
      const imp = ev.gameplay_impact || {};
      const notes = [];
      const isTech = Boolean((life.sector && (life.sector.includes("科技") || life.sector.includes("半導體") || life.sector.includes("軟體") || life.sector.includes("AI"))) || life.major === "stem_eng");

      if (imp.wage_mult && imp.wage_mult !== 1) {
        life.flags.wage_mult = clamp((life.flags.wage_mult || 1.0) * imp.wage_mult, 0.55, 1.28);
        const p = Math.round((imp.wage_mult - 1) * 100);
        notes.push(`整體薪資倍率 ${p >= 0 ? "+" : ""}${p}%`);
      }
      if (imp.tech_wage_mult && isTech) {
        life.flags.wage_mult = clamp((life.flags.wage_mult || 1.0) * imp.tech_wage_mult, 0.55, 1.28);
        const p = Math.round((imp.tech_wage_mult - 1) * 100);
        notes.push(`科技／電資領域薪資 ${p >= 0 ? "+" : ""}${p}%`);
      }
      if (imp.non_tech_wage_mult && !isTech) {
        life.flags.wage_mult = clamp((life.flags.wage_mult || 1.0) * imp.non_tech_wage_mult, 0.55, 1.28);
        const p = Math.round((imp.non_tech_wage_mult - 1) * 100);
        notes.push(`非科技產業薪資 ${p >= 0 ? "+" : ""}${p}%`);
      }
      if (imp.region_bonus_ids && imp.region_wage_mult && life.location === "TAIWAN" && imp.region_bonus_ids.includes(life.regionId)) {
        life.flags.wage_mult = clamp((life.flags.wage_mult || 1.0) * imp.region_wage_mult, 0.55, 1.28);
        const p = Math.round((imp.region_wage_mult - 1) * 100);
        notes.push(`在地工作薪資提升 +${p}%`);
      }
      if (imp.housing_cost_mult && !life.homeowner) {
        life.flags.future_rent_mult = clamp((life.flags.future_rent_mult || 1.0) * imp.housing_cost_mult, 0.5, 2.0);
        notes.push(`租屋成本 +${Math.round((imp.housing_cost_mult - 1) * 100)}%`);
      }
      if (imp.living_cost_mult && imp.living_cost_mult !== 1) {
        life.flags.future_living_cost_mult = clamp((life.flags.future_living_cost_mult || 1.0) * imp.living_cost_mult, 0.5, 2.0);
        const p = Math.round((imp.living_cost_mult - 1) * 100);
        notes.push(`年度生活費 ${p >= 0 ? "+" : ""}${p}%`);
      }
      if (imp.rent_cost_mult && imp.rent_cost_mult !== 1 && !life.homeowner) {
        life.flags.future_rent_mult = clamp((life.flags.future_rent_mult || 1.0) * imp.rent_cost_mult, 0.5, 2.0);
        const p = Math.round((imp.rent_cost_mult - 1) * 100);
        notes.push(`租屋成本 ${p >= 0 ? "+" : ""}${p}%`);
      }
      if (imp.care_cost_mult && imp.care_cost_mult !== 1) {
        life.flags.future_care_cost_mult = clamp((life.flags.future_care_cost_mult || 1.0) * imp.care_cost_mult, 0.5, 2.0);
        const p = Math.round((imp.care_cost_mult - 1) * 100);
        notes.push(`長照輔具／照護費 ${p >= 0 ? "+" : ""}${p}%`);
      }
      if (imp.clear_elderly_rent_risk && life.flags.elderly_rent_rejection_risk) {
        life.flags.elderly_rent_rejection_risk = false;
        notes.push("解除高齡租屋受拒風險");
      }
      if (imp.unlock_remote_all || (imp.unlock_remote_if_tech && isTech)) {
        life.flags.remote_capable = true;
        notes.push("解鎖跨縣市／跨國遠距工作彈性");
      }
      if (imp.stock_shock_pct && life.stockNominal > 0) {
        const delta = Math.round(life.stockNominal * imp.stock_shock_pct);
        life.stockNominal = Math.max(0, life.stockNominal + delta);
        notes.push(`持股受市場推演影響 ${delta >= 0 ? "+" : "-"}NT$${Math.abs(delta).toLocaleString()}`);
      }
      if (imp.housing_divergence && life.homeowner && life.homeValueNominal > 0) {
        const isCore = life.regionId === "north_taipei" || life.regionId === "north_hsinchu";
        const rate = isCore ? 0.04 : -0.08;
        const delta = Math.round(life.homeValueNominal * rate);
        life.homeValueNominal = Math.max(Math.round(400000 * era.cpi), life.homeValueNominal + delta);
        notes.push(`房產估值分化（${isCore ? "核心區 +4%" : "非核心區 -8%"}）`);
      }
      if (imp.region_housing_shock_ids && imp.region_housing_shock_pct && life.homeowner && imp.region_housing_shock_ids.includes(life.regionId)) {
        const delta = Math.round(life.homeValueNominal * imp.region_housing_shock_pct);
        life.homeValueNominal = Math.max(Math.round(400000 * era.cpi), life.homeValueNominal + delta);
        notes.push(`沿海防洪重劃影響房產估值 ${Math.round(imp.region_housing_shock_pct * 100)}%`);
      }
      if (imp.cash_subsidy_2025 && life.age >= 18 && (life.flags.unemployed || life.flags.fulltime_caregiver || (life.workYears > 0 && life.quintile <= 2))) {
        const amt = Math.round(imp.cash_subsidy_2025 * era.cpi);
        life.moneyNominal += amt;
        notes.push(`領取轉型基本生活津貼 +NT$${amt.toLocaleString()}`);
      }
      if (imp.mortality_mult && imp.mortality_mult !== 1) {
        life.flags.future_mortality_mult = clamp((life.flags.future_mortality_mult || 1.0) * imp.mortality_mult, 0.62, 1.4);
        const p = Math.round((imp.mortality_mult - 1) * 100);
        notes.push(`長期健康存活率提升（死亡風險 ${p}%）`);
      }
      if (imp.health_delta) { life.stats.health += imp.health_delta; notes.push(`健康 ${imp.health_delta > 0 ? "+" : ""}${imp.health_delta}`); }
      if (imp.health_delta_elder && life.age >= 55) { life.stats.health += imp.health_delta_elder; notes.push(`高齡健康 +${imp.health_delta_elder}`); }
      if (imp.health_delta_east && life.regionId === "east_islands") { life.stats.health += imp.health_delta_east; notes.push(`東部醫療可近性提升（健康 +${imp.health_delta_east}）`); }
      if (imp.happiness_delta) { life.stats.happiness += imp.happiness_delta; notes.push(`幸福 ${imp.happiness_delta > 0 ? "+" : ""}${imp.happiness_delta}`); }
      if (imp.social_delta) { life.stats.social += imp.social_delta; notes.push(`人際 ${imp.social_delta > 0 ? "+" : ""}${imp.social_delta}`); }
      if (imp.knowledge_delta) { life.stats.knowledge += imp.knowledge_delta; notes.push(`知識 ${imp.knowledge_delta > 0 ? "+" : ""}${imp.knowledge_delta}`); }
      if (imp.reduce_scam_risk) { life.flags.future_antiscam_shield = true; notes.push("AI 反詐防火牆上線，降低詐騙風險"); }

      return notes;
    }

    maybeTriggerFutureForecast(life, era, cultEra) {
      if (life.currentYear < 2027) return false;
      const events = (this.data.futureForecasts && this.data.futureForecasts.events) || [];
      if (!events.length) return false;

      if (!life.futureWorld) {
        life.futureWorld = { flags: {}, groups: {}, triggered: {}, lastForecastAge: -10 };
      }
      const fw = life.futureWorld;
      const line = this.ensureWorldLine(life);
      if (life.age - (fw.lastForecastAge != null ? fw.lastForecastAge : -10) < 3) return false;

      const candidates = events.filter((ev) => {
        if (fw.triggered[ev.id]) return false;
        if (life.currentYear < ev.year_range[0] || life.currentYear > ev.year_range[1]) return false;
        if (ev.mutually_exclusive_group && fw.groups[ev.mutually_exclusive_group]) return false;
        if (Array.isArray(ev.requires_world_flags) && !ev.requires_world_flags.every((fl) => fw.flags[fl])) return false;
        if (Array.isArray(ev.excludes_world_flags) && ev.excludes_world_flags.some((fl) => fw.flags[fl])) return false;
        if (ev.requires_world_line && !Object.entries(ev.requires_world_line).every(([ax, vals]) => vals.includes(line[ax]))) return false;
        if (ev.regions && !ev.regions.includes("ALL")) {
          const checkReg = life.location === "TAIWAN" ? life.regionId : life.birthRegionId;
          if (!ev.regions.includes(checkReg)) return false;
        }
        return true;
      });
      if (!candidates.length) return false;

      const bias = (ev) => Object.entries(ev.world_bias || {}).reduce((m, [ax, tbl]) => m * (tbl[line[ax]] != null ? tbl[line[ax]] : 1), 1);
      const picked = weightedPick(candidates, (ev) => bias(ev));
      const gapYrs = life.age - (fw.lastForecastAge != null ? fw.lastForecastAge : -10);
      const baseProb = (picked.probability != null ? picked.probability : 0.34) * clamp(bias(picked), 0.3, 1.8);
      const effProb = clamp(gapYrs >= 6 ? baseProb + 0.2 : baseProb, 0.04, 0.8);
      if (Math.random() > effProb) return false;

      fw.triggered[picked.id] = life.currentYear;
      fw.lastForecastAge = life.age;
      if (picked.mutually_exclusive_group) fw.groups[picked.mutually_exclusive_group] = picked.id;
      for (const fl of (picked.sets_world_flags || [])) fw.flags[fl] = true;

      const impactNotes = this.applyFutureForecastImpact(life, picked, era);
      const overseasWire = life.location !== "TAIWAN";
      life.feed.unshift({
        type: "future_forecast",
        id: picked.id,
        age: life.age,
        year: life.currentYear,
        roc: era.roc,
        category: picked.category,
        title: picked.title,
        summary: picked.summary,
        aftermath: picked.institutional_aftermath,
        trend_basis: picked.trend_basis || "虛構推演 · 依當前趨勢模擬",
        impactNotes,
        cultural_footnote_en: picked.cultural_footnote_en || "",
        overseasWire,
        commChannel: this.getOverseasCommChannel(life.currentYear)
      });
      return true;
    }

    // Unified option eligibility checker shared by UI, Auto Mode, and Lab
    isOptionEligible(life, opt, era) {
      if (opt.requires_able_body && (life.flags.disabled || life.flags.disability_level)) {
        return { eligible: false, reason: "身體狀況無法負荷這條路" };
      }
      if (opt.requires_stats) {
        for (const [k, min] of Object.entries(opt.requires_stats)) {
          const cur = Math.round(life.stats[k] || 0);
          if (cur < min) return { eligible: false, reason: `${STAT_NAMES[k] || k}不足（需 ${min}，目前 ${cur}）` };
        }
      }
      if (opt.requires && typeof opt.requires === "object") {
        const rq = opt.requires;
        if (rq.quintile_min && life.quintile < rq.quintile_min) return { eligible: false, reason: "家庭經濟條件不足以支應" };
        if (rq.homeowner && !life.homeowner) return { eligible: false, reason: "名下沒有房子" };
        if (rq.working && !this.isWorkingNow(life)) return { eligible: false, reason: "目前沒有工作" };
        if (rq.unmarried_or_no_kids && life.married && life.children > 0) return { eligible: false, reason: "已有家庭與子女，難以說走就走" };
        if (rq.has_children && life.children <= 0) return { eligible: false, reason: "沒有子女" };
      }
      if (opt.requires_siblings && life.family.siblings <= 0) {
        return { eligible: false, reason: "你是獨生子女，無法與手足分擔" };
      }
      if (opt.requires_year_min && life.currentYear < opt.requires_year_min) {
        return { eligible: false, reason: "此制度於當前年代尚未開放" };
      }
      if (opt.requires_edu === "master_or_stem" && !(life.eduLevel >= 4 && (life.currentYear < 2000 || life.major === "stem_eng" || life.major === "med_health"))) {
        return { eligible: false, reason: life.currentYear < 2000 ? "需具備大學以上學歷" : "需具備大學以上理工電資或醫藥背景" };
      }
      if (opt.requires_remote_or_senior && !(life.flags.remote_capable || life.workYears >= 8)) {
        return { eligible: false, reason: "需具備遠距彈性職涯（軟體／金融／創作者）或 8 年以上資深年資" };
      }
      if (opt.requires_exam_tier) {
        const tier = life.flags.hs_exam_result_tier;
        if (opt.requires_exam_tier === "top_hs" && tier !== "top_hs") {
          return { eligible: false, reason: `本次升學考落點未達第一志願門檻（分數 ${life.flags.hs_exam_score || 0}）` };
        }
        if (opt.requires_exam_tier === "normal_hs_or_above" && !(tier === "top_hs" || tier === "normal_hs")) {
          return { eligible: false, reason: `本次升學考分數未達普通高中門檻（分數 ${life.flags.hs_exam_score || 0}），建議改選高職／五專或提早就業` };
        }
      }
      if (opt.requires_edu_min && life.eduLevel < opt.requires_edu_min) {
        return { eligible: false, reason: "須具高中職以上學歷方可報考" };
      }
      if ((opt.key === "cram_study" || opt.key === "sports_arts") && (life.flags.child_hardship || 0) >= 2) {
        return { eligible: false, reason: "家裡經濟吃緊，父母沒辦法負擔補習或才藝課" };
      }
      if (["enter_junior", "enter_top_hs", "enter_normal_hs"].includes(opt.key) && (life.flags.child_hardship || 0) >= 2 && life.quintile <= 2 && life.currentYear < 1985) {
        return { eligible: false, reason: "家裡經濟吃緊，父母要你改念學費較低、能早點就業的學校，或先去工作貼補家用" };
      }
      if (opt.requires_knowledge_min && life.stats.knowledge < opt.requires_knowledge_min) {
        return { eligible: false, reason: `需知識屬性達 ${opt.requires_knowledge_min} 以上（目前 ${life.stats.knowledge}）` };
      }
      if (opt.requires_social_or_club && !(life.stats.social >= 68 || life.flags.uni_club_leader)) {
        return { eligible: false, reason: `需人際屬性 ≥ 68（目前 ${life.stats.social}）或曾任大學社團幹部` };
      }
      if (opt.requires_children && life.children <= 0) {
        return { eligible: false, reason: "你目前沒有子女，無孫輩照顧情境" };
      }
      if (opt.requires_adult_children) {
        const births = life.childrenBirthYears || [];
        const hasAdultChild = births.some((by) => (life.currentYear - by) >= 25);
        if (!hasAdultChild) {
          return { eligible: false, reason: "子女尚未成年成家，暫無照顧孫輩情境" };
        }
      }
      const th = (this.data.marketHistory && this.data.marketHistory.financial_thresholds_2025) || {};
      const liquidNom = this.getLiquidNominal(life);
      const realLiquid = liquidNom / Math.max(0.07, era.cpi);
      const realSalary = (life.annualSalaryNominal || 0) / Math.max(0.07, era.cpi);

      if (opt.requires_home_afford) {
        const spec = this.getHomeCostSpec(life, opt.requires_home_afford, era);
        const effSalary = (life.annualSalaryNominal || 0) + ((life.married && life.spouse && !life.spouse.retired) ? (life.spouse.incomeNominal || 0) : 0);
        if (liquidNom < spec.requiredOwnCash) {
          return {
            eligible: false,
            reason: `存款不足頭期款（需自備約 NT$${Math.round(spec.requiredOwnCash / 10000).toLocaleString()} 萬${spec.parentHelp > 0 ? "，已計入父母贊助" : ""}；目前流動資產 NT$${Math.round(liquidNom / 10000).toLocaleString()} 萬），只能先租房`
          };
        }
        if (effSalary < spec.minAnnualIncome * (life.quintile === 5 ? 0.6 : life.quintile === 4 ? 0.85 : 1)) {
          return {
            eligible: false,
            reason: `年薪不足以核貸（銀行要求年收至少約 NT$${Math.round(spec.minAnnualIncome / 10000).toLocaleString()} 萬）`
          };
        }
      }
      if (opt.requires_med_afford) {
        const medNeed = this.getMedicalSelfPayNominal(life, era);
        if (liquidNom < medNeed) {
          return {
            eligible: false,
            reason: `流動資產不足自費療程費（需約 NT$${Math.round(medNeed / 10000).toLocaleString()} 萬，目前僅 NT$${Math.round(Math.max(0, liquidNom) / 10000).toLocaleString()} 萬）`
          };
        }
      }
      if (opt.requires_homeowner_for_med) {
        const medNeed = this.getMedicalSelfPayNominal(life, era);
        if (!life.homeowner) {
          return { eligible: false, reason: "名下無自購房產可變賣籌款" };
        }
        if (liquidNom >= medNeed) {
          return { eligible: false, reason: "現有流動存款已足夠負擔自費療程，無須賣房" };
        }
      }
      if (opt.requires_wedding_afford) {
        const need = Math.round((th.traditional_wedding_cost || 600000) * this.wageScale(era) * era.cpi);
        const pHelp = life.quintile >= 4 ? Math.round(need * 0.5) : 0;
        if (liquidNom + pHelp < need) {
          return { eligible: false, reason: `存款不足以負擔傳統聘金宴客（需約 NT$${Math.round((need - pHelp) / 10000).toLocaleString()} 萬）` };
        }
      }
      if (opt.requires_cram_afford) {
        if (realSalary < (th.private_cram_min_salary || 720000) && realLiquid < (th.private_cram_min_liquid || 450000)) {
          return { eligible: false, reason: "家庭年薪與存款不足以支撐私校雙語與全科補習開銷" };
        }
      }
      if (opt.requires_caregiver_afford) {
        if (realSalary < (th.caregiver_min_salary || 420000) && realLiquid < (th.caregiver_min_liquid || 350000)) {
          return { eligible: false, reason: "薪資與積蓄不足以長期負擔每月外籍看護／機構費用" };
        }
      }
      if (opt.requires_child_abroad_cash) {
        const need = Math.round((th.child_abroad_full || 2400000) * era.cpi);
        if (liquidNom < need) {
          return { eligible: false, reason: `存款不足以資助子女留學（需約 NT$${Math.round(need / 10000).toLocaleString()} 萬，目前流動資產 NT$${Math.round(Math.max(0, liquidNom) / 10000).toLocaleString()} 萬）` };
        }
      }
      if (opt.requires_child_abroad_home) {
        const eqNeed = Math.round((th.child_abroad_mortgage_equity || 1600000) * era.cpi);
        const eq = life.homeowner ? Math.max(0, (life.homeValueNominal || 0) - (life.mortgageBalanceNominal || 0)) : 0;
        if (!life.homeowner || eq < eqNeed) {
          return { eligible: false, reason: "名下無房或房產淨值不足以增貸籌措留學金" };
        }
      }
      if (opt.requires_vehicle_afford) {
        const vCost = this.getVehicleCostNominal(opt.requires_vehicle_afford, era);
        if (liquidNom < vCost) {
          return {
            eligible: false,
            reason: `流動資產不足購車款（需約 NT$${Math.round(vCost / 10000).toLocaleString()} 萬，目前流動資產 NT$${Math.round(Math.max(0, liquidNom) / 10000).toLocaleString()} 萬）`
          };
        }
      }
      if (opt.requires_vehicle && !(life.ownedAssets && life.ownedAssets.vehicle)) {
        return { eligible: false, reason: "你目前名下沒有持有汽車或機車可變賣（須先購買或獲贈車輛）" };
      }
      if (opt.requires_valuables && !(life.ownedAssets && life.ownedAssets.valuables)) {
        return { eligible: false, reason: "你目前沒有持有高價金飾、嫁妝或傳家珠寶可變賣" };
      }
      if (opt.requires_homeowner && !life.homeowner) {
        return { eligible: false, reason: "你目前名下沒有自住房產可變賣" };
      }
      if (opt.requires_relative_borrow) {
        if (!(life.stats.social >= 45 || life.quintile >= 3)) {
          return { eligible: false, reason: `親友支援度不足（需人際 ≥ 45 或家境 Q3 以上，目前人際 ${life.stats.social}）` };
        }
      }
      if (opt.requires_borrow_rescue) {
        if (!(life.stats.social >= 60 || life.quintile >= 4)) {
          return { eligible: false, reason: `人脈支持度不足（需人際 ≥ 60 或家境 Q4 以上，目前人際 ${life.stats.social}）` };
        }
      }
      const earlyOk = life.age >= this.getPensionAge(life) - 4 && this.getLiquidNominal(life) / Math.max(0.07, era.cpi) >= 3500000;
      if (opt.requires_pension_age && life.age < this.getPensionAge(life) && !earlyOk) {
        return { eligible: false, reason: `尚未達請領年齡（約 ${this.getPensionAge(life)} 歲）` };
      }
      if (opt.requires_fire_assets) {
        const realAssets = this.getNetWorthNominal(life) / Math.max(0.07, era.cpi);
        if (realAssets < FIRE_ASSET_THRESHOLD_2025) {
          return {
            eligible: false,
            reason: `需實質淨資產達 NT$1,500 萬以上（目前約 NT$${Math.round(realAssets / 10000).toLocaleString()} 萬）`
          };
        }
      }
      if (opt.key === "study_abroad") {
        if (!(life.quintile >= 4 || realLiquid >= 1200000 || life.stats.knowledge >= 75)) {
          return { eligible: false, reason: "須具 Q4–Q5 家庭資源、流動資產 ≥ NT$120 萬或頂尖獎學金門檻（知識 ≥ 75）方可出國留學" };
        }
      }
      return { eligible: true, reason: "" };
    }

    chooseAutoOption(life, decision, eligibleOpts, era) {
      const bias = decision && decision.memoryBias;
      if (!bias || !eligibleOpts || eligibleOpts.length < 2) return this.chooseAutoOptionCore(life, decision, eligibleOpts, era);
      // 記憶偏好：以拒絕取樣把原本的權重乘上偏好倍率
      const maxB = Math.max(1, ...Object.values(bias));
      let pickOpt = null;
      for (let i = 0; i < 8; i++) {
        pickOpt = this.chooseAutoOptionCore(life, decision, eligibleOpts, era);
        if (Math.random() < (bias[pickOpt.key] != null ? bias[pickOpt.key] : 1) / maxB) return pickOpt;
      }
      return pickOpt;
    }

    chooseAutoOptionCore(life, decision, eligibleOpts, era) {
      if (decision && decision.isFocusCard) {
        const k = this.chooseFocusAuto(life);
        return eligibleOpts.find((o) => o.key === k) || eligibleOpts[0];
      }
      if (!eligibleOpts || !eligibleOpts.length) return decision.options[0];
      if (eligibleOpts.length === 1) return eligibleOpts[0];
      if (decision.isEraCard) {
        return weightedPick(eligibleOpts, (o) => (o.auto_weight != null ? o.auto_weight : 0.3) *
          (life.personalities || []).reduce((m, p) => m * ((o.trait_weight && o.trait_weight[p.id]) || 1), 1));
      }

      const id = decision.id;
      const isTrait = (tid) => (life.personalities || []).some((p) => p.id === tid);
      const yrNow = life.currentYear;
      const lerpY = (pts) => this.interpByYear(pts, yrNow);
      const hasRisk = isTrait("risk_taker");
      const isCautious = isTrait("cautious");
      const isFamily = isTrait("family_first");

      const everMarryTarget = this.interpByYear([[1950, 0.965], [1960, 0.94], [1970, 0.86], [1980, 0.74], [1990, 0.64], [2005, 0.6], [2026, 0.6]], life.birthYear);
      const wantsMarriage = life.marriageInclination < everMarryTarget;
      const wMap = {
        LS02A_primary_exam: () => {
          const poorGirl = life.sex === "F" ? 0.24 * (6 - life.quintile) / 5 : 0;
          const stop = clamp(0.52 - (life.quintile - 1) * 0.12 + poorGirl, 0.03, 0.8);
          return { enter_junior: (1 - stop) * 0.82, enter_junior_voc: (1 - stop) * 0.18, stop_after_primary: stop };
        },
        LS02_junior_high_exam_branch: () => {
          const eduEra = this.getEduEra(yrNow) || {};
          const girl = (life.sex === "F" && life.quintile <= 2) ? (eduEra.female_early_work_prob_q1_q2 || 0) : 0;
          const stop = clamp(lerpY([[1965, 0.34], [1972, 0.26], [1982, 0.14], [1990, 0.06], [2000, 0.02], [2015, 0.006]]) * (1.5 - life.quintile * 0.17) + girl * 0.4, 0.002, 0.6);
          const hi = lerpY([[1965, 0.5], [1985, 0.42], [2000, 0.5], [2015, 0.56]]);
          return { enter_top_hs: 2.5, enter_normal_hs: (1 - stop) * hi, enter_vocational: (1 - stop) * (1 - hi), stop_schooling: stop };
        },
        LS04_vocational_path: () => ({ skill_cert_competition: 0.22, coop_internship: 0.4, aim_tech_uni: lerpY([[1970, 0.1], [1990, 0.25], [2005, 0.6]]) }),
        LS05_early_apprentice: () => ({ master_craft: 0.32, night_school: 0.2, casual_jobs: 0.48 }),
        LS08_workplace_levelup: () => ({ network_referral: 0.22, exec_cert_study: 0.22, switch_civil_service: 0.12, steady_balance: 0.44 }),
        D01B_youth_parttime_request: () => ({ persuade_parents_parttime: life.quintile <= 2 ? 0.35 : 0.15, focus_on_studies: 0.8 }),
        D02_university_major: () => {
          const m = life.sex === "M";
          return { stem_eng: m ? 0.46 : 0.12, med_doctor: 0.05, health_allied: m ? 0.04 : 0.14, law: 0.05, biz: m ? 0.2 : 0.3, arts: m ? 0.13 : 0.3, public_funded: yrNow < 1995 ? 0.09 : 0.05 };
        },
        D03_exam_retake: () => ({ cram_school: lerpY([[1975, 0.28], [2000, 0.16], [2015, 0.06]]), transfer_or_grad: yrNow >= 1997 ? 0.1 : 0, work_or_military: lerpY([[1975, 0.66], [2000, 0.6], [2015, 0.5]]) }),
        D04_military_service: () => ({ conscription: 0.86, rd_substitute: 0.1, volunteer_soldier: 0.045 }),
        D07_career_track: () => {
          const w = {};
          for (const o of eligibleOpts) {
            if (o.key === "civil_service") w[o.key] = 0.1;
            else if (o.key === "family_biz_startup") w[o.key] = life.quintile >= 4 ? 0.07 : 0.035;
            else if (o.key.startsWith("career_")) {
              const car = (this.data.educationCareers.careers || []).find((x) => "career_" + x.id === o.key);
              w[o.key] = car && car.entry === "license" && !car.auto_license ? 0.2 : car && car.auto_license ? 2.5 : (car && car.pick_weight != null ? car.pick_weight : 1) * (life.sex === "F" && car && car.female_weight != null ? car.female_weight : 1) * 0.3;
            }
          }
          return w;
        },
        D07B_career_switch: () => {
          const w = {};
          const prompted = Boolean(life.flags.switch_prompt && yrNow <= life.flags.switch_prompt);
          for (const o of eligibleOpts) w[o.key] = o.key === "stay_current_grow" ? (prompted ? 0.35 : 0.62) : 0.13;
          return w;
        },
        D08_overseas_assignment: () => ({ accept_expat: 0.2, decline_stay: 0.8 }),
        D09_return_hometown_dilemma: () => ({ stay_north: 0.76, return_home: 0.24 }),
        D10_unpaid_leave: () => ({ gig_side_job: 0.66, resign_retrain: 0.2, borrow_credit: 0.14 }),
        D12_first_pot_of_gold: () => ({ time_deposit: lerpY([[1975, 0.88], [1988, 0.58], [2000, 0.68], [2015, 0.6], [2024, 0.5]]), etf_dca: lerpY([[1975, 0.1], [1988, 0.3], [2000, 0.24], [2015, 0.34], [2024, 0.44]]), margin_speculation: hasRisk ? 0.12 : isCautious ? 0.01 : 0.04 }),
        D12B_vehicle_purchase: () => ({ buy_car: 0.25, buy_scooter: life.regionId === "north_taipei" ? 0.35 : 0.55, public_transit: life.regionId === "north_taipei" ? 0.4 : 0.2 }),
        D15_stock_crash_panic: () => ({ panic_sell: 0.4, hold_diamond: 0.46, buy_the_dip: 0.14 }),
        D21_child_education_race: () => ({ private_cram: 0.35, public_balanced: 0.65 }),
        D22_major_disaster: () => ({ rebuild_local: 0.72, relocate_region: 0.28 }),
        D23_pandemic_dilemma: () => ({ strict_stay_home: 0.45, keep_working: 0.55 }),
        D24_elderly_care_storm: () => ({ hire_caregiver: 0.4, quit_fulltime_care: life.sex === "F" ? 0.14 : 0.07, share_with_siblings: 0.46 }),
        D25_retirement_timing: () => ({ standard_retire: life.age >= 64 ? 0.85 : 0.66, second_career: life.age >= 64 ? 0.15 : 0.34, early_fire: 0.16 }),
        D28_debt_clearance: () => ({ file_rehab: 0.7, grind_repay: 0.3 }),
        D29_child_study_abroad: () => {
          // 付得起的家庭多半會資助；存款愈寬裕愈可能全額支持
          const th = (this.data.marketHistory && this.data.marketHistory.financial_thresholds_2025) || {};
          const need = Math.max(1, (th.child_abroad_full || 2400000) * era.cpi);
          const ratio = this.getLiquidNominal(life) / need;
          const fundW = eligibleOpts.some((o) => o.key === "fund_abroad_full") ? clamp(0.4 + (ratio - 1) * 0.12, 0.4, 0.8) : 0;
          const homeW = eligibleOpts.some((o) => o.key === "mortgage_home_for_child") ? (fundW ? 0.05 : 0.3) : 0;
          return { fund_abroad_full: fundW, mortgage_home_for_child: homeW, cannot_afford_abroad: Math.max(0.15, 1 - fundW - homeW) };
        },
        D30_forced_home_sale: () => ({ sell_home_survive: 0.5, borrow_hold_home: 0.45, foreclosure_auction: 0.05 }),
        D31_cashflow_debt_crisis: () => ({ sell_vehicle: 0.3, sell_valuables: 0.35, sell_home_crisis: 0.06, borrow_relatives: 0.3, high_interest_loan: 0.14 }),
        D17B_romance_encounter: () => {
          const p = wantsMarriage ? 0.94 : 0.4;
          return { start_romance: p, focus_self: 1 - p };
        },
        D18_marriage_choice: () => {
          const marryW = wantsMarriage ? 0.9 : 0.04;
          const tradShare = life.currentYear < 1995 ? 0.8 : 0.55;
          return {
            traditional_wedding: marryW * tradShare,
            simple_registration: marryW * (1 - tradShare),
            stay_unmarried: 1 - marryW
          };
        },
        D19_have_children: () => {
          const want = life.children < life.desiredKids;
          const tries = life.flags.infertile_tries || 0;
          return { have_child: want ? (tries >= 2 ? 0.45 : 0.82) : 0.03, not_now: want ? 0.18 : 0.25, dink_pets: want ? (tries >= 3 ? 0.3 : 0) : 0.72, ivf: want ? 0.3 : 0, adopt: want ? 0.06 : 0 };
        },
        D14_financial_trap: () => ({
          reject: isCautious ? 0.95 : hasRisk ? 0.6 : 0.84,
          small_try: isCautious ? 0.04 : hasRisk ? 0.3 : 0.13,
          all_in: isCautious ? 0.01 : hasRisk ? 0.1 : 0.03
        }),
        D16_relative_loan_guarantor: () => ({
          co_sign: isFamily ? 0.24 : isCautious ? 0.05 : 0.12,
          small_gift_no_guarantee: 0.48,
          refuse: isFamily ? 0.28 : 0.40
        }),
        D13_buying_home: () => ({
          buy_core_40yr: 0.22,
          buy_suburb: 0.66,
          rent_and_invest: 0.12
        }),
        D06_northbound_migration: () => {
          const r = this.getRegion(life.regionId);
          const rates = (r && r.out_migration_rates) || {};
          const p = clamp(rates.to_north || rates.to_west_metro || 0.30, 0.18, 0.55);
          return { move_north: p, stay_home: 1 - p };
        },
        D05_graduation_crossroads: () => {
          const abroadW = life.quintile >= 4 ? 0.07 : 0.015;
          if (life.currentYear < 1995) return { direct_work: 0.86, domestic_master: 0.08, study_abroad: abroadW };
          return { direct_work: 0.7, domestic_master: life.major === "stem_eng" ? 0.36 : 0.17, study_abroad: abroadW };
        },
        D20_marriage_crisis: () => {
          if (life.currentYear < 1990) return { endure_for_kids: 0.5, move_out_counseling: 0.3, divorce: 0.2 };
          return { move_out_counseling: 0.32, endure_for_kids: 0.23, divorce: 0.45 };
        }
      };

      if (wMap[id]) {
        const weights = wMap[id]();
        const bias = TRAIT_BIAS[id] || {};
        const traitMult = (key) => (life.personalities || []).reduce((m, p) => {
          const b = bias[p.id];
          if (!b) return m;
          const v = b[key] != null ? b[key] : (key.startsWith("switch_") ? b["switch_*"] : null);
          return v != null ? m * v : m;
        }, 1);
        return weightedPick(eligibleOpts, (o) => (weights[o.key] != null ? weights[o.key] : 0.2) * traitMult(o.key));
      }
      if (decision.isStudyAbroadCard && !decision.isMinorAbroadCard) {
        return weightedPick(eligibleOpts, (o) => (o.key === "stay_taiwan" ? 0.72 : 0.09));
      }
      if (id === "D27_return_to_taiwan") {
        return weightedPick(eligibleOpts, (o) => (o.key === "return_taiwan" ? 0.42 : o.key === "stay_abroad" ? 0.48 : 0.1));
      }
      return pick(eligibleOpts);
    }

    calcAnnualDeathProb(life, era) {
      const bands = this.data.lifetable.age_bands_2020s;
      let band = bands[bands.length - 1];
      for (const b of bands) {
        if (life.age >= b.age_min && life.age <= b.age_max) { band = b; break; }
      }
      let baseQx = (life.sex === "M" ? band.qx_per_1000_male : band.qx_per_1000_female) / 1000;
      if (life.age >= 65) {
        const mid = (band.age_min + Math.min(band.age_max, 100)) / 2;
        baseQx *= Math.pow(1.075, life.age - mid);
      }
      const yr = life.currentYear;
      let dmult = 1.0;
      if (yr < 1960) dmult = 3.2;
      else if (yr < 1970) dmult = 2.4;
      else if (yr < 1980) dmult = 1.85;
      else if (yr < 1990) dmult = 1.45;
      else if (yr < 2000) dmult = 1.25;
      else if (yr < 2010) dmult = 1.12;
      else if (yr < 2020) dmult = 1.04;
      if (life.age === 0 && yr < 1980) dmult *= 2.5;

      const reg = this.getRegion(life.regionId);
      const rmult = Math.max(0.65, 1.0 - reg.life_expectancy.offset_from_national * 0.11);
      const sexCalib = life.sex === "M" ? 0.95 : 0.76;

      let healthMult = clamp(1.0 + (65 - life.stats.health) * 0.014, 0.72, 2.2);
      if (life.age >= 45 && life.location === "TAIWAN" && !this.hasSwitch(yr, "nhi_universal_healthcare")) {
        healthMult *= 1.12;
      }
      if (life.flags.midlife_mortality_mult) healthMult *= life.flags.midlife_mortality_mult;
      if (life.flags.future_mortality_mult) healthMult *= life.flags.future_mortality_mult;
      if (life.flags.betel_nut_habit && life.age >= 40) healthMult *= 1.25;
      if (life.flags.disabled) healthMult *= 1.55;
      if (life.flags.inadequate_med_years > 0) healthMult *= 2.35;
      if (yr === 2022 && life.age >= 65 && life.location === "TAIWAN") healthMult *= 1.15;
      if (life.flags.pandemic_exposure_mult && (yr === 2003 || (yr >= 2020 && yr <= 2022))) {
        healthMult *= life.flags.pandemic_exposure_mult;
      }

      return { qx: clamp(baseQx * dmult * rmult * sexCalib * healthMult, 0.00008, 0.95), band };
    }

    pickCauseOfDeath(life, band, eduMode) {
      const causeLabels = {
        congenital_perinatal: "先天或周產期併發症",
        accident_other: "意外與其他因素",
        accident: "意外事故",
        accident_traffic: "交通事故",
        cancer: "惡性腫瘤（癌症）",
        congenital_neuro_other: "先天或神經系統疾病",
        suicide: "蓄意自我傷害（情緒與生活壓力）",
        suicide_accident: "事故或身心危機",
        cardio_other: "心血管與其他內科疾病",
        heart_liver: "心臟或肝臟疾病",
        heart_cerebro: "心腦血管疾病",
        liver_diabetes: "慢性肝病或糖尿病併發症",
        heart_disease: "心臟疾病",
        cerebrovascular: "腦血管疾病",
        pneumonia: "肺炎",
        diabetes_hypertension: "糖尿病或高血壓併發症",
        chronic_fall_dementia_other: "慢性器官退化與跌倒併發症",
        heart_organ_decline: "自然衰老與心肺衰竭",
        pneumonia_respiratory: "肺炎與呼吸衰竭",
        cerebro_hypertension: "腦血管與高血壓疾病",
        other: "其他內科疾病"
      };
      const debtMult = life.flags.suicide_risk_mult_if_debt || 1.6;
      const entries = Object.entries(band.cause_weights).map(([k, w]) => {
        let weight = w;
        if (eduMode && (k === "suicide" || k === "suicide_accident")) weight = 0;
        if (!eduMode && k === "suicide" && life.stats.happiness < 25) weight *= 2.0;
        if (!eduMode && (k === "suicide" || k === "suicide_accident") && life.flags.heavy_debt) weight *= debtMult;
        if (k === "cancer" && life.flags.betel_nut_habit) weight *= 2.5;
        return { key: k, weight };
      }).filter((e) => e.weight > 0);
      const safeEntries = entries.length ? entries : [{ key: "other", weight: 1 }];
      const chosen = weightedPick(safeEntries, (e) => e.weight);
      return {
        key: chosen.key,
        label: causeLabels[chosen.key] || "自然病故",
        isSensitive: chosen.key === "suicide" || chosen.key === "suicide_accident"
      };
    }


    // P2: Normalize real net worth (2025 TWD) into 0–100 score for 5-dimension trajectory SVG
    normalizeAssetScore(realNetWorthTwd) {
      if (realNetWorthTwd < 0) {
        // Negative wealth maps smoothly into 0..18
        const negLog = Math.log10(1 + Math.abs(realNetWorthTwd) / 100000);
        return clamp(Math.round(18 - negLog * 9), 0, 18);
      }
      // 0 -> 18, 50萬 -> 40, 200萬 -> 58, 1000萬 -> 78, 5000萬+ -> 98-100
      const posLog = Math.log10(1 + realNetWorthTwd / 150000);
      return clamp(Math.round(18 + posLog * 31.5), 18, 100);
    }

    recordTrajectoryPoint(life, era) {
      if (!life.trajectory) life.trajectory = [];
      const netNom = this.getNetWorthNominal(life);
      const realNet = Math.round(netNom / Math.max(0.07, era.cpi));
      const pt = {
        age: life.age,
        year: life.currentYear,
        health: Math.round(life.stats.health),
        happiness: Math.round(life.stats.happiness),
        knowledge: Math.round(life.stats.knowledge),
        social: Math.round(life.stats.social),
        realNetWorthTwd: realNet,
        assetScore: this.normalizeAssetScore(realNet),
        cashNom: life.moneyNominal,
        stockNom: life.stockNominal,
        homeEqNom: life.homeowner ? Math.max(0, (life.homeValueNominal || 0) - (life.mortgageBalanceNominal || 0)) : 0,
        // 以下欄位供「匯出這一生詳細資料」除錯用
        cpi: +Math.max(0.07, era.cpi).toFixed(4),
        homeValueNom: life.homeowner ? Math.round(life.homeValueNominal || 0) : 0,
        mortgageNom: Math.round(life.mortgageBalanceNominal || 0),
        salaryNom: Math.round(life.annualSalaryNominal || 0),
        spouseIncomeNom: (life.married && life.spouse && !life.spouse.retired) ? Math.round(life.spouse.incomeNominal || 0) : 0,
        studentLoanNom: Math.round(life.studentLoanNominal || 0),
        location: life.location, regionId: life.regionId, job: life.job, education: life.education,
        married: Boolean(life.married), children: life.children || 0, homeowner: Boolean(life.homeowner), retired: Boolean(life.flags.retired)
      };
      const last = life.trajectory[life.trajectory.length - 1];
      if (last && last.age === life.age) {
        life.trajectory[life.trajectory.length - 1] = pt;
      } else {
        life.trajectory.push(pt);
      }
    }

    // P2: Compute cumulative survival curves (age 0..100) for Region vs Taiwan National Average
    computeSurvivalCurves(life) {
      const reg = this.getRegion(life.regionId);
      const buildCurve = (regionOffset) => {
        const pts = [];
        let lx = 1.0;
        const bands = this.data.lifetable.age_bands_2020s;
        for (let age = 0; age <= 100; age++) {
          pts.push({ age, surv: lx });
          let band = bands[bands.length - 1];
          for (const b of bands) {
            if (age >= b.age_min && age <= b.age_max) { band = b; break; }
          }
          let baseQx = (life.sex === "M" ? band.qx_per_1000_male : band.qx_per_1000_female) / 1000;
          if (age >= 65) {
            const mid = (band.age_min + Math.min(band.age_max, 100)) / 2;
            baseQx *= Math.pow(1.075, age - mid);
          }
          const yr = life.birthYear + age;
          let dmult = 1.0;
          if (yr < 1960) dmult = 3.2;
          else if (yr < 1970) dmult = 2.4;
          else if (yr < 1980) dmult = 1.85;
          else if (yr < 1990) dmult = 1.45;
          else if (yr < 2000) dmult = 1.25;
          else if (yr < 2010) dmult = 1.12;
          else if (yr < 2020) dmult = 1.04;
          if (age === 0 && yr < 1980) dmult *= 2.5;
          const rmult = Math.max(0.65, 1.0 - regionOffset * 0.11);
          const sexCalib = life.sex === "M" ? 0.95 : 0.76;
          const qx = clamp(baseQx * dmult * rmult * sexCalib, 0.00008, 0.95);
          lx *= (1 - qx);
        }
        return pts;
      };
      const regionCurve = buildCurve(reg.life_expectancy.offset_from_national || 0);
      const nationalCurve = buildCurve(0);
      const idx = clamp(life.age, 0, 100);
      return {
        regionName: reg.name_zh,
        regionAvgLe: reg.life_expectancy.regional_avg,
        regionCurve,
        nationalCurve,
        currentRegionSurv: regionCurve[idx].surv,
        currentNationalSurv: nationalCurve[idx].surv,
        survAt65Region: regionCurve[65].surv,
        survAt80Region: regionCurve[80].surv
      };
    }

    createLife(opts = {}) {
      const birthYear = opts.birthYear === "random" || !opts.birthYear
        ? 1950 + Math.floor(Math.random() * 77)
        : clamp(Number(opts.birthYear), 1950, 2026);
      const sex = opts.sex || (Math.random() < 0.51 ? "M" : "F");
      const region = this.drawRegion(opts.regionMode || "birth_weight", opts.manualRegionId);
      const quintileObj = pick(this.data.regions.income_quintiles.tiers);
      const era = this.getEraParams(birthYear);
      const cultEra = this.getCultureEra(birthYear);
      const name = this.generateName(sex, birthYear);
      const personalities = this.drawPersonalities();
      const fatherName = this.generateName("M", Math.max(1950, birthYear - 28));
      const motherName = this.generateName("F", Math.max(1950, birthYear - 26));
      const siblings = Math.max(0, Math.round(era.tfr - 1 + (Math.random() - 0.45) * 1.4));
      const origin = this.drawOrigin(region.id, birthYear);
      const birthOrder = 1 + Math.floor(Math.random() * (siblings + 1));

      const life = {
        id: "tw_" + Date.now() + "_" + Math.floor(Math.random() * 10000),
        name, sex, birthYear, currentYear: birthYear, age: 0, alive: true, causeOfDeath: null,
        birthRegionId: region.id,
        regionId: region.id,
        location: "TAIWAN", // "TAIWAN" or country id ("USA", "JPN", "AUS", "GBR", "CAN", "DEU")
        abroad: null,       // { countryId, pathwayId, pathwayName, startYear, yearsAbroad, studyYearsLeft, prStatus, commuterMode, triggeredAbroadEvents, triggeredReturnTriggers }
        everStudiedAbroad: false,
        everReturnedToTaiwan: false,
        personalities,
        protagonistEvents: [],
        fatalByHistoricalMode: false,
        abroadSummaryHistory: [],
        homesickness: 0,
        migrated: false,
        quintile: quintileObj.quintile,
        quintileLabel: quintileObj.label,
        family: {
          fatherName, motherName, siblings, origin, birthOrder, parentsAlive: true, parentPassedYear: null,
          fatherAlive: true, motherAlive: true,
          fatherBirthYear: birthYear - 24 - Math.floor(Math.random() * 12),
          motherBirthYear: birthYear - 21 - Math.floor(Math.random() * 12)
        },
        subMajor: null,
        spouse: null,
        partnerInfo: null,
        studentLoanNominal: 0,
        conscriptRoll: Math.random(),
        desiredKids: this.drawDesiredKids(birthYear),
        marriageInclination: Math.random(),
        education: "學齡前",
        eduLevel: 0,
        uniGradAge: 22,
        major: null,
        careerId: null,
        careerSalaryMult: 1.0,
        job: "無（學齡前）",
        sector: null,
        annualSalaryNominal: 0,
        workYears: 0,
        jobChangesPre2005: 0,
        married: false,
        partner: false,
        children: 0,
        childrenBirthYears: [],
        homeowner: false,
        homeValueNominal: 0,
        ownedAssets: { vehicle: null, valuables: null },
        mortgageBalanceNominal: 0,
        mortgageAnnualPayment: 0,
        mortgageDTI: 0,
        moneyNominal: 0,
        stockNominal: 0,
        lastYearIncomeNominal: 0,
        lastYearExpenseNominal: 0,
        lastYearNetCashflowNominal: 0,
        lastYearForcedStockSell: 0,
        salaryHistory: [],
        futureWorld: { flags: {}, groups: {}, triggered: {}, lastForecastAge: -10 },
        investStyle: "deposit",
        lastMarketReturnPct: null,
        lastMarketNote: "",
        marketLogSummary: [],
        focus: "balanced",
        stats: {
          health: clamp(Math.round(78 + (Math.random() - 0.5) * 18 + (quintileObj.quintile - 3) * 2), 45, 98),
          happiness: clamp(Math.round(72 + (Math.random() - 0.5) * 18), 40, 95),
          knowledge: clamp(Math.round(35 + quintileObj.quintile * 6 + (Math.random() - 0.5) * 14), 15, 80),
          social: clamp(Math.round(62 + (Math.random() - 0.5) * 20), 30, 92)
        },
        flags: { pendingTraps: [], delayedHappiness: [], dailyFlavors: [], financialBarriers: [] },
        lastDecisionAge: -10,
        lastReturnPromptAge: -10,
        triggeredEvents: {},
        triggeredDecisions: {},
        triggeredCustoms: {},
        decisionHistory: [],
        reflections: [],
        yearMarks: ["lived"],
        trajectory: [],
        feed: [],
        lastSurvivalRate: 0.996,
        companions: []
      };

      for (const tr of personalities) {
        const b = tr.init_bonus || {};
        if (b.health) life.stats.health = clamp(life.stats.health + b.health, 10, 100);
        if (b.happiness) life.stats.happiness = clamp(life.stats.happiness + b.happiness, 10, 100);
        if (b.knowledge) life.stats.knowledge = clamp(life.stats.knowledge + b.knowledge, 10, 100);
        if (b.social) life.stats.social = clamp(life.stats.social + b.social, 10, 100);
      }
      if (personalities.some((p) => p.id === "cautious")) life.flags.savings_rate_bonus = 0.1;
      const otherRegions = this.data.regions.regions.filter((r) => r.id !== region.id);
      for (let i = 0; i < 4; i++) {
        const cr = otherRegions[i % otherRegions.length];
        const cSex = Math.random() < 0.5 ? "M" : "F";
        const cq = pick(this.data.regions.income_quintiles.tiers);
        life.companions.push({
          name: this.generateName(cSex, birthYear),
          sex: cSex, birthRegionId: cr.id, regionId: cr.id, regionName: cr.name_zh,
          quintile: cq.quintile, age: 0, alive: true, status: "剛出生", deathAge: null
        });
      }

      life.feed.unshift({
        type: "normal", age: 0, year: birthYear, roc: toROC(birthYear),
        text: `你出生於 ${birthYear} 年（${toROC(birthYear)}）的${region.name_zh}（${region.counties.join("／")}），家境屬於「${quintileObj.label}」，${ORIGIN_LABELS[origin]}，家中有 ${siblings} 位手足${siblings > 0 ? `（你排行第 ${birthOrder}）` : ""}；你的先天個性傾向「${personalities.map((x) => x.name).join("、")}」。${cultEra ? "當時氛圍：" + cultEra.family_gender_norm : ""}`,
        highlight: true
      });
      this.recordTrajectoryPoint(life, era);
      return life;
    }

    // Move protagonist overseas via pathway & destination country
    // 留學總花費：依國家學費與生活費、年代匯率負擔與當年薪資水準計算（選項顯示與實際扣款共用）
    abroadCostNominal(pathway, country, era, year) {
      const realWageRatio = clamp(((era.avg_monthly_wage_twd || 48000) / Math.max(0.07, era.cpi)) / 62500, 0.35, 1.15);
      const usa = this.getAbroadCountry("USA");
      const livingRel = country && usa ? country.living_cost_mult_vs_tw / usa.living_cost_mult_vs_tw : 1;
      const tuition = country && country.tuition_mult_vs_usa != null ? country.tuition_mult_vs_usa : 1;
      const mix = pathway.id === "SA05_working_holiday" ? 0.3 + 0.7 * livingRel : 0.6 * tuition + 0.4 * livingRel;
      const fxBurden = this.interpByYear([[1960, 2.0], [1975, 1.7], [1986, 1.3], [1995, 1.0], [2100, 1.0]], year);
      return Math.round((pathway.cost_twd_2025 || 1500000) * mix * fxBurden * realWageRatio * era.cpi);
    }

    departOverseas(life, countryId, pathway, era) {
      const country = this.getAbroadCountry(countryId);
      if (!country) return;
      const costNom = this.abroadCostNominal(pathway, country, era, life.currentYear);
      let fundNote = "費用由父母負擔";
      if (pathway.id !== "SA03_young_student") {
        const pShare = (life.family.parentsAlive && life.age <= 28) ? ([0, 0, 0.15, 0.45, 0.8, 1.0][life.quintile] || 0) : (life.quintile === 5 ? 0.4 : 0);
        const parentPay = Math.round(costNom * pShare);
        const ownPay = Math.min(Math.max(0, Math.round(this.getLiquidNominal(life) * 0.8)), costNom - parentPay);
        if (ownPay > 0) this.spendLiquid(life, ownPay);
        const loan = Math.max(0, costNom - parentPay - ownPay);
        life.studentLoanNominal = (life.studentLoanNominal || 0) + loan;
        const wan = (n) => Math.round(n / 10000).toLocaleString();
        fundNote = [parentPay > 0 ? `父母資助 ${wan(parentPay)} 萬` : "", ownPay > 0 ? `自己出 ${wan(ownPay)} 萬` : "", loan > 0 ? `留學貸款 ${wan(loan)} 萬（就業後分期償還）` : ""].filter(Boolean).join("、") || "由獎學金支應";
      }
      if (life.partner && !life.married && Math.random() < 0.5) this.endRelationship(life);
      life.location = country.id;
      life.everStudiedAbroad = true;
      life.homesickness = clamp((life.homesickness || 0) + 18, 0, 100);
      life.abroad = {
        countryId: country.id,
        countryName: country.name_zh,
        flag: country.flag,
        pathwayId: pathway.id,
        pathwayName: pathway.name,
        startYear: life.currentYear,
        yearsAbroad: 0,
        studyYearsLeft: pathway.study_years || 2,
        prStatus: pathway.id === "SA05_working_holiday" ? "打工度假簽證" : "學生簽證",
        commuterMode: false,
        visaCrisisActive: false,
        triggeredAbroadEvents: {},
        triggeredReturnTriggers: {}
      };
      life.education = pathway.id === "SA05_working_holiday"
        ? `${life.education}（${country.name_zh}打工度假）`
        : `${country.name_zh}留學在學`;
      life.job = pathway.id === "SA05_working_holiday" ? `${country.name_zh}打工度假中` : `${country.name_zh}留學生`;
      life.abroadSummaryHistory.push(`${life.currentYear} 年透過「${pathway.name}」前往 ${country.flag} ${country.name_zh}`);
      life.feed.unshift({
        type: "overseas_event",
        age: life.age,
        year: life.currentYear,
        roc: era.roc,
        flag: country.flag,
        countryName: country.name_zh,
        title: `啟程前往 ${country.flag} ${country.name_zh}：${pathway.name}`,
        summary: `你拖著行李箱從台灣出發前往${country.name_zh}（費用約 NT$${costNom.toLocaleString()}：${fundNote}），展開異鄉求學與生活。`,
        impactNote: country.summary,
        cultural_footnote_en: `Departed Taiwan for ${country.name_en} via ${pathway.name}.`,
        sensitive: false,
        isFilteredEdu: false
      });
    }

    stepCompanions(life, era) {
      for (const c of life.companions) {
        if (!c.alive) continue;
        c.age = life.age;
        const reg = this.getRegion(c.regionId);
        const fakeLife = { age: c.age, sex: c.sex, currentYear: life.currentYear, regionId: c.regionId, location: "TAIWAN", stats: { health: 68 }, flags: {} };
        const { qx } = this.calcAnnualDeathProb(fakeLife, era);
        if (Math.random() < qx) {
          c.alive = false; c.deathAge = c.age; c.status = `${c.age} 歲離世`; continue;
        }
        if (c.age < 6) c.status = "幼兒成長中";
        else if (c.age < 15) c.status = "就讀國民教育";
        else if (c.age < 18) c.status = "高中職求學";
        else if (c.age < 22) c.status = Math.random() < era.uni_admission_rate ? "就讀大專院校" : "提早進入職場";
        else if (c.age < 65) {
          if (c.age === 23 && c.regionId === c.birthRegionId) {
            const rates = reg.out_migration_rates || {};
            const northProb = rates.to_north || rates.to_west_metro || 0;
            if (northProb > 0 && Math.random() < northProb) {
              const dest = Math.random() < 0.65 ? "north_taipei" : "north_hsinchu";
              c.regionId = dest;
              c.regionName = `${this.getRegion(dest).name_zh}（北漂）`;
            }
          }
          c.status = `${this.getRegion(c.regionId).key_industries[0]}就業中`;
        } else c.status = "退休養老";
      }
    }

    applyHistoricalImpact(life, ev, era, eduMode) {
      const imp = ev.gameplay_impact || {};
      const isFilteredEdu = eduMode && ev.sensitive;
      const inTaiwan = life.location === "TAIWAN";

      if (!isFilteredEdu) {
        if (imp.happiness_delta) life.stats.happiness += inTaiwan ? imp.happiness_delta : Math.round(imp.happiness_delta * 0.5);
        if (inTaiwan && imp.health_delta) life.stats.health += imp.health_delta;
        if (inTaiwan && imp.happiness_delta_north_taipei && life.regionId === "north_taipei") life.stats.happiness += imp.happiness_delta_north_taipei;
        if (inTaiwan && imp.happiness_delta_east && life.regionId === "east_islands") life.stats.happiness += imp.happiness_delta_east;
        if (inTaiwan && imp.happiness_delta_region && ev.regions.includes(life.regionId)) life.stats.happiness += imp.happiness_delta_region;
        if (inTaiwan && imp.trigger_prob_in_region && ev.regions.includes(life.regionId) && Math.random() < imp.trigger_prob_in_region) {
          life.stats.health += (imp.health_permanent_delta || -15);
          life.flags.yucheng_affected = true;
          life.feed.unshift({
            type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
            text: "家中不慎購入受污染的米糠油，長期健康受到影響（將於 2015 年專法通過後納入照護）。",
            highlight: true
          });
        }
      }
      if (inTaiwan && imp.bank_run_prob_north_taipei && life.regionId === "north_taipei" && life.moneyNominal > 0 && Math.random() < imp.bank_run_prob_north_taipei) {
        const loss = Math.round(life.moneyNominal * (imp.savings_loss_if_hit || 0.25));
        life.moneyNominal -= loss; life.stats.happiness -= 10;
        life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: `【十信擠兌波及】家中部分信用合作社存款受損，資產縮水約 NT$${loss.toLocaleString()}。`, highlight: true });
      }
      if (inTaiwan && imp.farmer_income_mult && life.sector && life.sector.includes("農")) {
        life.flags.wage_mult = (life.flags.wage_mult || 1.0) * imp.farmer_income_mult;
      }
      if (imp.individual_stock_fraud_prob && life.stockNominal > 0 && life.investStyle === "leverage" && Math.random() < imp.individual_stock_fraud_prob * 3) {
        const wiped = Math.round(life.stockNominal * 0.4);
        life.stockNominal -= wiped;
        life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "你重押的電子個股爆發假帳危機股價重挫，讓你開始思考分散投資與指數 ETF 的重要性。", highlight: true });
      }
      if (inTaiwan && imp.tech_wage_bonus && life.sector && (life.sector.includes("半導體") || life.sector.includes("科技") || life.sector.includes("軟體") || life.sector.includes("IC"))) {
        life.flags.wage_mult = (life.flags.wage_mult || 1.0) * imp.tech_wage_bonus;
      }
      if (inTaiwan && imp.trad_mfg_unpaid_leave_prob && life.sector && (life.sector.includes("傳產") || life.sector.includes("機械") || life.sector.includes("製造") || life.sector.includes("鋼鐵"))) {
        if (Math.random() < imp.trad_mfg_unpaid_leave_prob * 2) {
          life.flags.temp_income_mult = 0.78;
          life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "受美國對等關稅衝擊，任職的傳產製造廠啟動減班休息，今年收入縮水約兩成。" });
        }
      }
      if (inTaiwan && (imp.sme_layoff_risk_mult || imp.tech_layoff_risk_mult)) {
        life.flags.layoffRisk = { until: life.currentYear + 1, sme: imp.sme_layoff_risk_mult || 1, tech: imp.tech_layoff_risk_mult || 1 };
      }
      if (imp.unlock_daily_flavor) {
        const flavorTexts = {
          bank_remove_helmet: { text: "日常制度餘波：走進銀行領錢時，警衛禮貌請你脫下安全帽與口罩（源於 1982 李師科案後規範）。", min_age: 18 },
          school_bus_safety_drill: { text: "日常制度餘波：校外教學前，老師帶著全班實地演練開啟遊覽車安全門（源於 1992 健康幼稚園事件修法）。", min_age: 6, max_age: 18 },
          strict_bank_kyc_questions: { text: "日常制度餘波：去銀行開戶與匯款時，行員詳細盤查資金來源與用途（源於 2016 兆豐案後洗錢防制修法）。", min_age: 18 }
        };
        const item = flavorTexts[imp.unlock_daily_flavor];
        if (item && !life.flags.dailyFlavors.some((f) => (typeof f === "string" ? f : f.text) === item.text)) {
          life.flags.dailyFlavors.push({ ...item, max_year: life.currentYear + 18 });
        }
      }
    }

    resolvePendingTraps(life, era) {
      if (!life.flags.pendingTraps || !life.flags.pendingTraps.length) return;
      const remaining = [];
      for (const trap of life.flags.pendingTraps) {
        if (life.currentYear >= trap.crashYear) {
          const effLossProb = life.flags.future_antiscam_shield ? trap.lossProb * 0.3 : trap.lossProb;
          if (Math.random() < effLossProb) {
            const extraDebt = trap.borrowedNominal || 0;
            life.moneyNominal -= extraDebt;
            life.stats.happiness += trap.happinessOnCrash;
            if (trap.isAllIn) {
              life.flags.heavy_debt = true;
              life.flags.suicide_risk_mult_if_debt = trap.suicideMult || 1.8;
            }
            life.feed.unshift({
              type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
              text: `【金融風暴結算：${trap.title}】泡沫破滅，投入的 NT$${trap.investedNominal.toLocaleString()} 幾乎血本無歸${extraDebt > 0 ? `，並背負信貸債務 NT$${extraDebt.toLocaleString()}` : ""}。`,
              highlight: true, showHelpline: Boolean(trap.isAllIn)
            });
          } else {
            life.moneyNominal += Math.round(trap.investedNominal * 1.15);
            life.feed.unshift({
              type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
              text: `【驚險脫身：${trap.title}】你在崩盤前及時抽身，保住了本金並微幅獲利。`, highlight: true
            });
          }
        } else remaining.push(trap);
      }
      life.flags.pendingTraps = remaining;
    }

    // Step overseas life: graduation, local era events, visa crisis, PR progression, homesickness
    stepOverseasLife(life, era, eduMode) {
      if (!life.abroad || life.location === "TAIWAN") return;
      const ab = life.abroad;
      const country = this.getAbroadCountry(ab.countryId);
      if (!country) return;

      ab.yearsAbroad += 1;
      ab.visaCrisisActive = false;
      life.homesickness = clamp(life.homesickness + (ab.commuterMode ? 1 : 4), 0, 100);

      // Finish overseas study -> enter local workforce
      if (ab.studyYearsLeft > 0) {
        ab.studyYearsLeft -= 1;
        if (ab.studyYearsLeft === 0) {
          if (ab.pathwayId === "SA05_working_holiday") {
            ab.prStatus = "當地工作／技職轉軌簽證";
            life.job = `${country.name_zh}當地技術／服務業`;
            life.feed.unshift({
              type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
              text: `你在${country.name_zh}完成打工度假第一階段，憑著存下的積蓄與當地經驗轉入長期工作／進修。`,
              highlight: true
            });
          } else {
            life.eduLevel = Math.max(life.eduLevel, ab.pathwayId === "SA03_young_student" ? 4 : 5);
            if (!life.major) {
              const subs = [["stem_eng", "stem_eng"], ["biz", "humanities_biz"], ["arts", "humanities_biz"], ["biz", "humanities_biz"]];
              const sb = pick(subs); life.subMajor = sb[0]; life.major = sb[1];
            }
            life.flags.university_grad = true;
            life.triggeredDecisions["D05_graduation_crossroads"] = true;
            life.triggeredDecisions["D04_military_service"] = life.triggeredDecisions["D04_military_service"] || life.age > 26;
            life.education = `${country.name_zh}${life.eduLevel >= 5 ? "海外碩士" : "海外學士"}畢業`;
            ab.prStatus = "畢業後工作簽證";
            life.job = `${country.name_zh}跨國企業／專業職`;
            life.flags.remote_capable = life.flags.remote_capable || (life.major === "stem_eng");
            life.feed.unshift({
              type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
              text: `你順利從${country.name_zh}畢業（${life.education}），取得「${ab.prStatus}」並在當地開始求職工作。`,
              highlight: true
            });
          }
        }
      } else if (ab.yearsAbroad >= 5 && ab.prStatus !== "永久居留／公民" && Math.random() < (1 - country.pr_difficulty) * 0.35) {
        ab.prStatus = "永久居留／公民";
        life.stats.happiness += 6;
        life.feed.unshift({
          type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
          text: `歷經多年在${country.name_zh}打拚，你終於順利取得「${ab.prStatus}」身分！`,
          highlight: true
        });
      }

      // Local destination country era events
      const localEvents = (country.era_events || []).filter((ev) =>
        !ab.triggeredAbroadEvents[ev.id] &&
        life.currentYear >= ev.year_start &&
        life.currentYear <= ev.year_end
      );
      for (const ev of localEvents) {
        ab.triggeredAbroadEvents[ev.id] = true;
        const isFilteredEdu = eduMode && ev.sensitive;
        if (!isFilteredEdu && ev.happiness_delta) life.stats.happiness += ev.happiness_delta;
        if (ev.money_mult && ev.money_mult !== 1.0) life.flags.temp_income_mult = (life.flags.temp_income_mult || 1.0) * ev.money_mult;
        if (ev.visa_crisis_prob && ab.prStatus !== "永久居留／公民" && Math.random() < ev.visa_crisis_prob) {
          ab.visaCrisisActive = true;
        }
        life.feed.unshift({
          type: "overseas_event",
          id: ev.id,
          age: life.age,
          year: life.currentYear,
          roc: era.roc,
          flag: country.flag,
          countryName: country.name_zh,
          title: ev.title,
          summary: isFilteredEdu
            ? `【教學防雷摘要】${country.name_zh}此時期歷經重大社會與經濟環境變化，影響當地留學生與外籍工作者的政策與就業機會。`
            : ev.summary,
          impactNote: ev.impact_note,
          cultural_footnote_en: ev.cultural_footnote_en,
          sensitive: ev.sensitive,
          isFilteredEdu
        });
      }
    }

    // Check 12 Return-to-Taiwan Triggers (tw_study_abroad.json)
    checkReturnTrigger(life, era) {
      if (life.location === "TAIWAN" || !life.abroad || life.abroad.studyYearsLeft > 0) return null;
      if (life.age - life.lastReturnPromptAge < 4) return null;
      const ab = life.abroad;
      const triggers = (this.data.studyAbroad && this.data.studyAbroad.return_triggers) || [];

      for (const tr of triggers) {
        if (ab.triggeredReturnTriggers[tr.id]) continue;
        let hit = false;
        if (tr.condition_type === "year_window" && (tr.years || []).includes(life.currentYear)) {
          hit = true;
        } else if (tr.condition_type === "visa_crisis" && ab.visaCrisisActive) {
          hit = true;
        } else if (tr.condition_type === "parent_passed_recently" && life.family.parentPassedYear === life.currentYear) {
          hit = true;
        } else if (tr.condition_type === "parents_aging" && life.family.parentsAlive && life.age >= 36 && life.age <= 58 && Math.random() < 0.16) {
          hit = true;
        } else if (tr.condition_type === "has_partner_childbearing" && life.married && life.age >= 28 && life.age <= 40 && life.children === 0 && Math.random() < 0.18) {
          hit = true;
        } else if (tr.condition_type === "health_below_overseas" && life.currentYear >= (tr.min_year || 1996) && life.stats.health < 55 && Math.random() < 0.25) {
          hit = true;
        }

        if (hit) {
          ab.triggeredReturnTriggers[tr.id] = true;
          life.homesickness = clamp(life.homesickness + (tr.homesickness_delta || 15), 0, 100);
          life.lastReturnPromptAge = life.age;
          const tpl = this.data.studyAbroad.return_decision_template;
          return {
            id: tpl.id,
            triggerId: tr.id,
            isFixedAge: true,
            resolvedTitle: `【回國契機】${tr.title}`,
            resolvedDesc: tr.desc,
            resolvedSource: tr.cultural_footnote_en || "",
            options: tpl.options.filter((o) => !(o.requires_year_min && life.currentYear < o.requires_year_min))
          };
        }
      }
      return null;
    }

    // Check 6 Study Abroad Pathways (SA01–SA06)
    checkStudyAbroadOpportunity(life, era) {
      if (life.location !== "TAIWAN" || life.everStudiedAbroad || life.married || life.children > 0) return null;
      if (life.careerId === "car_civil_teacher" || life.flags.hs_tier === "work_early") return null;
      if (life.sex === "M" && life.age >= 19 && life.age <= 24 && life.currentYear < 2000 && !life.triggeredDecisions["D04_military_service"]) return null;
      if (life.flags.in_grad_school_years > 0 || life.flags.military_gap_years > 0) return null;
      const pathways = (this.data.studyAbroad && this.data.studyAbroad.pathways) || [];

      for (const pw of pathways) {
        if (life.triggeredDecisions[`SA:${pw.id}`]) continue;
        if (life.currentYear < pw.year_range[0] || life.currentYear > pw.year_range[1]) continue;
        if (life.age < pw.age_range[0] || life.age > pw.age_range[1]) continue;
        if (life.quintile < pw.min_quintile || life.quintile > pw.max_quintile) continue;
        const effKnow = life.stats.knowledge + (life.flags.uni_lab_research ? 8 : 0) + (life.flags.uni_grad_abroad_prep ? 6 : 0);
        if (effKnow < pw.min_knowledge) continue;
        if (life.eduLevel < pw.requires_edu_min) continue;
        if (pw.id !== "SA03_young_student" && pw.id !== "SA04_exchange_dual" && this.isStudentNow(life)) continue;
        if (pw.id === "SA04_exchange_dual" && !life.education.includes("在學")) continue;
        const saRate = this.hasSwitch(life.currentYear, "lift_martial_law") ? 0.052 : 0.022;
        if (Math.random() > saRate) continue;

        // Build 3 randomized destination options + 1 stay option
        const availCountries = pw.allowed_countries
          .map((cid) => this.getAbroadCountry(cid))
          .filter(Boolean);
        for (let si = availCountries.length - 1; si > 0; si--) {
          const sj = Math.floor(Math.random() * (si + 1));
          [availCountries[si], availCountries[sj]] = [availCountries[sj], availCountries[si]];
        }
        const pickedCountries = availCountries.slice(0, 3);

        if (pw.id === "SA03_young_student" && life.age < 18) {
          const dest = pickedCountries[0];
          return {
            id: `SA:${pw.id}`, isStudyAbroadCard: true, isMinorAbroadCard: true, pathway: pw,
            resolvedTitle: "✈️ 父母考慮送你出國念書",
            resolvedDesc: `你 ${life.age} 歲，父母考慮送你到${dest.name_zh}念中學。最後由他們決定，但他們想先聽聽你的想法：`,
            resolvedSource: "未成年出國由父母決定；你的意願會影響他們的判斷",
            options: [
              { key: "wish_go", label: "告訴父母：我想出去看看", effects: { minor_wish_abroad: true, depart_country: dest.id, pathway_obj: pw } },
              { key: "wish_stay", label: "告訴父母：我想留在台灣，和朋友一起升學", effects: { minor_wish_abroad: false, depart_country: dest.id, pathway_obj: pw } }
            ]
          };
        }
        const options = pickedCountries.map((c) => ({
          key: `go_${c.id}`,
          label: `${c.flag} 前往${c.name_zh}（${pw.id === "SA05_working_holiday" ? "旅費與初期生活費" : `${pw.study_years || 2} 年學費與生活費`}約 NT$${this.abroadCostNominal(pw, c, era, life.currentYear).toLocaleString()}｜當地均薪約台灣 ${c.salary_mult_vs_tw}×）`,
          effects: { depart_country: c.id, pathway_obj: pw }
        }));
        options.push({
          key: "stay_taiwan",
          label: "🇹🇼 婉拒出國，留在台灣繼續發展",
          effects: { happiness: 1 }
        });

        return {
          id: `SA:${pw.id}`,
          isStudyAbroadCard: true,
          pathway: pw,
          resolvedTitle: `✈️ 出國留學／打工契機：${pw.name}`,
          resolvedDesc: pw.desc,
          resolvedSource: pw.source_note,
          options
        };
      }
      return null;
    }

    stepYear(life, options = {}) {
      const eduMode = Boolean(options.eduMode); // true = 重大惡性社會事件：關閉
      const historicalMode = !eduMode && Boolean(options.historicalMode); // 僅在重大惡性社會事件開啟時才可啟用
      const autoMode = Boolean(options.autoMode);
      const showAllHistoricalEvents = Boolean(options.showAllHistoricalEvents);
      if (!life.alive) return { ended: true };

      life.age += 1;
      life.currentYear = life.birthYear + life.age;
      const era = this.getEraParams(life.currentYear);
      const eduEra = this.getEduEra(life.currentYear);
      const cultEra = this.getCultureEra(life.currentYear);
      const reg = this.getRegion(life.regionId);
      let yearMark = "lived";

      life.flags.temp_income_mult = 1.0;
      const statsAtYearStart = { ...life.stats };
      life.flags.pandemic_exposure_mult = 1.0;

      // 1. Delayed traps & delayed happiness
      this.resolvePendingTraps(life, era);
      if (life.flags.delayedHappiness && life.flags.delayedHappiness.length) {
        const nextDH = [];
        for (const dh of life.flags.delayedHappiness) {
          if (life.currentYear >= dh.year) {
            life.stats.happiness += dh.delta;
            if (dh.note) life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: dh.note });
          } else nextDH.push(dh);
        }
        life.flags.delayedHappiness = nextDH;
      }
      this.processEraPending(life, era);
      if (life.currentYear === 2015 && life.flags.yucheng_affected) {
        life.flags.yucheng_affected = false;
        life.stats.happiness += 5;
        life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "《油症患者健康照護服務條例》三讀通過，歷經 36 年終於迎來國家醫療照護與撫慰金。", highlight: true });
      }

      // Timers
      if (life.flags.in_grad_school_years > 0) {
        life.flags.in_grad_school_years -= 1;
        if (life.flags.in_grad_school_years === 0) {
          life.education = life.flags.grad_type === "abroad" ? "海外留學碩士" : "國內研究所碩士";
          life.eduLevel = 5;
          life.job = "求職中";
          life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: `你順利取得${life.education}學位，正式進入職場。`, highlight: true });
        }
      }
      if (life.flags.military_gap_years > 0) {
        life.flags.military_gap_years -= 1;
        if (life.flags.military_gap_years === 0) {
          if (!(life.flags.career_chosen && this.resumeCareer(life))) life.job = "退伍求職中";
          life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "你完成兵役義務退伍，重新銜接社會與職場。" });
        }
      }
      if (life.flags.exam_prep_years > 0) {
        life.flags.exam_prep_years -= 1;
        if (life.flags.exam_prep_years === 0) {
          const passChance = clamp(0.10 + (life.stats.knowledge - 55) * 0.006 + (life.flags.uni_civil_prep ? 0.18 : 0), 0.04, 0.55);
          if (Math.random() < passChance) {
            life.careerId = "car_civil_teacher";
            life.job = "公務人員／國營事業職員";
            life.sector = "軍公教／國營事業";
            life.flags.rank_title = "公務人員／國營事業職員";
            life.careerSalaryMult = 1.1;
            life.flags.job_stability = 0.99;
            life.flags.career_chosen = true;
            life.flags.unemployed = false;
            life.stats.happiness += 8;
            life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "金榜題名！你考上高普考／國營事業，獲得高度穩定的鐵飯碗工作。", highlight: true });
          } else {
            life.job = "求職中";
            life.flags.unemployed = false;
            life.flags.civil_exam_fails = (life.flags.civil_exam_fails || 0) + 1;
            life.flags.career_chosen = false;
            delete life.triggeredDecisions["D07_career_track"];
            life.stats.happiness -= 5;
            life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "公職國營考試些微落榜，你必須決定要再拚一年，還是先進民間企業。" });
          }
        }
      }
      if (life.flags.temp_unemployed_years > 0) {
        life.flags.temp_unemployed_years -= 1;
        if (life.flags.temp_unemployed_years === 0 && !life.flags.fulltime_caregiver) {
          life.flags.unemployed = false;
          if (this.resumeCareer(life)) {
            life.careerSalaryMult = +(life.careerSalaryMult * 0.95).toFixed(2);
            life.flags.switch_prompt = life.currentYear + 1;
          } else {
            this.assignCareer(life, this.pickEraCareer(life));
          }
        }
      }

      // Mandatory / natural retirement so nobody works until death
      if (!life.flags.retired && life.age >= 68) {
        const limit = this.isSelfEmployed(life) ? 79 : 72;
        if (life.age >= limit || (life.stats.health < 30 && life.age >= 68)) {
          this.retireNow(life, "退休");
          life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: life.stats.health < 30 ? "身體大不如前，你放下工作，正式過起退休生活。" : "年紀到了，你交接完手邊的事，正式過起退休生活。" });
        }
      }

      // 2. Focus, health aging & parents
      this.applyFocus(life, era);
      if (life.flags.work_hours_high && !life.flags.retired) life.stats.health -= 0.8;
      if (life.flags.career_health_drain && !life.flags.retired && life.age >= 22) life.stats.health -= life.flags.career_health_drain * 0.15;
      if (life.age > 45) life.stats.health -= (life.age > 70 ? 1.75 : 0.65);
      this.applyTraitAndStatDrift(life, era);
      this.rollHealthIncidents(life, era, eduMode);

      if (!life.flags.betel_nut_habit && life.location === "TAIWAN" && life.sex === "M" && life.age >= 22 && life.age <= 38 && life.eduLevel <= 3 && life.currentYear <= 2005 && Math.random() < 0.015) {
        life.flags.betel_nut_habit = true;
        life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "因工地／勞動職場交際染上嚼檳榔與抽菸習慣（國健署統計：嚼檳榔者罹患口腔癌機率為未嚼者的 28 倍）。" });
      }

      this.stepParents(life, era);
      if (life.flags.fulltime_caregiver) {
        life.flags.caregiver_years = (life.flags.caregiver_years || 0) + 1;
        if (life.flags.caregiver_years >= 9 || life.age >= 64) {
          this.endCaregiving(life, era);
          life.flags.monthly_care_cost_twd_2025 = life.family.parentsAlive ? 22000 : 0;
          life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "長年照顧後體力已到極限，你和家人商量，改由機構與看護接手照護。" });
        }
      }
      const spouseIncome = this.stepSpouse(life, era, eduMode);

      // Parental milestone gift (age 22-27, Q3-Q5): gift a scooter/car or heirloom gold upon entering society
      if (life.location === "TAIWAN" && life.family.parentsAlive && life.age >= 22 && life.age <= 27 && !life.flags.parent_gift_checked && life.quintile >= 3) {
        life.ownedAssets = life.ownedAssets || { vehicle: null, valuables: null };
        if (Math.random() < (life.quintile === 5 ? 0.35 : (life.quintile === 4 ? 0.22 : 0.12))) {
          life.flags.parent_gift_checked = true;
          if (!life.ownedAssets.vehicle && life.quintile >= 4 && life.currentYear >= 1980 && Math.random() < 0.55) {
            const isCar = life.quintile === 5 && Math.random() < 0.65;
            life.ownedAssets.vehicle = isCar
              ? { type: "car", name: "父母贈與國產代步車", baseValue2025: 550000, acquiredYear: life.currentYear, annualUpkeep2025: 62000, source: "父母贈與" }
              : { type: "scooter", name: "父母贈與代步機車", baseValue2025: 80000, acquiredYear: life.currentYear, annualUpkeep2025: 12000, source: "父母贈與" };
            life.stats.happiness += 5;
            life.feed.unshift({
              type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
              text: `【家人贈與】父母體恤你剛出社會通勤辛苦，特別送你一台「${life.ownedAssets.vehicle.name}」，讓你感動又感激。`,
              highlight: true
            });
          } else if (!life.ownedAssets.valuables) {
            const val2025 = life.quintile === 5 ? 280000 : (life.quintile === 4 ? 160000 : 95000);
            life.ownedAssets.valuables = {
              name: "長輩贈與成年禮金飾／名錶",
              baseValue2025: val2025,
              acquiredYear: life.currentYear,
              source: "長輩贈與"
            };
            life.stats.happiness += 4;
            life.feed.unshift({
              type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
              text: `【家人贈與】長輩送給你一份「${life.ownedAssets.valuables.name}」（約值 NT$${Math.round(val2025 * era.cpi).toLocaleString()}），叮嚀你好好珍藏、危急時也能當壓箱底。`,
              highlight: true
            });
          }
        }
      }

      life.flags.lives_with_parents = life.location === "TAIWAN" && !life.homeowner && life.family.parentsAlive &&
        life.regionId === (life.flags.family_region || life.birthRegionId) && !life.flags.moved_out;

      // 3. Education milestones (Taiwan or Overseas)
      if (life.location === "TAIWAN") {
        if (life.age === 6) { life.education = "國小在學"; life.eduLevel = 1; life.job = "學生"; }
        if (life.age === 12 && this.hasSwitch(life.currentYear, "compulsory_9yr_ed")) {
          life.education = "國中在學"; life.eduLevel = 2;
        } else if (life.age === 13 && life.education === "國小在學") {
          life.education = "國小畢業";
        } else if (life.age === 15 && (life.education === "初中在學" || life.education === "初職在學") && life.currentYear >= 1980) {
          life.education = "國中畢業";
        }
        if (life.age === 18 && ["普通高中", "明星普通高中", "高職／五專"].includes(life.education)) {
          life.education = life.education + "畢業";
        }
        const rollUniAdmission = (bonus) => {
          const tierBonus = life.flags.hs_tier === "top_hs" ? 0.22 : life.flags.hs_tier === "normal_hs" ? 0.05 : -0.05;
          const stageBonus = life.flags.uni_admit_bonus || 0;
          // Admission rate only describes exam takers: many vocational graduates never sat the university exam before the 1990s
          const yr = life.currentYear;
          const takeRate = life.flags.hs_tier === "vocational"
            ? this.interpByYear([[1965, 0.06], [1985, 0.1], [1995, 0.24], [2005, 0.56], [2015, 0.62]], yr)
            : this.interpByYear([[1965, 0.55], [1985, 0.68], [1995, 0.85], [2005, 0.88]], yr);
          if (Math.random() > takeRate * (1 - (life.flags.child_hardship || 0) * 0.08)) return false;
          const hardship = (life.flags.child_hardship || 0) * 0.05;
          const chance = clamp(era.uni_admission_rate + (life.stats.knowledge - 50) * 0.006 + (life.quintile - 3) * 0.04 + tierBonus + stageBonus + bonus - hardship, 0.06, 0.99);
          return Math.random() < chance;
        };
        if (life.age === 18 && life.eduLevel === 3 && life.flags.max_edu_cap !== "junior_high" && !life.flags.no_uni_exam && !life.flags.uni_checked) {
          life.flags.uni_checked = true;
          if (rollUniAdmission(0)) {
            life.education = "大學在學"; life.eduLevel = 4; life.uniGradAge = 22;
            life.flags.admitted_to_university = true;
            const examName = life.currentYear >= 2022 ? "分科／學測" : life.currentYear >= 2002 ? "學測／指考" : "大學聯考";
            life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: `你通過${examName}考上大學（當年錄取率約 ${Math.round(era.uni_admission_rate * 100)}%），展開大學生活。`, highlight: true });
          } else {
            life.flags.missed_target_school = true;
          }
        } else if (life.age === 19 && life.flags.retaking_exam) {
          life.flags.retaking_exam = false;
          if (rollUniAdmission(life.flags.top_uni_prob_bonus || 0.25)) {
            life.education = "大學在學（重考上榜）"; life.eduLevel = 4; life.uniGradAge = 23;
            life.flags.admitted_to_university = true; life.stats.happiness += 8;
            life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "重考班一年的苦讀沒有白費！你順利考上理想大學校系。", highlight: true });
          } else {
            life.education = "高中職畢業（就業）"; life.stats.happiness -= 5;
            life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "重考結果仍未如預期，你決定先進入職場累積實戰經驗。" });
          }
        }
        if (life.age === life.uniGradAge && life.eduLevel === 4) {
          life.education = "大學畢業"; life.flags.university_grad = true;
          if (life.major === "public_funded") {
            const civ = (this.data.educationCareers.careers || []).find((x) => x.id === "car_civil_teacher");
            this.assignCareer(life, civ);
            life.careerSalaryMult = 1.12;
            life.flags.rank_title = life.currentYear < 1995 ? "國中小教師／軍警公職（公費分發）" : "公職／教師／軍警（公費分發）";
            life.job = life.flags.rank_title;
            life.flags.career_chosen = true;
            life.triggeredDecisions["D05_graduation_crossroads"] = true;
            life.triggeredDecisions["D07_career_track"] = true;
            life.triggeredDecisions["D04_military_service"] = true;
            life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "你從公費體系畢業，依分發到單位報到，開始履行服務年限，也領到人生第一份穩定薪水。", highlight: true });
          }
        }
        if (life.eduLevel === 4 && life.education.includes("在學") && life.currentYear >= 2022 && life.major === "humanities_biz" && !life.flags.uni_closed_hit && (life.stats.knowledge < 60 || life.flags.backup_uni) && Math.random() < 0.03) {
          life.flags.uni_closed_hit = true; life.stats.happiness -= 6;
          life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "少子化海嘯襲來！你就讀的私立大專院校依《私校退場條例》宣布停招停辦，你由教育部協助安置轉學。", highlight: true });
        }
      } else {
        // Step overseas study, local era events, visa/PR
        this.stepOverseasLife(life, era, eduMode);
      }

      // 4. Organic northbound migration in Taiwan (wait until age 27 so D06 window 22-26 gets priority)
      if (life.location === "TAIWAN" && life.age === 27 && !life.migrated && !life.flags.stay_home && !life.homeowner && life.careerId !== "car_civil_teacher" && life.careerId !== "car_farmer_fisher" && !life.triggeredDecisions["D06_northbound_migration"]) {
        const rates = reg.out_migration_rates || {};
        const prob = rates.to_north || rates.to_west_metro || 0;
        if (prob > 0 && Math.random() < prob) {
          const dest = Math.random() < 0.65 ? "north_taipei" : "north_hsinchu";
          this.relocateTo(life, dest, era);
          life.flags.migrated_north = true;
          life.flags.moved_out = true;
          life.flags.wage_mult = (life.flags.wage_mult || 1.0) * 1.06;
          life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: `為了更多職缺與發展機會，你離開${reg.name_zh}，${life.currentYear < 2000 ? "北上到" : "北漂至"}${this.getRegion(dest).name_zh}租屋工作。`, highlight: true });
        }
      }

      // 5. Work, Era-Career Income, Living Expenses (deducted BEFORE stock returns) & Investments
      const inSchool = life.education.includes("在學") || life.flags.in_grad_school_years > 0 || life.flags.retaking_exam || (life.abroad && life.abroad.studyYearsLeft > 0 && life.abroad.pathwayId !== "SA05_working_holiday");
      const inMilitary = life.flags.military_gap_years > 0;
      const inExamPrep = life.flags.exam_prep_years > 0;
      const awaitingGrad = this.isAwaitingGraduationChoice(life);
      const couldWork = life.age >= 18 && !life.flags.retired && !inSchool && !awaitingGrad && !inMilitary && !inExamPrep && !life.flags.unemployed;
      // Nobody is silently given a job: the first career is always chosen through D07 (fallback only past its age window)
      const needsFirstJob = couldWork && life.location === "TAIWAN" && !life.careerId;
      if (needsFirstJob) {
        if (life.age > 44 || life.triggeredDecisions["D07_career_track"]) {
          this.assignCareer(life, this.pickEraCareer(life));
          life.flags.career_chosen = true;
        } else if (!life.job.includes("求職") && life.flags.hs_tier !== "work_early") {
          life.job = "求職中";
        }
      }
      const isWorking = couldWork && !(life.location === "TAIWAN" && !life.careerId);
      const curCareer = life.careerId ? (this.data.educationCareers.careers || []).find((c) => c.id === life.careerId) : null;
      if (curCareer && isWorking) {
        const disp = this.getCareerDisplayName(curCareer, life.currentYear);
        if (disp !== life.sector && life.sector && !life.flags.rank_title) {
          if (life.job === life.sector) life.job = disp;
          life.sector = disp;
        }
        // Volunteer soldiers reach natural exit points (8 and 20 years of service)
        if (life.flags.rank_title === "志願役軍士官" && (life.workYears === 8 || life.workYears === 20)) life.flags.switch_prompt = life.currentYear + 1;
        if (life.currentYear > curCareer.era_range[1] && life.age < 58 && !life.flags.era_end_prompted) {
          life.flags.era_end_prompted = true;
          life.flags.switch_prompt = life.currentYear + 2;
        }
      }
      let earnedThisYear = 0;

      if (inMilitary) {
        const milPay = this.computeCurrentAnnualSalaryNominal(life, era, reg);
        life.annualSalaryNominal = milPay;
        earnedThisYear = milPay;
      } else if (isWorking) {
        if (life.location === "TAIWAN" && (life.flags.job_stability || 0) < 0.95 && life.workYears >= 1 && !this.isSelfEmployed(life) && life.age < 60 &&
            Math.random() < era.unemployment_rate * 0.45 * ((life.flags.layoffRisk && life.flags.layoffRisk.until >= life.currentYear)
              ? (["car_hsinchu_semi", "car_software_remote"].includes(life.careerId) ? life.flags.layoffRisk.tech : life.flags.layoffRisk.sme) : 1)) {
          life.flags.unemployed = true; life.flags.temp_unemployed_years = 1;
          if (life.currentYear < 2005) life.jobChangesPre2005 += 1;
          life.annualSalaryNominal = Math.round(era.min_wage_twd * 4);
          earnedThisYear = life.annualSalaryNominal;
          life.stats.happiness -= 7;
          life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: `景氣波動（當年失業率 ${(era.unemployment_rate * 100).toFixed(1)}%），你遭遇非自願裁員，花了一段時間重新求職。` });
        } else {
          life.workYears += 1;
          life.annualSalaryNominal = this.computeCurrentAnnualSalaryNominal(life, era, reg);
          earnedThisYear = life.annualSalaryNominal;
          life.flags.wage_ratio_sum = (life.flags.wage_ratio_sum || 0) + life.annualSalaryNominal / (era.avg_monthly_wage_twd * 12);
          life.flags.wage_ratio_years = (life.flags.wage_ratio_years || 0) + 1;
        }
      } else if (life.flags.retired) {
        life.annualSalaryNominal = this.computeCurrentAnnualSalaryNominal(life, era, reg);
        earnedThisYear = life.annualSalaryNominal;
      } else {
        life.annualSalaryNominal = 0;
        earnedThisYear = this.calcYouthPocketMoneyNominal(life, era);
      }

      if (life.flags.inadequate_med_years > 0) {
        life.flags.inadequate_med_years -= 1;
      }
      if (life.flags.austerity_years > 0) {
        life.flags.austerity_years -= 1;
      }
      if (life.flags.expat_years_left > 0) {
        life.flags.expat_years_left -= 1;
        if (life.flags.expat_years_left === 0) {
          life.flags.expat_completed = true;
        }
      }
      if (life.location === "TAIWAN" && life.age >= 68 && !life.homeowner && life.flags.elderly_rent_rejection_risk && !life.flags.elderly_rent_hit_done && Math.random() < 0.12) {
        life.flags.elderly_rent_hit_done = true;
        life.flags.elderly_rent_surcharge = 0.18;
        const moveShock = Math.round(60000 * era.cpi);
        life.moneyNominal -= moveShock;
        life.stats.happiness -= 8;
        life.stats.health -= 3;
        life.feed.unshift({
          type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
          text: `【高齡租屋困境】房東因顧忌年事已高拒絕續租，你被迫倉促搬遷並支付更高租金與押金（額外支出約 NT$${moveShock.toLocaleString()}，後續房租上調 18%）。`,
          highlight: true
        });
      }

      if (life.married) {
        life.flags.marital_own_income = (life.flags.marital_own_income || 0) + Math.max(0, earnedThisYear) / Math.max(0.07, era.cpi);
        life.flags.marital_spouse_income = (life.flags.marital_spouse_income || 0) + Math.max(0, spouseIncome) / Math.max(0.07, era.cpi);
      }
      earnedThisYear += spouseIncome;
      // Grown-up children support ageing parents with little savings
      if (life.age >= 65) {
        const adultKids = (life.childrenBirthYears || []).filter((by) => life.currentYear - by >= 26).length;
        if (adultKids > 0 && this.getLiquidNominal(life) / Math.max(0.07, era.cpi) < 1500000) {
          const rwr = clamp(((era.avg_monthly_wage_twd || 48000) / Math.max(0.07, era.cpi)) / 62500, 0.15, 1.15);
          earnedThisYear += Math.round(Math.min(adultKids, 4) * 42000 * (life.flags.private_cram_kids ? 1.25 : 1) * rwr * era.cpi);
        }
        // Means-tested old-age allowance (since 1993)
        if (life.currentYear >= 1993 && life.flags.retired && !life.homeowner && this.getLiquidNominal(life) / Math.max(0.07, era.cpi) < 250000) {
          earnedThisYear += Math.round(era.avg_monthly_wage_twd * 12 * 0.12);
        }
      }
      if (life.studentLoanNominal > 0) {
        life.studentLoanNominal = Math.round(life.studentLoanNominal * 1.015);
      }
      // Deduct full annual living expenses FIRST (basic living + rent/mortgage + kids + eldercare)
      let annualExpenseNominal = this.calcAnnualLivingExpenseNominal(life, era, reg, isWorking && !life.flags.unemployed);
      if (life.studentLoanNominal > 0 && isWorking) {
        life.studentLoanNominal = Math.max(0, life.studentLoanNominal - Math.min(life.studentLoanNominal, Math.max(Math.round(life.studentLoanNominal * 0.1), Math.round(36000 * era.cpi))));
      }
      // Young adults who have not started working yet never run up living-cost debt: family covers the gap
      if (!life.careerId && life.location === "TAIWAN" && life.age < 32 && !life.flags.retired && annualExpenseNominal > earnedThisYear) {
        annualExpenseNominal = Math.min(annualExpenseNominal, earnedThisYear + Math.max(0, life.moneyNominal));
      }
      // Lenders and relatives stop lending at some point: beyond a credit line the household has to cut spending instead
      if (life.age >= 18 && life.stockNominal <= 0 && annualExpenseNominal > earnedThisYear) {
        const debt = Math.max(0, -life.moneyNominal);
        const creditLine = Math.round(Math.max(150000 * era.cpi, Math.max(earnedThisYear, era.min_wage_twd * 6) * (life.age >= 65 ? 0.6 : 1.6)));
        const room = Math.max(0, life.moneyNominal) + Math.max(0, creditLine - debt);
        const deficit = annualExpenseNominal - earnedThisYear;
        if (deficit > room) {
          annualExpenseNominal = earnedThisYear + room;
          life.stats.happiness -= 2; life.stats.health -= 1;
          if (!life.flags.hardshipNotedAge || life.age - life.flags.hardshipNotedAge >= 8) {
            life.flags.hardshipNotedAge = life.age;
            life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "能借的都借了，家裡只能把開銷壓到最低：三餐從簡、能省則省，日子過得很緊。" });
          }
        }
      }
      const netCashflow = earnedThisYear - annualExpenseNominal;
      life.lastYearIncomeNominal = earnedThisYear;
      life.lastYearExpenseNominal = annualExpenseNominal;
      life.lastYearNetCashflowNominal = netCashflow;
      life.lastYearForcedStockSell = 0;

      life.moneyNominal += netCashflow;

      // If living expenses push cash negative, liquidate stocks FIRST before applying market gains!
      if (life.moneyNominal < 0 && life.stockNominal > 0) {
        const sellAmt = Math.min(life.stockNominal, -life.moneyNominal);
        life.stockNominal -= sellAmt;
        life.moneyNominal += sellAmt;
        life.lastYearForcedStockSell = sellAmt;
        if (sellAmt >= 40000 * era.cpi) {
          life.feed.unshift({
            type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
            text: `本年收支入不敷出，你被迫先賣出約 NT$${sellAmt.toLocaleString()} 的台股部位支應生活開銷。`
          });
        }
      }

      // === Historical Taiwan Stock Market (TAIEX / 0050) & Real Estate Engine ===
      const mkt = this.getMarketYear(life.currentYear);
      // 2027 年後依這段人生的隱藏世界線調整股市、房市與薪資走勢（平均而言中性，但不同人生差很多）
      if (!mkt.isHistorical && life.currentYear >= 2027) {
        const line = this.ensureWorldLine(life);
        const crash = line.economy === "crisis" && Math.random() < 0.07;
        mkt.price_pct = +clamp(mkt.price_pct + ({ boom: 0.03, stagnant: -0.012, crisis: -0.005 }[line.economy] || 0) + (crash ? -0.22 : 0), -0.45, 0.35).toFixed(3);
        if (mkt.price_pct < 0) mkt.max_drawdown = Math.min(mkt.max_drawdown, mkt.price_pct - 0.08);
        if (crash) mkt.note = "金融危機再起，台股重挫";
        mkt.housing_pct = +(mkt.housing_pct + ({ rebound: 0.012, decline: -0.006 }[line.demo] || 0)).toFixed(3);
        const wageDrift = { boom: 1.004, stagnant: 0.998, crisis: 0.997 }[line.economy] || 1;
        if (wageDrift !== 1 && life.age >= 18) life.flags.wage_mult = clamp((life.flags.wage_mult || 1.0) * wageDrift, 0.55, 1.28);
      }
      life.lastMarketReturnPct = mkt.price_pct;
      life.lastMarketNote = mkt.note || "";
      life.flags.margin_called_this_year = false;

      if (life.moneyNominal > 0) {
        const realCashNow = life.moneyNominal / Math.max(0.07, era.cpi);
        const effDepRate = realCashNow > 3000000 ? Math.min(era.deposit_rate_1yr, 0.065) : era.deposit_rate_1yr;
        life.moneyNominal = Math.round(life.moneyNominal * (1 + effDepRate));
      } else if (life.moneyNominal < 0) {
        const debtRate = life.flags.heavy_debt ? 0.08 : 0.035;
        // Interest accrual stops once the debt is clearly uncollectable (bank workout / write-off)
        const cap = Math.max(400000 * era.cpi, Math.max(earnedThisYear, era.min_wage_twd * 8) * 3);
        if (-life.moneyNominal < cap) life.moneyNominal = Math.round(life.moneyNominal * (1 + debtRate));
      }

      const adultAge = this.getLegalAdultAge(life.currentYear);
      if ((life.investStyle === "index_etf" || life.investStyle === "leverage") && life.age >= adultAge && !life.flags.retired && netCashflow > 0) {
        const emergencyBuffer = Math.max(Math.round(annualExpenseNominal * 0.5), Math.round(150000 * era.cpi));
        const investable = Math.max(0, life.moneyNominal - emergencyBuffer);
        const dca = Math.min(investable, Math.round(netCashflow * 0.25));
        if (dca > 0) {
          life.moneyNominal -= dca;
          life.stockNominal += dca;
        }
      }

      // Apply exact historical TAIEX return + dividend yield or leverage beta + margin call
      if (life.stockNominal > 0) {
        const beforeStock = life.stockNominal;
        let totalRet;
        if (life.investStyle === "leverage") {
          const hitMarginCall = mkt.price_pct <= -0.22 ||
            (mkt.max_drawdown <= -0.32 && (mkt.price_pct < 0 || Math.random() < 0.22));
          if (hitMarginCall) {
            const wipeRatio = clamp(Math.abs(mkt.max_drawdown) * 1.45, 0.72, 0.94);
            life.stockNominal = Math.max(0, Math.round(beforeStock * (1 - wipeRatio)));
            const marginDebt = Math.round(beforeStock * 0.15);
            life.moneyNominal -= marginDebt;
            life.flags.margin_called_this_year = true;
            life.flags.heavy_debt = life.moneyNominal < 0;
            life.investStyle = "deposit"; // 斷頭後退出融資，不再年年重複斷頭
            life.stats.happiness -= 22;
            const lostAmt = beforeStock - life.stockNominal + marginDebt;
            const isMarginEra = life.currentYear >= 1980;
            life.marketLogSummary.push(`${life.currentYear} ${isMarginEra ? "融資斷頭" : "重壓個股腰斬"}（損失約 NT$${lostAmt.toLocaleString()}）`);
            life.feed.unshift({
              type: "market_event",
              age: life.age, year: life.currentYear, roc: era.roc,
              isCrash: true,
              pct: mkt.price_pct,
              title: `📉 【${isMarginEra ? "台股融資斷頭" : "台股重壓慘賠"}】${life.currentYear} 年大盤劇震（全年 ${(mkt.price_pct * 100).toFixed(1)}%，盤中最大回撤 ${(mkt.max_drawdown * 100).toFixed(1)}%）`,
              text: isMarginEra
                ? `${mkt.note ? mkt.note + "。" : ""}你的融資槓桿部位慘遭追繳斷頭，股市資產與保證金合計蒸發約 NT$${lostAmt.toLocaleString()}，財務陷入重大危機！`
                : `${mkt.note ? mkt.note + "。" : ""}你重壓熱門股遭遇大盤崩跌慘遭腰斬套牢，股票資產與拆借合計蒸發約 NT$${lostAmt.toLocaleString()}，財務陷入重大危機！`
            });
          } else {
            totalRet = clamp(mkt.price_pct * 1.45, -0.55, 1.40);
            life.stockNominal = Math.max(0, Math.round(beforeStock * (1 + totalRet)));
          }
        } else if (life.age >= 55 || life.flags.retired) {
          // Pre-retirement / retirement conservative glide-path allocation
          totalRet = clamp(mkt.price_pct * 0.35 + mkt.div_yield * 0.60 - 0.005, -0.18, 0.14);
          life.stockNominal = Math.max(0, Math.round(beforeStock * (1 + totalRet)));
        } else {
          // Working-age retail index return (reflects cash/bond buffer, tax & fee drag)
          totalRet = (mkt.price_pct + mkt.div_yield) * 0.72 - 0.008;
          life.stockNominal = Math.max(0, Math.round(beforeStock * (1 + totalRet)));
        }

        // Log significant historical bull/bear swings for non-margin-call stock holders
        if (!life.flags.margin_called_this_year && (mkt.price_pct >= 0.24 || mkt.price_pct <= -0.19) && beforeStock >= 80000 * era.cpi) {
          const delta = life.stockNominal - beforeStock;
          const isUp = delta >= 0;
          const label = life.currentYear >= 2003 ? "台股／0050" : "台股";
          if (Math.abs(delta) >= 120000 * era.cpi) {
            life.marketLogSummary.push(`${life.currentYear} ${isUp ? "大漲" : "重挫"} ${(mkt.price_pct * 100).toFixed(1)}%（${isUp ? "+" : "-"}NT$${Math.abs(delta).toLocaleString()}）`);
          }
          life.feed.unshift({
            type: "market_event",
            age: life.age, year: life.currentYear, roc: era.roc,
            isCrash: !isUp,
            pct: mkt.price_pct,
            title: `${isUp ? "📈" : "📉"} 【${mkt.isHistorical ? "史實股市波動" : "股市波動"}】${life.currentYear} 年加權指數 ${mkt.price_pct >= 0 ? "+" : ""}${(mkt.price_pct * 100).toFixed(1)}%`,
            text: `${mkt.note ? mkt.note + "。" : ""}你持有的${label}部位今年帳面${isUp ? "增值" : "縮水"}約 NT$${Math.abs(delta).toLocaleString()}（目前市值 NT$${life.stockNominal.toLocaleString()}）。`
          });
          if (!isUp && mkt.price_pct <= -0.35) life.stats.happiness -= 8;
          else if (isUp && mkt.price_pct >= 0.35) life.stats.happiness += 5;
        }
      }

      // Real estate value tracking & mortgage amortization
      if (life.homeowner) {
        if (!life.homeValueNominal) {
          life.homeValueNominal = this.getHomeCostSpec(life, "suburb", era).totalPrice;
        }
        life.homeValueNominal = Math.max(Math.round(500000 * era.cpi), Math.round(life.homeValueNominal * (1 + mkt.housing_pct)));
        if (life.mortgageBalanceNominal > 0) {
          const pay = Math.min(life.mortgageBalanceNominal, life.mortgageAnnualPayment || Math.round(life.mortgageBalanceNominal * 0.06));
          life.mortgageBalanceNominal = Math.max(0, life.mortgageBalanceNominal - Math.round(pay * 0.72));
          // Mortgage payment already deducted in calcAnnualLivingExpenseNominal above
        }
      }

      // 6. Taiwan Historical Events — STILL REACH PLAYER EVEN WHEN OVERSEAS (Cross-border Taiwan Wire!)
      const rawMatchedEvents = this.data.events.events.filter((ev) => {
        if (life.triggeredEvents[ev.id]) return false;
        const yEnd = ev.year_end || ev.year;
        if (life.currentYear < ev.year || life.currentYear > yEnd) return false;
        if (life.location !== "TAIWAN") {
          return ev.regions.includes("ALL") || ev.regions.includes(life.birthRegionId);
        }
        return ev.regions.includes("ALL") || ev.regions.includes(life.regionId);
      });

      let displayEventSet = new Set(rawMatchedEvents.map((ev) => ev.id));
      if (!showAllHistoricalEvents && rawMatchedEvents.length > 0) {
        const nextAllowedAge = life.flags.nextHistoricalAllowedAge != null ? life.flags.nextHistoricalAllowedAge : 0;
        if (life.age >= nextAllowedAge) {
          const pickedEv = pick(rawMatchedEvents);
          displayEventSet = new Set([pickedEv.id]);
          life.flags.nextHistoricalAllowedAge = life.age + (Math.random() < 0.5 ? 2 : 3);
        } else {
          displayEventSet = new Set();
        }
      }

      life.flags.appliedEventImpacts = life.flags.appliedEventImpacts || {};
      life.flags.checkedProtagonistEvents = life.flags.checkedProtagonistEvents || {};
      let shownHistoricalCount = 0;

      for (const ev of rawMatchedEvents) {
        if (!life.flags.appliedEventImpacts[ev.id]) {
          life.flags.appliedEventImpacts[ev.id] = life.currentYear;
          this.applyHistoricalImpact(life, ev, era, eduMode);
        }

        let protHit = null;
        if (historicalMode && ev.protagonist_involvement && !life.flags.checkedProtagonistEvents[ev.id]) {
          life.flags.checkedProtagonistEvents[ev.id] = life.currentYear;
          protHit = this.evaluateProtagonistInvolvement(life, ev, era);
        }

        const shouldShowCard = Boolean(protHit) || displayEventSet.has(ev.id);
        if (!shouldShowCard) continue;

        life.triggeredEvents[ev.id] = life.currentYear;
        yearMark = "event";
        shownHistoricalCount += 1;
        const isFilteredEdu = eduMode && ev.sensitive;
        const overseasWire = life.location !== "TAIWAN";
        if (overseasWire) life.homesickness = clamp(life.homesickness + 5, 0, 100);

        if (protHit) {
          life.feed.unshift({
            type: "historical_protagonist",
            id: ev.id,
            age: life.age,
            year: life.currentYear,
            roc: era.roc,
            title: ev.title,
            narrative: protHit.narrative,
            reasons: protHit.reasons,
            impacts: protHit.impacts,
            fatal: protHit.fatal,
            aftermath: ev.institutional_aftermath,
            cultural_footnote_en: ev.cultural_footnote_en,
            sources: ev.sources
          });
          if (protHit.fatal) {
            for (const k of ["health", "happiness", "knowledge", "social"]) {
              life.stats[k] = clamp(Math.round(life.stats[k]), 0, 100);
            }
            life.alive = false;
            life.fatalByHistoricalMode = true;
            life.causeOfDeath = {
              key: "historical_mode_fatal",
              label: `【史實模式當事人】${protHit.deathCause}`,
              isSensitive: true
            };
            this.recordTrajectoryPoint(life, era);
            life.yearMarks.push("event");
            return { ended: true };
          }
        } else {
          life.feed.unshift({
            type: "historical_edu",
            id: ev.id,
            age: life.age,
            year: life.currentYear,
            roc: era.roc,
            category: ev.category,
            title: ev.title,
            summary: isFilteredEdu
              ? "【已關閉重大惡性事件細節】此年台灣發生重大社會與公共安全討論，促成後續關鍵法制與保障機制改革。"
              : ev.summary,
            aftermath: ev.institutional_aftermath,
            cultural_footnote_en: ev.cultural_footnote_en,
            sources: ev.sources,
            sensitive: ev.sensitive,
            isFilteredEdu,
            overseasWire,
            commChannel: this.getOverseasCommChannel(life.currentYear)
          });
        }
      }

      // 6B. Taiwan Future Forecast (台灣未來預測 — 2027+, random yet logically consistent fictional projections)
      if (life.currentYear >= 2027 && shownHistoricalCount === 0) {
        if (this.maybeTriggerFutureForecast(life, era, cultEra)) {
          yearMark = "event";
        }
      }

      // 7. Taiwan Customs, Ambient Peer Vignettes (1in8b.life style), Education/Culture & Typhoon Rolls
      if (shownHistoricalCount === 0) {
        const customs = (this.data.cultureEras && this.data.cultureEras.taiwan_customs) || [];
        const matchedCustom = customs.find((cu) => {
          if (life.triggeredCustoms[cu.id]) return false;
          if (cu.min_year && life.currentYear < cu.min_year) return false;
          if (cu.max_year && life.currentYear > cu.max_year) return false;
          if (cu.requires_working && !(life.annualSalaryNominal > 0 && !life.flags.retired)) return false;
          if (cu.career_in && !cu.career_in.includes(life.careerId)) return false;
          if (cu.requires_student && !this.isStudentNow(life)) return false;
          if (life.age < cu.age_range[0] || life.age > cu.age_range[1]) return false;
          if (cu.stage === "postpartum_care" && !(life.childrenBirthYears || []).some((by) => life.currentYear - by >= 0 && life.currentYear - by <= 1)) return false;
          if (cu.id === "cust_exam_temple" && !(life.age === 14 || life.age === 15 || life.age === 18 || life.age === 17)) return false;
          if (cu.id === "cust_lny_adult" && !(life.annualSalaryNominal > 0 && !life.married && !life.flags.ever_married && life.family.parentsAlive)) return false;
          return Math.random() < 0.14;
        });
        if (matchedCustom) {
          life.triggeredCustoms[matchedCustom.id] = true;
          if (life.location !== "TAIWAN") {
            life.homesickness = clamp(life.homesickness + (matchedCustom.homesickness_boost || 6), 0, 100);
            life.feed.unshift({
              type: "custom_card", age: life.age, year: life.currentYear, roc: era.roc,
              text: `【異鄉思鄉】透過${this.getOverseasCommChannel(life.currentYear)}看到台灣親友分享：${matchedCustom.text}`,
              cultural_footnote_en: matchedCustom.cultural_footnote_en
            });
          } else {
            life.stats.happiness += (matchedCustom.happiness_delta || 1);
            life.stats.social += (matchedCustom.social_delta || 1);
            life.feed.unshift({
              type: "custom_card", age: life.age, year: life.currentYear, roc: era.roc,
              text: `【台灣習俗】${matchedCustom.text}`,
              cultural_footnote_en: matchedCustom.cultural_footnote_en
            });
          }
        } else if (life.location === "TAIWAN") {
          const hazard = this.data.lifetable.epidemiology_and_hazard_stats.natural_hazard_annual_rolls;
          const typhoonRisk = (life.regionId === "east_islands" || life.regionId === "south_kaohsiung") ? 0.14 : 0.07;
          if (Math.random() < typhoonRisk) {
            const count = Math.max(1, Math.round(hazard.typhoons_per_year_avg + (Math.random() - 0.5) * 3));
            life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: `今年共有 ${count} 個颱風影響台灣（年均 3–4 個），${reg.name_zh}遇上強風豪雨與停班停課日常。` });
          } else if (Math.random() < 0.26) {
            const commuteTags = life.age >= 15
              ? this.filterEraTexts(reg.flavor_tags.commute, life.currentYear, life, isWorking).map((x) => `${reg.name_zh}日常通勤：${x}。`)
              : [];
            const lifeTags = this.filterEraTexts(reg.flavor_tags.lifestyle, life.currentYear, life, isWorking).map((x) => `在地生活切片：${x}。`);
            const cultVignettes = cultEra ? this.filterEraTexts(cultEra.daily_vignettes, life.currentYear, life, isWorking) : [];
            const eduFlavors = (life.age >= 7 && life.age <= 22 && eduEra)
              ? this.filterEraTexts(eduEra.flavor_events, life.currentYear, life, isWorking)
              : [];
            const dailyFlavors = this.filterEraTexts(life.flags.dailyFlavors || [], life.currentYear, life, isWorking);
            const pool = [
              ...commuteTags,
              ...lifeTags,
              ...cultVignettes,
              ...eduFlavors,
              ...dailyFlavors
            ].filter((t) => !(life.flags.seenTexts && life.flags.seenTexts[t] != null && life.age - life.flags.seenTexts[t] < 14));
            if (pool.length) {
              const txt = pick(pool);
              life.flags.seenTexts = life.flags.seenTexts || {};
              life.flags.seenTexts[txt] = life.age;
              life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: txt });
            }
          }
        }
      }

      // 7A. Parental auto-decisions for minors (age < 18) facing adult household crises
      this.resolveMinorHouseholdCrisis(life, era);
      this.stepChildhoodFamily(life, era);

      // 7B. Ambient Peer Vignettes (偶爾顯示符合時代的周圍人物切片)
      this.maybeTriggerAmbientPeer(life, era);

      if (life.age >= 70 && !life.married && life.children <= 0 && Math.random() < 0.35) {
        life.stats.happiness -= 1 + Math.round((life.flags.old_age_loneliness_risk || 0) * 5);
      }
      if (life.age >= 76 && !life.flags.bedridden && Math.random() < 0.012 * (1 + (life.age - 76) * 0.12) * (life.flags.bedridden_risk_mult || 1) * (life.stats.health < 40 ? 1.6 : 1)) {
        life.flags.bedridden = true;
        life.stats.health -= 10; life.stats.happiness -= 8;
        life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: life.currentYear < 1992 ? "跌倒住院後行動不便，日常起居開始需要家人輪流照顧。" : "跌倒住院後行動不便，日常起居需要看護或家人協助，照護費成為固定開銷。" });
      }

      // 8. Companions & stat clamp
      this.softenGains(life, statsAtYearStart);
      this.stepCompanions(life, era);
      const maxHealthCap = this.healthCap(life);
      life.stats.health = clamp(Math.round(life.stats.health), 0, maxHealthCap);
      for (const k of ["happiness", "knowledge", "social"]) {
        life.stats[k] = clamp(Math.round(life.stats[k]), 0, 100);
      }

      // 9. Mortality roll
      const { qx, band } = this.calcAnnualDeathProb(life, era);
      life.lastSurvivalRate = 1 - qx;
      if (life.flags.pending_death || Math.random() < qx || life.age >= 104) {
        const cause = life.flags.pending_death ? { ...life.flags.pending_death, isSensitive: false } : this.pickCauseOfDeath(life, band, eduMode);
        delete life.flags.pending_death;
        if (life.age >= 60 && this.getLiquidNominal(life) > 0) {
          this.spendLiquid(life, Math.min(this.getLiquidNominal(life), Math.round(180000 * era.cpi * (life.flags.terminal_cost_mult || 1))));
        }
        life.alive = false;
        life.causeOfDeath = cause;
        this.recordTrajectoryPoint(life, era);
        life.yearMarks.push("event");
        life.feed.unshift({
          type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
          text: `你在 ${life.currentYear} 年（${era.roc}）走完人生旅程，享年 ${life.age} 歲。死因：${cause.label}。`,
          highlight: true, showHelpline: cause.isSensitive
        });
        return { ended: true };
      }

      // 10. Pause question & Decisions (Return-to-Taiwan > Study Abroad > Taiwan Decisions)
      const pq = this.data.decisions.pause_questions.find((q) => q.age === life.age) || null;
      let pendingDecision = null;
      if (life.location !== "TAIWAN") {
        pendingDecision = this.checkReturnTrigger(life, era);
      }
      if (!pendingDecision && life.location === "TAIWAN") {
        pendingDecision = this.checkLifeStageEvent(life, era, Boolean(pq));
      }
      // P1 Fix B03: Priority fixed-age / crisis Taiwan decisions (D02/D04/D05/D17/D22/D28) before random study-abroad
      if (!pendingDecision) {
        pendingDecision = this.findEligibleDecision(life, era, eduMode, Boolean(pq), true);
      }
      if (!pendingDecision && life.location === "TAIWAN" && !pq) {
        pendingDecision = this.checkStudyAbroadOpportunity(life, era);
      }
      if (!pendingDecision) {
        pendingDecision = this.findEligibleDecision(life, era, eduMode, Boolean(pq), false);
      }
      if (!pendingDecision && life.age === 45 && life.flags.focusStage === "work") life.flags.focusPromptReason = life.flags.focusPromptReason || "midlife";
      if (!pendingDecision && life.children > (life.flags.focusKids || 0)) { life.flags.focusKids = life.children; if (life.children === 1) life.flags.focusPromptReason = life.flags.focusPromptReason || "child"; }
      if (!pendingDecision && life.location === "TAIWAN") {
        const eraDec = this.findEraChoice(life, era, Boolean(pq));
        if (eraDec && eraDec.parentDecides) {
          const elig = eraDec.options.filter((o) => this.isOptionEligible(life, o, era).eligible);
          this.applyDecision(life, eraDec, this.chooseAutoOption(life, eraDec, elig, era).key, era);
          yearMark = "decision";
        } else if (eraDec) {
          pendingDecision = eraDec;
        }
      }

      if (!pendingDecision && !pq) pendingDecision = this.maybeFocusCard(life, era);
      if (pendingDecision) {
        yearMark = "decision";
        if (autoMode) {
          const eligibleOpts = pendingDecision.options.filter((o) => this.isOptionEligible(life, o, era).eligible);
          const chosenOpt = this.chooseAutoOption(life, pendingDecision, eligibleOpts, era);
          this.applyDecision(life, pendingDecision, chosenOpt.key, era);
          let prevD = pendingDecision;
          for (let guard = 0; guard < 3; guard++) {
            const nextD = this.findFollowUpDecision(life, prevD, era);
            if (!nextD) break;
            const el2 = nextD.options.filter((o) => this.isOptionEligible(life, o, era).eligible);
            this.applyDecision(life, nextD, this.chooseAutoOption(life, nextD, el2, era).key, era);
            prevD = nextD;
          }
        }
      }

      this.recordTrajectoryPoint(life, era);
      life.yearMarks.push(yearMark);
      return {
        ended: false,
        pendingDecision: autoMode ? null : pendingDecision,
        pauseQuestion: autoMode ? null : pq
      };
    }


    // Attribute-driven Junior High -> High School / Vocational / Work Entrance Exam (1950–2070)
    evaluateHsExam(life, level = "senior") {
      const sys = this.data.lifeStages && this.data.lifeStages.hs_exam_system;
      if (!sys) return null;
      const examEra = sys.eras.find((e) =>
        ((e.level || "senior") === level) &&
        (e.min_year == null || life.currentYear >= e.min_year) &&
        (e.max_year == null || life.currentYear <= e.max_year)
      ) || sys.eras[sys.eras.length - 1];

      const cramBonus = life.flags.hs_exam_bonus || 0;
      const quintileBonus = (life.quintile - 3) * 3.5 - (life.flags.child_hardship || 0) * 3;
      const personalityBonus = (life.personalities || []).some((p) => p.id === "cautious" || p.id === "workaholic") ? 3 : 0;
      const randomSwing = (Math.random() - 0.5) * 18;
      const score = clamp(Math.round(life.stats.knowledge + cramBonus + quintileBonus + personalityBonus + randomSwing), 15, 100);

      let tier = "vocational_only";
      let tierLabel = "達高職／五專或就業門檻（未達普通高中錄取線）";
      if (score >= examEra.top_threshold) {
        tier = "top_hs";
        tierLabel = "高分達標！錄取頂尖明星高中（各地一中／女中）";
      } else if (score >= examEra.hs_threshold) {
        tier = "normal_hs";
        tierLabel = "達標普通高中，也可自由選擇高職／五專";
      }

      life.flags.hs_exam_name = examEra.name;
      life.flags.hs_exam_score = score;
      life.flags.hs_exam_result_tier = tier;
      return { examEra, score, tier, tierLabel };
    }

    // Check contextual life-stage events (LS01–LS10) driven by environment & attributes
    checkLifeStageEvent(life, era, isPauseYear) {
      const events = (this.data.lifeStages && this.data.lifeStages.stage_events) || [];
      if (!events.length) return null;

      for (const ev of events) {
        if (life.triggeredDecisions[ev.id]) continue;
        const c = ev.conditions || {};
        if (c.in_taiwan_only && life.location !== "TAIWAN") continue;

        // Special: LS02 Junior High Exam & Branching (replaces static D01)
        if (c.special === "junior_exam_year") {
          if (life.age !== 12 || this.hasSwitch(life.currentYear, "compulsory_9yr_ed")) continue;
          const resJ = this.evaluateHsExam(life, "junior");
          const okJ = resJ.tier !== "vocational_only";
          return {
            ...ev, isLifeStageCard: true, isFixedAge: true,
            resolvedTitle: "📝 國小畢業：初中聯考放榜",
            resolvedDesc: `國小畢業了。此時還沒有九年國教，想念初中要先過聯考；你的表現約「${resJ.score} 分」，${okJ ? "考上了初中" : "沒有達到初中錄取線"}。家裡的經濟與大人的想法，也會左右接下來的路。`,
            resolvedSource: life.sex === "F" ? "這個年代不少家庭把升學機會先留給男孩" : "這個年代約四成孩子國小畢業就開始工作"
          };
        }
        if (c.special === "hs_exam_year") {
          if (life.age !== 15 || life.eduLevel < 2 || life.flags.hs_tier === "work_early") continue;
          const res = this.evaluateHsExam(life);
          life.triggeredDecisions["D01_junior_high_track"] = true; // prevent duplicate static D01
          return {
            ...ev,
            isLifeStageCard: true,
            isFixedAge: true,
            resolvedTitle: `📝 ${res.examEra.name}放榜：你的下一步？`,
            resolvedDesc: `你參加了 ${life.currentYear} 年（${era.roc}）的「${res.examEra.name}」。綜合你的知識值（${life.stats.knowledge}）、家境資源與課後準備，本次表現換算分為「${res.score} 分」—— ${res.tierLabel}。`,
            resolvedSource: `不同升學路線將解鎖截然不同的 16–22 歲校園環境、證照或大學升學加成。`
          };
        }

        // Skip wide-range events on pause years or cooldown (except fixed-age school milestones)
        const isFixed = c.age != null || c.requires_in_uni;
        if (!isFixed && (isPauseYear || life.age - life.lastDecisionAge < DECISION_COOLDOWN)) continue;

        if (c.age != null && life.age !== c.age) continue;
        if (c.age_range && (life.age < c.age_range[0] || life.age > c.age_range[1])) continue;
        if (c.requires_hs_tier && !c.requires_hs_tier.includes(life.flags.hs_tier)) continue;
        if (c.requires_in_uni && !(life.eduLevel === 4 && life.education.includes("在學"))) continue;
        if (c.requires_working && !(life.age >= 25 && !life.flags.retired && !life.flags.unemployed && !life.education.includes("在學"))) continue;
        if (c.career_not_in && c.career_not_in.includes(life.careerId)) continue;
        if (c.requires_retired_or_65 && !(life.flags.retired || life.age >= 65)) continue;

        // Probability pacing for multi-year windows (LS06 guaranteed at age 20 so every uni student experiences it)
        const forceLS06 = ev.id === "LS06_university_campus_life" && life.age === 20;
        if (c.age_range && !forceLS06 && Math.random() > 0.45) continue;

        return {
          ...ev,
          isLifeStageCard: true,
          isFixedAge: Boolean(isFixed),
          resolvedTitle: ev.title,
          resolvedDesc: ev.desc,
          resolvedSource: `所處環境事件 · 選項與成功率會連動你的屬性與未來人生走向`
        };
      }
      return null;
    }

    findEligibleDecision(life, era, eduMode, isPauseYear, priorityOnly = false, onlyIds = null) {
      const candidates = [];
      for (const d of this.data.decisions.decisions) {
        if (d.deprecated_by) continue;
        if (d.id === "D07_career_track" && life.careerId) continue;
        if (onlyIds && !onlyIds.includes(d.id)) continue;
        // While living overseas only location-neutral cards apply; everything else is Taiwan-local
        if (life.location !== "TAIWAN" && !["D12_first_pot_of_gold", "D17B_romance_encounter", "D18_marriage_choice", "D19_have_children", "D20_marriage_crisis", "D25_retirement_timing"].includes(d.id)) {
          continue;
        }
        const c = d.conditions || {};
        const isFixedAge = c.age != null || ["D01_junior_high_track", "D02_university_major", "D03_exam_retake", "D05_graduation_crossroads"].includes(d.id);
        const isPriorityCard = isFixedAge || ["D04_military_service", "D17_critical_illness_cost", "D22_major_disaster", "D28_debt_clearance", "D30_forced_home_sale", "D31_cashflow_debt_crisis"].includes(d.id) || (d.id === "D07_career_track" && !life.flags.career_chosen) ||
          (d.id === "D25_retirement_timing" && life.age >= this.getPensionAge(life));
        if (priorityOnly && !isPriorityCard) continue;

        if (!d.once_per_era_variant && d.id !== "D31_cashflow_debt_crisis" && life.triggeredDecisions[d.id]) continue;
        if (d.id === "D07B_career_switch" && life.flags.next_switch_age != null && life.age < life.flags.next_switch_age &&
            !(life.flags.switch_prompt && life.currentYear <= life.flags.switch_prompt)) continue;
        if (d.id === "D13_buying_home" && life.flags.next_home_age != null && life.age < life.flags.next_home_age) continue;
        if (d.id === "D20_marriage_crisis" && life.flags.next_crisis_age != null && life.age < life.flags.next_crisis_age) continue;
        if (d.id === "D28_debt_clearance" && life.flags.next_rehab_age != null && life.age < life.flags.next_rehab_age) continue;
        if (d.id === "D25_retirement_timing") {
          if (life.flags.retired || life.flags.fulltime_caregiver) continue;
          if (life.flags.next_retire_ask != null && life.age < life.flags.next_retire_ask) continue;
          const fireOk = d.options.some((o) => o.requires_fire_assets && this.isOptionEligible(life, o, era).eligible);
          const stdOk = d.options.some((o) => o.requires_pension_age && this.isOptionEligible(life, o, era).eligible);
          if (!stdOk && !(life.age >= 50 && fireOk)) continue;
        }
        if (d.id === "D24_elderly_care_storm") {
          const fam = life.family;
          const oldest = Math.max(fam.fatherAlive ? life.currentYear - fam.fatherBirthYear : 0, fam.motherAlive ? life.currentYear - fam.motherBirthYear : 0);
          if (oldest < 72) continue;
        }
        if (d.id === "D05_graduation_crossroads" && life.major === "public_funded") continue;
        const isFastFunnel = ["D06_northbound_migration", "D17B_romance_encounter", "D18_marriage_choice", "D19_have_children"].includes(d.id);
        if (!isPriorityCard && !c.trigger_events && !c.trigger_years && d.id !== "D01B_youth_parttime_request") {
          if (isPauseYear) continue;
          const minGap = isFastFunnel ? 1 : DECISION_COOLDOWN;
          if (life.age - life.lastDecisionAge < minGap) continue;
        }
        if (d.id === "D19_have_children") {
          const births = life.childrenBirthYears || [];
          const lastBirthYear = births.length ? births[births.length - 1] : null;
          const maxKids = life.birthYear < 1962 ? 5 : life.birthYear < 1975 ? 4 : 3;
          const motherAge = life.sex === "F" ? life.age : (life.spouse ? life.currentYear - life.spouse.birthYear : life.age - 2);
          if (life.flags.no_more_kids || motherAge > 43 || motherAge < 18) continue;
          if (life.flags.next_child_ask_age != null && life.age < life.flags.next_child_ask_age) continue;
          if (life.children >= maxKids || (lastBirthYear != null && (life.currentYear - lastBirthYear) < 2)) continue;
        }
        if (d.id === "D17B_romance_encounter" && life.flags.next_romance_age != null && life.age < life.flags.next_romance_age) continue;
        if (d.id === "D18_marriage_choice") {
          if (life.flags.next_marriage_ask_age != null && life.age < life.flags.next_marriage_ask_age) continue;
          if ((life.flags.declined_marriage || 0) >= 3) continue;
          if (life.flags.military_gap_years > 0 || (life.location !== "TAIWAN" && life.abroad && life.abroad.studyYearsLeft > 0)) continue;
          if (this.isStudentNow(life) && life.currentYear >= 1970) continue;
        }
        if (d.id === "D01B_youth_parttime_request" && isPauseYear) continue;

        if (d.id === "D01_junior_high_track") {
          const targetAge = this.hasSwitch(life.currentYear, "compulsory_9yr_ed") ? 15 : 12;
          if (life.age !== targetAge) continue;
        } else if (d.id === "D02_university_major") {
          const admitAge = life.uniGradAge === 23 ? 19 : 18;
          if (life.age !== admitAge || !life.flags.admitted_to_university || life.subMajor) continue;
        } else if (d.id === "D05_graduation_crossroads") {
          if (life.age !== life.uniGradAge || !life.flags.university_grad) continue;
        } else {
          if (c.age != null && life.age !== c.age) continue;
          if (c.age_range && (life.age < c.age_range[0] || life.age > c.age_range[1])) continue;
        }

        if (c.sex) {
          const normSex = c.sex === "male" ? "M" : c.sex === "female" ? "F" : c.sex;
          if (life.sex !== normSex) continue;
        }
        // D04 Military Service: fire after graduation (or age 20 if not in uni) so it doesn't collide with school
        if (d.id === "D04_military_service") {
          const inUniNow = life.eduLevel === 4 && life.education.includes("在學");
          if (inUniNow || life.flags.in_grad_school_years > 0 || life.flags.retaking_exam || life.flags.exam_prep_years > 0) continue;
          if (this.isAwaitingGraduationChoice(life) || life.age < 20) continue;
          if (life.married && life.children > 0) continue;
        }
        if (c.region_not_in && c.region_not_in.includes(life.regionId)) continue;
        if (c.career_in && !c.career_in.includes(life.careerId)) continue;
        if (c.career_not_in && c.career_not_in.includes(life.careerId)) continue;
        if (c.trigger_years && !c.trigger_years.includes(life.currentYear)) continue;
        if (c.health_below && life.stats.health >= c.health_below) continue;
        if (c.not_homeowner && life.homeowner) continue;
        if (c.no_car_yet && life.ownedAssets && life.ownedAssets.vehicle && life.ownedAssets.vehicle.type === "car") continue;
        if (c.requires_working_adult) {
          const inSchNow = life.education.includes("在學") || life.flags.in_grad_school_years > 0 || life.flags.retaking_exam;
          const workingNow = life.age >= 18 && !inSchNow && !(life.flags.military_gap_years > 0) && !life.flags.retired && !life.flags.unemployed && !life.flags.fulltime_caregiver;
          if (!workingNow) continue;
        }
        if (c.requires_student_no_parttime) {
          const canRequest = life.age >= 15 && life.age <= 17 && life.flags.hs_tier !== "work_early" && !life.flags.part_time_approved && !life.flags.vocational_coop && life.eduLevel >= 2;
          if (!canRequest) continue;
        }
        if (c.min_work_years && (life.workYears || 0) < c.min_work_years) continue;
        if (d.id === "D07B_career_switch" && (life.location !== "TAIWAN" || !life.careerId)) continue;
        if (c.married && !life.married) continue;
        if (d.id === "D18_marriage_choice" && life.married) continue;
        if (d.id === "D30_forced_home_sale") {
          if (!life.homeowner) continue;
          const mktNow = this.getMarketYear(life.currentYear);
          const realCash = life.moneyNominal / Math.max(0.07, era.cpi);
          const isCrisisYear = mktNow.price_pct <= -0.20 || mktNow.max_drawdown <= -0.30 || [1990, 1998, 2000, 2008, 2009, 2020, 2021, 2025].includes(life.currentYear);
          const crisisSqueeze = isCrisisYear && (life.flags.unemployed || life.flags.margin_called_this_year || (life.mortgageBalanceNominal > 0 && realCash < 120000));
          const cashTrigger = (this.data.marketHistory && this.data.marketHistory.financial_thresholds_2025 && this.data.marketHistory.financial_thresholds_2025.forced_sale_cash_trigger) || -350000;
          const severeInsolvency = life.mortgageBalanceNominal > 0 && realCash < cashTrigger;
          if (!crisisSqueeze && !severeInsolvency) continue;
          if (!severeInsolvency && Math.random() > 0.55) continue;
        }
        if (c.requires === "admitted_to_university" && !life.flags.admitted_to_university) continue;
        if (c.requires === "missed_target_school" && !life.flags.missed_target_school) continue;
        if (c.requires === "university_grad" && !life.flags.university_grad) continue;
        if (c.requires === "major_illness_diagnosed" && life.stats.health > 45 && !life.flags.major_illness_pending) continue;
        if (c.requires_flag && !life.flags[c.requires_flag]) continue;
        if (c.no_partner_yet && (life.partner || life.married)) continue;
        if (d.id === "D17B_romance_encounter" && life.age > 45 && !life.flags.ever_married) continue;
        if (c.has_partner && !life.partner && !life.married) continue;
        if (c.requires_after_marriage_choice) {
          // Strict causality: must be married OR have explicitly chosen long-term cohabitation in D18 while still partnered
          const cohabitingAfterD18 = Boolean(life.triggeredDecisions["D18_marriage_choice"] && life.partner);
          if (!life.married && !cohabitingAfterD18) continue;
        }
        if (c.requires_child_age_range) {
          const [minC, maxC] = c.requires_child_age_range;
          const births = life.childrenBirthYears || [];
          const hasMatchingChild = births.some((by) => {
            const cAge = life.currentYear - by;
            return cAge >= minC && cAge <= maxC;
          });
          if (!hasMatchingChild) continue;
        } else if (c.has_school_age_child && life.children <= 0) {
          continue;
        }
        if (c.has_aging_parents && !life.family.parentsAlive) continue;
        if (c.has_stock_assets && life.stockNominal <= 0) continue;
        if (c.requires_year_min && life.currentYear < c.requires_year_min) continue;
        if (c.min_assets_twd_2025 != null) {
          const realVal = (life.moneyNominal + life.stockNominal) / Math.max(0.07, era.cpi);
          if (realVal < c.min_assets_twd_2025) continue;
        }
        if (c.max_assets_twd_2025 != null) {
          if (!this.hasSwitch(life.currentYear, "consumer_debt_clearance")) continue;
          const realVal = (life.moneyNominal + life.stockNominal) / Math.max(0.07, era.cpi);
          if (realVal > c.max_assets_twd_2025) continue;
        }
        if (d.id === "D31_cashflow_debt_crisis") {
          const realCash31 = life.moneyNominal / Math.max(0.07, era.cpi);
          const last31Age = life.flags.lastDebtCrisisAge != null ? life.flags.lastDebtCrisisAge : -10;
          if (life.age < 20 || life.stockNominal > 0 || realCash31 > -160000 || (life.age - last31Age) < 4) continue;
        }
        if (d.id === "D22_major_disaster") {
          if (life.age < 18) continue;
          const activeDisaster = (c.trigger_events || [])
            .map((id) => this.eventMap[id])
            .find((ev) => ev && ev.disaster_year === life.currentYear && (ev.impact_regions || []).includes(life.regionId));
          if (!activeDisaster || !this.isHitByDisaster(life, activeDisaster)) continue;
          life.flags.lastDisasterName = activeDisaster.disaster_name || activeDisaster.title;
        } else if (c.trigger_events) {
          if (!c.trigger_events.some((evId) => life.triggeredEvents[evId] === life.currentYear)) continue;
        }

        let activeVariant = null;
        if (d.era_variants) {
          activeVariant = d.era_variants.find((v) => life.currentYear >= v.year_range[0] && life.currentYear <= v.year_range[1]);
          if (!activeVariant) continue;
          if (d.once_per_era_variant && life.triggeredDecisions[`${d.id}:${activeVariant.variant_id}`]) continue;
        }
        if (!d.options.some((o) => this.isOptionEligible(life, o, era).eligible)) continue;
        const exemptSkip = isFixedAge || (d.id === "D07_career_track" && !life.flags.career_chosen) || d.id === "D04_military_service" || d.id === "D28_debt_clearance" || d.id === "D30_forced_home_sale";
        const randPassMap = {
          D01B_youth_parttime_request: 0.75,
          D06_northbound_migration: 0.65,
          D13_buying_home: 0.75,
          D17B_romance_encounter: 0.78,
          D18_marriage_choice: 0.85,
          D19_have_children: 0.80,
          D16_relative_loan_guarantor: 0.07,
          D20_marriage_crisis: 0.05
        };
        let randPassProb = randPassMap[d.id] != null ? randPassMap[d.id] : 0.36;
        if (d.id === "D17B_romance_encounter") {
          const x = life.age - (this.getTypicalMarriageAge(life) - 6);
          randPassProb = life.age > 48 ? 0.12 : clamp(0.22 + x * 0.08, 0.08, 0.7);
          randPassProb *= clamp(0.85 + life.stats.social / 333, 0.85, 1.15);
        }
        if (d.id === "D18_marriage_choice") {
          const x = life.age - this.getTypicalMarriageAge(life);
          randPassProb = life.flags.ever_married ? 0.3 : clamp(0.5 + x * 0.12, 0.05, 0.8);
        }
        if (d.id === "D20_marriage_crisis") randPassProb = (life.currentYear < 1985 ? 0.02 : life.currentYear < 1998 ? 0.042 : 0.068) * (life.focus === "family" ? 0.5 : life.focus === "work" ? 1.3 : 1);
        if (d.id === "D13_buying_home") {
          const affordable = d.options.some((o) => o.requires_home_afford && this.isOptionEligible(life, o, era).eligible);
          randPassProb = affordable ? (life.married ? 0.75 : 0.4) : (life.age >= 32 && !life.flags.home_barrier_shown ? 0.3 : 0);
        }
        if (d.id === "D07B_career_switch" && life.flags.switch_prompt && life.currentYear <= life.flags.switch_prompt) randPassProb = 0.95;
        if (d.id === "D25_retirement_timing") {
          const pa = this.getPensionAge(life);
          randPassProb = life.age >= pa ? 0.82 : life.age >= pa - 4 ? 0.4 : 0.1;
        }
        if (c.age_range && !exemptSkip && !c.trigger_years && !c.trigger_events && Math.random() > randPassProb) continue;

        const eraTitle = (d.era_titles || []).find((t) => life.currentYear >= (t.min_year != null ? t.min_year : -Infinity) && life.currentYear <= (t.max_year != null ? t.max_year : Infinity));
        let resolvedTitle = (activeVariant && activeVariant.title) || (eraTitle && eraTitle.label) || d.title;
        let resolvedDesc = (activeVariant && (activeVariant.desc || activeVariant.label_context)) || `你在 ${life.currentYear} 年（${era.roc}）面臨這項人生關鍵抉擇：`;
        let resolvedSource = (activeVariant && activeVariant.source_note) || (c.note || "");

        if (d.id === "D01_junior_high_track" && !this.hasSwitch(life.currentYear, "compulsory_9yr_ed")) {
          resolvedTitle = "國小畢業升學抉擇（初中聯考時期）";
          resolvedDesc = "此時台灣義務教育僅涵蓋國小六年，升初中仍須參加聯考，家庭須決定要繼續升學或提早學藝工作。";
        } else if (d.id === "D01B_youth_parttime_request") {
          resolvedDesc = `你今年 ${life.age} 歲，依規定滿 15 歲起可從事合法工讀，但須取得父母（法定代理人）同意。在尚未出社會工作前，你的個人淨資產仍為 NT$0；若想提早靠打工存錢，必須先向父母提出並說服他們點頭：`;
          resolvedSource = "在尚未開始全職工作或取得父母同意打工前，日常生活支出均由家庭負擔，個人名下資產維持 NT$0";
        } else if (d.id === "D04_military_service") {
          const months = this.getConscriptionMonths(life.birthYear, life.currentYear, life.conscriptRoll);
          resolvedDesc = `依你（${life.birthYear} 年生）於 ${life.currentYear} 年的台灣兵役制度，一般義務役役期約為「${months} 個月」${months >= 24 ? "（將明顯中斷職涯與收入）" : ""}。`;
          resolvedSource = `現行役期規範：${life.birthYear} 年次役男一般義務役約 ${months} 個月`;
        } else if (d.id === "D12B_vehicle_purchase") {
          const carCost = this.getVehicleCostNominal("car", era);
          const scCost = this.getVehicleCostNominal("scooter", era);
          const liq = this.getLiquidNominal(life);
          resolvedDesc = `出社會通勤與生活需要代步工具：目前在 ${life.currentYear} 年（${era.roc}）買一台代步汽車約須 NT$${Math.round(carCost / 10000).toLocaleString()} 萬（另有每年養車費）、買機車約須 NT$${scCost.toLocaleString()}（你目前流動資產約 NT$${Math.round(Math.max(0, liq) / 10000).toLocaleString()} 萬）。`;
          resolvedSource = "購車後將正式列入名下資產並計入每年油稅保養開銷；若未來遇資金危機亦可變賣套現";
        } else if (d.id === "D13_buying_home") {
          const coreSpec = this.getHomeCostSpec(life, "core", era);
          const subSpec = this.getHomeCostSpec(life, "suburb", era);
          const liq = this.getLiquidNominal(life);
          resolvedDesc = `${this.getRegion(life.regionId).name_zh}蛋黃區總價約 NT$${Math.round(coreSpec.totalPrice / 10000).toLocaleString()} 萬（頭期自備約 ${Math.round(coreSpec.requiredOwnCash / 10000).toLocaleString()} 萬）、蛋白區約 NT$${Math.round(subSpec.totalPrice / 10000).toLocaleString()} 萬（自備約 ${Math.round(subSpec.requiredOwnCash / 10000).toLocaleString()} 萬）。你目前流動資產約 NT$${Math.round(Math.max(0, liq) / 10000).toLocaleString()} 萬。`;
          resolvedSource = life.currentYear >= 2023 ? "現行首購政策含新青安最高 40 年房貸、頭期門檻略降，但房價所得比仍高" : "若存款或年薪不足以負擔頭期款與房貸，將只能繼續租屋";
        } else if (d.id === "D17_critical_illness_cost") {
          const hasNHI = this.hasSwitch(life.currentYear, "nhi_universal_healthcare") && life.location === "TAIWAN";
          const medNeed = this.getMedicalSelfPayNominal(life, era);
          const liq = this.getLiquidNominal(life);
          resolvedDesc = hasNHI
            ? `你在 ${life.currentYear} 年確診重大傷病！雖有全民健保提供基礎醫療保障，但${life.currentYear >= 2003 ? "先進標靶" : "進口特效藥與新式"}自費療程仍須約 NT$${Math.round(medNeed / 10000).toLocaleString()} 萬（目前流動資產約 NT$${Math.round(Math.max(0, liq) / 10000).toLocaleString()} 萬）。若無力負擔恐面臨病情惡化或失能風險。`
            : `你在 ${life.currentYear} 年確診重大傷病！家裡的保險有限，完整自費治療須高達約 NT$${Math.round(medNeed / 10000).toLocaleString()} 萬（目前流動資產約 NT$${Math.round(Math.max(0, liq) / 10000).toLocaleString()} 萬），無力負擔恐致殘疾或早逝。`;
          resolvedSource = hasNHI ? "全民健保大幅減輕基礎醫療費，但自費療程與經濟落差仍攸關預後" : "積蓄不足常導致延誤治療、失能甚至因病而貧";
        } else if (d.id === "D29_child_study_abroad") {
          const need = Math.round(((this.data.marketHistory && this.data.marketHistory.financial_thresholds_2025.child_abroad_full) || 2400000) * era.cpi);
          const liq = this.getLiquidNominal(life);
          resolvedDesc = `你的孩子考上理想海外名校，興奮地問你能不能出國留學（學費加生活費約須 NT$${Math.round(need / 10000).toLocaleString()} 萬；你目前流動資產約 NT$${Math.round(Math.max(0, liq) / 10000).toLocaleString()} 萬）。`;
          resolvedSource = "存款與房產淨值直接決定能否為下一代鋪出海外留學路";
        } else if (d.id === "D31_cashflow_debt_crisis") {
          const debtNow = Math.abs(Math.min(0, life.moneyNominal));
          resolvedDesc = `由於近年生活開銷持續超過收入，你的現金存款已跌至負債約 NT$${debtNow.toLocaleString()} 且手邊無持股可變現，利息仍不斷累積！你必須立刻決定如何籌措現金止血：`;
          resolvedSource = "當收支長期赤字，若未及時變現資產或縮減支出，高利借貸極易讓債務雪球越滾越大";
        } else if (d.id === "D30_forced_home_sale") {
          const hv = life.homeValueNominal || 0;
          const mb = life.mortgageBalanceNominal || 0;
          resolvedDesc = `受 ${life.currentYear} 年金融市場震盪、失業或資金斷裂衝擊，你手頭現金嚴重吃緊，名下房屋（估值約 NT$${Math.round(hv / 10000).toLocaleString()} 萬，剩餘房貸約 NT$${Math.round(mb / 10000).toLocaleString()} 萬）已難以支撐每月還款！`;
          resolvedSource = "高槓桿與景氣反轉常迫使中產家庭在低檔賣房止血，甚至遭銀行法拍";
        } else if (d.id === "D18_marriage_choice" && this.hasSwitch(life.currentYear, "same_sex_marriage")) {
          resolvedSource = "2019 年 5 月 24 日起台灣同婚專法生效（亞洲第一），多元伴侶皆可合法登記結婚";
        }

        let resolvedOptions = d.options;
        if (d.id === "D29_child_study_abroad" && d.options.some((o) => o.key !== "cannot_afford_abroad" && this.isOptionEligible(life, o, era).eligible)) {
          // 付得起時，「不資助」是選擇而不是無力負擔
          resolvedTitle = "子女想出國留學：要出這筆錢嗎？";
          resolvedOptions = d.options.map((o) => o.key === "cannot_afford_abroad"
            ? { ...o, label: "評估家庭財務後決定不資助，鼓勵子女在台灣升學或自行申請獎學金", era_labels: null } : o);
        }
        if (d.id === "D23_pandemic_dilemma") {
          const isRetiredOrSchool = life.flags.retired || life.education.includes("在學") || life.flags.in_grad_school_years > 0;
          if (isRetiredOrSchool) {
            resolvedOptions = d.options.map((o) => {
              if (o.key === "strict_stay_home") return { ...o, label: "嚴格居家防疫、謝絕所有聚會外出（大幅壓低染疫風險、生活孤立）" };
              if (o.key === "keep_working") return { ...o, label: "照常外出採買、運動或兼差維持日常（生活如常但染疫風險升高）" };
              return o;
            });
          }
        }
        if (d.id === "D31_cashflow_debt_crisis") {
          const oa = life.ownedAssets || {};
          const vehResale = this.getOwnedAssetResaleNominal(life, "vehicle", era);
          const valResale = this.getOwnedAssetResaleNominal(life, "valuables", era);
          resolvedOptions = resolvedOptions.map((o) => {
            if (o.key === "sell_vehicle" && oa.vehicle) {
              return { ...o, label: `忍痛變賣名下「${oa.vehicle.name}」（估計變現約 NT$${vehResale.toLocaleString()}），並啟動兩年縮衣節食` };
            }
            if (o.key === "sell_valuables" && oa.valuables) {
              return { ...o, label: `忍痛變賣「${oa.valuables.name}」（估計變現約 NT$${valResale.toLocaleString()}）應急止血` };
            }
            return o;
          });
        }
        if (d.id === "D25_retirement_timing") {
          const pa = this.getPensionAge(life);
          resolvedDesc = life.age < pa && life.age >= pa - 4
            ? `你 ${life.age} 歲，離請領年齡（約 ${pa} 歲）還有幾年，但積蓄夠撐過這段空窗。要提早退下來，還是再做幾年？`
            : life.age < pa
            ? `你 ${life.age} 歲，積蓄已足夠支應往後生活。要提早離開職場，還是繼續工作到請領年齡（約 ${pa} 歲）？`
            : `你 ${life.age} 歲，已符合老年給付請領年齡（約 ${pa} 歲）。${life.married && life.spouse ? `和${life.spouse.name}商量後，` : ""}接下來怎麼打算？`;
          resolvedOptions = resolvedOptions.filter((o) => !(o.key === "standard_retire" && life.age < pa - 4) && !(o.key === "early_fire" && life.age >= pa - 4)).map((o) => {
            if (o.key === "second_career") return { ...o, label: life.age < pa ? "繼續工作，先不考慮退休" : this.isSelfEmployed(life) ? "繼續做，做到做不動為止（幾年後再決定）" : life.flags.second_career_started ? "再做幾年（維持兼職）" : o.label };
            return o;
          });
        }
        if (d.id === "D22_major_disaster" && life.flags.lastDisasterName) {
          resolvedDesc = `你家在${life.flags.lastDisasterName}中受損。${life.homeowner ? "房子需要花一大筆錢修復。" : "租的房子暫時不能住人。"}要留下來重建，還是搬到別的地方？`;
        }
        if (d.id === "D19_have_children") {
          const pNat = this.getConceptionProb(life, false);
          const who = life.sex === "F" ? "你" : (life.spouse ? life.spouse.name : "太太");
          resolvedDesc = `${life.married && life.spouse ? `你和${life.spouse.name}` : "你們"}討論要不要${life.children > 0 ? "再" : ""}生孩子。以${who}目前 ${this.getMotherAge(life)} 歲來看，努力一年懷孕成功的機率約 ${Math.round(pNat * 100)}%。`;
          resolvedOptions = resolvedOptions.map((o) => o.key === "have_child" ? { ...o, era_labels: null, label: `${life.children > 0 ? "再生一個" : "決定生育下一代"}（今年成功機率約 ${Math.round(pNat * 100)}%${life.currentYear >= 2026 ? "，每胎補助 10 萬元" : ""}）` } : o);
          if ((life.flags.infertile_tries || 0) >= 2) {
            if (life.currentYear >= 1985) {
              const cost = Math.round(220000 * this.wageScale(era) * era.cpi);
              resolvedOptions = resolvedOptions.concat([{ key: "ivf", label: `求助生殖醫學（人工生殖療程約 NT$${Math.round(cost / 10000)} 萬，今年成功機率約 ${Math.round(this.getConceptionProb(life, true) * 100)}%）`, effects: { children_delta: 1, ivf: true } }]);
            }
            resolvedOptions = resolvedOptions.concat([{ key: "adopt", label: "考慮收養孩子", effects: { adopt_child: true } }]);
          }
          if (life.children > 0) {
            resolvedTitle = `要再生一個嗎？（目前 ${life.children} 個孩子）`;
            resolvedOptions = resolvedOptions.map((o) => o.key === "dink_pets" ? { ...o, label: "這樣就好，不再生了", era_labels: null, effects: { no_more_kids: true, happiness: 2 } }
              : o.key === "have_child" ? { ...o, label: life.currentYear >= 2026 ? "再生一個（可申領每胎 10 萬元生育補助）" : "再生一個", era_labels: null } : o);
          }
        }
        if (d.id === "D17B_romance_encounter" && life.age >= 28) {
          resolvedOptions = resolvedOptions.map((o) => o.key === "start_romance" && o.era_labels
            ? { ...o, era_labels: o.era_labels.map((r) => ({ ...r, label: r.label.replace("在校園社團或職場日久生情", "在職場或親友介紹下日久生情") })) } : o);
          if (life.flags.widowed || life.flags.divorced) resolvedTitle = "又遇見聊得來的人：要再給自己一次機會嗎？";
        }
        if (d.id === "D18_marriage_choice" && life.partnerInfo) {
          resolvedDesc = `你和${life.partnerInfo.name}交往一段時間了，雙方家人也開始問起婚事。你們打算怎麼走下去？`;
        }
        if (d.id === "D20_marriage_crisis" && life.sex === "M") {
          resolvedOptions = resolvedOptions.map((o) => (o.era_labels_male ? { ...o, era_labels: o.era_labels_male } : o));
        }
        if (d.id === "D11_health_red_flags" && d.career_labels) {
          const lb = d.career_labels[this.getCareerWordingGroup(life)] || d.career_labels.default;
          resolvedOptions = resolvedOptions.map((o, oi) => ({ ...o, label: lb[oi] || o.label, era_labels: null }));
        }
        if (d.id === "D10_unpaid_leave" && d.self_employed_variant && this.isSelfEmployed(life)) {
          resolvedTitle = d.self_employed_variant.title;
          resolvedOptions = resolvedOptions.map((o) => ({ ...o, label: d.self_employed_variant.labels[o.key] || o.label, era_labels: null }));
        }
        if (d.id === "D12B_vehicle_purchase" && d.transit_year_by_region) {
          const mrtYear = d.transit_year_by_region[life.regionId];
          const hasMrt = mrtYear && life.currentYear >= mrtYear;
          resolvedOptions = resolvedOptions.map((o) => o.key === "public_transit"
            ? { ...o, era_labels: null, label: `不買車，靠${hasMrt ? "捷運、公車與鐵路" : "公車、客運、火車或腳踏車"}通勤（省下購車與養車費）` }
            : o);
        }
        if (d.id === "D31_cashflow_debt_crisis" || d.id === "D17_critical_illness_cost") {
          const usable = resolvedOptions.filter((o) => !((o.requires_vehicle || o.requires_valuables || o.requires_homeowner || o.requires_homeowner_for_med) && !this.isOptionEligible(life, o, era).eligible));
          if (usable.length) resolvedOptions = usable;
        }
        if (d.id === "D20_marriage_crisis" && life.children <= 0) {
          resolvedOptions = resolvedOptions.map((o) =>
            o.key === "endure_for_kids"
              ? { ...o, label: "為了家庭與長輩面子隱忍磨合" }
              : o
          );
        }
        if (d.id === "D07_career_track") {
          const regNow = this.getRegion(life.regionId);
          const eligibleList = this.getEligibleCareers(life).filter(
            (car) => car.id !== "car_civil_teacher" && car.id !== "car_sme_boss" && !(car.entry === "license" && !car.auto_license && life.flags["license_failed_" + car.id])
          );
          // Weighted sample (not just the top scores) so different lives see different offers; licensed paths always shown
          const licensed = eligibleList.filter((car) => car.entry === "license");
          const openCars = eligibleList.filter((car) => car.entry !== "license");
          const pickedCars = licensed.slice(0, 2);
          while (pickedCars.length < 4 && openCars.length) {
            const car = weightedPick(openCars, (x) => (x.pick_weight != null ? x.pick_weight : 1) *
              (x.preferred_regions.includes(life.regionId) ? 1.6 : 1) * (life.sex === "F" && x.female_weight != null ? x.female_weight : 1) *
              ((life.major && x.preferred_majors.includes(life.major)) ? 1.5 : 1) *
              ((x.required_sub_majors || x.required_majors || (x.required_majors_if_uni && life.eduLevel >= 4)) ? 2.6 : 1));
            pickedCars.push(car);
            openCars.splice(openCars.indexOf(car), 1);
          }
          const dynOpts = pickedCars.map((car) => {
            const estMo = this.estimateCareerMonthlySalary(life, car, era, regNow);
            const carName = this.getCareerDisplayName(car, life.currentYear);
            return {
              key: "career_" + car.id,
              label: car.entry === "license" && !car.auto_license
                ? `報考${car.exam_name}，目標成為「${carName}」（錄取率約 ${Math.round(this.getLicensePassProb(life, car) * 100)}%；未上榜先從基層職務做起）`
                : `投入「${carName}」（預估月薪約 NT$${estMo.toLocaleString()}｜穩定度 ${Math.round(car.stability * 100)}%）`,
              effects: {
                assign_career_id: car.id,
                health: car.health_drain >= 0.9 ? -4 : 0,
                work_hours_high: car.health_drain >= 0.9
              }
            };
          });
          if (life.eduLevel >= 3 && (life.flags.civil_exam_fails || 0) < 3) {
            const civilOpt = d.options.find((o) => o.key === "civil_service");
            if (civilOpt) dynOpts.push(civilOpt);
          }
          if (life.currentYear >= 1970 && life.eduLevel >= 2) {
            const bossOpt = d.options.find((o) => o.key === "family_biz_startup");
            if (bossOpt) dynOpts.push(bossOpt);
          }
          if (dynOpts.length) resolvedOptions = dynOpts;
          const majorLabel = ({ stem_eng: "電資／理工工程", med_doctor: "醫學／牙醫", health_allied: "護理／藥學／醫技", law: "法律", biz: "商管／會計", arts: "人文／社會／藝術", public_funded: "軍警／公費師範" })[life.subMajor] || (life.eduLevel >= 4 ? "綜合" : "實務技能");
          resolvedDesc = `你目前學歷為「${life.education}」（${majorLabel}），身處${regNow.name_zh}。在 ${life.currentYear} 年（${era.roc}）踏入社會，依你的學經歷可選擇以下職業與實業跑道，不同產業將直接決定起薪與後續職涯發展：`;
        }
        if (d.id === "D07B_career_switch") {
          const regNow = this.getRegion(life.regionId);
          const curMo = Math.round((life.annualSalaryNominal || this.computeCurrentAnnualSalaryNominal(life, era, regNow)) / 12);
          const prompted = Boolean(life.flags.switch_prompt && life.currentYear <= life.flags.switch_prompt);
          const minRatio = life.flags.rank_title === "志願役軍士官" && prompted ? 0.7 : ["car_civil_teacher", "car_doctor_pharma", "car_lawyer_cpa", "car_cpa"].includes(life.careerId) ? 1.0 : (prompted ? 0.72 : 0.92);
          const altList = this.getEligibleCareers(life, life.careerId)
            .filter((car) => !car.entry && !(car.max_switch_age && life.age > car.max_switch_age))
            .filter((car) => this.estimateCareerMonthlySalary(life, car, era, regNow) >= curMo * minRatio)
            .slice(0, 3);
          if (!altList.length) continue;
          const switchOpts = altList.map((car) => {
            const estMo = this.estimateCareerMonthlySalary(life, car, era, regNow);
            const carName = this.getCareerDisplayName(car, life.currentYear);
            return {
              key: "switch_" + car.id,
              label: `轉職投入「${carName}」（預估月薪 NT$${curMo.toLocaleString()} → NT$${estMo.toLocaleString()}）`,
              effects: { switch_career_id: car.id }
            };
          });
          const stayOpt = d.options.find((o) => o.key === "stay_current_grow");
          if (stayOpt) {
            switchOpts.push({
              ...stayOpt,
              label: `留在「${life.job}」深耕累積資深年資，穩健調薪`
            });
          }
          resolvedOptions = switchOpts;
          resolvedDesc = `你在「${life.job}」領域已累積 ${life.workYears} 年資歷（目前月薪約 NT$${curMo.toLocaleString()}）。面對 ${life.currentYear} 年（${era.roc}）的產業脈動與獵才邀約，你要趁機跨界轉職還是留在原領域深耕？`;
        }
        candidates.push(this.attachMemory(life, { ...d, options: resolvedOptions, isFixedAge, activeVariant, resolvedTitle, resolvedDesc, resolvedSource }));
      }
      if (!candidates.length) return null;
      return candidates.find((x) => x.isFixedAge) || candidates.find((x) => x.id === "D22_major_disaster" || x.id === "D17_critical_illness_cost" || x.id === "D30_forced_home_sale" || x.id === "D31_cashflow_debt_crisis" || x.id === "D28_debt_clearance" || x.id === "D04_military_service") ||
        candidates.find((x) => ["D18_marriage_choice", "D19_have_children", "D17B_romance_encounter"].includes(x.id)) ||
        candidates.find((x) => x.id === "D25_retirement_timing" || x.id === "D13_buying_home") || pick(candidates);
    }

    // ===== 時代抉擇卡（data.decisions.era_choices）=====
    // 依年份區間＋身分、地點、職業、性格觸發；選項的成敗由屬性與性格決定，後果可延後到指定年份才發生。
    hasTrait(life, id) {
      return (life.personalities || []).some((p) => p.id === id);
    }

    drawOrigin(regionId, birthYear) {
      const newImm = this.interpByYear([[1950, 0.002], [1990, 0.01], [1995, 0.03], [2000, 0.1], [2004, 0.13], [2010, 0.09], [2020, 0.06], [2040, 0.05]], birthYear);
      const indig = ({ east_islands: 0.18, south_kaohsiung: 0.04, north_hsinchu: 0.02, central: 0.015, north_taipei: 0.012, south_tainan: 0.004 })[regionId] || 0.01;
      const hakka = ({ north_hsinchu: 0.42, south_kaohsiung: 0.12, east_islands: 0.13, central: 0.09, north_taipei: 0.08, south_tainan: 0.03 })[regionId] || 0.1;
      const wsMult = ({ north_taipei: 1.9, north_hsinchu: 1.2, central: 0.8, south_tainan: 0.45, south_kaohsiung: 1.0, east_islands: 0.9 })[regionId] || 1;
      const waisheng = this.interpByYear([[1950, 0.13], [1970, 0.11], [1990, 0.085], [2010, 0.065], [2040, 0.05]], birthYear) * wsMult;
      let r = Math.random();
      if ((r -= newImm) < 0) return "new_immigrant";
      if ((r -= indig) < 0) return "indigenous";
      if ((r -= hakka) < 0) return "hakka";
      if ((r -= waisheng) < 0) return "waisheng";
      return "minnan";
    }

    ensureWorldLine(life) {
      if (!life.futureWorld) life.futureWorld = { flags: {}, groups: {}, triggered: {}, lastForecastAge: -10 };
      if (!life.futureWorld.line) {
        const line = {};
        for (const [ax, def] of Object.entries(WORLD_LINE_AXES)) {
          line[ax] = weightedPick(Object.entries(def.values), ([, v]) => v.w)[0];
        }
        life.futureWorld.line = line;
      }
      return life.futureWorld.line;
    }

    describeWorldLine(life) {
      const line = life.futureWorld && life.futureWorld.line;
      if (!line) return [];
      return Object.entries(WORLD_LINE_AXES).map(([ax, def]) => ({ axis: def.label, value: (def.values[line[ax]] || {}).name || line[ax] }));
    }

    // 若這段人生有相關記憶，抉擇時會想起它（描述加一行，自動模式略微偏向）
    attachMemory(life, dec) {
      const hooks = MEMORY_HOOKS[String(dec.id)] || [];
      const mem = life.flags.memories || {};
      const hit = hooks.filter(([tag]) => mem[tag]).sort((a, b) => mem[b[0]].year - mem[a[0]].year)[0];
      if (!hit) return dec;
      const m = mem[hit[0]];
      return { ...dec, memoryBias: hit[1], memoryEcho: m.echo, resolvedDesc: `${dec.resolvedDesc}\n💭 你想起 ${m.age} 歲那年：${m.echo}。` };
    }

    healthCap(life) {
      if (life.flags.disabled || life.flags.disability_level === "severe") return 48;
      if (life.flags.disability_level === "mild") return 75;
      return 100;
    }

    // 屬性越高越難再往上：正向變化依起點打折（50 分時全額，80 分約五成，95 分約兩成）
    softenGains(life, before) {
      for (const k of ["knowledge", "social"]) {
        const prev = before[k], cur = life.stats[k];
        if (prev == null || cur <= prev) continue;
        life.stats[k] = prev + (cur - prev) * clamp((108 - prev) / 58, 0.12, 1);
      }
    }

    // 疾病與事故：依台灣交通事故、職災、中風與癌症發生率，可能康復、留下輕重度失能，或當年過世
    rollHealthIncidents(life, era, eduMode) {
      if (life.location !== "TAIWAN" || !life.alive) return;
      const y = life.currentYear, a = life.age;
      const line = y >= 2027 ? this.ensureWorldLine(life) : null;
      const working = this.isWorkingNow(life);
      const incidents = [];
      // 1. 交通事故（機車時代最高；2027 年後依 AI 世界線，自駕普及會降低）
      if (a >= 15) {
        let p = a < 25 ? 0.004 : a < 45 ? 0.002 : a < 65 ? 0.0015 : 0.0025;
        p *= y < 1975 ? 0.6 : y < 2005 ? 1.4 : y < 2027 ? 1.0 : (line && line.ai === "fast" ? 0.5 : 0.85);
        if (this.hasTrait(life, "risk_taker")) p *= 1.4;
        if (this.hasTrait(life, "cautious")) p *= 0.7;
        incidents.push({ kind: "traffic", p, out: [0.05, 0.08, 0.17] });
      }
      // 2. 職業災害（營造、工廠、農漁、外送物流）
      if (working && ["car_craft_apprentice", "car_epz_worker", "car_farmer_fisher", "car_driver_logistics", "car_gig_delivery"].includes(life.careerId)) {
        incidents.push({ kind: "work", p: y < 1990 ? 0.006 : 0.004, out: [0.012, 0.06, 0.2] });
      }
      // 3. 中風（年齡、健康、檳榔與過勞）
      if (a >= 45) {
        let p = a < 55 ? 0.0015 : a < 65 ? 0.003 : a < 75 ? 0.007 : 0.014;
        if (life.stats.health < 45) p *= 1.5;
        if (life.flags.betel_nut_habit || life.flags.work_hours_high) p *= 1.3;
        if (this.hasTrait(life, "cautious")) p *= 0.85;
        if (life.focus === "health") p *= 0.7;
        if (life.focus === "work" && (life.flags.focusStreak || 0) >= 4) p *= 1.5;
        incidents.push({ kind: "stroke", p, out: [0.15, 0.3, 0.3] });
      }
      // 4. 癌症確診（不直接致死，交由後續治療抉擇）
      if (a >= 30 && !life.flags.cancer_dx_year) {
        let p = a < 40 ? 0.001 : a < 50 ? 0.003 : a < 60 ? 0.006 : a < 70 ? 0.01 : 0.014;
        if (life.flags.betel_nut_habit) p *= 2.0;
        incidents.push({ kind: "cancer", p, out: [0, 0, 0] });
      }
      // 5. 小兒麻痺（1950–1966 疫苗普及前）
      if (a <= 5 && y >= 1950 && y <= 1966) incidents.push({ kind: "polio", p: 0.0006, out: [0.05, 0.45, 0.5] });

      for (const inc of incidents) {
        if (Math.random() >= inc.p) continue;
        this.applyHealthIncident(life, era, inc, eduMode);
        return; // 一年最多一件
      }
    }

    applyHealthIncident(life, era, inc, eduMode) {
      const r = Math.random();
      const [pFatal, pSevere, pMild] = inc.out;
      const outcome = r < pFatal ? "fatal" : r < pFatal + pSevere ? "severe" : r < pFatal + pSevere + pMild ? "mild" : "recovered";
      const hasNHI = this.hasSwitch(life.currentYear, "nhi_universal_healthcare");
      const T = {
        traffic: {
          what: pick(life.age < 18 ? ["放學騎腳踏車回家，在路口被轉彎的車擦撞", "坐在家人的機車後座，遇到對向車搶快"]
            : life.currentYear < 1997 ? ["沒戴安全帽騎機車，在雨天的省道上打滑", "騎機車下班途中，被闖紅燈的貨車撞上"]
            : ["騎機車下班途中，被轉彎的大車捲入", "雨夜開車回家，在高速公路上被後車追撞", "過馬路時被一輛沒有減速的車撞倒"]),
          death: { key: "accident_traffic", label: "交通事故" }
        },
        work: {
          what: pick(["在工地從鷹架上摔下來", "在工廠操作機台時手被捲入", "搬運重物時被倒下的貨架壓傷", "在烈日下作業時熱衰竭倒地"]),
          death: { key: "accident", label: "職業災害" }
        },
        stroke: { what: "某天早上起床，半邊身體突然使不上力，送醫後確診腦中風", death: { key: "cerebrovascular", label: "腦血管疾病（中風）" } },
        cancer: { what: "例行健康檢查發現異常，進一步檢查確診癌症", death: { key: "cancer", label: "惡性腫瘤（癌症）" } },
        polio: { what: "發高燒幾天後，雙腿突然沒了力氣——家人帶你去看醫生，確診小兒麻痺", death: { key: "congenital_neuro_other", label: "小兒麻痺併發症" } }
      }[inc.kind];
      const payer = life.age < 18 || (life.workYears || 0) === 0;
      const billBase = { recovered: 60000, mild: 180000, severe: 450000, fatal: 0 }[outcome];
      const bill = Math.round(billBase * (hasNHI ? 1 : 2.2) * this.wageScale(era) * era.cpi);
      if (!payer && bill > 0) this.spendLiquid(life, Math.min(bill, Math.max(0, this.getLiquidNominal(life)) + bill * 0.3));
      let text = `${T.what}。`;
      let note = "";

      if (inc.kind === "cancer") {
        life.flags.cancer_dx_year = life.currentYear;
        life.flags.major_illness_pending = true;
        life.stats.health = Math.min(life.stats.health - 12, 50);
        life.stats.happiness -= 8;
        text += "醫師說要盡快決定治療方式。";
        note = "接下來要面對治療的抉擇";
      } else if (outcome === "fatal") {
        life.flags.pending_death = T.death;
        text += "傷勢太重，搶救無效。";
      } else if (outcome === "severe") {
        life.flags.disability_level = "severe";
        life.flags.disabled = true;
        life.flags.disability_cause = inc.kind;
        life.stats.health = Math.min(life.stats.health, 40);
        life.stats.happiness -= 15;
        life.stats.social -= 5;
        text += inc.kind === "polio" ? "你的雙腿從此要靠支架行走。" : "命保住了，但留下重度失能，生活起居需要人協助。";
        note = "重度失能：健康上限 48，無法從事勞力與久站工作";
      } else if (outcome === "mild") {
        if (life.flags.disability_level !== "severe") life.flags.disability_level = "mild";
        life.flags.disability_cause = life.flags.disability_cause || inc.kind;
        life.stats.health = Math.min(life.stats.health - 10, 70);
        life.stats.happiness -= 8;
        text += inc.kind === "polio" ? "你走路一跛一跛的，但還能自己上下學。" : "復健了大半年，留下行動不便的後遺症。";
        note = "輕度失能：健康上限 75，無法從事重體力工作";
      } else {
        life.stats.health -= 8;
        life.stats.happiness -= 4;
        text += "住院幾個星期後慢慢康復了。";
      }
      if (outcome === "severe" || outcome === "mild") this.handleDisabilityCareer(life, era);
      if (bill > 0 && !payer) note += `${note ? "｜" : ""}醫療與復健支出約 NT$${bill.toLocaleString()}`;
      life.feed.unshift({
        type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
        text: `【${inc.kind === "cancer" || inc.kind === "stroke" || inc.kind === "polio" ? "🏥 疾病" : "🚑 意外"}】${text}`,
        impactChips: note ? note.split("｜").map((t) => ({ text: t, good: false })) : null,
        highlight: true
      });
    }

    // 失能後不能再做原本的勞力工作：45 歲以下重新找工作，以上轉任輕便職務
    handleDisabilityCareer(life, era) {
      const car = (this.data.educationCareers.careers || []).find((c) => c.id === life.careerId);
      if (!car || this.isCareerEligibleForLife(life, car)) {
        if (life.careerId) life.careerSalaryMult = +((life.careerSalaryMult || 1) * 0.9).toFixed(2);
        return;
      }
      const alt = this.getEligibleCareers(life).filter((c) => !c.entry)[0];
      if (life.age <= 45 || !alt) {
        life.careerId = null;
        life.flags.career_chosen = false;
        delete life.triggeredDecisions["D07_career_track"];
        life.job = "傷病休養、重新找工作";
      } else {
        this.assignCareer(life, alt);
        life.careerSalaryMult = +(life.careerSalaryMult * 0.75).toFixed(2);
        life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: `身體無法再負荷原本的工作，你轉任「${life.job}」，薪水少了一截。` });
      }
    }

    // ===== 年度重心 =====
    getFocusStage(life) {
      if (life.age < 12) return null;
      if (life.flags.retired || (life.age >= 65 && !this.isWorkingNow(life))) return "retired";
      if (life.age < 18 || this.isStudentNow(life) || (life.age < 24 && !life.careerId)) return "student";
      return "work";
    }

    getFocusOptions(life) {
      const stage = this.getFocusStage(life);
      if (!stage) return [];
      return Object.entries(FOCUS_STAGES[stage].options)
        .filter(([, o]) => !o.minAge || life.age >= o.minAge)
        .map(([key, o]) => ({ key, ...o }));
    }

    describeFocusFx(fx) {
      return Object.entries(fx).filter(([, v]) => v).map(([k, v]) => `${STAT_NAMES[k]}${v > 0 ? "+" : ""}${v}`).join("、");
    }

    // 人生轉折點（進國中、出社會、結婚、生子、退休等）詢問新的重心
    maybeFocusCard(life, era) {
      const stage = this.getFocusStage(life);
      if (!stage) return null;
      const reason = life.flags.focusStage !== stage ? `stage:${stage}` : (life.flags.focusPromptReason || null);
      if (!reason) return null;
      const opts = this.getFocusOptions(life);
      if (!opts.some((o) => o.key === life.focus)) life.focus = "balanced";
      life.flags.focusStage = stage;
      delete life.flags.focusPromptReason;
      const why = {
        "stage:student": "你開始有了自己的課業與生活圈。",
        "stage:work": "你正式踏入社會，接下來的日子要把時間花在哪裡？",
        "stage:retired": "你從職場退了下來，每天多出了很多時間。",
        married: "結婚後，生活的重心可能需要重新安排。",
        child: "家裡多了一個孩子，時間突然變得很不夠用。",
        midlife: "四十五歲了，身體和家庭都在提醒你重新分配時間。",
        burnout: "你已經連續好幾年把自己逼得很緊，身體開始抗議了。"
      }[reason] || "人生來到新的階段。";
      return {
        id: "FOCUS_CARD", isFocusCard: true,
        resolvedTitle: `${FOCUS_STAGES[stage].label}的重心：接下來幾年，你要把時間花在哪裡？`,
        resolvedDesc: `${why}重心會一直持續，直到你在畫面上改變它；同一個重心維持太久，效果會遞減，甚至帶來倦怠。`,
        resolvedSource: "年度重心影響每年的屬性變化，也會改變升遷、婚姻危機、過勞與生活費等機率",
        options: opts.map((o) => ({ key: o.key, label: `${o.name}（${o.desc}｜每年約：${this.describeFocusFx(o.fx) || "持平"}）`, effects: {} }))
      };
    }

    chooseFocusAuto(life) {
      const opts = this.getFocusOptions(life);
      if (!opts.length) return "balanced";
      return weightedPick(opts, (o) => (o.key === "balanced" ? 1.6 : 1) * (life.personalities || []).reduce((m, p) => m * ((FOCUS_TRAIT_PREF[p.id] || {})[o.key] || 1), 1)).key;
    }

    setFocus(life, key) {
      if (life.focus !== key) {
        life.focus = key;
        life.flags.focusStreak = 0;
        life.flags.focusJustSwitched = true;
      }
    }

    applyFocus(life, era) {
      const stage = this.getFocusStage(life);
      if (!stage) return;
      const def = FOCUS_STAGES[stage].options[life.focus] || FOCUS_STAGES[stage].options.balanced;
      const streak = (life.flags.focusStreak || 0) + 1;
      life.flags.focusStreak = streak;
      const fatigue = streak > 4 ? clamp(1 - (streak - 4) * 0.08, 0.5, 1) : 1;
      const s = life.stats;
      const before = { ...s };
      for (const [k, v] of Object.entries(def.fx)) {
        if (v > 0) s[k] += v * fatigue * clamp((108 - s[k]) / 58, 0.15, 1); // 越高越難再升
        else s[k] += v * clamp(s[k] / 45, 0.25, 1); // 已經很低時下降變慢，避免直接歸零
      }
      if (life.flags.focusJustSwitched) { s.happiness += 1; delete life.flags.focusJustSwitched; }
      // 特殊效果
      if (life.focus === "study" && stage === "student") life.flags.hs_exam_bonus = Math.min(4, (life.flags.hs_exam_bonus || 0) + 0.5);
      if (life.focus === "parttime" && stage === "student" && life.age >= 15) {
        life.flags.part_time_job = true;
        life.moneyNominal += Math.round(20000 * this.wageScale(era) * era.cpi);
      }
      if (life.focus === "travel") this.spendLiquid(life, Math.min(Math.max(0, this.getLiquidNominal(life)), Math.round(60000 * this.wageScale(era) * era.cpi)));
      if (life.focus === "work" && this.isWorkingNow(life) && (life.workYears || 0) >= 2 && Math.random() < 0.1 * (life.stats.health >= 40 ? 1 : 0.5)) {
        life.careerSalaryMult = +((life.careerSalaryMult || 1) * 1.05).toFixed(2);
        life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "你衝刺事業的努力被看見了，獲得升遷加薪。", impactChips: [{ text: "薪資 +5%", good: true }] });
      }
      // 連續衝刺事業太久：過勞
      if (life.focus === "work" && streak >= 4 && Math.random() < Math.min(0.2, 0.06 + (streak - 4) * 0.02)) {
        life.stats.health -= 8; life.stats.happiness -= 6;
        life.flags.focusStreak = 1; // 被迫休養一陣子，連續年數重新累積
        life.flags.focusPromptReason = "burnout";
        life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, highlight: true, text: `【⚠️ 過勞】你已經連續 ${streak} 年把重心放在衝刺事業，某天加班到半夜突然胸悶冒冷汗，被送進急診。醫師說：再這樣下去，下一次可能就不是急診了。`, impactChips: [{ text: "健康 -8", good: false }, { text: "幸福 -6", good: false }] });
      }
      // 每三年一則小結，讓玩家看得見重心的累積效果
      const acc = life.flags.focusAcc || { years: 0, d: {} };
      for (const k of ["health", "happiness", "knowledge", "social"]) acc.d[k] = (acc.d[k] || 0) + (s[k] - before[k]);
      acc.years += 1;
      if (acc.years >= 3) {
        const chips = Object.entries(acc.d).map(([k, v]) => [k, Math.round(v)]).filter(([, v]) => v !== 0).map(([k, v]) => ({ text: `${STAT_NAMES[k]} ${v > 0 ? "+" : ""}${v}`, good: v > 0 }));
        if (chips.length) life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: `【📅 年度重心】這三年你把重心放在「${def.name}」${streak > 4 ? `（已連續 ${streak} 年，效果開始遞減）` : ""}。`, impactChips: chips });
        life.flags.focusAcc = { years: 0, d: {} };
      } else life.flags.focusAcc = acc;
      life.flags.focusLastFx = def.name;
    }

    isWorkingNow(life) {
      const inSch = life.education.includes("在學") || life.flags.in_grad_school_years > 0 || life.flags.retaking_exam;
      return life.age >= 16 && !inSch && Boolean(life.careerId) && !(life.flags.military_gap_years > 0) && !life.flags.retired &&
        !life.flags.unemployed && !life.flags.fulltime_caregiver && !(life.flags.exam_prep_years > 0);
    }

    isEraCardEligible(life, card, era) {
      const c = card.conditions || {};
      const y = life.currentYear;
      if (life.location !== "TAIWAN") return false;
      if (c.year_range && (y < c.year_range[0] || y > c.year_range[1])) return false;
      if (c.age_range && (life.age < c.age_range[0] || life.age > c.age_range[1])) return false;
      if (c.sex && life.sex !== c.sex) return false;
      if (c.origin_in && !c.origin_in.includes(life.family.origin)) return false;
      if (c.quintile_range && (life.quintile < c.quintile_range[0] || life.quintile > c.quintile_range[1])) return false;
      if (c.regions_in && !c.regions_in.includes(life.regionId)) return false;
      if (c.regions_not_in && c.regions_not_in.includes(life.regionId)) return false;
      if (c.careers_in && !c.careers_in.includes(life.careerId)) return false;
      if (c.careers_not_in && c.careers_not_in.includes(life.careerId)) return false;
      if (c.edu_min != null && life.eduLevel < c.edu_min) return false;
      if (c.edu_max != null && life.eduLevel > c.edu_max) return false;
      if (c.sub_major_in && !c.sub_major_in.includes(life.subMajor)) return false;
      if (c.working && !this.isWorkingNow(life)) return false;
      if (c.max_work_years != null && (life.workYears || 0) > c.max_work_years) return false;
      if (c.in_secondary_school) {
        const inJunior = life.eduLevel === 2 && life.education.includes("在學");
        const inSenior = life.eduLevel === 3 && life.flags.hs_tier !== "work_early";
        if (!(life.age < 18 && life.flags.max_edu_cap !== "junior_high" && (inJunior || inSenior))) return false;
      }
      if (c.unmarried && life.married) return false;
      if (c.single && (life.married || life.partner)) return false;
      if (c.never_married && life.flags.ever_married) return false;
      if (c.no_children && life.children > 0) return false;
      if (c.never_abroad && life.everStudiedAbroad) return false;
      if (c.siblings_min != null && (life.family.siblings || 0) < c.siblings_min) return false;
      if (c.birth_order_max != null && (life.family.birthOrder || 1) > c.birth_order_max) return false;
      if (c.father_alive && !life.family.fatherAlive) return false;
      const liqReal = (life.moneyNominal + life.stockNominal) / Math.max(0.07, era.cpi);
      if (c.min_liquid_twd_2025 != null && liqReal < c.min_liquid_twd_2025) return false;
      if (c.max_liquid_twd_2025 != null && liqReal > c.max_liquid_twd_2025) return false;
      if (c.married && !life.married) return false;
      if (c.children_min != null && life.children < c.children_min) return false;
      if (c.children_max != null && life.children > c.children_max) return false;
      if (c.child_age_range && !(life.childrenBirthYears || []).some((by) => y - by >= c.child_age_range[0] && y - by <= c.child_age_range[1])) return false;
      if (c.lives_with_parents && !life.flags.lives_with_parents) return false;
      if (c.spouse_working && !(life.spouse && life.spouse.working)) return false;
      if (c.not_homeowner && life.homeowner) return false;
      if (c.migrated && !life.migrated) return false;
      if (c.low_income && !(life.annualSalaryNominal > 0 && life.annualSalaryNominal < era.avg_monthly_wage_twd * 12 * 0.85)) return false;
      if (c.world_line && !Object.entries(c.world_line).every(([ax, vals]) => vals.includes(this.ensureWorldLine(life)[ax]))) return false;
      if (c.future_events_any && !c.future_events_any.some((id) => life.futureWorld && life.futureWorld.triggered && life.futureWorld.triggered[id])) return false;
      if (c.flags_all && !c.flags_all.every((f) => life.flags[f])) return false;
      if (c.flags_none && c.flags_none.some((f) => life.flags[f])) return false;
      return true;
    }

    findEraChoice(life, era, isPauseYear) {
      const cards = (this.data.decisions && this.data.decisions.era_choices) || [];
      if (!cards.length || life.location !== "TAIWAN" || isPauseYear) return null;
      if (life.age - life.lastDecisionAge < 1) return null;
      const gaps = { era: 3, trend: 4, future: 4 };
      const lastAt = life.flags.lastCardAgeByTier || {};
      const tierReady = (t) => life.age - (lastAt[t] != null ? lastAt[t] : -10) >= (gaps[t] || 3);
      const pool = cards.filter((card) => tierReady(card.tier || "era") && !life.triggeredDecisions[card.id] && this.isEraCardEligible(life, card, era));
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      for (const card of pool) {
        let p = card.chance != null ? card.chance : 0.3;
        for (const tr of life.personalities || []) p *= (card.trait_chance && card.trait_chance[tr.id]) || 1;
        if (card.sex_chance && card.sex_chance[life.sex]) p *= card.sex_chance[life.sex];
        if (Math.random() >= clamp(p, 0, 0.95)) continue;
        if (!card.options.some((o) => this.isOptionEligible(life, o, era).eligible)) continue;
        return this.attachMemory(life, this.buildEraDecision(life, card, era));
      }
      return null;
    }

    buildEraDecision(life, card, era) {
      const variant = (card.desc_variants || []).find((v) => !v.careers_in || v.careers_in.includes(life.careerId));
      const monthly = Math.round((life.annualSalaryNominal || 0) / 12);
      const fill = (txt) => String(txt || "")
        .replace(/\{year\}/g, life.currentYear)
        .replace(/\{age\}/g, life.age)
        .replace(/\{siblings\}/g, life.family.siblings || 0)
        .replace(/\{salary\}/g, `NT$${monthly.toLocaleString()}`);
      return {
        id: card.id,
        isEraCard: true,
        eraCard: card,
        eraLabel: card.era_label,
        tier: card.tier || "era",
        tierIcon: ERA_TIER_ICONS[card.tier || "era"],
        parentDecides: Boolean(card.parent_decides),
        options: card.options,
        resolvedTitle: fill(card.title),
        resolvedDesc: fill(variant ? variant.desc : card.desc),
        resolvedSource: fill(card.source)
      };
    }

    // 成功機率：基礎機率＋性格加減＋屬性（以 50 為中線）＋職業加減
    eraRollProb(life, roll) {
      let p = roll.p != null ? roll.p : 0.5;
      for (const tr of life.personalities || []) p += (roll.trait_p && roll.trait_p[tr.id]) || 0;
      for (const [k, coef] of Object.entries(roll.stat_p || {})) p += ((life.stats[k] || 50) - 50) * coef;
      if (roll.career_p && roll.career_p[life.careerId]) p += roll.career_p[life.careerId];
      if (roll.world_p && life.currentYear >= 2026) {
        const line = this.ensureWorldLine(life);
        for (const [ax, tbl] of Object.entries(roll.world_p)) p += tbl[line[ax]] || 0;
      }
      return clamp(p, 0.03, 0.97);
    }

    applyEraEffects(life, ef, era) {
      const notes = [];
      if (!ef) return notes;
      const scale = this.wageScale(era) * era.cpi;
      for (const k of ["health", "happiness", "knowledge", "social"]) if (ef[k]) life.stats[k] += ef[k];
      if (ef.money) {
        let n = Math.round(ef.money * scale);
        // 還沒開始工作的人輸不掉家裡的錢：損失以自己手上的現金為上限
        if (n < 0 && ((life.workYears || 0) === 0 || life.age < 18)) n = -Math.min(-n, Math.max(0, life.moneyNominal));
        life.moneyNominal += n;
      }
      if (ef.money_liquid_ratio && ef.money_liquid_ratio < 0) {
        this.spendLiquid(life, Math.round(Math.max(0, this.getLiquidNominal(life)) * -ef.money_liquid_ratio));
      }
      if (ef.to_stock_ratio && life.currentYear >= 1962) {
        const move = Math.round(Math.max(0, life.moneyNominal) * ef.to_stock_ratio);
        life.moneyNominal -= move;
        life.stockNominal += move;
        if (life.investStyle === "deposit") life.investStyle = "index_etf";
      }
      if (ef.mortgage_draw_ratio && life.homeowner) {
        const draw = Math.round((life.homeValueNominal || 0) * ef.mortgage_draw_ratio);
        life.mortgageBalanceNominal = (life.mortgageBalanceNominal || 0) + draw;
        life.mortgageAnnualPayment = (life.mortgageAnnualPayment || 0) + Math.round(draw * 0.094);
        life.moneyNominal += draw;
        notes.push(`（向銀行增貸約 NT$${Math.round(draw / 10000).toLocaleString()} 萬）`);
      }
      if (ef.wage_mult) life.flags.wage_mult = clamp((life.flags.wage_mult || 1.0) * ef.wage_mult, 0.55, 1.28);
      if (ef.career_mult) life.careerSalaryMult = +((life.careerSalaryMult || 1.0) * ef.career_mult).toFixed(2);
      if (ef.savings_rate_bonus) life.flags.savings_rate_bonus = (life.flags.savings_rate_bonus || 0) + ef.savings_rate_bonus;
      for (const f of ef.flags || []) life.flags[f] = true;
      for (const f of ef.unset_flags || []) delete life.flags[f];
      if (ef.quintile_delta) this.setQuintile(life, life.quintile + ef.quintile_delta);
      if (ef.hardship) this.addHardship(life, ef.hardship[0], ef.hardship[1]);
      if (ef.hardship_relief) life.flags.child_hardship = Math.max(0, (life.flags.child_hardship || 0) - ef.hardship_relief);
      if (ef.heavy_debt) life.flags.heavy_debt = true;
      if (ef.work_hours_high) life.flags.work_hours_high = true;
      if (ef.expat) {
        life.flags.expat_years_left = ef.expat[0];
        life.flags.expat_wage_mult = ef.expat[1];
        life.flags.expat_completed = false;
      }
      if (ef.marital_strain && life.married && Math.random() < ef.marital_strain) {
        life.stats.happiness -= 6;
        life.stats.social -= 3;
        life.flags.next_crisis_age = life.age;
        notes.push("（長期兩地分隔，夫妻關係變得緊繃）");
      }
      if (ef.assign_career) {
        const car = (this.data.educationCareers.careers || []).find((x) => x.id === ef.assign_career);
        if (car) {
          this.assignCareer(life, car);
          life.flags.career_chosen = true;
          life.flags.unemployed = false;
          life.triggeredDecisions["D07_career_track"] = true;
        }
      }
      const jobless = ef.temp_unemployed_years || ef.quit_job_years;
      if (jobless && life.careerId) {
        life.flags.unemployed = true;
        life.flags.temp_unemployed_years = Math.max(life.flags.temp_unemployed_years || 0, jobless);
        if (ef.quit_job_years) life.job = "全職投資（待業）";
      }
      if (ef.exam_prep_years) {
        life.flags.exam_prep_years = ef.exam_prep_years;
        life.job = "全職準備國考";
      }
      if (ef.quit_school_to_work) {
        if (life.eduLevel <= 2) {
          life.education = life.currentYear >= 1968 ? "國中肄業（提早就業）" : "初中肄業（提早就業）";
          life.eduLevel = 1;
        } else {
          life.education = "高中職肄業（提早就業）";
          life.eduLevel = 2;
        }
        life.flags.max_edu_cap = "junior_high";
        life.flags.hs_tier = "work_early";
        life.job = life.sex === "F" ? "加工出口區作業員" : "工廠學徒";
      }
      if (ef.student_loan) life.studentLoanNominal = (life.studentLoanNominal || 0) + Math.round(ef.student_loan * scale);
      if (ef.repay_loan_ratio && life.studentLoanNominal > 0) {
        const pay = Math.min(Math.round(life.studentLoanNominal * ef.repay_loan_ratio), Math.max(0, life.moneyNominal));
        life.moneyNominal -= pay;
        life.studentLoanNominal -= pay;
        life.flags.savings_rate_bonus = (life.flags.savings_rate_bonus || 0) + 0.04;
      }
      if (ef.stock_ratio && life.stockNominal > 0) life.stockNominal = Math.max(0, Math.round(life.stockNominal * (1 + ef.stock_ratio)));
      if (ef.stock_sell_ratio && life.stockNominal > 0) {
        const sell = Math.round(life.stockNominal * ef.stock_sell_ratio);
        life.stockNominal -= sell;
        life.moneyNominal += sell;
      }
      if (ef.uni_admit_bonus) life.flags.uni_admit_bonus = (life.flags.uni_admit_bonus || 0) + ef.uni_admit_bonus;
      if (ef.hs_exam_bonus) life.flags.hs_exam_bonus = (life.flags.hs_exam_bonus || 0) + ef.hs_exam_bonus;
      if (ef.no_uni_exam) life.flags.no_uni_exam = true;
      if (ef.unlock_night_uni && life.eduLevel < 4) {
        life.eduLevel = 4;
        life.education = "大學夜間部畢業";
        life.flags.university_grad = true;
        life.flags.max_edu_cap = null;
        life.triggeredDecisions["D05_graduation_crossroads"] = true;
      }
      if (ef.homemaker_years && life.careerId) {
        life.flags.unemployed = true;
        life.flags.temp_unemployed_years = Math.max(life.flags.temp_unemployed_years || 0, ef.homemaker_years);
        life.job = life.sex === "F" ? "家庭主婦" : "家庭主夫";
      }
      if (ef.spouse_homemaker_years && life.spouse) {
        life.spouse.working = false;
        life.flags.spouse_homemaker_until = life.currentYear + ef.spouse_homemaker_years;
      }
      if (ef.moved_out) { life.flags.moved_out = true; life.flags.lives_with_parents = false; }
      if (ef.desired_kids_delta) { life.desiredKids = clamp((life.desiredKids || 0) + ef.desired_kids_delta, 0, 6); life.flags.no_more_kids = false; }
      if (ef.no_more_kids) life.flags.no_more_kids = true;
      if (ef.mortality_mult) life.flags.midlife_mortality_mult = (life.flags.midlife_mortality_mult || 1) * ef.mortality_mult;
      if (ef.romance_delay) life.flags.next_romance_age = Math.max(life.flags.next_romance_age || 0, life.age + ef.romance_delay);
      if (life.flags.extended_work_70) life.flags.next_retire_ask = Math.max(life.flags.next_retire_ask || 0, 70);
      if (ef.return_home_region && life.regionId !== life.birthRegionId) {
        const note = this.relocateTo(life, life.birthRegionId, era);
        life.flags.moved_out = false;
        if (note) notes.push(note);
      }
      if (ef.usd_hedge_ratio) life.flags.usd_hedge_amount = Math.round(Math.max(0, life.moneyNominal) * ef.usd_hedge_ratio);
      if (ef.usd_hedge_loss && life.flags.usd_hedge_amount) {
        const loss = Math.round(life.flags.usd_hedge_amount * ef.usd_hedge_loss);
        this.spendLiquid(life, Math.min(loss, Math.max(0, this.getLiquidNominal(life))));
        notes.push(`（匯兌損失約 NT$${loss.toLocaleString()}）`);
        delete life.flags.usd_hedge_amount;
      }
      if (ef.emigrate && life.location === "TAIWAN") {
        const prevEdu = life.education;
        this.departOverseas(life, ef.emigrate, { id: "ERA_emigrant", name: "依親移民", cost_twd_2025: 600000, study_years: 0 }, era);
        if (life.abroad) {
          life.abroad.prStatus = "依親移民（綠卡）";
          life.abroad.studyYearsLeft = 0;
          life.education = prevEdu;
          life.job = `${life.abroad.countryName}華人社區工作`;
          life.careerId = null;
          life.flags.rank_title = null;
          life.careerSalaryMult = 1.0;
        }
      }
      if (ef.working_holiday && life.location === "TAIWAN") {
        const pw = ((this.data.studyAbroad && this.data.studyAbroad.pathways) || []).find((x) => x.id === "SA05_working_holiday");
        if (pw) {
          life.triggeredDecisions["SA:SA05_working_holiday"] = true;
          this.departOverseas(life, ef.working_holiday, pw, era);
        }
      }
      if (ef.marry_foreign && !life.married) {
        const nat = weightedPick([{ k: "越南", w: 0.5 }, { k: "中國大陸", w: 0.3 }, { k: "印尼", w: 0.15 }, { k: "柬埔寨", w: 0.05 }], (x) => x.w).k;
        const by = life.birthYear + 8 + Math.floor(Math.random() * 10);
        const name = nat === "中國大陸" ? this.generateName("F", Math.max(1950, by))
          : nat === "印尼" ? pick(["西蒂", "莉娜", "黛薇", "阿妮", "娜塔莉"])
          : nat === "柬埔寨" ? pick(["索菲", "斯雷", "達薇"])
          : "阮氏" + pick(["秋", "蘭", "香", "梅", "玉", "鳳", "雪", "清"]);
        life.partnerInfo = { name, sex: "F", birthYear: by, alive: true, retired: false, working: true, wageRatio: 0.45, incomeNominal: 0, nationality: nat };
        this.marry(life, era);
        life.flags.foreign_spouse = nat;
        life.triggeredDecisions["D17B_romance_encounter"] = true;
        life.triggeredDecisions["D18_marriage_choice"] = true;
        notes.push(`（你和來自${nat}的${name}結婚）`);
      }
      return notes;
    }

    applyEraChoice(life, decision, optionKey, era) {
      const card = decision.eraCard;
      const opt = card.options.find((o) => o.key === optionKey) || card.options[0];
      life.triggeredDecisions[card.id] = true;
      life.flags.lastCardAgeByTier = life.flags.lastCardAgeByTier || {};
      life.flags.lastCardAgeByTier[card.tier || "era"] = life.age;
      if (!decision.parentDecides) life.lastDecisionAge = life.age;
      const reg = this.getRegion(life.regionId);
      const salaryBefore = this.computeCurrentAnnualSalaryNominal(life, era, reg);

      let text = opt.text || "";
      const notes = this.applyEraEffects(life, opt.effects, era);
      if (opt.roll) {
        const branch = Math.random() < this.eraRollProb(life, opt.roll) ? opt.roll.success : opt.roll.fail;
        if (branch) {
          notes.push(...this.applyEraEffects(life, branch.effects, era));
          if (branch.text) text += branch.text;
        }
      }
      life.flags.eraPending = life.flags.eraPending || [];
      for (const oc of opt.outcomes || []) {
        let at = oc.at_year
          ? oc.at_year[0] + Math.floor(Math.random() * (oc.at_year[1] - oc.at_year[0] + 1))
          : life.currentYear + oc.delay[0] + Math.floor(Math.random() * (oc.delay[1] - oc.delay[0] + 1));
        at = Math.max(at, life.currentYear + 1);
        life.flags.eraPending.push({ at, cardId: card.id, eraLabel: card.era_label, icon: ERA_TIER_ICONS[card.tier || "era"], oc });
      }

      const maxHp = this.healthCap(life);
      life.stats.health = clamp(Math.round(life.stats.health), 0, maxHp);
      for (const k of ["happiness", "knowledge", "social"]) life.stats[k] = clamp(Math.round(life.stats[k]), 0, 100);

      let salaryDeltaBadge = "";
      const salaryAfter = this.computeCurrentAnnualSalaryNominal(life, era, this.getRegion(life.regionId));
      if (salaryAfter !== salaryBefore) {
        life.annualSalaryNominal = salaryAfter;
        const bMo = Math.round(salaryBefore / 12), aMo = Math.round(salaryAfter / 12);
        if (Math.abs(aMo - bMo) >= Math.max(500, Math.round(1000 * era.cpi))) {
          const pctStr = bMo > 0 ? `${aMo >= bMo ? "+" : ""}${Math.round(((aMo - bMo) / bMo) * 100)}%` : "開始領薪";
          salaryDeltaBadge = `💼 薪資變化：月薪 NT$${bMo.toLocaleString()} → NT$${aMo.toLocaleString()}（${pctStr}）`;
          life.salaryHistory = life.salaryHistory || [];
          life.salaryHistory.unshift({ age: life.age, year: life.currentYear, title: decision.resolvedTitle, choice: opt.label, beforeMonthly: bMo, afterMonthly: aMo, deltaMonthly: aMo - bMo, pctStr, isFutureMult: false });
        }
      }

      life.eraHistory = life.eraHistory || [];
      const icon = ERA_TIER_ICONS[card.tier || "era"];
      life.eraHistory.push({ cardId: card.id, key: opt.key, age: life.age, year: life.currentYear, eraLabel: card.era_label, tier: card.tier || "era", icon, title: decision.resolvedTitle, choice: opt.label, byParents: Boolean(decision.parentDecides) });
      life.decisionHistory.push({ age: life.age, year: life.currentYear, roc: era.roc, title: decision.resolvedTitle, choice: decision.parentDecides ? `父母決定：${opt.label}` : opt.label });
      if (decision.parentDecides) {
        life.feed.unshift({
          type: "parent_decision", age: life.age, year: life.currentYear, roc: era.roc,
          title: `👨‍👩‍👧 父母的決定：${decision.resolvedTitle}`,
          text: `當時你 ${life.age} 歲。${decision.resolvedDesc}父母決定「${opt.label}」。${text}${notes.join("")}`,
          impactNote: `由父母決定 ｜ ${icon} ${card.era_label}`
        });
      } else {
        life.feed.unshift({
          type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
          text: `【${icon} ${card.era_label}｜${decision.resolvedTitle}】你選擇了「${opt.label}」。${text}${notes.join("")}`,
          salaryDeltaBadge,
          highlight: true,
          showHelpline: Boolean(life.flags.heavy_debt && opt.roll)
        });
      }
    }

    // 時代抉擇的延遲後果：到了指定年份才揭曉
    processEraPending(life, era) {
      const list = life.flags.eraPending;
      if (!list || !list.length) return;
      const keep = [];
      for (const item of list) {
        if (item.at > life.currentYear) { keep.push(item); continue; }
        const oc = item.oc;
        if (oc.if_career && life.careerId !== oc.if_career) continue;
        let branch = null;
        if (oc.roll) branch = Math.random() < this.eraRollProb(life, oc.roll) ? oc.roll.success : oc.roll.fail;
        else if (oc.p == null || Math.random() < oc.p) branch = oc.success;
        else branch = oc.fail || null;
        if (!branch) continue;
        const before = this.snapshotForImpact(life);
        const notes = this.applyEraEffects(life, branch.effects, era);
        const impact = this.diffImpact(before, this.snapshotForImpact(life));
        const origin = [...(life.decisionHistory || [])].reverse().find((d) => d.decisionId === item.cardId);
        if (origin) {
          origin.echoes = origin.echoes || [];
          origin.echoes.push({ age: life.age, year: life.currentYear, text: branch.text || "", chips: impact.chips });
          origin.impactScore = +((origin.impactScore || 0) + impact.score).toFixed(2);
        }
        life.feed.unshift({
          type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
          text: `【${item.icon || "🕰"} 時代的回聲｜${item.eraLabel}】${origin ? `${origin.age} 歲時你選了「${origin.choice}」。` : ""}${branch.text || ""}${notes.join("")}`,
          impactChips: impact.chips,
          highlight: true
        });
      }
      life.flags.eraPending = keep;
    }

    // 性格與屬性每年對人生的牽引（溫和、可累積）
    applyTraitAndStatDrift(life, era) {
      if (life.age < 6) return;
      const working = this.isWorkingNow(life);
      const s = life.stats;
      const has = (id) => this.hasTrait(life, id);
      if (has("workaholic") && working) { s.health -= 0.5; s.knowledge += 0.4; }
      if (has("sociable")) { s.social += 0.5; s.happiness += 0.3; if (life.age >= 18) s.health -= 0.15; }
      if (has("sensitive_introvert")) { s.knowledge += 0.3; s.social -= 0.3; if (s.happiness < 40) s.happiness -= 0.6; }
      if (has("family_first")) { if (life.married || life.family.parentsAlive) s.social += 0.3; if (life.married && life.children > 0) s.happiness += 0.4; }
      if (has("civic_minded")) { s.knowledge += 0.3; s.social += 0.2; }
      if (has("cautious") && life.age >= 18) s.health += 0.2;
      if (life.age >= 68) s.knowledge -= 0.35;
      if (life.flags.retired && !has("sociable")) s.social -= 0.3;
      if (has("risk_taker") && life.age >= 18) s.happiness += 0.2;

      if (!working) return;
      // 拼勁與知識帶來升遷；健康太差則常請病假、收入打折
      const promos = life.flags.trait_promos || 0;
      if (promos < 4 && (life.workYears || 0) >= 3 && (life.workYears || 0) <= 30) {
        const pPromo = (has("workaholic") ? 0.06 : 0) + (s.knowledge >= 75 ? 0.04 : 0) + (s.social >= 80 ? 0.02 : 0);
        if (pPromo > 0 && Math.random() < pPromo) {
          life.flags.trait_promos = promos + 1;
          life.careerSalaryMult = +((life.careerSalaryMult || 1) * 1.04).toFixed(2);
          life.feed.unshift({
            type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
            text: has("workaholic") && s.knowledge >= 75 ? "你又拼又懂行，主管把升遷名額給了你，薪水調了一級。"
              : has("workaholic") ? "你總是最後一個下班，主管看在眼裡，年底幫你調了薪。"
              : s.knowledge >= 75 ? "你的專業累積被看見了，升上資深職位，薪水調了一級。"
              : "人脈幫了你一把：老同事推薦你接下更好的職位。"
          });
        }
      }
      if (s.health < 35 && life.age < 65) {
        life.flags.temp_income_mult = (life.flags.temp_income_mult || 1) * 0.85;
        if (life.age - (life.flags.lastSickLeaveNoteAge || -10) >= 5) {
          life.flags.lastSickLeaveNoteAge = life.age;
          life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "身體狀況不好，你常常請病假，今年的收入因此少了一截。" });
        }
      }
    }

    // Choosing "go straight to work" should lead directly to picking the job, in the same year
    findFollowUpDecision(life, prevDecision, era) {
      if (!life.alive || !prevDecision) return null;
      const last = life.decisionHistory[life.decisionHistory.length - 1];
      if (prevDecision.id === "D05_graduation_crossroads" && life.location === "TAIWAN" && !life.careerId && !(life.flags.in_grad_school_years > 0)) {
        const militaryDue = life.sex === "M" && !life.triggeredDecisions["D04_military_service"];
        if (militaryDue) return this.findEligibleDecision(life, era, false, false, true, ["D04_military_service"]);
        return this.findEligibleDecision(life, era, false, false, true, ["D07_career_track"]);
      }
      if (prevDecision.id === "D04_military_service" && !life.careerId && !(life.flags.military_gap_years > 0) && last) {
        return this.findEligibleDecision(life, era, false, false, true, ["D07_career_track"]);
      }
      return null;
    }

    getMotherAge(life) {
      return life.sex === "F" ? life.age : (life.spouse ? life.currentYear - life.spouse.birthYear : life.age - 2);
    }

    // Chance a couple trying for one year has a baby (natural or with assisted reproduction)
    getConceptionProb(life, ivf = false) {
      const m = this.getMotherAge(life);
      let p = m < 30 ? 0.9 : m < 33 ? 0.85 : m < 36 ? 0.74 : m < 38 ? 0.6 : m < 40 ? 0.46 : m < 42 ? 0.28 : m < 44 ? 0.12 : 0.03;
      if (life.flags.infertile_tries >= 2) p *= 0.75;
      if (life.flags.frozen_eggs && life.sex === "F" && m >= 35) p = Math.max(p, m < 40 ? 0.6 : m < 44 ? 0.4 : 0.15);
      if (ivf) p = clamp(Math.max(p, m < 35 ? 0.6 : m < 38 ? 0.5 : m < 40 ? 0.38 : m < 42 ? 0.22 : 0.08) * 1.1, 0.05, 0.7);
      return p;
    }

    // 每次抉擇前後比對：屬性、資產、薪資與身分的變化，並記下沒選的路
    snapshotForImpact(life) {
      const era = this.getEraParams(life.currentYear);
      const cpi = Math.max(0.07, era.cpi);
      return {
        health: life.stats.health, happiness: life.stats.happiness, knowledge: life.stats.knowledge, social: life.stats.social,
        nw: this.getNetWorthNominal(life) / cpi,
        salMo: (life.annualSalaryNominal || 0) / 12 / cpi,
        job: life.job, regionId: life.regionId, location: life.location, married: life.married, children: life.children,
        homeowner: life.homeowner, education: life.education
      };
    }

    diffImpact(a, b) {
      const chips = [];
      let score = 0;
      const statNames = { health: "健康", happiness: "幸福", knowledge: "知識", social: "人際" };
      for (const [k, nm] of Object.entries(statNames)) {
        const d = Math.round(b[k] - a[k]);
        if (d !== 0) { chips.push({ text: `${nm} ${d > 0 ? "+" : ""}${d}`, good: d > 0 }); score += Math.abs(d) / 6; }
      }
      const wan = (n) => Math.round(n / 10000).toLocaleString();
      const dNw = b.nw - a.nw;
      if (Math.abs(dNw) >= 20000) { chips.push({ text: `淨資產 ${dNw > 0 ? "+" : "-"}${wan(Math.abs(dNw))} 萬`, good: dNw > 0 }); score += Math.abs(dNw) / 300000; }
      const dSal = b.salMo - a.salMo;
      if (Math.abs(dSal) >= 1000) {
        const pctTxt = a.salMo > 0 ? `（${dSal > 0 ? "+" : ""}${Math.round((dSal / a.salMo) * 100)}%）` : "";
        chips.push({ text: `月薪 ${dSal > 0 ? "+" : "-"}${Math.round(Math.abs(dSal)).toLocaleString()} 元${pctTxt}`, good: dSal > 0 });
        if (!/退休/.test(b.job || "")) score += Math.abs(dSal) / 3000;
      }
      const struct = (txt) => { chips.push({ text: txt, neutral: true }); score += 2; };
      if (b.location !== a.location) struct(b.location === "TAIWAN" ? "回到台灣" : "出國生活");
      else if (b.regionId !== a.regionId) struct(`搬到${(this.getRegion(b.regionId) || {}).name_zh || "他地"}`);
      if (b.job !== a.job && b.job && a.job) struct(`工作：${a.job} → ${b.job}`);
      if (b.married !== a.married) struct(b.married ? "結婚" : "婚姻結束");
      if (b.children !== a.children) struct(b.children > a.children ? `多了一個孩子（共 ${b.children} 個）` : `子女 ${b.children} 人`);
      if (b.homeowner !== a.homeowner) struct(b.homeowner ? "有了自己的房子" : "不再擁有房子");
      if (b.education !== a.education) struct(`學歷：${b.education}`);
      return { chips, score: +score.toFixed(2) };
    }

    applyDecision(life, decision, optionKey, era) {
      const before = this.snapshotForImpact(life);
      const histLen = life.decisionHistory.length;
      const feedLen = life.feed.length;
      // 除錯紀錄：每次抉擇當下的財務快照與每個選項的門檻判定
      const debugEntry = {
        ...this.financeSnapshot(life, era),
        decisionId: String(decision.id), title: decision.resolvedTitle || decision.title || "",
        desc: decision.resolvedDesc || "", chosen: optionKey,
        options: (decision.options || []).map((o) => {
          const el = this.isOptionEligible(life, o, era);
          return { key: o.key, label: String(this.resolveEraLabel(o, life.currentYear)), eligible: el.eligible, reason: el.reason || "" };
        })
      };
      life.debugDecisions = life.debugDecisions || [];
      life.debugDecisions.push(debugEntry);
      const untaken = decision.options
        .filter((o) => o.key !== optionKey && this.isOptionEligible(life, o, era).eligible)
        .map((o) => String(this.resolveEraLabel(o, life.currentYear)).replace(/（[^）]*）/g, "").trim())
        .slice(0, 3);
      this.applyDecisionCore(life, decision, optionKey, era);
      this.softenGains(life, before);
      for (const k of ["health", "happiness", "knowledge", "social"]) life.stats[k] = Math.round(life.stats[k]);
      const impact = this.diffImpact(before, this.snapshotForImpact(life));
      debugEntry.impact = impact.chips;
      debugEntry.after = this.financeSnapshot(life, era);
      if (String(decision.id) === "D17_critical_illness_cost") delete life.flags.major_illness_pending;
      const rec = life.decisionHistory.length > histLen ? life.decisionHistory[life.decisionHistory.length - 1] : null;
      if (rec) {
        rec.decisionId = String(decision.id);
        rec.impact = impact.chips;
        rec.impactScore = impact.score;
        rec.untaken = untaken;
        rec.echoes = [];
      }
      const target = life.feed.slice(0, Math.max(0, life.feed.length - feedLen)).find((f) => ["normal", "parent_decision", "overseas_event"].includes(f.type));
      if (target && impact.chips.length) target.impactChips = impact.chips;
      life.lastImpact = { title: decision.resolvedTitle, chips: impact.chips };
      return impact;
    }

    applyDecisionCore(life, decision, optionKey, era) {
      if (decision.isEraCard) return this.applyEraChoice(life, decision, optionKey, era);
      if (decision.isFocusCard) {
        const opt = this.getFocusOptions(life).find((o) => o.key === optionKey);
        this.setFocus(life, optionKey);
        life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, highlight: true, text: `【📅 年度重心】你決定把接下來的時間花在「${opt ? opt.name : optionKey}」。${opt ? opt.desc + "。" : ""}` });
        return;
      }
      if (decision.once_per_era_variant && decision.activeVariant) {
        life.triggeredDecisions[`${decision.id}:${decision.activeVariant.variant_id}`] = true;
      } else if (decision.id !== "D27_return_to_taiwan") {
        life.triggeredDecisions[decision.id] = true;
      }
      life.lastDecisionAge = life.age;

      const opt = decision.options.find((o) => o.key === optionKey) || decision.options[0];
      const optLabel = this.resolveEraLabel(opt, life.currentYear);
      const ef = opt.effects || {};
      let extraLog = "";
      const regBefore = this.getRegion(life.regionId);
      const salaryBeforeAnnual = this.computeCurrentAnnualSalaryNominal(life, era, regBefore);
      const wageMultBefore = (life.flags.wage_mult || 1.0) * (life.careerSalaryMult || 1.0) * (regBefore ? regBefore.income_multiplier : 1.0);

      // Handle Study Abroad departure cards (SA01–SA06)
      if (decision.isMinorAbroadCard) {
        const go = Math.random() < (ef.minor_wish_abroad ? 0.72 : 0.18);
        life.decisionHistory.push({ age: life.age, year: life.currentYear, roc: era.roc, title: decision.resolvedTitle, choice: opt.label });
        life.feed.unshift({
          type: "parent_decision", age: life.age, year: life.currentYear, roc: era.roc,
          title: go ? "👨‍👩‍👧 父母的決定：送你出國念書" : "👨‍👩‍👧 父母的決定：留在台灣升學",
          text: ef.minor_wish_abroad
            ? (go ? "你說想出去看看，父母商量幾個晚上後決定支持你。" : "你說想出去看看，但父母算過費用、也放心不下，決定讓你先在台灣念完高中。")
            : (go ? "你說想留下來，但父母認為機會難得，還是決定送你出去。" : "你說想留下來，父母尊重你的想法，打消了念頭。"),
          impactNote: go ? "由父母決定：出國念中學" : "由父母決定：留在台灣"
        });
        if (go) this.departOverseas(life, ef.depart_country, ef.pathway_obj, era);
        return;
      }
      if (decision.isStudyAbroadCard && ef.depart_country && ef.pathway_obj) {
        this.departOverseas(life, ef.depart_country, ef.pathway_obj, era);
        life.decisionHistory.push({ age: life.age, year: life.currentYear, roc: era.roc, title: decision.resolvedTitle, choice: opt.label });
        return;
      }

      // Handle D27 Return-to-Taiwan decision
      if (decision.id === "D27_return_to_taiwan") {
        const ab = life.abroad;
        const fromName = ab ? `${ab.flag} ${ab.countryName}` : "海外";
        if (opt.key === "return_taiwan") {
          life.location = "TAIWAN";
          life.everReturnedToTaiwan = true;
          life.homesickness = 0;
          const returnBonus = life.currentYear <= 2005 ? 1.18 : 1.08;
          life.flags.wage_mult = (life.flags.wage_mult || 1.0) * returnBonus;
          life.stats.social += (ef.relationships || 14);
          life.stats.happiness += (ef.happiness || 10);
          if (life.abroad) life.abroadSummaryHistory.push(`${life.currentYear} 年自${ab.countryName}海歸返台`);
          life.abroad = null;
          if (!life.careerId) {
            const best = this.getEligibleCareers(life).filter((c) => !c.entry || (c.entry === "license" && c.auto_license));
            this.assignCareer(life, best[0] || this.pickEraCareer(life));
            life.flags.career_chosen = true;
            life.triggeredDecisions["D07_career_track"] = true;
          }
          life.flags.rank_title = null;
          life.job = life.sector || "跨國專業職";
          extraLog = `（結束旅居${fromName}生活，帶著國際資歷返台發展並享海歸薪資加給）`;
        } else if (opt.key === "stay_abroad") {
          life.stats.social += (ef.relationships || -6);
          if (ab) {
            ab.visaCrisisActive = false;
            if (ab.yearsAbroad >= 3) ab.prStatus = "永久居留／公民";
          }
          extraLog = `（選擇繼續在${fromName}扎根，承擔遠離台灣家人的思念）`;
        } else if (opt.key === "commuter_nomad") {
          if (ab) ab.commuterMode = true;
          life.homesickness = Math.max(10, life.homesickness - 25);
          life.stats.social += (ef.relationships || 6);
          life.stats.happiness += (ef.happiness || 6);
          extraLog = "（開啟跨國空中飛人模式，兼顧海外職涯與台灣家人陪伴）";
        }
        const salaryAfterRet = this.computeCurrentAnnualSalaryNominal(life, era, this.getRegion(life.regionId));
        let retSalBadge = "";
        if (salaryAfterRet !== salaryBeforeAnnual && (salaryAfterRet > 0 || salaryBeforeAnnual > 0)) {
          life.annualSalaryNominal = salaryAfterRet;
          const bMo = Math.round(salaryBeforeAnnual / 12), aMo = Math.round(salaryAfterRet / 12);
          const pctStr = salaryBeforeAnnual > 0 ? `${aMo >= bMo ? "+" : ""}${Math.round(((aMo - bMo) / Math.max(1, bMo)) * 100)}%` : "返台起薪";
          retSalBadge = `💼 薪資變化：月薪 NT$${bMo.toLocaleString()} → NT$${aMo.toLocaleString()}（${pctStr}）`;
          life.salaryHistory = life.salaryHistory || [];
          life.salaryHistory.unshift({ age: life.age, year: life.currentYear, title: decision.resolvedTitle, choice: optLabel, beforeMonthly: bMo, afterMonthly: aMo, deltaMonthly: aMo - bMo, pctStr, isFutureMult: false });
        }
        const maxHpRet = this.healthCap(life);
        life.stats.health = clamp(Math.round(life.stats.health), 0, maxHpRet);
        for (const k of ["happiness", "knowledge", "social"]) life.stats[k] = clamp(Math.round(life.stats[k]), 0, 100);
        if (life.flags.wage_mult) life.flags.wage_mult = clamp(life.flags.wage_mult, 0.55, 1.28);
        life.decisionHistory.push({ age: life.age, year: life.currentYear, roc: era.roc, title: decision.resolvedTitle, choice: optLabel });
        life.feed.unshift({
          type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
          text: `【${decision.resolvedTitle}】你選擇了「${optLabel}」。${extraLog}`,
          salaryDeltaBadge: retSalBadge, highlight: true
        });
        return;
      }

      // Base stats
      if (ef.knowledge) life.stats.knowledge += ef.knowledge;
      if (ef.happiness) life.stats.happiness += ef.happiness;
      if (ef.health) life.stats.health += ef.health;
      if (ef.relationships) life.stats.social += ef.relationships;
      if (ef.social) life.stats.social += ef.social;
      if (ef.wage_mult && decision.id !== "D08_overseas_assignment") life.flags.wage_mult = (life.flags.wage_mult || 1.0) * ef.wage_mult;
      if (decision.id === "D08_overseas_assignment" && opt.key === "accept_expat") {
        life.flags.expat_years_left = 5;
        life.flags.expat_wage_mult = 1.45;
        if (life.married && Math.random() < (ef.marital_strain_prob || 0.2)) {
          life.stats.happiness -= 6;
          life.stats.social -= 3;
          extraLog += "（長期分隔兩地，夫妻與親子相處壓力升高）";
        } else {
          extraLog += "（啟動 5 年海外外派任期並享 1.45× 外派津貼，期滿返台保留管理資歷加給）";
        }
      }
      if (ef.starting_pay_mult) life.flags.wage_mult = (life.flags.wage_mult || 1.0) * ef.starting_pay_mult;
      if (ef.long_term_wage_mult) life.flags.wage_mult = (life.flags.wage_mult || 1.0) * ef.long_term_wage_mult;
      if (ef.midlife_mortality_mult) life.flags.midlife_mortality_mult = ef.midlife_mortality_mult;
      if (ef.savings_rate_bonus) life.flags.savings_rate_bonus = (life.flags.savings_rate_bonus || 0) + ef.savings_rate_bonus;
      if (ef.work_hours_high) life.flags.work_hours_high = true;

      if (ef.track === "junior") { life.education = "初中在學"; life.eduLevel = 2; life.flags.hs_exam_result_tier = null; }
      if (ef.track === "junior_voc") { life.education = "初職在學"; life.eduLevel = 2; life.flags.hs_exam_result_tier = null; }
      if (ef.track === "primary_labor") { life.education = "國小畢業（提早就業）"; life.eduLevel = 1; life.flags.max_edu_cap = "junior_high"; life.job = "學徒／在家幫農"; }
      if (ef.track === "labor") life.job = "學徒";
      if (ef.track === "top_academic") { life.education = "明星普通高中"; life.eduLevel = 3; }
      if (ef.track === "academic") { life.education = "普通高中"; life.eduLevel = 3; }
      if (ef.track === "vocational") { life.education = "高職／五專"; life.eduLevel = 3; }
      if (ef.track === "labor") { life.education = life.currentYear >= 1968 ? "國中畢業（提早就業）" : "初中畢業（提早就業）"; life.eduLevel = Math.max(life.eduLevel, 2); life.flags.max_edu_cap = "junior_high"; }
      if (ef.hs_tier) life.flags.hs_tier = ef.hs_tier;
      if (ef.max_edu_cap) life.flags.max_edu_cap = ef.max_edu_cap;
      if (ef.flag_set) {
        life.flags[ef.flag_set] = true;
        if (ef.flag_set === "vocational_coop" || ef.flag_set === "uni_parttime" || ef.flag_set === "uni_internship") {
          life.flags.part_time_job = true;
          life.flags.part_time_approved = true;
        }
      }
      if (ef.attempt_parttime_approval) {
        const approveProb = clamp(
          0.45 + (life.stats.social - 50) * 0.008 + (life.stats.knowledge - 50) * 0.004 + (life.quintile <= 2 ? 0.18 : life.quintile >= 5 ? -0.15 : 0),
          0.20, 0.90
        );
        if (Math.random() < approveProb) {
          life.flags.part_time_approved = true;
          life.flags.part_time_job = true;
          life.stats.social += 4;
          life.stats.happiness += 3;
          life.stats.health -= 2;
          extraLog += "（你提出清楚的課業與時間規劃，成功說服父母簽署同意書！開始合法課餘打工累積人生第一筆存款）";
        } else {
          life.stats.knowledge += 2;
          life.stats.happiness -= 4;
          extraLog += "（父母擔心影響課業與安全婉拒了申請，要你專心念書，出社會前生活費由家裡負擔）";
        }
      }
      if (ef.hs_exam_bonus) life.flags.hs_exam_bonus = (life.flags.hs_exam_bonus || 0) + ef.hs_exam_bonus;
      if (ef.uni_admit_bonus) life.flags.uni_admit_bonus = (life.flags.uni_admit_bonus || 0) + ef.uni_admit_bonus;
      if (ef.remote_unlock) life.flags.remote_capable = true;
      if (ef.partner_chance && !life.partner && !life.married && Math.random() < ef.partner_chance) {
        life.partner = true;
        life.partnerInfo = this.createPartnerInfo(life, era);
        life.triggeredDecisions["D17B_romance_encounter"] = true;
        extraLog += `（在校園活動中認識了${life.partnerInfo.name}，開始穩定交往）`;
      }
      if (ef.unlock_night_edu) {
        life.flags.max_edu_cap = null;
        life.eduLevel = Math.max(life.eduLevel, 3);
        life.education = life.currentYear < 1986 ? "補校／夜間部進修" : "夜校高職／空中大學進修";
        extraLog += "（成功解除早年學歷上限，開啟後續升遷與進修空間）";
      }
      if (ef.check_knowledge_promotion) {
        const promoChance = clamp(0.35 + (life.stats.knowledge - 50) * 0.01, 0.15, 0.88);
        if (Math.random() < promoChance) {
          life.flags.wage_mult = (life.flags.wage_mult || 1.0) * 1.1;
          life.stats.happiness += 8;
          extraLog += "（憑藉扎實知識實力順利考取專業證照並獲拔擢加薪！）";
        } else {
          life.stats.happiness -= 3;
          extraLog += "（證照差臨門一腳，但進修所學仍強化了職場競爭力）";
        }
      }
      if (ef.attempt_instant_civil_exam) {
        const civilPass = clamp(0.06 + (life.stats.knowledge - 55) * 0.005 + (life.flags.uni_civil_prep ? 0.16 : 0), 0.03, 0.45);
        if (Math.random() < civilPass) {
          life.careerId = "car_civil_teacher";
          life.job = "公務人員／國營事業職員";
          life.sector = "軍公教／國營事業";
          life.flags.rank_title = "公務人員／國營事業職員";
          life.careerSalaryMult = 1.1;
          life.flags.job_stability = 0.99;
          life.flags.career_chosen = true;
          life.stats.happiness += 10;
          extraLog += `（${life.flags.uni_civil_prep ? "大學打下的備考底子發揮威力，" : ""}成功金榜題名考上公職／國營事業！）`;
        } else {
          life.stats.happiness -= 5;
          extraLog += "（競爭激烈些微落榜，繼續留在原領域深耕）";
        }
      }

      if (decision.id === "D02_university_major") {
        life.subMajor = opt.key;
        life.major = ef.major_group || opt.key;
        if (opt.key === "med_doctor") life.uniGradAge = life.age + (life.currentYear < 2013 ? 7 : 6);
        if ((life.major === "stem_eng" || life.major === "med_health") && life.flags.hs_group_science) {
          life.stats.knowledge += 5;
          extraLog += "（高中自然組底子讓你如魚得水）";
        } else if (life.major === "humanities_biz" && life.flags.hs_group_humanities) {
          life.stats.social += 4;
          extraLog += "（高中社會組與社團經驗讓你迅速融入系上）";
        }
        if (opt.key === "public_funded") { life.flags.public_funded_track = true; }
      }
      if (decision.id === "D03_exam_retake" && opt.key === "cram_school") {
        life.flags.retaking_exam = true; life.flags.top_uni_prob_bonus = ef.top_uni_prob_bonus || 0.25;
        life.education = "重考班備考中";
      }
      if (ef.enroll_backup_uni) {
        life.education = "大學在學（後段校系）"; life.eduLevel = 4; life.uniGradAge = 23;
        life.flags.admitted_to_university = true; life.flags.backup_uni = true;
        life.flags.admit_bonus_note = true;
      }
      if (decision.id === "D04_military_service") {
        const months = this.getConscriptionMonths(life.birthYear, life.currentYear, life.conscriptRoll);
        if (opt.key === "conscription") {
          const gapYrs = months >= 12 ? Math.round(months / 12) : 0;
          if (gapYrs > 0) { life.flags.military_gap_years = gapYrs; life.job = `服義務役（${months} 個月）`; }
          if (months >= 24 && life.partner && !life.married && Math.random() < (ef.relationship_breakup_prob_if_long || 0.22)) {
            life.partner = false; life.stats.happiness -= 12; extraLog = "（服役期間感情生變，遭遇兵變分手）";
          }
        } else if (opt.key === "rd_substitute") {
          if (life.currentYear < 2000) {
            const gapYrs = months >= 12 ? Math.round(months / 12) : 0;
            if (gapYrs > 0) life.flags.military_gap_years = gapYrs;
            life.job = `義務役預官（${months} 個月）`;
            life.stats.knowledge += 4;
            life.stats.social += 4;
            life.flags.wage_mult = clamp((life.flags.wage_mult || 1.0) * 1.06, 0.55, 1.28);
            extraLog = "（考取大專預官服役，累積領導歷練與同袍人脈）";
          } else if (life.major === "med_health") {
            life.careerId = "car_healthcare_ltc";
            life.sector = "醫療院所／長照衛生體系";
            life.job = life.currentYear >= 2008 ? "醫療替代役人員" : "衛生行政役人員";
            life.careerSalaryMult = 1.0;
            life.flags.career_chosen = true;
            life.flags.wage_mult = clamp((life.flags.wage_mult || 1.0) * 1.05, 0.55, 1.28);
          } else {
            life.careerId = "car_hsinchu_semi";
            life.sector = life.currentYear < 2018 ? "半導體／IC 設計／科技工程師" : "半導體／IC 設計／AI 工程師";
            life.job = life.currentYear >= 2008 ? "研發替代役工程師" : "國防役／替代役工程師";
            life.careerSalaryMult = 1.55;
            life.flags.career_chosen = true;
            life.flags.wage_mult = clamp((life.flags.wage_mult || 1.0) * 1.15, 0.55, 1.28);
          }
        } else if (opt.key === "volunteer_soldier") {
          life.careerId = "car_civil_teacher";
          life.sector = "軍公教／國營事業"; life.job = "志願役軍士官"; life.flags.rank_title = "志願役軍士官"; life.careerSalaryMult = 1.0; life.flags.job_stability = 0.98; life.flags.career_chosen = true;
        }
      }
      if (decision.id === "D05_graduation_crossroads") {
        if (opt.key === "domestic_master") {
          life.flags.in_grad_school_years = ef.income_years_zero || 2; life.flags.grad_type = "domestic";
          life.education = "國內研究所（就讀中）"; life.job = "研究生";
        } else if (opt.key === "study_abroad") {
          const pw = (this.data.studyAbroad.pathways || []).find((p) => p.id === "SA02_self_funded_grad") || this.data.studyAbroad.pathways[0];
          const targetCountry = life.currentYear < 1995 ? "USA" : pick(["USA", "JPN", "GBR", "AUS", "CAN", "DEU"]);
          this.departOverseas(life, targetCountry, pw, era);
          life.decisionHistory.push({ age: life.age, year: life.currentYear, roc: era.roc, title: decision.resolvedTitle, choice: `${opt.label}（${this.getAbroadCountry(targetCountry).name_zh}）` });
          return;
        } else if (opt.key === "direct_work" && !life.flags.uni_internship && life.currentYear >= 2009 && life.currentYear <= 2013 && Math.random() < (ef.era_2009_22k_risk || 0.45)) {
          life.flags.hit_22k_anchor = true; extraLog = "（正逢 22K 方案時期，起薪被定錨在約 2.2–2.5 萬元）";
        }
      }

      if (ef.migrate_to) {
        const target = Array.isArray(ef.migrate_to) ? pick(ef.migrate_to)
          : ef.migrate_to === "birth_region" ? life.birthRegionId
          : pick(this.data.regions.regions.map((r) => r.id).filter((id) => id !== life.regionId));
        extraLog += this.relocateTo(life, target, era, decision.id === "D22_major_disaster" ? 0.5 : 0.95);
        life.flags.moved_out = target !== life.birthRegionId;
        if (decision.id === "D09_return_hometown_dilemma") life.flags.switch_prompt = life.currentYear + 1;
      }
      if (ef.career_ceiling_local) life.flags.career_ceiling_local = true;
      if (decision.id === "D22_major_disaster" && opt.key === "rebuild_local" && life.homeowner) {
        life.homeValueNominal = Math.round(life.homeValueNominal * 0.8);
      }
      if (ef.terminal_cost_mult) life.flags.terminal_cost_mult = ef.terminal_cost_mult;
      if (ef.bedridden_risk_mult) life.flags.bedridden_risk_mult = ef.bedridden_risk_mult;
      if (ef.old_age_loneliness_risk) life.flags.old_age_loneliness_risk = ef.old_age_loneliness_risk;
      if (opt.key === "stay_home") life.flags.stay_home = true;

      if (decision.id === "D17B_romance_encounter") {
        if (ef.start_partner) {
          life.partner = true;
          life.partnerInfo = this.createPartnerInfo(life, era);
          extraLog = `（和${life.partnerInfo.name}互有好感，正式開始交往）`;
        } else if (ef.retry_romance_later) {
          delete life.triggeredDecisions["D17B_romance_encounter"];
          life.flags.next_romance_age = life.age + 3;
          extraLog = "（先專注自我成長，未來仍有機會再遇良緣）";
        }
      }

      if (decision.id === "D07_career_track") {
        life.flags.career_chosen = true;
        const allCars = (this.data.educationCareers && this.data.educationCareers.careers) || [];
        if (ef.assign_career_id) {
          const c = allCars.find((x) => x.id === ef.assign_career_id);
          if (c && c.entry === "license" && !c.auto_license) {
            if (Math.random() < this.getLicensePassProb(life, c)) {
              this.assignCareer(life, c);
              life.stats.happiness += 8;
              extraLog = `（通過${c.exam_name}，取得執業資格）`;
            } else {
              const fb = allCars.find((x) => x.id === "car_office_white_collar");
              if (fb) this.assignCareer(life, fb);
              life.flags["license_failed_" + c.id] = true;
              life.flags.rank_title = c.fallback_title || "助理專員";
              life.job = life.flags.rank_title;
              life.stats.happiness -= 3;
              extraLog = `（${c.exam_name}沒有上榜，先以「${life.job}」進入職場累積經驗）`;
            }
          } else if (c) {
            this.assignCareer(life, c);
            extraLog = `（正式開始在「${life.sector}」工作）`;
          }
        } else if (opt.key === "civil_service") {
          life.flags.exam_prep_years = ef.exam_prep_years || 1;
          life.job = "全職備考高普考／國營";
        } else if (opt.key === "family_biz_startup") {
          const c = allCars.find((x) => x.id === "car_sme_boss");
          if (c) this.assignCareer(life, c);
          const boom = Math.random() < 0.45 ? 1.32 : 0.78;
          life.careerSalaryMult = +(clamp((life.careerSalaryMult || 1.2) * boom, 0.5, 2.6)).toFixed(2);
          extraLog = boom > 1 ? "（訂單穩定，獲利優於一般受薪族）" : "（營運起伏大，前期現金流吃緊）";
        }
      }
      if (decision.id === "D07_career_track" && life.careerId && !(life.flags.exam_prep_years > 0) && life.workYears === 0) {
        const firstAnnual = this.computeCurrentAnnualSalaryNominal(life, era, this.getRegion(life.regionId));
        life.workYears = 1;
        life.moneyNominal += Math.round(firstAnnual * 0.12);
        life.lastYearIncomeNominal = (life.lastYearIncomeNominal || 0) + Math.round(firstAnnual * 0.4);
        life.lastYearExpenseNominal = (life.lastYearExpenseNominal || 0) + Math.round(firstAnnual * 0.28);
        life.lastYearNetCashflowNominal = life.lastYearIncomeNominal - life.lastYearExpenseNominal;
      }
      if (decision.id === "D07B_career_switch") {
        delete life.triggeredDecisions["D07B_career_switch"];
        life.flags.next_switch_age = life.age + 6 + Math.floor(Math.random() * 3);
        life.flags.switch_prompt = null;
      }
      if (decision.id === "D20_marriage_crisis") { delete life.triggeredDecisions["D20_marriage_crisis"]; life.flags.next_crisis_age = life.age + 9; }
      if (decision.id === "D28_debt_clearance") { delete life.triggeredDecisions["D28_debt_clearance"]; life.flags.next_rehab_age = life.age + (ef.debt_rehab_clear ? 10 : 4); }
      if (decision.id === "D13_buying_home" && !ef.homeowner) {
        delete life.triggeredDecisions["D13_buying_home"];
        life.flags.next_home_age = life.age + 4;
        life.flags.home_barrier_shown = true;
      }
      if (decision.id === "D07B_career_switch" && ef.switch_career_id) {
        const allCars = (this.data.educationCareers && this.data.educationCareers.careers) || [];
        const c = allCars.find((x) => x.id === ef.switch_career_id);
        if (c) {
          if (life.currentYear < 2005) life.jobChangesPre2005 += 1;
          this.assignCareer(life, c);
          life.careerSalaryMult = +((c.salary_mult_min + c.salary_mult_max) / 2 * (0.93 + Math.random() * 0.14)).toFixed(2);
          life.flags.career_chosen = true;
          life.flags.era_end_prompted = false;
          extraLog = `（成功轉職至「${life.sector}」，薪資依新工作重新敘薪）`;
        }
      }

      if (decision.id === "D10_unpaid_leave") {
        if (ef.income_retention) life.flags.temp_income_mult = ef.income_retention;
        if (ef.income_gap_months) {
          life.flags.temp_income_mult = 0.65;
          if (life.currentYear < 2005) life.jobChangesPre2005 += 1;
          if (ef.sector_switch) {
            const altCars = this.getEligibleCareers(life, life.careerId).filter((x) => !x.entry);
            const newCar = altCars.length ? altCars[0] : this.pickEraCareer(life);
            if (newCar) {
              this.assignCareer(life, newCar);
              extraLog = `（轉行進入「${life.sector}」）`;
            }
          }
        }
        if (ef.debt_added_ratio) { life.moneyNominal -= Math.round(Math.max(100000 * era.cpi, Math.abs(life.annualSalaryNominal) * ef.debt_added_ratio)); life.flags.heavy_debt = true; }
      }
      if (decision.id === "D11_health_red_flags" && opt.key === "slow_down") { life.flags.work_hours_high = false; life.flags.betel_nut_habit = false; }
      if (ef.bonus_ratio && life.annualSalaryNominal > 0) life.moneyNominal += Math.round(life.annualSalaryNominal * ef.bonus_ratio);

      if (ef.invest_style === "index_etf" || ef.invest_style === "leverage") {
        if (life.currentYear < 1962) {
          // Pre-TWSE 1962: ROSCA (標會) / gold instead of stock market
          life.investStyle = "deposit";
          const bonus = ef.invest_style === "leverage" ? (Math.random() < 0.72 ? 0.16 : -0.35) : 0.08;
          life.moneyNominal = Math.round(life.moneyNominal * (1 + bonus));
          extraLog = bonus >= 0 ? "（標會／實物保值運作順利，累積一筆儲蓄收益）" : "（遭遇倒會風波，部分積蓄受損）";
        } else {
          const move = Math.round(Math.max(0, life.moneyNominal) * 0.5);
          life.moneyNominal -= move; life.stockNominal += move; life.investStyle = ef.invest_style;
        }
      }
      if (decision.id === "D13_buying_home") {
        if (ef.homeowner) {
          const tier = opt.key === "buy_suburb" ? "suburb" : "core";
          const spec = this.getHomeCostSpec(life, tier, era);
          this.spendLiquid(life, spec.requiredOwnCash);
          life.homeowner = true;
          life.homeValueNominal = spec.totalPrice;
          life.mortgageBalanceNominal = spec.loanAmount;
          life.mortgageAnnualPayment = spec.annualPayment;
          life.mortgageDTI = ef.mortgage_dti || 0.35;
          life.flags.home_source = "購屋";
          this.noteHomeAcquired(life, tier === "suburb" ? "於蛋白區購屋" : "於蛋黃區購屋");
          extraLog = `（成交總價約 NT$${Math.round(spec.totalPrice / 10000).toLocaleString()} 萬，自備頭期 ${Math.round(spec.requiredOwnCash / 10000).toLocaleString()} 萬${spec.parentHelp > 0 ? "＋父母贊助" : ""}，背負房貸 ${Math.round(spec.loanAmount / 10000).toLocaleString()} 萬）`;
        } else if (ef.liquid_invest_bonus) {
          const coreOk = this.isOptionEligible(life, decision.options[0], era).eligible;
          const subOk = this.isOptionEligible(life, decision.options[1], era).eligible;
          if (!coreOk && !subOk) {
            const subWhy = this.isOptionEligible(life, decision.options[1], era).reason || "";
            const why = subWhy.startsWith("年薪") ? "年薪未達房貸核貸門檻" : "存款（現金＋股票）不足頭期款";
            this.recordFinancialBarrier(life, era, `因${why}，無力購屋只能繼續租房`, subWhy);
            extraLog = "（受限於高房價與存款不足，現階段只能繼續租屋存錢）";
          } else {
            const move = Math.round(Math.max(0, life.moneyNominal) * 0.4);
            life.moneyNominal -= move; life.stockNominal += move;
            if (life.investStyle === "deposit") life.investStyle = "index_etf";
            extraLog = "（選擇租屋並將資金投入台股大盤累積複利）";
          }
          life.flags.elderly_rent_rejection_risk = true;
        }
      }
      if (decision.id === "D14_financial_trap" && ef.loss_prob_on_crash) {
        const v = decision.activeVariant;
        const invested = Math.round(Math.max(Math.min(100000 * this.wageScale(era) * era.cpi, Math.max(0, life.moneyNominal)), Math.max(0, life.moneyNominal) * (ef.invest_ratio || 0.5)));
        life.moneyNominal -= invested;
        const borrowed = opt.key === "all_in" ? Math.round(invested * 0.35) : 0;
        const crashYr = typeof v.crash_year === "number" ? Math.max(life.currentYear + 1, v.crash_year) : life.currentYear + 1;
        life.flags.pendingTraps.push({
          variantId: v.variant_id, title: v.title, investedNominal: invested, borrowedNominal: borrowed,
          crashYear: crashYr, lossProb: ef.loss_prob_on_crash, happinessOnCrash: ef.happiness_on_crash || -20,
          suicideMult: ef.suicide_risk_mult_if_debt || 1.8, isAllIn: opt.key === "all_in"
        });
        extraLog = `（已投入約 NT$${invested.toLocaleString()}，後續配息與風險有待時間檢驗）`;
      }
      if (decision.id === "D15_stock_crash_panic") {
        if (ef.realize_loss) { life.moneyNominal += life.stockNominal; life.stockNominal = 0; extraLog = "（已將剩餘股票全數出清轉回現金）"; }
        else if (ef.buy_dip_ratio && life.moneyNominal > 0) {
          const buy = Math.round(life.moneyNominal * ef.buy_dip_ratio);
          life.moneyNominal -= buy; life.stockNominal += buy; extraLog = `（已加碼 NT$${buy.toLocaleString()} 逢低買進）`;
        }
      }
      if (decision.id === "D16_relative_loan_guarantor" && ef.default_bankruptcy_prob) {
        if (Math.random() < ef.default_bankruptcy_prob) {
          const hit = Math.round(Math.max(200000 * this.wageScale(era) * era.cpi, Math.max(0, life.moneyNominal) * 0.4));
          life.moneyNominal -= hit; life.stats.happiness -= 18; life.flags.heavy_debt = true;
          extraLog = `（對方倒帳失聯，你被迫扛下約 NT$${hit.toLocaleString()} 連帶清償責任）`;
        } else extraLog = "（對方如期還清，人情更加深厚）";
      }
      if (decision.id === "D17_critical_illness_cost") {
        const hasNHI = this.hasSwitch(life.currentYear, "nhi_universal_healthcare") && life.location === "TAIWAN";
        const medNeed = this.getMedicalSelfPayNominal(life, era);
        if (opt.key === "self_pay_advanced") {
          this.spendLiquid(life, medNeed);
          life.stats.health += 20;
          life.flags.midlife_mortality_mult = Math.min(life.flags.midlife_mortality_mult || 1.0, 0.85);
          extraLog = `（成功負擔先進自費療程 NT$${medNeed.toLocaleString()}，病情獲得有效控制）`;
        } else if (opt.key === "sell_home_for_med" && life.homeowner) {
          const saleProceeds = Math.round((life.homeValueNominal || 0) * 0.90) - (life.mortgageBalanceNominal || 0);
          life.homeowner = false; life.homeValueNominal = 0; life.mortgageBalanceNominal = 0; life.mortgageAnnualPayment = 0;
          life.moneyNominal += saleProceeds;
          this.spendLiquid(life, medNeed);
          life.stats.health += 18;
          this.recordFinancialBarrier(life, era, "因流動存款不足，被迫賣房籌措重大傷病救命醫療費");
          extraLog = `（賣掉自住房產變現籌措 NT$${medNeed.toLocaleString()} 救命療程，雖保住性命卻重回租屋生活）`;
        } else {
          // Conservative / underfunded treatment -> real risk of disability or early death!
          const basicBill = Math.round(medNeed * (hasNHI ? 0.12 : 0.40));
          this.spendLiquid(life, basicBill);
          const wasBlocked = !this.isOptionEligible(life, decision.options[0], era).eligible;
          if (wasBlocked) {
            this.recordFinancialBarrier(life, era, "因存款不足無力負擔先進自費治療，只能採基礎保守治療");
          }
          const roll = Math.random();
          const disProb = hasNHI ? (wasBlocked ? 0.28 : 0.16) : 0.42;
          const severeProb = hasNHI ? (wasBlocked ? 0.22 : 0.12) : 0.30;
          if (roll < disProb) {
            life.flags.disabled = true;
            life.flags.wage_mult = (life.flags.wage_mult || 1.0) * 0.58;
            life.stats.health = Math.min(life.stats.health, 42);
            life.stats.happiness -= 16;
            this.recordFinancialBarrier(life, era, "因未能接受完整先進治療，留下永久殘疾／失能後遺症");
            extraLog = "（未能及時接受先進療程，留下永久殘疾與行動失能，工作能力與壽命皆受重創）";
          } else if (roll < disProb + severeProb) {
            life.flags.inadequate_med_years = 4;
            life.stats.health = Math.max(15, life.stats.health - 15);
            life.stats.happiness -= 14;
            this.recordFinancialBarrier(life, era, "因治療資源受限導致病情反覆惡化，面臨提早離世高風險");
            extraLog = "（基礎療程控制有限，病情持續惡化，未來數年面臨極高的早逝風險）";
          } else {
            life.stats.health += 5;
            extraLog = hasNHI ? `（仰賴全民健保基礎給付 NT$${basicBill.toLocaleString()} 撐過難關）` : `（咬牙撐過保守治療，仍耗去約 NT$${basicBill.toLocaleString()} 醫療費）`;
          }
        }
      }
      if (decision.id === "D12B_vehicle_purchase" && ef.buy_vehicle) {
        life.ownedAssets = life.ownedAssets || { vehicle: null, valuables: null };
        const vType = ef.buy_vehicle;
        const vCost = this.getVehicleCostNominal(vType, era);
        this.spendLiquid(life, vCost);
        const carName = life.currentYear < 1980 ? "國產／進口房車" : (life.currentYear < 2010 ? "國產代步房車" : "國產房車／休旅車");
        const scName = life.currentYear < 1975 ? "輕檔車／機車" : "白牌速克達機車";
        life.ownedAssets.vehicle = vType === "car"
          ? { type: "car", name: carName, baseValue2025: 720000, acquiredYear: life.currentYear, annualUpkeep2025: 65000, source: "自購" }
          : { type: "scooter", name: scName, baseValue2025: 85000, acquiredYear: life.currentYear, annualUpkeep2025: 12000, source: "自購" };
        extraLog = `（斥資 NT$${vCost.toLocaleString()} 購入「${life.ownedAssets.vehicle.name}」，正式成為名下資產並開始計入年度保養稅金）`;
      }
      if (decision.id === "D18_marriage_choice" && opt.key === "stay_unmarried") {
        delete life.triggeredDecisions["D18_marriage_choice"];
        life.flags.next_marriage_ask_age = life.age + 4;
        life.flags.declined_marriage = (life.flags.declined_marriage || 0) + 1;
      }
      if (ef.married === true) {
        this.marry(life, era);
        extraLog += `（與${life.spouse.name}結為夫妻${life.spouse.working ? "，婚後兩人都繼續工作" : "，婚後對方先以家庭為重"}）`;
        life.ownedAssets = life.ownedAssets || { vehicle: null, valuables: null };
        if (decision.id === "D18_marriage_choice" && opt.key === "traditional_wedding" && !life.ownedAssets.valuables) {
          const dowry2025 = life.quintile >= 4 ? 260000 : 140000;
          life.ownedAssets.valuables = {
            name: "結婚嫁妝金飾組",
            baseValue2025: dowry2025,
            acquiredYear: life.currentYear,
            source: "婚禮贈與"
          };
          extraLog += `（雙方長輩致贈「結婚嫁妝金飾組」，約值 NT$${Math.round(dowry2025 * era.cpi).toLocaleString()}）`;
        }
      }
      if (ef.married === false && decision.id !== "D18_marriage_choice") life.married = false;
      let birthOk = true;
      if (decision.id === "D19_have_children") {
        delete life.triggeredDecisions["D19_have_children"];
        if (ef.adopt_child) {
          life.children += 1;
          life.childrenBirthYears = life.childrenBirthYears || [];
          life.childrenBirthYears.push(life.currentYear - 1);
          life.flags.infertile_tries = 0;
          life.stats.happiness += 8;
          extraLog = "（經過訪視與法院認可，你們收養了一個孩子，家裡多了一份牽掛）";
        }
        if (ef.ivf) {
          this.spendLiquid(life, Math.round(220000 * this.wageScale(era) * era.cpi));
          life.stats.health -= 2;
        }
        if (ef.postpone_child) { life.flags.next_child_ask_age = life.age + 2; birthOk = false; }
        if (ef.no_more_kids) { life.flags.no_more_kids = true; birthOk = false; }
        if (ef.children_delta) {
          const okProb = this.getConceptionProb(life, Boolean(ef.ivf));
          if (Math.random() > okProb) {
            birthOk = false;
            life.flags.next_child_ask_age = life.age + 1;
            life.flags.infertile_tries = (life.flags.infertile_tries || 0) + 1;
            life.stats.happiness -= 3;
            const tries = life.flags.infertile_tries;
            extraLog = `（這一年${ef.ivf ? "做了人工生殖療程，" : "努力了一整年，"}還是沒有懷孕。以 ${this.getMotherAge(life)} 歲來說，一年內成功的機率約 ${Math.round(okProb * 100)}%${tries >= 2 ? (life.currentYear >= 1985 ? "；已連續落空，下次可以考慮求助生殖醫學或收養" : "；已連續落空，下次可以考慮收養") : ""}）`;
            life.feed.unshift({
              type: "normal", age: life.age, year: life.currentYear, roc: era.roc, highlight: true,
              text: `🍼 想要孩子，但今年還沒有好消息（第 ${tries} 次落空）。${this.getMotherAge(life) >= 38 ? "年紀越大，懷孕的機率下降得越快。" : "不少夫妻都要試上一兩年才成功。"}`
            });
          } else {
            life.flags.infertile_tries = 0;
          }
        }
      }
      if (ef.children_delta && birthOk) {
        life.children += ef.children_delta;
        life.childrenBirthYears = life.childrenBirthYears || [];
        for (let ci = 0; ci < ef.children_delta; ci++) {
          life.childrenBirthYears.push(life.currentYear);
        }
        extraLog = `（第 ${life.children} 個孩子出生，${life.children === 1 ? "你們成了新手爸媽" : "家裡更熱鬧了"}）`;
        if (life.location === "TAIWAN" && life.currentYear >= 2026 && ef.subsidy_post_2026_twd) {
          life.moneyNominal += ef.subsidy_post_2026_twd; extraLog += "（領取每胎 10 萬元生育補助）";
        }
      }
      if (decision.id === "D20_marriage_crisis") {
        if (opt.key === "divorce") {
          const split = this.divideMaritalAssets(life, era);
          this.endRelationship(life);
          life.flags.divorced = true;
          life.flags.next_romance_age = life.age + 3;
          life.stats.happiness += (ef.short_term_happiness || -12);
          life.flags.delayedHappiness.push({ year: life.currentYear + 2, delta: ef.long_term_happiness || 8, note: "離婚兩年後，你逐漸走出低谷，重新找回生活步調。" });
          extraLog = split.note;
        } else if (opt.key === "move_out_counseling") {
          life.flags.stay_home = false;
          if (Math.random() < (ef.repair_prob || 0.65)) { life.stats.happiness += 6; life.stats.social += 6; extraLog = life.currentYear < 1990 ? "（搬出去自組小家庭、親友居中協調後，夫妻感情慢慢回溫）" : "（透過搬離原住處與諮商，伴侶關係顯著修復）"; }
          else { life.stats.happiness -= 5; extraLog = "（雙方仍在磨合中，關係壓力尚未完全解除）"; }
        }
      }
      if (decision.id === "D21_child_education_race" && opt.key === "private_cram") life.flags.private_cram_kids = true;
      if (decision.id === "D23_pandemic_dilemma") {
        if (ef.income_mult) life.flags.temp_income_mult = ef.income_mult;
        if (ef.infection_risk_mult) life.flags.pandemic_exposure_mult = ef.infection_risk_mult;
      }
      if (decision.id === "D24_elderly_care_storm") {
        if (ef.job_lost) { life.flags.unemployed = true; life.flags.fulltime_caregiver = true; life.job = "全職照顧者（辭職照護長輩）"; extraLog = "（職涯中斷、薪資歸零，獨自承擔繁重照護壓力）"; }
        else if (ef.monthly_care_cost_twd_2025) { life.flags.monthly_care_cost_twd_2025 = ef.monthly_care_cost_twd_2025; const careLbl = life.currentYear >= 2007 ? "長照支出" : "照護支出"; extraLog = `（每月增加約 NT$${Math.round(ef.monthly_care_cost_twd_2025 * era.cpi).toLocaleString()} ${careLbl}）`; }
      }
      if (decision.id === "D29_child_study_abroad") {
        const th = (this.data.marketHistory && this.data.marketHistory.financial_thresholds_2025) || {};
        const cost = Math.round((th.child_abroad_full || 2400000) * era.cpi);
        if (opt.key === "fund_abroad_full") {
          this.spendLiquid(life, cost);
          extraLog = `（全額資助子女留學約 NT$${Math.round(cost / 10000).toLocaleString()} 萬，助力下一代站上國際舞台）`;
        } else if (opt.key === "mortgage_home_for_child" && life.homeowner) {
          life.mortgageBalanceNominal += cost;
          life.mortgageAnnualPayment = Math.round(life.mortgageBalanceNominal * 0.055);
          extraLog = `（以房屋增貸 NT$${Math.round(cost / 10000).toLocaleString()} 萬送孩子出國深造，退休後仍須背負貸款）`;
        } else {
          const fundOk = decision.options.some((o) => o.key === "fund_abroad_full" && this.isOptionEligible(life, o, era).eligible);
          const homeOk = decision.options.some((o) => o.key === "mortgage_home_for_child" && this.isOptionEligible(life, o, era).eligible);
          if (!fundOk && !homeOk) {
            const liq = this.getLiquidNominal(life);
            this.recordFinancialBarrier(life, era, "因存款不足、名下也沒有足夠房產淨值可增貸，無力資助子女出國留學",
              `需約 NT$${Math.round(cost / 10000).toLocaleString()} 萬，流動資產 NT$${Math.round(Math.max(0, liq) / 10000).toLocaleString()} 萬`);
            extraLog = "（現實存款與房產都無法支撐海外學費，只能遺憾婉拒子女留學夢）";
          } else {
            extraLog = "（家裡其實負擔得起，但評估後決定不出這筆錢，鼓勵孩子在台灣升學或自己申請獎學金）";
          }
        }
      }
      if (decision.id === "D30_forced_home_sale" && life.homeowner) {
        if (opt.key === "sell_home_survive") {
          const saleVal = Math.round((life.homeValueNominal || 0) * 0.85);
          const netCash = saleVal - (life.mortgageBalanceNominal || 0);
          life.homeowner = false; life.homeValueNominal = 0; life.mortgageBalanceNominal = 0; life.mortgageAnnualPayment = 0;
          life.moneyNominal += netCash;
          if (life.moneyNominal >= -100000 * era.cpi) life.flags.heavy_debt = false;
          this.recordFinancialBarrier(life, era, "遭遇金融危機或資金斷裂，被迫降價賣房清償債務");
          extraLog = `（以市價約 85 折 NT$${Math.round(saleVal / 10000).toLocaleString()} 萬急售房屋還清房貸，剩餘資金 ${netCash >= 0 ? "+" : ""}NT$${Math.round(netCash / 10000).toLocaleString()} 萬，改回租屋）`;
        } else if (opt.key === "borrow_hold_home") {
          const bridge = Math.round(450000 * era.cpi);
          life.moneyNominal += bridge; // short-term liquidity relief
          life.mortgageBalanceNominal += bridge;
          extraLog = `（向親友籌措約 NT$${Math.round(bridge / 10000).toLocaleString()} 萬急用金勉強保住房子，但總債務進一步墊高）`;
        } else {
          const auctionVal = Math.round((life.homeValueNominal || 0) * 0.72);
          const netCash = auctionVal - (life.mortgageBalanceNominal || 0);
          life.homeowner = false; life.homeValueNominal = 0; life.mortgageBalanceNominal = 0; life.mortgageAnnualPayment = 0;
          life.moneyNominal += netCash;
          life.flags.heavy_debt = true;
          this.recordFinancialBarrier(life, era, "無力繳納房貸，房屋遭銀行低價法拍");
          extraLog = `（房屋遭銀行以市價 72 折 NT$${Math.round(auctionVal / 10000).toLocaleString()} 萬拍賣，房產歸零且仍背負沉重壓力）`;
        }
      }
      if (decision.id === "D31_cashflow_debt_crisis") {
        life.flags.lastDebtCrisisAge = life.age;
        life.ownedAssets = life.ownedAssets || { vehicle: null, valuables: null };
        if (ef.sell_owned_vehicle && life.ownedAssets.vehicle) {
          const vName = life.ownedAssets.vehicle.name;
          const cashGot = this.getOwnedAssetResaleNominal(life, "vehicle", era);
          life.moneyNominal += cashGot;
          life.ownedAssets.vehicle = null;
          life.flags.austerity_years = 2;
          this.recordFinancialBarrier(life, era, `因收支赤字被迫變賣名下「${vName}」止血`);
          extraLog = `（忍痛變賣名下「${vName}」換現 NT$${cashGot.toLocaleString()}，免除後續養車費並啟動兩年節儉期）`;
        } else if (ef.sell_owned_valuables && life.ownedAssets.valuables) {
          const itemName = life.ownedAssets.valuables.name;
          const cashGot = this.getOwnedAssetResaleNominal(life, "valuables", era);
          life.moneyNominal += cashGot;
          life.ownedAssets.valuables = null;
          life.flags.austerity_years = 1;
          this.recordFinancialBarrier(life, era, `因收支赤字被迫變賣「${itemName}」應急`);
          extraLog = `（典當變賣「${itemName}」換現 NT$${cashGot.toLocaleString()} 緩解債務壓力）`;
        } else if (ef.forced_sell_home && life.homeowner) {
          const saleVal = Math.round((life.homeValueNominal || 0) * 0.85);
          const netCash = saleVal - (life.mortgageBalanceNominal || 0);
          life.homeowner = false; life.homeValueNominal = 0; life.mortgageBalanceNominal = 0; life.mortgageAnnualPayment = 0;
          life.moneyNominal += netCash;
          if (life.moneyNominal >= -100000 * era.cpi) life.flags.heavy_debt = false;
          this.recordFinancialBarrier(life, era, "因長期收支赤字與負債壓力，被迫賣房清償債務");
          extraLog = `（以市價約 85 折 NT$${Math.round(saleVal / 10000).toLocaleString()} 萬出售自住房還債，重回租屋生活止血）`;
        } else if (ef.borrow_relatives_cash) {
          const relief = Math.round(350000 * era.cpi);
          life.moneyNominal += relief;
          extraLog = `（向親友籌得無息救急金約 NT$${relief.toLocaleString()} 暫解燃眉之急，但人際關係承受沉重壓力）`;
        } else if (ef.take_high_interest_loan) {
          const fee = Math.round(Math.max(80000 * era.cpi, Math.abs(Math.min(0, life.moneyNominal)) * 0.18));
          life.moneyNominal -= fee;
          life.flags.heavy_debt = true;
          life.flags.austerity_years = 2;
          extraLog = `（啟動兩年極致節省並轉入高利借貸周轉，額外產生約 NT$${fee.toLocaleString()} 利息手續費，債務利率跳升至 8%）`;
        }
      }
      if (decision.id === "D28_debt_clearance" && ef.debt_rehab_clear) {
        const beforeDebt = Math.abs(Math.min(0, life.moneyNominal));
        life.moneyNominal = Math.round(-150000 * era.cpi);
        life.flags.heavy_debt = false;
        life.flags.used_debt_rehab = true;
        extraLog = `（法院裁定更生方案通過，原本約 NT$${beforeDebt.toLocaleString()} 的沉重債務大幅減免，終獲重啟人生機會）`;
      }
      if (decision.id === "D25_retirement_timing") {
        delete life.triggeredDecisions["D25_retirement_timing"];
        if (ef.retired) {
          this.retireNow(life, opt.key === "early_fire" ? "提早退休" : "退休");
        } else {
          life.flags.next_retire_ask = life.age + 3;
          if (life.age >= this.getPensionAge(life) && !this.isSelfEmployed(life) && !life.flags.second_career_started) {
            life.flags.second_career_started = true;
            life.careerSalaryMult = +(life.careerSalaryMult * (ef.income_mult || 0.55)).toFixed(2);
            life.flags.rank_title = "退而不休（兼職）";
            life.job = life.flags.rank_title;
          }
        }
      }

      if (decision.id !== "D14_financial_trap") {
        if (ef.money_delta_ratio) life.moneyNominal = Math.round(life.moneyNominal * (1 + ef.money_delta_ratio));
        if (ef.money_delta_twd_2025) {
          const isDependentStudent = life.age < 24 && (life.workYears || 0) === 0 && !life.flags.part_time_approved && !life.flags.vocational_coop && !life.flags.uni_parttime && !life.flags.uni_internship && life.flags.hs_tier !== "work_early";
          if (!(ef.money_delta_twd_2025 < 0 && isDependentStudent && life.moneyNominal <= 0)) {
            let deltaNom = Math.round(ef.money_delta_twd_2025 * this.wageScale(era) * era.cpi);
            if (deltaNom < 0 && (life.workYears || 0) === 0) deltaNom = -Math.min(-deltaNom, Math.max(0, life.moneyNominal)); // 尚未工作者由家人補足
            life.moneyNominal += deltaNom;
          }
        }
      }

      const regAfter = this.getRegion(life.regionId);
      const salaryAfterAnnual = this.computeCurrentAnnualSalaryNominal(life, era, regAfter);
      const wageMultAfter = (life.flags.wage_mult || 1.0) * (life.careerSalaryMult || 1.0) * (regAfter ? regAfter.income_multiplier : 1.0);
      let salaryDeltaBadge = "";

      if (salaryAfterAnnual > 0 || salaryBeforeAnnual > 0) {
        life.annualSalaryNominal = salaryAfterAnnual;
        const deltaAnnual = salaryAfterAnnual - salaryBeforeAnnual;
        if (Math.abs(deltaAnnual) >= Math.max(6000, Math.round(12000 * era.cpi))) {
          const beforeMo = Math.round(salaryBeforeAnnual / 12);
          const afterMo = Math.round(salaryAfterAnnual / 12);
          const deltaMo = afterMo - beforeMo;
          const pctStr = salaryBeforeAnnual > 0 ? `${deltaAnnual >= 0 ? "+" : ""}${Math.round((deltaAnnual / salaryBeforeAnnual) * 100)}%` : "開啟薪資";
          salaryDeltaBadge = `💼 薪資變化：月薪 NT$${beforeMo.toLocaleString()} → NT$${afterMo.toLocaleString()}（${pctStr}，${deltaMo >= 0 ? "+" : "-"}NT$${Math.abs(deltaMo).toLocaleString()}/月）`;
          life.salaryHistory = life.salaryHistory || [];
          life.salaryHistory.unshift({
            age: life.age, year: life.currentYear, title: decision.resolvedTitle, choice: optLabel,
            beforeMonthly: beforeMo, afterMonthly: afterMo, deltaMonthly: deltaMo, pctStr, isFutureMult: false
          });
        }
      } else if (Math.abs(wageMultAfter - wageMultBefore) / Math.max(0.01, wageMultBefore) >= 0.03) {
        const pct = Math.round(((wageMultAfter / wageMultBefore) - 1) * 100);
        if (pct !== 0) {
          salaryDeltaBadge = `💼 預期出社會起薪倍率變化：${pct > 0 ? "+" : ""}${pct}%（入職場後生效）`;
          life.salaryHistory = life.salaryHistory || [];
          life.salaryHistory.unshift({
            age: life.age, year: life.currentYear, title: decision.resolvedTitle, choice: optLabel,
            pctStr: `${pct > 0 ? "+" : ""}${pct}%`, isFutureMult: true
          });
        }
      }

      const maxHpDec = this.healthCap(life);
      life.stats.health = clamp(Math.round(life.stats.health), 0, maxHpDec);
      for (const k of ["happiness", "knowledge", "social"]) life.stats[k] = clamp(Math.round(life.stats[k]), 0, 100);
      if (life.flags.wage_mult) life.flags.wage_mult = clamp(life.flags.wage_mult, 0.55, 1.28);

      life.decisionHistory.push({ age: life.age, year: life.currentYear, roc: era.roc, title: decision.resolvedTitle, choice: optLabel });
      life.feed.unshift({
        type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
        text: `【抉擇：${decision.resolvedTitle}】你選擇了「${optLabel}」。${extraLog}`,
        salaryDeltaBadge,
        highlight: true,
        showHelpline: Boolean(life.flags.heavy_debt && (decision.id === "D10_unpaid_leave" || decision.id === "D16_relative_loan_guarantor"))
      });
    }

    runBatch(regionId, birthYear, n, eduMode, historicalMode, showAllHistoricalEvents = false) {
      let sumAge = 0, alive65 = 0, uni = 0, home = 0, abroad = 0, returned = 0, protHitCount = 0, protFatalCount = 0, sumRealWealth = 0, sumDecisions = 0;
      for (let i = 0; i < n; i++) {
        const l = this.createLife({ regionMode: "manual", manualRegionId: regionId, birthYear });
        while (l.alive && l.age < 105) {
          this.stepYear(l, { eduMode, historicalMode: !eduMode && Boolean(historicalMode), autoMode: true, showAllHistoricalEvents: Boolean(showAllHistoricalEvents) });
        }
        sumAge += l.age;
        if (l.age >= 65) alive65++;
        if (l.eduLevel >= 4) uni++;
        if (l.homeowner) home++;
        if (l.everStudiedAbroad) abroad++;
        if (l.everReturnedToTaiwan) returned++;
        if (l.protagonistEvents && l.protagonistEvents.length > 0) protHitCount++;
        if (l.fatalByHistoricalMode) protFatalCount++;
        sumDecisions += l.decisionHistory.length;
        const endEra = this.getEraParams(l.currentYear);
        sumRealWealth += this.getNetWorthNominal(l) / Math.max(0.07, endEra.cpi);
      }
      return {
        regionName: this.getRegion(regionId).name_zh,
        birthYear, n,
        historicalMode: !eduMode && Boolean(historicalMode),
        meanAge: +(sumAge / n).toFixed(1),
        survive65Pct: Math.round((alive65 / n) * 100),
        uniPct: Math.round((uni / n) * 100),
        homePct: Math.round((home / n) * 100),
        abroadPct: Math.round((abroad / n) * 100),
        returnPct: abroad > 0 ? Math.round((returned / abroad) * 100) : 0,
        protagonistPct: Math.round((protHitCount / n) * 100),
        protagonistFatalPct: +((protFatalCount / n) * 100).toFixed(1),
        avgDecisions: +(sumDecisions / n).toFixed(1),
        avgRealAssetsTwd: Math.round(sumRealWealth / n)
      };
    }
  }

  global.TaiwanLifeEngine = TaiwanLifeEngine;
})(window);
