// Il corpo di una nota diviso in blocchi, e l'unico riconoscitore del blocco "proposta di Claude" nel testo.
// Lo usano i data loader (proposte, citazioni, vista validata) e scripts/verifica.mjs; il plugin markdown
// (../proposta.ts) riconosce lo stesso blocco sui token, con la stessa etichetta, e verifica.mjs controlla
// che i due conteggi coincidano.
//
// Il blocco proposta, nel markdown, è un avviso GitHub di tipo NOTE (non dentro un'altra citazione) con
// l'etichetta sulla riga subito dopo `[!NOTE]`, nello stesso paragrafo (come lo vede markdown-it):
//   > [!NOTE]
//   > **Proposta di Claude, da validare.**
//   >
//   > il testo proposto…
import { ETICHETTA_PROPOSTA } from '../shared/proposte.ts'

/**
 * La riga che apre un avviso GitHub (già senza `>`), come la riconosce VitePress: `[!TIPO]`, eventualmente
 * seguito da un titolo; il gruppo 1 è il tipo.
 */
const AVVISO = /^\[!(TIP|NOTE|INFO|IMPORTANT|WARNING|CAUTION|DANGER)\]/i
const RECINTO = /^\s*(```|~~~)/
const senzaQuota = (riga: string) => riga.replace(/^>[ \t]?/, '')

/** Un pezzo di corpo: testo, una citazione (`>`), un avviso (`> [!…]`) o un blocco proposta, con la sezione in cui sta. */
export interface Blocco {
  tipo: 'testo' | 'citazione' | 'avviso' | 'proposta'
  /** le righe senza `>`; in un blocco proposta, senza l'avviso e l'etichetta */
  righe: string[]
  /** le righe com'erano nel corpo */
  grezze: string[]
  /** l'indice della prima riga nel corpo (da 0) */
  riga: number
  /** il titolo `##` della sezione in cui sta ('' prima del primo) */
  sezione: string
}

/** L'avviso con cui si apre un blocco di righe `>` (già senza `>`): il tipo in minuscolo e l'indice della riga. */
function avvisoIn(righe: readonly string[]): { tipo: string; i: number } | null {
  const i = righe.findIndex((x) => x.trim())
  const m = i >= 0 ? righe[i].trim().match(AVVISO) : null
  return m ? { tipo: m[1].toLowerCase(), i } : null
}

/** Il corpo diviso in blocchi. Le righe `>` consecutive (fuori dai blocchi di codice) fanno un blocco solo. */
export function blocchi(corpo: string): Blocco[] {
  const out: Blocco[] = []
  let sezione = ''
  let codice = false
  let cur: Blocco | null = null
  const chiudi = () => {
    if (!cur) return
    if (cur.tipo === 'citazione') {
      const avviso = avvisoIn(cur.righe)
      if (avviso) {
        const j = avviso.i + 1
        const etichetta = (cur.righe[j] ?? '').trim()
        if (avviso.tipo === 'note' && ETICHETTA_PROPOSTA.test(etichetta)) {
          const resto = etichetta.replace(ETICHETTA_PROPOSTA, '')
          cur = { ...cur, tipo: 'proposta', righe: [...(resto ? [resto] : []), ...cur.righe.slice(j + 1)] }
        } else cur = { ...cur, tipo: 'avviso' }
      }
    }
    out.push(cur)
    cur = null
  }
  corpo.split('\n').forEach((riga, i) => {
    if (RECINTO.test(riga)) codice = !codice
    const quota = !codice && riga.startsWith('>')
    if (!codice && !quota) {
      const h = riga.match(/^##\s+(.+?)\s*$/)
      if (h) { chiudi(); sezione = h[1] }
    }
    const tipo = quota ? 'citazione' : 'testo'
    if (cur && cur.tipo !== tipo) chiudi()
    cur ??= { tipo, righe: [], grezze: [], riga: i, sezione }
    cur.righe.push(quota ? senzaQuota(riga) : riga)
    cur.grezze.push(riga)
  })
  chiudi()
  return out
}

/** Un blocco proposta di una nota: il numero è quello dell'ancora #proposta-N sul sito. */
export interface Proposta { n: number; sezione: string; md: string }

/** I blocchi proposta di una nota, in ordine. */
export function proposteDi(corpo: string): Proposta[] {
  return blocchi(corpo)
    .filter((b) => b.tipo === 'proposta')
    .map((b, i) => ({ n: i + 1, sezione: b.sezione, md: b.righe.join('\n').trim() }))
}

/** Il corpo senza i blocchi proposta: la vista di default del sito. */
export function senzaProposte(corpo: string): string {
  return blocchi(corpo).filter((b) => b.tipo !== 'proposta').flatMap((b) => b.grezze).join('\n')
}

/**
 * Le etichette di proposta scritte male, per scripts/verifica.mjs: un `> [!NOTE]` seguito da "**Propost…"
 * che non è l'etichetta esatta, o l'etichetta non sulla riga subito dopo un `> [!NOTE]` (lì il sito non la vede).
 * `riga` è l'indice della riga nel corpo (da 0).
 */
export function etichetteSbagliate(corpo: string): { riga: number; senzaAvviso: boolean }[] {
  const out: { riga: number; senzaAvviso: boolean }[] = []
  for (const b of blocchi(corpo)) {
    if (b.tipo === 'testo') continue
    const righe = b.grezze.map(senzaQuota)
    const avviso = avvisoIn(righe)
    const prima = avviso?.tipo === 'note' ? avviso.i + 1 : -1
    righe.forEach((r, k) => {
      if (b.tipo === 'proposta' && k === prima) return // l'etichetta giusta
      if (k === prima && /^\*\*Propost/i.test(r.trim())) out.push({ riga: b.riga + k, senzaAvviso: false })
      else if (/^\*\*Proposta di Claude/.test(r.trim())) out.push({ riga: b.riga + k, senzaAvviso: true })
    })
  }
  return out
}
