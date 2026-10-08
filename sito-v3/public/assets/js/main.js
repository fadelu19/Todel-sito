/*
 * TO.DE.L. Automazione Industriale — comportamenti del sito (v3)
 * Modulo ES caricato in differita. La simulazione di taglio (taglio.js) viene importata solo quando serve.
 * Se questo script non parte, la pagina toglie la classe .js e mostra tutto senza animazioni.
 */

import { traccia } from "./consenso.js";

window.todelPronto = true;

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const docEl = document.documentElement;
const riduci = matchMedia("(prefers-reduced-motion: reduce)");
const puntatoreFine = matchMedia("(hover: hover) and (pointer: fine)");
const schermoMobile = matchMedia("(max-width: 760px)");
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

const CONFIG = (() => {
  try { return JSON.parse($("#config").textContent); } catch (e) { return {}; }
})();

/* archiviazione del browser: può non esserci (navigazione privata, anteprime) */
const archivio = (tipo) => ({
  get(k) { try { return window[tipo].getItem(k); } catch (e) { return null; } },
  set(k, v) { try { window[tipo].setItem(k, v); } catch (e) { /* ignorato */ } }
});
const sessione = archivio("sessionStorage");

const barra = $("[data-barra]");
const statoBarra = { eroe: true, contatti: false };

/* iOS applica :active solo se esiste un listener touchstart */
document.addEventListener("touchstart", () => {}, { passive: true });

/* =========================================================
   Statistiche e consenso: vedi consenso.js
   ========================================================= */
/* sorgente del traffico e campagna, salvate all'arrivo per allegarle alla richiesta */
(() => {
  const p = new URLSearchParams(location.search);
  const utm = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"].forEach((k) => { if (p.get(k)) utm[k] = p.get(k); });
  if (Object.keys(utm).length) sessione.set("todel-utm", JSON.stringify(utm));
  if (!sessione.get("todel-arrivo")) {
    sessione.set("todel-arrivo", JSON.stringify({ referrer: document.referrer || "diretto", pagina: location.pathname + location.search, quando: new Date().toISOString() }));
  }
})();

/* =========================================================
   Navigazione: più solida man mano che si scorre; profondità di lettura
   ========================================================= */
const nav = $("[data-nav]");
let tickScroll = false;
let profondita = 0;
const sogliePro = [25, 50, 75, 90];
function suScroll() {
  tickScroll = false;
  const y = window.scrollY;
  if (nav) nav.style.setProperty("--nav-p", Math.min(1, y / 260).toFixed(3));
  const tot = docEl.scrollHeight - window.innerHeight;
  const pct = tot > 0 ? Math.round((y / tot) * 100) : 0;
  sogliePro.forEach((s) => { if (pct >= s && profondita < s) { profondita = s; traccia("scroll_profondita", { percentuale: s }); } });
}
window.addEventListener("scroll", () => { if (!tickScroll) { tickScroll = true; requestAnimationFrame(suScroll); } }, { passive: true });
suScroll();

/* =========================================================
   Rivelazione allo scorrimento (una volta) e sezioni viste
   ========================================================= */
if ("IntersectionObserver" in window) {
  const oss = new IntersectionObserver((voci) => {
    voci.forEach((v) => { if (v.isIntersecting) { v.target.classList.add("is-dentro"); oss.unobserve(v.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
  $$("[data-rivela]").forEach((el) => oss.observe(el));

  const viste = new IntersectionObserver((voci) => {
    voci.forEach((v) => { if (v.isIntersecting) { traccia("sezione_vista", { sezione: v.target.id }); viste.unobserve(v.target); } });
  }, { threshold: 0.35 });
  $$("main > section[id]").forEach((s) => viste.observe(s));
} else {
  $$("[data-rivela]").forEach((el) => el.classList.add("is-dentro"));
}

/* =========================================================
   Molla (apple-design): { durata 0.5 s, bounce } con la velocità del dito.
   k = (2π/durata)², c = 4π(1 − bounce)/durata
   ========================================================= */
const molle = new WeakMap();
function fermaMolla(el, velo) {
  const m = molle.get(el);
  if (m) { m.a.cancel(); if (m.v) m.v.cancel(); molle.delete(el); }
  el.classList.remove("is-trascinato");
  el.style.transform = "";
  if (velo) velo.style.opacity = "";
}
function molla(el, { asse, da, a, v0, bounce, velo, dim, fatto }) {
  const durata = 0.5, k = Math.pow((2 * Math.PI) / durata, 2), c = (4 * Math.PI * (1 - bounce)) / durata;
  let x = da - a, v = v0, t = 0;
  const passo = 1 / 240, kf = [], vf = [];
  const tr = (p) => `translate${asse}(${p.toFixed(2)}px)`;
  while (t < 1.2) {
    for (let i = 0; i < 4; i++) { const acc = -k * x - c * v; v += acc * passo; x += v * passo; t += passo; }
    const pos = a + x;
    kf.push({ transform: tr(pos) });
    vf.push({ opacity: clamp(1 - pos / dim) });
    if (Math.abs(x) < 0.5 && Math.abs(v) < 10) break;
  }
  kf.push({ transform: tr(a) });
  vf.push({ opacity: clamp(1 - a / dim) });
  const ms = Math.round(t * 1000);
  el.classList.add("is-trascinato");
  const an = el.animate(kf, { duration: ms, easing: "linear", fill: "forwards" });
  const av = velo ? velo.animate(vf, { duration: ms, easing: "linear", fill: "forwards" }) : null;
  molle.set(el, { a: an, v: av });
  an.onfinish = () => {
    molle.delete(el);
    fatto();
    requestAnimationFrame(() => {
      if (av) av.cancel();
      an.cancel();
      el.style.transform = "";
      if (velo) velo.style.opacity = "";
      el.classList.remove("is-trascinato");
    });
  };
}
/* trascinamento 1:1 con smorzamento oltre il limite; rilascio proiettato sulla velocità */
function trascinabile(el, { maniglia, asse, velo, aperto, chiudi, ripristina }) {
  let drag = null;
  const pos = (e) => (asse === "X" ? e.clientX : e.clientY);
  const altro = (e) => (asse === "X" ? e.clientY : e.clientX);
  (maniglia || el).addEventListener("pointerdown", (e) => {
    if (drag || !aperto() || riduci.matches || (e.pointerType === "mouse" && e.button !== 0)) return;
    const m = molle.get(el);
    let p0 = 0;
    if (m) {
      p0 = asse === "X" ? new DOMMatrixReadOnly(getComputedStyle(el).transform).m41 : new DOMMatrixReadOnly(getComputedStyle(el).transform).m42;
      m.a.cancel(); if (m.v) m.v.cancel(); molle.delete(el);
      el.classList.add("is-trascinato");
      el.style.transform = `translate${asse}(${p0}px)`;
    }
    drag = { id: e.pointerId, inizio: pos(e) - p0, inizioAltro: altro(e), attivo: p0 > 0 || !!maniglia, storia: [{ p: p0, t: e.timeStamp }] };
    if (maniglia) { try { maniglia.setPointerCapture(e.pointerId); } catch (err) { /* già rilasciato */ } el.classList.add("is-trascinato"); }
  });
  const sorgente = maniglia || el;
  sorgente.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const grezzo = pos(e) - drag.inizio;
    if (!drag.attivo) {
      const d2 = Math.abs(altro(e) - drag.inizioAltro);
      if (d2 > 10 && d2 > Math.abs(grezzo)) { drag = null; return; }
      if (grezzo < 8) return;
      drag.attivo = true;
      try { sorgente.setPointerCapture(e.pointerId); } catch (err) { /* già rilasciato */ }
      el.classList.add("is-trascinato");
    }
    const d = grezzo >= 0 ? grezzo : -Math.min(40, Math.pow(-grezzo, 0.7));
    const dim = asse === "X" ? el.offsetWidth : el.offsetHeight;
    el.style.transform = `translate${asse}(${d}px)`;
    if (velo) velo.style.opacity = String(clamp(1 - Math.max(0, d) / dim));
    drag.storia.push({ p: d, t: e.timeStamp });
    if (drag.storia.length > 6) drag.storia.shift();
  });
  const rilascia = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag; drag = null;
    if (!d.attivo) return;
    const dim = asse === "X" ? el.offsetWidth : el.offsetHeight;
    const u = d.storia[d.storia.length - 1], p = d.storia[0];
    const v = (u.p - p.p) / Math.max(1, u.t - p.t);
    const proiettato = u.p + v * 180;
    const vaChiuso = proiettato > dim * 0.5 || v > 0.11;
    if (u.p === 0 && !vaChiuso) { fermaMolla(el, velo); ripristina && ripristina(); return; }
    molla(el, { asse, da: u.p, a: vaChiuso ? dim : 0, v0: v * 1000, bounce: vaChiuso ? 0 : 0.2, velo, dim, fatto: () => { if (vaChiuso) chiudi(); } });
  };
  sorgente.addEventListener("pointerup", rilascia);
  sorgente.addEventListener("pointercancel", rilascia);
}

/* cronologia del browser: in alcuni contesti incorporati può essere bloccata */
const cronologia = (metodo, stato, url) => { try { history[metodo](stato, "", url); } catch (e) { /* non disponibile */ } };

let blocchi = 0;
function bloccaPagina(si) {
  blocchi = Math.max(0, blocchi + (si ? 1 : -1));
  docEl.style.overflow = blocchi ? "hidden" : "";
  $$("body > header, body > main, body > footer, [data-barra]").forEach((n) => { n.inert = blocchi > 0; });
}

/* =========================================================
   Tendina "Macchine": nasce dal pulsante
   ========================================================= */
const tendina = $("[data-tendina]");
let chiudiTendina = () => {};
if (tendina) {
  const apriT = $("[data-tendina-apri]", tendina);
  const pan = $("[data-tendina-pannello]", tendina);
  let timer = null;
  const apri = () => {
    clearTimeout(timer);
    pan.hidden = false;
    const pr = pan.getBoundingClientRect(), trc = apriT.getBoundingClientRect();
    pan.style.setProperty("--origine", trc.left + trc.width / 2 - pr.left + "px top");
    void pan.offsetWidth;
    pan.setAttribute("data-aperta", "");
    apriT.setAttribute("aria-expanded", "true");
  };
  chiudiTendina = (focus) => {
    if (apriT.getAttribute("aria-expanded") !== "true") return;
    pan.removeAttribute("data-aperta");
    apriT.setAttribute("aria-expanded", "false");
    timer = setTimeout(() => { if (!pan.hasAttribute("data-aperta")) pan.hidden = true; }, 160);
    if (focus) apriT.focus();
  };
  apriT.addEventListener("click", () => (apriT.getAttribute("aria-expanded") === "true" ? chiudiTendina(false) : apri()));
  document.addEventListener("pointerdown", (e) => { if (!tendina.contains(e.target)) chiudiTendina(false); });
  tendina.addEventListener("keydown", (e) => { if (e.key === "Escape") chiudiTendina(true); });
  tendina.addEventListener("focusout", (e) => { if (!tendina.contains(e.relatedTarget)) chiudiTendina(false); });
}

/* =========================================================
   Cassetto mobile
   ========================================================= */
const cassetto = $("[data-cassetto]");
const velo = $("[data-velo]");
const burger = $("[data-cassetto-apri]");
const cassettoAperto = () => cassetto && cassetto.hasAttribute("data-aperto");
function apriCassetto() {
  fermaMolla(cassetto, velo);
  cassetto.hidden = false; velo.hidden = false;
  void cassetto.offsetWidth;
  cassetto.setAttribute("data-aperto", ""); velo.setAttribute("data-aperto", "");
  burger.setAttribute("aria-expanded", "true");
  bloccaPagina(true);
  aggiornaBarra();
  setTimeout(() => { const a = $("a", cassetto); if (a) a.focus({ preventScroll: true }); }, 60);
}
function chiudiCassetto(focus = true, immediato = false) {
  if (!cassettoAperto()) return;
  fermaMolla(cassetto, velo);
  cassetto.removeAttribute("data-aperto"); velo.removeAttribute("data-aperto");
  burger.setAttribute("aria-expanded", "false");
  bloccaPagina(false);
  if (immediato) { cassetto.hidden = true; velo.hidden = true; }
  aggiornaBarra();
  if (focus) burger.focus({ preventScroll: true });
}
if (cassetto && velo && burger) {
  cassetto.addEventListener("transitionend", (e) => {
    if (e.target === cassetto && !cassettoAperto()) { cassetto.hidden = true; velo.hidden = true; }
  });
  burger.addEventListener("click", () => (cassettoAperto() ? chiudiCassetto() : apriCassetto()));
  $("[data-cassetto-chiudi]", cassetto).addEventListener("click", () => chiudiCassetto());
  velo.addEventListener("click", () => chiudiCassetto());
  cassetto.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { chiudiCassetto(); return; }
    trappola(e, cassetto);
  });
  $$("a:not([data-apri])", cassetto).forEach((a) => a.addEventListener("click", () => chiudiCassetto(false)));
  matchMedia("(min-width: 1061px)").addEventListener("change", (m) => { if (m.matches) chiudiCassetto(false, true); });
  trascinabile(cassetto, {
    asse: "X", velo, aperto: cassettoAperto,
    chiudi: () => {
      cassetto.removeAttribute("data-aperto"); velo.removeAttribute("data-aperto");
      burger.setAttribute("aria-expanded", "false"); bloccaPagina(false);
      cassetto.hidden = true; velo.hidden = true; aggiornaBarra();
    }
  });
}

/* trappola del focus per finestre modali */
function trappola(e, contenitore) {
  if (e.key !== "Tab") return;
  const f = $$('a[href]:not([hidden]), button:not([disabled]):not([hidden]), [tabindex]:not([tabindex="-1"])', contenitore).filter((n) => n.offsetParent !== null);
  if (!f.length) return;
  const primo = f[0], ultimo = f[f.length - 1];
  if (e.shiftKey && (document.activeElement === primo || document.activeElement === contenitore)) { e.preventDefault(); ultimo.focus(); }
  else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primo.focus(); }
}

/* =========================================================
   Approfondimenti: pannello laterale (computer) o foglio dal basso (telefono)
   ========================================================= */
const pannello = $("[data-pannello]");
const foglio = $("[data-pannello-foglio]");
const scorriP = $("[data-pannello-scorri]");
const ctaPannello = $("[data-pannello-cta]");
const pannelloVelo = $(".pannello__velo");
let articolo = null;
let rientro = null;
/* da dove si è aperto il pannello: se il link sta in un menu che si chiude, si torna al suo pulsante */
function puntoDiRientro(el) {
  if (!el || el === document.body) return null;
  if (el.closest("[data-tendina-pannello]")) return $("[data-tendina-apri]");
  if (el.closest(".cassetto")) return burger;
  return el;
}
const pannelloAperto = () => pannello && pannello.hasAttribute("data-aperto");

function apriPannello(id, origine, daStoria = false) {
  const art = document.getElementById(id);
  if (!pannello || !art || !art.classList.contains("appro")) return false;
  if (articolo && articolo !== art) articolo.hidden = true;
  art.hidden = false;
  articolo = art;
  const titolo = $("h2", art);
  if (titolo) foglio.setAttribute("aria-labelledby", titolo.id);
  ctaPannello.dataset.prefill = art.dataset.soluzione;
  scorriP.scrollTop = 0;
  if (!pannelloAperto()) {
    rientro = puntoDiRientro(document.activeElement) || rientro;
    fermaMolla(foglio, pannelloVelo);
    pannello.hidden = false;
    void foglio.offsetWidth;
    pannello.setAttribute("data-aperto", "");
    bloccaPagina(true);
    aggiornaBarra();
  }
  if (!daStoria) cronologia("pushState", { pannello: id }, "#" + id);
  animaApprofondimento(art);
  setTimeout(() => foglio.focus({ preventScroll: true }), 40);
  traccia("apri_approfondimento", { soluzione: art.dataset.soluzione, origine: origine || "pagina" });
  return true;
}
function chiudiPannello({ daStoria = false, restituisci = true, sostituisci = null } = {}) {
  if (!pannelloAperto()) return;
  fermaMolla(foglio, pannelloVelo);
  pannello.removeAttribute("data-aperto");
  bloccaPagina(false);
  aggiornaBarra();
  if (!daStoria) {
    if (sostituisci !== null) cronologia("replaceState", null, sostituisci || location.pathname + location.search);
    else if (history.state && history.state.pannello) history.back();
    else cronologia("replaceState", null, location.pathname + location.search);
  }
  if (restituisci && rientro && document.contains(rientro)) rientro.focus({ preventScroll: true });
}
if (pannello) {
  foglio.addEventListener("transitionend", (e) => {
    if (e.target === foglio && !pannelloAperto()) { pannello.hidden = true; if (articolo) articolo.hidden = true; }
  });
  $$("[data-pannello-chiudi]", pannello).forEach((b) => b.addEventListener("click", () => chiudiPannello()));
  pannello.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { chiudiPannello(); return; }
    trappola(e, foglio);
  });
  window.addEventListener("popstate", (e) => {
    const stato = e.state && e.state.pannello;
    if (stato) apriPannello(stato, "cronologia", true);
    else if (pannelloAperto()) chiudiPannello({ daStoria: true });
  });
  ctaPannello.addEventListener("click", (e) => {
    e.preventDefault();
    precompila(ctaPannello.dataset.prefill, "approfondimento");
    traccia("cta_preventivo", { origine: "approfondimento", soluzione: ctaPannello.dataset.prefill });
    chiudiPannello({ restituisci: false, sostituisci: "#contatti" });
    requestAnimationFrame(() => vaiAlModulo());
  });
  trascinabile(foglio, {
    asse: "Y", maniglia: $("[data-pannello-maniglia]", pannello), velo: pannelloVelo, aperto: () => pannelloAperto() && schermoMobile.matches,
    chiudi: () => { chiudiPannello(); pannello.hidden = true; if (articolo) articolo.hidden = true; }
  });
  /* indirizzo cambiato a mano (es. si scrive #taglio-plasma nella barra): apre l'approfondimento */
  window.addEventListener("hashchange", () => {
    const id = location.hash.slice(1);
    const el = id && document.getElementById(id);
    if (el && el.classList.contains("appro") && !pannelloAperto()) {
      cronologia("replaceState", { pannello: id }, "#" + id);
      apriPannello(id, "indirizzo", true);
    }
  });
  /* link diretto a un approfondimento (es. /#taglio-laser-fibra) */
  const iniziale = location.hash.slice(1);
  if (iniziale && document.getElementById(iniziale) && document.getElementById(iniziale).classList.contains("appro")) {
    cronologia("replaceState", null, location.pathname + location.search);
    apriPannello(iniziale, "link-diretto");
  }
}

/* =========================================================
   Precompilazione della richiesta
   ========================================================= */
const modulo = $("[data-modulo]");
const campoSoluzione = $("[data-campo-soluzione]");
const chip = $("[data-richiesta]");
const chipTesto = $("[data-richiesta-testo]");
const campoMessaggio = $("[data-messaggio]");
const ESEMPI = {
  "Taglio laser fibra": "Es. lamiere inox fino a 10 mm, formato 3000 × 1500",
  "Taglio plasma": "Es. lamiere al carbonio di forte spessore, formato del banco",
  "Piegatura e cesoie": "Es. lunghezza di piega, spessori e materiali",
  "Saldatura e pulizia laser": "Es. carpenteria inox da saldare, spessori",
  "Automazione e cobot": "Es. quale operazione ripetitiva volete automatizzare",
  "Retrofit CNC": "Es. tipo di macchina, anno e controllo attuale",
  "Macchinari usati": "Es. lavorazione, materiali e formato",
  "Supporto finanziario per l’acquisto": "Es. macchina di interesse e tempi previsti"
};
const esempioBase = campoMessaggio ? campoMessaggio.placeholder : "";
let ultimaOrigine = "";

function precompila(soluzione, origine) {
  if (!campoSoluzione || !soluzione) return;
  campoSoluzione.value = soluzione;
  chipTesto.textContent = soluzione;
  chip.hidden = false;
  campoMessaggio.placeholder = ESEMPI[soluzione] || esempioBase;
  ultimaOrigine = origine || ultimaOrigine;
  traccia("seleziona_soluzione", { soluzione, origine: origine || "pagina" });
}
function vaiAlModulo() {
  const dest = $("#contatti");
  if (!dest) return;
  dest.scrollIntoView({ behavior: riduci.matches ? "auto" : "smooth", block: "start" });
  if (puntatoreFine.matches) setTimeout(() => { const n = $("#f-nome"); if (n && !n.value) n.focus({ preventScroll: true }); }, riduci.matches ? 0 : 650);
}
if (chip) {
  $("[data-richiesta-togli]", chip).addEventListener("click", () => {
    campoSoluzione.value = "";
    chip.hidden = true;
    campoMessaggio.placeholder = esempioBase;
    campoMessaggio.focus();
  });
}

/* =========================================================
   Click: approfondimenti, CTA, telefono e altri eventi
   ========================================================= */
const zona = (el) => (el.closest("[data-nav]") ? "navigazione" : el.closest(".cassetto") ? "menu-mobile" : el.closest("footer") ? "footer" : (el.closest("main > section[id]") || {}).id || "pagina");
document.addEventListener("click", (e) => {
  const apri = e.target.closest("[data-apri]");
  if (apri) {
    e.preventDefault();
    if (!pannelloAperto()) rientro = puntoDiRientro(apri);
    chiudiTendina(false);
    const inCassetto = cassetto && cassetto.contains(apri);
    if (inCassetto) chiudiCassetto(false, true);
    apriPannello(apri.dataset.apri, apri.dataset.origine || zona(apri));
    return;
  }
  const pre = e.target.closest("[data-prefill]");
  if (pre && pre !== ctaPannello) {
    precompila(pre.dataset.prefill, pre.dataset.cta || zona(pre));
    if (puntatoreFine.matches) setTimeout(() => { const n = $("#f-nome"); if (n && !n.value) n.focus({ preventScroll: true }); }, riduci.matches ? 0 : 700);
  }
  const cta = e.target.closest("[data-cta]");
  if (cta && cta !== ctaPannello) {
    ultimaOrigine = cta.dataset.cta;
    traccia("cta_preventivo", { origine: cta.dataset.cta });
  }
  const tr = e.target.closest("[data-traccia]");
  if (tr) traccia(tr.dataset.traccia, { origine: tr.dataset.origine || zona(tr) });
});

/* =========================================================
   Simulazioni di taglio (caricate solo quando servono)
   ========================================================= */
let modTaglio = null;
const caricaTaglio = () => modTaglio || (modTaglio = import("./taglio.js"));
const lettureDi = (el) => ({ x: $("[data-lettura-x]", el), y: $("[data-lettura-y]", el), stato: $("[data-lettura-stato]", el) });

/* video della hero: se configurato sostituisce la simulazione (poster subito, video differito) */
function videoEroe() {
  const v = CONFIG.videoEroe || {};
  if (!v.mp4 && !v.webm) return false;
  const media = $("[data-eroe-media]");
  const box = $('[data-sim="eroe"]', media);
  box.removeAttribute("data-sim");
  box.classList.add("sim--video");
  $$(".sim__hud, .sim__dati", box).forEach((n) => n.remove());
  const video = document.createElement("video");
  video.muted = true; video.loop = true; video.playsInline = true; video.preload = "none";
  video.setAttribute("muted", ""); video.setAttribute("playsinline", "");
  if (v.poster) video.poster = v.poster;
  video.setAttribute("aria-hidden", "true");
  video.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover";
  box.prepend(video);
  box.setAttribute("aria-label", v.didascalia || "Video del taglio laser");
  const didascalia = $(".eroe__didascalia span", media);
  if (didascalia) didascalia.textContent = v.didascalia || "Video del taglio laser fibra";
  const pausa = $("[data-sim-pausa]");
  const conn = navigator.connection || {};
  const lento = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || "");
  if (riduci.matches || lento) { if (pausa) pausa.hidden = true; return true; }
  let inPausa = false, inVista = false, avviato = false;
  const aggiorna = () => { if (!avviato) return; (inVista && !inPausa && !document.hidden) ? video.play().catch(() => {}) : video.pause(); };
  const carica = () => {
    if (v.webm) { const s = document.createElement("source"); s.src = v.webm; s.type = "video/webm"; video.appendChild(s); }
    const mp4 = schermoMobile.matches && v.mp4Mobile ? v.mp4Mobile : v.mp4;
    if (mp4) { const s = document.createElement("source"); s.src = mp4; s.type = "video/mp4"; video.appendChild(s); }
    video.load();
    avviato = true;
    aggiorna();
    video.addEventListener("playing", () => traccia("video_play", { video: "hero" }), { once: true });
  };
  const differisci = () => ("requestIdleCallback" in window ? requestIdleCallback(carica, { timeout: 2000 }) : setTimeout(carica, 400));
  if (document.readyState === "complete") differisci(); else window.addEventListener("load", differisci, { once: true });
  new IntersectionObserver((x) => { inVista = x[0].isIntersecting; aggiorna(); }, { threshold: 0.2 }).observe(box);
  document.addEventListener("visibilitychange", aggiorna);
  if (pausa) pausa.addEventListener("click", () => { inPausa = !inPausa; segnaPausa(pausa, inPausa); aggiorna(); });
  return true;
}
function segnaPausa(btn, inPausa) {
  btn.setAttribute("aria-pressed", String(inPausa));
  $("[data-sim-pausa-testo]", btn).textContent = inPausa ? "Riprendi" : "Pausa";
  $("use", btn).setAttribute("href", inPausa ? "#i-play" : "#i-pausa");
}

const simEroe = $('[data-sim="eroe"]');
if (simEroe && !videoEroe()) {
  const pausa = $("[data-sim-pausa]");
  // la simulazione parte dopo il primo disegno della pagina: il titolo (LCP) arriva prima
  const quandoLibero = (fn) => ("requestIdleCallback" in window ? requestIdleCallback(fn, { timeout: 900 }) : setTimeout(fn, 200));
  new Promise((ok) => quandoLibero(ok)).then(caricaTaglio).then(({ creaSimulazione }) => {
    const sim = creaSimulazione(simEroe, { scena: "eroe", modo: "ciclo", lettura: lettureDi(simEroe), etichetta: simEroe.dataset.etichetta });
    if (riduci.matches) { sim.statico(); if (pausa) pausa.hidden = true; return; }
    let inVista = false, inPausa = false;
    const aggiorna = () => (inVista && !inPausa && !document.hidden ? sim.play() : sim.pause());
    new IntersectionObserver((v) => { inVista = v[0].isIntersecting; aggiorna(); }, { threshold: 0.15 }).observe(simEroe);
    document.addEventListener("visibilitychange", aggiorna);
    if (pausa) pausa.addEventListener("click", () => { inPausa = !inPausa; segnaPausa(pausa, inPausa); aggiorna(); traccia("pausa_animazione", { stato: inPausa ? "pausa" : "ripresa" }); });
  });
}

/* storia del taglio guidata dallo scorrimento */
const storia = $("[data-storia]");
if (storia) {
  const simEl = $('[data-sim="storia"]', storia);
  const passi = $$(".passo", storia);
  const indice = $$(".storia__indice li", storia);
  let sim = null, confini = [0, 0.1, 0.5, 0.9, 1], attivo = false, faseCorrente = -1;
  const segna = (k) => {
    if (k === faseCorrente) return;
    faseCorrente = k;
    simEl.dataset.fase = String(k);
    passi.forEach((p, i) => p.classList.toggle("is-attivo", i === k));
    indice.forEach((l, i) => l.classList.toggle("is-attivo", i === k));
  };
  const calcola = () => {
    if (!sim) return;
    const ancora = window.innerHeight * (schermoMobile.matches ? 0.72 : 0.58);
    let k = 0, loc = 0;
    passi.forEach((p, i) => {
      const r = p.getBoundingClientRect();
      if (r.top <= ancora) { k = i; loc = clamp((ancora - r.top) / r.height); }
    });
    sim.imposta(confini[k] + (confini[k + 1] - confini[k]) * loc);
    segna(k);
  };
  let tick = false;
  const suScrollStoria = () => { if (!tick) { tick = true; requestAnimationFrame(() => { tick = false; calcola(); }); } };
  const avvia = () => {
    caricaTaglio().then(({ creaSimulazione }) => {
      if (sim) return;
      sim = creaSimulazione(simEl, { scena: "storia", modo: "scorrimento", lettura: lettureDi(simEl) });
      const f = sim.fasi;
      confini = [0, f.primaForatura, f.fineInterni, f.fineEsterno, 1];
      if (riduci.matches) { sim.statico(); segna(3); passi.forEach((p) => p.classList.add("is-attivo")); return; }
      calcola();
      if (attivo) sim.play();
    });
  };
  new IntersectionObserver((v) => {
    attivo = v[0].isIntersecting;
    if (attivo) {
      if (!sim) avvia();
      else if (!riduci.matches) sim.play();
      window.addEventListener("scroll", suScrollStoria, { passive: true });
      window.addEventListener("resize", suScrollStoria, { passive: true });
      calcola();
    } else {
      if (sim) sim.pause();
      window.removeEventListener("scroll", suScrollStoria);
      window.removeEventListener("resize", suScrollStoria);
    }
  }, { rootMargin: "300px 0px" }).observe(storia);
}

/* =========================================================
   Schede con animazione tecnica: al passaggio del mouse (computer),
   quando entrano nello schermo (telefono). Si fermano a fine ciclo.
   ========================================================= */
const CICLI = new Set(["piega-punzone", "salda-rivela", "cobot-spalla", "retrofit-tendina"]);

/* simulazione dentro una scheda: ferma sul pezzo finito; parte al passaggio del mouse e si ferma
   quando il mouse esce (resta dov'è, come una macchina in pausa). Su telefono: un ciclo e poi si ferma. */
function simInterattiva(box, area) {
  let sim = null, avviata = false;
  const prepara = () => (sim ? Promise.resolve(sim) : caricaTaglio().then(({ creaSimulazione }) => {
    if (!sim) { sim = creaSimulazione(box, { scena: box.dataset.sim, modo: "ciclo" }); sim.statico(); }
    return sim;
  }));
  const parti = (unaVolta) => {
    if (riduci.matches) return;
    prepara().then((s) => {
      if (!avviata) { s.riavvia(); avviata = true; }
      s.play();
      if (unaVolta) s.concludi();
    });
  };
  const ferma = () => { if (sim) sim.pause(); };
  new IntersectionObserver((v, o) => { if (v[0].isIntersecting) { prepara(); o.disconnect(); } }, { rootMargin: "300px 0px" }).observe(box);
  area.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") parti(false); });
  area.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") ferma(); });
  if (!puntatoreFine.matches) {
    new IntersectionObserver((v) => {
      if (v[0].isIntersecting) { avviata = false; parti(true); } else ferma();
    }, { threshold: 0.6 }).observe(box);
  }
  return { parti, ferma, prepara };
}

$$("[data-anima]").forEach((scheda) => {
  const simBox = $("[data-sim]", scheda);
  if (simBox) { simInterattiva(simBox, scheda); return; }
  let fermaAFine = false, cicli = 0, cicliMax = Infinity;
  const attiva = (max) => {
    if (riduci.matches) return;
    fermaAFine = false; cicli = 0; cicliMax = max || Infinity;
    scheda.classList.add("is-attiva");
  };
  const disattiva = () => { scheda.classList.remove("is-attiva"); fermaAFine = false; };
  scheda.addEventListener("animationiteration", (e) => {
    if (!CICLI.has(e.animationName)) return;
    cicli++;
    if (fermaAFine || cicli >= cicliMax) disattiva();
  });
  // computer: anteprima del processo al passaggio del mouse, si chiude a fine ciclo
  scheda.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") attiva(); });
  scheda.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") fermaAFine = true; });
  scheda.addEventListener("focusin", () => { if (!scheda.classList.contains("is-attiva")) attiva(1); });
  // telefono: un ciclo quando la scheda è ben visibile
  if (!puntatoreFine.matches) {
    new IntersectionObserver((v) => { if (v[0].isIntersecting) attiva(1); }, { threshold: 0.6 }).observe(scheda);
  }
});

/* approfondimenti: lo stesso disegno animato della scheda, un ciclo all'apertura */
function animaApprofondimento(art) {
  const fig = $("[data-clona]", art);
  if (fig && !fig.firstElementChild) {
    const orig = $(`[data-scheda][data-soluzione="${fig.dataset.clona}"] svg.tec`);
    if (orig) {
      const copia = orig.cloneNode(true);
      // id unici: il disegno della scheda resta valido
      $$("[id]", copia).forEach((n) => {
        const vecchio = n.id, nuovo = vecchio + "-appro";
        n.id = nuovo;
        $$("*", copia).forEach((m) => {
          ["clip-path", "fill", "mask", "href"].forEach((at) => {
            const v = m.getAttribute(at);
            if (v && v.includes("#" + vecchio)) m.setAttribute(at, v.replace("#" + vecchio, "#" + nuovo));
          });
        });
      });
      fig.appendChild(copia);
      let cicli = 0;
      fig.addEventListener("animationiteration", (e) => { if (CICLI.has(e.animationName) && ++cicli >= 1) fig.classList.remove("is-attiva"); });
      fig.addEventListener("pointerenter", () => { if (!riduci.matches) { cicli = 0; fig.classList.add("is-attiva"); } });
      fig.addEventListener("click", () => { if (!riduci.matches) { cicli = 0; fig.classList.add("is-attiva"); } });
    }
  }
  if (fig && !riduci.matches) { fig.classList.remove("is-attiva"); void fig.offsetWidth; fig.classList.add("is-attiva"); }
  const figSim = $("[data-clona-sim]", art);
  if (figSim && !$(".sim", figSim)) {
    const box = document.createElement("div");
    box.className = "sim";
    box.dataset.sim = figSim.dataset.clonaSim;
    box.setAttribute("aria-hidden", "true");
    figSim.prepend(box);
    const ctrl = simInterattiva(box, figSim);
    figSim.addEventListener("click", () => ctrl.parti(false));
  }
}

/* =========================================================
   Barra mobile: dopo la hero, nascosta ai contatti e con pannelli aperti
   ========================================================= */
function aggiornaBarra() {
  if (!barra) return;
  const vis = !statoBarra.eroe && !statoBarra.contatti && !pannelloAperto() && !cassettoAperto();
  barra.toggleAttribute("data-visibile", vis);
  barra.setAttribute("aria-hidden", String(!vis));
  $$("a", barra).forEach((a) => (a.tabIndex = vis ? 0 : -1));
}
if (barra && "IntersectionObserver" in window) {
  const eroe = $(".eroe");
  const contatti = $("[data-contatti]");
  new IntersectionObserver((v) => { statoBarra.eroe = v[0].isIntersecting; aggiornaBarra(); }).observe(eroe);
  new IntersectionObserver((v) => { statoBarra.contatti = v[0].isIntersecting || v[0].boundingClientRect.top < 0; aggiornaBarra(); }, { threshold: 0.05 }).observe(contatti);
}

/* =========================================================
   Copia negli appunti
   ========================================================= */
const avviso = $("[data-copiato]");
let avvisoTimer = null;
function mostraAvviso(testo) {
  if (!avviso) return;
  avviso.textContent = testo;
  avviso.hidden = false;
  clearTimeout(avvisoTimer);
  avvisoTimer = setTimeout(() => { avviso.hidden = true; }, 1600);
}
$$("[data-copia]").forEach((btn) => {
  const uso = $("use", btn);
  const conferma = () => {
    const icona = $(".i", btn);
    icona.style.transition = "filter 120ms ease, opacity 120ms ease";
    icona.style.filter = "blur(2px)"; icona.style.opacity = "0.4";
    setTimeout(() => { uso.setAttribute("href", "#i-spunta"); icona.style.filter = ""; icona.style.opacity = ""; }, 110);
    setTimeout(() => uso.setAttribute("href", "#i-copia"), 1600);
    mostraAvviso("Copiato");
    traccia("copia_recapito", { cosa: btn.getAttribute("aria-label") });
  };
  btn.addEventListener("click", () => {
    const testo = btn.dataset.copia;
    const ripiego = () => {
      const t = document.createElement("textarea");
      t.value = testo; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); conferma(); } catch (err) { /* nessuna conferma */ }
      t.remove();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(testo).then(conferma, ripiego);
    else ripiego();
  });
});

/* =========================================================
   Servizi esterni su richiesta: mappa, WhatsApp, scheda Google
   ========================================================= */
const mappa = $("[data-mappa]");
if (mappa) {
  $("[data-mappa-carica]", mappa).addEventListener("click", () => {
    const f = document.createElement("iframe");
    f.title = "Mappa: Via Belvedere 47H, Battipaglia (SA)";
    f.loading = "lazy";
    f.referrerPolicy = "strict-origin-when-cross-origin";
    f.src = "https://www.google.com/maps?q=Via+Belvedere+47H+84091+Battipaglia+SA&output=embed";
    mappa.appendChild(f);
    $(".mappa__invito", mappa).remove();
    traccia("mostra_mappa");
  });
}
if (CONFIG.whatsapp) {
  const li = $("[data-whatsapp]");
  const a = $("[data-whatsapp-link]");
  if (li && a) {
    a.href = "https://wa.me/" + String(CONFIG.whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent("Buongiorno, vorrei informazioni per un preventivo.");
    li.hidden = false;
  }
}
if (CONFIG.googleBusinessProfile) {
  const g = $("[data-gbp]");
  if (g) { g.href = CONFIG.googleBusinessProfile; g.hidden = false; }
}

/* =========================================================
   Video reali: la sezione compare solo con almeno 2 video
   ========================================================= */
const sezVideo = $("[data-sezione-video]");
if (sezVideo) {
  const figure = $$("[data-video-reale]", sezVideo).filter((f) => f.dataset.mp4 || f.dataset.webm);
  if (figure.length >= 2) {
    sezVideo.hidden = false;
    figure.forEach((fig) => {
      const v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none";
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      if (fig.dataset.poster) v.poster = fig.dataset.poster;
      v.setAttribute("aria-label", fig.dataset.titolo || "Video di una macchina in funzione");
      fig.prepend(v);
      let caricato = false;
      new IntersectionObserver((x) => {
        if (x[0].isIntersecting && !riduci.matches) {
          if (!caricato) {
            caricato = true;
            if (fig.dataset.webm) { const s = document.createElement("source"); s.src = fig.dataset.webm; s.type = "video/webm"; v.appendChild(s); }
            if (fig.dataset.mp4) { const s = document.createElement("source"); s.src = fig.dataset.mp4; s.type = "video/mp4"; v.appendChild(s); }
            v.load();
            v.addEventListener("playing", () => traccia("video_play", { video: fig.dataset.titolo || "video" }), { once: true });
          }
          v.play().catch(() => {});
        } else { v.pause(); }
      }, { threshold: 0.4 }).observe(fig);
    });
  }
}

/* =========================================================
   Modulo di richiesta: validazione, antispam, invio, conferma
   ========================================================= */
if (modulo) {
  const caricatoIl = Date.now();
  const esito = $("[data-esito]", modulo);
  const invio = $("[data-invio]", modulo);
  const etichetta = $("[data-etichetta]", modulo);
  const conferma = $("[data-conferma]");
  const riepilogo = $("[data-riepilogo]");
  const endpoint = (CONFIG.modulo && CONFIG.modulo.endpoint) || "";
  const siteKey = CONFIG.modulo && CONFIG.modulo.turnstileSiteKey;
  let iniziato = false;

  const regole = {
    nome: (v) => v.trim().length >= 2,
    telefono: (v) => v.replace(/\D/g, "").length >= 6,
    email: (v) => v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
  };
  const segna = (campo, errato) => {
    const msg = document.getElementById(campo.id + "-err");
    campo.setAttribute("aria-invalid", errato ? "true" : "false");
    if (msg) msg.hidden = !errato;
  };
  modulo.addEventListener("input", (e) => {
    const c = e.target;
    if (!iniziato) { iniziato = true; traccia("inizio_modulo", { soluzione: campoSoluzione.value || "nessuna" }); }
    if (c.getAttribute("aria-invalid") === "true" && regole[c.name] && regole[c.name](c.value)) segna(c, false);
  });
  modulo.addEventListener("focusout", (e) => {
    const c = e.target;
    if (regole[c.name] && c.value.trim() !== "" && !regole[c.name](c.value)) segna(c, true);
  });

  /* Cloudflare Turnstile: solo se configurato, caricato quando il modulo si avvicina */
  if (siteKey) {
    const box = $("[data-turnstile]", modulo);
    new IntersectionObserver((v, o) => {
      if (!v[0].isIntersecting) return;
      o.disconnect();
      window.todelTurnstile = () => { box.hidden = false; window.turnstile.render(box, { sitekey: siteKey, language: "it", theme: "dark" }); };
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=todelTurnstile";
      s.async = true; s.defer = true;
      document.head.appendChild(s);
    }, { rootMargin: "400px 0px" }).observe(modulo);
  }

  const dispositivo = () => {
    const tipo = schermoMobile.matches ? "telefono" : matchMedia("(max-width: 1100px)").matches ? "tablet" : "computer";
    return `${tipo} · ${window.innerWidth}×${window.innerHeight}`;
  };
  const mailto = (d) => {
    const corpo = [
      d.soluzione ? "Richiesta per: " + d.soluzione : "",
      "Nome e azienda: " + d.nome,
      "Telefono: " + d.telefono,
      d.email ? "Email: " + d.email : "",
      d.messaggio ? "\n" + d.messaggio : ""
    ].filter(Boolean).join("\n");
    return "mailto:todelsrl@gmail.com?subject=" + encodeURIComponent("Richiesta preventivo" + (d.soluzione ? " · " + d.soluzione : "")) + "&body=" + encodeURIComponent(corpo);
  };
  const stato = (testo, html) => {
    if (html) esito.innerHTML = html; else esito.textContent = testo;
  };
  const occupato = (si) => {
    invio.setAttribute("aria-busy", String(si));
    invio.disabled = si;
    etichetta.textContent = si ? "Invio in corso…" : "Richiedi preventivo";
  };
  const mostraConferma = (d) => {
    const righe = [["Richiesta per", d.soluzione || "—"], ["Nome e azienda", d.nome], ["Telefono", d.telefono]];
    if (d.email) righe.push(["Email", d.email]);
    riepilogo.innerHTML = "";
    righe.forEach(([k, v]) => {
      const div = document.createElement("div");
      const dt = document.createElement("dt"); dt.textContent = k;
      const dd = document.createElement("dd"); dd.textContent = v;
      div.append(dt, dd); riepilogo.appendChild(div);
    });
    modulo.hidden = true;
    conferma.hidden = false;
    conferma.focus({ preventScroll: true });
    conferma.scrollIntoView({ behavior: riduci.matches ? "auto" : "smooth", block: "center" });
  };
  $("[data-nuova-richiesta]").addEventListener("click", () => {
    conferma.hidden = true;
    modulo.hidden = false;
    $("#f-nome").focus();
  });

  modulo.addEventListener("submit", async (e) => {
    e.preventDefault();
    esito.textContent = "";
    const campi = ["nome", "telefono", "email"].map((n) => modulo.elements[n]);
    const errati = campi.filter((c) => !regole[c.name](c.value) || (c.required && c.value.trim() === ""));
    campi.forEach((c) => segna(c, errati.includes(c)));
    if (errati.length) {
      errati[0].focus();
      traccia("errore_modulo", { campi: errati.map((c) => c.name).join(",") });
      return;
    }
    let utm = {}, arrivo = {};
    try { utm = JSON.parse(sessione.get("todel-utm") || "{}"); arrivo = JSON.parse(sessione.get("todel-arrivo") || "{}"); } catch (err) { /* dati non disponibili */ }
    const d = {
      nome: modulo.elements.nome.value.trim(),
      telefono: modulo.elements.telefono.value.trim(),
      email: modulo.elements.email.value.trim(),
      messaggio: modulo.elements.messaggio.value.trim(),
      soluzione: campoSoluzione.value,
      sito: modulo.elements.sito.value, // trappola antispam
      sezione: ultimaOrigine || "contatti",
      pagina: location.href,
      sorgente: arrivo.referrer || document.referrer || "diretto",
      pagina_arrivo: arrivo.pagina || "",
      campagna: utm,
      dispositivo: dispositivo(),
      lingua: navigator.language || "",
      inviato_il: new Date().toISOString(),
      tempo_compilazione_ms: Date.now() - caricatoIl,
      turnstile: (modulo.querySelector('[name="cf-turnstile-response"]') || {}).value || ""
    };
    // la trappola compilata indica un bot: conferma finta, nessun invio
    if (d.sito) { mostraConferma(d); return; }

    if (!endpoint) {
      stato("", `Anteprima del sito: l’invio online si attiva alla pubblicazione. Intanto potete <a href="${mailto(d)}">inviare la richiesta via email</a> o chiamare il <a href="tel:+393288241909">328 824 1909</a>.`);
      traccia("invio_modulo_anteprima", { soluzione: d.soluzione || "nessuna" });
      return;
    }
    occupato(true);
    try {
      const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) });
      const corpo = await r.json().catch(() => ({}));
      if (!r.ok || corpo.ok === false) throw new Error(corpo.errore || String(r.status));
      traccia("genera_lead", { soluzione: d.soluzione || "nessuna", sezione: d.sezione });
      mostraConferma(d);
      modulo.reset();
      chip.hidden = true;
      campoSoluzione.value = "";
    } catch (err) {
      stato("", `Invio non riuscito. Riprovate tra poco, oppure <a href="${mailto(d)}">inviate la richiesta via email</a> o chiamate il <a href="tel:+393288241909">328 824 1909</a>.`);
      traccia("errore_invio", { messaggio: String(err.message || err) });
    } finally {
      occupato(false);
    }
  });
}
