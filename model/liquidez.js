export default class Liquidez{
  constructor (liquidez_balanco, dre){
      console.log(liquidez_balanco)
      this.liquidez_indices = liquidez_balanco[0].liquidez_indices
      this.liquidez_corrente = this.liquidez_indices.indice_liquidez_corrente;
      this.liquidez_seca = this.liquidez_indices.indice_liquidez_seca;
      this.liquidez_imediata = this.liquidez_indices.indice_liquidez_imediata;
      this.liquidez_geral = this.liquidez_indices.indice_liquidez_geral;
      this.terceiros = this.liquidez_indices.participacao_capital_terceiros;
      this.patrimonio_social = this.liquidez_indices.imobilizacao_patrimonio_social;
      this.endividamento_geral = this.liquidez_indices.indice_endividamento_geral;
      this.solvencia_geral = this.liquidez_indices.indice_solvencia_geral;
      this.lucratividade = dre[0].liquidez_indices.lucratividade;
  }
};

