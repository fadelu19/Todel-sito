# Sito TO.DE.L. Automazione Industriale S.r.l.

Sito aziendale one-page in HTML, CSS e JavaScript, senza framework e senza passaggio di build.

## Versione attuale: `sito-v3/public/`

**L'unica cartella da pubblicare è `sito-v3/public/`** (versione 4.1, "tavola tecnica": fondo grafite, lastre chiare per le macchine, accento caldo del laser).
Istruzioni complete, configurazione del modulo e sostituzione di foto e video: [`sito-v3/README.md`](sito-v3/README.md).

| Cartella | Stato | Note |
|---|---|---|
| `sito-v3/` | **In uso** | `public/` va online; `functions/api/richiesta.js` riceve il modulo; `scripts/` imposta il dominio |
| `sito-v2/` | Archivio | Versione intermedia. Non pubblicare, non modificare |
| `sito/` | Archivio | Prima versione ("segnaletica di stabilimento", fondo chiaro, Barlow). Non pubblicare, non modificare |
| `brief/` | Riferimento | I tre brief di progetto e le decisioni confermate dal titolare (8 ottobre 2026) |
| `PRODUCT.md` | Riferimento | Azienda, pubblico, offerta, dati confermati, cosa non scrivere |
| `DESIGN.md` | Riferimento | Sistema visivo della v4 (colori, caratteri, componenti, regole) |
| `source/` | Riferimento | Logo originale, confronti, immagini escluse |
| `.impeccable/` | Strumenti | File di lavoro della skill di design (non vengono pubblicati) |

> Per chi lavora sul sito (persone o AI): leggere prima `PRODUCT.md` e `DESIGN.md`, poi lavorare solo in `sito-v3/`. Le cartelle `sito/` e `sito-v2/` descrivono direzioni abbandonate.

## Pubblicazione su Cloudflare Pages

Workers & Pages → Create → Pages → Connect to Git → repository `todel-sito`

- Framework preset: **None**
- Build command: *(vuoto)*
- Root directory (avanzate): **`sito-v3`**
- Build output directory: **`public`**

La directory radice `sito-v3` serve perché Cloudflare trovi anche la cartella `functions/`, che gestisce l'invio del modulo.
Variabili d'ambiente per il modulo (`RESEND_API_KEY`, `EMAIL_MITTENTE`, `EMAIL_DESTINATARIO`, `LEAD_WEBHOOK_URL`, `TURNSTILE_SECRET`): vedi [`sito-v3/README.md`](sito-v3/README.md).

## Da completare prima della messa online

Fatto: logo vettoriale, clienti citabili (5), numeri aziendali, P.IVA nel piè di pagina, bozza di privacy e cookie, backend del modulo.

- [ ] Dominio definitivo ed email aziendale; poi `node sito-v3/scripts/imposta-dominio.mjs https://www.dominio.it`
- [ ] Recapito del modulo configurato su Cloudflare e provato con un invio reale (Resend con dominio verificato, oppure webhook)
- [ ] Togliere i segnaposto "Foto da inserire" (tavola Piegatura, striscia campioni, pannello Piegatura)
- [ ] Kit immagini Golden Laser per rivenditori, ad alta risoluzione e senza filigrana (hero e schede)
- [ ] Foto dei referenti TO.DE.L. e di installazioni reali
- [ ] REA e capitale sociale nel piè di pagina; verifica di privacy e cookie da parte del consulente
- [ ] Link alla scheda Google dell'azienda (`googleBusinessProfile` nel blocco `config` di `index.html`)
