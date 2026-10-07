// Le proposte di Claude: i nomi condivisi tra lo script in <head> (config.mts), l'interruttore nel tema,
// il plugin markdown del blocco proposta e il riconoscitore nel testo. Niente Node qui.

/** La classe su <html> quando le proposte sono visibili. */
export const CLASSE_PROPOSTE = 'mostra-proposte'
/** La chiave in localStorage della preferenza. */
export const CHIAVE_PROPOSTE = 'atlante-proposte'
/** Il parametro dell'indirizzo che la forza: ?proposte=1 o ?proposte=0. */
export const PARAM_PROPOSTE = 'proposte'

/**
 * Lo script in <head>: mette la classe prima del primo disegno (niente lampi).
 * ?proposte=1 (o 0) la forza, altrimenti vale la preferenza salvata.
 */
export const SCRIPT_INTERRUTTORE =
  `(function(){try{var d=document.documentElement,q=new URLSearchParams(location.search).get('${PARAM_PROPOSTE}'),` +
  `v=q==='1'?true:q==='0'?false:null;if(v===null){try{v=localStorage.getItem('${CHIAVE_PROPOSTE}')==='1'}catch(e){v=false}}` +
  `if(v)d.classList.add('${CLASSE_PROPOSTE}')}catch(e){}})()`

/**
 * L'etichetta del blocco proposta, in grassetto sulla prima riga dopo `> [!NOTE]`:
 *
 *   > [!NOTE]
 *   > **Proposta di Claude, da validare.**
 *   >
 *   > il testo proposto…
 */
export const ETICHETTA_PROPOSTA = /^\*\*Proposta di Claude, da validare\.\*\*[ \t]*/
