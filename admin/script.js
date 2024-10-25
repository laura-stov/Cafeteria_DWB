// -- Pedido -- 

// Recuperando os dados do Local Storage
let dadosPedido = JSON.parse(localStorage.getItem('dadosPedido')) || [];

let nomeProduto = document.getElementById('nomeProduto');
let quantidade = document.getElementById('quantidade');

// Recuperado QueryParam
const key = new URLSearchParams(window.location.search).get('chave');

// Preenchendo o formulário em caso de alteração
if (key) {
    nomeProduto.value = dadosPedido[key].nomeProduto;
    quantidade.value = dadosPedido[key].quantidade;
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
    (!key) ? dadosPedido.push(produto) : dadosPedido[key] = produto;

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
                <a href="?chave=${index}">Editar</a>
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

// -- Sugestões -- 
let dadosSugestao = JSON.parse(localStorage.getItem('dadosSugestao')) || [];

let nomeComida = document.getElementById('nomeComida');
let preco = document.getElementById('preco');
let secao = document.getElementById('secao');

const chave = new URLSearchParams(window.location.search).get('chave');

if (chave) {
    nomeComida.value = dadosSugestao[chave].nomeComida;
    preco.value = dadosSugestao[chave].preco;
    secao.value = dadosSugestao[chave].secao;
    document.querySelector('#formSugestao button[type="submit"]').innerText = "Alterar";
}

document.getElementById('formSugestao').addEventListener('reset', function (e) {
    e.preventDefault();
    window.location.href = "./index.html";
});

document.getElementById('formSugestao').addEventListener('submit', function (e) {
    e.preventDefault();

    removerMensagensErro();

    let validado = true;

    if (!nomeComida.value) {
        exibirErro('nomeComida', 'Nome é obrigatório');
        validado = false;
    }

    if (!secao.value) {
        exibirErro('secao', 'Seção é obrigatório');
        validado = false;
    }

    let precoValidado = validarValorMonetario(preco.value);
    if (!precoValidado || isNaN(precoValidado)) {
        exibirErro('preco', 'Preço inválido');
        validado = false;
    }

    if (!validado) {
        return;
    }

    const sugestao = {
        nomeComida: nomeComida.value,
        preco: precoValidado,
        secao: secao.value
    };

    (!chave) ? dadosSugestao.push(sugestao) : dadosSugestao[chave] = sugestao;

    localStorage.setItem('dadosSugestao', JSON.stringify(dadosSugestao));

    window.location.href = "./index.html";
});

function validarValorMonetario(valor) {
    valor = valor.replaceAll("R", "").replaceAll("$", "").replaceAll(" ", "");
    if (valor.includes(",")) {
        valor = valor.replaceAll(".", "");
        valor = valor.replace(",", ".");
    }
    return Number(valor);
}

function atualizarSugestao() {
    const tabela = document.querySelector('#tabelaSugestao tbody');

    // Limpar a tabela antes de adicionar novos dados
    tabela.innerHTML = '';

    // Verificando se há dados
    if (dadosSugestao.length === 0) {
        return; 
    }

    dadosSugestao.forEach((sugestao, index) => {
        let precoFormatado = Number(sugestao.preco)
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${sugestao.nomeComida}</td>
            <td>${sugestao.secao}</td>
            <td>${precoFormatado}</td>
            <td>
                <a href="?chave=${index}">Editar</a>
                <a href="#" onclick="removerSugestao(${index})">Excluir</a>
            </td>
        `;
        tabela.appendChild(linha);
    });
}

// Remover sugestão
function removerSugestao(index) {
    dadosSugestao.splice(index, 1);
    localStorage.setItem('dadosSugestao', JSON.stringify(dadosSugestao));
    window.location.reload();
}

// Atualizar tabelas ao carregar a página
window.onload = function() {
    atualizarPedido();
    atualizarSugestao();
};