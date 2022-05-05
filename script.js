import Liquidez from './model/liquidez.js';
import LiquidezAnterior from './model/liquidez_anterior.js';
import Dre from './model/dre.js';
import DreAnterior from './model/dre_anterior.js';
import raw from './model/raw.js';
import requestOptions from './model/requestOptions.js';

const BASE_URL = "http://analisededados.ectare.com.br/relatorio";

function get_data() {
    try {
        fetch(BASE_URL, requestOptions)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                relatorio(result)
            })
    } catch (error) {
        console.log('error', error);
    }
}

get_data();

function get_liquidez(liquidez_balanco) {
    const indices = new Liquidez(liquidez_balanco);

    let indices_lst = ['liquidez_corrente', 'liquidez_geral', 'endividamento_geral', 'patrimonio_social', 'liquidez_imediata',
        'liquidez_seca', 'terceiros', 'solvencia_geral'];

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

function get_dre(dre) {
    const indices = new Dre(dre);

    document.getElementsByClassName('lucratividade_indice')[0].innerText = indices.lucratividade.indice;
    document.getElementsByClassName('lucratividade_situacao')[0].innerText = indices.lucratividade.situacao;

    document.getElementsByClassName('lucratividade_indice')[1].innerText = indices.lucratividade.indice;
    document.getElementsByClassName('lucratividade_situacao')[1].innerText = indices.lucratividade.situacao;

    const situacao = indices.lucratividade.situacao;

    if (situacao === "pessimo") {
        document.querySelector("#lucratividade_icons").innerHTML += `
            <div class="fa-4x">
                <i style="color: red" class="fa-regular fa-face-dizzy"></i>
            </div>
        `
    } else if (situacao === "ruim") {
        document.querySelector("#lucratividade_icons").innerHTML += `
            <div class="fa-4x">
            <i style="color: orange" class="fa-regular fa-face-frown"></i>
            </div>
        `
    } else if (situacao === "atencao") {
        document.querySelector("#lucratividade_icons").innerHTML += `
            <div class="fa-4x">
            <i style="color: darkorange;" class="fa-regular fa-face-meh"></i>
            </div>
        `
    } else if (situacao === "bom") {
        document.querySelector("#lucratividade_icons").innerHTML += `
            <div class="fa-4x">
            <i style="color: green;" class="fa-regular fa-face-smile"></i>
            </div>
        `
    } else if (situacao === "otimo") {
        document.querySelector("#lucratividade_icons").innerHTML += `
            <div class="fa-4x">
            <i style="color: darkcyan;" class="fa-regular fa-face-laugh-beam"></i>
            </div>
        `
    }
}

function formatLocale(value) {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function get_table(balanco_anterior, dre_anterior) {
    // Criando a tabela
    const indices = new LiquidezAnterior(balanco_anterior);
    const indices_dre = new DreAnterior(dre_anterior);
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    const indices_table = ['ativo', 'ativo_circulante', 'ativo_nao_circulante', 'disponibilidades', 'estoques', 'imobilizado',
        'obrigacoes_a_longo_prazo', 'passivo_circulante', 'passivo_nao_circulante', 'patrimonio_liquido', 'realizavel_a_longo_prazo'];
    const indices_dre_table = ['receita_bruta', 'resultado_liquido_do_periodo_antes_do_irpj_e_da_csll_atividade_geral'];

    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById('container-variaveis').appendChild(table);

    let row = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = '';

    row.appendChild(heading_1);

    let qtde_balanco_anterior = parseInt(raw.balanco_anterior.length);
    let qtde_dre_anterior = parseInt(raw.dre_anterior.length);
    let qtde_colunas = 0;

    if (qtde_balanco_anterior === qtde_dre_anterior)
        qtde_colunas = parseInt(qtde_balanco_anterior);
    else if (qtde_balanco_anterior > qtde_dre_anterior)
        qtde_colunas = parseInt(qtde_dre_anterior + (qtde_balanco_anterior - qtde_dre_anterior));
    else if (qtde_dre_anterior > qtde_balanco_anterior)
        qtde_colunas = parseInt(qtde_balanco_anterior + (qtde_dre_anterior - qtde_balanco_anterior));

    for (let i = 0; i < qtde_colunas; i++) {
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = 'Jan/Mar';
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = 'Abr/Jun';
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = 'Jul/Set';
        let heading_5 = document.createElement('th');
        heading_5.innerHTML = 'Out/Dez';
        row.appendChild(heading_2);
        row.appendChild(heading_3);
        row.appendChild(heading_4);
        row.appendChild(heading_5);
    }

    thead.appendChild(row);

    for (let linha = 0; linha < indices_table.length; linha++) {
        const row_1 = document.createElement('tr');
        let cell_1 = document.createElement('td');

        cell_1.innerHTML = indices_table[linha];
        if (indices_table[linha] === 'ativo')
            cell_1.innerHTML = 'Ativo';
        else if (indices_table[linha] === 'ativo_circulante')
            cell_1.innerHTML = 'Ativo Circulante';
        else if (indices_table[linha] === 'ativo_nao_circulante')
            cell_1.innerHTML = 'Ativo Não Circulante';
        else if (indices_table[linha] === 'disponibilidades')
            cell_1.innerHTML = 'Disponibilidades';
        else if (indices_table[linha] === 'estoques')
            cell_1.innerHTML = 'Estoques';
        else if (indices_table[linha] === 'imobilizado')
            cell_1.innerHTML = 'Imobilizado';
        else if (indices_table[linha] === 'obrigacoes_a_longo_prazo')
            cell_1.innerHTML = 'Obrigações a Longo Prazo';
        else if (indices_table[linha] === 'passivo_circulante')
            cell_1.innerHTML = 'Passivo Circulante';
        else if (indices_table[linha] === 'passivo_nao_circulante')
            cell_1.innerHTML = 'Passivo Não Circulante';
        else if (indices_table[linha] === 'patrimonio_liquido')
            cell_1.innerHTML = 'Patrimônio Líquido';
        else if (indices_table[linha] === 'realizavel_a_longo_prazo')
            cell_1.innerHTML = 'Realizavel a Longo Prazo';
        row_1.appendChild(cell_1);

        for (let coluna = 0; coluna < qtde_balanco_anterior; coluna++) {

            const cells_0 = document.createElement('td');
            const cells_1 = document.createElement('td');
            const cells_2 = document.createElement('td');
            const cells_3 = document.createElement('td');
            cells_0.innerHTML = indices.liquidez_variaveis[indices_table[linha]][0].toFixed(2).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
            cells_1.innerHTML = indices.liquidez_variaveis[indices_table[linha]][1].toFixed(2).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
            cells_2.innerHTML = indices.liquidez_variaveis[indices_table[linha]][2].toFixed(2).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
            cells_3.innerHTML = indices.liquidez_variaveis[indices_table[linha]][3].toFixed(2).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

            row_1.appendChild(cells_0);
            row_1.appendChild(cells_1);
            row_1.appendChild(cells_2);
            row_1.appendChild(cells_3);
        }
        tbody.appendChild(row_1);
    }

    for (let linha = 0; linha < indices_dre_table.length; linha++) {
        const row_2 = document.createElement('tr');
        let cell_2 = document.createElement('td');

        cell_2.innerHTML = indices_dre_table[linha];
        if (indices_dre_table[linha] === 'receita_bruta')
            cell_2.innerHTML = 'Faturamento';
        if (indices_dre_table[linha] === 'resultado_liquido_do_periodo_antes_do_irpj_e_da_csll_atividade_geral')
            cell_2.innerHTML = 'Lucro Líquido';
        row_2.appendChild(cell_2);    

        for(let coluna = 0; coluna < qtde_dre_anterior; coluna++) {
            const cells_4 = document.createElement('td');
            const cells_5 = document.createElement('td');
            const cells_6 = document.createElement('td');
            const cells_7 = document.createElement('td');
            cells_4.innerHTML = indices_dre.liquidez_variaveis[indices_dre_table[linha]][0].toFixed(2).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
            cells_5.innerHTML = indices_dre.liquidez_variaveis[indices_dre_table[linha]][1].toFixed(2).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
            cells_6.innerHTML = indices_dre.liquidez_variaveis[indices_dre_table[linha]][2].toFixed(2).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
            cells_7.innerHTML = indices_dre.liquidez_variaveis[indices_dre_table[linha]][3].toFixed(2).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

            row_2.appendChild(cells_4);
            row_2.appendChild(cells_5);
            row_2.appendChild(cells_6);
            row_2.appendChild(cells_7);
        }

        tbody.appendChild(row_2);

    }


}

function get_indicadores_performance() {
    const current_year = new Date();

    const year = document.getElementById('year');
    year.innerHTML = current_year.getFullYear();
}

get_indicadores_performance();



function relatorio(result) {
    if ("liquidez_balanco" in result.data) {
        get_liquidez(result.data.liquidez_balanco);
        get_table(result.data.balanco_anterior, result.data.dre_anterior);
    }

    if ("dre" in result.data) {
        get_dre(result.data.dre);
    }
}

