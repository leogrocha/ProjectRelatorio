// import requestOptions from "../model/requestOptions.js";

// const BASE_URL = "http://analisededados.ectare.com.br/relatorio";

// function get_data() {
//     try {
//         fetch(BASE_URL, requestOptions)
//             .then(res => res.json())
//             .then(result => {
//                 console.log(result)
//                 //relatorio(result)
//                 console.log(result.data.boavista);
//             })
//     } catch (error) {
//         console.log('error', error);
//     }
// }

// get_data();

function get_table_rendimentos() {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('table_rendimentos').appendChild(table);

    const row_1 = document.createElement('tr');
    const th_rendimentos = document.createElement('th');
    th_rendimentos.innerText = 'Rendimentos';
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