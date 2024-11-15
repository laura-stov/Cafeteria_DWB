const btnAdmin = document.getElementById('btnAdmin');
const btnFecharAdm = document.getElementById('btnFecharAdm');
const loginAdmin = document.getElementById('loginAdmin');
const formAdmin = document.querySelector('#loginAdmin form');

let dadosAdmins = [
    { nome: "root", email: "root@email.com", senha: "root" },
    { nome: "admin", email: "admin@email.com", senha: "admin" },
    { nome: "joao", email: "joao@email.com", senha: "123" }
];

btnAdmin.onclick = function () {
    loginAdmin.showModal();
};

btnFecharAdm.onclick = function () {
    loginAdmin.close();
};

formAdmin.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let msgErro = document.querySelector('.erro');
    if (msgErro) {
        msgErro.remove();
    }

    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let adminEncontrado = false;

    dadosAdmins.forEach(item => {
        if (email === item.email && senha === item.senha) {
            sessionStorage.setItem('adminLogado', 'true');
            sessionStorage.setItem('nomeAdmin', item.nome);
            adminEncontrado = true;

            window.location.href = "./admin/index.html"; 
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