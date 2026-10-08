#!/usr/bin/env node
/*
 * Sostituisce il segnaposto del dominio in tutti i file pubblici (canonical, Open Graph, dati strutturati, sitemap, robots).
 * Uso:  node scripts/imposta-dominio.mjs https://www.todel.it
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const SEGNAPOSTO = "https://DOMINIO-DA-INSERIRE";
const dominio = (process.argv[2] || "").replace(/\/+$/, "");
if (!/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}$/i.test(dominio)) {
  console.error("Indicare il dominio completo, es.: node scripts/imposta-dominio.mjs https://www.todel.it");
  process.exit(1);
}
const radice = join(fileURLToPath(new URL(".", import.meta.url)), "..", "public");
const estensioni = new Set([".html", ".xml", ".txt", ".json"]);
let cambiati = 0;
(function giro(cartella) {
  for (const nome of readdirSync(cartella)) {
    const p = join(cartella, nome);
    if (statSync(p).isDirectory()) { giro(p); continue; }
    if (!estensioni.has(extname(nome))) continue;
    const prima = readFileSync(p, "utf8");
    if (!prima.includes(SEGNAPOSTO)) continue;
    writeFileSync(p, prima.split(SEGNAPOSTO).join(dominio));
    cambiati++;
    console.log("aggiornato", p.replace(radice + "/", ""));
  }
})(radice);
console.log(cambiati ? `Fatto: ${cambiati} file aggiornati con ${dominio}` : "Nessun segnaposto trovato (dominio già impostato?)");
