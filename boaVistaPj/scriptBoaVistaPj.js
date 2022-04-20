var medidor = document.querySelector(".container-medidor");

const ponteiro = 500;
const setUrl = `https://server.sistemaagely.com.br/GraficoPonteiro?valor=${ponteiro}&maximo=1000`;
medidor.innerHTML += `
                <img src="${setUrl}" alt="Medidor" style="width: 300px; heigth: 300px">
        `