/* === Taiwan Life Simulation Engine (js/tw_engine.js) — v2.0 (9 Databases Integrated) ===
 * Pure data-driven microsimulation consuming all 9 data/tw_*.json modules (or window.TW_DATA):
 * 1. tw_regions.json           6 macro-regions, quintiles, migration rates
 * 2. tw_eras.json              1950–2070+ anchors, year overrides, 18 institutional switches
 * 3. tw_lifetable.json         calibrated mortality, causes, typhoon & lifestyle risks
 * 4. tw_events_history.json    37 historical & legal-aftermath events (3-part edu cards)
 * 5. tw_decisions.json         26 Taiwan localized decisions + 5 pause questions
 * 6. tw_names.json             weighted surnames & 6 cohort given-name pools
 * 7. tw_education_careers.json 4 education eras & 15 era/region-specific Taiwan careers
 * 8. tw_culture_eras.json      4 era social/family atmospheres, customs & overseas comm channels
 * 9. tw_study_abroad.json      6 study-abroad pathways, 6 countries' era events, 12 return triggers + D27
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
  const FIRE_ASSET_THRESHOLD_2025 = 15000000;

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

    getNetWorthNominal(life) {
      const era = this.getEraParams(life.currentYear || life.birthYear || 2025);
      const homeEq = life.homeowner ? Math.max(0, (life.homeValueNominal || 0) - (life.mortgageBalanceNominal || 0)) : 0;
      const vehVal = this.getOwnedAssetResaleNominal(life, "vehicle", era);
      const valVal = this.getOwnedAssetResaleNominal(life, "valuables", era);
      return Math.round((life.moneyNominal || 0) + (life.stockNominal || 0) + homeEq + vehVal + valVal);
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
      const parentHelp = life.quintile === 5 ? Math.round(downpayment * 0.50) : life.quintile === 4 ? Math.round(downpayment * 0.25) : 0;
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
      return Math.round(base2025 * era.cpi);
    }

    recordFinancialBarrier(life, era, label) {
      if (!life.flags.financialBarriers) life.flags.financialBarriers = [];
      const entry = `${life.age} 歲（${life.currentYear} 年）：${label}`;
      if (!life.flags.financialBarriers.includes(entry)) {
        life.flags.financialBarriers.push(entry);
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

      let prob = rule.base_prob || 0.08;
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
          prob *= 1.45;
          matchedExpLabels.push(tagLabelMap[tag] || tag);
        }
      }

      // Slight proximity boost if specifically in primary non-ALL region
      if (!rule.regions.includes("ALL") && rule.regions.includes(life.regionId)) {
        prob *= 1.15;
      }

      prob = clamp(prob, 0.008, 0.65);
      if (Math.random() >= prob) return null;

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
        } else {
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
      if (outcome.extra_debt_2025) {
        const debtNom = Math.round(outcome.extra_debt_2025 * era.cpi);
        life.moneyNominal -= debtNom;
        impactSummary.push(`背負額外債務約 NT$${debtNom.toLocaleString()}`);
      }
      if (outcome.lose_home && life.homeowner) {
        life.homeowner = false;
        life.homeValueNominal = 0;
        life.mortgageDTI = 0;
        life.mortgageBalanceNominal = Math.round((life.mortgageBalanceNominal || 0) * 0.4);
        impactSummary.push("自購房屋受毀或遭法拍");
      }
      if (outcome.heavy_debt) life.flags.heavy_debt = true;
      if (outcome.job_lost) {
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

    // Pick an era- and region-matched Taiwan career from tw_education_careers.json
    pickEraCareer(life) {
      const careers = (this.data.educationCareers && this.data.educationCareers.careers) || [];
      if (!careers.length) return null;
      const eligible = careers.filter((c) =>
        life.currentYear >= c.era_range[0] &&
        life.currentYear <= c.era_range[1] &&
        life.eduLevel >= c.min_edu_level
      );
      const pool = eligible.length ? eligible : careers;
      return weightedPick(pool, (c) => {
        let w = 1.0;
        if (c.preferred_regions.includes(life.regionId)) w *= 2.4;
        if (life.major && c.preferred_majors.includes(life.major)) w *= 3.0;
        return w;
      });
    }

    assignCareer(life, career) {
      if (!career) return;
      life.careerId = career.id;
      life.sector = career.name;
      life.job = career.name;
      life.careerSalaryMult = +(career.salary_mult_min + Math.random() * (career.salary_mult_max - career.salary_mult_min)).toFixed(2);
      life.flags.job_stability = Math.max(life.flags.job_stability || 0, career.stability);
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

    getConscriptionMonths(birthYear, currentYear) {
      if (birthYear >= 2005 && currentYear >= 2024) return 12;
      if (birthYear >= 1994 && birthYear <= 2004) return 4;
      if (currentYear >= 2008) return 12;
      if (currentYear >= 2000) return 18;
      if (currentYear >= 1990) return 24;
      return Math.random() < 0.35 ? 36 : 24;
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
      const y = life.currentYear;
      const reg = this.getRegion(life.regionId);
      const uniPct = Math.round((era.uni_admission_rate || 0.5) * 100);
      const isF = life.sex === "F";

      // Study Abroad departure cards (SA01-SA06)
      if (dec.isStudyAbroadCard) {
        if (y < 1976) return "📊 時代趨勢：此時期出國須通過嚴格公／自費留學考試，全台每年留學生僅約兩至三千人，超過八成前往美國深造。";
        if (y < 1995) return "📊 時代趨勢：廢除自費留考後出國門檻大降，每年約 6,000–15,000 名台灣學子赴海外深造，美國占比仍逾七成，且早期學成歸國比例不到三成。";
        if (y < 2010) return "📊 時代趨勢：台灣留學版圖逐步擴展至美、英、日、澳、加，加上打工度假與交換生興起，海外歷練不再是極少數家庭專利。";
        return "📊 時代趨勢：近年台灣海外留學生約維持 6 萬餘人，前五大去向為美、日、澳、英、加，約半數以上留學生傾向先於當地累積工作年資再評估返台。";
      }

      switch (dec.id) {
        case "D01_junior_high_track":
        case "LS02_junior_high_exam_branch":
          if (y < 1968) return `📊 時代趨勢：此時尚未實施九年國教，全台國小畢業生僅約 55%–62% 繼續升學初中${isF ? "（女童升學比例更顯著低於男童）" : ""}，逾三成學童畢業即投入農工貼補家用。`;
          if (y < 2000) return "📊 時代趨勢：九年國教後國中升學率躍升至 85%–94%，但台灣長期採高中職 3：7 政策，約 70% 升學青年就讀高職與五專，僅約 30% 進入普通高中。";
          if (y < 2014) return "📊 時代趨勢：基測時期全台國中畢業升學率達 95%–98%，高中與高職／五專就讀比例逐步拉近至約 5：5。";
          return "📊 時代趨勢：十二年國教會考時期，全台國中畢業升學率高達 99.7%，普通高中與技術型高中比例約 52% vs 48%。";

        case "D02_university_major":
          if (y < 1990) return `📊 時代趨勢：此年代大學錄取率僅約 ${uniPct}%；女性大學生中約 78%–85% 選擇人文、商管、教育或護理領域，工程類科女性比例長期低於 10%。`;
          if (y < 2010) return `📊 時代趨勢：此年代大學錄取率約 ${uniPct}%；約 68%–74% 女性與 46% 男性選填商管文史領域，電資理工則由男性占近八成。`;
          return `📊 時代趨勢：此年代大學錄取率約 ${uniPct}%；女性選擇文商與醫護約占 68%，電資工程女性比例緩步升至約 18%–22%；電資起薪平均高於文組約 13%–20%。`;

        case "D03_exam_retake":
          if (y < 1996) return `📊 時代趨勢：聯考錄取率僅約 ${uniPct}% 的窄門年代，約三成以上落榜考生選擇進重考班再戰一年，台北南陽街高峰期聚集數萬名重考生。`;
          return `📊 時代趨勢：多元入學時期大學錄取率已達 ${uniPct}%，整體重考比例下降，但鎖定頂大電資與醫學系的考生中仍有約 10%–15% 選擇重考衝刺。`;

        case "D04_military_service": {
          const mo = this.getConscriptionMonths(life.birthYear, y);
          if (y < 2000) return `📊 時代趨勢：此時期役男一般義務役長達 ${mo} 個月，逾九成男性須中斷學業或職涯入伍，大專以上學歷中約一至兩成報考預官。`;
          if (y < 2013) return `📊 時代趨勢：此時期役期縮為約 ${mo} 個月並開辦替代役／國防研發役，理工碩士以上約有 20%–30% 爭取科技研發替代役無縫銜接職場。`;
          return `📊 時代趨勢：役男現行役期為 ${mo} 個月，多數青年選擇服完義務役即投入職場，僅約 10%–15% 因穩定薪資考量轉簽志願役。`;
        }

        case "D05_graduation_crossroads":
          if (y < 1995) return "📊 時代趨勢：此時期台灣研究所名額稀少，逾八成大學畢業生選擇直接就業或服役，具學士學位即屬職場前段稀缺人才。";
          if (y < 2010) return "📊 時代趨勢：大學學歷普及後，約 25%–32% 畢業生選擇繼續報考國內研究所或出國深造，以拉開與大學起薪的差距。";
          return "📊 時代趨勢：統計顯示台灣碩士學歷者年薪中位數較大學畢業生高出逾四成，約 28%–35% 理工與商管畢業生選擇先念研究所再入職場。";

        case "D06_northbound_migration":
          return "📊 時代趨勢：跨區就業統計顯示，中彰投畢業生約 27.7%、雲嘉南與高屏約 23.0%、宜花東與離島更高達 40%–50% 選擇北漂或赴西部都會區工作。";

        case "D07_career_track":
          if (y < 1985) return "📊 時代趨勢：加工製造與中小企業出口鼎盛期，逾四成勞動力投入製造業與家族工廠，軍公教則以穩定配給與退休保障吸引近一成青壯年。";
          if (y < 2008) return "📊 時代趨勢：台灣服務業與電子代工並進，科技業股票分紅吸引大量理工人才，中小企業創業家比例居亞洲前段。";
          return "📊 時代趨勢：景氣與薪資呈現明顯產業分化，科技與金融業年薪中位數居各業之冠；同時每年仍有數十萬青年報考公職國營尋求穩定。";

        case "D08_overseas_assignment":
          if (y < 2000) return "📊 時代趨勢：台幣升值與工資上揚促使傳統製造業大舉外移東南亞與中國大陸，第一代台幹常須忍受長期與家人分隔兩地。";
          return "📊 時代趨勢：高峰期約有逾 40 萬名台灣人長期外派海外（含中國大陸、東南亞與歐美據點），外派薪資普遍高出台灣本薪 1.4–1.8 倍。";

        case "D09_return_hometown_dilemma":
          return "📊 時代趨勢：人力銀行調查顯示，68.6% 北漂族曾動念返鄉（主因照顧家人 49.1%），但高達 71.4% 陷入掙扎，其中 67.6% 最擔憂返鄉後薪資打折。";

        case "D10_unpaid_leave":
          return `📊 時代趨勢：景氣寒冬時期（當年失業率約 ${(era.unemployment_rate * 100).toFixed(1)}%），約六成遭遇減班休息的勞工選擇咬牙撐過並兼差補貼，約兩至三成選擇趁機轉職或參訓。`;

        case "D11_health_red_flags":
          return "📊 時代趨勢：台灣受僱者年總工時長期名列前段，中壯年健檢出現三高紅字比例逾四成，但僅約三成上班族願意為健康主動減班或降薪換工時。";

        case "D12B_vehicle_purchase":
          if (y < 1980) return "📊 時代趨勢：此時台灣小客車普及率極低，多數家庭以腳踏車、公車或國產機車代步，擁有自用小客車屬高所得家庭象徵。";
          if (y < 2000) return "📊 時代趨勢：台灣邁入「機車王國」與國產汽車普及期，中南部與非捷運區逾七成上班族仰賴機車或自用小客車通勤。";
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
          if (y < 2010) return "📊 時代趨勢：金融商品快速推陳出新，超過三成散戶過度信賴理專話術或高循環利率現金卡，低估了市場反轉時的槓桿殺傷力。";
          return "📊 時代趨勢：網路假投資群組與高息話術盛行，受害族群橫跨上班族與退休長者，超過六成受騙者最初都是從「小額試水溫」逐步加碼。";

        case "D15_stock_crash_panic":
          return "📊 時代趨勢：歷次台股重挫期間，統計顯示逾六成散戶在恐慌低點選擇停損殺出或從此退出市場，僅約一至兩成能紀律持有或逢低分批加碼。";

        case "D16_relative_loan_guarantor":
          return "📊 時代趨勢：台灣傳統人情社會重視親戚互助，但金融糾紛統計顯示，民間連帶保證人最終被迫代償違約的比例高達約三成，常連帶拖垮自家財務。";

        case "D17_critical_illness_cost":
          if (y < 1995) return "📊 時代趨勢：尚未開辦全民健保時期，重大傷病住院與手術常耗盡一般家庭大半積蓄，約有四成中低所得家庭因此陷入「因病而貧」或被迫中斷治療。";
          return "📊 時代趨勢：全民健保覆蓋絕大多數基礎醫療，但癌症標靶與新式自費療程動輒數十萬至百萬元，有無商業保險與流動存款仍明顯影響預後品質。";

        case "D17B_romance_encounter":
          if (y < 1985) return "📊 時代趨勢：此時期約半數以上情侶透過親友媒妁、同事或社團聯誼相識，交往多以步入婚姻為前提。";
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
          return "📊 時代趨勢：疫情衝擊期間，約 40% 白領與科技業得以切換遠距辦公保住收入，但餐飲、旅遊與第一線服務業逾半數面臨減班或染疫暴露兩難。";

        case "D24_elderly_care_storm":
          return "📊 時代趨勢：長照調查顯示，台灣約有 20%–25% 家庭照顧者曾因長輩失能被迫離職或留停（平均照護期長達 7–9 年），其餘多仰賴外籍看護、日照機構或手足輪流分擔。";

        case "D25_retirement_timing":
          return "📊 時代趨勢：台灣勞工實際平均退休年齡約 61–63 歲，逾五成上班族因通膨與長壽風險擔憂退休金不足，選擇延後退休或退而不休從事二度就業。";

        case "D26_end_of_life_autonomy":
          return "📊 時代趨勢：近年台灣簽署預立安寧緩和醫療與醫療決定人數持續攀升，越來越多長者傾向提早與家人溝通善終意願，減少家屬臨終決策煎熬。";

        case "D27_return_to_taiwan":
          return "📊 時代趨勢：海外台灣人社群調查顯示，父母年邁照護、健保醫療可近性與故鄉人情是返台三大主因；留居海外者則多考量薪資天花板與子女教育環境。";

        case "D28_debt_clearance":
          return "📊 時代趨勢：《消費者債務清理條例》施行後，歷年累計已有逾數萬名陷入卡債或事業失敗的民眾透過法院更生方案減免債務、重回正常經濟生活。";

        case "D29_child_study_abroad":
          return "📊 時代趨勢：海外留學一年學費加生活費動輒 NT$150–250 萬元，逾七成自費留學生仍須仰賴家庭存款贊助或房屋增貸，僅約兩成能靠全額獎學金或留學貸款獨立完成。";

        case "D31_cashflow_debt_crisis":
          return "📊 時代趨勢：收支長期入不敷出時，約半數家庭優先縮減開支或變賣車輛家當止血，約三成向親友周轉，若轉向高利率信貸與預借現金，極易落入以債養債的惡性循環。";

        case "D30_forced_home_sale":
          return "📊 時代趨勢：金融風暴與景氣急凍期，高房貸比家庭一旦遭遇失業或斷頭，約半數選擇提前降價急售止血保住剩餘淨值，硬撐未果者則面臨遭銀行低價法拍風險。";

        case "LS01_childhood_env":
          if (y < 1990) return "📊 時代趨勢：此時期多數孩子放學後在戶外玩耍或回家幫忙家務農事，僅約 25%–35% 都會家庭額外送孩子上才藝或課後補習。";
          return "📊 時代趨勢：雙薪家庭普及後，全台國小學童課後進安親班、美語或才藝補習的比例已超過 65%，城鄉與家境落差在此階段開始浮現。";

        case "LS03_high_school_track":
          return `📊 時代趨勢：台灣普通高中應屆升學率高達 95% 以上；選組趨勢上${isF ? "，女性約 60%–70% 傾向社會組（一類組），約 30%–40% 選擇自然組" : "，男性約 60%–65% 選擇自然組（二／三類組），約 35%–40% 選擇社會組"}。`;

        case "LS04_vocational_path":
          if (y < 2000) return "📊 時代趨勢：此時期高職與五專為台灣產業骨幹，約六至七成技職生畢業即直接進入工廠或企業就業，擁有一技之長起薪不亞於大學生。";
          return "📊 時代趨勢：技專校院廣設後，高職應屆升學率大幅攀升至逾 81%，多數學生選擇拚統測升科大，約兩成則專攻乙級證照與建教合作提早入行。";

        case "LS05_early_apprentice":
          return "📊 時代趨勢：提早進入社會的少年學徒中，約三成堅持熬過三至五年出師成為獨當一面師傅，約兩成利用下班念夜校或空大補齊學歷，翻轉職涯天花板。";

        case "LS06_university_campus_life":
          return "📊 時代趨勢：勞動部調查顯示，台灣大二學生約 45.0% 具課餘打工經驗；另有約三至四成投入社團系學會累積人脈，約一至兩成提前進入教授實驗室做專題。";

        case "LS07_university_career_prep":
          return "📊 時代趨勢：調查顯示近七成大學高年級生將企業實習視為畢業轉正跳板；同時約有 15%–20% 文商與法政學生在大三、大四便提前報名補習班備考公職或研究所。";

        case "LS08_workplace_levelup":
          return "📊 時代趨勢：台灣職場 30–40 歲是薪資拉開差距的關鍵期，約 35% 透過人脈內推跳槽加薪，約 25% 考取高階證照或轉考公職，其餘則選擇在原職尋求工作生活平衡。";

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
      if (life.age < 6) return 0;
      const baseByQ2025 = { 1: 1200, 2: 2600, 3: 4800, 4: 7800, 5: 12000 };
      const ageScale = life.age < 12 ? 0.50 : (life.age < 15 ? 0.85 : 1.15);
      let real2025 = (baseByQ2025[life.quintile] || 4800) * ageScale;
      if (life.flags.part_time_job || life.flags.vocational_coop || life.flags.uni_parttime) {
        real2025 += life.age >= 18 ? 96000 : 48000;
      }
      return Math.round(real2025 * era.cpi);
    }

    calcAnnualLivingExpenseNominal(life, era, reg, isWorking) {
      if (life.age < 18 && !isWorking) {
        return life.age < 6 ? 0 : Math.round(900 * era.cpi);
      }
      const inSchoolLocal = life.location === "TAIWAN" && (
        life.education.includes("在學") ||
        life.flags.in_grad_school_years > 0 ||
        life.flags.retaking_exam
      );
      if (inSchoolLocal && !isWorking) {
        // Full-time student in Taiwan: family covers most room & board; student covers modest personal expenses
        const selfShare = life.quintile >= 4 ? 0.14 : (life.quintile === 3 ? 0.20 : 0.26);
        const studentBase2025 = 240000 * selfShare;
        return Math.round(studentBase2025 * era.cpi);
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

      // Marital status factor: married households share utilities (economies of scale) but incur higher family & social obligations
      const maritalBaseMult = life.married ? 1.12 : 1.0;
      const austerityMult = (life.flags.austerity_years > 0) ? 0.82 : 1.0;

      let baseLiving2025 = 240000 * regionCostMult * maritalBaseMult * austerityMult;
      if (life.focus === "save") baseLiving2025 *= 0.84;
      if (life.flags.retired) baseLiving2025 *= 0.88;
      if (life.flags.future_living_cost_mult) baseLiving2025 *= life.flags.future_living_cost_mult;
      if (life.location !== "TAIWAN" && life.abroad) {
        const cObj = this.getAbroadCountry(life.abroad.countryId);
        baseLiving2025 *= (cObj ? cObj.living_cost_mult_vs_tw : 1.5);
      }

      // Scale contemporary living standards (base living, rent, childcare) by era real-wage ratio so 1950-1985 cohorts pay era-appropriate costs
      const realWageRatio = clamp(((era.avg_monthly_wage_twd || 48000) / Math.max(0.07, era.cpi)) / 62500, 0.25, 1.15);

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
        } else if (life.flags.stay_home || (life.age < 22 && life.education.includes("在學"))) {
          housingNom = isWorking ? Math.round(48000 * (life.married ? 1.25 : 1.0) * realWageRatio * era.cpi) : 0;
        } else {
          const rentBase = reg.id === "north_taipei" ? 168000 : reg.id === "north_hsinchu" ? 132000 : 96000;
          const rentMult = (life.flags.rent_cost_mult || 1.0) * (life.flags.future_rent_mult || 1.0) * familyRentScale;
          housingNom = Math.round(rentBase * rentMult * realWageRatio * era.cpi);
        }
      }

      const childNom = Math.round(dependentChildren * (life.flags.private_cram_kids ? 185000 : 125000) * realWageRatio * era.cpi);
      const careBase2025 = (life.flags.monthly_care_cost_twd_2025 || 0) * (life.flags.future_care_cost_mult || 1.0);
      const careNom = (careBase2025 > 0 && life.family.parentsAlive) ? Math.round(careBase2025 * 12 * realWageRatio * era.cpi) : 0;
      const commuterNom = (life.abroad && life.abroad.commuterMode) ? Math.round(220000 * era.cpi) : 0;

      // Income-linked taxes, labor/NHI premiums & middle-class lifestyle creep (scales with contemporary wage)
      const lifestyleRate = life.focus === "save" ? 0.14 : 0.22;
      const taxAndLifestyleNom = (isWorking && life.annualSalaryNominal > 0)
        ? Math.round(life.annualSalaryNominal * lifestyleRate)
        : 0;
      // Retirees with accumulated liquid wealth gradually spend on travel, health & quality of life (2.2%/yr cap)
      const liqWealth = Math.max(0, (life.moneyNominal || 0) + (life.stockNominal || 0));
      const retireeSpendNom = life.flags.retired
        ? Math.min(Math.round(550000 * era.cpi), Math.round(liqWealth * 0.022))
        : 0;

      const veh = life.ownedAssets && life.ownedAssets.vehicle;
      const vehUpkeepNom = veh ? Math.round((veh.annualUpkeep2025 || 0) * realWageRatio * era.cpi) : 0;

      const scaledBaseNom = Math.round(baseLiving2025 * realWageRatio * era.cpi);

      return Math.max(0, scaledBaseNom + housingNom + childNom + careNom + commuterNom + taxAndLifestyleNom + retireeSpendNom + vehUpkeepNom);
    }

    computeCurrentAnnualSalaryNominal(life, era, reg) {
      const inSchool = life.education.includes("在學") || life.flags.in_grad_school_years > 0 || life.flags.retaking_exam || (life.abroad && life.abroad.studyYearsLeft > 0 && life.abroad.pathwayId !== "SA05_working_holiday");
      if (life.flags.military_gap_years > 0) {
        return life.currentYear >= 2024 ? Math.round(era.min_wage_twd * 10) : Math.round(era.min_wage_twd * 2.5);
      }
      if (life.flags.retired) {
        const hasNewPension = this.hasSwitch(life.currentYear, "labor_pension_new");
        const replacement = life.flags.job_stability >= 0.99 ? 0.62
          : hasNewPension ? clamp(0.30 + life.workYears * 0.006, 0.30, 0.50)
          : clamp(0.40 - life.jobChangesPre2005 * 0.06, 0.22, 0.42);
        return Math.round(era.avg_monthly_wage_twd * 12 * replacement);
      }
      if (life.age < 18 || inSchool || life.flags.exam_prep_years > 0 || life.flags.unemployed || life.flags.fulltime_caregiver) {
        return 0;
      }
      const eduMult = life.eduLevel >= 5 ? 1.42 : life.eduLevel === 4 ? 1.05 : life.eduLevel === 3 ? 0.88 : 0.74;
      const expMult = 1 + Math.min(Math.max(1, life.workYears), 25) * 0.015;
      const careerMult = life.careerSalaryMult || 1.0;
      const jobMult = life.flags.wage_mult || 1.0;
      const focusMult = life.focus === "work" ? 1.12 : 1.0;
      const tempMult = life.flags.temp_income_mult || 1.0;

      let annualBase;
      if (life.location !== "TAIWAN" && life.abroad) {
        const cObj = this.getAbroadCountry(life.abroad.countryId);
        const abMult = cObj ? cObj.salary_mult_vs_tw : 1.6;
        annualBase = era.avg_monthly_wage_twd * 13.0 * abMult * eduMult * expMult * jobMult * focusMult * tempMult * 0.85;
      } else {
        annualBase = era.avg_monthly_wage_twd * 13.2 * reg.income_multiplier * careerMult * eduMult * expMult * jobMult * focusMult * tempMult * 0.82;
        if (life.workYears <= 2 && life.currentYear >= 2009 && life.currentYear <= 2013 && life.flags.hit_22k_anchor) {
          annualBase = Math.min(annualBase, 25246 * 12.5);
        }
      }
      return Math.round(Math.max(era.min_wage_twd * 12 * tempMult, annualBase));
    }

    // For minors (age < 18), adult household crises (pandemics, major disasters) are decided by parents automatically!
    resolveMinorHouseholdCrisis(life, era) {
      if (life.age >= 18 || life.location !== "TAIWAN") return;

      // 1. Pandemic crisis while child/minor (2003 SARS, 2020-2022 COVID-19)
      if ([2003, 2020, 2021, 2022].includes(life.currentYear) && !life.triggeredDecisions["D23_pandemic_dilemma"]) {
        life.triggeredDecisions["D23_pandemic_dilemma"] = true;
        const stayHomeProb = life.quintile >= 4 ? 0.65 : (life.quintile === 3 ? 0.45 : 0.28);
        const parentsStayHome = Math.random() < stayHomeProb;
        const isCovid = life.currentYear >= 2020;
        const schoolNote = life.age >= 6 ? (isCovid ? "學校改採線上遠距停課，" : "進出校園天天量體溫戴口罩，") : "";
        if (parentsStayHome) {
          life.flags.pandemic_exposure_mult = 0.45;
          life.stats.happiness -= 4;
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
      if (!life.triggeredDecisions["D22_major_disaster"]) {
        const d22 = (this.data.decisions.decisions || []).find((x) => x.id === "D22_major_disaster");
        const trigEvs = (d22 && d22.conditions && d22.conditions.trigger_events) || [];
        const activeDisaster = trigEvs
          .map((id) => this.eventMap[id])
          .find((ev) => ev && ev.disaster_year === life.currentYear && (ev.impact_regions || []).includes(life.regionId));
        if (activeDisaster) {
          life.triggeredDecisions["D22_major_disaster"] = true;
          const relocateProb = life.quintile >= 4 ? 0.35 : 0.25;
          const parentsRelocate = Math.random() < relocateProb;
          if (parentsRelocate) {
            const otherIds = this.data.regions.regions.map((r) => r.id).filter((id) => id !== life.regionId);
            const destId = pick(otherIds);
            const destReg = this.getRegion(destId);
            life.regionId = destId;
            life.migrated = destId !== life.birthRegionId;
            life.stats.happiness -= 6;
            life.stats.social -= 7;
            life.feed.unshift({
              type: "parent_decision",
              age: life.age, year: life.currentYear, roc: era.roc,
              title: `👨‍👩‍👧 父母的決定：災後舉家搬遷至${destReg.name_zh}`,
              text: `當時你才 ${life.age} 歲，遭遇「${activeDisaster.title}」重創家園後，父母徹夜商量決定帶著全家搬離受災地，前往${destReg.name_zh}重新開始。你被迫告別熟悉的家鄉與玩伴，重新適應陌生環境。`,
              impactNote: `由父母代為決定：遷居${destReg.name_zh} ｜ 幸福 -6 ｜ 人際 -7`
            });
          } else {
            life.stats.happiness -= 6;
            life.stats.health -= 2;
            life.stats.social += 4;
            life.feed.unshift({
              type: "parent_decision",
              age: life.age, year: life.currentYear, roc: era.roc,
              title: `👨‍👩‍👧 父母的決定：災後留在故鄉原地重建`,
              text: `當時你才 ${life.age} 歲，遭遇「${activeDisaster.title}」後，父母決定咬牙申請補助、留在故鄉與街坊鄰居一起整理家園原地重建。雖然生活一度克難，但鄰里互助讓你留下深刻記憶。`,
              impactNote: "由父母代為決定：留守原鄉重建 ｜ 幸福 -6 ｜ 健康 -2 ｜ 人際 +4"
            });
          }
        }
      }
    }

    maybeTriggerAmbientPeer(life, era) {
      const list = (this.data.ambientPeers && this.data.ambientPeers.vignettes) || [];
      if (!list.length) return false;
      if (life.age - (life.flags.lastPeerVignetteAge != null ? life.flags.lastPeerVignetteAge : -10) < 4) return false;
      if (Math.random() > 0.28) return false;

      const seen = life.flags.seenPeers || {};
      const pool = list.filter((v) => {
        if (seen[v.id]) return false;
        if (life.currentYear < v.year_range[0] || life.currentYear > v.year_range[1]) return false;
        if (life.age < v.age_range[0] || life.age > v.age_range[1]) return false;
        if (v.regions && !v.regions.includes(life.regionId)) return false;
        return true;
      });
      if (!pool.length) return false;

      const picked = pick(pool);
      life.flags.seenPeers = seen;
      life.flags.seenPeers[picked.id] = true;
      life.flags.lastPeerVignetteAge = life.age;
      life.feed.unshift({
        type: "peer_vignette",
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
      const isTech = Boolean((life.sector && (life.sector.includes("科技") || life.sector.includes("半導體") || life.sector.includes("軟體") || life.sector.includes("AI"))) || life.major === "stem_med");

      if (imp.wage_mult && imp.wage_mult !== 1) {
        life.flags.wage_mult = clamp((life.flags.wage_mult || 1.0) * imp.wage_mult, 0.35, 4.5);
        const p = Math.round((imp.wage_mult - 1) * 100);
        notes.push(`整體薪資倍率 ${p >= 0 ? "+" : ""}${p}%`);
      }
      if (imp.tech_wage_mult && isTech) {
        life.flags.wage_mult = clamp((life.flags.wage_mult || 1.0) * imp.tech_wage_mult, 0.35, 4.5);
        const p = Math.round((imp.tech_wage_mult - 1) * 100);
        notes.push(`科技／電資領域薪資 ${p >= 0 ? "+" : ""}${p}%`);
      }
      if (imp.non_tech_wage_mult && !isTech) {
        life.flags.wage_mult = clamp((life.flags.wage_mult || 1.0) * imp.non_tech_wage_mult, 0.35, 4.5);
        const p = Math.round((imp.non_tech_wage_mult - 1) * 100);
        notes.push(`非科技產業薪資 ${p >= 0 ? "+" : ""}${p}%`);
      }
      if (imp.region_bonus_ids && imp.region_wage_mult && life.location === "TAIWAN" && imp.region_bonus_ids.includes(life.regionId)) {
        life.flags.wage_mult = clamp((life.flags.wage_mult || 1.0) * imp.region_wage_mult, 0.35, 4.5);
        const p = Math.round((imp.region_wage_mult - 1) * 100);
        notes.push(`在地工作薪資提升 +${p}%`);
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
      if (imp.cash_subsidy_2025 && (life.flags.unemployed || life.flags.fulltime_caregiver || life.quintile <= 2)) {
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
      if (life.age - (fw.lastForecastAge != null ? fw.lastForecastAge : -10) < 3) return false;

      const candidates = events.filter((ev) => {
        if (fw.triggered[ev.id]) return false;
        if (life.currentYear < ev.year_range[0] || life.currentYear > ev.year_range[1]) return false;
        if (ev.mutually_exclusive_group && fw.groups[ev.mutually_exclusive_group]) return false;
        if (Array.isArray(ev.requires_world_flags) && !ev.requires_world_flags.every((fl) => fw.flags[fl])) return false;
        if (Array.isArray(ev.excludes_world_flags) && ev.excludes_world_flags.some((fl) => fw.flags[fl])) return false;
        if (ev.regions && !ev.regions.includes("ALL")) {
          const checkReg = life.location === "TAIWAN" ? life.regionId : life.birthRegionId;
          if (!ev.regions.includes(checkReg)) return false;
        }
        return true;
      });
      if (!candidates.length) return false;

      const picked = pick(candidates);
      const gapYrs = life.age - (fw.lastForecastAge != null ? fw.lastForecastAge : -10);
      const baseProb = picked.probability != null ? picked.probability : 0.34;
      const effProb = gapYrs >= 6 ? Math.min(0.85, baseProb + 0.35) : baseProb;
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
        commChannel: cultEra ? cultEra.overseas_comm_channel : "跨海即時串流"
      });
      return true;
    }

    // Unified option eligibility checker shared by UI, Auto Mode, and Lab
    isOptionEligible(life, opt, era) {
      if (opt.requires_siblings && life.family.siblings <= 0) {
        return { eligible: false, reason: "你是獨生子女，無法與手足分擔" };
      }
      if (opt.requires_year_min && life.currentYear < opt.requires_year_min) {
        return { eligible: false, reason: "此制度於當前年代尚未開放" };
      }
      if (opt.requires_edu === "master_or_stem" && !(life.eduLevel >= 5 || life.major === "stem_med")) {
        return { eligible: false, reason: "需具備研究所或理工電資醫藥背景" };
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
        const effSalary = Math.max(life.annualSalaryNominal || 0, era.avg_monthly_wage_twd * 10);
        if (liquidNom < spec.requiredOwnCash) {
          return {
            eligible: false,
            reason: `存款不足頭期款（需自備約 NT$${Math.round(spec.requiredOwnCash / 10000).toLocaleString()} 萬${spec.parentHelp > 0 ? "，已計入父母贊助" : ""}；目前流動資產 NT$${Math.round(liquidNom / 10000).toLocaleString()} 萬），只能先租房`
          };
        }
        if (effSalary < spec.minAnnualIncome && life.quintile < 5) {
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
        const need = Math.round((th.traditional_wedding_cost || 600000) * era.cpi);
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
      if (opt.requires_fire_assets) {
        const realAssets = this.getNetWorthNominal(life) / Math.max(0.07, era.cpi);
        if (realAssets < FIRE_ASSET_THRESHOLD_2025) {
          return {
            eligible: false,
            reason: `需實質淨資產達 NT$1,500 萬以上（目前約 NT$${Math.round(realAssets / 10000).toLocaleString()} 萬）`
          };
        }
      }
      return { eligible: true, reason: "" };
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
        homeEqNom: life.homeowner ? Math.max(0, (life.homeValueNominal || 0) - (life.mortgageBalanceNominal || 0)) : 0
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
        family: { fatherName, motherName, siblings, parentsAlive: true, parentPassedYear: null },
        education: "學齡前",
        eduLevel: 0,
        uniGradAge: 22,
        major: null,
        careerId: null,
        careerSalaryMult: 1.0,
        job: "無（年幼）",
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
        text: `你出生於 ${birthYear} 年（${toROC(birthYear)}）的${region.name_zh}（${region.counties.join("／")}），家境屬於「${quintileObj.label}」，家中有 ${siblings} 位手足；你的先天個性傾向「${personalities.map((x) => x.name).join("、")}」。${cultEra ? "當時氛圍：" + cultEra.family_gender_norm : ""}`,
        highlight: true
      });
      this.recordTrajectoryPoint(life, era);
      return life;
    }

    // Move protagonist overseas via pathway & destination country
    departOverseas(life, countryId, pathway, era) {
      const country = this.getAbroadCountry(countryId);
      if (!country) return;
      const costNom = Math.round((pathway.cost_twd_2025 || 1500000) * era.cpi);
      life.moneyNominal -= costNom;
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
        summary: `你拖著行李箱從台灣出發前往${country.name_zh}（投入初期費用約 NT$${costNom.toLocaleString()}），展開異鄉求學與生活。`,
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
      if (imp.unlock_daily_flavor) {
        const flavorTexts = {
          bank_remove_helmet: "日常制度餘波：走進銀行領錢時，警衛禮貌請你脫下安全帽與口罩（源於 1982 李師科案後規範）。",
          school_bus_safety_drill: "日常制度餘波：校外教學前，老師帶著全班實地演練開啟遊覽車安全門（源於 1992 健康幼稚園事件修法）。",
          strict_bank_kyc_questions: "日常制度餘波：去銀行開戶與匯款時，行員詳細盤查資金來源與用途（源於 2016 兆豐案後洗錢防制修法）。"
        };
        const txt = flavorTexts[imp.unlock_daily_flavor];
        if (txt && !life.flags.dailyFlavors.includes(txt)) life.flags.dailyFlavors.push(txt);
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
            life.education = `${country.name_zh}${life.eduLevel >= 5 ? "海外碩士" : "海外學士"}畢業`;
            ab.prStatus = "畢業後工作簽證";
            life.job = `${country.name_zh}跨國企業／專業職`;
            life.flags.remote_capable = life.flags.remote_capable || (life.major === "stem_med");
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
        } else if (tr.condition_type === "has_partner_childbearing" && (life.partner || life.married) && life.age >= 28 && life.age <= 40 && life.children === 0 && Math.random() < 0.18) {
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
            options: tpl.options
          };
        }
      }
      return null;
    }

    // Check 6 Study Abroad Pathways (SA01–SA06)
    checkStudyAbroadOpportunity(life, era) {
      if (life.location !== "TAIWAN" || life.everStudiedAbroad) return null;
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
        const saRate = this.hasSwitch(life.currentYear, "lift_martial_law") ? 0.052 : 0.022;
        if (Math.random() > saRate) continue;

        // Build 3 destination options + 1 stay option
        const availCountries = pw.allowed_countries
          .map((cid) => this.getAbroadCountry(cid))
          .filter(Boolean);
        const pickedCountries = availCountries.slice(0, 3);
        const estCostNom = Math.round(pw.cost_twd_2025 * era.cpi);

        const options = pickedCountries.map((c) => ({
          key: `go_${c.id}`,
          label: `${c.flag} 前往${c.name_zh}（預估花費約 NT$${estCostNom.toLocaleString()}｜當地均薪約台灣 ${c.salary_mult_vs_tw}×）`,
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
          life.job = "待業求職中";
          life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: `你順利取得${life.education}學位，正式進入職場。`, highlight: true });
        }
      }
      if (life.flags.military_gap_years > 0) {
        life.flags.military_gap_years -= 1;
        if (life.flags.military_gap_years === 0) {
          life.job = "退伍求職中";
          life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "你完成兵役義務退伍，重新銜接社會與職場。" });
        }
      }
      if (life.flags.exam_prep_years > 0) {
        life.flags.exam_prep_years -= 1;
        if (life.flags.exam_prep_years === 0) {
          const passChance = clamp(0.25 + (life.stats.knowledge - 50) * 0.006 + (life.flags.uni_civil_prep ? 0.35 : 0), 0.12, 0.85);
          if (Math.random() < passChance) {
            life.job = "公務人員／國營事業職員";
            life.sector = "軍公教／國營事業";
            life.careerSalaryMult = 1.18;
            life.flags.job_stability = 0.99;
            life.flags.unemployed = false;
            life.stats.happiness += 8;
            life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "金榜題名！你考上高普考／國營事業，獲得高度穩定的鐵飯碗工作。", highlight: true });
          } else {
            life.job = "備考落榜轉就業";
            life.flags.unemployed = false;
            life.stats.happiness -= 5;
            life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "公職國營考試些微落榜，你決定先回到民間企業累積資歷。" });
          }
        }
      }
      if (life.flags.temp_unemployed_years > 0) {
        life.flags.temp_unemployed_years -= 1;
        if (life.flags.temp_unemployed_years === 0 && !life.flags.fulltime_caregiver) {
          life.flags.unemployed = false;
          this.assignCareer(life, this.pickEraCareer(life));
        }
      }

      // 2. Focus, health aging & parents
      if (life.focus === "study") { life.stats.knowledge += 2; life.stats.happiness -= 1; }
      if (life.focus === "work") { life.stats.health -= 1.5; life.stats.social -= 0.5; }
      if (life.focus === "health") { life.stats.health += 2.2; }
      if (life.focus === "family") { life.stats.social += 2; life.stats.happiness += 1.5; }
      if (life.flags.work_hours_high && !life.flags.retired) life.stats.health -= 0.8;
      if (life.flags.career_health_drain && !life.flags.retired && life.age >= 22) life.stats.health -= life.flags.career_health_drain * 0.15;
      if (life.age > 45) life.stats.health -= (life.age > 70 ? 1.75 : 0.65);

      if (!life.flags.betel_nut_habit && life.location === "TAIWAN" && life.sex === "M" && life.age >= 22 && life.age <= 38 && life.eduLevel <= 3 && life.currentYear <= 2005 && Math.random() < 0.015) {
        life.flags.betel_nut_habit = true;
        life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "因工地／勞動職場交際染上嚼檳榔與抽菸習慣（國健署統計：嚼檳榔者罹患口腔癌機率為未嚼者的 28 倍）。" });
      }

      if (life.age >= 50 && life.family.parentsAlive && Math.random() < 0.085) {
        life.family.parentsAlive = false;
        life.family.parentPassedYear = life.currentYear;
        life.flags.monthly_care_cost_twd_2025 = 0;
        if (life.flags.fulltime_caregiver) {
          life.flags.fulltime_caregiver = false;
          life.flags.unemployed = false;
          life.job = "重返職場（二度就業）";
          life.flags.wage_mult = (life.flags.wage_mult || 1.0) * 0.78;
        }
        life.stats.happiness -= 8;
        let inheritNote = "";
        life.ownedAssets = life.ownedAssets || { vehicle: null, valuables: null };
        if (life.quintile >= 4 && !life.homeowner && Math.random() < (life.quintile === 5 ? 0.55 : 0.25)) {
          const inhSpec = this.getHomeCostSpec(life, "suburb", era);
          life.homeowner = true;
          life.homeValueNominal = Math.round(inhSpec.totalPrice * 0.85);
          life.mortgageBalanceNominal = 0;
          life.mortgageAnnualPayment = 0;
          inheritNote = `長輩留下了老家房產供你繼承（估值約 NT$${Math.round(life.homeValueNominal / 10000).toLocaleString()} 萬，免背房貸）。`;
        } else if (life.quintile >= 3 && !life.ownedAssets.valuables && Math.random() < 0.45) {
          const val2025 = life.quintile >= 5 ? 360000 : (life.quintile === 4 ? 220000 : 120000);
          life.ownedAssets.valuables = {
            name: life.quintile >= 4 ? "長輩遺留傳家金飾與名錶" : "長輩遺留紀念金飾",
            baseValue2025: val2025,
            acquiredYear: life.currentYear,
            source: "繼承"
          };
          inheritNote = `整理遺物時，你承接了「${life.ownedAssets.valuables.name}」（約值 NT$${Math.round(val2025 * era.cpi).toLocaleString()}）。`;
        }
        life.feed.unshift({
          type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
          text: (life.location === "TAIWAN"
            ? "家中長輩安詳辭世，讓你更深刻體會歲月流逝。"
            : "台灣傳來長輩辭世的消息，你緊急訂機票趕回奔喪，內心充滿不捨。") + (inheritNote ? " " + inheritNote : ""),
          highlight: Boolean(inheritNote)
        });
      }

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

      // 3. Education milestones (Taiwan or Overseas)
      if (life.location === "TAIWAN") {
        if (life.age === 6) { life.education = "國小在學"; life.eduLevel = 1; }
        if (life.age === 12 && this.hasSwitch(life.currentYear, "compulsory_9yr_ed")) {
          life.education = "國中在學"; life.eduLevel = 2;
        }
        const rollUniAdmission = (bonus) => {
          const tierBonus = life.flags.hs_tier === "top_hs" ? 0.22 : life.flags.hs_tier === "normal_hs" ? 0.05 : -0.05;
          const stageBonus = life.flags.uni_admit_bonus || 0;
          const chance = clamp(era.uni_admission_rate + (life.stats.knowledge - 50) * 0.006 + (life.quintile - 3) * 0.04 + tierBonus + stageBonus + bonus, 0.06, 0.99);
          return Math.random() < chance;
        };
        if (life.age === 18 && life.eduLevel === 3 && life.flags.max_edu_cap !== "junior_high" && !life.flags.uni_checked) {
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
        }
        if (life.eduLevel === 4 && life.education.includes("在學") && life.currentYear >= 2022 && life.major === "humanities_biz" && !life.flags.uni_closed_hit && Math.random() < 0.05) {
          life.flags.uni_closed_hit = true; life.stats.happiness -= 6;
          life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: "少子化海嘯襲來！你就讀的私立大專院校依《私校退場條例》宣布停招停辦，你由教育部協助安置轉學。", highlight: true });
        }
      } else {
        // Step overseas study, local era events, visa/PR
        this.stepOverseasLife(life, era, eduMode);
      }

      // 4. Organic northbound migration in Taiwan
      if (life.location === "TAIWAN" && life.age === 24 && !life.migrated && !life.flags.stay_home && !life.triggeredDecisions["D06_northbound_migration"]) {
        const rates = reg.out_migration_rates || {};
        const prob = rates.to_north || rates.to_west_metro || 0;
        if (prob > 0 && Math.random() < prob) {
          const dest = Math.random() < 0.65 ? "north_taipei" : "north_hsinchu";
          life.regionId = dest; life.migrated = true; life.flags.migrated_north = true;
          life.flags.wage_mult = (life.flags.wage_mult || 1.0) * 1.15;
          life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: `為了更多職缺與發展機會，你離開${reg.name_zh}北漂至${this.getRegion(dest).name_zh}租屋工作。`, highlight: true });
        }
      }

      // 5. Work, Era-Career Income, Living Expenses (deducted BEFORE stock returns) & Investments
      const inSchool = life.education.includes("在學") || life.flags.in_grad_school_years > 0 || life.flags.retaking_exam || (life.abroad && life.abroad.studyYearsLeft > 0 && life.abroad.pathwayId !== "SA05_working_holiday");
      const inMilitary = life.flags.military_gap_years > 0;
      const inExamPrep = life.flags.exam_prep_years > 0;
      const isWorking = life.age >= 18 && !life.flags.retired && !inSchool && !inMilitary && !inExamPrep && !life.flags.unemployed;
      let earnedThisYear = 0;

      if (inMilitary) {
        const milPay = this.computeCurrentAnnualSalaryNominal(life, era, reg);
        life.annualSalaryNominal = milPay;
        earnedThisYear = milPay;
      } else if (isWorking) {
        if (life.location === "TAIWAN" && (life.flags.job_stability || 0) < 0.95 && life.workYears >= 1 && Math.random() < era.unemployment_rate * 0.45) {
          life.flags.unemployed = true; life.flags.temp_unemployed_years = 1;
          if (life.currentYear < 2005) life.jobChangesPre2005 += 1;
          life.annualSalaryNominal = Math.round(era.min_wage_twd * 4);
          earnedThisYear = life.annualSalaryNominal;
          life.stats.happiness -= 7;
          life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: `景氣波動（當年失業率 ${(era.unemployment_rate * 100).toFixed(1)}%），你遭遇非自願裁員，花了一段時間重新求職。` });
        } else {
          if (life.location === "TAIWAN" && (!life.careerId || life.job === "無（年幼）" || life.job.includes("求職"))) {
            this.assignCareer(life, this.pickEraCareer(life));
          }
          life.workYears += 1;
          life.annualSalaryNominal = this.computeCurrentAnnualSalaryNominal(life, era, reg);
          earnedThisYear = life.annualSalaryNominal;
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

      // Deduct full annual living expenses FIRST (basic living + rent/mortgage + kids + eldercare)
      const annualExpenseNominal = this.calcAnnualLivingExpenseNominal(life, era, reg, isWorking && !life.flags.unemployed);
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
      life.lastMarketReturnPct = mkt.price_pct;
      life.lastMarketNote = mkt.note || "";
      life.flags.margin_called_this_year = false;

      if (life.moneyNominal > 0) {
        life.moneyNominal = Math.round(life.moneyNominal * (1 + era.deposit_rate_1yr));
      } else if (life.moneyNominal < 0) {
        const debtRate = life.flags.heavy_debt ? 0.08 : 0.035;
        life.moneyNominal = Math.round(life.moneyNominal * (1 + debtRate));
      }

      const adultAge = this.getLegalAdultAge(life.currentYear);
      if ((life.investStyle === "index_etf" || life.investStyle === "leverage") && life.age >= adultAge && !life.flags.retired && netCashflow > 0) {
        const emergencyBuffer = Math.max(Math.round(annualExpenseNominal * 0.5), Math.round(150000 * era.cpi));
        const investable = Math.max(0, life.moneyNominal - emergencyBuffer);
        const dca = Math.min(investable, Math.round(netCashflow * 0.45));
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
          const hitMarginCall = mkt.price_pct <= -0.22 || mkt.max_drawdown <= -0.32;
          if (hitMarginCall) {
            const wipeRatio = clamp(Math.abs(mkt.max_drawdown) * 1.45, 0.72, 0.94);
            life.stockNominal = Math.max(0, Math.round(beforeStock * (1 - wipeRatio)));
            const marginDebt = Math.round(beforeStock * 0.15);
            life.moneyNominal -= marginDebt;
            life.flags.margin_called_this_year = true;
            life.flags.heavy_debt = true;
            life.stats.happiness -= 22;
            const lostAmt = beforeStock - life.stockNominal + marginDebt;
            life.marketLogSummary.push(`${life.currentYear} 融資斷頭（損失約 NT$${lostAmt.toLocaleString()}）`);
            life.feed.unshift({
              type: "market_event",
              age: life.age, year: life.currentYear, roc: era.roc,
              isCrash: true,
              pct: mkt.price_pct,
              title: `📉 【史實台股融資斷頭】${life.currentYear} 年大盤劇震（全年 ${(mkt.price_pct * 100).toFixed(1)}%，盤中最大回撤 ${(mkt.max_drawdown * 100).toFixed(1)}%）`,
              text: `${mkt.note ? mkt.note + "。" : ""}你的融資槓桿部位慘遭追繳斷頭，股市資產與保證金合計蒸發約 NT$${lostAmt.toLocaleString()}，財務陷入重大危機！`
            });
          } else {
            totalRet = clamp(mkt.price_pct * 1.75 + 0.015, -0.65, 2.2);
            life.stockNominal = Math.max(0, Math.round(beforeStock * (1 + totalRet)));
          }
        } else {
          // Index / 0050 total return (historical TAIEX price return + Taiwan dividend yield)
          totalRet = mkt.price_pct + mkt.div_yield;
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
            title: `${isUp ? "📈" : "📉"} 【史實股市波動】${life.currentYear} 年加權指數 ${mkt.price_pct >= 0 ? "+" : ""}${(mkt.price_pct * 100).toFixed(1)}%`,
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

      let matchedEvents = rawMatchedEvents;
      if (!showAllHistoricalEvents && rawMatchedEvents.length > 0) {
        const nextAllowedAge = life.flags.nextHistoricalAllowedAge != null ? life.flags.nextHistoricalAllowedAge : 0;
        if (life.age >= nextAllowedAge) {
          matchedEvents = [pick(rawMatchedEvents)];
          life.flags.nextHistoricalAllowedAge = life.age + (Math.random() < 0.5 ? 2 : 3);
        } else {
          matchedEvents = [];
        }
      }

      for (const ev of matchedEvents) {
        life.triggeredEvents[ev.id] = life.currentYear;
        yearMark = "event";
        const isFilteredEdu = eduMode && ev.sensitive;
        this.applyHistoricalImpact(life, ev, era, eduMode);
        const overseasWire = life.location !== "TAIWAN";
        if (overseasWire) life.homesickness = clamp(life.homesickness + 5, 0, 100);

        // Historical Mode: check if protagonist directly becomes a party to this major event
        const protHit = historicalMode ? this.evaluateProtagonistInvolvement(life, ev, era) : null;
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
            commChannel: cultEra ? cultEra.overseas_comm_channel : "跨海新聞"
          });
        }
      }

      // 6B. Taiwan Future Forecast (台灣未來預測 — 2027+, random yet logically consistent fictional projections)
      if (life.currentYear >= 2027 && matchedEvents.length === 0) {
        if (this.maybeTriggerFutureForecast(life, era, cultEra)) {
          yearMark = "event";
        }
      }

      // 7. Taiwan Customs, Ambient Peer Vignettes (1in8b.life style), Education/Culture & Typhoon Rolls
      if (matchedEvents.length === 0) {
        const customs = (this.data.cultureEras && this.data.cultureEras.taiwan_customs) || [];
        const matchedCustom = customs.find((cu) =>
          !life.triggeredCustoms[cu.id] &&
          life.age >= cu.age_range[0] && life.age <= cu.age_range[1] &&
          (cu.stage !== "postpartum_care" || (life.childrenBirthYears || []).some((by) => life.currentYear - by >= 0 && life.currentYear - by <= 1)) &&
          Math.random() < 0.14
        );
        if (matchedCustom) {
          life.triggeredCustoms[matchedCustom.id] = true;
          if (life.location !== "TAIWAN") {
            life.homesickness = clamp(life.homesickness + (matchedCustom.homesickness_boost || 6), 0, 100);
            life.feed.unshift({
              type: "custom_card", age: life.age, year: life.currentYear, roc: era.roc,
              text: `【異鄉思鄉】透過${cultEra ? cultEra.overseas_comm_channel : "視訊"}看到台灣親友分享：${matchedCustom.text}`,
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
            const pool = [
              ...reg.flavor_tags.commute.map((x) => `${reg.name_zh}日常通勤：${x}。`),
              ...reg.flavor_tags.lifestyle.map((x) => `在地生活切片：${x}。`),
              ...(cultEra ? cultEra.daily_vignettes : []),
              ...(life.age >= 7 && life.age <= 22 && eduEra ? eduEra.flavor_events : []),
              ...(life.flags.dailyFlavors || [])
            ];
            if (pool.length) {
              life.feed.unshift({ type: "normal", age: life.age, year: life.currentYear, roc: era.roc, text: pick(pool) });
            }
          }
        }
      }

      // 7A. Parental auto-decisions for minors (age < 18) facing adult household crises
      this.resolveMinorHouseholdCrisis(life, era);

      // 7B. Ambient Peer Vignettes (偶爾顯示符合時代的周圍人物切片)
      this.maybeTriggerAmbientPeer(life, era);

      // 8. Companions & stat clamp
      this.stepCompanions(life, era);
      const maxHealthCap = life.flags.disabled ? 48 : 100;
      life.stats.health = clamp(Math.round(life.stats.health), 0, maxHealthCap);
      for (const k of ["happiness", "knowledge", "social"]) {
        life.stats[k] = clamp(Math.round(life.stats[k]), 0, 100);
      }

      // 9. Mortality roll
      const { qx, band } = this.calcAnnualDeathProb(life, era);
      life.lastSurvivalRate = 1 - qx;
      if (Math.random() < qx || life.age >= 104) {
        const cause = this.pickCauseOfDeath(life, band, eduMode);
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

      if (pendingDecision) {
        yearMark = "decision";
        if (autoMode) {
          const eligibleOpts = pendingDecision.options.filter((o) => this.isOptionEligible(life, o, era).eligible);
          const chosenOpt = eligibleOpts.length ? pick(eligibleOpts) : pendingDecision.options[0];
          this.applyDecision(life, pendingDecision, chosenOpt.key, era);
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
    evaluateHsExam(life) {
      const sys = this.data.lifeStages && this.data.lifeStages.hs_exam_system;
      if (!sys) return null;
      const examEra = sys.eras.find((e) =>
        (e.min_year == null || life.currentYear >= e.min_year) &&
        (e.max_year == null || life.currentYear <= e.max_year)
      ) || sys.eras[sys.eras.length - 1];

      const cramBonus = life.flags.hs_exam_bonus || 0;
      const quintileBonus = (life.quintile - 3) * 3.5;
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
        if (c.special === "hs_exam_year") {
          const examAge = this.hasSwitch(life.currentYear, "compulsory_9yr_ed") ? 15 : 12;
          if (life.age !== examAge) continue;
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

    findEligibleDecision(life, era, eduMode, isPauseYear, priorityOnly = false) {
      const candidates = [];
      for (const d of this.data.decisions.decisions) {
        // Skip Taiwan-local-only cards while living overseas
        if (life.location !== "TAIWAN" && ["D01_junior_high_track", "D02_university_major", "D03_exam_retake", "D04_military_service", "D05_graduation_crossroads", "D06_northbound_migration", "D09_return_hometown_dilemma", "D22_major_disaster"].includes(d.id)) {
          continue;
        }
        const c = d.conditions || {};
        const isFixedAge = c.age != null || ["D01_junior_high_track", "D02_university_major", "D05_graduation_crossroads"].includes(d.id);
        const isPriorityCard = isFixedAge || ["D04_military_service", "D17_critical_illness_cost", "D22_major_disaster", "D28_debt_clearance", "D30_forced_home_sale", "D31_cashflow_debt_crisis"].includes(d.id);
        if (priorityOnly && !isPriorityCard) continue;

        if (!d.once_per_era_variant && d.id !== "D31_cashflow_debt_crisis" && life.triggeredDecisions[d.id]) continue;
        if (!isPriorityCard && !c.trigger_events && !c.trigger_years) {
          if (isPauseYear) continue;
          if (life.age - life.lastDecisionAge < DECISION_COOLDOWN) continue;
        }

        if (d.id === "D01_junior_high_track") {
          const targetAge = this.hasSwitch(life.currentYear, "compulsory_9yr_ed") ? 15 : 12;
          if (life.age !== targetAge) continue;
        } else if (d.id === "D02_university_major") {
          const admitAge = life.uniGradAge === 23 ? 19 : 18;
          if (life.age !== admitAge || !life.flags.admitted_to_university) continue;
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
          if (inUniNow && life.age < 23) continue;
          if (!inUniNow && life.age < 20) continue;
        }
        if (c.region_not_in && c.region_not_in.includes(life.regionId)) continue;
        if (c.trigger_years && !c.trigger_years.includes(life.currentYear)) continue;
        if (c.health_below && life.stats.health >= c.health_below) continue;
        if (c.not_homeowner && life.homeowner) continue;
        if (c.no_car_yet && life.ownedAssets && life.ownedAssets.vehicle && life.ownedAssets.vehicle.type === "car") continue;
        if (c.requires_working_adult) {
          const inSchNow = life.education.includes("在學") || life.flags.in_grad_school_years > 0 || life.flags.retaking_exam;
          const workingNow = life.age >= 18 && !inSchNow && !(life.flags.military_gap_years > 0) && !life.flags.retired && !life.flags.unemployed && !life.flags.fulltime_caregiver;
          if (!workingNow) continue;
        }
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
        if (c.requires === "major_illness_diagnosed" && life.stats.health > 45) continue;
        if (c.requires_flag && !life.flags[c.requires_flag]) continue;
        if (c.no_partner_yet && (life.partner || life.married)) continue;
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
          if (!activeDisaster) continue;
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
        const exemptSkip = isFixedAge || d.id === "D04_military_service" || d.id === "D28_debt_clearance" || d.id === "D30_forced_home_sale";
        if (c.age_range && !exemptSkip && !c.trigger_years && !c.trigger_events && Math.random() > 0.36) continue;

        let resolvedTitle = (activeVariant && activeVariant.title) || d.title;
        let resolvedDesc = (activeVariant && (activeVariant.desc || activeVariant.label_context)) || `你在 ${life.currentYear} 年（${era.roc}）面臨這項人生關鍵抉擇：`;
        let resolvedSource = (activeVariant && activeVariant.source_note) || (c.note || "");

        if (d.id === "D01_junior_high_track" && !this.hasSwitch(life.currentYear, "compulsory_9yr_ed")) {
          resolvedTitle = "國小畢業升學抉擇（初中聯考時期）";
          resolvedDesc = "此時台灣義務教育僅涵蓋國小六年，升初中仍須參加聯考，家庭須決定要繼續升學或提早學藝工作。";
        } else if (d.id === "D04_military_service") {
          const months = this.getConscriptionMonths(life.birthYear, life.currentYear);
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
            ? `你在 ${life.currentYear} 年確診重大傷病！雖有全民健保提供基礎醫療保障，但先進標靶自費療程仍須約 NT$${Math.round(medNeed / 10000).toLocaleString()} 萬（目前流動資產約 NT$${Math.round(Math.max(0, liq) / 10000).toLocaleString()} 萬）。若無力負擔恐面臨病情惡化或失能風險。`
            : `你在 ${life.currentYear} 年確診重大傷病！此時台灣尚無全民強制醫療保險制度，完整自費治療須高達約 NT$${Math.round(medNeed / 10000).toLocaleString()} 萬（目前流動資產約 NT$${Math.round(Math.max(0, liq) / 10000).toLocaleString()} 萬），無力負擔恐致殘疾或早逝。`;
          resolvedSource = hasNHI ? "全民健保大幅減輕基礎醫療費，但自費標靶與經濟落差仍攸關預後" : "缺乏全民健保時期，積蓄不足常導致延誤治療、失能甚至因病而貧";
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
        if (d.id === "D07_career_track") {
          const allCars = (this.data.educationCareers && this.data.educationCareers.careers) || [];
          const eraCars = allCars.filter((car) =>
            life.currentYear >= car.era_range[0] &&
            life.currentYear <= car.era_range[1] &&
            life.eduLevel >= car.min_edu_level &&
            car.id !== "car_civil_teacher" &&
            car.id !== "car_sme_boss"
          );
          const pickBest = (ids) => eraCars.find((x) => ids.includes(x.id));
          const highGrowth = life.major === "stem_med"
            ? (pickBest(["car_hsinchu_semi", "car_software_remote", "car_doctor_lawyer", "car_export_sales", "car_craft_apprentice"]) || eraCars[0])
            : (pickBest(["car_finance_broker", "car_export_sales", "car_cram_service_mgr", "car_software_remote", "car_epz_worker"]) || eraCars[0]);
          const steadyAlt = eraCars.find((x) => highGrowth && x.id !== highGrowth.id) || highGrowth;
          const baseOpts = d.options.map((o) => {
            if (o.key === "tech_finance" && highGrowth) {
              return {
                ...o,
                label: `投入「${highGrowth.name}」（薪資倍率約 ${highGrowth.salary_mult_min}–${highGrowth.salary_mult_max}×）`,
                era_labels: null,
                effects: { ...o.effects, assign_career_id: highGrowth.id }
              };
            }
            if (o.key === "family_biz_startup") {
              const canBoss = life.currentYear >= 1970;
              if (!canBoss && steadyAlt) {
                return {
                  ...o,
                  label: `投入「${steadyAlt.name}」（薪資倍率約 ${steadyAlt.salary_mult_min}–${steadyAlt.salary_mult_max}×）`,
                  effects: { ...o.effects, assign_career_id: steadyAlt.id }
                };
              }
            }
            return o;
          });
          resolvedOptions = baseOpts;
          resolvedDesc = `你在 ${life.currentYear} 年（${era.roc}）面臨職涯跑道選擇（目前職業：${life.job}），不同產業將直接決定未來的薪資結構與工時耗損：`;
        }
        candidates.push({ ...d, options: resolvedOptions, isFixedAge, activeVariant, resolvedTitle, resolvedDesc, resolvedSource });
      }
      if (!candidates.length) return null;
      return candidates.find((x) => x.isFixedAge) || candidates.find((x) => x.id === "D22_major_disaster" || x.id === "D17_critical_illness_cost" || x.id === "D30_forced_home_sale" || x.id === "D31_cashflow_debt_crisis" || x.id === "D28_debt_clearance" || x.id === "D04_military_service") || pick(candidates);
    }

    applyDecision(life, decision, optionKey, era) {
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
          const returnBonus = life.currentYear <= 2005 ? 1.40 : 1.22;
          life.flags.wage_mult = (life.flags.wage_mult || 1.0) * returnBonus;
          life.stats.social += (ef.relationships || 14);
          life.stats.happiness += (ef.happiness || 10);
          if (life.abroad) life.abroadSummaryHistory.push(`${life.currentYear} 年自${ab.countryName}海歸返台`);
          life.abroad = null;
          life.job = `海歸專家（返台任職）`;
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
        const maxHpRet = life.flags.disabled ? 48 : 100;
        life.stats.health = clamp(Math.round(life.stats.health), 0, maxHpRet);
        for (const k of ["happiness", "knowledge", "social"]) life.stats[k] = clamp(Math.round(life.stats[k]), 0, 100);
        if (life.flags.wage_mult) life.flags.wage_mult = clamp(life.flags.wage_mult, 0.35, 4.5);
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
      if (ef.wage_mult) life.flags.wage_mult = (life.flags.wage_mult || 1.0) * ef.wage_mult;
      if (ef.starting_pay_mult) life.flags.wage_mult = (life.flags.wage_mult || 1.0) * ef.starting_pay_mult;
      if (ef.long_term_wage_mult) life.flags.wage_mult = (life.flags.wage_mult || 1.0) * ef.long_term_wage_mult;
      if (ef.midlife_mortality_mult) life.flags.midlife_mortality_mult = ef.midlife_mortality_mult;
      if (ef.savings_rate_bonus) life.flags.savings_rate_bonus = (life.flags.savings_rate_bonus || 0) + ef.savings_rate_bonus;
      if (ef.work_hours_high) life.flags.work_hours_high = true;

      if (ef.track === "top_academic") { life.education = "明星普通高中"; life.eduLevel = 3; }
      if (ef.track === "academic") { life.education = "普通高中"; life.eduLevel = 3; }
      if (ef.track === "vocational") { life.education = "高職／五專"; life.eduLevel = 3; }
      if (ef.track === "labor") { life.education = "學徒／提早就業"; life.eduLevel = Math.max(life.eduLevel, 2); life.flags.max_edu_cap = "junior_high"; }
      if (ef.hs_tier) life.flags.hs_tier = ef.hs_tier;
      if (ef.flag_set) {
        life.flags[ef.flag_set] = true;
        if (ef.flag_set === "vocational_coop" || ef.flag_set === "uni_parttime") life.flags.part_time_job = true;
      }
      if (ef.hs_exam_bonus) life.flags.hs_exam_bonus = (life.flags.hs_exam_bonus || 0) + ef.hs_exam_bonus;
      if (ef.uni_admit_bonus) life.flags.uni_admit_bonus = (life.flags.uni_admit_bonus || 0) + ef.uni_admit_bonus;
      if (ef.remote_unlock) life.flags.remote_capable = true;
      if (ef.partner_chance && !life.partner && !life.married && Math.random() < ef.partner_chance) {
        life.partner = true;
        extraLog += "（在校園活動中認識了穩定交往的伴侶）";
      }
      if (ef.unlock_night_edu) {
        life.flags.max_edu_cap = null;
        life.eduLevel = Math.max(life.eduLevel, 3);
        life.education = "夜校高職／空中大學進修";
        extraLog += "（成功解除早年學歷上限，開啟後續升遷與進修空間）";
      }
      if (ef.check_knowledge_promotion) {
        const promoChance = clamp(0.35 + (life.stats.knowledge - 50) * 0.01, 0.15, 0.88);
        if (Math.random() < promoChance) {
          life.flags.wage_mult = (life.flags.wage_mult || 1.0) * 1.22;
          life.stats.happiness += 8;
          extraLog += "（憑藉扎實知識實力順利考取專業證照並獲拔擢加薪！）";
        } else {
          life.stats.happiness -= 3;
          extraLog += "（證照差臨門一腳，但進修所學仍強化了職場競爭力）";
        }
      }
      if (ef.attempt_instant_civil_exam) {
        const civilPass = clamp(0.22 + (life.stats.knowledge - 50) * 0.008 + (life.flags.uni_civil_prep ? 0.36 : 0), 0.10, 0.88);
        if (Math.random() < civilPass) {
          life.job = "公務人員／國營事業職員";
          life.sector = "軍公教／國營事業";
          life.careerSalaryMult = 1.20;
          life.flags.job_stability = 0.99;
          life.stats.happiness += 10;
          extraLog += `（${life.flags.uni_civil_prep ? "大學打下的備考底子發揮威力，" : ""}成功金榜題名考上公職／國營事業！）`;
        } else {
          life.stats.happiness -= 5;
          extraLog += "（競爭激烈些微落榜，繼續留在原領域深耕）";
        }
      }

      if (decision.id === "D02_university_major") {
        life.major = opt.key;
        if (opt.key === "stem_med" && life.flags.hs_group_science) {
          life.stats.knowledge += 5;
          extraLog += "（高中自然組底子讓你如魚得水）";
        } else if (opt.key === "humanities_biz" && life.flags.hs_group_humanities) {
          life.stats.social += 4;
          extraLog += "（高中社會組與社團經驗讓你迅速融入系上）";
        }
        if (opt.key === "public_funded") { life.flags.job_stability = 0.99; life.sector = "軍公教／國營事業"; }
      }
      if (decision.id === "D03_exam_retake" && opt.key === "cram_school") {
        life.flags.retaking_exam = true; life.flags.top_uni_prob_bonus = ef.top_uni_prob_bonus || 0.25;
        life.education = "重考班備考中";
      }
      if (decision.id === "D04_military_service") {
        const months = this.getConscriptionMonths(life.birthYear, life.currentYear);
        if (opt.key === "conscription") {
          const gapYrs = months >= 24 ? Math.round(months / 12) : (months >= 12 ? 1 : 0);
          if (gapYrs > 0) { life.flags.military_gap_years = gapYrs; life.job = `服義務役（${months} 個月）`; }
          if (months >= 24 && life.partner && !life.married && Math.random() < (ef.relationship_breakup_prob_if_long || 0.22)) {
            life.partner = false; life.stats.happiness -= 12; extraLog = "（服役期間感情生變，遭遇兵變分手）";
          }
        } else if (opt.key === "rd_substitute") {
          if (life.currentYear < 2000) {
            const gapYrs = months >= 24 ? Math.round(months / 12) : (months >= 12 ? 1 : 0);
            if (gapYrs > 0) life.flags.military_gap_years = gapYrs;
            life.job = `義務役預官（${months} 個月）`;
            life.stats.knowledge += 4;
            life.stats.social += 4;
            life.flags.wage_mult = clamp((life.flags.wage_mult || 1.0) * 1.06, 0.35, 4.5);
            extraLog = "（考取大專預官服役，累積領導歷練與同袍人脈）";
          } else {
            life.sector = "半導體／IC 設計／AI 工程師";
            life.job = life.currentYear >= 2008 ? "研發替代役工程師" : "國防役／替代役工程師";
            life.flags.wage_mult = clamp((life.flags.wage_mult || 1.0) * 1.15, 0.35, 4.5);
          }
        } else if (opt.key === "volunteer_soldier") {
          life.sector = "軍公教／國營事業"; life.job = "志願役軍士官"; life.flags.job_stability = 0.98;
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
        life.regionId = target; life.migrated = target !== life.birthRegionId;
        if (target === "north_taipei" || target === "north_hsinchu") life.flags.migrated_north = true;
      }
      if (opt.key === "stay_home") life.flags.stay_home = true;

      if (decision.id === "D17B_romance_encounter") {
        if (ef.start_partner) {
          life.partner = true;
          extraLog = "（雙方互有好感，正式展開穩定交往關係）";
        } else if (ef.retry_romance_later) {
          delete life.triggeredDecisions["D17B_romance_encounter"];
          extraLog = "（先專注自我成長，未來仍有機會再遇良緣）";
        }
      }

      if (decision.id === "D07_career_track") {
        const allCars = (this.data.educationCareers && this.data.educationCareers.careers) || [];
        if (ef.assign_career_id) {
          const c = allCars.find((x) => x.id === ef.assign_career_id);
          if (c) {
            this.assignCareer(life, c);
            extraLog = `（轉入「${c.name}」，薪資結構改以該產業倍率 ${life.careerSalaryMult}× 計算）`;
          }
        } else if (opt.key === "civil_service") {
          life.flags.exam_prep_years = ef.exam_prep_years || 1;
          life.flags.unemployed = true;
          life.job = "全職備考高普考／國營";
        } else if (opt.key === "family_biz_startup") {
          const c = allCars.find((x) => x.id === "car_sme_boss");
          if (c) this.assignCareer(life, c);
          const boom = Math.random() < 0.45 ? 1.32 : 0.78;
          life.careerSalaryMult = +(clamp((life.careerSalaryMult || 1.2) * boom, 0.55, 3.6)).toFixed(2);
          extraLog = boom > 1 ? "（訂單穩定，獲利優於一般受薪族）" : "（營運起伏大，前期現金流吃緊）";
        }
      }

      if (decision.id === "D10_unpaid_leave") {
        if (ef.income_retention) life.flags.temp_income_mult = ef.income_retention;
        if (ef.income_gap_months) {
          life.flags.temp_income_mult = 0.65;
          if (life.currentYear < 2005) life.jobChangesPre2005 += 1;
          if (ef.sector_switch) {
            const newCar = this.pickEraCareer(life);
            if (newCar) {
              this.assignCareer(life, newCar);
              extraLog = `（轉職進入「${newCar.name}」，薪資倍率調整為 ${life.careerSalaryMult}×）`;
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
          extraLog = `（成交總價約 NT$${Math.round(spec.totalPrice / 10000).toLocaleString()} 萬，自備頭期 ${Math.round(spec.requiredOwnCash / 10000).toLocaleString()} 萬${spec.parentHelp > 0 ? "＋父母贊助" : ""}，背負房貸 ${Math.round(spec.loanAmount / 10000).toLocaleString()} 萬）`;
        } else if (ef.liquid_invest_bonus) {
          const coreOk = this.isOptionEligible(life, decision.options[0], era).eligible;
          const subOk = this.isOptionEligible(life, decision.options[1], era).eligible;
          if (!coreOk && !subOk) {
            this.recordFinancialBarrier(life, era, "因存款不足頭期款或薪資門檻，無力購屋只能繼續租房");
            // Allow one retry at age 37-46 if they later save enough!
            if (life.age < 36 && !life.flags.d13_retried) {
              life.flags.d13_retried = true;
              delete life.triggeredDecisions["D13_buying_home"];
            }
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
        const invested = Math.round(Math.max(100000 * era.cpi, Math.max(0, life.moneyNominal) * (ef.invest_ratio || 0.5)));
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
          const hit = Math.round(Math.max(200000 * era.cpi, Math.max(0, life.moneyNominal) * 0.45));
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
      if (ef.married === true) {
        life.married = true;
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
      if (ef.married === false) life.married = false;
      if (ef.children_delta) {
        life.children += ef.children_delta;
        life.childrenBirthYears = life.childrenBirthYears || [];
        for (let ci = 0; ci < ef.children_delta; ci++) {
          life.childrenBirthYears.push(life.currentYear);
        }
        if (life.location === "TAIWAN" && life.currentYear >= 2026 && ef.subsidy_post_2026_twd) {
          life.moneyNominal += ef.subsidy_post_2026_twd; extraLog = "（領取 2026 好孕三方案每胎 10 萬元生育補助）";
        }
      }
      if (decision.id === "D20_marriage_crisis") {
        if (opt.key === "divorce") {
          life.married = false; life.partner = false;
          const split = ef.asset_split || 0.5;
          if (life.moneyNominal > 0) life.moneyNominal = Math.round(life.moneyNominal * split);
          if (life.stockNominal > 0) life.stockNominal = Math.round(life.stockNominal * split);
          life.stats.happiness += (ef.short_term_happiness || -12);
          life.flags.delayedHappiness.push({ year: life.currentYear + 2, delta: ef.long_term_happiness || 8, note: "離婚兩年後，你逐漸走出低谷，重新找回生活步調。" });
          extraLog = "（雙方協議財產對半分割，開始重整人生）";
        } else if (opt.key === "move_out_counseling") {
          life.flags.stay_home = false;
          if (Math.random() < (ef.repair_prob || 0.65)) { life.stats.happiness += 6; life.stats.social += 6; extraLog = "（透過搬離原住處與諮商，伴侶關係顯著修復）"; }
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
        else if (ef.monthly_care_cost_twd_2025) { life.flags.monthly_care_cost_twd_2025 = ef.monthly_care_cost_twd_2025; extraLog = `（每月增加約 NT$${Math.round(ef.monthly_care_cost_twd_2025 * era.cpi).toLocaleString()} 長照支出）`; }
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
          this.recordFinancialBarrier(life, era, "因存款與薪資有限，無力資助子女出國留學");
          extraLog = "（現實存款與薪資無法支撐海外學費，只能遺憾婉拒子女留學夢）";
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
      if (ef.retired != null) {
        life.flags.retired = ef.retired;
        if (ef.retired) life.job = opt.key === "early_fire" ? "提早退休（FIRE）" : "退休";
      } else if (decision.id === "D25_retirement_timing" && opt.key === "second_career") {
        life.flags.wage_mult = (life.flags.wage_mult || 1.0) * (ef.income_mult || 0.55); life.job = "退而不休（二度就業）";
      }

      if (decision.id !== "D14_financial_trap") {
        if (ef.money_delta_ratio) life.moneyNominal = Math.round(life.moneyNominal * (1 + ef.money_delta_ratio));
        if (ef.money_delta_twd_2025) life.moneyNominal += Math.round(ef.money_delta_twd_2025 * era.cpi);
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

      const maxHpDec = life.flags.disabled ? 48 : 100;
      life.stats.health = clamp(Math.round(life.stats.health), 0, maxHpDec);
      for (const k of ["happiness", "knowledge", "social"]) life.stats[k] = clamp(Math.round(life.stats[k]), 0, 100);
      if (life.flags.wage_mult) life.flags.wage_mult = clamp(life.flags.wage_mult, 0.35, 4.5);

      life.decisionHistory.push({ age: life.age, year: life.currentYear, roc: era.roc, title: decision.resolvedTitle, choice: optLabel });
      life.feed.unshift({
        type: "normal", age: life.age, year: life.currentYear, roc: era.roc,
        text: `【抉擇：${decision.resolvedTitle}】你選擇了「${optLabel}」。${extraLog}`,
        salaryDeltaBadge,
        highlight: true,
        showHelpline: Boolean(life.flags.heavy_debt && (decision.id === "D10_unpaid_leave" || decision.id === "D16_relative_loan_guarantor"))
      });
    }

    runBatch(regionId, birthYear, n, eduMode, historicalMode) {
      let sumAge = 0, alive65 = 0, uni = 0, home = 0, abroad = 0, returned = 0, protHitCount = 0, protFatalCount = 0, sumRealWealth = 0, sumDecisions = 0;
      for (let i = 0; i < n; i++) {
        const l = this.createLife({ regionMode: "manual", manualRegionId: regionId, birthYear });
        while (l.alive && l.age < 105) {
          this.stepYear(l, { eduMode, historicalMode: !eduMode && Boolean(historicalMode), autoMode: true });
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
