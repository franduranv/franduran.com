document.addEventListener('DOMContentLoaded', () => {
    const botonTema = document.getElementById('cambiar-tema');
    const logo = document.querySelector('header img'); 
    const corazon = document.querySelector('footer p:nth-child(2)');
    
    const logoLight = new Image();
    const logoDark = new Image();
    logoLight.src = 'assets/FD_Logotipo.png';
    logoDark.src = 'assets/FD_Logotipo_White.png';

    // SVG icons — monochromatic, uses currentColor
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

    const cambiarTema = (oscuro) => {
        document.body.classList.toggle('tema-oscuro', oscuro);
        botonTema.innerHTML = oscuro ? sunIcon : moonIcon;
        logo.src = oscuro ? logoDark.src : logoLight.src;
        corazon.innerHTML = `Handcrafted with ${oscuro ? '🤍' : '🖤'} by franduran`;
        localStorage.setItem('theme', oscuro ? 'dark' : 'light');
    };

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    cambiarTema(savedTheme ? savedTheme === 'dark' : systemPrefersDark);

    botonTema.addEventListener('click', () => {
        cambiarTema(!document.body.classList.contains('tema-oscuro'));
    });

    // Typewriter effect on hero
    const heroText = document.querySelector('#hero h1');
    if (heroText) {
        const fullText = heroText.textContent;
        heroText.textContent = '';
        heroText.style.borderRight = '2px solid currentColor';
        heroText.style.display = 'inline-block';
        
        let i = 0;
        const type = () => {
            if (i < fullText.length) {
                heroText.textContent += fullText[i++];
                setTimeout(type, i === 1 ? 400 : 38 + Math.random() * 20);
            } else {
                // Blink cursor 3 times then remove
                let blinks = 0;
                const blink = setInterval(() => {
                    heroText.style.borderRight = blinks % 2 === 0 ? 'none' : '2px solid currentColor';
                    if (++blinks >= 6) {
                        clearInterval(blink);
                        heroText.style.borderRight = 'none';
                    }
                }, 400);
            }
        };
        setTimeout(type, 600);
    }

    // Subtle parallax on bio image (desktop only)
    if (window.innerWidth > 768) {
        const bioImage = document.querySelector('.bio-image');
        if (bioImage) {
            document.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 6;
                const y = (e.clientY / window.innerHeight - 0.5) * 6;
                bioImage.style.transform = `translate(${x}px, ${y}px)`;
            });
        }
    }
});
