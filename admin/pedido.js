// Recuperando os dados do Local Storage
let dadosPedido = JSON.parse(localStorage.getItem('dadosPedido')) || [];

let nomeProduto = document.getElementById('nomeProduto');
let quantidade = document.getElementById('quantidade');

// Recuperado QueryParam
const chavePedido = new URLSearchParams(window.location.search).get('chavePedido');

// Preenchendo o formulário em caso de alteração
if (chavePedido) {
    nomeProduto.value = dadosPedido[chavePedido].nomeProduto;
    quantidade.value = dadosPedido[chavePedido].quantidade;
    document.querySelector('#formPedido button[type="submit"]').innerText = "Alterar";
}

// Reset da página e QueryParam
document.getElementById('formPedido').addEventListener('reset', function (e) {
    e.preventDefault();
    window.location.href = "./index.html";
});

// Fazer pedido 
document.getElementById('formPedido').addEventListener('submit', function (e) {
    e.preventDefault();
    const chavePedido = new URLSearchParams(window.location.search).get('chavePedido');

    // Remover mensagens de erro anteriores
    removerMensagensErro();

    let validado = true;

    // Validação de nome
    if (!nomeProduto.value) {
        exibirErro('nomeProduto', 'Nome é obrigatório');
        validado = false;
    }

    // Validação de quantidade
    if (!quantidade.value || isNaN(quantidade.value)) {
        exibirErro('quantidade', 'Quantidade inválida');
        validado = false;
    }

    // Verificando se passou nas validações
    if (!validado) {
        return;
    }

    // Criando produto
    const produto = {
        nomeProduto: nomeProduto.value,
        quantidade: quantidade.value,
    };

    // Caso não exista a chave o produto é adicionado, se não ele é alterado
    (!chavePedido) ? dadosPedido.push(produto) : dadosPedido[chavePedido] = produto;

    // Atualizando o LocalStorage
    localStorage.setItem('dadosPedido', JSON.stringify(dadosPedido));

    window.location.href = "./index.html";
});

// Função para exibir mensagem de erro abaixo do campo
function exibirErro(campoId, mensagem) {
    const campo = document.getElementById(campoId);
    const erro = document.createElement('p');
    erro.classList.add('erro');
    erro.innerText = mensagem;
    campo.after(erro);
}

// Função para remover mensagens de erro existentes
function removerMensagensErro() {
    const erros = document.querySelectorAll('.erro');
    erros.forEach(erro => erro.remove());
}

// Exibir tabela
function atualizarPedido() {
    const tabela = document.querySelector('#tabelaPedido tbody');

    // Limpar a tabela antes de adicionar novos dados
    tabela.innerHTML = '';

    // Verificando se há dados
    if (dadosPedido.length === 0) {
        return; 
    }
    
    // Exibindo dados na tabela
    dadosPedido.forEach((produto, index) => {
        // Formatação de Número
        let qtdeFormatada = Number(produto.quantidade).toLocaleString('pt-br');

        const dataAtual = new Date();
        const dataFormatada = dataAtual.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.nomeProduto}</td>
            <td>${qtdeFormatada}</td>
            <td>${dataFormatada}</td>
            <td>
                <a href="?chavePedido=${index}">Editar</a>
                <a href="#" onclick="removerProduto(${index})">Excluir</a>
            </td>
        `;
        tabela.appendChild(linha);
    });
}

// Remover produto
function removerProduto(index) {
    dadosPedido.splice(index, 1);
    localStorage.setItem('dadosPedido', JSON.stringify(dadosPedido));
    window.location.reload();
}

window.onload = function() {
    atualizarPedido();
    atualizarSugestao();
};