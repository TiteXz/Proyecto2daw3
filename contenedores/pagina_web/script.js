var mapa = L.map('mapa').setView([43.3404, -1.7921], 8);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa);

function loginAbrir() {
    let desplegable = document.getElementById('loginForm');

    if (desplegable.style.display == 'none') {
        desplegable.style.display = 'block';
        document.body.style.overflowY = 'hidden';
    } else {
        desplegable.style.display = 'none';
        document.body.style.overflowY = 'visible';
    }
}

function mostrarTarjeta(nombreCiudad) {

    const tarjeta = document.querySelector(`.${nombreCiudad}`)

    if (tarjeta.style.display == 'none') {
        tarjeta.style.display = 'block'
    } else tarjeta.style.display = 'none'
}
