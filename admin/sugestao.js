let dadosSugestao = JSON.parse(localStorage.getItem('dadosSugestao')) || [];

let nomeComida = document.getElementById('nomeComida');
let preco = document.getElementById('preco');
let secao = document.getElementById('secao');

const chaveSugestao = new URLSearchParams(window.location.search).get('chaveSugestao');

if (chaveSugestao) {
    nomeComida.value = dadosSugestao[chaveSugestao].nomeComida;
    preco.value = dadosSugestao[chaveSugestao].preco;
    secao.value = dadosSugestao[chaveSugestao].secao;
    document.querySelector('#formSugestao button[type="submit"]').innerText = "Alterar";
}

document.getElementById('formSugestao').addEventListener('reset', function (e) {
    e.preventDefault();
    window.location.href = "./index.html";
});

document.getElementById('formSugestao').addEventListener('submit', function (e) {
    e.preventDefault();
    const chaveSugestao = new URLSearchParams(window.location.search).get('chaveSugestao');

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

    (!chaveSugestao) ? dadosSugestao.push(sugestao) : dadosSugestao[chaveSugestao] = sugestao;

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

    tabela.innerHTML = '';

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
                <a href="?chaveSugestao=${index}">Editar</a>
                <a href="#" onclick="removerSugestao(${index})">Excluir</a>
            </td>
        `;
        tabela.appendChild(linha);
    });
}


function removerSugestao(index) {
    dadosSugestao.splice(index, 1);
    localStorage.setItem('dadosSugestao', JSON.stringify(dadosSugestao));
    window.location.reload();
}

window.onload = function() {
    atualizarPedido();
    atualizarSugestao();
};