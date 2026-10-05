# ATLANTE — Seme del repository

> Repository personale di idee, pensieri e sketch per tatuaggi.
> Questo file è il **seme**: raccoglie tutto il lavoro fatto finora in una conversazione con Claude (ottobre 2026) e una proposta di architettura. Va letto da Claude Code, che lo userà per costruire il repository insieme a me, una fase alla volta.
>
> Nome proposto: **Atlante**. Atlante è il titano che regge il cielo sulle spalle, ed è anche una raccolta di mappe. Non vincolante.

---

## 0. Come usare questo file

**Per me:** è la memoria di tutto ciò che abbiamo ragionato. Niente di quello che c'è qui è vincolante: è un punto di partenza, uno degli approcci possibili.

**Per Claude Code:**
1. Leggi tutto il file prima di fare qualunque cosa.
2. Prima di creare struttura, fammi le domande della sezione 2 (Decisioni aperte), una alla volta.
3. Lavora per fasi (sezione 5). A fine fase fermati, mostrami cosa hai fatto, fai commit.
4. La sezione 4 (Base di conoscenza) va **scomposta in note** secondo l'architettura della sezione 3. Non perdere nessuna informazione: ogni concetto, fonte, simbolo e idea qui dentro deve finire in una nota.
5. Alla fine, questo file va archiviato in `diario/` come documento di origine, non cancellato.

---

## 1. Intento e principi

**Perché esiste.** Le idee sono sparse tra Pinterest, chat, appunti e immagini generate. Questa dispersione rende difficile ragionare e portare avanti il processo creativo. Il repository serve a tenere tutto in un unico luogo, collegato, con uno storico.

**Principi guida**
- **Il concetto viene prima del soggetto.** Si parte dal significato, poi si cerca l'immagine.
- **Non vincolante.** La struttura deve lasciare spazio alla creatività. Se una cosa non sta in nessuna categoria, va bene comunque: esiste `inbox/`.
- **Niente si cancella.** Le idee scartate si archiviano con il motivo dello scarto. Anche i rifiuti raccontano il percorso.
- **Il tatuaggio racconta il viaggio, non la tappa.** La mia filosofia evolve. Le idee migliori resteranno vere anche quando sarò approdato altrove.
- **Le convergenze valgono più delle citazioni.** Il simbolo più forte è quello in cui più tradizioni diverse (filosofia, mito, esoterismo, un anime) arrivano alla stessa verità per strade diverse.
- **Il riferimento pop si nasconde nel dettaglio.** Serie, anime, film e canzoni funzionano meglio come porta d'ingresso verso un archetipo più antico che come citazione letterale.
- **Note brevi, collegamenti tanti.** Meglio dieci note piccole ben collegate che una nota enorme.

---

## 2. Decisioni aperte

Claude Code: chiedimele all'inizio, una alla volta, spiegando in breve pro e contro. Tra parentesi la mia proposta di default.

1. **Obsidian come interfaccia?** (Sì.) Il repository viene strutturato come un vault Obsidian: markdown puro, wikilink `[[...]]`, vista a grafo che mostra i collegamenti tra concetti, backlink automatici. Resta un normale repo git gestito da Claude Code. Obsidian si può anche non usare: tutto funziona comunque come semplice markdown su GitHub.
2. **Repository privato o pubblico?** (Privato.) Contiene pensieri personali e immagini prese da Pinterest di cui non possiedo i diritti.
3. **Il sito: locale, privato online o pubblico?** (Locale all'inizio.) Vedi sezione 3.7: con GitHub Free, GitHub Pages richiede un repository pubblico, e anche con un piano a pagamento il sito pubblicato resta pubblico.
4. **Immagini Pinterest: scaricate o solo link?** (Scaricate, con link di origine conservato.) Vedi 3.6.
5. **Accesso da telefono.** Come voglio consultare e aggiungere idee dal telefono? Opzioni: solo consultazione del sito, app Obsidian mobile sincronizzata via git, oppure una cartella `inbox/` dove butto cose al volo e poi Claude Code le smista.
6. **Peso del repository.** (Ridimensionare le immagini, niente Git LFS per ora.) Rivalutare se il repo supera qualche centinaio di MB.

---

## 3. Architettura proposta

### 3.1 Il principio fondamentale

> **La cartella dice che cos'è una cosa. I collegamenti dicono a cosa è legata.**

Ogni nota sta in una sola cartella (il suo tipo), ma può collegarsi a tutte le dimensioni. Così le dimensioni restano incrociate senza duplicare nulla: un'idea di tatuaggio vive in `idee/`, ma si collega a concetti, emozioni, fonti, simboli e percorsi.

### 3.2 Struttura delle cartelle

```
atlante/
├── README.md                ← porta d'ingresso: cos'è, come navigare, stato attuale
├── CLAUDE.md                ← istruzioni permanenti per Claude Code (bozza in 3.9)
├── nucleo.md                ← il "manifesto" attuale: chi sono ora, cosa cerco (vivo, aggiornabile)
│
├── emozioni/                ← stati interiori (dolore, vuoto, lucidità, meraviglia…)
├── concetti/                ← idee filosofiche e temi (assurdo, amor fati, soglia…)
├── fonti/                   ← da dove vengono le cose
│   ├── pensiero/            ←   filosofi, correnti, testi (Camus, Marco Aurelio, Zapffe…)
│   ├── sacro-e-mito/        ←   religioni, miti, esoterismo (Sisifo, Cabala, alchimia…)
│   ├── opere/               ←   serie, anime, film, musica, letteratura
│   └── arte/                ←   quadri, sculture, incisioni (Doré, Bernini, Dürer…)
├── simboli/                 ← motivi visivi (ouroboros, velo, porta, occhi…)
├── stile/                   ← tecniche, composizione, placement (incisione, patchwork…)
├── percorsi/                ← fili narrativi che attraversano tutto (il peso → lo sguardo → l'oltre)
│
├── spunti/                  ← SCINTILLE: un frammento preciso che mi ha colpito
│   └── <slug>/              ←   ognuno nella sua cartella, con le sue immagini
│       ├── <slug>.md     ←   la nota ha lo stesso nome della cartella
│       └── img/
├── idee/                    ← PROPOSTE DI TATUAGGIO: dove le dimensioni si incontrano
│   └── <slug>/
│       ├── <slug>.md     ←   la nota ha lo stesso nome della cartella
│       └── img/             ←   pin, reference, sketch, immagini generate
│
├── inbox/                   ← tutto ciò che non è ancora smistato
│   └── pinterest/<board>/   ←   import grezzi da Pinterest, con metadati
├── diario/                  ← lo storico: una voce per sessione, decisioni, svolte
├── _templates/              ← modelli per ogni tipo di nota
├── _archivio/               ← idee e spunti scartati (con il motivo)
├── .claude/skills/          ← skill di Claude Code (vedi 3.8)
└── sito/                    ← (fase successiva) configurazione Quartz
```

### 3.3 Due livelli: mappa e territorio

- **La mappa** (emozioni, concetti, fonti, simboli, stile, percorsi): note leggere, un solo file `.md`, poche righe ciascuna. Sono i nodi del grafo, il vocabolario.
- **Il territorio** (spunti, idee): cartelle vive, con immagini, storico, prompt, versioni. È qui che si lavora davvero.

**Perché la nota ha lo stesso nome della cartella.** Obsidian e Quartz risolvono i link `[[...]]` per nome di file. Se tutte le note si chiamassero `index.md`, `[[discesa-di-sisifo]]` non troverebbe nulla. Per lo stesso motivo **ogni slug deve essere unico in tutto il vault**, anche tra tipi diversi (per esempio il mito è `psiche`, l'idea è `amore-e-psiche`).

**Spunto vs Fonte.** Una *fonte* è un'entità stabile (True Detective, Camus, Bernini). Uno *spunto* è un frammento preciso che mi ha acceso qualcosa (quella frase di Rust nel primo episodio, quel dettaglio della Melencolia). Una fonte può generare molti spunti.

**Spunto vs Idea.** Lo spunto è l'input (cosa mi ha colpito). L'idea è l'output (cosa potrei tatuarmi). Uno spunto può generare più idee; un'idea nasce di solito da più spunti e concetti insieme.

### 3.4 Frontmatter (schemi)

Tutti i collegamenti vanno **sia nel frontmatter** (per filtri e tabelle con Obsidian Bases o Dataview) **sia in una sezione `## Collegamenti` nel corpo** (perché il grafo e il sito leggono in modo affidabile i link nel testo).

**Nota di mappa** (emozione, concetto, fonte, simbolo, stile, percorso):
```yaml
---
tipo: concetto            # emozione | concetto | fonte | simbolo | stile | percorso
titolo: Amor fati
sottotipo:                # solo per fonti: pensiero | sacro-e-mito | opera | arte
alias: [L'ostacolo è la via]
creato: 2026-10-04
---
```
Corpo: 2–6 righe di significato, poi `## Collegamenti`, poi `## Note` libere.

**Spunto** (`spunti/<slug>/<slug>.md`):
```yaml
---
tipo: spunto
titolo: La coscienza come passo falso
fonte: "[[true-detective-s1]]"
formato: frase             # frase | scena | immagine | mito | opera | pin | sensazione
concetti: ["[[coscienza-come-peso]]"]
emozioni: ["[[lucidita]]"]
simboli: []
idee: []                   # idee generate da questo spunto
stato: grezzo              # grezzo | esplorato | confluito | archiviato
privato: false             # true = mai sul sito pubblico
creato: 2026-10-04
---
```

**Idea** (`idee/<slug>/<slug>.md`):
```yaml
---
tipo: idea
titolo: La discesa di Sisifo
stato: seme                # seme | in-esplorazione | forte | scelta | tatuata | archiviata
formato: pezzo-singolo     # pezzo-singolo | patchwork | sleeve | schiena | serie
placement: []              # avambraccio, spalla, schiena, polpaccio, fianco…
stile: ["[[incisione-xilografia]]"]
concetti: []
emozioni: []
simboli: []
fonti: []
spunti: []
percorsi: []
risonanza:                 # 1–5, quanto mi "colpisce" a pancia, aggiornabile
privato: false
creato: 2026-10-04
aggiornato: 2026-10-04
---
```
Corpo dell'idea: `## Concetto` · `## Composizione` · `## Reference` · `## Immagini` · `## Evoluzione` (log datato dei cambiamenti) · `## Collegamenti`.

### 3.5 Immagini

- Vivono nella cartella `img/` dello spunto o dell'idea a cui appartengono.
- Nome file: `AAAAMMGG-origine-descrizione.ext`, dove *origine* è `pin`, `ref`, `sketch`, `foto`, `gen` (immagine generata).
  Esempio: `20261004-pin-sisifo-discesa.webp`
- Nella nota, sezione `## Immagini`: ogni immagine incorporata con `![[...]]` e accanto l'origine (URL del pin, opera di riferimento, strumento usato).
- Ridimensionare a lato lungo max ~2000 px, JPEG/WebP qualità ~85, prima del commit. Claude Code può farlo con uno script.
- GitHub blocca i file sopra i 100 MB e consiglia di tenere i repository piccoli (idealmente sotto 1 GB). Con le immagini ridimensionate siamo lontanissimi.

### 3.6 Pinterest

**Il problema:** tante board, tante idee, nessun collegamento con i ragionamenti.

**Strategia ibrida (proposta):**
1. **Import.** Ogni board viene scaricata in `inbox/pinterest/<nome-board>/` con uno strumento da riga di comando. Il più noto è `gallery-dl` (supporta board e singoli pin); `pinterest-dl` è un'alternativa specifica. Sono strumenti non ufficiali: Claude Code verifica che funzionino al momento dell'uso. Con `gallery-dl --write-metadata` ogni immagine porta con sé un JSON con URL del pin, descrizione e board.
2. **Il link di origine non si perde mai.** Anche quando l'immagine viene spostata, l'URL del pin resta annotato accanto a lei.
3. **Smistamento (triage) con Claude Code.** Claude Code guarda le immagini dell'inbox, propone a quale spunto o idea collegarle (o se meritano un nuovo spunto), io confermo o correggo, lui sposta, rinomina e collega.
4. **Le board restano su Pinterest** come spazio di raccolta veloce. Il repository è il luogo del ragionamento. Si reimporta periodicamente solo il nuovo.

**Perché non solo link:** i pin spariscono, i link si rompono, e senza immagini locali Obsidian, il sito e Claude Code non possono "vedere" nulla.

### 3.7 Il sito (vista d'insieme)

**Strumento proposto: Quartz** (v4), generatore statico pensato per vault Obsidian: legge i wikilink, mostra backlink, vista a grafo interattiva e ricerca. Si pubblica su GitHub Pages, Cloudflare Pages o Netlify, oppure si guarda in locale.

**Attenzione alla privacy.** Con GitHub Free, Pages funziona solo da repository pubblici. Con un piano a pagamento (Pro) funziona anche da repo privati, **ma il sito resta comunque pubblico** su internet: i siti privati richiedono GitHub Enterprise Cloud.

**Tre strade:**
- **A. Locale** (consigliata per iniziare): `npx quartz build --serve` e lo apro nel browser. Zero costi, zero esposizione.
- **B. Pubblico**: solo testi e immagini mie o generate da me. Niente immagini Pinterest (non sono mie) e niente pensieri che voglio tenere privati.
- **C. Privato online**: repo privato + hosting con protezione d'accesso (per esempio Cloudflare Pages con Cloudflare Access). Più configurazione, ma tutto resta mio.

### 3.8 Skill per Claude Code (da creare in fase 3)

Le skill di progetto stanno in `.claude/skills/<nome>/SKILL.md` e diventano comandi `/nome`. Proposta:

| Comando | Cosa fa |
|---|---|
| `/spunto` | Cattura una nuova scintilla: crea la cartella, chiede la fonte, propone collegamenti (inclusi 2–3 non ovvi, cross-dimensionali), aggiorna il diario. |
| `/idea` | Crea o fa evolvere un'idea partendo da spunti e concetti; propone composizione e reference. |
| `/pinterest` | Importa una board in `inbox/` con metadati e ridimensiona le immagini. |
| `/triage` | Smista l'inbox: guarda le immagini, propone dove collegarle, chiede conferma, sposta e collega. |
| `/convergenze` | Analizza il grafo: note orfane, concetti senza idee, idee senza immagini, e soprattutto convergenze inattese tra dimensioni (come l'ouroboros, vedi 4.6). |
| `/diario` | Scrive la voce di fine sessione: cosa abbiamo fatto, cosa è cambiato, domande aperte. |

### 3.9 Bozza di CLAUDE.md

```markdown
# Atlante — istruzioni per Claude Code

Sei il mio compagno di lavoro creativo su un archivio di idee per tatuaggi.
Non sei solo un archivista: proponi collegamenti, convergenze e domande.

## Lingua e stile
- Scrivi in italiano. Nomi di file e cartelle: minuscolo, kebab-case, senza accenti.
- Ogni slug è unico in tutto il vault. Spunti e idee: cartella e nota con lo stesso nome.
- Note brevi. Collegamenti abbondanti.

## Regole
- Leggi `nucleo.md` all'inizio di ogni sessione: è il mio punto di vista attuale.
- Ogni nota nuova va collegata ad almeno due nodi esistenti, e i collegamenti vanno resi
  bidirezionali dove ha senso (aggiorna anche la nota di arrivo).
- Collegamenti sia nel frontmatter sia nella sezione `## Collegamenti` del corpo.
- Non cancellare mai idee o spunti: spostali in `_archivio/` con il motivo.
- Non ristrutturare cartelle o schemi senza chiedermelo.
- Fatti su opere, autori e miti: se non sei sicuro scrivi "(da verificare)". Non inventare.
- Citazioni: brevi. Niente testi di canzoni riprodotti: cita titolo, album e il momento.
- Se il sito è pubblico, niente immagini Pinterest e niente note marcate `privato: true`.
- A fine sessione: voce in `diario/` e commit con messaggio in italiano chiaro.

## Come ragionare con me
- Prima il concetto, poi il soggetto.
- Cerca convergenze: lo stesso significato in tradizioni diverse.
- Il riferimento pop va nascosto nel dettaglio, l'archetipo deve reggere da solo.
- Chiedimi cosa mi colpisce "a pancia": le reazioni contano più delle categorie.
- Una domanda alla volta.
```

---

## 4. Base di conoscenza

Tutto ciò che è emerso finora. Claude Code: ogni voce in grassetto con lo slug tra parentesi diventa una nota.

### 4.1 Profilo e punti di riferimento

**Metodo scelto:** prima il concetto, poi il soggetto. Nessun limite di tono: può essere macabro quanto puro.

**Territori di partenza:** filosofia (soprattutto correnti intense come stoicismo e romanticismo), religione (dal cristianesimo alle divinità greche), esoterismo e mistero, estratti da serie TV, anime, film cult e canzoni.

**Persone che hanno segnato la mia visione:** Jordan Peterson, Marco Aurelio, Albert Camus.
**Serie e personaggi:** Fullmetal Alchemist: Brotherhood, True Detective, Berserk.
**Musica:** Radiohead, Deftones, quella wave rock eterea e malinconica.

**Preferenze emerse durante il lavoro:**
- Mi attira il filone esoterico in cui si percepisce una coscienza elevata: guardando il tatuaggio deve nascere la sensazione che esistano risposte a domande che non ho, anzi **domande che ancora non so di volere**.
- Mi piacciono le **patchwork sleeve**: pezzi separati, di dimensioni diverse, con pelle libera tra loro, che però si leggono come un'unica opera. Non le sleeve "fuse" con sfondo continuo.
- Estetica che si sta delineando: nero, incisione/xilografia antica, mistero.

### 4.2 Il nucleo attuale → `nucleo.md`

**Il filone:** l'avventura. Il viaggio nell'esistenza, l'affrontare la realtà, l'evoluzione della propria filosofia.

**Dove sono ora:** in uno stadio assurdista, alla Camus. Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo.

**La mia visione:** la dimensione principale della realtà è il dolore. Ma cosa c'è oltre? **Amore e verità.**

**Formulazione in una frase:**
> Attraversare il dolore a occhi aperti, e trovare dall'altra parte amore e verità.

**I tre movimenti:**
1. **Il peso** — il dolore come dimensione fondamentale della realtà.
2. **Lo sguardo** — affrontarlo senza nascondersi, con lucidità.
3. **L'oltre** — amore e verità, che si trovano solo dopo averlo attraversato.

**La sfumatura esoterica:** il mistero non come risposta, ma come orizzonte. Non "il mondo non ha senso", ma "il mondo è più vasto di quello che posso capire, e questo mi affascina". Compatibile con l'assurdo: non pretende risposte, lascia aperta la soglia.

**Avvertenza a me stesso:** il tatuaggio deve rappresentare il viaggio e l'atto di affrontare, non lo stadio assurdista in sé. Così resterà vero anche se la mia filosofia evolve.

**Il mio percorso interiore, con le mie parole** (da conservare così com'è): battaglie interiori, solitudine, senso di vuoto, apatia, dolore, rabbia, risentimento. Percorso, avventura, musica, caos, libertà, gioia, vincere se stessi. Consapevolezza, pace interiore nel guardare alle battaglie interiori e alle versioni di me morte lungo il percorso, innalzarsi a una dimensione superiore. Assurdità dell'essenza stessa della vita, calma nell'esplorarne i concetti data dall'immensità del dolore superato.

### 4.3 Dimensione: Emozioni (`emozioni/`)

Ogni emozione è una nota breve: cosa significa per me, a quali concetti e idee porta.

- **Dolore** (`dolore`) — la dimensione principale della realtà. Punto di partenza di tutto il percorso. → peso-sguardo-oltre, sisifo, divina-commedia.
- **Solitudine** (`solitudine`) — la figura sola davanti all'immensità. → friedrich-monaco, viandante, sublime-e-abisso.
- **Vuoto** (`vuoto`) — il silenzio del mondo davanti alle domande. → assurdo, spazio-negativo.
- **Apatia** (`apatia`) — la stagnazione da attraversare. → il cammello delle tre-metamorfosi.
- **Rabbia** (`rabbia`) — energia della rivolta. → il leone delle tre-metamorfosi, berserk, rivolta.
- **Risentimento** (`risentimento`) — ciò che va lasciato andare. → amor-fati, nietzsche.
- **Malinconia** (`malinconia`) — la nostalgia di una conoscenza intuita e non raggiunta. → durer-melencolia, radiohead.
- **Caos** (`caos`) — l'ignoto, il drago. → jordan-peterson, virtu-e-fortuna.
- **Libertà** (`liberta`) — una delle tre conseguenze dell'assurdo per Camus. → assurdo, camus.
- **Passione** (`passione`) — l'altra conseguenza camusiana; anche tenacia e fuoco. → camus, napoleone (in virtu-e-fortuna).
- **Gioia** (`gioia`) — il "sì" sacro del fanciullo. → tre-metamorfosi, avventura-e-scoperta.
- **Meraviglia** (`meraviglia`) — il fascino della vita senza risposte; la sensazione delle "domande che non so di volere". → soglia-e-mistero.
- **Lucidità** (`lucidita`) — vedere chiaro senza consolazioni. → camus (l'ora della coscienza), true-detective-s1.
- **Pace interiore** (`pace-interiore`) — la calma data dal dolore superato. → stoicismo, marco-aurelio.

### 4.4 Dimensione: Concetti (`concetti/`)

**Territori iniziali**
- **Memento mori** (`memento-mori`) — ricordare che si muore per vivere ora. Fonti: Seneca, Marco Aurelio, vanitas barocca, Ecclesiaste. Simboli: teschio, clessidra.
- **Amor fati / L'ostacolo è la via** (`amor-fati`) — trasformare il peso in senso. Fonti: Marco Aurelio, Nietzsche, Camus (Sisifo felice), Prometeo.
- **Il sublime e l'abisso** (`sublime-e-abisso`) — il cuore del Romanticismo: il fascino per ciò che ci supera e ci può distruggere. Fonti: Friedrich, Icaro, Nietzsche (lo sguardo nell'abisso).
- **Caduta e redenzione** (`caduta-e-redenzione`) — le cicatrici che diventano valore. Fonti: Lucifero "portatore di luce", l'angelo caduto, kintsugi, fenice.
- **Morte e rinascita** (`morte-e-rinascita`) — la trasformazione. Fonti: ouroboros, fasi alchemiche (nigredo, albedo, rubedo), Persefone, il serpente che muta pelle.
- **Il prezzo della conoscenza** (`prezzo-della-conoscenza`) — la lucidità pagata cara. Fonti: Prometeo, Odino che sacrifica un occhio, l'albero della conoscenza, la Porta della Verità di FMA.
- **Dualità e unione degli opposti** (`dualita`) — tenere insieme luce e ombra. Fonti: Giano, "come in alto così in basso" (ermetismo), sole nero, Rebis alchemico.

**Dalla mia lista**
- **Sacrificio anonimo** (`sacrificio-anonimo`) — sacrificarsi per altri o per un bene superiore, sapendo che chi ne beneficia non saprà mai chi è stato. Fonti:
  - *Lamed Vav*: nella tradizione ebraica esistono sempre 36 giusti nascosti, e il mondo esiste grazie a loro; nessuno sa chi siano, spesso nemmeno loro. Si scrive ל״ו.
  - *Maimonide*: nella scala degli otto livelli della carità, uno dei più alti è il dono in cui né chi dà né chi riceve conosce l'altro.
  - *Vangelo di Matteo (6,3)*: non sappia la tua sinistra ciò che fa la tua destra.
  - *Marco Aurelio, Meditazioni V.6*: l'uomo buono è come la vite che produce l'uva e non chiede altro, poi passa alla stagione successiva.
  - *Tao Te Ching, cap. 17*: del miglior leader, a lavoro compiuto, il popolo dice "l'abbiamo fatto da soli".
  - *Kṣitigarbha (Jizō)*: il bodhisattva che fa voto di non entrare nel nirvana finché gli inferi non saranno vuoti.
  - *Il Milite Ignoto*: il sacrificio il cui valore sta nell'anonimato.
  - *FMA: Brotherhood*: nel finale Ed rinuncia per sempre alla propria alchimia (la sua Porta) per riavere il fratello. Rinuncia al potere che lo definiva.
- **Resilienza, tenacia, passione: virtù e fortuna** (`virtu-e-fortuna`) — la visione napoleonica e machiavellica. Machiavelli (Principe, cap. XXV): la fortuna è un fiume in piena, la virtù è costruire gli argini prima della tempesta. Simbolo: la Ruota della Fortuna (anche Tarocchi).
- **Guida e condottiero** (`guida-e-condottiero`) — il leader, la guida spirituale, la persona a cui affidarsi nelle difficoltà. Collegamento con il Tao: il leader più alto è quello che scompare.
- **Avventura e scoperta** (`avventura-e-scoperta`) — voglia di esperienza, accettare di non avere risposte alle grandi domande, lasciarsi prendere dal fascino della vita, trovare valore nelle piccole cose.
- **Dissoluzione dell'io** (`dissoluzione-dell-io`) — distacco dall'io occidentale, consapevolezza di essere parte di una forza più grande; questa vita come una delle tante manifestazioni della coscienza nell'infinità del tempo; elevazione e glorificazione di questo nuovo concetto di io. Fonti: Advaita, buddhismo, Jung (il Sé oltre l'Io), eterno ritorno, ouroboros.
- **Battaglie interiori** (`battaglie-interiori`) — vedi il mio percorso in 4.2. Vincere se stessi, le versioni di me morte lungo il cammino.
- **Il bene relativo** (`bene-relativo`) — non esiste un bene assoluto, ma solo relativo al negativo esplorato. Fonti: Eraclito (frammento 111: è la malattia a rendere dolce la salute, la fame la sazietà, la fatica il riposo; e: la via in su e la via in giù sono la stessa), Jung (l'ombra).
- **Evoluzione e percorso** (`evoluzione-e-percorso`) — concetti filosofici che riassumono evoluzione, avventura, cammino. Fonti: tre metamorfosi, Eraclito (panta rei), nave di Teseo, il viaggio dell'eroe (Peterson).

**Aggiunti durante il lavoro**
- **L'assurdo** (`assurdo`) — accettare il peso di non avere uno scopo superiore, senza nascondersi e senza arrendersi. Camus ne ricava tre conseguenze: rivolta, libertà, passione.
- **Rivolta** (`rivolta`) — la risposta all'assurdo. Nel Camus maturo (L'uomo in rivolta) la rivolta solitaria diventa solidarietà: "mi rivolto, dunque siamo". Ponte tra io e noi.
- **Verità** (`verita`) — uno dei due "oltre". Attraversa tutti i miei riferimenti: la lucidità camusiana, Rust Cohle che la insegue a ogni costo, la Verità di FMA che si paga con una parte di sé, la Verità di Bernini svelata dal tempo.
- **Amore** (`amore`) — l'altro "oltre". Dante finisce nell'amore che muove il sole e le altre stelle; Psiche ritrova l'amore dopo gli inferi; Camus passa dall'io al noi.
- **Le tre metamorfosi** (`tre-metamorfosi`) — Nietzsche, Zarathustra. Lo spirito diventa **cammello** (porta i pesi, attraversa il deserto: dolore, solitudine), poi **leone** (combatte il drago del "tu devi": rabbia, ribellione, vincere se stessi), infine **fanciullo** (innocenza, gioco, nuovo inizio, un "sì" sacro: gioia, scoperta, piccole cose). È il mio percorso in tre immagini. (Anche percorso.)
- **Eterno ritorno** (`eterno-ritorno`) — Nietzsche; il "tempo è un cerchio piatto" di True Detective; l'ouroboros.
- **Scambio equivalente** (`scambio-equivalente`) — FMA: per ottenere qualcosa bisogna dare qualcosa di pari valore.
- **Identità che cambia: la nave di Teseo** (`nave-di-teseo`) — se tutte le parti vengono sostituite, è ancora la stessa nave? Metafora per le versioni di me morte lungo il percorso.
- **La soglia e il mistero** (`soglia-e-mistero`) — le domande che non so ancora di volere. Il mistero come orizzonte, non come dogma. Trucchi visivi per evocarlo:
  - una figura che guarda qualcosa fuori dall'inquadratura, che chi osserva non può vedere;
  - una soglia (porta, velo, squarcio) invece di ciò che sta oltre;
  - simboli e geometrie leggibili su più livelli, o scritture che sembrano un linguaggio ma non si lasciano decifrare;
  - occhi, tanti, dove non dovrebbero esserci.
- **La coscienza come peso** (`coscienza-come-peso`) — la consapevolezza come dono e maledizione. Nato dallo spunto True Detective (vedi 4.10).

**Tensioni aperte** (da tenere vive, non da risolvere per forza) → nota `concetti/tensioni.md`
- *Condottiero vs dissoluzione dell'io.* Napoleone e Machiavelli da un lato, sacrificio anonimo e forza più grande dall'altro. Forse non è una contraddizione ma il cuore: un io abbastanza forte da scegliere di non avere bisogno di essere visto. Il leone che diventa fanciullo; il condottiero che diventa uno dei 36 giusti.
- *Assurdo vs esoterico.* L'assurdo dice che non ci sono risposte; l'esoterico suggerisce risposte nascoste. Possibile sintesi: il mistero come orizzonte, non come risposta.
- *Dante cristiano vs sguardo assurdista.* La Commedia usata come struttura archetipica del viaggio, non come dogma.

### 4.5 Dimensione: Fonti (`fonti/`)

#### Pensiero (`fonti/pensiero/`)
- **Marco Aurelio** (`marco-aurelio`) — la cittadella interiore; l'ostacolo è la via; la vite che dà l'uva senza chiedere (Meditazioni V.6). Corrente: stoicismo.
- **Seneca** (`seneca`) — memento mori, il tempo come unico vero possesso. Stoicismo.
- **Stoicismo** (`stoicismo`) — corrente. Distinzione tra ciò che dipende da noi e ciò che non dipende.
- **Albert Camus** (`camus`) — l'assurdo, Sisifo, rivolta-libertà-passione, il passaggio dall'io al noi (L'uomo in rivolta), l'immagine di un'estate invincibile trovata dentro l'inverno.
  - Dettaglio chiave dal *Mito di Sisifo*: il momento che interessa a Camus non è la spinta in salita, ma la **discesa**, quando Sisifo torna a riprendere il masso, consapevole. È l'ora della coscienza, quella in cui è superiore al proprio destino.
- **Friedrich Nietzsche** (`nietzsche`) — tre metamorfosi, amor fati, eterno ritorno, lo sguardo nell'abisso.
- **Jordan Peterson** (`jordan-peterson`) — il viaggio dell'eroe: entrare volontariamente nella caverna del drago (il caos, l'ignoto) per recuperare l'oro; ordine e caos; prendersi sulle spalle il proprio peso.
- **Eraclito** (`eraclito`) — panta rei; il bene come relativo al suo opposto; la via in su e in giù sono la stessa.
- **Niccolò Machiavelli** (`machiavelli`) — virtù e fortuna (Principe, cap. XXV).
- **Napoleone** (`napoleone`) — la visione, la volontà, la stella. (Più figura che fonte filosofica.)
- **Laozi, Tao Te Ching** (`tao-te-ching`) — il saggio agisce e non rivendica; il miglior leader scompare.
- **Maimonide** (`maimonide`) — gli otto livelli della carità.
- **Peter Wessel Zapffe** (`zapffe`) — *L'ultimo Messia* (1933). La coscienza umana come sviluppo eccessivo, paragonata alle corna enormi dell'alce irlandese, cresciute fino a diventare una condanna. Quattro difese contro il peso della coscienza: isolamento, ancoraggio, distrazione, sublimazione. (La sublimazione è l'arte: anche un tatuaggio.)
- **Thomas Ligotti** (`ligotti`) — *La cospirazione contro la razza umana* (2010), pessimismo filosofico che riprende Zapffe. Tra le influenze dichiarate di Nic Pizzolatto per True Detective.
- **Carl Gustav Jung** (`jung`) — l'ombra, il Sé, l'individuazione.
- **Immanuel Kant** (`kant`) — considerava l'iscrizione del velo di Iside la frase più sublime mai pronunciata.
- **Romanticismo** (`romanticismo`) — corrente: il sublime, l'individuo davanti all'immensità.

#### Sacro, mito ed esoterico (`fonti/sacro-e-mito/`)
- **Sisifo** (`sisifo`) — il masso, la discesa, l'ora della coscienza.
- **Prometeo** (`prometeo`) — il fuoco rubato, la conoscenza pagata.
- **Icaro** (`icaro`) — il volo verso il sole, il sublime che distrugge.
- **Psiche** (`psiche`) — dall'*Asino d'oro* di Apuleio. Psiche ("l'anima") ha un amante che non può vedere. Una notte accende una lampada per guardarlo: vuole la verità. Per questo lo perde, attraversa prove durissime fino a scendere negli inferi, e alla fine ritrova l'amore e diventa immortale. L'anima perde l'amore cercando la verità, attraversa il dolore e li ritrova entrambi.
- **Persefone** (`persefone`) — la discesa negli inferi e il ritorno ciclico.
- **Odino** (`odino`) — sacrifica un occhio per bere alla fonte della saggezza.
- **Iside e il suo velo** (`iside`) — Plutarco riporta un'iscrizione del tempio di Sais: la dea dice di essere tutto ciò che è stato, è e sarà, e che nessun mortale ha mai sollevato il suo velo.
- **Lucifero** (`lucifero`) — il portatore di luce, l'angelo caduto.
- **Ofanim** (`ofanim`) — gli angeli-ruote della visione di Ezechiele: ruote dentro ruote, coperte di occhi. Una coscienza così alta da non avere più forma umana.
- **Lamed Vav** (`lamed-vav`) — i 36 giusti nascosti (vedi sacrificio-anonimo).
- **Albero della Vita, Cabala** (`albero-della-vita`) — le dieci sefirot. Inciso sulla Porta della Verità di FMA.
- **Kṣitigarbha / Jizō** (`kshitigarbha`) — il voto di restare negli inferi finché non saranno vuoti.
- **Vangelo di Matteo** (`vangelo-matteo`) — la sinistra che non sa cosa fa la destra.
- **Ecclesiaste** (`ecclesiaste`) — vanità delle vanità.
- **Alchimia** (`alchimia`) — nigredo, albedo, rubedo; il Rebis; il Mutus Liber.
- **Ermetismo** (`ermetismo`) — come in alto così in basso.
- **Tarocchi** (`tarocchi`) — la Ruota della Fortuna.
- **Fenice** (`fenice`) — rinascere dalle proprie ceneri.
- **Advaita e buddhismo** (`advaita-buddhismo`) — l'io come illusione, l'unità della coscienza.

#### Opere (`fonti/opere/`)
- **True Detective, stagione 1** (`true-detective-s1`) — Rust Cohle: pessimismo radicale, ricerca della verità a ogni costo, il tempo come cerchio piatto, e nel finale l'uscita dal buio verso le stelle. Vedi spunto in 4.10.
- **Fullmetal Alchemist: Brotherhood** (`fma-brotherhood`) — scambio equivalente; la Porta della Verità con l'Albero della Vita; la Verità che prende un prezzo; l'ouroboros come simbolo degli Homunculus; la rinuncia finale di Ed.
- **Berserk** (`berserk`) — chi lotta contro un destino crudele senza piegarsi (il "Lottatore"); in fondo un mito di Sisifo. Il marchio del sacrificio come riferimento da reinterpretare, non da copiare.
- **Neon Genesis Evangelion** (`evangelion`) — attinge alla Cabala (citato come esempio di pop che porta all'archetipo).
- **Divina Commedia** (`divina-commedia`) — la struttura archetipica del viaggio dal dolore all'amore e alla verità. Tutte e tre le cantiche finiscono con la parola "stelle": l'uscita dall'Inferno "a riveder le stelle", il Purgatorio "puro e disposto a salire a le stelle", il Paradiso con "l'amor che move il sole e l'altre stelle".
- **Asino d'oro, Apuleio** (`asino-d-oro`) — il mito di Amore e Psiche.
- **Così parlò Zarathustra** (`zarathustra`) — le tre metamorfosi.
- **Il mito di Sisifo / L'uomo in rivolta, Camus** (`camus-opere`) — vedi camus.
- **Radiohead** (`radiohead`) e **Deftones** (`deftones`) — non come citazioni ma come atmosfera: bellezza nella dissonanza, malinconia, alienazione, un rock etereo. Possibile traduzione nello stile: blackwork e incisione, dotwork che si dissolve nella pelle, molto spazio negativo, elementi che si sfaldano in fumo o particelle. (Regola: niente testi riprodotti nel repo; si annotano titolo, album e cosa mi evoca.)

#### Arte (`fonti/arte/`)
- **Gustave Doré, illustrazioni per la Commedia** (`dore-commedia`) — classico del blackwork. In particolare la selva oscura e la "candida rosa" dell'Empireo (Paradiso, canto XXXI): angeli in cerchi concentrici di luce.
- **Albrecht Dürer, Melencolia I** (1514) (`durer-melencolia`) — un angelo pensieroso tra strumenti di misura, un quadrato magico, un poliedro misterioso, una clessidra, una scala che esce dal quadro. Da cinquecento anni nessuno è d'accordo su cosa significhi.
- **Michelangelo, i Prigioni** (`michelangelo-prigioni`) — Galleria dell'Accademia di Firenze (altri due al Louvre). Figure che lottano per uscire dal marmo, il non-finito. Michelangelo: la statua è già nel marmo, basta togliere il superfluo.
- **Gian Lorenzo Bernini, La Verità svelata dal Tempo** (`bernini-verita`) — Galleria Borghese. Scolpita nel periodo più nero della sua vita, dopo il fallimento dei campanili di San Pietro. Il Tempo non lo scolpì mai: rimase solo la Verità, sorridente, con il sole in mano.
- **Antonio Canova, Amore e Psiche** (`canova-amore-psiche`) — Louvre. Il momento del risveglio, quando l'amore torna.
- **Caspar David Friedrich, Viandante sul mare di nebbia** (1818) (`friedrich-viandante`) — il sublime, l'ignoto davanti.
- **Caspar David Friedrich, Monaco in riva al mare** (1808–10) (`friedrich-monaco`) — una figura minuscola davanti a mare e cielo vuoti. Forse il quadro più "assurdista" mai dipinto, cent'anni prima di Camus.
- **Tiziano, Sisifo** (`tiziano-sisifo`) — Prado.
- **Franz von Stuck, Sisifo** (`von-stuck-sisifo`).
- **Auguste Rodin, La Porta dell'Inferno e Il Pensatore** (`rodin-porta-inferno`) — Il Pensatore nasce in origine come Dante che contempla l'Inferno, in cima alla Porta.
- **Robert Fludd** (`fludd`) — diagrammi cosmologici esoterici del primo Seicento.
- **William Blake, L'Antico dei Giorni** (`blake-antico-dei-giorni`) — la figura che misura il mondo con il compasso.
- **L'incisione Flammarion** (`incisione-flammarion`) — incisione anonima pubblicata nel 1888: un viandante al bordo del mondo buca la volta celeste con la testa e vede gli ingranaggi del cosmo.
- **Mutus Liber** (1677) (`mutus-liber`) — libro alchemico fatto solo di immagini, senza parole. Risposte offerte a chi sa già che domanda fare.
- **Kintsugi** (`kintsugi`) — riparare la ceramica con l'oro, rendendo visibile la frattura.

### 4.6 Dimensione: Simboli (`simboli/`)

Ogni simbolo: significato, in quali tradizioni compare, in quali idee è usato.

- **Ouroboros** (`ouroboros`) — **convergenza notevole**: è il simbolo degli Homunculus in FMA, richiama il "tempo come cerchio piatto" di True Detective, l'eterno ritorno di Nietzsche, l'alchimia, e la mia idea della coscienza che si manifesta in infinite vite. Un unico simbolo antico tiene insieme quasi tutti i miei riferimenti.
- **Clessidra** (`clessidra`) — memento mori, il tempo; presente nella Melencolia.
- **Teschio** (`teschio`) — memento mori, vanitas.
- **Il viandante** (`viandante`) — la figura del cammino: Friedrich, Flammarion, Dante.
- **Il masso** (`masso`) — il peso di Sisifo.
- **Il velo** (`velo`) — Iside (resta), Bernini (cade). La verità nascosta o svelata.
- **La porta** (`porta`) — la soglia: Porta della Verità (FMA), Porta dell'Inferno (Rodin).
- **Gli occhi** (`occhi`) — coscienza elevata, Ofanim, occhio della Provvidenza.
- **Le ruote** (`ruote`) — Ofanim, Ruota della Fortuna, le sfere celesti.
- **La scala** (`scala`) — ascesa; nella Melencolia esce dal quadro.
- **La lampada** (`lampada`) — Psiche che vuole vedere la verità.
- **La chiave** (`chiave`) — accesso al mistero.
- **Il poliedro** (`poliedro`) — il solido enigmatico della Melencolia.
- **Le stelle** (`stelle`) — la fine di ogni cantica dantesca; Rust nel finale di True Detective; la luce nel buio.
- **La vite** (`vite`) — Marco Aurelio: fare il bene senza chiedere nulla.
- **La nave** (`nave`) — Teseo, l'identità che cambia.
- **La fenice** (`fenice-simbolo`) e **il serpente che muta** (`serpente`) — rinascita.
- **Il marmo non-finito** (`marmo-non-finito`) — il dolore come scalpello; un'identità che non ha finito di diventare se stessa.
- **ל״ו** (`lamed-vav-lettere`) — le due lettere ebraiche dei 36 giusti nascosti.
- **La Ruota della Fortuna** (`ruota-della-fortuna`) — virtù e fortuna, Tarocchi.
- **Il sole in mano** (`sole`) — la Verità di Bernini.
- **L'alce irlandese** (`alce-irlandese`) — le corna eccessive di Zapffe: la coscienza come corona e condanna. (Vedi 4.10.)
- **La spirale** (`spirale`) — il tempo circolare, True Detective.
- **Albero della Vita** (`albero-della-vita-simbolo`) — le sefirot; la Porta della Verità.

### 4.7 Dimensione: Stile e composizione (`stile/`)

**Tecniche**
- **Incisione / xilografia antica** (`incisione-xilografia`) — linee e tratteggio incrociato alla Doré e Dürer, legni del Cinquecento. La direzione che mi attira di più.
- **Blackwork** (`blackwork`), **dotwork** (`dotwork`), **black & grey realism** (`black-and-grey-realism`) — quest'ultimo per le sculture (Bernini, Canova, Michelangelo).
- **Spazio negativo** (`spazio-negativo`) — il vuoto come parte del disegno; legato all'estetica Radiohead/Deftones.
- **Dissolvenze** (`dissolvenze`) — elementi che si sfaldano in fumo, particelle, nebbia.

**Sleeve unita** (`sleeve-unita`) — un'unica opera con sfondo continuo. Principi:
- uno sfondo che lega tutto (la scuola giapponese è maestra: onde, nuvole, vento; nel bianco e nero si usano fumo, nuvole, texture d'incisione, geometria sacra);
- gerarchia: un soggetto principale, due o tre secondari, poi il tessuto connettivo;
- seguire l'anatomia, avvolgere il braccio con linee diagonali;
- un solo stile, una sola mano;
- distribuzione di luci e ombre su tutto il braccio;
- un motivo ricorrente.
Idea collegata: ascesa-dal-polso-alla-spalla.

**Patchwork sleeve** (`patchwork`) — **la mia preferenza attuale.** Pezzi separati, di dimensioni diverse, pelle libera tra loro, che si leggono come un'opera unica. Cosa crea l'unità:
- stesso linguaggio visivo (spessore di linea, ombreggiatura, nero): sembrano usciti dallo stesso libro;
- ritmo delle dimensioni: poche ancore grandi, alcuni medi, tanti piccoli; mai due grandi vicini;
- spazi regolari: la pelle tra i pezzi è distribuita in modo uniforme, il vuoto fa parte del disegno;
- filler minuscoli (stelline, puntini, piccoli simboli) che cuciono i pezzi;
- un mondo comune: soggetti diversi dello stesso universo tematico.
Vantaggio per me: si costruisce nel tempo, come una filosofia che evolve. Idea collegata: grimorio.

**Consiglio pratico:** quando lo stile è scelto, portare concetto e reference al tatuatore e chiedergli di progettare l'intera sleeve sul braccio (anche a mano libera con il pennarello) prima di iniziare.

### 4.8 Percorsi (`percorsi/`)

Fili narrativi che attraversano tutte le dimensioni. Sono il modo per leggere il repository come una storia.

- **Il peso → lo sguardo → l'oltre** (`peso-sguardo-oltre`) — il percorso principale (vedi 4.2). Il peso: dolore, Sisifo che spinge, la selva oscura, Zapffe. Lo sguardo: lucidità, la discesa di Sisifo, il viandante, Rust. L'oltre: amore e verità, Psiche, Bernini, le stelle di Dante.
- **Le tre metamorfosi** (`tre-metamorfosi-percorso`) — cammello, leone, fanciullo.
- **Dall'io al noi** (`dall-io-al-noi`) — la rivolta che diventa solidarietà (Camus), il sacrificio anonimo, la dissoluzione dell'io, il leader che scompare.
- **Dal dolore alle stelle** (`dal-dolore-alle-stelle`) — Dante che esce "a riveder le stelle", Rust che nel finale guarda il cielo. La stessa uscita, a settecento anni di distanza.
- **Le versioni di me morte lungo il cammino** (`versioni-morte`) — Prigioni, nave di Teseo, fenice, serpente, kintsugi.

### 4.9 Idee (`idee/<slug>/<slug>.md`)

Stato iniziale di tutte: `seme`, salvo dove indicato. Il campo `risonanza` lo compilo io.

---

#### Il Cammino: sleeve dantesca (`sleeve-dantesca`)
- **Formato:** sleeve · **Placement:** braccio intero, letto dal polso alla spalla come una salita.
- **Concetto:** la Commedia come struttura archetipica del viaggio dal dolore all'amore e alla verità. Le tre cantiche finiscono tutte con "stelle": il dolore attraversato porta all'amore.
- **Composizione:** polso e avambraccio, la selva oscura e l'Inferno; gomito, la montagna del Purgatorio; spalla, la candida rosa dell'Empireo. Ponte con True Detective: Rust che esce dal buio e guarda le stelle.
- **Reference:** dore-commedia, rodin-porta-inferno (Il Pensatore come Dante).
- **Collegamenti:** divina-commedia, dal-dolore-alle-stelle, peso-sguardo-oltre, amore, verita, stelle, incisione-xilografia, sleeve-unita.

#### La discesa di Sisifo (`discesa-di-sisifo`)
- **Formato:** pezzo singolo verticale · **Placement:** schiena, polpaccio o fianco.
- **Concetto:** l'ora della coscienza. Non il Sisifo che spinge, ma quello che torna giù, lucido. Il mio "non nascondermi, affrontarlo".
- **Composizione:** Sisifo di spalle che scende il pendio, il masso fermo in cima dietro di lui, un cielo enorme davanti. La composizione del Viandante di Friedrich, ma con il peso alle spalle invece che l'ignoto davanti.
- **Reference:** tiziano-sisifo, von-stuck-sisifo (figura); friedrich-viandante, friedrich-monaco (composizione).
- **Collegamenti:** sisifo, camus, assurdo, lucidita, masso, viandante, peso-sguardo-oltre.
- **Variante minimale e assurdista:** una figura minuscola davanti a un mare e un cielo immensi e vuoti, quasi tutto spazio negativo (dal Monaco in riva al mare di Friedrich).

#### Il Prigione: il non-finito (`il-prigione`)
- **Formato:** pezzo singolo · **Placement:** spalla e pettorale (la muscolatura asseconda la figura che emerge).
- **Concetto:** il dolore come scalpello. Ogni versione di me morta lungo il percorso è marmo tolto. Il non-finito rappresenta una filosofia in evoluzione: un uomo che non ha finito di diventare se stesso e non pretende di averlo fatto. Forse l'idea più adatta a restare vera nel tempo.
- **Reference:** michelangelo-prigioni.
- **Collegamenti:** versioni-morte, evoluzione-e-percorso, nave-di-teseo, marmo-non-finito, battaglie-interiori, black-and-grey-realism.

#### Amore e Psiche (`amore-e-psiche`)
- **Formato:** pezzo singolo, eventualmente in coppia con verita-di-bernini (due braccia, oppure petto e schiena).
- **Concetto:** l'anima perde l'amore cercando la verità, attraversa il dolore e li ritrova entrambi.
- **Reference:** canova-amore-psiche, asino-d-oro.
- **Collegamenti:** psiche (mito), amore, verita, lampada, peso-sguardo-oltre.

#### La Verità di Bernini (`verita-di-bernini`)
- **Formato:** pezzo singolo, in coppia con amore-e-psiche.
- **Concetto:** il dolore e il tempo come forze che svelano; la verità che resta quando tutto il resto è passato. Bernini la scolpì nel suo momento peggiore, e il Tempo non lo scolpì mai.
- **Reference:** bernini-verita.
- **Collegamenti:** verita, velo, sole, caduta-e-redenzione, peso-sguardo-oltre.

#### La Porta della Verità (`porta-della-verita`)
- **Formato:** pezzo singolo.
- **Concetto:** lo scambio equivalente: la verità si paga, e la si può guardare solo dopo aver perso qualcosa. Il riferimento a FMA resta nascosto: chi conosce l'anime lo riconosce, chi non lo conosce vede un simbolo esoterico.
- **Composizione:** porta di pietra monumentale con l'Albero della Vita inciso, socchiusa, luce che filtra.
- **Reference:** fma-brotherhood, rodin-porta-inferno (monumentalità), fludd (l'Albero).
- **Collegamenti:** scambio-equivalente, prezzo-della-conoscenza, porta, albero-della-vita, soglia-e-mistero.

#### Il viandante oltre il firmamento (`viandante-oltre-il-firmamento`)
- **Stato:** `in-esplorazione` · **Formato:** pezzo singolo, possibile ancora di un patchwork.
- **Concetto:** tiene insieme più fili di tutte: il cammino, l'affrontare la realtà fino al suo bordo, e il mistero che si apre quando ci arrivi. Le domande che non sapevo di volere.
- **Reference:** incisione-flammarion.
- **Collegamenti:** viandante, soglia-e-mistero, avventura-e-scoperta, meraviglia, ruote, occhi, peso-sguardo-oltre.

#### L'angelo malinconico (`angelo-malinconico`)
- **Concetto:** la malinconia di chi intuisce una conoscenza più alta senza raggiungerla. Una figura che guarda qualcosa che noi non vediamo.
- **Reference:** durer-melencolia.
- **Collegamenti:** malinconia, soglia-e-mistero, clessidra, poliedro, scala.

#### Il velo di Iside (`velo-di-iside`)
- **Concetto:** il mistero che resta mistero; la verità velata. Speculare alla Verità di Bernini, dove il velo cade.
- **Collegamenti:** iside, kant, velo, verita, soglia-e-mistero.

#### La ruota degli Ofanim (`ruota-degli-ofanim`)
- **Concetto:** una coscienza così elevata da non avere più forma umana. Il non umano e inaccessibile.
- **Collegamenti:** ofanim, occhi, ruote, dissoluzione-dell-io, soglia-e-mistero.

#### Il cosmo alchemico (`cosmo-alchemico`)
- **Concetto:** un sistema di significati che si intuisce senza decifrarlo.
- **Reference:** fludd, mutus-liber.
- **Collegamenti:** alchimia, ermetismo, occhi, scala, soglia-e-mistero.

#### Ascesa dal polso alla spalla (`ascesa-dal-polso-alla-spalla`)
- **Formato:** sleeve unita (alternativa al patchwork).
- **Concetto:** il braccio come ascesa dal dolore verso il mistero. Avambraccio: il cammino e il peso (viandante, Sisifo, selva). Gomito: la soglia (volta del cielo squarciata, porta, velo). Parte superiore e spalla: il cosmo nascosto (ruote celesti, occhi, coscienza elevata). Collante e motivo ricorrente: orbite celesti e linee d'incisione che scendono dalla spalla avvolgendo il braccio, sfumando in stelle e nebbia.
- **Collegamenti:** sleeve-unita, peso-sguardo-oltre, viandante, soglia-e-mistero.

#### Il grimorio (`grimorio`)
- **Stato:** `in-esplorazione` · **Formato:** patchwork. **Corrisponde alle mie preferenze emerse** (patchwork + esoterico).
- **Concetto:** il braccio come le tavole di un antico trattato esoterico (Mutus Liber, Fludd, Dürer). Ogni tatuaggio è un'illustrazione dello stesso libro, tutte in stile xilografia cinquecentesca. Chi lo guarda intuisce un sistema di significati senza riuscire a decifrarlo del tutto.
- **Composizione:**
  - *Ancore grandi* (le mie tappe): viandante oltre il firmamento, Sisifo in discesa, angelo malinconico, velo di Iside, ruota degli Ofanim.
  - *Medi* (oggetti simbolici): clessidra, lampada di Psiche, chiave, poliedro di Dürer, ouroboros.
  - *Filler*: stelle, glifi alchemici, piccoli occhi, simboli planetari.
- **Vantaggio:** si costruisce nel tempo, un pezzo per ogni tappa del percorso.
- **Collegamenti:** patchwork, incisione-xilografia, soglia-e-mistero, tutte le idee esoteriche.

#### I 36 giusti (`i-36-giusti`)
- **Formato:** pezzo piccolo, filler o pezzo discreto.
- **Concetto:** il bene che regge il mondo senza essere visto. Le due lettere ל״ו: discrete, misteriose, piene di significato per chi le conosce.
- **Collegamenti:** sacrificio-anonimo, lamed-vav, lamed-vav-lettere, dall-io-al-noi.

#### Trittico delle metamorfosi (`trittico-metamorfosi`)
- **Stato:** `seme` (proposta nata ora in fase di raccolta, non ancora discussa).
- **Formato:** trittico, oppure tre pezzi del grimorio.
- **Concetto:** cammello, leone, fanciullo. L'intero percorso in tre figure.
- **Collegamenti:** tre-metamorfosi, nietzsche, apatia, rabbia, gioia, evoluzione-e-percorso.

---

### 4.10 Spunto di esempio: True Detective, la coscienza come passo falso

Questo è il modello di come dovrebbe vivere uno spunto. Cartella: `spunti/true-detective-coscienza/`, nota `true-detective-coscienza.md`.

**Il frammento.** Stagione 1, episodio 1 (*The Long Bright Dark*). In macchina con Marty, Rust Cohle dice che secondo lui la coscienza umana è stata un passo falso tragico dell'evoluzione ("a tragic misstep in evolution"): siamo diventati troppo consapevoli di noi stessi, la natura ha creato una parte di sé separata da sé. Ne trae una conclusione estrema: la cosa più onorevole per la specie sarebbe smettere di riprodursi. (Citazione completa: la inserisco io.)

**Perché mi colpisce.** (Da scrivere io, a pancia.)

**Genealogia.** Il pensiero di Rust ha radici precise:
- **Zapffe**, *L'ultimo Messia* (1933): la coscienza come sviluppo eccessivo, paragonata alle corna dell'alce irlandese, cresciute fino a renderlo incapace di vivere. Quattro difese: isolamento, ancoraggio, distrazione, sublimazione.
- **Ligotti**, *La cospirazione contro la razza umana*: riprende Zapffe; Pizzolatto lo ha indicato tra le sue influenze.
- **Schopenhauer**, sullo sfondo.

**Il contrappunto (ed è qui che diventa mio).**
- **Camus** parte dallo stesso punto (la coscienza davanti a un mondo senza senso) e arriva altrove: non la resa, ma la rivolta, la lucidità, la passione.
- **L'arco di Rust stesso**: nel finale (episodio 8, *Form and Void*) Rust, quasi morto, racconta che nel buio ha sentito l'amore di sua figlia e di suo padre; poi guarda il cielo e dice che un tempo c'era solo buio, e ora la luce sta vincendo. **Il personaggio attraversa esattamente il mio percorso: dal dolore e dalla coscienza come maledizione, attraverso lo sguardo lucido, fino ad amore e stelle.**
- **Zapffe stesso** lascia una porta aperta: la sublimazione, trasformare il peso in arte. Un tatuaggio è sublimazione.

**Echi visivi nella serie** (suggestioni, non intenzioni dichiarate): le corna di cervo nel primo caso; la spirale; il "tempo come cerchio piatto" (episodio 5); le stelle del finale.

**Collegamenti**
- Fonte: true-detective-s1
- Concetti: coscienza-come-peso, assurdo, prezzo-della-conoscenza, eterno-ritorno, verita, amore
- Emozioni: lucidita, vuoto, malinconia
- Simboli: alce-irlandese, stelle, spirale, ouroboros
- Fonti: zapffe, ligotti, camus
- Percorsi: peso-sguardo-oltre, dal-dolore-alle-stelle

**Idee generate da questo spunto** (nuove, da esplorare; Claude Code: creale anche come idee in `idee/`, stato `seme`):

*L'alce di Zapffe* (`alce-di-zapffe`) — un alce irlandese, o il suo scheletro, con corna immense che si ramificano fino a diventare costellazioni, o a disegnare le sefirot dell'Albero della Vita. La coscienza come corona e condanna insieme: troppo grande per vivere tranquilli, ma è con quella che si toccano le stelle.

*La luce sta vincendo* (`luce-contro-buio`) — un cielo notturno quasi tutto nero, dove poche stelle sono pelle lasciata libera: la proporzione tra luce e buio come messaggio. Minimale, leggibile solo da chi conosce il finale.

**Pinterest da collegare:** (Claude Code: in fase di triage cerca nell'inbox immagini legate a cervi/alci, cieli stellati, spirali, figure sotto le stelle, e proponimele qui.)

---

### 4.11 Prima voce di diario → `diario/2026-10-04-origine.md`

**Come è nato il progetto.** Conversazione con Claude, in cui il percorso è andato così:
1. Ho chiesto aiuto per trovare un concetto (non un soggetto) per un tatuaggio: filosofia, religione, esoterismo, pop culture. Metodo concordato: prima il concetto, poi il soggetto.
2. Primi territori proposti: memento mori, amor fati, sublime, caduta e redenzione, morte e rinascita, prezzo della conoscenza, dualità.
3. Ho buttato giù la mia lista: sacrificio anonimo, resilienza napoleonica, il condottiero, l'avventura, la dissoluzione dell'io, le battaglie interiori, il bene relativo, l'evoluzione. Più i miei riferimenti (Peterson, Marco Aurelio, Camus, FMA, True Detective, Berserk, Radiohead, Deftones).
4. È emerso un nucleo: il viaggio, l'affrontare la realtà, lo stadio assurdista non nichilista, il dolore come dimensione principale e, oltre, amore e verità.
5. Proposte artistiche: sleeve dantesca, discesa di Sisifo, Prigioni di Michelangelo, Psiche di Canova, Verità di Bernini, Porta della Verità.
6. Svolta: mi attira l'esoterico con una coscienza elevata, le "domande che non so di volere". Nuove reference: incisione Flammarion, Melencolia, velo di Iside, Ofanim, Mutus Liber, Fludd, Blake.
7. Ragionamento sulla sleeve coesa, poi chiarimento: mi piacciono le patchwork. Nasce l'idea del grimorio.
8. Decisione di spostare tutto in un repository GitHub gestito con Claude Code, per collegare Pinterest e ragionamenti e avere uno storico.

**Domande aperte:**
- Pezzo unico o patchwork che cresce nel tempo? (Inclinazione: patchwork.)
- Figura umana sulla soglia (viandante, angelo) o qualcosa di non umano e inaccessibile (velo, occhi, ruote)?
- Quale delle idee mi "colpisce" di più a pancia? (Da compilare il campo `risonanza`.)

---

## 5. Prompt per Claude Code, fase per fase

Ogni fase in una sessione separata. Alla fine di ognuna: riepilogo, commit, voce di diario.

**Fase 1 — Fondamenta e migrazione**
```
Leggi per intero SEED.md. È il seme di questo repository: contiene il lavoro fatto
finora e una proposta di architettura, non vincolante.
1. Fammi le domande della sezione 2 (Decisioni aperte), una alla volta, con pro e contro.
2. In base alle risposte, proponi la struttura definitiva e aspetta il mio ok.
3. Crea cartelle, template (_templates/), README.md, CLAUDE.md (parti dalla bozza in 3.9) e nucleo.md.
4. Scomponi la sezione 4 in note secondo l'architettura. Non perdere nessuna informazione:
   ogni concetto, fonte, simbolo, idea e collegamento deve finire in una nota.
   Collegamenti sia nel frontmatter sia nella sezione "## Collegamenti".
5. Verifica che gli slug siano unici, che non ci siano link rotti né note orfane e mostrami un riepilogo
   (quante note per tipo, le 5 note più collegate).
6. Sposta SEED.md in diario/ come documento d'origine. Commit.
```

**Fase 2 — Pinterest**
```
Voglio importare le mie board Pinterest. Ti darò gli URL.
1. Verifica quale strumento funziona oggi (gallery-dl o pinterest-dl), installalo, provalo su una board piccola.
2. Importa ogni board in inbox/pinterest/<board>/ conservando i metadati (URL del pin, descrizione).
3. Ridimensiona le immagini (lato lungo ~2000px, qualità ~85).
4. Fai un primo triage: guarda le immagini e proponimi, a gruppi, a quali spunti/idee/simboli
   collegarle o se meritano spunti nuovi. Sposta e collega solo dopo il mio ok.
   Le immagini che non vanno da nessuna parte restano in inbox: va bene così.
```

**Fase 3 — Skill di lavoro**
```
Crea le skill di progetto descritte nella sezione 3.8 del documento d'origine
(l'ex SEED.md, ora in diario/), in .claude/skills/<nome>/SKILL.md: spunto, idea, pinterest, triage, convergenze, diario.
Tienile brevi e coerenti con CLAUDE.md. Poi proviamo /spunto su un caso reale.
```

**Fase 4 — Il sito**
```
Configura Quartz in sito/ per visualizzare il vault con grafo, backlink e ricerca,
secondo la scelta fatta per il sito (locale / pubblico / privato online).
Se pubblico: escludi inbox/, le immagini Pinterest e le note con privato: true.
Homepage: nucleo.md, i percorsi, e una vista delle idee per stato.
```

**Fase 5 — Lavoro creativo (ricorrente)**
```
Leggi nucleo.md e le ultime voci di diario. Lancia /convergenze e proponimi
3 collegamenti inattesi tra dimensioni e 1 idea nuova che nasca da lì. Una domanda alla volta.
```
