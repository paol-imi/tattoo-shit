// Tipi di nota, gruppi, stati e origini: i nomi e le etichette che il sito mostra.
// Una sola fonte per configurazione, data loader, componenti Vue e scripts/verifica.mjs. Niente Node qui.

/** Il tipo di una nota che non lo dichiara, dalla sua cartella. */
const TIPO_DA_CARTELLA: Readonly<Record<string, string>> = {
  emozioni: 'emozione', concetti: 'concetto', fonti: 'fonte', simboli: 'simbolo', stile: 'stile',
  percorsi: 'percorso', spunti: 'spunto', idee: 'idea', ricerche: 'ricerca', diario: 'diario', inbox: 'inbox',
  _archivio: 'archivio',
}

/** Il tipo di una nota: quello dichiarato nel frontmatter o, se manca, quello della sua cartella. */
export function tipoDi(rel: string, dichiarato?: unknown): string {
  if (dichiarato) return String(dichiarato)
  if (rel === 'nucleo.md') return 'nucleo'
  return TIPO_DA_CARTELLA[rel.split('/')[0]] ?? 'altro'
}

/** I gruppi della barra laterale e dei backlink, al plurale, nell'ordine in cui compaiono. */
export const ETICHETTE_GRUPPO: Readonly<Record<string, string>> = {
  nucleo: 'Nucleo', percorso: 'Percorsi', idea: 'Idee', spunto: 'Spunti', ricerca: 'Ricerche', emozione: 'Emozioni',
  concetto: 'Concetti', fonte: 'Fonti', simbolo: 'Simboli', stile: 'Stile', inbox: 'Inbox',
  diario: 'Diario', archivio: 'Archivio',
}
export const ORDINE_GRUPPI = Object.keys(ETICHETTE_GRUPPO)

/** Il tipo di una nota, al singolare (riga in testa alla nota, carte, mappa, Da validare). */
export const ETICHETTE_TIPO: Readonly<Record<string, string>> = {
  nucleo: 'Nucleo', percorso: 'Percorso', idea: 'Idea', spunto: 'Spunto', ricerca: 'Ricerca', emozione: 'Emozione',
  concetto: 'Concetto', fonte: 'Fonte', simbolo: 'Simbolo', stile: 'Stile', diario: 'Diario',
}

/** I campi del frontmatter che collegano a un'altra nota, con il tipo della nota di arrivo. */
export const CAMPI_LINK: Readonly<Record<string, string>> = {
  emozioni: 'emozione', concetti: 'concetto', fonti: 'fonte', simboli: 'simbolo', stile: 'stile',
  percorsi: 'percorso', spunti: 'spunto', idee: 'idea', ricerche: 'ricerca',
}

/** I tipi che stanno sulla mappa (e hanno una provenienza): quelli collegabili dal frontmatter, più il nucleo. */
export const TIPI_MAPPA: ReadonlySet<string> = new Set([...Object.values(CAMPI_LINK), 'nucleo'])

/** Le sottocartelle di `fonti/`, con il nome da mostrare. */
export const SOTTOCARTELLE_FONTI: readonly (readonly [string, string])[] = [
  ['pensiero', 'Pensiero'], ['sacro-e-mito', 'Sacro e mito'], ['opere', 'Opere'], ['arte', 'Arte'],
]

// --- stati
/** Gli stati di un'idea, dal più maturo al seme. */
export const STATI = ['tatuata', 'scelta', 'forte', 'in-esplorazione', 'seme']
/** Gli stati delle idee come titoli di gruppo (barra laterale, home). */
export const ETICHETTE_STATO: Readonly<Record<string, string>> = {
  tatuata: 'Tatuate', scelta: 'Scelte', forte: 'Forti', 'in-esplorazione': 'In esplorazione', seme: 'Semi',
}
/** Gli stati di uno spunto. */
export const STATI_SPUNTO = ['esplorato', 'grezzo', 'confluito']
/** Le ricerche (piste da esplorare): prima quelle aperte. */
export const STATI_RICERCA = ['in-corso', 'da-fare', 'fatta']
export const ETICHETTE_STATO_RICERCA: Readonly<Record<string, string>> = {
  'in-corso': 'In corso', 'da-fare': 'Da fare', fatta: 'Fatte',
}
/** Uno stato (o un formato) come si legge in una riga: "in-esplorazione" → "in esplorazione". */
export const leggibile = (s: unknown) => String(s).replace(/-/g, ' ')

// --- provenienza
// Nel frontmatter: `origine` (seme | mia | claude) e `validata` (true | false).
// Obbligatori su spunti, idee e ricerche; sulle note di mappa valgono, se mancano, seme e true.
export const ORIGINI = ['seme', 'mia', 'claude']
/** I tipi per cui origine e validata sono obbligatori. */
export const TIPI_TERRITORIO: ReadonlySet<string> = new Set(['spunto', 'idea', 'ricerca'])
export const ETICHETTE_ORIGINE: Readonly<Record<string, string>> = {
  seme: 'dal seme', mia: 'tua', claude: 'proposta di Claude',
}
/** L'origine di una nota non ancora validata, come la dice la riga in testa alla nota. */
export const ETICHETTE_ORIGINE_DA_VALIDARE: Readonly<Record<string, string>> = {
  seme: 'dal seme, proposta di Claude', mia: 'tua', claude: 'proposta di Claude',
}
