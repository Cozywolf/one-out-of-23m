/* tw_music.js — background music (v6.14)
 * Playlist: Morning -> Evening -> Morning -> ... looping forever.
 * Soft fade-in at start, crossfade between tracks, fade-out on mute.
 * Browsers block autoplay, so playback starts on the first user interaction.
 * Mute preference is remembered in localStorage.
 */
(function () {
  "use strict";

  var TRACKS = ["assets/audio/morning.mp3", "assets/audio/evening.mp3"];
  var VOLUME = 0.35;        // overall music level (game is text-heavy, keep it gentle)
  var FADE_IN = 3.0;        // seconds, first start / unmute
  var CROSSFADE = 5.0;      // seconds, overlap between tracks
  var FADE_OUT = 1.2;       // seconds, on mute
  var STORE_KEY = "tw_music_muted";

  var LABEL_ON = "🎵 音樂";          // 🎵 音樂
  var LABEL_OFF = "🔇 音樂";         // 🔇 音樂
  var TITLE_ON = "背景音樂：開（點一下靜音）"; // 背景音樂：開（點一下靜音）
  var TITLE_OFF = "背景音樂：關（點一下播放）"; // 背景音樂：關（點一下播放）

  var muted = false;
  try { muted = localStorage.getItem(STORE_KEY) === "1"; } catch (e) {}

  var ctx = null;           // AudioContext (needed for smooth fades on iOS, where element.volume is read-only)
  var master = null;        // master GainNode
  var players = [];         // [{ el, gain }]
  var current = 0;          // index of the playing player / track
  var started = false;
  var crossfading = false;
  var pauseTimer = null;

  function now() { return ctx ? ctx.currentTime : 0; }

  function ramp(param, to, secs) {
    var t = now();
    param.cancelScheduledValues(t);
    param.setValueAtTime(param.value, t);
    param.linearRampToValueAtTime(to, t + secs);
  }

  // Fallback fade for browsers without Web Audio: animate element.volume.
  function fadeEl(el, to, secs) {
    if (el._fadeRaf) cancelAnimationFrame(el._fadeRaf);
    var from = el.volume, t0 = performance.now(), dur = secs * 1000;
    function step(ts) {
      var k = Math.min(1, (ts - t0) / dur);
      el.volume = Math.max(0, Math.min(1, from + (to - from) * k));
      if (k < 1) el._fadeRaf = requestAnimationFrame(step);
    }
    el._fadeRaf = requestAnimationFrame(step);
  }

  function setTrackLevel(p, to, secs) {
    if (p.gain) ramp(p.gain.gain, to, secs);
    else fadeEl(p.el, to * VOLUME, secs);
  }

  function build() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (AC) {
      try {
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0;
        master.connect(ctx.destination);
      } catch (e) { ctx = null; master = null; }
    }
    for (var i = 0; i < TRACKS.length; i++) {
      var el = new Audio();
      el.src = TRACKS[i];
      el.preload = i === 0 ? "auto" : "metadata";
      el.loop = false;
      var p = { el: el, gain: null };
      if (ctx) {
        try {
          var src = ctx.createMediaElementSource(el);
          p.gain = ctx.createGain();
          p.gain.gain.value = 0;
          src.connect(p.gain);
          p.gain.connect(master);
        } catch (e) { p.gain = null; }
      }
      if (!p.gain) el.volume = 0;
      (function (idx) {
        el.addEventListener("timeupdate", function () { onTime(idx); });
        el.addEventListener("ended", function () { onEnded(idx); });
      })(i);
      players.push(p);
    }
  }

  function onTime(idx) {
    if (idx !== current || crossfading) return;
    var el = players[idx].el;
    if (!el.duration || !isFinite(el.duration)) return;
    if (el.duration - el.currentTime <= CROSSFADE) crossfadeToNext();
  }

  function onEnded(idx) {
    // Safety net if timeupdate fired too late to crossfade.
    if (idx === current && !crossfading) crossfadeToNext();
  }

  function crossfadeToNext() {
    crossfading = true;
    var from = players[current];
    var nextIdx = (current + 1) % players.length;
    var to = players[nextIdx];
    to.el.currentTime = 0;
    setTrackLevel(to, 0, 0.01);
    playEl(to.el);
    setTrackLevel(to, 1, CROSSFADE);
    setTrackLevel(from, 0, CROSSFADE);
    current = nextIdx;
    setTimeout(function () {
      from.el.pause();
      crossfading = false;
    }, CROSSFADE * 1000 + 200);
    // Warm up the following track so the next crossfade starts on time.
    var after = players[(nextIdx + 1) % players.length];
    if (after !== to) after.el.preload = "auto";
  }

  function playEl(el) {
    var pr = el.play();
    if (pr && pr.catch) pr.catch(function () {});
  }

  function startOrResume() {
    if (muted) return;
    if (!players.length) build();
    if (ctx && ctx.state === "suspended") ctx.resume();
    if (pauseTimer) { clearTimeout(pauseTimer); pauseTimer = null; }
    var p = players[current];
    if (!started) {
      started = true;
      setTrackLevel(p, 1, 0.01);
    }
    playEl(p.el);
    if (master) ramp(master.gain, VOLUME, FADE_IN);
    else { setTrackLevel(p, 0, 0.01); setTrackLevel(p, 1, FADE_IN); }
  }

  function fadeOutAndPause() {
    if (!players.length) return;
    if (master) ramp(master.gain, 0, FADE_OUT);
    else players.forEach(function (p) { fadeEl(p.el, 0, FADE_OUT); });
    if (pauseTimer) clearTimeout(pauseTimer);
    pauseTimer = setTimeout(function () {
      pauseTimer = null;
      players.forEach(function (p) { p.el.pause(); });
      crossfading = false;
      if (!master) setTrackLevel(players[current], 1, 0.01); // restore level for fallback path
    }, FADE_OUT * 1000 + 100);
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
    if (muted) fadeOutAndPause(); else startOrResume();
  }

  // First user interaction unlocks audio (autoplay policy).
  function unlock(ev) {
    if (ev && ev.target && ev.target.closest && ev.target.closest("[data-music-toggle]")) return; // toggle handles itself
    removeUnlock();
    startOrResume();
  }
  var UNLOCK_EVENTS = ["pointerdown", "keydown", "touchend"];
  function removeUnlock() {
    UNLOCK_EVENTS.forEach(function (t) { document.removeEventListener(t, unlock, true); });
  }

  function init() {
    refreshButtons();
    document.addEventListener("click", function (ev) {
      var b = ev.target.closest && ev.target.closest("[data-music-toggle]");
      if (!b) return;
      ev.preventDefault();
      removeUnlock();
      toggle();
    });
    UNLOCK_EVENTS.forEach(function (t) { document.addEventListener(t, unlock, true); });
    // Pause quietly when the tab is hidden; resume with a fade when it comes back.
    document.addEventListener("visibilitychange", function () {
      if (!started || muted) return;
      if (document.hidden) fadeOutAndPause(); else startOrResume();
    });
  }

  window.TWMusic = { toggle: toggle, isMuted: function () { return muted; } };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
