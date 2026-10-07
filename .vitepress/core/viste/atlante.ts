// Dati dell'Atlante dei concetti (la Mappa: Tavole, Ruota, Firmamento), schema v2, costruiti dalle note.
// - domande: le note in `domande/` (il coro: i link della sezione `## Coro`, in ordine);
// - discipline: le note in `discipline/`; filoni: le righe `## Filoni` delle discipline;
// - costellazioni: i percorsi;
// - nodi: le note di mappa (emozioni, concetti, fonti, simboli) e le idee, gli spunti e le ricerche, comprese le
//   non validate (marcate `validata: false`); stile e percorsi restano fuori (i percorsi sono le costellazioni);
// - legami: i collegamenti del frontmatter tra nodi, senza verso doppio, tipizzati da `autore` e `influenzato-da`.
// Il sito filtra lato client: di default solo il validato (nodi con `validata` vero, legami senza `proposto`,
// `domande` e non `domandeProposte`, citazioni senza `proposta`, coro senza `coroProposto`; `validata: false`
// facoltativo su domande, discipline, filoni e costellazioni), con l'interruttore "proposte" tutto.
import { memo, testoFm, listaFm, collegamentiFm, linkInterni, type Archivio, type Nota } from '../archivio.ts'
import { proposte, collegamentoProposto, chiaveCoppia } from '../proposte.ts'
import { blocchi, senzaProposte } from '../blocchi.ts'
import { trovaSezione, sintesi, testoSemplice } from '../testo.ts'
import { noteDiscipline, filoni, citazioneDi, annoDi, filoneDi, autoriDi, influenzatoDaDi } from '../discipline.ts'
import { disciplinaDi, formaDi, DISCIPLINE } from '../../shared/tipi.ts'
import { provenienza } from '../../shared/nota.ts'

export interface DomandaAtlante {
  id: string; nome: string; sottotitolo: string | null; descrizione: string
  /** gli slug delle voci del coro, in ordine */
  coro: string[]
  /** vero se il coro sta in un blocco proposta (scelta di Claude da validare) */
  coroProposto: boolean
  /** presente (false) solo se la nota non è validata */
  validata?: false
}
export interface DisciplinaAtlante { id: string; nome: string; descrizione: string; validata?: false }
/** validata: false se la nota della sua disciplina non è validata */
export interface FiloneAtlante { id: string; disciplina: string; nome: string; motto: string | null; periodo: string | null; validata?: false }
export interface CitazioneAtlante {
  testo: string; fonte: string | null
  /** falso se la fonte dice "(da verificare)" */
  verificata: boolean
  /** vero se la citazione sta in un blocco proposta */
  proposta: boolean
}
export interface NodoAtlante {
  id: string; nome: string
  /** slug della disciplina (solo le fonti), o null */
  disciplina: string | null
  filone: string | null
  /** autore | opera | mito | concetto per le fonti (la forma); emozione | concetto | simbolo | idea | spunto | ricerca per le altre */
  tipo: string
  anno?: number
  descrizione: string
  citazione?: CitazioneAtlante
  /** l'indirizzo della nota sul sito, senza base */
  url: string
  /** vero per le note nate prima dell'Atlante dei concetti (o non proposte da Claude) */
  archivio: boolean
  /** le domande collegate e approvate */
  domande: string[]
  /** le domande collegate da Claude, ancora da validare (collegamento proposto) */
  domandeProposte: string[]
  /** falso per le note proposte da Claude non ancora approvate */
  validata: boolean
}
export type TipoLegame = 'archivio' | 'tema' | 'influenza' | 'autore-di'
export interface LegameAtlante {
  /** autore-di: da = autore, a = opera; influenza: da = chi influenza, a = chi è influenzato */
  da: string; a: string; tipo: TipoLegame
  /** collegamento proposto da Claude, o con un capo non validato: visibile solo con le proposte accese */
  proposto?: true
}
export interface CostellazioneAtlante {
  id: string; nome: string; descrizione: string
  /** i nodi del percorso (frontmatter e corpo fuori dai blocchi proposta) */
  nodi: string[]
  /** i nodi legati al percorso da un collegamento proposto */
  nodiProposti: string[]
  validata?: false
}
export interface DatiAtlante {
  domande: DomandaAtlante[]
  discipline: DisciplinaAtlante[]
  filoni: FiloneAtlante[]
  nodi: NodoAtlante[]
  legami: LegameAtlante[]
  costellazioni: CostellazioneAtlante[]
}

/** I tipi di nota che diventano nodi. */
const TIPI_NODO: ReadonlySet<string> = new Set(['emozione', 'concetto', 'fonte', 'simbolo', 'idea', 'spunto', 'ricerca'])
/** L'ordine delle domande sulla ruota (le altre, se ne nascono, in coda). */
const ORDINE_DOMANDE = ['chi-sono', 'perche-soffro', 'che-senso-ha', 'come-vivere', 'cosa-posso-conoscere', 'cosa-c-e-oltre', 'come-stare-con-gli-altri', 'cosa-e-reale']
/** La posizione di un id in un ordine dato; gli id sconosciuti in coda. */
const posto = (ordine: readonly string[], id: string) => (ordine.indexOf(id) + 1 || ordine.length + 1)
const ORDINE_DISCIPLINE = DISCIPLINE.map((d) => d.id)

/** Da questa data le note proposte da Claude sono quelle nuove dell'Atlante dei concetti. */
const INIZIO_ATLANTE = '2026-10-07'

/** Una riga di descrizione: il primo paragrafo fuori dai blocchi proposta, fino a ~180 caratteri, tagliato a fine frase. */
function unaRiga(n: Nota): string {
  const corpo = senzaProposte(n.corpo)
  let t = sintesi(corpo)
  if (!t) for (const s of ['Concetto', 'Il frammento', 'Cosa cercare', 'Oggetto']) if ((t = sintesi(corpo, s))) break
  if (!t) t = testoFm(n.fm.oggetto) ?? ''
  t = testoSemplice(t).replace(/\*/g, '').replace(/\s+/g, ' ').trim()
  if (t.length <= 180) return t
  let out = ''
  for (const f of t.match(/[^.!?]+[.!?]+["”»)]?\s*/g) ?? []) { if ((out + f).length > 180) break; out += f }
  return out.trim() || t.slice(0, 177).replace(/\s+\S*$/, '') + '…'
}

/** `{ validata: false }` per una nota non validata, altrimenti niente (marcatore facoltativo). */
const marca = (n: Nota | undefined): { validata?: false } => (n && !provenienza(n.fm).validata ? { validata: false } : {})

/** Vero per le note nate prima dell'Atlante dei concetti o non proposte da Claude. */
const dArchivio = (n: Nota) =>
  provenienza(n.fm).origine !== 'claude' || (testoFm(n.fm.creato) ?? '') < INIZIO_ATLANTE

export const datiAtlante = (a: Archivio): DatiAtlante => memo(a, 'atlante', () => {
  const attive = a.note.filter((n) => !n.archiviata)
  const p = proposte(a)
  const slugDi = (rel: string) => a.perRel.get(rel)?.slug

  // --- domande, discipline, filoni
  const domande: DomandaAtlante[] = attive.filter((n) => n.tipo === 'domanda')
    .sort((x, y) => posto(ORDINE_DOMANDE, x.slug) - posto(ORDINE_DOMANDE, y.slug)).map((n) => {
    const coro = trovaSezione(n.corpo, 'Coro') ?? ''
    return {
      id: n.slug, nome: n.titolo, sottotitolo: testoFm(n.fm.sottotitolo), descrizione: sintesi(n.corpo),
      coro: linkInterni(n.rel, coro).map(slugDi).filter((s): s is string => !!s),
      coroProposto: blocchi(coro).some((b) => b.tipo === 'proposta'),
      ...marca(n),
    }
  })
  const idDomande = new Set(domande.map((d) => d.id))
  const noteDisc = [...noteDiscipline(a)].sort((x, y) => posto(ORDINE_DISCIPLINE, x.slug) - posto(ORDINE_DISCIPLINE, y.slug))
  const discipline: DisciplinaAtlante[] = noteDisc.map((n) => ({ id: n.slug, nome: n.titolo, descrizione: sintesi(n.corpo), ...marca(n) }))
  const filoniAtlante: FiloneAtlante[] = noteDisc.flatMap((d) => filoni(a).filter((f) => f.disciplina === d.slug)).map((f) => ({
    id: f.id, disciplina: f.disciplina, nome: f.nome, motto: f.motto, periodo: f.periodo, ...marca(noteDisc.find((n) => n.slug === f.disciplina)),
  }))

  // --- nodi
  const noteNodo = attive.filter((n) => TIPI_NODO.has(n.tipo))
  const nodi: NodoAtlante[] = []
  const perId = new Map<string, NodoAtlante>()
  for (const n of noteNodo) {
    const forma = n.tipo === 'fonte' ? formaDi(n.rel, n.fm) : null
    const anno = annoDi(n)
    const c = citazioneDi(n)
    const qs = [...new Set(listaFm(n.fm.domande))].filter((q) => idDomande.has(q))
    const nodo: NodoAtlante = {
      id: n.slug,
      nome: n.titolo,
      disciplina: disciplinaDi(n.rel, n.fm),
      filone: filoneDi(n),
      tipo: forma ?? n.tipo,
      ...(anno != null ? { anno } : {}),
      descrizione: unaRiga(n),
      ...(c ? { citazione: { testo: c.testo, fonte: c.fonte, verificata: !c.daVerificare, proposta: c.proposta } } : {}),
      url: n.link,
      archivio: dArchivio(n),
      domande: qs.filter((q) => !p.coppie.has(chiaveCoppia(n.slug, q))),
      domandeProposte: qs.filter((q) => p.coppie.has(chiaveCoppia(n.slug, q))),
      validata: provenienza(n.fm).validata,
    }
    nodi.push(nodo)
    perId.set(nodo.id, nodo)
  }

  // --- legami: prima quelli tipizzati (autore-di, influenza), poi i collegamenti del frontmatter
  const legami = new Map<string, LegameAtlante>()
  const aggiungi = (da: string, verso: string, tipo: TipoLegame) => {
    if (da === verso || !perId.has(da) || !perId.has(verso)) return
    const k = chiaveCoppia(da, verso)
    if (legami.has(k)) return
    const l: LegameAtlante = { da, a: verso, tipo }
    if (collegamentoProposto(p, da, verso)) l.proposto = true
    legami.set(k, l)
  }
  for (const n of noteNodo) {
    for (const autore of autoriDi(n)) aggiungi(autore, n.slug, 'autore-di')
    for (const fonte of influenzatoDaDi(n)) aggiungi(fonte, n.slug, 'influenza')
  }
  for (const n of noteNodo) {
    for (const [campo, slugs] of Object.entries(collegamentiFm(n))) {
      if (campo === 'domande') continue
      for (const s of slugs) {
        const altro = perId.get(s)
        if (altro) aggiungi(n.slug, s, perId.get(n.slug)!.archivio && altro.archivio ? 'archivio' : 'tema')
      }
    }
  }

  // --- costellazioni: i percorsi, con i nodi che citano (frontmatter e corpo fuori dai blocchi proposta)
  const costellazioni: CostellazioneAtlante[] = attive.filter((n) => n.tipo === 'percorso').map((n) => {
    const daFm = Object.values(collegamentiFm(n)).flat()
    const daCorpo = linkInterni(n.rel, senzaProposte(n.corpo)).map(slugDi).filter((s): s is string => !!s)
    const ids = [...new Set([...daFm, ...daCorpo])].filter((s) => perId.has(s))
    const proposto = (s: string) => p.coppie.has(chiaveCoppia(n.slug, s))
    return {
      id: n.slug, nome: n.titolo, descrizione: unaRiga(n),
      nodi: ids.filter((s) => !proposto(s)), nodiProposti: ids.filter(proposto),
      ...marca(n),
    }
  })

  return { domande, discipline, filoni: filoniAtlante, nodi, legami: [...legami.values()], costellazioni }
})
