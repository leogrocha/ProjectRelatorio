import BoaVistaPF from "../model/boavista_pf.js";
//import requestOptions from "../model/requestOptions.js";

const raw = {
    "boavista": ["https://server.ectarepay.com.br/ectareArquivos/bomdia.json","https://server.ectarepay.com.br/ectareArquivos/RenataOliveira.json"],
}

const requestOptions = {
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

    const valor_score = parseInt(boavista_pf.score.score);
    
    const setUrl = `https://server.sistemaagely.com.br/GraficoPonteiro?valor=${valor_score}&maximo=1000`;
    medidor.innerHTML += `
                <img src="${setUrl}" alt="Medidor" style="width: 300px; heigth: 300px">
    `;

    const indices_icons = ['protestos', 'debitos_lista'];

    for(let i = 0; i < indices_icons.length; i++){
        const index = indices_icons[i];
        const icon = document.getElementById(index);
        if(boavista_pf[index].situacao === 'ruim') {
            icon.innerHTML = `<div class="fa-4x" style="margin-top: 10px;">
                <i style="color: red;" class="fa-regular fa-thumbs-down"></i>
            </div>`;
        } else if (boavista_pf[index].situacao === 'bom') {
            icon.innerHTML = `<div class="fa-4x" style="margin-top: 10px;">
                <i style="color: green;" class="fa-regular fa-thumbs-up"></i>
            </div>`;
        }
    }

}

function relatorio(result) {
    if ("boavista" in result.data) {
        get_boavista_pf(result.data.boavista);
        get_table(result.data.boavista);
        console.log(true);
    } else {
        console.log(false);
    }
}


function get_table(boavista) {
    const boavista_pf = new BoaVistaPF(boavista);
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

   
    const indices_table = ['protestos', 'debitos_lista', 'consultas_anteriores_lista'];    

    for (let i = 0; i < indices_table.length; i++) {
        let row_1 = document.createElement('tr');
        let cell_1 = document.createElement('td');
        cell_1.innerHTML = indices_table[i];
        let cell_2 = document.createElement('td');
        cell_2.innerHTML = boavista_pf[indices_table[i]].total;
        
        if(indices_table[i] === 'protestos') {
            cell_1.innerHTML = 'Protestos';
        } else if(indices_table[i] === 'debitos_lista') {
            cell_1.innerHTML = 'Registros de Débito';
        } else if (indices_table[i] === 'consultas_anteriores_lista') {
            cell_1.innerHTML = 'Consultas Anteriores';
        } 

        row_1.appendChild(cell_1);
        row_1.appendChild(cell_2);
        tbody.appendChild(row_1);
    }
}

