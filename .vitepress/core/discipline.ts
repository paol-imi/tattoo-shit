// Lo schema dell'atlante dei concetti: i filoni delle discipline, la citazione di una nota e i campi
// di classificazione delle fonti (anno, filone, autore, influenzato-da). Solo lettura, niente disco.
// La disciplina e la forma di una fonte: disciplinaDi e formaDi in ../shared/tipi.ts.
import { memo, testoFm, listaFm, type Archivio, type Nota } from './archivio.ts'
import { blocchi } from './blocchi.ts'
import { trovaSezione, testoCitazione, testoSemplice } from './testo.ts'

// --- filoni: nella nota di una disciplina, sezione `## Filoni`, una riga per filone, formato fisso:
//   - **Stoicismo** (`stoa`, III a.C.–II d.C.): *motto*
export interface Filone {
  id: string
  /** lo slug della disciplina (la nota in `discipline/`) */
  disciplina: string
  nome: string
  periodo: string | null
  motto: string | null
}

const RIGA_FILONE = /^[-*]\s+\*\*(.+?)\*\*\s+\(`([^`]+)`(?:,\s*([^)]*?))?\)(?::\s*\*(.+?)\*)?\s*$/
const VOCE = /^\s*[-*]\s/

/** Le note delle discipline (in `discipline/`, fuori dall'archivio). */
export const noteDiscipline = (a: Archivio): Nota[] =>
  a.note.filter((n) => !n.archiviata && n.rel.startsWith('discipline/'))

/** I filoni di una nota disciplina, nell'ordine in cui li elenca. */
export function filoniDi(n: Nota): Filone[] {
  const out: Filone[] = []
  for (const riga of (trovaSezione(n.corpo, 'Filoni') ?? '').split('\n')) {
    const m = riga.trim().match(RIGA_FILONE)
    if (m) out.push({ id: m[2].trim(), disciplina: n.slug, nome: m[1].trim(), periodo: m[3]?.trim() || null, motto: m[4]?.trim() || null })
  }
  return out
}

/** Le voci di `## Filoni` che non seguono il formato fisso (per scripts/verifica.mjs). */
export function righeFiloniIllegibili(n: Nota): string[] {
  return (trovaSezione(n.corpo, 'Filoni') ?? '').split('\n').filter((r) => VOCE.test(r) && !RIGA_FILONE.test(r.trim()))
}

/** Tutti i filoni dell'archivio, disciplina per disciplina. */
export const filoni = (a: Archivio): Filone[] => memo(a, 'filoni', () => noteDiscipline(a).flatMap(filoniDi))

// --- citazione: sezione `## Citazione`, prima di `## Collegamenti`
//   > Testo breve della citazione.
//
//   — Fonte (opera, capitolo/anno)
// Su una nota validata, una citazione scelta da Claude sta dentro un blocco proposta.
export interface CitazioneNota {
  testo: string
  /** la riga della fonte, senza il trattino iniziale e senza "(da verificare)" */
  fonte: string | null
  daVerificare: boolean
  /** vero se sta dentro un blocco proposta */
  proposta: boolean
}

const DA_VERIFICARE = /\s*\(da verificare\)/i
const RIGA_FONTE = /^\s*(?:—|–|--)\s*(.+)$/

/** La citazione di una nota, dalla sezione `## Citazione`; null se la sezione manca o non ha una citazione `>`. */
export function citazioneDi(n: Pick<Nota, 'corpo'>): CitazioneNota | null {
  const sez = trovaSezione(n.corpo, 'Citazione')
  if (sez == null) return null
  let parti = blocchi(sez)
  const blocco = parti.find((b) => b.tipo === 'proposta')
  if (blocco) parti = blocchi(blocco.righe.join('\n'))
  const cit = parti.find((b) => b.tipo === 'citazione')
  if (!cit) return null
  const testo = testoCitazione(cit.righe)
  if (!testo) return null
  const rigaFonte = parti.filter((b) => b.tipo === 'testo').flatMap((b) => b.righe).map((r) => r.match(RIGA_FONTE)?.[1]).find(Boolean)
  const daVerificare = DA_VERIFICARE.test(rigaFonte ?? '') || DA_VERIFICARE.test(sez)
  const fonte = rigaFonte ? testoSemplice(rigaFonte.replace(DA_VERIFICARE, '')).trim() || null : null
  return { testo, fonte, daVerificare, proposta: !!blocco }
}

// --- campi di classificazione (non sono collegamenti: non vanno in `## Collegamenti`)
/** L'anno (intero, negativo = a.C.), o null se manca o non è un intero. */
export function annoDi(n: Pick<Nota, 'fm'>): number | null {
  const v = testoFm(n.fm.anno)
  return v != null && /^-?\d+$/.test(v.trim()) ? Number(v) : null
}
/** L'id del filone, o null. */
export const filoneDi = (n: Pick<Nota, 'fm'>): string | null => testoFm(n.fm.filone)
/** Gli autori di un'opera: slug già presenti in `fonti` (legami "autore-di"). */
export const autoriDi = (n: Pick<Nota, 'fm'>): string[] => [...new Set(listaFm(n.fm.autore))]
/** Chi ha influenzato la nota: slug già presenti nei campi di collegamento (legami "influenza"). */
export const influenzatoDaDi = (n: Pick<Nota, 'fm'>): string[] => [...new Set(listaFm(n.fm['influenzato-da']))]
