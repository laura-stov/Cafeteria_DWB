
function mostrarAvaliacoes() {
    const resultadoContainer = document.getElementById("result");
    resultadoContainer.innerHTML = ""; // Limpa o conteúdo anterior

    const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];

    avaliacoes.forEach(avaliacao => {
        const div_avaliacao = document.createElement("div");
        const info_avaliacao = document.createElement("div");
        info_avaliacao.classList.add("info-avaliacao");

        // Cria os elementos de exibição para cada avaliação
        const avatar = document.createElement("img");
        avatar.src = "../img/usuario-de-perfil.png"
        avatar.classList.add("img-lado-nome");

        const nome_avaliacao = document.createElement("p");
        nome_avaliacao.innerText = `${avaliacao.nome}`;
        nome_avaliacao.classList.add("nome");

        const email_avaliacao = document.createElement("p");
        email_avaliacao.innerText = `${avaliacao.email}`;
        email_avaliacao.classList.add("email");

        const textarea_avaliacao = document.createElement("p");
        textarea_avaliacao.innerText = `${avaliacao.conteudo}`;
        textarea_avaliacao.classList.add("comentario");

        const estrelas_cont = avaliacao.estrelas

        const data_avaliacao = document.createElement("p");
        data_avaliacao.innerText = `${avaliacao.data}`;
        data_avaliacao.classList.add("horario");

        const hr = document.createElement("hr");
        hr.classList.add("hr");

        const estrelas_avaliacao = document.createElement("div");
        estrelas_avaliacao.classList.add("img-lado-nome")

        for(let i=1;i<=estrelas_cont;i++){
            const estrela = document.createElement("img");
            estrela.src = "../img/estrela-cheia.png"
            estrelas_avaliacao.appendChild(estrela);
        }

        // Adiciona cada elemento ao div da avaliação
        info_avaliacao.appendChild(avatar);
        info_avaliacao.appendChild(nome_avaliacao);
        div_avaliacao.appendChild(info_avaliacao);
        div_avaliacao.appendChild(email_avaliacao);
        div_avaliacao.appendChild(estrelas_avaliacao);
        div_avaliacao.appendChild(textarea_avaliacao);
        div_avaliacao.appendChild(data_avaliacao);
        div_avaliacao.appendChild(hr);
        // Adiciona a div da avaliação ao container de resultados
        resultadoContainer.appendChild(div_avaliacao);
    });
}

// Chama a função para exibir as avaliações ao carregar a página
mostrarAvaliacoes();