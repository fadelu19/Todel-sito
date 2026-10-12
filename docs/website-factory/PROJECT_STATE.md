# Project State — TO.DE.L. Automazione Industriale

**Ultimo aggiornamento:** 12 ottobre 2026 (sessione di orchestrazione, playbook Website Factory v1.6.1, prompt 00 + 20 + 23)
**Repository e branch:** `fadelu19/Todel-sito`, branch `claude/website-factory-setup-ex8ea9` (partito da `main` @ `399ba8e`, 9 ottobre 2026)
**Directory/versione attiva verificata:** `sito-v3/public/` (v4.1). `sito/` e `sito-v2/` sono archivio
**Deploy/preview:** nessun deploy. Preview solo locale (server statico + Chromium headless)
**Modalità:** Premium
**Modulo settore:** A — Industria / B2B / macchinari
**Fase corrente:** chiusura dello sviluppo (11–12 completate) → revisioni 13–17, con il pre-lancio (18) bloccato da input del titolare

Brief: [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md). Dati confermati: [`../../PRODUCT.md`](../../PRODUCT.md). Sistema visivo: [`../../DESIGN.md`](../../DESIGN.md).

## Obiettivo e vincoli approvati
- Obiettivo primario: richieste di preventivo qualificate
- Pubblico: PMI manifatturiere della Campania e del Sud Italia
- CTA primaria: "Richiedi preventivo"; secondaria: chiamata
- Direzione creativa approvata: v4 "tavola tecnica" (`DESIGN.md`)
- Stack: HTML/CSS/JS statico senza build + Cloudflare Pages Function per il modulo (scelta del titolare: niente framework)
- Vincoli non negoziabili: nessun dato inventato; niente segnaposto visibili ai visitatori al lancio; nessun deploy, DNS o costo senza autorizzazione

## Divergenze trovate fra documenti e codice
- Il case study del playbook (`10_TODEL_CASE_STUDY.md`) descrive `sito/` come cartella pubblicata e il North Star "Plant Signage System". **Non è più vero:** il README e `DESIGN.md` attuali indicano `sito-v3/public/` e la direzione "tavola tecnica". Fa fede il repository.
- Nella radice del repo non esisteva un `CLAUDE.md` né una cartella `docs/website-factory/`: questa sessione ha creato soltanto `PROJECT_BRIEF.md` e questo file. Il playbook non è stato copiato nel repo.

## Stato per fase
| Fase | Stato | Evidenza/file | Note |
|---|---|---|---|
| 01 Brief | Completata | `brief/01-03`, `PRODUCT.md`, `PROJECT_BRIEF.md` | Brief del titolare dell'8 ottobre; scheda unica consolidata il 12 ottobre |
| 02 Asset | Parziale | README (radice) "Da completare", `brief/golden-laser-modelli.md` | Manca un `ASSET_MANIFEST.md` formale; lacune note e documentate |
| 03–04 Ricerca/posizionamento | Completata (informale) | `brief/golden-laser-modelli.md`, `PRODUCT.md` → Positioning | Nessuna analisi dei concorrenti |
| 05–06 UX/copy | Completata | `sito-v3/public/index.html` (13 sezioni + 7 approfondimenti) | Copy in pagina, nessun `SITE_COPY.md` separato |
| 07 + 09 Art direction/design system | Completata | `DESIGN.md`, token in `assets/css/style.css` | |
| 08 Architettura tecnica | Completata | `PRODUCT.md` → Stack, `sito-v3/README.md` | |
| 10 Prototipo hero | Completata | hero con macchina reale + simulazione di taglio (`taglio.js`) | Verificata nel rendering desktop e mobile (vedi QA) |
| 11–12 Sviluppo/motion | Completata | v4.1, commit `11afc0f` | |
| 13–16 Responsive/visuale/conversione/audit | Non formalizzate | nessun report | Non è stato prodotto nessun report di fase |
| 17 QA funzionale | Non iniziata | nessun `QA_REPORT.md` | Esiste solo il controllo rapido qui sotto |
| 18 Pre-lancio | Bloccata | — | Bloccanti nella sezione "Problemi aperti" |
| 19 Handoff | Non iniziata | — | |

## Decisioni e non-decisioni
- Approvate: posizionamento "partner unico"; "Rivenditore ufficiale Golden Laser"; formule numeriche e 5 clienti in `PRODUCT.md`; direzione v4; Cloudflare Pages
- Ancora da confermare: dominio; canale di recapito del modulo (Resend o webhook); grafico spessori 60 mm contro messaggio "fino a 30 mm"; linee vendute di Gilardi, DAMI e Di Donato; nomi e ruoli dei referenti; WhatsApp aziendale
- Escluse: e-commerce e prezzi; testimonianze e certificazioni (non fornite); direzioni v1 e v2

## Asset
- Riferimento: README in radice + `sito-v3/README.md` (manca un manifest formale)
- In uso: foto ufficiali Golden Laser (`assets/img/gl/`, alcune con filigrana, compresa la foto della hero); stock etichettato "Immagine illustrativa"
- Segnaposto visibili: pressopiegatrice (tavola Piegatura e approfondimento), striscia dei campioni di taglio (sezione Applicazioni)
- Mancanti: foto reali di persone, sede, tecnici e installazioni; kit Golden Laser senza filigrana; video reali

## Problemi aperti
| Priorità | Problema | Impatto | Prossima azione | Stato |
|---|---|---|---|---|
| Bloccante | Modulo non configurato né provato end-to-end | Le richieste non arrivano | Titolare: dominio + Resend o webhook; poi un invio reale | Aperto |
| Bloccante | Dominio assente (`DOMINIO-DA-INSERIRE` in canonical, OG, JSON-LD e sitemap) | SEO e anteprime social non funzionano | Titolare sceglie il dominio → `imposta-dominio.mjs` | Aperto |
| Bloccante | 3 segnaposto "Foto da inserire" visibili ai visitatori | Viola il principio 5 di `PRODUCT.md` | Foto reali, oppure nascondere i blocchi prima del lancio | Aperto |
| Alta | Grafico spessori fino a 60 mm contro il messaggio "fino a 30 mm" | Coerenza del claim tecnico | Decisione del titolare | Aperto |
| Alta | Privacy/cookie in bozza; REA e capitale sociale mancanti | Conformità | Consulente privacy + dati dal titolare | Aperto |
| Media | Foto hero con filigrana Golden Laser | Percezione premium | Kit immagini del rivenditore | Aperto |
| Media | QA funzionale non documentato (fase 17) | Il gate di pre-lancio non è dimostrabile | **Prossima azione, sotto** | Aperto |

## Strumenti
- Playwright + Chromium (preinstallati): **UTILIZZARE ORA** per QA e rendering, senza costi
- Cloudflare Pages, Resend, Turnstile: **VALUTARE IN SEGUITO**, servono dominio, account del titolare e autorizzazione
- GA4: **NON NECESSARIO** prima del lancio (è già predisposto, si attiva solo con il consenso)

## Prossima sessione — istruzioni operative
1. Prima verifica lo stato reale del codice e del rendering.
2. Non presumere che questo documento sia più aggiornato del progetto.
3. Non rifare l'audit già completato; verifica soltanto ciò che serve per riprendere.
4. Non modificare le parti già riuscite senza una motivazione concreta.
5. **Unica prossima azione:** eseguire il prompt 17 (QA funzionale) su `sito-v3/public/` con Playwright, desktop e mobile: navigazione e ancore, menu drawer, pannelli di approfondimento, precompilazione e validazione del modulo (casi positivi e negativi, ripiego quando il backend non è configurato), barra mobile fissa, banner consenso, tastiera e reduced motion. Salvare l'esito in `docs/website-factory/QA_REPORT.md`, distinguendo PASS / FAIL / NOT TESTED. L'invio reale resta NOT TESTED finché non c'è il backend.
6. Al termine aggiorna questo documento e i soli file pertinenti.

## Ultimo QA
- Test eseguiti (12 ottobre 2026, server statico locale `sito-v3/public`, Chromium headless via Playwright 1.56): caricamento di `index`, `privacy`, `cookie`, `grazie` e `404` a 1440×900 e a 390×844 (mobile touch); scorrimento completo dell'index; screenshot della hero desktop e mobile osservati.
- Esiti: 0 errori di console o JavaScript; 0 risposte HTTP ≥ 400; 0 px di scorrimento orizzontale su entrambe le viste; hero leggibile e CTA visibili sia su desktop sia su mobile.
- Non verificati: invio del modulo e Pages Function; interazioni (menu, pannelli, modulo, barra mobile, consenso); tastiera e screen reader; Lighthouse/Core Web Vitals; browser diversi da Chromium.
- Commit di riferimento: `399ba8e`
