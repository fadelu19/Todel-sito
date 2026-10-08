/*
 * TO.DE.L. — ricezione delle richieste di preventivo (Cloudflare Pages Function: POST /api/richiesta)
 *
 * Flusso: modulo → validazione → antispam → consegna → notifica interna → email di conferma → risposta.
 * La consegna usa i canali configurati nelle variabili d'ambiente del progetto Cloudflare Pages:
 *
 *   RESEND_API_KEY       chiave del servizio email Resend (notifica interna + conferma al cliente)
 *   EMAIL_MITTENTE       es. "TO.DE.L. <preventivi@todel.it>" (dominio verificato su Resend)
 *   EMAIL_DESTINATARIO   chi riceve le richieste (predefinito: todelsrl@gmail.com)
 *   LEAD_WEBHOOK_URL     facoltativo: invia la richiesta in JSON a un CRM, Make, Zapier, Google Sheets...
 *   TURNSTILE_SECRET     facoltativo: chiave segreta di Cloudflare Turnstile (antispam)
 *
 * Se nessun canale è configurato la funzione risponde 503: il sito mostra all'utente
 * il ripiego via email/telefono, così nessuna richiesta va persa in silenzio.
 */

const MAX = { nome: 120, telefono: 30, email: 160, messaggio: 4000, soluzione: 80, sezione: 60 };

const testo = (v, max) => String(v == null ? "" : v).replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
const html = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function json(corpo, stato = 200) {
  return new Response(JSON.stringify(corpo), { status: stato, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}

async function leggi(request) {
  const tipo = request.headers.get("content-type") || "";
  if (tipo.includes("application/json")) return { dati: await request.json().catch(() => ({})), json: true };
  const form = await request.formData().catch(() => null);
  return { dati: form ? Object.fromEntries(form) : {}, json: false };
}

async function verificaTurnstile(token, segreto, ip) {
  if (!segreto) return true;
  if (!token) return false;
  const corpo = new FormData();
  corpo.append("secret", segreto);
  corpo.append("response", token);
  if (ip) corpo.append("remoteip", ip);
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: corpo });
  const esito = await r.json().catch(() => ({}));
  return esito.success === true;
}

async function inviaEmail(env, { a, oggetto, testoSemplice, corpoHtml, rispondiA }) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.EMAIL_MITTENTE, to: [a], subject: oggetto, text: testoSemplice, html: corpoHtml, reply_to: rispondiA || undefined })
  });
  if (!r.ok) throw new Error("email " + r.status);
}

export async function onRequestPost({ request, env, waitUntil }) {
  const { dati: d, json: comeJson } = await leggi(request);
  const fine = (ok, stato, extra = {}) =>
    comeJson ? json({ ok, ...extra }, stato) : Response.redirect(new URL(ok ? "/grazie.html" : "/#contatti", request.url).toString(), 303);

  // antispam 1: campo trappola compilato → fingiamo successo, nessuna consegna
  if (d.sito) return fine(true, 200);
  // antispam 2: compilazione troppo rapida per una persona
  const tempo = Number(d.tempo_compilazione_ms || 0);
  if (tempo && tempo < 2500) return fine(false, 400, { errore: "invio-troppo-rapido" });

  const lead = {
    id: crypto.randomUUID(),
    ricevuto_il: new Date().toISOString(),
    inviato_il: testo(d.inviato_il, 40),
    contatto: {
      nome: testo(d.nome, MAX.nome),
      telefono: testo(d.telefono, MAX.telefono),
      email: testo(d.email, MAX.email)
    },
    soluzione: testo(d.soluzione, MAX.soluzione),
    messaggio: testo(d.messaggio, MAX.messaggio),
    sezione: testo(d.sezione, MAX.sezione),
    sorgente: testo(d.sorgente, 300),
    pagina_arrivo: testo(d.pagina_arrivo, 300),
    campagna: typeof d.campagna === "object" && d.campagna ? d.campagna : {},
    dispositivo: testo(d.dispositivo, 80),
    pagina: testo(d.pagina, 300),
    paese: (request.cf && request.cf.country) || "",
    browser: testo(request.headers.get("user-agent"), 300)
  };

  // validazione
  const errori = [];
  if (lead.contatto.nome.length < 2) errori.push("nome");
  if (lead.contatto.telefono.replace(/\D/g, "").length < 6) errori.push("telefono");
  if (lead.contatto.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.contatto.email)) errori.push("email");
  if (errori.length) return fine(false, 422, { errore: "campi-non-validi", campi: errori });

  // antispam 3: Cloudflare Turnstile, se configurato
  const ip = request.headers.get("CF-Connecting-IP");
  const umano = await verificaTurnstile(d.turnstile || d["cf-turnstile-response"], env.TURNSTILE_SECRET, ip).catch(() => false);
  if (!umano) return fine(false, 403, { errore: "verifica-antispam" });

  // consegna
  const consegne = [];
  if (env.LEAD_WEBHOOK_URL) {
    consegne.push(fetch(env.LEAD_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) }).then((r) => { if (!r.ok) throw new Error("webhook " + r.status); }));
  }
  if (env.RESEND_API_KEY && env.EMAIL_MITTENTE) {
    const c = lead.contatto;
    const camp = Object.entries(lead.campagna).map(([k, v]) => `${k}=${v}`).join(", ");
    const righe = [
      ["Richiesta per", lead.soluzione || "non indicata"],
      ["Nome e azienda", c.nome],
      ["Telefono", c.telefono],
      ["Email", c.email || "non indicata"],
      ["Messaggio", lead.messaggio || "—"],
      ["Sezione del sito", lead.sezione],
      ["Provenienza", lead.sorgente],
      ["Campagna", camp || "—"],
      ["Dispositivo", lead.dispositivo],
      ["Ricevuta il", lead.ricevuto_il]
    ];
    const oggetto = `Nuova richiesta preventivo${lead.soluzione ? " · " + lead.soluzione : ""} · ${c.nome}`;
    consegne.push(inviaEmail(env, {
      a: env.EMAIL_DESTINATARIO || "todelsrl@gmail.com",
      oggetto,
      rispondiA: c.email,
      testoSemplice: righe.map(([k, v]) => `${k}: ${v}`).join("\n"),
      corpoHtml: `<h2>${html(oggetto)}</h2><table cellpadding="6">${righe.map(([k, v]) => `<tr><th align="left">${html(k)}</th><td>${html(v).replace(/\n/g, "<br>")}</td></tr>`).join("")}</table>`
    }));
    if (c.email) {
      const conferma = `Buongiorno ${c.nome},\n\nabbiamo ricevuto la vostra richiesta${lead.soluzione ? " per " + lead.soluzione : ""}. Vi rispondiamo entro 24 ore.\nSe è urgente potete chiamarci al 328 824 1909.\n\nTO.DE.L. Automazione Industriale S.r.l.\nVia Belvedere 47H, 84091 Battipaglia (SA)`;
      // la conferma al cliente non blocca l'esito: se fallisce, la richiesta è comunque arrivata.
      // waitUntil tiene viva la funzione finché l'email non è partita.
      const invio = inviaEmail(env, { a: c.email, oggetto: "Abbiamo ricevuto la vostra richiesta · TO.DE.L.", testoSemplice: conferma, corpoHtml: `<p>${html(conferma).replace(/\n/g, "<br>")}</p>` }).catch(() => {});
      if (typeof waitUntil === "function") waitUntil(invio);
    }
  }
  if (!consegne.length) return fine(false, 503, { errore: "invio-non-configurato" });

  const esiti = await Promise.allSettled(consegne);
  const riuscite = esiti.filter((e) => e.status === "fulfilled").length;
  if (!riuscite) return fine(false, 502, { errore: "consegna-non-riuscita" });
  return fine(true, 200, { id: lead.id });
}

export function onRequestGet() {
  return new Response("Metodo non consentito", { status: 405, headers: { Allow: "POST" } });
}
