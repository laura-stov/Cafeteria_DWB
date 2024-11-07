// Seleção dos botões e elementos do cliente
const btnCadastrarClt = document.getElementById('cadastrar');
const cadastrarClt = document.getElementById('cadastrarCliente');
const formCadastro = document.getElementById('formCadastro');
const btnFecharCad = document.getElementById('btnFecharCad');
const btnCliente = document.getElementById('btnCliente');
const btnFecharClt = document.getElementById('btnFecharClt');
const loginCliente = document.getElementById('loginCliente');
const formCliente = document.querySelector('#loginCliente form');

// Criando clientes para teste
let dadosClientes = [
    { nome: "jhully", email: "jhully@email.com", senha: "jhully" },
    { nome: "laura", email: "laura@email.com", senha: "laura" },
    { nome: "pedro", email: "pedro@email.com", senha: "pedro" }
];

// Verificar se já existe algo no localStorage ao carregar a página
if (!localStorage.getItem('dadosClientes')) {
    localStorage.setItem('dadosClientes', JSON.stringify(dadosClientes)); // Se não houver dados, adicionar os iniciais
} else {
    dadosClientes = JSON.parse(localStorage.getItem('dadosClientes')); // Carregar dados do localStorage
}

// Abertura e fechamento do modal de cadastro
btnCadastrarClt.onclick = function () {
    loginCliente.close();
    cadastrarClt.showModal();
};

btnFecharCad.onclick = function () {
    cadastrarClt.close();
};

// Cadastro de cliente
formCadastro.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nomeCad = document.getElementById('nomeCad').value;
    const emailCad = document.getElementById('emailCad').value;
    const senhaCad = document.getElementById('senhaCad').value;

    // Adiciona o novo cliente ao array de dadosClientes
    dadosClientes.push({ nome: nomeCad, email: emailCad, senha: senhaCad });

    // Atualiza o localStorage com todo o array dadosClientes
    localStorage.setItem('dadosClientes', JSON.stringify(dadosClientes));

    alert('Usuário Cadastrado');
    formCadastro.reset();
    cadastrarClt.close();
});

// Abertura e fechamento do modal de login
btnCliente.onclick = function () {
    loginCliente.showModal();
};

btnFecharClt.onclick = function () {
    loginCliente.close();
};

// Validação do login cliente
formCliente.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let msgErro = document.querySelector('.erro');
    if (msgErro) {
        msgErro.remove();
    }

    let email = document.getElementById('emailCliente').value;
    let senha = document.getElementById('senhaCliente').value;
    let clienteEncontrado = false;

    // Carregar dados do localStorage
    const clientesSalvos = JSON.parse(localStorage.getItem('dadosClientes')) || [];

    // Verifica se o email e senha coincidem com algum cliente
    clientesSalvos.forEach(item => {
        if (email === item.email && senha === item.senha) {
            sessionStorage.setItem('clienteLogado', 'true');
            sessionStorage.setItem('nomeCliente', item.nome);
            clienteEncontrado = true;

            // Salva o cliente logado no localStorage
            const clienteLogado = { nome: item.nome, email: item.email, senha: item.senha };
            localStorage.setItem('clienteLogado', JSON.stringify(clienteLogado));

            window.location.href = "./cliente/index.html"; // Redirecionar para a área do cliente
        }
    });

    if (!clienteEncontrado) {
        const erro = document.createElement('p');
        erro.classList.add('erro');
        erro.innerText = 'Login ou senha inválidos';
        formCliente.prepend(erro);
        formCliente.reset();
    }
});