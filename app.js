let listaNumerosEscolhido = []; // lista de numeros escolhidos pelo sistema
let numeroLimite = 10; // variavel para armazenar o numero limite
let numeroSecreto = gerarNumeroAleatorio(); // variavel global para armazenar o numero secreto
let tentativa = 1;

exibirMensagemInicial();

// funcao para gerar um numero aleatorio entre 1 e 10
function gerarNumeroAleatorio() {
    
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); //retorna o numero secreto para a variavel global
    let quantidadeElementoNaLista = listaNumerosEscolhido.length; // quantidade de elementos na lista
    
    if (quantidadeElementoNaLista === numeroLimite) {
        listaNumerosEscolhido = [];
    }
    //verifica se o numero ja foi escolhido
    if (listaNumerosEscolhido.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        //adiciona o numero a lista de numeros escolhidos
        listaNumerosEscolhido.push(numeroEscolhido)
        return numeroEscolhido;
    }
}

// funcao para exibir um texto na tela alterando as tags no HTML (Passar a variavel vazia)
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Adivinhe o número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 0 e 10');
}

// funcao para verificar o chute do usuario
function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);  // variavel para captuar o valor do input

    // se o chute for igual ao numero secreto
    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns! Você acertou!');
        let palavraTentativa = tentativa === 1 ? 'tentativa' : 'tentativas';   // corrigindo a lógica para singular ou plural
        let mensagemTentativas = `Você acertou em ${tentativa} ${palavraTentativa}!`;   // Variavel para armazenar a mensagem de acerto e quantidade de tentativas
        exibirTextoNaTela('p', mensagemTentativas);   // Exibir a mensagem de acerto e quantidade de tentativas
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativa++;
        limparCampo();
    }
}

// funcao para limpar o campo de input
function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';   
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
