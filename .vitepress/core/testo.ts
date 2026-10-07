// Estrattori di testo dalle note: sezioni, sintesi, prime frasi, citazioni. Solo stringhe, niente disco.
import { blocchi } from './blocchi.ts'
import type { Nota } from './archivio.ts'

/** Il testo di una sezione `## Nome` (senza il titolo), o null se la sezione non c'è. */
export function trovaSezione(corpo: string, nome: string): string | null {
  const m = ('\n' + corpo).match(new RegExp(`\\n## ${nome}[ \\t]*\\n([\\s\\S]*?)(?=\\n## |$)`))
  return m ? m[1] : null
}

/** Il testo di una sezione `## Nome` (senza il titolo), o stringa vuota. */
export const sezione = (corpo: string, nome: string) => trovaSezione(corpo, nome) ?? ''

/** Markdown in linea → testo semplice. */
export function testoSemplice(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*|__|`/g, '')
    .replace(/(^|[\s(“"])[*_]([^*_\n]+)[*_](?=[\s).,;:!?”"]|$)/g, '$1$2')
    .replace(/\\$/gm, '')
    .trim()
}

/** Il primo paragrafo di testo (non titolo, citazione, tabella, elenco o nota in corsivo). */
const primoParagrafo = (testo: string) =>
  testo.split(/\n\s*\n/).map((p) => p.trim()).find((p) => p && !/^[#>|-]/.test(p) && !p.startsWith('_'))

/** Primo paragrafo di testo dopo un titolo (o dopo l'h1), senza markdown. */
export function sintesi(corpo: string, nomeSezione?: string): string {
  let testo: string
  if (nomeSezione) {
    const s = trovaSezione(corpo, nomeSezione)
    if (s == null) return ''
    testo = s
  } else {
    testo = corpo.replace(/^#\s+.+$/m, '').split(/\n## /)[0]
  }
  return (primoParagrafo(testo) ?? '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*|__|`/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Le prime frasi di un paragrafo, fino a circa `min` caratteri; salta un'avvertenza iniziale in grassetto. */
export function primeFrasi(corpo: string, nomeSezione: string, min = 70, max = 260): string {
  const par = primoParagrafo(sezione(corpo, nomeSezione))
  if (!par) return ''
  const pulito = testoSemplice(par.replace(/^\*\*[^*]+\*\*[^.]*\.\s+/, '')).replace(/\s+/g, ' ')
  const frasi = pulito.match(/[^.!?]+(?:[.!?]+["”»)]?|$)\s*/g) ?? [pulito]
  let out = ''
  for (const f of frasi) {
    if (out.length >= min) break
    if (out && (out + f).length > max) break
    out += f
  }
  out = out.trim()
  return out.length > max ? out.slice(0, max).replace(/\s+\S*$/, '') + '…' : out
}

/** La prima frase citata tra virgolette in un testo (almeno tre parole), per gli spunti di formato "frase". */
export function fraseTraVirgolette(md: string): string | null {
  const t = testoSemplice(md)
  for (const [, f] of t.matchAll(/["“]([^"”\n]{8,160})["”]/g)) if (f.trim().split(/\s+/).length >= 3) return f.trim()
  return null
}

/** Una citazione trovata in una nota: il testo (a capo conservati), se c'è il riferimento, e se sta in un blocco proposta. */
export interface Citazione { testo: string; riferimento: string | null; proposta: boolean }

/** Il testo di una citazione dalle sue righe senza `>`: a capo dove la riga finisce con la barra rovesciata, strofe separate da una riga vuota. */
export function testoCitazione(righe: readonly string[]): string {
  // le righe che finiscono con "\" vanno a capo; una riga vuota separa le strofe; il resto si unisce
  const strofe = righe.join('\n').split(/\n\s*\n/).map((s) =>
    s.split('\n').reduce((acc, r, i, a) => acc + r.replace(/\\$/, '') + (i === a.length - 1 ? '' : /\\$/.test(r) ? '\n' : ' '), ''),
  )
  return strofe.map((s) => testoSemplice(s.split('\n').map((r) => r.trim()).join('\n'))).join('\n\n').trim()
}

const PASSO_TROVATO = /^\s*(?:\d+\.|[-*])\s+\*\*([^*]+?)\.?\*\*[^\n]*?\*["“]([^*\n]+?)["”]\*/gm

/**
 * Le citazioni di una nota, nell'ordine:
 * - i blocchi `>` dentro le sezioni (non quelli in testa alla nota, che sono avvertenze; non gli avvisi `> [!…]`);
 *   dentro un blocco proposta, le sue citazioni (`> >`) contano, marcate come proposta;
 * - nelle ricerche, i passi di `## Trovato` scritti come `**riferimento.** *"testo"*`.
 */
export function citazioniDi(n: Pick<Nota, 'corpo' | 'tipo'>): Citazione[] {
  const out: Citazione[] = []
  const tutti = blocchi(n.corpo).filter((b) => b.sezione)
  for (const b of tutti) {
    if (b.tipo === 'citazione') {
      const testo = testoCitazione(b.righe)
      if (testo) out.push({ testo, riferimento: null, proposta: false })
    } else if (b.tipo === 'proposta') {
      for (const d of blocchi(b.righe.join('\n'))) {
        if (d.tipo !== 'citazione') continue
        const testo = testoCitazione(d.righe)
        if (testo) out.push({ testo, riferimento: null, proposta: true })
      }
    }
  }
  if (n.tipo === 'ricerca') {
    for (const b of tutti) {
      if (b.sezione !== 'Trovato' || (b.tipo !== 'testo' && b.tipo !== 'proposta')) continue
      for (const [, rif, testo] of b.righe.join('\n').matchAll(PASSO_TROVATO)) {
        out.push({ testo: testo.trim(), riferimento: rif.trim(), proposta: b.tipo === 'proposta' })
      }
    }
  }
  return out
}
