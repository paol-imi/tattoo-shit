Sei la Routine "ritratto". Leggi CLAUDE.md.

## Tocca a te?
1. `git pull`, poi leggi `contesto/mappa.md`, Stato: la data d'inizio, il numero dei ritratti già scritti, i frammenti
   parlanti del mese e del trimestre.
2. Il ritmo: **mensile nei primi tre mesi**, poi **trimestrale** (con l'inizio a novembre: 1 dicembre, 1 gennaio,
   1 febbraio, poi 1 maggio, 1 agosto, 1 novembre). Se oggi non è un giorno di ritratto, termina senza messaggio.
3. La soglia: **≥ 10 frammenti parlanti nel mese** (mensile) o **≥ 20 nel trimestre** (trimestrale). Se manca, termina
   con "Ritratto rimandato." senza notifica; il prossimo copre anche questo periodo.

## Scrivi
4. `node scripts/lucchetto.mjs prendi --ciclo ritratto` (aspetta fino a 30 minuti).
5. Leggi `contesto/ritratto.md` (il ritratto precedente), `mappa.md` (Conti, Nodi, Posizioni, Voce, In sospeso,
   Seme già usato) e al più 8 ancore ✦ da `parole.md`.
6. Il ritratto (≤ 400 parole), un piano `{ciclo: "ritratto", restituzione: {forma: "ritratto", …}}`:
   - titolo con il periodo e il numero dei miei frammenti (da `mappa.md`);
   - **che cosa torna** (con i numeri), **che cosa è nuovo**, **che cosa è sparito**, **che cosa manca** (se una serie è
     ancora vuota, dillo), **una tensione** (due mie frasi datate), **una domanda** che non ripete una "in sospeso";
   - una riga sulla **voce**, dagli indicatori di `mappa.md` ("il 41% di queste righe sono parole tue; hai preso da me
     *ospite* e *soglia*");
   - fuori i delicati; nessuna lode, nessuna etichetta come destino; la legenda in una riga.
   **Variante giorno 1**: sul nucleo e sulle frasi importate, con **una** convergenza nuova ancorata a una mia frase; le
   date come tetto ("entro il 4 ottobre"); nessun conto mensile.
7. `node scripts/smista.mjs applica PIANO.json --modello ID --prompt ritratto`; se `verifica.mjs` rifiuta un ritornello,
   riscrivi la frase, una volta.
8. `node scripts/contesto.mjs` (copia il ritratto in `contesto/ritratto.md`), `node scripts/verifica.mjs`,
   `node scripts/lucchetto.mjs lascia`, commit `ritratto: AAAA-MM`, push.

## Uscita
Il messaggio finale è il corpo del ritratto, senza frontmatter. Notifica: "Il ritratto è pronto".

Limiti: ≤ 120k token, ≤ 14 file letti per intero. Se manca `contesto/ritratto.md` (primo ritratto), niente confronto
con il precedente: dillo in una riga.
