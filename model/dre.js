export default class Dre {
    constructor(dre){
        this.liquidez_indices = dre[0].liquidez_indices;
        this.lucratividade = this.liquidez_indices.lucratividade;
    }
}