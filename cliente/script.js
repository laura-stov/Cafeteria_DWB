const menu = document.querySelectorAll('nav a');

menu.forEach(link => {   
    link.addEventListener('click', evento => {
        evento.preventDefault();
        const href = link.getAttribute('href');

        if (href.startsWith('#')) {
            const alvo = document.querySelector(href);

            if (alvo) {
                window.scroll({
                    top: alvo.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        } else {
            window.location.href = href;
        }
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        menu.forEach( m =>{
            m.classList.add('shrink');
        });
    } else {
        menu.forEach( m =>{
            m.classList.remove('shrink');
        });
    }
});


const dialogConta = document.getElementById('conta');
const btnConta = document.getElementById('btnConta');
const clienteLogado = JSON.parse(localStorage.getItem('clienteLogado')) || [];
let dadosClientes = JSON.parse(localStorage.getItem('dadosClientes')) || [];

const tbody = document.getElementById('tbody-info');
const emailClienteLogado = sessionStorage.getItem('clienteLogado'); 
const btnVoltar = document.getElementById('btnVoltar');
let row;
let cont = 0

btnConta.addEventListener('click', exibirInfo);

btnVoltar.onclick = function(evento){
    dialogConta.close();
}

function exibirInfo(){
    console.log(clienteLogado);
    dialogConta.showModal();
    if(cont == 0){
        row = tbody.insertRow();
        const tdNome = row.insertCell(0);
        const tdEmail = row.insertCell(1);
        const tdSenha = row.insertCell(2);
        const tdEditar = row.insertCell(3);

        tdNome.textContent = clienteLogado.nome;
        tdEmail.textContent = clienteLogado.email;
        tdSenha.textContent = clienteLogado.senha;
        
        const btnEditar = document.createElement('button');
        btnEditar.classList.add('button-edit');
        btnEditar.innerText = 'Editar';
        tdEditar.appendChild(btnEditar);

        btnEditar.onclick = () => editarInfo(clienteLogado);
    }
    cont++;
}

function editarInfo(clienteLogado){
    tbody.removeChild(row);
    row = tbody.insertRow();
    const tdNome = row.insertCell(0);
    const tdEmail = row.insertCell(1);
    const tdSenha = row.insertCell(2);
    const tdEnviar = row.insertCell(3);

    const inputNome = document.createElement('input');
    inputNome.type = 'text';
    inputNome.value = clienteLogado.nome;
    tdNome.appendChild(inputNome);

    const inputEmail = document.createElement('input');
    inputEmail.type = 'text';
    inputEmail.value = clienteLogado.email;
    tdEmail.appendChild(inputEmail);

    const inputSenha = document.createElement('input');
    inputSenha.type = 'text';
    inputSenha.value = clienteLogado.senha;
    tdSenha.appendChild(inputSenha);

    const btnSalvar = document.createElement('button');
    btnSalvar.classList.add('button-edit');
    btnSalvar.innerText = 'Salvar';
    tdEnviar.appendChild(btnSalvar);

    btnSalvar.onclick = () => {
        const index = dadosClientes.findIndex(cliente => cliente.email === clienteLogado.email);
        
        clienteLogado.nome = inputNome.value;
        clienteLogado.email = inputEmail.value;
        clienteLogado.senha = inputSenha.value;

        if (index > -1) {
            dadosClientes[index] = clienteLogado; 
            localStorage.setItem('dadosClientes', JSON.stringify(dadosClientes));
            localStorage.setItem('clienteLogado', JSON.stringify(clienteLogado));
        }
        alert('Dados atualizados com sucesso!');
        cont--;
        tbody.removeChild(row);
        exibirInfo(clienteLogado); 
    }

}