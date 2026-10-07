// La vista "solo validato": ciò che il sito mostra di default.
// Le proposte di Claude (note non validate, blocchi proposta, collegamenti proposti) si vedono solo
// con l'interruttore "proposte" acceso, o nella pagina Da validare.
import { memo, perSlug, collegamentiFm, linkInterni, type Archivio } from './archivio.ts'
import { proposteDi } from './blocchi.ts'
import { testoSemplice } from './testo.ts'
import { provenienza, slugDaUrl } from '../shared/nota.ts'

// --- i collegamenti aggiunti da Claude in migrazione: una sola fonte, l'elenco nel diario della fase 1.
// Ogni voce è `- [A](…) → [B](…)` (o `↔`); quando la approvo o la tolgo prende in coda "— validato il …" o "— tolto il …".
export const DIARIO_MIGRAZIONE = 'diario/2026-10-04-fase-1.md'
export interface CollegamentoProposto { md: string; coppie: [string, string][] }

/** I collegamenti di migrazione ancora da validare. */
export function collegamentiProposti(a: Archivio): CollegamentoProposto[] {
  return memo(a, 'collegamentiProposti', () => {
    const diario = a.perRel.get(DIARIO_MIGRAZIONE)
    if (!diario) return []
    const righe = diario.corpo.split('\n')
    const i = righe.findIndex((r) => /^- Collegamenti aggiunti in migrazione/.test(r))
    if (i < 0) return []
    const out: CollegamentoProposto[] = []
    for (const r of righe.slice(i + 1)) {
      const m = r.match(/^\s{2,}[-*]\s+(.+)$/)
      if (!m) break
      const md = m[1].trim()
      if (/—\s*(validat[oa]|tolt[oa]) il/i.test(md)) continue
      const [sx, dx] = md.split(/\s[→↔]\s/)
      const slug = (s = '') => [...s.matchAll(/\]\(([^)\s]+)\)/g)].map((x) => slugDaUrl(x[1]))
      const coppie: [string, string][] = []
      for (const da of slug(sx)) for (const verso of slug(dx)) coppie.push([da, verso])
      out.push({ md, coppie })
    }
    return out
  })
}

/** La chiave di un collegamento, senza verso. */
export const chiaveCoppia = (a: string, b: string) => (a < b ? `${a}|${b}` : `${b}|${a}`)

export interface Proposte {
  /** gli slug delle note non validate (fuori dall'archivio) */
  nonValidate: ReadonlySet<string>
  /** i collegamenti proposti (chiaveCoppia): quelli di migrazione e quelli nati da un blocco proposta */
  coppie: ReadonlySet<string>
}

// dentro un blocco proposta, la frase "Fanno parte della proposta anche questi collegamenti: …"
// nomina (per titolo o con un link) i collegamenti del frontmatter nati solo dalla proposta
const FANNO_PARTE = /fanno parte della proposta/i

/** Tutto ciò che è proposta di Claude e non è ancora validato, per la vista di default del sito. */
export function proposte(a: Archivio): Proposte {
  return memo(a, 'proposte', () => {
    const attive = a.note.filter((n) => !n.archiviata)
    const attivePerSlug = perSlug(a)
    const nonValidate = new Set(attive.filter((n) => !provenienza(n.fm).validata).map((n) => n.slug))
    const coppie = new Set<string>()
    for (const c of collegamentiProposti(a)) for (const [da, verso] of c.coppie) coppie.add(chiaveCoppia(da, verso))
    for (const n of attive) {
      const fm = new Set(Object.values(collegamentiFm(n)).flat())
      for (const p of proposteDi(n.corpo)) {
        for (const par of p.md.split(/\n\s*\n/)) {
          if (!FANNO_PARTE.test(par)) continue
          const testo = testoSemplice(par).replace(/\s+/g, ' ')
          const linkati = new Set(linkInterni(n.rel, par).map((rel) => a.perRel.get(rel)?.slug))
          for (const s of fm) {
            const d = attivePerSlug.get(s)
            if (d && (linkati.has(s) || testo.includes(d.titolo))) coppie.add(chiaveCoppia(n.slug, s))
          }
        }
      }
    }
    return { nonValidate, coppie }
  })
}

/** Vero se il collegamento da `a` a `b` è una proposta (nota d'arrivo non validata, o collegamento proposto). */
export const collegamentoProposto = (p: Proposte, a: string, b: string) =>
  p.nonValidate.has(b) || p.nonValidate.has(a) || p.coppie.has(chiaveCoppia(a, b))
