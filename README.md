# Atlante

Repository personale di idee, pensieri e sketch per tatuaggi.

*Atlante* è il titano che regge il cielo sulle spalle, ed è anche una raccolta di mappe.

## Perché esiste

Le idee erano sparse tra Pinterest, chat, appunti e immagini generate. Qui stanno in un unico luogo, collegate tra loro, con uno storico.

**Da dove partire:** [il nucleo](nucleo.md), cioè chi sono ora e cosa cerco, e il percorso principale, [il peso → lo sguardo → l'oltre](percorsi/peso-sguardo-oltre.md).

## Principi

- **Il concetto viene prima del soggetto.** Si parte dal significato, poi si cerca l'immagine.
- **Non vincolante.** Se una cosa non sta in nessuna categoria va bene comunque: esiste [inbox](inbox/).
- **Niente si cancella.** Le idee scartate si archiviano con il motivo, in [_archivio](_archivio/).
- **Il tatuaggio racconta il viaggio, non la tappa.** Le idee migliori resteranno vere anche quando sarò approdato altrove.
- **Le convergenze valgono più delle citazioni.** Il simbolo più forte è quello in cui tradizioni diverse arrivano alla stessa verità per strade diverse (vedi [l'ouroboros](simboli/ouroboros.md)).
- **Il riferimento pop si nasconde nel dettaglio.** Serie, anime, film e canzoni come porta d'ingresso verso un archetipo più antico.
- **Note brevi, collegamenti tanti.**

## Come navigare

> La cartella dice che cos'è una cosa. I collegamenti dicono a cosa è legata.

**La mappa**: note brevi, i nodi del grafo.

| Cartella | Contenuto |
|---|---|
| [emozioni/](emozioni/) | stati interiori: dolore, vuoto, lucidità, meraviglia… |
| [concetti/](concetti/) | idee filosofiche e temi: assurdo, amor fati, soglia… |
| [fonti/](fonti/) | da dove vengono le cose: [pensiero](fonti/pensiero/), [sacro e mito](fonti/sacro-e-mito/), [opere](fonti/opere/), [arte](fonti/arte/) |
| [simboli/](simboli/) | motivi visivi: ouroboros, velo, porta, occhi… |
| [stile/](stile/) | tecniche e composizione: incisione, patchwork… |
| [percorsi/](percorsi/) | fili narrativi che attraversano tutto |

**Il territorio**: dove si lavora davvero.

| Cartella | Contenuto |
|---|---|
| [spunti/](spunti/) | scintille: un frammento preciso che mi ha colpito |
| [idee/](idee/) | proposte di tatuaggio, dove le dimensioni si incontrano |

E poi [inbox/](inbox/) per ciò che non è smistato, [diario/](diario/) per lo storico, [_templates/](_templates/) per i modelli di nota.

Ogni nota ha i collegamenti due volte: nel frontmatter (slug, per filtri e tabelle) e nella sezione `## Collegamenti` (link cliccabili). Le immagini Pinterest non stanno nel repository: si collegano con il link del pin e sul sito diventano embed.

## Strumenti

```sh
npm install                              # una volta sola
node scripts/verifica.mjs                # slug unici, link rotti, note orfane, riepilogo
node scripts/immagini.mjs <file…>        # ridimensiona le mie immagini (2000 px, WebP 85)
```

Le istruzioni permanenti per Claude Code sono in [CLAUDE.md](CLAUDE.md).

## Stato

- **Fase 1, fondamenta e migrazione:** fatta. 157 note nate dal [seme](diario/2026-10-04-seed.md), vedi il [diario](diario/2026-10-04-fase-1.md).
- **Fase 2, il sito:** VitePress su GitHub Pages, embed Pinterest, backlink.
- **Fase 3, Pinterest:** link alle board e triage.
- **Fase 4, le skill di Claude Code:** `/spunto`, `/idea`, `/triage`, `/convergenze`, `/diario`…
- **Fase 5, lavoro creativo:** ricorrente.

Le idee in esplorazione oggi: [il grimorio](idee/grimorio/index.md) e [il viandante oltre il firmamento](idee/viandante-oltre-il-firmamento/index.md).
