document.addEventListener("DOMContentLoaded", () => {

    const tablero = document.getElementById("juego-memoria");
    const intentosTexto = document.getElementById("intentos");
    const cartasEmparejadasTexto = document.getElementById("cartas-emparejadas");

    const nombresCanciones = [
        "Colocao", "8 AM", "Sheite", "Forty", "Frío", "Baby", "Diva", "Alh"
    ];

    let cartas = [...nombresCanciones, ...nombresCanciones];
    cartas = cartas.sort(() => Math.random() - 0.5);

    let cartaVolteada = null;
    let intentosRestantes = 10;
    let cartasEmparejadas = 0;
    let juegoTerminado = false;

    intentosTexto.textContent = `Intentos restantes: ${intentosRestantes}`;
    cartasEmparejadasTexto.textContent = `Cartas emparejadas: ${cartasEmparejadas}`;

    cartas.forEach(function (nombre) {
        const carta = document.createElement("div");
        carta.classList.add("carta-memoria");
        carta.dataset.nombre = nombre;
        carta.textContent = "?";
        carta.addEventListener("click", voltearCarta);
        tablero.appendChild(carta);
    });

    function voltearCarta() {
        if (juegoTerminado || this.textContent !== "?" || cartaVolteada === this) return;

        this.textContent = this.dataset.nombre;

        if (cartaVolteada === null) {
            cartaVolteada = this;
        } else {
            if (cartaVolteada.dataset.nombre === this.dataset.nombre) {
                cartaVolteada = null;
                cartasEmparejadas++;
                cartasEmparejadasTexto.textContent = `Cartas emparejadas: ${cartasEmparejadas}`;

                if (cartasEmparejadas === nombresCanciones.length) {
                    juegoGanaste();
                }
            } else {
                intentosRestantes--;
                intentosTexto.textContent = `Intentos restantes: ${intentosRestantes}`;

                if (intentosRestantes === 0) {
                    finDelJuego();
                }

                setTimeout(function () {
                    cartaVolteada.textContent = "?";
                    this.textContent = "?";
                    cartaVolteada = null;
                }.bind(this), 1000);
            }
        }
    }

    function juegoGanaste() {
        juegoTerminado = true;
        alert("¡Ganaste! Has emparejado todas las cartas.");

        const cartasElementos = document.querySelectorAll(".carta-memoria");
        cartasElementos.forEach(function (carta) {
            carta.removeEventListener("click", voltearCarta);
        });
    }

    function finDelJuego() {
        juegoTerminado = true;

        alert("¡Perdiste! Se te acabaron los intentos.");

        const cartasElementos = document.querySelectorAll(".carta-memoria");
        cartasElementos.forEach(function (carta) {
            carta.removeEventListener("click", voltearCarta);
        });

        if (!document.querySelector(".btn-jugar-again")) {
            const botonReiniciar = document.createElement("button");
            botonReiniciar.textContent = "Jugar de nuevo";
            botonReiniciar.classList.add("btn-jugar-again");
            document.body.appendChild(botonReiniciar);

            botonReiniciar.addEventListener("click", reiniciarJuego);
        }
    }

    function reiniciarJuego() {
        tablero.innerHTML = "";
        intentosRestantes = 10;
        intentosTexto.textContent = `Intentos restantes: ${intentosRestantes}`;
        cartasEmparejadas = 0;
        cartasEmparejadasTexto.textContent = `Cartas emparejadas: ${cartasEmparejadas}`;
        juegoTerminado = false;

        cartas = [...nombresCanciones, ...nombresCanciones];
        cartas = cartas.sort(() => Math.random() - 0.5);

        cartas.forEach(function (nombre) {
            const carta = document.createElement("div");
            carta.classList.add("carta-memoria");
            carta.dataset.nombre = nombre;
            carta.textContent = "?";
            carta.addEventListener("click", voltearCarta);
            tablero.appendChild(carta);
        });

        const botonReiniciar = document.querySelector(".btn-jugar-again");
        if (botonReiniciar) {
            botonReiniciar.remove();
        }
    }
});
