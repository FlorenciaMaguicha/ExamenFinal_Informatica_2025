
document.getElementById("formulario-contacto").addEventListener("submit", function(event) {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let correo = document.getElementById("correo").value;
    let mensajeRespuesta = document.getElementById("mensaje-respuesta");

    if (nombre === "" || correo === "" || apellido === "") {
        event.preventDefault(); 
        mensajeRespuesta.textContent = "Por favor, completa todos los campos obligatorios.";
        mensajeRespuesta.style.color = "red";
        return;
    }

    let conocer = document.querySelector('input[name="como_la_conocio"]:checked');
    if (!conocer) {
        event.preventDefault();
        mensajeRespuesta.textContent = "Por favor, selecciona cómo conociste a Nicki Nicole.";
        mensajeRespuesta.style.color = "red";
        return; 
    }

    let saberFechas = document.querySelector('input[name="saber_acerca_fechas"]:checked');
    let saberMusica = document.querySelector('input[name="saber_acerca_musica"]:checked');
    let saberNoticias = document.querySelector('input[name="saber_acerca_noticias"]:checked');

    if (!saberFechas && !saberMusica && !saberNoticias) {
        event.preventDefault();
        mensajeRespuesta.textContent = "Por favor, selecciona qué te gustaría saber más de Nicki Nicole.";
        mensajeRespuesta.style.color = "red";
        return; 
    }
});
