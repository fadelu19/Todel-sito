# PROJECT_BRIEF — TO.DE.L. Automazione Industriale S.r.l.

Scheda unica del Website Factory (playbook v1.6.1, `04_CLIENT_INTAKE_TEMPLATE.md`), compilata il 12 ottobre 2026 **solo** con dati già presenti nel repository.
Non sostituisce i documenti di progetto: le formule esatte dei dati confermati restano in [`PRODUCT.md`](../../PRODUCT.md), il sistema visivo in [`DESIGN.md`](../../DESIGN.md), il testo originale del titolare in [`brief/`](../../brief/).
Se un dato cambia, va aggiornato qui **e** in `PRODUCT.md` nello stesso commit, registrando la decisione in `PROJECT_STATE.md`.

Legenda: ✅ confermato · ⚠️ DA CONFERMARE · ❌ NON DISPONIBILE · — non applicabile.

## 1. Dati base
- Azienda/marchio: TO.DE.L. Automazione Industriale S.r.l. (già Automazione Macchine Utensili S.r.l.), scritto sempre "TO.DE.L." ✅
- Sito attuale: vecchio dominio `automazionemacchineutensili.it`; il nuovo sito è in `sito-v3/public/` (v4.1), non ancora online ✅
- Settore: vendita, installazione e assistenza di macchine per la lavorazione della lamiera e automazione industriale (B2B) ✅
- Località / aree servite: Via Belvedere 47H, 84091 Battipaglia (SA); Campania e Sud Italia ✅
- Referente e decisore: il titolare (nome non riportato nei documenti) ⚠️
- Scadenza: ❌ non indicata
- Budget e modello di incarico: ❌ non indicati
- Lingue: solo italiano, ci si rivolge al visitatore con il "voi" ✅

## 2. Obiettivo e conversione
- Obiettivo primario: richieste di preventivo qualificate ✅
- Azione primaria: "Richiedi preventivo" (modulo precompilato con la macchina scelta) ✅
- Azioni secondarie: chiamata (click-to-call), email, indicazioni stradali; WhatsApp solo se il numero aziendale viene predisposto; percorso assistenza previsto ma non costruito ✅
- Come arrivano oggi i clienti: ❌
- KPI e baseline: ❌ (eventi di misura già predisposti, elenco in `sito-v3/README.md`)
- Risposta ai preventivi: entro 24 ore ✅

## 3. Pubblico
- Primario: titolari e responsabili tecnici/di produzione di PMI manifatturiere in Campania e nel Sud Italia (carpenteria metallica, lavorazioni meccaniche, agroalimentare, edilizia) che valutano un acquisto di alto valore ✅
- Secondario: clienti esistenti che cercano assistenza, ricambi e consumabili ✅
- Decisione: B2B ponderata, spesso con socio o commercialista ✅
- Obiezione principale: affidabilità del partner nel tempo, cioè chi risponde e chi interviene sulla macchina ✅ (da `PRODUCT.md`, "Product Principles")
- Concorrenti considerati: ❌ nessuna analisi nel repository

## 4. Offerta e differenziazione
- Offerta: taglio laser fibra; saldatura e pulizia laser; presse piegatrici e cesoie; tavoli plasma; robot e cobot; retrofit CNC; usato; supporto alla parte finanziaria dell'acquisto ✅
- Gamma Golden Laser trattata: elenco completo in `PRODUCT.md` ✅. Altri marchi (Gilardi, DAMI Engineering, Di Donato & Partners): solo il nome, le linee vendute sono ⚠️
- Differenziatore: **partner unico** (vendita, installazione, formazione e assistenza dallo stesso referente locale, con tecnici propri) ✅
- Rivenditore ufficiale Golden Laser: dichiarato dal titolare, **non pubblicato** finché l'autorizzazione scritta non è archiviata nel repository ⚠️ (sul sito: "vendiamo, installiamo e assistiamo la gamma Golden Laser")
- Prove pubblicabili: formule esatte in `PRODUCT.md` → "Evidence on Hand" (oltre 30 anni nel settore, oltre 100 macchinari, almeno 40 impianti plasma, oltre 20 sistemi laser, 5 clienti citabili) ✅
- Cosa NON promettere: testimonianze, casi studio, certificazioni (nessuno fornito); "TO.DE.L. da 30 anni"; dati tecnici di piegatura, plasma, cobot e retrofit; capacità laser oltre "fino a 30 mm, in funzione di modello, potenza e materiale" ✅
- Prezzi: nessun prezzo, nessun e-commerce ✅

## 5. Brand e direzione visiva
- Logo: due ingranaggi, wordmark serif, barra tricolore; vettoriale in `sito-v3/public/assets/img/` ✅. Sul sito per ora il marchio testuale provvisorio, in attesa del logo originale ⚠️
- Direzione approvata e in uso: v4 "tavola tecnica" (fondo grafite, lastre chiare per le macchine, un accento caldo, punto laser) → `DESIGN.md` ✅
- Direzioni abbandonate: v1 "segnaletica di stabilimento" (`sito/`), `sito-v2/` ✅
- Tono: concreto, tecnico, affidabile; niente "innovazione" generica ✅
- Riferimenti: video di riferimento per il taglio citato nel brief 2/3, mai allegato ❌

## 6. Asset e diritti
- Foto aziendali reali (persone, sede, tecnici, installazioni): ❌ (quelle esistenti sono di bassa qualità)
- Foto Golden Laser ufficiali: in `sito-v3/public/assets/img/gl/`, provenienza in `brief/golden-laser-modelli.md`; alcune con filigrana ✅/⚠️
- Kit immagini e video del rivenditore Golden Laser: richiesto, non ricevuto ❌
- Stock: non usato. Le foto stock senza licenza documentata (plasma, robot, CNC) sono state tolte il 13 ottobre 2026 e sostituite da disegni tecnici ❌
- Clienti citabili: 5 nomi; loghi solo se autorizzati ✅/⚠️
- Video reali: ❌ (la sezione `#video` resta nascosta finché non ce ne sono almeno 2)

## 7. Funzionalità e tecnologia
- Stack: HTML/CSS/JS statico, senza build; Cloudflare Pages (root `sito-v3`, output `public`) ✅
- Modulo: Cloudflare Pages Function `functions/api/richiesta.js` → Resend e/o webhook; **non configurato né provato** ⚠️
- Antispam: Turnstile opzionale (chiave vuota) ⚠️
- Analytics: GA4 solo dopo consenso, oggi spento ✅
- Dominio e registrar: ❌ undecided (segnaposto `https://DOMINIO-DA-INSERIRE`, sostituito da `sito-v3/scripts/imposta-dominio.mjs`)
- Chi aggiorna i contenuti dopo il lancio: ❌
- Accessibilità: WCAG 2.2 AA, target 44 px, reduced motion ✅

## 8. Privacy, credibilità e rischi
- Dati societari: P.IVA IT05573670659 ✅; REA e capitale sociale ❌
- Privacy e cookie: bozze da far verificare al consulente ⚠️
- Claim tecnici: grafico degli spessori limitato a 3–8 kW (massimo 30 mm), coerente con il messaggio "fino a 30 mm, in funzione di modello, potenza e materiale" ✅ (13 ottobre 2026)
- Consensi immagini persone: necessari per la foto dei referenti ⚠️

## 9. Vincoli di progetto
- Budget, data obiettivo, cicli di revisione, manutenzione: ❌
- Responsabile approvazione: il titolare ✅
- Priorità assolute: credibilità (niente dati inventati) e conversione verso il preventivo ✅
- Vietato senza autorizzazione esplicita: deploy, DNS, acquisti, invio di dati a servizi esterni ✅

## 10. Sintesi per il workflow
- Complessità: **Premium** (hero con simulazione di taglio, direzione artistica originale, QA visuale e tecnico richiesti dai brief 2/3 e 3/3)
- Modulo settore: Modulo A — Industria / B2B / macchinari (`06_SECTOR_MODULES.md` del playbook)
- Decisioni approvate: vedi `PRODUCT.md` e la sezione "Decisioni" di `PROJECT_STATE.md`
- Decisioni aperte e prossimo passo: in `PROJECT_STATE.md`
