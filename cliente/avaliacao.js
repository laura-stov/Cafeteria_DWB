
const btnSalvar = document.getElementById("enviar");

btnSalvar.addEventListener("click", (evento) =>{
    evento.preventDefault();

    const nomeClienteLogado = clienteLogado.nome;
    const emailClienteLogado = clienteLogado.email;

    const textarea = document.getElementById("texto");

    const nome_avaliacao = document.createElement("p");
    const email_avaliacao = document.createElement("p");
    const textarea_avaliacao = document.createElement("p");

    const estrelas_avaliacao = document.createElement("div");

    const data = document.createElement("p");
    
    const LStextarea = document.getElementById("texto").value; 
    
    let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];

    const novaAvaliacao = {
        nome: nomeClienteLogado,
        email: emailClienteLogado,
        conteudo: LStextarea,
        estrelas: qtd_estrela,
        data: `${new Date().toLocaleDateString("pt-BR", {weekday: "long"})} ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString("pt-BR", { hour: "numeric", minute: "numeric"})}`
    };

    avaliacoes.push(novaAvaliacao);
    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));


    localStorage.setItem("nome", nomeClienteLogado);
    localStorage.setItem("email", emailClienteLogado);
    localStorage.setItem("textarea", LStextarea);
    localStorage.setItem("estrelas", qtd_estrela);

    textarea.value = "";
    qtd_estrela=0;
    VerificarEstrelas(qtd_estrela);

    mostrarAvaliacoes();
});


clickEstrelas();

