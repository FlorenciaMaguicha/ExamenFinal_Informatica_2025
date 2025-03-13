
document.addEventListener("DOMContentLoaded", () => {

    const tablero = document.getElementById("juego-memoria");


    const nombresCanciones = [
        "Colocao", "Wapo Traketero", "Mamichula", "Años Luz", "Frío", "Ella no es Tuya", "Mala Vida", "Parte de Mi"
    ];

    let cartas = [...nombresCanciones, ...nombresCanciones];
    cartas = cartas.sort(() => Math.random() - 0.5);

    cartas.forEach((nombre) => {
        const carta = document.createElement("div");
        carta.classList.add("carta-memoria");
        carta.dataset.nombre = nombre;
        carta.textContent = "?";
        carta.addEventListener("click", voltearCarta);
        tablero.appendChild(carta);
    });

    let cartaVolteada = null;
    let bloqueoTablero = false;

    function voltearCarta() {
        if (bloqueoTablero || this.textContent !== "?") return;

        this.textContent = this.dataset.nombre;

        if (!cartaVolteada) {
            cartaVolteada = this;
        } else {

            bloqueoTablero = true;
            setTimeout(() => {
                this.textContent = "?";
                cartaVolteada.textContent = "?";
                cartaVolteada = null;
                bloqueoTablero = false;
            }, 1000);

            intentosRestantes--;
            intentosTexto.textContent = `Intentos restantes: ${intentosRestantes}`;

            if (intentosRestantes === 0) {
                setTimeout(() => {
                    alert("¡Perdiste! Se te acabaron los intentos.");
                    location.reload();
                }, 500);
            }
        }
    }
});