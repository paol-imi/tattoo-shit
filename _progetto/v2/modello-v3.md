# Il modello v3

> Progettazione v3, 2026-10-31. Proposta di Claude, da validare. Non tocca note né script.
> È il modello **definitivo e autosufficiente**: chi lo legge non ha bisogno del [modello v2](/_progetto/v2/modello.md).
> Integra le prove sul v2: [critica del tempo](/_progetto/v2/critica-tempo.md) (crolli **C1–C15**),
> [critica della semplicità](/_progetto/v2/critica-semplicita.md) (**CS §n**), gli
> [attriti dell'importazione](/_progetto/v2/simulazione/attriti-importazione.md) (**A1–A31**) e le
> [regole d'importazione](/_progetto/v2/simulazione/regole-importazione.md). La simulazione dell'ingresso dei 25 messaggi
> è ancora in corso: verrà integrata in una revisione di questo file (§16).
> Il collaudo resta il [banco di prova](/_progetto/v2/banco-di-prova.md) (casi **B01–B25**, **D01–D25**).

**In una riga.** Tu scrivi e basta. Ogni messaggio diventa un **frammento** immutabile. L'AI lo **legge** e scrive un
*piano*; uno **script** trasforma il piano in file (letture, nodi, restituzioni) con nomi, numeri e formati identici ogni
volta. Una volta a settimana l'AI rilegge il nuovo con il vecchio e ti scrive una **lettera**. Nei file ci sono quattro
tipi, sei predicati, quattro voci. Tutto il resto si calcola, e sta in tre file di `contesto/`.

**Come si legge.** Ogni regola operativa porta un segno: **[S]** la fa uno script, deterministico, sempre uguale;
**[AI]** è un giudizio dell'AI, che lo scrive come dato perché le sessioni dopo lo ritrovino. Il §12 li mette in fila.

---

## 1. Principi

Sono dodici. Ognuno ha la prova che lo fonda.

1. **Le tue parole sono sacre.** Si conservano byte per byte, separate da ogni lettura; l'AI non parla mai con la tua
   voce. *Prova:* "te le sia inventate tu di sana pianta", l'unico scatto d'irritazione documentato
   ([archivio reale §1](/_progetto/v2/archivio-reale.md)); D02 "le mie frasi, solo le mie".
2. **Catturare costa zero.** Un tocco, "Salvato", nessuna domanda obbligatoria. *Prova:* 0 risposte su ~18 domande
   "a pancia" ([essenza §0](/_progetto/v2/essenza.md)).
3. **La struttura è dell'AI: marcata, motivata, usabile subito.** Ogni legame dice da dove viene, perché e con quale voce.
   Nessun cancello di validazione. *Prova:* 0 decisioni su ~130 proposte, poi 23 giorni di silenzio.
4. **La validazione è l'uso.** Una proposta diventa tua quando la riprendi, la porti da te o dici sì; un no non torna più;
   ciò che resta intatto sbiadisce nella vista, mai nei dati. *Prova:* il caso Karamazov; D17–D18.
5. **Il significato nasce dopo.** All'ingresso solo entità certe (compresi i concetti che
   nomini tu); i temi **dedotti** nascono alla ricorrenza, rileggendo il vecchio
   con il nuovo. *Prova:* la sequenza "padre" (D24, [cervello §1](/_progetto/v2/cervello.md)).
6. **La restituzione è il prodotto.** Prosa ancorata a tue frasi datate. Sogno, "ti ricordi?" e ritratto restano, con
   soglie e ritmi (§9). *Prova:* [essenza](/_progetto/v2/essenza.md) §1 e scene 1–6, [restituzione](/_progetto/v2/restituzione.md).
7. **Il tempo è sincero.** Doppio tempo (registrato e vissuto); le posizioni non si cancellano; l'importato non fa serie;
   nessuna curva che i dati non mostrano; un cambio di lettore non si spaccia per un cambio tuo (C13).
8. **L'archivio è una lente sul mondo.** Le risposte uniscono il tuo e il mondo, con il confine visibile; le citazioni
   sono verificate o dichiarate ⚠. *Prova:* 0 su 12 citazioni giuste alla lettera ([citazioni](/_progetto/v2/citazioni.md)).
9. **I nomi li dai tu.** I temi prendono le tue parole; il sé non si precompila; la voce dell'AI non diventa la tua (C14).
10. **Uno specchio che contraddice, con misura.** Poche cose forti; il silenzio è legittimo; mai un sollecito.
11. **Ciò che deve essere identico lo fa uno script; ciò che è giudizio lo fa l'AI e lo scrive.** Slug, nomi di file,
    numerazioni, conteggi, pulizia dei link, spostamenti: script. Intento, entità, reazioni, legami, prosa: AI, dentro un
    *piano* che lo script applica e verifica. *Prova:* [CS §3.2](/_progetto/v2/critica-semplicita.md); il primo Atlante,
    dove l'AI ricopiava e normalizzava.
12. **Un file, un solo scrittore alla volta.** Un lucchetto per il repository, un proprietario per ogni file. *Prova:* C6, C9.

---

## 2. L'architettura in breve

### 2.1 Quattro strati

| strato | cartelle | chi scrive | si modifica? | se si perde |
|---|---|---|---|---|
| **Detto** | `ingresso/` → `frammenti/` | tu (Comando rapido, sessione Specchio) o l'importazione; [S] lo sposta senza toccarlo | **mai** (verifica con hash) | perso per sempre |
| **Letto** | `letture/`, nodi in `persone/ opere/ citazioni/ temi/ raccolte/` | [AI] decide, [S] scrive | sì, per versioni; lo slug **mai** | si rifà dai frammenti, a costo di token |
| **Restituito** | `restituzioni/` | [AI] scrive la prosa, [S] numera e salva | **mai** | perso: ti ha detto qualcosa che non si ritrova |
| **Calcolato** | `contesto/` (3 file, versionato) | [S] `contesto.mjs`, senza AI | si rigenera | si rifà in un secondo |

Il formato di `frammenti/` è congelato per sempre (§11). Le restituzioni sono un diario di ciò che lo specchio ha detto.
Non esiste più `.indice/`: un solo script calcola in memoria e scrive `contesto/` (CS §1.2).

### 2.2 Il piano: come l'AI scrive senza scrivere file

L'AI non crea file a mano. In ogni ciclo riceve un **pacchetto** preparato da [S] (il frammento, `contesto/recenti.md`,
la tabella degli alias, i candidati per ogni nome, i frammenti vicini) e restituisce un **piano** JSON. [S] lo convalida
contro lo schema (§3.7), calcola slug e numerazioni, pulisce i link, scrive i file e rifiuta il piano se qualcosa non torna
(la sessione lo corregge, al massimo due volte, poi lascia il frammento in coda e lo segnala).

```json
{
  "frammento": "20261103-2340-k7q2",
  "intento": ["salva"],
  "reazione": [{"parole": "molto interessante", "verso": "+"}],
  "nodi-nuovi": [
    {"genere": "persone", "nome": "Umberto Galimberti", "alias": ["galimberti"], "cerchia": "mondo"},
    {"genere": "opere", "nome": "spettacolo sulle emozioni", "autore": "@Umberto Galimberti"},
    {"genere": "citazioni", "nome": "Il nichilismo è l'ospite inquietante", "autore": "~Friedrich Nietzsche",
     "attribuita-a": ["@Umberto Galimberti"]}
  ],
  "legami": [
    {"p": "nomina", "a": "@Umberto Galimberti", "voce": "sua", "perche": "«uno spezzone di galimberti a teatro»"}
  ],
  "parole": ["ragazzi", "cultura"],
  "risposta": {"testo": "…", "voci": [
    {"rif": "@Il nichilismo è l'ospite inquietante", "voce": "mondo", "cosa": "citazione"},
    {"rif": "@spettacolo sulle emozioni", "voce": "mondo", "cosa": "domanda"}]}
}
```

`@Nome` rimanda a un nodo nuovo dello stesso piano: [S] lo sostituisce con lo slug calcolato. Così l'AI non inventa mai
uno slug, e due piani con lo stesso nome producono lo stesso file. [S] controlla il piano con uno schema suo, piccolo
(le chiavi qui sopra, gli stessi `legame` e `voce` del §3.7, `@Nome` ammesso dove il §3.7 vuole uno slug), e poi i file
prodotti con lo schema del §3.7.

### 2.3 Gli script (tutto il codice)

| script | che cosa fa | stima |
|---|---|---|
| `smista.mjs` | `prepara` (sposta il grezzo, costruisce il pacchetto) e `applica` (piano → file) | ~250 righe |
| `slug.mjs` | `slug()`, `chiave()`, `scheletro()`, la ricerca dei candidati (§3.6) | ~60 |
| `contesto.mjs` | calcola tutto (conti, vicende, sbiadimento, accoglienze, alias) e scrive `contesto/` | ~300 |
| `verifica.mjs` | schema JSON, hash dei frammenti, immutabilità delle restituzioni, link, Q-nomi, ritornelli, budget | ~200 |
| `lucchetto.mjs` | prende e lascia il lucchetto con un push (§8) | ~50 |
| `importa.mjs` | l'Atlante, una volta sola (§14) | ~250 |
| `migra/NNN-*.mjs` | le migrazioni meccaniche (§11) | quando servono |

Circa **1.100 righe**, contro le ~2.000–2.300 del v2 pieno. I prompt sono tre: `CLAUDE.md` (regole comuni), "smista",
"settimana" (più le istruzioni della sessione Specchio e del Progetto, poche righe ciascuna).

---

## 3. Tipi e file

### 3.1 Identificatori e percorsi

| cosa | id | percorso |
|---|---|---|
| frammento | `AAAAMMGG-HHMM-xxxx` (ora locale del messaggio; `xxxx` = 4 caratteri `[a-z0-9]` casuali del Comando rapido) | `frammenti/AAAA/MM/<id>.md`, allegati accanto: `<id>.webp`, `<id>.m4a` |
| frammento importato | `AAAAMMGG-0000-<sigla>`, sigla `u01`…`u31`, `u26a`, `s01`, `s03`, `s04` | come sopra |
| lettura | lo stesso id del frammento | `letture/AAAA/MM/<id>.md` |
| restituzione | `r-AAAAMMGG-HHMM-<forma>` (+ `-2`, `-3` se collide) | `restituzioni/AAAA/MM/<id>.md` |
| restituzione importata | `r-AAAAMMGG-0000-eredita-<slug dell'idea o convergenza>` (A5) | come sopra |
| nodo | `<slug>`, unico in **tutto** il repository | `persone/ opere/ citazioni/ temi/ raccolte/<slug>.md` |
| voce di una restituzione | `r-…#n` (n da 1) | — |

Tutti i riferimenti nei frontmatter sono uno di questi id, uno slug, oppure `~Nome in chiaro` (tilde) per ciò che non è
un nodo (CS §2.3). Mai link markdown nel frontmatter.

### 3.2 `frammento`: ciò che hai detto

Lo scrive il Comando rapido, già completo, in `ingresso/`; [S] lo sposta con `git mv` e ne registra l'hash.

| campo | obbligatorio | valori | senza, che cosa fallisce |
|---|---|---|---|
| `registrato` | sì | data e ora ISO con fuso; **solo data** per `canale: importato` (A4) | D11 "cosa pensavo a marzo" |
| `canale` | sì | `telefono` · `chat` · `importato` | D01, D23: l'importato fuori dai conti |
| `voce` | solo importato | `sua` · `seme` | D02 conterebbe il nucleo come tuo |
| `forma` | solo importato | `riportata`: frase tua messa per iscritto da Claude (A2) | D02 la mostrerebbe come scritta da te |
| `allegati` | se ci sono | nomi di file accanto (`<id>.webp`) | B21 la foto della pagina |

Il corpo è il testo **esatto**, link, refusi e a capo compresi ("chioran", "nn", `?si=`). Niente titolo, niente sezioni.

```md
---
registrato: 2026-11-03T23:40:12+01:00
canale: telefono
---
ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante
```

**Il frammento di chat** (C15): una conversazione è **un** frammento, `canale: chat`, con l'id del primo turno. Il corpo
contiene **solo i tuoi turni**, parola per parola, ciascuno preceduto dall'ora tra quadre (una cornice di [S], non parole
tue). Le risposte dell'AI stanno nelle restituzioni, una per turno che ha contenuto.

```md
---
registrato: 2026-11-14T21:04:30+01:00
canale: chat
---
[21:04] canzoni sulla solitudine
[21:07] altre
[21:09] salvami la terza
[21:10] no la seconda non c'entra niente
```

Durante la conversazione il file vive in `ingresso/` e cresce (l'ingresso è l'unico posto mutabile); si sigilla in
`frammenti/` alla fine della sessione, o alla prima passata di "smista" dopo 2 ore senza turni.

### 3.3 `lettura`: ciò che l'AI ha capito di un frammento

Una per frammento, stesso id. Contiene **tutti** i legami che partono da quel frammento. La versione 1 la scrive "smista";
le versioni successive solo il consolidamento (C9). Un atto (accogli, rifiuta, correggi) **non riscrive mai** la lettura
di un altro frammento: sta nella lettura del frammento che lo compie, e lo applica [S] nel calcolo.

| campo | obbl. | che cosa | prova |
|---|---|---|---|
| `schema` | sì | `3` | C12 |
| `versione` | sì | 1 = ingresso, ≥2 = consolidamento | C9: chi l'ha scritta si controlla |
| `letto-da` | sì | il modello che l'ha letta | C13 |
| `prompt` | sì | le prime 7 cifre dell'hash del prompt usato | C13 |
| `intento` | sì | uno o più tra `salva` · `chiedi` · `sguardo` · `niente` | B11 salva **e** chiedi; B18 niente |
| `reazione` | no | `[{parole: "…citate…", verso: + / -}]` | B06 "da bacio perugina" −; D03 il conforto |
| `legami` | sì (anche vuoto) | §4 | |
| `parole` | no | parole candidate a tema: singolare, minuscolo, la tua forma ("padre", non "padri") | D24; CS §2.3 |
| `link` | no | [S] `[{url, titolo, autore}]`: puliti (`?si=` via, `t=` tenuto), titolo da oEmbed | B13, B14 |
| `trascrizione` | no | il testo letto da una foto o da un vocale; **non** è voce tua | B21 |
| `vissuto` | no | quando è accaduto, se diverso (`stanotte`, `~2009`, `≤2026-10-04`) | B17; A4 |
| `delicato` | no | `true`: fuori da lettera, ricordo, sogno, ritratto finché non ci torni tu | B12, B25; CS §2.3 |
| `nota` | no | una riga: il dove e il come ("in macchina"), o la cornice di Claude per un importato | B04; A2, A19 |
| `fonte` | solo importato | `file:riga@commit` dell'Atlante | A20 |
| `risposta` | no | id della restituzione, oppure `salvato` / `ci-sono` se non c'è file | C11 |

Un frammento è **parlante** [S] se l'intento non è solo `niente` e, tolti i link, restano almeno 3 parole sue. I non
parlanti (link nudi, "boh", "sì", "ok") restano nei dati ma non contano (§6.2).

```yaml
# letture/2026/11/20261103-2340-k7q2.md
---
schema: 3
versione: 1
letto-da: <modello>
prompt: 3f9a2c1
intento: [salva]
reazione:
  - {parole: "molto interessante", verso: "+"}
legami:
  - {p: nomina, a: umberto-galimberti, voce: sua, perche: "«uno spezzone di galimberti a teatro»"}
  - {p: nomina, a: spettacolo-sulle-emozioni, voce: sua, perche: "«credo lo spettacolo sulle emozioni»"}
  - {p: nomina, a: il-nichilismo-e-l-ospite-inquietante, voce: sua, perche: "«il nichilismo è l'ospite inquietante», detto da Galimberti secondo te"}
  - {p: parla-di, a: nichilismo, voce: sua, perche: "parola tua"}
parole: [ragazzi, cultura]
risposta: r-20261103-2341-risposta
---
```

### 3.4 `nodo`: una cosa che ritorna

Un'entità invariante: lo stesso nodo che tu dica "Galimberti", "Umberto" o "quello dell'ospite". **Nasce** quando:
- un tuo frammento la **nomina** (persona, opera, citazione, e anche un concetto o un'immagine con un nome: kintsugi,
  nave di Teseo, stoicismo, patchwork: A9);
- tu **accogli** una proposta (D17);
- il consolidamento vede un **tema** tornare (§7.4), con il tuo nome;
- l'importazione la trova **nello sguardo** (`s01`, `s04`) o in una frase tua (A16). Il racconto `s03` non fa nascere nodi.

Mai per copertura, mai per riempire un campo. La scheda è un documento d'identità, non una voce d'enciclopedia.

**Chi la scrive.** La crea "smista" (file nuovo). "Smista" può solo **aggiungere un alias**; ogni altra modifica la fa il
consolidamento (§8.3).

| campo | generi | che cosa |
|---|---|---|
| `schema`, `nome`, `nato-da` | tutti, obbligatori | `nato-da`: id di frammenti o restituzioni (le prove) |
| `alias` | tutti | le forme tue e quelle dotte (le dotte solo qui, mai nel `nome`: principio 9) |
| `link` | tutti tranne `cerchia: vita` | URL esterni (anche la scheda dell'Atlante) |
| `fuso-in` | tutti | la **lapide**: questo slug è confluito in un altro (C8) |
| `cerchia` | `persone`, obbligatorio | `mondo` · `vita` · `finzione`. Le band sono persone `mondo` (A10) |
| `in` | `persone` (finzione), `opere` | l'opera che la contiene (Telemaco → Odissea; la traccia → l'album) |
| `autore` | `opere`, `citazioni` | l'autore **vero**: slug o `~Nome`. Vuoto se ignoto |
| `attribuita-a` | `citazioni` | a chi circola attribuita (lista) |
| `originale`, `traduzione` | `citazioni` | il testo; per la traduzione, chi l'ha fatta oppure "resa di Claude" |
| `riferimento` | `citazioni` | una riga: opera, luogo, url, data della verifica; "fonte primaria" o "secondaria" in parole |
| `esito` | `citazioni` | `verificata` · `simile` · `errata` · `non-trovata`. **Senza esito = ⚠** |
| `scopo` | `raccolte` | una riga, parole tue; finché manca, `mappa.md` lo segnala e la prima risposta sulla raccolta lo chiede (A30) |

`esito` giudica l'attribuzione all'`autore`. "Autore giusto, opera sbagliata" (B07) è `verificata` con un `riferimento`
che dice l'opera vera: la vista lo mette accanto al tuo frammento. Il **vero autore ignoto** (B06) è `errata` con `autore`
vuoto; noto (B09: Nietzsche dietro Frankl) è `errata` con `autore` pieno.

Una **persona della vita** non si fonde mai con un autore, non riceve temi proposti, non ha `link`, non va mai in una
ricerca web (§10).

```yaml
# persone/umberto-galimberti.md
---
schema: 3
nome: Umberto Galimberti
alias: [galimberti]
cerchia: mondo
nato-da: [20261103-2340-k7q2]
---
```

```yaml
# citazioni/il-nichilismo-e-l-ospite-inquietante.md
---
schema: 3
nome: Il nichilismo è l'ospite inquietante
autore: "~Friedrich Nietzsche"
attribuita-a: [umberto-galimberti]
originale: "Der Nihilismus steht vor der Tür: woher kommt uns dieser unheimlichste aller Gäste? (da verificare)"
traduzione: "Il nichilismo è alla porta: da dove ci viene questo, il più inquietante fra tutti gli ospiti? (resa di Claude)"
riferimento: "Frammenti postumi 1885-1887, 2[127] (da verificare)"
nato-da: [20261103-2340-k7q2]
---
```

```yaml
# temi/stare-da-solo.md, dopo la fusione mensile: una lapide
---
schema: 3
nome: stare da solo
fuso-in: solitudine
nato-da: [20270203-2210-a8f1]
---
```

### 3.5 `restituzione`: ciò che lo specchio ti ha detto

Scritta una volta, mai cambiata ([S] confronta l'hash a ogni verifica).

| campo | obbl. | che cosa |
|---|---|---|
| `schema`, `letto-da` | sì | come nella lettura (C13d: è un fatto che *quel* modello te l'ha detto) |
| `forma` | sì | `risposta` · `lettera` · `ritratto` · `ritorno` · `eredita` (le importate dall'Atlante) |
| `per` | per `risposta` | il frammento che l'ha chiesta; `turno: "21:04"` se è una chat |
| `aggancio` | no | `{a: <id frammento>, passo: "nucleo:19"}`: la frase su cui si regge (A7). Non è "chi l'ha chiesta" |
| `voci` | sì (anche vuoto) | gli elementi numerati: `{n, rif, voce, cosa}` |
| `legami` | no | i legami che propone (convergenze, ponti), sempre `voce: proposta` o `mondo` |
| `fonte` | solo `eredita` | `file:riga@commit` (A20) |

`voci[].rif` è uno slug, un id di frammento o un `~Nome`; `voci[].cosa` dice che cosa è: `brano`, `libro`, `citazione`,
`film`, `persona`, `idea`, `ponte`, `convergenza`, `confronto`, `sogno`, `ricordo`, `domanda`, `assenza`. Il numero `n` lo assegna [S], nell'ordine
in cui le voci compaiono nel corpo; il corpo mostra gli stessi numeri. Così "la terza" è stabile (D17).

Il corpo è il testo consegnato, con i segni di voce (§5). Le convergenze dell'Atlante e i ritratti importati sono
restituzioni `eredita`: fuori dai conti, mai rilanciate, mai sbiadite, trovabili.

### 3.6 Lo slug e gli alias

**`slug(nome)`** [S], deterministica:
1. normalizza in NFKD e togli i segni diacritici; `ß`→`ss`, `æ`→`ae`, `œ`→`oe`;
2. minuscolo;
3. ogni sequenza di caratteri fuori da `[a-z0-9]` (spazi, apostrofi, punteggiatura) diventa un trattino; togli i
   trattini in testa e in coda;
4. oltre 60 caratteri, tronca all'ultimo trattino prima del sessantesimo;
5. se resta vuoto: `senza-nome`.

**Da quale nome** si parte (lo dà l'AI nel piano, la regola è fissa):

| genere | base dello slug | esempio |
|---|---|---|
| persone `mondo` | nome completo come lo conosce il mondo | `umberto-galimberti` |
| persone `vita` | il nome come lo scrivi tu | `marco`, `nonna-lina` |
| persone `finzione` | il nome del personaggio | `telemaco`, `rust-cohle` |
| opere | il titolo come lo dici tu; quello vero va in `alias` e nella risposta | `spettacolo-sulle-emozioni` |
| citazioni | le prime **6 parole** della forma che circola (dal tuo frammento, o dalla `trascrizione` se dici solo "questa", B21) | `cio-a-cui-resisti-persiste` |
| temi, raccolte | la tua parola | `padre`, `tatuaggi` |

**Collisioni.** Se lo slug esiste ed è un'altra cosa [AI decide "è lo stesso?"], [S] aggiunge il genere al singolare
(`sisifo-opera`), poi `-2`, `-3`. Per due persone della vita con lo stesso nome, l'AI propone un qualificatore tuo
(`marco-palestra`).

**Slug ereditati.** I nodi importati tengono lo slug dell'Atlante (`camus`, `rust-cohle`): uno slug non cambia mai, e la
tabella degli alias assorbe la differenza (A16). Uno slug fuso resta come lapide (§3.4).

**La tabella degli alias** [S] sta in `contesto/mappa.md` (§6.1): una riga per ogni `nome` e `alias` di ogni nodo vivo,
nella forma `chiave → slug (genere)`. `chiave(s)` = i passi 1–3 di `slug()` con lo spazio al posto del trattino.

**La risoluzione di un nome** (in "smista"):
1. [S] cerca la `chiave` esatta tra nomi e alias; per i nomi propri nudi guarda **prima** `cerchia: vita` (B06 Marco);
2. [S] propone i candidati vicini: distanza di Levenshtein ≤ 2 sulle chiavi di almeno 5 lettere, oppure lo stesso
   **scheletro** (`scheletro(s)` = chiave senza vocali, senza `h`, doppie ridotte: "chioran" e "cioran" danno entrambe `crn`);
3. [AI] sceglie tra i candidati o dice "nuovo"; se l'entità è ambigua e un errore sarebbe permanente (B04 "la 3"), fa
   **una** domanda nella risposta e intanto scrive `~Nome`;
4. [S] se la forma usata è nuova, la aggiunge agli `alias` del nodo (unica modifica di un nodo concessa a "smista").

### 3.7 La grammatica: lo schema JSON dei frontmatter

[S] `verifica.mjs` converte il frontmatter YAML in JSON, aggiunge `_genere` (dalla cartella, per i nodi) e lo valida con
questo schema prima di ogni push. Un piano che non passa non diventa file.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "memo/schema-3",
  "$defs": {
    "idF": {"type": "string", "pattern": "^\\d{8}-\\d{4}-[a-z0-9]{3,4}$"},
    "idR": {"type": "string", "pattern": "^r-\\d{8}-\\d{4}-[a-z0-9-]+$"},
    "slug": {"type": "string", "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$", "maxLength": 60},
    "chiaro": {"type": "string", "pattern": "^~\\S.*$"},
    "nodo-o-chiaro": {"anyOf": [{"$ref": "#/$defs/slug"}, {"$ref": "#/$defs/chiaro"}]},
    "oggetto": {"anyOf": [
      {"$ref": "#/$defs/slug"}, {"$ref": "#/$defs/chiaro"}, {"$ref": "#/$defs/idF"},
      {"type": "string", "pattern": "^r-\\d{8}-\\d{4}-[a-z0-9-]+(#\\d+)?$"}]},
    "voce": {"enum": ["sua", "seme", "proposta", "mondo"]},
    "quando": {"type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}(T\\d{2}:\\d{2}(:\\d{2})?(Z|[+-]\\d{2}:\\d{2}))?$"},
    "fonte": {"type": "string", "pattern": "^[^:]+:\\d+(-\\d+)?@[0-9a-f]{7}$"},
    "modello": {"type": "string", "minLength": 3},

    "legame": {
      "type": "object",
      "required": ["p", "voce", "perche"],
      "additionalProperties": false,
      "properties": {
        "p": {"enum": ["nomina", "parla-di", "serve-a", "ritorna-su", "contraddice", "converge-con"]},
        "a": {"$ref": "#/$defs/oggetto"},
        "tra": {"type": "array", "minItems": 2, "items": {"$ref": "#/$defs/oggetto"}},
        "voce": {"$ref": "#/$defs/voce"},
        "perche": {"type": "string", "minLength": 3, "maxLength": 300},
        "momento": {"type": "string", "maxLength": 60},
        "fruizione": {"enum": ["da-fare", "in-corso", "fatta"]},
        "come": {"enum": ["metafora", "stato", "aggiunge", "corregge", "ripensa", "effetto", "accoglie", "rifiuta"]},
        "n": {"type": "integer", "minimum": 1},
        "passo": {"type": "string", "pattern": "^[a-z0-9-]+:\\d+(-\\d+)?$"},
        "turno": {"type": "string", "pattern": "^\\d{2}:\\d{2}$"},
        "campo": {"enum": ["autore", "attribuita-a", "in", "nome"]},
        "valore": {"type": "string"}
      },
      "allOf": [
        {"if": {"properties": {"p": {"const": "converge-con"}}},
         "then": {"required": ["tra"], "not": {"required": ["a"]}},
         "else": {"required": ["a"], "not": {"required": ["tra"]}}},
        {"if": {"properties": {"p": {"enum": ["nomina", "parla-di", "serve-a"]}}},
         "then": {"properties": {"a": {"$ref": "#/$defs/nodo-o-chiaro"}}}},
        {"if": {"properties": {"p": {"const": "serve-a"}}},
         "then": {"properties": {"a": {"$ref": "#/$defs/slug"}}}},
        {"if": {"properties": {"p": {"enum": ["ritorna-su", "contraddice"]}}},
         "then": {"properties": {"a": {"anyOf": [{"$ref": "#/$defs/idF"}, {"$ref": "#/$defs/idR"}]}}}},
        {"if": {"properties": {"p": {"const": "ritorna-su"}}},
         "then": {"required": ["come"], "properties": {"come": {"enum": ["aggiunge", "corregge", "ripensa", "effetto", "accoglie", "rifiuta"]}}}},
        {"if": {"properties": {"p": {"const": "parla-di"}}},
         "then": {"properties": {"come": {"enum": ["metafora", "stato"]}}}},
        {"if": {"properties": {"p": {"enum": ["nomina", "serve-a", "contraddice", "converge-con"]}}},
         "then": {"not": {"required": ["come"]}}},
        {"if": {"properties": {"p": {"not": {"const": "nomina"}}}},
         "then": {"not": {"anyOf": [{"required": ["momento"]}, {"required": ["fruizione"]}]}}},
        {"if": {"required": ["campo"]},
         "then": {"required": ["valore"], "properties": {"p": {"const": "ritorna-su"}, "come": {"const": "corregge"}}}}
      ]
    },

    "frammento": {
      "type": "object",
      "required": ["registrato", "canale"],
      "additionalProperties": false,
      "properties": {
        "registrato": {"$ref": "#/$defs/quando"},
        "canale": {"enum": ["telefono", "chat", "importato"]},
        "voce": {"enum": ["sua", "seme"]},
        "forma": {"const": "riportata"},
        "allegati": {"type": "array", "items": {"type": "string", "pattern": "^\\d{8}-\\d{4}-[a-z0-9]{3,4}(-\\d)?\\.(webp|m4a)$"}}
      },
      "if": {"properties": {"canale": {"const": "importato"}}},
      "then": {"required": ["voce"]},
      "else": {
        "not": {"anyOf": [{"required": ["voce"]}, {"required": ["forma"]}]},
        "properties": {"registrato": {"pattern": "T"}}
      }
    },

    "lettura": {
      "type": "object",
      "required": ["schema", "versione", "letto-da", "prompt", "intento", "legami"],
      "additionalProperties": false,
      "properties": {
        "schema": {"const": 3},
        "versione": {"type": "integer", "minimum": 1},
        "letto-da": {"$ref": "#/$defs/modello"},
        "prompt": {"type": "string", "pattern": "^[0-9a-f]{7}$"},
        "intento": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"enum": ["salva", "chiedi", "sguardo", "niente"]}},
        "reazione": {"type": "array", "items": {"type": "object", "required": ["parole", "verso"], "additionalProperties": false,
          "properties": {"parole": {"type": "string"}, "verso": {"enum": ["+", "-"]}}}},
        "legami": {"type": "array", "items": {"$ref": "#/$defs/legame"}},
        "parole": {"type": "array", "uniqueItems": true, "items": {"type": "string", "pattern": "^[a-zàèéìòù]+( [a-zàèéìòù]+)*$"}},
        "link": {"type": "array", "items": {"type": "object", "required": ["url"], "additionalProperties": false,
          "properties": {"url": {"type": "string", "pattern": "^https://"}, "titolo": {"type": "string"}, "autore": {"type": "string"}}}},
        "trascrizione": {"type": "string"},
        "vissuto": {"type": "string", "maxLength": 40},
        "delicato": {"const": true},
        "nota": {"type": "string", "maxLength": 200},
        "fonte": {"$ref": "#/$defs/fonte"},
        "risposta": {"anyOf": [{"enum": ["salvato", "ci-sono"]}, {"$ref": "#/$defs/idR"}]}
      }
    },

    "nodo": {
      "type": "object",
      "required": ["schema", "nome", "nato-da", "_genere"],
      "additionalProperties": false,
      "properties": {
        "_genere": {"enum": ["persone", "opere", "citazioni", "temi", "raccolte"]},
        "schema": {"const": 3},
        "nome": {"type": "string", "minLength": 1},
        "alias": {"type": "array", "uniqueItems": true, "items": {"type": "string"}},
        "nato-da": {"type": "array", "minItems": 1, "items": {"anyOf": [{"$ref": "#/$defs/idF"}, {"$ref": "#/$defs/idR"}]}},
        "link": {"type": "array", "items": {"type": "string", "pattern": "^https://"}},
        "fuso-in": {"$ref": "#/$defs/slug"},
        "cerchia": {"enum": ["mondo", "vita", "finzione"]},
        "in": {"$ref": "#/$defs/nodo-o-chiaro"},
        "autore": {"$ref": "#/$defs/nodo-o-chiaro"},
        "attribuita-a": {"type": "array", "items": {"$ref": "#/$defs/nodo-o-chiaro"}},
        "originale": {"type": "string"},
        "traduzione": {"type": "string"},
        "riferimento": {"type": "string"},
        "esito": {"enum": ["verificata", "simile", "errata", "non-trovata"]},
        "scopo": {"type": "string"}
      },
      "allOf": [
        {"if": {"required": ["fuso-in"]},
         "then": {"propertyNames": {"enum": ["_genere", "schema", "nome", "nato-da", "fuso-in"]}}},
        {"if": {"properties": {"_genere": {"const": "persone"}}, "not": {"required": ["fuso-in"]}},
         "then": {"required": ["cerchia"], "propertyNames": {"enum": ["_genere", "schema", "nome", "alias", "nato-da", "link", "cerchia", "in"]}}},
        {"if": {"properties": {"cerchia": {"const": "vita"}}},
         "then": {"not": {"anyOf": [{"required": ["link"]}, {"required": ["in"]}]}}},
        {"if": {"properties": {"_genere": {"const": "opere"}}},
         "then": {"propertyNames": {"enum": ["_genere", "schema", "nome", "alias", "nato-da", "link", "fuso-in", "autore", "in"]}}},
        {"if": {"properties": {"_genere": {"const": "citazioni"}}},
         "then": {"propertyNames": {"enum": ["_genere", "schema", "nome", "alias", "nato-da", "link", "fuso-in", "autore", "attribuita-a", "originale", "traduzione", "riferimento", "esito"]}}},
        {"if": {"properties": {"_genere": {"const": "temi"}}},
         "then": {"propertyNames": {"enum": ["_genere", "schema", "nome", "alias", "nato-da", "link", "fuso-in"]}}},
        {"if": {"properties": {"_genere": {"const": "raccolte"}}, "not": {"required": ["fuso-in"]}},
         "then": {"propertyNames": {"enum": ["_genere", "schema", "nome", "alias", "nato-da", "link", "scopo"]}}}
      ]
    },

    "restituzione": {
      "type": "object",
      "required": ["schema", "forma", "letto-da", "voci"],
      "additionalProperties": false,
      "properties": {
        "schema": {"const": 3},
        "forma": {"enum": ["risposta", "lettera", "ritratto", "ritorno", "eredita"]},
        "letto-da": {"$ref": "#/$defs/modello"},
        "per": {"$ref": "#/$defs/idF"},
        "turno": {"type": "string", "pattern": "^\\d{2}:\\d{2}$"},
        "aggancio": {"type": "object", "required": ["a"], "additionalProperties": false,
          "properties": {"a": {"$ref": "#/$defs/idF"}, "passo": {"type": "string", "pattern": "^[a-z0-9-]+:\\d+(-\\d+)?$"}}},
        "voci": {"type": "array", "items": {"type": "object", "required": ["n", "rif", "voce", "cosa"], "additionalProperties": false,
          "properties": {
            "n": {"type": "integer", "minimum": 1},
            "rif": {"$ref": "#/$defs/oggetto"},
            "voce": {"$ref": "#/$defs/voce"},
            "cosa": {"enum": ["brano", "libro", "film", "citazione", "persona", "ponte", "convergenza", "confronto", "sogno", "ricordo", "domanda", "assenza", "idea"]}}}},
        "legami": {"type": "array", "items": {"allOf": [{"$ref": "#/$defs/legame"},
          {"properties": {"voce": {"enum": ["proposta", "mondo", "seme"]}}}]}},
        "fonte": {"$ref": "#/$defs/fonte"}
      },
      "allOf": [
        {"if": {"properties": {"forma": {"const": "risposta"}}}, "then": {"required": ["per"]}},
        {"if": {"properties": {"forma": {"const": "eredita"}}}, "then": {"required": ["fonte"]}, "else": {"not": {"required": ["fonte"]}}}
      ]
    }
  }
}
```

**Che cosa lo schema non vede, e controlla [S] a parte:** che ogni slug citato esista (o sia una lapide, che si segue);
che `n` esista nella restituzione puntata; che `ritorna-su … come: accoglie|rifiuta` punti a una restituzione o a un
legame proposto; che la `voce: sua` di un legame stia solo nella lettura di un frammento non importato o importato con
`voce: sua`; che i numeri `n` siano 1…k senza buchi e compaiano nel corpo; che l'hash di frammenti e restituzioni non sia
cambiato; che `versione: 1` sia scritta solo da "smista"; che il `nome` di ogni tema nato da frammenti compaia in almeno un
frammento ✦ o ✧ (Q-nomi, C14). I temi nati da un'accoglienza (`nato-da` è una voce `r-…`, come le 8 domande dell'Atlante:
A14) sono esenti: il nome è una formula dell'AI accolta da te, e le viste la mostrano ◌→● come ogni legame accolto.

---

## 4. I sei predicati

Un legame è un oggetto dell'elenco `legami:` di una lettura (o di una restituzione), **sempre nella stessa forma**:
`{p, a | tra, voce, perche, …qualificatori}`. `perche` è obbligatorio: o le tue parole tra «», o una riga dell'AI.

| `p` | da → `a` | qualificatori | prova (senza, che cosa fallisce) |
|---|---|---|---|
| `nomina` | frammento → persona, opera, citazione (o `~Nome`) | `momento` (12:34, cap. 34, traccia 3, "verso la fine"), `fruizione` (`da-fare` · `in-corso` · `fatta`) | B01, B02, B14 "dal minuto 12", B24 "devo leggere", D13 |
| `parla-di` | frammento → tema, o qualunque nodo usato come immagine | `come: metafora` · `come: stato` (lo stato d'animo del momento) | B10 "mi sento come sisifo" = metafora; D03, l'inverno: `stato` |
| `serve-a` | frammento, restituzione → raccolta | — | B07, B23, D20 |
| `ritorna-su` | frammento → frammento o restituzione (`n` per una voce, `passo` per un punto dello sguardo, `turno` nella chat) | `come`: `aggiunge` · `corregge` (+ `campo`, `valore`) · `ripensa` · `effetto` · `accoglie` · `rifiuta` | B02, B22, D05 "mi ha fatto bene", D17, D18 |
| `contraddice` | frammento → frammento (`passo` facoltativo) | — | B20 il dolore contro il nucleo; D25 "camus si sbagliava" |
| `converge-con` | `tra`: due o più tra nodi, frammenti, voci di restituzione (`r-…#2`), `~Nome` (A1) | (solo `perche`, in prosa) | B16 Eraclito = nave di Teseo, voce sua; le convergenze dell'Atlante |

**Tutti gli atti passano da `ritorna-su`** (CS §1.2): niente più `atti` e `in-risposta-a`. Esempi:

```yaml
# "salvami la terza" (turno 21:09 della chat del 14 novembre)
- {p: ritorna-su, a: r-20261114-2105-risposta, n: 3, come: accoglie, turno: "21:09", voce: sua, perche: "«salvami la terza»"}
# "no aspetta quella di ieri non era jung era peterson" (B22)
- {p: ritorna-su, a: 20270311-1822-p0x4, come: corregge, campo: attribuita-a, valore: jordan-peterson, voce: sua, perche: "«non era jung era peterson»"}
# "sì, Rust è l'ospite" sulla lettera dell'8 novembre
- {p: ritorna-su, a: r-20261108-2100-lettera, n: 1, come: accoglie, voce: sua, perche: "«sì, rust è l'ospite»"}
```

**Regole di confine.**
- **Che cosa conta come accoglienza** [S]: `come: accoglie`; `come: effetto` positivo (D05); un tuo frammento che porta
  **lo stesso legame** (stessi capi, stesso predicato). Che lo stesso pensiero torni **con altre parole** (Karamazov) lo
  decide [AI] nel consolidamento, scrivendo `come: accoglie`. **Non** conta: averla letta, o chiederne il perché (D08).
- **Un rifiuto** non si ripropone più nello stesso contesto: [S] tiene in `mappa.md` lo scarto con il tema della
  richiesta ("solitudine"); "smista" e "settimana" lo leggono prima di proporre.
- **Una correzione** (`campo`, `valore`) vale subito nelle viste ([S] la applica); il consolidamento poi aggiorna il nodo e
  scrive la versione nuova della lettura colpita. Una correzione cerca il bersaglio solo negli ultimi 3 giorni; senza
  bersaglio non c'è atto (B22).
- **`contraddice`** è una tensione, non chiude niente. Di voce `sua` ("camus si sbagliava") segna una posizione nuova con
  la data; proposto dall'AI (B20) si mostra come tensione. Non esiste lo stato `superato`: "che cosa pensavo a gennaio"
  si risponde con le date.
- **Una idea attribuita che non è una frase** (Telemaco secondo Recalcati, B05) è `nomina` della persona con voce `mondo`
  e il `perche`; non diventa una citazione.
- **`momento`** porta anche la traccia di un album ("traccia 3", B04): il titolo si risolve nel consolidamento con una
  ricerca, e nasce un'opera con `in: <album>` solo dopo la tua conferma.
- **Le copie non generano legami** (A3): se lo stesso testo vive in due frammenti importati, i legami partono solo dalla
  fonte primaria.
- **Tolti:** `sente` (è `parla-di` con `come: stato`), `tramite` (è `nomina` + il `perche`: "«marco mi ha mandato»").

---

## 5. Le voci e la provenienza

| voce | segno | che cosa vuol dire | come ci si arriva |
|---|---|---|---|
| `sua` | ✦ | l'hai detto tu, in quel frammento | lettura |
| `seme` | ✧ | dalla chat d'origine dell'Atlante: parole tue con sintesi di Claude | importazione |
| `proposta` | ◌ | lettura dell'AI | lettura, consolidamento, restituzione |
| `mondo` | ○ | fatto esterno, con il suo `esito` | lettura, consolidamento |
| *accolta* | ● | proposta e poi ripresa o confermata da te | **calcolata** [S] dai `ritorna-su` successivi; mai scritta |

Segni delle risposte, sempre gli stessi: ✦ ✧ ● ◌ ○ e ⚠ (da verificare). Una frase `forma: riportata` (A2) si mostra ✦
con la nota "trascritta da Claude nel seme".

**Gli stati** [S], calcolati e mai scritti:
- `rifiutato`: un tuo no; non entra più nelle risposte né si ripropone in quel contesto;
- `sbiadito`: un legame `proposta` mai toccato per **30 giorni attivi** (C10). *Toccato* = un frammento ✦ nomina uno dei
  suoi capi. Scende in fondo alle viste, esce dalle risposte "nella mia testa", resta nei dati e risale se torna. Le
  restituzioni `eredita` **non** sbiadiscono (A11): sono già fuori dai conti e salgono solo se un frammento le tira.

**Il ● accoglie il legame, non le parole** (C14a). Dopo "sì, la rabbia che diventa pace", il legame
`berserk ↔ marco-aurelio` è ●, ma la formula resta dell'AI: si mostra "◌→● *la rabbia che diventa pace* (formula mia,
accolta da te il 14 marzo)". **Le citazioni tue sono solo testo ✦.** Le risposte "solo le mie" (D02) mostrano ✦; il seme
✧ va a parte, come voce mista.

---

## 6. Il calcolato: `contesto/`

### 6.1 Tre file, un tetto

`contesto.mjs` [S] li rigenera alla fine di ogni sessione che ha il lucchetto (§8). Ognuno si apre con:

```yaml
aggiornato: 2026-11-07T23:41:05+01:00
fino-a: 20261107-2338-m2c9     # l'ultimo frammento compreso
token-stimati: 18400            # caratteri / 3,5
```

| file | che cosa | chi lo legge |
|---|---|---|
| `contesto/parole.md` | i frammenti **parlanti**, in ordine di tempo, parola per parola, con data e id; ✧ e importati marcati; i turni di chat senza contenuto tolti; i `delicato` marcati | Progetto, Specchio, settimana |
| `contesto/recenti.md` | gli ultimi 7 giorni di **tutti** i frammenti (anche non parlanti) e le ultime 10 restituzioni **intere**, con le voci numerate | "smista" (per "quella di ieri", "la terza"), Specchio |
| `contesto/mappa.md` | tutto il resto, per nodo e non per frammento (C7): sotto | tutti |

`mappa.md` contiene, in quest'ordine:
1. **stato**: giorni attivi totali, frammenti parlanti totali e della settimana, soglie (lettera sì/no, sogno acceso/spento, ritratto);
2. **nodi**: una riga ciascuno, `slug · genere · nome · ✦n ◌n ●n · prima–ultima data · vicenda?`; lapidi con la freccia;
3. **alias**: `chiave → slug (genere)`;
4. **parole candidate**: parola, date, giorni distinti (D24);
5. **conti** per mese, per tema, per voce, importati esclusi; le domande a parte (C15d);
6. **posizioni e tensioni**: i `contraddice` con le date;
7. **fruizioni**: da fare, in corso, fatte;
8. **correzioni** applicate e **rifiuti** con il loro contesto;
9. **nomi senza nodo** (A1, A17): ogni `~Nome` e ogni `rif` di voce di restituzione, per `chiave`, con i file che lo
   citano. Quando nasce un nodo con la stessa chiave, [S] lo collega qui **nel calcolo** (le restituzioni non si
   toccano): "Sisifo" trova le convergenze dell'Atlante anche se il nodo `sisifo` è nato dopo;
10. **ricordabili**: i frammenti ✦ oltre i 60 giorni, non delicati, mai ricordati (§9.3);
11. **seme già usato**: i nodi su cui una lettera si è già appoggiata al ✧ (C14c);
12. **voce**: gli indicatori Q (§9.5).

**Il tetto: 80.000 token in tutto** (C7). Prima si tolgono da `parole.md` i frammenti più vecchi di tre anni che non hanno
né reazioni né ritorni; poi si passa al connettore MCP o alla sessione Code. **Mai** il recupero muto: se `parole.md` è
stato tagliato, la sua testata dice da quando, e l'istruzione del Progetto obbliga a dirlo.

### 6.2 Le definizioni [S]

- **Giorno attivo**: un giorno con almeno un frammento parlante non importato. È l'unità di tutti gli orologi
  (sbiadimento, vicende), perché tu sparisci per settimane e il sistema non deve invecchiare mentre taci (C10).
- **Conti**: escludono `canale: importato`, le restituzioni `eredita`, i non parlanti. Le domande (`intento: chiedi`) si
  contano a parte: "hai chiesto tre volte di padri".
- **Vicenda**: ≥ 3 frammenti sullo stesso nodo, tema o parola candidata in **≥ 3 giorni distinti** entro 30 giorni attivi
  (C15c). Una sera di chat vale una volta.
- **Accolta**, **rifiutato**, **sbiadito**: §5.
- **Vicini** di un frammento (per il pacchetto di "smista"): fino a 10 frammenti ✦ o ✧ che condividono un nodo o una
  parola candidata, più vecchi di 7 giorni. È da qui che nasce il ponte inatteso.
- **Serie nel tempo** (D10): si contano prima le **tue parole** (ricerca nel testo dei frammenti ✦), poi, a parte, i
  legami dell'AI. Una data in cui è cambiato `letto-da` è segnata "cambio di lettore" (C13).

### 6.3 Le viste

Si calcolano al momento della domanda e non si salvano: la pagina di un nodo (3–5 "porte", cioè i tuoi frammenti più forti
con la data, poi le convergenze, poi il resto per modalità), la linea del tempo (posizioni e stati per mese, con le tue
parole), il ritratto su richiesta, le assenze (D23: al massimo tre, con numeri ✦). Ogni elenco contiene **una voce della
coda lunga**, qualcosa che non rivedi da tempo ([cervello §6](/_progetto/v2/cervello.md)).

---

## 7. I cicli e i ritmi

### 7.1 La cattura (1 secondo, senza AI)

Il **Comando rapido "Memo"** (iOS; HTTP Shortcuts su Android) scrive il frammento completo (frontmatter compreso) con un
`PUT /repos/{owner}/{repo}/contents/ingresso/<id>.md` (PAT a grana fine, solo quel repository, Contents RW), poi fa il
`fire` della Routine "smista" passando l'id come `text`. Sul telefono: "Salvato". Foto e vocali passano dallo stesso PUT,
con lo stesso id. Se tutto il resto fallisce, il grezzo c'è.

Il **Comando rapido "Chiedi"** fa lo stesso con una domanda (C15e) e poi apre il Progetto: la domanda resta anche se la
conversazione del Progetto no.

### 7.2 "Smista" (minuti, asincrono)

Routine con due inneschi: il `fire` e una passata ogni 3 ore (`7 */3 * * *`) che raccoglie i rimasti. Passi:

1. [S] **attesa e lucchetto** (§8.1);
2. [S] `smista.mjs prepara`: sposta in `frammenti/` **tutto** `ingresso/` (tranne le chat aperte), in ordine di tempo;
   per ciascuno costruisce il pacchetto (frammento, `recenti.md`, alias, candidati per ogni nome, vicini, scarti);
3. [AI] per ciascun frammento, un piano: intento, riferimenti ("quella di ieri" sugli ultimi 3 giorni), entità certe,
   `reazione`, legami di voce sua e mondo, **al massimo 2 proposti** e motivati, nessun tema **dedotto** (un concetto che nomini tu nasce
   subito, §3.4), `delicato` se serve,
   e la risposta, **solo se ha contenuto** (C11): un aggancio forte a un vicino, una correzione di fatto, una domanda sola
   su un'entità ambigua o su un fatto che resterebbe sbagliato per sempre (il titolo vero, un'attribuzione: "Correggo?"), oppure "che cosa ti ha preso?" su un link muto (una volta, mai
   ripetuta). Altrimenti `risposta: salvato` (o `ci-sono` per "boh" e per il delicato);
4. [S] `smista.mjs applica`: file, slug, numeri, link puliti, oEmbed;
5. [AI] **la verifica rapida** di una citazione: solo gli apocrifi noti (Quote Investigator, Wikiquote), 1–2 ricerche;
   altrimenti nessun `esito`, cioè ⚠;
6. [S] `contesto.mjs`, `verifica.mjs`, commit `smista: <id>…`, push, lucchetto rilasciato.

**La prudenza.** Su un tema delicato (lutto, suicidio, apatia) la risposta è una riga umana, senza proposte, temi o
diagnosi, e non finge che non sia successo niente: B12, B25, "Ci sono". La lettura ha `delicato: true`.

**Il ritorno.** Se il frammento arriva dopo **≥ 14 giorni** di silenzio, la risposta è un `ritorno`: una cosa sola,
"mentre eri via", presa da `mappa.md` (un legame nato nell'ultima lettera, un ricordabile), mai un arretrato.

### 7.3 Le domande: la sessione Specchio (tappa 1) e il Progetto

La chat del Progetto claude.ai è **in sola lettura** e non scrive nel repository (CS §2.1). Quindi:
- **Specchio** è una sessione Claude Code sul repository, aperta da te quando vuoi chiedere o leggere (1–2 minuti
  d'avvio: per una domanda va bene, per una cattura no). Scrive solo file nuovi: il frammento di chat in `ingresso/`
  (cresce turno per turno) e una restituzione `risposta` per ogni turno con contenuto. Non prende il lucchetto; alla fine,
  se `ingresso/` contiene altro e il lucchetto è libero, lancia "smista" in coda, così i ponti della giornata arrivano lì.
  Usa `contesto/` e, per il resto, `grep` sui file. **I numeri vengono da `mappa.md`: l'AI non conta.**
- **Il Progetto** resta per chiacchierare senza memoria: legge `contesto/`, e la sua istruzione obbligatoria è "se la
  domanda tocca giorni dopo `aggiornato`, dillo prima di rispondere" (C2). La memoria di claude.ai va **spenta** nel
  Progetto (C15f).
- **Tappa 2, dal secondo mese** (C1c): un connettore MCP personale (`cerca`, `leggi`, poi `salva`) che porta le domande e
  le risposte nella chat dell'app, senza Specchio.

### 7.4 La settimana (domenica sera, Routine "settimana")

Gira solo se la settimana ha almeno un frammento parlante. Prende il lucchetto. **Una passata** (CS §1.2), in quest'ordine:

1. [AI] rilegge i frammenti della settimana con un campione di **20 vecchi** sugli stessi nodi (partendo da ciò che non
   aggancia niente e da ciò che tocca lo sguardo);
2. [AI] fa nascere i **temi** ricorrenti: una parola candidata che è una vicenda (§6.2) diventa `temi/<tua parola>.md`,
   con `nato-da` uguale ai frammenti-prova; le letture toccate passano a versione nuova;
3. [AI] completa la **verifica delle citazioni** rimaste ⚠ (testo primario, poi traduzione pubblicata; un subagent ogni
   3 citazioni, [citazioni](/_progetto/v2/citazioni.md)): `esito`, `riferimento`, `originale`;
4. [AI] segna `contraddice` dove una posizione nuova urta una vecchia o lo sguardo; riconosce le accoglienze "con altre
   parole" (Karamazov);
5. [AI] applica le correzioni ai nodi (§4) e risolve le tracce in sospeso (B04);
6. [AI] scrive la **lettera**, se la soglia c'è (§9.2);
7. [S] `contesto.mjs`, `verifica.mjs`, commit, push. Il testo della lettera è anche il **messaggio finale** della
   sessione (C1b); la notifica non ha contenuto.

**Una volta al mese**, la prima domenica: in più, la **fusione dei temi** (C8a). [AI] guarda solo l'elenco dei temi (nome,
alias, conteggio, tre frasi d'esempio) e propone le fusioni; [S] `migra/fondi.mjs <da> <in>` riscrive i legami nelle
letture **senza rileggerle**, lascia la lapide e aggiunge il nome fuso agli alias. Niente divisioni scritte: i sottofili
di un tema largo si calcolano al momento della domanda (C8c).

**Ogni tre mesi** dall'inizio, la prima domenica dopo la fine del trimestre (il primo: inizio febbraio, su
novembre–gennaio): il **ritratto** al posto della lettera (§9.2).

### 7.5 La prima settimana (il nucleo minimo vitale)

Prima della pipeline, una restituzione vera (CS §4):

| giorno | che cosa |
|---|---|
| 0 | Claude Code: repository privato, importazione (§14), `smista.mjs`, `verifica.mjs`, `CLAUDE.md`. Tu: repo, App GitHub, PAT, Comando rapido **solo PUT** (~20 minuti) |
| 1 | **il primo ritratto**, sul nucleo e sulle 31 frasi tue, con **una** convergenza nuova ancorata a una tua frase |
| 1–3 | cattura cieca; la sera apri Specchio, che lancia "smista" e ti dice i ponti della giornata (al massimo uno per memo, solo se forte) |
| 3 | **prova della meraviglia**: almeno un ponte inatteso, citato alla lettera e datato? Se nessun memo aggancia niente, Specchio lo dice e non inventa |
| 5–7 | se l'apertura serale pesa: il `fire` e la Routine "smista"; la domenica, la prima lettera |

Le prove del banco da far passare per prime: **B01–B02** (Galimberti), **B06** (Marco non è Marco Aurelio), **D02** (solo
le mie).

### 7.6 Il quadro dei ritmi

| quando | che cosa | dove lo leggi (tappa 1) | soglia |
|---|---|---|---|
| a ogni memo | "Salvato" | telefono | — |
| pochi minuti dopo | la risposta, se ha contenuto | Specchio; i ponti forti anche nella lettera | C11 |
| dopo ≥ 14 giorni di silenzio | il ritorno, una cosa | Specchio, o la lettera successiva | — |
| domenica sera | la lettera | messaggio finale della Routine + notifica senza contenuto | ≥ 3 frammenti parlanti dall'ultima lettera |
| ogni tre mesi | il ritratto | come la lettera | ≥ 20 frammenti parlanti nel trimestre |
| quando chiedi | tutto | Specchio (poi MCP) | — |

---

## 8. Concorrenza

### 8.1 Il lucchetto

Le raffiche sono il modo naturale in cui scrivi (Galimberti alle 23:40, "ah e…" tre minuti dopo): due `fire` aprono due
sessioni in parallelo (C6). La regola: **l'ultima sessione vince, e una sola lavora**.

1. [S] La sessione aspetta **90 secondi**, poi `git pull`.
2. [S] Se in `ingresso/` c'è un memo **più recente** di quello del suo `fire` (contano solo i file `canale: telefono`; non le
   chat aperte né `.lavoro`), esce: lo elaborerà la sessione di quel file.
   (La passata delle 3 ore non esce mai per questo motivo.)
3. [S] `lucchetto.mjs prendi`: se `ingresso/.lavoro` esiste ed è più giovane di **20 minuti**, esce. Altrimenti scrive
   `ingresso/.lavoro` (id della sessione, ora, ciclo) e fa **commit e push**. Il push è l'arbitro: se fallisce perché un
   altro ha spinto prima, `pull`, rilegge il lucchetto, ed esce se è di un altro.
4. Lavora (§7.2 o §7.4). [S] Ogni 10 minuti, e tra un passo e l'altro della settimana, **rinnova** il lucchetto
   (commit e push di `.lavoro` con l'ora nuova): così un lavoro lungo non se lo fa prendere.
5. [S] Prima di rilasciare, `pull`: se nel frattempo sono arrivati frammenti, li elabora (al massimo 3 giri, poi li lascia
   alla passata delle 3 ore).
6. [S] `lucchetto.mjs lascia`: cancella `.lavoro` nello stesso commit del lavoro, push.

Un lucchetto più vecchio di 20 minuti è di una sessione morta: si prende. Il lavoro della sessione morta non era stato
spinto, quindi non c'è niente da riparare.

### 8.2 Idempotenza

Elaborare due volte non fa danni [S]:
- un frammento **senza lettura** è la coda. `prepara` salta ciò che ha già una lettura;
- `applica` non crea un nodo se lo slug esiste: aggiunge l'alias;
- una restituzione `risposta` è unica per la coppia (`per`, `turno`): se esiste già, il piano viene scartato. Una chat ha
  una restituzione per turno, con lo stesso `per` e turni diversi.

### 8.3 Chi scrive che cosa

| file | lo scrive | quando |
|---|---|---|
| `ingresso/<id>` | Comando rapido, Specchio (chat) | sempre, senza lucchetto (file nuovi) |
| `frammenti/` | "smista" (sposta) | con il lucchetto |
| `letture/` v1 | "smista" | con il lucchetto |
| `letture/` v≥2 | "settimana", migrazioni | con il lucchetto |
| nodi: creazione, alias | "smista" | con il lucchetto |
| nodi: ogni altro campo, lapidi | "settimana", migrazioni | con il lucchetto |
| `restituzioni/` `risposta` | "smista", Specchio | file nuovi |
| `restituzioni/` `lettera`, `ritratto` | "settimana" | con il lucchetto |
| `contesto/` | `contesto.mjs` | solo alla fine di una sessione con il lucchetto |

Specchio non tocca mai `frammenti/`, `letture/`, nodi o `contesto/`: le sue scritture sono file nuovi e non si scontrano.
Due Specchio aperti insieme scrivono due chat diverse.

---

## 9. La restituzione e la voce

### 9.1 Le regole di forma (valgono per tutto)

Dalle prove di [restituzione](/_progetto/v2/restituzione.md):
- ogni pezzo parte da una **tua frase ✦ con la data**;
- il vuoto è un dato ("nessuna canzone tua", "nessun perché");
- una convergenza ha una **direzione**: le fonti dicono cose diverse sullo stesso legame, non la stessa cosa tre volte;
  una convergenza banale non si dice;
- il mondo si verifica prima, o si dichiara ⚠;
- **nessuna domanda**, tranne in tre casi: il confronto (una, in fondo), il ritratto (una), all'ingresso l'entità ambigua, il fatto
  che resterebbe sbagliato ("Correggo?") o il link muto (una, mai ripetuta). Mai un sollecito, mai "torna" (principio 10);
- breve: una schermata del telefono.

### 9.2 Le forme

| forma | quando | che cosa contiene | soglie e limiti |
|---|---|---|---|
| `risposta` | all'ingresso, a una domanda | 1–2 righe; un aggancio, una correzione, o la risposta alla domanda con voci numerate | solo se ha contenuto (C11) |
| `lettera` | domenica sera | **una** cosa tra convergenza, confronto e sogno; i ponti della settimana (≤ 2: "martedì, salvando Galimberti, ho visto Rust"); al massimo **un ricordo** | ≥ 3 frammenti parlanti dall'ultima lettera, altrimenti slitta e la successiva copre due settimane (C3) |
| `ritratto` | ogni tre mesi | che cosa torna, che cosa è nuovo, che cosa è sparito, **che cosa manca**, una tensione, **una** domanda; una riga sulla voce (§9.5) | ≥ 20 frammenti parlanti nel trimestre, altrimenti slitta |
| `ritorno` | al primo memo dopo ≥ 14 giorni | una cosa sola | mai un arretrato |
| `eredita` | importazione | le convergenze e le idee dell'Atlante | fuori dai conti, mai rilanciate |

**Il primo ritratto** (giorno 1) è la prima restituzione del sistema, prima del primo memo (§7.5).

### 9.3 Il sogno, il ricordo, il confronto

- **Il sogno**: un solo legame lontano e ardito, dichiarato come gioco ("è un gioco"), il motivo in una riga, un colpo di
  coda che rovescia la tua formula (la *Colonia penale* di Kafka contro la pelle che scrive). È **spento sotto i 50
  frammenti parlanti** (C5): con meno materiale pescherebbe per forza nel seme. Poi al massimo **uno al mese**, a turno con
  convergenza e confronto.
- **Il ricordo** ("ti ricordi?") è un'**affermazione**, non un quiz (C4): la tua frase intera, la data, una riga d'oggi che
  dice perché torna adesso. Nessuna attesa di risposta. Solo su frammenti **✦**, **più vecchi di 60 giorni**, non
  delicati, mai ricordati prima ([S] li elenca in `mappa.md`; [AI] sceglie). Al massimo uno per lettera. Nel primo mese e
  mezzo non ce n'è, e va bene così.
  > *Il 3 novembre, quasi a mezzanotte, scrivevi: «diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn
  > stanno male per motivi psicologici ma culturali» ✦. Questa settimana l'ospite è tornato, con Cioran.*
- **Il confronto**: mette le tue frasi una accanto all'altra e ti oppone una voce che stimi; rispettoso, senza sconti, una
  domanda in fondo. Nasce da un `contraddice` fresco.

### 9.4 La colonizzazione: le parole di chi?

La voce dell'AI entra da tre porte (C14). Le chiusure:
1. **Il seme si consuma** [S+AI]: una lettera si appoggia al ✧ **una volta per nodo** (`mappa.md`, "seme già usato"); dopo,
   solo al ✦. Mai due lettere di fila sullo stesso nodo d'appoggio importato.
2. **Il ● non è un passaporto**: §5.
3. **Niente ritornelli** [S]: prima di salvare una restituzione, `verifica.mjs` cerca le sequenze di ≥ 3 parole di
   contenuto già usate in ≥ 2 restituzioni e assenti dai frammenti ✦. Se ne trova, il piano torna all'AI da riscrivere.

### 9.5 La misura della voce

[S] calcola in `mappa.md`, e il ritratto ne porta una riga:

| indicatore | come | soglia |
|---|---|---|
| **Q-nomi** | % di temi nati da frammenti il cui `nome` compare in un frammento ✦ o ✧ (esenti quelli nati da un'accoglienza) | 100%: è un errore di verifica |
| **Q-citato** | % di caratteri di lettere e ritratti tra «» e segnati ✦ | ≥ 35% |
| **Q-ancore** | tra i frammenti vecchi citati dalle lettere del trimestre, % ✦ contro ✧ | ✦ > 50% dal sesto mese |
| **Q-eco** | parole nate in una restituzione e comparse **dopo** in un tuo frammento | da mostrare, non da correggere: "parole che hai preso da me: *convergenza*, *lucidità*" |

---

## 10. Privacy

- **Il repository è privato.** L'Atlante resta pubblico e intatto; nel nuovo ci sono persone della tua vita, lutti,
  pensieri delicati (B12, B25).
- **Persone della vita** (`cerchia: vita`): niente `link`, niente temi proposti, mai fuse con un autore, **mai** in una
  ricerca web né in una chiamata esterna. Le ricerche (citazioni, oEmbed, titoli) partono solo da nomi `mondo` e da URL che
  hai mandato tu.
- **Delicato**: fuori da lettera, ricordo, sogno e ritratto finché non ci torni tu con un frammento che lo riprende;
  marcato in `parole.md`; mai citato spontaneamente.
- **Notifiche senza contenuto** ("La lettera è pronta"), perché lo schermo bloccato è pubblico. Ripiego: Pushover; ntfy no
  (topic pubblici).
- **Credenziali**: PAT a grana fine su quel solo repository, Contents RW, scadenza annuale; il token del `fire` vale solo
  per quella Routine. Nessuna credenziale nei file.
- **claude.ai**: la memoria spenta nel Progetto; da controllare l'opzione sull'uso dei dati per l'addestramento.
- **Immagini**: solo tue (foto, schermate tue, vocali); i pin restano link.
- **Uscita**: tutto è markdown e YAML in un repository git; si porta via con un `clone`.

---

## 11. Migrazioni ed evoluzione dello schema

- **`_schema.md`** alla radice: il numero di versione (oggi **3**), lo schema JSON del §3.7, la storia delle migrazioni.
  Il campo `schema: 3` sta in ogni lettura, nodo e restituzione (C12a).
- **Il frammento non ha `schema`**: il suo formato è congelato per sempre (`registrato`, `canale`, testo; per l'importato
  `voce` e `forma`). È la scelta che regge cinque anni.
- **Migrazioni meccaniche** [S] (rinominare un campo, spostare una cartella, fondere due temi): `scripts/migra/NNN-nome.mjs`,
  idempotenti, lanciate una volta, un commit "migrazione NNN", **senza AI** (C12b).
- **Migrazioni semantiche** [AI] (un genere nuovo, per esempio `luoghi/`): si rileggono solo i frammenti trovati da una
  ricerca testuale, non l'archivio intero (C12c).
- **Riletture in parallelo** (C12d): gli atti puntano a id stabili, quindi le letture si rifanno in qualunque ordine. Le
  risoluzioni dell'ingresso ("quella di ieri" → id) e i legami accolti passano al lettore nuovo come **vincoli**: vince
  l'atto.
- **Cambio di lettore** (C13): quando cambia il modello o il prompt (`letto-da`, `prompt`), una **taratura**: 100 frammenti
  campione riletti, frequenza dei predicati per tema confrontata. Scarto > 20% su un tema che compare nelle serie: si
  rileggono tutte le letture di quel tema. Altrimenti la data si segna "cambio di lettore" nelle serie.
- **Come entra un campo nuovo**: solo quando una domanda vera fallisce senza (un caso del banco o della vita), scritto nel
  registro (§15) con la prova. Ogni campo di una lettura si può aggiungere dopo rileggendo; frammenti e restituzioni no.
- **Dipendenze in anteprima** (il `fire` con `experimental-cc-routine-2026-04-01`, le notifiche, il Sync): se una cade, la
  cattura regge comunque (il PUT è GitHub puro) e la passata delle 3 ore raccoglie l'ingresso.

---

## 12. Deterministico e giudizio

| lavoro | chi | perché |
|---|---|---|
| scrivere il frammento e il suo nome | [S] Comando rapido | principio 1: un LLM che ricopia "chioran" lo corregge |
| spostare in `frammenti/`, hash | [S] | idem |
| pulire i link, normalizzare i pin, oEmbed | [S] (l'AI solo se oEmbed fallisce) | è una regex e una chiamata |
| slug, collisioni, lapidi, fusioni eseguite | [S] | "la stessa cosa, lo stesso nome" |
| alias: ricerca esatta e candidati | [S] | |
| alias: scegliere tra i candidati, "è lo stesso?" | [AI] | è un giudizio |
| numerazione delle voci | [S] | "la terza" deve essere stabile |
| accolta, rifiutato, sbiadito, vicende, conti, giorni attivi, ricordabili, soglie, Q | [S] | l'AI che conta inventa (D10, D11) |
| lucchetto, attesa, idempotenza | [S] | |
| schema, immutabilità, ritornelli, budget | [S] | |
| intento, entità, reazione, legami, `delicato`, `parole` | [AI] | giudizi, scritti come dati |
| riconoscere un'accoglienza con altre parole | [AI] | lo script vede solo legami identici |
| far nascere un tema, proporre una fusione | [AI] | |
| verificare una citazione | [AI] + ricerca | |
| scegliere il ricordo, la forma della lettera, il sogno | [AI] su `mappa.md` | nessuna formula tarata su zero dati |
| scrivere ogni prosa | [AI] | |

---

## 13. Il caso Galimberti, dall'inizio alla fine

### 13.1 Prima: il punto zero

Dall'importazione (§14) esistono già: il frammento-sguardo `20261005-0000-s01` (il nucleo, ✧), che fa nascere il tema
`nichilismo` ("non nichilismo: accettare il peso"); il frammento `20261004-0000-u19` (il monologo di Rust trascritto da te, ✦) con
il nodo `rust-cohle`. Nessun nodo Galimberti, nessun Nietzsche se lo sguardo non lo nomina (da verificare nell'eredità):
nei campi si scrive allora `~Friedrich Nietzsche`.

### 13.2 Martedì 3 novembre, 23:40: la cattura

> ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite
> inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante

1. Il Comando rapido scrive `ingresso/20261103-2340-k7q2.md` (il frammento del §3.2) e fa il `fire`. "Salvato" in un secondo.
2. 23:40 + 90 s: la sessione fa `pull`; nessun file più recente; prende il lucchetto (push di `ingresso/.lavoro`).
3. `prepara`: `git mv` in `frammenti/2026/11/`; il pacchetto: i candidati per "galimberti" (nessuno: nuovo), per "spettacolo
   sulle emozioni" (nessuno), per "nichilismo" (`nichilismo`, esatto); i vicini (`s01` e `u19`, che condividono
   `nichilismo`).
4. Il piano dell'AI (§2.2): tre nodi nuovi (lo spettacolo nasce con il nome che gli dai tu: l'identità è certa, è il
   titolo vero a essere incerto, e va negli alias quando lo confermi), quattro legami ✦, la reazione, le parole `ragazzi` e `cultura`, la risposta.
   L'AI vede il ponte con Rust ma lo giudica **non forte** a caldo (il legame c'è solo per una parola): lo tiene per la
   lettera.
5. `applica`: la lettura del §3.3, `persone/umberto-galimberti.md`, `opere/spettacolo-sulle-emozioni.md`,
   `citazioni/il-nichilismo-e-l-ospite-inquietante.md` (§3.4, senza `esito`: ⚠), e la risposta:

```md
---
schema: 3
forma: risposta
letto-da: <modello>
per: 20261103-2340-k7q2
voci:
  - {n: 1, rif: il-nichilismo-e-l-ospite-inquietante, voce: mondo, cosa: citazione}
  - {n: 2, rif: spettacolo-sulle-emozioni, voce: mondo, cosa: domanda}
---
**Salvato.** 1. "L'ospite inquietante" è un'immagine di Nietzsche ○; Galimberti ci ha scritto un libro ○.
2. Lo spettacolo era *Il mondo delle emozioni*? ⚠
```

6. Verifica rapida: nessun apocrifo noto; `contesto.mjs`; commit; lucchetto rilasciato; push. Tempo stimato: 3–5 minuti.
   **Nessuna notifica** (C1a): la risposta la vedi in Specchio, se lo apri.

### 13.3 La raffica (variante)

Se l'"ah e…" fosse arrivato alle 23:43, il secondo `fire` avrebbe aperto una seconda sessione. La prima, al risveglio dopo
90 s, avrebbe trovato in `ingresso/` un file più recente del suo ed **esce**. La seconda elabora entrambi in ordine: la
lettura dell'"ah e…" vede già il frammento delle 23:40 e risolve "la frase dell'ospite" senza fatica. Un solo push, un solo
`contesto/`.

### 13.4 Mercoledì 4 novembre, 08:12

> ah e la frase dell'ospite era verso la fine, quando parlava dei greci

```yaml
# letture/2026/11/20261104-0812-b3n8.md (estratto)
intento: [salva]
legami:
  - {p: ritorna-su, a: 20261103-2340-k7q2, come: aggiunge, voce: sua, perche: "«la frase dell'ospite era verso la fine»"}
  - {p: nomina, a: il-nichilismo-e-l-ospite-inquietante, momento: "verso la fine", voce: sua, perche: "«era verso la fine»"}
parole: [greci]
risposta: salvato
```

Nessun file di risposta (C11): "Aggiunto allo spezzone di ieri" non ha contenuto. Il frammento del 3 non si tocca.

### 13.5 Domenica 8 novembre: la prima lettera

Frammenti parlanti della settimana: E01, E02 e Sisifo felice di giovedì 5 ("stasera sto bene"): 3, la soglia c'è. Il sogno è
spento (meno di 50). Nessun ricordabile (niente ✦ oltre i 60 giorni). La passata della settimana verifica la citazione
(testo primario: il frammento postumo; `esito: simile` se la frase di Galimberti è una parafrasi dell'immagine di
Nietzsche) e scrive:

> **La settimana.** Martedì, salvando Galimberti, ho visto Rust: «il nichilismo è l'ospite inquietante» ✦ (un'immagine
> di Nietzsche ○) e il monologo che hai trascritto parola per parola ✦ ("la coscienza come passo falso") stanno sulla
> stessa porta ◌. Nel tuo nucleo c'è scritto "non
> nichilismo: accettare il peso, non nascondermi" ✧. Giovedì, con Sisifo: "stasera sto bene" ✦.
> 1. Chi apre la porta all'ospite, chi la chiude, chi lo guarda sedersi ◌.

È anche il messaggio finale della sessione; la notifica dice solo "La lettera è pronta". `mappa.md` registra: seme usato su
`nichilismo` (la prossima lettera non potrà appoggiarsi di nuovo al nucleo per questo nodo); la formula "chi apre la porta"
non potrà tornare in un'altra restituzione se non la scrivi tu.

Se apri Specchio e scrivi "sì, Rust è l'ospite", il frammento di chat accoglie la voce 1 (§4) e il legame diventa ●, con la
formula ancora marcata come mia.

### 13.6 Novembre–dicembre

- **16 novembre**, E53: Telemaco attribuito a Galimberti. `nomina: umberto-galimberti` ✦ e `nomina: ~Massimo Recalcati`
  ○ con il `perche` "l'idea del figlio che aspetta è di Recalcati (da verificare)"; risposta: "Correggo?". Se dici sì, è un
  `ritorna-su … come: corregge`.
- **20 novembre**, in Specchio: "è vera la frase dell'ospite?". Risposta dai dati: il nodo ha già `esito` e `riferimento`;
  nessun nodo nuovo nasce da una verifica (D15).
- **Sabato 28 novembre**: "oggi mi sento come sisifo" (`parla-di: sisifo, come: metafora`). La lettera del 29 mette a
  confronto il Sisifo felice del 5 con questo.
- **Silenzio dal 29 novembre al 15 dicembre** (17 giorni, nessun giorno attivo): gli orologi si fermano. Il 16 dicembre
  il primo memo riceve un `ritorno`: "Mentre eri via, nella lettera del 29: il masso o la discesa ◌."
- **Domenica 10 gennaio**: il frammento del 3 novembre ha più di 60 giorni ed è ✦: diventa il **ricordo** della lettera,
  come al §9.3. Nessuna domanda.

### 13.7 Febbraio 2027: il ritratto

> **Novembre–gennaio, 31 frammenti tuoi.** Tornano: il dolore (9), Sisifo (4), la musica di notte (6, quasi tutti dopo
> mezzanotte). È nuovo: quattro volte un padre, senza che tu l'abbia mai scritto come tema ◌. È sparito: Rust non torna da
> ottobre. Una tensione: il 5 novembre Sisifo era felice, il 28 "oggi mi sento come Sisifo" ✦. **Una domanda:** nel nucleo
> l'oltre è "amore e verità"; da novembre hai salvato molta verità e un solo amore. È una tappa o una scelta?
>
> *Voce:* il 41% di queste righe sono parole tue; hai preso da me "ospite" e "soglia".

### 13.8 Marzo 2027 e oltre

- **La fusione mensile** vede `il-nulla` (2 frammenti) accanto a `nichilismo` (7): propone la fusione; [S] la esegue;
  `temi/il-nulla.md` diventa una lapide.
- **2028, cambio di lettore**: la taratura su 100 campioni trova `parla-di: nichilismo` più raro del 30% → si rileggono
  in parallelo le 40 letture del tema, con i vincoli degli atti. La serie "nichilismo nel tempo" conta prima la parola
  nelle tue frasi, che non cambia.

---

## 14. L'importazione dall'Atlante (una volta sola)

Le regole R1–R13 dell'[eredità](/_progetto/v2/eredita.md), riscritte con gli attriti della
[simulazione](/_progetto/v2/simulazione/attriti-importazione.md). Script `importa.mjs` [S]; i giudizi segnati [AI] si
preparano prima, in una tabella che lo script legge.

| regola | che cosa |
|---|---|
| **R1 frasi sue** | U1–U31 → `frammenti/2026/10/2026MMGG-0000-uNN.md`, `canale: importato`, `voce: sua`, `registrato` solo data; corpo = **testo grezzo senza markup**, link interni resi in testo, a capo conservati (A19); la cornice di Claude va in `nota`; `forma: riportata` per le frasi scritte da Claude dalle tue parole (A2); `fonte` nella lettura (A20); `intento: [salva]` di default (A22). U26 si divide in `u26a` e `u26b` (A25) |
| **R2 lo sguardo** | il nucleo → `20261005-0000-s01`, `voce: seme`, `intento: [sguardo]`, senza i blocchi proposta (A24). Le tensioni, virtù e fortuna, evoluzione → `s04`, `voce: seme` (A15). Lo sguardo fa nascere nodi (A16); i passi si citano con `passo: nucleo:19` (A7). Il racconto della chat d'origine → `s03`, `intento: [niente]`, non fa nascere nodi |
| **R3 frasi sul sistema** | U27–U31 sono frammenti (R1) e regole nel `CLAUDE.md` con id e data. U28 ("dimmi tu") non ha un referente importato: `intento: [salva]` e una `nota` su che cosa accolse, nessun atto. U30 sì: vedi R13 (A6) |
| **R4 convergenze** | C1–C25 → restituzioni `eredita`, `r-AAAAMMGG-0000-eredita-<slug>`, data del passo (riga di `## Evoluzione` o commit: A5), `aggancio: {a, passo}`, voci numerate con `rif` a un nodo o `~Nome`; `converge-con` con `tra` che ammette voci e `~Nome` (A1); voce ✧ solo se tutto il passo è del seme validato, altrimenti ◌ (A23) |
| **R5 entità vive** | diventano nodi solo quelle nominate da te o dallo sguardo; slug dell'Atlante conservati; concetti e stili nominati da te → temi (A9); band → persone `mondo` (A10); Dostoevskij da U31 (A18); Napoleone resta alias di `resilienza-napoleonica` (A31) |
| **R6 proposte** | tutto ciò che è di Claude entra solo dentro restituzioni `eredita`, ◌, che **non sbiadiscono** (A11) |
| **R7 citazioni** | nelle tue frasi → nodi senza `esito` (⚠); quelle scelte da Claude → voci di `r-20261007-0000-eredita-citazioni`, **dopo** il protocollo sulle 17 vive (A8); se ne accogli una, il nodo nasce già con `esito` e `riferimento`; le correzioni sulle entità morte si fanno sull'Atlante, fuori dallo script |
| **R8 tatuaggi** | `raccolte/tatuaggi.md` con `nato-da: [s03]` e lo `scopo` da chiedere alla prima risposta sulla raccolta (A30); le tue idee sono frammenti con `serve-a`; le altre restituzioni `eredita` con `serve-a` ◌. Il brief `s02` non esiste: è una vista (A3) |
| **R9 ricerche** | la tua frase è il frammento; la pista è `nomina` con `fruizione: da-fare`; lo stato della ricerca nell'Atlante va in `nota` (A12) |
| **R10 pin** | link nel frammento; le descrizioni di Claude in `nota` |
| **R11 emozioni** | le 10 parole di U1 → temi; `parla-di` per le tappe, `come: stato` solo per lo stato d'arrivo, con `vissuto` (A21); le 4 di Claude non entrano |
| **R12 il resto** | un `link` alla scheda dell'Atlante |
| **R13 le 8 domande** | `r-20261007-0000-eredita-domande` con 8 voci; la lettura di U30 ("vai con la mappa") le **accoglie**: nascono 8 temi ● (A14) |
| **ordine** | frammenti → nodi → letture → restituzioni → `contesto.mjs` → verifica che nessun conto contenga l'importato |

Numeri attesi: ~35 frammenti, ~52 nodi, ~60 restituzioni `eredita`. Al giorno 1, 20 domande del banco su 25 hanno il
materiale per rispondere; D21 (tatuaggi da Sisifo) si chiude con A1 (voci indicizzate per nome).

---

## 15. Registro delle decisioni (che cosa cambia rispetto al v2)

| # | v2 | v3 | perché |
|---|---|---|---|
| 1 | l'AI scrive i file | l'AI scrive un **piano**, [S] i file | CS §3.2; principio 11 |
| 2 | il Comando rapido mette il grezzo, la Routine scrive il frontmatter | il Comando rapido scrive il frammento completo; [S] lo sposta con hash | CS §3.2 |
| 3 | ogni turno di chat è un frammento | una conversazione = un frammento `chat`, solo i tuoi turni | C15a |
| 4 | domande nel Progetto, "salvate con un memo" | Specchio (sessione Code) scrive; Progetto in sola lettura con `aggiornato`; "Chiedi"; MCP al mese 2 | CS §2.1; C1c, C2, C15e |
| 5 | risposta a ogni memo in `recenti.md`, notifiche "senza contenuto" | risposta solo se ha contenuto; nessuna notifica per memo; ponti nella lettera; la lettera è il messaggio finale della Routine | C1, C11 |
| 6 | due fasi di consolidamento, 6 azioni + 3 | una passata settimanale; fusione mensile; ritratto trimestrale | CS §1.2; C8 |
| 7 | `.indice/` (5 JSON) + 4 file in `contesto/` | 3 file in `contesto/`, con `aggiornato` e tetto di 80k token | CS §1.2; C2, C7 |
| 8 | 5 formule (forza, vitalità, sbiadito, validità, sorpresa) | conteggi e regole; sbiadito in **30 giorni attivi** | CS §1.2; C10 |
| 9 | stati `vivo`, `rifiutato`, `sbiadito`, `superato` | `rifiutato` e `sbiadito` calcolati; `superato` tolto, si risponde con le date | CS §1.2 |
| 10 | 8 predicati | 6: `sente` → `parla-di come: stato`; `tramite` → `nomina` + `perche` | CS §1.2 |
| 11 | `atti` + `in-risposta-a` + `ritorna-su` | tutto in `ritorna-su` con `n`, `passo`, `turno`, `come` | CS §1.2; D05; A7 |
| 12 | legami con chiave variabile | grammatica unica `{p, a|tra, voce, perche}`, `~Nome`, schema JSON | CS §2.3 |
| 13 | slug "mai cambiato" ma senza regola | `slug()` deterministica, alias con `chiave` e `scheletro`, collisioni, lapidi `fuso-in` | CS §2.2; C8b |
| 14 | concorrenza non trattata | attesa di 90 s, l'ultima vince, lucchetto via push, un solo scrittore per file | C6, C9; CS §2.2 |
| 15 | lettura: 11 campi | `versione`, `letto-da`, `prompt`, `schema` (tracciabilità); tolti `letto`, `contesto` (→ `nota`), `segnale` | C9, C12, C13; CS §1.2 |
| 16 | — | `delicato` nella lettura | CS §2.3; B12, B25 |
| 17 | — | `parlante` (calcolato) e `giorno attivo` come unità di tempo | C3, C10, C15 |
| 18 | intento a 7 valori | 4: `salva`, `chiedi`, `sguardo`, `niente` | CS §1.2 |
| 19 | ID esterni e `risolvi.mjs` | tolti dalla tappa 1 | CS §1.2: nessun caso del banco li usa |
| 20 | `esito` a 5 valori, `prova` | 4 valori; senza esito = ⚠ | CS §1.2 |
| 21 | `ti ricordi?` come indizio da completare, a intervalli | affermazione, solo ✦ oltre 60 giorni, mai ripetuta | C4 |
| 22 | lettera "se hai scritto" | soglia di 3 frammenti parlanti, se no slitta | C3 |
| 23 | sogno a turno dal primo mese | spento sotto 50 parlanti, poi max 1 al mese | C5 |
| 24 | ● calcolato e mostrato come tuo | ● accoglie il legame, non le parole; seme una volta per nodo; ritornelli vietati; indicatori Q | C14 |
| 25 | vicende: ≥ 3 frammenti in 60 giorni | ≥ 3 frammenti in ≥ 3 giorni distinti | C15c |
| 26 | `versione` = versione della lettura | in più `schema`, `_schema.md`, migrazioni a script, riletture parallele | C12 |
| 27 | — | taratura al cambio di lettore; serie prima sul testo ✦ | C13 |
| 28 | `importata: true` | `forma: eredita`, non sbiadisce, `fonte` | A5, A11, A20 |
| 29 | `per` sulle convergenze importate | `aggancio: {a, passo}` | A7 |
| 30 | `converge-con` solo tra nodi | anche voci di restituzione e `~Nome` | A1 |
| 31 | voce `sua`/`seme` sul frammento | + `forma: riportata` per l'importato | A2 |
| 32 | `registrato` sempre con ora | solo data per l'importato; viste orarie lo escludono | A4 |
| 33 | il nucleo un solo frammento-sguardo | + `s04`; lo sguardo fa nascere nodi; slug dell'Atlante conservati | A15, A16 |
| 34 | le 8 domande temi "voce seme" | restituzione `eredita`, accolte da U30 → 8 temi ● | A14 |
| 35 | il brief `s02` | tolto: è una vista | A3 |
| 36 | `prova: memoria` sulle citazioni di Claude | protocollo sulle 17 vive prima dell'import | A8 |
| 37 | 2 Routine (smista, sogno) | 2 Routine (smista, settimana): il cron e il `fire` sono inneschi diversi | CS §1.2 corretto: un'unica Routine non ha due prompt |
| 38 | primo traguardo: un ritratto | prima settimana senza Routine né Progetto; il ritratto al giorno 1; prova della meraviglia al giorno 3 | CS §4 |

**Scartati, con il motivo:**
- *Togliere sogno, "ti ricordi?" e ritratto* (CS §1.2): restano. Il banco non li collaudava, ma la ricerca dice che la
  meraviglia sta lì ([essenza](/_progetto/v2/essenza.md), [restituzione](/_progetto/v2/restituzione.md),
  [cervello §6–7](/_progetto/v2/cervello.md)); li governano le soglie di C3–C5.
- *Togliere `versione` della lettura* (CS §1.2): resta, perché serve a controllare l'unico scrittore (C9).
- *Togliere `vissuto`* (CS §1.2): resta facoltativo, perché l'importazione ne ha bisogno (A4, A21).
- *Togliere `recenti.md`* (CS §1.2): resta, perché `parole.md` ha solo i parlanti (C7) e "la terza" vuole le restituzioni intere.
- *Q-nomi su ≥ 2 frammenti ✦* (C14): basta uno ✦ o ✧, perché un tema nato dal tuo primo nome (A9) o dall'importazione è
  legittimo.
- *Preparare il "mentre eri via" all'ultimo consolidamento* (C, nota finale): si compone al ritorno da `mappa.md`, che è
  già pronta; preparare un testo senza sapere se arriverà un silenzio vorrebbe dire scriverlo ogni settimana.
- *Lucchetto `ingresso/.lavoro` di 10 minuti* (CS §2.2): 20 minuti, perché il consolidamento dura 10–30 minuti (C §2) e
  rinnova il lucchetto a ogni giro.
- *A6* è accolto con un ritocco: l'intento `accogli` non esiste più; vedi R3.
- *`parole.md` solo ✦* (C7): ci stanno anche i ✧ e gli importati, **marcati**. Sono pochi (~35 frammenti) e senza di loro
  il Progetto non risponde a "cosa pensavo a ottobre" (principio 7); il tetto resta.
- *Gli attriti bassi A10, A12, A13, A22, A25, A26, A27, A28, A29, A31* sono accolti come scritti negli attriti (§14),
  tranne A27 (`punto-zero.md`), che non serve più: `recenti.md` non ha un limite di voci ma di giorni.

---

## 16. Che cosa resta aperto

1. **La notifica della Routine apre la sessione con la lettera leggibile nell'app?** È la prova da fare per prima: se no,
   la tappa 1 va ripensata attorno a un canale letto davvero (Pushover con un link a Specchio).
2. **I tempi veri** di "smista" (stimati 3–5 minuti) e della settimana (10–30 minuti), e il costo in token a memo.
3. **La simulazione dell'ingresso** dei 25 messaggi è in corso: i suoi attriti entreranno qui.
4. **Il banco** va ripassato sul v3 (S3: le 25 domande sui dati simulati) e va esteso alla restituzione (sogno, ricordo,
   ritratto), che un'altra sessione sta scrivendo.
5. **Scelte tue**: quanto parla per primo lo specchio (racc.: lettera la domenica più ritratto trimestrale); il sogno
   (racc.: sì, max 1 al mese, dai 50 frammenti); la domanda sul link muto (racc.: una, mai ripetuta); il nome del repository.
6. **Da verificare**: se lo sguardo nomina Nietzsche (per lo slug del §13); i riferimenti delle citazioni del §13.

## Collegamenti

- [Modello v2](/_progetto/v2/modello.md) · [Banco di prova](/_progetto/v2/banco-di-prova.md) ·
  [Critica del tempo](/_progetto/v2/critica-tempo.md) · [Critica della semplicità](/_progetto/v2/critica-semplicita.md) ·
  [Attriti dell'importazione](/_progetto/v2/simulazione/attriti-importazione.md) ·
  [Regole d'importazione](/_progetto/v2/simulazione/regole-importazione.md) · [Telefono](/_progetto/v2/telefono.md) ·
  [Essenza](/_progetto/v2/essenza.md) · [Restituzione](/_progetto/v2/restituzione.md) · [Eredità](/_progetto/v2/eredita.md)
