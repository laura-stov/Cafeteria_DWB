const menu = document.querySelectorAll('nav a');

menu.forEach(link => {   
    link.addEventListener('click', evento => {
        evento.preventDefault();
        const href = link.getAttribute('href');
        const alvo = document.querySelector(href);

        if (alvo) {
            window.scroll({
                top: alvo.offsetTop -20,
                behavior: 'smooth'
            });
        }
   })
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