import BoaVistaPF from "../model/boavista_pf.js";
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

function get_boavista_pf(boavista) {
    const boavista_pf = new BoaVistaPF(boavista);

    const score = document.getElementById('score');
    score.innerText = boavista_pf.score.score;

    const texto = document.getElementById('texto');
    texto.innerHTML = boavista_pf.score.texto;

    const renda_presumida_score = document.getElementById('renda_presumida_score');
    renda_presumida_score.innerHTML = boavista_pf.renda_presumida.score;

    const renda_presumida_texto = document.getElementById('renda_presumida_texto');
    renda_presumida_texto.innerHTML = boavista_pf.renda_presumida.texto;

    const probabilidade = document.getElementById('probabilidade');
    probabilidade.innerHTML += (boavista_pf.score.probabilidade).toFixed(1) + "%";

    var medidor = document.querySelector(".medidor");

    const setUrl = `https://server.sistemaagely.com.br/GraficoPonteiro?valor=100&maximo=1000`;
    medidor.innerHTML += `
                <img src="${setUrl}" alt="Medidor" style="width: 300px; heigth: 300px">
    `;

    //const indices_icons = ['protestos', 'debitos_lista'];

    if(boavista_pf.protestos.situacao === 'ruim') {
        document.querySelector("#protestos_icons").innerHTML += `
            <div class="fa-4x" style="margin-top: 20px;">
                 <i style="color: red;" class="fa-regular fa-thumbs-down"></i>
             </div> `;
    } else if(boavista_pf.protestos.situacao === 'bom') {
        document.querySelector("#protestos_icons").innerHTML += `
            <div class="fa-4x" style="margin-top: 20px;">
                 <i style="color: red;" class="fa-regular fa-thumbs-up"></i>
             </div> `;
    } 
    
    if(boavista_pf.debito_lista.situacao === 'ruim') {
        document.querySelector("#debitos_lista_icons").innerHTML += `
            <div class="fa-4x" style="margin-top: 20px;">
                 <i style="color: red;" class="fa-regular fa-thumbs-down"></i>
             </div> `;
    } else if(boavista_pf.debito_lista.situacao === 'bom') {
        document.querySelector("#debitos_lista_icons").innerHTML += `
            <div class="fa-4x" style="margin-top: 20px;">
                 <i style="color: red;" class="fa-regular fa-thumbs-up"></i>
             </div> `;
    }  

}

function relatorio(result) {
    if ("boavista" in result.data) {
        get_boavista_pf(result.data.boavista);
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

    const indices_table = ['Registros de Débito', 'Protestos', 'Consultas Anteriores', 'Cheques Devoluções Informadas Pelo Usuário', 'Cheques Sem Fundo',
        'Cheque Sustado Motivo 21'];

    for (let i = 0; i < indices_table.length; i++) {
        let row_1 = document.createElement('tr');
        let cell_1 = document.createElement('td');
        cell_1.innerHTML = indices_table[i];

        row_1.appendChild(cell_1);
        tbody.appendChild(row_1);
    }
}

get_table();