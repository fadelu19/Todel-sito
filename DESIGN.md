---
name: TO.DE.L. Automazione Industriale
description: "Company site built as the plant's signage system: a reparti board, a painted floor lane, square corners."
colors:
  blu: "#3E4C96"
  blu-scuro: "#303C7C"
  blu-acceso: "#4A5AAB"
  blu-filo: "rgba(255, 255, 255, 0.22)"
  su-blu: "#FFFFFF"
  su-blu-2: "#D9DCEC"
  verde: "#0B7A47"
  verde-scuro: "#08623A"
  su-verde-2: "#E3F1E8"
  verde-velo: "#EAF4EE"
  giallo-segnale: "#F2B705"
  segnaposto-fondo: "#FBEFC4"
  segnaposto-testo: "#6A4D00"
  segnaposto-bordo: "#B88A00"
  segnaposto-chiaro: "#FFE08A"
  rosso: "#C8352F"
  rosso-su-verde: "#FFB4AE"
  rosso-su-verde-testo: "#FFD9D6"
  cemento: "#E6E6E1"
  cemento-scuro: "#D3D4CE"
  cemento-riga: "#C5C6BF"
  piastra: "#F8F8F5"
  inchiostro: "#191C26"
  inchiostro-2: "#444957"
  piede-testo: "#C9CCD6"
  campo-suggerimento: "#6B7080"
  campo-bordo-hover: "#9A9DA6"
  logo-blu: "#42519A"
  tricolore-verde: "#0A9A5B"
  tricolore-rosso: "#D6403F"
  tricolore-filo: "#B9BCC4"
typography:
  display:
    fontFamily: "Barlow Condensed, Barlow, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.2rem + 4.6vw, 5.6rem)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.012em"
  headline:
    fontFamily: "Barlow Condensed, Barlow, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 1.3rem + 2.6vw, 3.6rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Barlow Condensed, Barlow, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2vw, 3rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.005em"
  title-sm:
    fontFamily: "Barlow Condensed, Barlow, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 1.3rem + 1vw, 2.1rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.005em"
  row:
    fontFamily: "Barlow Condensed, Barlow, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 1.1rem + 0.6vw, 1.7rem)"
    fontWeight: 600
    lineHeight: 1.05
  numeral:
    fontFamily: "Big Shoulders Stencil Display, Barlow Condensed, system-ui, sans-serif"
    fontSize: "clamp(4.6rem, 3rem + 4.6vw, 7.6rem)"
    fontWeight: 800
    lineHeight: 1
  phone:
    fontFamily: "Barlow Condensed, Barlow, Arial Narrow, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1
  sign:
    fontFamily: "Barlow Condensed, Barlow, Arial Narrow, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1
  plate:
    fontFamily: "Barlow Condensed, Barlow, Arial Narrow, system-ui, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.03em"
  code:
    fontFamily: "Barlow Condensed, Barlow, Arial Narrow, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1
  button:
    fontFamily: "Barlow Condensed, Barlow, Arial Narrow, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.01em"
  button-large:
    fontFamily: "Barlow Condensed, Barlow, Arial Narrow, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.01em"
  band:
    fontFamily: "Barlow Condensed, Barlow, Arial Narrow, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "0.08em"
  body:
    fontFamily: "Barlow, Arial Narrow, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "tnum"
  body-lead:
    fontFamily: "Barlow, Arial Narrow, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "tnum"
  label:
    fontFamily: "Barlow, Arial Narrow, system-ui, sans-serif"
    fontSize: "0.98rem"
    fontWeight: 600
    lineHeight: 1.6
  caption:
    fontFamily: "Barlow, Arial Narrow, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
    lineHeight: 1.3
rounded:
  none: "0px"
spacing:
  label-gap: "6px"
  plate-gap: "10px"
  row-gap: "14px"
  field-gap: "16px"
  text-gap: "18px"
  action-gap: "28px"
  gutter: "clamp(16px, 4vw, 48px)"
  board-inset: "clamp(24px, 4vw, 56px)"
  zone-gap: "clamp(40px, 6vw, 88px)"
  section: "clamp(64px, 9vw, 120px)"
  container-max: "1320px"
components:
  insegna:
    backgroundColor: "{colors.cemento}"
    textColor: "{colors.inchiostro}"
    height: "76px"
  nav-link:
    textColor: "{colors.inchiostro}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "10px 12px"
  nav-link-hover:
    textColor: "{colors.blu}"
  button-primary:
    backgroundColor: "{colors.blu}"
    textColor: "{colors.su-blu}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.blu-scuro}"
  button-primary-large:
    backgroundColor: "{colors.blu}"
    textColor: "{colors.su-blu}"
    typography: "{typography.button-large}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "58px"
  button-plate:
    backgroundColor: "{colors.piastra}"
    textColor: "{colors.inchiostro}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-assistance:
    backgroundColor: "{colors.su-blu}"
    textColor: "{colors.verde-scuro}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-assistance-hover:
    backgroundColor: "{colors.verde-velo}"
  tabellone:
    backgroundColor: "{colors.blu}"
    textColor: "{colors.su-blu}"
    rounded: "{rounded.none}"
    padding: "clamp(32px, 4.4vw, 60px) clamp(24px, 4vw, 56px)"
  tabellone-fascia:
    textColor: "{colors.su-blu-2}"
    typography: "{typography.band}"
    padding: "12px 0 10px"
  riga:
    textColor: "{colors.su-blu}"
    typography: "{typography.row}"
    rounded: "{rounded.none}"
    padding: "10px 12px 10px 4px"
    height: "74px"
  riga-hover:
    backgroundColor: "{colors.blu-acceso}"
  riga-codice:
    backgroundColor: "{colors.su-blu}"
    textColor: "{colors.blu}"
    typography: "{typography.code}"
    rounded: "{rounded.none}"
    size: "34px"
  targa-telefono:
    backgroundColor: "{colors.piastra}"
    textColor: "{colors.inchiostro}"
    typography: "{typography.phone}"
    rounded: "{rounded.none}"
    padding: "16px 18px"
  targa-assistenza:
    backgroundColor: "{colors.verde}"
    textColor: "{colors.su-blu}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  targa-assistenza-hover:
    backgroundColor: "{colors.verde-scuro}"
  corsia-binario:
    backgroundColor: "{colors.cemento-scuro}"
    width: "48px"
  corsia-vernice:
    backgroundColor: "{colors.blu}"
    textColor: "{colors.su-blu}"
    width: "48px"
  zona-numero:
    textColor: "{colors.cemento-riga}"
    typography: "{typography.numeral}"
    rounded: "{rounded.none}"
    size: "clamp(96px, 11vw, 150px)"
  zona-numero-raggiunta:
    textColor: "{colors.blu}"
  zona-numero-assistenza:
    textColor: "{colors.verde}"
  reparto-targa-codice:
    backgroundColor: "{colors.inchiostro}"
    textColor: "{colors.su-blu}"
    width: "56px"
    height: "64px"
  reparto-targa-pittogramma:
    backgroundColor: "{colors.blu}"
    textColor: "{colors.su-blu}"
    padding: "10px 14px"
    height: "64px"
  cartello-direzione:
    backgroundColor: "{colors.blu}"
    textColor: "{colors.su-blu}"
    typography: "{typography.sign}"
    rounded: "{rounded.none}"
    padding: "12px 18px 12px 20px"
  cartello-direzione-hover:
    backgroundColor: "{colors.blu-scuro}"
  sede-riga:
    backgroundColor: "{colors.piastra}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.none}"
    padding: "16px 18px"
  input:
    backgroundColor: "{colors.su-blu}"
    textColor: "{colors.inchiostro}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
    height: "50px"
  modulo-preventivo:
    backgroundColor: "{colors.piastra}"
    rounded: "{rounded.none}"
    padding: "clamp(22px, 3vw, 40px)"
  modulo-assistenza:
    backgroundColor: "{colors.verde-scuro}"
    textColor: "{colors.su-blu}"
    rounded: "{rounded.none}"
    padding: "clamp(22px, 3vw, 36px)"
  modulo-esito:
    backgroundColor: "{colors.su-blu}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.none}"
    padding: "14px 16px"
  marchio-targa:
    backgroundColor: "{colors.inchiostro}"
    textColor: "{colors.su-blu}"
    typography: "{typography.plate}"
    rounded: "{rounded.none}"
    padding: "10px 16px"
    height: "64px"
  segnaposto:
    backgroundColor: "{colors.segnaposto-fondo}"
    textColor: "{colors.segnaposto-testo}"
    rounded: "{rounded.none}"
    padding: "8px 14px"
    height: "44px"
  segnaposto-scuro:
    textColor: "{colors.segnaposto-chiaro}"
    padding: "0 6px"
  piede:
    backgroundColor: "{colors.inchiostro}"
    textColor: "{colors.piede-testo}"
    padding: "48px 0 40px"
---

# Design System: TO.DE.L. Automazione Industriale

## Overview

**Creative North Star: "The Plant Signage System"**

The site is the wayfinding of the TO.DE.L. plant, drawn with the discipline of Bob Noorda's transit signage. A visitor walks in on a floor of light resin concrete, reads the enamelled blue reparti board (tabellone) hung at the entrance, and follows a blue lane painted on the floor (corsia) from choosing a machine to getting it serviced. Every element is a sign, a plate, a floor marking or a form at the office counter. Nothing floats, glows or rounds off.

Density is that of a real sign: few words, large condensed type, generous plate padding, hairline rules between rows. Colour is a safety code, not decoration. Blue means signage and action, green means assistance, signal yellow means focus or "temporary, to be replaced", red means an error (and the tricolor inside the logo). Depth comes from the floor/panel relationship: the floor is flat and grained; the board and the quote form hang on it with a low, heavy shadow.

The world explicitly rejects the dark industrial hero with sparks and the grid of product cards. Machines are listed as rows on a board and as reparto rows with a code plate, never as cards. There is no usable photography yet; pictograms drawn in an ISO-style filled idiom carry all imagery. The logo files in `sito/assets/img/` are a builder-traced vector redraw of the raster original (`source/logo-originale.png`, 399×399), pending client approval: treat their geometry as provisional.

**Key Characteristics:**
- Light resin-concrete floor (cemento with a 6% fractal-noise grain), enamelled blue sign panels with white text.
- Square corners everywhere ("angoli vivi"): 0px radius on every surface, field, button and focus ring.
- A colour code with one meaning per hue: blue = signage/action, green = assistance only, yellow = focus and temporary placeholders only, red = errors and tricolor only.
- Barlow Condensed as the sign face, Barlow for reading, a stencil face only for floor zone numerals.
- Filled ISO-style pictograms on a 48×48 grid and one single arrow drawing for every direction.
- A painted floor lane with white edge lines and chevrons that paints itself with scroll and lights the zones it reaches.

## Colors

A safety-code palette on a concrete floor: one saturated blue does almost all the work, and every other hue is reserved for a single meaning.

### Primary
- **TO.DE.L. Sign Blue** (blu): the enamel of the reparti board, the painted lane, primary buttons, the direction sign, pictogram plates, links, checklist ticks and the scrollbar thumb. White on it measures 7.84:1.
- **Pressed Blue** (blu-scuro): hover and pressed state of blue buttons, links and the direction sign.
- **Backlit Blue** (blu-acceso): the board row lit on hover/focus, as if the panel were backlit.
- **Row Hairline** (blu-filo): 1px white-at-22% rule between board rows.
- **Enamel White** (su-blu): text and pictograms on blue, the code tiles A–G, input fields, the board's white band rule and inner enamel edge.
- **Pale Enamel Text** (su-blu-2): secondary text on blue (row descriptions, board subtitle, band heading); 5.75:1 on blu, 4.61:1 on blu-acceso.

### Secondary
- **Safe-Condition Green** (verde): assistance and nothing else: the assistance plate on the board, zone 4 of the lane once reached, its ticks, and the assistance section ground.
- **Deep Safety Green** (verde-scuro): hover of green plates, the assistance form panel, and text colour of the white assistance button.
- **Green-Ground Text** (su-verde-2): body text on the green section (4.63:1).
- **Pressed White on Green** (verde-velo): hover of the white assistance button.

### Tertiary
- **Signal Yellow** (giallo-segnale): the 3px focus ring, the skip link, the 6px arrival ring that pulses on the quote form when a machine row preselects it, and the target highlight of a reparto row. Never a resting fill or a CTA: the only yellow fill is the skip link, which exists only while focused.
- **Placeholder Yellows** (segnaposto-fondo, segnaposto-testo, segnaposto-bordo, segnaposto-chiaro): the dashed placeholder plates that mark facts not yet supplied (client names, founding year, installed machines, VAT number). The dark-ground variant uses segnaposto-chiaro text and border on inchiostro (13.18:1).

### Error
- **Error Red** (rosso): invalid field border plus 1px inset, and the error message text (600 weight). 4.93:1 on piastra.
- **Error on Green** (rosso-su-verde, rosso-su-verde-testo): the same error states inside the assistance form, where red would vanish on green: pale salmon 2px inset border and text (5.73:1 on verde-scuro).

### Neutral
- **Resin Concrete** (cemento): the floor; page ground with a fine noise grain, header band, mobile menu.
- **Worn Concrete** (cemento-scuro): the unpainted lane track, the zone connectors before they are reached, the quote section ground, the scrollbar track.
- **Floor Joint Grey** (cemento-riga): hairlines between rows, field borders, plate borders, outline of unreached zone boxes and numerals.
- **Enamel Plate** (piastra): plates and panels lifted off the floor: phone plate, address rows, plate button, the reparti section ground, the quote form panel.
- **Sign Ink** (inchiostro): text, 3px heavy rules under section heads, code squares in reparto plates, brand plates, menu button, footer ground (13.57:1 on cemento).
- **Graphite** (inchiostro-2): secondary and paragraph text on light grounds (7.18:1 on cemento).
- **Footer Text** (piede-testo), **Field Hint** (campo-suggerimento), **Field Hover Edge** (campo-bordo-hover): footer copy, input placeholder text (4.94:1 on white), field border on hover.

### Brand mark only
- **Logo Blue** (logo-blu), **Tricolor Green** (tricolore-verde), **Tricolor Red** (tricolore-rosso), **Tricolor Keyline** (tricolore-filo): colours that live inside the logo SVGs only (gears, wordmark, tricolor bar and the keyline under its white segment). The UI blue (blu) is a slightly deeper sibling of the logo blue; the logo is never recoloured to match it.

### Named Rules
**The Safety-Code Rule.** Each hue carries exactly one meaning. Blue is signage and action; green is assistance; yellow is focus or "temporary"; red is error or tricolor. A hue that appears outside its meaning is a bug.

**The Green Door Rule.** Green marks only the way to assistance: the board's assistance plate, zone 4, the assistance section and its form and button. A green "success" badge, a green CTA for quotes, or a green tick outside zone 4 breaks the code.

**The Temporary Yellow Rule.** Yellow placeholders are dashed and visible on purpose. When the real fact arrives the plate is removed and the fact set as plain text; placeholders are never restyled into a permanent element.

## Typography

**Display Font:** Barlow Condensed (with Barlow, Arial Narrow, system-ui)
**Body Font:** Barlow (with Arial Narrow, system-ui)
**Numeral Font:** Big Shoulders Stencil Display 800 (with Barlow Condensed)

**Character:** Barlow Condensed is the face of the signs: narrow, upright, legible from a distance, set tight with negative tracking at large sizes. Barlow is its reading companion for paragraphs and labels, set at 17px with tabular figures so phone numbers and data align. The stencil face appears only as the numerals painted inside the floor zone boxes. All fonts are self-hosted WOFF2.

### Hierarchy
- **Display** (600, clamp(2.6rem → 5.6rem), 0.96, -0.012em): the single board headline. On phones it steps down to clamp(2.5rem, 1.4rem + 5.4vw, 3.2rem).
- **Headline** (600, clamp(2.1rem → 3.6rem), 1): section titles (lane intro, I reparti, assistance, company, quote).
- **Title** (600, clamp(2rem → 3rem), 1): the four zone names along the lane.
- **Title small** (600, clamp(1.6rem → 2.1rem), 1): reparto row titles.
- **Row** (600, clamp(1.35rem → 1.7rem), 1.05): machine names on the board rows.
- **Numeral** (Stencil 800, clamp(4.6rem → 7.6rem), 1): zone numbers 1–4, outlined with a 2px text stroke until reached, then filled.
- **Phone** (700, 2rem, 1): the phone number on the board's contact plate; address rows use the same face at 600, 1.45rem.
- **Sign** (600, 1.5rem, 1): the direction sign label.
- **Plate** (600, 1.4rem, 0.03em, uppercase): brand-name plates.
- **Code** (700, 1.35rem, 1): letters A–G in the board's code tiles; 2.1rem inside reparto plates.
- **Button** (600, 1.15rem, 0.01em) and **Button large** (600, 1.35rem): buttons, nav links, text links with arrow.
- **Band** (600, 1rem, 0.08em, uppercase): the board's band heading only.
- **Body** (400, 1.0625rem, 1.6, tabular figures): reading text, max 46–62ch; **Body lead** (1.1–1.15rem) for section intros.
- **Label** (600, 0.98rem): form labels and legends; **Caption** (500, 0.85rem): the small line above a number on contact plates.

### Named Rules
**The Sign-Face Rule.** Anything that would be painted or printed on a sign (headings, machine names, buttons, nav, phone numbers, codes) is Barlow Condensed. Anything you read sitting down is Barlow. The stencil exists only on the floor.

**The One Band Rule.** Outside the brand-name plates, the board's band heading ("Scegliete il reparto") is the only uppercase tracked text: it is the real heading of the rows directly under it, sitting on a 3px white rule. No uppercase kicker ever sits above a section headline.

## Layout

A single 1320px column with fluid gutters (16px on phones up to 48px), read top to bottom as a walk through the plant. Section grounds change like floor zones: concrete for the entrance and lane, enamel off-white for the reparti, green for assistance, concrete for the company, worn concrete for the quote counter, ink for the footer. Sections breathe on clamp(64px, 9vw, 120px) vertical padding; the sticky header is 76px tall (64px on phones) and anchors scroll with 88px clearance.

The board fills almost the full width at the first viewport: a two-column head (headline across, then text beside a 580px contact column) over two columns of machine rows, collapsing to one column at 1040px (head) and 960px (rows). Below it, the lane attaches at the board's foot and runs down a dedicated 88px rail column (36px on phones) beside the content; each zone is a numeral box plus a body split 1.4fr/1fr (text / checklist), joined to the lane by an 8px connector bar. Reparto rows are a four-column grid (132px plate, title, text, 17rem link) that drops to two columns at 1040px and one at 640px. The quote form is two-column, one column at 640px; the assistance form is always one column. Sectors run in four ruled columns, two on tablet.

Spacing is rhythmic and small at the component level (6, 10, 14, 16, 18, 28px) and fluid at the section level. Tap targets never drop below 48px: board rows 74px (62px on phones), buttons 48/58px, fields 50px, radio rows 40px with 22px controls. Breakpoints are 1180, 1040, 960 and 640px (max-width).

**The Follow-the-Lane Rule.** The page is a route, not a grid of boxes. New content joins the walk in order (board, lane, reparti, assistance, company, quote) and attaches to existing rules or the lane; it does not float as an independent card.

## Elevation & Depth

Flat floor, hung panels. The concrete floor and everything painted on it (lane, zones, rules, rows) have no shadow at all; depth on the floor is conveyed by ground changes and rules. Only objects that physically hang or stand on the floor cast a shadow: the reparti board, the quote form, the assistance form, and the status plate. Shadows are low, ink-tinted and heavy at the base, never glowing. The header gains a faint shadow and a hairline only once the page scrolls under it.

### Shadow Vocabulary
- **Hung panel** (`box-shadow: 0 2px 2px rgba(25, 28, 38, 0.10), 0 24px 48px -18px rgba(25, 28, 38, 0.45)`): the board and the quote form panel.
- **Lifted plate** (`box-shadow: 0 1px 1px rgba(25, 28, 38, 0.10), 0 6px 18px -6px rgba(25, 28, 38, 0.22)`): the form status message.
- **Panel on green** (`box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.45)`): the assistance form on the green section.
- **Detached header** (`box-shadow: 0 8px 20px -14px rgba(25, 28, 38, 0.35)`): sticky header after 8px of scroll, with a cemento-riga hairline.
- **Plate seat** (`box-shadow: 0 1px 0 rgba(0, 0, 0, 0.12)`): the phone plate sitting on the blue board.

### Named Rules
**The Floor-and-Panel Rule.** If it is painted on the floor, it is flat. If it hangs, it gets the hung-panel shadow. Nothing else casts a shadow, and no shadow is ever offset sideways or coloured.

## Shapes

Square corners throughout ("angoli vivi"): radius 0 on buttons, plates, panels, fields, code tiles, zone boxes, the focus ring and even the scrollbar thumb. Form comes from rules and plates, in a fixed set of weights: 1px hairlines (cemento-riga on light grounds, white at 22% on blue) between rows; 1.5px borders on fields, address plates and the plate button; 2px borders on buttons; 3px heavy rules (inchiostro under section heads, sectors and registers; white under the board band; cemento-riga turning blue or green over zone checklists); 6px borders on zone boxes (5px on phones). Signs carry an inner enamel edge: a 1.5px white line at 55% opacity inset 8px (6px on phones) on the board, and a 1.5px white line at 60% inset 3px on the direction sign. The painted lane draws its white edge lines as inset strokes (5px blue then 3px white on each side; 3px and 2px on phones). Dashed borders exist only on placeholders. Circles appear only inside pictograms, never as containers.

**The Angoli Vivi Rule.** Every corner is 0px. A rounded corner anywhere reads as a foreign object in the plant.

## Components

### Buttons
Solid, square, sign-weight. Barlow Condensed 600, 2px border in the fill colour, minimum 48px tall (58px large), optional 20/24px pictogram before or arrow after.
- **Shape:** square corners (0px), padding 0 20px (0 26px large); large buttons go full width on phones.
- **Primary (blue):** sign blue fill, white text; hover to pressed blue. Used for "Preventivo" in the header and "Invia la richiesta" on the quote form.
- **Plate (phone):** enamel plate fill, ink text, floor-joint border, blue phone pictogram; hover turns the border blue. On phones its number collapses to the word "Chiama".
- **Assistance (white on green):** white fill, deep-green text, only on green grounds; hover to pressed white.
- **Press / Focus:** 1px downward press on active; 160ms colour transitions on the exit curve; focus is the yellow ring (see Inputs). Disabled during submission at 60% opacity with a progress cursor.

### Tabellone (reparti board) — signature
The entrance sign. A sign-blue panel with the hung-panel shadow and an inner enamel edge. Head: display headline, pale-enamel paragraph, and a contact column of two plates side by side (stacked on phones): an enamel phone plate (caption + 2rem number, blue phone pictogram) and a green assistance plate (key pictogram, "Assistenza tecnica"). Then the band: a 3px white rule with the uppercase band heading left and an aria-hidden "Richiedi preventivo" right (hidden on phones).
- **Rows (righe):** two columns of links separated by blue-filo hairlines. Each row is a grid of code tile, 44px pictogram, machine name over a description, and the arrow at the far right. Code tiles are white 34px squares with the letter A–G in blue Condensed 700. The last row ("Non sapete quale scegliere?") keeps an empty code slot and ends in a phone glyph instead of the arrow.
- **Behaviour:** on hover and focus the row lights to backlit blue in 220ms and the arrow advances 6px in 260ms. Each machine row links to the quote form and preselects the machine; the form then pulses a yellow arrival ring and focus moves to the first field. On phones row descriptions hide (except the question row).

### Corsia (painted lane) — signature
A 48px strip (24px on phones) on a worn-concrete track that starts at the foot of the board and runs beside the four phases. The paint is sign blue with two white edge lines and white floor chevrons repeating every 144px (72px on phones), filling downward in step with scroll progress. Zones are floor boxes: a square with a 6px border holding a stencil numeral, connected to the lane by an 8px bar. Unreached, box, numeral outline and connector are floor-joint grey; reached, they turn blue (zone 4 turns green) in 400–500ms, and the 3px rule above the zone's checklist turns the same colour. Checklists use filled 22px tick pictograms in blue (green in zone 4). With reduced motion the lane is fully painted and every zone is reached from the start.

### Reparto rows
The detailed directory of the seven machine families on the enamel-off-white ground, under a 3px ink rule. Each row: a sign plate (56×64px ink square with the code letter in white Condensed 700 at 2.1rem, joined to a blue plate with the white 44px pictogram), the title, a graphite paragraph, and a blue Condensed text link ending in the arrow (arrow advances 5px on hover). Rows are separated by 1px floor-joint hairlines. When targeted by an anchor the row receives a signal-yellow highlight.

### Sign plates
- **Direction sign (cartello):** sign blue, white Condensed 1.5rem label, inner white edge line, 34px arrow that advances on hover; on ≤960px the arrow rotates 90° to point down to the form below.
- **Address plates (sede):** enamel plates with a 1.5px floor-joint border, blue 26px pictogram, small caption over a Condensed 1.45rem value; hover turns border and text blue.
- **Brand plates (marchi):** ink plates, 64px tall, white uppercase Condensed with 0.03em tracking, two per row.
- **Sectors:** four columns of large Condensed names under a 3px ink rule, divided by 1px vertical hairlines.

### Inputs / Fields
- **Style:** white field, 1.5px floor-joint border, square corners, 50px minimum height, 12px 14px padding, body type at 1.05rem; textarea min 110px, vertical resize; select uses a custom blue chevron. Labels sit above in Barlow 600 with a 6px gap.
- **Hover:** border darkens to the field-hover edge.
- **Focus:** 3px signal-yellow outline at 1px offset and the border turns ink, so the field reads on any ground.
- **Error:** red border plus 1px red inset and a red 600-weight message under the field; on the green form the pale salmon pair replaces red. Radios and checkboxes are 22px native controls tinted blue (white on green).
- **Status message:** a white plate with the lifted-plate shadow announcing the result (flat on concrete inside the quote form); in preview it states honestly that online sending is not active yet and gives the phone number.
- **Panels:** the quote form is an enamel panel with the hung-panel shadow, two columns; the assistance form is a deep-green panel on the green section.

### Navigation
- **Header (insegna):** sticky band of resin concrete at 94% opacity, 76px tall, logo at 216px (168px on phones), nav links in Condensed 600 1.15rem ink with an 8% blue wash and blue text on hover, then the phone plate button and the blue "Preventivo" button. After 8px of scroll it gains a hairline and the detached-header shadow.
- **Mobile (≤960px):** links collapse behind a 48px ink square menu button (hamburger and close glyphs drawn as filled bars); the menu drops as a full-width concrete sheet with 1.4rem links separated by hairlines; Escape closes it and returns focus.
- **Footer (piede):** ink ground, white stacked logo at 176px, address and legal line in footer text, white underlined links.

### Pictograms and arrow
Filled solid silhouettes in the ISO 7010 idiom on a 48×48 grid (laser head, welding torch, press brake, plasma torch, cobot arm, CNC panel, used machine with tag, question mark), and 24×24 filled UI glyphs (phone, key, pin, tick, menu, close). No strokes, no outlines, no icon fonts, no emoji. A single block arrow (48×48: shaft and triangular head) is the only direction mark on the site: board rows, reparto links, the direction sign and the submit button; it translates or rotates, it is never redrawn.

### Segnaposto (temporary placeholders)
Dashed 1.5px dark-yellow border, pale yellow fill, dark-amber 600 text at 0.95rem, 44px tall; the dark variant on ink is a slim dashed outline in pale yellow. They mark facts not yet supplied (client names, founding year, installed machines, VAT number, privacy text). They are temporary by definition: each one is deleted when the client confirms the fact.

### Brand mark
The horizontal logo (header), the stacked white logo (footer) and the gear favicon are builder-traced SVG redraws of the raster original, pending client approval. Use them as supplied, at their supplied colours; do not redraw, recolour or crop them, and replace them wholesale if the client provides an official vector.

## Do's and Don'ts

### Do:
- **Do** keep every corner square (0px): buttons, plates, panels, fields, code tiles, zone boxes, focus ring.
- **Do** give every wayfinding element the sign anatomy: blue ground, white Condensed text, a code tile or pictogram, and the single arrow at the end.
- **Do** mark focus with the 3px signal-yellow outline (3px offset, 1px on fields) and, on light grounds, pair it with an ink edge as the fields do; yellow on cemento alone measures 1.45:1.
- **Do** set headings, machine names, buttons, nav and phone numbers in Barlow Condensed 600/700, reading text in Barlow 400 at 1.0625rem/1.6, and use the stencil only for zone numerals.
- **Do** draw new pictograms as filled solid shapes on a 48×48 grid, white on blue or blue on light grounds.
- **Do** separate with rules, not boxes: 1px hairlines between rows, 3px ink rules under section heads, the 3px white rule on the board band.
- **Do** keep placeholders as dashed yellow segnaposto plates until the client supplies the fact, then replace them with plain text.
- **Do** keep tap targets at 48px or more and the phone number one tap away in the header, the board and the assistance section.
- **Do** honour reduced motion: lane fully painted, zones reached, transitions and smooth scroll off.

### Don't:
- **Don't** use green for anything except assistance.
- **Don't** use yellow as a fill, accent or call to action; it is reserved for focus and arrival states and for temporary placeholders.
- **Don't** use red outside form errors and the logo tricolor.
- **Don't** use gradients, frosted or glass panels, glows, or rounded cards.
- **Don't** add eyebrow or kicker labels above headings; the board's band heading is a heading, not a kicker.
- **Don't** build a dark hero with sparks or a grid of product cards; machines appear as board rows and reparto rows.
- **Don't** introduce a second arrow drawing, outline or stroked icons, icon fonts or emoji.
- **Don't** substitute stock or generated machine photography, or invent client names, years or figures to fill a placeholder.
- **Don't** recolour, redraw or reuse the logo's tricolor or logo blue as UI colours.
