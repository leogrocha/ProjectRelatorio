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

      this.liquidez_variaveis = liquidez_balanco[0].liquidez_variaveis;
      this.ativo = this.liquidez_variaveis.ativo;
      this.ativo_circulante = this.liquidez_variaveis.ativo_circulante;
      this.ativo_nao_circulante = this.liquidez_variaveis.ativo_nao_circulante;
      this.disponibilidades = this.liquidez_variaveis.disponibilidades;
      this.estoques = this.liquidez_variaveis.estoques;
      this.imobilizado = this.liquidez_variaveis.imobilizado;
      this.obrigacoes_a_longo_prazo = this.liquidez_variaveis.obrigacoes_a_longo_prazo;
      this.passivo_circulante = this.liquidez_variaveis.passivo_circulante;
      this.passivo_nao_circulante = this.liquidez_variaveis.passivo_nao_circulante;
      this.patrimonio_liquido = this.liquidez_variaveis.patrimonio_liquido;
      this.realizavel_a_longo_prazo = this.liquidez_variaveis.realizavel_a_longo_prazo;

  }
};

