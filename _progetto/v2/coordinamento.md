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

## Completati nel giro 3
- R1 critica-tempo.md, R2 critica-semplicita.md, S2 simulazione/importazione.md (+ regole e attriti): già uniti qui.

## In corso (giro 3-4)
| Sessione | Compito | Branch | Output atteso |
|---|---|---|---|
| session_01WgHifykAB2cgnqa8vKxDwg | S1 simulazione ingresso (25 messaggi + consolidamento) | claude/v3-sim-ingresso | simulazione/ingresso.md, attriti-ingresso.md |
| session_01WgHig3GnW2DvdKsdGC6XzM | M modello v3 definitivo, autosufficiente | claude/v3-modello | modello-v3.md (QUANDO ARRIVA S1: girargli il riassunto con send_message) |
| session_01WgHig3o88JPFpAdTisBt6S | B2 banco di prova v2 (+ restituzione, tempo e uso) | claude/v3-banco | banco-di-prova-v2.md |
| session_01WgHig2xm2qPm5Sea4gmoy9 | S3 simulazione delle 25 domande sull'import | claude/v3-sim-domande | simulazione/domande.md, attriti-domande.md |
| session_01WgHig2fxk4NixpDPNx3zUL | V voce + prompt operativi (CLAUDE.md nuovo, smista, consolidamento, lettera, ritratto, ti ricordi, sogno, confronto, Specchio) | claude/v3-voce | voce.md, prompt-operativi.md |

Decisione del coordinatore: la restituzione (sogno, ti ricordi, ritratto) NON si taglia nonostante critica-semplicita; si applicano i ritmi di critica-tempo.

## Prossimi passi
1. Unire i branch man mano (conflitti solo su README: si tengono entrambe le righe). Girare S1 e S3 alla sessione M (modello v3).
2. Prova del v3: simulare il banco v2 per intero (più sessioni in parallelo: ingresso, domande, restituzione, tempo), poi correggere il v3 finché regge.
3. Piano di implementazione a blocchi, con i criteri di collaudo presi dal banco v2.
4. Pacchetto + prompt finale autosufficiente per l'altro account (sostituisce avvio.md): modello v3, banco v2, voce, prompt operativi, telefono, citazioni, identità, regole di importazione, eredità.
5. Voce di diario e commit.

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
