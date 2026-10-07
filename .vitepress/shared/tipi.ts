// Tipi di nota, gruppi, stati e origini: i nomi e le etichette che il sito mostra.
// Una sola fonte per configurazione, data loader, componenti Vue e scripts/verifica.mjs. Niente Node qui.

/** Il tipo di una nota che non lo dichiara, dalla sua cartella. */
const TIPO_DA_CARTELLA: Readonly<Record<string, string>> = {
  domande: 'domanda', discipline: 'disciplina',
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
  nucleo: 'Nucleo', domanda: 'Domande', disciplina: 'Discipline', percorso: 'Percorsi', idea: 'Idee', spunto: 'Spunti', ricerca: 'Ricerche', emozione: 'Emozioni',
  concetto: 'Concetti', fonte: 'Fonti', simbolo: 'Simboli', stile: 'Stile', inbox: 'Inbox',
  diario: 'Diario', archivio: 'Archivio',
}
export const ORDINE_GRUPPI = Object.keys(ETICHETTE_GRUPPO)

/** Il tipo di una nota, al singolare (riga in testa alla nota, carte, mappa, Da validare). */
export const ETICHETTE_TIPO: Readonly<Record<string, string>> = {
  nucleo: 'Nucleo', domanda: 'Domanda', disciplina: 'Disciplina', percorso: 'Percorso', idea: 'Idea', spunto: 'Spunto', ricerca: 'Ricerca', emozione: 'Emozione',
  concetto: 'Concetto', fonte: 'Fonte', simbolo: 'Simbolo', stile: 'Stile', diario: 'Diario',
}

/** I campi del frontmatter che collegano a un'altra nota, con il tipo della nota di arrivo. */
export const CAMPI_LINK: Readonly<Record<string, string>> = {
  domande: 'domanda', emozioni: 'emozione', concetti: 'concetto', fonti: 'fonte', simboli: 'simbolo', stile: 'stile',
  percorsi: 'percorso', spunti: 'spunto', idee: 'idea', ricerche: 'ricerca',
}

/** I tipi che stanno sulla mappa (e hanno una provenienza): quelli collegabili dal frontmatter, più il nucleo e le discipline. */
export const TIPI_MAPPA: ReadonlySet<string> = new Set([...Object.values(CAMPI_LINK), 'nucleo', 'disciplina'])
/** I tipi di nota che diventano nodi dell'Atlante dei concetti (la pagina Mappa); le domande vi stanno a parte. */
export const TIPI_NODO_ATLANTE: ReadonlySet<string> = new Set(['emozione', 'concetto', 'fonte', 'simbolo', 'idea', 'spunto', 'ricerca'])

/** Le sottocartelle di `fonti/`, con il nome da mostrare. */
export const SOTTOCARTELLE_FONTI: readonly (readonly [string, string])[] = [
  ['pensiero', 'Pensiero'], ['sacro-e-mito', 'Sacro e mito'], ['opere', 'Opere'], ['arte', 'Arte'],
  ['psicologia', 'Psicologia'], ['scienza', 'Scienza'],
]

// --- discipline, forme e filoni (le note in `discipline/`, il campo `disciplina` sulle fonti)
/** Le discipline: lo slug della nota in `discipline/` e il nome da mostrare. */
export const DISCIPLINE: readonly { readonly id: string; readonly nome: string }[] = [
  { id: 'filosofia', nome: 'Filosofia' },
  { id: 'psicologia', nome: 'Psicologia' },
  { id: 'religioni-e-mito', nome: 'Religioni e mito' },
  { id: 'letteratura', nome: 'Letteratura e poesia' },
  { id: 'arte', nome: 'Arte' },
  { id: 'cinema-e-serie', nome: 'Cinema, serie e fumetto' },
  { id: 'scienza', nome: 'Scienza' },
]
/** La disciplina di una fonte che non la dichiara, dalla sua sottocartella (le opere la dichiarano sempre). */
export const DISCIPLINA_DA_CARTELLA: Readonly<Record<string, string>> = {
  pensiero: 'filosofia', 'sacro-e-mito': 'religioni-e-mito', arte: 'arte', psicologia: 'psicologia', scienza: 'scienza',
}
/** Le forme di una fonte: chi ha pensato, che cosa è stato fatto, un racconto sacro, un'idea. */
export const FORME = ['autore', 'opera', 'mito', 'concetto']
/** La forma di una fonte che non la dichiara, dalla sua sottocartella. */
export const FORMA_DA_CARTELLA: Readonly<Record<string, string>> = {
  pensiero: 'autore', psicologia: 'autore', scienza: 'autore', opere: 'opera', arte: 'opera', 'sacro-e-mito': 'mito',
}

const primo = (v: unknown): string | null => {
  const x = Array.isArray(v) ? v[0] : v
  return x == null || x === '' ? null : String(x)
}
/** La sottocartella di una fonte (`fonti/pensiero/x.md` → pensiero), o null se non è una fonte. */
const sottocartellaFonte = (rel: string): string | null => {
  const parti = rel.split('/')
  return parti[0] === 'fonti' && parti.length > 2 ? parti[1] : null
}

/**
 * La disciplina di una nota (slug di una nota in `discipline/`): quella dichiarata o, se manca, quella della
 * sottocartella delle fonti. Solo le fonti ne hanno una: per le altre note vale null.
 */
export function disciplinaDi(rel: string, fm: Readonly<Record<string, unknown>>): string | null {
  const cartella = sottocartellaFonte(rel)
  if (cartella == null) return null
  return primo(fm.disciplina) ?? DISCIPLINA_DA_CARTELLA[cartella] ?? null
}

/** La forma di una fonte (autore | opera | mito | concetto): quella dichiarata o quella della sottocartella; null per le altre note. */
export function formaDi(rel: string, fm: Readonly<Record<string, unknown>>): string | null {
  const cartella = sottocartellaFonte(rel)
  if (cartella == null) return null
  return primo(fm.forma) ?? FORMA_DA_CARTELLA[cartella] ?? null
}

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
