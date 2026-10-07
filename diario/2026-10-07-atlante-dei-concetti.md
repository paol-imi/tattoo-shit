---
tipo: diario
titolo: "L'atlante dei concetti: domande e discipline"
data: 2026-10-07
---

# L'atlante dei concetti: domande e discipline

## Cosa abbiamo fatto

Ho approvato la nuova mappa ("vai con la mappa"): l'archivio non si legge più solo per tipo di nota, ma come un incrocio tra **le domande** che mi faccio e **le discipline** che ci hanno risposto. La struttura (le 8 domande e le 7 discipline) è approvata; quasi tutto quello che ci sta dentro è una **proposta di Claude**, da validare con calma.

**Le 8 domande** (`domande/`): [Chi sono?](/domande/chi-sono.md) · [Perché soffro?](/domande/perche-soffro.md) · [Che senso ha?](/domande/che-senso-ha.md) · [Come devo vivere?](/domande/come-vivere.md) · [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md) · [Cosa è reale?](/domande/cosa-e-reale.md). Ognuna ha un **coro**: le voci che le rispondono, ciascuna con una citazione breve. Il coro è una scelta di Claude e sta in un blocco proposta.

**Le 7 discipline** (`discipline/`): [Filosofia](/discipline/filosofia.md) · [Psicologia](/discipline/psicologia.md) · [Religioni e mito](/discipline/religioni-e-mito.md) · [Letteratura e poesia](/discipline/letteratura.md) · [Arte](/discipline/arte.md) · [Cinema, serie e fumetto](/discipline/cinema-e-serie.md) · [Scienza](/discipline/scienza.md). Ognuna è divisa in **filoni** (lo stoicismo, il pessimismo, la psicologia analitica…), con un periodo e un motto.

**91 note nuove**, tutte `origine: claude`, `validata: false`: autori, opere, miti e concetti che riempiono le domande e le discipline. Stanno nelle cartelle di sempre (`fonti/pensiero`, `fonti/opere`, `fonti/sacro-e-mito`) e in due nuove: `fonti/psicologia` e `fonti/scienza`.

**Campi nuovi nel frontmatter:**

- `domande`: a quali domande risponde la nota; è un collegamento come gli altri, e va anche in `## Collegamenti`;
- `disciplina` e `filone`: dove sta una fonte sulla mappa (se manca, la disciplina si deduce dalla cartella);
- `forma`: autore, opera, mito o concetto;
- `anno`: la nascita o gli anni di attività di un autore, la data di un'opera (negativo = a.C.);
- `autore` (sulle opere) e `influenzato-da`: i legami "autore di" e "influenza" tra le fonti;
- `## Citazione`, prima di `## Collegamenti`: una frase breve; se è di Claude su una nota mia, sta in un blocco proposta.

Le note d'archivio hanno ricevuto disciplina, filone, forma, anno e autore (classificazione e fatti, non si marcano) e le loro domande e influenze (scelte di Claude, elencate qui sotto). Le note nuove che altrimenti sarebbero rimaste senza collegamenti in entrata hanno il ritorno sulle note d'archivio a cui puntano: sul sito resta nascosto finché la nota nuova non è validata.

Il sito era già pronto: il refactor è nella [PR #6](https://github.com/paol-imi/tattoo-shit/pull/6), e la nuova mappa (Tavole, Ruota, Firmamento) legge domande, discipline e filoni; le costellazioni sono i percorsi.

## Come validare

Di default il sito mostra solo il validato; le proposte si vedono con l'interruttore "proposte" o nella pagina [Da validare](https://paol-imi.github.io/tattoo-shit/da-validare).

- **Una nota nuova:** se mi dice qualcosa, `validata: true` e il ritorno sulle note a cui punta; se no, in `_archivio/` con il motivo.
- **Un coro:** sciolgo il blocco proposta nel testo della domanda, oppure tolgo le voci che non sento mie.
- **Un collegamento proposto:** in coda alla riga qui sotto "— validato il AAAA-MM-GG" o "— tolto il AAAA-MM-GG" (e se lo tolgo, lo tolgo anche dalle due note).

## Collegamenti proposti

Le domande e le influenze date alle note d'archivio, e le voci del coro che puntano a note d'archivio.

- Collegamenti proposti:
  - [Albert Camus](/fonti/pensiero/camus.md) → [Che senso ha?](/domande/che-senso-ha.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [Eraclito](/fonti/pensiero/eraclito.md) → [Cosa è reale?](/domande/cosa-e-reale.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [Jordan Peterson](/fonti/pensiero/jordan-peterson.md) → [Come devo vivere?](/domande/come-vivere.md) · [Chi sono?](/domande/chi-sono.md)
  - [Carl Gustav Jung](/fonti/pensiero/jung.md) → [Chi sono?](/domande/chi-sono.md)
  - [Immanuel Kant](/fonti/pensiero/kant.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [Thomas Ligotti](/fonti/pensiero/ligotti.md) → [Perché soffro?](/domande/perche-soffro.md) · [Che senso ha?](/domande/che-senso-ha.md)
  - [Niccolò Machiavelli](/fonti/pensiero/machiavelli.md) → [Come devo vivere?](/domande/come-vivere.md) · [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md)
  - [Maimonide](/fonti/pensiero/maimonide.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md)
  - [Marco Aurelio](/fonti/pensiero/marco-aurelio.md) → [Come devo vivere?](/domande/come-vivere.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Napoleone](/fonti/pensiero/napoleone.md) → [Come devo vivere?](/domande/come-vivere.md)
  - [Friedrich Nietzsche](/fonti/pensiero/nietzsche.md) → [Che senso ha?](/domande/che-senso-ha.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [Romanticismo](/fonti/pensiero/romanticismo.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Chi sono?](/domande/chi-sono.md)
  - [Arthur Schopenhauer](/fonti/pensiero/schopenhauer.md) → [Perché soffro?](/domande/perche-soffro.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [Seneca](/fonti/pensiero/seneca.md) → [Come devo vivere?](/domande/come-vivere.md) · [Che senso ha?](/domande/che-senso-ha.md)
  - [Stoicismo](/fonti/pensiero/stoicismo.md) → [Come devo vivere?](/domande/come-vivere.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Laozi, Tao Te Ching](/fonti/pensiero/tao-te-ching.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [Peter Wessel Zapffe](/fonti/pensiero/zapffe.md) → [Perché soffro?](/domande/perche-soffro.md) · [Che senso ha?](/domande/che-senso-ha.md)
  - [Advaita e buddhismo](/fonti/sacro-e-mito/advaita-buddhismo.md) → [Chi sono?](/domande/chi-sono.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [Albero della Vita (Cabala)](/fonti/sacro-e-mito/albero-della-vita.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [Alchimia](/fonti/sacro-e-mito/alchimia.md) → [Chi sono?](/domande/chi-sono.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [Ecclesiaste](/fonti/sacro-e-mito/ecclesiaste.md) → [Che senso ha?](/domande/che-senso-ha.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Ermetismo](/fonti/sacro-e-mito/ermetismo.md) → [Cosa è reale?](/domande/cosa-e-reale.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [Fenice](/fonti/sacro-e-mito/fenice.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Chi sono?](/domande/chi-sono.md)
  - [Icaro](/fonti/sacro-e-mito/icaro.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Iside e il suo velo](/fonti/sacro-e-mito/iside.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [Kṣitigarbha / Jizō](/fonti/sacro-e-mito/kshitigarbha.md) → [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Lamed Vav, i 36 giusti](/fonti/sacro-e-mito/lamed-vav.md) → [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md)
  - [Lucifero](/fonti/sacro-e-mito/lucifero.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Odino](/fonti/sacro-e-mito/odino.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Ofanim](/fonti/sacro-e-mito/ofanim.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md)
  - [Persefone](/fonti/sacro-e-mito/persefone.md) → [Perché soffro?](/domande/perche-soffro.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [Prometeo](/fonti/sacro-e-mito/prometeo.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md)
  - [Psiche](/fonti/sacro-e-mito/psiche.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md) · [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md)
  - [Sisifo](/fonti/sacro-e-mito/sisifo.md) → [Che senso ha?](/domande/che-senso-ha.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Tarocchi](/fonti/sacro-e-mito/tarocchi.md) → [Come devo vivere?](/domande/come-vivere.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [Vangelo di Matteo](/fonti/sacro-e-mito/vangelo-matteo.md) → [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [L'asino d'oro (Apuleio)](/fonti/opere/asino-d-oro.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md)
  - [Berserk](/fonti/opere/berserk.md) → [Perché soffro?](/domande/perche-soffro.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [Il mito di Sisifo / L'uomo in rivolta](/fonti/opere/camus-opere.md) → [Che senso ha?](/domande/che-senso-ha.md) · [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md)
  - [Deftones](/fonti/opere/deftones.md) → [Perché soffro?](/domande/perche-soffro.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [Divina Commedia](/fonti/opere/divina-commedia.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Neon Genesis Evangelion](/fonti/opere/evangelion.md) → [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md) · [Chi sono?](/domande/chi-sono.md)
  - [Fullmetal Alchemist: Brotherhood](/fonti/opere/fma-brotherhood.md) → [Come devo vivere?](/domande/come-vivere.md) · [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md)
  - [William Ernest Henley, Invictus (1875)](/fonti/opere/invictus.md) → [Come devo vivere?](/domande/come-vivere.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Radiohead](/fonti/opere/radiohead.md) → [Perché soffro?](/domande/perche-soffro.md) · [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md)
  - [True Detective, stagione 1](/fonti/opere/true-detective-s1.md) → [Perché soffro?](/domande/perche-soffro.md) · [Che senso ha?](/domande/che-senso-ha.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [Così parlò Zarathustra](/fonti/opere/zarathustra.md) → [Come devo vivere?](/domande/come-vivere.md) · [Che senso ha?](/domande/che-senso-ha.md)
  - [Gian Lorenzo Bernini, La Verità svelata dal Tempo](/fonti/arte/bernini-verita.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md)
  - [William Blake, L'Antico dei Giorni](/fonti/arte/blake-antico-dei-giorni.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [Antonio Canova, Amore e Psiche](/fonti/arte/canova-amore-psiche.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md)
  - [Gustave Doré, illustrazioni per la Commedia](/fonti/arte/dore-commedia.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Albrecht Dürer, Melencolia I (1514)](/fonti/arte/durer-melencolia.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Robert Fludd](/fonti/arte/fludd.md) → [Cosa è reale?](/domande/cosa-e-reale.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [Caspar David Friedrich, Monaco in riva al mare (1808–10)](/fonti/arte/friedrich-monaco.md) → [Che senso ha?](/domande/che-senso-ha.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [Caspar David Friedrich, Viandante sul mare di nebbia (1818)](/fonti/arte/friedrich-viandante.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [L'incisione Flammarion](/fonti/arte/incisione-flammarion.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [Kintsugi](/fonti/arte/kintsugi.md) → [Perché soffro?](/domande/perche-soffro.md) · [Chi sono?](/domande/chi-sono.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [Michelangelo, i Prigioni](/fonti/arte/michelangelo-prigioni.md) → [Chi sono?](/domande/chi-sono.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Mutus Liber (1677)](/fonti/arte/mutus-liber.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [Auguste Rodin, La Porta dell'Inferno e Il Pensatore](/fonti/arte/rodin-porta-inferno.md) → [Perché soffro?](/domande/perche-soffro.md) · [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md)
  - [Tiziano, Sisifo](/fonti/arte/tiziano-sisifo.md) → [Perché soffro?](/domande/perche-soffro.md) · [Che senso ha?](/domande/che-senso-ha.md)
  - [Franz von Stuck, Sisifo](/fonti/arte/von-stuck-sisifo.md) → [Perché soffro?](/domande/perche-soffro.md) · [Che senso ha?](/domande/che-senso-ha.md)
  - [Albert Camus](/fonti/pensiero/camus.md) → [Friedrich Nietzsche](/fonti/pensiero/nietzsche.md)
  - [Jordan Peterson](/fonti/pensiero/jordan-peterson.md) → [Carl Gustav Jung](/fonti/pensiero/jung.md)
  - [Carl Gustav Jung](/fonti/pensiero/jung.md) → [Friedrich Nietzsche](/fonti/pensiero/nietzsche.md)
  - [Immanuel Kant](/fonti/pensiero/kant.md) → [Arthur Schopenhauer](/fonti/pensiero/schopenhauer.md)
  - [Thomas Ligotti](/fonti/pensiero/ligotti.md) → [Arthur Schopenhauer](/fonti/pensiero/schopenhauer.md)
  - [Friedrich Nietzsche](/fonti/pensiero/nietzsche.md) → [Arthur Schopenhauer](/fonti/pensiero/schopenhauer.md)
  - [William Blake, L'Antico dei Giorni](/fonti/arte/blake-antico-dei-giorni.md) → [Robert Fludd](/fonti/arte/fludd.md)
  - [Amor fati](/concetti/amor-fati.md) → [Come devo vivere?](/domande/come-vivere.md) · [Perché soffro?](/domande/perche-soffro.md) · [Che senso ha?](/domande/che-senso-ha.md)
  - [Amore](/concetti/amore.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md)
  - [L'assurdo](/concetti/assurdo.md) → [Che senso ha?](/domande/che-senso-ha.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Avventura e scoperta](/concetti/avventura-e-scoperta.md) → [Come devo vivere?](/domande/come-vivere.md) · [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md)
  - [Battaglie interiori](/concetti/battaglie-interiori.md) → [Chi sono?](/domande/chi-sono.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Il bene relativo](/concetti/bene-relativo.md) → [Perché soffro?](/domande/perche-soffro.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [Caduta e redenzione](/concetti/caduta-e-redenzione.md) → [Perché soffro?](/domande/perche-soffro.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [La coscienza come peso](/concetti/coscienza-come-peso.md) → [Perché soffro?](/domande/perche-soffro.md) · [Chi sono?](/domande/chi-sono.md)
  - [Dissoluzione dell'io](/concetti/dissoluzione-dell-io.md) → [Chi sono?](/domande/chi-sono.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [Dualità e unione degli opposti](/concetti/dualita.md) → [Chi sono?](/domande/chi-sono.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [Eterno ritorno](/concetti/eterno-ritorno.md) → [Che senso ha?](/domande/che-senso-ha.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [Evoluzione e percorso](/concetti/evoluzione-e-percorso.md) → [Chi sono?](/domande/chi-sono.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [Guida e condottiero](/concetti/guida-e-condottiero.md) → [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [Memento mori](/concetti/memento-mori.md) → [Come devo vivere?](/domande/come-vivere.md) · [Che senso ha?](/domande/che-senso-ha.md)
  - [Morte e rinascita](/concetti/morte-e-rinascita.md) → [Chi sono?](/domande/chi-sono.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [Identità che cambia: la nave di Teseo](/concetti/nave-di-teseo.md) → [Chi sono?](/domande/chi-sono.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [Il prezzo della conoscenza](/concetti/prezzo-della-conoscenza.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Rivolta](/concetti/rivolta.md) → [Che senso ha?](/domande/che-senso-ha.md) · [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md)
  - [Sacrificio anonimo](/concetti/sacrificio-anonimo.md) → [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [Scambio equivalente](/concetti/scambio-equivalente.md) → [Come devo vivere?](/domande/come-vivere.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [La soglia e il mistero](/concetti/soglia-e-mistero.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md)
  - [Il sublime e l'abisso](/concetti/sublime-e-abisso.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md)
  - [Tensioni aperte](/concetti/tensioni.md) → [Che senso ha?](/domande/che-senso-ha.md) · [Chi sono?](/domande/chi-sono.md)
  - [Le tre metamorfosi](/concetti/tre-metamorfosi.md) → [Chi sono?](/domande/chi-sono.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [Verità](/concetti/verita.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [Resilienza, tenacia, passione: virtù e fortuna](/concetti/virtu-e-fortuna.md) → [Come devo vivere?](/domande/come-vivere.md)
  - [Apatia](/emozioni/apatia.md) → [Perché soffro?](/domande/perche-soffro.md) · [Che senso ha?](/domande/che-senso-ha.md)
  - [Caos](/emozioni/caos.md) → [Perché soffro?](/domande/perche-soffro.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [Dolore](/emozioni/dolore.md) → [Perché soffro?](/domande/perche-soffro.md)
  - [Gioia](/emozioni/gioia.md) → [Come devo vivere?](/domande/come-vivere.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [Libertà](/emozioni/liberta.md) → [Come devo vivere?](/domande/come-vivere.md) · [Che senso ha?](/domande/che-senso-ha.md)
  - [Lucidità](/emozioni/lucidita.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Malinconia](/emozioni/malinconia.md) → [Perché soffro?](/domande/perche-soffro.md) · [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md)
  - [Meraviglia](/emozioni/meraviglia.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [Pace interiore](/emozioni/pace-interiore.md) → [Come devo vivere?](/domande/come-vivere.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [Passione](/emozioni/passione.md) → [Come devo vivere?](/domande/come-vivere.md)
  - [Rabbia](/emozioni/rabbia.md) → [Perché soffro?](/domande/perche-soffro.md) · [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md)
  - [Risentimento](/emozioni/risentimento.md) → [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Solitudine](/emozioni/solitudine.md) → [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md) · [Chi sono?](/domande/chi-sono.md)
  - [Vuoto](/emozioni/vuoto.md) → [Che senso ha?](/domande/che-senso-ha.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Il monologo di Rust](/idee/monologo-di-rust/index.md) → [Perché soffro?](/domande/perche-soffro.md) · [Che senso ha?](/domande/che-senso-ha.md)
  - [Il sognatore insonne](/idee/sognatore-insonne/index.md) → [Cosa è reale?](/domande/cosa-e-reale.md)
  - [I Pensieri di Marco Aurelio](/ricerche/pensieri-marco-aurelio/index.md) → [Come devo vivere?](/domande/come-vivere.md)
  - [Sooraj Saxena](/ricerche/soorajsaxena/index.md) → [Chi sono?](/domande/chi-sono.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [Albero della Vita (simbolo)](/simboli/albero-della-vita-simbolo.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [L'alce irlandese](/simboli/alce-irlandese.md) → [Perché soffro?](/domande/perche-soffro.md) · [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md)
  - [La chiave](/simboli/chiave.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [Clessidra](/simboli/clessidra.md) → [Che senso ha?](/domande/che-senso-ha.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [La fenice](/simboli/fenice-simbolo.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Chi sono?](/domande/chi-sono.md)
  - [ל״ו](/simboli/lamed-vav-lettere.md) → [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md)
  - [La lampada](/simboli/lampada.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [Il marmo non-finito](/simboli/marmo-non-finito.md) → [Chi sono?](/domande/chi-sono.md) · [Perché soffro?](/domande/perche-soffro.md)
  - [Il masso](/simboli/masso.md) → [Perché soffro?](/domande/perche-soffro.md) · [Che senso ha?](/domande/che-senso-ha.md)
  - [La nave](/simboli/nave.md) → [Chi sono?](/domande/chi-sono.md)
  - [Gli occhi](/simboli/occhi.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [Ouroboros](/simboli/ouroboros.md) → [Cosa è reale?](/domande/cosa-e-reale.md) · [Che senso ha?](/domande/che-senso-ha.md)
  - [Il poliedro](/simboli/poliedro.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [La porta](/simboli/porta.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md)
  - [La Ruota della Fortuna](/simboli/ruota-della-fortuna.md) → [Come devo vivere?](/domande/come-vivere.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [Le ruote](/simboli/ruote.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [La scala](/simboli/scala.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [Il serpente che muta](/simboli/serpente.md) → [Chi sono?](/domande/chi-sono.md) · [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md)
  - [Il sole in mano](/simboli/sole.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md)
  - [La spirale](/simboli/spirale.md) → [Cosa è reale?](/domande/cosa-e-reale.md) · [Che senso ha?](/domande/che-senso-ha.md)
  - [Le stelle](/simboli/stelle.md) → [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) · [Che senso ha?](/domande/che-senso-ha.md)
  - [Teschio](/simboli/teschio.md) → [Che senso ha?](/domande/che-senso-ha.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [Il velo](/simboli/velo.md) → [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) · [Cosa è reale?](/domande/cosa-e-reale.md)
  - [Il viandante](/simboli/viandante.md) → [Come devo vivere?](/domande/come-vivere.md) · [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md)
  - [La vite](/simboli/vite.md) → [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md) · [Come devo vivere?](/domande/come-vivere.md)
  - [Il capitano della mia anima](/spunti/capitano-della-mia-anima/index.md) → [Come devo vivere?](/domande/come-vivere.md)
  - [La coscienza come passo falso](/spunti/true-detective-coscienza/index.md) → [Perché soffro?](/domande/perche-soffro.md) · [Chi sono?](/domande/chi-sono.md)
  - [Non dormo, sogno soltanto](/spunti/true-detective-sogno/index.md) → [Cosa è reale?](/domande/cosa-e-reale.md) · [Chi sono?](/domande/chi-sono.md)
  - [Chi sono?](/domande/chi-sono.md) → [Carl Gustav Jung](/fonti/pensiero/jung.md)
  - [Perché soffro?](/domande/perche-soffro.md) → [Arthur Schopenhauer](/fonti/pensiero/schopenhauer.md)
  - [Che senso ha?](/domande/che-senso-ha.md) → [Albert Camus](/fonti/pensiero/camus.md)
  - [Che senso ha?](/domande/che-senso-ha.md) → [Ecclesiaste](/fonti/sacro-e-mito/ecclesiaste.md)
  - [Come devo vivere?](/domande/come-vivere.md) → [Marco Aurelio](/fonti/pensiero/marco-aurelio.md)
  - [Come devo vivere?](/domande/come-vivere.md) → [Jordan Peterson](/fonti/pensiero/jordan-peterson.md)
  - [Come devo vivere?](/domande/come-vivere.md) → [William Ernest Henley, Invictus (1875)](/fonti/opere/invictus.md)
  - [Cosa posso conoscere?](/domande/cosa-posso-conoscere.md) → [Laozi, Tao Te Ching](/fonti/pensiero/tao-te-ching.md)
  - [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) → [Iside e il suo velo](/fonti/sacro-e-mito/iside.md)
  - [Cosa c'è oltre?](/domande/cosa-c-e-oltre.md) → [True Detective, stagione 1](/fonti/opere/true-detective-s1.md)
  - [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md) → [Il mito di Sisifo / L'uomo in rivolta](/fonti/opere/camus-opere.md)
  - [Come stare con gli altri?](/domande/come-stare-con-gli-altri.md) → [Vangelo di Matteo](/fonti/sacro-e-mito/vangelo-matteo.md)
  - [Cosa è reale?](/domande/cosa-e-reale.md) → [Ermetismo](/fonti/sacro-e-mito/ermetismo.md)

## Domande aperte

- Una alla volta, a pancia: quale domanda senti più tua, oggi?
