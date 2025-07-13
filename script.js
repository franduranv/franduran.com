document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const botonTema = document.getElementById('cambiar-tema');
    const logo = document.querySelector('header img'); 
    const corazon = document.querySelector('footer p:nth-child(2)');
    
    // Preload images for theme switching
    const logoLight = new Image();
    const logoDark = new Image();
    logoLight.src = 'assets/FD_Logotipo.png';
    logoDark.src = 'assets/FD_Logotipo_White.png';

    // Función para cambiar el tema
    const cambiarTema = (oscuro) => {
        document.body.classList.toggle('tema-oscuro', oscuro);
        botonTema.textContent = oscuro ? 'Light Mode' : 'Dark Mode';
        logo.src = oscuro ? logoDark.src : logoLight.src;
        corazon.innerHTML = `Handcrafted with ${oscuro ? '🤍' : '🖤'} by franduran`;
        
        // Save preference
        localStorage.setItem('theme', oscuro ? 'dark' : 'light');
    };

    // Load saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    
    cambiarTema(shouldUseDark);

    // Event listeners
    botonTema.addEventListener('click', () => {
        const estaOscuro = document.body.classList.contains('tema-oscuro');
        cambiarTema(!estaOscuro);
    });
});