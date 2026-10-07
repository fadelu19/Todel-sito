# Sito TO.DE.L. Automazione Industriale S.r.l.

Sito vetrina statico (HTML, CSS, JavaScript), nessun passaggio di build.

## Struttura
- `sito/` — **la cartella da pubblicare** (homepage `index.html`, `privacy.html`, `assets/`)
- `PRODUCT.md` — dati e obiettivi dell'azienda usati per il progetto
- `DESIGN.md` — sistema visivo (colori, caratteri, componenti, regole)
- `source/` — logo originale e confronto con la ricostruzione vettoriale
- `.impeccable/` — file di lavoro della skill di design (non vengono pubblicati)

## Pubblicazione su Cloudflare Pages
Workers & Pages → Create → Pages → Connect to Git → repository `todel-sito`
- Framework preset: **None**
- Build command: *(vuoto)*
- Build output directory: **`sito`**

## Da completare prima della messa online
- [ ] Approvare la ricostruzione vettoriale del logo (`source/logo-confronto.png`)
- [ ] Nomi dei clienti citabili, anno di fondazione, numero di macchine installate (blocchi gialli "da inserire")
- [ ] P.IVA e dati societari nel piè di pagina
- [ ] Testo dell'informativa privacy (`sito/privacy.html`)
- [ ] Servizio di invio dei moduli: impostare `ENDPOINT` in `sito/assets/main.js`
- [ ] Email aziendale e numero dedicato all'assistenza, se diverso dal commerciale
- [ ] Foto reali di macchine e installazioni (facoltative ma consigliate)
- [ ] Dominio
