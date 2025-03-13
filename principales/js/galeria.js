let imagenes = [
    '../imagenes/galeria/foto-uno.jpeg',
    '../imagenes/galeria/foto-dos.jpg',
    '../imagenes/galeria/foto-tres.jpeg',
    '../imagenes/galeria/foto-cuatro.jpg',
    '../imagenes/galeria/foto-cinco.jpg',
    '../imagenes/galeria/foto-seis.jpg',
    '../imagenes/galeria/foto-siete.jpg',
    '../imagenes/galeria/foto-ocho.jpg',
    '../imagenes/galeria/foto-nueve.jpg',
    '../imagenes/galeria/foto-diez.jpg',
];

let galeria = document.getElementById('galeria');
let ventana = document.getElementById('ventana');
let imagenGrande = document.getElementById('imagen-grande');
let indiceActual = 0;

for (let i = 0; i < imagenes.length; i++) {
    let img = document.createElement('img');
    img.src = imagenes[i];
    img.onclick = function () {
        abrirImagen(i);
    };
    galeria.appendChild(img);
}

function abrirImagen(indice) {
    indiceActual = indice;
    imagenGrande.src = imagenes[indiceActual];
    ventana.style.display = 'flex';
}

function cerrarImagen() {
    ventana.style.display = 'none';
}

function imagenAnterior() {
    indiceActual = (indiceActual > 0) ? indiceActual - 1 : imagenes.length - 1;
    imagenGrande.src = imagenes[indiceActual];
}

function imagenSiguiente() {
    indiceActual = (indiceActual < imagenes.length - 1) ? indiceActual + 1 : 0;
    imagenGrande.src = imagenes[indiceActual];
}