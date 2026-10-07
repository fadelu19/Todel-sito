/* TO.DE.L. — comportamenti della pagina */
(function () {
  "use strict";

  var riduciMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Insegna: filo inferiore quando la pagina scorre */
  var insegna = document.querySelector("[data-insegna]");
  function aggiornaInsegna() {
    if (insegna) insegna.classList.toggle("is-staccata", window.scrollY > 8);
  }

  /* Menu mobile */
  var apri = document.querySelector("[data-menu-apri]");
  var menu = document.getElementById("menu");
  if (apri && menu) {
    var usa = apri.querySelector("use");
    var etichetta = apri.querySelector(".sr");
    function impostaMenu(aperto) {
      menu.classList.toggle("is-aperto", aperto);
      apri.setAttribute("aria-expanded", String(aperto));
      usa.setAttribute("href", aperto ? "#i-chiudi" : "#i-menu");
      etichetta.textContent = aperto ? "Chiudi il menu" : "Apri il menu";
    }
    apri.addEventListener("click", function () {
      impostaMenu(apri.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) impostaMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-aperto")) { impostaMenu(false); apri.focus(); }
    });
  }

  /* Corsia: la vernice avanza con lo scorrimento e accende le zone */
  var corsia = document.querySelector("[data-corsia]");
  var zone = Array.prototype.slice.call(document.querySelectorAll("[data-zona]"));
  function aggiornaCorsia() {
    if (!corsia) return;
    var vh = window.innerHeight;
    var linea = vh * 0.62;
    if (riduciMovimento) {
      corsia.style.setProperty("--corsia", "1");
      zone.forEach(function (z) { z.classList.add("is-raggiunta"); });
      return;
    }
    var r = corsia.getBoundingClientRect();
    var p = (linea - r.top) / Math.max(1, r.height - vh * 0.25);
    p = Math.min(1, Math.max(0, p));
    corsia.style.setProperty("--corsia", p.toFixed(4));
    zone.forEach(function (z) {
      var zt = z.getBoundingClientRect().top + 40;
      z.classList.toggle("is-raggiunta", zt < linea);
    });
  }

  var inAttesa = false;
  function allaScroll() {
    if (inAttesa) return;
    inAttesa = true;
    window.requestAnimationFrame(function () {
      aggiornaInsegna();
      aggiornaCorsia();
      inAttesa = false;
    });
  }
  window.addEventListener("scroll", allaScroll, { passive: true });
  window.addEventListener("resize", allaScroll);
  aggiornaInsegna();
  aggiornaCorsia();

  /* Tabellone e reparti: preselezionano il macchinario nel modulo */
  var scelta = document.querySelector("[data-scelta-macchina]");
  var moduloPreventivo = document.querySelector(".modulo--preventivo");
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-macchina]");
    if (!a || !scelta) return;
    var valore = a.getAttribute("data-macchina");
    for (var i = 0; i < scelta.options.length; i++) {
      if (scelta.options[i].text === valore) { scelta.selectedIndex = i; break; }
    }
    if (moduloPreventivo && !riduciMovimento) {
      moduloPreventivo.classList.remove("is-evidenziato");
      void moduloPreventivo.offsetWidth;
      moduloPreventivo.classList.add("is-evidenziato");
    }
    window.setTimeout(function () {
      var primo = document.getElementById("p-azienda");
      if (primo) primo.focus({ preventScroll: true });
    }, riduciMovimento ? 0 : 450);
  });

  /* Moduli: validazione chiara. L'invio online non è ancora collegato. */
  var ENDPOINT = ""; /* da impostare alla pubblicazione (servizio form) */

  function mostraErrore(campo, visibile) {
    var id = campo.id ? campo.id + "-err" : null;
    var msg = id ? document.getElementById(id) : null;
    campo.setAttribute("aria-invalid", visibile ? "true" : "false");
    if (msg) {
      msg.hidden = !visibile;
      if (visibile) campo.setAttribute("aria-describedby", id); else campo.removeAttribute("aria-describedby");
    }
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-modulo]"), function (form) {
    var esito = form.querySelector(".modulo__esito");
    var erroreConsenso = form.querySelector("[data-errore-privacy]");

    form.addEventListener("input", function (e) {
      var c = e.target;
      if (c.getAttribute("aria-invalid") === "true" && c.checkValidity()) mostraErrore(c, false);
      if (c.name === "privacy" && c.checked && erroreConsenso) erroreConsenso.hidden = true;
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var primoErrato = null;
      Array.prototype.forEach.call(form.querySelectorAll("input:not([type=checkbox]):not([type=radio]), textarea, select"), function (c) {
        var ok = c.checkValidity() && (!c.required || c.value.trim() !== "");
        mostraErrore(c, !ok);
        if (!ok && !primoErrato) primoErrato = c;
      });
      var consenso = form.querySelector("input[name=privacy]");
      if (consenso && !consenso.checked) {
        if (erroreConsenso) erroreConsenso.hidden = false;
        if (!primoErrato) primoErrato = consenso;
      }
      if (primoErrato) { primoErrato.focus(); return; }

      if (!ENDPOINT) {
        esito.hidden = false;
        esito.textContent = "Anteprima del sito: l’invio online verrà attivato alla pubblicazione. Nel frattempo chiamate il 328 824 1909.";
        return;
      }

      var tasto = form.querySelector("button[type=submit]");
      tasto.disabled = true;
      esito.hidden = false;
      esito.textContent = "Invio in corso…";
      fetch(ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error(String(r.status));
          form.reset();
          esito.textContent = "Richiesta inviata. Vi richiamiamo al più presto.";
        })
        .catch(function () {
          esito.textContent = "L’invio non è riuscito. Riprovate tra poco o chiamate il 328 824 1909.";
        })
        .then(function () { tasto.disabled = false; });
    });
  });
})();
