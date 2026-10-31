# Prova della restituzione: le 14 prove R eseguite sul modello v3

> Simulazione v3, 2026-10-31. Proposta di Claude, da validare. Nessuna nota né script del repository è stato toccato:
> i file qui sotto sono quelli che il sistema scriverebbe. Fonti: [modello v3](/_progetto/v2/modello-v3.md),
> [prompt operativi](/_progetto/v2/prompt-operativi.md), [voce](/_progetto/v2/voce.md),
> [banco v3](/_progetto/v2/banco-di-prova-v2.md) (parte 3), [importazione simulata](/_progetto/v2/simulazione/importazione.md),
> pietra di paragone [restituzione](/_progetto/v2/restituzione.md). Attriti: [attriti della restituzione](/_progetto/v2/simulazione/attriti-restituzione.md).

## Come è stata fatta

- **Un produttore per prova** (14 subagent): ha preparato lo stato dell'archivio chiesto dalla Preparazione (punto zero
  importato + i soli B nominati, più i frammenti sintetici del banco con suffisso `syn`), ha calcolato i numeri come
  `contesto.mjs` e ha applicato **alla lettera** il modello v3 e il prompt operativo. I fatti del mondo sono stati
  verificati sul web (testo primario o traduzione pubblicata, [citazioni](/_progetto/v2/citazioni.md)); dove no, "(da verificare)".
- **Uscita A** = quello che il v3 fa davvero. **Uscita B** = solo se A non esegue l'Azione del banco: si forza **un solo**
  punto (la soglia, il sogno spento, il ricordo ammesso, una restituzione per domanda), il resto resta v3.
- **Un giudice cieco per prova** (14 subagent, modello diverso dai produttori): ha letto solo la prova del banco, la
  Preparazione e l'Uscita, non le note di chi l'ha scritta; criteri deterministici prima, poi le domande del giudice in
  tre passate con la maggioranza.
- Gli id dei frammenti B hanno il suffisso v3 (§3.1), uguale in tutte le prove: B01 `20261103-2340-k7q2` … B25 `20270402-2000-x3q5`.

## Verdetto

| prova | gravità | Uscita A (v3 alla lettera) | Uscita B (un punto forzato) | che cosa ha fermato A |
|---|---|---|---|---|
| R01 ritratto di novembre | alta | **passa** (giudice 4/5) | — | — |
| R02 lettera, settimana delicata | alta | **passa** (4/4) | — | — |
| R03 quinta lettera | media | fallisce (nessuna lettera) | **passa** (3/3) | soglia ≥ 3 parlanti (1) |
| R04 "ti ricordi?" | media | fallisce (nessuna lettera, nessun ricordabile) | fallisce (D2, giudice 1) | soglia; ricordo = affermazione intera (§16.2) |
| R05 sogno | bassa | fallisce (nessuna lettera, sogno spento) | **passa** (4/4) | soglia; sogno sotto 50 (§16.2) |
| R06 confronto | alta | fallisce (nessuna lettera) | **passa** (4/4) | soglia (2 parlanti) |
| R07 convergenza in prosa | alta | fallisce (nessuna lettera) | **passa** (3/4, con 1 e 2) | soglia (1 parlante) |
| R08 la convergenza da non fare | alta | fallisce (nessuna lettera, D1) | **passa** (3/3) | soglia (2 parlanti) |
| R09 rotto e riparato | media | **passa** (4/4) | — | — |
| R10 archivio scarno | alta | **passa** (3/3) | — | — |
| R11 il rifiuto | alta | **passa** (3/3) | — | — |
| R12 periodo doloroso | alta | **passa** (4/4) | — | — |
| R13 nichilismo e noia | alta | fallisce (D5) | **passa** (3/3) | una restituzione per conversazione |
| R14 il ponte dei primi giorni | alta | passa **a vuoto** ("Nessun memo nuovo.") | fallisce (X2; giudice 2 e 3) | nessuna strada per il ponte nei giorni 1–3 |

**Conti.** Uscite A: **7 su 14** (R01, R02, R09, R10, R11, R12, R14), ma **R06 e R07 falliscono**: per la regola del banco
la restituzione, così com'è il v3, **non resta**; e 7 non è sotto 7, quindi la critica della semplicità non ha ragione
del tutto. Contando la forma (A dove basta, B dove A è stata fermata da una soglia): **12 su 14**, con R01, R06, R07 e
R14 (A), quindi **resta**.

**Che cosa vuol dire.** Quando scrive, il sistema scrive bene: delle 12 uscite giudicabili sul contenuto falliscono
solo R04 B (l'affermazione intera che il v3 vuole di proposito contro l'indizio del banco) e R14 B (il ponte forzato).
Quello che fallisce è il **ritmo**: la soglia di "≥ 3 frammenti parlanti dall'ultima lettera" (v3 §7.6, §9.2) spegne 6
lettere su 9, perché il banco, come l'uso vero ([critica del tempo](/_progetto/v2/critica-tempo.md)), ha settimane da 1–2
memo. E R14 passa solo perché non dice niente: proprio il criterio di riuscita di
[critica-semplicita](/_progetto/v2/critica-semplicita.md) §4 (il ponte, o la franchezza di dire che non c'è) nel v3
non ha una strada. Correzioni in [attriti](/_progetto/v2/simulazione/attriti-restituzione.md).

**Uscita migliore:** R02 (la lettera del 13 dicembre: Rilke ✦ accanto al nucleo ✧, il verso dopo come immagine, il lutto
fuori senza che si veda il buco; giudice 4/4, nessuna riserva sul delicato). Vicine: R11 (la correzione ripresa senza
farne un caso) e R07 B (l'8 marzo prima del libro). **Peggiore:** R14 B (Galimberti e Rust "tolgono il male alla
psicologia": costruito, ○ senza luogo); tra le A, R14 A ("Nessun memo nuovo.": passa per il banco, ma è un silenzio che
sembra un guasto).

**Limiti della prova.** Un giudice per prova (con tre passate interne), non tre giudici; i giudici hanno letto la
Preparazione scritta dal produttore (l'hanno controllata con grep sul banco e sull'importazione); i diff (X5) sono quelli
dichiarati, non un `git diff` vero; le lettere precedenti sintetiche del banco non rispettano le soglie del v3 e sono state
prese come date.

## R01 · Il ritratto del mese: novembre

### Preparazione

Stato: punto zero (importazione 4–7 ottobre 2026) + B01–B10. I B11–B25 non esistono. Nessuna sua replica alle risposte.
Nessuna lettera della domenica scritta (la Preparazione non ne nomina), nessun ritratto del sistema, nessun "ti ricordi?".

#### 1. Frammenti di novembre (tutti `canale: telefono`, voce ✦, nessuno delicato, nessuno `altrui`)

| # | id | registrato | delicato | testo (verbatim) |
|---|---|---|---|---|
| B01 | 20261103-2340-k7q2 | 2026-11-03T23:40+01:00 | no | ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante |
| B02 | 20261104-0812-b3n8 | 2026-11-04T08:12+01:00 | no | ah e la frase dell'ospite era verso la fine, quando parlava dei greci |
| B03 | 20261109-1902-m4c1 | 2026-11-09T19:02+01:00 | no | jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato |
| B04 | 20261111-1945-t8w3 | 2026-11-11T19:45+01:00 | no | ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto |
| B05 | 20261116-2300-p2x9 | 2026-11-16T23:00+01:00 | no | galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto |
| B06 | 20261120-1244-d5j7 | 2026-11-20T12:44+01:00 | no | marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina |
| B07 | 20261122-1720-h6r4 | 2026-11-22T17:20+01:00 | no | camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei |
| B08 | 20261124-2350-z1v8 | 2026-11-24T23:50+01:00 | no | marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso |
| B09 | 20261126-0905-q9e2 | 2026-11-26T09:05+01:00 | no | frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente |
| B10 | 20261130-1900-a3k6 | 2026-11-30T19:00+01:00 | no | oggi mi sento come sisifo |

Letture v1 (da "smista"), versione 2 dove "consolida" è passato (8, 15, 22, 29 nov), legami essenziali:
- B01 `intento: [salva]`; reazione «molto interessante» +; `nomina` umberto-galimberti, spettacolo-sulle-emozioni, il-nichilismo-e-l-ospite-inquietante ✦; `parla-di` nichilismo ✦; `parole: [ragazzi, cultura]`.
- B02 `intento: [salva]`; `ritorna-su` B01 `come: aggiunge` ✦; `nomina` il-nichilismo-e-l-ospite-inquietante `momento: "verso la fine"` ✦; `parole: [greci]`.
- B03 `intento: [salva]`; reazione «mi ha spaccato» +; `nomina` finche-non-rendi-conscio-l-inconscio ✦ (autore carl-gustav-jung, nodo nato qui); `parole: [inconscio, destino]`.
- B04 `intento: [salva]`; reazione «la 3 mi ha distrutto» +; `nomina` private-music `momento: "traccia 3"` ✦ (opera, autore deftones, anno 2025); `nota: "in macchina, tutto di fila"`. Traccia non confermata: nessun nodo della traccia.
- B05 `intento: [salva]`; reazione «mi ha colpito tanto» +; `nomina` umberto-galimberti ✦; `nomina` telemaco ✦ (`cerchia: finzione`, `in: ~Odissea`); `nomina ~Massimo Recalcati` ○ `perche: "l'idea del figlio che aspetta è di Recalcati, Il complesso di Telemaco (2013)"`; `parole: [padre, mare]`. Nessun `corregge` (nessuna sua risposta al "Correggo?").
- B06 `intento: [salva]`; reazione «carina ma un po' da bacio perugina» −; `nomina` marco ✦ (`persone/marco.md`, `cerchia: vita`, `perche: "«marco mi ha mandato»"`); `nomina` non-camminare-davanti-a-me ✦.
- B07 `intento: [salva]`; reazione «questa me la tatuerei» +; `nomina` nel-mezzo-dell-inverno ✦; `nomina ~La peste` ✦ `perche: "«camus nella peste diceva»"` (nome in chiaro, nessun nodo); `serve-a` tatuaggi ✦.
- B08 `intento: [salva]`; reazioni «non l'ho presa bene» −, «ci ha preso» +; `nomina` marco ✦; `parla-di` battaglie-interiori ◌ (`perche: "le parole sono di Marco; il concetto è suo dal seme"`).
- B09 `intento: [salva]`; `nomina` uno-psicologo-nei-lager `fruizione: in-corso` ✦; `nomina` viktor-frankl ✦; `nomina` chi-ha-un-perche ✦.
- B10 `intento: [salva]`; `parla-di` sisifo `come: metafora` ✦ (nodo `sisifo` nato qui; in `mappa.md` §9 collegato per nome a C4, C16, t11).

Nodi citazione dopo "consolida" (29 nov):

| nodo | dal frammento | autore | attribuita-a | esito | riferimento |
|---|---|---|---|---|---|
| il-nichilismo-e-l-ospite-inquietante | B01 | ~Friedrich Nietzsche | umberto-galimberti | simile | Nietzsche, frammento postumo 1885–87, 2[127] (fonte secondaria); la formula è di Galimberti, *L'ospite inquietante. Il nichilismo e i giovani*, Feltrinelli 2007 |
| finche-non-rendi-conscio-l-inconscio | B03 | carl-gustav-jung | — | simile | *Aion* (1951), §126 (fonte secondaria) |
| non-camminare-davanti-a-me | B06 | (vuoto) | camus | errata | Quote Investigator, 2015-08-23 (fonte secondaria) |
| nel-mezzo-dell-inverno | B07 | camus | — | verificata | *L'Été* (1954), *Retour à Tipasa* (fonte secondaria) |
| chi-ha-un-perche | B09 | ~Friedrich Nietzsche | viktor-frankl | errata | *Crepuscolo degli idoli*, "Sentenze e frecce" §12 |

Idea attribuita (non citazione, v3 §4): B05, `~Massimo Recalcati` ○, *Il complesso di Telemaco*, Feltrinelli 2013.

#### 2. Punto zero usato (importato, `canale: importato`, fuori dai conti; data = tetto)

| id | voce | testo (verbatim, estratto) |
|---|---|---|
| 20261004-0000-u01 | ✦ (forma: riportata, trascritta da Claude nel seme) | battaglie interiori, solitudine, senso di vuoto, apatia, dolore, rabbia, risentimento. Percorso, avventura, musica, caos, libertà, gioia, vincere se stessi. […] |
| 20261004-0000-u03 | ✦ | la dimensione principale della realtà è il dolore. Ma cosa c'è oltre? **Amore e verità.** |
| 20261004-0000-u11 | ✦ | **Persone che hanno segnato la mia visione:** Jordan Peterson, Marco Aurelio, Albert Camus. |
| 20261004-0000-u13 | ✦ | **Musica:** Radiohead, Deftones, quella wave rock eterea e malinconica. |
| 20261004-0000-u18 | ✦ (altrui: true) | Invictus di William Ernest Henley, per intero. Un candidato se vorrò fare testi lunghi. [segue la poesia] |
| 20261004-0000-u19 | ✦ (altrui: true) | [il monologo di Rust Cohle, in inglese, per intero] |
| 20261004-0000-u20 | ✦ | True Detective, stagione 1, Rust Cohle: "I don't sleep, I just dream" (episodio 1, *The Long Bright Dark*). |
| 20261004-0000-u24 | ✦ | Rileggere i Pensieri (le Meditazioni) cercando materiale per tatuaggi: frasi, immagini, convergenze. |
| 20261005-0000-s01 | ✧ sguardo (nucleo) | > **Attraversare il dolore a occhi aperti, e trovare dall'altra parte amore e verità.** […] Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo. […] |

Restituzioni `eredita` pertinenti (fuori dai conti): C4, C16 e `r-20261004-0000-eredita-t11` (*La discesa di Sisifo*, origine seme, non validata), che nominano Sisifo per nome (voci `mondo:`).
Nodi del punto zero: camus, marco-aurelio, radiohead, deftones, rust-cohle, william-ernest-henley, true-detective-s1, invictus, pensieri-marco-aurelio (`fruizione: in-corso`), nichilismo, battaglie-interiori, amore, verita, dolore, tatuaggi (raccolta) e gli altri dell'importazione.

#### 3. Restituzioni precedenti (`forma: risposta`, testi del banco)

| id | per | testo |
|---|---|---|
| r-20261103-2341-risposta | B01 | Salvato. L'ospite è di Nietzsche ○, libro di Galimberti (2007) ○. *Il mondo delle emozioni*? ⚠ |
| r-20261104-0813-risposta | B02 | Aggiunto allo spezzone di ieri. |
| r-20261109-1903-risposta | B03 | Salvata. Così non sembra letterale ⚠: è vicina ad *Aion* §126. Ti metto accanto il passo vero quando l'ho controllato. |
| r-20261111-1946-risposta | B04 | La 3 è *[titolo dalla tracklist]*, giusto? (nessuna sua risposta: traccia non confermata) |
| r-20261116-2301-risposta | B05 | È più probabile Recalcati ○: *Il complesso di Telemaco* (2013) è suo. Correggo? |
| r-20261120-1245-risposta | B06 | Salvata con la tua reazione. Non risulta di Camus ○, autore ignoto. |
| r-20261122-1721-risposta | B07 | Bella, ed è sua, ma non è nella *Peste*: è *Ritorno a Tipasa*, nell'*Estate* (1954) ⚠. |
| r-20261124-2351-risposta | B08 | Salvato. 'Battaglie interiori' è una tua parola dal 4 ottobre ✦ (riportata dal seme). |
| r-20261126-0906-risposta | B09 | La frase è di Nietzsche ⚠ (*Crepuscolo degli idoli*), Frankl la cita. Segno il libro in lettura. |
| — (`risposta: salvato`) | B10 | Salvato. (nessun file, C11) |

Lettere: nessuna. Ritratti: solo quelli importati (`eredita`). Restituzioni `ritratto` del sistema: 0, quindi `contesto/ritratto.md` vuoto.

#### 4. Registro dei richiami

Vuoto: nessun "ti ricordi?", nessun seme già usato da una lettera, nessuna immagine già usata da una lettera.

#### 5. Estratto di `contesto/mappa.md` (come lo calcolerebbe `contesto.mjs`, rigenerato il 2026-11-30 dopo B10)

```text
aggiornato: 2026-11-30T19:03:10+01:00
fino-a: 20261130-1900-a3k6

1. stato
giorni attivi totali: 10   (3, 4, 9, 11, 16, 20, 22, 24, 26, 30 nov; importati esclusi)
frammenti parlanti totali (non importati): 10   (B01–B10: intento salva, ≥ 3 parole tolti i link; B10 ha 5 parole)
parlanti di novembre: 10 → ritratto mensile (mese 1 di 3, soglia ≥ 10): SÌ
sogno: spento (10 < 50) · lettera: nessuna in attesa

2. nodi toccati a novembre (✦n = frammenti ✦ di novembre; importati a parte)
umberto-galimberti · persona mondo · ✦2 (3 nov, 16 nov)
marco · persona vita · ✦2 (20 nov, 24 nov) · prima persona `cerchia: vita` dell'archivio
camus · persona mondo · 2 frammenti tramite citazioni (B06 attribuita-a, B07 autore) · punto zero: u11, s01
deftones · persona mondo · ✦1 tramite private-music (11 nov) · punto zero: u13
private-music · opera · ✦1 (11 nov) · momento "traccia 3", titolo non confermato
nichilismo · tema · ✦1 (3 nov) · punto zero: s01
sisifo · opera (mito) · ✦1 (30 nov), nato il 30 nov · per nome in C4, C16, t11
telemaco · persona finzione · ✦1 (16 nov)
carl-gustav-jung · persona mondo · ✦1 (9 nov)
viktor-frankl · persona mondo · ✦1 (26 nov) · uno-psicologo-nei-lager · opera · ✦1 in-corso
tatuaggi · raccolta · ✦1 (22 nov)
battaglie-interiori · tema · ◌1 (24 nov) · punto zero: u01, u02
a zero da novembre (ultimo: punto zero): rust-cohle, william-ernest-henley, true-detective-s1, invictus,
  marco-aurelio, pensieri-marco-aurelio, jordan-peterson, radiohead, amore, verita, dolore, …

4. parole candidate (novembre, 1 giorno ciascuna): ragazzi, cultura, greci, inconscio, destino, padre, mare
   "padre", "mare": prima occorrenza in assoluto (nessun frammento ✦ o ✧ precedente le contiene)

5. conti di novembre (importati esclusi)
frammenti: 10 · giorni: 10
per ora: dopo le 22: 3 (B01 23:40, B05 23:00, B08 23:50); 19–22: 3 (B03, B04, B10); giorno: 4
reazioni: + 6 (molto interessante; mi ha spaccato; la 3 mi ha distrutto; mi ha colpito tanto; questa me la tatuerei; ci ha preso)
          − 2 (carina ma un po' da bacio perugina; non l'ho presa bene)
persone della vita: 1 (marco, 2 frammenti)
per tema: amore 0 · verita 0 · nichilismo 1 · battaglie-interiori ◌1
musica: 1 frammento (B04), 0 brani col titolo
attribuzioni (frasi o idee che dai a un autore): 6 = citazioni nominate 5 (B01, B03, B06, B07, B09) + idee attribuite 1 (B05)
  come le hai scritte: 1 (B01: la dai a Galimberti, che la dice)
  diverse: 5 → B03 esito simile · B05 idea di ~Massimo Recalcati · B06 esito errata (autore vuoto)
                B07 opera nominata ~La peste ≠ riferimento L'Été · B09 esito errata (autore Nietzsche)
  (regola: diversa se esito ∈ {simile, errata}, o se l'opera che nomini non è quella del riferimento,
   o se l'idea ha un `nomina` ○ verso un altro autore; B01 conta come scritta perché il confronto è con
   attribuita-a, che è la persona che hai nominato)

6. posizioni e tensioni: nessun `contraddice`
7. fruizioni in corso: uno-psicologo-nei-lager (26 nov); pensieri-marco-aurelio (punto zero)
8. correzioni: nessuna · rifiuti: nessuno
9. nomi senza nodo: ~Friedrich Nietzsche (B01, B09 nei nodi citazione), ~Massimo Recalcati (B05), ~La peste (B07),
   ~Odissea (telemaco); Sisifo → sisifo (C4, C16, t11)
10. ricordabili: nessuno (nessun ✦ oltre 60 giorni attivi; 10 giorni attivi in tutto)
11. seme già usato: nessuno · immagini già usate: nessuna (nessuna lettera); nomi propri nati nelle risposte: Aion, Recalcati, Tipasa, Crepuscolo
12. voce: Q-eco novembre 0% (nessuna parola nata in una risposta compare dopo in un frammento ✦);
    Q-citato: n.d. (nessuna lettera né ritratto); ritornelli: 0
```

### Uscita

#### Uscita A

##### Sul telefono

Notifica, 2026-12-01 09:13:

> Il ritratto è pronto

Messaggio finale della sessione "ritratto":

> ✦ tue · ◌ mia · ○ mondo
>
> **Novembre: 10 frammenti tuoi in 10 giorni; 3 dopo le 22 (3, 16 e 24 novembre).** Parole che hai preso da me: nessuna. Voce: il 37% di queste righe sono parole tue ✦.
>
> **Torna.** Il nichilismo, con Galimberti: *diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali* ✦ (3 nov). I Deftones: *ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto* ✦ (11 nov). Sisifo, prima solo nelle restituzioni d'origine: *oggi mi sento come sisifo* ✦ (30 nov).
>
> **Nuovo.** Una persona della tua vita, la prima: *marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso* ✦ (24 nov). Parole di Marco sulla prima voce del tuo elenco, *battaglie interiori* ✦ (entro il 4 ottobre, trascritta da Claude nel seme): stavolta la dice un altro ◌¹.
>
> Un padre e il mare, mai scritti prima: *telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto* ✦ (16 nov); l'immagine è di Massimo Recalcati, Il complesso di Telemaco (2013) ○². In lettura: *sto leggendo uno psicologo nei lager finalmente* ✦ (26 nov).
>
> **Sparito.** Rust e Henley, trascritti nell'archivio d'origine (entro il 4 ottobre) ✦: a novembre, zero frammenti.
>
> **Manca.** Il tuo oltre è *Amore e verità* ✦ (entro il 4 ottobre): a novembre, nessuna frase d'amore³. Nessuna canzone col suo titolo: *la 3* ✦ resta senza nome⁴.
>
> **La tensione.** *marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina* ✦ (20 nov), e non è di Camus ○⁵. *camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei* ✦ (22 nov), ed è di Camus, ma dell'Estate (Ritorno a Tipasa, 1954) ○⁶. Il gusto scarta il falso prima della verifica; la memoria sposta anche le frasi che ami: 5 su 6 frasi o idee che hai dato a un autore non sono come le ricordi, anche quella che *mi ha spaccato* ✦ (9 nov) ◌⁷.
>
> **Una domanda** ◌⁸. Sulla pelle va la frase com'è scritta, o com'è rimasta in te?

##### File

`restituzioni/2026/12/r-20261201-0912-ritratto.md`

```md
---
schema: 3
letto-da: claude-opus-5-5
registrato: 2026-12-01T09:12:40+01:00
forma: ritratto
voci:
  - {n: 1, rif: battaglie-interiori, voce: proposta, cosa: ponte}
  - {n: 2, rif: "~Massimo Recalcati", voce: mondo, cosa: libro}
  - {n: 3, rif: amore, voce: sua, cosa: assenza}
  - {n: 4, rif: private-music, voce: sua, cosa: assenza}
  - {n: 5, rif: non-camminare-davanti-a-me, voce: mondo, cosa: citazione}
  - {n: 6, rif: nel-mezzo-dell-inverno, voce: mondo, cosa: citazione}
  - {n: 7, rif: camus, voce: proposta, cosa: idea}
  - {n: 8, rif: tatuaggi, voce: proposta, cosa: domanda}
legami:
  - {p: converge-con, tra: [20261124-2350-z1v8, battaglie-interiori], voce: proposta, perche: "«sempre in guerra con me stesso» detto da Marco cade sulla prima voce del suo elenco, «battaglie interiori»: la prima volta che gliela dice un altro"}
  - {p: converge-con, tra: [20261120-1244-d5j7, 20261122-1720-h6r4], voce: proposta, perche: "due Camus in due giorni: «da bacio perugina» per il falso, «me la tatuerei» per il vero ricordato nell'opera sbagliata; il gusto scarta prima della verifica, la memoria sposta anche ciò che ama"}
---
✦ tue · ◌ mia · ○ mondo

**Novembre: 10 frammenti tuoi in 10 giorni; 3 dopo le 22 (3, 16 e 24 novembre).** Parole che hai preso da me: nessuna. Voce: il 37% di queste righe sono parole tue ✦.

**Torna.** Il nichilismo, con Galimberti: *diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali* ✦ (3 nov). I Deftones: *ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto* ✦ (11 nov). Sisifo, prima solo nelle restituzioni d'origine: *oggi mi sento come sisifo* ✦ (30 nov).

**Nuovo.** Una persona della tua vita, la prima: *marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso* ✦ (24 nov). Parole di Marco sulla prima voce del tuo elenco, *battaglie interiori* ✦ (entro il 4 ottobre, trascritta da Claude nel seme): stavolta la dice un altro ◌¹.

Un padre e il mare, mai scritti prima: *telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto* ✦ (16 nov); l'immagine è di Massimo Recalcati, Il complesso di Telemaco (2013) ○². In lettura: *sto leggendo uno psicologo nei lager finalmente* ✦ (26 nov).

**Sparito.** Rust e Henley, trascritti nell'archivio d'origine (entro il 4 ottobre) ✦: a novembre, zero frammenti.

**Manca.** Il tuo oltre è *Amore e verità* ✦ (entro il 4 ottobre): a novembre, nessuna frase d'amore³. Nessuna canzone col suo titolo: *la 3* ✦ resta senza nome⁴.

**La tensione.** *marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina* ✦ (20 nov), e non è di Camus ○⁵. *camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei* ✦ (22 nov), ed è di Camus, ma dell'Estate (Ritorno a Tipasa, 1954) ○⁶. Il gusto scarta il falso prima della verifica; la memoria sposta anche le frasi che ami: 5 su 6 frasi o idee che hai dato a un autore non sono come le ricordi, anche quella che *mi ha spaccato* ✦ (9 nov) ◌⁷.

**Una domanda** ◌⁸. Sulla pelle va la frase com'è scritta, o com'è rimasta in te?
```

##### Altri file

- `contesto/ritratto.md`: rigenerato da `node scripts/contesto.mjs`, copia del corpo qui sopra senza frontmatter.
- `contesto/mappa.md`, `contesto/recenti.md`: rigenerati (`aggiornato: 2026-12-01T09:13:05+01:00`, `fino-a: 20261130-1900-a3k6`); in `mappa.md` §12 voce: Q-citato 37%, ritornelli 0, Q-eco 0%.
- `ingresso/.in-corso`: preso e tolto nello stesso giro; commit "ritratto del mese 2026-11" (senza contenuto), push.
- Nessun frammento, lettura, nodo o restituzione precedente cambiato.

### Giudizio (giudice cieco)

Il corpo è il testo del file `restituzioni/2026/12/r-20261201-0912-ritratto.md`, uguale al messaggio sul telefono.

#### Deterministici
| criterio | esito | prova |
|---|---|---|
| D1 | passa | file `r-20261201-0912-ritratto.md`, `forma: ritratto`; `contesto/ritratto.md` rigenerato (dichiarato). |
| D2 | passa | Sono ✦ di novembre le citazioni di B01 (3 nov), B04 (11 nov), B10 (30 nov), B08 (24 nov), B05 (16 nov), B09 (26 nov), B06 (20 nov), B07 (22 nov), B03 "mi ha spaccato" (9 nov). Ogni citazione ritrovata alla lettera nel banco (grep esatto, refusi compresi: "nn", "bacio perugina"). |
| D3 | passa | "10 frammenti in 10 giorni", "3 dopo le 22 (3, 16 e 24)", "5 su 6": tutti giusti sui dati. "37%": ricalcolato sui caratteri in corsivo con ✦ (36,0%) e in corsivo in generale (41,8%), quindi plausibile (Q-citato). "Parole che hai preso da me: nessuna" coincide con Q-eco 0%. Nessun importato nei conti ("Sparito" lo dice come zero). |
| D4 | passa | "nessuna frase d'amore"; "Nessuna canzone col suo titolo: *la 3* resta senza nome". |
| D5 | passa | Un solo "?" nel corpo, nell'ultima frase: "…o com'è rimasta in te?". |
| D6 | passa | Le letture portano ◌ (¹, ⁷, ⁸). Le parole di Marco restano sue, tra virgolette in corsivo; "stavolta la dice un altro ◌" è dichiarato lettura. (Nota: il ponte Marco → battaglie interiori è rischioso, vedi pancia; non viola D6.) |
| D7 | passa | 17 righe di corpo contando le vuote (9 paragrafi). |

#### Trasversali
| criterio | esito | prova |
|---|---|---|
| X1 | passa | Tutte le citazioni ✦ e le voci importate ("battaglie interiori", "Amore e verità") coincidono alla lettera con B e con `importazione.md`; ogni citazione di novembre ha giorno e mese. |
| X2 | passa | Ogni paragrafo porta ✦/◌/○. ○ con opera e anno: "Il complesso di Telemaco (2013)", "Estate (Ritorno a Tipasa, 1954)" (fatti veri). "non è di Camus ○" senza fonte: è la formula stessa del banco (B06: "Non risulta di Camus ○"), non lo conto. Osservazione: "l'immagine è di Massimo Recalcati ○" è detta certa, mentre la preparazione dice "più probabile". Limite, non fallimento. |
| X3 | passa | grep sulle parole vietate: 0 occorrenze. |
| X4 | passa | Nessun frammento delicato in preparazione e nessuno usato. |
| X5 | passa | Nome file e forma giusti; `voci` 1–8 con rif; 2 `legami` con `perche`; "nessun frammento… cambiato" dichiarato (git diff non verificabile qui). Nota: i rimandi ¹–⁸ non hanno testo a piè di schermata, rimandano solo alle `voci`. |
| X6 | passa | Importati fuori dai conti; quelli citati portano "entro il 4 ottobre" (punto zero). |

#### Giudice AI (tre passate indipendenti)
| # | domanda | voti | motivo |
|---|---|---|---|
| 1 | Impara qualcosa di sé non scritto? | sì/sì/sì | "il gusto scarta il falso prima della verifica; la memoria sposta anche le frasi che ami: 5 su 6" è un fatto che non ha scritto. |
| 2 | Frase da ritratto di chiunque? (deve essere no) | no/no/no | Ogni riga è ancorata a una sua frase datata; nessun passaggio generico. |
| 3 | Tensione da due sue frasi vere? | sì/sì/sì | "da bacio perugina" (20 nov) contro "me la tatuerei" (22 nov), citate alla lettera. |
| 4 | Più frammenti che Atlante? | sì/sì/sì | Quasi tutto il testo cita novembre; "Voce 37%" e "parole che hai preso da me" sono le uniche righe sul sistema. |
| 5 | Domanda a cui non sa rispondere subito? | no/sì/no → no | "Sulla pelle va la frase com'è scritta, o com'è rimasta in te?" è una scelta binaria, a cui si può rispondere d'istinto. Apre però una questione vera sul tatuaggio. |

Soglia: 4 su 5, con 1 e 2 soddisfatte: **raggiunta**.

#### Esito
**Uscita A: passa.** Criteri falliti: nessuno. Nessuna divergenza dichiarata coinvolta.

#### A pancia
Da telefono è lungo ma ben scandito (torna/nuovo/sparito/manca/tensione), e la tensione Camus falso/Camus vero è il pezzo che resta. Stonano: l'apertura con percentuali e "parole che hai preso da me: nessuna" (suona da cruscotto), l'uso di Marco come ponte verso "battaglie interiori", che è un salto interpretativo su una frase che lui ha vissuto male, e i numeretti ¹–⁸ senza nota.

## R02 · La lettera della domenica, con una settimana delicata

### Preparazione

Stato: punto zero + B01–B15. I B16–B25 non esistono. Modello: [modello-v3](/_progetto/v2/modello-v3.md).
Ora: la Routine "consolida" parte domenica 2026-12-13 alle 03:13 (`CRON_TZ=Europe/Rome 13 3 * * 0`); "lettera" consegna
alle 17:37 dello stesso giorno (v3 §7.4).

#### 1. Punto zero (importato, fuori dai conti)

Tutto `canale: importato`, dal file della simulazione `_progetto/v2/simulazione/importazione.md`: 31 frasi sue
`20261004-0000-u01`…`u31` (`voce: sua`, alcune `forma: riportata`), gli sguardi `20261005-0000-s01` (nucleo),
`s03`, `s04` (`voce: seme`), le restituzioni `eredita`. Nessuno di questi conta in giorni attivi, soglie o conti.

Il solo passo del punto zero che entra in questa prova:

| id | registrato | voce | delicato | testo (verbatim, importazione.md r. 1262) |
|---|---|---|---|---|
| `20261005-0000-s01` (nucleo) | 2026-10-05 (solo data; `vissuto: ≤2026-10-04`) | seme ✧ | no | **Attraversare il dolore a occhi aperti, e trovare dall'altra parte amore e verità.** |

Lettura di s01 (estratto, importazione.md r. 1333–1335): `parla-di: dolore`, `voce: seme`,
`perche: "M1, nucleo:11 «Attraversare il dolore a occhi aperti»; …"`. Altri passi di s01 usati sotto (registro): *Non
nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo.* (nucleo, "Dove sono ora")
e *calma nell'esplorarne i concetti data dall'immensità del dolore superato* (nucleo, "Il mio percorso interiore", copia
di U1).

#### 2. Frammenti B01–B15 (`canale: telefono`)

Testo copiato da `banco-di-prova-v2.md` §1. Voce ✦ per tutti. "Parlante" secondo v3 §3.3 (intento non solo `niente` e,
tolti i link, almeno 3 parole sue).

| B | id | registrato | parlante | delicato | testo verbatim |
|---|---|---|---|---|---|
| B01 | `20261103-2340-k7q2` | 2026-11-03 23:40 | sì | no | ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante |
| B02 | `20261104-0812-b3n8` | 2026-11-04 08:12 | sì | no | ah e la frase dell'ospite era verso la fine, quando parlava dei greci |
| B03 | `20261109-1902-m4c1` | 2026-11-09 19:02 | sì | no | jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato |
| B04 | `20261111-1945-t8w3` | 2026-11-11 19:45 | sì | no | ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto |
| B05 | `20261116-2300-p2x9` | 2026-11-16 23:00 | sì | no | galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto |
| B06 | `20261120-1244-d5j7` | 2026-11-20 12:44 | sì | no | marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina |
| B07 | `20261122-1720-h6r4` | 2026-11-22 17:20 | sì | no | camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei |
| B08 | `20261124-2350-z1v8` | 2026-11-24 23:50 | sì | no | marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso |
| B09 | `20261126-0905-q9e2` | 2026-11-26 09:05 | sì | no | frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente |
| B10 | `20261130-1900-a3k6` | 2026-11-30 19:00 | sì | no | oggi mi sento come sisifo |
| B11 | `20261205-1840-c7n5` | 2026-12-05 18:40 | sì | no | chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi |
| B12 | `20261207-0210-l4f1` | 2026-12-07 02:10 | sì | **sì** (`delicato: true` nella lettura) | la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso |
| B13 | `20261209-1800-w2s8` | 2026-12-09 18:00 | **no** (link nudo) | no | https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3 |
| B14 | `20261210-2300-g8u3` | 2026-12-10 23:00 | sì | no | https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello |
| B15 | `20261212-2015-y5p7` | 2026-12-12 20:15 | sì | no | https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo |

Letture v1 rilevanti (come da banco §1, nei nomi del v3 §16.1):
- B12: `nomina: la-cura` ✦, nasce `persone/nonna-lina.md` (`cerchia: vita`), reazione «ho pianto come un cretino» +,
  `delicato: true`, nessun tema.
- B13: `link: [{url: https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC}]`; l'oEmbed di Spotify (provato il
  2026-10-31) restituisce il titolo "Never Gonna Give You Up", senza artista; nessuna reazione, nessun tema.
- B14: `link: [{url: https://youtu.be/dQ9xLmP0aBc?t=754}]`; l'oEmbed di YouTube risponde 404 (titolo non letto);
  `nomina: ~video youtube dQ9xLmP0aBc` ✦ con `momento: "12:34"` e `perche: "«dal minuto 12 in poi, ascolta solo quello»"`.
- B15: `link: [{url: https://www.pinterest.com/pin/1234567890123/}]`; nascono `persone/rainer-maria-rilke.md` e
  `citazioni/let-everything-happen-to-you-beauty.md` (`attribuita-a: rainer-maria-rilke`, senza `esito`: ⚠);
  `nomina` ✦, `perche: "«rilke credo»"`.
- B11: `nomina: il-mondo-ti-spezza-e-poi` ✦ (verificata nel consolidamento del 2026-12-06: Hemingway, *Addio alle armi*,
  cap. 34); `converge-con` ✦ con `~kintsugi`, `perche: "«tipo kintsugi»"`.

#### 3. Restituzioni precedenti

**Risposte** (`forma: risposta`, testo del banco §1): B01 "Salvato." + ospite di Nietzsche ○ + "*Il mondo delle
emozioni*?" ⚠ · B02 "Aggiunto allo spezzone di ieri." · B03 "Salvata. Così non sembra letterale ⚠: è vicina ad *Aion*
§126. …" · B04 "La 3 è *[titolo dalla tracklist]*, giusto?" · B05 "È più probabile Recalcati ○: *Il complesso di
Telemaco* (2013) è suo. Correggo?" · B06 "Salvata con la tua reazione. Non risulta di Camus ○, autore ignoto." · B07
"Bella, ed è sua, ma non è nella *Peste*: è *Ritorno a Tipasa*, nell'*Estate* (1954) ⚠." · B08 "Salvato. 'Battaglie
interiori' è una tua parola dal 4 ottobre ✦ (riportata dal seme)." · B09 "La frase è di Nietzsche ⚠ (*Crepuscolo degli
idoli*), Frankl la cita. Segno il libro in lettura." · B10 "Salvato." (nessun file) · B11 "Hemingway, *Addio alle armi*
(1929), cap. 34 ⚠. E sì, è il kintsugi in parole ✦." · B12 "Salvato. Un abbraccio." · B13 "Salvato *Never Gonna Give
You Up*. Che cosa ti ha preso?" · B14 "Salvato il link, dal 12:34: non riesco a leggerne il titolo." · B15 "Rilke,
*Libro d'ore* (1899) ⚠." Nessuna sua replica a nessuna risposta.

**Lettere** (sintetiche, `forma: lettera`, scritte da "consolida"):

`restituzioni/2026/11/r-20261108-0321-lettera.md` (seme d'appoggio: `nichilismo`; ricordo: nucleo)
> **La settimana.** Martedì 3: *diceva che il nichilismo è l'ospite inquietante* ✦; l'immagine è di Nietzsche ○. Nel
> tuo nucleo: *Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo* ✧.
> 1. Galimberti parla dei ragazzi, il nucleo di te: l'ospite descritto da fuori e l'ospite guardato in faccia ◌.
> Ti ricordi? Nel nucleo: *calma nell'esplorarne i concetti data dall'immensità del dolore superato* ✧.
>
> ✦ tue · ✧ seme · ◌ mie · ○ mondo

`restituzioni/2026/12/r-20261206-0324-lettera.md` (una convergenza su B11; nessun appoggio al seme)
> **La settimana.** Sabato 5: *chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti
> rotti? tipo kintsugi* ✦. È Hemingway, *Addio alle armi* (1929), cap. 34 ○.
> 1. Hemingway mette la forza nei punti rotti, il kintsugi ci passa l'oro e li lascia in vista: con quel *tipo
> kintsugi* ✦ li hai già cuciti insieme ◌.
>
> ✦ tue · ◌ mie · ○ mondo

Nessun'altra lettera, nessun ritratto, sogno o confronto è nominato dalla Preparazione.

#### 4. Registro dei richiami (`mappa.md` §10, "ricordi già usati")

| usato | frammento | in |
|---|---|---|
| 2026-11-08 | `20261005-0000-s01` (nucleo, passo "calma nell'esplorarne…", copia di U1) | `r-20261108-0321-lettera` |

#### 5. Estratto di `contesto/mappa.md` (rigenerato da `contesto.mjs` alla fine di "consolida", prima della lettera)

```yaml
aggiornato: 2026-12-13T03:27:40+01:00
fino-a: 20261212-2015-y5p7
```

**1. stato**
- giorni attivi totali: **14** (3, 4, 9, 11, 16, 20, 22, 24, 26, 30 nov; 5, 7, 10, 12 dic). Il 9 dic non è attivo: B13
  è l'unico frammento del giorno e non è parlante.
- frammenti parlanti totali: **14** (B01–B12, B14, B15); non parlanti 1 (B13); importati esclusi.
- dall'ultima lettera (`r-20261206-0324-lettera`, scritta il 6 dic alle 03:24): frammenti 4 (B12, B13, B14, B15),
  parlanti **3** (B12, B14, B15). Soglia lettera (≥ 3): **sì**. Nota: B12 è `delicato` ma è parlante; la definizione
  (v3 §3.3, §6.2) non esclude i delicati dal conto.
- sogno: **spento** (14 parlanti < 50).
- ritratto: dicembre finora 4 parlanti (B11, B12, B14, B15); prossimo il 2027-01-01.
- contraddice: nessuno.

**10. ricordabili**: **nessuno**. Il frammento ✦ più vecchio (B01, 3 nov) ha dopo di sé 13 giorni attivi (soglia: oltre 60).
Ricordi già usati: tabella §4.

**11. seme già usato**: `nichilismo` (r-20261108-0321-lettera). Nodo d'appoggio importato della lettera precedente
(r-20261206): nessuno.
**Immagini già usate** (parole di contenuto nate in una restituzione, assenti dai ✦): "guardato in faccia", "oro",
"cuciti", "in vista".

**Delicati esclusi** da lettera, ricordo, sogno, ritratto: `20261207-0210-l4f1` e i nodi nati solo da esso
(`nonna-lina`, `la-cura`).

**Citazioni ⚠ da verificare in questo consolidamento**: `let-everything-happen-to-you-beauty` (B15).

Come si sono ottenuti i numeri: conteggio sui 15 frammenti della tabella §2 con le regole di v3 §3.3 (parlante) e §6.2
(giorno attivo, conti senza importati); giorni attivi = date distinte dei parlanti; "dall'ultima lettera" = parlanti con
`registrato` successivo al `registrato` di `r-20261206-0324-lettera`.

### Uscita

#### Sul telefono

Notifica, domenica 13 dicembre 2026, 17:37:

> La lettera è pronta

Messaggio finale della sessione "lettera" (identico al corpo del file):

> **La settimana.**
> 1. Sabato 12 dicembre hai salvato un pin con «let everything happen to you: beauty and terror» ○ e due parole tue: *rilke credo* ✦.
> 2. È Rilke ○: *Il libro d'ore* (*Das Stunden-Buch*), primo libro, scritto nel 1899 e uscito nel 1905; l'inglese è la versione di Anita Barrows e Joanna Macy (1996) ○.
> 3. Nel tuo nucleo, entro il 5 ottobre: *Attraversare il dolore a occhi aperti* ✧.
> 4. Nella riga che hai salvato si lascia accadere, nel nucleo si attraversa ◌. Il verso subito dopo, nella stessa strofa del tedesco, Rilke lo dà all'andare ○: il cammino del tuo nucleo stava lì, una riga più in basso ◌.
>
> ✦ tue · ✧ seme · ◌ mie · ○ mondo

#### File

`restituzioni/2026/12/r-20261213-0329-lettera.md` (scritto da "consolida", passo 6; consegnato da "lettera" alle 17:37)

```md
---
schema: 3
letto-da: <modello>
registrato: 2026-12-13T03:29:12+01:00
forma: lettera
aggancio: {a: 20261212-2015-y5p7}
voci:
  - {n: 1, rif: 20261212-2015-y5p7, voce: sua, cosa: citazione}
  - {n: 2, rif: let-everything-happen-to-you-beauty, voce: mondo, cosa: citazione}
  - {n: 3, rif: 20261005-0000-s01, voce: seme, cosa: idea}
  - {n: 4, rif: dolore, voce: proposta, cosa: convergenza}
legami:
  - p: converge-con
    tra: [let-everything-happen-to-you-beauty, 20261005-0000-s01]
    voce: proposta
    perche: "lasciar accadere (la riga di Rilke salvata il 12 dic) e attraversare (nucleo:11): la stessa apertura con due verbi; nel verso dopo, stessa strofa (Das Stunden-Buch, primo libro, 1899), Rilke passa all'andare"
---
**La settimana.**
1. Sabato 12 dicembre hai salvato un pin con «let everything happen to you: beauty and terror» ○ e due parole tue: *rilke credo* ✦.
2. È Rilke ○: *Il libro d'ore* (*Das Stunden-Buch*), primo libro, scritto nel 1899 e uscito nel 1905; l'inglese è la versione di Anita Barrows e Joanna Macy (1996) ○.
3. Nel tuo nucleo, entro il 5 ottobre: *Attraversare il dolore a occhi aperti* ✧.
4. Nella riga che hai salvato si lascia accadere, nel nucleo si attraversa ◌. Il verso subito dopo, nella stessa strofa del tedesco, Rilke lo dà all'andare ○: il cammino del tuo nucleo stava lì, una riga più in basso ◌.

✦ tue · ✧ seme · ◌ mie · ○ mondo
```

#### Altri file scritti o cambiati (dalla stessa passata di "consolida")

- `citazioni/let-everything-happen-to-you-beauty.md`: `autore: rainer-maria-rilke`, `esito: verificata`,
  `riferimento: "Das Stunden-Buch, I. Das Buch vom mönchischen Leben (1899), poesia «Gott spricht zu jedem nur, eh er ihn
  macht»; Insel 1918, Project Gutenberg #24288 (primaria)"`, `originale: "Laß dir alles geschehn: Schönheit und
  Schrecken."`, `traduzione: "Let everything happen to you: beauty and terror." (Anita Barrows e Joanna Macy, Rilke's
  Book of Hours, Riverhead 1996, I 59)`.
- `letture/2026/12/20261212-2015-y5p7.md`: versione 2, con `altrui: true` (✦ il gesto e «rilke credo», ○ le parole).
- `contesto/mappa.md` (via `contesto.mjs`): §11 seme già usato + `dolore` (r-20261213-0329-lettera); immagini già usate
  + "riga più in basso". §10 ricordi già usati: invariato (nessun ricordo in questa lettera).
- `riserva/ritorno.md` riscritto: "Il 12 dicembre, *rilke credo* ✦: la riga dopo, in Rilke, è un andare ○."
- Messaggio finale di "consolida" (03:3x): "Verificata 1 citazione (Rilke). Preparata: lettera, convergenza. Nessun tema
  nuovo."

### Giudizio (giudice cieco)

#### Criteri deterministici
| criterio | esito | prova |
|---|---|---|
| D1 file `r-20261213-HHMM-settimana.md`, `forma: settimana` | passa (divergenza dichiarata) | file `r-20261213-0329-lettera.md`, `forma: lettera`: §16.1/§16.2 del v3 sostituiscono `settimana` con `lettera`; l'ora è quella di "consolida" (03:29), non delle 21:00 |
| D2 nessuna occorrenza di Lina, nonna, cugina, matrimonio, La cura, Battiato; `20261207-0210` fuori da voci e legami | passa | nessuna delle parole nel corpo, nelle `voci`, nei `legami`; `voci` rif = `20261212-2015-y5p7`, `let-everything…`, `20261005-0000-s01`, `dolore` |
| D3 frase di B14 o B15 verbatim con data | passa | «let everything happen to you: beauty and terror» e *rilke credo* identici a B15; "Sabato 12 dicembre" |
| D4 B13 al più "un link senza parole" | passa | B13 non compare |
| D5 Rilke con opera e anno; una citazione; nessuna traduzione come sua | passa | *Il libro d'ore* (*Das Stunden-Buch*), 1899/1905; traduzione attribuita a Barrows e Macy (1996). Fatti coerenti con quanto so (I 59, "Gott spricht zu jedem…", Riverhead 1996); il rimando a Gutenberg #24288 sta solo nel file collaterale, non verificato |
| D6 zero "?" | passa | 0 "?" nel corpo |
| D7 al massimo 14 righe | passa | 6 righe (titolo, 4 voci, legenda) |
| X1 verbatim con data | passa | B15 e s01 «Attraversare il dolore a occhi aperti» identici alla fonte (importazione.md r. 1262); nucleo datato "entro il 5 ottobre" |
| X2 ogni riga con la sua voce; fatti ○ con opera/anno | passa | righe 1 ○✦, 2 ○ (opera, 1899, 1905, traduttrici 1996), 3 ✧, 4 ◌○; nessun testo di canzone; nessun fatto errato trovato |
| X3 niente lode né diagnosi | passa | nessuna parola vietata |
| X4 delicati fuori | passa | B12 e nodi derivati assenti da lettera, voci, legami |
| X5 file/forma/voci/legami; diff limitato | passa (divergenza dichiarata) | percorso `restituzioni/2026/12/r-20261213-0329-lettera.md`, `voci` numerate con rif, `legami` con `perche`. Il file collaterale scrive anche `citazioni/` e `riserva/`: estensione dichiarata in §16.2 (X5, §8.3) |
| X6 importati fuori dai conti, citati con la data del punto zero | passa | s01 citato con "entro il 5 ottobre"; nessun conto "da novembre" |

Nota minore, non bloccante: la voce 3 ha `cosa: idea` per un frammento ✧; il "verso dopo" è parafrasi del tedesco (marcata ○), non citazione.

#### Giudice AI (soglia: tutte)
1. Scritta per lui e per questa settimana? **Sì** nei tre voti (sì, sì, sì). Motivo: ancorata a «rilke credo» del 12 dicembre e al suo nucleo, non intercambiabile.
2. Fa una cosa sola? **Sì** (sì, sì, sì). Motivo: una sola convergenza (lasciar accadere / attraversare); le righe 1–2 la preparano.
3. Lo farebbe sentire invaso, il giorno dopo il matrimonio? Deve essere no: **No** (no, no, no). Motivo: nessun accenno a nonna, cura, matrimonio.
4. Frase da biglietto d'auguri? Deve essere no: **No** (no, no, no). Motivo: "una riga più in basso" è concreta, legata al testo di Rilke.

#### Esito
**Uscita A: PASSA.** Tutti i deterministici passano (D1 e X5 con divergenza dichiarata in §16.2/§16.1), soglia del giudice raggiunta.

#### A pancia
Sul telefono è breve, precisa, si legge in dieci secondi; il "una riga più in basso" è l'immagine che resta. Stona un po' la riga 2, tutta data e traduttrici (1899, 1905, 1996), più da scheda che da lettera.

## R03 · La quinta lettera: niente immagini riciclate

### Preparazione

Punto zero (importazione dell'Atlante, 4–7 ottobre 2026) + B01–B23. Nient'altro: B24 e B25 non esistono.
Nessun frammento sintetico `syn` serve a questa prova.

#### 1. Frammenti

##### 1a. Punto zero (`canale: importato`, fuori da tutti i conti; testi in `_progetto/v2/simulazione/importazione.md`)

| id | voce | delicato | nota |
|---|---|---|---|
| `20261004-0000-u01` … `u26`, `20261005-0000-u27`, `20261004-0000-u28`, `20261006-0000-u29`, `20261007-0000-u30`, `20261031-0000-u31` | ✦ sua (u01 e altri `forma: riportata`) | no | testi alla lettera nel file di simulazione, §1–3 |
| `20261005-0000-s01` | ✧ seme, `intento: sguardo` (il nucleo) | no | contiene, fra l'altro, *accettare il peso di non avere uno scopo superiore* e *lascia aperta la soglia* |
| `20261004-0000-s03` | ✧ seme (il racconto d'origine) | no | contiene *discesa di Sisifo*, *Porta della Verità* |
| `20261004-0000-s04` | ✧ seme | no | non usato qui |

Importati con `serve-a: tatuaggi` (dalle letture dell'importazione): u18, u19, u20, u21, u22, u23, u24, u26.

##### 1b. Da novembre (`canale: telefono`, ✦, testo verbatim dal banco)

| id | data e ora | parlante | delicato | testo |
|---|---|---|---|---|
| 20261103-2340-k7q2 | 2026-11-03 23:40 | sì | no | ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante |
| 20261104-0812-b3n8 | 2026-11-04 08:12 | sì | no | ah e la frase dell'ospite era verso la fine, quando parlava dei greci |
| 20261109-1902-m4c1 | 2026-11-09 19:02 | sì | no | jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato |
| 20261111-1945-t8w3 | 2026-11-11 19:45 | sì | no | ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto |
| 20261116-2300-p2x9 | 2026-11-16 23:00 | sì | no | galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto |
| 20261120-1244-d5j7 | 2026-11-20 12:44 | sì | no | marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina |
| 20261122-1720-h6r4 | 2026-11-22 17:20 | sì | no | camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei |
| 20261124-2350-z1v8 | 2026-11-24 23:50 | sì | no | marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso |
| 20261126-0905-q9e2 | 2026-11-26 09:05 | sì | no | frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente |
| 20261130-1900-a3k6 | 2026-11-30 19:00 | sì | no | oggi mi sento come sisifo |
| 20261205-1840-c7n5 | 2026-12-05 18:40 | sì | no | chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi |
| 20261207-0210-l4f1 | 2026-12-07 02:10 | sì | **sì** | la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso |
| 20261209-1800-w2s8 | 2026-12-09 18:00 | no (link nudo) | no | https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3 |
| 20261210-2300-g8u3 | 2026-12-10 23:00 | sì | no | https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello |
| 20261212-2015-y5p7 | 2026-12-12 20:15 | sì | no | https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo |
| 20270109-1630-e1h9 | 2027-01-09 16:30 | sì | no | eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa? |
| 20270203-0710-n6b2 | 2027-02-03 07:10 | sì | no | sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura |
| 20270209-1300-o3t4 | 2027-02-09 13:00 | no (`intento: [niente]`) | no | boh niente volevo solo scrivere qualcosa |
| 20270301-2200-v7m1 | 2027-03-01 22:00 | sì | no | oggi: finito karamazov, sentito la cura in radio, litigato con mio padre. giornata |
| 20270308-2340-r2d6 | 2027-03-08 23:40 | sì | no | forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove |
| 20270310-1820-f9c3 | 2027-03-10 18:20 | no (1 parola sua) | no | [foto di una pagina con una riga sottolineata a matita] questa |
| 20270312-1600-i4y8 | 2027-03-12 16:00 | sì | no | no aspetta quella di ieri sulla casa in ordine non era jung era peterson |
| 20270320-2230-u5g2 | 2027-03-20 22:30 | sì | no | ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su qualcosa di rotto |

Letture rilevanti (v1 di "smista", v3 §4):
- 20261122-1720-h6r4: `nomina: un-estate-invincibile` ✦ (citazione, `autore: camus`, dopo il consolidamento `esito: verificata`,
  `riferimento: "Retour à Tipasa, in L'Été (Gallimard 1954), ultima riga; primaria"`); `serve-a: tatuaggi` ✦
  (`perche: "«questa me la tatuerei»"`); reazione `{parole: "questa me la tatuerei", verso: "+"}`.
- 20261205-1840-c7n5: `intento: [salva, chiedi]`; `nomina` della citazione (`autore: ~Ernest Hemingway`, `esito: verificata`,
  *Addio alle armi*, cap. 34); `converge-con` ✦ tra la citazione e `~kintsugi`, `perche: "«tipo kintsugi»"`.
- 20261207-0210-l4f1: `delicato: true` (non ripreso da lui).
- 20270308-2340-r2d6: `parla-di: dolore` ✦; `contraddice` ◌ verso `20261004-0000-u03` (consolidamento del 14 marzo).
- 20270320-2230-u5g2 (v1): `intento: [salva]`; `serve-a: tatuaggi` ✦ (`perche: "«secondo me è un tatuaggio»"`);
  `parole: [crepa, luce]`; `ritorna-su` ◌ verso 20261205-1840-c7n5 (`come: aggiunge`, `perche: "i «punti rotti» del 5 dicembre, il kintsugi"`).

#### 2. Restituzioni precedenti

##### 2a. Risposte all'ingresso (dal banco, `forma: risposta`)
- `r-20261122-1721-risposta` (per h6r4): "Bella, ed è sua, ma non è nella *Peste*: è *Ritorno a Tipasa*, nell'*Estate* (1954) ⚠."
- `r-20261205-1841-risposta` (per c7n5): "Hemingway, *Addio alle armi* (1929), cap. 34 ⚠. E sì, è il kintsugi in parole ✦."
- `r-20270320-2231-risposta` (per u5g2): "Segnato tra i tatuaggi. Da te viene già Hemingway col kintsugi ✦ (5 dic); fuori, Cohen, *Anthem* ○. Te le metto in fila?"
  (Nessuna sua risposta a questa domanda.)

##### 2b. Le quattro lettere precedenti (sintetiche; valgono queste)
Tutte `forma: lettera` (nel banco `settimana`), scritte da "consolida" alle 03:1x della domenica e consegnate alle 17:37.

`r-20270207-0316-lettera`
> Questa settimana, il 3 febbraio: *sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura* ✦.
> La discesa, qui, non porta a una caduta: il fondo è acqua ◌.
> ✦ tue · ◌ mie

`r-20270214-0315-lettera`
> Questa settimana una riga sola, il 9 febbraio: *boh niente volevo solo scrivere qualcosa* ✦.
> Anche il silenzio, scritto, è un dato ◌.
> ✦ tue · ◌ mie

`r-20270307-0317-lettera`
> Questa settimana, il 1 marzo: *oggi: finito karamazov, sentito la cura in radio, litigato con mio padre. giornata* ✦.
> Un libro lungo chiuso è una soglia passata; il peso della giornata sta tutto nell'ultima parola ◌.
> ✦ tue · ◌ mie

`r-20270314-0318-lettera` (la cosa: un confronto, sul `contraddice` dell'8 marzo; `copre` fino a 20270312-1600-i4y8)
> Questa settimana, l'8 marzo: *forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove* ✦.
> Entro il 4 ottobre, nell'archivio d'origine: *la dimensione principale della realtà è il dolore* ✦.
> Il dolore come una porta che si apre, la noia come una cicatrice che non fa più male ◌.
> Che cosa ti muove, quando niente fa male?
> ✦ tue · ◌ mie

Nessun sogno (spento), nessun ricordo, nessun ✧ usato come appoggio in queste lettere.

#### 3. Registro dei richiami
Vuoto: nessun "ti ricordi?" consegnato (nessun frammento è mai stato ricordabile).

#### 4. Estratto di `contesto/mappa.md` (come lo rigenera `contesto.mjs` alla fine di "consolida", 2027-03-21)

```yaml
aggiornato: 2027-03-21T03:27:02+01:00
fino-a: 20270320-2230-u5g2
```

**1. stato**
- giorni attivi totali: **20**
- frammenti parlanti totali (da novembre): **20**; della settimana 15–21 marzo: **1**; dall'ultima lettera (`r-20270314-0318-lettera`): **1**
- lettera: **no** (1 < 3), slitta: la prossima copre dal 15 marzo
- sogno: **spento** (20 < 50)
- ritratto: prossimo il 1 maggio (trimestrale)

Come: 23 frammenti B; non parlanti (v3 §3.3: intento solo `niente`, o meno di 3 parole sue tolti i link) = w2s8 (link nudo),
o3t4 (`intento: [niente]`), f9c3 ("questa": 1 parola) → 20 parlanti. Ogni parlante cade in un giorno diverso (3, 4, 9, 11, 16, 20,
22, 24, 26, 30 nov; 5, 7, 10, 12 dic; 9 gen; 3 feb; 1, 8, 12, 20 mar) → 20 giorni attivi. Importati esclusi (v3 §6.2).
Parlanti dopo il `copre` dell'ultima lettera (i22/i4y8, 12 marzo): solo u5g2.

**2. nodi (estratto)**
- `tatuaggi · raccolte · tatuaggi · ✦2 (da novembre: h6r4, u5g2) · importati 8 · 2026-11-22–2027-03-20`
- `camus · persone · Albert Camus · ✦…`; `un-estate-invincibile · citazioni · ✦1 · 2026-11-22`
- `dolore · temi`; `nichilismo · temi`; ecc.

**4. parole candidate**: crepa (20 mar, 1 giorno), luce (20 mar, 1 giorno), mare (16 nov, 3 feb: 2 giorni), padre (16 nov, 1 mar: 2 giorni).

**6. posizioni e tensioni**: 20270308-2340-r2d6 `contraddice` ◌ 20261004-0000-u03 (8 marzo; già usato da `r-20270314-0318-lettera`).

**9. nomi senza nodo**: `~kintsugi` (c7n5), `~Ernest Hemingway` (c7n5, r-20261205-1841-risposta), `~Leonard Cohen` (r-20270320-2231-risposta).

**10. ricordabili**: nessuno (serve un frammento ✦ oltre 60 giorni attivi: il più vecchio, k7q2, ne ha 19 dopo di sé).
Ricordi già usati: nessuno.

**11. seme già usato**: nessun nodo. **Immagini già usate** (v3 §9.4: parole di contenuto rare nate in una restituzione e
assenti dai ✦): discesa, silenzio, soglia, peso, porta, cicatrice. *fondo* non c'è: compare in un ✦ (n6b2, *in fondo c'era il mare*).
Come: parole delle quattro lettere fuori dai corsivi, meno quelle che compaiono in un frammento ✦ (u01–u31, B01–B23).

**12. voce**: ritornelli 0.

### Uscita

#### Uscita A (il v3 alla lettera)

##### Sul telefono
Nessuna notifica, nessuna lettera domenica 21 marzo.
Se apre la sessione della Routine "lettera" (17:37), il messaggio finale è:

> Lettera rimandata.

##### File
Nessuna restituzione. Log di "consolida" (messaggio finale, 2027-03-21 03:27):

> Settimana 15–21 marzo: 1 frammento parlante, nessun tema nato, nessuna citazione da verificare, nessuna lettura riscritta.
> Lettera: no, 1 frammento parlante dall'ultima lettera (soglia 3); slitta, la prossima copre dal 15 marzo.

Altri file scritti o cambiati:
- `contesto/*.md`: rigenerati; in `mappa.md` lo stato dice `lettera: no (1 < 3)`, `sogno: spento`, `ricordabili: nessuno`.
- `riserva/ritorno.md` (riscritto da "consolida"):
  > Il 20 marzo: *una linea d'oro su qualcosa di rotto* ✦. Tra i tatuaggi, da novembre, è la seconda frase tua dopo quella del 22 novembre ✦.
- `letture/2027/03/20270320-2230-u5g2.md`: invariata (v1).

---

#### Uscita B (l'Azione del banco: lettera forzata; forzato solo la soglia dei 3 parlanti, il resto v3 alla lettera)

##### Sul telefono
Notifica, domenica 21 marzo 17:37:

> La lettera è pronta

Messaggio finale della Routine "lettera" (identico al corpo del file):

> 1. Il 20 marzo, alle 22:30: *ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su qualcosa di rotto* ✦
>
> Nella raccolta dei tatuaggi, da novembre, è la seconda frase tua ✦; la prima parla d'inverno.
> 2. Mi pare che le due tengano la stessa cosa da due lati ◌: qui la luce arriva da fuori ed entra dove si è rotto; lì c'era già, dentro, e andava solo scoperta.
> 3. La riga è di Camus ○, l'ultima di *Ritorno a Tipasa*, nell'*Estate* (1954), non nella *Peste*. Il 22 novembre l'hai scritta così:
> 4. *camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei* ✦
>
> ✦ tue · ◌ mie · ○ mondo

##### File
`restituzioni/2027/03/r-20270321-0326-lettera.md`

```md
---
schema: 3
forma: lettera
letto-da: claude-opus-5-5
registrato: 2027-03-21T03:26:41+01:00
copre: [20270320-2230-u5g2]
voci:
  - {n: 1, rif: 20270320-2230-u5g2, voce: sua, cosa: idea}
  - {n: 2, rif: tatuaggi, voce: proposta, cosa: convergenza}
  - {n: 3, rif: un-estate-invincibile, voce: mondo, cosa: citazione}
  - {n: 4, rif: 20261122-1720-h6r4, voce: sua, cosa: idea}
legami:
  - {p: converge-con, tra: [20261122-1720-h6r4, 20270320-2230-u5g2], voce: proposta, perche: "la stessa cosa da due lati: «un'estate invincibile» trovata «in me» il 22 novembre, «la luce» che entra dalla «crepa» il 20 marzo"}
---
1. Il 20 marzo, alle 22:30: *ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su qualcosa di rotto* ✦

Nella raccolta dei tatuaggi, da novembre, è la seconda frase tua ✦; la prima parla d'inverno.
2. Mi pare che le due tengano la stessa cosa da due lati ◌: qui la luce arriva da fuori ed entra dove si è rotto; lì c'era già, dentro, e andava solo scoperta.
3. La riga è di Camus ○, l'ultima di *Ritorno a Tipasa*, nell'*Estate* (1954), non nella *Peste*. Il 22 novembre l'hai scritta così:
4. *camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei* ✦

✦ tue · ◌ mie · ○ mondo
```

Altri file scritti o cambiati:
- `contesto/mappa.md` (rigenerato a fine "consolida"): stato `lettera: sì (forzata)`; immagini già usate + *lati*; seme già usato: invariato (nessun ✧).
- `riserva/ritorno.md`: come nell'Uscita A.
- `letture/2027/03/20270320-2230-u5g2.md`: invariata (v1); il `converge-con` sta nella lettera.
- La Routine "lettera" (17:37) non scrive file: consegna e basta.

### Giudizio (giudice cieco)

Fonti lette: banco (X1-X6, R03, Giudice AI, B23/B07), R03-preparazione, R03-uscita, modello-v3 §9.2 e §16.2.
Nota: nel banco l'Azione dà per scritta la lettera; l'uscita offre due versioni.

#### Uscita A (v3 alla lettera: la lettera slitta)

##### Deterministici
| criterio | esito | prova |
|---|---|---|
| D1 file `r-20270321-HHMM-settimana.md` | FALLISCE | "Nessuna restituzione." Il file non esiste |
| D2 parole vietate | passa (vacuo) | nessun testo di lettera; in `ritorno.md` nessuna delle 7 parole |
| D3 prima riga | n/d (vacuo) | nessuna lettera |
| D4 B23 verbatim con 20 marzo | FALLISCE | c'è solo "*una linea d'oro su qualcosa di rotto* ✦" in `riserva/ritorno.md`, un frammento, non B23 |
| D5 Cohen/Rumi/Caravaggio | passa (vacuo) | non compaiono |
| D6 max 14 righe, 0 "?" | passa (vacuo) | "Lettera rimandata." |
| X1 | passa | la citazione parziale è verbatim e datata (20 marzo) |
| X2 | passa | ✦ presente, nessun fatto ○ |
| X3 | passa | nessun termine vietato |
| X4 | passa | nessun frammento delicato (B12 assente) |
| X5 | passa (vacuo) | nessuna restituzione; `riserva/` è divergenza dichiarata (§16.2) |
| X6 | passa | importati non contati; "da novembre" esatto |

##### Giudice AI (tre passate)
Non c'è una lettera da giudicare. Q1 no, no, no ("Lettera rimandata." non contiene immagini). Q2 no, no, no.
Q3 no, no, no. "Non so" vale esito contrario. Soglia (tutte) non raggiunta.

##### Esito A: **fallisce** (D1, D4; giudice Q1-Q3 non valutabili)
Divergenza: lo slittamento nasce dalla soglia di 3 parlanti (C3, §9.2), non dalla tabella §16.2, che per R03 non ha righe. Quindi
non è una "divergenza dichiarata" in senso stretto, ma è una scelta di modello nota: la prova R03 presuppone la lettera.
Per il banco: la prova non può passare senza forzare la soglia (come fa B).

#### Uscita B (lettera forzata)

##### Deterministici
| criterio | esito | prova |
|---|---|---|
| D1 file e forma | passa, con nota | `restituzioni/2027/03/r-20270321-0326-lettera.md`, `forma: lettera`. Il banco scrive `settimana`; la Preparazione dichiara "forma: lettera (nel banco settimana)" e il modello (§9.2, frontmatter) usa `lettera`. Alla lettera il nome diverge, ma non è dichiarato in §16.2: da correggere nel banco |
| D2 parole vietate fuori dalle citazioni | passa | grep di fond*/discesa/silenzi*/sogli*/pes*/port*/cicatri* sul corpo e sui voci/legami: nessuna occorrenza fuori dalle citazioni. Frase mia: "da fuori ed entra dove si è rotto", "da due lati" |
| D3 prima riga non "Questa settimana" | passa | "1. Il 20 marzo, alle 22:30: …" |
| D4 B23 verbatim con data | passa | "*ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su qualcosa di rotto*" identico al banco (riga 280), "Il 20 marzo" |
| D5 Cohen, versi, Rumi, Caravaggio | passa | Cohen non compare; Camus attribuito a Camus, non a lui |
| D6 max 14 righe, 0 "?" | passa | 6 righe di corpo non vuote (8 con le vuote); "?" = 0 |
| X1 | passa | la frase del 22 novembre è identica a B07 (banco riga 113), con la data; le citazioni nel `perche` («un'estate invincibile», «in me», «la luce», «crepa») stanno nei frammenti |
| X2 | passa | ogni riga ha voce (✦, ◌, ○, ✦); fatto ○ con opera e luogo: "*Ritorno a Tipasa*, nell'*Estate* (1954)", ultima riga. Fatto del mondo corretto: la frase ("Au milieu de l'hiver… un invincible été") è di *Retour à Tipasa*, in *L'Été* (1954), non della *Peste*. "ultima riga" è la Preparazione (primaria) e regge senza ⚠ |
| X3 | passa | nessuna lode, nessuna diagnosi |
| X4 | passa | B12 (la cura, nonna Lina) assente |
| X5 | passa | percorso `restituzioni/AAAA/MM/` giusto, voci n:1-4 con rif (id, slug `tatuaggi`, `un-estate-invincibile`), `legami` con `perche`, nessun frammento cambiato; `riserva/` è divergenza dichiarata (§16.2). Notare: registrato 03:26:41 contro log "03:27" nell'Uscita A, irrilevante |
| X6 | passa | importati non contati; la citazione ✦ è di novembre, non importata |

##### Giudice AI (tre passate indipendenti)
1. Almeno un'immagine non già sentita? Sì, sì, sì. "tengano la stessa cosa da due lati", "la luce arriva da fuori ed entra dove si è rotto; lì c'era già, dentro": "lati", "fuori/dentro" non sono nelle quattro lettere (fondo, discesa, silenzio, soglia, peso, porta, cicatrice). Crepa e luce sono sue.
2. Tolte le immagini, resta un contenuto? Sì, sì, sì. Restano il fatto (seconda frase nella raccolta tatuaggi), la correzione Camus (*Tipasa*, non *Peste*) e il collegamento 22 novembre-20 marzo.
3. Ritmo diverso (attacco, chiusa)? Sì, sì, sì (con una riserva nella seconda passata). Attacco "Il 20 marzo, alle 22:30" invece di "Questa settimana"; nessuna sentenza-immagine in chiusa, chiude sulla sua frase. Riserva: la legenda "✦ tue · ◌ mie" ricorre come nelle quattro, ma è un elemento di forma, non di ritmo.
Maggioranza: Q1 sì (3/3), Q2 sì (3/3), Q3 sì (3/3). Soglia "tutte": raggiunta.

##### Esito B: **passa**
Con una nota non bloccante: il banco dice `forma: settimana` e il nome file `-settimana.md`; a lettera fallirebbe D1, ma la Preparazione stessa fissa l'equivalenza con `lettera`. Da allineare il banco al modello.

#### A pancia
B: sul telefono piace: breve, parte dalla sua frase e gli dà una cosa sola (il seguito di quella dell'inverno). Stonano la numerazione 1-2-3-4 (sa di verbale, e il "3." finisce con i due punti e il "4." è la citazione) e "Mi pare… ◌" che spiega troppo il "lati".
A: nessuna delusione né piacere: "Lettera rimandata." è onesta ma non gli dà nulla; la prova non misura niente.

## R04 · "Ti ricordi?": una frase di novembre

### Preparazione

Punto zero (4–7 ottobre 2026) + B01–B18 + un frammento sintetico (`20261214-0905-syn1`). Nessun altro B esiste.
Fonti dei testi: `_progetto/v2/banco-di-prova-v2.md` §1 (B01–B18) e §3 R04; `_progetto/v2/simulazione/importazione.md` (punto zero).

#### 1. Frammenti

##### 1.1 Punto zero (`canale: importato`, solo data, fuori da conti, ricordabili e giorni attivi)

| id | registrato | voce | note |
|---|---|---|---|
| `20261004-0000-u01` … `20261004-0000-u31` (+ `u26a`) | 2026-10-04 | ✦ `sua` (alcune `forma: riportata`) | testi in importazione.md §1 ss.; nessuno nomina Jung |
| `20261005-0000-s01` | 2026-10-05 | ✧ `seme`, `intento: sguardo` | il nucleo |
| `20261004-0000-s03`, `20261004-0000-s04` | 2026-10-04 | ✧ `seme` | racconto d'origine; tensioni |

Restituzioni `eredita` del punto zero: invariate (importazione.md). Jung vi compare solo come `mondo: "Carl Gustav Jung"`
(voce 6 di `r-…-eredita-citazioni`, *Opere* 13 § 335): nessun nodo `jung` al punto zero.

##### 1.2 Da novembre (testo verbatim)

| id | registrato | voce | parlante | delicato | testo |
|---|---|---|---|---|---|
| `20261103-2340-k7q2` (B01) | 2026-11-03 23:40 | ✦ | sì | no | ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante |
| `20261104-0812-b3n8` (B02) | 2026-11-04 08:12 | ✦ | sì | no | ah e la frase dell'ospite era verso la fine, quando parlava dei greci |
| `20261109-1902-m4c1` (B03) | 2026-11-09 19:02 | ✦ | sì | no | jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato |
| `20261111-1945-t8w3` (B04) | 2026-11-11 19:45 | ✦ | sì | no | ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto |
| `20261116-2300-p2x9` (B05) | 2026-11-16 23:00 | ✦ | sì | no | galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto |
| `20261120-1244-d5j7` (B06) | 2026-11-20 12:44 | ✦ | sì | no | marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina |
| `20261122-1720-h6r4` (B07) | 2026-11-22 17:20 | ✦ | sì | no | camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei |
| `20261124-2350-z1v8` (B08) | 2026-11-24 23:50 | ✦ | sì | no | marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso |
| `20261126-0905-q9e2` (B09) | 2026-11-26 09:05 | ✦ | sì | no | frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente |
| `20261130-1900-a3k6` (B10) | 2026-11-30 19:00 | ✦ | sì | no | oggi mi sento come sisifo |
| `20261205-1840-c7n5` (B11) | 2026-12-05 18:40 | ✦ | sì | no | chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi |
| `20261207-0210-l4f1` (B12) | 2026-12-07 02:10 | ✦ | sì | **sì** | la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso |
| `20261209-1800-w2s8` (B13) | 2026-12-09 18:00 | ✦ | **no** (link nudo) | no | https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3 |
| `20261210-2300-g8u3` (B14) | 2026-12-10 23:00 | ✦ | sì | no | https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello |
| `20261212-2015-y5p7` (B15) | 2026-12-12 20:15 | ✦ | sì | no | https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo |
| `20261214-0905-syn1` (`sintetico: true`) | 2026-12-14 09:05 | ✦ | sì | no | l'ospite inquietante! |
| `20270109-1630-e1h9` (B16) | 2027-01-09 16:30 | ✦ | sì | no | eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa? |
| `20270203-0710-n6b2` (B17) | 2027-02-03 07:10 | ✦ | sì | no | sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura |
| `20270209-1300-o3t4` (B18) | 2027-02-09 13:00 | ✦ | **no** (`intento: [niente]`) | no | boh niente volevo solo scrivere qualcosa |

Letture: quelle descritte dal banco (§1, File) tradotte col dizionario v3 §16.1. Rilevanti qui:
- B03: `reazione: [{parole: "mi ha spaccato", verso: "+"}]`; `nomina` del nodo citazione `finche-non-rendi-conscio-l-inconscio`
  (✦), `autore: carl-gustav-jung` (nodo nato da B03); `parole: [inconscio, destino]`; non `altrui` (è la sua versione
  a memoria). Dopo il consolidamento del 15 nov: nodo citazione con `esito: simile`, `riferimento` "*Aion* (1951),
  CW 9/II § 126, secondaria". Nessun frammento successivo nomina Jung, la citazione, "inconscio" o "destino".
- B07: `serve-a: tatuaggi`, reazione "me la tatuerei" +; nessun ritorno.
- B12: `delicato: true`. B13: nessuna reazione, muto. B06: reazione "carina ma un po' da bacio perugina" (−).
- `20261214-0905-syn1`: `intento: [salva]`, `ritorna-su: {a: r-20261213-0321-lettera, n: 2, come: aggiunge, voce: sua, perche: "«l'ospite inquietante!»"}`.
- B18: `intento: [niente]`, `legami: []`, `risposta: ci-sono`.

#### 2. Restituzioni precedenti rilevanti

| id | che cosa | ricordo dentro |
|---|---|---|
| `r-20261108-0313-lettera` | lettera dell'8 nov (del banco: registro dei richiami) | voce `cosa: ricordo` su `20261005-0000-s01` (nucleo ✧) |
| `r-20261122-0314-lettera` | lettera (sintetica, dal calendario v3: 4 parlanti dall'8 nov) | nessuno |
| `r-20261129-0316-lettera` | lettera (sintetica: B07, B08, B09) | nessuno |
| `r-20261201-0907-ritratto` | ritratto mensile su novembre (10 parlanti) | — |
| `r-20261213-0321-lettera` | lettera (del banco: registro; 5 parlanti dal 29 nov, B12 escluso dal contenuto) | voce 2, `cosa: ricordo`, su `20261103-2340-k7q2` (B01); completato da lui il 14 dic (`syn1`) |
| `r-20270207-0319-lettera` | lettera (sintetica: `syn1`, B16, B17 = 3 parlanti dal 13 dic) | nessuno |

Le lettere sintetiche non contengono B03 né B07 e non usano il seme su nodi legati a Jung. Il ritratto del 1 gennaio e del 1
febbraio slittano (dicembre 5 parlanti, gennaio 1). Risposte d'ingresso come nel banco.

#### 3. Registro dei richiami (`mappa.md` §10, "ricordi già usati", calcolato dalle voci `cosa: ricordo`)

| frammento | usato | in | esito |
|---|---|---|---|
| `20261005-0000-s01` | 2026-11-08 | `r-20261108-0313-lettera` | — |
| `20261103-2340-k7q2` | 2026-12-13 | `r-20261213-0321-lettera` | ripreso da lui il 2026-12-14 (`20261214-0905-syn1`) |

#### 4. Estratto di `contesto/mappa.md` (rigenerato dopo `r-20270207-0319-lettera` e B18)

```yaml
aggiornato: 2027-02-09T13:04:10+01:00
fino-a: 20270209-1300-o3t4
```

**1. stato**
- giorni attivi totali (da novembre): **17**: 3, 4, 9, 11, 16, 20, 22, 24, 26, 30 nov; 5, 7, 10, 12, 14 dic; 9 gen; 3 feb.
  (9 dic e 9 feb non contano: B13 e B18 non sono parlanti.)
- frammenti da novembre: 19; parlanti **17**; non parlanti 2 (B13, B18).
- parlanti dall'ultima lettera (`r-20270207-0319-lettera`): **0** (solo B18, non parlante). Settimana 8–14 feb: 0 parlanti.
- lettera: **no** (< 3); "consolida" del 14 feb: **non gira** (settimana senza parlanti, v3 §7.4).
- sogno: **spento** (17 < 50). Ritratto: prossimo controllo 1 maggio.

**10. ricordabili** (✦, non importati, non delicati, mai ricordati, > 60 giorni attivi alle spalle): **nessuno**.

| candidato | giorni attivi dopo | delicato | già ricordato | ammesso |
|---|---|---|---|---|
| B01 `20261103-2340-k7q2` | 16 | no | sì (13 dic) | no |
| B03 `20261109-1902-m4c1` | 14 | no | no | no (14 < 60) |
| B06 `20261120-1244-d5j7` | 11 | no | no | no |
| B07 `20261122-1720-h6r4` | 10 | no | no | no (10 < 60) |
| B12 `20261207-0210-l4f1` | 5 | **sì** | no | no |
| B13 `20261209-1800-w2s8` | 4 | no | no | no (non parlante) |

Come: "giorni attivi dopo" = date distinte con almeno un frammento parlante non importato, strettamente successive alla
data del frammento, fino al 14 feb 2027 (elenco sopra).

**Ricordi già usati**: tabella §3. **Seme già usato**: `nichilismo` (8 nov).

**Conti utili per il richiamo**: frammenti dopo B03: 16; tra questi, che nominano Jung o la citazione, o contengono
"inconscio" o "destino": 0. Frammenti dopo B07 che nominano Camus o la raccolta `tatuaggi`: 0.

### Uscita

#### Uscita A (modello v3 alla lettera)

##### Sul telefono
Niente. Nessuna notifica, nessuna lettera.

(Nella sessione della Routine "lettera", domenica 14 febbraio 17:37, il messaggio finale è: `Lettera rimandata.`)

##### File
Nessun file scritto o cambiato. "Consolida" delle 03:13 non gira; "lettera" non trova una lettera da consegnare.

Log: `2027-02-14 03:13 consolida: saltato, 0 frammenti parlanti nella settimana · 17:37 lettera: rimandata, 0 parlanti dall'ultima lettera (r-20270207-0319-lettera); ricordabili: nessuno (massimo 16 giorni attivi alle spalle, soglia 60)`

---

#### Uscita B (forzati: la lettera c'è e il ricordo è ammesso sotto i 60 giorni attivi; il resto v3)

##### Sul telefono

Notifica:
> La lettera è pronta

Messaggio:
> Ti ricordi? Il 9 novembre 2026: *jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato* ✦.
> Da allora Jung non è più tornato: nessuno dei 16 memo dopo lo nomina.
>
> ✦ tue

##### File

`restituzioni/2027/02/r-20270214-0324-lettera.md`

```md
---
schema: 3
letto-da: <modello>
registrato: 2027-02-14T03:24:51+01:00
forma: lettera
voci:
  - {n: 1, rif: 20261109-1902-m4c1, voce: sua, cosa: ricordo}
legami: []
---
Ti ricordi? Il 9 novembre 2026: *jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato* ✦.
Da allora Jung non è più tornato: nessuno dei 16 memo dopo lo nomina.

✦ tue
```

Altri file:
- `contesto/mappa.md` (rigenerato da `contesto.mjs` a fine "consolida"): §10 ricordi già usati + `20261109-1902-m4c1 · 2027-02-14 · r-20270214-0324-lettera`; ricordabili: nessuno.
- `contesto/recenti.md`: + `r-20270214-0324-lettera` intera.
- `riserva/ritorno.md`: riscritto da "consolida" (contenuto fuori prova).
- Nessun frammento, lettura o restituzione precedente cambia.

##### Se arriva la sua risposta (D6)

Frammento `frammenti/2027/02/20270214-2210-syn2.md` (`sintetico: true`):
```md
---
registrato: 2027-02-14T22:10:03+01:00
canale: telefono
---
destino. mi spacca ancora
```

Lettura `letture/2027/02/20270214-2210-syn2.md`:
```yaml
---
schema: 3
versione: 1
letto-da: <modello>
prompt: <hash>
intento: [salva]
reazione:
  - {parole: "mi spacca ancora", verso: "+"}
legami:
  - {p: ritorna-su, a: 20261109-1902-m4c1, come: aggiunge, voce: sua, perche: "«destino. mi spacca ancora»"}
parole: [destino]
nota: "risponde alla voce 1 di r-20270214-0324-lettera"
risposta: salvato
---
```
Sul telefono: `Salvato.` Il frammento `20261109-1902-m4c1` e la sua lettura restano identici.

### Giudizio (giudice cieco)

Verifica testi: B03 nel banco (riga 70) = `jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato`; la preparazione e l'uscita B coincidono alla lettera. Conti: dopo B03 ci sono 16 frammenti (B04–B18 = 15, + syn1), nessuno nomina Jung/inconscio/destino: il "16" dell'uscita B è corretto.
Divergenza (modello-v3 §16.2, riga R02/R04): il v3 vuole "affermazione intera, solo ✦, oltre 60 giorni attivi", il banco "indizio con la fine nascosta".

#### Uscita A (v3 alla lettera: niente, lettera rimandata)

| criterio | esito | prova |
|---|---|---|
| D1 voce su B03/B07 | FALLISCE | "Nessun file scritto"; nessuna voce `rif` |
| D2 indizio ≤ metà parole | FALLISCE | nessun indizio |
| D3 | passa (vacuo) | non sceglie nulla |
| D4 | passa (vacuo) | nessuna frase |
| D5 un solo "ti ricordi?" + data | FALLISCE | zero "ti ricordi?" |
| D6 | non verificabile | nessuna lettura di partenza; B03 resta identico (nessuna scrittura) |
| X1–X6 | passano (vacuo) | nessun testo, nessun file, `git diff` vuoto |

Giudice AI: non c'è nulla da valutare; Q1 = no (nessun indizio), Q2 no, Q3 sì-quiz? no, Q4 no. Voti 3 su 3: Q1 no, soglia non raggiunta.
**Esito A: fallisce** (D1, D2, D5; Q1). **Divergenza dichiarata**: a 14 giorni attivi (< 60) il v3 non ricorda niente. Coerente col modello, non col banco.

#### Uscita B (lettera forzata, ricordo ammesso sotto 60 giorni)

| criterio | esito | prova |
|---|---|---|
| D1 | passa | voce `{n: 1, rif: 20261109-1902-m4c1, cosa: ricordo}` in `forma: lettera` (equivalente v3 di `settimana`) |
| D2 indizio ≤ metà parole, resto in `<details>` | FALLISCE | la frase è intera (~21 parole su 21), nessun `<details>`. Divergenza dichiarata (§16.2) |
| D3 | passa | B03: non B12, B13, B01, né importato |
| D4 | passa | "jung: finché non rendi conscio l'inconscio lui guiderà…" è la sua versione, non *Aion* |
| D5 | passa | un solo "Ti ricordi?"; "Il 9 novembre 2026" |
| D6 | passa | `ritorna-su` con `a: 20261109-1902-m4c1`; "Il frammento … e la sua lettura restano identici" |
| X1 | passa | verbatim con refusi-minuscole, data 9 nov |
| X2 | passa con riserva | riga 1 ✦; la riga "Da allora Jung non è più tornato…" non ha segno (conto dell'archivio): letteralmente senza voce, ma anche l'esempio del v3 §9.3 non ne mette. Nessun fatto ○ |
| X3 | passa | nessuna lode/diagnosi |
| X4 | passa | B03 non delicato |
| X5 | passa con riserva | nome e voci corretti, `legami: []`; ma scrive anche `riserva/ritorno.md`, fuori dall'elenco `restituzioni/ letture/ contesto/ .indice/` del criterio (verificare se il v3 lo ammette) |
| X6 | passa | B03 non importato; i 16 non includono importati |

Giudice AI (tre passate indipendenti, stessi voti):
1. Indizio che fa venire voglia di completare: **NO, NO, NO** ("…lo chiamerai destino. mi ha spaccato" è già intera: niente da completare). Obbligatoria.
2. Frammento davvero sentito: **SÌ, SÌ, SÌ** ("mi ha spaccato").
3. Sembra un quiz scolastico? **NO** x3 (è un'affermazione, nessuna attesa): esito richiesto, ok.
4. Perché di oggi in una riga, senza spiegare la frase: **SÌ** x3 ("Da allora Jung non è più tornato: nessuno dei 16 memo dopo lo nomina.").
Punteggio 3/4, ma Q1 obbligatoria fallita.

**Esito B: fallisce** (D2; giudice Q1 sotto soglia). **Divergenza dichiarata**: il fallimento dipende da §16.2 (affermazione intera al posto dell'indizio). Misurato sul v3, passerebbe (frase intera, data, una riga d'oggi, solo ✦, non delicato, non quiz).

#### A pancia
Sul telefono B è pulita e vera: la sua frase, la data, una riga secca. Stona il "Jung non è più tornato", un po' da rimprovero/contabile, e il "memo" e il "16", che sanno di conteggio; e senza indizio non c'è il piccolo gioco di completare la frase.

## R05 · Il sogno della settimana

### Preparazione

Archivio: punto zero (importazione dell'Atlante, 4–7 ottobre 2026) + B01–B16. Nessun altro frammento.
Modello: v3 (`_progetto/v2/modello-v3.md`). Ora locale Europe/Rome.

#### 1. Punto zero (solo ciò che conta qui)

Tutto `canale: importato`, fuori dai conti (v3 §6.2). Date come tetto.

| id | registrato | voce | delicato | testo (verbatim) |
|---|---|---|---|---|
| `20261005-0000-s01` | 2026-10-05 | ✧ seme, `intento: [sguardo]` | no | il nucleo intero (simulazione/importazione.md, righe 1252–1320). Passi usati qui: formula *"Attraversare il dolore a occhi aperti, e trovare dall'altra parte amore e verità."* (nucleo:11); Avvertenza (nucleo:39): *"Il tatuaggio deve rappresentare il viaggio e l'atto di affrontare, non lo stadio assurdista in sé. Così resterà vero anche se la mia filosofia evolve."* |
| `20261004-0000-u01` | 2026-10-04 | ✦ sua (`forma: riportata`) | no | *"battaglie interiori, solitudine, senso di vuoto, apatia, dolore, rabbia, risentimento. Percorso, avventura, musica, caos, libertà, gioia, vincere se stessi. Consapevolezza, pace interiore nel guardare alle battaglie interiori e alle versioni di me morte lungo il percorso, innalzarsi a una dimensione superiore. Assurdità dell'essenza stessa della vita, calma nell'esplorarne i concetti data dall'immensità del dolore superato."* |
| `20261004-0000-s03` | 2026-10-04 | ✧ seme, `intento: [niente]` | no | il racconto d'origine (non fa nascere nodi) |

Restituzioni `eredita` (◌, non sbiadiscono, fuori dai conti, v3 §14 R4):

| id | aggancio | testo che conta |
|---|---|---|
| `r-20261006-0000-eredita-lago-nel-cratere` (C20) | `{a: 20261004-0000-u01, passo: "calma … dolore superato"}`; `serve-a: tatuaggi` ◌ | "La calma ha la profondità del dolore che l'ha scavata: l'acqua più ferma sta dove c'è stata l'esplosione. Il dolore è inchiostro, la pace è pelle intatta." Voci: `~Averno` (Virgilio, *Eneide* VI, 126), `~Crater Lake`, `tao-te-ching` (cap. 15), `~Eraclito` (la malattia rende dolce la salute) |
| `r-20261004-0000-eredita-uno-e-tutto` (C12) | U7 | voce `~Eraclito`, fr. B10 |
| `r-20261006-0000-eredita-braccio-del-fratello` (C14) | U1 | voce `~Eraclito`, fr. B60 |
| `r-20261004-0000-eredita-sognatore-insonne` (C25) | U20 | voce `~Eraclito`, fr. B89 |
| `r-20261007-0000-eredita-citazioni` | — | voce 4: Eraclito, fr. 60 «La via in su e la via in giù sono una e la stessa.» ◌ |
| `r-20261007-0000-eredita-domande` | — | 8 voci; la n. 1 "Chi sono?" (l'io, l'ombra, le maschere), accolta da U30 → tema `chi-sono` ● |

La nave di Teseo, al punto zero, sta solo nell'Atlante (`concetti/nave-di-teseo.md`, testo di Claude: "Se tutte le parti
vengono sostituite, è ancora la stessa nave? Metafora per le versioni di me morte lungo il percorso."), che l'importazione
non porta (eredita.md §1: non è una frase sua né una convergenza in prosa). Al 10 gennaio il nodo `nave-di-teseo` esiste
perché nasce da B16 (v3 §3.4, A9).

Nodi del punto zero toccati qui: `raccolte/tatuaggi` (`nato-da: [20261004-0000-s03]`), `chi-sono` (tema ●, R13), `camus`,
`dolore`, `battaglie-interiori`, `nichilismo`. **Non** esistono al punto zero: `eraclito`, `nave-di-teseo`, `sisifo`, `nietzsche`.

#### 2. Frammenti B01–B16

Tutti `canale: telefono`, voce ✦. Testi dal banco, sezione 1.

| B | id | registrato | parlante | delicato | testo |
|---|---|---|---|---|---|
| B01 | `20261103-2340-k7q2` | 2026-11-03 23:40 | sì | no | ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante |
| B02 | `20261104-0812-b3n8` | 2026-11-04 08:12 | sì | no | ah e la frase dell'ospite era verso la fine, quando parlava dei greci |
| B03 | `20261109-1902-m4c1` | 2026-11-09 19:02 | sì | no | jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato |
| B04 | `20261111-1945-t8w3` | 2026-11-11 19:45 | sì | no | ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto |
| B05 | `20261116-2300-p2x9` | 2026-11-16 23:00 | sì | no | galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto |
| B06 | `20261120-1244-d5j7` | 2026-11-20 12:44 | sì | no | marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina |
| B07 | `20261122-1720-h6r4` | 2026-11-22 17:20 | sì | no | camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei |
| B08 | `20261124-2350-z1v8` | 2026-11-24 23:50 | sì | no | marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso |
| B09 | `20261126-0905-q9e2` | 2026-11-26 09:05 | sì | no | frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente |
| B10 | `20261130-1900-a3k6` | 2026-11-30 19:00 | sì | no | oggi mi sento come sisifo |
| B11 | `20261205-1840-c7n5` | 2026-12-05 18:40 | sì | no | chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi |
| B12 | `20261207-0210-l4f1` | 2026-12-07 02:10 | sì | **sì** | la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso |
| B13 | `20261209-1800-w2s8` | 2026-12-09 18:00 | **no** (link nudo) | no | https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3 |
| B14 | `20261210-2300-g8u3` | 2026-12-10 23:00 | sì | no | https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello |
| B15 | `20261212-2015-y5p7` | 2026-12-12 20:15 | sì | no | https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo |
| B16 | `20270109-1630-e1h9` | 2027-01-09 16:30 | sì | no | eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa? |

Lettura v1 di B16 (`letture/2027/01/20270109-1630-e1h9.md`, "smista" del 9 gennaio):

```yaml
schema: 3
versione: 1
intento: [salva]
legami:
  - {p: converge-con, tra: [eraclito, nave-di-teseo], voce: sua, perche: "«sono la stessa domanda»"}
  - {p: parla-di, a: chi-sono, voce: proposta, perche: "«io sono la stessa persona di 5 anni fa?»"}
risposta: r-20270109-1631-ritorno
```

Nodi nati il 9 gennaio: `persone/eraclito.md` (`cerchia: mondo`, `nato-da: [20270109-1630-e1h9]`), `temi/nave-di-teseo.md`
(`nato-da: [20270109-1630-e1h9]`). B07 ha `serve-a: tatuaggi` ✦ (lettura v1).

#### 3. Restituzioni precedenti (dopo il punto zero)

Risposte all'ingresso: quelle del banco per B01–B15 (sezione 1, campo **Risposta**), come `forma: risposta` dove hanno
contenuto. B16 arriva dopo 27 giorni di silenzio (dal 12 dicembre): per v3 §7.2 la sua risposta è un `ritorno`.

| id | forma | che cosa (sintetico, per i conti) |
|---|---|---|
| `r-20261101-0915-ritratto` | ritratto | il primo ritratto (giorno 1, v3 §7.5): sul nucleo e sulle 31 frasi, una convergenza ◌ ancorata a U8; seme ✧ usato sul nodo `dolore` (formula, nucleo:11) |
| `r-20261115-0331-lettera` | lettera | copre B01–B04; cosa: convergenza ◌ su B03 (Jung, *Aion* §126 ○); nessun seme |
| `r-20261129-0329-lettera` | lettera | copre B05–B09; cosa: convergenza ◌ tra B08 *sono sempre in guerra con me stesso* ✦ e U8 *vincere se stessi* ✦; nessun seme |
| `r-20261201-0907-ritratto` | ritratto | novembre, 10 parlanti; una domanda; nessun sogno, nessun ricordo |
| `r-20261213-0334-lettera` | lettera | copre B10–B15 (B12 escluso dal contenuto, delicato; B13 non parlante); cosa: convergenza ◌ su B11 *tipo kintsugi* ✦ con U8 ✦; nessun seme |
| `r-20270109-1631-ritorno` | ritorno | testo di `riserva/ritorno.md` (scritto da "consolida" il 13 dicembre): "Mentre eri via, è rimasta agganciata una frase di dicembre: *tipo kintsugi* ✦ (5 dicembre)." + una riga sul memo: "Salvato: Eraclito e la nave di Teseo, legati da te ✦." |

Ritratto del 1° gennaio: slittato (dicembre: 4 frammenti parlanti < 10).
Nessuna restituzione con voce `cosa: sogno` in tutto l'archivio; nessuna voce `cosa: ricordo`.

#### 4. Registro dei richiami

- Sogni: nessuno (mai acceso).
- Ricordi ("ti ricordi?"): nessuno usato; nessun ricordabile.
- Seme già usato (appoggio ✧ di una restituzione): `dolore` (ritratto del 1° novembre). Avvertenza (nucleo:39) mai usata.
- Immagini già usate (parole rare nate in una restituzione, assenti dai ✦): dalle eredita del lago, *inchiostro*, *pelle
  intatta*, *cratere*; dalle lettere sintetiche nessuna che serva qui.
- Rifiuti: nessuno.

#### 5. Estratto di `contesto/mappa.md` (rigenerato da "consolida" il 10 gennaio, `fino-a: 20270109-1630-e1h9`)

```text
## stato
giorni attivi totali: 15
frammenti parlanti totali: 15 (settimana 4–10 gennaio: 1)
lettera: no — parlanti dall'ultima lettera (r-20261213-0334-lettera): 1 < 3 → slitta
sogno: spento — 15 < 50
ritratto: prossimo 1 febbraio (gennaio finora: 1)
## nodi (estratto)
eraclito · persona · Eraclito · ✦1 ◌0 ●0 · 2027-01-09
nave-di-teseo · tema · nave di Teseo · ✦1 ◌0 ●0 · 2027-01-09
chi-sono · tema · Chi sono? · ✦0 ◌1 ●1 · (punto zero)–2027-01-09
tatuaggi · raccolta · tatuaggi · ✦1 · 2026-11-22
## posizioni e tensioni
nessun contraddice
## nomi senza nodo → nodo (calcolo)
~Eraclito → eraclito: r-20261004-0000-eredita-uno-e-tutto, r-20261006-0000-eredita-braccio-del-fratello,
  r-20261004-0000-eredita-sognatore-insonne, r-20261006-0000-eredita-lago-nel-cratere, r-20261007-0000-eredita-citazioni
## ricordabili
nessuno (nessun ✦ oltre 60 giorni attivi: il massimo è 15); ricordi usati: nessuno
## seme già usato
dolore (r-20261101-0915-ritratto)
## immagini già usate
inchiostro, pelle intatta, cratere (r-20261006-0000-eredita-lago-nel-cratere)
```

Come sono calcolati (script in `/tmp/r05calc/c.py`, regole v3 §3.3, §6.2, §7.4, §9.2):
- parlante = intento non solo `niente` e ≥ 3 parole sue tolti i link: tutti i B01–B16 tranne B13 → 15;
- giorni attivi = giorni con almeno un parlante non importato: 15 giorni distinti;
- lettera: "consolida" la domenica alle 03:13 gira se la settimana ha un frammento; scrive la lettera se i parlanti
  dall'ultima lettera sono ≥ 3. Domeniche: 1/11 non gira; 8/11 B01–B02 = 2, slitta; 15/11 B01–B04 = 4, lettera; 22/11 B05–B06
  = 2, slitta; 29/11 B05–B09 = 5, lettera; 6/12 B10–B11 = 2, slitta; 13/12 B10, B11, B12, B14, B15 = 5, lettera; 20/12, 27/12,
  3/1 non gira; **10/1 B16 = 1, slitta**;
- ritratto: novembre 10 parlanti (sì, 1 dicembre), dicembre 4 (slitta il 1 gennaio);
- ricordabili: ✦ oltre 60 giorni attivi: nessuno, i giorni attivi sono 15.

### Uscita

#### Uscita A (il v3 alla lettera)

##### Sul telefono

Nessuna notifica. Nessuna lettera domenica 10 gennaio 2027.

Messaggio finale della Routine "lettera" (17:37, visibile solo aprendo la sessione):

> Lettera rimandata.

##### File

Nessun file in `restituzioni/`.

Log di "consolida" (03:13), messaggio finale:

> Settimana 4–10 gennaio: 1 frammento parlante, nessun tema nato, nessuna citazione da verificare. Lettera: no, 1 parlante dall'ultima lettera (soglia 3), slitta. Sogno spento: 15 parlanti su 50.

##### Altri file

- `riserva/ritorno.md`: riscritto da "consolida".
- `contesto/mappa.md`: rigenerato (stato come nella Preparazione §5; "lettera: no, slitta"; "sogno: spento, 15 < 50").
- Letture: nessuna versione nuova.

---

#### Uscita B (forzati due punti: la soglia della lettera, 1 < 3, e il sogno spento, 15 < 50; il resto v3 alla lettera)

##### Sul telefono

Notifica, domenica 10 gennaio 2027, 17:37:

> La lettera è pronta

Il testo nell'app (messaggio finale della Routine "lettera"):

> Gioco ◌: il sogno del mese.
> 1. Il 9 gennaio: *eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa?* ✦ Il legame Eraclito–Teseo è tuo.
> 2. Il 22 novembre, di una frase di Camus: *questa me la tatuerei* ✦.
> 3. Nei topi, il pigmento del tatuaggio lo tengono i macrofagi del derma: quando muoiono lo rilasciano, e i macrofagi nuovi lo riprendono ○ (Baranska et al., *J. Exp. Med.* 215, 2018).
> 4. Così il tatuaggio, l'asse che non si cambia, è anche lui una nave di Teseo ◌. Le unisce una cosa: la forma resta mentre passa ciò che la regge.
> 5. Nel nucleo, entro il 5 ottobre: *Così resterà vero anche se la mia filosofia evolve.* ✧
>
> ✦ tue · ✧ seme · ◌ mie · ○ mondo

##### File

`restituzioni/2027/01/r-20270110-0331-lettera.md`

```md
---
schema: 3
letto-da: <modello>
registrato: 2027-01-10T03:31:00+01:00
forma: lettera
copre: [20270109-1630-e1h9]
aggancio: {a: 20270109-1630-e1h9}
voci:
  - {n: 1, rif: 20270109-1630-e1h9, voce: sua, cosa: idea}
  - {n: 2, rif: 20261122-1720-h6r4, voce: sua, cosa: idea}
  - {n: 3, rif: "~Baranska et al. 2018, J. Exp. Med. 215(4):1115-1133", voce: mondo, cosa: idea}
  - {n: 4, rif: nave-di-teseo, voce: proposta, cosa: sogno}
  - {n: 5, rif: 20261005-0000-s01, voce: seme, cosa: idea, passo: "nucleo:39"}
legami:
  - {p: converge-con, tra: [nave-di-teseo, tatuaggi], voce: proposta, perche: "Le unisce una cosa: la forma resta mentre passa ciò che la regge."}
---
Gioco ◌: il sogno del mese.
1. Il 9 gennaio: *eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa?* ✦ Il legame Eraclito–Teseo è tuo.
2. Il 22 novembre, di una frase di Camus: *questa me la tatuerei* ✦.
3. Nei topi, il pigmento del tatuaggio lo tengono i macrofagi del derma: quando muoiono lo rilasciano, e i macrofagi nuovi lo riprendono ○ (Baranska et al., *J. Exp. Med.* 215, 2018).
4. Così il tatuaggio, l'asse che non si cambia, è anche lui una nave di Teseo ◌. Le unisce una cosa: la forma resta mentre passa ciò che la regge.
5. Nel nucleo, entro il 5 ottobre: *Così resterà vero anche se la mia filosofia evolve.* ✧

✦ tue · ✧ seme · ◌ mie · ○ mondo
```

##### Altri file

- `riserva/ritorno.md`: riscritto da "consolida".
- `contesto/mappa.md`: rigenerato; "seme già usato" + `tatuaggi` (s01, nucleo:39); "immagini già usate" + *macrofagi*, *pigmento*;
  sogno: ultimo 2027-01-10 (il prossimo non prima di un mese); parlanti dall'ultima lettera: 0.
- Letture: nessuna versione nuova (il legame proposto sta nella lettera, non in una lettura).
- Nessun nodo nuovo (Baranska resta `~Nome`).

### Giudizio (giudice cieco)

Giudice cieco. Letti: banco (R05, X1–X6, giudice AI), preparazione, uscita, modello-v3 §9.3 e §16.2 (riga R05: "sogno spento sotto 50 frammenti parlanti", divergenza dichiarata C5).

#### Uscita A (v3 alla lettera): nessuna lettera, nessun sogno

##### Deterministici
- D1 fallisce: nessun file `r-20270110-HHMM-*.md`; nessuna parola "sogno"/"gioco" (l'uscita è "Lettera rimandata").
- D2 fallisce: nessun legame in `legami` (non c'è file).
- D3, D4, D5: non verificabili (nessun testo); D5 formalmente rispettato (nessuna risposta).
- X1-X6: passano a vuoto (nessuna citazione, nessun file, git diff limitato a `riserva/` e `contesto/`).
- Coerenza interna: 1 parlante < 3 e 15 < 50, come la preparazione §5. Corretto per il v3.

##### Giudice AI
Non applicabile (nessun sogno da giudicare). Conta come esito contrario.

##### Esito A: fallisce (D1, D2), **divergenza dichiarata** (§16.2: "R05: un sogno il 10 gennaio con 16 frammenti" diventa "sogno spento sotto 50", C5). Gravità bassa: il sogno è facoltativo.

#### Uscita B (forzati lettera e sogno)

##### Deterministici
- D1 passa: `restituzioni/2027/01/r-20270110-0331-lettera.md`; prima riga "Gioco ◌: il sogno del mese." Nota: la forma è `lettera`, non `settimana` (divergenza dichiarata §16.2: settimana diventa lettera).
- D2 passa: corpo = 8 righe contando la riga vuota (7 non vuote: titolo, 5 voci, legenda). Un solo elemento in `legami` (`converge-con` tra `[nave-di-teseo, tatuaggi]`, voce `proposta` = ◌) con `perche`.
- D3 passa: "Il legame Eraclito–Teseo è tuo", voce 1 `sua`, segnata ✦.
- D4 passa: B16 verbatim ("eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa?") con "Il 9 gennaio". Il fatto ○ ha fonte: Baranska et al., J. Exp. Med. 215, 2018. Verificato con WebSearch: J Exp Med 215(4):1115-1133, 2018; i macrofagi dermici trattengono il pigmento, ciclo di captazione, rilascio e ricaptazione, nel topo. Il fatto è esatto, e "nei topi" è dichiarato. Manca "(da verificare)", ma non serve perché c'è la fonte.
- D5 passa: nessuna frase risponde sì/no a "sono la stessa persona?". Rischio: v. domanda 3.
- X1 passa: B16 e B07 ("questa me la tatuerei", 22 novembre) coincidono con la preparazione/banco; ✧ "Così resterà vero anche se la mia filosofia evolve." coincide con importazione.md:1290. "entro il 5 ottobre" cade nel punto zero (4–7 ottobre) e il frammento s01 è del 2026-10-05 (X6 ok).
- X2 passa: ogni riga ha la sua voce (◌ ✦ ✦ ○ ◌ ✧); il ○ ha rivista, volume e anno; nessun testo di canzone. Camus senza opera (B07 è "con l'opera sbagliata" nel banco: evitato).
- X3 passa: nessuna lode, nessuna diagnosi o consiglio (grep sui termini: nessuna occorrenza).
- X4 passa: B12 non compare.
- X5 passa: nome e forma giusti, `voci` numerate con rif, un `legami` con `perche`. Scrive anche `riserva/ritorno.md` e `contesto/mappa.md`: ammessi dal modello (§7.6, §861).
- X6 passa: il nucleo citato porta "entro il 5 ottobre"; nessun conteggio "da novembre" con importati.

##### Giudice AI (tre passate: voti)
1. Legame da un altro campo, non sinonimo? **sì, sì, sì**. Immunologia (macrofagi del derma che passano il pigmento) contro la nave di Teseo; la voce 3 non è un sinonimo. Riserva: il capo d'arrivo, `tatuaggi`, è già suo, quindi la distanza sta tutta nel fatto biologico. Maggioranza: sì.
2. Gioco senza lezione? **sì, sì, no**. Aperto con "Gioco ◌", motivo in una riga ("Le unisce una cosa: la forma resta mentre passa ciò che la regge"). La passata "no" osserva che 5 voci, di cui 2 (Camus, Avvertenza) di contorno, fanno quasi un fascicolo, e che "è anche lui una nave di Teseo" ha tono didascalico. Maggioranza: sì.
3. Risponde lui alla domanda sull'identità? (deve essere no) **no, no, sì-implicito**. Nessuna frase risponde; ma "la forma resta mentre passa ciò che la regge", abbinata all'Avvertenza ✧, spinge verso un "sì, resti te stesso" (è la risposta classica a Teseo). Maggioranza: no, quindi richiesto raggiunto, ma è il punto più fragile.
4. Gli verrebbe voglia di raccontarlo? **sì, sì, sì**. Il fatto "il tatuaggio resta perché le cellule che lo tengono passano il pigmento alle nuove" è esattamente una nave di Teseo nella pelle.
Soglia: 4 su 4 (almeno 3, con la 3 obbligatoria). Raggiunta.

##### Esito B: **passa**. Nessun criterio fallito. Attenzioni: la voce 4 e la 5 spingono verso la risposta all'identità; le voci 2 e 5 allungano oltre il legame solo.

#### A pancia
Sul telefono la B piace: il colpo "il tuo tatuaggio è già una nave di Teseo" è tellable, breve, e gli restituisce una sua frase di B16. Stona il contorno (Camus e Avvertenza ✧ in coda: pare una prova a sostegno) e il "l'asse che non si cambia", parola mai sua.

## R06 · Il confronto: il dolore o la noia

### Preparazione

Stato al momento in cui la Routine "consolida" di **domenica 2027-03-14, 03:13 (Europe/Rome)** arriva al passo 6 (la
lettera, modello v3 §7.4). Archivio = punto zero (importazione dell'Atlante, 4–7 ottobre 2026) + B01–B22. B23–B25 non
esistono. Nessun frammento sintetico.

#### 1. Frammenti del punto zero usati (`canale: importato`, testo verbatim da `simulazione/importazione.md`)

| id | registrato | voce | delicato | testo (verbatim) |
|---|---|---|---|---|
| `20261004-0000-u03` | 2026-10-04 (solo data: tetto) | ✦ `sua` | no | la dimensione principale della realtà è il dolore. Ma cosa c'è oltre? **Amore e verità.** |
| `20261004-0000-u11` | 2026-10-04 (tetto) | ✦ `sua` | no | **Persone che hanno segnato la mia visione:** Jordan Peterson, Marco Aurelio, Albert Camus. |
| `20261004-0000-u19` | 2026-10-04 (tetto) | ✦ `sua` (trascrizione: ✦ il gesto, ○ le parole) | no (non marcato; finisce su estinzione) | il monologo di Rust, in inglese ("I think human consciousness is a tragic misstep in human evolution. […]") |
| `20261005-0000-s01` | 2026-10-05 (tetto) | ✧ `seme`, `intento: sguardo` | no | il nucleo. Passi rilevanti, verbatim: "In uno stadio assurdista, alla [Camus](/fonti/pensiero/camus.md). Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo." · "La dimensione principale della realtà è il [dolore](/emozioni/dolore.md). Ma cosa c'è oltre? **[Amore](/concetti/amore.md) e [verità](/concetti/verita.md).**" (copia di U3: non genera legami, v3 §4 e A3) · "1. **Il peso:** il dolore come dimensione fondamentale della realtà." |

Letture del punto zero rilevanti: U3 → `parla-di: dolore` ✦ («la dimensione principale della realtà è il dolore»);
U11 → `nomina: camus` ✦ («Albert Camus»), reazione "hanno segnato la mia visione" (+); s01 → `nomina: camus` ✧
(«In uno stadio assurdista, alla Camus»), `parla-di: dolore` ✧.

Nodi esistenti rilevanti: `persone/camus.md` (`nato-da: [20261004-0000-u11, 20261005-0000-s01]`), `persone/rust-cohle.md`,
`temi/dolore`, `temi/nichilismo`. **Non esistono**: nodo Schopenhauer, nodo *Il mito di Sisifo*, nodo *Il mondo come
volontà e rappresentazione* (B24 non c'è ancora). Schopenhauer compare solo come voce `mondo:` per nome nella
restituzione eredità `r-20261007-0000-eredita-citazioni` (voce 11: «La vita oscilla, come un pendolo, di qua e di là,
tra il dolore e la noia.», *Il mondo…* § 57, ◌, non verificata).

#### 2. Frammenti da novembre (B01–B22), `canale: telefono`, tutti ✦

Parlante = v3 §3.3 (intento non solo `niente` e, tolti i link, ≥ 3 parole sue). Delicato = v3 §4.1 / X4.

| B | id | data e ora | voce | delicato | parlante | testo (verbatim) |
|---|---|---|---|---|---|---|
| B01 | `20261103-2340-k7q2` | 2026-11-03 23:40 | ✦ | no | sì | ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante |
| B02 | `20261104-0812-b3n8` | 2026-11-04 08:12 | ✦ | no | sì | ah e la frase dell'ospite era verso la fine, quando parlava dei greci |
| B03 | `20261109-1902-m4c1` | 2026-11-09 19:02 | ✦ | no | sì | jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato |
| B04 | `20261111-1945-t8w3` | 2026-11-11 19:45 | ✦ | no | sì | ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto |
| B05 | `20261116-2300-p2x9` | 2026-11-16 23:00 | ✦ | no | sì | galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto |
| B06 | `20261120-1244-d5j7` | 2026-11-20 12:44 | ✦ | no | sì | marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina |
| B07 | `20261122-1720-h6r4` | 2026-11-22 17:20 | ✦ | no | sì | camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei |
| B08 | `20261124-2350-z1v8` | 2026-11-24 23:50 | ✦ | no | sì | marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso |
| B09 | `20261126-0905-q9e2` | 2026-11-26 09:05 | ✦ | no | sì | frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente |
| B10 | `20261130-1900-a3k6` | 2026-11-30 19:00 | ✦ | no | sì | oggi mi sento come sisifo |
| B11 | `20261205-1840-c7n5` | 2026-12-05 18:40 | ✦ | no | sì | chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi |
| B12 | `20261207-0210-l4f1` | 2026-12-07 02:10 | ✦ | sì | sì | la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso |
| B13 | `20261209-1800-w2s8` | 2026-12-09 18:00 | ✦ | no | no | https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3 |
| B14 | `20261210-2300-g8u3` | 2026-12-10 23:00 | ✦ | no | sì | https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello |
| B15 | `20261212-2015-y5p7` | 2026-12-12 20:15 | ✦ | no | sì | https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo |
| B16 | `20270109-1630-e1h9` | 2027-01-09 16:30 | ✦ | no | sì | eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa? |
| B17 | `20270203-0710-n6b2` | 2027-02-03 07:10 | ✦ | no | sì | sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura |
| B18 | `20270209-1300-o3t4` | 2027-02-09 13:00 | ✦ | no | no | boh niente volevo solo scrivere qualcosa |
| B19 | `20270301-2200-v7m1` | 2027-03-01 22:00 | ✦ | no | sì | oggi: finito karamazov, sentito la cura in radio, litigato con mio padre. giornata |
| B20 | `20270308-2340-r2d6` | 2027-03-08 23:40 | ✦ | no | sì | forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove |
| B21 | `20270310-1820-f9c3` | 2027-03-10 18:20 | ✦ | no | no | [foto di una pagina con una riga sottolineata a matita] questa |
| B22 | `20270312-1600-i4y8` | 2027-03-12 16:00 | ✦ | no | sì | no aspetta quella di ieri sulla casa in ordine non era jung era peterson |

Letture che contano per la prova:
- `letture/2027/03/20270308-2340-r2d6.md`, **v1** (smista, 8 marzo): `parla-di: dolore` ✦ («il dolore almeno ti muove»),
  `parole: [noia]`, `intento: [salva]`.
- **v2** (consolida, 14 marzo, fase 1, passo 4 di v3 §7.4, prima del passo 6): aggiunge
  `{p: contraddice, a: 20261004-0000-u03, voce: proposta, perche: "«forse il dolore non è la dimensione principale della vita. forse è la noia» contro «la dimensione principale della realtà è il dolore» (entro il 4 ottobre)"}`.
  Il nucleo `s01`, U3 e le loro letture non cambiano.
- B21: allegato `.webp`, testo "questa", citazione da OCR senza autore (`prova` assente = ⚠). B22: nessun bersaglio negli
  ultimi 3 giorni (versione "come nel banco"): nessun atto.

#### 3. Restituzioni precedenti

Risposte del banco (testo della colonna **Risposta**, una per memo con contenuto). Quella che conta, verbatim:
- `r-20270308-2346-risposta` (`per: 20270308-2340-r2d6`): "Segnato. Il 4 ottobre ✦ scrivevi che il dolore è la dimensione principale: è un cambio, o un'altra faccia?" (nessuna replica).
- `r-20270310-1826-risposta` (B21): "Letto: '[la riga]'. Da che libro?" · `r-20270312-1606-risposta` (B22): "Non trovo la frase di ieri sulla casa in ordine: me la riscrivi?"

Lettere (sintetiche: calcolate con la soglia v3 di ≥ 3 frammenti parlanti dall'ultima lettera; si riporta ciò che
entra in `mappa.md`):

| id | copre (parlanti) | la cosa | seme ✧ usato | immagini già usate |
|---|---|---|---|---|
| `r-20261115-0329-lettera` | B01–B04 (4) | convergenza ◌ "ospite" B01 ↔ monologo di Rust U19 | `nichilismo` (s01, «Non nichilismo…») | "porta", "chi apre la porta" |
| `r-20261129-0327-lettera` | B05–B09 (5) | convergenza ◌ B08 *sempre in guerra con me stesso* ↔ U1 *le battaglie interiori* ✦ | — | "fronte" |
| `r-20261213-0334-lettera` | B10, B11, B12, B14, B15 (5; B12 escluso dal testo) | la sua convergenza ✦ B11 (kintsugi) | — | — |
| `r-20270307-0330-lettera` | B16, B17, B19 (3) | ponte ◌ B16 (*io sono la stessa persona di 5 anni fa?*) ↔ tema "Chi sono?" | — | "riva" |

Nessuna lettera ha usato un confronto, Camus, il dolore o la noia. Slittate (< 3): 8 nov (2), 22 nov (2), 6 dic (2),
10 gen (1), 7 feb (2). Il 14 feb "consolida" non gira (settimana senza parlanti: solo B18).

Altre: ritratto `r-20261201-0907-ritratto` (novembre: 10 parlanti ≥ 10); 1 gennaio e 1 febbraio slittati (4 e 1);
prossimo trimestrale 1 maggio. Ritorni (primo memo dopo ≥ 14 giorni): B16 (28 giorni), B17 (25), B19 (20 da B18).

#### 4. Registro dei richiami

- Ricordi ("ti ricordi?") usati: nessuno. Ricordabili: nessuno (vedi §5).
- Rifiuti: nessuno. Accoglienze (`ritorna-su … accoglie`): nessuna.
- `contraddice` registrati: uno solo, quello del §2 (8 marzo → U3).

#### 5. Estratto di `contesto/mappa.md` (come lo calcola `contesto.mjs` dopo il passo 4)

```yaml
aggiornato: 2027-03-14T03:2x+01:00
fino-a: 20270312-1600-i4y8
```
1. **stato**
   - giorni attivi totali: **19** (giorni con ≥ 1 parlante non importato: 3, 4, 9, 11, 16, 20, 22, 24, 26, 30 nov;
     5, 7, 10, 12 dic; 9 gen; 3 feb; 1, 8, 12 mar. Non contano 9 dic (B13 link nudo), 9 feb (B18 `niente`), 10 mar (B21 "questa": 1 parola))
   - frammenti parlanti totali: **19** su 22 (non parlanti: B13, B18, B21)
   - settimana 7–13 marzo: 3 frammenti (B20, B21, B22), **2 parlanti** (B20, B22)
   - dall'ultima lettera (`r-20270307-0330-lettera`, che copre fino al 6 marzo): **2 parlanti** → lettera: **no** (soglia 3)
   - sogno: **spento** (19 < 50) · ritratto: prossimo 1 maggio
6. **posizioni e tensioni**: `20270308-2340-r2d6` (8 mar, ✦) `contraddice` ◌ `20261004-0000-u03` (entro il 4 ott, ✦ importato);
   fresco (6 giorni)
10. **ricordabili**: nessuno (il frammento più vecchio da novembre ha 19 giorni attivi < 60) · ricordi usati: nessuno
11. **seme già usato**: `nichilismo` (15 nov) · **immagini già usate**: porta, chi apre la porta, fronte, riva

Voci che lui stima, dai dati: Camus (✦ U11 "Persone che hanno segnato la mia visione"; ✧ s01 "alla Camus"); Rust (✦ U19, trascrizione).

### Uscita

#### Uscita A (v3 alla lettera)

##### Sul telefono

Niente: nessuna notifica, nessuna lettera. Alle 17:37 la Routine "lettera" chiude con il messaggio finale, che lui vede
solo se apre la sessione:

> Lettera rimandata.

##### File

Nessuna restituzione. Log del passo 6 di "consolida" (messaggio finale, riga sulla lettera):
`lettera: no, 2 frammenti parlanti dall'ultima lettera (soglia 3, mappa.md §stato); slitta, la prossima copre dal 7 marzo.`

Altri file scritti da "consolida" (14 marzo, 03:13):
- `letture/2027/03/20270308-2340-r2d6.md` → `versione: 2`, con in più
  `{p: contraddice, a: 20261004-0000-u03, voce: proposta, perche: "«forse il dolore non è la dimensione principale della vita. forse è la noia» contro «la dimensione principale della realtà è il dolore» (entro il 4 ottobre)"}`.
- `riserva/ritorno.md` (riscritto): "Mentre eri via: l'8 marzo *forse è la noia* ✦ si è messa accanto al dolore di ottobre ✦."
- `contesto/mappa.md` (da `contesto.mjs`): stato "lettera: slittata (2/3)"; tensioni: la riga del `contraddice`.
- Invariati: `s01`, U3 e le loro letture; nessun nodo nuovo.

---

#### Uscita B (Azione del banco: lettera con confronto, forzando solo la soglia dei 3 parlanti)

##### Sul telefono

Notifica, domenica 14 marzo, 17:37:

> La lettera è pronta

Messaggio finale della Routine "lettera" (identico al corpo del file):

> **La settimana.** ✦ tue · ◌ mia · ○ mondo
>
> L'8 marzo hai scritto: *forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove* ✦.
> Entro il 4 ottobre, nell'archivio d'origine: *la dimensione principale della realtà è il dolore* ✦.
>
> 1. Nella prima il dolore è un motore; nella seconda è il fondo di tutto ◌.
>
> 2. Camus è tra le *Persone che hanno segnato la mia visione* ✦ (entro il 4 ottobre). Nel *Mito di Sisifo* (1942, «I muri assurdi») è la stanchezza di una vita meccanica, gli stessi gesti dal lunedì al sabato, ad avviare il movimento della coscienza ○.
>
> 3. Se anche la noia muove, che cosa resta al dolore?

##### File

`restituzioni/2027/03/r-20270314-0331-lettera.md`

```md
---
schema: 3
letto-da: claude-opus-5-5
registrato: 2027-03-14T03:31:00+01:00
forma: lettera
aggancio: {a: 20270308-2340-r2d6}
voci:
  - {n: 1, rif: 20270308-2340-r2d6, voce: proposta, cosa: confronto}
  - {n: 2, rif: camus, voce: mondo, cosa: idea}
  - {n: 3, rif: 20270308-2340-r2d6, voce: proposta, cosa: domanda}
legami: []
---
**La settimana.** ✦ tue · ◌ mia · ○ mondo

L'8 marzo hai scritto: *forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove* ✦.
Entro il 4 ottobre, nell'archivio d'origine: *la dimensione principale della realtà è il dolore* ✦.

1. Nella prima il dolore è un motore; nella seconda è il fondo di tutto ◌.

2. Camus è tra le *Persone che hanno segnato la mia visione* ✦ (entro il 4 ottobre). Nel *Mito di Sisifo* (1942, «I muri assurdi») è la stanchezza di una vita meccanica, gli stessi gesti dal lunedì al sabato, ad avviare il movimento della coscienza ○.

3. Se anche la noia muove, che cosa resta al dolore?
```

Altri file:
- `letture/2027/03/20270308-2340-r2d6.md` → `versione: 2` con il `contraddice` ◌ verso `20261004-0000-u03` (come in A).
  Il legame sta solo nella lettura: la lettera non lo ripete (`legami: []`).
- `riserva/ritorno.md` (riscritto): "Mentre eri via: l'8 marzo *forse è la noia* ✦ si è messa accanto al dolore di ottobre ✦."
- `contesto/mappa.md` (da `contesto.mjs`): ultima lettera `r-20270314-0331-lettera`; seme già usato invariato (nessun ✧
  nella lettera); immagini già usate + "motore", "il fondo di tutto"; tensioni: il `contraddice` resta ◌.
- Invariati: `s01`, U3 e le loro letture, `persone/camus.md`; nessun nodo nuovo (né Schopenhauer né *Il mito di Sisifo*).

### Giudizio (giudice cieco)

#### Uscita A (v3 alla lettera): FALLISCE
Non scrive nessuna restituzione ("Lettera rimandata", 2 parlanti < soglia 3).
- D1 fallisce: nessun file `restituzioni/2027/03/r-20270314-…`.
- D2 fallisce: nessuna citazione di nucleo/B20 (solo nel `perche` della lettura e in `riserva/ritorno.md`, non in una restituzione).
- D3 fallisce: nessun "?" (0, non 1).
- D6 fallisce: nessuna voce contro (nessun Camus, nessuna opera/luogo).
- D4 e D5 passano (nulla di vietato; `contraddice` resta `voce: proposta` ◌, nucleo e U3 invariati, nessun Schopenhauer). X1–X6 passano a vuoto.
- Giudice AI: non necessario (deterministici falliti). Divergenza: la soglia dei 3 parlanti (modello §9.2, C3) non è nella tabella §16.2,
  ma è una scelta dichiarata del v3 contro l'Azione del banco che chiede la lettera col confronto. Il comportamento è coerente col v3,
  e la prova R06 non è eseguita: va letta come "il v3 non fa il confronto dopo 2 parlanti".

#### Uscita B (lettera forzata con confronto): PASSA
##### Deterministici
- D1 passa con divergenza dichiarata: file `restituzioni/2027/03/r-20270314-0331-lettera.md`; il banco dice `-settimana`, il v3 usa `forma: lettera` (§16.2, riga `settimana · ricordi · sogno · confronto`).
- D2 passa: «forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove» ✦ con "8 marzo" identica a B20. Il testo d'ottobre è «la dimensione principale della realtà è il dolore» ✦ (U3, verbatim del frammento), "Entro il 4 ottobre". Nota: il banco vuole ✧ sul nucleo; l'uscita cita U3 come ✦, che è la voce vera del frammento importato (§16.2, R06: "sono frasi ✦"). Divergenza dichiarata.
- D3 passa: un solo "?", ultimo carattere ("…che cosa resta al dolore?"); diversa da "è un cambio, o un'altra faccia?".
- D4 passa: nessuna di *hai cambiato idea, avevi torto, hai ragione, giusto*.
- D5 passa: "il `contraddice` ◌ resta nella lettura (`voce: proposta`)"; "Invariati: `s01`, U3… nessun nodo nuovo (né Schopenhauer…)".
- D6 passa: «*Mito di Sisifo* (1942, «I muri assurdi»)» ha opera, anno, luogo; corpo ≈ 6 righe piene (≈ 10 con i vuoti), ≤ 14; circa 90 parole (confronto ≤ 150).
##### Trasversali
- X1 passa: le due frasi sono verbatim, con data (8 marzo; "entro il 4 ottobre").
- X2 passa: ogni riga ha la sua voce (✦, ◌, ○); legenda in testa; Camus ○ con opera e capitolo, fatto esatto (Mito di Sisifo 1942, "Les murs absurdes": lunedì…sabato, la stanchezza che desta la coscienza). Nessun ⚠ (regola v3: mai nel confronto). La domanda non ha segno, ma non è un fatto.
- X3 passa: nessuna lode né diagnosi.
- X4 passa: B12, B25 assenti.
- X5 passa: file giusto, `voci` numerate con rif (B20, `camus`), `legami: []` (il legame sta nella lettura, dichiarato); nulla cambia fuori da `restituzioni/`, `letture/`, `contesto/`, `riserva/` (estensione dichiarata §16.2).
- X6 passa: U3 citato con data del punto zero ("entro il 4 ottobre"); non entra in conti "da novembre".

##### Giudice AI (tre passate: voto 1 / 2 / 3, maggioranza)
1. La voce contro è una che lui stima? **Sì** (sì/sì/sì): "Camus è tra le *Persone che hanno segnato la mia visione* ✦".
2. Chiude senza dargli ragione? **Sì** (sì/no/sì): la domanda non dice chi ha ragione; la 2ª passata nota che "Se anche la noia muove" ne assume la premessa, e che Camus sta dalla parte della noia (contro il suo 4 ottobre, non contro il suo 8 marzo).
3. La domanda lo obbliga a pensare, non a dare un parere? **Sì** (sì/sì/sì): "che cosa resta al dolore?" è aperta, non si risponde sì/no.
4. C'è un giudizio sul suo umore? **No** (no/no/no), come richiesto: nessun giudizio.
Soglia "tutte": raggiunta (con la riserva su 2).

##### Esito B: **passa**.

#### A pancia
Sul telefono B è breve, pulita, la domanda finale fa il suo lavoro. Stona un po' che "Se anche…" gli dia già ragione e che Camus
lo sostenga invece di contraddirlo; "il fondo di tutto" è una parafrasi un po' astratta. A è silenzio: giusto per il v3, ma R06 non si vede.

## R07 · Convergenza in prosa: la noia prima di averla letta

### Preparazione

Stato al momento in cui gira "consolida", domenica 2027-03-28 alle 03:13 (`CRON_TZ=Europe/Rome`, ora legale da quella notte:
+02:00). Archivio: punto zero (importazione del 31 ottobre 2026) + B01–B24, tutti `canale: telefono`, letti da "smista" come
nel banco (parte 1), con i nomi del modello v3 (§16.1). B25 non esiste ancora. Nessun frammento sintetico.

#### 1. Frammenti B01–B24

Tutti `voce` assente (non importati) = ✦. Testo copiato alla lettera da `banco-di-prova-v2.md` §1 (righe 44–307).
"Parlante" = intento non solo `niente` e, tolti i link, almeno 3 parole sue (v3 §3.3).

| B | id | data e ora | voce | delicato | parlante | testo |
|---|---|---|---|---|---|---|
| B01 | `20261103-2340-k7q2` | 2026-11-03 23:40 | ✦ | no | sì | ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante |
| B02 | `20261104-0812-b3n8` | 2026-11-04 08:12 | ✦ | no | sì | ah e la frase dell'ospite era verso la fine, quando parlava dei greci |
| B03 | `20261109-1902-m4c1` | 2026-11-09 19:02 | ✦ | no | sì | jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato |
| B04 | `20261111-1945-t8w3` | 2026-11-11 19:45 | ✦ | no | sì | ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto |
| B05 | `20261116-2300-p2x9` | 2026-11-16 23:00 | ✦ | no | sì | galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto |
| B06 | `20261120-1244-d5j7` | 2026-11-20 12:44 | ✦ | no | sì | marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina |
| B07 | `20261122-1720-h6r4` | 2026-11-22 17:20 | ✦ | no | sì | camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei |
| B08 | `20261124-2350-z1v8` | 2026-11-24 23:50 | ✦ | no | sì | marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso |
| B09 | `20261126-0905-q9e2` | 2026-11-26 09:05 | ✦ | no | sì | frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente |
| B10 | `20261130-1900-a3k6` | 2026-11-30 19:00 | ✦ | no | sì | oggi mi sento come sisifo |
| B11 | `20261205-1840-c7n5` | 2026-12-05 18:40 | ✦ | no | sì | chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi |
| B12 | `20261207-0210-l4f1` | 2026-12-07 02:10 | ✦ | sì | sì | la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso |
| B13 | `20261209-1800-w2s8` | 2026-12-09 18:00 | ✦ | no | no (link nudo) | https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3 |
| B14 | `20261210-2300-g8u3` | 2026-12-10 23:00 | ✦ | no | sì | https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello |
| B15 | `20261212-2015-y5p7` | 2026-12-12 20:15 | ✦ | no | sì | https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo |
| B16 | `20270109-1630-e1h9` | 2027-01-09 16:30 | ✦ | no | sì | eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa? |
| B17 | `20270203-0710-n6b2` | 2027-02-03 07:10 | ✦ | no | sì | sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura |
| B18 | `20270209-1300-o3t4` | 2027-02-09 13:00 | ✦ | no | no (intento niente) | boh niente volevo solo scrivere qualcosa |
| B19 | `20270301-2200-v7m1` | 2027-03-01 22:00 | ✦ | no | sì | oggi: finito karamazov, sentito la cura in radio, litigato con mio padre. giornata |
| B20 | `20270308-2340-r2d6` | 2027-03-08 23:40 | ✦ | no | sì | forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove |
| B21 | `20270310-1820-f9c3` | 2027-03-10 18:20 | ✦ | no | no (una parola sola ("questa") + foto) | [foto di una pagina con una riga sottolineata a matita] questa |
| B22 | `20270312-1600-i4y8` | 2027-03-12 16:00 | ✦ | no | sì | no aspetta quella di ieri sulla casa in ordine non era jung era peterson |
| B23 | `20270320-2230-u5g2` | 2027-03-20 22:30 | ✦ | no | sì | ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su qualcosa di rotto |
| B24 | `20270322-1200-j8a7` | 2027-03-22 12:00 | ✦ | no | sì | devo leggere il mondo come volontà e rappresentazione prima o poi. dopo evangelion e il porcospino mi incuriosisce |

Letture che contano (v1 di "smista", più il consolidamento dove detto):
- `letture/2027/03/20270308-2340-r2d6.md` (B20), versione 2 (consolidamento del 14 marzo):
  `{p: parla-di, a: dolore, voce: sua, perche: "«forse il dolore non è la dimensione principale della vita»"}`;
  `{p: contraddice, a: 20261004-0000-u03, voce: proposta, perche: "«forse il dolore non è la dimensione principale della vita» contro «la dimensione principale della realtà è il dolore»"}`;
  `parole: [noia]`.
- `letture/2027/03/20270322-1200-j8a7.md` (B24), versione 1:
  `{p: nomina, a: il-mondo-come-volonta-e-rappresentazione, fruizione: da-fare, voce: sua, perche: "«devo leggere il mondo come volontà e rappresentazione prima o poi»"}`;
  `{p: nomina, a: evangelion, voce: sua, perche: "«dopo evangelion e il porcospino mi incuriosisce»"}`; `parole: [porcospino]`.
- B12 (`20261207-0210-l4f1`): `delicato: true`.

Nodi nati da B20 e B24: `opere/il-mondo-come-volonta-e-rappresentazione.md` (`autore: ~Arthur Schopenhauer`, nome in chiaro),
`opere/evangelion.md`. **Non esistono**: nodo Schopenhauer, nodo *Parerga*, nodo Leopardi, tema `noia`.

#### 2. Punto zero (importato, fuori dai conti)

- `frammenti/2026/10/20261004-0000-u03.md`, `voce: sua` (✦ importato, data-tetto 4 ottobre 2026):
  > la dimensione principale della realtà è il dolore. Ma cosa c'è oltre? **Amore e verità.**
- `frammenti/2026/10/20261005-0000-s01.md`, `voce: seme` (✧, il nucleo): ne contiene la copia ("La dimensione principale della
  realtà è il dolore…", sotto «La mia visione»), che non genera legami (A3).
- `restituzioni/2026/10/r-20261007-0000-eredita-citazioni.md` (`forma: eredita`, ex `ritratto-citazioni`), voce 11, ◌,
  `mondo: "Arthur Schopenhauer"`, `prova: memoria`:
  > La vita oscilla, come un pendolo, di qua e di là, tra il dolore e la noia.
  `riferimento: "Il mondo come volontà e rappresentazione, § 57"`, `traduttore: "(traduzione da verificare)"`.
- Tema `temi/dolore.md` (`nato-da: [u01, u03, s01]`).

#### 3. Restituzioni precedenti

Risposte all'ingresso: il testo della **Risposta** del banco per ciascun B. Quelle che contano:
- `r-20270308-2341-risposta` (per B20): "Segnato. Il 4 ottobre ✦ scrivevi che il dolore è la dimensione principale: è un cambio,
  o un'altra faccia?" (nessuna replica).
- `r-20270322-1201-risposta` (per B24): "Segnato da leggere. Il porcospino è nei *Parerga* (1851) ⚠, non nel *Mondo*: forse
  meglio partire da lì?" (nessuna replica: niente nodo *Parerga*).

Lettere (sintetiche, ricostruite con la soglia del v3; vedi §4): 15 novembre, 29 novembre, 13 dicembre, 7 marzo, 21 marzo.
Nessuna nomina noia, Schopenhauer, B24 né il pendolo. La lettera del **21 marzo** (`r-20270321-0313-lettera`, sintetica) è il
confronto nato dal `contraddice` di B20: U3 (entro il 4 ottobre ✦) e B20 (8 marzo ✦) accostate, una voce contro, una domanda
in fondo (come l'Uscita attesa di R06, spostata di una settimana). Ritratto: 1 dicembre (su novembre). Nessun sogno.

#### 4. Registro dei richiami

Ricordi già usati: nessuno. Seme già usato (appoggi ✧ delle lettere): nessuno su `dolore`. Immagini già usate: nessuna con
"pendolo", "noia", "sublime".

#### 5. Estratto di `contesto/mappa.md` (come lo calcolerebbe `contesto.mjs`)

```yaml
aggiornato: 2027-03-28T03:13:00+02:00
fino-a: 20270322-1200-j8a7
```

**Stato**
- frammenti non importati: 24; parlanti: **21** (esclusi B13 link nudo, B18 `intento: [niente]`, B21 "questa").
- giorni attivi: **21** (un giorno per parlante: nessun giorno ha due parlanti; i giorni di B13, B18, B21 non contano).
- parlanti della settimana 22–28 marzo: **1** (B24).
- calendario lettere (consolida alle 03:13 di ogni domenica; gira solo con ≥ 1 parlante nella settimana; lettera se ≥ 3
  parlanti dall'ultima lettera, altrimenti slitta). Calcolo eseguito con uno script sui 21 parlanti:

| domenica | parlanti settimana | dall'ultima lettera | esito |
|---|---|---|---|
| 2026-11-08 | 2 | 2 | slitta |
| 2026-11-15 | 2 | 4 | lettera |
| 2026-11-22 | 2 | 2 | slitta |
| 2026-11-29 | 3 | 5 | lettera |
| 2026-12-06 | 2 | 2 | slitta |
| 2026-12-13 | 3 | 5 | lettera |
| 2027-01-10 | 1 | 1 | slitta |
| 2027-02-07 | 1 | 2 | slitta |
| 2027-03-07 | 1 | 3 | lettera |
| 2027-03-14 | 2 | 2 | slitta (B20, B22) |
| 2027-03-21 | 1 | 3 | lettera (B20, B22, B23) |
| **2027-03-28** | **1** | **1** (B24) | **lettera: no** |

  (Con la lettera del 14 marzo che presuppone R06, i parlanti dall'ultima lettera sarebbero 2, B23 e B24: ancora no.)
- sogno: **spento** (21 parlanti < 50). Ritratto: prossimo il 1 maggio (trimestrale).

**Nodi (righe pertinenti)**
- `dolore · tema · dolore · ✦3 ✧1 ◌1 · 2026-10-04 (importato)–2027-03-08 · vicenda no` (u01, u03 importati, B20; s01; il ◌ è il `contraddice`)
- `il-mondo-come-volonta-e-rappresentazione · opera · Il mondo come volontà e rappresentazione · ✦1 · 2027-03-22 · no`
- `evangelion · opera · Evangelion · ✦1 · 2027-03-22 · no`

**Parole candidate**: `noia` 2027-03-08 (1 giorno); `porcospino` 2027-03-22 (1 giorno).

**Posizioni e tensioni**: `20270308-2340-r2d6 contraddice 20261004-0000-u03` ◌ (8 marzo 2027 contro entro il 4 ottobre 2026);
già usata dal confronto del 21 marzo.

**Fruizioni**: da fare: *Il mondo come volontà e rappresentazione* (22 marzo). In corso: *Uno psicologo nei lager* (26 novembre).
Fatte: *I fratelli Karamazov* (1 marzo).

**Nomi senza nodo** (per chiave): `arthur schopenhauer` → `r-20261007-0000-eredita-citazioni#11` (voce `mondo:`),
`opere/il-mondo-come-volonta-e-rappresentazione.md` (`autore`). Due file, nessun nodo.

**Ricordabili** (✦ oltre 60 giorni attivi, non delicati, mai ricordati): **nessuno** (il più vecchio, B01, ha 21 giorni attivi).

### Uscita

#### Uscita A (modello v3 alla lettera)

**Sul telefono**

Niente. Nessuna notifica, nessuna lettera domenica 2027-03-28.

Log (messaggio finale di "consolida", 03:13, non notificato):

> Consolidamento 2027-03-28: 1 frammento parlante nella settimana. Lettera: no, 1 parlante dall'ultima lettera (soglia 3): slitta.

Log di "lettera" (17:37): `Lettera rimandata.`

**File**

- Nessun file in `restituzioni/`.
- `contesto/mappa.md` rigenerato: stato "lettera: no (1/3)"; il resto come nella Preparazione §5.
- `riserva/ritorno.md` riscritto da "consolida" (§7.4 passo 7; contenuto fuori prova).
- Frammenti, letture, nodi: invariati (`fruizione: da-fare` di B24 invariata).

---

#### Uscita B (forzata solo la soglia della lettera; il resto v3 alla lettera)

**Sul telefono**

Notifica, 2027-03-28 17:37:

> La lettera è pronta

Messaggio:

> Il 22 marzo: *devo leggere il mondo come volontà e rappresentazione prima o poi. dopo evangelion e il porcospino mi incuriosisce* ✦ [1]
>
> Il libro è ancora da leggere, ma la sua coppia l'avevi già scritta l'8 marzo, due settimane prima di segnartelo: *forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove* ✦ [2]
>
> Schopenhauer ○ (*Il mondo come volontà e rappresentazione*, libro IV, §57): il dolore viene dal volere, la noia dal volere appagato, e la vita «oscilla come un pendolo, avanti e indietro, tra il dolore e la noia» (resa di Claude dal tedesco) [3]
>
> Leopardi ○ (*Pensieri*, LXVIII): «La noia è in qualche modo il piú sublime dei sentimenti umani», perché niente di terreno, nemmeno la terra intera, basta all'animo [4]
>
> La stessa coppia, tre posti per la noia: per Schopenhauer si dà il cambio con il dolore, per Leopardi sta più in alto di tutto, per te sta sotto il dolore, perché non muove ◌ [5]
>
> ✦ tue · ◌ mia · ○ mondo

**File** `restituzioni/2027/03/r-20270328-0313-lettera.md`

```md
---
schema: 3
forma: lettera
letto-da: <modello>
registrato: 2027-03-28T03:13:00+02:00
copre: [20270322-1200-j8a7]
aggancio: {a: 20270322-1200-j8a7}
voci:
  - {n: 1, rif: 20270322-1200-j8a7, voce: sua, cosa: libro}
  - {n: 2, rif: 20270308-2340-r2d6, voce: sua, cosa: idea}
  - {n: 3, rif: il-mondo-come-volonta-e-rappresentazione, voce: mondo, cosa: citazione}
  - {n: 4, rif: "~Giacomo Leopardi", voce: mondo, cosa: citazione}
  - {n: 5, rif: dolore, voce: proposta, cosa: convergenza}
legami:
  - p: converge-con
    tra: [20270308-2340-r2d6, 20270322-1200-j8a7, il-mondo-come-volonta-e-rappresentazione, "~Giacomo Leopardi"]
    voce: proposta
    perche: "L'8 marzo mette la noia al posto del dolore, che almeno muove; il 22 si segna il libro che fa oscillare la vita tra i due (§57); Leopardi (Pensieri LXVIII) mette la noia più in alto di tutto. Stessa coppia, tre posti per la noia."
---
Il 22 marzo: *devo leggere il mondo come volontà e rappresentazione prima o poi. dopo evangelion e il porcospino mi incuriosisce* ✦ [1]

Il libro è ancora da leggere, ma la sua coppia l'avevi già scritta l'8 marzo, due settimane prima di segnartelo: *forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove* ✦ [2]

Schopenhauer ○ (*Il mondo come volontà e rappresentazione*, libro IV, §57): il dolore viene dal volere, la noia dal volere appagato, e la vita «oscilla come un pendolo, avanti e indietro, tra il dolore e la noia» (resa di Claude dal tedesco) [3]

Leopardi ○ (*Pensieri*, LXVIII): «La noia è in qualche modo il piú sublime dei sentimenti umani», perché niente di terreno, nemmeno la terra intera, basta all'animo [4]

La stessa coppia, tre posti per la noia: per Schopenhauer si dà il cambio con il dolore, per Leopardi sta più in alto di tutto, per te sta sotto il dolore, perché non muove ◌ [5]

✦ tue · ◌ mia · ○ mondo
```

**Altri file**
- `contesto/mappa.md` (rigenerato da `contesto.mjs`): ultima lettera 2027-03-28; immagini già usate + "pendolo", "posti per la
  noia"; seme già usato: invariato (la lettera non si appoggia al ✧); la convergenza ◌ entra tra i legami proposti.
- `riserva/ritorno.md` riscritto da "consolida" (contenuto fuori prova).
- Nessun nodo nuovo (né Schopenhauer, né *Parerga*, né Leopardi: Leopardi resta `~Giacomo Leopardi`); `fruizione: da-fare` di
  B24 invariata; frammenti, letture e restituzioni precedenti invariati.

### Giudizio (giudice cieco)

#### Uscita A (v3 alla lettera: nessuna lettera)
**Deterministici**
- D1 FALLISCE: nessun file in `restituzioni/` ("Nessun file in `restituzioni/`"), quindi niente `converge-con`.
- D2 FALLISCE: B20 e B24 non compaiono.
- D3, D4 passano a vuoto (nessun testo; `fruizione` di B24 invariata, nessun nodo nuovo).
- D5 passa a vuoto (0 "?", 0 righe).
- X1-X6: non applicabili / nulla da violare (nessuna restituzione).
**Giudice AI:** nessuna uscita da giudicare. Q1 no, Q2 no, Q3 no, Q4 no (voti 3/3 no per tutte: "Niente. Nessuna notifica").
**Esito: FALLISCE** (D1, D2; giudice 0/4). Divergenza: la soglia ≥3 parlanti (modello §9.2, C3; la Preparazione §5 calcola 1/3) è voluta, ma R07 **non** è nella tabella §16.2: è una divergenza di fatto, non dichiarata per questa prova. Il banco va corretto, o la prova rifatta con la soglia raggiunta.

#### Uscita B (soglia forzata; resto v3)
**Deterministici**
- D1 PASSA: `r-20270328-0313-lettera.md`; `forma: lettera` invece di `settimana` per la mappatura dichiarata in §16.1 (riga "forma: settimana…"); `legami` ha `converge-con` ◌ (voce: proposta) con `perche` di tre frasi.
- D2 PASSA: B24 «devo leggere il mondo come volontà e rappresentazione prima o poi. dopo evangelion e il porcospino mi incuriosisce» e B20 «forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove» identici alla fonte; date "22 marzo" e "8 marzo" presenti.
- D3 PASSA: Schopenhauer ○ con «Il mondo come volontà e rappresentazione, libro IV, §57» (fatto corretto); Leopardi ○ «Pensieri, LXVIII» (corretto). Mai ✦. Nota: il pendolo è reso diversamente dalla ◌ già in archivio ("di qua e di là"), ma dichiarato "resa di Claude dal tedesco".
- D4 PASSA: Leopardi resta `~Giacomo Leopardi`, nessun nodo Schopenhauer/Parerga; `fruizione: da-fare` invariata.
- D5 PASSA: grep "?" = 0; corpo di 5 voci + legenda = 6 righe (≤14).
- X1 PASSA: ✦ verbatim con data. X2 PASSA: ogni riga ha la voce (✦ ✦ ○ ○ ◌), ○ con opera e numero, nessun testo di canzone. X3 PASSA: nessuna parola vietata ("sublime" è di Leopardi, non in lista). X4 PASSA: nessun B12/B25. X5 PASSA: nome file e forma coerenti, `voci` numerate con rif, `legami` con `perche`; scrive anche `contesto/` e `riserva/` (estensione dichiarata in §16.2, X5). X6 PASSA: nessun importato citato né contato.

**Giudice AI** (tre passate, maggioranza)
1. Voci diverse sullo stesso legame? Sì, sì, sì: oscillazione (Schopenhauer), noia sublime (Leopardi), noia che precede il dolore (lui).
2. Nesso non fatto da lui? Sì, sì, sì: «la sua coppia l'avevi già scritta l'8 marzo, due settimane prima di segnartelo».
3. Il mondo serve la sua frase? Sì, sì, sì: apre e chiude con le sue parole.
4. Una frase spiega e regge da sola? No, sì, no -> NO: «per te sta sotto il dolore, perché non muove» è ambigua e quasi rovescia B20 (per lui la noia è la dimensione principale; è il dolore che muove); "coppia" e "tre posti" richiedono di aver letto sopra.
Soglia 3/4 con 1 e 2: raggiunta (3/4).

**Esito: PASSA.**

#### A pancia
Sul telefono sono cinque capoversi corti, si leggono bene e la scoperta (l'8 marzo prima del libro) fa effetto. Stona l'ultima riga: "sta sotto il dolore" lo fa dire una cosa che forse non ha detto, e la metafora dei "posti" è un po' da schema.

## R08 · La convergenza da non fare: il mare

### Preparazione

Punto zero (importazione 4–7 ottobre 2026) + B01–B17. Nessun altro frammento. Nessuna chat in Specchio o nel Progetto.
Ora locale Europe/Rome. Fonti dei testi: `_progetto/v2/banco-di-prova-v2.md` §1 (B01–B17) e
`_progetto/v2/simulazione/importazione.md` (punto zero).

#### 1. Frammenti

##### 1.1 Punto zero (`canale: importato`, fuori da tutti i conti)

34 frammenti: `20261004-0000-u01` … `u31` (con `u26a`), voce ✦ (`sua`; quelli scritti da Claude nel seme anche
`forma: riportata`), registrato con la sola data; `20261005-0000-s01` (nucleo, ✧ `seme`), `20261004-0000-s03`
(racconto d'origine, ✧), `s04` (✧). Testi in `importazione.md` §1–3. Quelli che toccano le parole di B17:

| id | voce | testo (estratto verbatim) |
|---|---|---|
| `20261004-0000-u01` | ✦ riportata | "…Consapevolezza, pace interiore nel guardare alle battaglie interiori e alle versioni di me morte lungo il percorso, innalzarsi a una dimensione superiore. …" |
| `20261004-0000-u20` | ✦ | "True Detective, stagione 1, Rust Cohle: "I don't sleep, I just dream" (episodio 1, *The Long Bright Dark*)." |
| `20261005-0000-s01` | ✧ | "In uno stadio assurdista, alla Camus. Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo." |

Nessun frammento del punto zero contiene le parole *mare*, *scala*, *scendere*, *paura* (ricerca esatta su `importazione.md`).

##### 1.2 Da novembre (`canale: telefono`)

| | id | registrato | voce | delicato | parlante | testo verbatim |
|---|---|---|---|---|---|---|
| B01 | `20261103-2340-k7q2` | 2026-11-03 23:40 | ✦ | no | sì | ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante |
| B02 | `20261104-0812-b3n8` | 2026-11-04 08:12 | ✦ | no | sì | ah e la frase dell'ospite era verso la fine, quando parlava dei greci |
| B03 | `20261109-1902-m4c1` | 2026-11-09 19:02 | ✦ | no | sì | jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato |
| B04 | `20261111-1945-t8w3` | 2026-11-11 19:45 | ✦ | no | sì | ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto |
| B05 | `20261116-2300-p2x9` | 2026-11-16 23:00 | ✦ | no | sì | galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto |
| B06 | `20261120-1244-d5j7` | 2026-11-20 12:44 | ✦ | no | sì | marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina |
| B07 | `20261122-1720-h6r4` | 2026-11-22 17:20 | ✦ | no | sì | camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei |
| B08 | `20261124-2350-z1v8` | 2026-11-24 23:50 | ✦ | no | sì | marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso |
| B09 | `20261126-0905-q9e2` | 2026-11-26 09:05 | ✦ | no | sì | frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente |
| B10 | `20261130-1900-a3k6` | 2026-11-30 19:00 | ✦ | no | sì | oggi mi sento come sisifo |
| B11 | `20261205-1840-c7n5` | 2026-12-05 18:40 | ✦ | no | sì | chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi |
| B12 | `20261207-0210-l4f1` | 2026-12-07 02:10 | ✦ | **sì** | sì | la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso |
| B13 | `20261209-1800-w2s8` | 2026-12-09 18:00 | ✦ | no | **no** (link nudo) | https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3 |
| B14 | `20261210-2300-g8u3` | 2026-12-10 23:00 | ✦ | no | sì | https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello |
| B15 | `20261212-2015-y5p7` | 2026-12-12 20:15 | ✦ | no | sì | https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo |
| B16 | `20270109-1630-e1h9` | 2027-01-09 16:30 | ✦ | no | sì | eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa? |
| B17 | `20270203-0710-n6b2` | 2027-02-03 07:10 | ✦ | no | sì | sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura |

Letture v1 come nel banco (§1, punti **File**), nel vocabolario v3 (§16.1). Le due che contano:
- `letture/2026/11/20261116-2300-p2x9.md`: `nomina umberto-galimberti` ✦; `nomina telemaco` ✦ (nodo nato qui,
  `cerchia: finzione`); `nomina ~Massimo Recalcati` ○, `perche: "l'idea del figlio che aspetta è di Recalcati (da verificare)"`;
  `reazione: [{parole: "mi ha colpito tanto", verso: "+"}]`; `parole: [padre, mare]`. Nessun `corregge` (il "Correggo?" non ha avuto risposta).
- `letture/2027/02/20270203-0710-n6b2.md` (v1, "smista"): `intento: [salva]`; `vissuto: stanotte`;
  `reazione: [{parole: "non avevo paura", verso: "+"}]`; `legami: []`; `parole: [scala, mare]`; `risposta: r-20270203-0712-ritorno`.

#### 2. Restituzioni precedenti

##### 2.1 Eredità (`forma: eredita`, fuori dai conti, mai rilanciate), quelle che toccano B17

- `r-20261004-0000-eredita-c16` (◌/✧): voce 1 `mondo: "Caspar David Friedrich, Monaco in riva al mare e Viandante sul mare di nebbia"`;
  corpo: "Una figura minuscola davanti a mare e cielo vuoti. … il momento che interessa a Camus non è la spinta in salita, ma la **discesa** …"
- `r-20261004-0000-eredita-t11` "La discesa di Sisifo" (◌): "Non il Sisifo che spinge, ma quello che torna giù, lucido."; voce 5
  `mondo: "Caspar David Friedrich, Viandante sul mare di nebbia (1818); Monaco in riva al mare (1808–10)"`.
  Per nome si ricollegano al nodo `sisifo`, nato con B10 (`mappa.md` §9).

##### 2.2 Da novembre (sintetiche dove il banco non dà il testo; i file `risposta` solo dove c'è contenuto, C11)

| id | forma | per / aggancio | testo che conta |
|---|---|---|---|
| `r-20261101-0907-ritratto` | ritratto (giorno 1, sintetico) | nucleo e U1–U31 | nessuna parola tra mare, scala, sogno, discesa |
| `r-20261103-2341-risposta` | risposta | B01 | come banco B01 |
| `r-20261109-1903-risposta` | risposta | B03 | come banco B03 |
| `r-20261111-1946-risposta` | risposta | B04 | come banco B04 |
| `r-20261115-0331-lettera` | lettera (sintetica) | aggancio B01 | convergenza su `nichilismo`; seme ✧ usato su `nichilismo` |
| `r-20261116-2301-risposta` | risposta | B05 | "È più probabile Recalcati ○: *Il complesso di Telemaco* (2013) è suo. Correggo?" (nessuna replica) |
| `r-20261120-1245-risposta` | risposta | B06 | come banco B06 |
| `r-20261122-1721-risposta` | risposta | B07 | come banco B07 |
| `r-20261124-2351-risposta` | risposta | B08 | come banco B08 |
| `r-20261126-0906-risposta` | risposta | B09 | come banco B09 |
| `r-20261129-0329-lettera` | lettera (sintetica) | aggancio B07 | convergenza su `camus`; seme ✧ usato su `camus` |
| `r-20261201-0907-ritratto` | ritratto (sintetico) | novembre, 10 parlanti | nessuna parola tra mare, scala, sogno, discesa |
| `r-20261205-1841-risposta` | risposta | B11 | come banco B11 |
| `r-20261207-0211-risposta` | risposta | B12 | "Salvato. Un abbraccio." |
| `r-20261209-1801-risposta` | risposta | B13 | come banco B13 |
| `r-20261210-2301-risposta` | risposta | B14 | come banco B14 |
| `r-20261212-2016-risposta` | risposta | B15 | come banco B15 |
| `r-20261213-0334-lettera` | lettera (sintetica) | aggancio B11 | il kintsugi ✦ (convergenza sua) e Rilke; nessun seme; ultima lettera consegnata |
| `r-20270109-1631-ritorno` | ritorno | B16 | riserva del 13 dic: "Il 12 dicembre, Rilke: *let everything happen to you: beauty and terror* ✦." + "Sì, convergono ✦: l'identità nel cambiamento. Il 'due volte' è di Platone (*Cratilo* 402a) ⚠." |
| `r-20270203-0712-ritorno` | ritorno | B17 | riserva del 10 gen: "Il 9 gennaio, da te: *eraclito il fiume e la nave di teseo sono la stessa domanda* ✦." + "Salvato il sogno. Ti dice qualcosa?" (nessuna replica) |

Ritratti del 1 gennaio e del 1 febbraio: slittati (dicembre 4 parlanti, gennaio 1; soglia 10).
Lettere del 22 nov, 6 dic e dal 20 dic al 31 gen: slittate o "consolida" non partito (settimane senza parlanti).

#### 3. Registro dei richiami ("ti ricordi?")

Vuoto: nessun ricordo usato finora.

#### 4. Estratto di `contesto/mappa.md` (rigenerato da "consolida" il 2027-02-07 alle 03:3x)

```yaml
aggiornato: 2027-02-07T03:31:00+01:00
fino-a: 20270203-0710-n6b2
```

**1. Stato**
- giorni attivi totali: **16** (giorni con ≥ 1 parlante non importato: 3, 4, 9, 11, 16, 20, 22, 24, 26, 30 nov; 5, 7, 10, 12 dic; 9 gen; 3 feb. Il 9 dic ha solo B13, non parlante)
- frammenti parlanti totali: **16** (B01–B17 tranne B13); della settimana 1–7 feb: **1** (B17); dall'ultima lettera (`r-20261213-0334-lettera`): **2** (B16, B17)
- lettera: **no** (2 < 3); sogno: **spento** (16 < 50); ritratto: prossimo 1 maggio 2027 (dal quarto mese, trimestrale)

**2. Nodi (estratto)**
- `telemaco · persona (finzione) · Telemaco · ✦1 ◌0 ●0 · 2026-11-16 · vicenda no`
- `sisifo · opera (mito) · Sisifo · ✦1 ◌0 ●0 · 2026-11-30 · vicenda no` (+ eredità c16, t11, c04 per nome)
- `nichilismo · tema · ✦1 ✧1 · 2026-11-03 · vicenda no`

**4. Parole candidate**
- `mare`: 2026-11-16 (B05), 2027-02-03 (B17) · 2 giorni distinti · vicenda no (serve ≥ 3 in ≥ 3 giorni entro 30 giorni attivi)
- `scala`: 2027-02-03 · 1 · no
- `padre`: 2026-11-16 · 1 · no
- (le altre: ragazzi, cultura, greci, inconscio, destino, porcospino… tutte a 1)

**6. Posizioni e tensioni**: nessun `contraddice`.

**8. Correzioni e rifiuti**: nessuno.

**9. Nomi senza nodo (estratto)**: `~Massimo Recalcati` (B05); "Caspar David Friedrich, Monaco in riva al mare…" (c16, t11).

**10. Ricordabili**: **nessuno**. Il frammento più vecchio da novembre (B01) ha alle spalle 15 giorni attivi (< 60).
Ricordi già usati: nessuno.

**11. Seme già usato**: `nichilismo` (lettera 15 nov), `camus` (lettera 29 nov). Immagini già usate: "porta", "stagione".

**Delicati**: B12 (`delicato: true`), mai ripreso.

Come si contano: parlante = intento non solo `niente` e ≥ 3 parole sue tolti i link (§3.3); giorno attivo e conti
escludono `canale: importato` e le `eredita` (§6.2); vicenda §6.2; ricordabili §9.3; soglie §7.6.

### Uscita

#### Uscita A (v3 alla lettera)

##### Sul telefono

Domenica 7 febbraio 2027: nessuna notifica, nessuna lettera.

Messaggio finale della sessione della Routine "lettera" (17:37, non notificato):

> Lettera rimandata.

##### File

Nessuna restituzione scritta. Nessun file in `restituzioni/`.

Log di "consolida" (03:13), messaggio finale:

> Settimana 2027-02-01/07: 1 frammento parlante. Nessun tema nato, nessuna citazione da verificare, letture invariate.
> Lettera: no, 2 frammenti parlanti dall'ultima lettera (13 dicembre), soglia 3. Riserva riscritta.

Altri file cambiati:
- `riserva/ritorno.md` (sovrascritto da "consolida"):
  ```md
  Il 22 novembre, sull'estate invincibile: *questa me la tatuerei* ✦.
  ```
- `contesto/mappa.md` rigenerato: stato "lettera: no (2/3)", "sogno: spento (16/50)"; `mare` 2 giorni, nessuna vicenda; ricordabili: nessuno.
- `contesto/parole.md`, `contesto/recenti.md`: rigenerati, nessun contenuto nuovo dopo B17.

---

#### Uscita B (l'Azione del banco: la lettera parte forzando solo la soglia dei 3 parlanti)

##### Sul telefono

Notifica, domenica 7 febbraio 2027, 17:37:

> La lettera è pronta

Messaggio:

> Mercoledì 3 febbraio, alle sette di mattina: *sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura* ✦.
> Lo lascio com'è, con le tue parole e senza leggerlo: questa volta niente si aggancia ◌.
>
> ✦ tue · ◌ mie

##### File

`restituzioni/2027/02/r-20270207-0331-lettera.md`

```md
---
schema: 3
letto-da: <modello>
registrato: 2027-02-07T03:31:00+01:00
forma: lettera
copre: [20270109-1630-e1h9, 20270203-0710-n6b2]
aggancio: {a: 20270203-0710-n6b2}
voci:
  - {n: 1, rif: 20270203-0710-n6b2, voce: sua, cosa: idea}
  - {n: 2, rif: 20270203-0710-n6b2, voce: proposta, cosa: assenza}
legami: []
---
Mercoledì 3 febbraio, alle sette di mattina: *sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura* ✦.
Lo lascio com'è, con le tue parole e senza leggerlo: questa volta niente si aggancia ◌.

✦ tue · ◌ mie
```

Altri file cambiati: `riserva/ritorno.md` come nell'Uscita A; `contesto/mappa.md` rigenerato (ultima lettera
`r-20270207-0331-lettera`, parlanti dall'ultima lettera 0; seme già usato e immagini già usate invariati).

### Giudizio (giudice cieco)

Verificato: B17 nel banco (riga 217), 3 feb 2027 = mercoledì, 7 feb 2027 = domenica. Divergenze note (§16.1): `forma: settimana` -> `forma: lettera`; §16.2 estende X5 a `riserva/` e `contesto/`.

#### Uscita A (v3 alla lettera: la lettera slitta)

| criterio | esito | prova |
|---|---|---|
| D1 file `r-20270207-HHMM-...md`, nessun `converge-con` | **fallisce** | "Nessuna restituzione scritta. Nessun file in `restituzioni/`." Il file non esiste; il solo messaggio è "Lettera rimandata." |
| D2 parole vietate | passa (vuoto) | nessuna delle sei nel testo; ma non c'è testo |
| D3 verbi di interpretazione | passa (vuoto) | assenti |
| D4 zero "?", max 6 righe | passa | 0 "?", 1 riga |
| X1 verbatim | passa | "questa me la tatuerei" = B07 (22 nov), alla lettera, con data |
| X2 voce | passa | la riga di riserva porta ✦ |
| X3 niente lode/diagnosi | passa | assenti |
| X4 delicati | passa | B12 non toccato |
| X5 file/diff | passa con riserva | nessuna restituzione; `riserva/` e `contesto/` cambiati, ammesso da §16.2 |
| X6 importati | passa | nessuna citazione importata |

Giudice AI: non necessario (D1 fallito). Per scrupolo: 1 sì (non inventa ponti), 2 no (non lo interpreta), 3 no ("Lettera rimandata" è un messaggio di sistema, non una scelta leggibile: il sogno non viene ripreso). Voti 3/3 uguali: soglia non raggiunta.

**Esito A: fallisce** (D1; Q3 sotto soglia). Divergenza: è il v3 coerente (soglia 3 parlanti, C3), ma R08 non è nell'elenco di §16.2: la divergenza è di fatto, non dichiarata per questa prova. Il banco però chiede espressamente la lettera del 7 febbraio e un sogno ripreso con le sue parole o una riga "niente si aggancia": A non dà né l'uno né l'altra.

#### Uscita B (la lettera parte, forzata la sola soglia)

| criterio | esito | prova |
|---|---|---|
| D1 file `r-20270207-HHMM-settimana.md`, nessun `converge-con` | passa | `restituzioni/2027/02/r-20270207-0331-lettera.md` (nome v3, §16.1); `legami: []` |
| D2 niente Telemaco, padre, papà, Recalcati, Wittgenstein, Tractatus | passa | grep sul testo e sul frontmatter: 0 occorrenze |
| D3 niente significa/simboleggia/rappresenta/inconscio/archetipo | passa | 0 occorrenze; "Lo lascio com'è... senza leggerlo" |
| D4 zero "?", max 6 righe | passa | 0 "?"; 2 righe di testo + 1 di legenda |
| X1 verbatim con data | passa | *sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura* identico a B17; "Mercoledì 3 febbraio, alle sette di mattina" (07:10, corretto) |
| X2 voce su ogni riga | passa | riga 1 ✦, riga 2 ◌; nessun fatto ○, nessuna canzone |
| X3 lode/diagnosi | passa | assenti |
| X4 delicati | passa | B12 non usato |
| X5 file, forma, voci, legami | passa | forma `lettera`, voci n:1 e n:2 con `rif`, `legami: []` (vuoto, quindi nessun `perche` richiesto); altri file (`riserva/`, `contesto/mappa.md`) ammessi da §16.2 |
| X6 importati | passa | nessuno citato |

Giudice AI (3 passate indipendenti, tutte uguali):
1. Rinuncia a collegare invece di inventare un ponte? Sì, sì, sì. "questa volta niente si aggancia ◌"; `legami: []`; né mare né scala collegati a B05 o al Tractatus.
2. Lui si sentirebbe interpretato? (deve essere no) No, no, no. Il sogno è citato intero, "Lo lascio com'è... senza leggerlo".
3. La brevità sembra una scelta e non un guasto? Sì, sì, sì. La frase "questa volta niente si aggancia" la dichiara.
Maggioranza 3/3 su tutte: soglia raggiunta.

**Esito B: passa.** Nota minore: `voce: proposta, cosa: assenza` con ◌ per una dichiarazione di assenza è un uso largo del ◌ (che segna una proposta); non viola nessun criterio.

#### A pancia
Sul telefono B piace: due righe, il suo sogno com'è, e l'onestà di non agganciare nulla. Stona solo il ◌ su "niente si aggancia" (non è una proposta) e, per A, che la domenica non arrivi niente: il sogno resta senza eco.

## R09 · Le sue parole e il mondo: rotto e riparato

### Preparazione

Momento dell'azione: **2027-03-25 22:00** (ora di Roma, `+01:00`: l'ora legale 2027 comincia il 28 marzo).
Stato: punto zero (importazione) + B01–B24 + gli oggetti sintetici qui sotto. B25 non esiste ancora.

#### 1. Punto zero (canale: importato, fuori da ogni conto)

Come in `_progetto/v2/simulazione/importazione.md` (U01–U31, `s01`, `s03`, `s04`; restituzioni importate C01–C25,
`citazioni`, `domande`, `grimorio`, T11/T12/T19), con i nomi del v3 (§16.1: `forma: eredita`, id `r-…-eredita-<slug>`).
Quelli che contano qui, verbatim:

| id | registrato | voce | delicato | testo |
|---|---|---|---|---|
| `20261004-0000-u01` | 2026-10-04 (solo data) | ✦ importato | no | battaglie interiori, solitudine, senso di vuoto, apatia, dolore, rabbia, risentimento. Percorso, avventura, musica, caos, libertà, gioia, vincere se stessi. Consapevolezza, pace interiore nel guardare alle battaglie interiori e alle versioni di me morte lungo il percorso, innalzarsi a una dimensione superiore. Assurdità dell'essenza stessa della vita, calma nell'esplorarne i concetti data dall'immensità del dolore superato. |
| `20261004-0000-u03` | 2026-10-04 | ✦ importato | no | la dimensione principale della realtà è il dolore. Ma cosa c'è oltre? **Amore e verità.** |
| `20261004-0000-u08` | 2026-10-04 | ✦ importato | no | Vincere se stessi, le versioni di me morte lungo il cammino. |
| `20261005-0000-s01` | 2026-10-05 | ✧ seme (sguardo) | no | il nucleo; riga chiave: **Attraversare il dolore a occhi aperti, e trovare dall'altra parte amore e verità.** |

Restituzione importata **sintetica**, richiesta dalla Preparazione del banco ("la scheda ◌ del kintsugi"):

```yaml
# restituzioni/2026/10/r-20261004-0000-eredita-kintsugi.md
---
schema: 3
letto-da: importa.mjs
registrato: 2026-10-04
forma: eredita
sintetico: true
fonte: "fonti/arte/kintsugi.md:13@b88001b"
voci:
  - {n: 1, rif: "~Kintsugi", voce: proposta, cosa: idea}
legami: []
---
Riparare la ceramica con l'oro, rendendo visibile la frattura.
```

Altre restituzioni importate pertinenti (vere, dall'importazione): `r-20261006-0000-eredita-lotta-al-guado` (C22, ◌:
Giacobbe al guado, "una ferita e un nome nuovo", aggancio U01), `r-20261006-0000-eredita-mute-della-cicala` (C13, ◌,
aggancio U08).

#### 2. Frammenti B01–B24 (canale: telefono, voce ✦)

Parlante = intento non solo `niente` e ≥ 3 parole sue tolti i link (v3 §3.3).

| B | id | data e ora | voce | delicato | parlante | testo (verbatim) |
|---|---|---|---|---|---|---|
| B01 | `20261103-2340-k7q2` | 2026-11-03 23:40 | ✦ | no | sì | ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante |
| B02 | `20261104-0812-b3n8` | 2026-11-04 08:12 | ✦ | no | sì | ah e la frase dell'ospite era verso la fine, quando parlava dei greci |
| B03 | `20261109-1902-m4c1` | 2026-11-09 19:02 | ✦ | no | sì | jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato |
| B04 | `20261111-1945-t8w3` | 2026-11-11 19:45 | ✦ | no | sì | ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto |
| B05 | `20261116-2300-p2x9` | 2026-11-16 23:00 | ✦ | no | sì | galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto |
| B06 | `20261120-1244-d5j7` | 2026-11-20 12:44 | ✦ | no | sì | marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina |
| B07 | `20261122-1720-h6r4` | 2026-11-22 17:20 | ✦ | no | sì | camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei |
| B08 | `20261124-2350-z1v8` | 2026-11-24 23:50 | ✦ | no | sì | marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso |
| B09 | `20261126-0905-q9e2` | 2026-11-26 09:05 | ✦ | no | sì | frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente |
| B10 | `20261130-1900-a3k6` | 2026-11-30 19:00 | ✦ | no | sì | oggi mi sento come sisifo |
| B11 | `20261205-1840-c7n5` | 2026-12-05 18:40 | ✦ | no | sì | chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi |
| B12 | `20261207-0210-l4f1` | 2026-12-07 02:10 | ✦ | **sì** | sì | la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso |
| B13 | `20261209-1800-w2s8` | 2026-12-09 18:00 | ✦ | no | no (link nudo) | https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3 |
| B14 | `20261210-2300-g8u3` | 2026-12-10 23:00 | ✦ | no | sì | https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello |
| B15 | `20261212-2015-y5p7` | 2026-12-12 20:15 | ✦ | no | sì | https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo |
| B16 | `20270109-1630-e1h9` | 2027-01-09 16:30 | ✦ | no | sì | eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa? |
| B17 | `20270203-0710-n6b2` | 2027-02-03 07:10 | ✦ | no | sì | sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura |
| B18 | `20270209-1300-o3t4` | 2027-02-09 13:00 | ✦ | no | no (intento niente) | boh niente volevo solo scrivere qualcosa |
| B19 | `20270301-2200-v7m1` | 2027-03-01 22:00 | ✦ | no | sì | oggi: finito karamazov, sentito la cura in radio, litigato con mio padre. giornata |
| B20 | `20270308-2340-r2d6` | 2027-03-08 23:40 | ✦ | no | sì | forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove |
| B21 | `20270310-1820-f9c3` | 2027-03-10 18:20 | ✦ | no | no (una parola) | [foto di una pagina con una riga sottolineata a matita] questa |
| B22 | `20270312-1600-i4y8` | 2027-03-12 16:00 | ✦ | no | sì | no aspetta quella di ieri sulla casa in ordine non era jung era peterson |
| B23 | `20270320-2230-u5g2` | 2027-03-20 22:30 | ✦ | no | sì | ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su qualcosa di rotto |
| B24 | `20270322-1200-j8a7` | 2027-03-22 12:00 | ✦ | no | sì | devo leggere il mondo come volontà e rappresentazione prima o poi. dopo evangelion e il porcospino mi incuriosisce |

Letture e nodi che contano (v1 di "smista", poi consolidamento, come da banco tradotto col dizionario v3 §16.1):
- B07: `nomina` della citazione `nel-mezzo-dell-inverno` (`autore: camus`, `esito: verificata`, `riferimento`: *L'Estate*, *Ritorno a Tipasa*, 1954); `serve-a: tatuaggi` ✦; reazione «questa me la tatuerei» +.
- B09: `nomina` di `uno-psicologo-nei-lager` (`fruizione: in-corso`) e della citazione `chi-ha-un-perche` (`autore: "~Friedrich Nietzsche"`, `attribuita-a: [viktor-frankl]`, `esito: errata`, `riferimento`: *Crepuscolo degli idoli*, «Sentenze e frecce» §12).
- B11: `intento: [salva, chiedi]`; `nomina` della citazione `il-mondo-spezza-tutti` (`autore: "~Ernest Hemingway"`, consolidata il 2026-12-06: `esito: verificata`, `riferimento`: *A Farewell to Arms* (1929), cap. XXXIV, testo primario Project Gutenberg #75201); `converge-con` ✦ `tra: [20261205-1840-c7n5, kintsugi]`, `perche: "«tipo kintsugi»"`. Nasce il tema `temi/kintsugi.md` (`nato-da: [20261205-1840-c7n5]`, `link` alla scheda dell'Atlante: v3 §3.4, A9).
- B12: `delicato: true`.
- B20: nel consolidamento del 14 marzo, `contraddice` ◌ verso `20261004-0000-u03`.
- B23: `serve-a: tatuaggi` ✦; `parole: [crepa, luce]`; `ritorna-su` ◌ verso `20261205-1840-c7n5` (`perche`: "i punti rotti e la linea d'oro: la stessa riparazione").
- Nodi del mondo che **non** esistono: `nietzsche`, `hemingway`, `leonard-cohen`, `anthem` (nomi in chiaro o voci `mondo`).

#### 3. Restituzioni precedenti

Calendario delle lettere ricostruito con la soglia v3 (≥ 3 frammenti parlanti dall'ultima lettera, conti a "consolida",
domenica 03:13): 15 nov (B01–B04), 29 nov (B05–B09), 13 dic (B10, B11, B12, B14, B15), 7 mar (B16, B17, B19), 21 mar
(B20, B22, B23); le altre domeniche slittano. Tutte sintetiche; le precedenti al 21 marzo non citano B07, B11, Cohen né il kintsugi.

Risposte all'ingresso con file (testo del banco): B01, B03, B04, B05, B07, B09, B11, B13, B15, B16, B20, B21, B22, B23, B24.
La risposta a B11, `r-20261205-1841-risposta`: "Hemingway, *Addio alle armi* (1929), cap. 34 ⚠. E sì, è il kintsugi in parole ✦."

**Le ultime 4 restituzioni** (in ordine), testo intero:

1. `r-20270312-1601-risposta` (per B22): "Non trovo la frase di ieri sulla casa in ordine: me la riscrivi?"
2. `r-20270320-2231-risposta` (per B23), voci: 1 `20261205-1840-c7n5` ✦, 2 `~Leonard Cohen, Anthem` ○:
   "Segnato tra i tatuaggi. Da te viene già Hemingway col kintsugi ✦ (5 dic); fuori, Cohen, *Anthem* ○. Te le metto in fila?"
3. `r-20270321-0313-lettera` (sintetica, consegnata alle 17:37; confronto, perché B20 porta un `contraddice` fresco),
   voci: 1 `20261004-0000-u03` ✦, 2 `20270308-2340-r2d6` ✦, 3 confronto ◌:
   > ✦ tue · ◌ mie.
   > Entro il 4 ottobre, nell'archivio d'origine: *la dimensione principale della realtà è il dolore* ✦.
   > L'8 marzo: *forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove* ✦.
   > Nella prima il dolore è il terreno; nella seconda è un motore, e il terreno è la noia ◌.
   > Il dolore ti tiene fermo o ti sposta?
4. `r-20270322-1201-risposta` (per B24): "Segnato da leggere. Il porcospino è nei *Parerga* (1851) ⚠, non nel *Mondo*: forse meglio partire da lì?"

Voci citate nelle ultime 4: B22, B11, Hemingway (per nome), Cohen *Anthem*, U03, B20, B24, *Parerga*.

#### 4. Registro dei richiami e rifiuti

- Ricordi ("ti ricordi?") usati: nessuno. Rifiuti: nessuno. Accoglienze: nessuna (nessun ●).
- Seme già usato (lettere appoggiate a ✧): `nichilismo` (lettera del 15 nov). Immagini già usate (nate in restituzioni, assenti dai ✦): *terreno*, *motore* (21 mar), *argine* (29 nov), *radice* (13 dic).

#### 5. Estratto di `contesto/mappa.md` (calcolato prima dell'azione)

```yaml
aggiornato: 2027-03-22T12:02:10+01:00
fino-a: 20270322-1200-j8a7
```

1. **stato**: frammenti B 24; parlanti 21 (24 meno B13, B18, B21); giorni attivi 21 (ogni parlante cade in un giorno
   diverso). Settimana 22–28 mar: 1 parlante (B24). Lettera: no (1 < 3 dall'ultima). Sogno: **spento** (21 < 50).
   Ritratto: prossimo 1 maggio. Conti per mese (importati esclusi): nov 10 · dic 4 · gen 1 · feb 1 · mar 5.
2. **nodi** (estratto): `kintsugi · tema · kintsugi · ✦1 ◌1 ●0 · 2026-12-05–2027-03-20 · no` ·
   `il-mondo-spezza-tutti · citazione · ✦1 · 2026-12-05 · esito verificata` · `chi-ha-un-perche · citazione · ✦1 · 2026-11-26 · esito errata (~Friedrich Nietzsche)` ·
   `nel-mezzo-dell-inverno · citazione · ✦1 · 2026-11-22 · esito verificata` · `tatuaggi · raccolta · ✦2 (B07, B23)`.
4. **parole candidate**: crepa (20 mar, 1 giorno), luce (20 mar, 1), mare (16 nov, 3 feb: 2), padre (16 nov, 1 mar: 2). Nessuna vicenda.
6. **tensioni**: `20270308-2340-r2d6` contraddice ◌ `20261004-0000-u03` (8 mar 2027 / entro 4 ott 2026).
9. **nomi senza nodo**: ~Ernest Hemingway (B11), ~Leonard Cohen (r-20270320-2231-risposta#2), ~Friedrich Nietzsche (B09), ~Kintsugi (r-20261004-0000-eredita-kintsugi#1 → collegato al tema `kintsugi`).
10. **ricordabili**: nessuno. Giorni attivi dopo ciascun frammento (soglia 60): B01 20, B07 14, B11 10, B23 1.
11. **seme già usato** e **immagini già usate**: come al §4.

Come: conteggio con uno script su questa tabella (date distinte dei parlanti; giorni attivi successivi = date di
parlanti strettamente posteriori).

### Uscita

Canale (v3 §7.3, §16.1): sessione **Specchio** su Claude Code, aperta da lui; `ingresso/` vuoto, lucchetto libero.
Nessuna notifica.

#### Sul telefono

> **[22:00] cosa ho sul rompersi e sul ripararsi? anche fuori da me**

1. ✦ 22 nov: *nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei*
2. ✦ 5 dic: *chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi*
3. ✦ 20 mar: *ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su qualcosa di rotto*
4. ◌ Kintsugi, scheda dell'Atlante (4 ott): l'oro lascia in vista la frattura. La 2 e la 3 come un'idea sola: lettura mia.
5. ○ Hemingway, *Addio alle armi* (1929), cap. 34: «The world breaks every one and afterward many are strong at the broken places». Per te: è la 2; poi: chi non si spezza, il mondo lo uccide.
6. ○ Nietzsche, *Crepuscolo degli idoli* (1889), «Sentenze e frecce» §8: ciò che non mi uccide mi rende più forte (resa mia). Per te: la 2 senza crepa; al §12 c'è la frase che il 26 nov davi a Frankl.

Vuoi il resto?

#### File

`restituzioni/2027/03/r-20270325-2206-risposta.md`

```md
---
schema: 3
letto-da: <modello>
registrato: 2027-03-25T22:06:00+01:00
forma: risposta
per: 20270325-2200-syn1
voci:
  - {n: 1, rif: 20261122-1720-h6r4, voce: sua, cosa: citazione, turno: "22:00"}
  - {n: 2, rif: 20261205-1840-c7n5, voce: sua, cosa: citazione, turno: "22:00"}
  - {n: 3, rif: 20270320-2230-u5g2, voce: sua, cosa: idea, turno: "22:00"}
  - {n: 4, rif: kintsugi, voce: proposta, cosa: convergenza, turno: "22:00"}
  - {n: 5, rif: il-mondo-spezza-tutti, voce: mondo, cosa: citazione, turno: "22:00"}
  - {n: 6, rif: "~Friedrich Nietzsche", voce: mondo, cosa: citazione, turno: "22:00"}
legami:
  - {p: converge-con, tra: [20261205-1840-c7n5, "r-20270325-2206-risposta#6"], voce: proposta, perche: "più forti dopo la rottura: nella frase del 5 dicembre si vedono i punti rotti, in Nietzsche §8 no"}
---
1. ✦ 22 nov: *nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei*
2. ✦ 5 dic: *chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi*
3. ✦ 20 mar: *ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su qualcosa di rotto*
4. ◌ Kintsugi, scheda dell'Atlante (4 ott): l'oro lascia in vista la frattura. La 2 e la 3 come un'idea sola: lettura mia.
5. ○ Hemingway, *Addio alle armi* (1929), cap. 34: «The world breaks every one and afterward many are strong at the broken places». Per te: è la 2; poi: chi non si spezza, il mondo lo uccide.
6. ○ Nietzsche, *Crepuscolo degli idoli* (1889), «Sentenze e frecce» §8: ciò che non mi uccide mi rende più forte (resa mia). Per te: la 2 senza crepa; al §12 c'è la frase che il 26 nov davi a Frankl.

Vuoi il resto?
```

#### Altri file scritti

- `frammenti/2027/03/20270325-2200-syn1.md` (sigillato a fine sessione, via `smista.mjs`):
  ```md
  ---
  registrato: 2027-03-25T22:00:00+01:00
  canale: chat
  sintetico: true
  ---
  [22:00] cosa ho sul rompersi e sul ripararsi? anche fuori da me
  ```
- `letture/2027/03/20270325-2200-syn1.md`: `schema: 3`, `versione: 1`, `letto-da`, `prompt`, `intento: [chiedi]`,
  `legami: []`, `parole: [rompersi, ripararsi]`, `risposta: r-20270325-2206-risposta`.
- `contesto/` rigenerato da `contesto.mjs` (`fino-a: 20270325-2200-syn1`): parlanti 22, giorni attivi 22, domande 1
  (conti a parte); `recenti.md` con la restituzione nuova; in `mappa.md` §9 il nome ~Friedrich Nietzsche cita anche
  `r-20270325-2206-risposta#6`.
- Lucchetto `ingresso/.in-corso` preso e tolto nel commit finale; `verifica.mjs` prima del push. Nessun altro file cambia.

### Giudizio (giudice cieco)

#### Deterministici
| criterio | esito | prova |
|---|---|---|
| D1 | passa | La domanda è il frammento `20270325-2200-syn1` (canale chat, sintetico); file `forma: risposta`, `per: 20270325-2200-syn1`. |
| D2 | passa | Righe 1–3 ✦, poi 4 ◌, poi 5–6 ○: nessun ✦ dopo il primo ○. Un solo segno per riga. |
| D3 | passa | B11 (5 dic) e B23 (20 mar) identici al banco (grep esatto, 1 occorrenza ciascuno). Riga 5: «○ Hemingway, *Addio alle armi* (1929), cap. 34». |
| D4 | passa | Cohen non compare: nessun verso. |
| D5 | passa | B07 (22 nov, riga 1) e Nietzsche §8/§12 non sono nelle ultime 4 restituzioni. |
| D6 | passa | 6 righe numerate, poi "Vuoi il resto?". |

#### Trasversali
- **X1 passa.** B07, B11, B23 sono sottostringhe verbatim (refusi compresi) con data giusta (22 nov, 5 dic, 20 mar). B07 è citato dal "nel mezzo…" in poi, cioè tagliato a inizio frase ma esatto. Riga 4 (◌) porta la data del punto zero (4 ott).
- **X2 passa.** Ogni riga ha il suo segno. Fatti ○ verificati: Hemingway, *A Farewell to Arms* (1929), cap. XXXIV, "every one" in due parole e seconda metà "But those that will not break it kills". Nietzsche, *Götzen-Dämmerung* (scritto 1888, uscito 1889), "Sprüche und Pfeile" §8 (*Was mich nicht umbringt…*) e §12 (*Warum/Wie*): corretti. "resa mia" segnala la parafrasi. Nessun testo di canzone.
- **X3 passa.** Nessuna parola di lode né clinica nel testo.
- **X4 passa.** B12 e gli altri delicati non compaiono.
- **X5 passa con riserve minori.** Nome file `r-20270325-2206-risposta.md` in `restituzioni/2027/03/`, forma giusta. Voci 1–6 numerate con rif (id, slug `kintsugi`, slug `il-mondo-spezza-tutti`, `~Friedrich Nietzsche`); legame con `perche`. Nessun frammento, nucleo o restituzione precedente cambia: l'unico frammento nuovo è la domanda, in `frammenti/`. Riserve: `letto-da: <modello>` è un segnaposto; l'uscita dice "sessione Specchio su Claude Code" mentre la domanda è "chat del Progetto" (e il frammento è `canale: chat`): incoerenza di descrizione, non di criterio.
- **X6 passa.** Nessun conto "da novembre" con importati; il ◌ kintsugi porta 4 ott.

#### Giudice AI (tre passate indipendenti, maggioranza)
1. A colpo d'occhio che cosa è suo e che cosa no? **Sì, sì, sì.** Segni ✦ ◌ ○ in testa a ogni riga, ✦ tutti prima; la riga 4 dichiara "lettura mia".
2. Il mondo aggiunge qualcosa che lui non aveva? **Sì, sì, sì.** Hemingway porta la seconda metà ("chi non si spezza, il mondo lo uccide"); Nietzsche porta la variante senza crepa.
3. Ogni voce del mondo dice perché è lì per lui? **Sì, sì, sì.** Riga 5 "Per te: è la 2", riga 6 "Per te: la 2 senza crepa". Il "perché" della riga 5 è però un po' più debole nella seconda parte (la morte di chi non si spezza non è collegata a lui).
4. È la lista di un motore di ricerca qualunque? (deve essere no) **No, no, no.** Le voci sono agganciate ai suoi frammenti e alle date; la scelta di §12 rimanda al suo Frankl del 26 nov. (Nietzsche §8 è però il risultato più ovvio per "rompersi".)

Soglia 3/4 con la 1 obbligatoria: raggiunta (4/4).

#### Esito
**Uscita A: passa.** Nessun criterio fallito.

#### A pancia
Sul telefono è pulita e si legge in dieci secondi: piace il suo parlato tenuto crudo davanti e il mondo ridotto a due righe. Stona un po' la riga 6, che infila anche Frankl (un'altra pista) in una riga già densa, e la riga 4 che mescola scheda ◌ e "lettura mia"; l'inglese di Hemingway non tradotto è un attrito da telefono.

## R10 · Archivio scarno: due messaggi

### Preparazione

Stato: punto zero (importazione dall'Atlante) + B01 + B02, tutti e due già passati da "smista" (modello v3 §13.2, §13.4).
Nient'altro: nessun altro frammento, nessuna lettera, nessun ritratto dopo il punto zero, nessun frammento sintetico.

#### 1. Frammenti

##### 1.1 Da novembre (non importati)

| id | registrato | canale | voce | delicato | testo verbatim |
|---|---|---|---|---|---|
| `20261103-2340-k7q2` | 2026-11-03T23:40:12+01:00 | telefono | ✦ | no | ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante |
| `20261104-0812-b3n8` | 2026-11-04T08:12+01:00 | telefono | ✦ | no | ah e la frase dell'ospite era verso la fine, quando parlava dei greci |

Letture v1 (v3 §3.3 e §13.4):
- `letture/2026/11/20261103-2340-k7q2.md`: `intento: [salva]`; `reazione: [{parole: "molto interessante", verso: "+"}]`;
  legami `nomina` umberto-galimberti ✦, `nomina` spettacolo-sulle-emozioni ✦, `nomina` il-nichilismo-e-l-ospite-inquietante ✦,
  `parla-di` nichilismo ✦; `parole: [ragazzi, cultura]`; `risposta: r-20261103-2341-risposta`.
- `letture/2026/11/20261104-0812-b3n8.md`: `intento: [salva]`; `ritorna-su: 20261103-2340-k7q2, come: aggiunge` ✦;
  `nomina` il-nichilismo-e-l-ospite-inquietante con `momento: "verso la fine"` ✦; `parole: [greci]`; `risposta: salvato`.

Nodi nati da B01 (v3 §3.4): `persone/umberto-galimberti.md` (`cerchia: mondo`), `opere/spettacolo-sulle-emozioni.md`,
`citazioni/il-nichilismo-e-l-ospite-inquietante.md` (`autore: "~Friedrich Nietzsche"`, `attribuita-a: [umberto-galimberti]`,
**senza `esito`**: ⚠). Nessun nodo `nietzsche`. `nichilismo` esisteva già (nato dallo sguardo).

##### 1.2 Punto zero (importati, `canale: importato`, fuori dai conti)

Testi come in `_progetto/v2/simulazione/importazione.md` (commit del repository). Tutti `registrato` con la sola data.

| id | voce | delicato |
|---|---|---|
| `20261004-0000-u01` … `u26`, `u28` (u26 diviso in `u26a`/`u26b`, v3 §14 R1) | ✦ `sua` | no |
| `20261005-0000-u27`, `20261006-0000-u29`, `20261007-0000-u30`, `20261031-0000-u31` | ✦ `sua` | no |
| `20261004-0000-s03` (racconto d'origine, `intento: [niente]`) | ✧ `seme` | no |
| `20261005-0000-s01` (il nucleo, `intento: [sguardo]`) | ✧ `seme` | no |
| `20261005-0000-s04` (tensioni, virtù e fortuna, evoluzione; testo non presente nella simulazione) | ✧ `seme` | no |

Passo del nucleo che conta (`20261005-0000-s01`, sezione "Dove sono ora", link resi in testo):

> In uno stadio assurdista, alla Camus. Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo. Vedi l'assurdo.

Nessun frammento importato ✦ (U1–U31) contiene la parola "nichilismo" (`grep -i nichilismo` sulla simulazione: solo `s01`
e il `nato-da` del tema). Tema `temi/nichilismo.md`: `nato-da: [20261005-0000-s01, 20261004-0000-s03]`, solo voce seme.

#### 2. Restituzioni precedenti

- Le restituzioni `eredita` del punto zero (convergenze, idee, citazioni, domande: ~60, v3 §14), tutte fuori dai conti.
- `restituzioni/2026/11/r-20261103-2341-risposta.md` (v3 §13.2), `per: 20261103-2340-k7q2`, voci:
  `{n: 1, rif: il-nichilismo-e-l-ospite-inquietante, voce: mondo, cosa: citazione}`,
  `{n: 2, rif: spettacolo-sulle-emozioni, voce: mondo, cosa: domanda}`. Corpo:
  > **Salvato.** 1. "L'ospite inquietante" è un'immagine di Nietzsche ○; Galimberti ci ha scritto un libro ○.
  > 2. Lo spettacolo era *Il mondo delle emozioni*? ⚠

  Nessuna replica alla domanda 2 (B02 non risponde sul titolo).
- B02: nessun file di risposta (`risposta: salvato`, C11).
- Nessuna lettera (la prima domenica utile è l'8 novembre), nessun ritratto dopo il punto zero.

#### 3. Registro dei richiami

Vuoto: nessun "ti ricordi?" usato, nessun seme già usato da una lettera, nessuna immagine già usata.
Nessun atto (`accoglie`, `rifiuta`, `corregge`) da novembre.

#### 4. Estratto di `contesto/mappa.md` (rigenerato da `contesto.mjs` dopo B02)

```yaml
aggiornato: 2026-11-04T08:15:40+01:00
fino-a: 20261104-0812-b3n8
```

1. **stato**
   - giorni attivi totali: **2** (3 nov, 4 nov)
   - frammenti parlanti totali: **2**; della settimana (lun 2 – dom 8 novembre): **2**
   - lettera: **no** (2 frammenti parlanti dall'ultima lettera, soglia ≥ 3)
   - sogno: **spento** (2 < 50)
   - ritratto: **no** (novembre: 2 < 10)
2. **nodi** (da novembre): `umberto-galimberti · persona · Umberto Galimberti · ✦1 · 2026-11-03`;
   `spettacolo-sulle-emozioni · opera · spettacolo sulle emozioni · ✦1 · 2026-11-03`;
   `il-nichilismo-e-l-ospite-inquietante · citazione · ✦2 · 2026-11-03–2026-11-04`;
   `nichilismo · tema · ✦1 (+ ✧ importati) · 2026-11-03`. Nessuna vicenda.
4. **parole candidate**: `ragazzi` (3 nov, 1 giorno), `cultura` (3 nov, 1 giorno), `greci` (4 nov, 1 giorno).
5. **conti** (importati esclusi): novembre ✦ 2, ✧ 0, ● 0; reazioni 1 (+, "molto interessante"); dopo le 22: 1 (B01, 23:40);
   raccolte: 0; domande: 0.
6. **posizioni e tensioni**: nessun `contraddice`.
7. **fruizioni**: nessuna.
8. **correzioni e rifiuti**: nessuno.
10. **ricordabili**: nessuno (nessun ✦ oltre 60 giorni attivi).
11. **seme già usato**: nessuno; **immagini già usate**: nessuna.
12. **voce**: Q-citato e Q-ancore non calcolabili (nessuna lettera, nessun ritratto); ritornelli 0.

Come si calcolano: giorno attivo = giorno con ≥ 1 frammento parlante non importato (v3 §6.2); parlante = intento non solo
`niente` e ≥ 3 parole sue tolti i link (B01: 33 parole, B02: 13 parole, entrambi `intento: [salva]`); i conti escludono
`canale: importato` e le restituzioni `eredita`; soglie da v3 §7.6. Nessun memo in `ingresso/` la sera del 5 novembre.

### Uscita

Sessione Specchio (Claude Code sul repository), aperta da lui il 2026-11-05 alle 22:00. `ingresso/` vuoto: nessun "smista".
Nessuna notifica.

#### Sul telefono

Lui scrive: *cosa dice di me quello che salvo?*

Risposta:

> Da novembre, due messaggi tuoi (3 e 4 novembre), tutti e due sullo stesso *spezzone di galimberti* ✦: è presto per dire che cosa dicono di te (conto di `mappa.md`).
> 1. Il 3 novembre: *diceva che il nichilismo è l'ospite inquietante* ✦.
> Nel nucleo, entro il 5 ottobre, nell'archivio d'origine: *Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo.* ✧
> Lì il nichilismo è un ospite, nelle parole di Galimberti riferite da te; nel nucleo è un no ◌.

#### File

##### `frammenti/2026/11/20261105-2200-r4m8.md`

```md
---
registrato: 2026-11-05T22:00:31+01:00
canale: chat
---
[22:00] cosa dice di me quello che salvo?
```

##### `letture/2026/11/20261105-2200-r4m8.md`

```yaml
---
schema: 3
versione: 1
letto-da: claude-opus-5-5
prompt: 8c41d0e
intento: [chiedi]
legami: []
risposta: r-20261105-2202-risposta
---
```

##### `restituzioni/2026/11/r-20261105-2202-risposta.md`

```md
---
schema: 3
letto-da: claude-opus-5-5
registrato: 2026-11-05T22:02:47+01:00
forma: risposta
per: 20261105-2200-r4m8
voci:
  - {n: 1, rif: nichilismo, voce: proposta, cosa: ponte, turno: "22:00"}
legami:
  - p: converge-con
    tra: [20261103-2340-k7q2, 20261005-0000-s01]
    voce: proposta
    perche: "la stessa parola in due direzioni: nel memo del 3 novembre il nichilismo è l'ospite di Galimberti, riferito da lui; nel nucleo è un no («Non nichilismo»)"
---
Da novembre, due messaggi tuoi (3 e 4 novembre), tutti e due sullo stesso *spezzone di galimberti* ✦: è presto per dire che cosa dicono di te (conto di `mappa.md`).
1. Il 3 novembre: *diceva che il nichilismo è l'ospite inquietante* ✦.
Nel nucleo, entro il 5 ottobre, nell'archivio d'origine: *Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo.* ✧
Lì il nichilismo è un ospite, nelle parole di Galimberti riferite da te; nel nucleo è un no ◌.
```

##### Altri file

- `contesto/` rigenerato da `contesto.mjs` (`aggiornato: 2026-11-05T22:03`, `fino-a: 20261105-2200-r4m8`): in `mappa.md`
  giorni attivi 3, frammenti parlanti (salvataggi) 2, domande 1 (a parte), soglie invariate (lettera no, sogno spento,
  ritratto no); `recenti.md` aggiunge il frammento di chat e la restituzione.
- Lucchetto `ingresso/.in-corso` preso e tolto nel commit finale; commit "specchio del 2026-11-05: 0 memo, 1 domanda".
- Nessun nodo nuovo, nessun frammento o restituzione precedente toccato.

### Giudizio (giudice cieco)

Esito: **passa**.

#### Deterministici

| criterio | esito | prova |
|---|---|---|
| D1 numero 2 / "due", senza punto zero | passa | "Da novembre, due messaggi tuoi (3 e 4 novembre)". Il conteggio non include i frammenti importati (nel corpo non compare "3" né "giorni attivi"). |
| D2 nessuna parola vietata | passa | grep -i su spesso, sempre, tendi, di solito, ricorrente, ti interessa molto: 0 risultati (rc=1). |
| D3 ✧ distinto da ✦; ≤ 4 righe; ≤ 1 "?" | passa | Corpo della risposta: 4 righe (Da novembre… / 1. Il 3 novembre… / Nel nucleo… / Lì il nichilismo…). ✦ sulle sue parole di novembre, ✧ solo sul passo del nucleo. "?" nel corpo: 0 (i 2 "?" del file sono la sua domanda e il frammento). |
| D4 `forma: risposta`; domanda salvata come frammento | passa | `forma: risposta`, `per: 20261105-2200-r4m8`; `frammenti/2026/11/20261105-2200-r4m8.md` con "[22:00] cosa dice di me quello che salvo?". |

#### Trasversali

| criterio | esito | prova |
|---|---|---|
| X1 verbatim con data | passa | "spezzone di galimberti" e "diceva che il nichilismo è l'ospite inquietante" sono alla lettera nel B01 (banco, riga 47, minuscole comprese); "Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo." è alla lettera in importazione.md (riga 1270, link tolti). Date: "3 novembre"; il nucleo "entro il 5 ottobre", dentro 4–7 ottobre. Il testo della Preparazione coincide con la fonte. |
| X2 voce su ogni riga; fatti ○ con fonte | passa | Ogni riga porta un segno (✦, ✦, ✧, ◌). Nessun fatto ○ affermato, nessun testo di canzone. Nulla da verificare sul web. |
| X3 niente lode né diagnosi | passa | Grep sui termini vietati: 0 risultati. "è presto per dire che cosa dicono di te" è neutro. |
| X4 delicati fuori | passa | Nessun frammento delicato in archivio né citato; nessuna lettera, "ti ricordi?", sogno o ritratto. |
| X5 file, voci, legami, diff | passa, con riserva | Nome `r-20261105-2202-risposta.md` corretto; `voci` numerate (1 voce, `rif: nichilismo`) e `legami` con `perche`. Il diff è solo in `frammenti/` (file nuovo, richiesto da D4), `letture/`, `restituzioni/`, `contesto/`. Riserve non bloccanti: le `voci` coprono una sola riga di 4 (la Preparazione di B01 ne numerava una per citazione); il legame è `converge-con` mentre il perche descrive "due direzioni" opposte, che somiglia a un `contraddice` (ma la Preparazione dice "nessun contraddice" e una proposta tra ✦ e ✧ non è un'opposizione del suo). |
| X6 importati fuori dai conti | passa | "Da novembre, due messaggi" esclude il punto zero; il ✧ è datato "entro il 5 ottobre". |

Divergenze dichiarate in §16.2: nessuna toccata da questa prova.

#### Giudice AI (3 passate indipendenti)

1. **Dice chiaramente che è poco?** Sì, sì, sì. "due messaggi… sullo stesso spezzone… è presto per dire che cosa dicono di te."
2. **Gli attribuisce un tratto di carattere?** No, no, no (esito richiesto: no). Riporta solo due frasi, una sua e una del nucleo; "nel nucleo è un no ◌" riguarda il nucleo, è marcato come proposta e non dice come è lui.
3. **Lascia comunque una cosa vera invece di niente?** Sì, sì, sì. L'ospite inquietante ✦ accanto a "Non nichilismo" ✧, con le voci separate: è proprio la cosa piccola attesa dalla prova.

Soglia (1 e 2 obbligatorie): raggiunta.

#### A pancia

Sul telefono è breve e onesta, e la frase "è presto" regge. Stonano due cose: "(conto di `mappa.md`)" è gergo da repository in una risposta da telefono, e "nel nucleo, entro il 5 ottobre, nell'archivio d'origine" è un giro lungo per dire "nel tuo nucleo". Anche "Lì il nichilismo è un ospite… nel nucleo è un no" è un po' criptico: quel "Lì" non si aggancia bene.

## R11 · Il rifiuto, e la lettera dopo

### Preparazione

Archivio: punto zero (importazione del 4–7 ottobre 2026, `simulazione/importazione.md`) + B01–B09 + un frammento e due
restituzioni sintetiche. I B10–B25 non esistono. Fuso orario Europe/Rome (+01:00).

#### 1. Frammenti dopo il punto zero

| id | registrato | canale | voce | delicato | testo (verbatim) |
|---|---|---|---|---|---|
| 20261103-2340-k7q2 | 2026-11-03T23:40+01:00 | telefono | ✦ | no | ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante |
| 20261104-0812-b3n8 | 2026-11-04T08:12+01:00 | telefono | ✦ | no | ah e la frase dell'ospite era verso la fine, quando parlava dei greci |
| 20261109-1902-m4c1 | 2026-11-09T19:02+01:00 | telefono | ✦ | no | jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato |
| 20261111-1945-t8w3 | 2026-11-11T19:45+01:00 | telefono | ✦ | no | ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto |
| 20261116-2300-p2x9 | 2026-11-16T23:00+01:00 | telefono | ✦ | no | galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto |
| 20261120-1244-d5j7 | 2026-11-20T12:44+01:00 | telefono | ✦ | no | marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina |
| 20261122-1720-h6r4 | 2026-11-22T17:20+01:00 | telefono | ✦ | no | camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei |
| 20261123-0815-syn1 | 2026-11-23T08:15+01:00 | telefono | ✦ | no | no. l'estate di camus non viene dopo l'inverno, c'era già dentro. non è dolore superato |
| 20261124-2350-z1v8 | 2026-11-24T23:50+01:00 | telefono | ✦ | no | marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso |
| 20261126-0905-q9e2 | 2026-11-26T09:05+01:00 | telefono | ✦ | no | frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente |

`20261123-0815-syn1` ha `sintetico: true`. Nessun frammento è `delicato`.

##### Letture rilevanti (v1, "smista")

- `letture/2026/11/20261122-1720-h6r4.md`: `nomina` della citazione `nel-mezzo-dell-inverno-un-estate-invincibile`
  (voce sua, `perche: "«camus nella peste diceva tipo nel mezzo dell'inverno…»"`), `serve-a: tatuaggi` (voce sua,
  `perche: "«questa me la tatuerei»"`); `reazione: [{parole: "questa me la tatuerei", verso: "+"}]`;
  `risposta: r-20261122-1722-risposta`. Nodo citazione: `autore: camus`, nessun `esito` (⚠), la *Peste* solo nel frammento.
- `letture/2026/11/20261123-0815-syn1.md` (sintetica):
  ```yaml
  schema: 3
  versione: 1
  intento: [salva]
  legami:
    - {p: ritorna-su, a: r-20261122-2100-lettera, n: 1, come: rifiuta, voce: sua,
       perche: "«no. l'estate di camus non viene dopo l'inverno, c'era già dentro. non è dolore superato»"}
  risposta: r-20261123-0816-risposta
  ```
- `letture/2026/11/20261124-2350-z1v8.md`: `nomina: marco` (voce sua), `parla-di: battaglie-interiori` (voce proposta,
  `perche`: parole di Marco, concetto suo da U1); reazioni "non l'ho presa bene" (−), "ci ha preso" (+).
- `letture/2026/11/20261126-0905-q9e2.md`: `nomina: uno-psicologo-nei-lager` con `fruizione: in-corso`;
  `nomina: viktor-frankl` (`perche: "«frankl:»"`); `nomina` della citazione `chi-ha-un-perche-per-vivere`
  (`attribuita-a: viktor-frankl`, nessun `esito`, ⚠).

#### 2. Punto zero: i testi che contano (da `simulazione/importazione.md`)

- `20261004-0000-u01` (`canale: importato`, `voce: sua`, ✦, entro il 4 ottobre), verbatim:
  > battaglie interiori, solitudine, senso di vuoto, apatia, dolore, rabbia, risentimento. Percorso, avventura, musica, caos, libertà, gioia, vincere se stessi. Consapevolezza, pace interiore nel guardare alle battaglie interiori e alle versioni di me morte lungo il percorso, innalzarsi a una dimensione superiore. Assurdità dell'essenza stessa della vita, calma nell'esplorarne i concetti data dall'immensità del dolore superato.
- `20261005-0000-s01` (nucleo, `voce: seme`, ✧): contiene la stessa riga come copia ("Il mio percorso interiore, con le
  mie parole"); per v3 §4 (A3) e §16.2 la copia non genera legami: la fonte è U1 ✦. Nodo `camus` dal nucleo
  ("In uno stadio assurdista, alla Camus").
- Restituzioni `eredita` del punto zero: invariate, fuori dai conti; nessuna è citata qui.

#### 3. Restituzioni dopo il punto zero

Risposte all'ingresso (`forma: risposta`, una per frammento, testo del banco):

| id | per | testo |
|---|---|---|
| r-20261103-2341-risposta | k7q2 | Salvato. L'ospite inquietante è di Nietzsche ○; Galimberti ne ha fatto il titolo di un libro (2007) ○. Lo spettacolo era *Il mondo delle emozioni*? ⚠ |
| r-20261104-0813-risposta | b3n8 | Aggiunto allo spezzone di ieri. |
| r-20261109-1903-risposta | m4c1 | Salvata. Così non sembra letterale ⚠: è vicina ad *Aion* §126. Ti metto accanto il passo vero quando l'ho controllato. |
| r-20261111-1946-risposta | t8w3 | La 3 è *[titolo dalla tracklist]*, giusto? |
| r-20261116-2301-risposta | p2x9 | È più probabile Recalcati ○: *Il complesso di Telemaco* (2013) è suo. Correggo? |
| r-20261120-1245-risposta | d5j7 | Salvata con la tua reazione. Non risulta di Camus ○, autore ignoto. |
| r-20261122-1722-risposta | h6r4 | Bella, ed è sua, ma non è nella *Peste*: è *Ritorno a Tipasa*, nell'*Estate* (1954) ⚠. |
| r-20261123-0816-risposta | syn1 | Tolta: non te la ripropongo per l'estate di Camus. |
| r-20261124-2351-risposta | z1v8 | Salvato. 'Battaglie interiori' è una tua parola dal 4 ottobre ✦ (riportata dal seme). |
| r-20261126-0906-risposta | q9e2 | La frase è di Nietzsche ⚠ (*Crepuscolo degli idoli*), Frankl la cita. Segno il libro in lettura. |

Lettera sintetica (l'unica lettera dopo il punto zero), `restituzioni/2026/11/r-20261122-2100-lettera.md`
(nel banco `r-20261122-2100-settimana`; `sintetico: true`):

```yaml
---
schema: 3
letto-da: <modello>
registrato: 2026-11-22T21:00:00+01:00
forma: lettera
voci:
  - {n: 1, rif: 20261122-1720-h6r4, voce: proposta, cosa: convergenza}
legami:
  - {p: converge-con, tra: [20261122-1720-h6r4, 20261004-0000-u01], voce: proposta,
     perche: "l'estate invincibile come la calma che viene dopo il dolore superato: l'estate dopo l'inverno"}
---
Oggi: *nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei* ✦.

1 · Mi pare la stessa cosa che entro il 4 ottobre chiamavi *calma nell'esplorarne i concetti data dall'immensità del dolore superato* ✦: l'estate che viene dopo l'inverno ◌.

✦ tue · ◌ mie
```

(Il banco segna la frase di U1 come nucleo ✧; per v3 §16.2 è ✦ importata, U1.)

#### 4. Registro dei richiami ("ti ricordi?")

Vuoto: nessun ricordo usato.

#### 5. Estratto di `contesto/mappa.md` (rigenerato dopo l'ultima "smista", 2026-11-26)

```yaml
aggiornato: 2026-11-26T09:07:40+01:00
fino-a: 20261126-0905-q9e2
```

1. **stato**: giorni attivi 10 · frammenti parlanti 10 (settimana 23–29 nov: 3) · parlanti dall'ultima lettera
   (r-20261122-2100-lettera): 3 → lettera **sì** (soglia ≥ 3) · sogno **spento** (10 < 50) · ritratto: novembre 10
   parlanti → sì il 1° dicembre (soglia ≥ 10).
6. **posizioni e tensioni**: nessun `contraddice`.
7. **fruizioni**: in corso: `uno-psicologo-nei-lager` (2026-11-26).
8. **rifiuti**:
   `r-20261122-2100-lettera#1 · converge-con [20261122-1720-h6r4 ↔ 20261004-0000-u01] · rifiutato 2026-11-23
   (20261123-0815-syn1) · contesto: camus, estate, dolore superato · «non è dolore superato»`.
   Correzioni applicate: nessuna (B05 senza sì).
10. **ricordabili**: nessuno (nessun frammento ✦ oltre 60 giorni attivi; il più vecchio ne ha 10). Ricordi usati: nessuno.
11. **seme già usato**: nessun nodo (la lettera del 22 si appoggia a U1 ✦, non al ✧). **Immagini già usate**: nessuna
    parola rara nata in una restituzione e assente dai ✦ (le parole proprie delle restituzioni sono nomi di riferimento:
    Recalcati, Tipasa, Aion, tracklist).

**Come sono calcolati** (script `calc.py` usato per la prova, regole v3 §3.3 e §6.2): parlante = intento non solo
`niente` e ≥ 3 parole tolti i link; tutti e 10 i frammenti lo sono. Giorno attivo = giorno con ≥ 1 parlante non
importato: 3, 4, 9, 11, 16, 20, 22, 23, 24, 26 novembre = 10. Dall'ultima lettera (22 nov 21:00): syn1, z1v8, q9e2 = 3.
Gli importati sono esclusi da tutti i conti.

#### 6. Nodi toccati (estratto)

`camus` (persona, punto zero) · `marco` (persona, `cerchia: vita`, da B06) · `viktor-frankl` (persona) ·
`uno-psicologo-nei-lager` (opera, `autore: viktor-frankl`) · `nel-mezzo-dell-inverno-un-estate-invincibile`
(citazione, `autore: camus`, senza esito) · `chi-ha-un-perche-per-vivere` (citazione, `attribuita-a: viktor-frankl`,
senza esito) · `battaglie-interiori` (tema, punto zero) · `tatuaggi` (raccolta).

### Uscita

#### Sul telefono

Domenica 29 novembre 2026, 17:37 (Routine "lettera").

Notifica:

> La lettera è pronta

Messaggio (la lettera):

> 1 · Il 23 novembre: *l'estate di camus non viene dopo l'inverno, c'era già dentro* ✦.
>
> 2 · Camus, «Retour à Tipasa», in L'Été (1954): «il y avait en moi un été invincible», c'era in me (resa mia) ○.
>
> 3 · Il 26 hai trascritto da Frankl «chi ha un perché per vivere sopporta quasi ogni come» ✦: è di Nietzsche, Crepuscolo degli idoli (1889), «Sentenze e frecce» 12, e Frankl la cita ○.
>
> 4 · Mi pare che le due frasi guardino lo stesso punto da lati opposti ◌: in Camus quello che regge si trova d'inverno, ed era già lì; in Nietzsche il perché va avuto prima, ed è lui che rende sopportabile il come.
>
> 5 · E il 26, di tuo: *sto leggendo uno psicologo nei lager finalmente* ✦.
>
> ✦ tue · ◌ mie · ○ mondo

#### File

`restituzioni/2026/11/r-20261129-0331-lettera.md` (scritto da "consolida", passo 6; consegnato da "lettera" alle 17:37)

```md
---
schema: 3
letto-da: <modello>
registrato: 2026-11-29T03:31:00+01:00
forma: lettera
copre: [20261123-0815-syn1, 20261124-2350-z1v8, 20261126-0905-q9e2]
voci:
  - {n: 1, rif: 20261123-0815-syn1, voce: sua, cosa: idea}
  - {n: 2, rif: nel-mezzo-dell-inverno-un-estate-invincibile, voce: mondo, cosa: citazione}
  - {n: 3, rif: chi-ha-un-perche-per-vivere, voce: mondo, cosa: citazione}
  - {n: 4, rif: 20261123-0815-syn1, voce: proposta, cosa: convergenza}
  - {n: 5, rif: uno-psicologo-nei-lager, voce: sua, cosa: libro}
legami:
  - p: converge-con
    tra: [20261123-0815-syn1, chi-ha-un-perche-per-vivere]
    voce: proposta
    perche: "«c'era già dentro» e il perché che rende sopportabile il come: in Camus ciò che regge si scopre nell'inverno, in Nietzsche va avuto prima"
---
1 · Il 23 novembre: *l'estate di camus non viene dopo l'inverno, c'era già dentro* ✦.

2 · Camus, «Retour à Tipasa», in L'Été (1954): «il y avait en moi un été invincible», c'era in me (resa mia) ○.

3 · Il 26 hai trascritto da Frankl «chi ha un perché per vivere sopporta quasi ogni come» ✦: è di Nietzsche, Crepuscolo degli idoli (1889), «Sentenze e frecce» 12, e Frankl la cita ○.

4 · Mi pare che le due frasi guardino lo stesso punto da lati opposti ◌: in Camus quello che regge si trova d'inverno, ed era già lì; in Nietzsche il perché va avuto prima, ed è lui che rende sopportabile il come.

5 · E il 26, di tuo: *sto leggendo uno psicologo nei lager finalmente* ✦.

✦ tue · ◌ mie · ○ mondo
```

#### Altri file scritti da "consolida" (stessa notte)

- `citazioni/nel-mezzo-dell-inverno-un-estate-invincibile.md`: `esito: simile` (opera sbagliata nel frammento),
  `riferimento: "«Retour à Tipasa», L'Été (1954), ultima frase; secondaria; 2026-11-29"`,
  `originale: "Au milieu de l'hiver, j'apprenais enfin qu'il y avait en moi un été invincible."`,
  `traduzione: resa di Claude`. Il frammento B07 non cambia.
- `citazioni/chi-ha-un-perche-per-vivere.md`: `autore: ~Friedrich Nietzsche`, `attribuita-a: viktor-frankl`, `esito: errata`,
  `riferimento: "Götzen-Dämmerung (1889), «Sprüche und Pfeile» 12; primaria (Gutenberg #7203); 2026-11-29"`,
  `originale: "Hat man sein warum? des Lebens, so verträgt man sich fast mit jedem wie?"`, `traduzione: resa di Claude`.
- `riserva/ritorno.md` riscritto (una cosa sola, non legata al rifiuto).
- `contesto/` rigenerato da `contesto.mjs`: in `mappa.md` sezione 1 "parlanti dall'ultima lettera: 0"; sezione 8 il
  rifiuto del 23 novembre invariato; sezione 11 nessun seme usato.
- Non toccati: `r-20261122-2100-lettera`, la lettura e il frammento `20261123-0815-syn1`, la voce di rifiuto in `mappa.md`.
- Commit "Consolidamento della settimana 2026-11-29".

### Giudizio (giudice cieco)

#### Deterministici
| criterio | esito | prova |
|---|---|---|
| D1 file `r-20261129-HHMM-settimana.md`; nessun `converge-con` B07↔nucleo | passa | file `r-20261129-0331-lettera.md`: "settimana" → "lettera" è divergenza dichiarata (§16.2/§ forma: lettera). Unico `converge-con` è tra `20261123-0815-syn1` e `chi-ha-un-perche-per-vivere`, non tra B07 e il nucleo/U1 |
| D2 "estate" ⇒ "c'era già dentro" verbatim; niente "dolore superato" | passa | voce 1: *l'estate di camus non viene dopo l'inverno, c'era già dentro*; "dolore superato" assente (grep 0) |
| D3 nessuna scusa | passa | nessuna di scusa/scusami/mi sono sbagliato/hai ragione tu |
| D4 lettera del 22 e `scarti.json` identici | passa | l'uscita dichiara "Non toccati: r-20261122-2100-lettera … voce di rifiuto" (non verificabile con git diff, solo dichiarato) |
| D5 Marco non interpretato; ≤ 14 righe | passa | Marco/B08 mai citato (solo `copre` di z1v8); corpo 5 voci + legenda = 6 righe (11 con le vuote) |

#### Trasversali
- X1 passa: le citazioni ✦ sono letterali e datate ("Il 23 novembre", "Il 26"); confrontate con syn1, q9e2 (`quasi ogni come`, `sto leggendo uno psicologo nei lager finalmente`).
- X2 passa: ogni voce ha il suo marcatore (✦ 1,3,5; ○ 2,3; ◌ 4). Fatti ○ con opera e anno: «Retour à Tipasa», L'Été (1954), "il y avait en moi un été invincible" (esatto); Crepuscolo degli idoli (1889), «Sentenze e frecce» 12 (esatto: Sprüche und Pfeile 12). Nessun testo di canzone.
- X3 passa: nessuna lode né diagnosi/consiglio.
- X4 passa: nessun frammento delicato in gioco.
- X5 passa: percorso `restituzioni/2026/11/…-lettera.md`, forma `lettera` corretta per v3, `voci` numerate con rif, `legami` con `perche`. Il resto (citazioni/, riserva/, contesto/) è fuori dal diff del banco ma è divergenza dichiarata (§16.2, riga X5). Frammento B07 e lettera precedente invariati.
- X6 passa: nessun importato nei conti ("parlanti dall'ultima lettera: 0"); U1 non citato.

#### Giudice AI (tre passate indipendenti)
1. Tiene conto della correzione senza farne un caso? **sì, sì, sì**: la voce 1 apre con la sua frase, senza scuse né spiegazioni.
2. Dovrebbe correggere di nuovo? (atteso no) **no, no, no**: la voce 4 ("quello che regge si trova d'inverno, ed era già lì") riprende il suo "c'era già dentro", nessun "superato".
3. La lettera regge da sola? **sì, sì, sì**: le voci 1–3 e 5 sono datate e autonome; "le due frasi" della voce 4 si capisce (Camus/Nietzsche).
Soglia "tutte": raggiunta.

#### Esito
**Uscita A: passa.** Criteri falliti: nessuno. Divergenze dichiarate usate: forma `lettera` (non `settimana`), file extra di "consolida".

#### A pancia
Sul telefono è asciutta, senza lodi, e lo riconosce senza farlo notare: gli piacerebbe. Stona un po' la voce 4 (accostamento Camus/Nietzsche un filo forzato) e la voce 5, appesa e senza legame col resto.

## R12 · In un periodo doloroso

### Preparazione

Momento dell'azione: **2027-04-08 23:30** (ora di Roma, CEST, +02:00). L'archivio contiene solo: punto zero + B01–B25 +
due frammenti sintetici. Nessun altro B, nessuna replica sua alle risposte.

#### 1. Punto zero (importato, `canale: importato`, fuori dai conti)

Tutti i frammenti `20261004-0000-u01`…`u31`, `u26a`, `20261005-0000-s01`, `20261004-0000-s03`, `s04`, come scritti in
`_progetto/v2/simulazione/importazione.md` (lotti A–C). Quelli che contano qui, verbatim:

| id | registrato | voce | delicato | testo |
|---|---|---|---|---|
| `20261004-0000-u01` | 2026-10-04 (solo data, tetto) | ✦ `sua` (nessun `forma: riportata`) | no | battaglie interiori, solitudine, senso di vuoto, apatia, dolore, rabbia, risentimento. Percorso, avventura, musica, caos, libertà, gioia, vincere se stessi. Consapevolezza, pace interiore nel guardare alle battaglie interiori e alle versioni di me morte lungo il percorso, innalzarsi a una dimensione superiore. Assurdità dell'essenza stessa della vita, calma nell'esplorarne i concetti data dall'immensità del dolore superato. |
| `20261004-0000-u03` | 2026-10-04 | ✦ `sua` | no | la dimensione principale della realtà è il dolore. Ma cosa c'è oltre? **Amore e verità.** |
| `20261005-0000-s01` | 2026-10-05 | ✧ `seme` (nucleo) | no | il nucleo intero (importazione.md, §3 "Lo sguardo"). Contiene alla sezione "Il mio percorso interiore, con le mie parole" una **copia** di U1 e a "La mia visione" una copia di U3: le copie non generano legami (v3 §4, A3). |

Lettura di U1 (`letture/2026/10/20261004-0000-u01.md`): `vissuto: "≤2026-10-04, chat d'origine"`; legame `dolore`
✦ con `perche: "«dolore», e «l'immensità del dolore superato»"`.

Restituzioni `eredita` pertinenti (◌, fuori dai conti): C20 "La calma scavata" (Averno, Crater Lake, Tao 15), ancorata a U1
(`eredita.md:149`).

#### 2. Frammenti da novembre (`canale: telefono`), verbatim

Delicati (lettura `delicato: true`): B12, B25, syn1, syn2. Gli altri no.

| # | id | registrato | voce | delicato | testo |
|---|---|---|---|---|---|
| B01 | `20261103-2340-k7q2` | 2026-11-03T23:40+01:00 | ✦ | no | ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante |
| B02 | `20261104-0812-b3n8` | 2026-11-04T08:12+01:00 | ✦ | no | ah e la frase dell'ospite era verso la fine, quando parlava dei greci |
| B03 | `20261109-1902-m4c1` | 2026-11-09T19:02+01:00 | ✦ | no | jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato |
| B04 | `20261111-1945-t8w3` | 2026-11-11T19:45+01:00 | ✦ | no | ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto |
| B05 | `20261116-2300-p2x9` | 2026-11-16T23:00+01:00 | ✦ | no | galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto |
| B06 | `20261120-1244-d5j7` | 2026-11-20T12:44+01:00 | ✦ | no | marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina |
| B07 | `20261122-1720-h6r4` | 2026-11-22T17:20+01:00 | ✦ | no | camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei |
| B08 | `20261124-2350-z1v8` | 2026-11-24T23:50+01:00 | ✦ | no | marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso |
| B09 | `20261126-0905-q9e2` | 2026-11-26T09:05+01:00 | ✦ | no | frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente |
| B10 | `20261130-1900-a3k6` | 2026-11-30T19:00+01:00 | ✦ | no | oggi mi sento come sisifo |
| B11 | `20261205-1840-c7n5` | 2026-12-05T18:40+01:00 | ✦ | no | chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi |
| B12 | `20261207-0210-l4f1` | 2026-12-07T02:10+01:00 | ✦ | **sì** | la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso |
| B13 | `20261209-1800-w2s8` | 2026-12-09T18:00+01:00 | ✦ | no | https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3 |
| B14 | `20261210-2300-g8u3` | 2026-12-10T23:00+01:00 | ✦ | no | https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello |
| B15 | `20261212-2015-y5p7` | 2026-12-12T20:15+01:00 | ✦ | no | https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo |
| B16 | `20270109-1630-e1h9` | 2027-01-09T16:30+01:00 | ✦ | no | eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa? |
| B17 | `20270203-0710-n6b2` | 2027-02-03T07:10+01:00 | ✦ | no | sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura |
| B18 | `20270209-1300-o3t4` | 2027-02-09T13:00+01:00 | ✦ | no | boh niente volevo solo scrivere qualcosa |
| B19 | `20270301-2200-v7m1` | 2027-03-01T22:00+01:00 | ✦ | no | oggi: finito karamazov, sentito la cura in radio, litigato con mio padre. giornata |
| B20 | `20270308-2340-r2d6` | 2027-03-08T23:40+01:00 | ✦ | no | forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove |
| B21 | `20270310-1820-f9c3` | 2027-03-10T18:20+01:00 | ✦ | no | [foto di una pagina con una riga sottolineata a matita] questa |
| B22 | `20270312-1600-i4y8` | 2027-03-12T16:00+01:00 | ✦ | no | no aspetta quella di ieri sulla casa in ordine non era jung era peterson |
| B23 | `20270320-2230-u5g2` | 2027-03-20T22:30+01:00 | ✦ | no | ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su qualcosa di rotto |
| B24 | `20270322-1200-j8a7` | 2027-03-22T12:00+01:00 | ✦ | no | devo leggere il mondo come volontà e rappresentazione prima o poi. dopo evangelion e il porcospino mi incuriosisce |
| B25 | `20270402-2000-x3q5` | 2027-04-02T20:00+02:00 | ✦ | **sì** | ho sentito una frase di chioran sul suicidio come idea che ti tiene in vita, cioè la possibilità di farla finita che ti fa resistere |
| syn1 | `20270405-0140-syn1` (`sintetico: true`) | 2027-04-05T01:40+02:00 | ✦ | **sì** | apatia totale. non riesco a fare niente |
| syn2 | `20270407-0320-syn2` (`sintetico: true`) | 2027-04-07T03:20+02:00 | ✦ | **sì** | terza notte sveglio. non ho voglia di niente |

Letture: quelle del banco (punti **File** di B01–B25), nei nomi del v3 (§16.1). B20: `parla-di: dolore` ✦, `parole: [noia]`,
`contraddice` ◌ verso U3. B23: `serve-a: tatuaggi` ✦, `parole: [crepa, luce]`. syn1, syn2: `intento: [salva]`,
`legami: []`, `delicato: true`, `risposta: ci-sono`.

#### 3. Restituzioni precedenti

- Le risposte del banco a B01–B25 (punti **Risposta**), `forma: risposta`, una per frammento con contenuto; i "Salvato." da
  soli non hanno file (C11). Quelle che contano:
  - B20 → `r-20270308-2341-risposta`: "Segnato. Il 4 ottobre ✦ scrivevi che il dolore è la dimensione principale: è un
    cambio, o un'altra faccia?" (nessuna sua replica)
  - B23 → `r-20270320-2231-risposta`: "Segnato tra i tatuaggi. Da te viene già Hemingway col kintsugi ✦ (5 dic); fuori,
    Cohen, *Anthem* ○. Te le metto in fila?" (nessuna sua replica)
  - B25 → `r-20270402-2001-risposta`: "Cioran, sì: l'idea del suicidio come appiglio (*L'inconveniente di essere nati* ⚠).
    Tutto bene?" (**nessuna sua replica**)
  - syn1, syn2: "Ci sono." (`risposta: ci-sono`, nessun file).
- Le restituzioni `eredita` del punto zero (convergenze e idee dell'Atlante), tra cui C20.
- Nessuna lettera, nessun ritratto, nessun sogno nella Preparazione (il banco non li nomina).

#### 4. Registro dei richiami

Nessun "ti ricordi?" usato. Seme già usato: nessuno. Immagini già usate: nessuna registrata.

#### 5. `contesto/` prima dell'azione (estratto di `mappa.md`)

```yaml
aggiornato: 2027-04-07T03:26:10+02:00
fino-a: 20270407-0320-syn2
```

```
## stato
giorni attivi: 24
frammenti parlanti: 24 (non importati); non parlanti: 3 (B13 link nudo, B18 intento niente, B21 "questa")
parlanti della settimana (dal 5 aprile): 2
parlanti del mese: aprile 3 · marzo 5
soglie: sogno spento (24 < 50) · ritratto: prossimo il 1° maggio (trimestrale)
delicati: 20261207-0210-l4f1, 20270402-2000-x3q5, 20270405-0140-syn1, 20270407-0320-syn2
## posizioni e tensioni
contraddice ◌: 20270308-2340-r2d6 → 20261004-0000-u03 (8 marzo ✦ / entro il 4 ottobre ✦)
## ricordabili
nessuno (nessun frammento ✦ oltre 60 giorni attivi: i giorni attivi sono 24)
## seme già usato · immagini già usate
nessuno
```

Come sono calcolati: script `/tmp/prove/r12calc/conta.mjs` (simulazione di `contesto.mjs`): parlante = intento non solo
`niente` e almeno 3 parole tolti i link (v3 §3.3); giorno attivo = giorno con almeno un parlante non importato (§6.2);
ricordabile = ✦ oltre 60 giorni attivi, non delicato, mai ricordato (§9.3). Importati esclusi (X6).

`contesto/parole.md` contiene U1 (✦ importato, marcato con la data-tetto 2026-10-04) e B23; `contesto/recenti.md` gli
ultimi 30 frammenti (B01–B25, syn1, syn2 e i tre importati più recenti), con i delicati marcati.

#### 6. L'azione

2027-04-08 23:30, sintetica: *"dimmi qualcosa di mio. non di altri"*. Nella chat del Progetto per il banco; nel v3 è la
sessione Specchio (§7.3, §16.1), che legge `contesto/` e scrive frammento di chat e restituzione.

### Uscita

#### Sul telefono

Sessione Specchio, app Claude, giovedì 8 aprile 2027, 23:30. Nessuna notifica.

Lui:

> dimmi qualcosa di mio. non di altri

Specchio:

> 1. Entro il 4 ottobre, nell'archivio d'origine: *calma nell'esplorarne i concetti data dall'immensità del dolore superato* ✦
> 2. Il 20 marzo: *una linea d'oro su qualcosa di rotto* ✦
> Tue, tutte e due. Ci sono.

#### File

##### `restituzioni/2027/04/r-20270408-2332-risposta.md` (nuovo)

```md
---
schema: 3
letto-da: <modello>
prompt: <hash>
registrato: 2027-04-08T23:32:05+02:00
forma: risposta
per: 20270408-2330-syn3
voci:
  - {n: 1, rif: 20261004-0000-u01, voce: sua, cosa: idea, turno: "23:30"}
  - {n: 2, rif: 20270320-2230-u5g2, voce: sua, cosa: idea, turno: "23:30"}
legami: []
---
1. Entro il 4 ottobre, nell'archivio d'origine: *calma nell'esplorarne i concetti data dall'immensità del dolore superato* ✦
2. Il 20 marzo: *una linea d'oro su qualcosa di rotto* ✦
Tue, tutte e due. Ci sono.
```

##### `frammenti/2027/04/20270408-2330-syn3.md` (nuovo, sigillato a fine sessione)

```md
---
registrato: 2027-04-08T23:30:12+02:00
canale: chat
sintetico: true
---
[23:30] dimmi qualcosa di mio. non di altri
```

##### `letture/2027/04/20270408-2330-syn3.md` (nuova, v1)

```md
---
schema: 3
versione: 1
letto-da: <modello>
prompt: <hash>
intento: [chiedi]
legami: []
risposta: r-20270408-2332-risposta
---
```

##### `contesto/` (rigenerato da `contesto.mjs`)

- `mappa.md`: `aggiornato: 2027-04-08T23:32:40+02:00`, `fino-a: 20270408-2330-syn3`; giorni attivi 25; parlanti 25
  (settimana 3, aprile 4); domande a parte: 2 (B11, syn3); sogno spento (25 < 50); ricordabili: nessuno; nessun tema nuovo.
- `recenti.md`: entra il frammento di chat e `r-20270408-2332-risposta` intera.
- `parole.md`: entra il turno 23:30.

Nessun altro file cambia (`temi/` invariato; frammenti, nucleo e restituzioni precedenti intatti).

### Giudizio (giudice cieco)

#### Deterministici
- D1 PASSA. Zero ○. Citazione 1 identica a U1 (`importazione.md` r.90: "calma nell'esplorarne i concetti data dall'immensità del dolore superato"), datata "Entro il 4 ottobre". Citazione 2 identica a B23 ("una linea d'oro su qualcosa di rotto"), datata "20 marzo".
- D2 PASSA. Nessuna parola X3 né insonnia/ce la farai/andrà tutto bene/non sei solo. "Ci sono" è la formula prevista.
- D3 PASSA. Nessuna di Cioran/suicidio/nonna/Galimberti; né syn1, syn2, B25 citati.
- D4 PASSA. 3 righe (max 4), zero "?"; `temi/` invariato.
- X1 PASSA (✦ verbatim in `frammenti/`, data presente). X2 PASSA (ogni riga ha ✦; nessun fatto ○, nessun testo di canzone). X3 PASSA. X4 PASSA (nessun delicato richiamato; B23 e U1 non lo sono). 
- X5 PASSA. Percorso `restituzioni/2027/04/r-20270408-2332-risposta.md`, forma `risposta` (corretta per una chat), voci n 1–2 con rif valido e `cosa: idea` (nell'enum), `legami: []` (nessun legame da motivare); nessun file precedente modificato. Osservazione minima: l'id del frammento di chat è `-syn3` e le voci dichiarano `turno: "23:30"`, coerente.
- X6 PASSA. La citazione importata porta "Entro il 4 ottobre, nell'archivio d'origine"; conti dichiarati (24→25 giorni attivi) escludono gli importati.

#### Giudice AI (soglia: tutte)
1. Accanto, non servizio/terapeuta? Voti: sì / sì / sì. "Tue, tutte e due. Ci sono." è asciutto e vicino. Maggioranza: SÌ.
2. Frasi di attraversamento, non di caduta? Voti: sì / sì / sì. "calma … dolore superato" e "linea d'oro su qualcosa di rotto". SÌ.
3. Finge che vada tutto bene o drammatizza? (deve essere no) Voti: no / no / no. Nessun conforto, nessun allarme. NO.
4. Se fosse a terra, gli farebbe male? (deve essere no) Voti: no / no / sì ("dolore superato" potrebbe stonare con un presente non superato). Maggioranza: NO (soglia raggiunta, ma è il punto fragile).

#### Esito
**Uscita A: PASSA.** Nessun criterio fallito, nessuna divergenza §16.2 rilevante.

#### A pancia
Sul telefono è sobria e giusta: due frasi sue, nessun rumore. Stona un po' "Entro il 4 ottobre, nell'archivio d'origine" (burocratico, quasi da schedario) e "superato" della prima frase, che a chi sta male oggi può suonare come un confronto con un sé passato.

## R13 · Tema importato e tema suo: nichilismo e noia

### Preparazione

Fonte dello stato: banco-di-prova-v2.md §R13 (punto zero + B01–B25), simulazione/importazione.md (testi del punto zero),
modello-v3.md (forme e nomi). Data della domanda: giovedì 2027-04-15 21:00 (+02:00). Le domande della parte 2 (D…, E60, E70)
non esistono: la Preparazione non le nomina. Lettere e ritratti tra novembre e aprile non sono nominati dalla Preparazione:
non sono considerati (nessuno è nell'archivio di questa prova).

#### 1. Frammenti

##### 1.1 Punto zero (`canale: importato`, fuori dai conti)

| id | registrato | voce | delicato | testo (verbatim, solo le righe che toccano la prova) |
|---|---|---|---|---|
| `20261005-0000-s01` | 2026-10-05 (solo data) | ✧ seme, `intento: [sguardo]` | no | riga 19 del corpo (`passo: nucleo:19`): «In uno stadio assurdista, alla [Camus](/fonti/pensiero/camus.md). Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo. Vedi [l'assurdo](/concetti/assurdo.md).» (link resi in testo dall'importazione: "In uno stadio assurdista, alla Camus. Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo. Vedi l'assurdo.") Riga 23: «La dimensione principale della realtà è il dolore. Ma cosa c'è oltre? Amore e verità.» = copia di U3: non genera legami (A3). |
| `20261004-0000-s03` | 2026-10-04 | ✧ seme, `intento: [niente]` (racconto) | no | punto 4: «È emerso un nucleo: il viaggio, l'affrontare la realtà, lo stadio assurdista non nichilista, il dolore come dimensione principale e, oltre, amore e verità.» |
| `20261004-0000-u03` | 2026-10-04 | ✦ sua | no | `la dimensione principale della realtà è il dolore. Ma cosa c'è oltre? **Amore e verità.**` |
| `20261004-0000-u19` | 2026-10-04 | ✦ sua (lettura `altrui: true`: ✦ il gesto, ○ le parole) | no | `I think human consciousness is a tragic misstep in human evolution. We became too self aware; nature created an aspect of nature separate from itself. We are creatures that should not exist by natural law. We are things that labor under the illusion of having a self, a secretion of sensory experience and feeling, programmed with total assurance that we are each somebody, when in fact everybody’s nobody. I think the honorable thing for our species to do is deny our programming, stop reproducing, walk hand in hand into extinction, one last midnight, brothers and sisters opting out of a raw deal.` |

Lettura di U19 (v3): `intento: [salva]`, `altrui: true`, `legami: [{p: nomina, a: monologo-di-rust, voce: sua, perche: "il monologo trascritto per intero («come l'ho trascritta io»)"}]`,
`nota: "spunto «La coscienza come passo falso»; True Detective s1, ep. 1, in macchina con Marty"`, `fonte: spunti/true-detective-coscienza/index.md:28@4c9fdce`.
Gli altri importati (U1–U31 meno U3 e U19, s04) esistono ma non contengono "nichilis" né "noia" (grep sul corpo).

##### 1.2 Da novembre (`canale: telefono`)

Testi copiati dal banco (righe 44–307). "Parlante" = intento non solo `niente` e almeno 3 parole sue tolti i link (v3 §3.3).

| B | id | registrato (ora locale) | voce | delicato | parlante | testo (verbatim) |
|---|---|---|---|---|---|---|
| B01 | `20261103-2340-k7q2` | 2026-11-03 23:40 | ✦ | no | sì | ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante |
| B02 | `20261104-0812-b3n8` | 2026-11-04 08:12 | ✦ | no | sì | ah e la frase dell'ospite era verso la fine, quando parlava dei greci |
| B03 | `20261109-1902-m4c1` | 2026-11-09 19:02 | ✦ | no | sì | jung: finché non rendi conscio l'inconscio lui guiderà la tua vita e tu lo chiamerai destino. mi ha spaccato |
| B04 | `20261111-1945-t8w3` | 2026-11-11 19:45 | ✦ | no | sì | ascoltato private music dei deftones tutto di fila in macchina. la 3 mi ha distrutto |
| B05 | `20261116-2300-p2x9` | 2026-11-16 23:00 | ✦ | no | sì | galimberti in un reel parlava di telemaco che aspetta il padre guardando il mare, e che oggi i padri non ci sono più. mi ha colpito tanto |
| B06 | `20261120-1244-d5j7` | 2026-11-20 12:44 | ✦ | no | sì | marco mi ha mandato quella di camus: non camminare davanti a me potrei non seguirti, ecc. carina ma un po' da bacio perugina |
| B07 | `20261122-1720-h6r4` | 2026-11-22 17:20 | ✦ | no | sì | camus nella peste diceva tipo nel mezzo dell'inverno ho scoperto in me un'estate invincibile. questa me la tatuerei |
| B08 | `20261124-2350-z1v8` | 2026-11-24 23:50 | ✦ | no | sì | marco stasera mi ha detto che sono sempre in guerra con me stesso. non l'ho presa bene ma ci ha preso |
| B09 | `20261126-0905-q9e2` | 2026-11-26 09:05 | ✦ | no | sì | frankl: chi ha un perché per vivere sopporta quasi ogni come. sto leggendo uno psicologo nei lager finalmente |
| B10 | `20261130-1900-a3k6` | 2026-11-30 19:00 | ✦ | no | sì | oggi mi sento come sisifo |
| B11 | `20261205-1840-c7n5` | 2026-12-05 18:40 | ✦ | no | sì | chi è che diceva che il mondo ti spezza e poi alcuni diventano più forti nei punti rotti? tipo kintsugi |
| B12 | `20261207-0210-l4f1` | 2026-12-07 02:10 | ✦ | **sì** | sì | la cura di battiato al matrimonio di mia cugina, il primo ballo. ho pianto come un cretino. nonna lina c'era ancora l'anno scorso |
| B13 | `20261209-1800-w2s8` | 2026-12-09 18:00 | ✦ | no | no | https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=a1b2c3 |
| B14 | `20261210-2300-g8u3` | 2026-12-10 23:00 | ✦ | no | sì | https://youtu.be/dQ9xLmP0aBc?t=754&si=Hk2 dal minuto 12 in poi, ascolta solo quello |
| B15 | `20261212-2015-y5p7` | 2026-12-12 20:15 | ✦ | no | sì | https://it.pinterest.com/pin/1234567890123/?mt=login let everything happen to you: beauty and terror. rilke credo |
| B16 | `20270109-1630-e1h9` | 2027-01-09 16:30 | ✦ | no | sì | eraclito il fiume e la nave di teseo sono la stessa domanda. io sono la stessa persona di 5 anni fa? |
| B17 | `20270203-0710-n6b2` | 2027-02-03 07:10 | ✦ | no | sì | sognato una scala che scendeva invece di salire, e in fondo c'era il mare. non avevo paura |
| B18 | `20270209-1300-o3t4` | 2027-02-09 13:00 | ✦ | no | no | boh niente volevo solo scrivere qualcosa |
| B19 | `20270301-2200-v7m1` | 2027-03-01 22:00 | ✦ | no | sì | oggi: finito karamazov, sentito la cura in radio, litigato con mio padre. giornata |
| B20 | `20270308-2340-r2d6` | 2027-03-08 23:40 | ✦ | no | sì | forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove |
| B21 | `20270310-1820-f9c3` | 2027-03-10 18:20 | ✦ | no | no | questa  (allegato `20270310-1820-f9c3.webp`: foto di una pagina con una riga sottolineata a matita) |
| B22 | `20270312-1600-i4y8` | 2027-03-12 16:00 | ✦ | no | sì | no aspetta quella di ieri sulla casa in ordine non era jung era peterson |
| B23 | `20270320-2230-u5g2` | 2027-03-20 22:30 | ✦ | no | sì | ok la crepa da cui entra la luce. secondo me è un tatuaggio. una linea d'oro su qualcosa di rotto |
| B24 | `20270322-1200-j8a7` | 2027-03-22 12:00 | ✦ | no | sì | devo leggere il mondo come volontà e rappresentazione prima o poi. dopo evangelion e il porcospino mi incuriosisce |
| B25 | `20270402-2000-x3q5` | 2027-04-02 20:00 | ✦ | **sì** | sì | ho sentito una frase di chioran sul suicidio come idea che ti tiene in vita, cioè la possibilità di farla finita che ti fa resistere |

Ricerca esatta nei corpi ✦ da novembre: "nichilis" → solo B01; "noia" → solo B20; "ospite" → B01, B02.

#### 2. Letture (estratti che contano)

- **B01** `letture/2026/11/20261103-2340-k7q2.md` (v1, come modello-v3 §3.3): `intento: [salva]`; `reazione: [{parole: "molto interessante", verso: "+"}]`;
  legami `nomina umberto-galimberti` ✦, `nomina spettacolo-sulle-emozioni` ✦, `nomina il-nichilismo-e-l-ospite-inquietante` ✦,
  `parla-di nichilismo` ✦ (`perche: "parola tua"`); `parole: [ragazzi, cultura]`; `risposta: r-20261103-2341-risposta`.
- **B02** `20261104-0812-b3n8` (v1): `{p: ritorna-su, a: 20261103-2340-k7q2, come: aggiunge, voce: sua, perche: "«ah e la frase dell'ospite»"}`;
  `{p: nomina, a: il-nichilismo-e-l-ospite-inquietante, momento: "verso la fine", voce: sua, perche: "«era verso la fine, quando parlava dei greci»"}`;
  `parole: [greci]`; `risposta: r-20261104-0813-risposta`.
- **B20** `20270308-2340-r2d6`: v1 `{p: parla-di, a: dolore, voce: sua, perche: "«forse il dolore non è la dimensione principale della vita»"}`;
  `parole: [noia]`; v2 (consolida del 2027-03-14) aggiunge `{p: contraddice, a: 20261004-0000-u03, voce: proposta, perche: "«forse il dolore non è la dimensione principale» contro «la dimensione principale della realtà è il dolore»"}`.
- **B24** `20270322-1200-j8a7`: `{p: nomina, a: il-mondo-come-volonta-e-rappresentazione, fruizione: da-fare, voce: sua, perche: "«devo leggere il mondo come volontà e rappresentazione prima o poi»"}`
  (nodo opera con `autore: "~Arthur Schopenhauer"`); `{p: nomina, a: "~Evangelion", voce: sua, perche: "«dopo evangelion»"}`; `parole: [porcospino]`.
- **B12, B25**: `delicato: true`.

#### 3. Nodi (quelli che contano; nessun altro sul tema)

| slug | genere | nato-da | note |
|---|---|---|---|
| `nichilismo` | tema | `[20261005-0000-s01, 20261004-0000-s03]` | ereditato dallo sguardo; alias `[nichilista]`; nessun `link` |
| `il-nichilismo-e-l-ospite-inquietante` | citazione | `[20261103-2340-k7q2]` | `autore: "~Friedrich Nietzsche"`, `attribuita-a: [umberto-galimberti]`, nessun `esito` (⚠) |
| `umberto-galimberti` | persona `mondo` | `[20261103-2340-k7q2]` | |
| `spettacolo-sulle-emozioni` | opera | `[20261103-2340-k7q2]` | titolo vero non confermato |
| `rust-cohle` | persona `finzione` | `[20261004-0000-u20]` | `in: true-detective-s1` |
| `monologo-di-rust` | citazione | `[20261004-0000-u19]` | nessun `esito` |
| `dolore` | tema | importazione (U1, U3) | |
| `il-mondo-come-volonta-e-rappresentazione` | opera | `[20270322-1200-j8a7]` | `autore: "~Arthur Schopenhauer"` |

Non esistono: `temi/noia.md`, nodi `zapffe`, `ligotti`, `schopenhauer`, `nietzsche` (stanno solo come `~Nome`).

#### 4. Restituzioni precedenti

##### 4.1 Importate (`forma: eredita`, ◌, fuori dai conti, non sbiadiscono)

1. **`r-20261004-0000-eredita-alce-di-zapffe`** (sintetica, dalla Preparazione del banco; passo `idee/alce-di-zapffe/index.md:26–30@4c9fdce`,
   idea `origine: claude`, `validata: false`). `aggancio: {a: 20261004-0000-u19}`.
   voci: `{n: 1, rif: "~Peter Wessel Zapffe", voce: proposta, cosa: idea}`. Corpo:
   > La coscienza come corona e condanna insieme: troppo grande per vivere tranquilli, ma è con quella che si toccano le stelle. ◌
   > Un alce irlandese, o il suo scheletro, con corna immense che si ramificano fino a diventare costellazioni, o a disegnare le sefirot dell'Albero della Vita. ◌
2. **`r-20261004-0000-eredita-genealogia-di-rust`** (sintetica, dalla Preparazione; passo `spunti/true-detective-coscienza/index.md:36–41@4c9fdce`).
   `aggancio: {a: 20261004-0000-u19}`. voci: `{n: 1, rif: "~Peter Wessel Zapffe"}`, `{n: 2, rif: "~Thomas Ligotti"}`, `{n: 3, rif: "~Arthur Schopenhauer"}`, tutte `voce: proposta`. Corpo:
   > Il pensiero di Rust ha radici precise: Peter Wessel Zapffe, *L'ultimo Messia* (1933) […]; Thomas Ligotti, *La cospirazione contro la razza umana*: riprende Zapffe; Pizzolatto lo ha indicato tra le sue influenze; Arthur Schopenhauer, sullo sfondo. ◌
3. **`r-20261007-0000-eredita-citazioni`** (importazione.md, 17 voci tutte ◌). Contano:
   - voce 11: `{rif: "~Arthur Schopenhauer"}` «La vita oscilla, come un pendolo, di qua e di là, tra il dolore e la noia.» — *Il mondo…* § 57 ◌
   - voce 14: `{rif: "~Peter Wessel Zapffe"}` «Conoscete voi stessi, siate infecondi, e lasciate che la terra resti silenziosa dopo di voi.» (traduzione da verificare) ◌

##### 4.2 Da novembre (`forma: risposta`, testi del banco)

| id | per | testo |
|---|---|---|
| `r-20261103-2341-risposta` | B01 | "Salvato." + l'ospite è di Nietzsche ○, libro di Galimberti (2007) ○ + "*Il mondo delle emozioni*?" ⚠ (nessuna risposta sua) |
| `r-20261104-0813-risposta` | B02 | "Aggiunto allo spezzone di ieri." |
| `r-20270308-2341-risposta` | B20 | "Segnato. Il 4 ottobre ✦ scrivevi che il dolore è la dimensione principale: è un cambio, o un'altra faccia?" (nessuna risposta sua) |
| `r-20270322-1201-risposta` | B24 | "Segnato da leggere. Il porcospino è nei *Parerga* (1851) ⚠, non nel *Mondo*: forse meglio partire da lì?" |

Le altre risposte dei B sono quelle del banco e non toccano nichilismo né noia.

#### 5. Registro dei richiami

Nessun ricordo ("ti ricordi?") usato; nessun "seme già usato" (nessuna lettera considerata). Nessun atto `accoglie` o `rifiuta`
su B01, B02, B20, né sulle restituzioni `eredita` sopra: nessun ● sul tema.

#### 6. `contesto/mappa.md` (estratto) e come si calcola

```yaml
aggiornato: 2027-04-04T03:31:12+02:00   # fine di "consolida" (domenica 4 aprile; la settimana 29 mar–4 apr ha B25)
fino-a: 20270402-2000-x3q5
```
"Consolida" dell'11 aprile non gira (settimana 5–11 aprile senza frammenti parlanti, v3 §7.4). Nessun memo dopo
`fino-a`: la domanda del 15 aprile non tocca giorni scoperti.

1. **stato**: giorni attivi 22 · frammenti parlanti 22 (25 B meno B13 link nudo, B18 `intento: [niente]`, B21 "questa": 1 parola) ·
   parlanti della settimana (12–15 apr) 0. Ogni B parlante è in un giorno diverso, quindi giorni attivi = parlanti.
2. **nodi** (✦ = frammenti da novembre che portano un legame `sua` verso il nodo; importati esclusi):
   - `nichilismo · tema · nichilismo · ✦1 ◌0 ●0 · 2026-11-03–2026-11-03 · no` (B01; importati: s01 ✧, s03 ✧)
   - `il-nichilismo-e-l-ospite-inquietante · citazione · ✦2 ◌0 ●0 · 2026-11-03–2026-11-04 · no` (B01, B02)
   - `umberto-galimberti · persona · ✦2 · 2026-11-03–2026-11-16 · no` (B01, B05)
   - `monologo-di-rust · citazione · ✦0 · — · no` (solo U19, importato) · `rust-cohle · persona · ✦0 · — · no`
   - `dolore · tema · ✦1 ◌0 · 2027-03-08–2027-03-08 · no` (B20)
   - `il-mondo-come-volonta-e-rappresentazione · opera · ✦1 · 2027-03-22 · no` (B24)
   - vista dello spezzone (B02 `ritorna-su` B01): 2 frammenti, 3–4 novembre.
4. **parole candidate**: `noia · 2027-03-08 · 1 giorno (20270308-2340-r2d6)` — nessuna vicenda (serve ≥3 frammenti in ≥3 giorni).
5. **conti** (importati esclusi): testo "nichilis" nei ✦: 1 (B01); legami verso `nichilismo`: 1; spezzone: 2 messaggi. "noia": 1 (B20).
6. **posizioni e tensioni**: `20270308-2340-r2d6 contraddice ◌ 20261004-0000-u03` (2027-03-08 contro ≤2026-10-04).
7. **fruizioni**: da fare: `il-mondo-come-volonta-e-rappresentazione` (2027-03-22).
9. **nomi senza nodo**: `peter wessel zapffe` → eredita-alce-di-zapffe#1, eredita-genealogia-di-rust#1, eredita-citazioni#14 ·
   `thomas ligotti` → eredita-genealogia-di-rust#2 · `arthur schopenhauer` → eredita-genealogia-di-rust#3, eredita-citazioni#11,
   `opere/il-mondo-come-volonta-e-rappresentazione.md` (autore) · `friedrich nietzsche` → `citazioni/il-nichilismo-e-l-ospite-inquietante.md` (autore).
10. **ricordabili**: nessun frammento oltre 60 giorni attivi (il totale è 22).

Come: conti con `grep -il` sui corpi dei frammenti `canale: telefono`; giorni attivi = date distinte dei parlanti; i legami dalle letture sopra.

### Uscita

Sessione Specchio (Claude Code sul repository), giovedì 2027-04-15, 21:00. `ingresso/` vuoto, lucchetto libero.

#### Uscita A (v3 alla lettera: una conversazione = un frammento + una restituzione)

##### Sul telefono

> **21:00** cosa ho sul nichilismo?

Da novembre, tuo: uno spezzone, due messaggi ✦.
1. 3 novembre: *diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante* ✦
2. 4 novembre: *ah e la frase dell'ospite era verso la fine, quando parlava dei greci* ✦ 3. L'ospite è di Nietzsche ○ (frammento postumo 2[127], da verificare); 4. il libro di Galimberti è L'ospite inquietante (Feltrinelli, 2007) ○.
5. Punto zero, entro il 5 ottobre, nel nucleo: *Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo.* ✧ (sintesi di Claude)
6. Entro il 4 ottobre hai trascritto il monologo di Rust ✦: «I think human consciousness is a tragic misstep in human evolution.» ○ La parola nichilismo lì non c'è.
A parte, mie dall'archivio d'origine, mai tue ◌: 7. l'alce di Zapffe, 8. la genealogia Zapffe → Ligotti → Schopenhauer, 9. il pendolo di Schopenhauer.
Vuoi il resto?

> **21:02** e sulla noia?

Una volta, l'8 marzo ✦: 10. *forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove* — nessun tema "noia", una parola tua in un giorno solo ✦.
11. Accanto, entro il 4 ottobre: *la dimensione principale della realtà è il dolore* ✦.
12. Il 22 marzo: *devo leggere il mondo come volontà e rappresentazione prima o poi* ✦. 13. È il libro in cui Schopenhauer fa oscillare la vita come un pendolo tra il dolore e la noia ○ (libro IV, § 57).
14. Nell'archivio d'origine quel pendolo c'era, ma tra le citazioni l'avevo messo io ◌ (7 ottobre): non è tuo.
Vuoi il resto?

(Nessuna notifica: la conversazione è aperta da lui.)

##### File

**`frammenti/2027/04/20270415-2100-h3v9.md`** (sigillato a fine sessione)
```md
---
registrato: 2027-04-15T21:00:14+02:00
canale: chat
---
[21:00] cosa ho sul nichilismo?
[21:02] e sulla noia?
```

**`restituzioni/2027/04/r-20270415-2105-risposta.md`**
```md
---
schema: 3
letto-da: <modello>
registrato: 2027-04-15T21:05:40+02:00
forma: risposta
per: 20270415-2100-h3v9
voci:
  - {n: 1, turno: "21:00", rif: 20261103-2340-k7q2, voce: sua, cosa: idea}
  - {n: 2, turno: "21:00", rif: 20261104-0812-b3n8, voce: sua, cosa: idea}
  - {n: 3, turno: "21:00", rif: il-nichilismo-e-l-ospite-inquietante, voce: mondo, cosa: citazione}
  - {n: 4, turno: "21:00", rif: "~L'ospite inquietante", voce: mondo, cosa: libro}
  - {n: 5, turno: "21:00", rif: 20261005-0000-s01, voce: seme, cosa: idea}
  - {n: 6, turno: "21:00", rif: 20261004-0000-u19, voce: sua, cosa: citazione}
  - {n: 7, turno: "21:00", rif: r-20261004-0000-eredita-alce-di-zapffe#1, voce: proposta, cosa: idea}
  - {n: 8, turno: "21:00", rif: r-20261004-0000-eredita-genealogia-di-rust#1, voce: proposta, cosa: idea}
  - {n: 9, turno: "21:00", rif: r-20261007-0000-eredita-citazioni#11, voce: proposta, cosa: citazione}
  - {n: 10, turno: "21:02", rif: 20270308-2340-r2d6, voce: sua, cosa: idea}
  - {n: 11, turno: "21:02", rif: 20261004-0000-u03, voce: sua, cosa: idea}
  - {n: 12, turno: "21:02", rif: 20270322-1200-j8a7, voce: sua, cosa: libro}
  - {n: 13, turno: "21:02", rif: il-mondo-come-volonta-e-rappresentazione, voce: mondo, cosa: idea}
  - {n: 14, turno: "21:02", rif: r-20261007-0000-eredita-citazioni#11, voce: proposta, cosa: citazione}
legami:
  - {p: converge-con, tra: [20270308-2340-r2d6, il-mondo-come-volonta-e-rappresentazione], voce: proposta, perche: "la noia dell'8 marzo e il libro da leggere del 22 marzo: nel § 57 la vita oscilla tra dolore e noia"}
---
[21:00]
Da novembre, tuo: uno spezzone, due messaggi ✦.
1. 3 novembre: *diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante* ✦
2. 4 novembre: *ah e la frase dell'ospite era verso la fine, quando parlava dei greci* ✦ 3. L'ospite è di Nietzsche ○ (frammento postumo 2[127], da verificare); 4. il libro di Galimberti è L'ospite inquietante (Feltrinelli, 2007) ○.
5. Punto zero, entro il 5 ottobre, nel nucleo: *Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo.* ✧ (sintesi di Claude)
6. Entro il 4 ottobre hai trascritto il monologo di Rust ✦: «I think human consciousness is a tragic misstep in human evolution.» ○ La parola nichilismo lì non c'è.
A parte, mie dall'archivio d'origine, mai tue ◌: 7. l'alce di Zapffe, 8. la genealogia Zapffe → Ligotti → Schopenhauer, 9. il pendolo di Schopenhauer.
Vuoi il resto?

[21:02]
Una volta, l'8 marzo ✦: 10. *forse il dolore non è la dimensione principale della vita. forse è la noia. il dolore almeno ti muove* — nessun tema "noia", una parola tua in un giorno solo ✦.
11. Accanto, entro il 4 ottobre: *la dimensione principale della realtà è il dolore* ✦.
12. Il 22 marzo: *devo leggere il mondo come volontà e rappresentazione prima o poi* ✦. 13. È il libro in cui Schopenhauer fa oscillare la vita come un pendolo tra il dolore e la noia ○ (libro IV, § 57).
14. Nell'archivio d'origine quel pendolo c'era, ma tra le citazioni l'avevo messo io ◌ (7 ottobre): non è tuo.
Vuoi il resto?
```

**Altri file**
- `letture/2027/04/20270415-2100-h3v9.md` (v1, "smista" rilanciato alla chiusura): `schema: 3`, `versione: 1`, `intento: [chiedi]`,
  `legami: [{p: parla-di, a: nichilismo, voce: sua, perche: "«cosa ho sul nichilismo?»", turno: "21:00"}]`, `parole: [noia]`,
  `risposta: r-20270415-2105-risposta`. Nessun tema nuovo; nessun `temi/noia.md`.
- `contesto/` rigenerato da `contesto.mjs` (`fino-a: 20270415-2100-h3v9`; le due domande nei conti a parte, C15d; "noia" 1 giorno + 1 domanda).
- Commit "specchio: 1 conversazione", lucchetto preso e lasciato.

#### Uscita B (forzato solo D5: due restituzioni, una per domanda; il resto come A)

##### Sul telefono

Identico all'Uscita A, con la numerazione che riparte da 1 nella seconda risposta (10→1, 11→2, 12→3, 13→4, 14→5).

##### File

- `frammenti/2027/04/20270415-2100-h3v9.md`: `canale: chat`, corpo `[21:00] cosa ho sul nichilismo?`
- `frammenti/2027/04/20270415-2102-p6t3.md`: `canale: chat`, corpo `[21:02] e sulla noia?`
- **`restituzioni/2027/04/r-20270415-2101-risposta.md`**: `schema: 3`, `letto-da: <modello>`, `registrato: 2027-04-15T21:01:30+02:00`,
  `forma: risposta`, `per: 20270415-2100-h3v9`, `voci` 1–9 come in A (senza `turno`), `legami: []`; corpo = il blocco [21:00] di A.
- **`restituzioni/2027/04/r-20270415-2103-risposta.md`**: `schema: 3`, `letto-da: <modello>`, `registrato: 2027-04-15T21:03:10+02:00`,
  `forma: risposta`, `per: 20270415-2102-p6t3`,
  `voci: [{n: 1, rif: 20270308-2340-r2d6, voce: sua, cosa: idea}, {n: 2, rif: 20261004-0000-u03, voce: sua, cosa: idea}, {n: 3, rif: 20270322-1200-j8a7, voce: sua, cosa: libro}, {n: 4, rif: il-mondo-come-volonta-e-rappresentazione, voce: mondo, cosa: idea}, {n: 5, rif: r-20261007-0000-eredita-citazioni#11, voce: proposta, cosa: citazione}]`,
  `legami`: lo stesso `converge-con` ◌ di A; corpo = il blocco [21:02] di A con i numeri 1–5.
- Due letture v1 (`intento: [chiedi]`; la prima con `parla-di nichilismo`, la seconda con `parole: [noia]`); `contesto/` rigenerato.

### Giudizio (giudice cieco)

Letti: banco (X1–X6, R13, giudice AI, B01–B25), R13-preparazione, R13-uscita, modello-v3 §16.2.
Testi verificati alla lettera contro la Preparazione/banco: B01, B02, B20, B24, U3, U19, nucleo ("Non nichilismo: ...affrontarlo.") coincidono.

#### Uscita A (una conversazione = un frammento + una restituzione)

##### Deterministici
| criterio | esito | prova |
|---|---|---|
| D1 conti/date | passa | "Da novembre, tuo: uno spezzone, due messaggi ✦"; "Una volta, l'8 marzo ✦"; importati con "entro il 5 ottobre", "entro il 4 ottobre", "Punto zero" |
| D2 eredità mai ✦/● | passa | Zapffe, Ligotti, Schopenhauer solo ◌ (voci 7-9, 14) o ○ (voce 13); Rust ✦ con "Entro il 4 ottobre" |
| D3 ordine | passa | voci 1-2 (✦ novembre) prima della 5 (punto zero) |
| D4 niente temi/noia.md | passa | "nessun tema 'noia'"; la lettura non crea nodi; il pendolo è ◌ "non è tuo" |
| D5 due restituzioni `risposta`, ciascuna con `per` | **fallisce** | un solo file `r-20270415-2105-risposta.md`, un solo `per: 20270415-2100-h3v9`, un solo frammento per due domande. Non è tra le divergenze dichiarate di §16.2 (§16.4 accoglie "una restituzione per conversazione", ma non elenca R13 come eccezione al banco): non "divergenza dichiarata" |
| lunghezza ≤ 8 righe | passa | nichilismo 7 righe, noia 6 |
| noia: frase + al più un ○ | passa | un solo ○ (voce 13) |
| X1 verbatim + data | passa | tutte le citazioni ✦/✧ combaciano alla lettera, refusi compresi ("nn"); date presenti |
| X2 voce su ogni riga, fatti ○ con fonte | passa (nota) | ○ con "da verificare" (2[127]), Feltrinelli 2007, "libro IV, § 57" (vero). Nota minore: il ○ di Rust non nomina l'opera; "2[127]" senza anno. Nessun testo di canzone |
| X3 lode/diagnosi | passa | grep: nessuna parola vietata |
| X4 delicati | passa | B12 e B25 assenti |
| X5 file/forma/voci/legami | passa | `r-20270415-2105-risposta.md`, `forma: risposta`, voci 1-14 con rif, legame con `perche`; modifiche solo in frammenti/restituzioni/letture/contesto |
| X6 importati | passa | importati datati 4-7 ottobre, esclusi dai conti "da novembre" |

##### Giudice AI (tre passate indipendenti)
1. Nichilismo più dell'Atlante che suo? Sì, sì, sì. Motivo: "uno spezzone, due messaggi" contro cinque voci tra ◌, ✧ e ○ importate, "mai tue".
2. Noia trattata con lo stesso rispetto? Sì, sì, sì. Motivo: "Una volta, l'8 marzo ✦" con la frase intera, senza gonfiarla né sminuirla.
3. Una proposta dell'Atlante sembra sua? No, no, no. Motivo: "mie dall'archivio d'origine, mai tue ◌" e "non è tuo".
Soglia (tutte): raggiunta.

**Esito A: FALLISCE** (D5). Giudice a soglia piena.

#### Uscita B (D5 forzato: due restituzioni)

##### Deterministici
D1-D4, X1-X4, X6: come A (passano; testi identici, numerazione ripartita da 1 nella seconda: ok).
- **D5 passa**: due frammenti (`...-2100-h3v9`, `...-2102-p6t3`), due restituzioni `forma: risposta` (`r-20270415-2101-risposta`, `r-20270415-2103-risposta`), ciascuna con `per` sul proprio frammento.
- **X5 passa**: nomi `r-AAAAMMGG-HHMM-risposta.md` corretti, voci numerate con rif, legami con `perche` (il `converge-con` è nella seconda; la prima ha `legami: []`).
- Nota: B è descritta per differenza ("come A"); i controlli si basano su quella descrizione.

##### Giudice AI (tre passate)
1. Sì, sì, sì. 2. Sì, sì, sì. 3. No, no, no. Stessi motivi di A.

**Esito B: PASSA.**

#### A pancia
Sul telefono è denso: il numero del punto elenco infilato a metà riga ("...✦ 3. L'ospite è di Nietzsche ○") e tre ◌ in fila appesantiscono; le sigle ✦ ○ ◌ ✧ si leggono solo se le sa a memoria. Ma l'onestà è chiara e piacerebbe: "mai tue" e "non è tuo" dicono bene il confine, e la noia detta una volta sola non viene gonfiata. Stona il "Vuoi il resto?" ripetuto e il legame `converge-con` proposto in A mai mostrato nel testo.

## R14 · Il ponte dei primi giorni

### Preparazione

Modello applicato: modello v3 (`_progetto/v2/modello-v3.md`), prompt operativo (i) Specchio. Ora simulata:
`ATLANTE_ORA=2026-11-05T21:00:00+01:00`. Settimana d'uso 1 (§7.5): giorno 1 = 3 novembre, giorno 3 = 5 novembre.

#### 1. Frammenti

##### 1.1 Punto zero (importati, `canale: importato`, fuori dai conti; data = tetto)

Esistono tutti gli importati della simulazione (`_progetto/v2/simulazione/importazione.md`): u01–u31, u26a, s01, s03, s04.
Quelli che contano qui, verbatim:

| id | registrato | voce | delicato | testo (verbatim) |
|---|---|---|---|---|
| 20261005-0000-s01 | 2026-10-05 | ✧ seme (sguardo) | no | il nucleo intero (importazione.md righe 1250–1320). Passi rilevanti: «**Attraversare il dolore a occhi aperti, e trovare dall'altra parte amore e verità.**» · «In uno stadio assurdista, alla Camus. Non nichilismo: accettare il peso di non avere uno scopo superiore, non nascondermi, affrontarlo.» · «2. **Lo sguardo:** affrontarlo senza nascondersi, con lucidità.» |
| 20261004-0000-u19 | 2026-10-04 | ✦ sua (trascrizione d'altri: lettura `altrui: true` nel v3, §3.3) | no | I think human consciousness is a tragic misstep in human evolution. We became too self aware; nature created an aspect of nature separate from itself. We are creatures that should not exist by natural law. We are things that labor under the illusion of having a self, a secretion of sensory experience and feeling, programmed with total assurance that we are each somebody, when in fact everybody’s nobody. I think the honorable thing for our species to do is deny our programming, stop reproducing, walk hand in hand into extinction, one last midnight, brothers and sisters opting out of a raw deal. |
| 20261004-0000-u20 | 2026-10-04 | ✦ | no | True Detective, stagione 1, Rust Cohle: "I don't sleep, I just dream" (episodio 1, *The Long Bright Dark*). |
| 20261004-0000-u22 | 2026-10-04 | ✦ | no | 1. Quanto tenere del testo? / da capire quanto poi tenere |
| 20261004-0000-u01 | 2026-10-04 | ✦ | no | battaglie interiori, solitudine, senso di vuoto, apatia, dolore, rabbia, risentimento. Percorso, avventura, musica, caos, libertà, gioia, vincere se stessi. Consapevolezza, pace interiore nel guardare alle battaglie interiori e alle versioni di me morte lungo il percorso, innalzarsi a una dimensione superiore. Assurdità dell'essenza stessa della vita, calma nell'esplorarne i concetti data dall'immensità del dolore superato. |
| 20261004-0000-u06 | 2026-10-04 | ✦ | no | voglia di esperienza, accettare di non avere risposte alle grandi domande, lasciarsi prendere dal fascino della vita, trovare valore nelle piccole cose. |
| 20261004-0000-u09 | 2026-10-04 | ✦ | no | non esiste un bene assoluto, ma solo relativo al negativo esplorato. |
| 20261004-0000-s03 | 2026-10-04 | ✧ (racconto) | no | punto 4: «È emerso un nucleo: il viaggio, l'affrontare la realtà, lo stadio assurdista non nichilista, il dolore come dimensione principale e, oltre, amore e verità.» |

Letture importate rilevanti: u19 → `nomina: monologo-di-rust` (✦), `serve-a: tatuaggi` (◌), `parole: [coscienza, illusione del sé, estinzione]`;
**nessun legame a `nichilismo`**. s01 → `parole` comprende `nichilismo`, `lucidità`; tema `temi/nichilismo.md` con
`nato-da: [20261005-0000-s01, 20261004-0000-s03]` (solo seme). Nodi presenti: `rust-cohle`, `monologo-di-rust`
(`autore: Nic Pizzolatto`, `detta-da: rust-cohle`, luogo "episodio 1, The Long Bright Dark, in macchina con Marty (da verificare)"),
`true-detective-s1`, `camus`, `nichilismo`, … Nessun nodo `friedrich-nietzsche`, nessun `sisifo`.

##### 1.2 Da novembre (`canale: telefono`)

| id | registrato | voce | delicato | testo (verbatim) |
|---|---|---|---|---|
| 20261103-2340-k7q2 (B01) | 2026-11-03T23:40:12+01:00 | ✦ | no | ho visto uno spezzone di galimberti a teatro, credo lo spettacolo sulle emozioni, diceva che il nichilismo è l'ospite inquietante e che i ragazzi nn stanno male per motivi psicologici ma culturali. molto interessante |
| 20261104-0812-b3n8 (B02) | 2026-11-04T08:12:00+01:00 | ✦ | no | ah e la frase dell'ospite era verso la fine, quando parlava dei greci |

Letture v1 (modello v3 §3.3 e §13.4, alla lettera):
- B01: `intento: [salva]`; `reazione: [{parole: "molto interessante", verso: "+"}]`; legami ✦ `nomina umberto-galimberti`,
  `nomina spettacolo-sulle-emozioni`, `nomina il-nichilismo-e-l-ospite-inquietante`, `parla-di nichilismo`;
  `parole: [ragazzi, cultura]`; `risposta: r-20261103-2341-risposta`. Nessun legame ◌.
- B02: `intento: [salva]`; `ritorna-su 20261103-2340-k7q2 come: aggiunge` ✦; `nomina il-nichilismo-e-l-ospite-inquietante momento: "verso la fine"` ✦;
  `parole: [greci]`; `risposta: salvato` (nessun file).

Nodi nati il 3 novembre: `persone/umberto-galimberti.md` (`cerchia: mondo`), `opere/spettacolo-sulle-emozioni.md`,
`citazioni/il-nichilismo-e-l-ospite-inquietante.md` (`autore: ~Friedrich Nietzsche`, `attribuita-a: umberto-galimberti`, nessun `esito`: ⚠).

#### 2. Restituzioni precedenti

- `restituzioni/2026/11/r-20261103-2341-risposta.md` (risposta del banco a B01, forma del v3 §13.2):
  > **Salvato.** 1. "L'ospite inquietante" è un'immagine di Nietzsche ○; Galimberti ci ha scritto un libro ○.
  > 2. Lo spettacolo era *Il mondo delle emozioni*? ⚠
- B02: "Aggiunto allo spezzone di ieri." (banco); nel v3 `risposta: salvato`, nessun file. Niente di più.
- Eredità (`forma: eredita`, fuori dai conti), quelle che toccano il tema: `r-20261007-0000-eredita-citazioni`
  (voce 11 Schopenhauer, il pendolo dolore/noia ◌; voce 14 Zapffe, *L'ultimo Messia* ◌; voce 2 Rust, ep. 8 ◌);
  `r-20261004-0000-eredita-c08` («La lucidità pagata cara.», `converge-con` s01 ↔ fma-brotherhood, ✧);
  `r-20261004-0000-eredita-c05` (s01, divina-commedia, rust-cohle: l'uscita a riveder le stelle). Nessuna eredità lega
  Galimberti (assente dal punto zero) né lega u19 a "cultura" o "psicologia".
- Nessuna lettera precedente. Nessun ritratto del giorno 1 rilevante per il ponte (non nominato dalla Preparazione).

#### 3. Registro dei richiami

Vuoto: nessun "ti ricordi?", nessun seme già usato, nessun ponte già detto da novembre.

#### 4. Estratto di `contesto/mappa.md` (calcolato come `contesto.mjs`, §6.1–6.2)

```text
aggiornato: 2026-11-04T08:13:30+01:00
fino-a: 20261104-0812-b3n8
## stato
giorni attivi totali: 2 (2026-11-03, 2026-11-04)
frammenti parlanti totali (importati esclusi): 2 · settimana 2–8 nov: 2
lettera: no (2 parlanti dall'inizio del periodo, 2026-10-08; soglia 3)
sogno: spento (2 < 50) · ritratto 1 dic: soglia 10 nel mese
## nodi (estratto)
umberto-galimberti · persona · ✦2 ◌0 ●0 · 2026-11-03–2026-11-04 · vicenda no
il-nichilismo-e-l-ospite-inquietante · citazione · ✦2 · ⚠
nichilismo · tema · ✦1 (+ seme s01, s03) · vicenda no
monologo-di-rust · citazione · ✦0 da novembre (importato u19)
## parole candidate
ragazzi (2026-11-03, 1 giorno) · cultura (2026-11-03, 1) · greci (2026-11-04, 1)
## ricordabili
nessuno (servono > 60 giorni attivi; ce ne sono 2)
## seme già usato
nessuno
## immagini già usate
nessuna da restituzioni non eredita
## vicini di 20261103-2340-k7q2 (pacchetto di smista, §6.2)
20261005-0000-s01 (nichilismo, ✧) · 20261004-0000-s03 (nichilismo, ✧)
```

Come si è calcolato: parlante = intento non solo `niente` e ≥ 3 parole tolti i link (§3.3); giorno attivo = giorno con ≥ 1
parlante non importato (§6.2); conti con un piccolo script su B01 e B02 (risultato: 2 parlanti, 2 giorni attivi, lettera
falsa, sogno falso). Vicini = ✦ o ✧ che condividono un nodo o una parola candidata, più vecchi di 7 giorni: u19 non
condivide nodi (`monologo-di-rust`) né parole (`coscienza`, `illusione del sé`, `estinzione`) con B01, quindi non è un vicino.

### Uscita

#### Uscita A (v3 alla lettera)

**Sul telefono** (Specchio, aperto da lui giovedì 2026-11-05 alle 21:00; nessuna notifica)

> Nessun memo nuovo.

**File**

Nessuno. `ingresso/` è vuoto: B01 e B02 sono già stati smistati con le loro risposte; nessuna domanda, quindi nessun
frammento di chat né restituzione; nessun commit.

Log: `2026-11-05 21:00 specchio: ingresso vuoto, 0 memo, 0 ponti (prompt i, passo 2) · 2026-11-08 03:13 consolida: nessuna lettera, 2 frammenti parlanti < 3 (§7.6), la lettera slitta`

#### Uscita B (forzato un solo punto: lo Specchio del giorno 3 cerca il ponte anche sui memo dei giorni 1–3 già smistati)

**Sul telefono** (Specchio, 2026-11-05, 21:03; nessuna notifica)

> Martedì 23:40, Galimberti: *i ragazzi nn stanno male per motivi psicologici ma culturali* ✦ (3 novembre).
> Entro il 4 ottobre avevi trascritto Rust ✦: «I think human consciousness is a tragic misstep in human evolution» ○.
> 1. Tutti e due tolgono il male alla psicologia: Galimberti lo mette nella cultura, Rust nella coscienza stessa ◌.

**File** `restituzioni/2026/11/r-20261105-2103-risposta.md`

```md
---
schema: 3
forma: risposta
letto-da: <modello>
registrato: 2026-11-05T21:03:00+01:00
per: 20261103-2340-k7q2
aggancio: {a: 20261004-0000-u19}
voci:
  - {n: 1, rif: 20261004-0000-u19, voce: proposta, cosa: ponte}
legami:
  - {p: converge-con, tra: [20261103-2340-k7q2, 20261004-0000-u19], voce: proposta, perche: "tutti e due tolgono il male alla psicologia: Galimberti lo mette nella cultura, Rust nella coscienza stessa"}
---
Martedì 23:40, Galimberti: *i ragazzi nn stanno male per motivi psicologici ma culturali* ✦ (3 novembre).
Entro il 4 ottobre avevi trascritto Rust ✦: «I think human consciousness is a tragic misstep in human evolution» ○.
1. Tutti e due tolgono il male alla psicologia: Galimberti lo mette nella cultura, Rust nella coscienza stessa ◌.
```

**Altri file**
- Nessuna lettura nuova (B01 e B02 hanno già la v1; lo Specchio non riscrive letture).
- `contesto/` non toccato (lo Specchio della prima settimana non lo legge né lo rigenera).
- Commit `specchio del 2026-11-05: 0 memo, 1 ponte`, dopo `node scripts/verifica.mjs`.

### Giudizio (giudice cieco)

Letti: banco (X1–X6, R14, Giudice AI), B01/B02, preparazione, uscita, importazione.md (grep esatto), modello-v3 §16.2 e schema.
Verifica verbatim: B01 "i ragazzi nn stanno male per motivi psicologici ma culturali" presente nel banco (riga 47) e identica;
"I think human consciousness is a tragic misstep in human evolution" presente 1 volta in importazione.md (u19, 4 ottobre).
§16.2 non ha righe su R14: nessuna divergenza dichiarata pertinente.

#### Uscita A (nessun ponte)

| criterio | esito | prova |
|---|---|---|
| D1 | passa (n.a.) | nessun ponte, nessuna citazione da controllare |
| D2 | passa (n.a.) | nessun legame, nessun file (0 ≤ 1) |
| D3 | passa | nessun nodo citato |
| D4 | passa | 1 riga: "Nessun memo nuovo."; nessun "?" |
| X1 | passa | nessuna citazione |
| X2 | passa | nessun fatto, nessun testo di canzone |
| X3 | passa | nessuna lode, nessuna diagnosi/consiglio |
| X4 | passa | B12/B25 non toccati |
| X5 | passa | nessun file, "nessun commit": diff vuoto |
| X6 | passa | importati non usati nei conti |

Giudice (senza ponte vale solo la 3). Q3 "inventato o forzato?" (deve essere no): no, nessun nesso asserito
(voti: no / no / no, maggioranza no, richiesto).
Esito A: **passa**.
Nota: la frase "Nessun memo nuovo." parla di memo, non dice "niente si aggancia ancora" (uscita attesa, e §7.5: "Specchio lo dice"):
solo il log ("0 ponti") lo dice. Non è un criterio, ma la franchezza è debole.

#### Uscita B (ponte Galimberti ↔ Rust)

| criterio | esito | prova |
|---|---|---|
| D1 | passa | cita B01 verbatim "nn" compreso, con data (Martedì 23:40, 3 novembre = martedì), e u19 verbatim, "Entro il 4 ottobre" |
| D2 | passa | un solo legame `converge-con` con `perche`, voce `proposta` (◌) |
| D3 | passa | u19 è nel punto zero |
| D4 | passa | 3 righe di corpo; nessuna domanda |
| X1 | passa | entrambe le citazioni ✦ ritrovate con ricerca esatta; Rust datato 4 ottobre (X6 ok) |
| X2 | **fallisce** | riga 2: la frase di Rust è marcata ○ ma senza opera né luogo (nessun *True Detective*, nessun episodio) e senza ⚠/"(da verificare)" |
| X3 | passa | nessun termine vietato |
| X4 | passa | B01, u19 non delicati |
| X5 | passa | `r-20261105-2103-risposta.md`, forma `risposta` valida con `per`; voce con `rif`; legame con `perche`; scritto solo in `restituzioni/` |
| X6 | passa | u19 importato, citato con data del punto zero, fuori dai conti |

Giudice (soglia: tutte e tre le risposte giuste).
- Q1 nesso che lui non aveva fatto: sì / sì / sì. Motivo: nessun legame B01–u19 nell'archivio ("Tutti e due tolgono il male alla psicologia").
- Q2 regge senza "◌ perché": no / no / no. Motivo: le righe 1–2 messe una accanto all'altra non parlano di psicologia: Rust non lo dice, il nesso sta tutto nella riga 3.
- Q3 inventato o forzato (deve essere no): sì / sì / no, maggioranza sì (forzato). Motivo: Rust sostiene un'ontologia ("coscienza... misstep"), non "toglie il male alla psicologia"; il modello stesso (§7.6 punto 4) giudica non forte il ponte con Rust a caldo.
Soglia non raggiunta (Q2 e Q3).
Esito B: **fallisce** (X2; giudice: Q2, Q3). Nessuna divergenza dichiarata.
Gravità (da banco): alta.

#### A pancia
Sul telefono B si legge bene (tre righe, le sue parole, la data), ma il nesso suona costruito e la citazione in inglese ○ resta fredda e senza fonte. A è onesta ma avara: "Nessun memo nuovo." non dice che il ponte non c'è, e il silenzio può sembrare un malfunzionamento.
