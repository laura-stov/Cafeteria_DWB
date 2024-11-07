// Seleção dos botões e elementos do admin
const btnAdmin = document.getElementById('btnAdmin');
const btnFecharAdm = document.getElementById('btnFecharAdm');
const loginAdmin = document.getElementById('loginAdmin');
const formAdmin = document.querySelector('#loginAdmin form');

// Criando admins para teste
let dadosAdmins = [
    { nome: "root", email: "root@email.com", senha: "root" },
    { nome: "admin", email: "admin@email.com", senha: "admin" },
    { nome: "joao", email: "joao@email.com", senha: "123" }
];

// Abertura e fechamento do modal de login
btnAdmin.onclick = function () {
    loginAdmin.showModal();
};

btnFecharAdm.onclick = function () {
    loginAdmin.close();
};

// Validação do login admin
formAdmin.addEventListener('submit', (evento) => {
    evento.preventDefault();

    // Remover mensagem de erro se houver
    let msgErro = document.querySelector('.erro');
    if (msgErro) {
        msgErro.remove();
    }

    // Verificar se o admin existe
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let adminEncontrado = false;

    dadosAdmins.forEach(item => {
        if (email === item.email && senha === item.senha) {
            sessionStorage.setItem('adminLogado', 'true');
            sessionStorage.setItem('nomeAdmin', item.nome);
            adminEncontrado = true;

            window.location.href = "./admin/index.html"; // Redirecionar para a área do admin
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