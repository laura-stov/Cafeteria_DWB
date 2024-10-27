// Pegando os links do menu
const menu = document.querySelectorAll('nav a');

menu.forEach(link => {   
    link.addEventListener('click', evento => {
        evento.preventDefault();
        const href = link.getAttribute('href');
        const alvo = document.querySelector(href);

        // Rolando a página até o id alvo
        if (alvo) {
            window.scroll({
                top: alvo.offsetTop -20,
                behavior: 'smooth'
            });
        }
   })
});

// Evento de Scroll
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


