import BoaVistaPJ from '../model/boavista_pj.js';
import requestOptions from '../model/requestOptions.js';

// Gerando o medidor
var medidor = document.querySelector(".container-medidor");

const ponteiro = 500;
const setUrl = `https://server.sistemaagely.com.br/GraficoPonteiro?valor=${ponteiro}&maximo=1000`;
medidor.innerHTML += `
                <img src="${setUrl}" alt="Medidor" style="width: 300px; heigth: 300px">
`;

function get_boavista_pj(boavista) {
    var boavista_pj = new BoaVistaPJ(boavista);
    const score_value = document.getElementById('score_value');
    const score_texto = document.getElementById('score_description');

    score_value.innerHTML = boavista_pj;
}

function relatorio(result){
    if("boavista" in result.data){
        get_boavista_pj(result.data.boavista);
        console.log(true);
    } else {
        console.log(false);
    }
}   

const BASE_URL = "http://analisededados.ectare.com.br/relatorio";

function get_data() {
    try {
        fetch(BASE_URL, requestOptions)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                console.log(result.data)
                //relatorio(result)
                relatorio(result)
                //console.log(result.data.boavista[0].score.score);
                //get_boavista_pj(result.data.boavista);

            })
    } catch (error) {
        console.log('error', error);
    }
}

get_data();

