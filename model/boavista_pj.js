export default class BoaVistaPJ {
    constructor(boavista){
        this.score = boavista[0].score

        this.protestos = boavista[0].descricao.protestos;
        this.pendencias_restricoes = boavista[0].descricao.pendencias_restricoes;
        this.cheques_sustados = boavista[0].descricao.cheques_sustados;
        this.cheques_sem_fundo = boavista[0].descricao.cheques_sem_fundo;
        this.cheques_devolvidos_informados_usuario = boavista[0].descricao.cheques_devolvidos_informados_usuario;

        this.periodo = boavista[0].consultas;
        this.descricao = boavista[0].descricao;
    }
}