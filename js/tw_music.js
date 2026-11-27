/* tw_music.js — scene-based background music (v6.22)
 *
 * Scenes:
 *   home    首頁／書架／Lab：andrii g. "Background Music"（單曲循環）
 *   silent  出生抽籤動畫、人生結束淡出時：靜音
 *   life    人生進行中：Morning → Evening → Morning …（無限循環）
 *   review  人生回顧與訃聞畫面：Vadim "Atlas Taiwan"（單曲循環）
 *
 * Two "decks" (audio elements) are reused for everything, so crossfades
 * inside a playlist and loops of a single track are smooth, and on iOS the
 * elements stay unlocked after the first user gesture.
 * Browsers block autoplay, so sound starts on the first user interaction.
 * TWMusic.setScene(name, fadeOutSeconds) switches scenes: the current music
 * fades out, then the new scene fades in from its first track.
 */
(function () {
  "use strict";

  var SCENES = {
    home: ["assets/audio/home.mp3"],
    life: ["assets/audio/morning.mp3", "assets/audio/evening.mp3"],
    review: ["assets/audio/review.mp3"],
    silent: []
  };
  var VOLUME = 0.35;        // overall music level
  var FADE_IN = 3.0;        // seconds, scene start / unmute
  var CROSSFADE = 5.0;      // seconds, overlap between tracks (and loop seam)
  var SCENE_FADE = 1.5;     // seconds, default fade-out when switching scenes
  var MUTE_FADE = 1.2;      // seconds, on mute / tab hidden
  var STORE_KEY = "tw_music_muted";

  var LABEL_ON = "🎵 音樂";          // 🎵 音樂
  var LABEL_OFF = "🔇 音樂";         // 🔇 音樂
  var TITLE_ON = "背景音樂：開（點一下靜音）"; // 背景音樂：開（點一下靜音）
  var TITLE_OFF = "背景音樂：關（點一下播放）"; // 背景音樂：關（點一下播放）

  var muted = false;
  try { muted = localStorage.getItem(STORE_KEY) === "1"; } catch (e) {}

  var ctx = null, master = null, masterLevel = 0; // masterLevel used by the no-WebAudio fallback
  var decks = [];           // [{ el, gain, level }]
  var cur = 0;              // deck currently leading
  var scene = "home";       // desired scene
  var trackIdx = 0;
  var unlocked = false;
  var hidden = false;
  var needsStart = true;    // scene must (re)start from its first track when audio resumes
  var crossfading = false;
  var token = 0;            // bumps on every scene change, cancels stale timers
  var sceneTimer = null, suspendTimer = null;

  function audible() { return unlocked && !muted && !hidden; }
  function t0() { return ctx ? ctx.currentTime : 0; }

  function ramp(param, to, secs) {
    var t = t0();
    param.cancelScheduledValues(t);
    param.setValueAtTime(param.value, t);
    param.linearRampToValueAtTime(to, t + Math.max(0.01, secs));
  }

  // Fallback (no Web Audio): animate element.volume.
  function fadeEl(el, to, secs) {
    if (el._fadeRaf) cancelAnimationFrame(el._fadeRaf);
    var from = el.volume, start = performance.now(), dur = Math.max(10, secs * 1000);
    function step(ts) {
      var k = Math.min(1, (ts - start) / dur);
      el.volume = Math.max(0, Math.min(1, from + (to - from) * k));
      if (k < 1) el._fadeRaf = requestAnimationFrame(step);
    }
    el._fadeRaf = requestAnimationFrame(step);
  }

  function deckLevel(d, to, secs) {
    d.level = to;
    if (d.gain) ramp(d.gain.gain, to, secs);
    else fadeEl(d.el, to * masterLevel, secs);
  }

  function masterTo(to, secs) {
    masterLevel = to;
    if (master) ramp(master.gain, to, secs);
    else decks.forEach(function (d) { fadeEl(d.el, d.level * to, secs); });
  }

  function playEl(el) {
    var p = el.play();
    if (p && p.catch) p.catch(function () {});
  }

  function build() {
    if (decks.length) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (AC) {
      try {
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0;
        master.connect(ctx.destination);
      } catch (e) { ctx = null; master = null; }
    }
    for (var i = 0; i < 2; i++) {
      var el = new Audio();
      el.preload = "auto";
      var d = { el: el, gain: null, level: 0 };
      if (ctx) {
        try {
          var src = ctx.createMediaElementSource(el);
          d.gain = ctx.createGain();
          d.gain.gain.value = 0;
          src.connect(d.gain);
          d.gain.connect(master);
        } catch (e) { d.gain = null; }
      }
      if (!d.gain) el.volume = 0;
      (function (idx) {
        el.addEventListener("timeupdate", function () { onTime(idx); });
        el.addEventListener("ended", function () { if (idx === cur && !crossfading) nextTrack(); });
      })(i);
      decks.push(d);
    }
  }

  function setSrc(d, src) {
    if (d.el.getAttribute("src") !== src) d.el.src = src;
    try { d.el.currentTime = 0; } catch (e) {}
  }

  function onTime(idx) {
    if (idx !== cur || crossfading || !audible()) return;
    var el = decks[idx].el;
    if (!el.duration || !isFinite(el.duration)) return;
    if (el.duration - el.currentTime <= CROSSFADE) nextTrack();
  }

  // Crossfade into the next track of the playlist (or the same track again).
  function nextTrack() {
    var list = SCENES[scene];
    if (!list || !list.length) return;
    crossfading = true;
    var my = token;
    var from = decks[cur], toIdx = 1 - cur, to = decks[toIdx];
    trackIdx = (trackIdx + 1) % list.length;
    setSrc(to, list[trackIdx]);
    deckLevel(to, 0, 0.01);
    playEl(to.el);
    deckLevel(to, 1, CROSSFADE);
    deckLevel(from, 0, CROSSFADE);
    cur = toIdx;
    setTimeout(function () {
      if (my !== token) return;
      from.el.pause();
      crossfading = false;
    }, CROSSFADE * 1000 + 200);
  }

  function stopDecks() {
    decks.forEach(function (d) { d.el.pause(); deckLevel(d, 0, 0.01); });
    crossfading = false;
  }

  function startScene() {
    needsStart = false;
    var list = SCENES[scene];
    if (!list || !list.length) return;
    trackIdx = 0;
    cur = 0;
    var d = decks[0];
    setSrc(d, list[0]);
    deckLevel(d, 0, 0.01);
    playEl(d.el);
    deckLevel(d, 1, FADE_IN);
  }

  function setScene(name, fadeOut) {
    if (!SCENES.hasOwnProperty(name)) return;
    if (name === scene && !needsStart) return;
    scene = name;
    token++;
    crossfading = false;
    if (sceneTimer) { clearTimeout(sceneTimer); sceneTimer = null; }
    if (!audible() || !decks.length) {
      needsStart = true;
      if (decks.length) stopDecks();
      return;
    }
    var secs = fadeOut == null ? SCENE_FADE : fadeOut;
    var anyPlaying = decks.some(function (d) { return !d.el.paused; });
    decks.forEach(function (d) { deckLevel(d, 0, secs); });
    var my = token;
    var go = function () {
      sceneTimer = null;
      if (my !== token) return;
      decks.forEach(function (d) { d.el.pause(); });
      if (audible()) startScene(); else needsStart = true;
    };
    if (anyPlaying) sceneTimer = setTimeout(go, secs * 1000 + 60);
    else go();
  }

  function suspend() {
    if (!decks.length) return;
    masterTo(0, MUTE_FADE);
    if (suspendTimer) clearTimeout(suspendTimer);
    suspendTimer = setTimeout(function () {
      suspendTimer = null;
      if (!audible()) decks.forEach(function (d) { d.el.pause(); });
    }, MUTE_FADE * 1000 + 100);
  }

  function resume() {
    if (!audible()) return;
    build();
    if (ctx && ctx.state === "suspended") ctx.resume();
    if (suspendTimer) { clearTimeout(suspendTimer); suspendTimer = null; }
    if (needsStart) {
      masterTo(VOLUME, 0.05);
      startScene();
      return;
    }
    var d = decks[cur];
    if (d.el.getAttribute("src") && (SCENES[scene] || []).length) playEl(d.el);
    masterTo(VOLUME, FADE_IN);
  }

  // iOS only lets an element play later if it was played during a user gesture.
  function primeDecks() {
    var src = (SCENES[scene] && SCENES[scene][0]) || SCENES.home[0];
    decks.forEach(function (d, i) {
      if (i === cur && !d.el.paused) return;
      if (!d.el.getAttribute("src")) d.el.src = src;
      var p = d.el.play();
      if (p && p.then) p.then(function () { if (!(i === cur && audible() && (SCENES[scene] || []).length && !needsStart)) d.el.pause(); }).catch(function () {});
    });
  }

  function refreshButtons() {
    var btns = document.querySelectorAll("[data-music-toggle]");
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      var compact = b.hasAttribute("data-music-compact");
      b.textContent = compact ? (muted ? "🔇" : "🎵") : (muted ? LABEL_OFF : LABEL_ON);
      b.title = muted ? TITLE_OFF : TITLE_ON;
      b.setAttribute("aria-label", b.title);
      b.setAttribute("aria-pressed", muted ? "false" : "true");
    }
  }

  function toggle() {
    muted = !muted;
    try { localStorage.setItem(STORE_KEY, muted ? "1" : "0"); } catch (e) {}
    refreshButtons();
    if (muted) suspend();
    else { unlock(); resume(); }
  }

  function unlock() {
    if (unlocked) return;
    unlocked = true;
    build();
    if (ctx && ctx.state === "suspended") ctx.resume();
    if (!muted) resume();
    primeDecks();
  }

  var UNLOCK_EVENTS = ["pointerdown", "keydown", "touchend"];
  function onFirstGesture(ev) {
    if (ev && ev.target && ev.target.closest && ev.target.closest("[data-music-toggle]")) return; // toggle handles itself
    UNLOCK_EVENTS.forEach(function (t) { document.removeEventListener(t, onFirstGesture, true); });
    unlock();
  }

  function init() {
    refreshButtons();
    document.addEventListener("click", function (ev) {
      var b = ev.target.closest && ev.target.closest("[data-music-toggle]");
      if (!b) return;
      ev.preventDefault();
      UNLOCK_EVENTS.forEach(function (t) { document.removeEventListener(t, onFirstGesture, true); });
      if (!unlocked) { unlocked = true; build(); primeDecks(); }
      toggle();
    });
    UNLOCK_EVENTS.forEach(function (t) { document.addEventListener(t, onFirstGesture, true); });
    document.addEventListener("visibilitychange", function () {
      hidden = document.hidden;
      if (!unlocked || muted) return;
      if (hidden) suspend(); else resume();
    });
  }

  window.TWMusic = {
    setScene: setScene,
    getScene: function () { return scene; },
    toggle: toggle,
    isMuted: function () { return muted; },
    // debug snapshot for testing in the console
    _state: function () {
      return { scene: scene, unlocked: unlocked, muted: muted, cur: cur, trackIdx: trackIdx,
        decks: decks.map(function (d) { return { src: d.el.getAttribute("src"), paused: d.el.paused, time: Math.round(d.el.currentTime * 10) / 10, level: d.gain ? Math.round(d.gain.gain.value * 100) / 100 : d.el.volume }; }),
        master: master ? Math.round(master.gain.value * 100) / 100 : masterLevel };
    }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
