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
- Giro 3: critiche (tempo, semplicità), simulazioni (importazione, ingresso, domande), banco-di-prova-v2.md, voce.md, prompt-operativi.md.
- Giro 4: piano.md (13 blocchi, passi manuali U1–U9), prova-tempo (4/10 passano), prova-restituzione (7/14 alla lettera, 12/14 con le soglie corrette), correzioni-citazioni.md (24 citazioni corrette SULL'ATLANTE, ma solo su questo branch: per l'import vanno unite a main, su decisione dell'utente), prompt-v3.md (prompt allineati, con 15 incoerenze del v3 segnalate).

## In corso (giro 6: correzioni dopo la prova a freddo)
Prova a freddo (prova-a-freddo.md): una sessione con il solo pacchetto ha costruito i blocchi 0–4 (import 43/43, ritratto 3/3 giudici), poi si è bloccata al 5. Registro di 69 voci, 18 gravi. Seconda prova di restituzione: 10/14, con le correzioni di forma già applicate.
Correzioni in corso, ciascuna sulla propria area del registro:
- M session_01WgHig3GnW2DvdKsdGC6XzM: modello (bug schema §3.7 da verificare con ajv, §3.5, Chiedi, nota 200 caratteri, alias per cognome, riconciliazione slug §14) → claude/v3-modello
- B2 session_01WgHig3o88JPFpAdTisBt6S: banco riscritto nel vocabolario v3 → claude/v3-banco
- P session_01WgHifzv9xzwECdY2BAVM22: piano (contesto.mjs e setup.sh anticipati, esito all'ingresso, misure reali, prototipo come punto di partenza?) → claude/v4-piano
- A session_01WgHig3o9ro6H6FejVFcJkr: prompt (correzione di smista dalla prova, ricordo n. 76, memo n. 77) → claude/v4-allineamento
Unire con `git checkout --theirs` sui conflitti dei file di area (README: unione delle righe), poi `bash _progetto/pacchetto/aggiorna.sh`.

## Prossimi passi
1. Seconda prova a freddo (sessione nuova, solo pacchetto, blocchi 0–6) fino a "pronto".
2. Restituire all'utente: il pacchetto, prompt-avvio.md e le scelte (nome del repo; unire a main le correzioni delle citazioni e il pacchetto, così l'import legge main; un solo account claude.ai collegato al GitHub nuovo).
3. Voce di diario e commit.

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
