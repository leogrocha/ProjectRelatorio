import requestOptions from "../model/requestOptions.js";
import Irpf from "../model/irpf.js";

const BASE_URL = "http://analisededados.ectare.com.br/relatorio";

function get_data() {
    try {
        fetch(BASE_URL, requestOptions)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                relatorio(result)
                console.log(result.data.irpf);
            })
    } catch (error) {
        console.log('error', error);
    }
}

get_data();

function get_dados_pessoa(irpf) {
    const class_irpf = new Irpf(irpf);

    const nome = document.getElementById('nome');
    nome.innerHTML = class_irpf.dados_pessoais.nome;
    const cpf = document.getElementById('cpf');
    cpf.innerHTML = class_irpf.dados_pessoais.cpf;
    const exercicio = document.getElementById('exercicio');
    exercicio.innerHTML = class_irpf.exercicio;
    const endereco = document.getElementById('endereco');
    endereco.innerHTML = `${class_irpf.dados_endereco.endereco}, 
    ${class_irpf.dados_endereco.numero} - ${class_irpf.dados_endereco.bairro} - 
     ${class_irpf.dados_endereco.municipio}/${class_irpf.dados_endereco.uf}
     - ${class_irpf.dados_endereco.cep}`;
}

function get_resumo_irpf(irpf){
    const class_irpf = new Irpf(irpf);
    const indices_situacao = ['agronegocio'];

    for (let i = 0; i < indices_situacao.length; i++) {
        const situacao = class_irpf.apuracao.situacao;
        if (situacao === "pessimo") {
            document.querySelector("#" + indices_situacao[i] + "_icons").innerHTML += `
                <div class="fa-4x" id="icon">
                    <i style="color: red" class="fa-regular fa-face-dizzy"></i>
                </div>
            `
        } else if (situacao === "ruim") {
            document.querySelector("#" + indices_situacao[i] + "_icons").innerHTML += `
                <div class="fa-4x" id="icon">
                <i style="color: orange" class="fa-regular fa-face-frown"></i>
                </div>
            `
        } else if (situacao === "atencao") {
            document.querySelector("#" + indices_situacao[i] + "_icons").innerHTML += `
                <div class="fa-4x" id="icon">
                <i style="color: darkorange;" class="fa-regular fa-face-meh"></i>
                </div>
            `
        } else if (situacao === "bom") {
            document.querySelector("#" + indices_situacao[i] + "_icons").innerHTML += `
                <div class="fa-4x" id="icon">
                <i style="color: green;" class="fa-regular fa-face-smile"></i>
                </div>
            `
        } else if (situacao === "otimo") {
            document.querySelector("#" + indices_situacao[i] + "_icons").innerHTML += `
                <div class="fa-4x" id="icon">
                <i style="color: darkcyan;" class="fa-regular fa-face-laugh-beam"></i>
                </div>
            `
        }
    }
}

function get_table_rendimentos(irpf) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('table_rendimentos').appendChild(table);

    const row_1 = document.createElement('tr');
    const th_rendimentos = document.createElement('th');
    th_rendimentos.innerText = `Rendimentos`;
    row_1.appendChild(th_rendimentos).colSpan = 2;
    thead.appendChild(row_1);

    const row_2 = document.createElement('tr');
    const td_tributaveis = document.createElement('td');
    td_tributaveis.innerText = 'Tributáveis';
    const td_nao_tributaveis = document.createElement('td');
    td_nao_tributaveis.innerText = 'Não Tributáveis';
    row_2.appendChild(td_tributaveis);
    row_2.appendChild(td_nao_tributaveis);
    tbody.appendChild(row_2);
}

get_table_rendimentos();

function get_table_agronegocio() {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('table_agronegocio').appendChild(table);

    const row_1 = document.createElement('tr');
    const th_agronegocio = document.createElement('th');
    th_agronegocio.innerText = 'Rendimentos';
    row_1.appendChild(th_agronegocio).colSpan = 2;
    thead.appendChild(row_1);
}

get_table_agronegocio();


function get_table_mov_rebanho() {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('table_mov_rebanho').appendChild(table);

    const row_1 = document.createElement('tr');
    const th_movRebanho = document.createElement('th');
    th_movRebanho.innerText = 'Movimentação de Rebanho';
    row_1.appendChild(th_movRebanho).colSpan = 7;
    thead.appendChild(row_1);
}

get_table_mov_rebanho();

function relatorio(result) {
    if ("irpf" in result.data) {
        get_dados_pessoa(result.data.irpf);
        get_resumo_irpf(result.data.irpf)
    }
}   