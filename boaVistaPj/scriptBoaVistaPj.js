import BoaVistaPJ from "../model/boavista_pj.js";
import requestOptions from "../model/requestOptions.js";

const BASE_URL = "http://analisededados.ectare.com.br/relatorio";

function get_data() {
    try {
        fetch(BASE_URL, requestOptions)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                relatorio(result)
                console.log(result.data.boavista);
            })
    } catch (error) {
        console.log('error', error);
    }
}

get_data();

function get_boavista_pj(boavista) {
    const boavista_pj = new BoaVistaPJ(boavista);

    const score = document.getElementById('score');
    score.innerText = boavista_pj.score.score;

    const texto = document.getElementById('texto');
    texto.innerHTML = boavista_pj.score.texto;

    const probabilidade = document.getElementById('probabilidade');
    probabilidade.innerHTML += "Probabilidade de Inadimplência " + (boavista_pj.score.probabilidade).toFixed(1) + "%";


    var medidor = document.querySelector(".container-medidor");

    const setUrl = `https://server.sistemaagely.com.br/GraficoPonteiro?valor=100&maximo=1000`;
    medidor.innerHTML += `
                <img src="${setUrl}" alt="Medidor" style="width: 300px; heigth: 300px">
    `;

    const indices_icons = ['protestos', 'pendencias_restricoes', 'cheques_sem_fundo'];

    for(let i = 0; i < indices_icons.length; i++) {
        const index = indices_icons[i];
        const icon = document.getElementById(index);
        if(boavista_pj[index].situacao === 'ruim') {
            icon.innerHTML = `<div class="fa-4x" style="margin-top: 10px;">
                <i style="color: red;" class="fa-regular fa-thumbs-down"></i>
            </div>`;
        } else if (boavista_pj[index].situacao === 'bom') {
            icon.innerHTML = `<div class="fa-4x" style="margin-top: 10px;">
                <i style="color: green;" class="fa-regular fa-thumbs-up"></i>
            </div>`;
        }
    } 
}

function relatorio(result) {
    if ("boavista" in result.data) {
        get_boavista_pj(result.data.boavista);
        console.log(true);
    } else {
        console.log(false);
    }
}


function get_table() {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('container-resumo-boavista').appendChild(table);

    let row = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = 'Descrição';
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = 'Observações';

    row.appendChild(heading_1);
    row.appendChild(heading_2);
    thead.appendChild(row);

    const indices_table = [];

    for (let i = 0; i < indices_table.length; i++) {
        let row_1 = document.createElement('tr');
        let cell_1 = document.createElement('td');
        cell_1.innerHTML = indices_table[i];

        row_1.appendChild(cell_1);
        tbody.appendChild(row_1);
    }
}

get_table();