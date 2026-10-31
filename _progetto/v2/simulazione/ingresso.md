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
