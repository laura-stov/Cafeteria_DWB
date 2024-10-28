let qtd_estrela=0;

//verifica quais estrelas ficaram cheias
function VerificarEstrelas(qtd_estrela){
    for(let i=1;i<=5;i++){
        const img = document.getElementById(`img${i}`); // img sera o id da estrela de valor (i) usando crases para poder percorrer o for
        if(qtd_estrela>=i){
        img.src = "../img/estrela-cheia.png" //se a quantidade (i) for igual ou maior doq o numero de estrelas clicadas ele muda para uma estrela cheia
        }else{
        const img = document.getElementById(`img${i}`);
        img.src = "../img/estrela.png" //se a quantidade (i) for menor, ele só deixa a estrela vazia
        }
    }
}

//verificar qual estrela foi clicada
function clickEstrelas(){ 
    for(let i=1;i<=5;i++){ 
        const estrela = document.getElementById(`${i}-estrela`); //percorre todas as estrelas vendo qual foi clicada
        estrela.addEventListener("click", () =>{
        qtd_estrela=i; //o contador(i) indica qual estrela foi clicada, e por isso sabemos a quantidade de estrelas a ser preenchidas
        VerificarEstrelas(qtd_estrela);
    });
    }
}

clickEstrelas();