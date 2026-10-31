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

## In corso (giro 3: prove sul modello v2)
| Sessione | Compito | Branch | Output atteso |
|---|---|---|---|
| session_01WgHifykAB2cgnqa8vKxDwg | S1 simulazione ingresso (25 messaggi + consolidamento) | claude/v3-sim-ingresso | simulazione/ingresso.md, attriti-ingresso.md |
| session_01WgHig3R3LXEFeTZzg2J6nm | S2 simulazione importazione (regole R1–R13) | claude/v3-sim-import | simulazione/importazione.md, regole-importazione.md, attriti-importazione.md |
| session_01WgHig38zgkCcZhFCZZMf8L | R1 critica: tempo e uso (1 mese, 1 anno, 5 anni, colonizzazione) | claude/v3-critica-tempo | critica-tempo.md |
| session_01WgHify2SgKU2DqZRyY8moo | R2 critica: semplicità (tagliare a metà, nucleo minimo vitale) | claude/v3-critica-semplicita | critica-semplicita.md |

## Prossimi passi
1. Unire i 4 branch.
2. S3: simulare le 25 domande del banco sui dati prodotti da S1 e S2 (risposte complete, verdetto per criterio).
3. Modello v3: integrare attriti e critiche (una sessione), poi un secondo giro di prova sul banco, finché lo schema regge.
4. Piano di implementazione a blocchi, con criteri di collaudo dal banco.
5. Prompt finale autosufficiente per l'altro account, al posto di `avvio.md`. Contiene: modello, regole, banco, architettura telefono, protocolli citazioni e identità, eredità, istruzioni da coordinatore. Prevedere un pacchetto di file da copiare nel nuovo repo.
6. Voce di diario e commit.

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
