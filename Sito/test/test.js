
//Inizio.
const btn = document.getElementById('btn');
document.getElementById('questions').style.visibility = 'hidden';
btn.addEventListener('click', function () {
    document.getElementById('intro').remove();
    document.getElementById('questions').style.visibility = 'visible';
});
document.getElementById('results').style.visibility = 'hidden';

//Prima sezione di domande (E/I)
const domande = ["Ti senti più ricaricato:", 
    "Se resti da solo troppo tempo, ti senti: ", "Quando hai una nuova idea, preferisci: ",
    "Ti viene più naturale: ", "In un gruppo nuovo: ",
    "Preferisci: ", "Se hai una giornata libera, preferisici: ",
    "Dopo un weekend pieno di persone, sei: ", "Ti capita più spesso di: ", "Nelle conversazioni, ti senti più a tuo agio: "
];
const domandextra = ["Quando sei stanco, per ritrovare energia cerchi:", "In ambienti rumorosi e movimentati: ",
    "Ti entusiasma di più: ", "Quando qualcuno propone qualosa, ti viene naturale: ", "Dopo una giornata impegnativa, cosa ti fa sentire meglio:"
];
const qbtnintro = ["Dopo un momento tutto per me", "Rigenerato", "Ci rifletto prima da solo", "Condividere solo con pochi intimi", "Osservo bene gli altri", "Pochi amici stretti", "Tengo spazio vuoto da gestire a ritmo mio", "Svuotato", "Penso troppo e poi parlo", "Ascolto e intervengo"];
const qbtnintroex = ["Solitudine", "Li trovo stancanti", "Dedicarmi ad un hobby personale", "Valuto bene prima di accettare", "Ritirarmi in solitudine"];
const qbtnestro = ["Dopo avere passato tempo con altre persone", "Stanco/Stufo", "Parlarne subito ad alta voce", "Raccontare molto di me agli altri", "Mi butto a fare conoscenza", "Molti conoscenti", "Riempirla di atitività ed incontri", "Carico", "Parlo troppo e poi penso", "Guido il dialogo"];
const qbtnestroex = ["Compagnia", "Mi sento a mio agio", "Partecipare ad un grande evento sociale", "Dire sempre sì", "Uscire con gli amici"];
//Fase 1: J/P ===
const domande1 = ['Quando programmi un viaggio, preferisci: ', 'Ti senti più tranquillo quando: ', 'Quando hai una scadenza: ', 'Se arrivi ad un appuntamento, sei più spesso: ', 
    'Quando devi scegliere, ti senti meglio: ', 'Ti succede più spesso di: ', 'Ti infastidisce di più: ', 'In un progetto di gruppo, ti viene più naturale assumere il ruolo: ', 'Quando pensi al futuro, ti concentri di più: ', 
    'Se un piano salta: '
];
const domande1extra = ['Preferisci: ', 'Ti fa più piacere avere la giornata: ', 'Ti dà più soddisfazione: ', 'La tua stanza tende ad essere: ', 'Preferisci: ' ];
const qbtnp = ["Lasciare spazio all'improvvisazione", "Ti lasci guidare dal momento", "Ti viene naturale fare le cose all'ultimo", "In ritardo", 
    "Lasciando le opzioni aperte più a lungo", "Aver rimandato troppo", "La rigidità dei piani", "Di chi porta nuove idee in corsa", "Sulle possibilità che potrebbero aprirsi", "Lo prendi come un'opportunità per cambiare direzione"
 ];
const qbtnj = ["Avere un itinerario definito", "Ho una lista di cose da fare", "Ti piace completare il lavoro con largo anticipo", "In anticipo", "Decidendo subito", "Pentirti di aver deciso troppo presto", "L'imprevisto", 
    "Di chi organizza e struttura", "Sugli step concreti per arrivarci", "Ti irriti facilmente"
 ];
const qbtnpex = ["Avere più cose aperte insieme", "Aperta a possibilità", "Scoprire una nuova opportunità lungo la strada", "Disordinata, ma gestibile per te", "Decidere sul momento"];
const qbtnjex = ["Finire un compito prima di iniziarne un altro", "Struttura", "Spuntare un obbiettivo raggiunto", "Ordinata e organizzata", "Sapere già cosa mangerai a cena"]


//Variabili
const introbtn = document.getElementById('btn2');
const estrobtn = document.getElementById('btn3');
const avanbtn = document.getElementById('btn4');
let outquest = document.getElementById('question').innerHTML;
let final = document.getElementById('final').innerHTML;
let testobtn2 = document.getElementById('btn2text').innerHTML;
let testobtn3 = document.getElementById('btn3text').innerHTML;

let fase = 0;
let tipoEI = '';
let tipoJP = '';

//Contatori per E/I
let id = -1;
let i = 0;
let e = 0;
let extraid = -1;
let inextraei = false;
let quizfinitoei = false;

//Contatori per J/P
let idJP = -1;
let j = 0;
let p = 0;
let extraidjp = -1;
let inextraJP = false;
let quizfinitojp = false;

//Contatori per fasi successive:
avanbtn.style.visibility = 'hidden';
introbtn.disabled = false;
estrobtn.disabled = false;

//Funzionamento blocco E/I
function caricaDomEI (){
    ++id;
    if (id < domande.length) {
        document.getElementById('question').innerHTML =  domande[id]
        document.getElementById('btn2text').innerHTML = qbtnintro[id];
        document.getElementById('btn3text').innerHTML = qbtnestro[id];
    } else {
        if (i > e + 2) {
            tipoEI = 'I';
            avanbtn.style.visibility = 'visible';
            quizfinitoei = true;
            disabilitabottoni();
        } else if (e > i + 2) {
            tipoEI = 'E';
            avanbtn.style.visibility = 'visible';
            quizfinitoei = true;
            disabilitabottoni();
        } else {
            inextraei = true;
            caricaDom2EI ();
        }
    }
}

//Funzionamento dei bottoni 
function listenerIntroEI () {

    if (quizfinitoei) return;
    i++;
    if (inextraei) {
        caricaDom2EI();
    } else {
        caricaDomEI();
    }
}
function listenerEstroEI () {
    if (quizfinitoei) return;
    e++;
    if (inextraei) {
        caricaDom2EI();
    } else {
        caricaDomEI();
    }
}

function setupListenerEI () {
    introbtn.addEventListener('click', listenerIntroEI);
    estrobtn.addEventListener('click', listenerEstroEI);
}
//Blocco E/I extra in caso di parità.
function caricaDom2EI () {
    ++extraid;
    if (extraid < domandextra.length) {
        document.getElementById('question').innerHTML = domandextra[extraid];
        document.getElementById('btn2text').innerHTML = qbtnintroex[extraid];
       document.getElementById('btn3text').innerHTML = qbtnestroex[extraid];
    } else {
        if (i > e) {
            document.getElementById('final').innerHTML = 'Sei un tipo Ixxx';
            avanbtn.style.visibility = 'visible';
            quizfinitoei = true;
            disabilitabottoni();
        } else {
           document.getElementById('final').innerHTML = 'Sei un tipo Exxx';
            avanbtn.style.visibility = 'visible';
            quizfinitoei = true;
            disabilitabottoni();
        }
    }
}
setupListenerEI();
caricaDomEI();

//Funzioni per fase 1 J/P:
function caricaDomJP() {
    ++idJP;
    if (idJP < domande1.length) {
        document.getElementById("question").innerHTML = domande1[idJP];
        document.getElementById('btn2text').innerHTML = qbtnp[idJP];
        document.getElementById('btn3text').innerHTML = qbtnj[idJP];
    } else {
        if (p > j + 2) {
            tipoJP = 'P';
            avanbtn.style.visibility = 'visible';
            quizfinitojp = true;
            disabilitabottoni();
        } else if (j > p + 2) {
            tipoJP = 'J';
             avanbtn.style.visibility = 'visible';
            quizfinitojp = true;
            disabilitabottoni();
        } else {
            inextraJP = true;
            caricaDom2JP();
        }

        }
    }
function caricaDom2JP() {
    ++extraidjp;
    if (extraidjp < domande1extra.length)  {
        document.getElementById("question").innerHTML = domande1extra[extraidjp];
        document.getElementById('btn2text').innerHTML = qbtnpex[extraidjp];
        document.getElementById('btn3text').innerHTML = qbtnjex[extraidjp];
    } else {
        if (p > j) {
            tipoJP = 'P' 
    } else {
            tipoJP = 'J'
    }
    avanbtn.style.visibility = 'visible';
        quizfinitojp = true;
        disabilitabottoni();
}
}

function listenerIntroJP() {
        if (quizfinitojp) return;
        p++;
        if (inextraJP) {
            caricaDom2JP();
        } else {
            caricaDomJP();
        }
    }
function listenerEstroJP () {
        if (quizfinitojp) return;
        j++;
        if (inextraJP) {
            caricaDom2JP();
        } else {
            caricaDomJP();
        }
    }
   function setuplistenerJP() {
    introbtn.addEventListener('click', listenerIntroJP);
    estrobtn.addEventListener('click', listenerEstroJP);
} 

orientamento = tipoEI + tipoJP;
//Blocco per tipo IxxP: (Ti-Fi)
let idfiti = -1;
let ti = 0;
let fi = 0;
let extraidfiti = -1;
let inextrafiti = false;
let tipoJ = '';
let quizfinitofiti = false;
const domandefiti = ['Quando prendi una decisione difficile, ti chiedi prima se:', "Ti capita di dire più spesso:", 
    "In un litigio, ti viene più naturale: ", "Se qualcuno mette in dubbio la tua opinione, ti senti:", "Quando valuti un problema, ti chiedi più spesso:",
    "Ti è più spontaneo:", "Quando spieghi una cosa, ti concentri più a:", "Ti capita più spesso di usare frasi come:",'Ti capita più spesso di: ',  "Quando pensi al futuro, ti guidi di più con:"
];
const domandeextrafiti = ['Ti senti più tranquillo quando le tue scelte:', 'Ti dà più fastidio sentirti:', 'Ti capita di creare:', 
    'Senti che:', 'Quando ripensi ad una scelta passata, ti chiedi più spesso se:'
];
const qbtnfi = ['È coerente con i tuoi valori personali', '"Non mi sembra giusto"', 'Difendere il tuo punto punto di vista emotivo',
    'Più toccato sul piano personale', '"Che cosa significa per me?"', 'Pesare le emozioni coinvolte', 'Trasmettere il perché per te è importante', 
    'Per me ha valore', 'Riflettere su chi sei e su ciò che ti rappresenta', 'Una bussola di valori interni'
];
const qbtnfiextra  = ['Riflettono chi sei dentro', 'Incompreso', 'Criteri interni molto personali e non sempre condivisibili',
    'Esprimere la tua interiorità ti fa sentire autentico', 'È stata fedele a chi sei davvero'
];
const qbtnti = ['È logicamente ben strutturata', '"Non ha senso"', 'Smontare il ragionamento dell altro', 
    'Più stimolato a verificare la logica del discorso', '"Come funziona esattamente?"', 'Sezionare il problema in parti più piccole', 
    'Dimostrare perché è corretto', 'È coerente con la logica', 'Smontare concetti e strutture mentali per raffinarle', 'Un sistema di principi logici'
];
const qbtntiextra = ['Seguono un ragionamento corretto', 'Illogico', 'Sistemi logici rigorosi che però gli altri non sempre comprendono', 'Spiegare un ragionamento ben fatto ti fa sentire centrato',
    'È stata ragionata nel modo corretto'
];


function caricaDomfiti() {
    ++idfiti;
    if (idfiti < domandefiti.length) {
        document.getElementById("question").innerHTML = domandefiti[idfiti];
        document.getElementById('btn2text').innerHTML = qbtnfi[idfiti];
        document.getElementById('btn3text').innerHTML = qbtnti[idfiti];
    } else {
        if (fi > ti + 2) {
            tipoJ = 'F';
            avanbtn.style.visibility = 'visible';
            quizfinitofiti = true;
            disabilitabottoni();
        } else if (ti > fi + 2) {
            tipoJ = 'T';
             avanbtn.style.visibility = 'visible';
            quizfinitofiti = true;
            disabilitabottoni();
        } else {
            inextrafiti = true;
            caricaDom2fiti();
        }

        }
    }
    function caricaDom2fiti() {
        ++extraidfiti;
    if (extraidfiti < domandeextrafiti.length)  {
        document.getElementById("question").innerHTML = domandeextrafiti[extraidfiti];
        document.getElementById('btn2text').innerHTML = qbtnfiextra[extraidfiti];
        document.getElementById('btn3text').innerHTML = qbtntiextra[extraidfiti];
    } else {
        if (fi > ti) {
            tipoJ = 'F';
    } else {
            tipoJ = 'T';
    }
    avanbtn.style.visibility = 'visible';
        quizfinitofiti = true;
        disabilitabottoni();
}
}

function listenerIntrofiti() {
        if (quizfinitofiti) return;
        fi++;
        if (inextrafiti) {
            caricaDom2fiti();
        } else {
            caricaDomfiti();
        }
    }
  function listenerEstrofiti () {
        if (quizfinitofiti) return;
        ti++;
        if (inextrafiti) {
            caricaDom2fiti();
        } else {
            caricaDomfiti();
        }
    }
   function setuplistenerfiti() {
    introbtn.addEventListener('click', listenerIntrofiti);
    estrobtn.addEventListener('click', listenerEstrofiti);
} 


//Blocco per tipo IxxJ (Ni-Si)
let idnisi = -1;
let ni = 0;
let si = 0;
let extraidnisi = -1;
tipoP = '';
let quizfinitonisi = false;
let inextra = false;

const domandenisi = ['Quando pensi al futuro, ti conscentri più su:', 'Ti capita più spesso di:',
    'Quando osservi un evento, ti viene più spontaneo chiederti:', 'Ti capita più spesso di: ',
    'Ricordi meglio:', 'Quando racconti un episodio, ti soffermi più:', 'In situazioni nuove, ti orienti più:',
    'Ti senti più ancorato quando:', 'Ti pesa di più:', 'Quando sei sotto stress, ti rifugi più:'
 ];
 const domandenisiextra = ['Trovi più naturale:', 'Ti rassicura di più:', 'Se devi decidere, ti fidi di più:', 'Ti capita di sentirti:',
    'Ti succede più spesso di dire:'
  ];
  const qbtnni = ['Possibili scenari astratti he potrebbero realizzarsi', 'Avere "visioni" improvvise sul significato degli eventi',
    'Che cosa significa davvero', 'Avere insight improvvisi che sembrano venire da dentro di sé', 'Il senso complessivo e complesssivo di una esperienza', 'Sul significato che ha avuto per te',
    'Cercando di intravedere il disegno nascosto dietro ciò che accade', 'Riesci ad intravedere una direzione sottile che tutto sembra seguire',
    'Non riuscire a capire il significato profondo di ciò che ti accade', 'In scenari futuri che cerchi di prevedere e controllare'
  ];

  const qbtnniextra = ['Cercare un filo nascosto che collega tutto', 'Intuire come andranno', 'Di una immagine interiore del futuro', 'Perso nei tuoi pensieri sul futuro?', 
    'Ho la sensazione che questo porterà a...'
  ];
 const qbtnsi = ['Come situazioni già vissute potrebbero ripetersi', 'Paragonare quello che succede a ricordi già noti', 'Quando è successo la ultima volta',
    'Recuperare dettagli concreti della memoria', 'I dettagli pratici e sensoriali che hanno composta una determinata esperienza',
    'Sulla cronologia precisa dei fatti', 'Facendo pragoni con il passato', 'Hai riferimenti concreti della tua esperienza personale', 
    'Non avere ricordi affidabili da cui attingere', 'In ricordi passati rassicuranti'
 ];
 const qbtnsiextra = ['Ricostruire con precisione ciò che è accaduto in passato', 'Come sono andate le cose prima', 'Del conforto con esperienze passata già testate', 'Immerso nei ricordi che riaffiorano con chiarezza',
    'Questo mi ricorda quella volta che...'];

    function caricaDomnisi() {
    ++idnisi;
    if (idnisi < domandenisi.length) {
        document.getElementById("question").innerHTML = domandenisi[idnisi];
        document.getElementById('btn2text').innerHTML = qbtnni[idnisi];
        document.getElementById('btn3text').innerHTML = qbtnsi[idnisi];
    } else {
        if (ni > si + 2) {
            tipoP = 'N';
            avanbtn.style.visibility = 'visible';
            quizfinitonisi = true;
            disabilitabottoni();
        } else if (si > ni + 2) {
            tipoP = 'S';
             avanbtn.style.visibility = 'visible';
            quizfinitonisi = true;
            disabilitabottoni();
        } else {
            inextranisi = true;
            caricaDom2nisi();
        }

        }
    }
     function caricaDom2nisi() {
        ++extraidnisi;
    if (extraidfiti < domandeextrafiti.length)  {
        document.getElementById("question").innerHTML = domandenisiextra[extraidnisi];
        document.getElementById('btn2text').innerHTML = qbtnniextra[extraidnisi];
        document.getElementById('btn3text').innerHTML = qbtnsiextra[extraidnisi];
    } else {
        if (ni > si) {
            tipoP = 'N';
    } else {
            tipoP = 'S';
    }
    avanbtn.style.visibility = 'visible';
        quizfinitonisi = true;
        disabilitabottoni();
}
}
function listenerIntronisi() {
        if (quizfinitonisi) return;
        ni++;
        if (inextranisi) {
            caricaDom2nisi();
        } else {
            caricaDomnisi();
        }
    }
  function listenerEstronisi () {
        if (quizfinitonisi) return;
        si++;
        if (inextranisi) {
            caricaDom2nisi();
        } else {
            caricaDomnisi();
        }
    }
   function setuplistenernisi() {
    introbtn.addEventListener('click', listenerIntronisi);
    estrobtn.addEventListener('click', listenerEstronisi);
} 



//Blocco ExxP (NeSe)
let idnese = -1;
let ne = 0;
let se = 0;
let extraidnese = -1;
let quizfinitonese = false;
let inextranese = false;

const domandenese = ['Ti senti più vivo quando:', 'Preferisci:', 'Noti più facilmente:', 'Ti viene spontaneo:',
    'In una conversazione, ti ritrovi più:', 'Ti capita di:', 'Ti entusiasma di più', 'Se entri in una stanza nuova, noti più',
    'Ti senti più frustrato se non puoi:', 'Quando sei annoitato, cerchi:'
];
const domandeextranese = ['Ti capita di:', 'Ti emoziona di più:', 'Ti senti più a tuo agio quando:', 'Quando racconti una esperienza, tendi a:',
    'Ti viene più naturale:'
];
const qbtnne = ['Esplori nuove possibilità e idee astratte', 'Giocare con scenari alternativi (e se succedesse...?)',
    'Le connessioni tra eventi e idee', 'Immaginare interpretazioni e possibilità dietro i fatti',  
    'A lanciare associazioni e possibilità', 'Raccogliere stimoli per collegarli ad altre idee', 'Aprirti a mille strade possibili',
    'Le possibilità di cosa ci si potrebbe fare', 'Esplorare idee e opzioni', 'Giochi mentali e nuove possibilità da immaginare'
];
const qbtnneextra = ['Distrarti pensando a tutte le opzioni future', 'Cogliere un ventaglio di alternative da esplorare', 'Quando giochi con ipotesi creative',
    'Proporre significati alternativi e idee correlate', 'Aprire porte verso strade nuove che potrebbero aprirsi'
];
const qbtnse = ['Ti immergi direttamente in ciò che accade attorno a te', 'Vivere al massimo la esperienza concreta che hai davanti', 'I dettagli sensoriali (colori, odori, suoni', 
    'Descrivere quello che accade intorno a te con precisione sensoriale', 'A reagire a ciò che accade nel momento con spontaneità', 'Di raccogliere stimoli e viverli così come sono, senza sovrastrutture',
    'Sperimentare in prima persona esperienze intense nel presente', 'I dettagli concreti', 'Vivere esperienze sensoriali forti', 
    'Stimoli concreti (cibo, movimento, azioni)'
];
const qbtnseextra = ['Lasciarti trascinare dalle sensazioni immediate del momento', 'Cogliere il qui e ora con intensità',
    'Ti affidi al tuo istinto immediato', 'Descrivere i particolari fisici', 'Tuffarti nella esperienza presente'
];

function caricaDomnese() {
    ++idnese;
    if (idnese < domandenese.length) {
        document.getElementById("question").innerHTML = domandenese[idnese];
        document.getElementById('btn2text').innerHTML = qbtnne[idnese];
        document.getElementById('btn3text').innerHTML = qbtnse[idnese];
    } else {
        if (ne > se + 2) {
            tipoP = 'N';
            avanbtn.style.visibility = 'visible';
            quizfinitonese = true;
            disabilitabottoni();
        } else if (se > ne + 2) {
            tipoP = 'S';
             avanbtn.style.visibility = 'visible';
            quizfinitonese = true;
            disabilitabottoni();
        } else {
            inextranese = true;
            caricaDom2nese();
        }

        }
    }
     function caricaDom2nese() {
        ++extraidnese
    if (extraidnese < domandeextranese.length)  {
        document.getElementById("question").innerHTML = domandeextranese[extraidnese];
        document.getElementById('btn2text').innerHTML = qbtnneextra[extraidnese];
        document.getElementById('btn3text').innerHTML = qbtnseextra[extraidnese];
    } else {
        if (ne > se) {
            tipoP = 'N';
    } else {
            tipoP = 'S';
    }
    avanbtn.style.visibility = 'visible';
        quizfinitonese = true;
        disabilitabottoni();
}
}
function listenerIntronese() {
        if (quizfinitonese) return;
        ne++;
        if (inextranese) {
            caricaDom2nese();
        } else {
            caricaDomnese();
        }
    }
  function listenerEstronese () {
        if (quizfinitonese) return;
        se++;
        if (inextranese) {
            caricaDom2nese();
        } else {
            caricaDomnese();
        }
    }
   function setuplistenernese() {
    introbtn.addEventListener('click', listenerIntronese);
    estrobtn.addEventListener('click', listenerEstronese);
} 
//Blocco ExxJ (TeFe)
let idtefe = -1;
let te = 0;
let fe = 0;
let extraidtefe = -1;
let quizfinitotefe = false;
let inextratefe = false;

const domandetefe = ['Quando prendi una decisione di gruppo, ti concentri più su quale sia la opzione:', 'Ti capita più spesso di chiederti:',
    'Ti senti più soddisfattto quando:', 'Ti viene spontaneo spiegare il perché di una scelta con:', 'Quando devi dare un feedback, tendi a puntare su:',
    'Se un piano è giusto, ma scontenta qualcuno, preferisci:', 'Ti capita più spesso di correggere gli altri perché:',
    'Ti dà più fastidio:', 'In un lavoro di squadra, ti viene naturale:',
    'Ti riconosci di più quando sei descritto come:'
];
const domandeextratefe = ['Ti è più facile notare dove mancano:', 'Quando un amico chiede consiglio, tendi a dare:',
    'Ti irrita di più chi ignora:', 'Se sei sotto pressione, ti rifugi più nel', 'Guardando indietro, ti giudichi più su quanto:'
];
const qbtnte = ['Più efficiente', 'Funziona', 'Raggiungi un obiettivo concreto', 'Dati e logica', 'La efficacia delle azioni',
    'Portarlo avanti lo stesso', 'Non sono coerenti', 'La inefficienza', 'Organizzare le risorse in modo razionale', 'Efficiente'
];
const qbtnteextra= ['Fatti/dati', 'Soluzioni pratiche', 'La logica', 'Ordine dei compiti', 'Sei stato produttivo'];
const qbtnfe = ['Che renda tutti più sereni', 'Piace agli altri', 'Il gruppo è in armonia', 'Il suo impatto sugli altri', 
    'Il tono emotivo', 'Adattarlo per mantenere buoni rapporti', 'Rischiano di ferire qualcuno', 'La disarmonia', 'Assicurati che tutti si sentano inclusi',
    'Premuroso'
];
const qbtnfeextra = ['Attenzioni alle persone', 'Sostegno emotivo', 'I sentimenti', 'Prenderti cura delle relazioni?', 'Sei stato di supporto agli altri'];


function caricaDomtefe() {
    ++idtefe;
    if (idtefe < domandetefe.length) {
        document.getElementById("question").innerHTML = domandetefe[idtefe];
        document.getElementById('btn2text').innerHTML = qbtnte[idtefe];
        document.getElementById('btn3text').innerHTML = qbtnfe[idtefe];
    } else {
        if (te > fe + 2) {
            tipoJ = 'T';
            avanbtn.style.visibility = 'visible';
            quizfinitotefe = true;
            disabilitabottoni();
        } else if (fe > te + 2) {
            tipoJ = 'F';
             avanbtn.style.visibility = 'visible';
            quizfinitotefe = true;
            disabilitabottoni();
        } else {
            inextranese = true;
            caricaDom2tefe();
        }

        }
    }
     function caricaDom2tefe() {
        ++extraidtefe
    if (extraidtefe < domandeextratefe.length)  {
        document.getElementById("question").innerHTML = domandeextratefe[extraidtefe];
        document.getElementById('btn2text').innerHTML = qbtnteextra[extraidtefe];
        document.getElementById('btn3text').innerHTML = qbtnfeextra[extraidtefe];
    } else {
        if (te > fe) {
            tipoJ = 'T';
    } else {
            tipoJ = 'F';
    }
    avanbtn.style.visibility = 'visible';
        quizfinitotefe = true;
        disabilitabottoni();
}
}
function listenerIntrotefe() {
        if (quizfinitotefe) return;
        te++;
        if (inextratefe) {
            caricaDom2tefe();
        } else {
            caricaDomtefe();
        }
    }
  function listenerEstrotefe () {
        if (quizfinitotefe) return;
        fe++;
        if (inextratefe) {
            caricaDom2tefe();
        } else {
            caricaDomtefe();
        }
    }
   function setuplistenertefe() {
    introbtn.addEventListener('click', listenerIntrotefe);
    estrobtn.addEventListener('click', listenerEstrotefe);
} 
//Blocco IxFP (Ne-Se)
let idauxnese= -1;
let auxne = 0;
let auxse = 0;
let extraidauxnese = -1;
let quizfinitoauxnese = false;
let inextraauxnese = false;

const domandeauxnese = ['Quando ti senti bloccato dentro di te, ti aiuta di più:', 'Nelle conversazioni, usi di più:',
    'Quando devi controbilanciare il tuo mondo interiore, preferisci farlo:', 'Ti capita di:', 'Se la tua intuizione profonda non basta:',
    'Quando collabori con altri, ti integri meglio proponendo:', 'Ti capita di sentirti più bilanciato quando:', 
    'Quando studi o lavori, ti viene naturale completare il tuo approccio con:', 'Ti capita di compensare la tua interiorità cercando stimoli esterni:',
    'Se una situazione interiore diventa troppo pesante, preferisci:'
];
const exdomandeauxnese = ['In gruppo, ti sostieni meglio portanto:', 'Ti bilancia di più:', 
    'Quando cerchi di compensare i tuoi pensieri introspettivi, ti viene più naturale:', 'Ti senti più stabile quando:',
'Quando esci dal tuo mondo interno, ti senti meglio se:'];
const qbtnauxne = ['Aprirti a nuove possibilità e scenari', 'Idee alternative per integrare ciò che pensi', 
    'Esplorando possibilità astratte', 'Usare nuove prospettive per sostenere il tuo ragionamento', 'Cerchi stimoli in scenari futuri e opzioni aperte',
'Possibilità inaspettare', 'Aggiungi creatività e alternative alle tue riflessioni', 
'Con collegamenti astratti', 'Nel mondo delle idee', 'Aprirti a possibilità inedite'];
const exqbtnauxne = ['Nuove opzioni e connessioni', 'Aprire il ventaglio delle possibilità future', 'Fantasticare su "cosa altro potrebbe esserci"', 
    'Aggiungi varietà e alternatice alle tue intuizioni interne', 'Ti apri a nuove idee e possibilità'
];
const qbtnauxse = ['Immergerti nella esperienza concreta del presente', 'Esempi pratici che riportino a terra il discorso', 
    'Concentrandoti sui dettagli tangibili intorno a te', 'Usare espeirenze sensoriali dirette per dare concretezza al tuo ragionamento',
    'Ti affidi al contatto immediato con ciò che hai davanti', 'Osservazioni pratiche sulla realtà attuale', 'Ti cali davvero nella esperienza presente',
    'Esempi concreti e tangibili', 'Nel mondo dei sensi', 'Buttarti in una esperienza concreta che ti riporti al qui e ora?'
];
const exqbtnauxse = ['Osservazioni pratiche legate a quello che si vede e si sente', 'Radicarti nella esperienza del momento', 'Guardarti attorno e sfruttare ciò che hai a disposizione subito',
    'Ti affidi a stimoli concreti e diretti che ancorano i tuoi pensieri', 'Ti immergi fisicamente e sensorialmente nel ambiente che ti circonda'
];

function caricaDomauxnese() {
    ++idauxnese;
    if (idauxnese < domandeauxnese.length) {
        document.getElementById("question").innerHTML = domandeauxnese[idauxnese];
        document.getElementById('btn2text').innerHTML = qbtnauxne[idauxnese];
        document.getElementById('btn3text').innerHTML = qbtnauxse[idauxnese];
    } else {
        if (auxne > auxse + 2) {
            tipoP = 'N';
            avanbtn.style.visibility = 'visible';
            quizfinitoauxnese = true;
            disabilitabottoni();
        } else if (auxse > auxne + 2) {
            tipoP = 'S';
             avanbtn.style.visibility = 'visible';
            quizfinitoauxnese = true;
            disabilitabottoni();
        } else {
            inextraauxnese = true;
            caricaDom2auxnese();
        }

        }
    }
     function caricaDom2auxnese() {
        ++extraidauxnese
    if (extraidauxnese < exdomandeauxnese.length)  {
        document.getElementById("question").innerHTML = exdomandeauxnese[extraidauxnese];
        document.getElementById('btn2text').innerHTML = exqbtnauxne[extraidauxnese];
        document.getElementById('btn3text').innerHTML = exqbtnauxse[extraidauxnese];
    } else {
        if (auxne > auxse) {
            tipoP = 'N';
    } else {
            tipoP = 'S';
    }
    avanbtn.style.visibility = 'visible';
        quizfinitoauxnese = true;
        disabilitabottoni();
}
}
function listenerIntroauxnese() {
        if (quizfinitoauxnese) return;
        auxne++;
        if (inextraauxnese) {
            caricaDom2auxnese();
        } else {
            caricaDomauxnese();
        }
    }
  function listenerEstroauxnese () {
        if (quizfinitoauxnese) return;
        auxse++;
        if (inextraauxnese) {
            caricaDom2auxnese();
        } else {
            caricaDomauxnese();
        }
    }
   function setuplistenerauxnese() {
    introbtn.addEventListener('click', listenerIntroauxnese);
    estrobtn.addEventListener('click', listenerEstroauxnese);
} 
//blocco INxJ (Te-Fe)
 idauxtefe = -1;
 auxte = 0;
 auxfe = 0;
 extraidauxtefe = -1;
 inextraauxtefe = false;
 quizfinitoauxtefe = false;

 const domandeauxtefe = ['Quando vuoi dare forma alle tue idee interne, ti è più naturale:',
    'Ti capita di "uscire dalla testa":',
     'Quando devi portare avanti un progetto, ti spinge di più il bisogno di:',
    'Nel tradurre ciò che senti o pensi, preferisci:', 
    'Ti capita più spesso di aiutare gli altri:',
     'Quando il tuo mondo interiore diventa troppo chiuso, lo bilanci meglio con:',
    'Ti senti più a tuo agio quando riesci:',
     'Se hai una idea astratta, la traduci prima:', 
    'Quando sostieni un gruppo, ti appoggi di più',
     'Ti capita di bilanciare i tuoi pensieri interni, chiedendoti:'
 ];
  const exdomandeauxtefe = ['Se sei incerto, ti orienti più facilmente:',
    'Ti senti più integrato quando riesci a:',
    'Nel concretizzare ciò che ti porti dentro, ti soddisfa di più vedere:',
    'Quando qualcuno non capisce la sua interiorità, cerchi di chiarirla con:',
    'Guardandoti indietro, ti senti più equilibrato quando:'
  ];
const qbtnauxte = ['Tradurle in un piano pratico',
    'Mettendo ordine e misurando i risultati',
    'Renderlo efficiente',
    'Stabilire criteri chiari e obiettivi',
    'Coordinando azioni e risorse',
    'Con schemi e organizzazione',
    'A portare logica e ordine fuori di te',
    'In passi concreti',
    'A criteri oggettivi di efficienza',
    'Come renderlo utile e funzionale'

];
const exqtbnauxte = ['Valutando pro e contro pratici',
    'Costruire strutture esterne per le tue idee',
    'Un risultato misurabile',
    'Logica e organizzazione',
    'Hai reso produttivo ciò che pensavi'
];
const qbtnauxfe = ['Condividerle in modo che gli altri le capiscano e accolgano',
    'Cercando sintonia e collaborazione',
    'Renderlo condiviso',
    'Cercare un linguaggio che unisca le persone',
    'Creando armonia e comprensione',
    'Contatto e attenzione alle relazioni',
    'A far sentire gli altri a loro agio con ciò che esprimi',
    'In un messaggio che risuoni con chi ti ascolta',
    'Alla sensibilità verso ciò che gli altri provano',
    'Come renderlo condivisibile e armonioso'
];
const exqbtnauxfe = ['Osservando il clima emotivo intorno a te',
    'A tessere legami intorno alle tue idee',
    'Vedere le persone connesse',
    'Adattando il tono per essere accettato',
    'Hai reso comprensibile e accettato dagli altri ciò che pensavi'
];

function caricaDomauxtefe() {
    ++idauxtefe;
    if (idauxtefe < domandeauxtefe.length) {
        document.getElementById("question").innerHTML = domandeauxtefe[idauxtefe];
        document.getElementById('btn2text').innerHTML = qbtnauxte[idauxtefe];
        document.getElementById('btn3text').innerHTML = qbtnauxfe[idauxtefe];
    } else {
        if (auxte > auxfe + 2) {
            tipoJ = 'T';
            avanbtn.style.visibility = 'visible';
            quizfinitoauxtefe = true;
            disabilitabottoni();
        } else if (auxfe > auxte + 2) {
            tipoJ = 'F';
             avanbtn.style.visibility = 'visible';
            quizfinitoauxtefe = true;
            disabilitabottoni();
        } else {
            inextraauxtefe = true;
            caricaDom2auxtefe();
        }

        }
    }
     function caricaDom2auxtefe() {
        ++extraidauxtefe
    if (extraidauxtefe < exdomandeauxtefe.length)  {
        document.getElementById("question").innerHTML = exdomandeauxtefe[extraidauxtefe];
        document.getElementById('btn2text').innerHTML = exqtbnauxte[extraidauxtefe];
        document.getElementById('btn3text').innerHTML = exqbtnauxfe[extraidauxtefe];
    } else {
        if (auxte > auxfe) {
            tipoJ = 'T';
    } else {
            tipoJ = 'F';
    }
    avanbtn.style.visibility = 'visible';
        quizfinitoauxtefe = true;
        disabilitabottoni();
}
}
function listenerIntroauxtefe() {
        if (quizfinitoauxtefe) return;
        auxte++;
        if (inextraauxtefe) {
            caricaDom2auxtefe();
        } else {
            caricaDomauxtefe();
        }
    }
  function listenerEstroauxtefe () {
        if (quizfinitoauxtefe) return;
        auxfe++;
        if (inextraauxtefe) {
            caricaDom2auxtefe();
        } else {
            caricaDomauxtefe();
        }
    }
   function setuplistenerauxtefe() {
    introbtn.addEventListener('click', listenerIntroauxtefe);
    estrobtn.addEventListener('click', listenerEstroauxtefe);
} 
// Blocco ENxP (Ti-Fi)
 idauxtifi = -1;
 auxti = 0;
 auxfi = 0;
 extraidauxtifi = -1;
 inextraauxtifi = false;
 quizfinitoauxtifi = false;

 const domandeauxtifi = ['Quando rifletti su una scelta, ti soffermi più:',
    'Ti capita di rivedere ciò che dici per renderlo più:',
    'Quando ti senti in dubbio, cerchi di capire se:',
    'Nelle tue riflessioni, sei più attratto dal:',
    'Quando ascolti una idea, la valuti più:',
    'Ti capita più spesso di chiederti:',
    'Guardando dentro di te, trovi più facilmente:',
    'Se una persona ti contraddice, ti spinge più:',
    'Ti senti più stabile quando hai:',
    'In una conversazioe, ti concentri di più sul:'
 ];
 const exdomandeauxtifi = ['Quando elabori qualcosa da solo, tendi più',
    'Ti capita di scartare una opzione perché:',
    'Guardando un tuo errore, pensi più facilmente:',
    'Ti capita di appoggiarti al bisogno di:',
    'Alla fine di un processo, ti senti più soddisfatto se:'
 ];
 const qbtnauxti = ['Sul fatto che sia chiara e ben ragionata',
    'Coerente',
    'I pezzi combaciano tra loro',
    'Mettere ordine nei concetti',
    'Per la sua chiarezza',
    'È ben strutturato',
    'Criteri per distinguere vero/falso',
    'A chiarire meglio il tuo ragionamento',
    'Messo in fila le cose in modo ordinato',
    'Senso preciso delle parole',
 ];
 const exqbtnauxti = ['A costruire uno schema logico',
    'Non torna nei dettagli',
    'Non era coerente',
    'Precisione interna',
    'Il tutto fila liscio'
 ];
 const qbtnauxfi = ['Sul fatto che sia in linea con te stesso',
    'Autentico',
    'La decisione ti rispecchia davvero',
    'Riconoscere le tue sensazioni interiori',
    'Per quanto ti convince a livello personale',
    'Mi rappresenta davvero',
    'Ciò che senti vicino ',
    'A riflettere se la posizione rispecchia chi sei',
    'Agito in modo coerente con te stesso',
    'Tono e sul significato chd ti arriva dentro'
 ];
 const exqbtnauxfi = ['A chiederti come ti suona a livello personale',
    'Non ti convince dentro',
    'Non mi apparteneva',
    'Di fedeltà a te stesso',
    'Senti che ti rappresenta'
 ];

 function caricaDomauxtifi() {
    ++idauxtifi;
    if (idauxtifi < domandeauxtifi.length) {
        document.getElementById("question").innerHTML = domandeauxtifi[idauxtifi];
        document.getElementById('btn2text').innerHTML = qbtnauxti[idauxtifi];
        document.getElementById('btn3text').innerHTML = qbtnauxfi[idauxtifi];
    } else {
        if (auxti > auxfi + 2) {
            tipoJ = 'T';
            avanbtn.style.visibility = 'visible';
            quizfinitoauxtifi = true;
            disabilitabottoni();
        } else if (auxfi > auxti + 2) {
            tipoJ = 'F';
             avanbtn.style.visibility = 'visible';
            quizfinitoauxtifi = true;
            disabilitabottoni();
        } else {
            inextraauxtifi = true;
            caricaDom2auxtifi();
        }

        }
    }
     function caricaDom2auxtifi() {
        ++extraidauxtifi
    if (extraidauxtifi < exdomandeauxtifi.length)  {
        document.getElementById("question").innerHTML = exdomandeauxtifi[extraidauxtifi];
        document.getElementById('btn2text').innerHTML = exqbtnauxti[extraidauxtifi];
        document.getElementById('btn3text').innerHTML = exqbtnauxfi[extraidauxtifi];
    } else {
        if (auxti > auxfi) {
            tipoJ = 'T';
    } else {
            tipoJ = 'F';
    }
    avanbtn.style.visibility = 'visible';
        quizfinitoauxtifi = true;
        disabilitabottoni();
}
}
function listenerIntroauxtifi() {
        if (quizfinitoauxtifi) return;
        auxti++;
        if (inextraauxtifi) {
            caricaDom2auxtifi();
        } else {
            caricaDomauxtifi();
        }
    }
  function listenerEstroauxtifi () {
        if (quizfinitoauxtifi) return;
        auxfi++;
        if (inextraauxtifi) {
            caricaDom2auxtifi();
        } else {
            caricaDomauxtifi();
        }
    }
   function setuplistenerauxtifi() {
    introbtn.addEventListener('click', listenerIntroauxtifi);
    estrobtn.addEventListener('click', listenerEstroauxtifi);
} 
// Blocco ExTJ (Ni Si)
idauxnisi = -1;
auxni = 0;
auxsi = 0;
extraidauxnisi = -1;
inextraauxnisi = false;
quizfinitoauxnisi = false;

const domandeauxnisi = ['Quando hai bisogno di orientarti, ti viene più naturale:',
    'Ti capita di rientrare in te stesso per:',
    'Quando riflettendo cerchi stabilità, la trovi di più:',
    'Se ti senti incerto, ti aiuta di più:',
    'Nel prendere decisioni, ti capita di appoggiarti più:',
    'Quando qualcosa non ti torna, guardi dentro di te per:',
    'Ti capita più spesso di:',
    'Ti senti più centrato quando:',
    'Quando valuti una idea nuova, pensi prima a:',
    'Nei momenti di incertezza, cerchi di:'
];
const exdomandeauxnisi = ['Ti capita più facilmente di:',
    'Quando sei sotto pressione, ti stabilizza di più pensare:',
    'Ti capita più spesso di sentirti guidato da:',
    'Guardando indietro, ti rassicura di più:',
    'Nel rientrare in te stesso, trovi più sostegno:'
];
const qbtnauxni = ['Cercare il filo conduttore nascosto',
    'Cogliere un senso unico della situazione',
    'Immaginando dove tutto porta',
    'Una visione che unisce i pezzi in prospettiva',
    'A intuzioni sul quadro complessivo',
    'Cogliere il significato nascosto',
    'Avere un lampo che ti mostra la direzione',
    'Cogli un filo invisibile che collega le cose',
    'Come si inserisce in un disegno più grande',
    'Immaginare cosa sta emergendo sotto la superficie'
];
const exqbtnauxni = ['Dare senso alle cose collegandole tra loro',
    'Dove sta andando tutto questo',
    'Una sensazione di direzione interiore',
    'Aver colto il senso profondo delle cose',
    'In intuizioni sul futuro'
];

const qbtnauxsi = ['Confrontarti con ciò che è già successo',
    'Ricordarti come hai fatto in casi simili',
    'Ripensando a un riferimento concreto del passato',
    'Un ricordo di esperienze che ti guidano',
    'A ciò che sai già funzionare',
    'Ricordare dettagli che chiariscono',
    'Ritrovare stabilità richiamando alla mente ciò che conosci',
    'Hai un punto di riferimento concreto e familiare',
    'Come si rapporta a ciò che hai già visto',
    'Ripercorrere ciò che sai già da esperienza'
];
const exqbtnauxsi = ['Confrontandole con ciò che ricordi',
    'Cosa ha funzionato altre volte',
    'Un senso di continuità con il passato',
    'Aver rispettato ciò che ti era già familiare',
    'Nei ricordi che ti ancorano'
];

 function caricaDomauxnisi() {
    ++idauxnisi;
    if (idauxnisi < domandeauxnisi.length) {
        document.getElementById("question").innerHTML = domandeauxnisi[idauxnisi];
        document.getElementById('btn2text').innerHTML = qbtnauxni[idauxnisi];
        document.getElementById('btn3text').innerHTML = qbtnauxsi[idauxnisi];
    } else {
        if (auxni > auxsi + 2) {
            tipoP = 'N';
            avanbtn.style.visibility = 'visible';
            quizfinitoauxnisi = true;
            disabilitabottoni();
        } else if (auxsi > auxni + 2) {
            tipoJ = 'S';
             avanbtn.style.visibility = 'visible';
            quizfinitoauxnisi = true;
            disabilitabottoni();
        } else {
            inextraauxnisi = true;
            caricaDom2auxnisi();
        }

        }
    }
     function caricaDom2auxnisi() {
        ++extraidauxnisi
    if (extraidauxnisi < exdomandeauxnisi.length)  {
        document.getElementById("question").innerHTML = exdomandeauxnisi[extraidauxnisi];
        document.getElementById('btn2text').innerHTML = exqbtnauxni[extraidauxnisi];
        document.getElementById('btn3text').innerHTML = exqbtnauxsi[extraidauxnisi];
    } else {
        if (auxni > auxsi) {
            tipoP = 'N';
    } else {
            tipoP = 'S';
    }
    avanbtn.style.visibility = 'visible';
        quizfinitoauxnisi = true;
        disabilitabottoni();
}
}
function listenerIntroauxnisi() {
        if (quizfinitoauxnisi) return;
        auxni++;
        if (inextraauxnisi) {
            caricaDom2auxnisi();
        } else {
            caricaDomauxnisi();
        }
    }
  function listenerEstroauxnisi () {
        if (quizfinitoauxtnisi
        ) return;
        auxsi++;
        if (inextraauxnisi) {
            caricaDom2auxnisi();
        } else {
            caricaDomauxnisi();
        }
    }
   function setuplistenerauxnisi() {
    introbtn.addEventListener('click', listenerIntroauxnisi);
    estrobtn.addEventListener('click', listenerEstroauxnisi);
} 



function disabilitabottoni() {
    introbtn.disabled = true;
    estrobtn.disabled = true;
}
function abilitabottoni() {
    introbtn.disabled = false;
    estrobtn.disabled = false;
}
function passafase() {
    fase++;
    document.getElementById('final').innerHTML = '';
    avanbtn.style.visibility = 'hidden';
    abilitabottoni();
let pagine = {
    "INTP": "../tipi/INTP.html",
    "ENTP": "../tipi/ENTP.html",
    "INFP": "../tipi/INFP.html",
    "ENFP": "../tipi/ENFP.html",
    "ISTP": "../tipi/ISTP.html",
    "ESTP": "../tipi/ESTP.html",
    "ISFP": "../tipi/ISFP.html",
    "ESFP": "../tipi/ESFP.html",
    "INTJ": "../tipi/INTJ.html",
    "ENTJ": "../tipi/ENTJ.html",
    "INFJ": "../tipi/INFJ.html",
    "ENFJ": "../tipi/ENFJ.html",
    "ISTJ": "../tipi/ISTJ.html",
    "ESTJ": "../tipi/ESTJ.html",
    "ISFJ": "../tipi/ISFJ.html",
    "ESFJ": "../tipi/ESFJ.html",
};

    if (fase === 1) {
        idJP = -1;
        j = 0;
        p = 0;
        extraidjp = -1;
        inextraJP = false;
        quizfinitojp = false;

        introbtn.removeEventListener('click', listenerIntroEI);
        estrobtn.removeEventListener('click', listenerEstroEI);

        setuplistenerJP();
        caricaDomJP();

    } else if (fase === 2) {
        if (tipoEI === 'I' && tipoJP === 'P') {
            idfiti = -1;
            fi = 0;
            ti = 0;
            extraidfiti = 0;
            inextrafiti = false;
            quizfinitofiti = false;

            introbtn.removeEventListener('click', listenerIntroJP);
            estrobtn.removeEventListener('click', listenerEstroJP);

            setuplistenerfiti ();
            caricaDomfiti();
        } else if (tipoEI === 'I' && tipoJP ==='J') {
            idnisi = -1;
            ni = 0;
            si = 0;
            extraidnisi= 0;
            inextranisi = false;
            quizfinitonisi = false;

            introbtn.removeEventListener('click', listenerIntroJP);
            estrobtn.removeEventListener('click', listenerEstroJP);

            setuplistenernisi ();
            caricaDomnisi();
        } else if (tipoEI === 'E' && tipoJP === 'P') {
            idnese = -1;
            ne = 0;
            se = 0;
            extraidnese = 0;
            inextranese = false;
            quizfinitonese = false;

            introbtn.removeEventListener('click', listenerIntroJP);
            estrobtn.removeEventListener('click', listenerEstroJP);

            setuplistenernese ();
            caricaDomnese();
        } else {
             idtefe = -1;
            te = 0;
            fe = 0;
            extraidtefe = 0;
            inextratefe = false;
            quizfinitotefe = false;

            introbtn.removeEventListener('click', listenerIntroJP);
            estrobtn.removeEventListener('click', listenerEstroJP);

            setuplistenertefe ();
            caricaDomtefe();
        }
    } else if (fase === 3) {
        if (tipoEI === 'I' && tipoJP === 'P' && tipoJ === 'F') {
            idauxnese = -1;
            auxne = 0;
            auxse = 0;
            extraidauxnese = -1;
            inextraauxnese = false;
            quizfinitoauxnese = false;

            introbtn.removeEventListener('click', listenerIntrofiti);
            estrobtn.removeEventListener('click', listenerEstrofiti);

            setuplistenerauxnese ();
            caricaDomauxnese ();
        } else if (tipoEI === 'I' && tipoJP === 'P' && tipoJ === 'T') {
            idauxnese = -1;
            auxne = 0;
            auxse = 0;
            extraidauxnese = -1;
            inextraauxnese = false;
            quizfinitoauxnese = false;

            introbtn.removeEventListener('click', listenerIntrofiti);
            estrobtn.removeEventListener('click', listenerEstrofiti);

            setuplistenerauxnese ();
            caricaDomauxnese ();
        } else if (tipoEI === 'I' && tipoJP === 'J' && tipoP === 'N') {
            idauxtefe = -1;
            auxte = 0;
            auxfe = 0;
            extraidauxtefe = -1;
            inextraauxtefe = false;
            quizfinitoauxtefe = false;

            introbtn.removeEventListener('click', listenerIntronisi);
            estrobtn.removeEventListener('click', listenerEstronisi);

            setuplistenerauxtefe ();
            caricaDomauxtefe ();
        } else if (tipoEI === 'I' && tipoJP === 'J' && tipoP === 'S') {
            idauxtefe = -1;
            auxte = 0;
            auxfe = 0;
            extraidauxtefe = -1;
            inextraauxtefe = false;
            quizfinitoauxtefe = false;

            introbtn.removeEventListener('click', listenerIntronisi);
            estrobtn.removeEventListener('click', listenerEstronisi);

            setuplistenerauxtefe ();
            caricaDomauxtefe ();
        } else if (tipoEI === 'E' && tipoJP === 'P' && tipoP === 'N') {
            idauxtifi = -1;
            auxti = 0;
            auxfi = 0;
            extraidauxtifi = -1;
            inextraauxtifi = false;
            quizfinitoauxtifi = false;

            introbtn.removeEventListener('click', listenerIntronese);
            estrobtn.removeEventListener('click', listenerEstronese);

            setuplistenerauxtifi ();
            caricaDomauxtifi ();

        } else if (tipoEI === 'E' && tipoJP === 'P' && tipoP === 'S') {
            idauxtifi = -1;
            auxti = 0;
            auxfi = 0;
            extraidauxtifi = -1;
            inextraauxtifi = false;
            quizfinitoauxtifi = false;

            introbtn.removeEventListener('click', listenerIntronese);
            estrobtn.removeEventListener('click', listenerEstronese);

            setuplistenerauxtifi ();
            caricaDomauxtifi ();

        } else if (tipoEI === 'E' && tipoJP === 'J' && tipoJ === 'T') {
            idauxnisi = -1;
            auxni = 0;
            auxsi = 0;
            extraidauxnisi = -1;
            inextraauxnisi = false;
            quizfinitoauxnisi = false;

            introbtn.removeEventListener('click', listenerIntrotefe);
            estrobtn.removeEventListener('click', listenerEstrotefe);

            setuplistenerauxnisi ();
            caricaDomauxnisi ();
        } else if (tipoEI === 'E' && tipoJP === 'J' && tipoJ === 'F') {
            idauxnisi = -1;
            auxni = 0;
            auxsi = 0;
            extraidauxnisi = -1;
            inextraauxnisi = false;
            quizfinitoauxnisi = false;

            introbtn.removeEventListener('click', listenerIntrotefe);
            estrobtn.removeEventListener('click', listenerEstrotefe);

            setuplistenerauxnisi ();
            caricaDomauxnisi ();
        }
    } else if (fase === 4) {
        if (tipoEI === 'I' && tipoJP === 'P' && tipoJ === 'T' && tipoP === 'N') {
             document.getElementById('questions').remove();
             document.getElementById('results').style.visibility = 'visible';
             let risultato2 = "INTP";

             document.getElementById('tipombti').innerHTML = 'Il tuo tipo è: INTP';
             document.getElementById('brevespiegaz').innerHTML = 'INTP o il logico, è un tipo introverso, percettivo, intuitivo e razionale';
            
             document.getElementById("linkTest").addEventListener("click", function() {
                if (risultato2 = "INTP") {
                    window.location.href = pagine["INTP"];
                    
                }
             });
             document.getElementById("tipombti2").innerHTML = 'Vai alla pagina degli INTP';

        } else if (tipoEI === 'I' && tipoJP === 'P' && tipoJ === 'F' && tipoP === 'N') {
            document.getElementById('questions').remove();
             document.getElementById('results').style.visibility = 'visible';
             let risultato2 = "INFP";

             document.getElementById('tipombti').innerHTML = 'Il tuo tipo è: INFP';
             document.getElementById('brevespiegaz').innerHTML = 'INFP o il mediatore, è un tipo introverso, percettivo, intuitivo ed emotivo';
            
             document.getElementById("linkTest").addEventListener("click", function() {
                if (risultato2 = "INFP") {
                    window.location.href = pagine["INFP"];
                    
                }
             });
             document.getElementById("tipombti2").innerHTML = 'Vai alla pagina degli INFP';

        } else if (tipoEI === 'I' && tipoJP === 'P' && tipoJ === 'T' && tipoP === 'S') {
            document.getElementById('questions').remove();
             document.getElementById('results').style.visibility = 'visible';
             let risultato2 = "ISTP";

             document.getElementById('tipombti').innerHTML = 'Il tuo tipo è: ISTP';
             document.getElementById('brevespiegaz').innerHTML = 'ISTP o il virtuoso, è un tipo introverso, percettivo, sensoriale e logico.';
            
             document.getElementById("linkTest").addEventListener("click", function() {
                if (risultato2 = "ISTP") {
                    window.location.href = pagine["ISTP"];
                    
                }
             });
             document.getElementById("tipombti2").innerHTML = 'Vai alla pagina degli ISTP';

        }  else if (tipoEI === 'I' && tipoJP === 'P' && tipoJ === 'F' && tipoP === 'S') {
            document.getElementById('questions').remove();
             document.getElementById('results').style.visibility = 'visible';
             let risultato2 = "ISFP";

             document.getElementById('tipombti').innerHTML = 'Il tuo tipo è: ISFP';
             document.getElementById('brevespiegaz').innerHTML = 'ISFP o l avventuriero, è un tipo introverso, percettivo, sensoriale ed emotivo.';
            
             document.getElementById("linkTest").addEventListener("click", function() {
                if (risultato2 = "ISFP") {
                    window.location.href = pagine["ISFP"];
                    
                }
             });
             document.getElementById("tipombti2").innerHTML = 'Vai alla pagina degli ISFP';

        } else if (tipoEI === 'I' && tipoJP === 'J' && tipoJ === 'T' && tipoP === 'N') {
             document.getElementById('questions').remove();
             document.getElementById('results').style.visibility = 'visible';
             let risultato2 = "INTJ";

             document.getElementById('tipombti').innerHTML = 'Il tuo tipo è: INTJ';
             document.getElementById('brevespiegaz').innerHTML = 'INTJ o l architetto, è un tipo introverso, giudicante, intuitivo e razionale';
            
             document.getElementById("linkTest").addEventListener("click", function() {
                if (risultato2 = "INTJ") {
                    window.location.href = pagine["INTJ"];
                    
                }
             });
             document.getElementById("tipombti2").innerHTML = 'Vai alla pagina degli INTJ';

        } else if (tipoEI === 'I' && tipoJP === 'J' && tipoJ === 'F' && tipoP === 'N') {
            document.getElementById('questions').remove();
             document.getElementById('results').style.visibility = 'visible';
             let risultato2 = "INFJ";

             document.getElementById('tipombti').innerHTML = 'Il tuo tipo è: INFJ';
             document.getElementById('brevespiegaz').innerHTML = 'INFJ o il paladino, è un tipo introverso, giudicante, intuitivo ed emotivo';
            
             document.getElementById("linkTest").addEventListener("click", function() {
                if (risultato2 = "INFJ") {
                    window.location.href = pagine["INFJ"];
                    
                }
             });
             document.getElementById("tipombti2").innerHTML = 'Vai alla pagina degli INFJ';

        } else if (tipoEI === 'I' && tipoJP === 'J' && tipoJ === 'T' && tipoP === 'S') {
            document.getElementById('questions').remove();
             document.getElementById('results').style.visibility = 'visible';
             let risultato2 = "ISTJ";

             document.getElementById('tipombti').innerHTML = 'Il tuo tipo è: ISTJ';
             document.getElementById('brevespiegaz').innerHTML = 'ISTJ o il logista, è un tipo introverso, giudicante, sensoriale e logico.';
            
             document.getElementById("linkTest").addEventListener("click", function() {
                if (risultato2 = "ISTJ") {
                    window.location.href = pagine["ISTJ"];
                    
                }
             });
             document.getElementById("tipombti2").innerHTML = 'Vai alla pagina degli ISTJ';

        }  else if (tipoEI === 'I' && tipoJP === 'J' && tipoJ === 'F' && tipoP === 'S') {
            document.getElementById('questions').remove();
             document.getElementById('results').style.visibility = 'visible';
             let risultato2 = "ISFJ";

             document.getElementById('tipombti').innerHTML = 'Il tuo tipo è: ISFJ';
             document.getElementById('brevespiegaz').innerHTML = 'ISFJ o il difensore, è un tipo introverso, giudicante, sensoriale ed emotivo.';
            
             document.getElementById("linkTest").addEventListener("click", function() {
                if (risultato2 = "ISFJ") {
                    window.location.href = pagine["ISFJ"];
                    
                }
             });
             document.getElementById("tipombti2").innerHTML = 'Vai alla pagina degli ISFJ';

        } if (tipoEI === 'E' && tipoJP === 'P' && tipoJ === 'T' && tipoP === 'N') {
             document.getElementById('questions').remove();
             document.getElementById('results').style.visibility = 'visible';
             let risultato2 = "ENTP";

             document.getElementById('tipombti').innerHTML = 'Il tuo tipo è: ENTP';
             document.getElementById('brevespiegaz').innerHTML = 'ENTP o il dibattitore, è un tipo estroverso, percettivo, intuitivo e razionale';
            
             document.getElementById("linkTest").addEventListener("click", function() {
                if (risultato2 = "ENTP") {
                    window.location.href = pagine["ENTP"];
                    
                }
             });
             document.getElementById("tipombti2").innerHTML = 'Vai alla pagina degli ENTP';

        } else if (tipoEI === 'E' && tipoJP === 'P' && tipoJ === 'F' && tipoP === 'N') {
            document.getElementById('questions').remove();
             document.getElementById('results').style.visibility = 'visible';
             let risultato2 = "ENFP";

             document.getElementById('tipombti').innerHTML = 'Il tuo tipo è: ENFP';
             document.getElementById('brevespiegaz').innerHTML = 'ENFP o l attivista, è un tipo estroverso, percettivo, intuitivo ed emotivo';
            
             document.getElementById("linkTest").addEventListener("click", function() {
                if (risultato2 = "ENFP") {
                    window.location.href = pagine["ENFP"];
                    
                }
             });
             document.getElementById("tipombti2").innerHTML = 'Vai alla pagina degli ENFP';

        } else if (tipoEI === 'E' && tipoJP === 'P' && tipoJ === 'T' && tipoP === 'S') {
            document.getElementById('questions').remove();
             document.getElementById('results').style.visibility = 'visible';
             let risultato2 = "ESTP";

             document.getElementById('tipombti').innerHTML = 'Il tuo tipo è: ESTP';
             document.getElementById('brevespiegaz').innerHTML = 'ESTP o l imprenditore, è un tipo estroverso, percettivo, sensoriale e logico.';
            
             document.getElementById("linkTest").addEventListener("click", function() {
                if (risultato2 = "ESTP") {
                    window.location.href = pagine["ESTP"];
                    
                }
             });
             document.getElementById("tipombti2").innerHTML = 'Vai alla pagina degli ESTP';

        }  else if (tipoEI === 'E' && tipoJP === 'P' && tipoJ === 'F' && tipoP === 'S') {
            document.getElementById('questions').remove();
             document.getElementById('results').style.visibility = 'visible';
             let risultato2 = "ESFP";

             document.getElementById('tipombti').innerHTML = 'Il tuo tipo è: ESFP';
             document.getElementById('brevespiegaz').innerHTML = 'ESFP o l intrattenitore, è un tipo estroverso, percettivo, sensoriale ed emotivo.';
            
             document.getElementById("linkTest").addEventListener("click", function() {
                if (risultato2 = "ESFP") {
                    window.location.href = pagine["ESFP"];
                    
                }
             });
             document.getElementById("tipombti2").innerHTML = 'Vai alla pagina degli ESFP';

        } else if (tipoEI === 'E' && tipoJP === 'J' && tipoJ === 'T' && tipoP === 'N') {
             document.getElementById('questions').remove();
             document.getElementById('results').style.visibility = 'visible';
             let risultato2 = "ENTJ";

             document.getElementById('tipombti').innerHTML = 'Il tuo tipo è: ENTJ';
             document.getElementById('brevespiegaz').innerHTML = 'ENTJ o il comandante, è un tipo estroverso, giudicante, intuitivo e razionale';
            
             document.getElementById("linkTest").addEventListener("click", function() {
                if (risultato2 = "ENTJ") {
                    window.location.href = pagine["ENTJ"];
                    
                }
             });
             document.getElementById("tipombti2").innerHTML = 'Vai alla pagina degli ENTJ';

        } else if (tipoEI === 'E' && tipoJP === 'J' && tipoJ === 'F' && tipoP === 'N') {
            document.getElementById('questions').remove();
             document.getElementById('results').style.visibility = 'visible';
             let risultato2 = "ENFJ";

             document.getElementById('tipombti').innerHTML = 'Il tuo tipo è: ENFJ';
             document.getElementById('brevespiegaz').innerHTML = 'ENFJ o il protagonista, è un tipo estroverso, giudicante, intuitivo ed emotivo';
            
             document.getElementById("linkTest").addEventListener("click", function() {
                if (risultato2 = "ENFJ") {
                    window.location.href = pagine["ENFJ"];
                    
                }
             });
             document.getElementById("tipombti2").innerHTML = 'Vai alla pagina degli ENFJ';

        } else if (tipoEI === 'E' && tipoJP === 'J' && tipoJ === 'T' && tipoP === 'S') {
            document.getElementById('questions').remove();
             document.getElementById('results').style.visibility = 'visible';
             let risultato2 = "ESTJ";

             document.getElementById('tipombti').innerHTML = 'Il tuo tipo è: ESTJ';
             document.getElementById('brevespiegaz').innerHTML = 'ESTJ o il dirigente, è un tipo estroverso, giudicante, sensoriale e logico.';
            
             document.getElementById("linkTest").addEventListener("click", function() {
                if (risultato2 = "ESTJ") {
                    window.location.href = pagine["ESTJ"];
                    
                }
             });
             document.getElementById("tipombti2").innerHTML = 'Vai alla pagina degli ESTJ';

        }  else if (tipoEI === 'E' && tipoJP === 'J' && tipoJ === 'F' && tipoP === 'S') {
            document.getElementById('questions').remove();
             document.getElementById('results').style.visibility = 'visible';
             let risultato2 = "ESFJ";

             document.getElementById('tipombti').innerHTML = 'Il tuo tipo è: ESFJ';
             document.getElementById('brevespiegaz').innerHTML = 'ESFJ o il console, è un tipo estroverso, giudicante, sensoriale ed emotivo.';
            
             document.getElementById("linkTest").addEventListener("click", function() {
                if (risultato2 = "ESFJ") {
                    window.location.href = pagine["ESFJ"];
                    
                }
             });
             document.getElementById("tipombti2").innerHTML = 'Vai alla pagina degli ESFJ';

        } 
    } 
}
avanbtn.addEventListener('click', passafase);
