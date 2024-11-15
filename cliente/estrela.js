let qtd_estrela=0;

function VerificarEstrelas(qtd_estrela){
    for(let i=1;i<=5;i++){
        const img = document.getElementById(`img${i}`);
        if(qtd_estrela>=i){
        img.src = "../img/estrela-cheia.png" 
        }else{
        const img = document.getElementById(`img${i}`);
        img.src = "../img/estrela.png"
        }
    }
}

function clickEstrelas(){ 
    for(let i=1;i<=5;i++){ 
        const estrela = document.getElementById(`${i}-estrela`); 
        estrela.addEventListener("click", () =>{
        qtd_estrela=i; 
        VerificarEstrelas(qtd_estrela);
    });
    }
}

clickEstrelas();