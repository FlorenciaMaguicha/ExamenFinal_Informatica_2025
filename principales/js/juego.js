
document.addEventListener("DOMContentLoaded", () => {

    const tablero = document.getElementById("juego-memoria");


    const canciones = [
        "Colocao", "Wapo Traketero", "Mamichula", "Años Luz", "Frío", "Ella no es Tuya", "Mala Vida", "Parte de Mi"
    ];

    let cartas = [...canciones, ...canciones];

    cartas = cartas.sort(() => Math.random () - 0.5);

    cartas.forEach(cancion => {
        const carta = document.createElement("div");
            carta.classList.add("carta-memoria");
            carta.textContent = "?";
            carta.dataset.nombre = cancion;
            tablero.appendChild(carta);
    });

});