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
        let mes = (boavista_pj.periodo.periodo[i].mes).substring(0,2);
        let ano = (boavista_pj.periodo.periodo[i].mes).substring(5,7);

        if(ano.length === 1){
            ano = '2' + ano;
        }
        
        heading_3.innerHTML = boavista_pj.periodo.periodo[i].mes;


        switch(mes){
            case '1-':
                heading_3.innerHTML = 'Jan.'+ano;
                break;
            case '2-':
                heading_3.innerHTML = 'Fev.'+ano;
                break;
            case '3-':
                heading_3.innerHTML = 'Mar.'+ano;
                break;
            case '4-':
                heading_3.innerHTML = 'Abr.'+ano;
                break;
            case '5-':
                heading_3.innerHTML = 'Mai.'+ano;
                break;
            case '6-':
                heading_3.innerHTML = 'Jun.'+ano;
                break;
            case '7-':
                heading_3.innerHTML = 'Jul.'+ano;
                break;
            case '8-':
                heading_3.innerHTML = 'Ago.'+ano;
                break;
            case '9-':
                heading_3.innerHTML = 'Set.'+ano;
                break;
            case '10':
                heading_3.innerHTML = 'Out.'+ano;
                break;
            case '11':
                heading_3.innerHTML = 'Nov.'+ano;
                break;
            case '12':
                heading_3.innerHTML = 'Dez.'+ano;
                break;
        }
        row.appendChild(heading_3);
    }
    
    let itemConsulta = document.createElement('td');
    itemConsulta.innerHTML = 'Consultas';
    let itemQuantidade = document.createElement('td');
    itemQuantidade.innerHTML = boavista_pj.periodo.quantidade;

    row_1.appendChild(itemConsulta);
    row_1.appendChild(itemQuantidade);

    for(let j = qtde_periodos-1; j >= 0;j--){
        let itemPeriodo = document.createElement('td');
        itemPeriodo.innerHTML = boavista_pj.periodo.periodo[j].Quantidade;
        row_1.appendChild(itemPeriodo);
    }

    thead.appendChild(row);
    tbody.appendChild(row_1);
}


