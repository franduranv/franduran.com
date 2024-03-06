document.addEventListener('DOMContentLoaded', () => {
    const botonTema = document.getElementById('cambiar-tema');
    botonTema.addEventListener('click', () => {
        document.body.classList.toggle('tema-oscuro');
        
        // Opcional: Guardar la preferencia del tema en localStorage
        if(document.body.classList.contains('tema-oscuro')) {
            localStorage.setItem('tema', 'oscuro');
        } else {
            localStorage.setItem('tema', 'claro');
        }
    });

    // Opcional: Cargar la preferencia del tema desde localStorage
    if(localStorage.getItem('tema') === 'oscuro') {
        document.body.classList.add('tema-oscuro');
    }
});