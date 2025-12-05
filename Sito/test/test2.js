//Elementi del'HTML
const btn = document.getElementById('btn');
const questionsWrap = document.getElementById('questions');
const resultsWrap = document.getElementById('results');
const introWrap = document.getElementById('intro');

questionsWrap.style.visibility = 'hidden';
resultsWrap.style.visibility = 'hidden';

const introbtn = document.getElementById('btn2'); // bottone di sinistra dà risultati (I-P)
const estrobtn = document.getElementById('btn3'); // bottone di destra dà risultati (E-J)
const avanbtn = document.getElementById('btn4');  // bottone avanti 
const verifica = document.getElementById('final'); //verifica di funzionamento
const questionNode = document.getElementById('question'); //Domanda principale
const btn2text = document.getElementById('btn2text'); //Domanda sinsitra
const btn3text = document.getElementById('btn3text'); //Domanda di destra

avanbtn.style.visibility = 'hidden';

//Codice per il blocco in cui è arrivato il test
let currentblockindex = -1;
let localIdx = 0;
let extraIdx = 0;
let inextra = false;
let local_l = 0;
let local_r = 0;
let currentblock = null;

//Variabili per il risultato finale MTBI
let scores = { I:0, E:0, J:0, P:0, T:0, F:0, N:0, S:0 }; 
let results = { first: null, second: null, third: null, fourth: null }; // first=I/E, second=N/S, third=T/F, fourth=J/P

function setAnswerHandlers(leftHandler, rightHandler) {
  introbtn.onclick = leftHandler;
  estrobtn.onclick = rightHandler;
}

//FUnzione per avanzare nei block (basandosi sull'indice)
function find_nextblockindex(fromindex) {
  for (let i = fromindex + 1; i < blocks.length; i++) {
    const b = blocks[i];
    if (typeof b.precondition === 'function') {
      if (b.precondition(results)) return i;
    } else {
      return i; 
    }
  }
  return -1;
}

// mostra domanda (sceglie in base al blocco in cui si trova)
function render_currentquesiton() {
  if (!currentblock) return;
  const qarr = inextra ? currentblock.extraquestions : currentblock.questions;
  const q = qarr[ inextra ? extraIdx : localIdx ];
  if (!q) {
    //fine domande -> valutazione del blocco (risultato)
    evaluateblock();
    return;
  }
  questionNode.innerHTML = q.text;
  btn2text.innerHTML = q.options[0];
  btn3text.innerHTML = q.options[1];
  verifica.innerHTML = ''; // reset messaggio finale (non in uso)
}

// Gestione delle risposte (sx/dx)
function handleanswer(side) {
  if (!currentblock) return;
  const qarr = inextra ? currentblock.extraquestions : currentblock.questions;
  const q = qarr[ inextra ? extraIdx : localIdx ];
  if (!q) return;
  const chosenval = side === 'left' ? q.values[0] : q.values[1];
  // aggiorna i punteggi (scores)
  if (chosenval && typeof chosenval === 'string') {
    scores[chosenval] = (scores[chosenval] || 0) + 1;
  }
  // aggiorna contatori locali
  if (side === 'left') local_l++; else local_r++;

  if (inextra) {
    extraIdx++;
    if (extraIdx >= currentblock.extraquestions.length) {
      // fine extra -> valutare
      evaluateblock();
      return;
    }
  } else {
    localIdx++;
    if (localIdx >= currentblock.questions.length) {
      //Qui decide se fare subito il risultato oppure procedere a fare le domande extra
      if (local_l > local_r + 2 || local_r > local_l + 2) {
        evaluateblock();
        return;
      } else if (currentblock.extraquestions && currentblock.extraquestions.length) {
        inextra = true;
        extraIdx = 0;
      } else {
        evaluateblock();
        return;
      }
    }
  }
  render_currentquesiton();
}

// valuta il blocco e assegna la lettera finale MBTI
function evaluateblock() {
  // determina se c'è vantaggio >2, altrimenti usa le extraquestion
  let winner;
  if (!inextra) {
    if (local_l > local_r + 2) winner = currentblock.questions[0].values[0];
    else if (local_r > local_l + 2) winner = currentblock.questions[0].values[1];
    else if (currentblock.extraquestions && currentblock.extraquestions.length) {
      inextra = true; extraIdx = 0; render_currentquesiton(); return;
    } else {
      winner = local_l > local_r ? currentblock.questions[0].values[0] : currentblock.questions[0].values[1];
    }
  } else {
    winner = (local_l > local_r) ? currentblock.extraquestions[0].values[0] : currentblock.extraquestions[0].values[1];
  }

  // assegna il risultato a 'first' 'second'...
  if (currentblock.assign) {
    results[ currentblock.assign ] = winner;
  }

  avanbtn.style.visibility = 'visible';
  // disabilitazione dei bottoni di scelta fino a quando non si clicca avanti
  introbtn.disabled = true;
  estrobtn.disabled = true;

  // Bottone per il prossimo blocco
  avanbtn.onclick = () => {
    avanbtn.style.visibility = 'hidden';
    introbtn.disabled = false;
    estrobtn.disabled = false;
    proceed_to_nextblock();
  };
}

// avvia blocco 
function startblock(index) {
  currentblockindex = index;
  currentblock = blocks[index];
  localIdx = 0; extraIdx = 0; inextra = false; local_l = 0; local_r = 0;
  // mostra domanda
  render_currentquesiton();

  // Funzione che aggancia gli handler ai bottoni
  setAnswerHandlers(
    () => handleanswer('left'),
    () => handleanswer('right')
  );
}

// Trova il prossimo blocco / finisce il test
function proceed_to_nextblock() {
  // Con l'indice determina il blocco successivo
  const nextindex = find_nextblockindex(currentblockindex);
  if (nextindex === -1) {
    // Fine test 
    showfinal();
  } else {
    startblock(nextindex);
  }
}

// Mostra risultato finale
function showfinal() {
 
  if (!results.first) results.first = scores.I > scores.E ? 'I' : 'E';
  if (!results.second) results.second = scores.N > scores.S ? 'N' : 'S';
  if (!results.third) results.third = scores.T > scores.F ? 'T' : 'F';
  if (!results.fourth) results.fourth = scores.J > scores.P ? 'J' : 'P';

  const mbti = `${results.first}${results.second}${results.third}${results.fourth}`;

  //Interfaccia di fine test:
  document.getElementById('questions').remove();
  resultsWrap.style.visibility = 'visible';
  const tipombti = document.getElementById('tipombti');
  const brevespiegaz = document.getElementById('brevespiegaz');
  const link = document.getElementById('linkTest');

  tipombti.innerHTML = `Il tuo tipo è: ${mbti}`;
 if (link) {
  link.onclick = () => {
    window.location.href = `../tipi/${mbti}.html`;
  };
}
  const tipombti2 = document.getElementById('tipombti2');
  if (tipombti2) tipombti2.innerHTML = `Visita la pagina ${mbti}`;

  
  console.log('Scores globali: ', scores);
  console.log('Risultati finali: ', results);
}

btn.addEventListener('click', () => {
  introWrap.remove();
  questionsWrap.style.visibility = 'visible';
  // avvia primo blocco (EI) 
  startblock(0);

});



//MEGA blocco di domande
const blocks = [
  //Blocco E/I (0)
  {
    id: 'EI',
    assign: 'first', // Assegno il risultato su first (prima lettera)
    questions: [
      { text: `Ti senti più ricaricato:`, options: [`Dopo un momento tutto per me`, `Dopo avere passato tempo con altre persone`], values: ['I','E'] },
      { text: `Se resti da solo troppo tempo, ti senti: `, options: [`Rigenerato`, `Stanco/Stufo`], values: ['I','E'] },
      { text: `Quando hai una nuova idea, preferisci: `, options: [`Ci rifletto prima da solo`, `Parlarne subito ad alta voce`], values: ['I','E'] },
      { text: `Ti viene più naturale: `, options: [`Condividere solo con pochi intimi`, `Raccontare molto di me agli altri`], values: ['I','E'] },
      { text: `In un gruppo nuovo: `, options: [`Osservo bene gli altri`, `Mi butto a fare conoscenza`], values: ['I','E'] },
      { text: `Preferisci: `, options: [`Pochi amici stretti`, `Molti conoscenti`], values: ['I','E'] },
      { text: `Se hai una giornata libera, preferisici: `, options: [`Tengo spazio vuoto da gestire a ritmo mio`, `Riempirla di atitività ed incontri`], values: ['I','E'] },
      { text: `Dopo un weekend pieno di persone, sei: `, options: [`Svuotato`, `Carico`], values: ['I','E'] },
      { text: `Ti capita più spesso di: `, options: [`Penso troppo e poi parlo`, `Parlo troppo e poi penso`], values: ['I','E'] },
      { text: `Nelle conversazioni, ti senti più a tuo agio: `, options: [`Ascolto e intervengo`, `Guido il dialogo`], values: ['I','E'] }
    ],
    extraquestions: [
      { text: `Quando sei stanco, per ritrovare energia cerchi:`, options: [`Solitudine`, `Compagnia`], values: ['I','E'] },
      { text: `In ambienti rumorosi e movimentati: `, options: [`Li trovo stancanti`, `Mi sento a mio agio`], values: ['I','E'] },
      { text: `Ti entusiasma di più: `, options: [`Dedicarmi ad un hobby personale`, `Partecipare ad un grande evento sociale`], values: ['I','E'] },
      { text: `Quando qualcuno propone qualosa, ti viene naturale: `, options: [`Valuto bene prima di accettare`, `Dire sempre sì`], values: ['I','E'] },
      { text: `Dopo una giornata impegnativa, cosa ti fa sentire meglio:`, options: [`Ritirarmi in solitudine`, `Uscire con gli amici`], values: ['I','E'] }
    ],
    precondition: () => true
  },

  //Blocco JP (1)
  {
    id: 'JP',
    assign: 'fourth', //Quarta lettera
    questions: [
      { text: `Quando programmi un viaggio, preferisci: `, options: [`Lasciare spazio all'improvvisazione`, `Avere un itinerario definito`], values: ['P','J'] },
      { text: `Ti senti più tranquillo quando: `, options: [`Ti lasci guidare dal momento`, `Ho una lista di cose da fare`], values: ['P','J'] },
      { text: `Quando hai una scadenza: `, options: [`Ti viene naturale fare le cose all'ultimo`, `Ti piace completare il lavoro con largo anticipo`], values: ['P','J'] },
      { text: `Se arrivi ad un appuntamento, sei più spesso: `, options: [`In ritardo`, `In anticipo`], values: ['P','J'] },
      { text: `Quando devi scegliere, ti senti meglio: `, options: [`Lasciando le opzioni aperte più a lungo`, `Decidendo subito`], values: ['P','J'] },
      { text: `Ti succede più spesso di: `, options: [`Aver rimandato troppo`, `Pentirti di aver deciso troppo presto`], values: ['P','J'] },
      { text: `Ti infastidisce di più: `, options: [`La rigidità dei piani`, `L'imprevisto`], values: ['P','J'] },
      { text: `In un progetto di gruppo, ti viene più naturale assumere il ruolo: `, options: [`Di chi porta nuove idee in corsa`, `Di chi organizza e struttura`], values: ['P','J'] },
      { text: `Quando pensi al futuro, ti concentri di più: `, options: [`Sulle possibilità che potrebbero aprirsi`, `Sugli step concreti per arrivarci`], values: ['P','J'] },
      { text: `Se un piano salta: `, options: [`Lo prendi come un'opportunità per cambiare direzione`, `Ti irriti facilmente`], values: ['P','J'] }
    ],
    extraquestions: [
      { text: `Preferisci: `, options: [`Avere più cose aperte insieme`, `Finire un compito prima di iniziarne un altro`], values: ['P','J'] },
      { text: `Ti fa più piacere avere la giornata: `, options: [`Aperta a possibilità`, `Strutturata`], values: ['P','J'] },
      { text: `Ti dà più soddisfazione: `, options: [`Scoprire una nuova opportunità lungo la strada`, `Spuntare un obbiettivo raggiunto`], values: ['P','J'] },
      { text: `La tua stanza tende ad essere: `, options: [`Disordinata, ma gestibile per te`, `Ordinata e organizzata`], values: ['P','J'] },
      { text: `Preferisci: `, options: [`Decidere sul momento`, `Sapere già cosa mangerai a cena`], values: ['P','J'] }
    ],
    precondition: () => true
  },

  //Blocco TF (IxxP) (2) su third
  {
    id: 'FiTi',
    assign: 'third',
    questions: [
      { text: `Quando prendi una decisione difficile, ti chiedi prima se:`, options: [`È coerente con i tuoi valori personali`, `"È logicamente ben strutturata"`], values: ['F','T'] }, // qui mantenuto come confronto
      { text: `Ti capita di dire più spesso:`, options: [`"Non mi sembra giusto"`, `"Non ha senso"`], values: ['F','T'] },
      { text: `In un litigio, ti viene più naturale: `, options: [`Difendere il tuo punto punto di vista emotivo`, `Smontare il ragionamento dell altro`], values: ['F','T'] },
      { text: `Se qualcuno mette in dubbio la tua opinione, ti senti:`, options: [`Più toccato sul piano personale`, `Più stimolato a verificare la logica del discorso`], values: ['F','T'] },
      { text: `Quando valuti un problema, ti chiedi più spesso:`, options: [`"Che cosa significa per me?"`, `"Come funziona esattamente?"`], values: ['F','T'] },
      { text: `Ti è più spontaneo:`, options: [`Pesare le emozioni coinvolte`, `Sezionare il problema in parti più piccole`], values: ['F','T'] },
      { text: `Quando spieghi una cosa, ti concentri più a:`, options: [`Trasmettere il perché per te è importante`, `Dimostrare perché è corretto`], values: ['F','T'] },
      { text: `Ti capita più spesso di usare frasi come:`, options: [`Per me ha valore`, `È coerente con la logica`], values: ['F','T'] },
      { text: `Ti capita più spesso di: `, options: [`Riflettere su chi sei e su ciò che ti rappresenta`, `Smontare concetti e strutture mentali per raffinarle`], values: ['F','T'] },
      { text: `Quando pensi al futuro, ti guidi di più con:`, options: [`Una bussola di valori interni`, `Un sistema di principi logici`], values: ['F','T'] }
    ],
    extraquestions: [
      { text: `Ti senti più tranquillo quando le tue scelte:`, options: [`Riflettono chi sei dentro`, `Seguono un ragionamento corretto`], values: ['F','T'] },
      { text: `Ti dà più fastidio sentirti:`, options: [`Incompreso`, `Illogico`], values: ['F','T'] },
      { text: `Ti capita di creare:`, options: [`Criteri interni molto personali e non sempre condivisibili`, `Sistemi logici rigorosi che però gli altri non sempre comprendono`], values: ['F','T'] },
      { text: `Senti che:`, options: [`Esprimere la tua interiorità ti fa sentire autentico`, `Spiegare un ragionamento ben fatto ti fa sentire centrato`], values: ['F','T'] },
      { text: `Quando ripensi ad una scelta passata, ti chiedi più spesso se:`, options: [`È stata fedele a chi sei davvero`, `È stata ragionata nel modo corretto`], values: ['F','T'] }
    ],
    precondition: (r) => r.first === 'I' && r.fourth === 'P'
  },

  //Blocco NS (IxxJ) (2) su second
  {
    id: 'NiSi',
    assign: 'second',
    questions: [
      { text: `Quando pensi al futuro, ti conscentri più su:`, options: [`Possibili scenari astratti he potrebbero realizzarsi`, `Come situazioni già vissute potrebbero ripetersi`], values: ['N','S'] },
      { text: `Ti capita più spesso di:`, options: [`Avere "visioni" improvvise sul significato degli eventi`, `Paragonare quello che succede a ricordi già noti`], values: ['N','S'] },
      { text: `Quando osservi un evento, ti viene più spontaneo chiederti:`, options: [`Che cosa significa davvero`, `Quando è successo la ultima volta`], values: ['N','S'] },
      { text: `Ti capita più spesso di: `, options: [`Avere insight improvvisi che sembrano venire da dentro di sé`, `Recuperare dettagli concreti della memoria`], values: ['N','S'] },
      { text: `Ricordi meglio:`, options: [`Il senso complessivo e complesssivo di una esperienza`, `I dettagli pratici e sensoriali che hanno composta una determinata esperienza`], values: ['N','S'] },
      { text: `Quando racconti un episodio, ti soffermi più:`, options: [`Sul significato che ha avuto per te`, `Sulla cronologia precisa dei fatti`], values: ['N','S'] },
      { text: `In situazioni nuove, ti orienti più:`, options: [`Cercando di intravedere il disegno nascosto dietro ciò che accade`, `Facendo pragoni con il passato`], values: ['N','S'] },
      { text: `Ti senti più ancorato quando:`, options: [`Riesci ad intravedere una direzione sottile che tutto sembra seguire`, `Hai riferimenti concreti della tua esperienza personale`], values: ['N','S'] },
      { text: `Ti pesa di più:`, options: [`Non riuscire a capire il significato profondo di ciò che ti accade`, `Non avere ricordi affidabili da cui attingere`], values: ['N','S'] },
      { text: `Quando sei sotto stress, ti rifugi più:`, options: [`In scenari futuri che cerchi di prevedere e controllare`, `In ricordi passati rassicuranti`], values: ['N','S'] }
    ],
    extraquestions: [
      { text: `Trovi più naturale:`, options: [`Cercare un filo nascosto che collega tutto`, `Ricostruire con precisione ciò che è accaduto in passato`], values: ['N','S'] },
      { text: `Ti rassicura di più:`, options: [`Intuire come andranno`, `Come sono andate le cose prima`], values: ['N','S'] },
      { text: `Se devi decidere, ti fidi di più:`, options: [`Di una immagine interiore del futuro`, `Del conforto con esperienze passata già testate`], values: ['N','S'] },
      { text: `Ti capita di sentirti:`, options: [`Perso nei tuoi pensieri sul futuro?`, `Immerso nei ricordi che riaffiorano con chiarezza`], values: ['N','S'] },
      { text: `Ti succede più spesso di dire:`, options: [`Ho la sensazione che questo porterà a...`, `Questo mi ricorda quella volta che...`], values: ['N','S'] }
    ],
    precondition: (r) => r.first === 'I' && r.fourth === 'J' //Eseguito se tipo IxxJ
  },

  //Blocco NS (ExxP) (2) su second
  {
    id: 'NeSe',
    assign: 'second',
    questions: [
      { text: `Ti senti più vivo quando:`, options: [`Esplori nuove possibilità e idee astratte`, `Ti immergi direttamente in ciò che accade attorno a te`], values: ['N','S'] },
      { text: `Preferisci:`, options: [`Giocare con scenari alternativi (e se succedesse...?)`, `Vivere al massimo la esperienza concreta che hai davanti`], values: ['N','S'] },
      { text: `Noti più facilmente:`, options: [`Le connessioni tra eventi e idee`, `I dettagli sensoriali (colori, odori, suoni`], values: ['N','S'] },
      { text: `Ti viene spontaneo:`, options: [`Immaginare interpretazioni e possibilità dietro i fatti`, `Descrivere quello che accade intorno a te con precisione sensoriale`], values: ['N','S'] },
      { text: `In una conversazione, ti ritrovi più:`, options: [`A lanciare associazioni e possibilità`, `A reagire a ciò che accade nel momento con spontaneità`], values: ['N','S'] },
      { text: `Ti capita di:`, options: [`Raccogliere stimoli per collegarli ad altre idee`, `Di raccogliere stimoli e viverli così come sono, senza sovrastrutture`], values: ['N','S'] },
      { text: `Ti entusiasma di più`, options: [`Aprirti a mille strade possibili`, `Sperimentare in prima persona esperienze intense nel presente`], values: ['N','S'] },
      { text: `Se entri in una stanza nuova, noti più`, options: [`Le possibilità di cosa ci si potrebbe fare`, `I dettagli concreti`], values: ['N','S'] },
      { text: `Ti senti più frustrato se non puoi:`, options: [`Esplorare idee e opzioni`, `Vivere esperienze sensoriali forti`], values: ['N','S'] },
      { text: `Quando sei annoitato, cerchi:`, options: [`Giochi mentali e nuove possibilità da immaginare`, `Stimoli concreti (cibo, movimento, azioni)`], values: ['N','S'] }
    ],
    extraquestions: [
      { text: `Ti capita di:`, options: [`Distrarti pensando a tutte le opzioni future`, `Lasciarti trascinare dalle sensazioni immediate del momento`], values: ['N','S'] },
      { text: `Ti emoziona di più:`, options: [`Cogliere un ventaglio di alternative da esplorare`, `Cogliere il qui e ora con intensità`], values: ['N','S'] },
      { text: `Ti senti più a tuo agio quando:`, options: [`Quando giochi con ipotesi creative`, `Ti affidi al tuo istinto immediato`], values: ['N','S'] },
      { text: `Quando racconti una esperienza, tendi a:`, options: [`Proporre significati alternativi e idee correlate`, `Descrivere i particolari fisici`], values: ['N','S'] },
      { text: `Ti viene più naturale:`, options: [`Aprire porte verso strade nuove che potrebbero aprirsi`, `Tuffarti nella esperienza presente`], values: ['N','S'] }
    ],
    precondition: (r) => r.first === 'E' && r.fourth === 'P' //Eseguito se tipo ExxP
  },

  //Blocco TF (ExxJ) (2) su third
  {
    id: 'TeFe',
    assign: 'third',
    questions: [
      { text: `Quando prendi una decisione di gruppo, ti concentri più su quale sia la opzione:`, options: [`Più efficiente`, `Che renda tutti più sereni`], values: ['T','F'] },
      { text: `Ti capita più spesso di chiederti:`, options: [`Funziona`, `Piace agli altri`], values: ['T','F'] },
      { text: `Ti senti più soddisfattto quando:`, options: [`Raggiungi un obiettivo concreto`, `Il gruppo è in armonia`], values: ['T','F'] },
      { text: `Ti viene spontaneo spiegare il perché di una scelta con:`, options: [`Dati e logica`, `Il suo impatto sugli altri`], values: ['T','F'] },
      { text: `Quando devi dare un feedback, tendi a puntare su:`, options: [`La efficacia delle azioni`, `Il tono emotivo`], values: ['T','F'] },
      { text: `Se un piano è giusto, ma scontenta qualcuno, preferisci:`, options: [`Portarlo avanti lo stesso`, `Adattarlo per mantenere buoni rapporti`], values: ['T','F'] },
      { text: `Ti capita più spesso di correggere gli altri perché:`, options: [`Non sono coerenti`, `Rischiano di ferire qualcuno`], values: ['T','F'] },
      { text: `Ti dà più fastidio:`, options: [`La inefficienza`, `La disarmonia`], values: ['T','F'] },
      { text: `In un lavoro di squadra, ti viene naturale:`, options: [`Organizzare le risorse in modo razionale`, `Assicurati che tutti si sentano inclusi`], values: ['T','F'] },
      { text: `Ti riconosci di più quando sei descritto come:`, options: [`Efficiente`, `Premuroso`], values: ['T','F'] }
    ],
    extraquestions: [
      { text: `Ti è più facile notare dove mancano:`, options: [`Fatti/dati`, `Attenzioni alle persone`], values: ['T','F'] },
      { text: `Quando un amico chiede consiglio, tendi a dare:`, options: [`Soluzioni pratiche`, `Sostegno emotivo`], values: ['T','F'] },
      { text: `Ti irrita di più chi ignora:`, options: [`La logica`, `I sentimenti`], values: ['T','F'] },
      { text: `Se sei sotto pressione, ti rifugi più nel`, options: [`Ordine dei compiti`, `Prenderti cura delle relazioni?`], values: ['T','F'] },
      { text: `Guardando indietro, ti giudichi più su quanto:`, options: [`Sei stato produttivo`, `Sei stato di supporto agli altri`], values: ['T','F'] }
    ],
    precondition: (r) => r.first === 'E' && r.fourth === 'J' //Eseguito se tipo ExxJ
  },

  //Blocco NS - IxxP (dopo Fi/Ti) -> aux Ne/Se Assegnato su second
  {
    id: 'auxNeSe',
    assign: 'second',
    questions: [
      { text: `Quando ti senti bloccato dentro di te, ti aiuta di più:`, options: [`Aprirti a nuove possibilità e scenari`, `Immergerti nella esperienza concreta del presente`], values: ['N','S'] },
      { text: `Nelle conversazioni, usi di più:`, options: [`Idee alternative per integrare ciò che pensi`, `Esempi pratici che riportino a terra il discorso`], values: ['N','S'] },
      { text: `Quando devi controbilanciare il tuo mondo interiore, preferisci farlo:`, options: [`Esplorando possibilità astratte`, `Concentrandoti sui dettagli tangibili intorno a te`], values: ['N','S'] },
      { text: `Ti capita di:`, options: [`Usare nuove prospettive per sostenere il tuo ragionamento`, `Usare espeirenze sensoriali dirette per dare concretezza al tuo ragionamento`], values: ['N','S'] },
      { text: `Se la tua intuizione profonda non basta:`, options: [`Cerchi stimoli in scenari futuri e opzioni aperte`, `Ti affidi al contatto immediato con ciò che hai davanti`], values: ['N','S'] },
      { text: `Quando collabori con altri, ti integri meglio proponendo:`, options: [`Possibilità inaspettare`, `Esempi pratici che riportino a terra il discorso`], values: ['N','S'] },
      { text: `Ti capita di sentirti più bilanciato quando:`, options: [`Aggiungi creatività e alternative alle tue riflessioni`, `Ti cali davvero nella esperienza presente`], values: ['N','S'] },
      { text: `Quando studi o lavori, ti viene naturale completare il tuo approccio con:`, options: [`Con collegamenti astratti`, `Esempi concreti e tangibili`], values: ['N','S'] },
      { text: `Ti capita di compensare la tua interiorità cercando stimoli esterni:`, options: [`Nel mondo delle idee`, `Nel mondo dei sensi`], values: ['N','S'] },
      { text: `Se una situazione interiore diventa troppo pesante, preferisci:`, options: [`Aprirti a possibilità inedite`, `Buttarti in una esperienza concreta che ti riporti al qui e ora?`], values: ['N','S'] }
    ],
    extraquestions: [
      { text: `In gruppo, ti sostieni meglio portanto:`, options: [`Nuove opzioni e connessioni`, `Osservazioni pratiche legate a quello che si vede e si sente`], values: ['N','S'] },
      { text: `Ti bilancia di più:`, options: [`Aprire il ventaglio delle possibilità future`, `Radicarti nella esperienza del momento`], values: ['N','S'] },
      { text: `Quando cerchi di compensare i tuoi pensieri introspettivi, ti viene più naturale:`, options: [`Fantasticare su "cosa altro potrebbe esserci"`, `Guardarti attorno e sfruttare ciò che hai a disposizione subito`], values: ['N','S'] },
      { text: `Ti senti più stabile quando:`, options: [`Aggiungi varietà e alternatice alle tue intuizioni interne`, `Ti affidi a stimoli concreti e diretti che ancorano i tuoi pensieri`], values: ['N','S'] },
      { text: `Quando esci dal tuo mondo interno, ti senti meglio se:`, options: [`Ti apri a nuove idee e possibilità`, `Ti immergi fisicamente e sensorialmente nel ambiente che ti circonda`], values: ['N','S'] }
    ],
    precondition: (r) => r.first === 'I' && r.fourth === 'P' && (r.third === 'F' || r.third === 'T') // Eseguito dopo il blocco TF IxxP
  },

  //Blocco TF - IxxJ (dopo Ni/Si) -> aux Te/Fe assegnato su third
  {
    id: 'auxTeFe',
    assign: 'third',
    questions: [
      { text: `Quando vuoi dare forma alle tue idee interne, ti è più naturale:`, options: [`Tradurle in un piano pratico`, `Condividerle in modo che gli altri le capiscano e accolgano`], values: ['T','F'] },
      { text: `Ti capita di "uscire dalla testa":`, options: [`Mettendo ordine e misurando i risultati`, `Cercando sintonia e collaborazione`], values: ['T','F'] },
      { text: `Quando devi portare avanti un progetto, ti spinge di più il bisogno di:`, options: [`Renderlo efficiente`, `Renderlo condiviso`], values: ['T','F'] },
      { text: `Nel tradurre ciò che senti o pensi, preferisci:`, options: [`Stabilire criteri chiari e obiettivi`, `Cercare un linguaggio che unisca le persone`], values: ['T','F'] },
      { text: `Ti capita più spesso di aiutare gli altri:`, options: [`Coordinando azioni e risorse`, `Cercando sintonia e collaborazione`], values: ['T','F'] },
      { text: `Quando il tuo mondo interiore diventa troppo chiuso, lo bilanci meglio con:`, options: [`Con schemi e organizzazione`, `Contatto e attenzione alle relazioni`], values: ['T','F'] },
      { text: `Ti senti più a tuo agio quando riesci:`, options: [`A portare logica e ordine fuori di te`, `A far sentire gli altri a loro agio con ciò che esprimi`], values: ['T','F'] },
      { text: `Se hai una idea astratta, la traduci prima:`, options: [`In passi concreti`, `In un messaggio che risuoni con chi ti ascolta`], values: ['T','F'] },
      { text: `Quando sostieni un gruppo, ti appoggi di più`, options: [`A criteri oggettivi di efficienza`, `Alla sensibilità verso ciò che gli altri provano`], values: ['T','F'] },
      { text: `Ti capita di bilanciare i tuoi pensieri interni, chiedendoti:`, options: [`Come renderlo utile e funzionale`, `Come renderlo condivisibile e armonioso`], values: ['T','F'] }
    ],
    extraquestions: [
      { text: `Se sei incerto, ti orienti più facilmente:`, options: [`Valutando pro e contro pratici`, `Osservando il clima emotivo intorno a te`], values: ['T','F'] },
      { text: `Ti senti più integrato quando riesci a:`, options: [`Costruire strutture esterne per le tue idee`, `A tessere legami intorno alle tue idee`], values: ['T','F'] },
      { text: `Nel concretizzare ciò che ti porti dentro, ti soddisfa di più vedere:`, options: [`Un risultato misurabile`, `Vedere le persone connesse`], values: ['T','F'] },
      { text: `Quando qualcuno non capisce la sua interiorità, cerchi di chiarirla con:`, options: [`Logica e organizzazione`, `Adattando il tono per essere accettato`], values: ['T','F'] },
      { text: `Guardandoti indietro, ti senti più equilibrato quando:`, options: [`Hai reso produttivo ciò che pensavi`, `Hai reso comprensibile e accettato dagli altri ciò che pensavi`], values: ['T','F'] }
    ],
    precondition: (r) => r.first === 'I' && r.fourth === 'J' && (r.second === 'N' || r.second === 'S') //Eseguito dopo il blocco NS IxxJ
  },

  //Blocco TF - ExxP (dopo Ne/Se) -> aux Ti/Fi salvato su third
  {
    id: 'auxTiFi',
    assign: 'third',
    questions: [
      { text: `Quando rifletti su una scelta, ti soffermi più:`, options: [`Sul fatto che sia chiara e ben ragionata`, `Sul fatto che sia in linea con te stesso`], values: ['T','F'] },
      { text: `Ti capita di rivedere ciò che dici per renderlo più:`, options: [`Coerente`, `Autentico`], values: ['T','F'] },
      { text: `Quando ti senti in dubbio, cerchi di capire se:`, options: [`I pezzi combaciano tra loro`, `La decisione ti rispecchia davvero`], values: ['T','F'] },
      { text: `Nelle tue riflessioni, sei più attratto dal:`, options: [`Mettere ordine nei concetti`, `Riconoscere le tue sensazioni interiori`], values: ['T','F'] },
      { text: `Quando ascolti una idea, la valuti più:`, options: [`Per la sua chiarezza`, `Per quanto ti convince a livello personale`], values: ['T','F'] },
      { text: `Ti capita più spesso di chiederti:`, options: [`È ben strutturato`, `Mi rappresenta davvero`], values: ['T','F'] },
      { text: `Guardando dentro di te, trovi più facilmente:`, options: [`Criteri per distinguere vero/falso`, `Ciò che senti vicino `], values: ['T','F'] },
      { text: `Se una persona ti contraddice, ti spinge più:`, options: [`A chiarire meglio il tuo ragionamento`, `A riflettere se la posizione rispecchia chi sei`], values: ['T','F'] },
      { text: `Ti senti più stabile quando hai:`, options: [`Messo in fila le cose in modo ordinato`, `Agito in modo coerente con te stesso`], values: ['T','F'] },
      { text: `In una conversazioe, ti concentri di più sul:`, options: [`Senso preciso delle parole`, `Tono e sul significato chd ti arriva dentro`], values: ['T','F'] }
    ],
    extraquestions: [
      { text: `Quando elabori qualcosa da solo, tendi più`, options: [`A costruire uno schema logico`, `A chiederti come ti suona a livello personale`], values: ['T','F'] },
      { text: `Ti capita di scartare una opzione perché:`, options: [`Non torna nei dettagli`, `Non ti convince dentro`], values: ['T','F'] },
      { text: `Guardando un tuo errore, pensi più facilmente:`, options: [`Non era coerente`, `Non mi apparteneva`], values: ['T','F'] },
      { text: `Ti capita di appoggiarti al bisogno di:`, options: [`Precisione interna`, `Di fedeltà a te stesso`], values: ['T','F'] },
      { text: `Alla fine di un processo, ti senti più soddisfatto se:`, options: [`Il tutto fila liscio`, `Senti che ti rappresenta`], values: ['T','F'] }
    ],
    precondition: (r) => r.first === 'E' && r.fourth === 'P'
  },

  //Blocco NS - ExxJ (dopoo Te/Fe) aux Ni/Si salvato su second
  {
    id: 'auxNiSi',
    assign: 'second',
    questions: [
      { text: `Quando hai bisogno di orientarti, ti viene più naturale:`, options: [`Cercare il filo conduttore nascosto`, `Confrontarti con ciò che è già successo`], values: ['N','S'] },
      { text: `Ti capita di rientrare in te stesso per:`, options: [`Cogliere un senso unico della situazione`, `Ricordarti come hai fatto in casi simili`], values: ['N','S'] },
      { text: `Quando riflettendo cerchi stabilità, la trovi di più:`, options: [`Immaginando dove tutto porta`, `Ripensando a un riferimento concreto del passato`], values: ['N','S'] },
      { text: `Se ti senti incerto, ti aiuta di più:`, options: [`Una visione che unisce i pezzi in prospettiva`, `Un ricordo di esperienze che ti guidano`], values: ['N','S'] },
      { text: `Nel prendere decisioni, ti capita di appoggiarti più:`, options: [`A intuzioni sul quadro complessivo`, `A ciò che sai già funzionare`], values: ['N','S'] },
      { text: `Quando qualcosa non ti torna, guardi dentro di te per:`, options: [`Cogliere il significato nascosto`, `Ricordare dettagli che chiariscono`], values: ['N','S'] },
      { text: `Ti capita più spesso di:`, options: [`Avere un lampo che ti mostra la direzione`, `Ritrovare stabilità richiamando alla mente ciò che conosci`], values: ['N','S'] },
      { text: `Ti senti più centrato quando:`, options: [`Cogli un filo invisibile che collega le cose`, `Hai un punto di riferimento concreto e familiare`], values: ['N','S'] },
      { text: `Quando valuti una idea nuova, pensi prima a:`, options: [`Come si inserisce in un disegno più grande`, `Come si rapporta a ciò che hai già visto`], values: ['N','S'] },
      { text: `Nei momenti di incertezza, cerchi di:`, options: [`Immaginare cosa sta emergendo sotto la superficie`, `Ripercorrere ciò che sai già da esperienza`], values: ['N','S'] }
    ],
    extraquestions: [
      { text: `Ti capita più facilmente di:`, options: [`Dare senso alle cose collegandole tra loro`, `Confrontandole con ciò che ricordi`], values: ['N','S'] },
      { text: `Quando sei sotto pressione, ti stabilizza di più pensare:`, options: [`Dove sta andando tutto questo`, `Cosa ha funzionato altre volte`], values: ['N','S'] },
      { text: `Ti capita più spesso di sentirti guidato da:`, options: [`Una sensazione di direzione interiore`, `Un senso di continuità con il passato`], values: ['N','S'] },
      { text: `Guardando indietro, ti rassicura di più:`, options: [`Aver colto il senso profondo delle cose`, `Aver rispettato ciò che ti era già familiare`], values: ['N','S'] },
      { text: `Nel rientrare in te stesso, trovi più sostegno:`, options: [`In intuizioni sul futuro`, `Nei ricordi che ti ancorano`], values: ['N','S'] }
    ],
    precondition: (r) => r.first === 'E' && r.fourth === 'J'
  }

]; 

