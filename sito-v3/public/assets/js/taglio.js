/*
 * TO.DE.L. — simulazione del ciclo di taglio (laser fibra e plasma), vista dall'alto.
 *
 * Ricostruisce il comportamento di una macchina reale:
 * - il portale scorre in X, il carrello con la testa scorre lungo il portale (la testa è montata davanti al carrello);
 * - spostamento a vuoto rapido con accelerazione e frenata;
 * - sfondamento fuori dal profilo, attacco (lead-in) e taglio continuo;
 * - prima i fori interni, poi il contorno esterno; rallentamento sugli spigoli vivi;
 * - nessun raggio visibile: solo il punto di lavorazione, il bagliore sotto l'ugello e le scintille in scia.
 *
 * Uso: creaSimulazione(elemento, { scena: "eroe" | "storia" | "plasma", modo: "ciclo" | "scorrimento" })
 * Restituisce { play, pause, imposta(progresso 0-1), fasi, durata, distruggi }.
 */

const NS = "http://www.w3.org/2000/svg";
const f = (n) => Math.round(n * 100) / 100;

/* ---------- geometria dei pezzi (unità = mm) ---------- */

function foro(cx, cy, r) {
  return {
    taglio: `M${f(cx)} ${f(cy)} L${f(cx + r)} ${f(cy)} A${f(r)} ${f(r)} 0 1 0 ${f(cx - r)} ${f(cy)} A${f(r)} ${f(r)} 0 1 0 ${f(cx + r)} ${f(cy)}`,
    forma: `M${f(cx + r)} ${f(cy)} A${f(r)} ${f(r)} 0 1 1 ${f(cx - r)} ${f(cy)} A${f(r)} ${f(r)} 0 1 1 ${f(cx + r)} ${f(cy)} Z`,
    interno: true
  };
}

function asola(cx, cy, l, r) {
  const a = cx - l / 2, b = cx + l / 2;
  return {
    taglio: `M${f(cx)} ${f(cy)} L${f(cx)} ${f(cy - r)} L${f(a)} ${f(cy - r)} A${f(r)} ${f(r)} 0 0 0 ${f(a)} ${f(cy + r)} L${f(b)} ${f(cy + r)} A${f(r)} ${f(r)} 0 0 0 ${f(b)} ${f(cy - r)} L${f(cx)} ${f(cy - r)}`,
    forma: `M${f(a)} ${f(cy - r)} L${f(b)} ${f(cy - r)} A${f(r)} ${f(r)} 0 0 1 ${f(b)} ${f(cy + r)} L${f(a)} ${f(cy + r)} A${f(r)} ${f(r)} 0 0 1 ${f(a)} ${f(cy - r)} Z`,
    interno: true
  };
}

/* Staffa 300 × 170 mm con scasso, due fori Ø24, asola, foro Ø36. Origine in alto a sinistra. */
function staffa(ox, oy, s) {
  const p = (x, y) => `${f(ox + x * s)} ${f(oy + y * s)}`;
  const R = f(14 * s);
  const giro =
    `L${p(300, 156)} A${R} ${R} 0 0 1 ${p(286, 170)} L${p(14, 170)} A${R} ${R} 0 0 1 ${p(0, 156)} ` +
    `L${p(0, 14)} A${R} ${R} 0 0 1 ${p(14, 0)} L${p(230, 0)} L${p(230, 35)} L${p(286, 35)} A${R} ${R} 0 0 1 ${p(300, 49)} L${p(300, 110)}`;
  const esterno = {
    taglio: `M${p(316, 110)} L${p(300, 110)} ${giro}`,
    forma: `M${p(300, 110)} ${giro} Z`,
    interno: false
  };
  const X = (x) => ox + x * s, Y = (y) => oy + y * s;
  const interni = [
    foro(X(40), Y(40), 12 * s),
    foro(X(40), Y(130), 12 * s),
    asola(X(150), Y(85), 110 * s, 11 * s),
    foro(X(258), Y(118), 18 * s)
  ];
  return {
    contorni: [...interni, esterno],
    sagoma: esterno.forma + " " + interni.map((c) => c.forma).join(" "),
    box: { x: ox, y: oy, w: 300 * s, h: 170 * s }
  };
}

/* Flangia Ø240 con foro centrale Ø76 e 6 fori Ø20 su diametro 160. */
function flangia(cx, cy, s) {
  const r = 120 * s;
  const interni = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    interni.push(foro(cx + Math.cos(a) * 80 * s, cy + Math.sin(a) * 80 * s, 10 * s));
  }
  interni.push(foro(cx, cy, 38 * s));
  const esterno = {
    taglio: `M${f(cx + r + 16 * s)} ${f(cy)} L${f(cx + r)} ${f(cy)} A${f(r)} ${f(r)} 0 1 1 ${f(cx - r)} ${f(cy)} A${f(r)} ${f(r)} 0 1 1 ${f(cx + r)} ${f(cy)}`,
    forma: `M${f(cx + r)} ${f(cy)} A${f(r)} ${f(r)} 0 1 1 ${f(cx - r)} ${f(cy)} A${f(r)} ${f(r)} 0 1 1 ${f(cx + r)} ${f(cy)} Z`,
    interno: false
  };
  return {
    contorni: [...interni, esterno],
    sagoma: esterno.forma + " " + interni.map((c) => c.forma).join(" "),
    box: { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r }
  };
}

/* Anello per lamiera spessa (plasma). */
function anello(cx, cy, r1, r2) {
  const esterno = {
    taglio: `M${f(cx + r1 + 14)} ${f(cy)} L${f(cx + r1)} ${f(cy)} A${r1} ${r1} 0 1 1 ${f(cx - r1)} ${f(cy)} A${r1} ${r1} 0 1 1 ${f(cx + r1)} ${f(cy)}`,
    forma: `M${f(cx + r1)} ${f(cy)} A${r1} ${r1} 0 1 1 ${f(cx - r1)} ${f(cy)} A${r1} ${r1} 0 1 1 ${f(cx + r1)} ${f(cy)} Z`,
    interno: false
  };
  const interno = foro(cx, cy, r2);
  return { contorni: [interno, esterno], sagoma: esterno.forma + " " + interno.forma, box: { x: cx - r1, y: cy - r1, w: 2 * r1, h: 2 * r1 } };
}

/* ---------- scene ---------- */

const SCENE = {
  eroe: () => ({
    vista: [0, 0, 1000, 700],
    lamiera: { x: 28, y: 56, w: 884, h: 606 },
    casa: { x: 955, y: 120 },
    pezzi: [staffa(130, 170, 1), flangia(680, 420, 1)],
    tipo: "laser",
    vTaglio: 430, vRapido: 1250, tSfondamento: 0.26, attesa: 1.5,
    portale: 62, testa: 19, solco: 1.7
  }),
  storia: () => ({
    vista: [0, 0, 800, 520],
    lamiera: { x: 20, y: 30, w: 700, h: 470 },
    casa: { x: 760, y: 470 },
    pezzi: [staffa(150, 160, 1.45)],
    tipo: "laser",
    vTaglio: 380, vRapido: 1300, tSfondamento: 0.35, attesa: 1.2,
    portale: 58, testa: 21, solco: 2.1,
    quote: true, tracce: true, programma: true, scala: 1.45
  }),
  nesting: () => ({
    vista: [0, 0, 440, 600],
    lamiera: { x: 18, y: 18, w: 404, h: 564 },
    casa: { x: 425, y: 30 },
    pezzi: [staffa(40, 65, 0.55), flangia(320, 125, 0.5), staffa(225, 225, 0.55), flangia(110, 325, 0.5), staffa(40, 425, 0.55), flangia(320, 455, 0.5)],
    tipo: "laser",
    vTaglio: 300, vRapido: 900, tSfondamento: 0.22, attesa: 1.4,
    portale: 40, testa: 12, solco: 1.3
  }),
  nestingLargo: () => ({
    vista: [0, 0, 600, 420],
    lamiera: { x: 18, y: 18, w: 564, h: 384 },
    casa: { x: 585, y: 30 },
    pezzi: [staffa(40, 40, 0.55), staffa(226, 40, 0.55), flangia(478, 102, 0.5), flangia(102, 292, 0.5), staffa(192, 244, 0.55), staffa(378, 244, 0.55)],
    tipo: "laser",
    vTaglio: 300, vRapido: 900, tSfondamento: 0.22, attesa: 1.4,
    portale: 40, testa: 12, solco: 1.3
  }),
  plasma: () => ({
    vista: [0, 0, 400, 260],
    lamiera: { x: 14, y: 22, w: 340, h: 222 },
    casa: { x: 380, y: 40 },
    pezzi: [anello(176, 133, 70, 26)],
    tipo: "plasma",
    vTaglio: 125, vRapido: 520, tSfondamento: 0.7, attesa: 1.4,
    portale: 26, testa: 10, solco: 3.2
  })
};

/* ---------- campionamento analitico dei percorsi (solo M, L, A circolari) ---------- */
function campiona(d, passo) {
  const tok = d.match(/[MLAZ]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi);
  const seg = [];
  let i = 0, cmd = "", x = 0, y = 0;
  const num = () => parseFloat(tok[i++]);
  while (i < tok.length) {
    if (/[MLAZ]/i.test(tok[i])) cmd = tok[i++].toUpperCase();
    if (cmd === "M") { x = num(); y = num(); cmd = "L"; continue; }
    if (cmd === "L") {
      const nx = num(), ny = num();
      seg.push({ t: "l", x0: x, y0: y, x1: nx, y1: ny, l: Math.hypot(nx - x, ny - y) });
      x = nx; y = ny;
    } else if (cmd === "A") {
      let r = num(); num(); num();
      const fa = num(), fs = num(), nx = num(), ny = num();
      const dx = (x - nx) / 2, dy = (y - ny) / 2, q = dx * dx + dy * dy;
      if (q > r * r) r = Math.sqrt(q);
      const k = (fa === fs ? -1 : 1) * Math.sqrt(Math.max(0, (r * r - q) / (q || 1)));
      const cxp = k * dy, cyp = -k * dx;
      const cx = cxp + (x + nx) / 2, cy = cyp + (y + ny) / 2;
      const a0 = Math.atan2((dy - cyp) / r, (dx - cxp) / r);
      let da = Math.atan2((-dy - cyp) / r, (-dx - cxp) / r) - a0;
      if (!fs && da > 0) da -= 2 * Math.PI;
      if (fs && da < 0) da += 2 * Math.PI;
      seg.push({ t: "a", cx, cy, r, a0, da, l: Math.abs(da) * r });
      x = nx; y = ny;
    } else { i++; }
  }
  const lung = seg.reduce((a, b) => a + b.l, 0);
  const n = Math.max(2, Math.ceil(lung / passo));
  const pt = new Array(2 * (n + 1));
  let si = 0, base = 0;
  for (let j = 0; j <= n; j++) {
    const sl = Math.min(lung, (j / n) * lung);
    while (si < seg.length - 1 && base + seg[si].l < sl) { base += seg[si].l; si++; }
    const g = seg[si], u = g.l ? (sl - base) / g.l : 0;
    if (g.t === "l") { pt[2 * j] = g.x0 + (g.x1 - g.x0) * u; pt[2 * j + 1] = g.y0 + (g.y1 - g.y0) * u; }
    else { const a = g.a0 + g.da * u; pt[2 * j] = g.cx + Math.cos(a) * g.r; pt[2 * j + 1] = g.cy + Math.sin(a) * g.r; }
  }
  return { lung, n, pt };
}

/* ---------- utilità ---------- */

const el = (nome, attr = {}, figlio) => {
  const n = document.createElementNS(NS, nome);
  for (const k in attr) n.setAttribute(k, attr[k]);
  if (figlio) figlio.appendChild(n);
  return n;
};
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
let contatore = 0;

/* scrive una proprietà di stile solo se il valore è cambiato: meno ricalcoli a ogni fotogramma */
const scrivi = (n, prop, v) => {
  const k = "_" + prop;
  if (n[k] !== v) { n[k] = v; n.style[prop] = v; }
};

/* ---------- motore ---------- */

export function creaSimulazione(host, opzioni = {}) {
  const def = SCENE[opzioni.scena || "eroe"]();
  const modo = opzioni.modo || "ciclo";
  const id = "sim" + ++contatore;
  const [vx, vy, vw, vh] = def.vista;
  const plasma = def.tipo === "plasma";

  const svg = el("svg", { viewBox: def.vista.join(" "), class: "sim__svg", focusable: "false", preserveAspectRatio: "xMidYMid slice" });
  if (opzioni.etichetta) { svg.setAttribute("role", "img"); svg.setAttribute("aria-label", opzioni.etichetta); }
  else svg.setAttribute("aria-hidden", "true");
  const defs = el("defs", {}, svg);

  // piano a lamelle
  const lam = el("pattern", { id: id + "-lam", width: 24, height: 24, patternUnits: "userSpaceOnUse" }, defs);
  el("rect", { width: 24, height: 24, class: "sim__piano" }, lam);
  el("rect", { x: 10, width: 4, height: 24, class: "sim__lamella" }, lam);
  el("path", { d: "M10 0 L12 3 L14 0 M10 12 L12 15 L14 12", class: "sim__dente" }, lam);

  // lamiera: acciaio laminato, leggermente spazzolato
  const gl = el("linearGradient", { id: id + "-lmr", x1: 0, y1: 0, x2: 1, y2: 1 }, defs);
  el("stop", { offset: "0", class: "sim__lmr-1" }, gl);
  el("stop", { offset: "0.55", class: "sim__lmr-2" }, gl);
  el("stop", { offset: "1", class: "sim__lmr-3" }, gl);
  const spaz = el("pattern", { id: id + "-spz", width: 300, height: 7, patternUnits: "userSpaceOnUse" }, defs);
  el("path", { d: "M0 1.5 H120 M150 1.5 H300 M40 5 H260", class: "sim__spazzolato" }, spaz);

  // trave del portale: luce dall'alto, bordi più scuri
  const gt = el("linearGradient", { id: id + "-trv", x1: 0, y1: 0, x2: 1, y2: 0 }, defs);
  el("stop", { offset: "0", class: "sim__trv-1" }, gt);
  el("stop", { offset: "0.45", class: "sim__trv-2" }, gt);
  el("stop", { offset: "1", class: "sim__trv-3" }, gt);

  // bagliore sotto l'ugello
  const rg = el("radialGradient", { id: id + "-bgl" }, defs);
  const stopsBagliore = plasma
    ? [["0", "#ffffff", 1], ["0.32", "#e4ecff", 0.95], ["0.56", "#ffb46e", 0.5], ["1", "#ff7a2e", 0]]
    : [["0", "#ffffff", 1], ["0.3", "#fff1d6", 0.95], ["0.55", "#ffad5a", 0.55], ["1", "#ff7a2e", 0]];
  for (const [o, c, a] of stopsBagliore) el("stop", { offset: o, "stop-color": c, "stop-opacity": a }, rg);

  // scintille: gradiente lungo la scia
  el("rect", { x: vx - 10, y: vy - 10, width: vw + 20, height: vh + 20, fill: `url(#${id}-lam)` }, svg);
  const L = def.lamiera;
  el("rect", { x: L.x, y: L.y, width: L.w, height: L.h, fill: `url(#${id}-lmr)`, class: "sim__lamiera" }, svg);
  el("rect", { x: L.x, y: L.y, width: L.w, height: L.h, fill: `url(#${id}-spz)` }, svg);
  el("rect", { x: L.x + 0.5, y: L.y + 0.5, width: L.w - 1, height: L.h - 1, class: "sim__bordo-lamiera" }, svg);

  const lavoro = el("g", { class: "sim__lavoro" }, svg);
  const gTracce = def.tracce ? el("g", { class: "sim__tracce" }, svg) : null;
    const gScintille = el("g", { class: "sim__scintille" }, svg);
  const bagliore = el("circle", { r: 0, cx: 0, cy: 0, fill: `url(#${id}-bgl)`, class: "sim__bagliore" }, svg);

  // portale e carrello
  const P = def.portale, T = def.testa;
  const gPortale = el("g", { class: "sim__portale" }, svg);
  const offset = T + P * 0.62; // la testa sta davanti al carrello: il portale passa dietro
  el("rect", { x: offset, y: vy - 40, width: P, height: vh + 80, class: "sim__trave", fill: `url(#${id}-trv)` }, gPortale);
  el("rect", { x: offset + P * 0.18, y: vy - 40, width: P * 0.08, height: vh + 80, class: "sim__guida" }, gPortale);
  el("rect", { x: offset + P * 0.74, y: vy - 40, width: P * 0.08, height: vh + 80, class: "sim__guida" }, gPortale);
  const gCarrello = el("g", { class: "sim__carrello" }, svg);
  el("rect", { x: T * 0.4, y: -P * 0.78, width: offset - T * 0.4 + P * 1.05, height: P * 1.56, rx: P * 0.12, class: "sim__slitta" }, gCarrello);
  el("rect", { x: T * 0.55, y: -T * 0.5, width: offset - T * 0.2, height: T, class: "sim__staffa-testa" }, gCarrello);
  el("circle", { r: T, class: "sim__corpo-testa" }, gCarrello);
  el("circle", { r: T * 0.62, class: "sim__anello-testa" }, gCarrello);
  el("circle", { r: T * 0.26, class: "sim__ugello" }, gCarrello);

  // quote sopra la macchina, come un livello di annotazione del CAD
  const gQuote = def.quote ? el("g", { class: "sim__quote" }, svg) : null;

  // contorni
  const contorni = [];
  const pezzi = def.pezzi.map((pz, ip) => {
    const g = el("g", { class: "sim__pezzo" }, lavoro);
    if (def.programma) el("path", { d: pz.sagoma, "fill-rule": "evenodd", class: "sim__programma" }, g);
    const evid = el("path", { d: pz.sagoma, "fill-rule": "evenodd", class: "sim__finito" }, g);
    const lista = pz.contorni.map((c) => {
      // il solco sta sotto lo sfrido: l'attacco interno cade insieme al disco del foro
      const solco = el("path", { d: c.taglio, class: "sim__solco", "stroke-width": def.solco }, g);
      const caldo = el("path", { d: c.taglio, class: "sim__caldo", "stroke-width": def.solco * 1.5 }, g);
      const forma = el("path", { d: c.forma, class: c.interno ? "sim__sfrido" : "sim__staccato" }, g);
      const { lung, n, pt } = campiona(c.taglio, plasma ? 2.5 : 2);
      const foroPunto = el("circle", { cx: pt[0], cy: pt[1], r: def.solco * 1.35, class: "sim__foratura" }, g);
      solco.style.strokeDasharray = `${lung} ${lung + 10}`;
      const voce = { forma, solco, caldo, foroPunto, lung, n, pt, interno: c.interno, pezzo: ip };
      contorni.push(voce);
      return voce;
    });
    return { g, evid, lista, box: pz.box };
  });

  /* ---- tempi: rallentamento sugli spigoli, rapidi con accelerazione ---- */
  function tabellaTempi(c) {
    const { pt, n, lung } = c;
    const ds = lung / n;
    const ang = [];
    for (let i = 0; i < n; i++) ang.push(Math.atan2(pt[2 * i + 3] - pt[2 * i + 1], pt[2 * i + 2] - pt[2 * i]));
    const curva = ang.map((a, i) => {
      if (i === 0) return 0;
      let d = Math.abs(a - ang[i - 1]);
      if (d > Math.PI) d = 2 * Math.PI - d;
      return d;
    });
    // finestra: rallenta prima e dopo lo spigolo, come fa il controllo numerico
    const fatt = curva.map((_, i) => {
      let m = 1;
      for (let j = Math.max(0, i - 5); j <= Math.min(n - 1, i + 5); j++) {
        const k = 1 - Math.min(1, curva[j] / (Math.PI / 2.2)) * 0.78;
        const dist = Math.abs(j - i) / 6;
        m = Math.min(m, k + (1 - k) * dist * dist);
      }
      return m;
    });
    const tt = [0];
    for (let i = 0; i < n; i++) tt.push(tt[i] + ds / (def.vTaglio * fatt[i]));
    return tt;
  }

  const seg = [];
  let t = 0;
  let pos = { ...def.casa };
  const fasi = { primaForatura: 0, fineInterni: 0, fineEsterno: 0, fine: 0 };
  contorni.forEach((c, i) => {
    const ax = c.pt[0], ay = c.pt[1];
    const d = Math.hypot(ax - pos.x, ay - pos.y);
    const dur = 0.14 + d / def.vRapido;
    seg.push({ tipo: "rapido", t0: t, t1: t + dur, da: { ...pos }, a: { x: ax, y: ay } });
    t += dur;
    seg.push({ tipo: "foratura", t0: t, t1: t + def.tSfondamento, a: { x: ax, y: ay }, c });
    t += def.tSfondamento;
    if (i === 0) fasi.primaForatura = t;
    const tt = tabellaTempi(c);
    c.tt = tt;
    c.t0 = t;
    c.t1 = t + tt[tt.length - 1];
    seg.push({ tipo: "taglio", t0: c.t0, t1: c.t1, c });
    t = c.t1;
    pos = { x: c.pt[2 * c.n], y: c.pt[2 * c.n + 1] };
    const succ = contorni[i + 1];
    if (c.interno && (!succ || !succ.interno)) fasi.fineInterni = t;
    if (!succ || succ.pezzo !== c.pezzo) pezzi[c.pezzo].t1 = t;
  });
  fasi.fineEsterno = t;
  seg.push({ tipo: "attesa", t0: t, t1: t + def.attesa, a: { ...pos } });
  t += def.attesa;
  fasi.fine = t;
  const ritorno = { tipo: "ritorno", t0: t, t1: t + 0.7, da: { ...pos }, a: { ...def.casa } };
  seg.push(ritorno);
  const durataCiclo = t + 0.7;

  /* ---- quote e tracce (scena storia) ---- */
  if (gQuote) {
    const b = pezzi[0].box;
    const s = b.w / 300;
    const q = (x1, y1, x2, y2, tx, ty, testo, verticale) => {
      el("path", { d: `M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}`, class: "sim__quota-linea" }, gQuote);
      const fr = 5;
      if (!verticale) {
        el("path", { d: `M${f(x1)} ${f(y1 - fr)} L${f(x1)} ${f(y1 + fr)} M${f(x2)} ${f(y2 - fr)} L${f(x2)} ${f(y2 + fr)}`, class: "sim__quota-linea" }, gQuote);
      } else {
        el("path", { d: `M${f(x1 - fr)} ${f(y1)} L${f(x1 + fr)} ${f(y1)} M${f(x2 - fr)} ${f(y2)} L${f(x2 + fr)} ${f(y2)}`, class: "sim__quota-linea" }, gQuote);
      }
      const tx_ = el("text", { x: f(tx), y: f(ty), class: "sim__quota-testo", "text-anchor": "middle" }, gQuote);
      tx_.textContent = testo;
    };
    q(b.x, b.y - 22, b.x + b.w, b.y - 22, b.x + b.w / 2, b.y - 30, "300 mm");
    q(b.x - 24, b.y, b.x - 24, b.y + b.h, b.x - 34, b.y + b.h / 2 + 4, "170", true);
    const hx = b.x + 40 * s, hy = b.y + 40 * s;
    el("path", { d: `M${f(hx + 9 * s)} ${f(hy - 9 * s)} L${f(hx + 46 * s)} ${f(hy - 40 * s)} L${f(hx + 84 * s)} ${f(hy - 40 * s)}`, class: "sim__quota-linea" }, gQuote);
    const ft = el("text", { x: f(hx + 50 * s), y: f(hy - 46 * s), class: "sim__quota-testo" }, gQuote);
    ft.textContent = "Ø 24";
  }
  const tracce = [];
  if (gTracce) {
    seg.filter((s) => s.tipo === "rapido").forEach((s, i) => {
      if (i === 0) return; // il primo arriva da fuori lamiera
      const ln = el("path", { d: `M${f(s.da.x)} ${f(s.da.y)} L${f(s.a.x)} ${f(s.a.y)}`, class: "sim__traccia" }, gTracce);
      tracce.push({ ln, s });
    });
  }

  host.appendChild(svg);

  /* ---- scintille ---- */
  const MAX = plasma ? 64 : 56;
  const scint = [];
  for (let i = 0; i < MAX; i++) {
    const ln = el("line", { class: "sim__scintilla", x1: 0, y1: 0, x2: 0, y2: 0 }, gScintille);
    scint.push({ ln, vivo: false, x: 0, y: 0, vx: 0, vy: 0, eta: 0, vita: 0 });
  }
  let cursore = 0;
  function emetti(x, y, dir, apertura, vmin, vmax, vmin_vita, vmax_vita) {
    const s = scint[cursore];
    cursore = (cursore + 1) % MAX;
    const a = dir + (Math.random() - 0.5) * apertura;
    const v = vmin + Math.random() * (vmax - vmin);
    s.x = x; s.y = y; s.vx = Math.cos(a) * v; s.vy = Math.sin(a) * v;
    s.eta = 0; s.vita = vmin_vita + Math.random() * (vmax_vita - vmin_vita); s.vivo = true;
  }
  function aggiornaScintille(dt) {
    const sc = plasma ? 0.05 : 0.045;
    for (const s of scint) {
      if (!s.vivo) continue;
      s.eta += dt;
      if (s.eta >= s.vita) { s.vivo = false; scrivi(s.ln, "opacity", 0); continue; }
      const att = Math.exp(-3.2 * dt);
      s.vx *= att; s.vy *= att;
      s.x += s.vx * dt; s.y += s.vy * dt;
      const k = 1 - s.eta / s.vita;
      s.ln.setAttribute("x1", f(s.x));
      s.ln.setAttribute("y1", f(s.y));
      s.ln.setAttribute("x2", f(s.x - s.vx * sc));
      s.ln.setAttribute("y2", f(s.y - s.vy * sc));
      scrivi(s.ln, "opacity", f(k * k));
    }
  }
  function spegniScintille() {
    for (const s of scint) { s.vivo = false; scrivi(s.ln, "opacity", 0); }
  }

  /* ---- rendering di uno stato ---- */
  const lettura = opzioni.lettura || null; // { x, y, stato } elementi HTML
  let ultimoStato = "";
  let ultimaLettura = 0;
  let livelloBagliore = 0;
  let precedente = null;

  function trova(tt) {
    for (let i = 0; i < seg.length; i++) if (tt < seg[i].t1) return seg[i];
    return seg[seg.length - 1];
  }

  function puntoSu(c, tt) {
    // posizione lungo il contorno al tempo tt (ricerca binaria nella tabella)
    const tab = c.tt;
    const loc = tt - c.t0;
    let lo = 0, hi = tab.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (tab[m] <= loc) lo = m; else hi = m; }
    const u = clamp((loc - tab[lo]) / ((tab[hi] - tab[lo]) || 1));
    const i = lo;
    const x = c.pt[2 * i] + (c.pt[2 * hi] - c.pt[2 * i]) * u;
    const y = c.pt[2 * i + 1] + (c.pt[2 * hi + 1] - c.pt[2 * i + 1]) * u;
    return { x, y, fatto: ((i + u) / c.n) * c.lung };
  }

  function disegna(tt, dt, avanza) {
    const fineCiclo = modo === "ciclo" && tt > fasi.fine;
    const svanisce = fineCiclo ? clamp((tt - fasi.fine) / 0.6) : 0;
    scrivi(lavoro, "opacity", fineCiclo ? f(1 - svanisce) : "");

    // contorni
    for (const c of contorni) {
      let fatto = 0;
      if (tt >= c.t1) fatto = c.lung;
      else if (tt > c.t0) fatto = puntoSu(c, tt).fatto;
      scrivi(c.solco, "strokeDashoffset", f(c.lung - fatto));
      scrivi(c.solco, "opacity", fatto > 0.05 ? 1 : 0); // evita il puntino del terminale arrotondato
      scrivi(c.foroPunto, "opacity", tt >= c.t0 - 0.02 ? 1 : 0);
      // scia calda dietro la testa
      const coda = plasma ? 34 : 26;
      const dopo = tt - c.t1;
      if (fatto > 0 && (tt < c.t1 || dopo < 0.45)) {
        const vis = Math.min(coda, fatto);
        scrivi(c.caldo, "strokeDasharray", `0 ${f(fatto - vis)} ${f(vis)} ${f(c.lung + coda + 10)}`);
        scrivi(c.caldo, "opacity", tt < c.t1 ? 1 : f(1 - dopo / 0.45));
      } else {
        scrivi(c.caldo, "opacity", 0);
      }
      // sfrido che cade (fori) o pezzo che si stacca
      scrivi(c.forma, "opacity", c.interno ? f(clamp((tt - c.t1 - 0.08) / 0.3)) : 0);
    }
    for (const p of pezzi) scrivi(p.evid, "opacity", f(clamp((tt - p.t1 - 0.1) / 0.45)));
    for (const tr of tracce) scrivi(tr.ln, "opacity", tt >= tr.s.t0 ? f(clamp((tt - tr.s.t0) / 0.2)) : 0);

    // posizione della testa
    const s = trova(Math.min(tt, durataCiclo - 0.0001));
    let x, y, stato;
    if (s.tipo === "rapido" || s.tipo === "ritorno") {
      const u = easeInOut(clamp((tt - s.t0) / (s.t1 - s.t0)));
      x = s.da.x + (s.a.x - s.da.x) * u;
      y = s.da.y + (s.a.y - s.da.y) * u;
      stato = "Rapido";
    } else if (s.tipo === "foratura") {
      x = s.a.x; y = s.a.y; stato = "Sfondamento";
    } else if (s.tipo === "taglio") {
      const p = puntoSu(s.c, tt); x = p.x; y = p.y; stato = "Taglio";
    } else {
      x = s.a.x; y = s.a.y; stato = "Pezzo completato";
    }
    if (modo !== "ciclo" && tt >= fasi.fineEsterno) {
      x = s.a ? s.a.x : x; y = s.a ? s.a.y : y; stato = "Pezzo completato";
    } else if (modo !== "ciclo" && !avanza && s.tipo === "rapido") {
      stato = tt < 0.05 ? "Pronto" : "In attesa";
    }
    gPortale.setAttribute("transform", `translate(${f(x)} 0)`);
    gCarrello.setAttribute("transform", `translate(${f(x)} ${f(y)})`);

    // bagliore e scintille
    const target = s.tipo === "taglio" ? 1 : s.tipo === "foratura" ? 1.18 : 0;
    const muove = avanza && dt > 0;
    const obiettivo = muove || modo === "ciclo" ? target : target * 0.7;
    livelloBagliore += (obiettivo - livelloBagliore) * Math.min(1, dt * 18 || 1);
    const tremolio = 0.9 + Math.random() * 0.18;
    const rBase = T * (plasma ? 2.6 : 2.3);
    bagliore.setAttribute("cx", f(x));
    bagliore.setAttribute("cy", f(y));
    bagliore.setAttribute("r", f(Math.max(0, rBase * livelloBagliore * tremolio)));
    bagliore.setAttribute("opacity", f(clamp(livelloBagliore)));

    if (muove && precedente) {
      const mvx = (x - precedente.x) / dt, mvy = (y - precedente.y) / dt;
      if (s.tipo === "taglio") {
        const dir = Math.atan2(mvy, mvx) + Math.PI; // scia opposta all'avanzamento
        const quante = plasma ? 4 : 3;
        for (let k = 0; k < quante; k++) emetti(x, y, dir, plasma ? 0.85 : 0.65, plasma ? 220 : 320, plasma ? 640 : 900, 0.1, plasma ? 0.4 : 0.3);
      } else if (s.tipo === "foratura") {
        const quante = plasma ? 5 : 4;
        for (let k = 0; k < quante; k++) emetti(x, y, Math.random() * Math.PI * 2, 0.4, 160, plasma ? 620 : 560, 0.14, plasma ? 0.5 : 0.38);
      }
    }
    aggiornaScintille(dt);
    precedente = { x, y };

    // lettura coordinate macchina (mm), aggiornata a 15 Hz
    if (lettura) {
      const ora = performance.now();
      if (ora - ultimaLettura > 66 || !avanza) {
        ultimaLettura = ora;
        const sc = def.scala || 1;
        const mx = (x - L.x) / sc + (plasma ? 0 : 1180);
        const my = (L.y + L.h - y) / sc;
        if (lettura.x) lettura.x.textContent = mx.toFixed(1).replace(".", ",");
        if (lettura.y) lettura.y.textContent = my.toFixed(1).replace(".", ",");
      }
      if (lettura.stato && stato !== ultimoStato) {
        lettura.stato.textContent = stato;
        lettura.stato.dataset.stato = s.tipo;
      }
    }
    ultimoStato = stato;
    host.dataset.statoTaglio = s.tipo;
  }

  /* ---- ciclo di animazione ---- */
  let tempo = 0;
  let attivo = false;
  let raf = 0;
  let ultimo = 0;
  let obiettivoT = 0; // per lo scorrimento
  let concludere = false; // finisce il pezzo in corso, poi resta sul fotogramma finale
  let tVisualizzato = 0;

  function frame(ora) {
    const dt = ultimo ? Math.min(0.05, (ora - ultimo) / 1000) : 0;
    ultimo = ora;
    if (modo === "ciclo") {
      tempo += dt;
      if (concludere && tempo >= fasi.fineEsterno + 0.6) { concludere = false; statico(); return; }
      if (tempo >= durataCiclo) { tempo = 0; precedente = null; spegniScintille(); }
      disegna(tempo, dt, true);
    } else {
      const prima = tVisualizzato;
      tVisualizzato += (obiettivoT - tVisualizzato) * Math.min(1, dt * 9);
      if (Math.abs(obiettivoT - tVisualizzato) < 0.002) tVisualizzato = obiettivoT;
      const avanza = tVisualizzato > prima + 1e-4;
      disegna(tVisualizzato, dt, avanza);
    }
    if (attivo) raf = requestAnimationFrame(frame);
  }

  function play() {
    concludere = false;
    if (attivo) return;
    attivo = true;
    ultimo = 0;
    raf = requestAnimationFrame(frame);
  }
  function pause() {
    attivo = false;
    cancelAnimationFrame(raf);
    livelloBagliore = 0;
    bagliore.setAttribute("opacity", 0);
    spegniScintille();
  }
  function imposta(p) {
    obiettivoT = clamp(p) * fasi.fine;
  }
  function statico() {
    // fotogramma finale: pezzi completati, nessun movimento
    pause();
    tempo = fasi.fineEsterno + 0.6;
    tVisualizzato = obiettivoT = tempo;
    disegna(tempo, 0, false);
    bagliore.setAttribute("opacity", 0);
    gPortale.setAttribute("transform", `translate(${f(def.casa.x)} 0)`);
    gCarrello.setAttribute("transform", `translate(${f(def.casa.x)} ${f(def.casa.y)})`);
  }

  // stato iniziale
  if (modo === "ciclo") disegna(0, 0, false);
  else disegna(0, 0, false);

  function concludi() {
    if (!attivo) { statico(); return; }
    concludere = true;
  }

  function riavvia() {
    concludere = false;
    tempo = 0; tVisualizzato = obiettivoT = 0; precedente = null;
    spegniScintille();
    disegna(0, 0, false);
  }

  return {
    play, pause, imposta, statico, riavvia, concludi,
    durata: durataCiclo,
    fasi: {
      primaForatura: fasi.primaForatura / fasi.fine,
      fineInterni: fasi.fineInterni / fasi.fine,
      fineEsterno: fasi.fineEsterno / fasi.fine
    },
    distruggi() { pause(); svg.remove(); }
  };
}
export { campiona };
