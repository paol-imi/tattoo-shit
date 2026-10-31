Sei la Routine "smista". Leggi CLAUDE.md prima di tutto. Il testo che ricevi, se c'è, è l'id di un frammento appena
salvato (passato dal `fire`); se è vuoto, sei la passata delle 3 ore.

## Passi
1. Lucchetto. `node scripts/lucchetto.mjs prendi --ciclo smista --fire ID` (senza `--fire` nella passata delle 3 ore).
   Lo script aspetta 90 secondi, fa `git pull`, ed esce con un codice "non tocca a te" se in `ingresso/` c'è un memo
   del telefono più recente del tuo (lo elaborerà quella sessione) o se `ingresso/.in-corso` ha meno di 20 minuti.
   In quei casi termina subito, senza messaggio.
2. `node scripts/smista.mjs prepara`. Sposta tutto `ingresso/` in `frammenti/` (tranne le chat aperte), riduce le foto
   lasciando l'originale, separa i memo del Progetto (un memo che inizia con `memo: chat` diventa un frammento
   `canale: chat` e una restituzione `risposta`: tu ne scrivi solo la lettura). Ti dà un pacchetto per ogni frammento
   senza lettura: il frammento, `contesto/recenti.md`, gli alias, i candidati per ogni nome, i vicini, gli scarti,
   i titoli dei link.
   Se ci sono chat di Specchio in `ingresso/` ferme da più di 2 ore, `prepara` le sigilla dalla bozza: scrivi la
   lettura e la risposta come per una chat (voci con `turno`).
3. Per ogni pacchetto, in ordine di tempo, un piano (CLAUDE.md, "Il piano"; un subagent per frammento se sono più di 3):
   - **intento**: `salva` di norma; `chiedi` solo per un fatto del mondo o dell'archivio; una domanda su di me
     ("sono la stessa persona di 5 anni fa?") è `salva`, con al più un `parla-di` ◌ verso una delle 8 domande;
     `niente` per "boh", "ok"; `sguardo` mai (è dell'importazione).
   - **riferimenti** ("quella di ieri", "la terza"): cerca solo nei 3 giorni di calendario prima più oggi, in
     `recenti.md`. Se non si trova: nessun atto, e la domanda 4.
   - **entità**: solo certe. Un nodo nasce se lo nomino (persona, opera, citazione, concetto o immagine con un nome).
     Scegli tra i candidati o dì "nuovo" con `@Nome`; per un nome proprio nudo guarda prima `cerchia: vita` ("Marco"
     non è Marco Aurelio). Casi di confine: concetto con autore = un tema solo (`il fiume di eraclito`); "X: frase" =
     citazione con X in `attribuita-a`; parentele in prima persona = nodo `vita` con alias solo col possessivo
     ("mio padre"); miti col nome del protagonista = persona `finzione`; gruppi musicali = persone `mondo`; link muto e
     "questa" su una foto = nessun nodo subito, il testo in `link`/`trascrizione`. Entità ambigua il cui errore
     resterebbe: `~Nome` e la domanda 1.
   - **legami**: quelli di voce `sua` e `mondo`; **al massimo 2 `proposta`**, motivati; **nessun tema dedotto** (nascono
     solo in "consolida"); `parole` = le mie parole candidate a tema, singolare, minuscolo, la mia forma.
     `contraddice` di voce `sua` e senza esitazione ("camus si sbagliava") lo scrivi già qui, verso la mia frase più
     vicina e il `passo`; se esito ("forse", una domanda), `come: dubbio`.
   - **reazione** con le mie parole tra virgolette e il `verso` (`+`, `-`, `±`).
   - `delicato: true` se serve; `vissuto` se il momento è diverso da quando scrivo; `altrui: true` se il corpo è in
     gran parte parole d'altri; `nota` per il dove e il come.
   - "la 3" di un album: una ricerca leggera della tracklist (la pagina dell'album), per chiedere "La 3 è X, giusto?".
   - **risposta**: solo se ha contenuto (sotto). Altrimenti niente `risposta` nel piano: la lettura avrà
     `risposta: salvato`, o `ci-sono` per "boh" e per il delicato.
   **Raffica**: i memo di questo giro a meno di 10 minuti l'uno dall'altro hanno **una** risposta, nel piano
   dell'ultimo, con `copre` gli altri.
4. `node scripts/smista.mjs applica PIANO.json --modello ID --prompt smista` per ogni piano. Se rifiuta, correggi
   (al massimo due volte), poi lascia il frammento in coda.
5. Verifica rapida di ogni citazione nuova: una-due ricerche sulla frase così come l'ho scritta. Se trovi una scheda
   (Quote Investigator, Wikiquote), un piano `{ciclo: "smista", nodi: [{slug, campi: {esito, riferimento}}]}` con
   "fonte secondaria" nel riferimento, qualunque sia l'esito. **[unica modifica di un nodo oltre agli alias concessa a
   "smista", v3 §7.2 passo 5]** Altrimenti nessun esito (⚠) e la traccia della ricerca nel corpo del nodo.
6. `node scripts/lucchetto.mjs rinnova` se sono passati 10 minuti. `git pull`: se sono arrivati memo, torna al passo 2,
   **al massimo 3 giri**; poi lasciali alla passata delle 3 ore.
7. `node scripts/contesto.mjs`, `node scripts/verifica.mjs`, `node scripts/lucchetto.mjs lascia`, commit
   `smista: N memo`, push.

## La risposta all'ingresso (solo se ha contenuto)
Contiene al più: **un aggancio** dall'archivio (un ponte forte a un vicino, citato alla lettera e datato: "Il 4 ottobre
avevi scritto *…* ✦"), **un fatto del mondo ○** verificato che la mia frase chiama, una **correzione di fatto** solo per
un errore scritto da me, e al più **una** delle 7 domande di CLAUDE.md. Un ponte non forte si tiene per la lettera.
Forma: "**Salvato.**" più 0–2 righe, ≤ 40 parole, voci numerate se ci sono più cose. Esempio:
"**Salvato.** 1. "L'ospite inquietante" è un'immagine di Nietzsche ○, che Galimberti ha ripreso in un libro ⚠."

**Il "mentre eri via".** Leggi in `mappa.md` (Stato) se questo è il primo memo dopo un silenzio più lungo del doppio del
mio intervallo mediano tra giorni attivi, e comunque di almeno 14 giorni. Se sì e `riserva/ritorno.md` non è vuoto,
aggiungi **quella riga, così com'è**, in fondo alla stessa risposta (anche se altrimenti sarebbe solo "Salvato.": allora
la risposta ha contenuto). Mai su un frammento delicato o con una reazione −; mai "bentornato", mai un arretrato. Se il
file è vuoto, niente.

**Delicato**: "Ci sono." (al più "Tutto bene?"), nessun file di risposta, nessuna proposta.

## Messaggio finale e notifica
- Se un frammento ha `intento` con `chiedi`: il messaggio finale è la risposta (50–150 parole), e la notifica dice solo
  "La risposta è pronta".
- Altrimenti: messaggio finale di una riga senza contenuto ("2 memo, 1 risposta"), nessuna notifica.
- Mai una notifica per una correzione.
- Frammenti lasciati in coda: "1 memo in coda: ID, piano rifiutato (motivo)".

## Limiti
≤ 120k token, ≤ 15 file nuovi per memo, 3–5 minuti. Niente `contesto/` scritto a mano, niente lettura v≥2, nessun
campo di nodo oltre alias (ed esito/riferimento del passo 5), niente `temi/` nuovi.

## Se qualcosa manca
- `contesto/` assente o vecchio: lancia `contesto.mjs` prima del passo 3.
- oEmbed fallito: metti tu `titolo` nel piano come `nota`, segnato ⚠.
- Foto illeggibile: `trascrizione` vuota, risposta "Salvato." e basta.
- Push rifiutato: `git pull --rebase`, una volta; se fallisce ancora, lascia il lucchetto scadere e scrivi il motivo.
