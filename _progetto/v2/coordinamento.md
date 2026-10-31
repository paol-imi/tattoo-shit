# Coordinamento (stato del lavoro)

Stato aggiornato al 2026-10-31 dal coordinatore (session_01WgHifzjvpDEAT85Q78BpuF), per riprendere il lavoro dopo una compattazione.
Branch di raccolta: `claude/quirky-newton-qe5g9o`. Ogni sessione lavora su un branch suo; il coordinatore lo unisce qui (conflitti solo su `_progetto/README.md`: si risolvono tenendo entrambe le righe).

## Richiesta dell'utente
- Un sistema che "mappi tutto quello che mi passa per la mente, come un memo, con la meraviglia dell'AI e del mappare una coscienza" (esempio Galimberti; domande come "canzoni con questo tema", "top quote di Dostoevskij").
- Il coordinatore coordina e basta: lancia sessioni e subagent con compiti piccoli e chiusi, e tiene pulito il proprio contesto.
- Dopo il primo giro, troppo veloce, l'utente ha chiesto un raffinamento profondo ("sangue sudore lacrime... lavorare sugli esempi, non farmi perdere tempo").
- L'implementazione la farà un'altra chat su un ALTRO account GitHub. Il prompt finale deve essere autosufficiente: dentro ci va tutto il necessario, senza dipendere da questo repo.
- Il nome del nuovo repo privato è ancora da scegliere e non blocca il lavoro.
- Lancia in parallelo tutto quello che serve.

## Giri completati
1. Primo giro (superato): `_progetto/proposta.md` + schema, domande, acquisizione, migrazione; `avvio.md` è il prompt vecchio, da sostituire.
2. Ricerca v2, in `_progetto/v2/`: essenza, esempi-ingresso (68), esempi-domande (108), cervello, stato-arte, archivio-reale, restituzione (prove vere, mandata all'utente), telefono, eredita, citazioni, identita.
3. Modello v2: `_progetto/v2/modello.md` + `banco-di-prova.md` (25 messaggi + 25 domande).

## Completati
- Giro 3: critica-tempo.md, critica-semplicita.md, simulazione/importazione (+ regole, attriti), banco-di-prova-v2.md, voce.md + prompt-operativi.md, simulazione/domande-simulate.md + attriti-domande.md.
- Modello v3: modello-v3.md (allineato a banco v2, voce, prompt, attriti domande). Manca solo l'integrazione della simulazione dell'ingresso.

## In corso (giro 4)
| Sessione | Compito | Branch | Output |
|---|---|---|---|
| session_01WgHifykAB2cgnqa8vKxDwg | S1 simulazione ingresso (quasi finita) | claude/v3-sim-ingresso | simulazione/ingresso.md, attriti-ingresso.md |
| session_01WgHig3GnW2DvdKsdGC6XzM | M modello v3: QUANDO ARRIVA S1 girargli il riassunto con send_message | claude/v3-modello | modello-v3.md |
| session_01WgHifzv9xzwECdY2BAVM22 | P piano di implementazione eseguibile dall'altro account | claude/v4-piano | piano.md |
| session_01WgHifyR2ErMvFtJGTrRGFG | TR prova R01–R14 sul v3, con giudice separato (soglia ≥10/14 + R01, R06, R07, R14) | claude/v4-prova-restituzione | simulazione/prova-restituzione.md, attriti-restituzione.md |
| session_01WgHig19brLHAhAd5X9cpDd | TT prova T01–T10 sul v3 (dati sintetici, misure vere) | claude/v4-prova-tempo | simulazione/prova-tempo.md, attriti-tempo.md |

Decisioni del coordinatore: la restituzione resta (si decide con la prova TR); ritratto mensile nei primi 3 mesi, poi trimestrale; dove modello e critica-tempo divergono vale critica-tempo.

## Prossimi passi
1. Unire i branch man mano. Girare S1, TR e TT alla sessione M per l'ultima revisione del v3.
2. Riallineare prompt-operativi.md e banco-di-prova-v2.md ai nomi del v3 (una sessione).
3. Pacchetto per l'altro account: una cartella `_progetto/pacchetto/` con i file da copiare nel nuovo repo (modello, banco, voce, prompt, CLAUDE.md nuovo, regole di import, protocolli) + `prompt-avvio.md` autosufficiente, che sostituisce avvio.md.
4. Revisione finale avversaria del pacchetto: una sessione "a freddo" che lo legge senza contesto e prova a partire.
5. Voce di diario e commit. Attenzione: `<…>` fuori dal codice rompe il build del sito.

## Diagnosi chiave da non perdere
- Nell'Atlante l'utente ha scritto ~8 note su ~320, ha preso 0 decisioni su ~130 proposte, ha dato 0 risposte "a pancia", poi 23 giorni di silenzio.
- Da qui il principio "cattura cieca, struttura derivata": niente coda di validazione, la validazione avviene con l'uso, e la meraviglia sta nella restituzione.
- Provenienza non negoziabile; citazioni con protocollo rigoroso (0/12 giuste alla lettera); ID esterni solo nel consolidamento, mai in automatico.
- Telefono: Comando rapido → `ingresso/` → Routine "smista" → push su main → `contesto/` → Progetto claude.ai per le domande; MCP nella tappa 2.

## Restano all'utente
- Il nome del repo.
- Quanto parla per primo il sistema (racc.: lettera domenicale + ritratto trimestrale).
- Il sogno (racc.: max 1 al mese).
- Il giudizio a pancia su `restituzione.md` (chiesto, ancora senza risposta).
- Fuori ambito, da proporre: correggere le citazioni sbagliate dell'Atlante (vedi citazioni.md, simulazione/attriti-importazione.md A8).
