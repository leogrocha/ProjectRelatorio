import Irpf from "../model/irpf.js";

const raw = {
    "irpf": ["https://server.ectarepay.com.br/ectareArquivos/IR%202020%20Magno.pdf"],
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
                console.log(result.data.irpf);
            })
    } catch (error) {
        console.log('error', error);
    }
}

get_data();

function formatLocale(value) {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

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
    const class_irpf = new Irpf(irpf);
    

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
    td_tributaveis.innerText = `Tributáveis - ${formatLocale(class_irpf.rendimentos_tributaveis.total)}`;
    const td_nao_tributaveis = document.createElement('td');
    td_nao_tributaveis.innerText = `Não Tributáveis - ${formatLocale(class_irpf.rendimentos_nao_tributaveis.total)}`;
    row_2.appendChild(td_tributaveis);
    row_2.appendChild(td_nao_tributaveis);
    tbody.appendChild(row_2);
}

function get_table_agronegocio(irpf) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const class_irpf = new Irpf(irpf);

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('table_agronegocio').appendChild(table);

    const row_1 = document.createElement('tr');
    const th_agronegocio = document.createElement('th');
    th_agronegocio.innerText = 'Agronegócio';
    row_1.appendChild(th_agronegocio).colSpan = 2;
    thead.appendChild(row_1);

    const row_2 = document.createElement('tr');
    const td_receita_bruta = document.createElement('td');
    td_receita_bruta.innerText = `Receita Bruta - ${formatLocale(class_irpf.apuracao.receita_bruta)}`;
    const td_bens_atividade_rural = document.createElement('td');
    td_bens_atividade_rural.innerText = `Bens de Atividade Rural -`;
    const row_3 = document.createElement('tr');
    const td_despesas_custeio_investimento = document.createElement('td');
    td_despesas_custeio_investimento.innerText = `Despesas de Custeio e Investimento - ${formatLocale(class_irpf.apuracao.despesas_custeio_investimento)}`;
    const dividas_vinculadas_atividade_rural = document.createElement('td');
    dividas_vinculadas_atividade_rural.innerText = `Dívidas Vinculadas à Atividade Rural - `;
    const row_4 = document.createElement('tr');
    const td_resultado = document.createElement('td');
    td_resultado.innerText = `Resultado - ${formatLocale(class_irpf.apuracao.resultado)}`;

    row_2.appendChild(td_receita_bruta);
    row_2.appendChild(td_bens_atividade_rural);
    row_3.appendChild(td_despesas_custeio_investimento);
    row_3.appendChild(dividas_vinculadas_atividade_rural);
    row_4.appendChild(td_resultado).colSpan=2;
    tbody.appendChild(row_2);
    tbody.appendChild(row_3);
    tbody.appendChild(row_4);
}

function get_table_mov_rebanho(irpf) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const class_irpf = new Irpf(irpf);

    const indices_atividade = ['asininos', 'bovinos', 'caprinos', 'outros', 'suinos'];
    const indices_situacao = ['estoque_inicial','aquisicoes', 'nascimentos', 'consumo_perdas', 'vendas', 'estoque_final' ];

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('table_mov_rebanho').appendChild(table);

    const row_1 = document.createElement('tr');
    const th_movRebanho = document.createElement('th');
    th_movRebanho.innerText = 'Movimentação de Rebanho';
    row_1.appendChild(th_movRebanho).colSpan = 7;
    thead.appendChild(row_1);

    const row_2 = document.createElement('tr');
    const atividade = document.createElement('td');
    atividade.innerText = 'Atividade';
    const estoque_inicial = document.createElement('td');
    estoque_inicial.innerText = 'Estoque Inicial';
    const aquisicoes = document.createElement('td');
    aquisicoes.innerText = 'Aquisições';
    const nascimentos = document.createElement('td');
    nascimentos.innerText = 'Nascimentos';
    const cons_perdas = document.createElement('td');
    cons_perdas.innerText = 'Cons/Perdas';
    const vendas = document.createElement('td');
    vendas.innerText = 'Vendas';
    const estoque_final = document.createElement('td');
    estoque_final.innerText = 'Estoque Final';

    row_2.appendChild(atividade);
    row_2.appendChild(estoque_inicial);
    row_2.appendChild(aquisicoes);
    row_2.appendChild(nascimentos);
    row_2.appendChild(cons_perdas);
    row_2.appendChild(vendas);
    row_2.appendChild(estoque_final);
    tbody.appendChild(row_2);

    for (let linha = 0; linha < indices_atividade.length; linha++) {
        const row_3 = document.createElement('tr');
        const dados_atividade = document.createElement('td');
        dados_atividade.innerText = indices_atividade[linha];
        if(indices_atividade[linha] === 'asininos'){
            dados_atividade.innerText = 'Asino, esquinos e muares';
        } else if(indices_atividade[linha] === 'bovinos'){
            dados_atividade.innerText = 'Bovinos e bufalinos';
        } else if(indices_atividade[linha] === 'caprinos'){
            dados_atividade.innerText = 'Caprinos e ovinos';
        } else if(indices_atividade[linha] === 'outros'){
            dados_atividade.innerText = 'Outros';
        }

        row_3.appendChild(dados_atividade);
        tbody.appendChild(row_3);

        for(let coluna = 0; coluna < indices_situacao.length; coluna++) {
            const dados_situacao = document.createElement('td');
            dados_situacao.innerHTML = class_irpf.movimentacao_rebanho[indices_atividade[linha]][indices_situacao[coluna]];
            
            row_3.appendChild(dados_situacao);    
            tbody.appendChild(row_3);
        }

    }

    
}

function relatorio(result) {
    if ("irpf" in result.data) {
        get_dados_pessoa(result.data.irpf);
        get_resumo_irpf(result.data.irpf)
        get_table_rendimentos(result.data.irpf);
        get_table_mov_rebanho(result.data.irpf);
        get_table_agronegocio(result.data.irpf);
    }
}   