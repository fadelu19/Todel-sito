/* TO.DE.L. v2 — comportamenti
   Niente ascoltatori di scroll: tutto ciò che dipende dalla posizione usa IntersectionObserver. */
(function () {
  "use strict";

  /* se questo script non parte, la pagina toglie la classe .js e mostra tutto senza animazioni */
  window.todelPronto = true;
  var docEl = document.documentElement;
  var riduci = window.matchMedia("(prefers-reduced-motion: reduce)");
  var puntatoreFine = window.matchMedia("(hover: hover) and (pointer: fine)");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* iOS applica :active solo se esiste un listener touchstart (mobile-native: feedback sulla pressione) */
  document.addEventListener("touchstart", function () {}, { passive: true });

  /* ---------- navbar: filo inferiore quando la pagina non è più in cima ---------- */
  var nav = $("[data-nav]");
  var sentinella = $("[data-sentinella]");
  if (nav && sentinella && "IntersectionObserver" in window) {
    new IntersectionObserver(function (voci) {
      nav.classList.toggle("is-staccata", !voci[0].isIntersecting);
    }).observe(sentinella);
  }

  /* ---------- rivelazione allo scroll: una volta sola ---------- */
  var daRivelare = $$("[data-rivela]");
  if ("IntersectionObserver" in window) {
    var osservatore = new IntersectionObserver(function (voci, oss) {
      voci.forEach(function (v) {
        if (v.isIntersecting) { v.target.classList.add("is-dentro"); oss.unobserve(v.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    daRivelare.forEach(function (el) { osservatore.observe(el); });
  } else {
    daRivelare.forEach(function (el) { el.classList.add("is-dentro"); });
  }

  /* ---------- tendina "Macchine": nasce dal pulsante ---------- */
  var tendina = $("[data-tendina]");
  if (tendina) {
    var apriT = $("[data-tendina-apri]", tendina);
    var pannello = $("[data-tendina-pannello]", tendina);
    var chiudiTimer = null;

    var apriTendina = function () {
      window.clearTimeout(chiudiTimer);
      pannello.hidden = false;
      var pr = pannello.getBoundingClientRect();
      var tr = apriT.getBoundingClientRect();
      pannello.style.setProperty("--origine", (tr.left + tr.width / 2 - pr.left) + "px top");
      void pannello.offsetWidth;
      pannello.setAttribute("data-aperta", "");
      apriT.setAttribute("aria-expanded", "true");
    };
    var chiudiTendina = function (restituisciFocus) {
      if (apriT.getAttribute("aria-expanded") !== "true") return;
      pannello.removeAttribute("data-aperta");
      apriT.setAttribute("aria-expanded", "false");
      chiudiTimer = window.setTimeout(function () {
        if (!pannello.hasAttribute("data-aperta")) pannello.hidden = true;
      }, 160);
      if (restituisciFocus) apriT.focus();
    };
    apriT.addEventListener("click", function () {
      apriT.getAttribute("aria-expanded") === "true" ? chiudiTendina(false) : apriTendina();
    });
    document.addEventListener("pointerdown", function (e) {
      if (!tendina.contains(e.target)) chiudiTendina(false);
    });
    tendina.addEventListener("keydown", function (e) {
      if (e.key === "Escape") chiudiTendina(true);
    });
    tendina.addEventListener("focusout", function (e) {
      if (!tendina.contains(e.relatedTarget)) chiudiTendina(false);
    });
    pannello.addEventListener("click", function (e) {
      var a = e.target.closest("a[data-macchina]");
      if (!a) return;
      e.preventDefault();
      chiudiTendina(false);
      var carta = $('.bento a[data-macchina="' + a.getAttribute("data-macchina") + '"]');
      if (carta) {
        carta.scrollIntoView({ behavior: riduci.matches ? "auto" : "smooth", block: "center" });
        carta.focus({ preventScroll: true });
      }
    });
  }

  /* ---------- tooltip: ritardo solo al primo, poi istantanei ---------- */
  var tip = $("[data-suggerimento]");
  var tipTimer = null, tipNascondi = null, ultimoChiuso = 0, tipAttivo = null;
  var RITARDO = 400, FINESTRA = 600;

  var posizionaTip = function (el) {
    var r = el.getBoundingClientRect();
    tip.hidden = false;
    var t = tip.getBoundingClientRect();
    var x = Math.min(Math.max(8, r.left + r.width / 2 - t.width / 2), window.innerWidth - t.width - 8);
    var sopra = r.top - t.height - 8 > 8;
    var y = sopra ? r.top - t.height - 8 : r.bottom + 8;
    tip.style.left = x + "px";
    tip.style.top = y + "px";
    tip.style.setProperty("--origine", (r.left + r.width / 2 - x) + "px " + (sopra ? "100%" : "0%"));
  };
  var mostraTip = function (el) {
    window.clearTimeout(tipTimer);
    window.clearTimeout(tipNascondi);
    var istantaneo = tipAttivo !== null || (Date.now() - ultimoChiuso) < FINESTRA;
    var apri = function () {
      tipAttivo = el;
      tip.textContent = el.getAttribute("data-tip");
      el.setAttribute("aria-describedby", "suggerimento");
      if (istantaneo) tip.setAttribute("data-istantaneo", ""); else tip.removeAttribute("data-istantaneo");
      posizionaTip(el);
      void tip.offsetWidth;
      tip.setAttribute("data-visibile", "");
    };
    if (istantaneo) apri(); else tipTimer = window.setTimeout(apri, RITARDO);
  };
  var nascondiTip = function () {
    window.clearTimeout(tipTimer);
    if (!tipAttivo) return;
    tipAttivo.removeAttribute("aria-describedby");
    tipAttivo = null;
    ultimoChiuso = Date.now();
    tip.removeAttribute("data-visibile");
    tipNascondi = window.setTimeout(function () { if (!tipAttivo) tip.hidden = true; }, 140);
  };
  if (tip) {
    $$("[data-tip]").forEach(function (el) {
      el.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") mostraTip(el); });
      el.addEventListener("pointerleave", nascondiTip);
      el.addEventListener("focus", function () { if (el.matches(":focus-visible")) mostraTip(el); });
      el.addEventListener("blur", nascondiTip);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") nascondiTip(); });
  }

  /* ---------- copia negli appunti, con conferma ---------- */
  $$("[data-copia]").forEach(function (btn) {
    var usa = $("use", btn);
    var testoTip = btn.getAttribute("data-tip");
    var conferma = function () {
      var icona = $(".i", btn);
      icona.style.filter = "blur(2px)"; icona.style.opacity = "0.4";
      window.setTimeout(function () {
        usa.setAttribute("href", "#i-spunta");
        icona.style.filter = ""; icona.style.opacity = "";
      }, 100);
      btn.setAttribute("data-tip", "Copiato");
      if (tipAttivo === btn || btn.matches(":hover")) { tip.textContent = "Copiato"; posizionaTip(btn); tip.setAttribute("data-visibile", ""); tip.setAttribute("data-istantaneo", ""); tipAttivo = btn; }
      window.setTimeout(function () {
        usa.setAttribute("href", "#i-copia");
        btn.setAttribute("data-tip", testoTip);
      }, 1600);
    };
    btn.addEventListener("click", function () {
      var testo = btn.getAttribute("data-copia");
      var ripiego = function () {
        var t = document.createElement("textarea");
        t.value = testo; t.setAttribute("readonly", ""); t.style.position = "fixed"; t.style.opacity = "0";
        document.body.appendChild(t); t.select();
        try { document.execCommand("copy"); conferma(); } catch (err) { /* nessuna conferma se fallisce */ }
        document.body.removeChild(t);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(testo).then(conferma, ripiego);
      } else { ripiego(); }
    });
  });

  /* ---------- cassetto mobile: da destra, interrompibile, trascinabile con molla ---------- */
  var cassetto = $("[data-cassetto]");
  var velo = $("[data-velo]");
  var burger = $("[data-cassetto-apri]");
  var animMolla = null, animVelo = null;

  function fermaMolla() {
    if (animMolla) { animMolla.cancel(); animMolla = null; }
    if (animVelo) { animVelo.cancel(); animVelo = null; }
    cassetto.classList.remove("is-trascinato");
    cassetto.style.transform = ""; velo.style.opacity = "";
  }
  var aperto = function () { return cassetto.hasAttribute("data-aperto"); };
  var bloccaPagina = function (si) { docEl.style.overflow = si ? "hidden" : ""; };

  var apriCassetto = function () {
    fermaMolla();
    cassetto.hidden = false; velo.hidden = false;
    void cassetto.offsetWidth;
    cassetto.setAttribute("data-aperto", ""); velo.setAttribute("data-aperto", "");
    burger.setAttribute("aria-expanded", "true");
    bloccaPagina(true);
    window.setTimeout(function () { var a = $(".cassetto__voci a", cassetto); if (a) a.focus({ preventScroll: true }); }, 60);
  };
  var chiudiCassetto = function (restituisciFocus) {
    fermaMolla();
    cassetto.removeAttribute("data-aperto"); velo.removeAttribute("data-aperto");
    burger.setAttribute("aria-expanded", "false");
    bloccaPagina(false);
    if (restituisciFocus !== false) burger.focus({ preventScroll: true });
  };
  var alTermine = function (e) {
    if (e.target !== cassetto || e.propertyName !== (riduci.matches ? "opacity" : "transform")) return;
    if (!aperto()) { cassetto.hidden = true; velo.hidden = true; }
  };

  if (cassetto && velo && burger) {
    cassetto.addEventListener("transitionend", alTermine);
    burger.addEventListener("click", function () { aperto() ? chiudiCassetto() : apriCassetto(); });
    $("[data-cassetto-chiudi]", cassetto).addEventListener("click", function () { chiudiCassetto(); });
    velo.addEventListener("click", function () { chiudiCassetto(); });
    $$(".cassetto a", cassetto).forEach(function (a) {
      a.addEventListener("click", function () { chiudiCassetto(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (!aperto()) return;
      if (e.key === "Escape") { chiudiCassetto(); return; }
      if (e.key === "Tab") {
        var f = $$("a[href], button:not([disabled])", cassetto);
        var primo = f[0], ultimo = f[f.length - 1];
        if (e.shiftKey && document.activeElement === primo) { e.preventDefault(); ultimo.focus(); }
        else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primo.focus(); }
      }
    });
    window.matchMedia("(min-width: 901px)").addEventListener("change", function (m) { if (m.matches && aperto()) chiudiCassetto(false); });

    /* trascinamento 1:1 e rilascio con molla che eredita la velocità del dito (apple-design) */
    var drag = null;
    var spostamentoAttuale = function () {
      var m = new DOMMatrixReadOnly(getComputedStyle(cassetto).transform);
      return m.m41;
    };
    cassetto.addEventListener("pointerdown", function (e) {
      /* un solo dito alla volta: i tocchi aggiuntivi durante il trascinamento sono ignorati */
      if (drag || !aperto() || riduci.matches || (e.pointerType === "mouse" && e.button !== 0)) return;
      var x0 = animMolla ? spostamentoAttuale() : 0;
      if (animMolla) {
        animMolla.cancel(); animMolla = null; if (animVelo) { animVelo.cancel(); animVelo = null; }
        cassetto.classList.add("is-trascinato");
        cassetto.style.transform = "translateX(" + x0 + "px)";
      }
      drag = { id: e.pointerId, inizioX: e.clientX - x0, inizioY: e.clientY, attivo: x0 > 0, storia: [{ x: x0, t: e.timeStamp }] };
    });
    cassetto.addEventListener("pointermove", function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var grezzo = e.clientX - drag.inizioX;
      if (!drag.attivo) {
        if (Math.abs(e.clientY - drag.inizioY) > 10 && Math.abs(e.clientY - drag.inizioY) > Math.abs(grezzo)) { drag = null; return; }
        if (grezzo < 8) return;
        drag.attivo = true;
        try { cassetto.setPointerCapture(e.pointerId); } catch (err) { /* puntatore già rilasciato */ }
        cassetto.classList.add("is-trascinato");
      }
      /* oltre il bordo aperto il cassetto resiste: si sposta sempre meno (smorzamento ai limiti) */
      var dx = grezzo >= 0 ? grezzo : -Math.min(40, Math.pow(-grezzo, 0.7));
      var w = cassetto.offsetWidth;
      cassetto.style.transform = "translateX(" + dx + "px)";
      velo.style.opacity = String(1 - Math.min(1, Math.max(0, dx) / w));
      drag.storia.push({ x: dx, t: e.timeStamp });
      if (drag.storia.length > 6) drag.storia.shift();
    });
    var rilascia = function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var d = drag; drag = null;
      if (!d.attivo) return;
      var w = cassetto.offsetWidth;
      var ultimo = d.storia[d.storia.length - 1], primo = d.storia[0];
      var dt = Math.max(1, ultimo.t - primo.t);
      var v = (ultimo.x - primo.x) / dt; /* px/ms, positivo verso destra */
      var proiettato = ultimo.x + v * 180; /* dove sta andando il gesto, non dove si è fermato */
      var chiudi = proiettato > w * 0.5 || v > 0.11; /* basta un colpo deciso, non serve superare metà */
      molla(ultimo.x, chiudi ? w : 0, v * 1000, chiudi ? 0 : 0.2, function () {
        if (chiudi) {
          cassetto.removeAttribute("data-aperto"); velo.removeAttribute("data-aperto");
          burger.setAttribute("aria-expanded", "false"); bloccaPagina(false);
          cassetto.hidden = true; velo.hidden = true;
        }
      });
    };
    cassetto.addEventListener("pointerup", rilascia);
    cassetto.addEventListener("pointercancel", rilascia);
  }

  /* molla in stile Apple { duration: 0.5, bounce }: x'' = -k x - c x', parte dalla velocità del dito.
     k = (2π/durata)², c = 4π(1 - bounce)/durata  (bounce 0 = smorzamento critico) */
  function molla(da, a, v0, bounce, fatto) {
    var durata = 0.5, k = Math.pow(2 * Math.PI / durata, 2), c = 4 * Math.PI * (1 - bounce) / durata;
    var x = da - a, v = v0, passo = 1 / 240, t = 0, kf = [], vf = [], w = cassetto.offsetWidth;
    while (t < 1.2) {
      for (var i = 0; i < 4; i++) { var acc = -k * x - c * v; v += acc * passo; x += v * passo; t += passo; }
      var pos = a + x;
      kf.push({ transform: "translateX(" + pos.toFixed(2) + "px)" });
      vf.push({ opacity: Math.max(0, Math.min(1, 1 - pos / w)) });
      if (Math.abs(x) < 0.5 && Math.abs(v) < 10) break;
    }
    kf.push({ transform: "translateX(" + a + "px)" });
    vf.push({ opacity: 1 - a / w });
    var ms = Math.round(t * 1000);
    cassetto.classList.add("is-trascinato");
    animMolla = cassetto.animate(kf, { duration: ms, easing: "linear", fill: "forwards" });
    animVelo = velo.animate(vf, { duration: ms, easing: "linear", fill: "forwards" });
    animMolla.onfinish = function () {
      animMolla = null;
      fatto();
      requestAnimationFrame(function () {
        if (animVelo) { animVelo.cancel(); animVelo = null; }
        cassetto.getAnimations().forEach(function (an) { an.cancel(); });
        cassetto.style.transform = ""; velo.style.opacity = "";
        cassetto.classList.remove("is-trascinato");
      });
    };
  }

  /* ---------- barra mobile: compare dopo l'eroe, sparisce sui contatti ---------- */
  var barra = $("[data-barra]");
  var eroe = $("[data-eroe]");
  var contatti = $("[data-contatti]");
  if (barra && eroe && contatti && "IntersectionObserver" in window) {
    var stato = { eroe: true, contatti: false };
    var aggiorna = function () { barra.toggleAttribute("data-visibile", !stato.eroe && !stato.contatti); };
    new IntersectionObserver(function (v) { stato.eroe = v[0].isIntersecting; aggiorna(); }, { threshold: 0.05 }).observe(eroe);
    new IntersectionObserver(function (v) { stato.contatti = v[0].isIntersecting; aggiorna(); }, { threshold: 0.05 }).observe(contatti);
  }

  /* ---------- carte macchine: precompilano la richiesta ---------- */
  var messaggio = $("#f-messaggio");
  var precompilato = "";
  document.addEventListener("click", function (e) {
    var a = e.target.closest(".bento a[data-macchina]");
    if (!a || !messaggio) return;
    var riga = "Mi interessa: " + a.getAttribute("data-macchina") + ". ";
    if (!messaggio.value || messaggio.value === precompilato) { messaggio.value = riga; precompilato = riga; }
    if (puntatoreFine.matches) {
      window.setTimeout(function () { var n = $("#f-nome"); if (n) n.focus({ preventScroll: true }); }, riduci.matches ? 0 : 500);
    }
  });

  /* ---------- mappa caricata solo su richiesta (privacy) ---------- */
  var mappa = $("[data-mappa]");
  if (mappa) {
    $("[data-mappa-carica]", mappa).addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.title = "Mappa: Via Belvedere 47H, Battipaglia (SA)";
      f.loading = "lazy";
      f.referrerPolicy = "no-referrer-when-downgrade";
      f.src = "https://www.google.com/maps?q=Via+Belvedere+47H+84091+Battipaglia+SA&output=embed";
      mappa.appendChild(f);
      $(".mappa__invito", mappa).remove();
    });
  }

  /* ---------- modulo: errori chiari, invio non ancora collegato ---------- */
  var ENDPOINT = ""; /* servizio di invio da impostare alla pubblicazione */
  var modulo = $("[data-modulo]");
  if (modulo) {
    var esito = $(".modulo__esito", modulo);
    var errPrivacy = $("[data-errore-privacy]", modulo);
    var etichetta = $("[data-etichetta]", modulo);
    var tasto = $("button[type=submit]", modulo);
    var cambiaEtichetta = function (testo) {
      etichetta.classList.add("is-cambio");
      window.setTimeout(function () { etichetta.textContent = testo; etichetta.classList.remove("is-cambio"); }, 120);
    };
    var segna = function (campo, errato) {
      var msg = document.getElementById(campo.id + "-err");
      campo.setAttribute("aria-invalid", errato ? "true" : "false");
      if (msg) { msg.hidden = !errato; errato ? campo.setAttribute("aria-describedby", msg.id) : campo.removeAttribute("aria-describedby"); }
    };
    modulo.addEventListener("input", function (e) {
      var c = e.target;
      if (c.getAttribute("aria-invalid") === "true" && c.checkValidity() && c.value.trim() !== "") segna(c, false);
      if (c.name === "privacy" && c.checked) errPrivacy.hidden = true;
    });
    modulo.addEventListener("submit", function (e) {
      e.preventDefault();
      var primo = null;
      $$("input:not([type=checkbox]), textarea", modulo).forEach(function (c) {
        var ok = c.checkValidity() && (!c.required || c.value.trim() !== "");
        if (c.id) segna(c, !ok);
        if (!ok && !primo) primo = c;
      });
      var consenso = $("input[name=privacy]", modulo);
      if (!consenso.checked) { errPrivacy.hidden = false; if (!primo) primo = consenso; }
      if (primo) { primo.focus(); return; }

      tasto.disabled = true;
      cambiaEtichetta("Invio in corso…");
      var fine = function (testo, ok) {
        esito.hidden = false; esito.textContent = testo;
        cambiaEtichetta(ok ? "Richiesta inviata" : "Richiedi preventivo");
        window.setTimeout(function () { tasto.disabled = false; if (ok) cambiaEtichetta("Richiedi preventivo"); }, 2400);
      };
      if (!ENDPOINT) {
        window.setTimeout(function () { fine("Anteprima del sito: l’invio online verrà attivato alla pubblicazione. Nel frattempo chiamate il 328 824 1909.", false); }, 500);
        return;
      }
      fetch(ENDPOINT, { method: "POST", body: new FormData(modulo), headers: { Accept: "application/json" } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); modulo.reset(); fine("Richiesta inviata. Vi rispondiamo entro 24 ore.", true); })
        .catch(function () { fine("L’invio non è riuscito. Riprovate o chiamate il 328 824 1909.", false); });
    });
  }
})();
