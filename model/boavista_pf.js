export default class BoaVistaPF {
    constructor(boavista){
        this.score = boavista[1].score.risco_6_meses;
        this.renda_presumida = boavista[1].score.renda_presumida;

        this.descricao = boavista[1].descricao;
        this.protestos = this.descricao.protestos;
        this.debitos_lista = this.descricao.debitos_lista;
        this.consultas_anteriores_lista = this.descricao.consultas_anteriores_lista;
    }
}