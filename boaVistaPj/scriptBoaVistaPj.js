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
        get_table_consultas(result.data.boavista);
        console.log(true);
    } else {
        console.log(false);
    }
}


function get_table_consultas(boavista) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const boavista_pj = new BoaVistaPJ(boavista);

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('container-resumo-boavista').appendChild(table);

    let row = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = 'Descrição';
    row.appendChild(heading_1);
    let row_1 = document.createElement('tr');
    
    
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = 'Total/Pont.';
    row.appendChild(heading_2);
    
    const qtde_periodos = boavista_pj.periodo.periodo.length;
    
    for(let i = qtde_periodos-1; i >= 0;i--){
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = boavista_pj.periodo.periodo[i].mes;
        row.appendChild(heading_3);
    }
    
    let item1 = document.createElement('td');
    item1.innerHTML = 'Consultas';
    let item2 = document.createElement('td');
    item2.innerHTML = boavista_pj.periodo.quantidade;

    row_1.appendChild(item1);
    row_1.appendChild(item2);

    for(let j = qtde_periodos-1; j >= 0;j--){
        let item3 = document.createElement('td');
        item3.innerHTML = boavista_pj.periodo.periodo[j].Quantidade;
        row_1.appendChild(item3);
    }


    thead.appendChild(row);
    tbody.appendChild(row_1);
}





