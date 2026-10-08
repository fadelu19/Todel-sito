# Brief 1/3 — Strategia, struttura, contenuti, tono di voce, SEO

Ricevuto l'8 ottobre 2026. Testo del titolare, riportato così com'è. Prevale su tutto il resto (vedi "priorità" sotto).
Prompt 2/3 (design, interazioni, laser interattivo, animazioni) e 3/3 (conversione, sviluppo, mobile, performance, QA) da ricevere.

## Skill da applicare automaticamente

- Emil Kowalski: emil-design-eng (feedback pulsanti, entrate, easing custom, checklist), animate (curva 0.23, 1, 0.32, 1; durate corrette), apple-design (manipolazione diretta, molle per gesti, backdrop blur), mobile-native (44 px, niente flash grigio, safe area).
- Impeccable: niente AI slop (gradienti a caso, ombre eccessive, font generici); tipografia system-ui o Inter con tracking per dimensione; NON rimuovere le animazioni, solo quelle inutili.
- Taste Skill: stile "tech" o "industrial"; movimento 6-7/10; entrate scale + fade, stagger 50-80 ms; scroll reveal CSS con IntersectionObserver.
- Landing Page AI: struttura orientata alla conversione, CTA strategiche, form con pochi campi e validazione chiara.

Priorità in caso di conflitto: 1) brief, 2) Emil Kowalski, 3) Impeccable + Taste, 4) Landing Page AI.

---

# MASTER PROMPT 1/3 — TO.DE.L. AUTOMAZIONE INDUSTRIALE
## Strategia, Struttura e Contenuti

Agisci come: Brand Strategist + Information Architect + Conversion Designer + Senior UX/UI Designer, con esperienza specifica nella progettazione di siti web B2B industriali ad alto valore.

Devi riprogettare e sviluppare completamente il sito web di TO.DE.L. Automazione Industriale S.r.l.

Non devi limitarti a creare un sito esteticamente bello.
L'obiettivo è realizzare un sito: premium + industriale + tecnologico + credibile + interattivo + veloce + orientato alla conversione.

Il sito deve distinguersi nettamente dai tradizionali siti web italiani di aziende che vendono macchinari industriali.
Deve far percepire immediatamente: competenza tecnica, esperienza, tecnologia, affidabilità e capacità di seguire il cliente nel tempo.

La componente visiva deve essere molto curata, ma ogni scelta grafica deve avere una funzione commerciale o informativa.

## 1. DATI REALI DELL'AZIENDA

Utilizza esclusivamente i dati disponibili e verificati.

- Azienda: TO.DE.L. Automazione Industriale S.r.l.
- Denominazione precedente: Automazione Macchine Utensili S.r.l.
- Sede: Via Belvedere 47H, 84091 Battipaglia (SA)
- Telefono: 328 824 1909
- Email: todelsrl@gmail.com
- P.IVA: 05573670659

Attività: TO.DE.L. vende, installa e assiste macchinari e tecnologie per la lavorazione della lamiera e l'automazione industriale.

Offerta: taglio laser fibra; saldatura laser; pulizia laser; pressopiegatrici; cesoie; banchi taglio plasma; robot; retrofit CNC; macchinari usati; consulenza/supporto finanziario per l'acquisto dei macchinari.

Marchi: Golden Laser (rivenditore ufficiale); Gilardi; DAMI Engineering; Di Donato & Partners.

Settori: carpenteria metallica; lavorazioni meccaniche; agroalimentare; edilizia.

Dati aziendali da valorizzare:
- Oltre 30 anni di esperienza
- Quasi 10 anni di esperienza nel settore laser
- Oltre 20 sistemi/macchinari laser venduti
- Almeno 40 sistemi/macchinari plasma venduti
- Oltre 100 macchinari venduti complessivamente

Questi dati devono essere utilizzati come elementi di autorevolezza e social proof.
Non trasformare questi numeri in claim più grandi di quanto effettivamente dichiarato.

## 2. POSIZIONAMENTO

Il sito deve posizionare TO.DE.L. non come semplice rivenditore, ma come:
partner tecnico per la scelta, fornitura, installazione e assistenza di macchinari e tecnologie per la lavorazione della lamiera e l'automazione industriale.

Il concetto distintivo è: un unico interlocutore che segue il cliente prima, durante e dopo l'acquisto.

Non usare slogan vaghi come "leader del settore", "eccellenza assoluta", "innovazione senza limiti", "tecnologie rivoluzionarie", a meno che siano supportati da dati concreti.

Il linguaggio deve essere: tecnico + autorevole + concreto + comprensibile + commerciale.

## TONO DI VOCE

Scrivi come un tecnico commerciale esperto che parla a un imprenditore del settore.

- Frasi brevi (max 20-25 parole)
- Usa "voi" (rivolto all'azienda cliente)
- Dati concreti al posto di aggettivi ("30 mm" invece di "elevata capacità")
- Evita superlativi non supportati ("eccellente", "innovativo", "all'avanguardia")
- Usa verbi attivi ("installiamo", "assistiamo") non passivi ("viene installato")

Esempi:
- Sì: "Taglio fino a 60 mm di acciaio al carbonio"
- No: "Soluzioni di taglio all'avanguardia per le vostre esigenze"
- Sì: "Assistenza diretta con tecnici propri"
- No: "Partner affidabile per il vostro successo"

## 3. OBIETTIVO COMMERCIALE DEL SITO

Generare richieste di preventivo e contatti commerciali qualificati.

Target: titolari di PMI; imprenditori; responsabili di produzione; responsabili tecnici; aziende manifatturiere; carpenterie metalliche; aziende che lavorano lamiera; aziende interessate ad automazione e retrofit.

Percorso: vedo → capisco → mi interessa → mi fido → approfondisco → contatto TO.DE.L.

Il sito deve ridurre al minimo la distanza tra interesse e contatto.

## 4. ARCHITETTURA DEL SITO

One-page iniziale, con pagina separata Privacy/Cookie.

1. Navbar
2. Hero
3. Trust / Social proof
4. Perché TO.DE.L.
5. Soluzioni / Macchine
6. Esperienza / numeri
7. Settori
8. Processo di lavoro
9. Tecnologia / contenuti visuali
10. Finanziamento / investimento
11. Marchi
12. Contatto / preventivo
13. Footer

Struttura modulare: deve poter evolvere in multipagina senza essere ricostruita da zero.

## 5. NAVBAR

Navbar fissa.

Desktop: logo; Macchine (dropdown); Settori; Perché TO.DE.L.; Azienda / Esperienza; Contatti; telefono; CTA primaria "Richiedi preventivo".

Comportamento allo scroll: inizialmente leggermente trasparente; progressivamente più solida; blur controllato; separazione visiva sottile.

Dropdown "Macchine": Taglio laser fibra; Piegatura e cesoie; Taglio plasma; Saldatura e pulizia laser; Automazione e cobot; Retrofit CNC; Macchinari usati.

Mobile: hamburger; drawer laterale; animazione fluida; chiusura con swipe quando supportato; CTA sempre facilmente raggiungibile.

## 6. HERO

Completamente ripensata. Non usare "Macchine per la lamiera. Un solo referente." (troppo generico).

Deve chiarire subito: cosa offre TO.DE.L. + settore + tecnologia + valore + credibilità.

Possibile direzione:
- Headline: Taglio laser, plasma e automazione per la lavorazione della lamiera.
- Supporting message: Tecnologie industriali, installazione e assistenza con un unico referente.
- Autorevolezza subito visibile: Oltre 30 anni di esperienza · oltre 100 macchinari venduti · rivenditore ufficiale Golden Laser (proof, non decorazione).
- CTA primaria: Richiedi preventivo
- CTA secondaria: Scopri le macchine

## 15. PERCHÉ TO.DE.L.

Molto più in alto rispetto alla struttura precedente.

Possibile headline: Tecnologia industriale. Esperienza. Assistenza.

- 01 — Oltre 30 anni di esperienza. Una lunga esperienza nel settore delle macchine e dell'automazione industriale.
- 02 — Oltre 100 macchinari venduti. Dimostrazione concreta dell'esperienza commerciale dell'azienda.
- 03 — Esperienza nel laser da quasi 10 anni. Specifico elemento di competenza.
- 04 — Un solo referente. Dalla scelta del macchinario all'installazione e all'assistenza.
- 05 — Tecnici propri. Elemento distintivo già confermato.
- 06 — Rivenditore ufficiale Golden Laser. Usare il dato con precisione, nessun claim non verificato.

## 16. NUMERI E SOCIAL PROOF

Sezione visiva molto forte sui numeri reali:
- 30+ anni di esperienza
- 100+ macchinari venduti
- 40+ impianti plasma venduti
- 20+ sistemi laser venduti
- ~10 anni di esperienza nel laser

Elegante e minimale. Niente counter che partono da zero se riducono la credibilità; ammesso un reveal numerico molto discreto.

## 17. PROCESSO DI LAVORO

"Come lavoriamo"
- 01 — Analizziamo l'esigenza. Comprendere lavorazione, materiali e necessità produttive.
- 02 — Individuiamo la soluzione. Macchinario e configurazione coerenti con il reale utilizzo.
- 03 — Fornitura e installazione. TO.DE.L. accompagna il cliente nell'implementazione.
- 04 — Assistenza. Il rapporto continua dopo la vendita.

Deve far capire che TO.DE.L. non è soltanto un intermediario commerciale.

## 18. FINANZIAMENTO E INVESTIMENTO

Valorizzare la consulenza/supporto finanziario per l'acquisto.

Headline possibile: Un investimento industriale va valutato anche dal punto di vista finanziario.

Descrizione prudente. Non promettere automaticamente incentivi, contributi, agevolazioni, percentuali di risparmio.

Sezione espandibile per inserire in seguito: strumenti finanziari; incentivi; leasing; agevolazioni; guide; documentazione. Aggiornabile rapidamente.

## 27. SEO

Ricerche pertinenti, per esempio: taglio laser fibra Campania; macchine taglio laser lamiera; macchine lavorazione lamiera; taglio plasma CNC; pressopiegatrici; saldatura laser; pulizia laser; retrofit CNC; automazione industriale; macchinari industriali usati; macchine per carpenteria metallica.

Ottimizzare: title; meta description; H1/H2/H3; URL; alt; schema markup; sitemap; robots; canonical; Open Graph. Nessuna keyword stuffing.

## 28. SEO LOCALE

Valorizzare la sede di Battipaglia (SA) e il territorio effettivamente servito.
Structured data per organizzazione/attività locale, solo dati reali. Non inventare recensioni o rating.
Predisporre il collegamento a: Google Business Profile; indicazioni stradali; contatti; posizione; informazioni aziendali.

## 30. DESIGN SYSTEM

Direzione artistica: Industrial Premium + Precision Engineering + Advanced Manufacturing.
Deve sembrare del settore macchine industriali / lavorazione metallo / automazione / engineering.
Non deve sembrare: SaaS; crypto; gaming; cyberpunk; agenzia creativa; landing page AI; e-commerce.
Carattere, ma credibile per un imprenditore che deve fare un investimento industriale.

## CONTROLLO QUALITÀ PARZIALE 1/3

1. Chiarezza: un visitatore capisce entro pochi secondi cosa vende TO.DE.L.?
2. Posizionamento: capisce perché TO.DE.L. è diversa da un semplice rivenditore?
3. Autorevolezza: vede rapidamente esperienza, numeri, Golden Laser, assistenza, tecnici propri?
4. Tono di voce: testi tecnici, concreti, senza claim vuoti?

Nota: la numerazione salta le sezioni 7–14, 19–26 e 29. Non mancano: il brief è definitivo così (confermato dal titolare).

---

## Correzioni confermate dal titolare (8 ottobre 2026)

- Clienti citabili: per ora solo CERBONE. Gli altri arriveranno; non inventarne.
- Clienti confermati (aggiornamento dell'8 ottobre, per "Hanno scelto TO.DE.L."): Cerbone; 3G Metal (carpenteria metallica); MGR (lavorazioni meccaniche); General Service (manutenzione industriale); Car Segnaletica (lavorazioni e segnaletica). Loghi: da chiedere.
- Esperienza: scrivere "oltre 30 anni nel settore", mai "TO.DE.L. da 30 anni".
- Laser: i laser venduti sono configurazioni e modelli diversi. Si possono usare i dati del sito ufficiale Golden Laser (modelli, potenze, aree di lavoro, spessori), ma solo per i modelli trattati da TO.DE.L. e senza generalizzarli a tutti i laser. Capacità: fino a 30 mm, in funzione di modello, potenza e materiale. Ricerca in `golden-laser-modelli.md`.
- Foto: le foto reali delle installazioni arriveranno dopo. Intanto si possono usare immagini ufficiali Golden Laser coerenti con i modelli, mai presentate come installazioni TO.DE.L. Vanno sostituibili senza toccare la struttura.
- SEO: non aspettare dominio e Google Business Profile. Predisporre tutta l'architettura SEO tecnica e locale con segnaposto per dominio e link GBP.

## Gamma trattata (dichiarata dal titolare, 8 ottobre 2026)

TO.DE.L. vende tutta la gamma Golden Laser disponibile per l'Italia:
- Lamiera: U3 (3, 6, 8, 10, 12, 15, 20, 30 kW); E3 (1,5, 3, 6 kW); GF grande formato (4, 6, 8, 10 kW); serie M alta potenza (20, 25, 30 kW).
- Tubo + lamiera: E3t Plus (1,5, 3, 4 kW); GF-1530JHT (1, 2, 3, 4 kW).
- Solo tubo: L12MAX, L16MAX, L20MAX, I20A, Mega4 (varie potenze).
- Saldatrici portatili 3 in 1: W15 1,5 kW; W20 2 kW (= SUP20T importata da TO.DE.L.); W30 3 kW.
- Pulitrici laser: serie Clean (varie potenze).
- Dati Golden Laser: usare solo le tabelle tecniche, mai i testi descrittivi; nei casi dubbi il valore più basso.
- Foto: il titolare chiede a Golden Laser il kit immagini per rivenditori (1–2 giorni). Intanto segnaposto o stock con "Immagine illustrativa".
- Spessori da pubblicare: la formula proposta dal titolare (inox 25 mm e alluminio 25 mm con 6–8 kW) supera la tabella ufficiale U3. Valori da tabella a 8 kW: carbonio 30, inox 20, alluminio 18, ottone 18 mm. In attesa di conferma si usano questi.
