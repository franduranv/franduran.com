document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const botonTema = document.getElementById('cambiar-tema');
    const botonIdioma = document.getElementById('cambiar-idioma');
    const logo = document.querySelector('header img');
    const logoSource = document.querySelector('header picture source');
    const corazon = document.querySelector('footer p:nth-child(2)');

    // Detect WebP support
    const supportsWebp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;

    // Preload images for theme switching
    const logoLight = new Image();
    const logoDark = new Image();
    logoLight.src = supportsWebp ? 'assets/FD_Logotipo.webp' : 'assets/FD_Logotipo.png';
    logoDark.src = supportsWebp ? 'assets/FD_Logotipo_White.webp' : 'assets/FD_Logotipo_White.png';

    // ==================
    // Translations (i18n)
    // ==================
    const translations = {
        en: {
            about_title: 'About',
            bio_p1: 'Fran Durán is an architect, technologist, and entrepreneur with a former education in architecture and business from Tec de Monterrey, complemented by international studies in Germany, China, and the USA. His commitment to continuous learning and technological innovation is evident in his pursuit of tech education.',
            bio_p2: 'Previously he revolutionized ICON University into a premier educational institution in Mexico and leads the SingularityU León Chapter, advocating for exponential thinking and innovation to promote innovative and exponential thinking.',
            bio_p3: 'Recently he launched ZXY Ventures, a venture studio and capital firm aimed to support the growth of startups in Mexico and Latin America. His past roles as an entrepreneur, CEO, board member, speaker, and writer has markedly influenced entrepreneurial success, technology advancement, and the support of a new generation of entrepreneurs in developing sustainable, impactful solutions.',
            companies_title: 'Companies',
            contact_title: 'Contact',
            connect_text: 'Want to connect?',
            footer_inquiries: 'For inquiries: <a href="mailto:hey@franduran.com">hey@franduran.com</a>',
            footer_rights: 'All rights reserved ©2026',
            theme_dark: 'Dark Mode',
            theme_light: 'Light Mode',
            lang_button: 'ES',
            lang_label: 'Switch to Spanish'
        },
        es: {
            about_title: 'Acerca de',
            bio_p1: 'Fran Durán es arquitecto, tecnólogo y emprendedor con formación en arquitectura y negocios del Tec de Monterrey, complementada con estudios internacionales en Alemania, China y Estados Unidos. Su compromiso con el aprendizaje continuo y la innovación tecnológica es evidente en su búsqueda de educación tecnológica.',
            bio_p2: 'Anteriormente revolucionó ICON University convirtiéndola en una institución educativa líder en México y lidera el SingularityU León Chapter, promoviendo el pensamiento exponencial y la innovación.',
            bio_p3: 'Recientemente lanzó ZXY Ventures, un venture studio y firma de capital enfocada en apoyar el crecimiento de startups en México y América Latina. Sus roles como emprendedor, CEO, miembro de consejos, conferencista y escritor han influido notablemente en el éxito emprendedor, el avance tecnológico y el apoyo a una nueva generación de emprendedores en el desarrollo de soluciones sostenibles e impactantes.',
            companies_title: 'Empresas',
            contact_title: 'Contacto',
            connect_text: '¿Quieres conectar?',
            footer_inquiries: 'Para consultas: <a href="mailto:hey@franduran.com">hey@franduran.com</a>',
            footer_rights: 'Todos los derechos reservados ©2026',
            theme_dark: 'Modo Oscuro',
            theme_light: 'Modo Claro',
            lang_button: 'EN',
            lang_label: 'Cambiar a inglés'
        }
    };

    let currentLang = 'en';

    const cambiarIdioma = (lang) => {
        currentLang = lang;
        const t = translations[lang];

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                if (key === 'footer_inquiries') {
                    el.innerHTML = t[key];
                } else {
                    el.textContent = t[key];
                }
            }
        });

        // Update theme button text
        const estaOscuro = document.body.classList.contains('tema-oscuro');
        botonTema.textContent = estaOscuro ? t.theme_light : t.theme_dark;

        // Update language button
        botonIdioma.textContent = t.lang_button;
        botonIdioma.setAttribute('aria-label', t.lang_label);

        // Update handcrafted line with heart
        const heartText = lang === 'es' ? 'Hecho con' : 'Handcrafted with';
        corazon.textContent = `${heartText} ${estaOscuro ? '🤍' : '🖤'} by franduran`;

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Save preference
        localStorage.setItem('lang', lang);
    };

    // ==================
    // Theme switching
    // ==================
    const cambiarTema = (oscuro) => {
        document.body.classList.toggle('tema-oscuro', oscuro);
        const t = translations[currentLang];
        botonTema.textContent = oscuro ? t.theme_light : t.theme_dark;
        botonTema.setAttribute('aria-label', oscuro ? 'Switch to light mode' : 'Switch to dark mode');
        logo.src = oscuro ? logoDark.src : logoLight.src;
        if (logoSource) {
            logoSource.srcset = oscuro ? 'assets/FD_Logotipo_White.webp' : 'assets/FD_Logotipo.webp';
        }
        const heartText = currentLang === 'es' ? 'Hecho con' : 'Handcrafted with';
        corazon.textContent = `${heartText} ${oscuro ? '🤍' : '🖤'} by franduran`;

        // Save preference
        localStorage.setItem('theme', oscuro ? 'dark' : 'light');
    };

    // ==================
    // Initialize
    // ==================

    // Load saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    cambiarTema(shouldUseDark);

    // Load saved language or detect from browser
    const savedLang = localStorage.getItem('lang');
    const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
    const initialLang = savedLang || browserLang;
    cambiarIdioma(initialLang);

    // ==================
    // Event listeners
    // ==================
    botonTema.addEventListener('click', () => {
        const estaOscuro = document.body.classList.contains('tema-oscuro');
        cambiarTema(!estaOscuro);
    });

    botonIdioma.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'es' : 'en';
        cambiarIdioma(newLang);
    });
});
