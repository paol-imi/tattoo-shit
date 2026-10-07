// Dati di Testi: tutte le citazioni trovate in spunti, idee e ricerche,
// con la nota da cui vengono e la fonte. Le citazioni uguali in più note si uniscono.
import { defineLoader } from 'vitepress'
import { note, perTitolo, citazioniDi, collegamentiFm, chiave } from '../atlante'
import { provenienza } from '../shared/nota.ts'

export interface Testo {
  id: string
  testo: string
  riferimento: string | null
  misura: 'breve' | 'media' | 'lunga'
  fonte: string | null // slug
  /** proposta: in quella nota il testo sta solo dentro una proposta di Claude */
  note: { titolo: string; link: string; tipo: string; proposta: boolean }[]
  /** vero se il testo compare solo dentro proposte di Claude (blocchi proposta o note non validate) */
  proposta: boolean
}
export interface DatiTesti {
  testi: Testo[]
  fonti: { slug: string; titolo: string; link: string; n: number }[]
}

declare const data: DatiTesti
export { data }

const norma = (t: string) => t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
function hash(t: string) {
  let h = 2166136261
  for (const c of t) h = Math.imul(h ^ c.codePointAt(0)!, 16777619)
  return (h >>> 0).toString(36)
}

export default defineLoader({
  watch: ['../../**/*.md'],
  load(): DatiTesti {
    const tutte = note()
    const perSlug = new Map(tutte.filter((n) => !n.archiviata).map((n) => [n.slug, n]))
    const ordine = { spunto: 0, idea: 1, ricerca: 2 } as Record<string, number>
    const sorgenti = tutte
      .filter((n) => n.gruppo in ordine)
      .sort((a, b) => ordine[a.gruppo] - ordine[b.gruppo] || perTitolo(a, b))

    const perTesto = new Map<string, Testo>()
    for (const n of sorgenti) {
      const fonte = (collegamentiFm(n).fonti ?? []).find((s) => perSlug.get(s)?.tipo === 'fonte') ?? null
      const validata = provenienza(n.fm).validata
      for (const c of citazioniDi(n)) {
        const k = norma(c.testo)
        const proposta = c.proposta || !validata
        const nota = { titolo: n.titolo, link: n.link, tipo: n.tipo, proposta }
        const gia = perTesto.get(k)
        if (gia) {
          const x = gia.note.find((x) => x.link === n.link)
          if (x) x.proposta &&= proposta
          else gia.note.push(nota)
          gia.proposta &&= proposta
          continue
        }
        const righe = c.testo.split('\n').length
        perTesto.set(k, {
          id: hash(k),
          testo: c.testo,
          riferimento: c.riferimento,
          misura: c.testo.length <= 90 ? 'breve' : c.testo.length > 320 || righe > 6 ? 'lunga' : 'media',
          fonte,
          note: [nota],
          proposta,
        })
      }
    }
    const testi = [...perTesto.values()]
    const conta = new Map<string, number>()
    for (const t of testi) if (t.fonte) conta.set(t.fonte, (conta.get(t.fonte) ?? 0) + 1)
    const fonti = [...conta]
      .map(([slug, n]) => ({ slug, n, titolo: perSlug.get(slug)!.titolo, link: perSlug.get(slug)!.link }))
      .sort((a, b) => b.n - a.n || chiave(a.titolo).localeCompare(chiave(b.titolo), 'it'))
    return { testi, fonti }
  },
})
