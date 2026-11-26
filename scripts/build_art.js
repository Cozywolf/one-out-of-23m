#!/usr/bin/env node
// v6.16：台灣懷舊彩繪風格圖案產生器
// 用法：node scripts/build_art.js  → 輸出 assets/art/*.svg
// 風格：柑仔店招牌、花磚、客家花布配色，粗咖啡色描邊。
"use strict";
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "assets", "art");

const C = {
  tile: "#fbf0d9", pbg: "#cfe5dc", ln: "#4b2a20", det: "#3a1f17", skin: "#f6c9a3",
  r: "#cf3f35", g: "#3d8c6a", y: "#f0b33b", b: "#2f6aa0", h: "#2a201b", hg: "#c9c2b8",
  p: "#fffaf0", k: "#2a201b", sea: "#9fd3cf", ck: "#ef9b94", tb: "#fff6e0",
  wall: "#f1d3ae", tr: "#8a5a3c", gd: "#d9c08a", nt: "#2f4a70", mt: "#2d5446", lan: "#fbe7b8", o: "#e8903e",
};

const CSS = `
*{stroke:${C.ln};stroke-width:3.6;stroke-linejoin:round;stroke-linecap:round}
pattern *{stroke:none}
.tile{fill:${C.tile};stroke:none}.pbg{fill:${C.pbg};stroke:none}
.s{fill:${C.skin}}.r{fill:${C.r}}.g{fill:${C.g}}.y{fill:${C.y}}.b{fill:${C.b}}.h{fill:${C.h}}.hg{fill:${C.hg}}
.p{fill:${C.p}}.k{fill:${C.k}}.sea{fill:${C.sea}}.fl{fill:url(#fl)}.wall{fill:${C.wall};stroke:none}
.tr{fill:${C.tr}}.gd{fill:${C.gd}}.nt{fill:${C.nt};stroke:none}.mt{fill:${C.mt}}.lan{fill:${C.lan}}.o{fill:${C.o}}
.m{fill:none;stroke:${C.det};stroke-width:3.1}.gl{fill:none;stroke:${C.det};stroke-width:2.6}.fr{fill:none}
.e{fill:${C.det};stroke:none}.ck{fill:${C.ck};stroke:none}.sh{fill:${C.ln};stroke:none;opacity:.18}
.glow{fill:#ffd27a;stroke:none;opacity:.35}.st{fill:#ffe6a0;stroke:none}
text{stroke:none;font-family:"Noto Serif TC","Source Han Serif TC","Songti TC","PMingLiU",serif;font-weight:900;text-anchor:middle}
.tx{fill:${C.det};font-family:"Noto Sans TC","PingFang TC","Microsoft JhengHei",sans-serif;font-weight:700}
.tb{fill:${C.tb}}.num{fill:${C.r}}.nb{fill:${C.b};font-family:"Noto Sans TC","PingFang TC","Microsoft JhengHei",sans-serif;font-weight:700}`;

const FLORAL = `<pattern id="fl" width="22" height="22" patternUnits="userSpaceOnUse">
<rect width="22" height="22" fill="#c8332d" stroke="none"/>
<ellipse cx="3" cy="3" rx="4" ry="2" fill="#2f7a5a" stroke="none" transform="rotate(35 3 3)"/>
<ellipse cx="19" cy="19" rx="4" ry="2" fill="#2f7a5a" stroke="none" transform="rotate(35 19 19)"/>
<circle cx="11" cy="11" r="5.5" fill="#f59ab0" stroke="none"/><circle cx="11" cy="11" r="2" fill="#fff1c2" stroke="none"/></pattern>`;

const TAIWAN = "M114.7 47.3C116.4 47.6 118.4 50.5 120.7 52.0C123.0 53.4 127.9 53.4 128.5 56.3C129.1 59.1 126.2 63.7 124.3 69.0C122.4 74.3 120.7 78.7 117.1 88.2C113.6 97.8 106.6 117.9 103.0 126.4C99.4 134.8 97.0 134.4 95.5 138.8C94.0 143.1 94.8 150.5 94.0 152.7C93.1 154.9 91.8 154.2 90.4 151.8C89.1 149.3 88.2 141.6 85.9 138.1C83.6 134.7 79.0 134.3 76.6 131.0C74.2 127.7 72.1 124.3 71.5 118.6C70.9 112.9 71.8 102.3 73.0 96.9C74.3 91.5 76.2 90.7 79.0 86.1C81.7 81.4 86.8 73.1 89.5 69.0C92.3 64.9 93.5 63.6 95.5 61.2C97.5 58.9 99.0 56.9 101.5 55.1C104.0 53.2 108.3 51.7 110.5 50.4C112.7 49.1 113.0 47.0 114.7 47.3Z";

// ---------- 插圖（方形） ----------
const illus = {
  // 滿月：竹搖籃、花布被、紅蛋
  cradle: () => `<ellipse class="sh" cx="100" cy="176" rx="72" ry="9"/>
<path class="y" d="M28 112Q100 196 172 112Z"/>
<path class="m" d="M46 128Q100 166 154 128"/>
<path class="m" d="M76 118L77 146M100 118V151M124 118L123 146"/>
<circle class="s" cx="72" cy="90" r="24"/>
<path class="m" d="M66 68q6 -8 12 -1q-5 4 -8 0"/>
<path class="m" d="M60 92q4 4 8 0M76 92q4 4 8 0"/>
<circle class="ck" cx="58" cy="102" r="5"/><circle class="ck" cx="88" cy="102" r="5"/>
<path class="fl" d="M88 112Q92 66 136 70Q172 74 170 112Z"/>
<rect class="y" x="22" y="104" width="156" height="13" rx="6.5"/>
<ellipse class="r" cx="150" cy="160" rx="13" ry="16"/>
<ellipse class="r" cx="170" cy="166" rx="11" ry="14"/>`,

  // 手牽手圍著台灣島
  island: () => {
    const cls = ["r", "y", "g", "b"];
    let ring = "";
    for (let i = 0; i < 12; i++) {
      ring += `<g transform="rotate(${i * 30} 100 100)"><path class="m" d="M84 33Q100 27 116 33"/>
<path class="${cls[i % 4]}" d="M92 44Q92 28 100 28Q108 28 108 44Z"/><circle class="s" cx="100" cy="20" r="8"/></g>`;
    }
    return `<circle class="sea" cx="100" cy="100" r="58"/>
<path class="m" d="M44 112q6 -4 12 0t12 0M120 150q7 -5 14 0t14 0"/>
<g transform="translate(100 101) scale(.86) translate(-100 -101)"><path class="g" d="${TAIWAN}"/>
<path class="m" d="M117 64Q108 96 94 132"/></g>
<circle class="r" cx="136" cy="128" r="7"/>${ring}`;
  },

  // 撕日曆（農民曆）與新芽
  calendar: () => `<ellipse class="sh" cx="100" cy="180" rx="60" ry="7"/>
<rect class="p" x="50" y="50" width="104" height="124" rx="8" transform="rotate(-7 102 112)"/>
<rect class="p" x="48" y="48" width="104" height="124" rx="8"/>
<rect class="r" x="48" y="48" width="104" height="30" rx="8"/>
<text class="tb" x="100" y="70" font-size="15">出生之日</text>
<circle class="k" cx="70" cy="48" r="5"/><circle class="k" cx="130" cy="48" r="5"/>
<text class="num" x="100" y="138" font-size="60">1</text>
<text class="tx" x="100" y="160" font-size="11">農曆 正月初一</text>
<path class="m" d="M100 48Q97 30 100 14"/>
<path class="g" d="M99 28Q82 14 74 26Q86 34 99 28Z"/>
<path class="g" d="M100 22Q116 6 126 18Q114 28 100 22Z"/>`,

  // 老公寓鐵窗、窗台的貓與盆栽、冷氣機
  home: () => {
    let grille = "";
    for (let x = 60; x <= 140; x += 20) grille += `M${x} 30V140`;
    return `<rect class="wall" x="0" y="0" width="200" height="200"/>
<path class="m" d="M0 40h18M0 80h18M182 60h18M182 100h18M0 170h30" style="stroke:#e2b98c"/>
<rect class="sea" x="46" y="40" width="108" height="98" rx="3"/>
<path class="m" d="M100 40V138M46 89h108" style="stroke:${C.ln}"/>
<path class="p" d="M58 44l20 0l-14 34z" style="stroke:none;opacity:.7"/>
<rect class="fr" x="38" y="30" width="124" height="112" rx="4"/>
<path class="fr" d="${grille}M38 86H162"/>
<circle class="fr" cx="70" cy="86" r="7"/><circle class="fr" cx="90" cy="86" r="7"/><circle class="fr" cx="110" cy="86" r="7"/><circle class="fr" cx="130" cy="86" r="7"/>
<path class="fr" d="M40 58q10 -12 20 0t20 0t20 0t20 0t20 0t20 0M40 114q10 12 20 0t20 0t20 0t20 0t20 0t20 0"/>
<path class="o" d="M58 140Q54 112 74 108Q94 110 92 140Z"/>
<circle class="o" cx="70" cy="102" r="14"/>
<path class="o" d="M58 96L58 82L68 90ZM82 96L82 82L72 90Z"/>
<path class="m" d="M63 103q3 3 6 0M73 103q3 3 6 0M66 109q4 3 8 0"/>
<path class="m" d="M90 136Q108 136 104 120"/>
<path class="m" d="M66 122l6 4M66 130l6 4"/>
<path class="r" d="M124 118H150L146 140H128Z"/>
<path class="g" d="M137 118Q120 100 128 92Q140 104 137 118Z"/><path class="g" d="M137 118Q152 98 146 90Q132 102 137 118Z"/>
<rect class="y" x="28" y="138" width="144" height="12" rx="4"/>
<rect class="p" x="112" y="160" width="62" height="34" rx="4"/>
<circle class="fr" cx="130" cy="177" r="11"/><path class="m" d="M148 168h18M148 176h18M148 184h18"/>`;
  },

  // 榕樹下的板凳與茶壺
  elder: () => `<circle class="y" cx="164" cy="34" r="13"/>
<path class="gd" d="M-10 160Q100 146 210 160V210H-10Z"/>
<path class="tr" d="M86 172Q92 124 84 96H116Q108 124 114 172Z"/>
<path class="m" d="M100 120v40" style="stroke:#6a432c"/>
<circle class="g" cx="58" cy="82" r="32"/><circle class="g" cx="142" cy="82" r="32"/>
<circle class="g" cx="100" cy="60" r="40"/><circle class="g" cx="100" cy="94" r="28"/>
<path class="m" d="M48 108v34M60 112v26M140 112v26M152 108v34" style="stroke:${C.tr}"/>
<path class="m" d="M84 56q8 -8 16 0M112 76q8 -8 16 0M52 76q8 -8 16 0" style="stroke:#2b6a4f"/>
<rect class="r" x="36" y="150" width="128" height="9" rx="3"/>
<path class="m" d="M46 159v22M154 159v22"/>
<ellipse class="p" cx="64" cy="140" rx="12" ry="10"/><path class="fr" d="M52 136q-8 2 -8 -6M76 138q6 -2 8 4"/><rect class="p" x="60" y="127" width="8" height="5" rx="2"/>
<path class="p" d="M82 142h10l-1 8h-8Z"/><path class="p" d="M96 142h10l-1 8h-8Z"/>
<path class="m" d="M62 122q-3 -6 0 -10M68 122q3 -6 0 -10" style="stroke:#c9b7a5"/>`,

  // 平溪天燈
  lantern: () => {
    const lan = (s, txt) => `<ellipse class="glow" cx="100" cy="124" rx="40" ry="18"/>
<path class="lan" d="M70 58Q70 46 82 44H118Q130 46 130 58L124 130H76Z"/>
<path class="m" d="M88 46L90 130M112 46L110 130" style="stroke:#d9b778"/>
${txt ? `<text class="num" x="100" y="86" font-size="22">平</text><text class="num" x="100" y="112" font-size="22">安</text>` : ""}
<rect class="r" x="74" y="128" width="52" height="8" rx="3"/>
<ellipse class="y" cx="100" cy="146" rx="7" ry="9"/>`;
    return `<rect class="nt" x="0" y="0" width="200" height="200"/>
<circle class="st" cx="30" cy="30" r="2.5"/><circle class="st" cx="62" cy="18" r="2"/><circle class="st" cx="170" cy="26" r="2.5"/><circle class="st" cx="150" cy="60" r="2"/><circle class="st" cx="20" cy="80" r="2"/>
<g transform="translate(16 40) scale(.36)">${lan(1, false)}</g>
<g transform="translate(140 74) scale(.3)">${lan(1, false)}</g>
<g transform="translate(150 6) scale(.22)">${lan(1, false)}</g>
<g transform="translate(10 -6) scale(.9)">${lan(1, true)}</g>
<path class="mt" d="M-10 172L36 146L66 162L104 138L146 164L176 150L210 162V210H-10Z"/>
<path class="g" d="M-10 188L48 170L92 184L140 172L210 188V210H-10Z"/>`;
  },
};

// ---------- 人物大頭（圓形） ----------
const shoulders = (cls) => `<path class="${cls}" d="M24 206Q30 150 100 144Q170 150 176 206Z"/>`;
const face = (cy) => `<circle class="e" cx="85" cy="${cy}" r="4.6"/><circle class="e" cx="115" cy="${cy}" r="4.6"/>
<circle class="ck" cx="74" cy="${cy + 14}" r="6"/><circle class="ck" cx="126" cy="${cy + 14}" r="6"/>`;
const ears = (cy) => `<circle class="s" cx="60" cy="${cy}" r="9"/><circle class="s" cx="140" cy="${cy}" r="9"/>`;

const portraits = {
  // 嬰兒：紅肚兜
  baby: () => `${shoulders("s")}
<path class="r" d="M100 150L134 176L100 210L66 176Z"/>
<path class="m" d="M80 160L92 142M120 160L108 142"/>
<text class="tb" x="100" y="186" font-size="22">福</text>
<circle class="s" cx="56" cy="104" r="10"/><circle class="s" cx="144" cy="104" r="10"/>
<circle class="s" cx="100" cy="100" r="46"/>
<path class="m" d="M94 56q8 -12 16 -1q-6 5 -10 0"/>
${face(102)}
<path class="m" d="M93 120q7 7 14 0"/>`,

  // 男孩：小黃帽、白制服、書包背帶
  boy: () => `${shoulders("p")}
<path class="p" d="M100 150L76 146L84 170Z"/><path class="p" d="M100 150L124 146L116 170Z"/>
<path class="r" d="M30 168L46 152L84 206H62Z"/>
<text class="nb" x="134" y="180" font-size="12">40312</text>
<rect class="s" x="88" y="126" width="24" height="24"/>
${ears(112)}
<circle class="s" cx="100" cy="110" r="38"/>
<path class="h" d="M64 100Q64 74 100 72Q136 74 136 100Q118 92 100 94Q82 92 64 100Z"/>
<path class="y" d="M60 92Q60 46 100 44Q140 46 140 92Q100 82 60 92Z"/>
<path class="y" d="M60 90Q100 80 140 90L148 98Q100 88 52 98Z"/>
<circle class="y" cx="100" cy="44" r="5"/>
${face(114)}
<path class="m" d="M91 130q9 8 18 0"/>`,

  // 女孩：耳下三公分、繡學號
  girl: () => `${shoulders("p")}
<path class="p" d="M100 150L74 146L82 174Z"/><path class="p" d="M100 150L126 146L118 174Z"/>
<path class="b" d="M92 160L100 168L108 160L105 184H95Z"/>
<text class="nb" x="140" y="176" font-size="12">20517</text>
<rect class="s" x="88" y="126" width="24" height="24"/>
<path class="h" d="M52 112Q50 50 100 46Q150 50 148 112V136H52Z"/>
<circle class="s" cx="100" cy="104" r="38"/>
<path class="h" d="M60 94Q60 54 100 52Q140 54 140 94Z"/>
<rect class="r" x="116" y="70" width="18" height="7" rx="3.5"/>
${face(108)}
<path class="m" d="M93 124q7 6 14 0"/>`,

  // 男人：機車半罩安全帽
  man: () => `${shoulders("b")}
<path class="p" d="M82 146L100 166L118 146L110 142H90Z"/>
<rect class="s" x="88" y="126" width="24" height="24"/>
${ears(110)}
<circle class="s" cx="100" cy="108" r="39"/>
<path class="m" d="M62 104Q64 136 84 148"/>
<path class="r" d="M56 100Q56 48 100 46Q144 48 144 100Q100 88 56 100Z"/>
<path class="m" d="M100 47V88" style="stroke:${C.tb};stroke-width:7"/>
<path class="k" d="M60 96Q100 84 140 96L148 104Q100 92 52 104Z"/>
<path class="m" d="M78 106h12M110 106h12"/>
${face(114)}
<path class="m" d="M90 132q10 5 20 0"/>`,

  // 女人：側分長髮、上班識別證
  woman: () => `<path class="h" d="M50 112Q48 48 100 46Q152 48 150 112V180H50Z"/>
${shoulders("g")}
<path class="p" d="M84 146L100 162L116 146Z"/>
<rect class="s" x="88" y="126" width="24" height="24"/>
<path class="fr" d="M80 150L100 184L120 150" style="stroke:${C.b};stroke-width:4"/>
<rect class="p" x="88" y="180" width="24" height="20" rx="3"/><rect class="b" x="92" y="184" width="16" height="5" rx="1"/>
<circle class="s" cx="100" cy="104" r="38"/>
<path class="h" d="M62 100Q58 54 100 52Q142 54 140 100Q130 76 108 70Q84 70 62 100Z"/>
<circle class="y" cx="63" cy="126" r="4"/><circle class="y" cx="137" cy="126" r="4"/>
${face(108)}
<path class="r" d="M92 124q8 7 16 0q-8 3 -16 0Z" style="stroke-width:2.4"/>`,

  // 阿公：白汗衫、蒲扇
  grandpa: () => `${shoulders("s")}
<path class="p" d="M50 206L58 160Q66 150 78 148Q100 176 122 148Q134 150 142 160L150 206Z"/>
<rect class="s" x="88" y="128" width="24" height="22"/>
${ears(108)}
<circle class="s" cx="100" cy="104" r="40"/>
<path class="hg" d="M61 104Q58 80 70 70L74 102Z"/><path class="hg" d="M139 104Q142 80 130 70L126 102Z"/>
<path class="m" d="M90 66q10 -6 20 0"/>
<path class="m" d="M86 80h28" style="stroke-width:2.4"/>
<path class="hg" d="M76 96h18v5h-18ZM106 96h18v5h-18Z"/>
<path class="m" d="M80 110q5 -5 10 0M110 110q5 -5 10 0"/>
<circle class="ck" cx="74" cy="122" r="6"/><circle class="ck" cx="126" cy="122" r="6"/>
<path class="m" d="M88 128q12 8 24 0"/>
<g transform="rotate(-24 152 170)"><ellipse class="y" cx="152" cy="160" rx="22" ry="26"/>
<path class="m" d="M152 136v50M140 142l12 44M164 142l-12 44" style="stroke:#c78f22;stroke-width:2"/>
<rect class="tr" x="148" y="184" width="8" height="22" rx="3"/></g>`,

  // 阿嬤：燙捲髮、花襯衫、珍珠項鍊
  grandma: () => {
    let curls = "";
    for (let a = 190; a <= 350; a += 20) {
      const t = (a * Math.PI) / 180;
      curls += `<circle class="hg" cx="${(100 + 44 * Math.cos(t)).toFixed(1)}" cy="${(102 + 44 * Math.sin(t)).toFixed(1)}" r="14"/>`;
    }
    const pearls = [78, 89, 100, 111, 122].map((x, i) => `<circle class="p" cx="${x}" cy="${154 + [-2, 2, 4, 2, -2][i]}" r="4"/>`).join("");
    return `${shoulders("fl")}
<path class="p" d="M80 146L100 160L120 146Z"/>
<rect class="s" x="88" y="128" width="24" height="22"/>
${curls}
<circle class="s" cx="100" cy="110" r="38"/>
<circle class="hg" cx="80" cy="76" r="12"/><circle class="hg" cx="100" cy="71" r="12"/><circle class="hg" cx="120" cy="76" r="12"/>
<path class="m" d="M79 110q6 -6 12 0M109 110q6 -6 12 0"/>
<circle class="gl" cx="85" cy="110" r="11"/><circle class="gl" cx="115" cy="110" r="11"/><path class="gl" d="M96 110h8"/>
<circle class="ck" cx="74" cy="126" r="6"/><circle class="ck" cx="126" cy="126" r="6"/>
<path class="m" d="M90 132q10 7 20 0"/>${pearls}`;
  },
};

function wrap(body, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400" role="img" aria-label="${label}">
<style>${CSS}</style><defs>${FLORAL}<clipPath id="cp"><circle cx="100" cy="100" r="100"/></clipPath></defs>
${body}
</svg>
`;
}

const ILLUS_LABEL = { cradle: "滿月：竹搖籃、花布被、紅蛋", island: "手牽手圍著台灣島", calendar: "農民曆撕日曆與新芽",
  home: "老公寓鐵窗與窗台的貓", elder: "榕樹下的板凳與茶壺", lantern: "平溪天燈" };
const PORTRAIT_LABEL = { baby: "嬰兒", boy: "男孩", girl: "女孩", man: "男人", woman: "女人", grandpa: "阿公", grandma: "阿嬤" };

fs.mkdirSync(OUT, { recursive: true });
for (const [k, fn] of Object.entries(illus)) {
  const bg = k === "home" || k === "lantern" ? "" : `<rect class="tile" width="200" height="200"/>`;
  fs.writeFileSync(path.join(OUT, `illus-${k}.svg`), wrap(bg + fn(), ILLUS_LABEL[k]));
}
for (const [k, fn] of Object.entries(portraits)) {
  fs.writeFileSync(path.join(OUT, `p-${k}.svg`),
    wrap(`<circle class="pbg" cx="100" cy="100" r="100"/><g clip-path="url(#cp)">${fn()}</g>`, PORTRAIT_LABEL[k]));
}
console.log("wrote", fs.readdirSync(OUT).length, "files to", OUT);
