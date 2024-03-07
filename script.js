document.addEventListener('DOMContentLoaded', () => {
    const botonTema = document.getElementById('cambiar-tema');
    const logo = document.querySelector('header img'); // Asegúrate de que el selector coincida
    const corazon = document.querySelector('footer p'); // Asegúrate de que el selector coincida

    botonTema.addEventListener('click', () => {
        document.body.classList.toggle('tema-oscuro');
        
        // Opcional: Guardar la preferencia del tema en localStorage
        if(document.body.classList.contains('tema-oscuro')) {
            botonTema.textContent = 'Light Mode';
            logo.src = 'assets/FD_Logotipo_White.png'; // Cambia al logotipo blanco
            corazon.innerHTML = 'Handcrafted with 🤍 by franduran'; // Cambia el emoji a corazón blanco
            localStorage.setItem('tema', 'oscuro');
        } else {
            botonTema.textContent = 'Dark Mode';
            logo.src = 'assets/FD_Logotipo.png'; // Cambia de vuelta al logotipo original
            corazon.innerHTML = 'Handcrafted with 🖤 by franduran'; // Cambia de vuelta al emoji de corazón negro
            localStorage.setItem('tema', 'claro');
        }
    });

    // Opcional: Cargar la preferencia del tema desde localStorage
    if(localStorage.getItem('tema') === 'oscuro') {
        document.body.classList.add('tema-oscuro');
        botonTema.textContent = 'Light Mode';
        logo.src = 'assets/FD_Logotipo_White.png'; // Asegúrate de cambiar al logo en blanco
        corazon.innerHTML = 'Handcrafted with 🤍 by franduran'; // Emoji de corazón blanco
    }
});