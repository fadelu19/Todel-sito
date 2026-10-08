/*
 * TO.DE.L. — consenso e statistiche.
 * Livello unico di eventi (dataLayer). Google Analytics 4 si carica solo dopo il consenso
 * e solo se il codice è impostato in <script id="config"> della pagina.
 * Il banner compare solo se c'è almeno uno strumento che richiede consenso.
 */

const $ = (s, r = document) => r.querySelector(s);

let config = {};
try { config = JSON.parse(($("#config") || {}).textContent || "{}"); } catch (e) { config = {}; }
const ga4 = config.analytics && config.analytics.ga4;

const memoria = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* archivio non disponibile */ } }
};

window.dataLayer = window.dataLayer || [];
let consenso = memoria.get("todel-consenso"); // "si" | "no" | null

export function traccia(evento, dati = {}) {
  window.dataLayer.push({ event: evento, ...dati });
  if (consenso === "si" && typeof window.gtag === "function") window.gtag("event", evento, dati);
}

function caricaGA() {
  if (!ga4 || window.gtag) return;
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", ga4, { anonymize_ip: true });
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ga4);
  document.head.appendChild(s);
}

const banner = $("[data-consenso]");

export function mostraConsenso() {
  if (!banner) return;
  if (!ga4) {
    $("#consenso-testo", banner).innerHTML = 'Al momento il sito usa solo strumenti tecnici: non serve il vostro consenso. <a href="cookie.html">Cookie policy</a>';
    $(".consenso__azioni", banner).innerHTML = '<button class="tasto tasto--secondario" type="button" data-consenso-ok>Ho capito</button>';
  }
  banner.hidden = false;
  const primo = $("button", banner);
  if (primo) primo.focus({ preventScroll: true });
}

function scegli(valore) {
  const prima = consenso;
  consenso = valore;
  memoria.set("todel-consenso", valore);
  banner.hidden = true;
  traccia("scelta_consenso", { scelta: valore });
  if (valore === "si") caricaGA();
  if (valore === "no" && prima === "si") {
    // revoca: cancella i cookie di Google Analytics e ricarica la pagina senza statistiche
    document.cookie.split(";").map((c) => c.trim().split("=")[0]).filter((n) => /^_ga/.test(n)).forEach((n) => {
      document.cookie = n + "=; Max-Age=0; path=/";
      document.cookie = n + "=; Max-Age=0; path=/; domain=." + location.hostname.replace(/^www\./, "");
    });
    location.reload();
  }
}

if (banner) {
  banner.addEventListener("click", (e) => {
    if (e.target.closest("[data-consenso-accetta]")) scegli("si");
    else if (e.target.closest("[data-consenso-rifiuta]")) scegli("no");
    else if (e.target.closest("[data-consenso-ok]")) banner.hidden = true;
  });
  banner.addEventListener("keydown", (e) => { if (e.key === "Escape" && !ga4) banner.hidden = true; });
}
if (consenso === "si") caricaGA();
if (ga4 && !consenso) mostraConsenso();
document.querySelectorAll("[data-preferenze-cookie]").forEach((b) => b.addEventListener("click", mostraConsenso));
