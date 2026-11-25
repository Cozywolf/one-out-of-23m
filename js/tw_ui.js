/* === Taiwan Life Simulation UI Controller (js/tw_ui.js) — v2.0 (9 Databases) === */
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const fmtTWD = (n) => {
    const val = Math.round(n || 0);
    return (val < 0 ? "-NT$" : "NT$") + Math.abs(val).toLocaleString("zh-TW");
  };
  const STORAGE_KEY = "tw_life_sim_shelf_v2";
  const MEMORIAL_KEY = "tw_life_sim_memorial_v1";

  const state = {
    data: null,
    engine: null,
    life: null,
    rafId: null,
    lastFrameTs: 0,
    tickElapsedMs: 0,
    paused: false,
    wasPausedBeforeEndModal: false,
    speed: 1,
    autoMode: false,
    eduMode: new URLSearchParams(location.search).get("edu") === "1", // true = 重大惡性社會事件：關閉
    historicalMode: false, // 僅在 !eduMode（重大惡性社會事件：開啟）時可進一步開啟
    showAllHistoricalEvents: false, // 預設關閉：每 2–3 年隨機顯示 1 則台灣歷史事件
    showEnNotes: false,
    themeIdx: 0,
    themes: ["", "theme-dark", "theme-sepia"],
    regionMode: "birth_weight",
    selectedRegionId: "north_taipei",
    selectedYear: "random",
    pendingDecision: null,
    pendingPause: null,
    followUpDecision: null,
    wasPausedBeforeInfoModal: null,
    inspectedRegionId: null,
    obituaryLife: null,
    memorialIdx: 0,
    toastTimer: null,
    expandedEvents: {},
    mobileTab: "feed"
  };

  async function loadAllData() {
    if (location.protocol === "file:" && window.TW_DATA) {
      return window.TW_DATA;
    }
    const map = {
      regions: "./data/tw_regions.json",
      eras: "./data/tw_eras.json",
      lifetable: "./data/tw_lifetable.json",
      events: "./data/tw_events_history.json",
      decisions: "./data/tw_decisions.json",
      names: "./data/tw_names.json",
      educationCareers: "./data/tw_education_careers.json",
      cultureEras: "./data/tw_culture_eras.json",
      studyAbroad: "./data/tw_study_abroad.json",
      lifeStages: "./data/tw_life_stages.json",
      marketHistory: "./data/tw_market_history.json",
      ambientPeers: "./data/tw_ambient_peers.json",
      futureForecasts: "./data/tw_future_forecasts.json"
    };
    try {
      const entries = await Promise.all(
        Object.entries(map).map(async ([k, url]) => {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
          return [k, await res.json()];
        })
      );
      return Object.fromEntries(entries);
    } catch (err) {
      if (window.TW_DATA) {
        console.warn("[tw_ui] fetch failed, falling back to window.TW_DATA:", err);
        return window.TW_DATA;
      }
      throw err;
    }
  }

  function openInfoModal(id) {
    const el = $(id);
    if (!el) return;
    if (state.life && state.life.alive && state.wasPausedBeforeInfoModal === null) {
      state.wasPausedBeforeInfoModal = state.paused;
      state.paused = true;
      syncPlaybackControls();
    }
    el.hidden = false;
  }

  function closeInfoModal(id) {
    const el = $(id);
    if (el) el.hidden = true;
    const anyStillOpen = ["decisionModal", "pauseModal", "hukouModal", "helplineModal", "historicalConfirmModal", "endEarlyModal"]
      .some((mid) => { const m = $(mid); return m && !m.hidden; });
    if (!anyStillOpen && state.wasPausedBeforeInfoModal !== null) {
      const prev = state.wasPausedBeforeInfoModal;
      state.wasPausedBeforeInfoModal = null;
      if (state.life && state.life.alive) {
        state.paused = prev;
        if (!state.paused) state.lastFrameTs = performance.now();
        syncPlaybackControls();
      }
    }
  }

  function closeAllModals(resumeIfRunning, preservePending = false) {
    ["decisionModal", "pauseModal", "hukouModal", "helplineModal", "historicalConfirmModal", "endEarlyModal"].forEach((id) => {
      const el = $(id);
      if (el) el.hidden = true;
    });
    state.wasPausedBeforeInfoModal = null;
    if (!preservePending) {
      state.pendingDecision = null;
      state.pendingPause = null;
      state.followUpDecision = null;
    }
    if (resumeIfRunning && state.life && state.life.alive) {
      state.paused = false;
      state.lastFrameTs = performance.now();
      syncPlaybackControls();
    }
  }

  function switchView(name) {
    // U03 Fix: Guard empty life / obituary views before starting or ending a life
    if (name === "life" && !state.life) {
      showToast("請先在首頁點「開始這一段台灣人生」！");
      return;
    }
    if (name === "end" && !state.obituaryLife && (!state.life || state.life.alive)) {
      showToast("尚無已結束的人生訃聞，請先走完一段人生或至書架查看");
      return;
    }

    // U02 Fix: Preserve pendingDecision / pendingPause when leaving #view-life temporarily
    closeAllModals(false, true);
    if (name !== "life") state.paused = true;
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    const el = $("view-" + name);
    if (el) el.classList.add("active");
    document.querySelectorAll(".navbtn").forEach((b) => {
      b.classList.toggle("active", b.dataset.view === name);
    });
    if (name === "shelf") renderShelf();

    // U02 Fix: Automatically restore pending pause or decision modal when returning to #view-life
    if (name === "life" && state.life && state.life.alive) {
      if (state.pendingPause) {
        state.paused = true;
        showPauseModal(state.pendingPause, state.followUpDecision);
      } else if (state.pendingDecision) {
        state.paused = true;
        showDecisionModal(state.pendingDecision);
      }
    }
    syncPlaybackControls();
  }

  function setMobileLifeTab(tabName) {
    state.mobileTab = tabName || "feed";
    const lv = $("view-life");
    if (lv) lv.setAttribute("data-mobile-tab", state.mobileTab);
    document.querySelectorAll("#mobileLifeTabs .mob-tab-btn").forEach((b) => {
      const on = b.dataset.mtab === state.mobileTab;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", String(on));
    });
  }

  function syncTopToggles() {
    // 若關閉重大惡性社會事件，強制同步關閉史實模式
    if (state.eduMode && state.historicalMode) {
      state.historicalMode = false;
    }
    const majorOn = !state.eduMode;

    // 同步頂部與首頁的「重大惡性社會事件：開啟／關閉」按鈕
    [$("btnEduToggle"), $("btnIntroMajorToggle")].forEach((btn) => {
      if (!btn) return;
      btn.setAttribute("aria-pressed", String(majorOn));
      btn.textContent = majorOn ? "📢 重大惡性社會事件：開啟" : "🛡 重大惡性社會事件：關閉";
    });

    // 同步頂部與首頁的「史實模式」按鈕（僅於重大惡性社會事件開啟時解鎖）
    [$("btnHistoricalToggle"), $("btnIntroHistToggle")].forEach((btn) => {
      if (!btn) return;
      btn.disabled = !majorOn;
      btn.setAttribute("aria-pressed", String(state.historicalMode));
      if (!majorOn) {
        btn.textContent = "🔒 史實模式：需先開啟重大事件";
      } else {
        btn.textContent = state.historicalMode ? "🔥 史實模式：開（當事人風險）" : "⚡ 史實模式：關";
      }
    });

    $("eduBadge").hidden = majorOn;
    $("eduBannerIntro").hidden = majorOn;
    const allHistBtn = $("btnIntroAllHistToggle");
    if (allHistBtn) {
      allHistBtn.setAttribute("aria-pressed", String(state.showAllHistoricalEvents));
      allHistBtn.textContent = state.showAllHistoricalEvents ? "📚 顯示所有歷史事件：開" : "📚 顯示所有歷史事件：關";
    }
    $("histBadge").hidden = !state.historicalMode;
    $("histBannerIntro").hidden = !state.historicalMode;

    const enBtn = $("btnEnToggle");
    enBtn.setAttribute("aria-pressed", String(state.showEnNotes));
    enBtn.textContent = state.showEnNotes ? "🌐 EN 註解：開" : "🌐 EN 註解：關";

    if (state.life) renderFeed();
  }

  function handleToggleMajorEvents() {
    state.eduMode = !state.eduMode;
    if (state.eduMode) {
      state.historicalMode = false;
    }
    syncTopToggles();
  }

  function handleToggleHistoricalMode() {
    if (state.eduMode) return; // 關閉重大惡性社會事件時禁止開啟
    if (state.historicalMode) {
      state.historicalMode = false;
      syncTopToggles();
    } else {
      // 開啟前顯示指定警語供最終確認
      openInfoModal("historicalConfirmModal");
    }
  }

  function syncPlaybackControls() {
    const pauseBtn = $("btnPause");
    if (pauseBtn) {
      pauseBtn.textContent = state.paused ? "▶" : "❚❚";
      pauseBtn.setAttribute("aria-pressed", String(state.paused));
    }
    document.querySelectorAll(".ltb-speed-btn").forEach((b) => {
      const on = Number(b.dataset.speed) === state.speed;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    const autoBtn = $("btnAuto");
    if (autoBtn) {
      autoBtn.textContent = state.autoMode ? "自動：開" : "自動：關";
      autoBtn.setAttribute("aria-pressed", String(state.autoMode));
    }
  }

  function renderIntroRegionCards() {
    const container = $("introRegionCards");
    if (!container) return;
    const isManual = state.regionMode === "manual";
    container.classList.toggle("is-random-locked", !isManual);
    const hint = $("regionModeHint");
    if (hint) {
      hint.textContent = isManual ? "請點選下方大區" : "隨機抽籤中（選「自選大區」才可點選）";
    }
    container.innerHTML = "";
    for (const r of state.data.regions.regions) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.disabled = !isManual;
      btn.setAttribute("aria-disabled", String(!isManual));
      btn.className = "tw-region-card" + (isManual && r.id === state.selectedRegionId ? " selected" : "");
      btn.innerHTML = `
        <div class="tw-rc-head">
          <span class="tw-rc-name">${r.name_zh}</span>
          <span class="tw-rc-prob">出生權重 ${(r.birth_weight_estimate * 100).toFixed(1)}%</span>
        </div>
        <div class="tw-rc-sub">${r.counties.join("・")}</div>
        <div class="tw-rc-meta">均壽 ${r.life_expectancy.regional_avg} 歲 ｜ 房價所得比 ${r.house_price_to_income_ratio.regional_avg}x</div>
      `;
      if (isManual) {
        btn.addEventListener("click", () => {
          state.selectedRegionId = r.id;
          renderIntroRegionCards();
        });
      }
      container.appendChild(btn);
    }
  }

  function renderIntro() {
    renderIntroRegionCards();

    const optsHtml = state.data.regions.regions
      .map((r) => `<option value="${r.id}">${r.name_zh}</option>`).join("");
    $("labRegionA").innerHTML = optsHtml;
    $("labRegionB").innerHTML = optsHtml;
    $("labRegionA").value = "north_taipei";
    $("labRegionB").value = "east_islands";

    $("helplineList").innerHTML = state.data.lifetable.safety_and_help_resources.taiwan_helplines
      .map((h) => `<div class="tw-panel" style="padding:10px 12px;"><strong>${h.number}</strong> — ${h.name}</div>`)
      .join("");

    updateEraPreview();
  }

  function updateEraPreview() {
    if (state.selectedYear === "random") {
      $("yearSliderDisplay").textContent = "隨機（1950–2026）";
      $("eraPreviewNote").textContent = "將隨機出生於民國 39 年至 115 年間，體驗不同世代的教育資源、職涯、習俗與出國留學／海歸抉擇。";
    } else {
      const y = Number(state.selectedYear);
      const era = state.engine.getEraParams(y);
      const cult = state.engine.getCultureEra(y);
      $("yearSliderDisplay").textContent = `${y}（${era.roc}）`;
      $("eraPreviewNote").textContent = `${era.era_summary}｜${cult ? cult.label : ""}｜大學錄取率約 ${Math.round(era.uni_admission_rate * 100)}%`;
    }
  }

  function startNewLife() {
    stopTimer();
    closeAllModals(false);
    state.life = state.engine.createLife({
      regionMode: state.regionMode,
      manualRegionId: state.selectedRegionId,
      birthYear: state.selectedYear
    });
    state.paused = false;
    $("focusSelect").value = "balanced";
    switchView("life");
    state.paused = false;
    state.inspectedRegionId = null;
    state.expandedEvents = {};
    setMobileLifeTab("feed");
    resetYearCountdown();
    renderLifeAll();
    syncPlaybackControls();
    startTimer();
  }

  function getYearIntervalMs() {
    return Math.max(200, Math.round(6000 / state.speed)); // 1× = 6 秒 / 1 歲
  }

  function updateCountdownBar() {
    const bar = $("lifeBar");
    if (!bar) return;
    const intervalMs = getYearIntervalMs();
    const ratio = clamp01(state.tickElapsedMs / intervalMs);
    bar.style.transform = `scaleX(${ratio.toFixed(4)})`;
  }

  function clamp01(v) {
    return Math.max(0, Math.min(1, v));
  }

  function resetYearCountdown() {
    state.tickElapsedMs = 0;
    state.lastFrameTs = performance.now();
    updateCountdownBar();
  }

  function startTimer() {
    stopTimer();
    state.lastFrameTs = performance.now();
    const loop = (now) => {
      state.rafId = requestAnimationFrame(loop);
      const dt = Math.min(120, Math.max(0, now - state.lastFrameTs));
      state.lastFrameTs = now;
      if (state.paused || !state.life || !state.life.alive) return;
      const intervalMs = getYearIntervalMs();
      state.tickElapsedMs += dt;
      if (state.tickElapsedMs >= intervalMs) {
        state.tickElapsedMs = 0;
        updateCountdownBar();
        advanceOneYear();
      } else {
        updateCountdownBar();
      }
    };
    state.rafId = requestAnimationFrame(loop);
  }

  function stopTimer() {
    if (state.rafId) {
      cancelAnimationFrame(state.rafId);
      state.rafId = null;
    }
  }

  function advanceOneYear() {
    if (!state.life || !state.life.alive) return;
    const res = state.engine.stepYear(state.life, { eduMode: state.eduMode, historicalMode: state.historicalMode, autoMode: state.autoMode, showAllHistoricalEvents: state.showAllHistoricalEvents });
    renderLifeAll();

    if (res.ended) {
      stopTimer();
      saveToShelf(state.life);
      renderObituary(state.life);
      switchView("end");
      return;
    }
    if (res.pauseQuestion) {
      state.paused = true;
      syncPlaybackControls();
      showPauseModal(res.pauseQuestion, res.pendingDecision);
      return;
    }
    if (res.pendingDecision) {
      state.paused = true;
      syncPlaybackControls();
      showDecisionModal(res.pendingDecision);
    }
  }

  function renderLifeAll() {
    const l = state.life;
    if (!l) return;
    const era = state.engine.getEraParams(l.currentYear);
    const eduEra = state.engine.getEduEra(l.currentYear);
    const cultEra = state.engine.getCultureEra(l.currentYear);
    const reg = state.engine.getRegion(l.regionId);
    const birthReg = state.engine.getRegion(l.birthRegionId);

    $("lifeAge").innerHTML = `${l.age}<small>歲</small>`;
    $("lifeYear").textContent = `${l.currentYear}（${era.roc}）`;
    updateCountdownBar();

    $("lifePortrait").textContent = l.age < 6 ? "👶"
      : l.age < 18 ? (l.sex === "M" ? "👦" : "👧")
      : l.age < 60 ? (l.sex === "M" ? "👨" : "👩")
      : (l.sex === "M" ? "👴" : "👵");
    $("lifeName").textContent = l.name;
    $("lifeSubMeta").textContent = `${l.sex === "M" ? "男" : "女"} ｜ ${l.birthYear} 年生 ｜ 手足 ${l.family.siblings} 人`;

    if (l.location !== "TAIWAN" && l.abroad) {
      $("metaRegion").textContent = `${l.abroad.flag} ${l.abroad.countryName}（原籍 ${birthReg.name_zh}）`;
      $("overseasStatusBox").hidden = false;
      $("ovCountryLabel").textContent = `✈️ 旅居 ${l.abroad.flag} ${l.abroad.countryName}${l.abroad.commuterMode ? "（空中飛人）" : ""}`;
      $("ovPrBadge").textContent = l.abroad.prStatus;
      $("ovMetaLine").textContent = `${l.abroad.pathwayName} ｜ 已旅外 ${l.abroad.yearsAbroad} 年 ｜ 透過「${cultEra ? cultEra.overseas_comm_channel : "跨海通訊"}」關注台灣`;
      $("barHomesick").style.width = `${l.homesickness}%`;
      $("valHomesick").textContent = l.homesickness;
    } else {
      $("metaRegion").textContent = reg.name_zh + (l.migrated ? `（原籍 ${birthReg.name_zh}）` : "") + (l.everReturnedToTaiwan ? " · 海歸" : "");
      $("overseasStatusBox").hidden = true;
    }

    $("metaQuintile").textContent = `Q${l.quintile} ${l.quintileLabel}`;
    $("metaPersonality").textContent = (l.personalities || []).map((x) => x.name).join("・") || "—";
    $("metaEdu").textContent = l.education;
    $("metaJob").textContent = l.job + (l.annualSalaryNominal ? `（年薪約 ${fmtTWD(l.annualSalaryNominal)}）` : "");
    $("metaFamily").textContent = `${l.married ? "已婚" : l.partner ? "穩定交往" : "未婚"} ｜ 子女 ${l.children} 人`;
    $("metaHousing").textContent = l.location !== "TAIWAN" ? "海外租屋／居所" : (l.homeowner ? `自購屋（市值 ${fmtTWD(l.homeValueNominal)}）` : (l.flags.stay_home ? "住家裡" : "租屋"));
    $("metaSurvival").textContent = (l.lastSurvivalRate * 100).toFixed(2) + "%";

    const notes = [];
    if (l.flags.military_gap_years > 0) notes.push(`🪖 服義務役中（剩約 ${l.flags.military_gap_years} 年）`);
    if (l.flags.in_grad_school_years > 0) notes.push(`🎓 研究所就讀中（剩 ${l.flags.in_grad_school_years} 年）`);
    if (l.flags.fulltime_caregiver) notes.push("🏥 全職照顧長輩中（職涯暫停）");
    if (l.flags.monthly_care_cost_twd_2025 > 0 && l.family.parentsAlive) {
      notes.push(`💊 負擔長照月費約 ${fmtTWD(l.flags.monthly_care_cost_twd_2025 * era.cpi)}`);
    }
    if (l.flags.disabled) notes.push("🦽 因病致殘／長期失能（健康上限受限、工作收入大幅減少）");
    if (l.flags.inadequate_med_years > 0) notes.push("🏥 病情控制不佳（早逝風險升高）");
    if (l.flags.heavy_debt) notes.push("⚠️ 背負沉重債務壓力");
    if (l.flags.pendingTraps && l.flags.pendingTraps.length) notes.push(`⏳ 高息理財尚未結算（${l.flags.pendingTraps.length} 筆）`);
    const noteEl = $("lifeStatusNote");
    if (notes.length) { noteEl.textContent = notes.join(" ｜ "); noteEl.hidden = false; }
    else { noteEl.hidden = true; }

    const setBar = (idB, idV, v) => { $(idB).style.width = v + "%"; $(idV).textContent = v; };
    setBar("barHealth", "valHealth", l.stats.health);
    setBar("barHappy", "valHappy", l.stats.happiness);
    setBar("barKnow", "valKnow", l.stats.knowledge);
    setBar("barSocial", "valSocial", l.stats.social);

    const homeEq = l.homeowner ? Math.max(0, (l.homeValueNominal || 0) - (l.mortgageBalanceNominal || 0)) : 0;
    const totalNom = state.engine.getNetWorthNominal(l);
    const totalReal = Math.round(totalNom / Math.max(0.07, era.cpi));
    $("valMoneyNominal").textContent = fmtTWD(totalNom);
    $("valMoneyReal").textContent = `折合 2025 購買力約 ${fmtTWD(totalReal)}`;
    // Update mobile compact HUD strip
    if ($("mobHudLoc")) {
      $("mobHudLoc").textContent = l.location !== "TAIWAN" && l.abroad
        ? `${l.abroad.flag} ${l.abroad.countryName}`
        : `📍 ${reg.name_zh}`;
      $("mobHudHealth").textContent = `❤️ ${l.stats.health}`;
      $("mobHudHappy").textContent = `😊 ${l.stats.happiness}`;
      const absWan = Math.round(Math.abs(totalNom) / 10000);
      $("mobHudMoney").textContent = absWan >= 1
        ? `💰 ${totalNom < 0 ? "-" : ""}${absWan.toLocaleString()}萬`
        : `💰 ${fmtTWD(totalNom)}`;
    }
    const annSal = l.annualSalaryNominal || 0;
    const moSal = Math.round(annSal / 12);
    const annSalReal = Math.round(annSal / Math.max(0.07, era.cpi));
    if (annSal > 0) {
      const salTag = l.flags.retired ? "月領年金 " : (l.flags.military_gap_years > 0 ? "月餉 " : "月薪 ");
      $("valSalaryMonthly").textContent = `${salTag}${fmtTWD(moSal)}`;
      $("valSalaryAnnualReal").textContent = `年收 ${fmtTWD(annSal)}（2025 購買力 ${fmtTWD(annSalReal)}）`;
    } else {
      const noSalText = l.age < 6 ? "學齡前（無收入）"
        : l.age < 18 ? ((l.flags.part_time_job || l.flags.vocational_coop) ? "打工／建教零用金" : "在學中（僅小額零用錢）")
        : l.education.includes("在學") ? ((l.flags.part_time_job || l.flags.uni_parttime) ? "大學打工（無全職薪）" : "在學中（無全職薪資）")
        : l.flags.fulltime_caregiver ? "全職照護中（無薪）" : "待業／無全職薪資";
      $("valSalaryMonthly").textContent = noSalText;
      $("valSalaryAnnualReal").textContent = l.lastYearIncomeNominal > 0
        ? `本年零用／打工收入 ${fmtTWD(l.lastYearIncomeNominal)}`
        : "年薪 NT$0";
    }
    const netCf = l.lastYearNetCashflowNominal || 0;
    $("cashflowBreakdown").textContent = `本年收支：收入 ${fmtTWD(l.lastYearIncomeNominal || 0)} － 支出 ${fmtTWD(l.lastYearExpenseNominal || 0)} ＝ ${netCf >= 0 ? "+" : ""}${fmtTWD(netCf)}` +
      (l.lastYearForcedStockSell > 0 ? `（賣股補貼 ${fmtTWD(l.lastYearForcedStockSell)}）` : "");

    const sh = l.salaryHistory || [];
    const shDetails = $("salaryHistoryDetails");
    if (sh.length > 0 && shDetails) {
      shDetails.hidden = false;
      $("salaryHistoryCount").textContent = sh.length;
      $("salaryHistoryList").innerHTML = sh.slice(0, 8).map((r) => {
        if (r.isFutureMult) {
          return `<li><b>${r.age}歲 · ${r.choice.slice(0, 14)}</b><span>起薪倍率 ${r.pctStr}</span></li>`;
        }
        const cls = r.deltaMonthly >= 0 ? "is-up" : "is-down";
        return `<li><b>${r.age}歲 · ${r.choice.slice(0, 14)}</b><span class="${cls}">${fmtTWD(r.beforeMonthly)}→${fmtTWD(r.afterMonthly)} (${r.pctStr})</span></li>`;
      }).join("");
    } else if (shDetails) {
      shDetails.hidden = true;
    }

    $("assetBreakdown").textContent = `現金 ${fmtTWD(l.moneyNominal)} ｜ 台股 ${fmtTWD(l.stockNominal)}` +
      (l.homeowner ? ` ｜ 房淨值 ${fmtTWD(homeEq)}（房貸 ${fmtTWD(l.mortgageBalanceNominal)}）` : " ｜ 無自住房產");

    const mktEl = $("marketTickerBadge");
    if (l.lastMarketReturnPct != null && l.currentYear >= 1967) {
      const pctNum = (l.lastMarketReturnPct * 100).toFixed(1);
      const isUp = l.lastMarketReturnPct >= 0;
      mktEl.className = "mkt-badge " + (isUp ? "up" : "down");
      mktEl.textContent = `${isUp ? "📈" : "📉"} ${l.currentYear} 加權指數 ${isUp ? "+" : ""}${pctNum}%${l.lastMarketNote ? " · " + l.lastMarketNote.slice(0, 26) : ""}`;
      mktEl.title = l.lastMarketNote || "";
      mktEl.hidden = false;
    } else {
      mktEl.hidden = true;
    }

    $("lifeEraSummary").textContent = `${l.currentYear}（${era.roc}）時代背景：${era.era_summary}`;
    if (l.location !== "TAIWAN" && l.abroad) {
      const abC = state.engine.getAbroadCountry(l.abroad.countryId);
      $("lifeFlavorLine").textContent = `${l.abroad.flag} ${l.abroad.countryName}生活脈絡：${abC ? abC.summary : ""}`;
    } else {
      $("lifeFlavorLine").textContent = `${reg.name_zh}代表產業：${reg.key_industries.join("、")} ｜ 房價所得比約 ${reg.house_price_to_income_ratio.regional_avg} 倍`;
    }

    if (l.age >= 6 && l.age <= 22 && eduEra) {
      $("lifeCultureNote").textContent = `📚 ${eduEra.label}：${eduEra.shadow_education}`;
    } else if (cultEra) {
      $("lifeCultureNote").textContent = `🏮 ${cultEra.label}：${cultEra.social_atmosphere}`;
    }

    const img = $("lifeIllusImg");
    img.src = l.location !== "TAIWAN" ? "./assets/illus-world-people.jpg"
      : l.age < 12 ? "./assets/illus-baby-book.jpg"
      : l.age < 35 ? "./assets/illus-time-seed.jpg"
      : l.age < 65 ? "./assets/illus-home-cat.jpg"
      : "./assets/illus-elder-hill.jpg";

    const switches = state.engine.getActiveSwitches(l.currentYear);
    $("activeSwitches").innerHTML = switches.length
      ? switches.slice(-8).map((s) => `<span class="switch-pill on" title="${s.effect}">${s.name}</span>`).join("")
      : `<span class="muted" style="font-size:14.4px;">戒嚴與戰後初期</span>`;

    document.querySelectorAll(".tw-map-region").forEach((p) => {
      const rid = p.dataset.region;
      p.classList.toggle("active-region", l.location === "TAIWAN" && rid === l.regionId);
      p.classList.toggle("birth-region", rid === l.birthRegionId);
    });
    document.querySelectorAll(".tw-map-label").forEach((t) => {
      const rid = t.dataset.label.replace("_off", "");
      t.classList.toggle("on-active", l.location === "TAIWAN" && rid === l.regionId);
    });
    $("mapMigrationTag").textContent = l.location !== "TAIWAN" && l.abroad
      ? `✈️ 海外旅居 ${l.abroad.flag} ${l.abroad.countryName}`
      : (l.migrated ? `已遷徙至 ${reg.name_zh}` : `居住於出生地 ${reg.name_zh}`);

    $("companionsList").innerHTML = l.companions.map((c) => `
      <div class="comp-card ${c.alive ? "" : "dead"}">
        <div class="comp-head">
          <span>${c.name}（${c.sex === "M" ? "男" : "女"}）</span>
          <span>${c.alive ? c.age + " 歲" : "† " + c.deathAge + " 歲"}</span>
        </div>
        <div class="comp-tags">${c.regionName} ｜ Q${c.quintile} ｜ ${c.status}</div>
      </div>
    `).join("");

    const totalCells = Math.max(100, l.age + 1);
    let mapHtml = "";
    for (let i = 0; i < totalCells; i++) {
      const mark = l.yearMarks[i] || "";
      const cur = i === l.age ? " current" : "";
      mapHtml += `<div class="lm-cell ${mark}${cur}" title="${i} 歲（${l.birthYear + i} 年）"></div>`;
    }
    $("lifeMapGrid").innerHTML = mapHtml;

    renderMapRegionStatsCard(state.inspectedRegionId || l.regionId);
    renderSurvivalCurve(l);
    renderTrajectoryChart(l);
    syncPlaybackControls();
    renderFeed();
  }

  function renderFeed() {
    const l = state.life;
    if (!l) return;
    const helplineHtml = `
      <div class="eec-helpline">
        若本段社會紀錄觸動你的情緒，請記得你並不孤單：台灣 24 小時求助資源 <strong>1925 安心專線</strong> ｜ <strong>1995 生命線</strong> ｜ <strong>113 婦幼保護</strong> ｜ <strong>165 反詐騙</strong>
      </div>`;

    $("lifeFeedList").innerHTML = l.feed.slice(0, 55).map((item) => {
      if (item.type === "historical_protagonist") {
        return `
          <article class="protagonist-event-card">
            <div class="eec-header">
              <span class="eec-year-badge">${item.year}（${item.roc}）· 你 ${item.age} 歲</span>
              <span class="pec-badge">${item.fatal ? "🕯 史實模式 · 致命當事人結局" : "⚠️ 史實模式 · 你成為此事件當事人"}</span>
            </div>
            <h5 class="eec-title">${item.title}</h5>
            <div class="pec-reasons"><strong>觸發關聯：</strong>${item.reasons}</div>
            <p class="eec-fact">${item.narrative}</p>
            <div class="pec-impacts">人生衝擊：${item.impacts}</div>
            <div class="eec-aftermath">
              <strong>📌 這件事改變了台灣什麼（制度與社會餘波）</strong>
              ${item.aftermath}
            </div>
            ${state.showEnNotes && item.cultural_footnote_en ? `
              <div class="eec-en-note"><strong>EN Cultural Footnote:</strong>${item.cultural_footnote_en}</div>` : ""}
            <div class="eec-footer"><span>資料出處：${(item.sources || []).join("、")}</span></div>
            ${helplineHtml}
          </article>
        `;
      }
      if (item.type === "historical_edu") {
        const catClass = item.category.includes("disaster") || item.category.includes("accident") ? "cat-disaster"
          : item.category.includes("finance") ? "cat-finance"
          : item.category.includes("crime") ? "cat-crime"
          : item.category.includes("rights") ? "cat-rights" : "";
        const evKey = `tw_${item.id || item.title}_${item.year}`;
        const isOpen = Boolean(state.expandedEvents[evKey]);
        return `
          <article class="edu-event-card is-collapsible ${catClass} ${item.isFilteredEdu ? "is-edu-filtered" : ""}">
            <details class="edu-event-details" data-evkey="${evKey}" ${isOpen ? "open" : ""}>
              <summary class="edu-event-summary">
                ${item.overseasWire ? `<div class="eec-wire-badge">📨 跨海台灣快訊 · 透過「${item.commChannel}」傳來</div>` : ""}
                <div class="eec-header" style="margin-bottom:2px;">
                  <span class="eec-year-badge">${item.year}（${item.roc}）· 你 ${item.age} 歲</span>
                  <span class="eec-cat-badge">${item.isFilteredEdu ? "🛡 法制與公民重點" : (item.overseasWire ? "🇹🇼 故鄉動態" : "台灣歷史現場")}</span>
                </div>
                <div class="eec-summary-title-row">
                  <h5 class="eec-title">${item.title}</h5>
                  <span class="eec-toggle-hint" aria-hidden="true"></span>
                </div>
              </summary>
              <div class="edu-event-body">
                <p class="eec-fact">${item.summary}</p>
                <details class="eec-aftermath-spoiler">
                  <summary>📌 查看後世制度與社會餘波（可能含後續年份發展）</summary>
                  <div class="eec-aftermath" style="margin-top:6px;">
                    ${item.aftermath}
                  </div>
                </details>
                ${state.showEnNotes && item.cultural_footnote_en ? `
                  <div class="eec-en-note"><strong>EN Cultural Footnote:</strong>${item.cultural_footnote_en}</div>` : ""}
                <div class="eec-footer"><span>資料出處：${(item.sources || []).join("、")}</span></div>
                ${!state.eduMode && item.sensitive ? helplineHtml : ""}
              </div>
            </details>
          </article>
        `;
      }
      if (item.type === "overseas_event") {
        const evKey = `ov_${item.id || item.title}_${item.year}`;
        const isOpen = Boolean(state.expandedEvents[evKey]);
        return `
          <article class="edu-event-card is-collapsible is-overseas-local ${item.isFilteredEdu ? "is-edu-filtered" : ""}">
            <details class="edu-event-details" data-evkey="${evKey}" ${isOpen ? "open" : ""}>
              <summary class="edu-event-summary">
                <div class="eec-header" style="margin-bottom:2px;">
                  <span class="eec-year-badge">${item.year}（${item.roc}）· 你 ${item.age} 歲</span>
                  <span class="eec-cat-badge">${item.flag} ${item.countryName}當地現場</span>
                </div>
                <div class="eec-summary-title-row">
                  <h5 class="eec-title">${item.title}</h5>
                  <span class="eec-toggle-hint" aria-hidden="true"></span>
                </div>
              </summary>
              <div class="edu-event-body">
                <p class="eec-fact">${item.summary}</p>
                <div class="eec-aftermath">
                  <strong>🌏 對旅外台灣人的影響</strong>
                  ${item.impactNote}
                </div>
                ${state.showEnNotes && item.cultural_footnote_en ? `
                  <div class="eec-en-note"><strong>EN Cultural Footnote:</strong>${item.cultural_footnote_en}</div>` : ""}
                ${!state.eduMode && item.sensitive ? helplineHtml : ""}
              </div>
            </details>
          </article>
        `;
      }
      if (item.type === "market_event") {
        return `
          <article class="market-event-card ${item.isCrash ? "is-crash" : ""}">
            <div class="feed-item-head"><span>${item.age} 歲</span><span>${item.year}（${item.roc}）</span></div>
            <div style="font-weight:700;margin-bottom:4px;">${item.title}</div>
            <div>${item.text}</div>
          </article>
        `;
      }
      if (item.type === "future_forecast") {
        const ffKey = `ff_${item.id || item.title}_${item.year}`;
        const isOpen = Boolean(state.expandedEvents[ffKey]);
        const impactHtml = (item.impactNotes && item.impactNotes.length)
          ? `<div class="ff-impacts"><strong>⚡ 對你的實際影響：</strong>${item.impactNotes.join(" ｜ ")}</div>`
          : "";
        return `
          <article class="edu-event-card is-collapsible is-future-forecast">
            <details class="edu-event-details" data-evkey="${ffKey}" ${isOpen ? "open" : ""}>
              <summary class="edu-event-summary">
                ${item.overseasWire ? `<div class="eec-wire-badge">📡 跨海未來快訊 · 透過「${item.commChannel}」傳來</div>` : ""}
                <div class="eec-header" style="margin-bottom:2px;">
                  <span class="eec-year-badge is-future-badge">${item.year}（${item.roc}）· 你 ${item.age} 歲</span>
                  <span class="eec-cat-badge is-future-cat">🔮 台灣未來預測</span>
                </div>
                <div class="eec-summary-title-row">
                  <h5 class="eec-title">${item.title}</h5>
                  <span class="eec-toggle-hint" aria-hidden="true"></span>
                </div>
              </summary>
              <div class="edu-event-body">
                <p class="eec-fact">${item.summary}</p>
                ${impactHtml}
                <div class="eec-aftermath is-future-aftermath">
                  <strong>🔭 可能的制度與社會影響（未來推演）</strong>
                  ${item.aftermath}
                </div>
                ${state.showEnNotes && item.cultural_footnote_en ? `
                  <div class="eec-en-note"><strong>EN Forecast Note:</strong>${item.cultural_footnote_en}</div>` : ""}
                <div class="eec-footer"><span>${item.trend_basis}</span></div>
              </div>
            </details>
          </article>
        `;
      }
      if (item.type === "peer_vignette") {
        return `
          <article class="peer-vignette-card">
            <div class="feed-item-head">
              <span class="pv-tag">🕊 周圍人的身影 · ${item.relation}</span>
              <span>${item.age} 歲 · ${item.year}（${item.roc}）</span>
            </div>
            <div class="pv-text">${item.text}</div>
            ${item.historical_note ? `<div class="pv-hist-note">📎 時代數據參照：${item.historical_note}</div>` : ""}
          </article>
        `;
      }
      if (item.type === "custom_card") {
        return `
          <div class="custom-event-card">
            <div class="feed-item-head"><span>${item.age} 歲</span><span>${item.year}（${item.roc}）</span></div>
            <div>${item.text}</div>
            ${state.showEnNotes && item.cultural_footnote_en ? `
              <div class="eec-en-note" style="margin-top:6px;margin-bottom:0;"><strong>EN Cultural Footnote:</strong>${item.cultural_footnote_en}</div>` : ""}
          </div>
        `;
      }
      return `
        <div class="feed-item ${item.highlight ? "is-highlight" : ""}">
          <div class="feed-item-head"><span>${item.age} 歲</span><span>${item.year}（${item.roc}）</span></div>
          <div>${item.text}</div>
          ${item.salaryDeltaBadge ? `<div class="salary-delta-pill">${item.salaryDeltaBadge}</div>` : ""}
          ${!state.eduMode && item.showHelpline ? helplineHtml : ""}
        </div>
      `;
    }).join("");
  }


  function showToast(msg, ms = 2200) {
    const el = $("twToast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    if (state.toastTimer) clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => { el.hidden = true; }, ms);
  }

  // === P2-1: Interactive Taiwan 6-Region Map Stats Card ===
  function renderMapRegionStatsCard(regionId) {
    const card = $("mapRegionStatsCard");
    if (!card || !state.engine) return;
    const reg = state.engine.getRegion(regionId || (state.life ? state.life.regionId : "north_taipei"));
    if (!reg) return;
    const isCurrent = state.life && state.life.location === "TAIWAN" && state.life.regionId === reg.id;
    const isBirth = state.life && state.life.birthRegionId === reg.id;
    const tags = [];
    if (isCurrent) tags.push("目前居住");
    if (isBirth) tags.push("出生地");

    document.querySelectorAll(".tw-map-region").forEach((p) => {
      p.classList.toggle("inspected-region", p.dataset.region === reg.id);
    });

    const sw = reg.sector_weights || {};
    const off = reg.life_expectancy.offset_from_national;
    const offStr = off > 0 ? `+${off}` : `${off}`;
    card.innerHTML = `
      <div class="msc-head">
        <span class="msc-name">${reg.name_zh}${tags.length ? `（${tags.join("・")}）` : ""}</span>
        <span class="msc-counties">點擊／滑過地圖看各區</span>
      </div>
      <div class="msc-counties">${reg.counties.join("、")}</div>
      <div class="msc-grid">
        <div class="msc-kv"><span>出生抽籤權重</span><b>${(reg.birth_weight_estimate * 100).toFixed(1)}%</b></div>
        <div class="msc-kv"><span>平均壽命（對照全國）</span><b>${reg.life_expectancy.regional_avg} 歲（${offStr}）</b></div>
        <div class="msc-kv"><span>家戶所得倍數</span><b>${reg.income_multiplier.toFixed(2)}×</b></div>
        <div class="msc-kv"><span>房價所得比</span><b>${reg.house_price_to_income_ratio.regional_avg} 倍</b></div>
      </div>
      <div class="msc-sectors">
        產業結構：農 ${Math.round((sw.agriculture || 0) * 100)}% ／ 工科 ${Math.round((sw.industry_tech || 0) * 100)}% ／ 服務 ${Math.round((sw.services || 0) * 100)}%<br/>
        代表產業：${reg.key_industries.join("、")}
      </div>
    `;
  }

  // === P2-2: Survival Curve SVG (Region vs Taiwan National Average) ===
  function renderSurvivalCurve(l) {
    const wrap = $("survivalCurveSvgWrap");
    if (!wrap || !l || !state.engine) return;
    const data = state.engine.computeSurvivalCurves(l);
    const W = 340, H = 165;
    const padL = 36, padR = 12, padT = 16, padB = 26;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;
    const px = (age) => +(padL + (age / 100) * plotW).toFixed(1);
    const py = (surv) => +(padT + (1 - surv) * plotH).toFixed(1);

    const toPath = (pts) => pts.filter((_, i) => i % 2 === 0 || i === 100)
      .map((p, idx) => `${idx === 0 ? "M" : "L"}${px(p.age)},${py(p.surv)}`).join(" ");

    const regPath = toPath(data.regionCurve);
    const natPath = toPath(data.nationalCurve);
    const curAge = Math.min(100, l.age);
    const cx = px(curAge);
    const cy = py(data.currentRegionSurv);

    $("survCurveSub").textContent = `${data.regionName} vs 全台平均（${l.birthYear}年${l.sex === "M" ? "男" : "女"}）`;
    wrap.innerHTML = `
      <svg class="chart-svg" viewBox="0 0 ${W} ${H}" aria-label="台灣存活曲線圖">
        <line x1="${padL}" y1="${py(0.5)}" x2="${W - padR}" y2="${py(0.5)}" stroke="var(--line)" stroke-dasharray="3 3" stroke-width="1"/>
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${H - padB}" stroke="var(--ink-3)" stroke-width="1"/>
        <line x1="${padL}" y1="${H - padB}" x2="${W - padR}" y2="${H - padB}" stroke="var(--ink-3)" stroke-width="1"/>
        <text x="${padL - 5}" y="${padT + 4}" text-anchor="end" font-size="10" fill="var(--ink-3)">100%</text>
        <text x="${padL - 5}" y="${py(0.5) + 3}" text-anchor="end" font-size="10" fill="var(--ink-3)">50%</text>
        <text x="${padL - 5}" y="${H - padB + 3}" text-anchor="end" font-size="10" fill="var(--ink-3)">0%</text>
        <text x="${padL}" y="${H - 8}" text-anchor="start" font-size="10" fill="var(--ink-3)">0歲</text>
        <text x="${px(50)}" y="${H - 8}" text-anchor="middle" font-size="10" fill="var(--ink-3)">50歲</text>
        <text x="${px(80)}" y="${H - 8}" text-anchor="middle" font-size="10" fill="var(--ink-3)">80歲</text>
        <text x="${W - padR}" y="${H - 8}" text-anchor="end" font-size="10" fill="var(--ink-3)">100</text>
        <path d="${natPath}" fill="none" stroke="var(--ink-3)" stroke-width="1.6" stroke-dasharray="4 3"/>
        <path d="${regPath}" fill="none" stroke="var(--accent)" stroke-width="2.4"/>
        <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${H - padB}" stroke="var(--gold)" stroke-width="1" stroke-dasharray="2 2"/>
        <circle cx="${cx}" cy="${cy}" r="5" fill="#d97706" stroke="var(--bg)" stroke-width="1.8"/>
      </svg>
      <div class="chart-legend">
        <span class="chart-leg-item"><i class="chart-leg-swatch" style="background:var(--accent);"></i>${data.regionName}</span>
        <span class="chart-leg-item"><i class="chart-leg-swatch dashed"></i>全台平均</span>
        <span class="chart-leg-item"><i class="chart-leg-swatch" style="background:#d97706;"></i>目前 ${l.age} 歲</span>
      </div>
    `;
    $("survivalCurveCaption").textContent =
      `同年同性別者在 ${l.age} 歲仍存活約 ${(data.currentRegionSurv * 100).toFixed(1)}%（活到 65 歲 ${(data.survAt65Region * 100).toFixed(0)}% ／ 80 歲 ${(data.survAt80Region * 100).toFixed(0)}%）。`;
  }

  // === P2-3: 5-Dimension Lifetime Trajectory SVG (Health / Happiness / Knowledge / Social / Real Assets) ===
  function buildTrajectorySvg(traj, W = 340, H = 175) {
    const pts = (traj && traj.length) ? traj : [{ age: 0, health: 80, happiness: 72, knowledge: 45, social: 62, assetScore: 22 }];
    const padL = 32, padR = 12, padT = 14, padB = 26;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;
    const maxAge = Math.max(15, pts[pts.length - 1].age);
    const px = (age) => +(padL + (age / maxAge) * plotW).toFixed(1);
    const py = (val) => +(padT + (1 - Math.max(0, Math.min(100, val)) / 100) * plotH).toFixed(1);

    const dims = [
      { key: "health", color: "#2B7A4E", width: 2.0 },
      { key: "happiness", color: "#d97706", width: 1.8 },
      { key: "knowledge", color: "#2563eb", width: 1.8 },
      { key: "social", color: "#9333ea", width: 1.8 },
      { key: "assetScore", color: "#8C1D3C", width: 2.4 }
    ];

    const last = pts[pts.length - 1];
    const paths = dims.map((d) => {
      if (pts.length === 1) {
        return `<circle cx="${px(last.age)}" cy="${py(last[d.key])}" r="3.2" fill="${d.color}"/>`;
      }
      const dStr = pts.map((p, idx) => `${idx === 0 ? "M" : "L"}${px(p.age)},${py(p[d.key])}`).join(" ");
      return `<path d="${dStr}" fill="none" stroke="${d.color}" stroke-width="${d.width}" stroke-linejoin="round"/>
              <circle cx="${px(last.age)}" cy="${py(last[d.key])}" r="3" fill="${d.color}" stroke="var(--bg)" stroke-width="1"/>`;
    }).join("");

    const midAge = Math.round(maxAge / 2);
    return `
      <svg class="chart-svg" viewBox="0 0 ${W} ${H}" aria-label="5面向終身軌跡圖">
        <line x1="${padL}" y1="${py(50)}" x2="${W - padR}" y2="${py(50)}" stroke="var(--line)" stroke-dasharray="3 3" stroke-width="1"/>
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${H - padB}" stroke="var(--ink-3)" stroke-width="1"/>
        <line x1="${padL}" y1="${H - padB}" x2="${W - padR}" y2="${H - padB}" stroke="var(--ink-3)" stroke-width="1"/>
        <text x="${padL - 5}" y="${padT + 4}" text-anchor="end" font-size="10" fill="var(--ink-3)">100</text>
        <text x="${padL - 5}" y="${py(50) + 3}" text-anchor="end" font-size="10" fill="var(--ink-3)">50</text>
        <text x="${padL - 5}" y="${H - padB + 3}" text-anchor="end" font-size="10" fill="var(--ink-3)">0</text>
        <text x="${padL}" y="${H - 8}" text-anchor="start" font-size="10" fill="var(--ink-3)">0歲</text>
        <text x="${px(midAge)}" y="${H - 8}" text-anchor="middle" font-size="10" fill="var(--ink-3)">${midAge}歲</text>
        <text x="${W - padR}" y="${H - 8}" text-anchor="end" font-size="10" fill="var(--ink-3)">${maxAge}歲</text>
        ${paths}
      </svg>
    `;
  }

  function renderTrajectoryChart(l) {
    const wrap = $("trajectorySvgWrap");
    if (!wrap || !l) return;
    wrap.innerHTML = buildTrajectorySvg(l.trajectory, 340, 175);
    const pts = l.trajectory || [];
    const peakReal = pts.reduce((m, p) => Math.max(m, p.realNetWorthTwd || 0), 0);
    $("trajectoryCaption").textContent =
      `實質資產曲線採對數正規化（0–100）；目前生涯最高實質淨資產約 ${fmtTWD(peakReal)}（2025 購買力）。`;
  }

  // === P2-4: Memorial Wall State & Rendering ===
  function loadMemorialState() {
    try { return JSON.parse(localStorage.getItem(MEMORIAL_KEY) || '{"candles":{},"hearts":{}}'); }
    catch (_) { return { candles: {}, hearts: {} }; }
  }
  function saveMemorialState(ms) {
    try { localStorage.setItem(MEMORIAL_KEY, JSON.stringify(ms)); } catch (_) {}
  }

  function renderMemorialWall(list) {
    const emptyEl = $("memorialEmpty");
    const contentEl = $("memorialContent");
    if (!emptyEl || !contentEl) return;
    if (!list || !list.length) {
      emptyEl.hidden = false;
      contentEl.hidden = true;
      return;
    }
    emptyEl.hidden = true;
    contentEl.hidden = false;
    if (state.memorialIdx >= list.length || state.memorialIdx < 0) state.memorialIdx = 0;
    const item = list[state.memorialIdx];
    const ms = loadMemorialState();
    const candles = (ms.candles && ms.candles[item.id]) || 0;
    const hearts = (ms.hearts && ms.hearts[item.id]) || 0;
    const snap = item.snapshot;
    const quote = (snap && snap.reflections && snap.reflections.length)
      ? `「${snap.reflections[snap.reflections.length - 1].text}」（${snap.reflections[snap.reflections.length - 1].age} 歲留語）`
      : `生於 ${item.birthYear} 年的${item.region}，在 ${item.endYear} 年走完 ${item.age} 歲的台灣人生。`;

    $("memorialCounter").textContent = `${state.memorialIdx + 1} / ${list.length}`;
    $("memorialCard").innerHTML = `
      <div class="tw-mem-name">${item.name}${candles > 0 ? ` <span style="font-size:18px;">🕯️×${candles}</span>` : ""}</div>
      <div class="tw-mem-meta">${item.birthYear} – ${item.endYear}（享年 ${item.age} 歲）｜ ${item.region} ｜ ${item.abroad || "在台"}</div>
      <div class="tw-mem-meta" style="font-size:13.5px;">離世原因：${item.cause}</div>
      <div class="tw-mem-quote">${quote}</div>
    `;
    $("memorialCounters").innerHTML = `
      <span>🕯️ 已點 ${candles} 支蠟燭</span>
      <span>🤍 已被記在心裡 ${hearts} 次</span>
    `;
    $("btnMemCandle").onclick = () => {
      const m = loadMemorialState();
      m.candles[item.id] = (m.candles[item.id] || 0) + 1;
      saveMemorialState(m);
      renderMemorialWall(list);
      showToast(`已為 ${item.name} 點上一支蠟燭 🕯️`);
    };
    $("btnMemHeart").onclick = () => {
      const m = loadMemorialState();
      m.hearts[item.id] = (m.hearts[item.id] || 0) + 1;
      saveMemorialState(m);
      renderMemorialWall(list);
      showToast(`已將 ${item.name} 的人生記在心裡 🤍`);
    };
    $("btnMemReopen").onclick = () => reopenShelfLife(item);
  }

  function reopenShelfLife(item) {
    if (!item || !item.snapshot) {
      showToast("此為舊版精簡紀錄，無完整軌跡快照可供重開");
      return;
    }
    state.obituaryLife = item.snapshot;
    renderObituary(item.snapshot);
    switchView("end");
    showToast(`已重新開啟 ${item.name} 的完整訃聞與軌跡`);
  }

  // === P2-5: Pure Canvas 2D High-DPI PNG Certificate Exporters (100% file:// safe) ===
  function drawCertificateBase(ctx, W, H, headerLeft, headerRight) {
    // Parchment background
    ctx.fillStyle = "#faf7f0";
    ctx.fillRect(0, 0, W, H);
    // Subtle guilloche ellipses
    ctx.save();
    ctx.strokeStyle = "rgba(140, 29, 60, 0.08)";
    ctx.lineWidth = 1;
    for (let r = 40; r < W * 0.72; r += 26) {
      ctx.beginPath();
      ctx.ellipse(W / 2, H / 2, r, r * 0.56, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(43, 122, 78, 0.06)";
    for (let r = 30; r < W * 0.68; r += 32) {
      ctx.beginPath();
      ctx.ellipse(W / 2, H / 2, r * 0.85, r * 0.48, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // Double certificate frame
    ctx.strokeStyle = "#8C1D3C";
    ctx.lineWidth = 3;
    ctx.strokeRect(14, 14, W - 28, H - 28);
    ctx.strokeStyle = "#2B7A4E";
    ctx.lineWidth = 1.2;
    ctx.strokeRect(22, 22, W - 44, H - 44);

    // Top crimson band
    ctx.fillStyle = "#8C1D3C";
    ctx.fillRect(28, 30, W - 56, 56);
    ctx.fillStyle = "#ffffff";
    ctx.font = '700 22px "Noto Serif TC", "Source Han Serif TC", serif';
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillText(headerLeft, 48, 58);
    ctx.textAlign = "right";
    ctx.font = '600 17px "Noto Serif TC", "Source Han Serif TC", serif';
    ctx.fillText(headerRight, W - 48, 58);
  }

  function drawSealStamp(ctx, cx, cy, line1, line2) {
    ctx.save();
    ctx.strokeStyle = "rgba(140, 29, 60, 0.72)";
    ctx.fillStyle = "rgba(140, 29, 60, 0.78)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 38, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 33, 0, Math.PI * 2);
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = '700 13px "Noto Serif TC", serif';
    ctx.fillText(line1, cx, cy - 8);
    ctx.font = '600 11px "Noto Serif TC", serif';
    ctx.fillText(line2, cx, cy + 10);
    ctx.restore();
  }

  function triggerCanvasPngDownload(canvas, filename) {
    try {
      canvas.toBlob((blob) => {
        if (!blob) { showToast("無法產生 PNG 圖片"); return; }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 6000);
        showToast(`已下載 ${filename}`);
      }, "image/png");
    } catch (err) {
      showToast("匯出失敗：" + err.message);
    }
  }

  function downloadHukouCardPNG(l) {
    if (!l || !state.engine) return;
    const W = 800, H = 560, scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = W * scale; canvas.height = H * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    const birthReg = state.engine.getRegion(l.birthRegionId);
    const era = state.engine.getEraParams(l.birthYear);
    drawCertificateBase(ctx, W, H, "🇹🇼 生在台灣 · 戶籍出生登記卡", `${l.birthYear} 年（${era.roc}）`);

    ctx.textAlign = "center";
    ctx.fillStyle = "#8C1D3C";
    ctx.font = '700 34px "Noto Serif TC", serif';
    ctx.fillText(l.name, W / 2, 130);

    ctx.fillStyle = "#4a4a4a";
    ctx.font = '600 16px "Noto Serif TC", serif';
    ctx.fillText(`${l.sex === "M" ? "男" : "女"} ｜ ${birthReg.name_zh}（${birthReg.counties.join("／")}）`, W / 2, 166);

    const rows = [
      ["出生年分", `${l.birthYear} 年（${era.roc}）`],
      ["父母姓名", `父：${l.family.fatherName} ／ 母：${l.family.motherName}（手足 ${l.family.siblings} 人）`],
      ["出身家境", `Q${l.quintile} ${l.quintileLabel}`],
      ["先天個性", (l.personalities || []).map((x) => x.name).join("・") || "—"],
      ["地區基準", `平均壽命 ${birthReg.life_expectancy.regional_avg} 歲 ｜ 房價所得比 ${birthReg.house_price_to_income_ratio.regional_avg} 倍`],
      ["時代背景", (era.era_summary || "").slice(0, 36)]
    ];

    let y = 212;
    for (const [k, v] of rows) {
      ctx.strokeStyle = "#d6d1c0";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(56, y + 20); ctx.lineTo(W - 56, y + 20); ctx.stroke();
      ctx.textAlign = "left";
      ctx.fillStyle = "#7a7a7a";
      ctx.font = '600 15px "Noto Serif TC", serif';
      ctx.fillText(k, 64, y);
      ctx.fillStyle = "#1a1a1a";
      ctx.font = '700 16px "Noto Serif TC", serif';
      ctx.fillText(v, 180, y);
      y += 44;
    }

    drawSealStamp(ctx, W - 102, H - 94, "生在台灣", "出生登記");
    ctx.textAlign = "left";
    ctx.fillStyle = "#7a7a7a";
    ctx.font = '600 12px "Noto Serif TC", serif';
    ctx.fillText("生在台灣 v5.0 · 基於台灣官方統計之微觀人生模擬（非真實人物紀錄）", 48, H - 44);

    triggerCanvasPngDownload(canvas, `生在台灣-出生卡-${l.name}-${l.birthYear}.png`);
  }

  function downloadLifeCertPNG(l) {
    if (!l || !state.engine) return;
    const W = 840, H = 640, scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = W * scale; canvas.height = H * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    const birthReg = state.engine.getRegion(l.birthRegionId);
    const endLoc = l.location !== "TAIWAN" && l.abroad
      ? `${l.abroad.flag} ${l.abroad.countryName}`
      : state.engine.getRegion(l.regionId).name_zh;
    const endEra = state.engine.getEraParams(l.currentYear);
    const totalReal = Math.round(state.engine.getNetWorthNominal(l) / Math.max(0.07, endEra.cpi));

    drawCertificateBase(ctx, W, H, "🇹🇼 生在台灣 · 人生紀事證書", `${l.birthYear} – ${l.currentYear}`);

    ctx.textAlign = "center";
    ctx.fillStyle = "#8C1D3C";
    ctx.font = '700 36px "Noto Serif TC", serif';
    ctx.fillText(`${l.name}（享年 ${l.age} 歲）`, W / 2, 132);

    ctx.fillStyle = "#4a4a4a";
    ctx.font = '600 16px "Noto Serif TC", serif';
    ctx.fillText(`${l.sex === "M" ? "男" : "女"} ｜ ${birthReg.name_zh}（Q${l.quintile}）→ ${endLoc} ｜ 個性：${(l.personalities || []).map((x) => x.name).join("、") || "—"}`, W / 2, 168);

    const rows = [
      ["離世原因", l.causeOfDeath ? l.causeOfDeath.label : "結束模擬"],
      ["學歷與職涯", `${l.education} ／ ${l.job}`],
      ["家庭與居住", `${l.married ? "已婚" : "未婚"}・子女 ${l.children} 人・${l.homeowner ? "自購房屋" : "租屋"}`],
      ["海外足跡", (l.abroadSummaryHistory && l.abroadSummaryHistory.length) ? l.abroadSummaryHistory.join(" → ").slice(0, 38) : "終身立足台灣"],
      ["期末實質資產", `折合 2025 購買力約 ${fmtTWD(totalReal)}（關鍵抉擇 ${l.decisionHistory ? l.decisionHistory.length : 0} 次）`]
    ];

    let y = 212;
    for (const [k, v] of rows) {
      ctx.strokeStyle = "#d6d1c0";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(56, y + 18); ctx.lineTo(W - 56, y + 18); ctx.stroke();
      ctx.textAlign = "left";
      ctx.fillStyle = "#7a7a7a";
      ctx.font = '600 15px "Noto Serif TC", serif';
      ctx.fillText(k, 64, y);
      ctx.fillStyle = "#1a1a1a";
      ctx.font = '700 16px "Noto Serif TC", serif';
      ctx.fillText(v, 195, y);
      y += 40;
    }

    // Mini 5-dimension trajectory sparkline inside the certificate
    const traj = l.trajectory || [];
    if (traj.length >= 2) {
      const gx = 64, gy = 432, gw = W - 210, gh = 115;
      ctx.fillStyle = "#f4f1eb";
      ctx.fillRect(gx, gy, gw, gh);
      ctx.strokeStyle = "#d6d1c0";
      ctx.lineWidth = 1;
      ctx.strokeRect(gx, gy, gw, gh);
      ctx.fillStyle = "#7a7a7a";
      ctx.font = '600 12px "Noto Serif TC", serif';
      ctx.textAlign = "left";
      ctx.fillText("5 面向終身軌跡（綠健康・橘幸福・藍知識・紫人際・紅實質資產）", gx + 8, gy - 8);

      const maxA = Math.max(10, traj[traj.length - 1].age);
      const dims = [
        ["health", "#2B7A4E"],
        ["happiness", "#d97706"],
        ["knowledge", "#2563eb"],
        ["social", "#9333ea"],
        ["assetScore", "#8C1D3C"]
      ];
      for (const [dk, col] of dims) {
        ctx.beginPath();
        ctx.strokeStyle = col;
        ctx.lineWidth = dk === "assetScore" ? 2.4 : 1.7;
        traj.forEach((p, idx) => {
          const x = gx + 6 + (p.age / maxA) * (gw - 12);
          const py = gy + gh - 6 - (Math.max(0, Math.min(100, p[dk] || 0)) / 100) * (gh - 12);
          if (idx === 0) ctx.moveTo(x, py);
          else ctx.lineTo(x, py);
        });
        ctx.stroke();
      }
    }

    drawSealStamp(ctx, W - 92, H - 104, "生在台灣", "生命紀事");
    ctx.textAlign = "left";
    ctx.fillStyle = "#7a7a7a";
    ctx.font = '600 12px "Noto Serif TC", serif';
    ctx.fillText("生在台灣 v5.0 · 基於台灣真實生命表與現代史之統計模擬（非真實人物預測）", 48, H - 40);

    triggerCanvasPngDownload(canvas, `生在台灣-生命證書-${l.name}-${l.birthYear}-${l.currentYear}.png`);
  }

  function showDecisionModal(dec) {
    state.pendingDecision = dec;
    const era = state.engine.getEraParams(state.life.currentYear);
    $("decBadge").textContent = dec.isStudyAbroadCard ? "✈️ 出國留學契機" : dec.id === "D27_return_to_taiwan" ? "🇹🇼 返台或留外抉擇" : dec.isLifeStageCard ? "🌱 人生階段與環境養成" : dec.id === "D28_debt_clearance" ? "⚖️ 消債條例更生抉擇" : dec.id === "D29_child_study_abroad" ? "🎓 子女留學與家庭資源" : dec.id === "D30_forced_home_sale" ? "🏚 金融危機與賣房抉擇" : "人生抉擇";
    $("decYearTag").textContent = `${state.life.currentYear}（${era.roc}）· ${state.life.age} 歲`;
    $("decTitle").textContent = dec.resolvedTitle;
    $("decDesc").textContent = dec.resolvedDesc;
    const trendText = state.engine.getDecisionSocialTrend(state.life, dec, era);
    const trendEl = $("decTrendBox");
    if (trendEl) {
      if (trendText) { trendEl.textContent = trendText; trendEl.hidden = false; }
      else { trendEl.hidden = true; }
    }
    $("decSourceNote").textContent = dec.resolvedSource ? `參考脈絡：${dec.resolvedSource}` : "";

    const wrap = $("decOptions");
    wrap.innerHTML = "";
    for (const opt of dec.options) {
      const check = state.engine.isOptionEligible(state.life, opt, era);
      const btn = document.createElement("button");
      btn.className = "tw-region-card";
      btn.disabled = !check.eligible;
      const displayLabel = state.engine.resolveEraLabel(opt, state.life.currentYear);
      btn.innerHTML = `<div class="tw-rc-name">${displayLabel}</div>` +
        (!check.eligible ? `<div class="tw-lock-reason">🔒 ${check.reason}</div>` : "");
      if (check.eligible) {
        btn.addEventListener("click", () => {
          state.engine.applyDecision(state.life, dec, opt.key, era);
          $("decisionModal").hidden = true;
          state.pendingDecision = null;
          state.paused = false;
          state.lastFrameTs = performance.now();
          renderLifeAll();
        });
      }
      wrap.appendChild(btn);
    }
    $("decisionModal").hidden = false;
  }

  function showPauseModal(pq, followUpDecision) {
    state.pendingPause = pq;
    state.followUpDecision = followUpDecision || null;
    $("pauseAgeTag").textContent = `${pq.age} 歲的暫停提問`;
    $("pauseQuestion").textContent = pq.question_zh;
    $("pauseInput").value = "";
    $("pauseModal").hidden = false;
    $("btnPauseContinue").onclick = () => {
      const txt = $("pauseInput").value.trim();
      if (txt && state.life) state.life.reflections.push({ age: pq.age, year: state.life.currentYear, question: pq.question_zh, text: txt });
      $("pauseModal").hidden = true;
      state.pendingPause = null;
      const nextDec = state.followUpDecision;
      state.followUpDecision = null;
      if (nextDec) showDecisionModal(nextDec);
      else {
        state.paused = false;
        state.lastFrameTs = performance.now();
        renderLifeAll();
      }
    };
  }

  function showHukouModal() {
    const l = state.life;
    if (!l) return;
    const birthReg = state.engine.getRegion(l.birthRegionId);
    const era = state.engine.getEraParams(l.birthYear);
    const cult = state.engine.getCultureEra(l.birthYear);
    $("hukouBody").innerHTML = `
      <div class="hukou-head">
        <div class="muted" style="font-size:14.4px;">台灣人生模擬 · 戶籍出生紀錄</div>
        <h3>出 生 登 記 卡</h3>
      </div>
      <table class="hukou-table">
        <tr><th>姓名</th><td>${l.name}（${l.sex === "M" ? "男" : "女"}）</td></tr>
        <tr><th>出生年月日</th><td>${l.birthYear} 年（${era.roc}）</td></tr>
        <tr><th>出生地大區</th><td>${birthReg.name_zh}（${birthReg.counties.join("／")}）</td></tr>
        <tr><th>父母姓名</th><td>父：${l.family.fatherName} ／ 母：${l.family.motherName}</td></tr>
        <tr><th>出生家境</th><td>Q${l.quintile} ${l.quintileLabel}（手足 ${l.family.siblings} 人）</td></tr>
        <tr><th>先天個性</th><td>${(l.personalities || []).map((x) => `<strong>${x.name}</strong>（${x.desc}）`).join("<br/>") || "—"}</td></tr>
        <tr><th>時代與氛圍</th><td>${era.era_summary}${cult ? "｜" + cult.family_gender_norm : ""}</td></tr>
      </table>
    `;
    openInfoModal("hukouModal");
  }

  function renderObituary(l) {
    state.obituaryLife = l;
    const birthReg = state.engine.getRegion(l.birthRegionId);
    const endLoc = l.location !== "TAIWAN" && l.abroad
      ? `${l.abroad.flag} ${l.abroad.countryName}（${l.abroad.prStatus}）`
      : state.engine.getRegion(l.regionId).name_zh;
    const endEra = state.engine.getEraParams(l.currentYear);
    const totalReal = Math.round(state.engine.getNetWorthNominal(l) / Math.max(0.07, endEra.cpi));
    $("endYearsSpan").textContent = `${l.birthYear} – ${l.currentYear}`;
    $("endName").textContent = `${l.name}（享年 ${l.age} 歲）`;
    $("endSummaryGrid").innerHTML = `
      <div class="id-row"><span>出生</span><b>${l.birthYear} 年 · ${birthReg.name_zh}（Q${l.quintile}）</b></div>
      <div class="id-row"><span>離世地</span><b>${l.currentYear} 年 · ${endLoc}</b></div>
      <div class="id-row"><span>死因</span><b>${l.causeOfDeath ? l.causeOfDeath.label : "結束模擬"}</b></div>
      <div class="id-row"><span>最終學歷與職業</span><b>${l.education} ／ ${l.job}</b></div>
      <div class="id-row"><span>個性傾向</span><b>${(l.personalities || []).map((x) => x.name).join("、") || "—"}</b></div>
      <div class="id-row"><span>海外留學足跡</span><b>${l.abroadSummaryHistory.length ? l.abroadSummaryHistory.join(" → ") : "終身立足台灣"}</b></div>
      <div class="id-row"><span>家庭與居住</span><b>${l.married ? "已婚" : "未婚"}・子女 ${l.children} 人・${l.homeowner ? "有房" : "租屋"}</b></div>
      <div class="id-row"><span>最終實質資產</span><b>折合 2025 購買力約 ${fmtTWD(totalReal)}</b></div>
    `;
    const trajWrap = $("endTrajectoryWrap");
    if (l.trajectory && l.trajectory.length >= 2) {
      trajWrap.hidden = false;
      const cashPos = Math.max(0, l.moneyNominal || 0);
      const stockPos = Math.max(0, l.stockNominal || 0);
      const homePos = l.homeowner ? Math.max(0, (l.homeValueNominal || 0) - (l.mortgageBalanceNominal || 0)) : 0;
      const totPos = Math.max(1, cashPos + stockPos + homePos);
      const pCash = Math.round((cashPos / totPos) * 100);
      const pStock = Math.round((stockPos / totPos) * 100);
      const pHome = Math.max(0, 100 - pCash - pStock);
      trajWrap.innerHTML = `
        <h4 style="margin:0 0 8px;">📊 一生 5 面向終身軌跡圖（0 歲 → ${l.age} 歲）</h4>
        ${buildTrajectorySvg(l.trajectory, 620, 210)}
        <div class="chart-legend" style="margin-bottom:10px;">
          <span class="chart-leg-item"><i class="chart-leg-swatch" style="background:#2B7A4E;"></i>健康</span>
          <span class="chart-leg-item"><i class="chart-leg-swatch" style="background:#d97706;"></i>幸福</span>
          <span class="chart-leg-item"><i class="chart-leg-swatch" style="background:#2563eb;"></i>知識</span>
          <span class="chart-leg-item"><i class="chart-leg-swatch" style="background:#9333ea;"></i>人際</span>
          <span class="chart-leg-item"><i class="chart-leg-swatch" style="background:#8C1D3C;"></i>實質資產（正規化）</span>
        </div>
        <div style="font-size:14.5px;">期末正資產結構占比：現金 ${pCash}% ｜ 台股 ${pStock}% ｜ 房產淨值 ${pHome}%</div>
        <div class="asset-stack-bar" title="綠：現金 / 紅：台股 / 金：房產淨值">
          <div class="asset-seg-cash" style="width:${pCash}%"></div>
          <div class="asset-seg-stock" style="width:${pStock}%"></div>
          <div class="asset-seg-home" style="width:${pHome}%"></div>
        </div>
      `;
    } else {
      trajWrap.hidden = true;
    }
    const protWrap = $("endProtagonistWrap");
    if (l.protagonistEvents && l.protagonistEvents.length) {
      protWrap.hidden = false;
      protWrap.innerHTML = `<h4 style="margin:0 0 8px;color:#991b1b;">⚠️ 史實模式：你親身成為當事人的重大事件（${l.protagonistEvents.length} 次）</h4>` +
        l.protagonistEvents.map((pe) => `
          <div style="font-size:15.6px;margin-bottom:8px;padding:8px 10px;border-radius:7px;background:var(--bad-soft);border-left:3px solid #991b1b;">
            <strong>${pe.age} 歲（${pe.year} 年）${pe.title}</strong> — ${pe.impacts}<br/>
            <span class="muted">觸發條件：${pe.reasons}</span>
          </div>`).join("");
    } else {
      protWrap.hidden = true;
    }
    const finWrap = $("endFinanceWrap");
    const barriers = (l.flags && l.flags.financialBarriers) || [];
    const mktLogs = l.marketLogSummary || [];
    if (barriers.length || mktLogs.length || l.flags.disabled) {
      finWrap.hidden = false;
      const homeEqEnd = l.homeowner ? Math.max(0, (l.homeValueNominal || 0) - (l.mortgageBalanceNominal || 0)) : 0;
      finWrap.innerHTML = `<h4 style="margin:0 0 8px;">💰 股市資產與財務門檻人生軌跡</h4>
        <div style="font-size:15px;margin-bottom:8px;">
          期末結構：現金 <strong>${fmtTWD(l.moneyNominal)}</strong> ｜ 台股 <strong>${fmtTWD(l.stockNominal)}</strong> ｜ 房產淨值 <strong>${fmtTWD(homeEqEnd)}</strong>
          ${l.flags.disabled ? " ｜ <strong style='color:#991b1b;'>曾因醫療負擔不足致殘／失能</strong>" : ""}
        </div>
        ${mktLogs.length ? `<div style="font-size:14.5px;margin-bottom:8px;"><strong>📈 經歷的史實股市大波動：</strong>${mktLogs.slice(-6).join("；")}</div>` : ""}
        ${barriers.length ? `<div style="font-size:14.5px;"><strong>🔒 因存款或薪資受限的關鍵轉折：</strong><ul style="margin:4px 0 0;padding-left:20px;">${barriers.map((b) => `<li>${b}</li>`).join("")}</ul></div>` : ""}`;
    } else {
      finWrap.hidden = true;
    }
    $("endDecisionsWrap").innerHTML = `<h4 style="margin:0 0 8px;">📌 這一生做過的關鍵抉擇（${l.decisionHistory.length} 次）</h4>` +
      (l.decisionHistory.length
        ? l.decisionHistory.map((d) => `<div style="font-size:15.6px;margin-bottom:4px;"><strong>${d.age} 歲（${d.year}）</strong> ${d.title} → ${d.choice}</div>`).join("")
        : `<div class="muted" style="font-size:15.6px;">尚無記錄到的重大決策。</div>`);

    $("endThoughtsWrap").innerHTML = `<h4 style="margin:0 0 8px;">✎ 你在暫停時留下的話</h4>` +
      (l.reflections.length
        ? l.reflections.map((r) => `<div style="font-size:15.6px;margin-bottom:6px;"><strong>${r.age} 歲：</strong>「${r.text}」</div>`).join("")
        : `<div class="muted" style="font-size:15.6px;">沒有留下文字筆記。</div>`);

    $("endHelplineBox").innerHTML = (l.causeOfDeath && l.causeOfDeath.isSensitive && !state.eduMode)
      ? `<div class="eec-helpline">若這段結局令你感到沉重，歡迎撥打台灣免費求助專線：<strong>1925 安心專線</strong> ｜ <strong>1995 生命線</strong></div>`
      : "";
  }

  function saveToShelf(l) {
    try {
      const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const snap = {
        id: l.id, name: l.name, sex: l.sex, birthYear: l.birthYear, currentYear: l.currentYear, age: l.age,
        birthRegionId: l.birthRegionId, regionId: l.regionId, location: l.location,
        abroad: l.abroad ? { flag: l.abroad.flag, countryName: l.abroad.countryName, prStatus: l.abroad.prStatus } : null,
        quintile: l.quintile, quintileLabel: l.quintileLabel,
        family: l.family, education: l.education, job: l.job,
        married: l.married, children: l.children, homeowner: l.homeowner,
        moneyNominal: l.moneyNominal, stockNominal: l.stockNominal,
        homeValueNominal: l.homeValueNominal || 0, mortgageBalanceNominal: l.mortgageBalanceNominal || 0,
        personalities: l.personalities || [],
        abroadSummaryHistory: l.abroadSummaryHistory || [],
        marketLogSummary: l.marketLogSummary || [],
        protagonistEvents: l.protagonistEvents || [],
        decisionHistory: l.decisionHistory || [],
        reflections: l.reflections || [],
        trajectory: l.trajectory || [],
        causeOfDeath: l.causeOfDeath || { key: "manual", label: "提前結束", isSensitive: false },
        flags: {
          financialBarriers: (l.flags && l.flags.financialBarriers) || [],
          disabled: Boolean(l.flags && l.flags.disabled)
        }
      };
      list.unshift({
        id: l.id, name: l.name, birthYear: l.birthYear, endYear: l.currentYear,
        age: l.age, region: state.engine.getRegion(l.birthRegionId).name_zh,
        abroad: l.everStudiedAbroad ? (l.everReturnedToTaiwan ? "海歸" : "旅外") : "在台",
        cause: snap.causeOfDeath.label,
        snapshot: snap
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 24)));
    } catch (_) {}
  }

  function renderShelf() {
    let list = [];
    try { list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch (_) {}
    const wrap = $("shelfList");
    wrap.innerHTML = "";
    if (!list.length) {
      wrap.innerHTML = `<div class="muted">目前尚未走完任何一段台灣人生。</div>`;
    } else {
      list.forEach((x) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "tw-panel shelf-card-btn";
        card.style.padding = "14px";
        card.innerHTML = `
          <div style="font-family:var(--serif);font-size:20.4px;font-weight:700;color:var(--accent);">${x.name}</div>
          <div class="muted" style="font-size:14.4px;">${x.birthYear}–${x.endYear}（享年 ${x.age} 歲）</div>
          <div style="font-size:15px;margin-top:6px;">${x.region} ｜ ${x.abroad || "在台"} ｜ ${x.cause}</div>
          <div class="shelf-card-cta">${x.snapshot ? "👁 點擊重開訃聞與軌跡 →" : "（舊版摘要紀錄）"}</div>
        `;
        card.addEventListener("click", () => reopenShelfLife(x));
        wrap.appendChild(card);
      });
    }
    renderMemorialWall(list);
  }

  function renderLabComparison() {
    const n = Number($("labN").value);
    const resA = state.engine.runBatch($("labRegionA").value, Number($("labYearA").value), n, state.eduMode, state.historicalMode);
    const resB = state.engine.runBatch($("labRegionB").value, Number($("labYearB").value), n, state.eduMode, state.historicalMode);
    const renderCard = (res, cls) => `
      <div class="lab-card">
        <h3 style="margin:0 0 12px;font-family:var(--serif);">${res.regionName} × ${res.birthYear} 年生（N=${res.n}）</h3>
        <div class="lab-stat-row">
          <div class="lab-stat-head"><span>平均壽命</span><b>${res.meanAge} 歲</b></div>
          <div class="lab-bar-track"><div class="lab-bar-fill ${cls}" style="width:${Math.min(100, res.meanAge)}%"></div></div>
        </div>
        <div class="lab-stat-row">
          <div class="lab-stat-head"><span>活到 65 歲比例</span><b>${res.survive65Pct}%</b></div>
          <div class="lab-bar-track"><div class="lab-bar-fill ${cls}" style="width:${res.survive65Pct}%"></div></div>
        </div>
        <div class="lab-stat-row">
          <div class="lab-stat-head"><span>大學以上學歷</span><b>${res.uniPct}%</b></div>
          <div class="lab-bar-track"><div class="lab-bar-fill ${cls}" style="width:${res.uniPct}%"></div></div>
        </div>
        <div class="lab-stat-row">
          <div class="lab-stat-head"><span>曾出國留學／打工比例</span><b>${res.abroadPct}%（其中海歸 ${res.returnPct}%）</b></div>
          <div class="lab-bar-track"><div class="lab-bar-fill ${cls}" style="width:${res.abroadPct}%"></div></div>
        </div>
        <div class="lab-stat-row">
          <div class="lab-stat-head"><span>一生購屋比例</span><b>${res.homePct}%</b></div>
          <div class="lab-bar-track"><div class="lab-bar-fill ${cls}" style="width:${res.homePct}%"></div></div>
        </div>
        ${res.historicalMode ? `
        <div class="lab-stat-row">
          <div class="lab-stat-head"><span>🔥 史實模式成為重大事件當事人</span><b>${res.protagonistPct}%（致死 ${res.protagonistFatalPct}%）</b></div>
          <div class="lab-bar-track"><div class="lab-bar-fill ${cls}" style="width:${res.protagonistPct}%;background:#991b1b;"></div></div>
        </div>` : ""}
        <div class="muted" style="font-size:14.4px;margin-top:8px;">平均歷經決策：${res.avgDecisions} 次 ｜ 期末平均實質淨資產：約 ${fmtTWD(res.avgRealAssetsTwd)}（2025 購買力）</div>
      </div>
    `;
    $("labOutput").innerHTML = renderCard(resA, "") + renderCard(resB, "b");
  }

  function bindEvents() {
    document.querySelectorAll(".navbtn").forEach((b) => b.addEventListener("click", () => switchView(b.dataset.view)));
    $("brandHome").addEventListener("click", (e) => { e.preventDefault(); switchView("intro"); });
    $("btnEduToggle").addEventListener("click", handleToggleMajorEvents);
    $("btnIntroMajorToggle").addEventListener("click", handleToggleMajorEvents);
    $("btnDisableEduBanner").addEventListener("click", () => { state.eduMode = false; syncTopToggles(); });

    $("btnHistoricalToggle").addEventListener("click", handleToggleHistoricalMode);
    $("btnIntroHistToggle").addEventListener("click", handleToggleHistoricalMode);
    $("btnDisableHistBanner").addEventListener("click", () => { state.historicalMode = false; syncTopToggles(); });
    $("btnHistCancel").addEventListener("click", () => closeInfoModal("historicalConfirmModal"));
    $("btnHistConfirm").addEventListener("click", () => {
      if (!state.eduMode) {
        state.historicalMode = true;
      }
      closeInfoModal("historicalConfirmModal");
      syncTopToggles();
    });
    $("btnEnToggle").addEventListener("click", () => { state.showEnNotes = !state.showEnNotes; syncTopToggles(); });
    const allHistBtnEl = $("btnIntroAllHistToggle");
    if (allHistBtnEl) {
      allHistBtnEl.addEventListener("click", () => {
        state.showAllHistoricalEvents = !state.showAllHistoricalEvents;
        syncTopToggles();
        showToast(state.showAllHistoricalEvents ? "已開啟：將顯示所有台灣歷史事件" : "已關閉：每 2–3 年隨機顯示 1 則台灣歷史事件", 1800);
      });
    }
    $("btnThemeTop").addEventListener("click", () => {
      document.body.classList.remove("theme-dark", "theme-sepia");
      state.themeIdx = (state.themeIdx + 1) % state.themes.length;
      if (state.themes[state.themeIdx]) document.body.classList.add(state.themes[state.themeIdx]);
    });
    document.querySelectorAll("#regionModeSeg .seg-btn").forEach((b) => {
      b.addEventListener("click", () => {
        state.regionMode = b.dataset.rmode;
        document.querySelectorAll("#regionModeSeg .seg-btn").forEach((x) => x.classList.toggle("active", x === b));
        renderIntroRegionCards();
      });
    });
    document.querySelectorAll("#eraPresets .era-chip").forEach((c) => {
      c.addEventListener("click", () => {
        state.selectedYear = c.dataset.year;
        if (state.selectedYear !== "random") $("yearSlider").value = state.selectedYear;
        document.querySelectorAll("#eraPresets .era-chip").forEach((x) => x.classList.toggle("active", x === c));
        updateEraPreview();
      });
    });
    $("yearSlider").addEventListener("input", (e) => {
      state.selectedYear = e.target.value;
      document.querySelectorAll("#eraPresets .era-chip").forEach((x) => x.classList.remove("active"));
      updateEraPreview();
    });

    $("btnStartLife").addEventListener("click", startNewLife);
    $("btnRebirth").addEventListener("click", startNewLife);
    $("btnEndRebirth").addEventListener("click", startNewLife);
    $("btnEndBackIntro").addEventListener("click", () => switchView("intro"));
    $("btnEndGoShelf").addEventListener("click", () => switchView("shelf"));
    const togglePausePlayback = (fromKey) => {
      if (!state.life || !state.life.alive) return;
      state.paused = !state.paused;
      if (!state.paused) {
        state.lastFrameTs = performance.now();
      }
      syncPlaybackControls();
      if (fromKey) {
        showToast(state.paused ? "❚❚ 已暫停時間（按空白鍵繼續）" : "▶ 繼續時間", 1100);
      }
    };
    $("btnPause").addEventListener("click", () => togglePausePlayback(false));

    document.querySelectorAll("#mobileLifeTabs .mob-tab-btn").forEach((b) => {
      b.addEventListener("click", () => {
        setMobileLifeTab(b.dataset.mtab);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    // Persist expanded/collapsed state of historical event cards across annual feed re-renders
    $("lifeFeedList").addEventListener("toggle", (e) => {
      const det = e.target;
      if (det && det.matches && det.matches("details.edu-event-details") && det.dataset.evkey) {
        if (det.open) state.expandedEvents[det.dataset.evkey] = true;
        else delete state.expandedEvents[det.dataset.evkey];
      }
    }, true);
    document.querySelectorAll(".ltb-speed-btn").forEach((b) => {
      b.addEventListener("click", () => {
        const prevInterval = getYearIntervalMs();
        const prevRatio = clamp01(state.tickElapsedMs / prevInterval);
        state.speed = Number(b.dataset.speed);
        state.tickElapsedMs = prevRatio * getYearIntervalMs();
        syncPlaybackControls();
        updateCountdownBar();
      });
    });
    $("btnStepYear").addEventListener("click", () => {
      state.paused = true;
      resetYearCountdown();
      syncPlaybackControls();
      advanceOneYear();
    });
    $("btnAuto").addEventListener("click", () => {
      state.autoMode = !state.autoMode;
      syncPlaybackControls();
      if (state.autoMode && state.pendingDecision && state.life) {
        const era = state.engine.getEraParams(state.life.currentYear);
        const eligible = state.pendingDecision.options.filter((o) => state.engine.isOptionEligible(state.life, o, era).eligible);
        const chosen = eligible.length ? eligible[0] : state.pendingDecision.options[0];
        state.engine.applyDecision(state.life, state.pendingDecision, chosen.key, era);
        closeAllModals(true);
        renderLifeAll();
      } else if (state.autoMode && !$("pauseModal").hidden) {
        closeAllModals(true);
        renderLifeAll();
      }
    });
    const cancelEndEarlyModal = () => {
      $("endEarlyModal").hidden = true;
      const otherBlockingOpen = !$("decisionModal").hidden || !$("pauseModal").hidden;
      if (!otherBlockingOpen && state.life && state.life.alive) {
        state.paused = state.wasPausedBeforeEndModal;
        state.lastFrameTs = performance.now();
        syncPlaybackControls();
      }
    };
    $("btnEndEarly").addEventListener("click", () => {
      if (!state.life || !state.life.alive) return;
      state.wasPausedBeforeEndModal = state.paused;
      state.paused = true;
      syncPlaybackControls();
      $("endEarlyModal").hidden = false;
    });
    $("btnEndEarlyCancel").addEventListener("click", cancelEndEarlyModal);
    $("btnEndEarlyConfirm").addEventListener("click", () => {
      if (!state.life) return;
      stopTimer();
      closeAllModals(false);
      state.life.alive = false;
      state.life.causeOfDeath = { key: "manual", label: "玩家提前結束人生", isSensitive: false };
      saveToShelf(state.life);
      renderObituary(state.life);
      switchView("end");
    });
    $("focusSelect").addEventListener("change", (e) => { if (state.life) state.life.focus = e.target.value; });
    $("btnHukou").addEventListener("click", showHukouModal);
    $("btnCloseHukou").addEventListener("click", () => closeInfoModal("hukouModal"));
    $("btnOpenHelpline").addEventListener("click", () => openInfoModal("helplineModal"));
    $("btnCloseHelpline").addEventListener("click", () => closeInfoModal("helplineModal"));
    $("btnRunLab").addEventListener("click", renderLabComparison);
    $("btnClearShelf").addEventListener("click", () => {
      try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(MEMORIAL_KEY); } catch (_) {}
      state.memorialIdx = 0;
      renderShelf();
      showToast("已清空本機書架與追思紀錄");
    });

    // P2: Interactive Taiwan 6-region SVG map hover & click
    document.querySelectorAll("#twRegionSvg .tw-map-region").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const rid = el.dataset.region;
        if (rid) renderMapRegionStatsCard(rid);
      });
      el.addEventListener("click", () => {
        const rid = el.dataset.region;
        if (rid) {
          state.inspectedRegionId = rid;
          renderMapRegionStatsCard(rid);
        }
      });
    });

    // P2: Memorial Wall navigation
    const getShelfArr = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch (_) { return []; } };
    $("btnMemPrev").addEventListener("click", () => {
      const list = getShelfArr();
      if (!list.length) return;
      state.memorialIdx = (state.memorialIdx - 1 + list.length) % list.length;
      renderMemorialWall(list);
    });
    $("btnMemNext").addEventListener("click", () => {
      const list = getShelfArr();
      if (!list.length) return;
      state.memorialIdx = (state.memorialIdx + 1) % list.length;
      renderMemorialWall(list);
    });
    $("btnMemRandom").addEventListener("click", () => {
      const list = getShelfArr();
      if (list.length <= 1) return;
      let next = state.memorialIdx;
      while (next === state.memorialIdx) next = Math.floor(Math.random() * list.length);
      state.memorialIdx = next;
      renderMemorialWall(list);
    });

    // P2: Pure Canvas 2D PNG certificate exports
    $("btnDownloadHukouPng").addEventListener("click", () => {
      if (state.life) downloadHukouCardPNG(state.life);
    });
    $("btnDownloadCertPng").addEventListener("click", () => {
      const target = state.obituaryLife || state.life;
      if (target) downloadLifeCertPNG(target);
    });

    document.addEventListener("keydown", (e) => {
      // Spacebar: toggle pause / resume while playing in #view-life (ignoring inputs & active modals)
      if (e.code === "Space" || e.key === " ") {
        const tag = (e.target && e.target.tagName) ? e.target.tagName.toUpperCase() : "";
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (e.target && e.target.isContentEditable)) {
          return;
        }
        const lifeView = $("view-life");
        if (!lifeView || !lifeView.classList.contains("active")) return;
        if (!state.life || !state.life.alive) return;
        const anyModalOpen = ["decisionModal", "pauseModal", "hukouModal", "helplineModal", "historicalConfirmModal", "endEarlyModal"]
          .some((id) => { const el = $(id); return el && !el.hidden; });
        if (anyModalOpen) return;
        e.preventDefault();
        if (document.activeElement && (document.activeElement.tagName === "BUTTON" || document.activeElement.tagName === "SUMMARY")) {
          document.activeElement.blur();
        }
        togglePausePlayback(true);
        return;
      }

      if (e.key !== "Escape") return;
      if (!$("hukouModal").hidden) { closeInfoModal("hukouModal"); return; }
      if (!$("helplineModal").hidden) { closeInfoModal("helplineModal"); return; }
      if (!$("historicalConfirmModal").hidden) { closeInfoModal("historicalConfirmModal"); return; }
      if (!$("endEarlyModal").hidden) { cancelEndEarlyModal(); return; }
      if (!$("pauseModal").hidden) {
        $("pauseModal").hidden = true;
        state.pendingPause = null;
        const nextDec = state.followUpDecision;
        state.followUpDecision = null;
        if (nextDec) showDecisionModal(nextDec);
        else if (state.life && state.life.alive) {
          state.paused = false;
          state.lastFrameTs = performance.now();
          syncPlaybackControls();
        }
      }
    });
  }

  async function init() {
    try {
      state.data = await loadAllData();
      state.engine = new window.TaiwanLifeEngine(state.data);
      renderIntro();
      bindEvents();
      syncTopToggles();
      syncPlaybackControls();
    } catch (err) {
      document.body.innerHTML = `<div style="padding:32px;font-family:sans-serif;">
        <h2>本機載入資料失敗</h2><p>${err.message}</p>
        <p>請確認 <code>./data/tw_bundle.js</code> 與 13 份 <code>./data/tw_*.json</code> 完整存在。</p>
      </div>`;
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
