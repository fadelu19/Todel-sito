# Project State — TO.DE.L. Automazione Industriale

**Ultimo aggiornamento:** 13 ottobre 2026, sera (pre-lancio 1: accuratezza dei contenuti e leggibilità mobile, playbook Website Factory v1.6.1)
**Repository e branch:** `fadelu19/Todel-sito`, branch `claude/todell-hero-integration-fvnvaw` (partito da `main` @ `399ba8e`). Questo file e `PROJECT_BRIEF.md` provengono dal branch `claude/website-factory-setup-ex8ea9` (commit `9ac4338`) e qui sono aggiornati: fa fede la versione su questo branch
**Directory/versione attiva verificata:** `sito-v3/public/` (v4.1 + Hero della fase 8). `sito/` e `sito-v2/` sono archivio
**Deploy/preview:** nessun deploy, nessun merge in `main`. Preview solo locale (server statico + Chromium headless)
**Modalità:** Premium
**Modulo settore:** A — Industria / B2B / macchinari
**Fase corrente:** pre-lancio 1 concluso sul branch (dati tecnici, claim, leggibilità degli schemi) → la pubblicazione resta **bloccata da input esterni** (matrice sotto). **Il sito non è pronto al lancio**

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

## Homepage — completamento (13 ottobre 2026)
Verifica preliminare: la homepage conteneva già tutte le sezioni dell'architettura del brief 1/3 (13 sezioni + 7 approfondimenti). Non c'erano sezioni mancanti da costruire; il lavoro è stato di pulizia, accuratezza e allineamento alla Hero. Non esistono nel repository `SITE_COPY.md`, `ART_DIRECTION.md`, `ASSET_MANIFEST` né riferimenti a "Blueprint", "Bauhaus" o FIESTO: fanno fede `PRODUCT.md`, `DESIGN.md`, `brief/` e il codice.

Sezioni della homepage (ordine attuale): Hero → Azienda in numeri + clienti → Macchine Golden Laser (4 famiglie) → Per completare il reparto (plasma, piegatura, automazione, retrofit, usato) → Applicazioni (spessori U3 + settori) → Metodo (un solo referente, 4 fasi) → Il taglio laser passo per passo → [Video reali, nascosta finché non ci sono 2 video] → Finanziamento → Marchi → Richiedi preventivo → piè di pagina. Approfondimenti: taglio laser, piegatura, plasma, saldatura e pulizia, automazione e cobot, retrofit CNC, usato.

Modifiche:
1. **Dicitura "rivenditore ufficiale Golden Laser" tolta da tutto il sito**, perché nel repository non c'è l'autorizzazione scritta: `og:description`, distinta Azienda (ora "Installazione e assistenza · Tecnici propri"), intro Macchine ("Vendiamo, installiamo e assistiamo la gamma Golden Laser…"), fase 02 del Metodo (ora i quattro marchi trattati), Marchi, etichette degli approfondimenti laser e saldatura, e l'**immagine di anteprima social** (`og-todel.jpg`, che riportava la dicitura nel disegno: rigenerata dal disegno CAM della Hero, senza foto di terzi). Restano le formule "scheda tecnica ufficiale Golden Laser", che indicano la fonte dei dati. Nessun riferimento a FIESTO nel repository.
2. **Segnaposto "Foto da inserire" eliminati** (tavola Piegatura, striscia campioni di taglio, approfondimento Piegatura) e **foto stock senza licenza documentata tolte** (plasma, robot, CNC: file rimossi da `public/`). Al loro posto i disegni tecnici già presenti negli approfondimenti: nelle tavole come disegno fermo (`.tavola__foto--schema`), con un disegno nuovo e statico per il plasma (torcia, arco, solco); negli approfondimenti resta solo lo schema, senza il commutatore Foto/Schema. Rimosso il CSS dei segnaposto, non più usato.
3. **Marchio testuale provvisorio** anche nel piè di pagina e nelle intestazioni di `privacy`, `cookie`, `grazie`, `404` (prima: logo SVG).
4. **Codice colore della Hero** esteso al resto della pagina: frecce dei link, icone di telefono e mappa, quota dello schema di piegatura in blu; il caldo resta al laser e al taglio.
5. **Ripiego senza JavaScript per gli approfondimenti**: prima i link "Approfondisci" / "Scheda tecnica" portavano a contenuti nascosti; ora, senza JS (o se `main.js` non parte), gli approfondimenti sono leggibili in fondo alla pagina e le ancore ci arrivano.
6. **Correzioni JS**: (a) link diretto a un approfondimento che parte dallo schema animato (es. `/#taglio-plasma`) → errore "caricaTaglio before initialization": dichiarazione spostata in alto; (b) barra mobile: con un salto istantaneo dal fondo pagina restava nascosta per sempre (stato aggiornato solo al passaggio delle soglie degli osservatori): ora la posizione si legge dal vivo allo scorrimento (rAF); (c) vista degli approfondimenti senza pulsanti Foto/Schema gestita.

## Pre-lancio 1 — accuratezza e leggibilità (13 ottobre 2026, sera)
**A. Dati tecnici**
- `index.html` sezione Applicazioni (`#applicazioni`): grafico spessori da 6 a 4 colonne (3, 4, 6, 8 kW), massimo 30 mm sul carbonio; tolte le colonne 12 kW (40 mm) e 20 kW (60 mm). Motivo: il dato confermato è "fino a 30 mm, in funzione di modello, potenza e materiale". I valori restano quelli della tabella U3 in `brief/golden-laser-modelli.md`, nessun dato nuovo.
- Testo introduttivo: "Dipende dalla macchina, dal materiale e dalla potenza… valori massimi della serie Golden Laser U3 da 3 a 8 kW". Didascalia: "da 22 mm con 3 kW a 30 mm con 8 kW… non valgono per ogni macchina o configurazione. Spessore effettivo e qualità del bordo dipendono da macchina, materiale, gas e parametri".
- `assets/js/main.js` (`SPESSORI`, `KW`): array a 4 valori; la sintesi accessibile (`#spessori-sintesi`, `aria-describedby` del grafico) usa l'ultimo valore invece dell'indice fisso 5.
- `assets/css/style.css` (`.spessori*`): 4 colonne, scala massima 30 mm (prima 60), `--k` raddoppiato (8 px desktop, 6 px mobile) per mantenere l'altezza: il grafico resta "in scala".
- Approfondimento taglio laser (`#taglio-laser-fibra`, nota fonte): tolto "Con potenze superiori gli spessori aumentano"; ora "Per altri modelli, potenze e configurazioni i valori ve li indichiamo nel preventivo".
- Famiglia "Taglio lamiera": "fino a 30 mm di spessore" → "fino a 30 mm di spessore in funzione di potenza e materiale".
- Ricerca 60/30 mm: nessun altro valore oltre 30 mm in HTML, JS, CSS e pagine secondarie. Restano "fino a 30 mm" con il riferimento a U3 / 8 kW (famiglia lamiera, passo 03 della storia, approfondimento), già condizionati. Nel brief del titolare (`brief/01`, esempio di tono "Taglio fino a 60 mm") la frase resta: è un documento sorgente, non contenuto del sito.

**B. Claim commerciali** (scansione di `index.html`, `privacy`, `cookie`, `grazie`, `404`, meta, Open Graph, JSON-LD, `config`, JS)
- "Rivenditore ufficiale", "esclusiva", "concessionario", "distributore", "autorizzato", "dealer": nessuna occorrenza nel sito (verificato anche nell'HTML grezzo delle pagine secondarie).
- JSON-LD `LocalBusiness`: tolta la proprietà `brand` (Golden Laser, Gilardi, DAMI, Di Donato). Per schema.org indica i marchi "gestiti" dall'organizzazione: un motore di ricerca può leggerla come rapporto commerciale non documentato. Il resto del JSON-LD (dati aziendali, servizi) è documentato.
- `#macchine`, testo introduttivo: "Vendiamo, installiamo e assistiamo la gamma Golden Laser" → "…macchine Golden Laser". "La gamma" suggerisce un rapporto di distribuzione dell'intera linea; la vendita di macchine Golden Laser è dichiarata dal titolare (`brief/01`).
- `#metodo`, fase 02: "Golden Laser, Gilardi, DAMI, Di Donato" → "Macchine di più marchi". I nomi restano solo nella sezione Marchi, senza linee né qualifiche.
- Restano invariati, perché tecnici e corretti: "scheda tecnica ufficiale Golden Laser" (fonte dei dati), "foto Golden Laser" (provenienza), meta description "Taglio laser fibra Golden Laser…" (prodotto trattato).
- Sezione Marchi: Golden Laser con le sue linee (documentate); Gilardi, DAMI Engineering, Di Donato & Partners solo come nome, perché le linee vendute non sono confermate.

**C. Leggibilità degli schemi** (misura della dimensione resa a schermo di ogni `<text>` SVG, con screenshot)
- Prima: a 390 px etichette degli schemi a 9,5 px, "90°" nella tavola a 10,7 px, quote della simulazione a scorrimento a 5,7 px; a 360 px fino a 8,7 e 5,2 px; a 1440 px le quote della simulazione a 11,4 px.
- Ora, a 1440, 760, 521, 520, 421, 390 e 360 px: **nessuna etichetta sotto i 12 px** fuori dalla Hero (minimo 12,2 px a 360), nessuna fuori dal disegno, nessuna coperta da commutatore o didascalia, nessuna sovrapposta a forme se non quelle volute (quota "90°" sul suo richiamo, cifre nel display, quote sul pezzo).
- Come: sotto 520 px le etichette crescono in unità SVG (`.tec__nota` 15,5, "90°" e cifre 17); riquadro quadrato per gli schemi disegnati (`.vista__riquadro:has(.tec)`), così commutatore e didascalia stanno in fasce libere; "Controllo: nuovo" allineata a destra per non toccare la base della macchina; "Punzone e matrice" nascosta sotto 520 px (la didascalia dice la stessa cosa); "90°" nelle tavole a 18 unità; simulazione a scorrimento: quote a 14 unità su desktop, nascoste sotto 760 px, con i valori nel testo del passo 04 ("Staffa 300 × 170 mm, fori Ø 24").
- **Hero:** quote ("300 mm", "170", "Ø 24") a 7,3 px a 390 e 6,8 px a 360. Risolto subito dopo, vedi "Chiusura del QA mobile della Hero".

**Asset:** tolta da `public/` `gl/gf1530jht-officina` (jpg e webp), non più usata dopo la Hero della fase 8.

## Chiusura del QA mobile della Hero (13 ottobre 2026)
- Origine delle quote: `text.sim__quota-testo` dentro `.sim--eroe`, sia nel fotogramma statico del markup (senza JS e con movimento ridotto) sia nell'SVG generato da `taglio.js` (scena `eroeCam`, gruppo `.sim__quote`).
- Correzione: `assets/css/style.css`, `@media (max-width: 760px) { .sim--eroe .sim__quota-testo { display: none; } }`. Si nascondono solo i numeri: linee di quota, scala, spaziature, tempi e composizione invariati; `taglio.js` non toccato. Stessa soluzione già usata per la simulazione a scorrimento.
- Alternativa testuale: l'`aria-label` del riquadro (`role="img"`) ora dice "…vista dall'alto: pezzo di 300 × 170 mm con fori da Ø 24 mm" (valori presi dalle quote del disegno). Nessun testo visibile aggiunto.
- Sopra 760 px nessun cambiamento: screenshot della Hero prima e dopo a 1440 × 900 identici pixel per pixel (0 pixel diversi, sia con animazione sia con movimento ridotto). A 390 e 360 px le differenze sono limitate all'area dei numeri tolti (~200 pixel).
- Osservazione non corretta (fuori perimetro, già presente prima): a 360 px nel cartiglio sotto la Hero l'etichetta "POSIZIONAMENTO" tocca "VELOCITÀ DI POSIZIONAMENTO".

## Divergenze trovate fra documenti e codice
- Il case study del playbook (`10_TODEL_CASE_STUDY.md`) descrive `sito/` come cartella pubblicata e il North Star "Plant Signage System". **Non è più vero:** fanno fede il README e `DESIGN.md` (`sito-v3/public/`, direzione "tavola tecnica").
- Nella radice del repo non esiste un `CLAUDE.md`. Il playbook non è copiato nel repo.
- `DESIGN.md` (Hero, colori, tavola, marchio), `PRODUCT.md` (dicitura del rivenditore, stock, marchio), `PROJECT_BRIEF.md`, `README.md` e `sito-v3/README.md` allineati il 13 ottobre al codice.
- `PRODUCT.md` registrava la dicitura "Rivenditore ufficiale" come "confermata e usata sul sito": la conferma è solo verbale, senza autorizzazione scritta nel repository. Prudenza: non pubblicata.

## Stato per fase
| Fase | Stato | Evidenza/file | Note |
|---|---|---|---|
| 01 Brief | Completata | `brief/01-03`, `PRODUCT.md`, `PROJECT_BRIEF.md` | |
| 02 Asset | Parziale | README (radice) "Da completare", `brief/golden-laser-modelli.md` | Manca un `ASSET_MANIFEST.md` formale |
| 03–04 Ricerca/posizionamento | Completata (informale) | `brief/golden-laser-modelli.md`, `PRODUCT.md` | Nessuna analisi dei concorrenti |
| 05–06 UX/copy | Completata | `sito-v3/public/index.html` | Copy della Hero dalla fase 8; dicitura del rivenditore tolta (13 ottobre); nessun `SITE_COPY.md` separato |
| 07 + 09 Art direction/design system | Completata | `DESIGN.md`, token in `style.css` | Allineato alla Hero il 13 ottobre |
| 08 Architettura tecnica | Completata | `PRODUCT.md` → Stack, `sito-v3/README.md` | |
| 10 Prototipo hero | **Completata e integrata** | patch fase 8 + correzioni del 13 ottobre | Approvata come base di lavoro |
| 11–12 Sviluppo/motion | **Homepage completata** (13 ottobre) | sezione "Homepage — completamento" | Pagine secondarie solo con il marchio aggiornato |
| 13–16 Responsive/visuale/conversione/audit | Non formalizzate | | |
| 17 QA funzionale | Parziale: homepage automatizzata in Chromium | sezione "Ultimo QA" | Niente dispositivi reali, altri browser, screen reader, invio reale del modulo |
| 18 Pre-lancio | Bloccata | "Problemi aperti" | |
| 19 Handoff | Non iniziata | | |

## Decisioni e non-decisioni
- Approvate: posizionamento "partner unico"; formule numeriche e 5 clienti in `PRODUCT.md`; direzione v4; Cloudflare Pages; **Hero della fase 8 come base di lavoro (13 ottobre)**; wordmark testuale provvisorio finché non arriva il logo originale; **niente "rivenditore ufficiale" senza autorizzazione scritta**; **niente foto stock senza licenza documentata, niente segnaposto visibili: disegni tecnici al loro posto** (istruzioni del 13 ottobre)
- Ancora da confermare: dominio; canale di recapito del modulo (Resend o webhook); linee vendute di Gilardi, DAMI e Di Donato; nomi e ruoli dei referenti; WhatsApp aziendale; dicitura "Rivenditore ufficiale Golden Laser" (solo con autorizzazione scritta); diritti d'uso delle foto Golden Laser; logo definitivo
- Escluse: e-commerce e prezzi; testimonianze e certificazioni (non fornite); direzioni v1 e v2; video nella Hero (nessun video TO.DE.L. pubblicabile)

## Asset
- Riferimento: README in radice, `sito-v3/README.md`, `brief/golden-laser-modelli.md` (provenienza delle foto Golden Laser). Manca un `ASSET_MANIFEST` formale: la classificazione sotto ne fa le veci
- **Utilizzabili** (di TO.DE.L. o con licenza nel repository): disegni e simulazioni SVG, `og-todel.jpg` (generata dal disegno CAM), `favicon.svg`, file del logo TO.DE.L. (`logo-todel*.svg/png`, non usati nelle pagine), font Archivo e Martian Mono (`fonts/LICENSE-OFL.txt`)
- **Da autorizzare** (foto e rendering ufficiali Golden Laser, forniti dal titolare l'8 ottobre, nessuna licenza scritta nel repository; la provenienza dal sito del produttore non è un'autorizzazione al riuso): `gl/lamiera-grande-formato`, `lamiera-cabinata`, `lamiera-compatta`, `lamiera-tubo-aperta`, `lamiera-tubo-cabinata`, `tubo-3d-5assi`, `tubo-s12r`, `tubo-caricatore`, `saldatrice-w`, `saldatura-robot-r`
- **Da sostituire o autorizzare espressamente** (foto con filigrana Golden Laser): `gl/gf1530jht-fronte` (approfondimento laser, variante lamiera e tubo)
- Tolti il 13 ottobre: stock plasma/robot/CNC, poi `gf1530jht-officina`. Segnaposto visibili: nessuno
- Marchio: wordmark testuale provvisorio ovunque nel sito; il PNG del logo resta nel JSON-LD
- Mancanti: logo originale definitivo; foto reali di persone, sede, tecnici, installazioni, pressopiegatrice, campioni di taglio; video reali
## Matrice dei blocchi al lancio (13 ottobre 2026)
| Blocco | Evidenza concreta | File o pagina | Azione necessaria | Responsabile | Stato |
|---|---|---|---|---|---|
| Spessori oltre il dato confermato | Grafico a 60 mm con 20 kW | `index.html` `#applicazioni`, `main.js`, `style.css` | Limitato a 3–8 kW, massimo 30 mm, con nota sulla configurazione | Implementazione tecnica | Risolto |
| Dicitura "rivenditore ufficiale" e rapporti non documentati | Nessuna autorizzazione scritta; dicitura già tolta; `brand` nel JSON-LD | tutto il sito | Tolte dicitura e `brand`; testi neutri | Implementazione tecnica | Risolto |
| Autorizzazione scritta Golden Laser | Nessun documento nel repository (`PRODUCT.md`: conferma solo verbale) | — | Archiviare l'autorizzazione; solo allora decidere se rimettere la dicitura | Titolare | Da confermare |
| Diritti d'uso delle immagini Golden Laser | 11 file in `assets/img/gl/` senza licenza scritta; `gf1530jht-fronte` con filigrana | sezione Macchine, approfondimenti laser e saldatura | Autorizzazione scritta o kit ufficiale per rivenditori; altrimenti sostituire con disegni come per plasma e piegatura | Titolare (+ tecnica per la sostituzione) | **Bloccante** |
| Fotografie originali | Nessuna foto di persone, sede, installazioni; componente `.referenti` vuoto | `#metodo`, Tecnologie | Foto con diritti; inserimento senza toccare la struttura (`sito-v3/README.md`) | Titolare | Da confermare (non bloccante: oggi nessun segnaposto visibile) |
| Logo definitivo | Marchio testuale provvisorio in tutte le pagine | tutte | Fornire il logo originale; poi sostituire il wordmark | Titolare, poi tecnica | Da confermare |
| Marchi e linee vendute | Gilardi, DAMI, Di Donato solo come nome; linee non confermate (`PRODUCT.md`) | `#marchi` | Conferma scritta dei marchi trattati e delle linee; poi eventuali descrizioni | Titolare | Da confermare |
| Dati aziendali mancanti | REA e capitale sociale assenti nel piè di pagina e nella privacy; anno di fondazione, orari, tempi di assistenza non forniti | piè di pagina, `privacy.html` | Fornire i dati; nessun dato va inventato | Titolare | **Bloccante** (REA e capitale sociale) |
| Dominio | `DOMINIO-DA-INSERIRE` in 11 punti di `index.html`, in `privacy`, `cookie`, `sitemap.xml` (3), `robots.txt` | canonical, OG, JSON-LD, sitemap, robots | Scegliere il dominio; `node sito-v3/scripts/imposta-dominio.mjs https://…` | Titolare, poi tecnica | **Bloccante** |
| Recapito del modulo | `functions/api/richiesta.js` richiede `RESEND_API_KEY`, `EMAIL_MITTENTE`, `EMAIL_DESTINATARIO` o `LEAD_WEBHOOK_URL`; nessuno configurato | modulo `#contatti` | Configurare le variabili su Cloudflare Pages; invio reale di prova end-to-end | Titolare (account) + tecnica | **Bloccante** |
| Backend e Turnstile | Pages Function mai eseguita; `turnstileSiteKey` vuoto nel `config`, `TURNSTILE_SECRET` non impostato | `functions/api/richiesta.js`, `index.html` `config` | Test su anteprima Cloudflare: invio valido, invio rifiutato, trappola antispam, Turnstile se attivato | Tecnica (con accesso dell'account) | Da confermare |
| GA4 e consenso cookie | `analytics.ga4` vuoto: il banner non compare e nessun cookie di statistica è attivo; mappa Google caricata solo su richiesta | `consenso.js`, `cookie.html` | Se si attiva GA4: inserire il codice in `index.html` e `cookie.html`, verificare banner, rifiuto e revoca | Titolare (decisione) + tecnica | Da confermare |
| Testi privacy e cookie | Commento "BOZZA… da far verificare al consulente privacy" in `privacy.html`; `cookie.html` in bozza | `privacy.html`, `cookie.html` | Verifica professionale; nessun testo è stato verificato da un consulente | Consulente privacy | **Bloccante** |
| Quote della Hero su mobile | Erano a 7,3 px (390) e 6,8 px (360) | Hero | Nascoste sotto 760 px, valori nell'`aria-label`; desktop invariato | Implementazione tecnica | Risolto |
| Accessibilità assistiva | Solo controlli automatici (nomi, alt, focus da tastiera, movimento ridotto) | tutto il sito | Prova con VoiceOver / TalkBack / NVDA; contrasto misurato con strumento | Tecnica | Da confermare |
| Browser e dispositivi | Solo Chromium headless con emulazione mobile | tutto il sito | Safari iOS, Chrome Android, Firefox, Edge su dispositivi reali; Lighthouse / Core Web Vitals | Tecnica | Da confermare |
## Strumenti
- Playwright + Chromium (preinstallati): **UTILIZZARE ORA** per QA e rendering, senza costi
- Cloudflare Pages, Resend, Turnstile: **VALUTARE IN SEGUITO**, servono dominio, account del titolare e autorizzazione
- GA4: **NON NECESSARIO** prima del lancio (è già predisposto, si attiva solo con il consenso)

## Prossima sessione — istruzioni operative
1. Verifica branch, stato Git e rendering prima di toccare il codice; non presumere che questo documento sia più aggiornato del progetto.
2. Non rifare strategia, Hero, homepage, claim né leggibilità degli schemi: sono conclusi.
3. Prossima attività tecnica consigliata: preparare l'anteprima su Cloudflare Pages (branch preview, senza dominio) appena il titolare fornisce l'accesso, per provare Pages Function, recapito e Turnstile; nel frattempo collaudo su dispositivi reali (iOS Safari, Android Chrome) e Lighthouse.
4. In attesa del titolare: autorizzazione e diritti Golden Laser, REA e capitale sociale, dominio, logo, marchi e linee, decisione sulle quote della Hero; consulente per privacy e cookie.
5. Al termine aggiorna questo documento e i soli file pertinenti.
## Ultimo QA
**13 ottobre 2026, sera — regressione dopo il pre-lancio 1.** Server statico locale su `sito-v3/public`, Chromium headless via Playwright. **Nessun dispositivo reale, nessun altro browser, nessuno screen reader.**

Automatico a 1440 × 900, 390 × 844 e 360 × 740 — **tutto PASS** (26 controlli a 1440, 28 per ciascuna viewport mobile):
- scorrimento orizzontale 0; nessun id duplicato; un solo h1; immagini caricate e con `alt`; pulsanti con nome accessibile; ancore e `data-apri` con destinazione
- un solo `tel:+393288241909`, una sola email
- testo senza diciture di rivenditore, esclusiva, concessione o autorizzazione; nessun segnaposto o stock; **nessuno spessore oltre 30 mm**; **grafico a 4 colonne, massimo 30 mm**; **JSON-LD senza `brand`**
- 7 approfondimenti: apertura, contenuto visibile, chiusura con Esc
- menu desktop e mobile; barra mobile (anche dopo un salto istantaneo)
- CTA con precompilazione; modulo: errori su campi vuoti ed email non valida, ripiego con email e telefono quando il backend non risponde (501 atteso del server statico)
- Hero: simulazione completata con "Riproduci", nessuno scorrimento orizzontale
- console senza errori oltre al 501 atteso

Altro automatico — PASS: link diretto a ciascuno dei 7 approfondimenti; pagine `privacy`, `cookie`, `grazie`, `404` a 360 × 740 (nessun claim, nessuno scorrimento orizzontale, marchio, nessun errore); tastiera su desktop (focus visibile sui primi 8 elementi); movimento ridotto; senza JavaScript a tutte e tre le viewport.

Leggibilità degli schemi (misura della dimensione resa, 7 larghezze da 1440 a 360 px): **PASS** fuori dalla Hero (≥ 12 px, nessuna etichetta fuori dal disegno o coperta). Hero, dopo la chiusura del QA mobile: **PASS**, nessuna quota visibile a 390 e 360 px (né durante il taglio né a fine ciclo, né nel fotogramma statico), quote a 12,6 px a 1440 come prima.

Regressione dopo la chiusura del QA mobile della Hero — PASS a 1440 × 900, 390 × 844, 360 × 740: tutta la suite sopra (26/28/28 controlli), Hero (avvio senza scorrere, Pausa → Riprendi → Riproduci, fermo fuori vista, nessuna ripartenza, seconda visita, movimento ridotto, senza JS), nessun errore di console né richiesta fallita nella Hero, nessuno scorrimento orizzontale; confronto screenshot prima/dopo come sopra. Screenshot osservati a 390 e 360 px: schemi di automazione, piegatura, retrofit e saldatura senza sovrapposizioni; grafico spessori a 1440 e 360 px.

NOT TESTED: invio reale del modulo, Pages Function, Turnstile; banner di consenso con GA4 attivo; risparmio dati / 2G; screen reader; contrasto misurato con strumento; Safari/iOS, Firefox, Android reali; Lighthouse / Core Web Vitals.
