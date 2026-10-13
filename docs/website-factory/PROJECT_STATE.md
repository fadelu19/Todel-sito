# Project State — TO.DE.L. Automazione Industriale

**Ultimo aggiornamento:** 13 ottobre 2026 (integrazione della Hero della fase 8, playbook Website Factory v1.6.1)
**Repository e branch:** `fadelu19/Todel-sito`, branch `claude/todell-hero-integration-fvnvaw` (partito da `main` @ `399ba8e`). Questo file e `PROJECT_BRIEF.md` provengono dal branch `claude/website-factory-setup-ex8ea9` (commit `9ac4338`) e qui sono aggiornati: fa fede la versione su questo branch
**Directory/versione attiva verificata:** `sito-v3/public/` (v4.1 + Hero della fase 8). `sito/` e `sito-v2/` sono archivio
**Deploy/preview:** nessun deploy, nessun merge in `main`. Preview solo locale (server statico + Chromium headless)
**Modalità:** Premium
**Modulo settore:** A — Industria / B2B / macchinari
**Fase corrente:** Hero della fase 8 integrata e approvata come base di lavoro → prossimo incarico: completare il resto del sito in blocchi funzionali

Brief: [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md). Dati confermati: [`../../PRODUCT.md`](../../PRODUCT.md). Sistema visivo: [`../../DESIGN.md`](../../DESIGN.md).

## Obiettivo e vincoli approvati
- Obiettivo primario: richieste di preventivo qualificate
- Pubblico: PMI manifatturiere della Campania e del Sud Italia
- CTA primaria: "Richiedi preventivo"; secondaria: chiamata
- Direzione creativa approvata: v4 "tavola tecnica" (`DESIGN.md`); Hero sostituita dal prototipo della fase 8 (vedi sotto)
- Stack: HTML/CSS/JS statico senza build + Cloudflare Pages Function per il modulo (scelta del titolare: niente framework)
- Vincoli non negoziabili: nessun dato inventato; niente segnaposto visibili ai visitatori al lancio; nessun deploy, DNS o costo senza autorizzazione

## Hero della fase 8 — integrazione (12–13 ottobre 2026)
- Fonte: `prototipo-hero-fase8-definitivo.patch`, prototipato in Claude Projects e approvato. `git apply --check` pulito su `399ba8e`; i quattro file risultanti coincidono byte per byte con quelli indicati dal patch (`index.html`, `style.css`, `main.js`, `taglio.js`).
- Contenuto: niente foto; simulazione CAM del taglio di una staffa (scena `eroeCam` in `taglio.js`), una volta per sessione, ciclo sotto i 5 s, poi fermo sul pezzo finito con "Riproduci"; fotogramma finale statico nel markup per JS assente e movimento ridotto; cartiglio con dati U3 (±0,05 mm/m, fino a 160 m/min, fonte in `brief/golden-laser-modelli.md`); fascia "Cosa dovete fare?" con 6 accessi + 3 link secondari; nuovo titolo "Macchinari per la lamiera, scelti con voi."
- Il patch tocca anche la barra di navigazione: fondo pieno senza sfocatura, marchio testuale provvisorio, tendina "Macchine" con il gruppo "Laser" al posto di "Golden Laser · rivenditore ufficiale".
- Correzioni mirate approvate e applicate dopo il patch (13 ottobre):
  1. Avvio della simulazione: soglia dell'IntersectionObserver da 0,5 a 0,3 (a 360 × 740 il riquadro entra esattamente a metà e non partiva); stato "avvio" durante il caricamento del modulo, così osservatore e clic ravvicinati non fanno partire due cicli.
  2. Marchio: il wordmark testuale provvisorio «TO.DE.L. / Automazione Industriale» ora è anche nel menu mobile (prima c'era il logo SVG). Il logo definitivo non è stato ricostruito.
  3. Codice residuo: rimossi da `main.js` il vecchio taglio della foto (`inquadratura`, `finisciTaglio`, `segnaPausa`) e `videoEroe()`, che non potevano più attivarsi (`[data-taglio-eroe]` non esiste più); rimosse le regole CSS `.taglio-strato*`. La chiave `videoEroe` resta nel `config`, segnata come non collegata in `sito-v3/README.md`.
  4. Bordo della simulazione: la regola `.sim--eroe` (senza bordo, raggio e ombra) perdeva contro `.sim`, che viene dopo nel CSS a pari specificità; il riquadro interno mostrava un bordo con angoli arrotondati dentro la cornice. Ora `.sim.sim--eroe`. La proporzione resta quella effettiva delle preview approvate (10/7 su desktop, 4/3 sotto 760 px): la dichiarazione `aspect-ratio: 800 / 520`, mai applicata, è stata tolta.

## Divergenze trovate fra documenti e codice
- Il case study del playbook (`10_TODEL_CASE_STUDY.md`) descrive `sito/` come cartella pubblicata e il North Star "Plant Signage System". **Non è più vero:** fanno fede il README e `DESIGN.md` (`sito-v3/public/`, direzione "tavola tecnica").
- Nella radice del repo non esiste un `CLAUDE.md`. Il playbook non è copiato nel repo.
- `DESIGN.md` descrive ancora la Hero v4 (titolo Display 2,5–4,6 rem con interlinea 0,94, cartiglio sovrapposto con ombra); la Hero della fase 8 usa 2,5–4 rem, interlinea 1,02, cartiglio dentro la cornice. Va allineato quando si riprende il sistema visivo.

## Stato per fase
| Fase | Stato | Evidenza/file | Note |
|---|---|---|---|
| 01 Brief | Completata | `brief/01-03`, `PRODUCT.md`, `PROJECT_BRIEF.md` | |
| 02 Asset | Parziale | README (radice) "Da completare", `brief/golden-laser-modelli.md` | Manca un `ASSET_MANIFEST.md` formale |
| 03–04 Ricerca/posizionamento | Completata (informale) | `brief/golden-laser-modelli.md`, `PRODUCT.md` | Nessuna analisi dei concorrenti |
| 05–06 UX/copy | Completata | `sito-v3/public/index.html` | Copy della Hero aggiornato dal prototipo della fase 8 |
| 07 + 09 Art direction/design system | Completata | `DESIGN.md`, token in `style.css` | `DESIGN.md` da allineare sulla Hero |
| 08 Architettura tecnica | Completata | `PRODUCT.md` → Stack, `sito-v3/README.md` | |
| 10 Prototipo hero | **Completata e integrata** | patch fase 8 + correzioni del 13 ottobre | Approvata come base di lavoro |
| 11–12 Sviluppo/motion | Completata per la v4.1; **resto del sito da completare in blocchi funzionali** | | Prossimo incarico |
| 13–16 Responsive/visuale/conversione/audit | Non formalizzate | | |
| 17 QA funzionale | Parziale: solo Hero e navigazione | sezione "Ultimo QA" | Resto del sito non testato |
| 18 Pre-lancio | Bloccata | "Problemi aperti" | |
| 19 Handoff | Non iniziata | | |

## Decisioni e non-decisioni
- Approvate: posizionamento "partner unico"; formule numeriche e 5 clienti in `PRODUCT.md`; direzione v4; Cloudflare Pages; **Hero della fase 8 come base di lavoro (13 ottobre)**; wordmark testuale provvisorio in intestazione e menu mobile finché non arriva il logo originale
- Ancora da confermare: dominio; canale di recapito del modulo (Resend o webhook); grafico spessori 60 mm contro messaggio "fino a 30 mm"; linee vendute di Gilardi, DAMI e Di Donato; nomi e ruoli dei referenti; WhatsApp aziendale; **uso della dicitura "Rivenditore ufficiale Golden Laser"** (vedi blocco sotto); marchio definitivo anche in piè di pagina e nelle pagine secondarie
- Escluse: e-commerce e prezzi; testimonianze e certificazioni (non fornite); direzioni v1 e v2; video nella Hero (nessun video TO.DE.L. pubblicabile)

## Asset
- Riferimento: README in radice + `sito-v3/README.md` (manca un manifest formale)
- In uso: foto ufficiali Golden Laser (`assets/img/gl/`, alcune con filigrana) nelle schede delle macchine; la Hero non usa più foto
- Segnaposto visibili: pressopiegatrice (tavola Piegatura e approfondimento), striscia dei campioni di taglio (sezione Applicazioni)
- Marchio: wordmark testuale provvisorio in intestazione e menu mobile; logo SVG ancora in piè di pagina (`index.html`) e nelle intestazioni di `privacy`, `cookie`, `grazie`, `404`
- Mancanti: logo originale definitivo; foto reali di persone, sede, tecnici e installazioni; kit Golden Laser senza filigrana; video reali

## Problemi aperti
| Priorità | Problema | Impatto | Prossima azione | Stato |
|---|---|---|---|---|
| Bloccante | Modulo non configurato né provato end-to-end | Le richieste non arrivano | Titolare: dominio + Resend o webhook; poi un invio reale | Aperto |
| Bloccante | Dominio assente (`DOMINIO-DA-INSERIRE` in canonical, OG, JSON-LD e sitemap) | SEO e anteprime social non funzionano | Titolare sceglie il dominio → `imposta-dominio.mjs` | Aperto |
| Bloccante | 3 segnaposto "Foto da inserire" visibili ai visitatori | Viola il principio 5 di `PRODUCT.md` | Foto reali, oppure nascondere i blocchi prima del lancio | Aperto |
| **Bloccante (pre-pubblicazione)** | La Hero della fase 8 e la tendina non dicono più "rivenditore ufficiale", ma la dicitura resta fuori dalla Hero in `index.html`: riga 16 (`og:description`), 266 (distinta Azienda), 289 (intro Macchine), 582 (Metodo, fase 02), 702 (Marchi), 855 e 1025 (etichette degli approfondimenti Taglio laser e Saldatura) | Messaggio incoerente; dicitura da pubblicare solo se confermata e documentata (autorizzazione scritta da archiviare, vedi `PROJECT_BRIEF.md`) | Titolare: confermare la dicitura e fornire l'autorizzazione, oppure allineare le occorrenze al tono della Hero. Da risolvere nei blocchi delle rispettive sezioni, non prima | Aperto |
| Alta | Grafico spessori fino a 60 mm contro il messaggio "fino a 30 mm" | Coerenza del claim tecnico | Decisione del titolare | Aperto |
| Alta | Privacy/cookie in bozza; REA e capitale sociale mancanti | Conformità | Consulente privacy + dati dal titolare | Aperto |
| Media | Marchio non uniforme fuori da intestazione e menu (piè di pagina, pagine secondarie) | Coerenza visiva | Decidere con il logo definitivo | Aperto |
| Media | `DESIGN.md` descrive ancora la tipografia e il cartiglio della Hero v4 | Documentazione | Allineare quando si riprende il sistema visivo | Aperto |
| ~~Media~~ | ~~Foto hero con filigrana Golden Laser~~ | | Superato: la Hero non usa più foto | Chiuso |

## Strumenti
- Playwright + Chromium (preinstallati): **UTILIZZARE ORA** per QA e rendering, senza costi
- Cloudflare Pages, Resend, Turnstile: **VALUTARE IN SEGUITO**, servono dominio, account del titolare e autorizzazione
- GA4: **NON NECESSARIO** prima del lancio (è già predisposto, si attiva solo con il consenso)

## Prossima sessione — istruzioni operative
1. Verifica il branch (`claude/todell-hero-integration-fvnvaw`), lo stato Git e il rendering prima di toccare il codice.
2. Non presumere che questo documento sia più aggiornato del progetto.
3. Non rifare strategia, skill, animazioni né la Hero: sono concluse e approvate.
4. **Prossimo incarico:** completare il resto del sito in blocchi funzionali, una sezione o un gruppo di sezioni per volta, con test a 1440 × 900, 390 × 844 e 360 × 740 a ogni blocco. Nei blocchi che le contengono, risolvere le occorrenze di "rivenditore ufficiale" secondo la decisione del titolare.
5. Al termine di ogni blocco aggiorna questo documento e i soli file pertinenti.

## Ultimo QA
**13 ottobre 2026**, server statico locale su `sito-v3/public`, Chromium headless via Playwright, viewport 1440 × 900, 390 × 844 e 360 × 740 (le ultime due in emulazione mobile con touch). **Nessun test su dispositivi reali.**

| Criterio | 1440 × 900 | 390 × 844 | 360 × 740 |
|---|---|---|---|
| Nessuno scorrimento orizzontale, nessun elemento della Hero oltre il bordo | PASS | PASS | PASS |
| 0 errori di console o JavaScript, 0 risposte HTTP ≥ 400 | PASS | PASS | PASS |
| CTA "Richiedi preventivo" sopra la piega, 56 px, porta a `#contatti` | PASS | PASS | PASS |
| "Guarda le macchine" → `#macchine`; telefono `tel:+393288241909`; entrambi ≥ 44 px | PASS | PASS | PASS |
| "Scheda tecnica del taglio laser" e "Piegare" aprono il pannello | PASS | PASS | PASS |
| 6 accessi di "Cosa dovete fare?" con destinazioni esistenti | PASS | PASS | PASS |
| Menu (tendina su desktop, menu mobile) apre e chiude con Esc | PASS | PASS | PASS |
| Wordmark provvisorio in intestazione e nel menu mobile | PASS | PASS | PASS |
| Simulazione parte al caricamento senza scorrere | PASS | PASS | PASS (prima FAIL) |
| Ciclo sotto i 5 s, fermo su "Pezzo completato" con "Riproduci" (≈ 3,6–3,8 s misurati) | PASS | PASS | PASS |
| Riproduci → Pausa → Riprendi → Riproduci | PASS | PASS | PASS |
| Fuori vista si ferma e riprende dal punto lasciato | PASS | PASS | PASS |
| Nessuna ripartenza dopo la fine (3 uscite e rientri dalla vista) | PASS | PASS | PASS |
| Riquadro della simulazione senza bordo né raggio interni | PASS | PASS | PASS |
| Seconda visita nella stessa sessione: fermo con "Riproduci" | PASS | NOT TESTED | NOT TESTED |
| Movimento ridotto: disegno statico, nessun pulsante | PASS | NOT TESTED | NOT TESTED |
| JavaScript disattivato: disegno statico, nessuno scorrimento orizzontale | PASS | NOT TESTED | NOT TESTED |
| Risparmio dati / rete 2G | NOT TESTED | NOT TESTED | NOT TESTED |
| Tastiera, focus e screen reader | NOT TESTED | NOT TESTED | NOT TESTED |
| Safari/iOS, Firefox, dispositivi reali | NOT TESTED | NOT TESTED | NOT TESTED |
| Lighthouse / Core Web Vitals | NOT TESTED | NOT TESTED | NOT TESTED |
| Resto del sito (modulo, consenso, barra mobile, pannelli diversi da quelli citati) | NOT TESTED | NOT TESTED | NOT TESTED |
