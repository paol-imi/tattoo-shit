// I pin di Pinterest delle note, e le loro proporzioni.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { ROOT } from './archivio.ts'
import { sezione, testoSemplice } from './testo.ts'
import { RE_VOCE_PIN, RAPPORTO_PREDEFINITO } from '../shared/pin.ts'

export interface Pin { id: string; descrizione: string }

/** I pin della sezione `## Pinterest`: voci di elenco fatte solo del link al pin. */
export function pinDi(corpo: string): Pin[] {
  return [...sezione(corpo, 'Pinterest').matchAll(RE_VOCE_PIN)].map(([, desc, id]) => ({ id, descrizione: testoSemplice(desc) }))
}

// --- proporzioni dei pin (solo i numeri: larghezza e altezza dell'immagine, niente immagini)
// Servono a dare all'embed ufficiale l'altezza giusta. Si chiedono a Pinterest solo quelle che mancano
// nella cache su disco (.vitepress/cache, fuori dal repository); senza rete si usa 4:3 e si riprova alla build dopo.
const CACHE = join(ROOT, '.vitepress/cache/atlante/pin.json')
const PIN_INFO = 'https://widgets.pinterest.com/v3/pidgets/pins/info/?pin_ids='
const GRUPPO = 20
const ATTESA = 6000

function leggiCache(): Record<string, number> {
  try {
    const c: unknown = JSON.parse(readFileSync(CACHE, 'utf8'))
    return c && typeof c === 'object' ? (c as Record<string, number>) : {}
  } catch {
    return {}
  }
}

function scriviCache(c: Record<string, number>) {
  try {
    mkdirSync(dirname(CACHE), { recursive: true })
    writeFileSync(CACHE, JSON.stringify(c, null, 1) + '\n')
  } catch {
    // senza cache si richiede alla prossima build
  }
}

interface RispostaPin { data?: { id?: unknown; images?: Record<string, { width?: number; height?: number } | undefined> }[] }

/** Chiede a Pinterest le proporzioni (altezza / larghezza) di un gruppo di pin. */
async function chiedi(ids: string[]): Promise<Record<string, number>> {
  const r = await fetch(PIN_INFO + ids.join(','), { signal: AbortSignal.timeout(ATTESA) })
  const json = (await r.json()) as RispostaPin
  const out: Record<string, number> = {}
  for (const p of json?.data ?? []) {
    const img = p?.images?.['237x'] ?? p?.images?.['236x'] ?? p?.images?.['564x']
    if (p?.id && img?.width && img?.height) out[String(p.id)] = +(img.height / img.width).toFixed(4)
  }
  return out
}

/** Le proporzioni dei pin: dalla cache su disco, poi da Pinterest per quelli che mancano, altrimenti 4:3. */
export async function rapportiPin(ids: string[]): Promise<Record<string, number>> {
  const cache = leggiCache()
  const mancanti = [...new Set(ids)].filter((id) => !(id in cache))
  let nuovi = 0
  for (let i = 0; i < mancanti.length; i += GRUPPO) {
    try {
      const trovati = await chiedi(mancanti.slice(i, i + GRUPPO))
      Object.assign(cache, trovati)
      nuovi += Object.keys(trovati).length
    } catch {
      break // senza rete (o Pinterest non risponde): inutile insistere con gli altri gruppi
    }
  }
  if (nuovi) scriviCache(cache)
  return Object.fromEntries(ids.map((id) => [id, cache[id] ?? RAPPORTO_PREDEFINITO]))
}
