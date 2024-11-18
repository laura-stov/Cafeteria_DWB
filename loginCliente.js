const btnCadastrarClt = document.getElementById('cadastrar');
const cadastrarClt = document.getElementById('cadastrarCliente');
const formCadastro = document.getElementById('formCadastro');
const btnFecharCad = document.getElementById('btnFecharCad');
const btnCliente = document.getElementById('btnCliente');
const btnFecharClt = document.getElementById('btnFecharClt');
const loginCliente = document.getElementById('loginCliente');
const formCliente = document.querySelector('#loginCliente form');

let dadosClientes = [
    { nome: "jhully", email: "jhully@email.com", senha: "jhully" },
    { nome: "laura", email: "laura@email.com", senha: "laura" },
    { nome: "pedro", email: "pedro@email.com", senha: "pedro" }
];

if (!localStorage.getItem('dadosClientes')) {
    localStorage.setItem('dadosClientes', JSON.stringify(dadosClientes)); 
} else {
    dadosClientes = JSON.parse(localStorage.getItem('dadosClientes')); 
}

btnCadastrarClt.onclick = function () {
    loginCliente.close();
    cadastrarClt.showModal();
};

btnFecharCad.onclick = function () {
    cadastrarClt.close();
};

formCadastro.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nomeCad = document.getElementById('nomeCad').value;
    const emailCad = document.getElementById('emailCad').value;
    const senhaCad = document.getElementById('senhaCad').value;

    dadosClientes.push({ nome: nomeCad, email: emailCad, senha: senhaCad });

    localStorage.setItem('dadosClientes', JSON.stringify(dadosClientes));

    alert('Usuário Cadastrado');
    formCadastro.reset();
    cadastrarClt.close();
});

btnCliente.onclick = function () {
    loginCliente.showModal();
};

btnFecharClt.onclick = function () {
    loginCliente.close();
};

formCliente.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let msgErro = document.querySelector('.erro');
    if (msgErro) {
        msgErro.remove();
    }

    let email = document.getElementById('emailCliente').value;
    let senha = document.getElementById('senhaCliente').value;
    let clienteEncontrado = false;

    const clientesSalvos = JSON.parse(localStorage.getItem('dadosClientes')) || [];

    clientesSalvos.forEach(item => {
        if (email === item.email && senha === item.senha) {
            sessionStorage.setItem('clienteLogado', 'true');
            sessionStorage.setItem('nomeCliente', item.nome);
            clienteEncontrado = true;

            const clienteLogado = { nome: item.nome, email: item.email, senha: item.senha };
            localStorage.setItem('clienteLogado', JSON.stringify(clienteLogado));

            window.location.href = "./cliente/index.html"; 
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