import Liquidez from '../model/liquidez.js';
import LiquidezAnterior from '../model/liquidez_anterior.js';
import Dre from '../model/dre.js';
import DreAnterior from '../model/dre_anterior.js';
import BoaVistaPJ from '../model/boavista_pj.js';
import BoaVistaPF from '../model/boavista_pf.js';

const raw = {
    "balanco": ["https://server.ectarepay.com.br/ectareArquivos/pdfviewer2619204387105330867.pdf"],
    "balanco_anterior": ["https://server.ectarepay.com.br/ectareArquivos/pdfviewer2619204387105330867.pdf"],
    "dre": ["https://server.ectarepay.com.br/ectareArquivos/DRE.pdf"],
    "dre_anterior": ["https://server.ectarepay.com.br/ectareArquivos/DRE.pdf"],
    "boavista": ["https://server.ectarepay.com.br/ectareArquivos/bomdia.json","https://server.ectarepay.com.br/ectareArquivos/RenataOliveira.json"],
	"irpf": ["https://server.ectarepay.com.br/ectareArquivos/IR%202020%20Magno.pdf"]
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

        document.getElementById(indices_lst[i] + "_indice").innerText = indices[indices_lst[i]].indice.toFixed(2);
        document.getElementById(indices_lst[i] + "_situacao").innerText = indices[indices_lst[i]].situacao;


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

function get_dre(dre) {
    const indices = new Dre(dre);

    document.getElementById('lucratividade_indice').innerText = indices.lucratividade.indice;
    document.getElementById('lucratividade_situacao').innerText = indices.lucratividade.situacao;

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

function get_boavista_pj(boavista) {
    const boavista_pj = new BoaVistaPJ(boavista);

    const score = document.getElementById('score_pj');
    score.innerText = boavista_pj.score.score;

    const texto = document.getElementById('texto_pj');
    texto.innerHTML = boavista_pj.score.texto;

    const probabilidade = document.getElementById('probabilidade_pj');
    probabilidade.innerHTML += "Probabilidade de Inadimplência " + (boavista_pj.score.probabilidade).toFixed(1) + "%";


    var medidor = document.querySelector(".container-medidor");

    const valor_score = parseInt(boavista_pj.score.score);

    const setUrl = `https://server.sistemaagely.com.br/GraficoPonteiro?valor=${valor_score}&maximo=1000`;
    medidor.innerHTML += `
                <img src="${setUrl}" alt="Medidor" style="width: 300px; heigth: 300px">
    `;

    const indices_icons = ['pendencias_restricoes', 'cheques_sem_fundo'];

    for (let i = 0; i < indices_icons.length; i++) {
        
        const index = indices_icons[i];
        const icon = document.getElementById(index);
        if (boavista_pj[index].situacao === 'ruim') {
            icon.innerHTML = `<div class="fa-4x" style="margin-top: 10px;">
                <i style="color: red;" class="fa-regular fa-thumbs-down"></i>
            </div>`;
        } else if (boavista_pj[index].situacao === 'bom') {
            icon.innerHTML = `<div class="fa-4x" style="margin-top: 10px;">
                <i style="color: green;" class="fa-regular fa-thumbs-up"></i>
            </div>`;
        }
    }

    const icon_pj = document.getElementById('protestos_pj');

    if (boavista_pj.protestos.situacao === 'ruim') {
        icon_pj.innerHTML = `<div class="fa-4x" style="margin-top: 10px;">
            <i style="color: red;" class="fa-regular fa-thumbs-down"></i>
        </div>`;
    } else if (boavista_pj.protestos.situacao === 'bom') {
        icon_pj.innerHTML = `<div class="fa-4x" style="margin-top: 10px;">
            <i style="color: green;" class="fa-regular fa-thumbs-up"></i>
        </div>`;
    }
}

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

    const indices_icons = ['debitos_lista'];

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

    const icon_pf = document.getElementById('protestos_pf');

    if(boavista_pf.protestos.situacao === 'ruim') {
        icon_pf.innerHTML = `<div class="fa-4x" style="margin-top: 10px;">
            <i style="color: red;" class="fa-regular fa-thumbs-down"></i>
        </div>`;
    } else if (boavista_pf.protestos.situacao === 'bom') {
        icon_pf.innerHTML = `<div class="fa-4x" style="margin-top: 10px;">
            <i style="color: green;" class="fa-regular fa-thumbs-up"></i>
        </div>`;
    }

}

function relatorio(result) {
    if ("liquidez_balanco" in result.data) {
        get_liquidez(result.data.liquidez_balanco);
    }

    if ("dre" in result.data) {
        get_dre(result.data.dre);
    }

    if ("boavista" in result.data) {
        get_boavista_pj(result.data.boavista);
        get_boavista_pf(result.data.boavista);
    }
}    