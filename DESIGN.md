---
name: TO.DE.L. Automazione Industriale
description: "Sito v4 'tavola tecnica': fondo grafite, lastre chiare da catalogo per le macchine, un solo accento caldo, il punto laser che taglia."
colors:
  fondo: "#0b0e13"
  fondo-2: "#0f1219"
  superficie: "#151a23"
  superficie-2: "#1b212c"
  superficie-3: "#232a36"
  linea: "rgba(226, 232, 242, 0.09)"
  linea-forte: "rgba(226, 232, 242, 0.2)"
  linea-campo: "rgba(226, 232, 242, 0.42)"
  testo: "#eef0f2"
  testo-2: "#aab1bc"
  testo-3: "#8d94a0"
  blu: "#4357c2"
  blu-chiaro: "#aab7ff"
  caldo: "#ffb46e"
  caldo-vivo: "#ff8a3d"
  errore: "#ffa094"
  ok: "#a7ecc2"
  lastra: "#e7e5e0"
  lastra-ombra: "#d3d1cb"
  inchiostro: "#14171d"
  inchiostro-2: "#4a505a"
typography:
  display:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.15rem + 3.5vw, 4.6rem)"
    fontWeight: 650
    lineHeight: 0.94
    letterSpacing: "-0.012em"
    fontVariation: "'wdth' 72"
  headline:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 1.25rem + 2.9vw, 3.8rem)"
    fontWeight: 640
    lineHeight: 0.96
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 74"
  title:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.45rem, 1.2rem + 0.8vw, 2rem)"
    fontWeight: 640
    lineHeight: 1.05
    fontVariation: "'wdth' 78"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.08rem, 1rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.08em"
  data:
    fontFamily: "Martian Mono, ui-monospace, Menlo, Consolas, monospace"
    fontSize: "0.82rem"
    fontWeight: 400
    lineHeight: 1.4
    fontFeature: "'tnum'"
rounded:
  r-1: "2px"
  r-2: "4px"
  r-3: "8px"
spacing:
  gutter: "clamp(20px, 5vw, 72px)"
  sezione: "clamp(88px, 11vw, 160px)"
  max: "1280px"
  nav-h: "72px"
components:
  button-primary:
    backgroundColor: "{colors.testo}"
    textColor: "{colors.fondo}"
    rounded: "{rounded.r-2}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.fondo}"
  button-primary-large:
    backgroundColor: "{colors.testo}"
    textColor: "{colors.fondo}"
    rounded: "{rounded.r-2}"
    padding: "0 26px"
    height: "56px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.testo}"
    rounded: "{rounded.r-2}"
    padding: "0 22px"
    height: "48px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.testo}"
    rounded: "{rounded.r-2}"
    size: "44px"
  input:
    backgroundColor: "{colors.fondo}"
    textColor: "{colors.testo}"
    rounded: "{rounded.r-2}"
    padding: "14px 16px"
    height: "54px"
  chip-spunto:
    backgroundColor: "transparent"
    textColor: "{colors.testo-2}"
    rounded: "{rounded.r-1}"
    padding: "0 12px"
    height: "36px"
  lastra:
    backgroundColor: "{colors.lastra}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.r-3}"
  tavola:
    backgroundColor: "{colors.fondo-2}"
    textColor: "{colors.testo}"
    rounded: "{rounded.r-3}"
  form-panel:
    backgroundColor: "{colors.superficie}"
    textColor: "{colors.testo}"
    rounded: "{rounded.r-3}"
    padding: "clamp(24px, 3.5vw, 44px)"
---

# Design System: TO.DE.L. Automazione Industriale

<!-- Aggiornato il 9 ottobre 2026 sulla versione in uso, sito-v3/public (v4.1). Sostituisce il sistema "segnaletica di stabilimento" della v1 (cartella sito/), che è archiviato: non riprenderne colori, caratteri o componenti. Fonte normativa dei valori: i token :root in sito-v3/public/assets/css/style.css. -->

## Overview

**Creative North Star: "La Tavola Tecnica"**

Il sito si legge come una tavola di disegno tecnico appoggiata in officina: fondo grafite, testi asciutti, quote e cartigli come su un disegno meccanico. Le macchine non stanno su sfondi scuri ma su **lastre** chiare color lamiera, come in un catalogo stampato: le foto del costruttore a fondo bianco si fondono con la lastra, le foto d'ambiente restano intere.

Il colore è quasi assente. L'unico accento caldo è il **punto laser**: compare nelle linee di taglio, nelle quote, nelle frecce e negli stati attivi, mai come riempimento di superfici. Il blu del logo resta come colore d'identità e di focus. I dati tecnici sono composti in carattere monospaziato con cifre tabellari, come le letture di una macchina CNC.

Il movimento è quello di una macchina: preciso, breve, con curve decise. Le animazioni lunghe sono riservate a ciò che spiega (la simulazione del taglio, la linea che si traccia); l'interfaccia di tutti i giorni risponde in meno di 300 ms.

**Key Characteristics:**
- Fondo grafite a tre livelli di profondità, nessun gradiente decorativo
- Lastre chiare (#e7e5e0) per le macchine, con didascalia "foto Golden Laser"
- Un solo accento caldo, il laser, sotto il 10% di ogni schermata
- Titoli in Archivo stretto, dati in Martian Mono con cifre tabellari
- Cartiglio tecnico, quote e linee di taglio come linguaggio ricorrente
- Angoli quasi vivi (2–8 px), bordi sottili al posto delle ombre

## Colors

Grafite quasi neutro con una sola nota calda e un blu d'identità discreto.

### Primary
- **Punto Laser** (caldo): linee di taglio, frecce dei link, numeri di fase, cursore dei campi, stato attivo dei filtri. È il colore della luce che taglia; non riempie mai pulsanti o sfondi.
- **Laser Vivo** (caldo-vivo): solo nel punto incandescente delle animazioni di taglio.

### Secondary
- **Blu TO.DE.L.** (blu): erede del blu del logo; identità, mai riempimento di grandi superfici.
- **Blu Focus** (blu-chiaro): anello di focus da tastiera (2 px, offset 3 px) e bordo dei campi attivi.

### Neutral
- **Grafite Profonda** (fondo): sfondo della pagina e dei campi.
- **Grafite di Fascia** (fondo-2): sezioni a fascia (Applicazioni, Contatti) e tavole.
- **Superfici** (superficie, superficie-2, superficie-3): pannelli, modulo, cassetto, stati selezionati; ogni livello è un gradino di profondità.
- **Bianco Gesso** (testo): testo principale e riempimento del pulsante primario.
- **Grigio Quota** (testo-2) e **Grigio Nota** (testo-3): testo secondario, didascalie, etichette.
- **Linee** (linea, linea-forte, linea-campo): divisori, bordi di tavole e pulsanti, bordo dei campi.
- **Lastra** (lastra, lastra-ombra) con **Inchiostro** (inchiostro, inchiostro-2): solo dentro le lastre delle macchine e i segnaposto.
- **Errore** ed **Esito positivo** (errore, ok): messaggi del modulo.

### Named Rules
**The One Laser Rule.** Il caldo è la luce del laser e nient'altro: linee, frecce, piccoli indicatori. Se un'area più grande di un pulsante diventa arancione, è un errore.

**The Lamiera Rule.** Le macchine si mostrano su lastra chiara, non su fondo scuro. Il resto della pagina resta grafite: non inserire sezioni intere a tema chiaro.

## Typography

**Display Font:** Archivo variabile, larghezza 72–78% (con Arial Narrow, system-ui)
**Body Font:** Archivo variabile, larghezza normale (con system-ui)
**Label/Mono Font:** Martian Mono (con ui-monospace, Menlo, Consolas)

**Character:** un grottesco industriale compresso per i titoli, che regge numeri grandi e parole tecniche lunghe, affiancato da un monospaziato da strumento di misura per tutto ciò che è un dato.

### Hierarchy
- **Display** (650, clamp 2,5–4,6 rem, interlinea 0,94, larghezza 72%): solo il titolo della hero, massimo 12 caratteri per riga.
- **Headline** (640, clamp 2,1–3,8 rem, interlinea 0,96, larghezza 74%): titoli di sezione H2.
- **Title** (640, clamp 1,45–2 rem, interlinea 1,05, larghezza 78%): H3 di schede, tavole, fasi.
- **Lead** (400, clamp 1,08–1,25 rem, interlinea 1,5): sottotitoli di hero e sezioni, massimo 38–60 caratteri per riga.
- **Body** (400, 17 px, interlinea 1,6): paragrafi.
- **Label** (600, 12 px, spaziatura 0,08 em, maiuscolo): nomi di campo, intestazioni di tabella e di cartiglio. Solo etichette brevi.
- **Data** (Martian Mono 400, 0,72–0,82 rem, cifre tabellari): valori tecnici, telefono, quote, didascalie delle foto.

### Named Rules
**The Measured Data Rule.** Ogni valore misurabile (mm, kW, m/min, telefono, modelli) è in Martian Mono con cifre tabellari. Le parole restano in Archivo.

**The Readable Floor Rule.** Nessun testo funzionale sotto i 12 px. Le didascalie a 10,5–11,5 px oggi presenti ("Immagine illustrativa", didascalie delle lastre) sono un debito da correggere, non un modello.

## Layout

Contenitore massimo 1280 px più margini laterali fluidi (20–72 px). Sezioni separate da uno spazio verticale fluido di 88–160 px; le sezioni a fascia (Applicazioni, Contatti) cambiano solo di un gradino di grafite e hanno bordi sottili sopra e sotto.

Griglie asimmetriche a due colonne su desktop (testo a sinistra, dato o immagine a destra), che sotto i 1000 px diventano una colonna. Le famiglie di macchine sono schede a tab su desktop e blocchi impilati su mobile. Sotto i 760 px compare la barra mobile fissa con "Richiedi preventivo" e "Chiama". Navigazione fissa alta 72 px, trasparente in cima e più solida scorrendo.

## Elevation & Depth

La profondità viene dai gradini di grafite e dai bordi sottili, non dalle ombre. Le ombre esistono solo sotto elementi che galleggiano davvero (cartiglio della hero, pannello di approfondimento, modulo, menu a tendina): sono lunghe, scure e senza colore.

### Shadow Vocabulary
- **Galleggiante** (`box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.8)`): cartiglio tecnico e tavole al passaggio del mouse.
- **Pannello** (`box-shadow: 0 40px 80px -50px rgba(0, 0, 0, 0.9)`): modulo e conferma.
- **Foglio laterale** (`box-shadow: -40px 0 80px -40px rgba(0, 0, 0, 0.85)`): pannello di approfondimento.

### Named Rules
**The No Glow Rule.** Nessun alone colorato su elementi dell'interfaccia. L'unico bagliore ammesso è il punto incandescente della testa laser nelle animazioni di taglio.

## Shapes

Angoli quasi vivi: 2 px per etichette, chip e didascalie; 4 px per pulsanti, campi e cartigli; 8 px per lastre, tavole e pannelli. Niente pillole, niente cerchi tranne i punti di stato. I bordi sono linee da 1 px. Le linee di taglio sono filetti da 1 px che si "tracciano" con un punto caldo all'estremità; le quote hanno trattini terminali come nel disegno tecnico.

## Components

### Buttons
- **Shape:** angoli di 4 px; altezza 48 px (56 px nella versione grande), mai sotto i 44 px.
- **Primary:** riempimento Bianco Gesso con testo Grafite Profonda: "Richiedi preventivo" è sempre questo pulsante. Freccia a destra nella versione grande.
- **Hover / Focus:** con mouse il fondo passa a bianco puro e la freccia avanza di 3 px; alla pressione scala 0,97 in 160 ms. Focus da tastiera con anello Blu Focus.
- **Secondary:** trasparente con bordo linea-forte ("Parliamone", "Mostra la mappa", "Chiama").
- **Link con freccia:** testo in grassetto con freccia Punto Laser ("Scheda tecnica", "Approfondisci").

### Chips
- **Style:** filtri materiale e suggerimenti del modulo; trasparenti, bordo linea-forte, angoli 2 px, testo Grigio Quota, simbolo "+" in Punto Laser.
- **State:** selezionato con fondo superficie-2, bordo caldo tenue, simbolo "✓"; i filtri materiale usano `role="radio"`, i suggerimenti `aria-pressed`.

### Cards / Containers
- **Lastra:** fondo lastra con leggero radiale, angoli 8 px, foto in `multiply`, quota tecnica sotto la foto, didascalia in Martian Mono con la fonte della foto, varianti come piccoli pulsanti con miniatura.
- **Tavola:** fondo-2, bordo linea, angoli 8 px, foto 3:2 in alto con etichetta "Immagine illustrativa" se stock; con mouse si alza di 4 px.
- **Cartiglio tecnico:** griglia di 3 colonne di dati (2 su mobile) con etichette maiuscole e valori monospaziati, fondo semitrasparente sfocato, link finale a tutta larghezza.
- **Distinta:** i numeri aziendali in griglia di 3 colonne separate da filetti, prefisso piccolo ("oltre", "almeno", "quasi") in Martian Mono e numero grande in Archivo stretto. Nessun contatore animato.

### Inputs / Fields
- **Style:** fondo Grafite Profonda, bordo linea-campo, angoli 4 px, altezza 54 px, testo a 16 px (evita lo zoom su iPhone), cursore Punto Laser.
- **Focus:** bordo Blu Focus con anello tenue di 3 px.
- **Error:** bordo e messaggio in colore errore, `aria-invalid`, focus sul primo campo errato.

### Navigation
- **Desktop:** logo bianco a sinistra, voci in Archivo 500 (Grigio Quota, Bianco Gesso al passaggio), tendina "Macchine" raggruppata per Golden Laser / tecnologie complementari / servizi, telefono in Martian Mono, pulsante primario.
- **Mobile:** pulsante menu che apre un cassetto laterale con curva iOS (420 ms), macchine in alto e pulsanti pieni in basso.

### Simulazione del taglio (signature)
Vista dall'alto in SVG, stile CAM: lamiera grafite, percorsi tratteggiati per gli spostamenti a vuoto, testa con punto incandescente, lettura X/Y monospaziata. Usata nella hero (prima visita), nella sezione a scorrimento e negli schemi dei pannelli. Dichiara sempre "Simulazione illustrativa".

## Do's and Don'ts

### Do:
- **Do** usare curve decise: `cubic-bezier(0.23, 1, 0.32, 1)` per entrate e risposte, `cubic-bezier(0.77, 0, 0.175, 1)` per movimenti in scena, `cubic-bezier(0.32, 0.72, 0, 1)` per cassetto e pannello.
- **Do** tenere le risposte dell'interfaccia sotto i 300 ms (pressione 160 ms, hover 200 ms, tendina 200 ms).
- **Do** limitare gli effetti di passaggio del mouse a `(hover: hover) and (pointer: fine)` e rispettare `prefers-reduced-motion`.
- **Do** indicare sempre la provenienza delle immagini: "foto Golden Laser" sulle foto del costruttore, "Immagine illustrativa" sullo stock.
- **Do** mostrare i dati tecnici in cartigli, tabelle e quote, con la fonte quando provengono dal costruttore.

### Don't:
- **Don't** riprendere il sistema della v1 ("segnaletica di stabilimento": fondo cemento chiaro, pannelli blu pieni, Barlow Condensed, numeri a stencil, verde sicurezza). È archiviato in `sito/`.
- **Don't** usare il caldo come riempimento di pulsanti o sezioni, né aloni colorati sull'interfaccia.
- **Don't** aggiungere gradienti decorativi, contatori animati, dashboard simulate o linguaggio da SaaS.
- **Don't** presentare foto Golden Laser o stock come installazioni TO.DE.L., né usare immagini di macchine generate con AI.
- **Don't** pubblicare segnaposto visibili ("Foto da inserire"): in produzione si sostituiscono o si nascondono.
- **Don't** scendere sotto i 12 px per testo funzionale né sotto i 44 px per aree cliccabili.
