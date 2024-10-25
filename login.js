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
        login.remove();
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

let dadosClientes = [
    { nome: "jhully", email: "jhully@email.com", senha: "jhully" },
    { nome: "laura", email: "laura@email.com", senha: "laura"},
    { nome: "pedro", email: "pedro@email.com", senha: "pedro"}
];

formCliente.addEventListener('submitClt', (evento) => {
    evento.preventDefault();

    let msgErro = document.querySelector('.erro');
    if(msgErro){
        login.remove();
    }

    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let clienteEncontrado = false;

    dadosClientes.forEach(item =>{
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
        formAdmin.prepend(erro); 
        formAdmin.reset();
    }
});