
document.addEventListener("DOMContentLoaded", () => {
    Swal.fire({
        title: "🎶 ¡Bienvenido al juego de la memoria! 🎶",
        html: `
            <p><b>🔹 Objetivo:</b> Emparejar todas las cartas con nombres de canciones de Nicki.</p>
            <p><b>🔹 Cómo jugar:</b><br>
            - Haz clic en dos cartas para descubrir si coinciden.<br>
            - Si son iguales, permanecen visibles.<br>
            - Si no, se voltean de nuevo.</p>
            <p><b>🔹 Reglas:</b><br>
            - Tienes <b>10 intentos</b> para ganar.<br>
            - Si emparejas todas, ganas. 🎉<br>
            - Si te quedas sin intentos, perdés. 😣</p>
            <p>✨ ¡Buena suerte! ✨</p>
        `,
        confirmButtonText: "¡Jugar!",
        confirmButtonColor: "#4a1779"
    });

    const tablero = document.getElementById("juego-memoria");
    const intentosTexto = document.getElementById("intentos");
    const cartasEmparejadasTexto = document.getElementById("cartas-emparejadas");

    const nombresCanciones = [ "Colocao", "8 AM", "Sheite", "Forty", "Frío", "Baby", "Diva", "Alh"];

    let cartas = [...nombresCanciones, ...nombresCanciones];
    cartas = cartas.sort(() => Math.random() - 0.5);

    let cartaVolteada = null;
    let intentosRestantes = 10;
    let cartasEmparejadas = 0;
    let juegoTerminado = false;

    intentosTexto.textContent = `Intentos restantes: ${intentosRestantes}`;
    cartasEmparejadasTexto.textContent = `Cartas emparejadas: ${cartasEmparejadas}`;


    const sonidoCorrecto= new Audio('../../audio/resultado/correcto.mp3');
    const sonidoIncorrecto = new Audio('../../audio/resultado/incorrecto.mp3');

    const cancionGanar = new Audio('../../audio/resultado/ganar.mp3');
    const cancionPerder = new Audio('../../audio/resultado/perder.mp3');

    cartas.forEach(function (nombre) {
        const carta = document.createElement("div");
        carta.classList.add("carta-memoria");
        carta.dataset.nombre = nombre;
        carta.textContent = "?";
        carta.addEventListener("click", voltearCarta);
        tablero.appendChild(carta);
    });

    const botonReiniciar = document.querySelector(".btn-jugar-again-ganar, .btn-jugar-again-perder");
    if (botonReiniciar) {
        botonReiniciar.remove();
    }
    
    function voltearCarta() {
        if (juegoTerminado || this.textContent !== "?" || cartaVolteada === this) return;

        this.textContent = this.dataset.nombre;

        if (cartaVolteada === null) {
            cartaVolteada = this;
        } else {
            const primeraCarta = cartaVolteada;
            const segundaCarta = this;

            if (primeraCarta.dataset.nombre === segundaCarta.dataset.nombre) {
                primeraCarta.classList.add("acertada");
                segundaCarta.classList.add("acertada");

                sonidoCorrecto.play();

                cartaVolteada = null;
                cartasEmparejadas++;
                cartasEmparejadasTexto.textContent = `Cartas emparejadas: ${cartasEmparejadas}`;

                if (cartasEmparejadas === nombresCanciones.length) {
                    juegoGanaste();
                }
            } else {
                intentosRestantes--;
                intentosTexto.textContent = `Intentos restantes: ${intentosRestantes}`;

                sonidoIncorrecto.play();

                if (intentosRestantes === 0) {
                    finDelJuego();
                }

                setTimeout(() => {
                    primeraCarta.textContent = "?";
                    segundaCarta.textContent = "?";
                    cartaVolteada = null;
                }, 500);
            }
        }
    }
    

    function juegoGanaste() {
        juegoTerminado = true;

        cancionGanar.play();

        alert("¡Muy bien, GANASTE! \nEncontraste todas las cartas.");
        
        const cartasElementos = document.querySelectorAll(".carta-memoria");
        cartasElementos.forEach(function (carta) {
            carta.removeEventListener("click", voltearCarta);
        });

        if (!document.querySelector(".btn-jugar-again")) {
            const botonReiniciar = document.createElement("button");
            botonReiniciar.textContent = "Bien jugado! Clickea para jugar de nuevo.";
            botonReiniciar.classList.add("btn-jugar-again-ganar");
            document.body.appendChild(botonReiniciar);

            botonReiniciar.addEventListener("click", reiniciarJuego);
    }
}

function juegoGanaste() {
    juegoTerminado = true;
    cancionGanar.play();
    alert("¡Muy bien, GANASTE! \nEncontraste todas las cartas. \nClic al botón 'Aceptar' si queres volver a jugar.");

    const cartasElementos = document.querySelectorAll(".carta-memoria");
    cartasElementos.forEach(function (carta) {
        carta.removeEventListener("click", voltearCarta);
    });

    if (!document.querySelector(".btn-jugar-again-ganar")) {
        const botonReiniciar = document.createElement("button");
        botonReiniciar.innerHTML = `
        <span>Bien jugado!</span><br>
        <span>Click para jugar de nuevo</span> `;
        botonReiniciar.classList.add("btn-jugar-again-ganar");
        document.body.appendChild(botonReiniciar);

        botonReiniciar.addEventListener("click", reiniciarJuego);
    }
}

function finDelJuego() {
    juegoTerminado = true;
    cancionPerder.play();
    alert("¡Perdiste! :( \nSe te acabaron los intentos. \nClic al botón 'Aceptar' para intentar nuevamente.");

    const cartasElementos = document.querySelectorAll(".carta-memoria");
    cartasElementos.forEach(function (carta) {
        carta.removeEventListener("click", voltearCarta);
    });

    if (!document.querySelector(".btn-jugar-again-perder")) {
        const botonReiniciar = document.createElement("button");
        botonReiniciar.innerHTML = `<span>Perdiste :(</span><br>
        <span>Click para jugar de nuevo"</span>`;
        botonReiniciar.classList.add("btn-jugar-again-perder");
        document.body.appendChild(botonReiniciar);

        botonReiniciar.addEventListener("click", reiniciarJuego);
    }
}

function reiniciarJuego() {
    cancionGanar.pause();
    cancionGanar.currentTime = 0;

    tablero.innerHTML = "";
    intentosRestantes = 10;
    cartasEmparejadas = 0;
    juegoTerminado = false;

    intentosTexto.textContent = `Intentos restantes: ${intentosRestantes}`;
    cartasEmparejadasTexto.textContent = `Cartas emparejadas: ${cartasEmparejadas}`;

    cartas = [...nombresCanciones, ...nombresCanciones].sort(() => Math.random() - 0.5);

    cartas.forEach(nombre => {
        const carta = document.createElement("div");
        carta.classList.add("carta-memoria");
        carta.dataset.nombre = nombre;
        carta.textContent = "?";
        carta.addEventListener("click", voltearCarta);
        tablero.appendChild(carta);
    });

    const botonReiniciar = document.querySelector(".btn-jugar-again-ganar, .btn-jugar-again-perder");
    if (botonReiniciar) {
        botonReiniciar.remove();
    }
}
});
