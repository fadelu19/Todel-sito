# Brief 2/3 — Design, interazioni e specifiche tecniche

Ricevuto l'8 ottobre 2026. Testo del titolare, riportato così com'è (solo la formattazione degli elenchi è stata ripristinata).
Vincoli: non ripetere strategia e contenuti (Prompt 1); non sviluppare codice (arriva col Prompt 3); non cambiare direzione artistica.

## 7. HERO VISUALE — LASER INTERATTIVO

Caratteristica distintiva del sito. NON utilizzare semplicemente una fotografia statica del laser.
La parte visuale della Hero deve rappresentare una macchina laser in fase di lavorazione.

Il visitatore deve poter vedere: macchina; testa laser; lamiera; movimento della testa; punto di lavorazione; percorso di taglio; geometria che viene progressivamente realizzata.

Effetto realistico. Non deve sembrare: un gioco; un'interfaccia sci-fi; un laser futuristico; un'animazione astratta.
Deve sembrare un vero processo industriale. Messaggio visivo: "Questa macchina sta realmente lavorando il metallo."

## 8. VIDEO DI RIFERIMENTO E COMPORTAMENTO DEL TAGLIO

Il video allegato dall'utente è il riferimento per il comportamento dell'animazione: una macchina di taglio la cui testa percorre una traiettoria sulla lamiera e realizza progressivamente una geometria.
Usarlo come riferimento per: velocità; traiettoria; relazione testa/lamiera; movimento progressivo; punto di lavorazione; percezione del taglio.
NON copiare il video. NON riutilizzarlo automaticamente come contenuto del sito. Serve a definire il tipo di movimento industriale realistico.

(Nota 8 ottobre: il video non è stato ancora allegato.)

## 9. ANIMAZIONE DEL PROCESSO DI TAGLIO

- 01 — Posizionamento: la testa laser si porta sul punto iniziale.
- 02 — Avvio: il punto di lavorazione si attiva.
- 03 — Percorso: la testa segue una traiettoria precisa.
- 04 — Taglio: il percorso viene tracciato progressivamente.
- 05 — Completamento: la geometria viene completata.
- 06 — Risultato: il pezzo finito rimane visivamente evidente.

Movimento fluido e tecnicamente credibile. Niente raggi laser giganteschi o effetti spettacolari non realistici.

## SPECIFICA TECNICA — ANIMAZIONE LASER

Tecnologia: video WebM + MP4 fallback (scelta per performance/realismo).
- Durata: 8-12 secondi, loop
- Peso: max 3 MB (WebM), 5 MB (MP4 fallback)
- Risoluzione: 1920×1080, bitrate 2-3 Mbps
- Poster: immagine JPG/WebP 50 KB (caricamento immediato)
- Autoplay: sì, muted, loop
- IntersectionObserver: pausa quando non in viewport

Fallback:
- Video non supportato: immagine statica
- Connessione lenta (< 3G): solo poster
- Reduced motion: solo immagine statica

Interazione desktop:
- Hover sulla card: video accelera a 1.5x o mostra preview del taglio
- Click: apre modal con video full-screen + informazioni tecniche

Mobile: video semplificato (solo loop, niente hover); peso ridotto (max 1.5 MB).

## 10. INTERAZIONE CON L'UTENTE

Immagini e card delle macchine interattive.
- Stato normale: immagine + titolo + descrizione.
- Hover desktop: micro-zoom; leggero movimento; reveal di informazioni; eventuale preview del processo; CTA.
- Click: approfondimento tramite pagina, modal, drawer o sezione dinamica, in funzione della piattaforma.

L'utente deve poter vedere: macchina; processo; materiali; applicazioni; informazioni tecniche verificate; video/animazione; CTA.

## 11. SOLUZIONI / MACCHINE

Non sette card identiche: costruire una gerarchia.
- Soluzione principale: Taglio laser fibra, con forte presenza visuale. Messaggio: soluzioni di taglio fino a 30 mm, in funzione di macchina, potenza, materiale e configurazione. Non usare 30 mm come capacità universale di ogni laser.
- Altre soluzioni: Piegatura e cesoie; Taglio plasma; Saldatura e pulizia laser; Automazione e cobot; Retrofit CNC; Macchinari usati.

L'utente deve capire subito la differenza tra: macchine principali + tecnologie complementari + servizi/interventi + usato.

## 12. PAGINE O APPROFONDIMENTI DELLE MACCHINE

Ogni tecnologia importante deve poter avere un approfondimento con: introduzione; immagini; video; animazione; applicazioni; materiali; dati tecnici; vantaggi; marchio; CTA.
NON inventare specifiche tecniche. Dati non disponibili: struttura predisposta, dato aggiornabile.

## 13. MATERIALI

NON mantenere una sezione autonoma "Materiali". Integrare i materiali nelle singole tecnologie (es. taglio laser: acciaio al carbonio, acciaio inox, alluminio, ottone e rame).

## 14. SETTORI

Titolo: "Soluzioni per diversi processi industriali."
I quattro settori: carpenteria metallica; lavorazioni meccaniche; agroalimentare; edilizia.
Ogni card spiega quale esigenza del settore si affronta con le tecnologie TO.DE.L. Non aggiungere settori.

## 19. VIDEO E CONTENUTI REALI

Sezione visuale per video reali. Priorità: 1) laser in funzione; 2) plasma in funzione; 3) installazioni; 4) assistenza; 5) lavorazioni; 6) macchine presso clienti, quando autorizzato.
Principio: show, don't tell. I video TO.DE.L. sostituiscono progressivamente gli elementi illustrativi.

## IMMAGINI E VIDEO

Priorità: 1) video reali di macchine TO.DE.L. in funzione (10-30 s); 2) foto reali di installazioni presso clienti (con autorizzazione); 3) stock SOLO se necessarie e segnalate come "immagine illustrativa".
- Video: WebM + MP4 fallback, max 5 MB, loop, autoplay muted
- Immagini: WebP + JPG fallback, lazy loading, srcset
- Poster per ogni video
Struttura predisposta per la sostituzione facile.

## 20. INTERAZIONE DELLE ALTRE MACCHINE

- Plasma: la testa segue una traiettoria di taglio sulla lamiera.
- Piegatura: la lamiera assume progressivamente la geometria finale.
- Saldatura laser: movimento controllato lungo il giunto.
- Pulizia laser: passaggio della testa e pulizia progressiva della superficie.
- Robotica / cobot: movimento ripetitivo realistico.
- Retrofit CNC: concetto di aggiornamento della macchina.
Ogni animazione deve spiegare la tecnologia, non esistere solo per estetica.

## 21. INTERAZIONE AVANZATA / SCROLL STORYTELLING

Per la sezione principale del laser, valutare un'esperienza guidata dallo scroll: la macchina resta focalizzata, la testa compie il percorso, il taglio si completa, le informazioni compaiono progressivamente (Precisione → Movimento → Lavorazione → Risultato).
Fluido e controllabile; non deve bloccare o rendere fastidioso lo scroll.

## 22. TECNOLOGIE DA VALUTARE

Video MP4/WebM; SVG; Canvas; Lottie; Rive; GSAP; ScrollTrigger; CSS; WebGL.
NON usare automaticamente WebGL. Scegliere il miglior rapporto realismo + qualità + performance + compatibilità + manutenzione.
Se un video reale è migliore di una simulazione 3D, usare il video. Se un SVG ottiene lo stesso risultato con molto meno peso, usare SVG.

## 31. COLORE, TYPOGRAPHY, FORME E IMMAGINI

- Palette: blu profondo coerente col brand. Direzione principale #131b40 con superfici derivate. Evitare il nero assoluto dominante.
- Testo: bianco/chiaro principale; tonalità più chiare per il secondario; blu del brand per elementi identitari e CTA dove appropriato.
- Typography: Inter Variable o equivalente professionale.
- Forme: card 16 px; campi 12 px; pulsanti pill; griglia rigorosa; ampi spazi; contenitore max ~1240 px.
- Immagini: laser, plasma, lamiera, robot, pressopiegatrici, saldatura, dettagli meccanici. Evitare stock generici di "fabbrica".

## CONTROLLO QUALITÀ PARZIALE 2/3

1. Tecnologia: il laser interattivo è realistico e tecnicamente credibile?
2. Interattività: le card delle macchine rispondono in modo significativo?
3. Performance: animazioni ottimizzate (pesi, fallback, lazy loading)?
4. Estetica: Industrial Premium, non SaaS/crypto/gaming?

---

## Proposta tecnica di Claude (8 ottobre 2026, da confermare)

### Laser: due livelli, ognuno con lo strumento giusto
1. Hero = video reale (come da specifica). Fonte: video ufficiali Golden Laser dal kit rivenditori, poi video TO.DE.L. Didascalia con modello e fonte, mai "installazione TO.DE.L." se non lo è.
   Codifica: WebM (VP9) 1920×1080 ~2,5 Mbps ≤ 3 MB; MP4 H.264 ≤ 5 MB; versione mobile 1280×720 ≤ 1,5 MB via `<source media>`; poster WebP ≤ 50 KB come LCP.
   Fino all'arrivo del video: la simulazione vettoriale (punto 2) occupa lo stesso riquadro, stesso formato, sostituibile senza toccare il layout.
2. Sezione laser con scroll storytelling = simulazione vettoriale SVG, vista dall'alto come sullo schermo del CNC: portale che scorre in Y, carrello e testa in X sul portale, lamiera, percorso con attacco (lead-in), sfondamento (piercing), fori interni tagliati prima del contorno esterno (pratica CAM reale), solco che si traccia progressivamente, punto luminoso piccolo con poche scintille, pezzo che si stacca alla fine con quote. Peso stimato 20-40 KB. Il video non si presta allo scrubbing con lo scroll (file pesanti, scatti su iOS).
   Fasi legate allo scroll: Precisione → Movimento → Lavorazione → Risultato. Sezione sticky breve, scroll mai bloccato, CSS scroll-driven animations dove supportate con fallback JS leggero (rAF + IntersectionObserver). Niente GSAP salvo necessità.
   Il video di riferimento allegato dal titolare serve a tarare velocità di taglio vs spostamento rapido, accelerazioni del portale, comportamento al piercing.

### Altre tecnologie: stesso linguaggio grafico
Disegni tecnici al tratto (SVG, 5-15 KB l'uno), stessa linea, stesso colore, ognuno spiega il processo:
plasma (torcia, solco più largo, lamiera spessa); piegatura (sezione punzone/matrice, la lamiera si piega all'angolo); saldatura (cordone che avanza sul giunto, testa che oscilla); pulizia (strato ossidato che sparisce al passaggio); cobot (ciclo pick-and-place); retrofit (vecchio controllo → nuovo CNC, confronto prima/dopo).
Stato normale: fotogramma finale statico. Hover desktop: l'animazione parte (preview del processo) + reveal dati + CTA. Mobile: parte una volta quando la card entra nello schermo. Reduced motion: solo fotogramma finale.

### Card e approfondimenti
- Gerarchia: Taglio laser fibra card grande con video/simulazione; complementari (piegatura e cesoie, plasma, saldatura e pulizia, automazione e cobot) card medie; servizi (retrofit CNC) e usato (macchinari usati) fasce più basse e distinte.
- Click: pannello di approfondimento. Desktop: pannello laterale ampio o modal; mobile: foglio dal basso a tutta altezza con trascinamento per chiudere (riuso del codice molla del cassetto). URL con hash (#taglio-laser-fibra) e tasto indietro che chiude.
- Ogni approfondimento è un blocco HTML autonomo con: introduzione, media, processo, materiali, applicazioni, dati tecnici (tabella con "dato da inserire" dove manca), vantaggi, marchio, CTA che precompila il modulo. Lo stesso blocco diventa una pagina dedicata nella fase multipagina.

### Video reali (sezione 19)
Struttura pronta con slot video + poster, ma visibile solo con almeno 2 video reali: una sezione di segnaposto "video in arrivo" su un sito pubblico toglie credibilità.

### Colore e forma
- Fondo #131b40, superfici #1a2350 / #202b5c / #28346a, linee azzurrate trasparenti.
- CTA primaria: pillola bianca con testo blu (#1b2457). Il blu del brand (#5468c9) su #131b40 ha contrasto 3,3:1: passa il minimo WCAG per elementi grafici ma il pulsante sparisce. Blu del brand per dettagli identitari, stati attivi, link (#b9c3ff per i testi).
- Elementi industriali per non sembrare SaaS: numeri tabellari, etichette tecniche (01 — Posizionamento), linee sottili da tavola tecnica, quote sui disegni, foto e video reali. Niente gradienti decorativi, niente glow.
- Unico colore caldo: le scintille nei media reali.

### Decisioni confermate dal titolare (8 ottobre 2026)
- Hover sulle card: nessuna accelerazione del video. Compaiono i dati tecnici della macchina (modello, potenza, spessori lavorabili).
- Connessione: priorità al poster statico leggero (50 KB), video caricato in modo asincrono e differito.
- Sezione video reali: predisposta e nascosta finché non ci sono 2 filmati ufficiali ad alta risoluzione.
- Confermati: simulazione SVG vettoriale vista dall'alto, stile CNC/CAM, per la sezione a scorrimento; gerarchia a 3 livelli delle schede macchine.
- Hero: video/poster ufficiale Golden Laser ad alta risoluzione dal kit rivenditore.

### Video di riferimento (allegato l'8 ottobre 2026)
File: WhatsApp_Video_2026-10-03_at_18.16.43.mp4, 17 s, 478 × 850 verticale, girato a mano con zoom.
Contenuto: taglio plasma su lamiera sottile in officina (banco compatto, torcia su carrello Z a sbalzo, piano a griglia). Uso esclusivo: calibrare cinematica, accelerazioni, attacchi, sfondamento, continuità della traiettoria della simulazione SVG. Non va sul sito.
Il filmato è girato a mano e con zoom: le velocità non si possono misurare in modo affidabile, si ricavano solo i comportamenti.

Osservazioni da riprodurre:
1. Il pezzo è fatto di più contorni separati. Ogni contorno ha il suo sfondamento; tra un contorno e l'altro l'arco si spegne e la testa si sposta a vuoto, più veloce, con accelerazione e frenata.
2. Sfondamento: lampo iniziale e getto di scintille che si allarga sulla superficie (il metallo fuso esce verso l'alto finché il foro non passa). Poi le scintille cambiano: escono sotto la lamiera e restano come una scia dietro la testa, opposta alla direzione di avanzamento, a ventaglio stretto.
3. Il punto di lavorazione è piccolo e molto luminoso (nucleo bianco, alone caldo) proprio sotto l'ugello. Nessun raggio visibile sopra la lamiera. Per il laser fibra vale ancora di più: il fascio è infrarosso e invisibile, si vede solo il punto di taglio.
4. L'ugello resta a pochi millimetri dalla lamiera; l'asse Z quasi non si muove durante il taglio.
5. Avanzamento costante e continuo sulle curve; rallenta sugli spigoli vivi (tratti a zig-zag) e riparte.
6. Il solco è una linea scura (taglio passante) con bordi leggermente più chiari/colorati dal calore.
7. Il punto di sfondamento lascia un piccolo foro tondo un po' più largo del solco all'inizio del contorno.

Parametri di partenza per la simulazione (da tarare a vista, tempi compressi rispetto al reale ma proporzioni realistiche):
- spostamento a vuoto 3-4 volte più veloce del taglio, rampa di accelerazione/frenata 0,15-0,25 s;
- pausa di sfondamento 0,3-0,5 s con getto di scintille, poi scia stretta dietro la testa;
- rallentamento sugli spigoli vivi;
- prima i fori interni, poi il contorno esterno; alla fine il pezzo si stacca.

### Punti critici sulla specifica
- Accelerare il video a 1,5x all'hover rende il taglio meno realistico (velocità non reale). Alternativa: all'hover compaiono i dati del modello in uso.
- "Connessione < 3G → solo poster": rilevabile solo su Chrome/Edge/Android (Network Information API), non su Safari/iPhone né Firefox. Si usa anche Save-Data e il caricamento del video dopo il poster.
