document.addEventListener('DOMContentLoaded', () => {
    const stickyHeader = document.getElementById('sticky-header');
    const hero = document.getElementById('hero');
    const corazon = document.querySelector('footer .footer-inner span:nth-child(2)');

    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

    const setIcons = (oscuro) => {
        document.querySelectorAll('#cambiar-tema, #cambiar-tema-sticky').forEach(btn => {
            btn.innerHTML = oscuro ? sunIcon : moonIcon;
        });
    };

    const cambiarTema = (oscuro) => {
        document.body.classList.toggle('tema-oscuro', oscuro);
        setIcons(oscuro);
        if (corazon) corazon.innerHTML = `Handcrafted with ${oscuro ? '🤍' : '🖤'} by franduran`;
        localStorage.setItem('theme', oscuro ? 'dark' : 'light');
    };

    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    cambiarTema(savedTheme ? savedTheme === 'dark' : systemDark);

    document.getElementById('cambiar-tema')?.addEventListener('click', () => {
        cambiarTema(!document.body.classList.contains('tema-oscuro'));
    });
    document.getElementById('cambiar-tema-sticky')?.addEventListener('click', () => {
        cambiarTema(!document.body.classList.contains('tema-oscuro'));
    });

    // Sticky header: show after hero
    const onScroll = () => {
        if (!hero || !stickyHeader) return;
        const heroBottom = hero.getBoundingClientRect().bottom;
        stickyHeader.classList.toggle('visible', heroBottom <= 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Typewriter on hero tagline
    const tagline = document.getElementById('hero-tagline');
    if (tagline) {
        const text = tagline.textContent.trim();
        tagline.textContent = '';
        tagline.style.borderRight = '2px solid rgba(255,255,255,0.6)';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                tagline.textContent += text[i++];
                setTimeout(type, 28 + Math.random() * 22);
            } else {
                let b = 0;
                const blink = setInterval(() => {
                    tagline.style.borderRight = b % 2 === 0 ? 'none' : '2px solid rgba(255,255,255,0.6)';
                    if (++b >= 6) { clearInterval(blink); tagline.style.borderRight = 'none'; }
                }, 420);
            }
        };
        setTimeout(type, 500);
    }

    // Subtle parallax on bio image (desktop only)
    if (window.innerWidth > 768) {
        const bioImg = document.querySelector('.bio-image');
        if (bioImg) {
            document.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 8;
                const y = (e.clientY / window.innerHeight - 0.5) * 8;
                bioImg.style.transform = `translate(${x}px, ${y}px)`;
            });
        }
    }
});
