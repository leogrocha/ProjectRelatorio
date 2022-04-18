import Liquidez from './model/liquidez.js';


function get_liquidez(liquidez_balanco, liquidez_dre) {
    const indices = new Liquidez(liquidez_balanco, liquidez_dre);
    let indices_lst = ['liquidez_corrente', 'liquidez_geral', 'endividamento_geral', 'patrimonio_social', 'liquidez_imediata',
        'liquidez_seca', 'terceiros', 'solvencia_geral', 'lucratividade'];

    for (let i = 0; i < indices_lst.length; i++) {
        document.querySelector("#" + indices_lst[i] + "_indice").innerText = indices[indices_lst[i]].indice.toFixed(2);
        document.querySelector("#" + indices_lst[i] + "_situacao").innerText = indices[indices_lst[i]].situacao;


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
    }
}

function formatLocale(value) {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function get_table(result) {
    if (result.sucess) {
        var indices_lst = ['ativo', 'ativo_circulante', 'ativo_nao_circulante', 'disponiblidades', 'estoques', 'imobilizado',
            'obrigacoes_a_longo_prazo', 'passivo_circulante', 'passivo_nao_circulante', 'patrimonio_liquido', 'realizavel_a_longo_prazo'];
    }

    var tbody = document.querySelector("#table_body");

    for (let i = 0; i < indices_lst.length; i++) {
        var item = result.table[indices_lst[i]];

        let row = document.createElement('tr')
        let row_var = document.createElement('td')
        row_var.innerHTML = indices_lst[i].toLowerCase();
        let row_data1 = document.createElement('td')
        row_data1.innerHTML = formatLocale(item[0]);
        let row_data2 = document.createElement('td')
        row_data2.innerHTML = formatLocale(item[1]);
        let row_data3 = document.createElement('td')
        row_data3.innerHTML = formatLocale(item[2]);
        let row_data4 = document.createElement('td')
        row_data4.innerHTML = formatLocale(item[3]);
        row.appendChild(row_var);
        row.appendChild(row_data1);
        row.appendChild(row_data2);
        row.appendChild(row_data3);
        row.appendChild(row_data4);
        tbody.appendChild(row);
    }
}

function relatorio(result) {
    if ("liquidez_balanco" in result.data) {
        get_liquidez(result.data.liquidez_balanco, result.data.liquidez_dre);
    } else if ("liquidez_variaveis" in result.data) {
        get_table(result.data.liquidez_variaveis);
    }
    
}

var raw = {
    "balanco": ["https://server.ectarepay.com.br/ectareArquivos/pdfviewer2619204387105330867.pdf", "https://server.ectarepay.com.br/ectareArquivos/pdfviewer2619204387105330867.pdf"],
    "balanco_anterior": ["https://server.ectarepay.com.br/ectareArquivos/pdfviewer2619204387105330867.pdf"],
    "dre": ["https://server.ectarepay.com.br/ectareArquivos/DRE.pdf"],
    "dre_anterior": ["https://server.ectarepay.com.br/ectareArquivos/DRE.pdf"],
    "boavista": ["https://server.ectarepay.com.br/ectareArquivos/bomdia.json","https://server.ectarepay.com.br/ectareArquivos/RenataOliveira.json"]
};

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
                let success = result.success
                relatorio(result)
            })
    } catch (error) {
        console.log('error', error);
        document.querySelector("#saida").innerHTML = error;
    }
}

get_data();

