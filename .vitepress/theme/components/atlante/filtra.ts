// I dati dell'Atlante dei concetti (schema v2, quello del prototipo) e il filtro delle proposte di Claude.
// Di default il sito mostra solo ciò che è validato; con l'interruttore "proposte" acceso passa tutto
// e il motore disegna le proposte nel rosso della rubrica, tratteggiate.
//
// I marcatori delle proposte:
// - sul nodo `validata: false`: la nota stessa è una proposta;
// - sul nodo `domandeProposte: [id]`: le domande (anche in `domande`) assegnate da Claude, da validare;
// - sul legame `proposto: true`: il collegamento è una proposta (i collegamenti di migrazione, ecc.);
// - sulla domanda `coroProposto: true`: il coro intero è una scelta di Claude;
// - `validata: false` vale anche su domande, discipline, filoni e costellazioni (percorsi).

export interface CitazioneAtlante {
  testo: string
  fonte?: string
  verificata?: boolean
}

export interface DomandaAtlante {
  id: string
  nome: string
  sottotitolo?: string
  descrizione?: string
  /** Gli id dei nodi del coro; se manca, il motore lo compone dalle citazioni. */
  coro?: string[]
  coroProposto?: boolean
  validata?: boolean
}

export interface DisciplinaAtlante {
  id: string
  nome: string
  descrizione?: string
  validata?: boolean
}

export interface FiloneAtlante {
  id: string
  disciplina: string
  nome: string
  motto?: string
  periodo?: string
  validata?: boolean
}

export interface NodoAtlante {
  id: string
  nome: string
  tipo: string
  disciplina?: string | null
  filone?: string | null
  descrizione?: string
  /** Il percorso della nota nel sito (senza base), es. /concetti/amor-fati. */
  url?: string
  archivio?: boolean
  domande?: string[]
  domandeProposte?: string[]
  anno?: number | string | null
  citazione?: CitazioneAtlante
  validata?: boolean
}

export interface LegameAtlante {
  da: string
  a: string
  tipo?: string
  proposto?: boolean
}

export interface CostellazioneAtlante {
  id: string
  nome: string
  nodi: string[]
  descrizione?: string
  validata?: boolean
}

export interface DatiAtlante {
  domande: DomandaAtlante[]
  discipline: DisciplinaAtlante[]
  filoni?: FiloneAtlante[]
  nodi: NodoAtlante[]
  legami: LegameAtlante[]
  costellazioni?: CostellazioneAtlante[]
  _meta?: Record<string, unknown>
}

const valida = (x: { validata?: boolean }) => x.validata !== false

/**
 * Con `mostraProposte` i dati passano così come sono. Senza, restano solo le cose validate: via i nodi
 * `validata: false`, i legami `proposto: true` o con un capo tolto, le domande in `domandeProposte`,
 * le voci di coro e di costellazione tolte (e il coro intero se `coroProposto`). Non modifica `dati`.
 */
export function filtra(dati: DatiAtlante, mostraProposte: boolean): DatiAtlante {
  if (mostraProposte) return dati
  const domande = (dati.domande ?? []).filter(valida)
  const qIds = new Set(domande.map((q) => q.id))
  const nodi = (dati.nodi ?? []).filter(valida).map((n) => {
    const proposte = new Set(n.domandeProposte ?? [])
    const { domandeProposte: _, ...resto } = n
    return { ...resto, domande: (n.domande ?? []).filter((q) => qIds.has(q) && !proposte.has(q)) }
  })
  const byId = new Map(nodi.map((n) => [n.id, n]))
  // una voce del coro resta se il suo nodo resta e la sua risposta a quella domanda non è una proposta
  const proposta = new Map((dati.nodi ?? []).map((n) => [n.id, new Set(n.domandeProposte ?? [])]))
  const risponde = (id: string, q: string) => byId.has(id) && !proposta.get(id)?.has(q)
  const filoni = (dati.filoni ?? []).filter(valida)
  return {
    ...dati,
    domande: domande.map((q) => {
      const { coroProposto, ...resto } = q
      if (!Array.isArray(q.coro)) return resto
      return { ...resto, coro: coroProposto ? [] : q.coro.filter((id) => risponde(id, q.id)) }
    }),
    discipline: (dati.discipline ?? []).filter(valida),
    filoni,
    nodi: nodi.map((n) => (n.filone && !filoni.some((f) => f.id === n.filone) ? { ...n, filone: null } : n)),
    legami: (dati.legami ?? []).filter((l) => l.proposto !== true && byId.has(l.da) && byId.has(l.a)),
    costellazioni: (dati.costellazioni ?? [])
      .filter(valida)
      .map((c) => ({ ...c, nodi: c.nodi.filter((id) => byId.has(id)) })),
  }
}
