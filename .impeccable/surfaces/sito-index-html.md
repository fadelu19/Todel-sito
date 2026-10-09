---
version: 2
slug: "sito-index-html"
primary_target: "sito-v3/public/index.html"
related_targets: ["sito-v3/public/assets/css/style.css", "sito-v3/public/assets/js/main.js", "sito-v3/public/assets/js/taglio.js"]
---

## Scope
Homepage one-page `sito-v3/public/index.html` (v4.1) — sito aziendale TO.DE.L. Automazione Industriale S.r.l., con 7 approfondimenti in un pannello laterale. Visitor mode: Persuade.

Le cartelle `sito/` (v1) e `sito-v2/` sono archiviate: non sono target di nessun lavoro.

## Audience and job
Titolari e responsabili di produzione di PMI manifatturiere (carpenteria metallica, meccanica, agroalimentare, edilizia), Campania e Sud Italia, che valutano l'acquisto di un macchinario costoso; clienti esistenti che cercano assistenza, ricambi e consumabili.

## Action
Primaria: richiesta di preventivo, precompilata con il macchinario scelto. Secondarie: chiamare, chiedere assistenza (percorso dedicato da costruire).

## Proof / content
Numeri confermati (oltre 30 anni nel settore, oltre 100 macchinari, almeno 40 plasma, oltre 20 laser, quasi 10 anni nel laser), rivenditore ufficiale Golden Laser, 5 clienti citabili, dati tecnici ufficiali Golden Laser con fonte. Mancano foto reali di persone, sede e installazioni: oggi foto Golden Laser (dichiarate) e stock ("Immagine illustrativa").

## Constraints
HTML/CSS/JS statico, font self-hosted, italiano, WCAG 2.2 AA. Modulo verso Cloudflare Pages Function (`functions/api/richiesta.js`), ancora da configurare. Nessun segnaposto visibile in produzione.

## Direction contract
THESIS: la homepage è una tavola tecnica: fondo grafite, macchine su lastre chiare da catalogo, dati in cartigli e quote, un solo accento caldo, il punto laser che taglia. Sostituisce la direzione "segnaletica di stabilimento" della v1.
OWN-WORLD: vedi DESIGN.md ("La Tavola Tecnica"). Archivo stretto per i titoli, Martian Mono per i dati, angoli 2–8 px, bordi da 1 px, nessun gradiente decorativo, nessun alone.
STORY: in cinque secondi il titolare capisce cosa vende TO.DE.L. e da dove; vede numeri e persone reali; crede che un solo referente lo seguirà anche dopo l'acquisto; chiede un preventivo o chiama.
FIRST VIEWPORT: navigazione con telefono e "Richiedi preventivo"; H1 "Taglio laser, plasma e automazione per la lamiera."; sottotitolo; CTA primaria e "Guarda le macchine"; telefono; foto di una macchina Golden Laser con cartiglio tecnico. Da aggiungere: riga di prove e "un solo referente".
SIGNATURE: simulazione vettoriale del taglio (hero alla prima visita, sezione a scorrimento, schemi nei pannelli) e linee di taglio che si tracciano.

## Unresolved
Dominio ed email aziendale; recapito del modulo; foto di referenti, sede e installazioni; kit immagini Golden Laser; soglia di spessore da comunicare (30 mm o fino a 60 mm con 20 kW); linee trattate di Gilardi, DAMI, Di Donato; REA e capitale sociale; percorso Assistenza.
