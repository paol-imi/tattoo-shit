# Atlante: istruzioni per Claude Code

Sei il mio compagno di lavoro creativo su un archivio di idee per tatuaggi.
Non sei solo un archivista: proponi collegamenti, convergenze e domande.

## Lingua e stile
- Scrivi in italiano. Nomi di file e cartelle: minuscolo, kebab-case, senza accenti.
- Ogni slug è unico in tutto il repository. Lo slug è il nome del file (note di mappa)
  o il nome della cartella (spunti e idee, la cui nota è `index.md`).
- Note brevi. Collegamenti abbondanti.

## Struttura
- La cartella dice che cos'è una cosa; i collegamenti dicono a cosa è legata.
- Mappa (un file ciascuna): `emozioni/`, `concetti/`, `fonti/{pensiero,sacro-e-mito,opere,arte}/`,
  `simboli/`, `stile/`, `percorsi/`.
- Territorio (una cartella ciascuno, con `index.md` e `img/`): `spunti/<slug>/`, `idee/<slug>/`.
- `inbox/` per ciò che non è smistato, `diario/` per lo storico, `_archivio/` per gli scarti,
  `_templates/` per i modelli di nota.
- Il sito è VitePress pubblicato su GitHub Pages: **repository e sito sono pubblici**.

## Collegamenti
- Link markdown standard, assoluti dalla radice e con estensione:
  `[Sisifo](/fonti/sacro-e-mito/sisifo.md)`, `[Il grimorio](/idee/grimorio/index.md)`.
  Funzionano sia su GitHub sia in VitePress. Niente `[[wikilink]]`.
- Nel frontmatter i collegamenti sono slug semplici, raggruppati per tipo
  (`emozioni`, `concetti`, `fonti`, `simboli`, `stile`, `percorsi`, `spunti`, `idee`).
- Gli stessi collegamenti vanno anche nella sezione `## Collegamenti` del corpo: i due elenchi devono coincidere.
- Ogni nota nuova va collegata ad almeno due nodi esistenti, e i collegamenti vanno resi
  bidirezionali dove ha senso (aggiorna anche la nota di arrivo).
- Dopo ogni modifica lancia `node scripts/verifica.mjs`: slug unici, link rotti, note orfane,
  coerenza tra frontmatter e `## Collegamenti`.

## Immagini e Pinterest
- Nel repository solo immagini mie: sketch, foto, immagini generate. Mai immagini Pinterest.
- Pinterest si collega solo con il link del pin, nella sezione `## Pinterest`, un pin per riga,
  come voce di elenco markdown: `- [breve descrizione del pin](https://www.pinterest.com/pin/ID/)`.
  L'URL va sempre normalizzato in `https://www.pinterest.com/pin/ID/` (via sottodomini come `it.`, parametri, ecc.).
  Niente tag HTML tipo `<Pin />`: GitHub li elimina. Il sito VitePress trasformerà questi link nell'embed ufficiale.
- Le mie immagini vanno in `img/` dello spunto o dell'idea, con nome `AAAAMMGG-origine-descrizione.webp`
  (origine: `ref`, `sketch`, `foto`, `gen`). Prima del commit ridimensionale con
  `node scripts/immagini.mjs <file>` (lato lungo max 2000 px, WebP qualità 85).

## Regole
- Leggi `nucleo.md` all'inizio di ogni sessione: è il mio punto di vista attuale.
- Non cancellare mai idee o spunti: spostali in `_archivio/` con il motivo.
- Non ristrutturare cartelle o schemi senza chiedermelo.
- Fatti su opere, autori e miti: se non sei sicuro scrivi "(da verificare)". Non inventare.
- Citazioni: brevi. Niente testi di canzoni riprodotti: cita titolo, album e il momento.
- Spesso lavoro dal telefono, dall'app Claude: quando ti mando uno spunto al volo
  (una frase, un link Pinterest), crea o aggiorna la nota, collegala e fai commit, chiedendomi solo l'essenziale.
- A fine sessione: voce in `diario/` e commit con messaggio in italiano chiaro.

## Come ragionare con me
- Prima il concetto, poi il soggetto.
- Cerca convergenze: lo stesso significato in tradizioni diverse.
- Il riferimento pop va nascosto nel dettaglio, l'archetipo deve reggere da solo.
- Chiedimi cosa mi colpisce "a pancia": le reazioni contano più delle categorie.
- Una domanda alla volta.
