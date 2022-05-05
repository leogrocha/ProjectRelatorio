export default class DreAnterior {
    constructor(dre){
        for(let i = 0; i < dre.length; i++){
            this.liquidez_variaveis = dre[i].liquidez_variaveis;
            this.receita_bruta = this.liquidez_variaveis.receita_bruta;
            this.resultado_liquido_do_periodo_antes_do_irpj_e_da_csll_atividade_geral = this.liquidez_variaveis.resultado_liquido_do_periodo_antes_do_irpj_e_da_csll_atividade_geral;
        }
    }
}