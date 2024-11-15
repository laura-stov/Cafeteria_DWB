const loginAvaliacao = document.getElementById('conta');
const btnAvaliacao = document.getElementById('btnConta');
const btnFecharAvaliacao = document.getElementById('btnFecharAva');

btnAvaliacao.onclick = function(){
    loginConta.showModal();
}

btnFecharAdm.onclick = function(){
    loginAdmin.close();
}

const btnSalvar = document.getElementById("enviar");

btnSalvar.addEventListener("click", (evento) =>{
    evento.preventDefault();

    const div_avaliacao = document.getElementById("avaliacoes");

    const img_perfil = document.createElement("img");

    const nome = document.getElementById("nome-avaliacao");
    const email = document.getElementById("email-avaliacao");
    const textarea = document.getElementById("texto");

    const nome_avaliacao = document.createElement("p");
    const email_avaliacao = document.createElement("p");
    const textarea_avaliacao = document.createElement("p");

    const estrelas_avaliacao = document.createElement("div");

    const data = document.createElement("p");
    const hr = document.createElement("hr");

    const LSnome = document.getElementById("nome-avaliacao").value;
    const LSemail = document.getElementById("email-avaliacao").value;
    const LStextarea = document.getElementById("texto").value; 
    
    let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];

    const novaAvaliacao = {
        nome: LSnome,
        email: LSemail,
        conteudo: LStextarea,
        estrelas: qtd_estrela,
        data: `${new Date().toLocaleDateString("pt-BR", {weekday: "long"})} ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString("pt-BR", { hour: "numeric", minute: "numeric"})}`
    };

    avaliacoes.push(novaAvaliacao);
    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));


    localStorage.setItem("nome", LSnome);
    localStorage.setItem("email", LSemail);
    localStorage.setItem("textarea", LStextarea);
    localStorage.setItem("estrelas", qtd_estrela);

    if((nome.value === "") || (email.value === "")){
        nome.value = "";
        email.value = "";
        textarea.value = "";
        qtd_estrela=0;
        VerificarEstrelas(qtd_estrela);
        return;
    }

    data.innerText = `${new Date().toLocaleDateString("pt-BR", {weekday: "long"})} ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString("pt-BR", { hour: "numeric", minute: "numeric"})}`;
    nome_avaliacao.innerText = nome.value;
    email_avaliacao.innerText = email.value;
    textarea_avaliacao.innerText = textarea.value;
    
    for(let i=1;i<=qtd_estrela;i++){
        const estrela = document.createElement("img");
        estrela.src = "../img/estrela-cheia.png"
        estrelas_avaliacao.appendChild(estrela);
    }

    nome.value = "";
    email.value = "";
    textarea.value = "";
    qtd_estrela=0;
    VerificarEstrelas(qtd_estrela);
});

clickEstrelas();