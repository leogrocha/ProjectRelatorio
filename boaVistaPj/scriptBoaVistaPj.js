import BoaVistaPJ from '../model/boavista_pj.js';

// Gerando o medidor
var medidor = document.querySelector(".container-medidor");

const ponteiro = 500;
const setUrl = `https://server.sistemaagely.com.br/GraficoPonteiro?valor=${ponteiro}&maximo=1000`;
medidor.innerHTML += `
                <img src="${setUrl}" alt="Medidor" style="width: 300px; heigth: 300px">
`;

// function get_boavista_pj(result) {
//     const boavista_pj = new BoaVistaPJ(result.boavista);
//     const score_value = document.getElementById('#score_value');
//     // const score_description = document.getElementById('score_description');

//     //score_value.innerHTML += result.data.boavista[0].score.score;
//     score_value.innerText = boavista_pj.score.score;
    
    
// }

// function relatorio(result){
//     if("boavista" in result.data){
//         get_boavista_pj(result.data.boavista);
//     }
// }   


var raw = {
    "balanco": ["https://server.ectarepay.com.br/ectareArquivos/pdfviewer2619204387105330867.pdf", "https://server.ectarepay.com.br/ectareArquivos/pdfviewer2619204387105330867.pdf"],
    "balanco_anterior": ["https://server.ectarepay.com.br/ectareArquivos/pdfviewer2619204387105330867.pdf"],
    "dre": ["https://server.ectarepay.com.br/ectareArquivos/DRE.pdf"],
    "dre_anterior": ["https://server.ectarepay.com.br/ectareArquivos/DRE.pdf"],
    "boavista": ["https://server.ectarepay.com.br/ectareArquivos/bomdia.json", "https://server.ectarepay.com.br/ectareArquivos/RenataOliveira.json"]
};

var requestOptions = {
    headers: {
        "Accept": "application/json, text/javascript, /; q=0.01",
        "Access-Control-Allow-Headers": "Content-Type",
        'Content-Type': 'application/json; charset=UTF-8'
    },
    method: 'POST',
    body: JSON.stringify(raw),
    redirect: 'follow',
    cache: 'no-cache'
};

const BASE_URL = "http://analisededados.ectare.com.br/relatorio";

function get_data() {
    try {
        fetch(BASE_URL, requestOptions)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                let success = result.success
                //relatorio(result)
                //relatorio(result)
                //console.log(result.data.boavista[0].score.score);
                document.querySelector('todos_dados').innerHTML = result.data;

            })
    } catch (error) {
        console.log('error', error);
        document.querySelector("#saida").innerHTML = error;
    }
}

get_data();

