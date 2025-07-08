document.addEventListener('DOMContentLoaded', () => {
    const botonTema = document.getElementById('cambiar-tema');
    const logo = document.querySelector('header img'); 
    const corazon = document.querySelector('footer p'); 

    // Función para cambiar el tema
    const cambiarTema = (oscuro) => {
        document.body.classList.toggle('tema-oscuro', oscuro);
        botonTema.textContent = oscuro ? 'Light Mode' : 'Dark Mode';
        logo.src = oscuro ? 'assets/FD_Logotipo_White.png' : 'assets/FD_Logotipo.png';
        corazon.innerHTML = `Handcrafted with ${oscuro ? '🤍' : '🖤'} by franduran`;
    };

    // Detectar preferencia del sistema
    const prefiereModoOscuro = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Aplicar tema inicial según sistema
    cambiarTema(prefiereModoOscuro.matches);

    // Escuchar cambios del sistema
    prefiereModoOscuro.addEventListener('change', (e) => cambiarTema(e.matches));

    // Permitir cambios manuales con el botón
    botonTema.addEventListener('click', () => {
        const estaOscuro = document.body.classList.contains('tema-oscuro');
        cambiarTema(!estaOscuro);
    });
});