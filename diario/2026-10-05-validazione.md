---
tipo: diario
titolo: "Validazione: cosa ho approvato e cosa è proposta di Claude"
data: 2026-10-05
---

# Validazione: cosa ho approvato e cosa è proposta di Claude

## Cosa abbiamo fatto

- **Due campi nel frontmatter**, obbligatori su spunti, idee e ricerche:
  - `origine`: `seme` (dal [documento d'origine](/diario/2026-10-04-seed.md), discusso con me), `mia` (l'ho portata io in questo archivio), `claude` (proposta di Claude, di sua iniziativa);
  - `validata`: `true` se l'ho approvata. Seme e mia sono sempre `true`; ciò che propone Claude parte da `false`.

  Sulle note di mappa (emozioni, concetti, fonti, simboli, stile, percorsi) sono facoltativi: se mancano valgono seme e `true`.
- **Il blocco proposta**, per i passi di Claude dentro una nota mia. È un avviso in stile GitHub con l'etichetta esatta sulla seconda riga:

  ```md
  > [!NOTE]
  > **Proposta di Claude, da validare.**
  >
  > il testo proposto…
  ```

  L'ho scelto perché su GitHub resta leggibile (una nota con l'etichetta in grassetto) e sul sito diventa un blocco con il filetto rosso e un'ancora (`#proposta-1`, `#proposta-2`…), senza sintassi che GitHub non capisce.
- **Sul sito:**
  - la pagina [Da validare](/da-validare.md), nel menu dopo Mappa: le note non validate, i blocchi proposta dentro le note validate e i collegamenti aggiunti in migrazione. Si genera dalle note a ogni build: quando approvo qualcosa, sparisce da lì;
  - in [Bacheca](/bacheca.md) le proposte hanno il bordo tratteggiato e l'etichetta "proposta di Claude · da validare", e c'è un filtro nuovo (`?validazione=validate` o `?validazione=da-validare`);
  - sulla [Mappa](/mappa.md) i nodi proposti sono vuoti con il contorno tratteggiato, i collegamenti di migrazione sono fili tratteggiati, con una voce in legenda;
  - in testa a ogni nota la riga dice "dal seme", "tua" o "proposta di Claude · da validare", e quante proposte contiene;
  - in [Testi](/testi.md) le citazioni che stanno dentro una proposta portano il segno "scelta di Claude · da validare".
- `scripts/verifica.mjs` controlla i due campi (presenza e valori) e l'etichetta dei blocchi, e stampa quante cose restano da validare.
- Aggiornati i template, [CLAUDE.md](https://github.com/paol-imi/tattoo-shit/blob/main/CLAUDE.md) e il [README](https://github.com/paol-imi/tattoo-shit/blob/main/README.md).

## Come ho classificato

- **Dal seme** (`origine: seme`, validate): il nucleo, tutte le note di mappa, tutte le idee e lo spunto [La coscienza come passo falso](/spunti/true-detective-coscienza/index.md), compresa [la nota su Schopenhauer](/fonti/pensiero/schopenhauer.md), che nel seme era già nominato. La citazione intera del monologo nello spunto l'ho portata io.
- **Proposte di Claude** (`origine: claude`, `validata: false`), perché il seme stesso le dice non discusse:
  - [Trittico delle metamorfosi](/idee/trittico-metamorfosi/index.md): "proposta nata ora in fase di raccolta, non ancora discussa";
  - [L'alce di Zapffe](/idee/alce-di-zapffe/index.md) e [La luce sta vincendo](/idee/luce-contro-buio/index.md): "idee nuove, da esplorare". Nell'alce il materiale della variante è mio (il pin della testa bendata, il monologo come testo), ma la fusione con la corona cieca l'ha decisa Claude quando gli ho detto "dimmi tu";
  - [Testo e lettering](/stile/testo-e-lettering.md): un nodo di stile creato da Claude.
- **Mie** (`origine: mia`, validate): lo spunto [Non dormo, sogno soltanto](/spunti/true-detective-sogno/index.md), l'idea [Il sognatore insonne](/idee/sognatore-insonne/index.md), la fonte [Invictus](/fonti/opere/invictus.md) con lo spunto [Il capitano della mia anima](/spunti/capitano-della-mia-anima/index.md), le ricerche [Sooraj Saxena](/ricerche/soorajsaxena/index.md) e [I Pensieri di Marco Aurelio](/ricerche/pensieri-marco-aurelio/index.md).
- **Blocchi proposta** dentro le note mie:
  - nel sognatore insonne, i tre modi di far giocare il fumo;
  - nel capitano della mia anima, tutta la sezione Convergenze e il commento sul nucleo;
  - nei Pensieri di Marco Aurelio, la scelta dei dodici passi con il loro "perché può interessarmi" e i tre spunti proposti negli Esiti.
  - in Sooraj Saxena, la lettura "Quindi, per ora…" (i fatti verificati restano fuori). I collegamenti nati solo da una proposta non si possono racchiudere: in Sooraj Saxena, nel capitano e nei Pensieri li elenca per titolo una frase dentro il blocco proposta. La riga sull'unione nello spunto della coscienza resta com'è: è storia, non proposta.
- **Collegamenti di migrazione:** restano elencati nel [diario della fase 1](/diario/2026-10-04-fase-1.md), che è l'unica fonte. Ho aggiunto i link alle note, così la pagina Da validare e la mappa li riconoscono.
- **Fuori dal conto:** l'archivio. [La corona cieca](/_archivio/corona-cieca/index.md) non ha i due campi: è già scartata.

## 2026-10-05, più tardi: di default solo il validato

Il sito mostrava tutto, con i segni rossi: troppo caos. Ora, di default, si vede solo ciò che ho approvato: bacheca, testi, mappa, home, indice, ricerca e note non mostrano note proposte, blocchi proposta né collegamenti proposti (quelli di migrazione e quelli che un blocco dice "fanno parte della proposta"). Per esplorare le proposte c'è l'interruttore **proposte** in alto (sul telefono anche nel menu), che si ricorda la scelta, oppure la pagina [Da validare](/da-validare.md), che mostra sempre tutto ed è uscita dal menu principale. Le note non sono cambiate: è tutto lato sito.

## Domande aperte

- Delle quattro note proposte, quale ti dice qualcosa a pancia? Partiamo da una.
