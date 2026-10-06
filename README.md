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
| [ricerche/](ricerche/) | piste da esplorare: un profilo, un libro, un artista; quello che ne nasce diventa spunto o idea |

E poi [inbox/](inbox/) per ciò che non è smistato, [diario/](diario/) per lo storico, [_templates/](_templates/) per i modelli di nota.

Ogni nota ha i collegamenti due volte: nel frontmatter (slug, per filtri e tabelle) e nella sezione `## Collegamenti` (link cliccabili). Le immagini Pinterest non stanno nel repository: si collegano con il link del pin e sul sito diventano embed.

## Cosa ho approvato e cosa propone Claude

Ogni spunto, idea e ricerca dice da dove viene e se l'ho approvato: nel frontmatter `origine` e `validata` (`true` o `false`).

- `seme`: dal [documento d'origine](diario/2026-10-04-seed.md), che ha compilato Claude in una chat con me. Contiene mie parole e proposte di Claude: le idee del seme sono proposte e partono da `false`.
- `mia`: l'ho portata io; sempre `true`.
- `claude`: proposta di Claude di sua iniziativa; parte da `false`.

Il sito guarda solo `validata`. Le note di mappa, se non dicono altro, vengono dal seme e sono validate.

Dentro una nota mia, un passo proposto da Claude sta in un blocco così, leggibile sia qui sia sul sito:

> [!NOTE]
> **Proposta di Claude, da validare.**
>
> il testo proposto…

Quando dico sì la nota diventa `validata: true`, o il blocco si scioglie nel testo, con la data nell'evoluzione. Tutto ciò che aspetta un sì o un no è nella pagina **[Da validare](https://paol-imi.github.io/tattoo-shit/da-validare)**.

Sul sito, di default, si vede solo ciò che ho validato: niente note proposte, niente blocchi proposta, niente collegamenti proposti (quelli di migrazione e quelli nati da un blocco proposta), né in bacheca, testi e mappa, né nell'indice, nella ricerca e nelle note. Le proposte tornano visibili, marcate in rosso, con l'interruttore **proposte** in alto (sul telefono anche nel menu), che si ricorda la scelta; `?proposte=1` nell'indirizzo lo accende, `?proposte=0` lo spegne. Una nota proposta aperta dal suo indirizzo si vede comunque, con l'indicazione "proposta di Claude". Qui su GitHub si vede sempre tutto.

## Come navigare il sito

Il sito ha tre porte, in alto nel menu e in home. Di default mostrano solo ciò che ho validato; l'interruttore **proposte**, in alto a destra, aggiunge le proposte di Claude.

- **[Bacheca](https://paol-imi.github.io/tattoo-shit/bacheca):** tutte le idee e gli spunti come tavole, con i pin e le parole. Tocca un chip (un simbolo, una fonte, un concetto) per vedere solo ciò che vi è legato; i filtri stanno nell'indirizzo e si possono condividere.
- **[Testi](https://paol-imi.github.io/tattoo-shit/testi):** ogni citazione dell'archivio, per fonte. Le candidate al lettering.
- **[Mappa](https://paol-imi.github.io/tattoo-shit/mappa):** il grafo delle note. Passa sopra un nodo per accendere i vicini, cliccalo per aprire la nota.
- **[Da validare](https://paol-imi.github.io/tattoo-shit/da-validare):** ciò che Claude ha proposto e non ho ancora approvato, sempre tutto. Non è nel menu: ci si arriva dall'interruttore acceso (o dal menu del telefono). Con le proposte accese, sulla bacheca e sulla mappa sono tratteggiate in rosso.

Da ogni nota, la riga in testa porta alla sua posizione sulla mappa e alle tavole della bacheca legate a lei.

## Strumenti

```sh
npm install                              # una volta sola
node scripts/verifica.mjs                # slug unici, link rotti, note orfane, riepilogo
node scripts/immagini.mjs <file…>        # ridimensiona le mie immagini (2000 px, WebP 85)
npm run docs:dev                         # il sito in locale, su http://localhost:5173/tattoo-shit/
npm run docs:build                       # build del sito: deve passare (segnala anche i link morti)
```

Il sito è pubblico su <https://paol-imi.github.io/tattoo-shit/>: si pubblica da solo a ogni push su `main`
(workflow in `.github/workflows/deploy.yml`). La prima volta va abilitato a mano in
**Settings → Pages → Source: GitHub Actions**. La configurazione del sito è in `.vitepress/`.

Le istruzioni permanenti per Claude Code sono in [CLAUDE.md](CLAUDE.md).

## Stato

- **Fase 1, fondamenta e migrazione:** fatta. 157 note nate dal [seme](diario/2026-10-04-seed.md), vedi il [diario](diario/2026-10-04-fase-1.md).
- **Primi spunti:** True Detective e Invictus, vedi il [diario](diario/2026-10-04-primi-spunti.md).
- **Fase 2, il sito:** fatta. VitePress su GitHub Pages, con indice generato dalle cartelle, ricerca, embed Pinterest e backlink, vedi il [diario](diario/2026-10-04-fase-2.md).
- **Ricerche:** nuova sezione per le piste da esplorare, con le prime due: [I Pensieri di Marco Aurelio](ricerche/pensieri-marco-aurelio/index.md) e [Sooraj Saxena](ricerche/soorajsaxena/index.md), vedi il [diario](diario/2026-10-04-ricerche.md).
- **Bacheca, Testi e Mappa:** fatte. Il cuore visivo del sito, generato dalle note a ogni build, vedi il [diario](diario/2026-10-05-bacheca.md).
- **Validazione:** fatta. Ogni nota dice se viene dal seme, da me o da Claude, e se l'ho approvata; le proposte di Claude sono marcate e raccolte in [Da validare](https://paol-imi.github.io/tattoo-shit/da-validare), vedi il [diario](diario/2026-10-05-validazione.md).
- **Revisione del seme:** il seme l'ha compilato Claude, e le sue idee di tatuaggio sono proposte di Claude, mai approvate: tornano da validare, vedi il [diario](diario/2026-10-05-revisione-seme.md).
- **Nuove proposte:** nove idee proposte da Claude a partire dalle mie parole e dai miei riferimenti, sette note nuove e due varianti dentro le mie idee, tutte da valutare a pancia, vedi il [diario](diario/2026-10-06-nuove-proposte.md).
- **Fase 3, Pinterest:** link alle board e triage.
- **Fase 4, le skill di Claude Code:** `/spunto`, `/idea`, `/triage`, `/convergenze`, `/diario`…
- **Fase 5, lavoro creativo:** ricorrente.

Le mie idee, portate da me: [il sognatore insonne](idee/sognatore-insonne/index.md) e [il monologo di Rust](idee/monologo-di-rust/index.md).
Le proposte di Claude nel seme segnate "in esplorazione", [il grimorio](idee/grimorio/index.md) e [il viandante oltre il firmamento](idee/viandante-oltre-il-firmamento/index.md), aspettano ancora un mio sì o un no, come le altre idee del seme.
Le nove nuove proposte di Claude, dal [lago nel cratere](idee/lago-nel-cratere/index.md) all'[elmo e la vite](idee/elmo-e-vite/index.md), sono raccolte nel [diario del 6 ottobre](diario/2026-10-06-nuove-proposte.md).
