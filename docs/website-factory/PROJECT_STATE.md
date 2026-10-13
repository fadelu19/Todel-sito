# Project State — TO.DE.L. Automazione Industriale

**Ultimo aggiornamento:** 13 ottobre 2026, pomeriggio (completamento della homepage dopo la Hero della fase 8, playbook Website Factory v1.6.1)
**Repository e branch:** `fadelu19/Todel-sito`, branch `claude/todell-hero-integration-fvnvaw` (partito da `main` @ `399ba8e`). Questo file e `PROJECT_BRIEF.md` provengono dal branch `claude/website-factory-setup-ex8ea9` (commit `9ac4338`) e qui sono aggiornati: fa fede la versione su questo branch
**Directory/versione attiva verificata:** `sito-v3/public/` (v4.1 + Hero della fase 8). `sito/` e `sito-v2/` sono archivio
**Deploy/preview:** nessun deploy, nessun merge in `main`. Preview solo locale (server statico + Chromium headless)
**Modalità:** Premium
**Modulo settore:** A — Industria / B2B / macchinari
**Fase corrente:** homepage completata sul branch (Hero della fase 8 + sezioni esistenti ripulite e allineate) → prossimo passo: revisione del titolare, poi collaudo complessivo pre-pubblicazione. **Il sito non è pronto al lancio** (vedi "Problemi aperti")

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
- Ancora da confermare: dominio; canale di recapito del modulo (Resend o webhook); grafico spessori 60 mm contro messaggio "fino a 30 mm"; linee vendute di Gilardi, DAMI e Di Donato; nomi e ruoli dei referenti; WhatsApp aziendale; dicitura "Rivenditore ufficiale Golden Laser" (solo con autorizzazione scritta); diritti d'uso delle foto Golden Laser; logo definitivo
- Escluse: e-commerce e prezzi; testimonianze e certificazioni (non fornite); direzioni v1 e v2; video nella Hero (nessun video TO.DE.L. pubblicabile)

## Asset
- Riferimento: README in radice + `sito-v3/README.md` (manca un manifest formale)
- In uso: foto ufficiali Golden Laser (`assets/img/gl/`, alcune con filigrana) nelle schede delle macchine; la Hero non usa più foto
- Segnaposto visibili: nessuno. Foto stock: nessuna (tolte plasma, robot, CNC). Disegni tecnici in SVG per plasma, piegatura, automazione, retrofit, saldatura
- Anteprima social: `og-todel.jpg` rigenerata dal disegno CAM della Hero
- Marchio: wordmark testuale provvisorio ovunque nel sito; i file SVG del logo restano in `assets/img/` (non usati nelle pagine), il PNG nel JSON-LD
- Mancanti: logo originale definitivo; foto reali di persone, sede, tecnici e installazioni; kit Golden Laser senza filigrana; video reali

## Problemi aperti
| Priorità | Problema | Impatto | Prossima azione | Stato |
|---|---|---|---|---|
| Bloccante | Modulo non configurato né provato end-to-end | Le richieste non arrivano | Titolare: dominio + Resend o webhook; poi un invio reale | Aperto |
| Bloccante | Dominio assente (`DOMINIO-DA-INSERIRE` in canonical, OG, JSON-LD e sitemap) | SEO e anteprime social non funzionano | Titolare sceglie il dominio → `imposta-dominio.mjs` | Aperto |
| ~~Bloccante~~ | ~~3 segnaposto "Foto da inserire" visibili~~ | | Sostituiti da disegni tecnici (13 ottobre) | Chiuso |
| ~~Bloccante (pre-pubblicazione)~~ | ~~"Rivenditore ufficiale Golden Laser" fuori dalla Hero~~ | | Tolta da tutto il sito, metadati e immagine social compresi (13 ottobre) | Chiuso |
| Bloccante (pre-pubblicazione) | Autorizzazione scritta Golden Laser assente | Senza, la dicitura del rivenditore non si può usare | Titolare: archiviare l'autorizzazione; poi decidere se rimettere la dicitura | Aperto |
| Bloccante (diritti) | Foto Golden Laser (`assets/img/gl/`, alcune con filigrana) usate su indicazione verbale del titolare, senza autorizzazione scritta nel repository | Rischio sui diritti d'immagine | Titolare: conferma scritta o kit ufficiale per rivenditori; in alternativa sostituirle con disegni | Aperto |
| Alta | Grafico spessori fino a 60 mm contro il messaggio "fino a 30 mm" | Coerenza del claim tecnico | Decisione del titolare | Aperto |
| Alta | Privacy/cookie in bozza; REA e capitale sociale mancanti | Conformità | Consulente privacy + dati dal titolare | Aperto |
| Media | Logo originale assente: ovunque il marchio testuale provvisorio | Identità | Titolare: logo originale | Aperto |
| ~~Media~~ | ~~`DESIGN.md` non allineato alla Hero~~ | | Allineato (13 ottobre) | Chiuso |
| Media | Foto reali assenti (persone, sede, installazioni, pressopiegatrice, campioni di taglio) | Credibilità | Titolare: foto con diritti; si inseriscono senza toccare la struttura (`sito-v3/README.md`) | Aperto |
| Bassa | Etichette dei disegni negli approfondimenti a 11 px nel viewBox (sotto i 12 px del "Readable Floor" a certe larghezze); nelle tavole sono nascoste | Leggibilità | Ingrandire nel prossimo passaggio visivo | Aperto |
| ~~Media~~ | ~~Foto hero con filigrana Golden Laser~~ | | Superato: la Hero non usa più foto | Chiuso |

## Strumenti
- Playwright + Chromium (preinstallati): **UTILIZZARE ORA** per QA e rendering, senza costi
- Cloudflare Pages, Resend, Turnstile: **VALUTARE IN SEGUITO**, servono dominio, account del titolare e autorizzazione
- GA4: **NON NECESSARIO** prima del lancio (è già predisposto, si attiva solo con il consenso)

## Prossima sessione — istruzioni operative
1. Verifica il branch (`claude/todell-hero-integration-fvnvaw`), lo stato Git e il rendering prima di toccare il codice.
2. Non presumere che questo documento sia più aggiornato del progetto.
3. Non rifare strategia, Hero, animazioni né la pulizia della homepage: sono concluse.
4. Prossimo passo: revisione del titolare sulla homepage; raccogliere da lui i bloccanti (autorizzazione Golden Laser, diritti foto, dominio, recapito del modulo, grafico spessori, logo). Poi collaudo complessivo pre-pubblicazione (fase 18) con dispositivi reali.
5. Al termine aggiorna questo documento e i soli file pertinenti.

## Ultimo QA
**13 ottobre 2026, homepage completa.** Server statico locale (`python3 -m http.server`) su `sito-v3/public`, Chromium headless via Playwright, script automatico; controllo visivo degli screenshot fatto da Claude. **Nessun test su dispositivi reali, nessun altro browser, nessuno screen reader.**

Verifiche automatiche a 1440 × 900, 390 × 844 e 360 × 740 (mobile in emulazione touch) — tutte PASS:
- scorrimento orizzontale 0 su tutta la pagina; nessun id duplicato; un solo h1; tutte le immagini caricate e con `alt`; tutti i pulsanti con nome accessibile
- tutte le ancore interne hanno una destinazione; ogni `data-apri` porta a un approfondimento esistente
- un solo numero `tel:+393288241909` e una sola email `mailto:todelsrl@gmail.com` in tutta la pagina
- testo della pagina senza "rivenditore ufficiale", senza "Foto da inserire", senza foto stock
- tutti i 7 approfondimenti si aprono dal loro link, mostrano contenuto visibile (foto Golden Laser o disegno) e si chiudono con Esc
- menu desktop (tendina → approfondimento; voce → ancora) e menu mobile (voce → chiude e porta all'ancora; voce macchina → approfondimento)
- barra mobile: compare dopo la Hero, sparisce ai contatti, ricompare dopo un salto istantaneo dal fondo pagina (prima FAIL, corretto)
- CTA "Richiedi preventivo" con precompilazione: valore e chip corretti, scorre al modulo
- modulo: vuoto → errori su nome e telefono con focus sul primo; email non valida → errore; invio senza backend (POST → 501 del server statico) → messaggio "Invio non riuscito" con link email e telefono
- Hero non regredita: simulazione completata, "Riproduci", nessuno scorrimento orizzontale
- console: nessun errore oltre al 501 atteso del backend assente
- link diretto a ciascuno dei 7 approfondimenti (`/#id`) a 390 × 844: si apre senza errori (prima FAIL su plasma, corretto)

Altre verifiche automatiche: tastiera su desktop (primi 8 Tab: "Vai al contenuto", marchio, voci del menu, telefono, tutti con focus visibile) PASS; movimento ridotto a 390 × 844 (Hero statica, approfondimento apribile, nessun errore) PASS; senza JavaScript a 1440, 390 e 360 (Hero statica, nessuno scorrimento orizzontale, `/#piegatura-e-cesoie` porta all'approfondimento in fondo pagina) PASS.

Verifiche manuali (screenshot osservati): tavole con disegni, approfondimento Piegatura senza commutatore, piè di pagina con marchio, anteprima social, ripiego senza JS. Coerenti con la Hero.

NOT TESTED: invio reale del modulo e Pages Function; Turnstile; banner di consenso con GA4 attivo (GA4 è vuoto, quindi nessun banner); risparmio dati / 2G; screen reader; contrasto misurato con strumento; Safari/iOS, Firefox, Android reali; Lighthouse / Core Web Vitals; pagine `privacy`, `cookie`, `grazie`, `404` oltre al cambio del marchio.

QA della sola Hero (mattina del 13 ottobre, commit `80e4ae4`): soglia di avvio, Riproduci/Pausa/Riprendi, una volta per sessione, movimento ridotto e assenza di JS a 1440 × 900: PASS, dettagli nella cronologia Git di questo file.
