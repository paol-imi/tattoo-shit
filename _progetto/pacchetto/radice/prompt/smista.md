# Routine "smista"

Leggi CLAUDE.md e prompt/piano.md. Il testo che ricevi, se c'è, è l'id del frammento appena salvato; se è vuoto, sei la
passata delle 3 ore.

## Passi
1. **Lucchetto.** `node scripts/lucchetto.mjs prendi --ciclo smista --fire ID` (senza `--fire` nella passata).
   Lo script aspetta 90 secondi e fa `git pull`; esce con "non tocca a te" solo se in `ingresso/` c'è un memo del
   telefono **più recente** del tuo **e con meno di 4 minuti** (lo elaborerà quella sessione): allora termina subito,
   senza messaggio. Se il lucchetto è preso, aspetta fino a 45 minuti; se resta preso, termina (la passata delle 3 ore
   raccoglie tutto). La passata cancella i lucchetti orfani (più vecchi di 20 minuti).
2. `node scripts/smista.mjs prepara`. Sposta tutto `ingresso/` in `frammenti/` tranne le chat aperte; riduce le foto
   lasciando l'originale; separa i memo del Progetto (`memo: chat` diventa un frammento `canale: chat` e una
   restituzione con una sezione per domanda: tu ne scrivi solo la lettura); sigilla le chat di Specchio ferme da prima
   delle 04:00 di oggi. Ti dà un pacchetto per ogni frammento senza lettura: il frammento, `contesto/recenti.md`, gli
   alias, i candidati per ogni nome, i vicini (nei primi 3 giorni tutti gli importati ✦), gli scarti, i titoli dei link.
3. Per ogni pacchetto, in ordine di tempo (un subagent per frammento se sono più di 3), le operazioni del piano:
   - **intento**: `salva` di norma; `chiedi` solo per un fatto del mondo o dell'archivio; una domanda su di me ("sono la
     stessa persona di 5 anni fa?") è `salva`, con al più un `parla-di` ◌ verso una delle 8 domande; `niente` per "boh",
     "ok"; `sguardo` mai.
   - **riferimenti** ("quella di ieri", "la terza"): solo nei 3 giorni di calendario prima più oggi, in `recenti.md`.
     Se non si trova: nessun atto, e la domanda 4.
   - **correzioni** ("non era jung era peterson"): `ritorna-su` con `come: corregge`, `nodo`, `campo`, `vecchio`,
     `valore` (`@Nome` se la persona giusta non c'è ancora). Non toccare il nodo: lo aggiorna "consolida".
   - **entità**: solo certe. Un nodo nasce se lo nomino (persona, opera, citazione, concetto o immagine con un nome).
     Scegli tra i candidati o `crea-nodo` con `@Nome`; per un nome proprio nudo guarda prima `cerchia: vita` ("Marco"
     non è Marco Aurelio). Confini: concetto con autore = un tema solo; "X: frase" = citazione con X in
     `attribuita-a`; parentele in prima persona = nodo `vita` con slug fisso (`papa`, `mamma`, `nonna-NOME`) e alias
     solo col possessivo; miti col nome del protagonista = persona `finzione`; gruppi = persone `mondo`; link muto e
     "questa" su una foto = nessun nodo subito, il testo in `link`/`trascrizione`. Entità ambigua il cui errore
     resterebbe: `~Nome` e la domanda 1. Forma nuova di un nodo che c'è: operazione `alias`.
   - **legami**: di voce `sua` e `mondo`; **al massimo 2 `proposta`**, motivati; **nessun tema dedotto** e **nessun
     `contraddice`** (li scrive "consolida"); `parole` = le mie parole candidate a tema, singolare, minuscolo.
   - **reazione**: le mie parole copiate esatte e il `verso` (`+`, `-`, `±`).
   - `delicato: true` se serve; `vissuto` se il momento è diverso; `altrui: true` solo per una trascrizione; `nota`
     per il dove e il come.
   - "la 3" di un album: una ricerca leggera della tracklist, per chiedere "La 3 è X, giusto?".
   - **verifica rapida** di ogni citazione **nuova**, prima di applicare: una-due ricerche sulla frase così come l'ho
     scritta. Se trovi una scheda (Quote Investigator, Wikiquote), metti `esito` e `riferimento` ("fonte secondaria")
     nel `crea-nodo`, qualunque sia l'esito; altrimenti nessun esito (⚠) e la traccia della ricerca nel `corpo`. La mia
     attribuzione sempre in `attribuita-a`; `autore` solo se verificato.
   - **risposta** (sotto), solo se ha contenuto. Altrimenti la lettura ha `risposta: salvato` (o `ci-sono` per "boh" e
     per il delicato).
   **Raffica**: tutti i memo che elabori in questa sessione, in tutti i giri, hanno **una** risposta, con `per`
   l'ultimo e `copre` gli altri. Se in `recenti.md` c'è già una risposta con `per` a meno di 10 minuti dal tuo primo
   memo, non scriverne un'altra: la lettura punta a quella (`risposta: ID`).
4. `node scripts/applica.mjs PIANO.json`. Se rifiuta: prompt/piano.md, "Rifiuto".
5. `node scripts/lucchetto.mjs rinnova` se sono passati 10 minuti (se il lucchetto non è più tuo, abbandona senza
   spingere). `git pull`: se sono arrivati memo, torna al passo 2, **al massimo 3 giri**; poi lasciali alla passata.
6. `node scripts/contesto.mjs`, `node scripts/verifica.mjs`, `node scripts/lucchetto.mjs lascia`, commit
   `smista: N memo`, push.

## La risposta (solo se ha contenuto)
Al più: **un aggancio** dall'archivio (un ponte forte a un vicino, con un **luogo preciso** da entrambe le parti: la mia
frase alla lettera con la data, e per un ○ l'opera e il passo; un ○ senza luogo non si consegna mai), **un fatto del
mondo ○** verificato che la mia frase chiama, una **correzione di fatto** solo per un errore scritto da me, al più **una**
delle 7 domande di CLAUDE.md. Un ponte non forte si tiene per la lettera. Forma: "**Salvato.**" più 0–2 righe, ≤ 40
parole, voci numerate se ci sono più cose.
Esempio: "**Salvato.** 1. "L'ospite inquietante" è un'immagine di Nietzsche ○, che Galimberti ha ripreso in un libro ⚠."

**Il "mentre eri via".** Se `mappa.md` (Stato) dice che questo è il primo memo dopo un silenzio più lungo del doppio del
mio intervallo mediano tra giorni attivi, e comunque di almeno 14 giorni, e `riserva/ritorno.md` non è vuoto: aggiungi
**quella riga, così com'è**, in fondo alla stessa risposta (allora la risposta ha contenuto). Mai su un frammento delicato
o con una reazione `-`; mai "bentornato", mai un arretrato. File vuoto: niente.

**Delicato**: "Ci sono." (al più "Tutto bene?"), nessuna proposta, nessun file di risposta.

## Messaggio finale e notifica
- Se un frammento ha `intento` con `chiedi`: il messaggio finale è la risposta (fino a 150 parole) e la notifica dice
  solo "La risposta è pronta".
- Altrimenti: una riga senza contenuto ("2 memo, 1 risposta"), nessuna notifica. Mai una notifica per una correzione.
- Frammenti lasciati in coda: "1 memo in coda: ID, piano rifiutato (motivo)".

## Limiti
≤ 120k token, ≤ 15 file nuovi per memo, 3–5 minuti. Mai letture v ≥ 2, mai `aggiorna-nodo`, mai `temi/` nuovi, mai
`contraddice`, mai `riserva/`.

## Se qualcosa manca
- `contesto/` assente: `contesto.mjs` prima del passo 3.
- oEmbed fallito: il titolo in `nota`, con ⚠.
- Foto illeggibile: `trascrizione` vuota, "Salvato." e basta.
- Push rifiutato: `git pull --rebase` e il fencing; se il lucchetto è ancora tuo, ritenta una volta; se no, abbandona.
