document.addEventListener('DOMContentLoaded', () => {
    const stickyHeader = document.getElementById('sticky-header');
    const hero = document.getElementById('hero');
    const footerCraft = document.getElementById('footer-craft');

    // ── Icons ──
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

    // ── Dark mode ──
    const setThemeIcons = (dark) => {
        document.querySelectorAll('#cambiar-tema, #cambiar-tema-sticky').forEach(b => b.innerHTML = dark ? sunIcon : moonIcon);
    };

    const applyTheme = (dark) => {
        document.body.classList.toggle('tema-oscuro', dark);
        setThemeIcons(dark);
        if (footerCraft) footerCraft.innerHTML = `Handcrafted with <svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='currentColor' stroke='none' style='vertical-align:-1px;opacity:0.7'><path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/></svg> by franduran`;
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    };

    // Detect system preference, respect saved override
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme ? savedTheme === 'dark' : systemDark);

    // Also respond to system changes in real time (if no saved override)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) applyTheme(e.matches);
    });

    document.querySelectorAll('#cambiar-tema, #cambiar-tema-sticky').forEach(btn => {
        btn.addEventListener('click', () => applyTheme(!document.body.classList.contains('tema-oscuro')));
    });

    // ── Language ──
    const translations = {
        en: {
            tagline: 'Architect. Building things that outlive their creator.',
            'write me': 'write me'
        },
        es: {
            tagline: 'Arquitecto. Construyendo cosas que sobreviven a su creador.',
            'write me': 'escríbeme'
        }
    };

    const applyLang = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);

        // Update all elements with data-en / data-es
        document.querySelectorAll('[data-en]').forEach(el => {
            if (el.tagName === 'A') {
                // Don't overwrite link text that has icons
                if (!el.querySelector('i')) el.textContent = el.dataset[lang] || el.dataset.en;
            } else {
                el.textContent = el.dataset[lang] || el.dataset.en;
            }
        });

        // Update lang toggle label (shows the OTHER language, i.e. what you'd switch to)
        const label = lang === 'en' ? 'ES' : 'EN';
        document.querySelectorAll('#lang-toggle, #lang-toggle-sticky').forEach(b => b.textContent = label);
    };

    // Detect system language
    const savedLang = localStorage.getItem('lang');
    const systemLang = navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
    applyLang(savedLang || systemLang);

    document.querySelectorAll('#lang-toggle, #lang-toggle-sticky').forEach(btn => {
        btn.addEventListener('click', () => {
            const current = document.documentElement.lang;
            applyLang(current === 'en' ? 'es' : 'en');
        });
    });

    // ── Sticky header ──
    const onScroll = () => {
        if (!hero || !stickyHeader) return;
        stickyHeader.classList.toggle('visible', hero.getBoundingClientRect().bottom <= 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── Typewriter on hero tagline ──
    const taglineEl = document.getElementById('hero-tagline');
    if (taglineEl) {
        const currentLang = document.documentElement.lang;
        const text = currentLang === 'es' ? translations.es.tagline : translations.en.tagline;
        taglineEl.textContent = '';
        taglineEl.style.borderRight = '2px solid rgba(255,255,255,0.6)';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                taglineEl.textContent += text[i++];
                setTimeout(type, 28 + Math.random() * 22);
            } else {
                let b = 0;
                const blink = setInterval(() => {
                    taglineEl.style.borderRight = b % 2 === 0 ? 'none' : '2px solid rgba(255,255,255,0.6)';
                    if (++b >= 6) { clearInterval(blink); taglineEl.style.borderRight = 'none'; }
                }, 420);
            }
        };
        setTimeout(type, 500);
    }

    // ── Parallax on bio image (desktop) ──
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
