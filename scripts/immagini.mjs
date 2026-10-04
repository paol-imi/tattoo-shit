#!/usr/bin/env node
// Ridimensiona le mie immagini prima del commit: lato lungo max 2000 px, WebP qualità 85.
// Ogni file viene sostituito da un .webp con lo stesso nome (l'originale viene rimosso).
// Uso: node scripts/immagini.mjs idee/grimorio/img/20261004-sketch-ancore.jpg [altri file…]
import sharp from 'sharp'
import { rm, stat } from 'node:fs/promises'
import { extname } from 'node:path'

const LATO = 2000
const QUALITA = 85

const file = process.argv.slice(2)
if (!file.length) {
  console.error('Uso: node scripts/immagini.mjs <file…>')
  process.exit(1)
}

for (const f of file) {
  const dest = f.slice(0, -extname(f).length) + '.webp'
  const prima = (await stat(f)).size
  const buf = await sharp(f)
    .rotate() // applica l'orientamento EXIF delle foto da telefono
    .resize({ width: LATO, height: LATO, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITA })
    .toBuffer()
  await sharp(buf).toFile(dest)
  if (dest !== f) await rm(f)
  const kb = (n) => `${Math.round(n / 1024)} KB`
  console.log(`${f} → ${dest}  (${kb(prima)} → ${kb(buf.length)})`)
}
