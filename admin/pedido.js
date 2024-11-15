let dadosPedido = JSON.parse(localStorage.getItem('dadosPedido')) || [];

let nomeProduto = document.getElementById('nomeProduto');
let quantidade = document.getElementById('quantidade');

const chavePedido = new URLSearchParams(window.location.search).get('chavePedido');

if (chavePedido) {
    nomeProduto.value = dadosPedido[chavePedido].nomeProduto;
    quantidade.value = dadosPedido[chavePedido].quantidade;
    document.querySelector('#formPedido button[type="submit"]').innerText = "Alterar";
}

document.getElementById('formPedido').addEventListener('reset', function (e) {
    e.preventDefault();
    window.location.href = "./index.html";
});

document.getElementById('formPedido').addEventListener('submit', function (e) {
    e.preventDefault();
    const chavePedido = new URLSearchParams(window.location.search).get('chavePedido');

    removerMensagensErro();

    let validado = true;

    if (!nomeProduto.value) {
        exibirErro('nomeProduto', 'Nome é obrigatório');
        validado = false;
    }

    if (!quantidade.value || isNaN(quantidade.value)) {
        exibirErro('quantidade', 'Quantidade inválida');
        validado = false;
    }

    if (!validado) {
        return;
    }

    const produto = {
        nomeProduto: nomeProduto.value,
        quantidade: quantidade.value,
    };

    (!chavePedido) ? dadosPedido.push(produto) : dadosPedido[chavePedido] = produto;

    localStorage.setItem('dadosPedido', JSON.stringify(dadosPedido));

    window.location.href = "./index.html";
});

function exibirErro(campoId, mensagem) {
    const campo = document.getElementById(campoId);
    const erro = document.createElement('p');
    erro.classList.add('erro');
    erro.innerText = mensagem;
    campo.after(erro);
}

function removerMensagensErro() {
    const erros = document.querySelectorAll('.erro');
    erros.forEach(erro => erro.remove());
}

function atualizarPedido() {
    const tabela = document.querySelector('#tabelaPedido tbody');

    tabela.innerHTML = '';

    if (dadosPedido.length === 0) {
        return; 
    }
    
    dadosPedido.forEach((produto, index) => {
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

function removerProduto(index) {
    dadosPedido.splice(index, 1);
    localStorage.setItem('dadosPedido', JSON.stringify(dadosPedido));
    window.location.reload();
}

window.onload = function() {
    atualizarPedido();
    atualizarSugestao();
};