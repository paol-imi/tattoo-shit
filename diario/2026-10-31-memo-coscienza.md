---
tipo: diario
titolo: "Memo-coscienza: progettare un archivio oltre i tatuaggi"
data: 2026-10-31
---

# Memo-coscienza: progettare un archivio oltre i tatuaggi

## Cosa abbiamo fatto

Voglio espandere l'archivio oltre i tatuaggi: una base di conoscenza personale, **un memo che mappa una coscienza**. L'esempio: uno spezzone di Galimberti mandato dal telefono, che si collega da solo all'autore, alla citazione e ai temi; poi domande come "canzoni su questo tema" o "le migliori citazioni di Dostoevskij".

**Il metodo:** questa chat ha fatto da coordinatore. Quattro sessioni parallele (cervello e schema, domande, acquisizione, migrazione), poi una critica incrociata tra i quattro lavori, poi una quinta sessione di sintesi.

**L'esito:** la [proposta unica](/_progetto/proposta.md), più i quattro documenti di progettazione in `_progetto/` (`schema.md`, `domande.md`, `acquisizione.md`, `migrazione.md`). Le decisioni principali:

- un **repo nuovo e privato**; tattoo-shit resta il progetto dei tatuaggi;
- il **frammento datato** come porta d'ingresso di tutto;
- le **citazioni come note proprie**;
- un solo tipo **tema**;
- i **legami nel frontmatter**, con gli inversi generati;
- un **MVP senza sito né MCP** (skill `/memo` e una CLI), in circa due giorni.

**Le citazioni:** ho verificato 24 citazioni dell'Atlante sul testo, con un subagent per ognuna. 14 sono verificate, 9 simili e in Yalom la frase viene da Forster. Ho corretto la `## Citazione` delle note, tenendo le proposte nei loro blocchi: il dettaglio è in [Correzioni delle citazioni](/_progetto/v2/correzioni-citazioni.md).

## Domande aperte

- Il nome del nuovo repo: ci penso io.
- Nel frattempo si lavora su un branch orfano, `memo-staging`, senza contenuti personali, perché tattoo-shit è pubblico.
- Il prompt di avvio per una nuova chat sta in [Avvio dell'MVP](/_progetto/avvio.md).
