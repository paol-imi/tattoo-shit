// Dati di Testi: tutte le citazioni trovate in spunti, idee e ricerche,
// con la nota da cui vengono e la fonte. Le citazioni uguali in più note si uniscono.
import { memo, perSlug, perTitolo, collegamentiFm, chiave, type Archivio } from '../archivio.ts'
import { citazioniDi } from '../testo.ts'
import { provenienza } from '../../shared/nota.ts'

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

const norma = (t: string) => t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
function hash(t: string) {
  let h = 2166136261
  for (const c of t) h = Math.imul(h ^ c.codePointAt(0)!, 16777619)
  return (h >>> 0).toString(36)
}
const ORDINE: Readonly<Record<string, number>> = { spunto: 0, idea: 1, ricerca: 2 }

export const datiTesti = (a: Archivio): DatiTesti => memo(a, 'testi', () => {
  const attive = perSlug(a)
  const sorgenti = a.note
    .filter((n) => n.gruppo in ORDINE)
    .sort((x, y) => ORDINE[x.gruppo] - ORDINE[y.gruppo] || perTitolo(x, y))

  const perTesto = new Map<string, Testo>()
  for (const n of sorgenti) {
    const fonte = (collegamentiFm(n).fonti ?? []).find((s) => attive.get(s)?.tipo === 'fonte') ?? null
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
    .map(([slug, n]) => ({ slug, n, titolo: attive.get(slug)!.titolo, link: attive.get(slug)!.link }))
    .sort((x, y) => y.n - x.n || chiave(x.titolo).localeCompare(chiave(y.titolo), 'it'))
  return { testi, fonti }
})
