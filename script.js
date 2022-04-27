import Liquidez from './model/liquidez.js';

var raw = {
    "balanco": ["https://server.ectarepay.com.br/ectareArquivos/pdfviewer2619204387105330867.pdf", "https://server.ectarepay.com.br/ectareArquivos/pdfviewer2619204387105330867.pdf"],
    "balanco_anterior": ["https://server.ectarepay.com.br/ectareArquivos/pdfviewer2619204387105330867.pdf"],
    "dre": ["https://server.ectarepay.com.br/ectareArquivos/DRE.pdf"],
    "dre_anterior": ["https://server.ectarepay.com.br/ectareArquivos/DRE.pdf"],
    "boavista": ["https://server.ectarepay.com.br/ectareArquivos/bomdia.json", "https://server.ectarepay.com.br/ectareArquivos/RenataOliveira.json"]
};


console.log(raw.balanco.length);
console.log(raw)
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
                relatorio(result)
                console.log(result.data.liquidez_balanco);
            })
    } catch (error) {
        console.log('error', error);
    }
}

get_data();


function get_liquidez(liquidez_balanco, dre) {
    const indices = new Liquidez(liquidez_balanco, dre);
    let indices_lst = ['liquidez_corrente', 'liquidez_geral', 'endividamento_geral', 'patrimonio_social', 'liquidez_imediata',
        'liquidez_seca', 'terceiros', 'solvencia_geral', 'lucratividade'];

    for (let i = 0; i < indices_lst.length; i++) {

        document.getElementsByClassName(indices_lst[i] + "_indice")[0].innerText = indices[indices_lst[i]].indice.toFixed(2);
        document.getElementsByClassName(indices_lst[i] + "_situacao")[0].innerText = indices[indices_lst[i]].situacao;


        console.log(indices_lst[i] + " - " + indices[indices_lst[i]].situacao);

        if (indices[indices_lst[i]].situacao === "pessimo") {
            document.querySelector("#" + indices_lst[i] + "_icons").innerHTML += `
                <div class="fa-4x">
                    <i style="color: red" class="fa-regular fa-face-dizzy"></i>
                </div>
            `
        } else if (indices[indices_lst[i]].situacao === "ruim") {
            document.querySelector("#" + indices_lst[i] + "_icons").innerHTML += `
                <div class="fa-4x">
                <i style="color: orange" class="fa-regular fa-face-frown"></i>
                </div>
            `
        } else if (indices[indices_lst[i]].situacao === "atencao") {
            document.querySelector("#" + indices_lst[i] + "_icons").innerHTML += `
                <div class="fa-4x">
                <i style="color: darkorange;" class="fa-regular fa-face-meh"></i>
                </div>
            `
        } else if (indices[indices_lst[i]].situacao === "bom") {
            document.querySelector("#" + indices_lst[i] + "_icons").innerHTML += `
                <div class="fa-4x">
                <i style="color: green;" class="fa-regular fa-face-smile"></i>
                </div>
            `
        } else if (indices[indices_lst[i]].situacao === "otimo") {
            document.querySelector("#" + indices_lst[i] + "_icons").innerHTML += `
                <div class="fa-4x">
                <i style="color: darkcyan;" class="fa-regular fa-face-laugh-beam"></i>
                </div>
            `
        }

        for (let j = 0; j < indices_lst.length; j++) {
            document.getElementsByClassName(indices_lst[j] + "_indice")[1].innerText = indices[indices_lst[j]].indice.toFixed(2);
            document.getElementsByClassName(indices_lst[j] + "_situacao")[1].innerText = indices[indices_lst[j]].situacao;
        }
    }
}

function formatLocale(value) {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function get_table(result) {
    // Criando a tabela
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    const indices_table = ['ativo', 'ativo_circulante', 'ativo_nao_circulante', 'disponibilidades', 'estoques', 'imobilizado',
     'obrigacoes_a_longo_prazo', 'passivo_circulante', 'passivo_nao_circulante', 'patrimonio_liquido', 'realizavel_a_longo_prazo'];

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('container-variaveis').appendChild(table);

    for (let i = 0; i < raw.balanco.length; i++) {
        let row = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = '';
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = 'Jan/Mar';
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = 'Abr/Jun';
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = 'Jul/Set';
        let heading_5 = document.createElement('th');
        heading_5.innerHTML = 'Out/Dez';

        row.appendChild(heading_1);
        row.appendChild(heading_2);
        row.appendChild(heading_3);
        row.appendChild(heading_4);
        row.appendChild(heading_5);
        thead.appendChild(row);

        
        for (let j = 0; j < indices_table.length; j++) {
            let row_1 = document.createElement('tr');
            let cell_1 = document.createElement('td');
            cell_1.innerHTML = indices_table[j];
    
            row_1.appendChild(cell_1);
            tbody.appendChild(row_1);
        }

    }
}



function relatorio(result) {
    if ("liquidez_balanco" in result.data) {
        get_liquidez(result.data.liquidez_balanco, result.data.dre);
        console.log(result.data.liquidez_balanco.length);
        get_table(result.data.liquidez_balanco);
    }
}

