# Product

<!-- impeccable:product-schema 1 -->
<!-- Aggiornato il 9 ottobre 2026 con i dati confermati dal titolare nei brief (brief/01, sezioni "Correzioni confermate" e "Gamma trattata"). Versione del sito in uso: sito-v3/public (v4.1). -->

## Platform

web

## Stack

Static HTML/CSS/JS (user choice). No framework, no build step. Hosted on Cloudflare Pages from the GitHub repository `fadelu19/todel-sito`: root directory `sito-v3`, output directory `public`. The quote form posts to a Cloudflare Pages Function (`sito-v3/functions/api/richiesta.js`) that delivers by email (Resend, needs a verified domain) and/or a webhook (CRM, Google Sheets via Make/Zapier). Fonts self-hosted (Archivo, Martian Mono), no third-party font CDN at runtime. Site settings live in the `<script id="config">` block of `index.html`.

The only live version is `sito-v3/`. `sito/` (v1, signage) and `sito-v2/` are archived and must not be edited or published.

## Users

- **Primary:** owners and technical/production managers of small and mid-sized manufacturing companies in Campania and Southern Italy — metal carpentry, mechanical machining, agri-food, construction. They are evaluating a high-value machine purchase (fiber laser, press brake, plasma table, cobot, retrofit) and need to judge whether TO.DE.L. is a reliable partner before calling. Considered B2B decision, often with a partner or accountant involved.
- **Secondary:** existing customers who need post-sale assistance, spare parts or consumables.

## Product Purpose

Company website for TO.DE.L. Automazione Industriale S.r.l. Success = qualified quote requests (richieste di preventivo) and assistance requests by phone or form. Not an e-commerce: no prices, no checkout.

## Positioning

**Partner unico** (confirmed by the owner as the real differentiator): sale, installation, training and assistance from the same local referent, with own technicians — the customer does not deal with a distant importer plus a separate service company.

**Official Golden Laser dealer** ("Rivenditore ufficiale Golden Laser"): confirmed by the owner (October 2026) and used on the site. A written dealer authorization is still to be obtained and kept on file.

## Operating Context

- Company: TO.DE.L. Automazione Industriale S.r.l. (formerly Automazione Macchine Utensili S.r.l.). VAT: IT05573670659.
- Address: Via Belvedere 47H, 84091 Battipaglia (SA). Phone: +39 328 824 1909. Email: todelsrl@gmail.com (a company-domain address will replace it once the domain exists).
- Area served: mainly Campania and Southern Italy.
- Offer (confirmed): fiber laser cutting; laser welding and cleaning; press brakes and shears; plasma cutting tables; robots and collaborative robots (cobot); CNC retrofit; used machinery; support with the financial side of the purchase.
- Golden Laser range sold (whole range available for Italy):
  - Sheet: U3 (3–30 kW), E3 (1.5–6 kW), GF large format (4–10 kW), M series high power (20–30 kW).
  - Sheet + tube: E3t Plus (1.5–4 kW), GF-1530JHT (1–4 kW).
  - Tube only: L12MAX, L16MAX, L20MAX, I20A, Mega4 (various powers).
  - Handheld 3-in-1 welders: W15 1.5 kW, W20 2 kW (= SUP20T imported by TO.DE.L.), W30 3 kW.
  - Laser cleaners: Clean series.
- Other brands handled: Gilardi, DAMI Engineering, Di Donato & Partners. Which product lines of each are sold is NOT yet confirmed: do not describe them beyond the name.
- Service: own technicians, maintenance at customer sites, spare parts and consumables on request.
- Sectors served: metal carpentry, mechanical machining, agri-food, construction.
- Existing claim: "Il valore di una scelta".
- Quote response time: within 24 hours.

## Capabilities and Constraints

- Language: Italian only. Address the visitor with "voi".
- Conversion paths: quote request form (pre-filled with the chosen machine), click-to-call, email, directions/map on request. A dedicated assistance path is planned but not built.
- Form delivery is built but NOT configured: it needs the domain plus Resend or a webhook, then a real end-to-end test.
- Privacy and cookie pages are drafts to be reviewed by the company's privacy consultant. Analytics (GA4) loads only after consent and is currently off.
- Domain: undecided (old site: automazionemacchineutensili.it). All URLs use the placeholder `https://DOMINIO-DA-INSERIRE`, replaced by `sito-v3/scripts/imposta-dominio.mjs`.

## Brand Commitments

- Logo: two interlocking gears, serif wordmark "TO.DE.L.", subline "Automazione Industriale S.r.l.", Italian tricolor bar underneath. The brand name is always written "TO.DE.L.". The vector logo exists (`sito-v3/public/assets/img/logo-todel-*.svg`); on the dark site it is used in white.
- Original logo blue (~#42519A) survives on the site as `--blu` / `--blu-chiaro` (identity and focus), not as a fill color.

## Evidence on Hand

Confirmed for publication (October 2026). Use these formulas exactly:

- "oltre 30 anni nel settore" delle macchine e dell'automazione industriale — never "TO.DE.L. da 30 anni".
- oltre 100 macchinari venduti; almeno 40 impianti plasma venduti; oltre 20 sistemi laser venduti, in diverse configurazioni; quasi 10 anni di esperienza nel taglio laser.
- Citable customers: Cerbone; 3G Metal (carpenteria metallica); MGR (lavorazioni meccaniche); General Service (manutenzione industriale); Car Segnaletica (lavorazioni e segnaletica). More names to come. Logos only if authorized. Never invent customers.
- Laser cutting capacity to communicate: "fino a 30 mm, in funzione di modello, potenza e materiale". Golden Laser data may be used only from official technical tables, only for models TO.DE.L. sells, and in doubtful cases the lower value. U3 values at 8 kW: carbon steel 30 mm, stainless 20 mm, aluminium 18 mm, brass 18 mm. Open issue: the thickness chart on the site shows up to 60 mm at 20 kW; align it with the 30 mm message once the owner confirms.

Still missing (do not fabricate):

- Real photos of the people, premises, technicians and installations. Existing company photos are low quality. Planned: photo of the owner's family (father and brother) for the "Referenti" block, names and roles only once confirmed.
- Golden Laser dealer image/video kit (requested). Until then: official Golden Laser photos labelled "foto Golden Laser", stock labelled "Immagine illustrativa", never presented as TO.DE.L. installations.
- Founding year (available, not provided), REA number and share capital, opening hours, assistance response times.
- Testimonials, case studies, certifications: none provided.

## Product Principles

1. Trust before persuasion: a buyer spending tens of thousands of euros needs to see who answers the phone and who fixes the machine.
2. One referent, whole lifecycle: every section reinforces that TO.DE.L. follows the machine from choice to assistance.
3. Concrete over generic: machines, sectors, place, people — no vague "innovation" talk.
4. Every page ends in a next step: call, quote, assistance.
5. Never publish unconfirmed facts; missing assets are replaced or hidden before going live, never shown as placeholders to visitors.

## Accessibility & Inclusion

WCAG 2.2 AA as baseline. Audience includes non-technical owners reading on phones in workshops: large tap targets (44 px), readable contrast, click-to-call prominent, reduced motion respected.
