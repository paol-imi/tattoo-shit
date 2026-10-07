// Logica sulle note che serve sia a Node (configurazione, data loader, scripts/verifica.mjs) sia al browser.
// Niente dipendenze da Node qui: i componenti Vue lo importano.

/** Chi ha portato una cosa e se l'ho approvata. */
export interface Provenienza { origine: string; validata: boolean }

/**
 * La provenienza dal frontmatter. Il sito guarda solo `validata`: "mia" è sempre validata, ma "seme" no
 * (il seme l'ha compilato Claude in chat, e le sue idee sono proposte da validare) e "claude" parte da false.
 * Se mancano: origine "seme"; validata vera, tranne che per le proposte di Claude.
 */
export function provenienza(fm: Readonly<Record<string, unknown>>): Provenienza {
  const origine = String(fm.origine || 'seme')
  const v = fm.validata
  return { origine, validata: v == null ? origine !== 'claude' : String(v) === 'true' }
}

/** Lo slug dall'indirizzo di una nota (`/idee/grimorio/index.md#x` → grimorio, `/fonti/opere/x.md` → x). */
export function slugDaUrl(u: string): string {
  const parti = u.split('#')[0].replace(/\/$/, '').split('/')
  const ultimo = parti[parti.length - 1]
  return /^(index|README)\.md$/.test(ultimo) ? parti[parti.length - 2] : ultimo.replace(/\.md$/, '')
}

/** Lo slug dal percorso di una nota dalla radice (`idee/grimorio/index.md` → grimorio). */
export const slugDaRel = (rel: string) => slugDaUrl('/' + rel)

/**
 * La risonanza di un'idea (quanto mi colpisce "a pancia"): un intero da 1 a 5, oppure null.
 * Accetta il valore grezzo del frontmatter (stringa, numero, vuoto); fuori scala vale null.
 */
export function risonanzaDi(v: unknown): number | null {
  if (v == null || v === '') return null
  const r = Math.round(Number(v))
  return r >= 1 && r <= 5 ? r : null
}

/** La risonanza come pallini pieni e vuoti, su 5. */
export const pallini = (r: number) => '●'.repeat(r) + '○'.repeat(5 - r)
