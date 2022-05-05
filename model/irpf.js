export default class Irpf {
    constructor(irpf){
        this.agronegocio = irpf[0].agronegocio;
        this.apuracao = this.agronegocio.apuracao;

        this.bens_dividas = irpf[0].bens_dividas;
        this.bens_direitos = this.bens_dividas.bens_direitos;
        this.dividas_onus = this.bens_dividas.dividas_onus;

        this.dados_endereco = irpf[0].dados_endereco;
        this.dados_pessoais = irpf[0].dados_pessoais;

        this.rendimentos_tributaveis = irpf[0].rendimentos_tributaveis;
        this.rendimentos_nao_tributaveis = irpf[0].rendimentos_nao_tributaveis;

        this.exercicio = irpf[0].exercicio;
    }
}