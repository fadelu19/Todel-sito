# Sito TO.DE.L. (versione 4: revisione "macchina reale")

Sito one-page di TO.DE.L. Automazione Industriale S.r.l., costruito sui tre brief in `../brief/`.
HTML, CSS e JavaScript senza framework: nessuna compilazione, si pubblica la cartella `public/` così com'è.

## Struttura

```
sito-v3/
├── public/                    ← tutto ciò che va online
│   ├── index.html             ← pagina principale (13 sezioni + 7 approfondimenti)
│   ├── privacy.html, cookie.html, grazie.html, 404.html
│   ├── robots.txt, sitemap.xml, _headers (intestazioni Cloudflare)
│   └── assets/
│       ├── css/style.css      ← stile (colori e misure nei token in cima al file)
│       ├── css/legale.css     ← pagine secondarie
│       ├── js/main.js         ← comportamenti (menu, pannelli, modulo, barra mobile…)
│       ├── js/taglio.js       ← simulazione del taglio laser/plasma (caricata solo quando serve)
│       ├── js/consenso.js     ← consenso e statistiche
│       ├── img/ (img/gl/ = foto ufficiali Golden Laser), fonts/ (Archivo, Martian Mono), video/
├── functions/api/richiesta.js ← riceve il modulo (Cloudflare Pages Function)
└── scripts/imposta-dominio.mjs
```

## Pubblicazione su Cloudflare Pages

1. Caricare il progetto su GitHub (repository `fadelu19/Todel-sito`).
2. Cloudflare → Workers & Pages → Crea → Pages → collega il repository.
3. Impostazioni di build:
   - Framework: nessuno
   - Comando di build: vuoto
   - Directory radice (avanzate): `sito-v3`
   - Directory di output: `public`
4. Variabili d'ambiente (Settings → Variables), per far arrivare le richieste:
   - `RESEND_API_KEY` e `EMAIL_MITTENTE` (servizio email Resend, dominio verificato)
   - `EMAIL_DESTINATARIO` (predefinito todelsrl@gmail.com)
   - facoltative: `LEAD_WEBHOOK_URL` (CRM, Google Sheets via Make/Zapier), `TURNSTILE_SECRET`
   Senza almeno un canale (email o webhook) il modulo mostra il ripiego via email/telefono.
5. Quando c'è il dominio: `node scripts/imposta-dominio.mjs https://www.dominio.it`, poi commit.

## Cosa si configura senza toccare il codice

Nel blocco `<script id="config">` in `index.html`:

| Campo | Effetto |
|---|---|
| `whatsapp` | numero (es. `393288241909`): compare il contatto WhatsApp. Vuoto = nascosto |
| `modulo.endpoint` | indirizzo che riceve il modulo (`/api/richiesta` su Cloudflare) |
| `modulo.turnstileSiteKey` | chiave pubblica Turnstile (antispam). Vuoto = non caricato |
| `analytics.ga4` | codice Google Analytics 4 (`G-XXXX`). Vuoto = nessuna statistica e nessun banner |
| `googleBusinessProfile` | link alla scheda Google dell'azienda |
| `videoEroe` | video della hero (webm, mp4, mp4Mobile, poster, didascalia): sostituisce la simulazione |

Se si attiva GA4, copiare lo stesso codice anche nel `config` di `cookie.html`.

## Sostituire immagini e video

- Foto Golden Laser: in `assets/img/gl/` (elenco e provenienza in `../brief/golden-laser-modelli.md`). Le foto delle macchine stanno su "lastre" chiare: i rendering a fondo bianco si fondono con la lastra, le foto d'ambiente si vedono intere.
- Segnaposto ancora aperti: campioni di taglio (sezione Applicazioni) e pressopiegatrice (riga Piegatura e approfondimento). Sostituire il blocco `.segnaposto` con un `<img>` o `<picture>`.

- Foto: stesse dimensioni e nomi in `assets/img/` (versione `.jpg`, `.webp` e `-640.webp`), oppure cambiare i percorsi nell'HTML. Togliere l'etichetta "Immagine illustrativa" quando la foto è reale.
- Video hero (kit Golden Laser): WebM ≤ 3 MB, MP4 ≤ 5 MB, MP4 mobile 720p ≤ 1,5 MB, poster ≤ 50 KB, 8–12 s in loop. Indicare i percorsi in `videoEroe`. Didascalia con modello e fonte, mai "installazione TO.DE.L." se non lo è.
- Video reali: decommentare gli esempi nella sezione `#video`. La sezione compare da sola quando ci sono almeno 2 video.

## Dati ancora da completare

- Clienti: altri nomi oltre ai cinque attuali (e loghi, se autorizzati).
- Dati tecnici di piegatura, plasma, cobot, retrofit: oggi rimandano al preventivo, non sono inventati.
- Pagine privacy e cookie: bozza da far verificare al consulente privacy.

## Eventi di statistica (dataLayer)

`cta_preventivo`, `seleziona_soluzione`, `apri_approfondimento`, `inizio_modulo`, `errore_modulo`, `genera_lead`, `errore_invio`,
`click_telefono`, `click_email`, `click_whatsapp`, `click_indicazioni`, `copia_recapito`, `mostra_mappa`,
`video_play`, `scroll_profondita`, `sezione_vista`, `pausa_animazione`, `scelta_consenso`.
Ogni richiesta inviata contiene anche: soluzione, sezione da cui è partita, provenienza, campagna (utm), dispositivo, data e ora.

## Pagine future

Ogni approfondimento (`<article class="appro">`) ha in `data-pagina` l'indirizzo suggerito per la versione multipagina
(es. `/macchine/taglio-laser-fibra/`): il contenuto si sposta così com'è.
