# Simulazione d'ingresso: i 25 messaggi del banco

> Progettazione v2, 2026-10-31. Proposta di Claude, da validare. Simulazione: i file qui sotto sono finti e stanno in
> blocchi di codice, non sono note. Applica [il modello](/_progetto/v2/modello.md) al
> [banco di prova](/_progetto/v2/banco-di-prova.md); ciò che stride è raccolto in [gli attriti](/_progetto/v2/simulazione/attriti-ingresso.md).

**Come leggere.** Ogni file è un blocco di codice preceduto dal suo percorso in grassetto, come `inline-code`
(per esempio **`frammenti/2026/11/20261103-2340.md`**). Per ogni messaggio: il **frammento**, la **lettura**, i **nodi**
nuovi o aggiornati, la **restituzione**, la **risposta** che vedi sul telefono (in `contesto/recenti.md`) e i **costi**
(file scritti, domande fatte). Gli id dei frammenti importati portano un suffisso di 4 lettere (`-nucl`, `-perc`…):
è lo `xxxx` del modello, qui necessario perché più frammenti cadono nello stesso minuto.

## 0. Punto zero

L'archivio importato dall'Atlante (4–7 ottobre 2026). Tutto ha `canale: importato`, resta fuori dalle serie e dai conti;
`registrato` è l'ora del primo commit della nota d'origine (fuso +02:00). Provenienza: il campo `link` della lettura,
verso il commit `4c9fdce` dell'Atlante. Si importano qui 5 frammenti su 31 (quelli che i 25 messaggi toccano), 2
restituzioni su 25 + 31, e i nodi che ne nascono. Delle entità vive diventano nodi solo quelle nominate nelle sue parole
(modello §8.5): **Nietzsche, Jung, Sisifo non sono nodi** al punto zero.

### 0.1 Il nucleo (lo sguardo, ✧)

**`frammenti/2026/10/20261004-2228-nucl.md`**

```md
---
registrato: 2026-10-04T22:28:39+02:00
canale: importato
voce: seme
---
Attraversare il dolore a occhi aperti, e trovare dall'altra parte amore e verità.

L'avventura. Il viaggio nell'esistenza, l'affrontare la realtà, l'evoluzione della propria filosofia.

In uno stadio assurdista, alla Camus. Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo.

La dimensione principale della realtà è il dolore. Ma cosa c'è oltre? Amore e verità.

1. Il peso: il dolore come dimensione fondamentale della realtà.
2. Lo sguardo: affrontarlo senza nascondersi, con lucidità.
3. L'oltre: amore e verità, che si trovano solo dopo averlo attraversato.

Il mistero non come risposta, ma come orizzonte. Non "il mondo non ha senso", ma "il mondo è più vasto di quello che posso capire, e questo mi affascina". Compatibile con l'assurdo: non pretende risposte, lascia aperta la soglia.

Il tatuaggio deve rappresentare il viaggio e l'atto di affrontare, non lo stadio assurdista in sé. Così resterà vero anche se la mia filosofia evolve.

Prima il concetto, poi il soggetto. Nessun limite di tono: può essere macabro quanto puro.

Territori di partenza: filosofia (soprattutto correnti intense come stoicismo e romanticismo), religione (dal cristianesimo alle divinità greche), esoterismo e mistero, estratti da serie TV, anime, film cult e canzoni.

- Persone che hanno segnato la mia visione: Jordan Peterson, Marco Aurelio, Albert Camus.
- Serie e personaggi: Fullmetal Alchemist: Brotherhood, True Detective, Berserk.
- Musica: Radiohead, Deftones, quella wave rock eterea e malinconica.

- Mi attira il filone esoterico in cui si percepisce una coscienza elevata: guardando il tatuaggio deve nascere la sensazione che esistano risposte a domande che non ho, anzi domande che ancora non so di volere.
- Mi piacciono le patchwork sleeve: pezzi separati, di dimensioni diverse, con pelle libera tra loro, che però si leggono come un'unica opera. Non le sleeve "fuse" con sfondo continuo.
- Estetica che si sta delineando: nero, incisione/xilografia antica, mistero.
```

Tolti dal testo del nucleo: i titoli di sezione, i link interni, il blocco proposta del grimorio (di Claude) e il
paragrafo del percorso interiore, che entra da solo (0.2) con voce sua.

**`letture/2026/10/20261004-2228-nucl.md`**

```md
---
versione: 1
letto: 2026-10-31T10:00:00+01:00
intento: [sguardo]
vissuto: "≤2026-10-05"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/nucleo.md
legami:
  - parla-di: dolore
    voce: seme
    perche: "«La dimensione principale della realtà è il dolore»"
  - parla-di: nichilismo
    voce: seme
    perche: "«Non nichilismo: accettare il peso…»: nominato per negarlo"
  - nomina: albert-camus
    voce: seme
    perche: "«alla Camus»; «Persone che hanno segnato la mia visione»"
  - nomina: jordan-peterson
    voce: seme
    perche: "«Persone che hanno segnato la mia visione»"
  - nomina: marco-aurelio
    voce: seme
    perche: "«Persone che hanno segnato la mia visione»"
  - nomina: fma-brotherhood
    voce: seme
    perche: "«Serie e personaggi»"
  - nomina: true-detective
    voce: seme
    perche: "«Serie e personaggi»"
  - nomina: berserk
    voce: seme
    perche: "«Serie e personaggi»"
  - nomina: radiohead
    voce: seme
    perche: "«Musica»: atmosfera, nessuna canzone"
  - nomina: deftones
    voce: seme
    perche: "«Musica»: atmosfera, nessuna canzone"
  - parla-di: stoicismo
    voce: seme
    perche: "«correnti intense come stoicismo e romanticismo»"
  - parla-di: romanticismo
    voce: seme
    perche: "«correnti intense come stoicismo e romanticismo»"
  - serve-a: tatuaggi
    voce: seme
    perche: "è il brief: metodo, avvertenza, patchwork, nero e incisione"
parole: [assurdo, amore, verità, mistero, esoterico]
---
```

### 0.2 Il percorso interiore (✦)

**`frammenti/2026/10/20261004-2212-perc.md`**

```md
---
registrato: 2026-10-04T22:12:04+02:00
canale: importato
voce: sua
---
**Il mio percorso interiore, con le mie parole** (da conservare così com'è): battaglie interiori, solitudine, senso di vuoto, apatia, dolore, rabbia, risentimento. Percorso, avventura, musica, caos, libertà, gioia, vincere se stessi. Consapevolezza, pace interiore nel guardare alle battaglie interiori e alle versioni di me morte lungo il percorso, innalzarsi a una dimensione superiore. Assurdità dell'essenza stessa della vita, calma nell'esplorarne i concetti data dall'immensità del dolore superato.
```

**`letture/2026/10/20261004-2212-perc.md`**

```md
---
versione: 1
letto: 2026-10-31T10:00:00+01:00
intento: [sguardo]
vissuto: "≤2026-10-04"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/diario/2026-10-04-seed.md#L282
legami:
  - sente: [battaglie-interiori, solitudine, vuoto, apatia, dolore, rabbia, risentimento, caos, liberta, gioia, pace-interiore]
    voce: sua
    perche: "le parole del percorso, nel suo ordine"
parole: [versioni di me morte, vincere se stessi, avventura, musica]
---
```

### 0.3 Il monologo di Rust (✦)

**`frammenti/2026/10/20261004-2228-rust.md`**

```md
---
registrato: 2026-10-04T22:28:39+02:00
canale: importato
voce: sua
---
I think human consciousness is a tragic misstep in human evolution. We became too self aware; nature created an aspect of nature separate from itself. We are creatures that should not exist by natural law. We are things that labor under the illusion of having a self, a secretion of sensory experience and feeling, programmed with total assurance that we are each somebody, when in fact everybody’s nobody. I think the honorable thing for our species to do is deny our programming, stop reproducing, walk hand in hand into extinction, one last midnight, brothers and sisters opting out of a raw deal.
```

**`letture/2026/10/20261004-2228-rust.md`**

```md
---
versione: 1
letto: 2026-10-31T10:00:00+01:00
intento: [salva]
contesto: "trascritto da lui (True Detective, ep. 1), «come l'ho trascritta io»"
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/spunti/true-detective-coscienza/index.md#L28
legami:
  - nomina: monologo-di-rust
    momento: "ep. 1"
    voce: sua
    perche: "trascrizione sua, parola per parola"
  - nomina: true-detective
    voce: sua
    perche: "lo spunto è sulla serie"
parole: [coscienza]
---
```

### 0.4 Il sognatore insonne, idea sua (✦)

**`frammenti/2026/10/20261004-2308-sogn.md`**

```md
---
registrato: 2026-10-04T23:08:52+02:00
canale: importato
voce: sua
---
"I don't sleep, I just dream", con il pin qui sotto.

Una sagoma, il fumo della sigaretta, la frase.

1. Come giocare con il fumo della sigaretta?
2. Come disporre la sagoma rispetto al testo?

https://www.pinterest.com/pin/970173944741790982/
```

**`letture/2026/10/20261004-2308-sogn.md`**

```md
---
versione: 1
letto: 2026-10-31T10:00:00+01:00
intento: [salva]
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/idee/sognatore-insonne/index.md#L24
legami:
  - nomina: true-detective
    voce: sua
    perche: "«I don't sleep, I just dream», la frase di Rust"
  - serve-a: tatuaggi
    voce: sua
    perche: "idea sua (origine: mia), con le sue due domande aperte"
parole: [sigaretta, sagoma]
---
```

### 0.5 I Pensieri, la pista (✦)

**`frammenti/2026/10/20261005-0011-pens.md`**

```md
---
registrato: 2026-10-05T00:11:14+02:00
canale: importato
voce: sua
---
Rileggere i Pensieri (le Meditazioni) cercando materiale per tatuaggi: frasi, immagini, convergenze.
```

**`letture/2026/10/20261005-0011-pens.md`**

```md
---
versione: 1
letto: 2026-10-31T10:00:00+01:00
intento: [salva]
link: https://github.com/paol-imi/tattoo-shit/blob/4c9fdce/ricerche/pensieri-marco-aurelio/index.md#L7
legami:
  - nomina: pensieri
    fruizione: in-corso
    voce: sua
    perche: "«Rileggere i Pensieri»; ricerca in-corso"
  - serve-a: tatuaggi
    voce: sua
    perche: "«cercando materiale per tatuaggi»"
---
```

### 0.6 I nodi

**`raccolte/tatuaggi.md`**

```md
---
nome: tatuaggi
alias: [tatuaggio, tattoo]
scopo: "materiale per tatuaggi: frasi, immagini, convergenze"
nato-da: [20261004-2228-nucl, 20261004-2308-sogn, 20261005-0011-pens]
---
```

**`temi/nichilismo.md`** · **`temi/dolore.md`** · **`temi/battaglie-interiori.md`** (gli altri temi sono uguali, con il loro nome)

```md
---
nome: nichilismo
alias: []
nato-da: [20261004-2228-nucl]
---
```

```md
---
nome: dolore
alias: []
nato-da: [20261004-2228-nucl, 20261004-2212-perc]
---
```

```md
---
nome: battaglie interiori
alias: [guerra con me stesso]
nato-da: [20261004-2212-perc]
---
```

**`temi/chi-sono.md`** (una delle 8 domande; le altre uguali)

```md
---
nome: Chi sono?
alias: [l'io, l'ombra, le maschere]
nato-da: []
---
```

**`persone/albert-camus.md`** (e così `jordan-peterson`, `marco-aurelio`, `radiohead`, `deftones`, tutti `cerchia: mondo`, `nato-da: [20261004-2228-nucl]`)

```md
---
nome: Albert Camus
alias: [camus]
cerchia: mondo
nato-da: [20261004-2228-nucl]
---
```

**`opere/true-detective.md`** (e così `fma-brotherhood`, `berserk`, `nato-da: [20261004-2228-nucl]`)

```md
---
nome: True Detective (stagione 1)
alias: [true detective]
autore: Nic Pizzolatto
nato-da: [20261004-2228-nucl, 20261004-2228-rust, 20261004-2308-sogn]
---
```

**`opere/pensieri.md`**

```md
---
nome: Pensieri
alias: [meditazioni, a se stesso]
autore: marco-aurelio
link: https://www.gutenberg.org/ebooks/15877
nato-da: [20261005-0011-pens]
---
```

**`citazioni/monologo-di-rust.md`**

```md
---
nome: Il monologo di Rust
autore: Nic Pizzolatto
detta-da: Rust Cohle
originale: "I think human consciousness is a tragic misstep in human evolution… (da verificare: spesso circola senza «human»)"
riferimento:
  opera: true-detective
  luogo: "ep. 1, The Long Bright Dark"
prova: memoria
nato-da: [20261004-2228-rust]
---
```

### 0.7 Due restituzioni importate

**`restituzioni/2026/10/r-20261004-2228-ritratto-c16.md`** (convergenza C16, da note di mappa: ✧)

```md
---
forma: ritratto
importata: true
voci:
  - n: 1
    rif: "mondo: Friedrich, Monaco in riva al mare"
  - n: 2
    rif: berserk
  - n: 3
    rif: "mondo: Camus, la discesa di Sisifo"
legami:
  - converge-con: [berserk, "Friedrich, Monaco in riva al mare", "Sisifo (la discesa)", 20261004-2228-nucl]
    voce: seme
    perche: "l'assurdo prima di Camus; aggancio: «non nascondermi, affrontarlo»"
---
Una figura minuscola davanti a mare e cielo vuoti. Forse il quadro più "assurdista" mai dipinto, più di un secolo prima di Camus.

Chi lotta contro un destino crudele senza piegarsi (il "Lottatore"); in fondo un mito di Sisifo.

Il momento che interessa a Camus non è la spinta in salita, ma la discesa, quando Sisifo torna a riprendere il masso, consapevole. È l'ora della coscienza, quella in cui è superiore al proprio destino.
```

**`restituzioni/2026/10/r-20261004-2228-ritratto-sisi.md`** (candidato dormiente, idea del seme mai validata: ◌)

```md
---
forma: ritratto
importata: true
voci:
  - n: 1
    rif: "idea: La discesa di Sisifo"
legami:
  - serve-a: tatuaggi
    voce: proposta
    perche: "idea del seme, mai validata"
  - converge-con: [r-20261004-2228-ritratto-c16, 20261004-2228-nucl]
    voce: proposta
    perche: "regge su C16; aggancio: «non nascondermi, affrontarlo»"
---
La discesa di Sisifo. L'ora della coscienza. Non il Sisifo che spinge, ma quello che torna giù, lucido. Placement: schiena, polpaccio, fianco; spazio negativo.
```

### 0.8 Nodi esistenti al punto zero

| slug | genere | nato da |
|---|---|---|
| `tatuaggi` | raccolta | nucl, sogn, pens |
| `nichilismo` | tema | nucl |
| `dolore` | tema (emozione) | nucl, perc |
| `stoicismo`, `romanticismo` | tema | nucl |
| `battaglie-interiori`, `solitudine`, `vuoto` ("senso di vuoto"), `apatia`, `rabbia`, `risentimento`, `caos`, `liberta`, `gioia`, `pace-interiore` | tema (emozione) | perc |
| `chi-sono`, `che-senso-ha`, `come-stare-con-gli-altri`, `come-vivere`, `cosa-c-e-oltre`, `cosa-e-reale`, `cosa-posso-conoscere`, `perche-soffro` | tema (domanda) | — |
| `albert-camus`, `jordan-peterson`, `marco-aurelio` | persona, mondo | nucl |
| `radiohead`, `deftones` | persona, mondo (gruppo) | nucl |
| `true-detective`, `fma-brotherhood`, `berserk` | opera | nucl (+ rust, sogn) |
| `pensieri` | opera (`autore: marco-aurelio`) | pens |
| `monologo-di-rust` | citazione | rust |

**Frammenti:** `20261004-2228-nucl` (✧, sguardo), `20261004-2212-perc`, `20261004-2228-rust`, `20261004-2308-sogn`,
`20261005-0011-pens` (✦). **Restituzioni importate:** `r-20261004-2228-ritratto-c16` (✧), `r-20261004-2228-ritratto-sisi` (◌).
**Non esistono:** Nietzsche, Jung, Sisifo, Galimberti, kintsugi, Schopenhauer, Napoleone, Invictus.

**Costi del punto zero (simulato):** 21 file (5 frammenti, 5 letture, 9 nodi scritti a mano su 33 che lo script
genererebbe, 2 restituzioni); 0 domande; nessun ID esterno.

---

## B01 · 2026-11-03 23:40 · Galimberti a teatro, l'ospite inquietante

> ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante

Il Comando rapido scrive `ingresso/20261103-2340-xxxx.md` (solo il testo) e fa il `fire`; la Routine lo sposta.

**`frammenti/2026/11/20261103-2340.md`**

```md
---
registrato: 2026-11-03T23:40:12+01:00
canale: telefono
---
ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante
```

**`letture/2026/11/20261103-2340.md`** (identica al §5.2)

```md
---
versione: 1
letto: 2026-11-03T23:41:05+01:00
intento: [salva]
reazione:
  - parole: "molto interessante"
    segnale: giudizio
    verso: "+"
legami:
  - nomina: umberto-galimberti
    voce: sua
    perche: "«uno spezzone di galimberti a teatro»"
  - nomina: spettacolo-sulle-emozioni
    voce: sua
    perche: "«credo lo spettacolo sulle emozioni»; titolo proposto: Il mondo delle emozioni (da verificare)"
  - nomina: nichilismo-ospite-inquietante
    voce: sua
    perche: "«il nichilismo è l'ospite inquietante», detto da Galimberti secondo te"
  - parla-di: nichilismo
    voce: sua
    perche: "parola tua"
parole: [ragazzi, cultura]
---
```

**`persone/umberto-galimberti.md`** (nuovo; **senza** il `wikidata: Q4003398` del §5.2: §3.1 vieta gli ID all'ingresso)

```md
---
nome: Umberto Galimberti
alias: [galimberti, umberto galimberti]
cerchia: mondo
nato-da: [20261103-2340]
---
```

**`opere/spettacolo-sulle-emozioni.md`** (nuovo)

```md
---
nome: lo spettacolo sulle emozioni
alias: [spettacolo sulle emozioni]
autore: umberto-galimberti
nato-da: [20261103-2340]
---
```

**`citazioni/nichilismo-ospite-inquietante.md`** (nuovo; `autore` in chiaro perché Nietzsche non è un nodo al punto zero)

```md
---
nome: Il nichilismo, l'ospite inquietante
autore: Friedrich Nietzsche
attribuita-a: [umberto-galimberti]
prova: memoria
originale: "Der Nihilismus steht vor der Tür: woher kommt uns dieser unheimlichste aller Gäste? (da verificare)"
traduzione: "Il nichilismo è alla porta: da dove ci viene questo, il più inquietante fra tutti gli ospiti?"
traduttore: resa di Claude
riferimento:
  opera: "Frammenti postumi (da verificare: 1885-1887 nel §5.2, 1885-86 nel corpus, 1887-88 in una fonte secondaria)"
  luogo: "2[127] (da verificare)"
nato-da: [20261103-2340]
---
L'immagine è di Nietzsche; Galimberti ne ha fatto il titolo di un libro (L'ospite inquietante, Feltrinelli 2007).
```

Nessun nodo toccato: `temi/nichilismo` non cambia (`nato-da` registra la nascita, non le occorrenze).

**`restituzioni/2026/11/r-20261103-2341-risposta.md`**

```md
---
forma: risposta
per: 20261103-2340
voci:
  - n: 1
    rif: "mondo: Nietzsche, il nichilismo «il più inquietante fra tutti gli ospiti»"
  - n: 2
    rif: "mondo: Galimberti, L'ospite inquietante (Feltrinelli 2007)"
  - n: 3
    rif: spettacolo-sulle-emozioni
legami: []
---
**Salvato.** "L'ospite inquietante" è un'immagine di Nietzsche ○; Galimberti ci ha scritto un libro (2007) ○.
Lo spettacolo era *Il mondo delle emozioni*? ⚠
```

Poi: `contesto/recenti.md`, `contesto/parole.md`, `contesto/indice.md` rigenerati dallo script; verifica; push su `main`.
Nessuna notifica (non è una correzione di fatto né un ponte forte).

**Risposta sul telefono:** "23:41 · **Salvato.** "L'ospite inquietante" è un'immagine di Nietzsche ○; Galimberti ci ha scritto un libro (2007) ○. Lo spettacolo era *Il mondo delle emozioni*? ⚠"

**Verifiche fatte:**
- Passo 1 sulla citazione (WebSearch "unheimlichste aller Gäste"): la frase è di Nietzsche, nei frammenti postumi
  ("Der Nihilismus steht vor der Thür: woher kommt uns dieser unheimlichste aller Gäste?"); non è un apocrifo. Le fonti non
  concordano sulla collocazione (una dice note 1887-88): numero 2[127] e anni restano "(da verificare)". Nessun `esito`.
- Fatto ○ del libro (WebSearch): *L'ospite inquietante. Il nichilismo e i giovani*, Feltrinelli 2007, Serie Bianca (cataloghi
  IED, Arcigay). La stessa ricerca porta la polemica per plagio del 2008 (Il Giornale): saputa, non detta.
- Titolo dello spettacolo (WebSearch): *Il mondo delle emozioni* esiste (TicketOne, La Nazione, Mentelocale; tournée che
  parte il 13/11/2026 a Ferrara), accanto a *Quando la vita era regolata dal cuore* e *L'illusione della libertà*. Resta
  domanda ⚠: non so quale lui abbia visto, né se fosse dal vivo o un video.
- Rinviato al consolidamento: passi 2-3 (testo primario in eKGWB/KSA, traduzione pubblicata), `wikidata` di Galimberti.

**Costi:** 6 file scritti (frammento, lettura, 3 nodi, restituzione) + 3 di `contesto/` rigenerati; il grezzo spostato.
3 ricerche. Tempo stimato della Routine: 3-4 minuti (avvio sessione ~1, ricerche ~1, scrittura e push ~1-2).

**Esito sul banco:** passa. File, nodi e risposta coincidono; nessun nodo del libro, nessun tema "giovani", titolo solo ⚠.
Divergenza col modello: il §5.2 scrive `wikidata` all'ingresso, il banco e il §3.1 no; ho seguito il §3.1.

---

## B02 · 2026-11-04 08:12 · la frase dell'ospite era verso la fine

> ah e la frase dell'ospite era verso la fine, quando parlava dei greci

**`frammenti/2026/11/20261104-0812.md`**

```md
---
registrato: 2026-11-04T08:12:31+01:00
canale: telefono
---
ah e la frase dell'ospite era verso la fine, quando parlava dei greci
```

**`letture/2026/11/20261104-0812.md`** (passo 1: letti gli ultimi 3 giorni; "la frase dell'ospite" → `20261103-2340`)

```md
---
versione: 1
letto: 2026-11-04T08:13:02+01:00
intento: [salva]
atti: []
legami:
  - ritorna-su: 20261103-2340
    come: aggiunge
    voce: sua
    perche: "«la frase dell'ospite era verso la fine»"
  - nomina: nichilismo-ospite-inquietante
    momento: "verso la fine"
    voce: sua
    perche: "«era verso la fine»"
parole: [greci]
---
```

Nessun nodo nuovo né aggiornato. Il frammento del 3 novembre non si tocca.

**`restituzioni/2026/11/r-20261104-0813-risposta.md`**

```md
---
forma: risposta
per: 20261104-0812
voci: []
legami: []
---
**Aggiunto allo spezzone di ieri.**
```

**Risposta sul telefono:** "08:13 · **Aggiunto allo spezzone di ieri.**"

**Verifiche fatte:** nessuna ricerca (nessun fatto nuovo). Controllato a mano che "ospite" si risolve su un solo frammento
negli ultimi 3 giorni e su una sola citazione.

**Costi:** 3 file scritti (frammento, lettura, restituzione) + `contesto/` rigenerato. 0 ricerche. ~1-2 minuti.

**Esito sul banco:** passa. Nessun tema "greci", nessuna domanda, frammento di ieri intatto.

---

## B03 · 2026-11-09 19:02 · Jung, l'inconscio e il destino

> jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato

**`frammenti/2026/11/20261109-1902.md`**

```md
---
registrato: 2026-11-09T19:02:44+01:00
canale: telefono
---
jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato
```

**`letture/2026/11/20261109-1902.md`**

```md
---
versione: 1
letto: 2026-11-09T19:04:10+01:00
intento: [salva]
reazione:
  - parole: "mi ha spaccato"
    segnale: impatto
    verso: "+"
legami:
  - nomina: finche-non-rendi-conscio-l-inconscio
    voce: sua
    perche: "la frase come l'hai scritta, attribuita a Jung"
  - nomina: carl-gustav-jung
    voce: sua
    perche: "«jung:»"
parole: [inconscio, destino]
---
```

**`persone/carl-gustav-jung.md`** (nuovo: Jung non esisteva al punto zero, ora lo nomini tu)

```md
---
nome: Carl Gustav Jung
alias: [jung]
cerchia: mondo
nato-da: [20261109-1902]
---
```

**`citazioni/finche-non-rendi-conscio-l-inconscio.md`** (nuovo; niente `originale`, niente `esito`)

```md
---
nome: Finché non rendi conscio l'inconscio
autore: carl-gustav-jung
prova: memoria
nato-da: [20261109-1902]
---
Passo 1 (2026-11-09): così non risulta testuale; l'idea è vicina ad Aion, §126 (da verificare).
```

**`restituzioni/2026/11/r-20261109-1904-risposta.md`**

```md
---
forma: risposta
per: 20261109-1902
voci:
  - n: 1
    rif: "mondo: Jung, Aion §126 (da verificare)"
legami: []
---
**Salvata.** Così non sembra testuale ⚠: l'idea è vicina ad *Aion* (§126). Ti metto accanto il passo vero quando l'ho controllato.
```

**Risposta sul telefono:** "19:04 · **Salvata.** Così non sembra testuale ⚠: l'idea è vicina ad *Aion* (§126). Ti metto accanto il passo vero quando l'ho controllato."

**Verifiche fatte:** passo 1 (WebSearch): carljungdepthpsychologysite la elenca tra le frasi "attributed to but never uttered
by Dr. Jung"; altri blog la riconducono ad *Aion*, CW 9/II §126 ("when an inner situation is not made conscious, it happens
outside, as fate"). Il testo di *Aion* non l'ho aperto: §126 resta da verificare. Non è un apocrifo puro (l'idea è di Jung),
quindi niente `esito`. Rinviato: passi 2-3 (testo primario, traduzione Boringhieri), `wikidata` di Jung.

**Costi:** 5 file scritti (frammento, lettura, 2 nodi, restituzione) + `contesto/`. 1 ricerca. ~2-3 minuti.

**Esito sul banco:** passa. Reazione d'impatto, nodo Jung nato, nessun esito, niente forma circolante in `originale`,
risposta uguale nel senso.

---

## B04 · 2026-11-11 19:45 · Private Music, "la 3"

> ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto

**`frammenti/2026/11/20261111-1945.md`**

```md
---
registrato: 2026-11-11T19:45:09+01:00
canale: telefono
---
ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto
```

**`letture/2026/11/20261111-1945.md`**

```md
---
versione: 1
letto: 2026-11-11T19:47:20+01:00
intento: [salva]
contesto: "in macchina, tutto di fila"
reazione:
  - parole: "la 3 mi ha distrutto"
    segnale: impatto
    verso: "+"
legami:
  - nomina: private-music
    momento: "traccia 3"
    fruizione: fatta
    voce: sua
    perche: "«ascoltato private music … tutto di fila»; «la 3»: titolo non risolto"
  - nomina: deftones
    voce: sua
    perche: "«dei deftones»"
---
```

**`opere/private-music.md`** (nuovo)

```md
---
nome: Private Music
alias: [private music]
autore: deftones
anno: 2025
nato-da: [20261111-1945]
---
```

Nessun nodo per la traccia: nasce dopo la conferma, con `in: private-music`.

**`restituzioni/2026/11/r-20261111-1947-risposta.md`**

```md
---
forma: risposta
per: 20261111-1945
voci:
  - n: 1
    rif: private-music
legami: []
---
**Salvato.** La 3 di *Private Music*: ti ricordi il titolo? Se no, lo prendo dalla tracklist e te lo confermo ⚠.
```

**Risposta sul telefono:** "19:47 · **Salvato.** La 3 di *Private Music*: ti ricordi il titolo? Se no, lo prendo dalla tracklist e te lo confermo ⚠."

**Verifiche fatte:** WebSearch sull'album (per `anno`, risoluzione dell'entità): *Private Music*, Deftones, uscito il 22 agosto
2025 (Reprise/Warner; Warner Music Ireland, AllMusic). La tracklist **non** l'ho cercata: il §2.6 la rinvia al consolidamento
(MusicBrainz). Rinviato: titolo della traccia 3, `musicbrainz` dell'album.

**Costi:** 4 file scritti (frammento, lettura, 1 nodo, restituzione) + `contesto/`. 1 ricerca. ~2-3 minuti.

**Esito sul banco:** passa male. Nessun titolo a memoria, una domanda sola, reazione non legata a una traccia; ma il banco
vuole "La 3 è *[titolo]*, giusto?" e il modello (§2.6) rinvia il titolo: ho seguito il modello e lo dico nella risposta.
La lacuna del banco sul "contesto" non c'è: la lettura ha il campo `contesto`.

---

## B05 · 2026-11-16 23:00 · Telemaco, attribuito a Galimberti

> galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto

**`frammenti/2026/11/20261116-2300.md`**

```md
---
registrato: 2026-11-16T23:00:27+01:00
canale: telefono
---
galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto
```

**`letture/2026/11/20261116-2300.md`**

```md
---
versione: 1
letto: 2026-11-16T23:02:40+01:00
intento: [salva]
contesto: "in un reel"
reazione:
  - parole: "mi ha colpito tanto"
    segnale: impatto
    verso: "+"
legami:
  - nomina: umberto-galimberti
    voce: sua
    perche: "«galimberti in un reel»: l'attribuzione è tua"
  - nomina: telemaco
    voce: sua
    perche: "«telemaco che aspetta il padre guardando il mare»"
  - nomina: "Massimo Recalcati"
    voce: mondo
    perche: "l'idea del Telemaco che aspetta il padre è di Recalcati, Il complesso di Telemaco (Feltrinelli 2013); nessuna fonte trovata la dà a Galimberti (ricerca del 2026-11-16)"
parole: [padre, mare, aspettare]
---
```

**`persone/telemaco.md`** (nuovo; `in` in chiaro: l'*Odissea* non è un nodo)

```md
---
nome: Telemaco
alias: [telemaco]
cerchia: finzione
in: Odissea
nato-da: [20261116-2300]
---
```

Nessun nodo Recalcati (nasce solo dopo un tuo sì). `persone/umberto-galimberti.md` non cambia.

**`restituzioni/2026/11/r-20261116-2302-risposta.md`**

```md
---
forma: risposta
per: 20261116-2300
voci:
  - n: 1
    rif: "mondo: Massimo Recalcati, Il complesso di Telemaco (Feltrinelli 2013)"
legami: []
---
**Salvato.** L'idea di Telemaco che aspetta il padre è più probabilmente di Massimo Recalcati ○: *Il complesso di Telemaco* (Feltrinelli 2013). Correggo?
```

Notifica senza contenuto: sì (correzione di fatto).

**Risposta sul telefono:** "23:02 · **Salvato.** L'idea di Telemaco che aspetta il padre è più probabilmente di Massimo Recalcati ○: *Il complesso di Telemaco* (Feltrinelli 2013). Correggo?"

**Verifiche fatte:** WebSearch: *Il complesso di Telemaco. Genitori e figli dopo il tramonto del padre*, Recalcati, Feltrinelli,
marzo 2013, Serie Bianca (Sololibri, Macrolibrarsi, Allegoria); l'immagine del figlio che guarda il mare aspettando il padre
è sua. Seconda WebSearch "Galimberti Telemaco padre mare": nessuna fonte lega l'idea a Galimberti (resta "più probabile",
non "certo": un reel di Galimberti che la riprende non è escluso). Il reel non è raggiungibile (nessun link).

**Costi:** 4 file scritti (frammento, lettura, 1 nodo, restituzione) + `contesto/` + 1 notifica. 2 ricerche. ~3 minuti.

**Esito sul banco:** passa. Stesso nodo Galimberti, Telemaco `finzione`, legame ○ su Recalcati senza nodo, nessuna
correzione da sola, "padre" solo parola. In più `aspettare` tra le parole, perché il §6.4 la vuole ricorrente con Murph.

---

## B06 · 2026-11-20 12:44 · Marco e la frase "di Camus"

> marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina

**`frammenti/2026/11/20261120-1244.md`**

```md
---
registrato: 2026-11-20T12:44:18+01:00
canale: telefono
---
marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina
```

**`letture/2026/11/20261120-1244.md`** (passo 3: "marco" cercato prima in `cerchia: vita`, vuota; nome nudo in prima persona → persona della vita, non `marco-aurelio`)

```md
---
versione: 1
letto: 2026-11-20T12:46:40+01:00
intento: [salva]
reazione:
  - parole: "carina ma un po' da bacio perugina"
    segnale: giudizio
    verso: "−"
legami:
  - tramite: marco
    voce: sua
    perche: "«marco mi ha mandato»"
  - nomina: non-camminare-davanti-a-me
    voce: sua
    perche: "«quella di camus: non camminare davanti a me…, ecc.»: la frase come la ricordi, attribuita a Camus"
---
```

Come nel §6.1–6.2: nessun `nomina: albert-camus`; Camus sta solo nel campo `attribuita-a` del nodo (in B03 la
simulazione aveva messo anche `nomina` di Jung: vedi gli attriti).

**`persone/marco.md`** (nuovo)

```md
---
nome: Marco
alias: []
cerchia: vita
nato-da: [20261120-1244]
---
```

**`citazioni/non-camminare-davanti-a-me.md`** (nuovo; nessun `autore`; esito all'ingresso perché è un apocrifo noto, passo 1)

```md
---
nome: Non camminare davanti a me
attribuita-a: [albert-camus]
esito: apocrifa
prova: secondaria
riferimento:
  url: https://quoteinvestigator.com/2015/08/23/friend/
  data: 2026-11-20
nato-da: [20261120-1244]
---
Quote Investigator: nessuna traccia negli scritti di Camus; l'attribuzione non ha appoggi. Origine ignota.
```

Nodi aggiornati: nessuno (`albert-camus` non cambia).

**`restituzioni/2026/11/r-20261120-1246-risposta.md`**

```md
---
forma: risposta
per: 20261120-1244
voci:
  - n: 1
    rif: non-camminare-davanti-a-me
legami: []
---
**Salvata**, con il tuo "da bacio perugina". Non risulta di Camus ○: nei suoi scritti non c'è, l'autore è ignoto (Quote Investigator).
```

Notifica senza contenuto: sì (correzione di fatto: l'attribuzione è sua).

**Risposta sul telefono:** "12:46 · **Salvata**, con il tuo "da bacio perugina". Non risulta di Camus ○: nei suoi scritti non c'è, l'autore è ignoto (Quote Investigator)."

**Verifiche fatte:** passo 1, 1 WebSearch ("Quote Investigator "Don't walk in front of me" Camus"): scheda QI del
23/08/2015, "Just Walk Beside Me and Be My Friend": nessuna prova che Camus l'abbia scritta; Goodreads la etichetta
"misattributed-albert-camus"; Tablet Magazine la tratta come canto da campo estivo. Pagina QI non aperta (bastava
l'estratto per l'esito). Rinviato: nulla (l'esito è chiuso al passo 1); nessun ID per Marco, mai.

**Costi:** 5 file scritti (frammento, lettura, 2 nodi, restituzione) + `contesto/` + 1 notifica. 1 ricerca. ~2-3 minuti.

**Esito sul banco:** passa. Marco `vita` senza alias né ID, `tramite` ✦, citazione senza `autore` con `apocrifa` e
`secondaria`, reazione −, nessun tema su Marco.

---

## B07 · 2026-11-22 17:20 · l'estate invincibile, da tatuare

> camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei

**`frammenti/2026/11/20261122-1720.md`**

```md
---
registrato: 2026-11-22T17:20:05+01:00
canale: telefono
---
camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei
```

**`letture/2026/11/20261122-1720.md`**

```md
---
versione: 1
letto: 2026-11-22T17:22:30+01:00
intento: [salva]
reazione:
  - parole: "questa me la tatuerei"
    segnale: identificazione
    verso: "+"
legami:
  - nomina: estate-invincibile
    voce: sua
    perche: "«camus nella peste diceva tipo…»: frase a memoria («tipo»); l'opera come la ricordi, La peste, non risulta"
  - serve-a: tatuaggi
    voce: sua
    perche: "«questa me la tatuerei»"
---
```

**`citazioni/estate-invincibile.md`** (nuovo; nessun `esito`: non è un apocrifo)

```md
---
nome: Nel mezzo dell'inverno, un'estate invincibile
autore: albert-camus
prova: memoria
nato-da: [20261122-1720]
---
Passo 1 (2026-11-22): chiude Ritorno a Tipasa, nella raccolta L'Estate (1954), non La peste (da verificare sul testo).
```

Nodi aggiornati: nessuno. `raccolte/tatuaggi.md` non cambia (`nato-da` registra la nascita); nessun nodo per *La peste*
né per *L'Estate*.

**`restituzioni/2026/11/r-20261122-1722-risposta.md`**

```md
---
forma: risposta
per: 20261122-1720
voci:
  - n: 1
    rif: "mondo: Camus, Ritorno a Tipasa, in L'Estate (1954)"
legami: []
---
**Salvata, anche per i tatuaggi.** È di Camus, ma non della *Peste*: chiude *Ritorno a Tipasa*, nell'*Estate* (1954) ⚠.
```

Notifica senza contenuto: sì (correzione di fatto, e su una frase da tatuare).

**Risposta sul telefono:** "17:22 · **Salvata, anche per i tatuaggi.** È di Camus, ma non della *Peste*: chiude *Ritorno a Tipasa*, nell'*Estate* (1954) ⚠."

**Verifiche fatte:** passo 1, 2 WebSearch. (1) "Quote Investigator invincible summer Camus Retour à Tipasa": nessuna scheda
QI; più fonti (un PDF della traduzione inglese su stephenhicks.org, LRB, Wikiquote) danno la frase come chiusa di *Retour à
Tipasa*, in *L'Été* (1954), con l'originale "Au milieu de l'hiver, j'apprenais enfin qu'il y avait en moi un été invincible".
(2) "quoteinvestigator.com invincible summer": nessuna scheda QI, nessun segnale di apocrifo. L'originale francese **non**
l'ho scritto nel nodo: viene da fonti secondarie, e il testo primario è passo 2. Rinviato: passi 2-3 (testo di *L'Été*,
traduzione italiana pubblicata e traduttore), `esito`.

**Costi:** 4 file scritti (frammento, lettura, 1 nodo, restituzione) + `contesto/` + 1 notifica. 2 ricerche. ~3 minuti.

**Esito sul banco:** passa. `autore` Camus, `prova: memoria`, `serve-a: tatuaggi` ✦, reazione d'identificazione, niente
*Peste* nel nodo né nodo della *Peste*. La *Peste* sbagliata resta solo nel frammento e nel `perche` (la lacuna del banco c'è).

---

## B08 · 2026-11-24 23:50 · Marco: "sempre in guerra con me stesso"

> marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso

**`frammenti/2026/11/20261124-2350.md`**

```md
---
registrato: 2026-11-24T23:50:41+01:00
canale: telefono
---
marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso
```

**`letture/2026/11/20261124-2350.md`** ("marco" → `marco`, `cerchia: vita`, dal 20 novembre; fuori dai 3 giorni, ma il nodo c'è)

```md
---
versione: 1
letto: 2026-11-24T23:52:15+01:00
intento: [salva]
reazione:
  - parole: "non l'ho presa bene"
    segnale: impatto
    verso: "−"
  - parole: "ci ha preso"
    segnale: identificazione
    verso: "+"
legami:
  - nomina: marco
    voce: sua
    perche: "«marco stasera mi ha detto»"
  - parla-di: battaglie-interiori
    voce: proposta
    perche: "«in guerra con me stesso» sono parole di Marco; «battaglie interiori» è tua, dal percorso interiore (4 ottobre)"
---
```

"Ci ha preso" l'ho letto come identificazione (ti riconosci nella frase), non giudizio: il banco dice giudizio. Nessuna
citazione per le parole di Marco: restano nel frammento. Nodi nuovi o aggiornati: nessuno.

**`restituzioni/2026/11/r-20261124-2352-risposta.md`**

```md
---
forma: risposta
per: 20261124-2350
voci:
  - n: 1
    rif: battaglie-interiori
legami:
  - parla-di: battaglie-interiori
    voce: proposta
    perche: "lo stesso legame della lettura, detto in risposta"
---
**Salvato.** "Battaglie interiori" è una tua parola dal primo giorno ✦.
```

Il segno è ✦ e non ✧ (modello §6.2 e banco): nel punto zero "battaglie interiori" nasce dal percorso interiore, voce sua.

**Risposta sul telefono:** "23:52 · **Salvato.** "Battaglie interiori" è una tua parola dal primo giorno ✦."

**Verifiche fatte:** nessuna ricerca (nessun fatto del mondo). Controllato a mano: `marco` esiste (B06) ed è l'unico nodo
`vita`; "battaglie interiori" è nel frammento `20261004-2212-perc` (voce sua). Grep sull'Atlante: "guerra con me stesso" non
compare da nessuna parte, quindi l'alias del tema nel punto zero è anticipato (vedi gli attriti).

**Costi:** 3 file scritti (frammento, lettura, restituzione) + `contesto/`. 0 ricerche. ~1-2 minuti.

**Esito sul banco:** passa male. Stesso nodo Marco, ◌ su battaglie interiori, nessuna citazione, nessun Marco Aurelio,
nessuna interpretazione; ma la risposta dice ✦ dove banco e §6.2 dicono ✧, e "ci ha preso" è identificazione, non giudizio.

---

## B09 · 2026-11-26 09:05 · Frankl, il perché e il come

> frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente

**`frammenti/2026/11/20261126-0905.md`**

```md
---
registrato: 2026-11-26T09:05:22+01:00
canale: telefono
---
frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente
```

**`letture/2026/11/20261126-0905.md`**

```md
---
versione: 1
letto: 2026-11-26T09:07:50+01:00
intento: [salva]
legami:
  - nomina: uno-psicologo-nei-lager
    fruizione: in-corso
    voce: sua
    perche: "«sto leggendo uno psicologo nei lager finalmente»"
  - tramite: viktor-frankl
    voce: sua
    perche: "«frankl:»: la frase ti arriva da lui"
  - nomina: chi-ha-un-perche
    voce: sua
    perche: "la frase come l'hai scritta, attribuita a Frankl"
---
```

**`persone/viktor-frankl.md`** (nuovo)

```md
---
nome: Viktor Frankl
alias: [frankl, viktor e. frankl]
cerchia: mondo
nato-da: [20261126-0905]
---
```

**`opere/uno-psicologo-nei-lager.md`** (nuovo)

```md
---
nome: Uno psicologo nei lager
alias: [uno psicologo nei lager, l'uomo in cerca di senso]
autore: viktor-frankl
nato-da: [20261126-0905]
---
```

**`citazioni/chi-ha-un-perche.md`** (nuovo; come la citazione dell'ospite nel §5.2: `autore` vero in chiaro, chi la porta in
`attribuita-a`, `prova: memoria`, niente esito)

```md
---
nome: Chi ha un perché per vivere sopporta quasi ogni come
autore: Friedrich Nietzsche
attribuita-a: [viktor-frankl]
prova: memoria
nato-da: [20261126-0905]
---
Passo 1 (2026-11-26, Quote Investigator): Nietzsche, Crepuscolo degli idoli (1889), «Sentenze e frecce»; Frankl la cita
e la dà a Nietzsche. Numero dell'aforisma da verificare.
```

Nodi aggiornati: nessuno.

**`restituzioni/2026/11/r-20261126-0907-risposta.md`**

```md
---
forma: risposta
per: 20261126-0905
voci:
  - n: 1
    rif: "mondo: Nietzsche, Crepuscolo degli idoli (1889), Sentenze e frecce"
  - n: 2
    rif: uno-psicologo-nei-lager
legami: []
---
**Salvato, libro in lettura.** La frase è di Nietzsche ⚠ (*Crepuscolo degli idoli*): Frankl la cita, e lo dice.
```

Notifica senza contenuto: sì (correzione di fatto).

**Risposta sul telefono:** "09:07 · **Salvato, libro in lettura.** La frase è di Nietzsche ⚠ (*Crepuscolo degli idoli*): Frankl la cita, e lo dice."

**Verifiche fatte:**
- Passo 1, 1 WebSearch + 1 WebFetch su Quote Investigator (9/10/2019, "If We Have Our Own 'Why' of Life…"): la frase è di
  Nietzsche, *Götzen-Dämmerung* (1889), sezione "Sprüche und Pfeile", "Hat man sein warum? des Lebens, so verträgt man sich
  fast mit jedem wie?"; Frankl la usa in *Man's Search for Meaning* (1946) dando il merito a Nietzsche. QI **non** dà il
  numero dell'aforisma: il §12 del banco resta da verificare. L'originale non l'ho scritto nel nodo (passo 2).
- 1 WebSearch sull'opera: *Uno psicologo nei lager*, Frankl, Ares (1978; 2012), poi altre edizioni (FrancoAngeli, 2024);
  titolo originale *Ein Psychologe erlebt das Konzentrationslager* (1946). Nessuna edizione scelta: non sai quale leggi.
- Rinviato: passi 2-3 (testo primario e numero dell'aforisma, traduzione italiana), `esito`, `wikidata` di Frankl,
  `openlibrary`/`wikidata` del libro.

**Costi:** 6 file scritti (frammento, lettura, 3 nodi, restituzione) + `contesto/` + 1 notifica. 2 ricerche + 1 lettura di
pagina. ~3-4 minuti.

**Esito sul banco:** passa. Frankl non è `autore`, il `tramite` ✦ c'è, libro `in-corso`, nodi Frankl e libro nati.
Divergenza: `autore: Friedrich Nietzsche` è scritto già all'ingresso, come nel §5.2; il banco lo vuole dopo il consolidamento.

---

## B10 · 2026-11-30 19:00 · "oggi mi sento come sisifo"

> oggi mi sento come sisifo

**`frammenti/2026/11/20261130-1900.md`**

```md
---
registrato: 2026-11-30T19:00:03+01:00
canale: telefono
---
oggi mi sento come sisifo
```

**`letture/2026/11/20261130-1900.md`** (passo 1: negli ultimi 3 giorni nessun frammento; nelle ultime 5 restituzioni niente su Sisifo)

```md
---
versione: 1
letto: 2026-11-30T19:01:40+01:00
intento: [salva]
legami:
  - parla-di: sisifo
    come: metafora
    voce: sua
    perche: "«mi sento come sisifo»: un'immagine per dire come stai, non l'argomento"
---
```

Nessun `sente`, nessun `nomina` del mito né del saggio di Camus, nessuna proposta.

**`persone/sisifo.md`** (nuovo: Sisifo non esisteva al punto zero, ora lo nomini tu; il personaggio, `finzione`, perché per il
§2.5 i personaggi del mito sono persone; il mito non è un nodo, `in` in chiaro)

```md
---
nome: Sisifo
alias: [sisifo]
cerchia: finzione
in: mito greco
nato-da: [20261130-1900]
---
```

Nodi aggiornati: nessuno. Le restituzioni importate `r-20261004-2228-ritratto-c16` e `-sisi` nominano "Sisifo (la discesa)"
in chiaro e non si riscrivono (sono immutabili).

**`restituzioni/2026/11/r-20261130-1901-risposta.md`**

```md
---
forma: risposta
per: 20261130-1900
voci: []
legami: []
---
**Salvato.**
```

**Risposta sul telefono:** "19:01 · **Salvato.**"

**Verifiche fatte:** nessuna ricerca. Controllato a mano: E66 (Sisifo felice) non è nel banco né nei frammenti, quindi "Il
masso o la discesa?" non ha appiglio (§6.6: solo se E66 è recente); `sisifo` non era un nodo (punto zero, "Non esistono").
Rinviato al consolidamento: la vicinanza con le restituzioni importate su Sisifo, la linea del tempo (umore, non posizione).

**Costi:** 4 file scritti (frammento, lettura, 1 nodo, restituzione) + `contesto/`. 0 ricerche. ~1-2 minuti.

**Esito sul banco:** passa. `parla-di` con `come: metafora` ✦, nessun `sente`, nessun Camus, nessun `contraddice`, nessuna
domanda. La lacuna del banco non c'è: il §2.3 ammette `parla-di` verso "qualunque nodo usato come immagine". In più nasce il
nodo Sisifo, che il banco non elenca.

---

## B11 · 2026-12-05 18:40 · il mondo ti spezza, tipo kintsugi

> chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi

**`frammenti/2026/12/20261205-1840.md`**

```md
---
registrato: 2026-12-05T18:40:17+01:00
canale: telefono
---
chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi
```

**`letture/2026/12/20261205-1840.md`** (passo 1: nessun frammento negli ultimi 3 giorni; nelle ultime 5 restituzioni niente di vicino)

```md
---
versione: 1
letto: 2026-12-05T18:42:30+01:00
intento: [salva, chiedi]
legami:
  - nomina: il-mondo-spezza-tutti
    voce: sua
    perche: "«il mondo ti spezza e poi alcuni diventano più forti nei punti rotti»: la frase come la ricordi, senza autore («chi è che diceva»)"
  - converge-con: [il-mondo-spezza-tutti, kintsugi]
    voce: sua
    perche: "«tipo kintsugi»"
parole: [punti rotti]
---
```

**`citazioni/il-mondo-spezza-tutti.md`** (nuovo; nessuna attribuzione tua, quindi niente `attribuita-a`; `autore` in chiaro perché Hemingway non è un nodo e non lo nomini tu)

```md
---
nome: Il mondo spezza tutti
autore: Ernest Hemingway
prova: memoria
nato-da: [20261205-1840]
---
Passo 1 (2026-12-05): nessuna scheda di apocrifo; più fonti la danno in Addio alle armi (1929), cap. 34 (da verificare sul testo).
```

**`temi/kintsugi.md`** (nuovo: §2.6, "un concetto o un'immagine con un nome proprio (kintsugi…)" nasce alla prima occorrenza; genere `temi/` per il §2.5, "il concetto"; contro la lettera del §4.1.4, "nessun tema nuovo")

```md
---
nome: kintsugi
alias: []
nato-da: [20261205-1840]
---
```

**`restituzioni/2026/12/r-20261205-1842-risposta.md`**

```md
---
forma: risposta
per: 20261205-1840
voci:
  - n: 1
    rif: "mondo: Hemingway, Addio alle armi (1929), cap. 34 (da verificare)"
legami: []
---
**Hemingway**, *Addio alle armi* (1929), cap. 34 ⚠. E sì, è il kintsugi in parole ✦.
```

Notifica: nessuna (non è una correzione né un ponte forte; vedi gli attriti).

**Risposta sul telefono:** "18:42 · **Hemingway**, *Addio alle armi* (1929), cap. 34 ⚠. E sì, è il kintsugi in parole ✦."

**Verifiche fatte:** passo 1, 1 WebSearch (Quote Investigator + "world breaks every one"): nessuna scheda QI sulla frase
(QI ha solo quella su "We are all broken, that's how the light gets in", che non è di Hemingway); Hemingway Society e altri
siti la danno in *A Farewell to Arms* (1929), uno al cap. 34. Testo primario non aperto: capitolo ⚠, nessun `esito`.
Rinviato: passi 2-3 (testo inglese, traduzione italiana e traduttore), `esito`, l'eventuale precursore (un aggregatore cita
QI su W. L. Sheldon, non verificato).

**Costi:** 5 file scritti (frammento, lettura, 2 nodi, restituzione) + `contesto/`. 1 ricerca. ~3 minuti.

**Esito sul banco:** passa. Salva e chiedi, citazione `prova: memoria` con Hemingway in chiaro, `converge-con` ✦, risposta
uguale. La lacuna del banco si scioglie col §2.6 (kintsugi nasce), ma contro il §4.1.4: vedi gli attriti.

---

## B12 · 2026-12-07 02:10 · la cura, il primo ballo, nonna Lina

> la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso

**`frammenti/2026/12/20261207-0210.md`**

```md
---
registrato: 2026-12-07T02:10:48+01:00
canale: telefono
---
la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso
```

**`letture/2026/12/20261207-0210.md`** (prudenza del §4.1: nessuna proposta, nessun tema; "nonna lina" cercata prima in `cerchia: vita`: c'è solo `marco`)

```md
---
versione: 1
letto: 2026-12-07T02:11:40+01:00
intento: [salva]
contesto: "al matrimonio della cugina, il primo ballo"
reazione:
  - parole: "ho pianto come un cretino"
    segnale: impatto
    verso: "+"
legami:
  - nomina: la-cura
    voce: sua
    perche: "«la cura di battiato … il primo ballo»"
  - nomina: franco-battiato
    voce: sua
    perche: "«di battiato»"
  - nomina: nonna-lina
    voce: sua
    perche: "«nonna lina c'era ancora l'anno scorso»"
---
```

Nessun nodo per la cugina né per il matrimonio; nessuna `parole`.

**`opere/la-cura.md`** · **`persone/franco-battiato.md`** · **`persone/nonna-lina.md`** (nuovi)

```md
---
nome: La cura
alias: [la cura]
autore: franco-battiato
anno: 1996
nato-da: [20261207-0210]
---
```

```md
---
nome: Franco Battiato
alias: [battiato]
cerchia: mondo
nato-da: [20261207-0210]
---
```

```md
---
nome: nonna Lina
alias: []
cerchia: vita
nato-da: [20261207-0210]
---
```

**`restituzioni/2026/12/r-20261207-0211-risposta.md`**

```md
---
forma: risposta
per: 20261207-0210
voci: []
legami: []
---
**Salvato.** Un abbraccio.
```

**Risposta sul telefono:** "02:11 · **Salvato.** Un abbraccio."

**Verifiche fatte:** 1 WebSearch per l'entità (autore, anno): *La cura*, Battiato e Sgalambro, nell'album *L'imboscata*
(Mercury, 23 ottobre 1996); singolo nel 1997 (Wikipedia en). Nessun testo riprodotto. Rinviato: `wikidata`/`musicbrainz`
di brano e Battiato (mai per nonna Lina).

**Costi:** 6 file scritti (frammento, lettura, 3 nodi, restituzione) + `contesto/`. 1 ricerca. ~2-3 minuti.

**Esito sul banco:** passa. `la-cura` ✦ con autore Battiato, nonna Lina `vita`, reazione d'impatto, niente temi né
proposte, niente lutto nominato. In più nasce il nodo Battiato (lo nomini tu), che il banco non elenca. L'esclusione dalla
lettera e dal "ti ricordi?" non ha dove scriversi: vedi gli attriti.

---

## B13 · 2026-12-09 18:00 · link Spotify nudo

> https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3

**`frammenti/2026/12/20261209-1800.md`** (il link resta con `?si=`)

```md
---
registrato: 2026-12-09T18:00:05+01:00
canale: telefono
---
https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3
```

**`letture/2026/12/20261209-1800.md`**

```md
---
versione: 1
letto: 2026-12-09T18:01:30+01:00
intento: [salva]
link: https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC
legami:
  - nomina: never-gonna-give-you-up
    voce: sua
    perche: "il link, senza parole tue; titolo dall'oEmbed di Spotify, artista dalla pagina del brano"
---
```

**`opere/never-gonna-give-you-up.md`** (nuovo; l'artista non è un nodo: in chiaro)

```md
---
nome: Never Gonna Give You Up
alias: []
autore: Rick Astley
link: https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC
nato-da: [20261209-1800]
---
```

**`restituzioni/2026/12/r-20261209-1801-risposta.md`**

```md
---
forma: risposta
per: 20261209-1800
voci:
  - n: 1
    rif: never-gonna-give-you-up
legami: []
---
**Salvato** *Never Gonna Give You Up*, Rick Astley ○. Che cosa ti ha preso?
```

**Risposta sul telefono:** "18:01 · **Salvato** *Never Gonna Give You Up*, Rick Astley ○. Che cosa ti ha preso?"

**Verifiche fatte:** oEmbed vero (`open.spotify.com/oembed?url=…`, con curl e WebFetch): risponde con `title: "Never Gonna
Give You Up"` e **nessun campo artista**. L'artista l'ho preso dalla pagina del brano (`og:description`: "Rick Astley ·
Whenever You Need Somebody · Song · 1987"), una richiesta in più. L'id del banco è quindi un brano reale, il celebre
*rickroll*: lo tratto alla lettera, senza commenti. Rinviato: `musicbrainz` del work/recording.

**Costi:** 4 file scritti (frammento, lettura, 1 nodo, restituzione) + `contesto/`. 2 richieste HTTP, 0 ricerche. ~2 minuti.

**Esito sul banco:** passa. `?si=` nel frammento, link pulito nella lettura (il campo `link` c'è: la lacuna del banco non
c'è), titolo e artista ○, nessuna reazione né tema, una domanda. Ma l'artista non viene dall'oEmbed: vedi gli attriti.

---

## B14 · 2026-12-10 23:00 · link YouTube dal minuto 12

> https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello

**`frammenti/2026/12/20261210-2300.md`**

```md
---
registrato: 2026-12-10T23:00:09+01:00
canale: telefono
---
https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello
```

**`letture/2026/12/20261210-2300.md`** (oEmbed fallito: nessun nodo, il video resta in chiaro nel legame)

```md
---
versione: 1
letto: 2026-12-10T23:01:20+01:00
intento: [salva]
link: https://youtu.be/dQ9xLmP0aBc?t=754
legami:
  - nomina: "video YouTube dQ9xLmP0aBc (titolo non letto)"
    momento: "12:34"
    voce: sua
    perche: "«dal minuto 12 in poi, ascolta solo quello»; t=754 nel link"
---
```

**`restituzioni/2026/12/r-20261210-2301-risposta.md`**

```md
---
forma: risposta
per: 20261210-2300
voci: []
legami: []
---
**Salvato il link**, dal 12:34. Il video non riesco a leggerlo ⚠.
```

**Risposta sul telefono:** "23:01 · **Salvato il link**, dal 12:34. Il video non riesco a leggerlo ⚠."

**Verifiche fatte:** oEmbed di YouTube (WebFetch e curl su `youtube.com/oembed?url=…dQ9xLmP0aBc`): **404**. Controprova
con un id noto (`dQw4w9WgXcQ`): 200, quindi il servizio funziona e il video del banco non esiste o non è pubblico.
`t=754` = 12:34. Rinviato: un nuovo tentativo nel consolidamento (nel modello non è scritto).

**Costi:** 3 file scritti (frammento, lettura, restituzione) + `contesto/`. 2 richieste HTTP. ~1-2 minuti.

**Esito sul banco:** passa male. `t=` conservato, momento 12:34, nessun "che cosa ti ha preso?"; ma il banco vuole titolo
e canale, che non esistono (404), e il fallback l'ho preso per analogia da B13: il modello non ne ha uno.

---

## B15 · 2026-12-12 20:15 · Pinterest, Rilke in inglese

> https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo

**`frammenti/2026/12/20261212-2015.md`** (intatto, con `it.` e `?mt=login`)

```md
---
registrato: 2026-12-12T20:15:33+01:00
canale: telefono
---
https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo
```

**`letture/2026/12/20261212-2015.md`** (nessuna immagine scaricata; Rilke solo nel campo del nodo citazione, come Camus in B06)

```md
---
versione: 1
letto: 2026-12-12T20:17:10+01:00
intento: [salva]
link: https://www.pinterest.com/pin/1234567890123/
legami:
  - nomina: let-everything-happen-to-you
    voce: sua
    perche: "«let everything happen to you: beauty and terror. rilke credo»: in inglese, come circola; l'attribuzione è tua, incerta"
  - serve-a: tatuaggi
    voce: proposta
    perche: "una frase con un pin: nell'Atlante ogni pin era un riferimento per i tatuaggi"
---
```

**`persone/rainer-maria-rilke.md`** · **`citazioni/let-everything-happen-to-you.md`** (nuovi; una citazione sola, nessun originale né traduzione all'ingresso)

```md
---
nome: Rainer Maria Rilke
alias: [rilke]
cerchia: mondo
nato-da: [20261212-2015]
---
```

```md
---
nome: Let everything happen to you: beauty and terror
autore: rainer-maria-rilke
prova: memoria
nato-da: [20261212-2015]
---
Passo 1 (2026-12-12): nessuna scheda di apocrifo. È la resa inglese di Anita Barrows e Joanna Macy (Rilke's Book of Hours,
Riverhead 1996), I, 59: Libro d'ore, prima parte (Il libro della vita monastica, 1899). Originale e traduzione italiana da verificare.
```

**`restituzioni/2026/12/r-20261212-2017-risposta.md`**

```md
---
forma: risposta
per: 20261212-2015
voci:
  - n: 1
    rif: let-everything-happen-to-you
legami:
  - serve-a: tatuaggi
    voce: proposta
    perche: "lo stesso legame della lettura"
---
**Salvata.** Sì, Rilke ⚠: *Libro d'ore*, prima parte (1899); l'inglese è di Barrows e Macy.
```

**Risposta sul telefono:** "20:17 · **Salvata.** Sì, Rilke ⚠: *Libro d'ore*, prima parte (1899); l'inglese è di Barrows e Macy."

**Verifiche fatte:** passo 1, 2 WebSearch. (1) Il verso tedesco ("Laß dir alles geschehn: Schönheit und Schrecken") nello
*Stunden-Buch*: la ricerca dà la struttura (I, 1899; II, 1901; III, 1903; testo su Projekt Gutenberg) ma non trova il verso.
(2) La forma inglese: Art & Theology e altri la danno come *Book of Hours* I, 59, traduzione Barrows e Macy (Riverhead 1996).
Nessun segnale di apocrifo, nessun `esito`. L'anno di pubblicazione del libro (non il 1899 della stesura) non l'ho
verificato. Rinviato: passi 2-3 (verso tedesco sul testo di Gutenberg, traduzione italiana e traduttore), `wikidata` di Rilke.

**Costi:** 5 file scritti (frammento, lettura, 2 nodi, restituzione) + `contesto/`. 2 ricerche. ~3 minuti.

**Esito sul banco:** passa. Pin normalizzato nella lettura, nessuna immagine, Rilke nato, una citazione sola `prova: memoria`
✦, niente "c'è già". Il "(1899)" del banco è l'anno della prima parte, non del libro: l'ho detto come tale.

---

## B16 · 2027-01-09 16:30 · Eraclito e la nave di Teseo, la stessa domanda

> eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa?

**`frammenti/2027/01/20270109-1630.md`**

```md
---
registrato: 2027-01-09T16:30:41+01:00
canale: telefono
---
eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa?
```

**`letture/2027/01/20270109-1630.md`** (passo 1: nessun frammento negli ultimi 3 giorni; l'ultimo è del 12 dicembre, 28 giorni fa: scatta il "mentre eri via" del §4.3)

```md
---
versione: 1
letto: 2027-01-09T16:32:20+01:00
intento: [salva]
legami:
  - nomina: eraclito
    voce: sua
    perche: "«eraclito il fiume»"
  - converge-con: [fiume-di-eraclito, nave-di-teseo]
    voce: sua
    perche: "«sono la stessa domanda»"
  - parla-di: chi-sono
    voce: proposta
    perche: "«io sono la stessa persona di 5 anni fa?» è la domanda «Chi sono?» detta nel tempo"
parole: [stessa persona]
---
```

`intento: [salva]`, non `[salva, chiedi]`: la domanda è rivolta a sé, è il contenuto della convergenza, non una richiesta
all'AI (il §4.1.2 direbbe "nel dubbio salva e chiedi": vedi gli attriti). Nessun `vissuto` ("5 anni fa" è dentro la domanda).

**`persone/eraclito.md`** · **`temi/fiume-di-eraclito.md`** · **`temi/nave-di-teseo.md`** (nuovi; i due concetti-immagine con nome proprio per il §2.6, in `temi/` come kintsugi in B11; Plutarco non lo nomini, nessun nodo)

```md
---
nome: Eraclito
alias: [eraclito]
cerchia: mondo
nato-da: [20270109-1630]
---
```

```md
---
nome: il fiume di Eraclito
alias: [eraclito il fiume, il fiume]
nato-da: [20270109-1630]
---
```

```md
---
nome: la nave di Teseo
alias: [nave di teseo]
nato-da: [20270109-1630]
---
```

Nodi aggiornati: nessuno (`temi/chi-sono.md` non cambia: il `parla-di` è proposto, e `nato-da` elenca i frammenti-prova).

**`restituzioni/2027/01/r-20270109-1632-risposta.md`**

```md
---
forma: risposta
per: 20270109-1630
voci:
  - n: 1
    rif: chi-sono
legami:
  - parla-di: chi-sono
    voce: proposta
    perche: "lo stesso legame della lettura"
---
**Salvato:** fiume e nave, la stessa domanda ✦. È anche la tua «Chi sono?» ◌.
```

**`restituzioni/2027/01/r-20270109-1632-ritorno.md`** (§4.3: "quando torni dopo 14 giorni o più", una cosa sola; nel silenzio è nata solo la lettera di domenica 13 dicembre, non simulata)

```md
---
forma: ritorno
per: 20270109-1630
voci:
  - n: 1
    rif: r-20261213-2100-settimana
legami: []
---
Mentre eri via: la lettera del 13 dicembre è ancora lì.
```

**Risposta sul telefono:** "16:32 · Mentre eri via: la lettera del 13 dicembre è ancora lì. **Salvato:** fiume e nave, la stessa domanda ✦. È anche la tua «Chi sono?» ◌."

**Verifiche fatte:** nessuna verifica richiesta dal modello (nessuna citazione, nessun link). 1 WebSearch solo per giudicare
la risposta del banco: il "non ci si bagna due volte" è nel *Cratilo* 402a, dove Socrate lo attribuisce a Eraclito; il
frammento B12 dice altro ("acque sempre diverse"), e c'è chi pensa che Platone riporti Cratilo (Wikipedia, Wikiquote,
askphilosophers). Il dato del banco regge, ma il modello non lo fa dire. Nave di Teseo (Plutarco, *Teseo* 23): non cercata,
non serve all'ingresso.

**Costi:** 7 file scritti (frammento, lettura, 3 nodi, 2 restituzioni) + `contesto/`. 0 ricerche della Routine (1 mia di controllo). ~2 minuti.

**Esito sul banco:** passa male. `converge-con` ✦ con il `perche` giusto, un solo `parla-di` ◌ verso "Chi sono?", nessuna
risposta alla domanda esistenziale. Ma la risposta diverge: il §4.3 ammette un aggancio solo (conto, ponte, correzione) e
il Platone del banco non è nessuno dei tre; in più il modello aggiunge il "mentre eri via", che il banco non prevede.
Eraclito nasce come persona e il fiume come tema: due nodi da tre parole (vedi gli attriti).

---

## B17 · 2027-02-03 07:10 · il sogno della scala che scende al mare

> sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura

**`frammenti/2027/02/20270203-0710.md`**

```md
---
registrato: 2027-02-03T07:10:12+01:00
canale: telefono
---
sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura
```

**`letture/2027/02/20270203-0710.md`** (passo 1: nessun frammento negli ultimi 3 giorni; silenzio di 25 giorni dal 9 gennaio: di nuovo "mentre eri via")

```md
---
versione: 1
letto: 2027-02-03T07:11:30+01:00
intento: [salva]
vissuto: stanotte
contesto: "un sogno"
reazione:
  - parole: "non avevo paura"
    segnale: impatto
    verso: "+"
legami: []
parole: [scala, scendere, mare]
---
```

Nessun legame proposto: al punto zero non c'è nessun simbolo ereditato (l'import non porta `simboli/`), e l'unico aggancio
possibile, la discesa di Sisifo (`r-20261004-2228-ritratto-sisi`), sarebbe già un'interpretazione. Rinviato alla fase 2 del
consolidamento, se mai. Il segnale `impatto` è scelto per forza (vedi gli attriti). "Mare" alla seconda occorrenza (B05).

**`restituzioni/2027/02/r-20270203-0711-risposta.md`**

```md
---
forma: risposta
per: 20270203-0710
voci: []
legami: []
---
**Salvato il sogno.**
```

**`restituzioni/2027/02/r-20270203-0711-ritorno.md`** (nel silenzio: la lettera del 10 gennaio e il ritratto del trimestre, "inizio febbraio" per il §5.5; una cosa sola, il ritratto)

```md
---
forma: ritorno
per: 20270203-0710
voci:
  - n: 1
    rif: contesto/ritratto.md
legami: []
---
Mentre eri via è arrivato il ritratto di novembre–gennaio.
```

**Risposta sul telefono:** "07:11 · Mentre eri via è arrivato il ritratto di novembre–gennaio. **Salvato il sogno.**"

**Verifiche fatte:** nessuna ricerca (niente entità, niente citazioni). Controllato a mano: nessun nodo `scala`, `mare` o
simbolo nel punto zero; "mare" solo nelle parole di B05. Rinviato: l'eventuale legame ◌ del sogno (fase 2).

**Costi:** 4 file scritti (frammento, lettura, 2 restituzioni) + `contesto/`. 0 ricerche. ~1 minuto.

**Esito sul banco:** passa. `vissuto: stanotte`, "non avevo paura" citata, `parole: [scala, mare]` (più "scendere"), nessuna
interpretazione, niente Telemaco né padre. In più il "mentre eri via", che il banco non prevede.

---

## B18 · 2027-02-09 13:00 · "boh niente"

> boh niente volevo solo scrivere qualcosa

**`frammenti/2027/02/20270209-1300.md`**

```md
---
registrato: 2027-02-09T13:00:55+01:00
canale: telefono
---
boh niente volevo solo scrivere qualcosa
```

**`letture/2027/02/20270209-1300.md`** (passo 1: B17 è di 6 giorni fa, fuori dai 3 giorni; niente da risolvere)

```md
---
versione: 1
letto: 2027-02-09T13:01:10+01:00
intento: [niente]
legami: []
---
```

**`restituzioni/2027/02/r-20270209-1301-risposta.md`**

```md
---
forma: risposta
per: 20270209-1300
voci: []
legami: []
---
Ci sono.
```

**Risposta sul telefono:** "13:01 · Ci sono."

**Verifiche fatte:** nessuna. Controllato: silenzio di 6 giorni, sotto i 14: nessun "mentre eri via".

**Costi:** 3 file scritti (frammento, lettura, restituzione) + `contesto/`. 0 ricerche. <1 minuto.

**Esito sul banco:** passa. `intento: [niente]`, nessun legame, nessuna proposta né domanda, "Ci sono."

---

## B19 · 2027-03-01 22:00 · Karamazov, la cura in radio, il litigio

> oggi: finito karamazov, sentito la cura in radio, litigato con mio padre. giornata

**`frammenti/2027/03/20270301-2200.md`**

```md
---
registrato: 2027-03-01T22:00:18+01:00
canale: telefono
---
oggi: finito karamazov, sentito la cura in radio, litigato con mio padre. giornata
```

**`letture/2027/03/20270301-2200.md`** (passo 1: nessun frammento negli ultimi 3 giorni; silenzio di 20 giorni: "mentre eri via"; "mio padre" cercato prima in `cerchia: vita`: ci sono `marco` e `nonna-lina`)

```md
---
versione: 1
letto: 2027-03-01T22:02:00+01:00
intento: [salva]
reazione:
  - parole: "giornata"
    segnale: giudizio
    verso: "−"
legami:
  - nomina: i-fratelli-karamazov
    fruizione: fatta
    voce: sua
    perche: "«finito karamazov»"
  - nomina: la-cura
    voce: sua
    perche: "«sentito la cura in radio»"
  - nomina: papa
    voce: sua
    perche: "«litigato con mio padre»"
parole: [padre]
---
```

Un frammento solo, tre legami. Il riascolto di *La cura* è un `nomina` e basta: non c'è `ritorna-su` (non torni sul
frammento del 7 dicembre). "In radio" sta nel `perche`: `contesto` è uno per lettura e qui varrebbe solo per un legame.

**`opere/i-fratelli-karamazov.md`** · **`persone/papa.md`** (nuovi; Dostoevskij in chiaro, non è un nodo e non lo nomini tu; lo slug `papa` come nel §6.4, per non occupare `padre`, che il §6.4 riserva al tema)

```md
---
nome: I fratelli Karamazov
alias: [karamazov]
autore: Fëdor Dostoevskij
anno: 1880
nato-da: [20270301-2200]
---
```

```md
---
nome: mio padre
alias: [mio padre]
cerchia: vita
nato-da: [20270301-2200]
---
```

Nodi aggiornati: nessuno (`opere/la-cura.md` non elenca i frammenti che la nominano: `nato-da` resta B12).

**`restituzioni/2027/03/r-20270301-2202-risposta.md`**

```md
---
forma: risposta
per: 20270301-2200
voci:
  - n: 1
    rif: i-fratelli-karamazov
legami: []
---
**Segnato tutto.** Karamazov finito.
```

**`restituzioni/2027/03/r-20270301-2202-ritorno.md`** (nel silenzio: la lettera di domenica 15 febbraio, nata da una settimana con il solo "boh niente")

```md
---
forma: ritorno
per: 20270301-2200
voci:
  - n: 1
    rif: r-20270215-2100-settimana
legami: []
---
Mentre eri via: la lettera del 15 febbraio è ancora lì.
```

**Risposta sul telefono:** "22:02 · Mentre eri via: la lettera del 15 febbraio è ancora lì. **Segnato tutto.** Karamazov finito."

**Verifiche fatte:** 1 WebSearch per l'entità (autore, anno, come per Battiato in B12): a puntate sul *Russkij vestnik*,
gennaio 1879 – novembre 1880; in volume nel 1880 (operus.uniud.it, vqronline, Wikipedia). `anno: 1880` = forma integrale.
Rinviato: `wikidata`/`openlibrary` del romanzo; mai ID per `papa`.

**Costi:** 6 file scritti (frammento, lettura, 2 nodi, 2 restituzioni) + `contesto/`. 1 ricerca. ~2 minuti.

**Esito sul banco:** passa. Un frammento, Karamazov `fruizione: fatta` ✦ (nato), `la-cura` ✦ sul nodo di B12, `persone/papa.md`
`cerchia: vita`, `parole: [padre]`, nessuna domanda, nessun tema. La risposta è quella del banco, più il "mentre eri via".
La lacuna del banco (il ritorno spontaneo su *La cura* non ha un segno) resta: vedi gli attriti.

---

## B20 · 2027-03-08 23:40 · forse è la noia

> forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove

**`frammenti/2027/03/20270308-2340.md`**

```md
---
registrato: 2027-03-08T23:40:29+01:00
canale: telefono
---
forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove
```

**`letture/2027/03/20270308-2340.md`** (passo 1: B19 è di 7 giorni fa; nessun riferimento da risolvere. Non è `intento: sguardo`: non lo dichiari tale, §2.2)

```md
---
versione: 1
letto: 2027-03-08T23:41:50+01:00
intento: [salva]
legami:
  - parla-di: dolore
    voce: sua
    perche: "«forse il dolore non è la dimensione principale della vita… il dolore almeno ti muove»"
parole: [noia]
---
```

Nessun `contraddice`: le contraddizioni con lo sguardo sono del consolidamento, fase 1 (§3.1). Rinviato al consolidamento del
14 marzo: `contraddice` ◌ verso `20261004-2228-nucl`, che non cambia; non rende `superato` niente (§2.6: è proposto).

**`restituzioni/2027/03/r-20270308-2341-risposta.md`** (un aggancio, il ponte forte con lo sguardo; nessuna domanda: il §6.5 dice che l'unica domanda senza ambiguità è il link muto, e il confronto con domanda è della lettera, §4.3)

```md
---
forma: risposta
per: 20270308-2340
voci:
  - n: 1
    rif: 20261004-2228-nucl
legami: []
---
**Segnato.** A ottobre, nel tuo sguardo ✧: «La dimensione principale della realtà è il dolore».
```

Notifica senza contenuto: sì (ponte forte).

**Risposta sul telefono:** "23:41 · **Segnato.** A ottobre, nel tuo sguardo ✧: «La dimensione principale della realtà è il dolore»."

**Verifiche fatte:** nessuna ricerca (niente entità, niente citazioni; Schopenhauer non entra). Controllato sul punto zero la
frase esatta del nucleo: "La dimensione principale della realtà è il dolore" (realtà, non vita), e che `dolore` è un tema
esistente. Rinviato: il `contraddice` ◌ e la linea delle posizioni (consolidamento, fase 1).

**Costi:** 3 file scritti (frammento, lettura, restituzione) + `contesto/` + 1 notifica. 0 ricerche. ~1-2 minuti.

**Esito sul banco:** passa male. `parla-di: dolore` ✦, `parole: [noia]`, nucleo intatto, niente Schopenhauer, niente "hai cambiato
idea". Ma la risposta non fa la domanda del banco ("è un cambio, o un'altra faccia?"): il modello all'ingresso non la ammette
(§6.5), mentre la ammette per Sisifo (§6.6). Ho seguito il §6.5.
