// Constantes de elementos que vamos interagir
const campoCep = document.getElementById('cep');
const btnBuscar = document.getElementById('btnBuscar');
const divMensagem = document.getElementById('mensagem');
const divResultado = document.getElementById('resultado');

// Constantes dos resultados da busca
const spanLogradouro = document.getElementById('logradouro');
const spanBairro = document.getElementById('bairro');
const spanCidade = document.getElementById('cidade');
const spanUf = document.getElementById('uf');
const spanDdd = document.getElementById('ddd');

btnBuscar.addEventListener('click', buscarCep)

campoCep.addEventListener('keypress', (tecla) => {
    if (tecla.key === 'Enter') buscarCep()
});

// Função principal para buscar CEP
// Assímcrona porque aguarda a API

async function buscarCep() {
    const valorInput = campoCep.value.trim().replace(/\D/g, '');

    esconderElemento(divMensagem);
    esconderElemento(divResultado);

    // Validações do CEP
    if (valorInput.length !== 8) {
        mostrarMensagem('Por favor, digite um CEP válido com 8 números.', 'erro');
        return
    }


    mostrarMensagem('Buscando endereço...', 'info');

    try{

        //Montando a URL para requisição
        const url = `https://viacep.com.br/ws/${valorInput}/json/`;

        const resposta = await fetch(url);
        const dados = await resposta.json();

        if(dados.erro){
            mostrarMensagem('CEP não encontrado na base de dados', 'erro');
            return;
        }

        // Manipulando os campos de resultados 
        spanLogradouro.textContent = dados.logradouro || 'Não Informado';
        spanBairro.textContent = dados.bairro || 'Não Informado';
        spanCidade.textContent = dados.localidade || 'Não Informado';
        spanUf.textContent = dados.uf || 'Não Informado';
        spanDdd.textContent = dados.ddd || 'N/A';

        esconderElemento(divMensagem);
        divResultado.classList.remove('oculto');

    } catch(erro){
        console.error('Erro na requisição: ', erro);
        mostrarMensagem('Erro de conexão ao buscar CEP. Tente novamente mais tarde.', 'erro');
    }


// Funções Auxiliares
function mostrarMensagem(texto, tipo) {
    divMensagem.textContent = texto;
    divMensagem.className = `mensagem ${tipo}`;
}

function esconderElemento(elemento) {
    elemento.classList.add('oculto');
}

}