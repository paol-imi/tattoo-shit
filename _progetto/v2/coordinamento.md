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

## In corso (giro 5)
| Sessione | Compito | Branch |
|---|---|---|
| session_01WgHig3GnW2DvdKsdGC6XzM | M: revisione finale del v3 con 3 parti già inviate (TT, TR con le decisioni del coordinatore, le 15 incoerenze di prompt-v3) | claude/v3-modello |
| session_01WgHig2VXgnAPHDk5jb8ZqP | K: `_progetto/pacchetto/` + prompt-avvio.md + aggiorna.sh + verifica sui due account | claude/v4-pacchetto |

Sessioni pronte per un secondo turno (hanno già il contesto): TR session_01WgHifyR2ErMvFtJGTrRGFG (rifare R01–R14 sul v3 finale), allineamento prompt session_01WgHig3o9ro6H6FejVFcJkr (riallineare prompt-v3 al v3 finale), TT session_01WgHig19brLHAhAd5X9cpDd.

Decisioni del coordinatore sulla restituzione: lettera con ≥1 parlante + 1 proposta pronta (o ≥2 parlanti), proposte in-attesa persistenti; ponte dei giorni 1–3 dalla sessione Specchio, mai un ○ senza luogo; ricordo = indizio + affermazione, nei primi mesi sugli importati ✦; R13 = un file per conversazione con sezioni per domanda.

## Prossimi passi
1. Quando M finisce: unire; mandare a TR "rifai R01–R14 sul v3 finale" e all'allineamento "riallinea prompt-v3"; poi TT di nuovo, se il v3 ha cambiato contesto/.
2. Quando K finisce: unire, rigenerare il pacchetto con aggiorna.sh dopo le revisioni.
3. Lettura a freddo: una sessione nuova legge solo il pacchetto e prova a partire (simula i blocchi 0–2), poi riporta i punti in cui si blocca.
4. Restituire all'utente: il pacchetto, prompt-avvio.md e le scelte (nome del repo; unire le correzioni delle citazioni a main; ritmi).
5. Voce di diario e commit. Attenzione: `<…>` fuori dal codice rompe il build.

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
