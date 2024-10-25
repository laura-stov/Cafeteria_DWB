let login = sessionStorage.getItem('adminLogado');

if (!login) window.location.href = "../index.html";

let usuario = sessionStorage.getItem('nomeAdmin');

document.getElementById('logout').addEventListener('click', evento =>{
    evento.preventDefault();
    sessionStorage.removeItem('adminLogado');
    sessionStorage.removeItem('nomeAdmin');
    
    window.location.href = "../index.html";
});