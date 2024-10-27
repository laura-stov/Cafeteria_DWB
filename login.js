// -- Admin --
const btnAdmin = document.getElementById('btnAdmin');
const btnFecharAdm = document.getElementById('btnFecharAdm');

btnAdmin.onclick = function(){
    loginAdmin.showModal();
}

btnFecharAdm.onclick = function(){
    loginAdmin.close();
}

// Login
const loginAdmin = document.getElementById('loginAdmin');
const formAdmin = document.querySelector('#loginAdmin form');

// Criando admins para teste
let dadosAdmins = [
    { nome: "root", email: "root@email.com", senha: "root" },
    { nome: "admin", email: "admin@email.com", senha: "admin"},
    { nome: "joao", email: "joao@email.com", senha: "123"}
];

formAdmin.addEventListener('submit', (evento) => {
    evento.preventDefault();

    // Remover mensagem de erro se houver
    let msgErro = document.querySelector('.erro');
    if(msgErro){
        msgErro.remove();
    }

    // Verificar se o admin existe
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let adminEncontrado = false;

    dadosAdmins.forEach(item =>{
        if(email === item.email && senha === item.senha){
            sessionStorage.setItem('adminLogado', 'true');
            sessionStorage.setItem('nomeAdmin', item.nome);
            adminEncontrado = true;

            window.location.href="./admin/index.html";
        }
    });
    
    if (!adminEncontrado) {
        const erro = document.createElement('p');
        erro.classList.add('erro');
        erro.innerText = 'Login ou senha inválidos'; 
        formAdmin.prepend(erro); 
        formAdmin.reset();
    }
});

// -- Cliente --
// Cadastro

const btnCadastrarClt = document.getElementById('cadastrar');
const cadastrarClt = document.getElementById('cadastrarCliente');
const formCadastro = document.getElementById('formCadastro');

let dadosClientes = [
    { nome: "jhully", email: "jhully@email.com", senha: "jhully" },
    { nome: "laura", email: "laura@email.com", senha: "laura"},
    { nome: "pedro", email: "pedro@email.com", senha: "pedro"}
];

// Verificar se já existe algo no localStorage ao carregar a página
if (!localStorage.getItem('dadosClientes')) {
    // Se não houver dados no localStorage, adicionar os clientes iniciais
    localStorage.setItem('dadosClientes', JSON.stringify(dadosClientes));
} 
// Se houver dados no localStorage, carregar esses dados no array dadosClientes
else {
    // Se houver dados no localStorage, carregar esses dados no array dadosClientes
    dadosClientes = JSON.parse(localStorage.getItem('dadosClientes'));
}

btnCadastrarClt.onclick = function(){
    loginCliente.close();
    cadastrarClt.showModal();
}

formCadastro.addEventListener('submit', function(evento){
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

const btnCliente = document.getElementById('btnCliente');
const btnFecharClt = document.getElementById('btnFecharClt');

btnCliente.onclick = function(){
    loginCliente.showModal();
}

btnFecharClt.onclick = function(){
    loginCliente.close();
}

const loginCliente = document.getElementById('loginCliente');
const formCliente = document.querySelector('#loginCliente form');

formCliente.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let msgErro = document.querySelector('.erro');
    if(msgErro){
        msgErro.remove();
    }

    let email = document.getElementById('emailCliente').value;
    let senha = document.getElementById('senhaCliente').value;
    let clienteEncontrado = false;

    // Carregar dados do localStorage
    const clientesSalvos = JSON.parse(localStorage.getItem('dadosClientes')) || [];

    // Verifica se o email e senha coincidem com algum cliente
    clientesSalvos.forEach(item =>{
        if(email === item.email && senha === item.senha){
            sessionStorage.setItem('clienteLogado', 'true');
            sessionStorage.setItem('nomeCliente', item.nome);
            clienteEncontrado = true;

            window.location.href="./cliente/index.html";
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