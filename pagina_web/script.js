
var mapa = L.map('mapa').setView([43.3404, -1.7921], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa);

L.marker([43.3404, -1.7921]).addTo(mapa)
    .bindPopup('Irun - Ciudad fronteriza')
    .openPopup();

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



const datosCiudades = [
    { nombre: 'Irun', latitud: 43.3404, longitud: -1.7921, velocidadViento: '4m/s', humedad: '50%', direccionViento: 'norte', temperatura: '20ºC', precipitaciones: '30%' },
    { nombre: 'Donostia', latitud: 43.3225, longitud: -1.9852, velocidadViento: '5m/s', humedad: '55%', direccionViento: 'noreste', temperatura: '22ºC', precipitaciones: '40%' },
    { nombre: 'Renteria', latitud: 43.3216, longitud: -1.9029, velocidadViento: '3m/s', humedad: '48%', direccionViento: 'noroeste', temperatura: '19ºC', precipitaciones: '10%' },
    { nombre: 'Vitoria', latitud: 42.8599, longitud: -2.6818, velocidadViento: '6m/s', humedad: '60%', direccionViento: 'oeste', temperatura: '18ºC', precipitaciones: '0%' },
    { nombre: 'Bilbao', latitud: 43.263, longitud: -2.935, velocidadViento: '4.5m/s', humedad: '52%', direccionViento: 'suroeste', temperatura: '21ºC', precipitaciones: '55%' }
];

let ciudades = [];
// Añadir marcadores para cada ciudad y crear tarjetas dinámicamente
datosCiudades.forEach(ciudad => {
    const marcador = L.marker([ciudad.latitud, ciudad.longitud]).addTo(mapa);


    // Manejar el evento de clic en el marcador
    marcador.on('click', () => {
        const ciudadSeleccionada = ciudades.find(ciudadSel => ciudadSel.nombre === ciudad.nombre);

        if (ciudadSeleccionada) {
            // Si la ciudad ya está seleccionada, quitarla de las seleccionadas
            ciudades = ciudades.filter(ciudadSel => ciudadSel.nombre !== ciudad.nombre);

        } else {
            // Si la ciudad no está seleccionada, agregarla a las seleccionadas
            ciudades.push(ciudad);
        }

        // Mostrar las tarjetas correspondientes a las ciudades seleccionadas

        mostrarTarjeta(ciudad.nombre);

    });


    // Crear tarjeta dinámicamente
    const contenedorTarjetas = document.getElementById('cards');
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card', ciudad.nombre); // Agregar clase con el nombre de la ciudad
    tarjeta.innerHTML = `
        <a id="ubicacion">${ciudad.nombre}</a>
        <center>
        <div class="drag-container ${ciudad.nombre}" id="drag">
        <p>SELECCIONABLES</p>
        <i id="${ciudad.nombre}" class="fa-solid fa-wind Viento${ciudad.nombre}" style="color: #ffffff;"><a class="dato-icon">${ciudad.velocidadViento}</a></i>
        <i id="${ciudad.nombre}" class="fa-solid fa-cloud-rain Lluvia${ciudad.nombre}" style="color: #ffffff;"><a class="dato-icon">${ciudad.precipitaciones}</a></i>
        <i id="${ciudad.nombre}" class="fa-solid fa-compass direccionViento${ciudad.nombre}" style="color: #ffffff;"><a class="dato-icon">${ciudad.direccionViento}</a></i>
        </div>
        <div class="drop-container ${ciudad.nombre}" id="datos">
           <p>SELECCIONADOS</p>
           <i id="" class="fa-solid fa-temperature-high temperatura${ciudad.nombre}" style="color: #ffffff;"><a class="dato-icon">${ciudad.temperatura}</a></i>
           <i id="" class="fa-solid fa-droplet humedad${ciudad.nombre}" style="color: #ffffff;"><a class="dato-icon">${ciudad.humedad}</a></i>
        </div>
        </center>
        <div id="botonGrafico" onclick="mostrarGrafico()"><a>Gráfico</a></div>
    `;

    // Agregar la tarjeta al contenedor
    contenedorTarjetas.appendChild(tarjeta);
});

function mostrarTarjeta(nombreCiudad) {

    const tarjeta = document.querySelector(`.${nombreCiudad}`)
    tarjeta.style.display = 'block';
}

$(document).ready(function () {

    let ciudad=""

    // Hacer los elementos arrastrables
    $('.fa-wind, .fa-cloud-rain, .fa-temperature-high, .fa-droplet, .fa-compass').attr('draggable', true);

    // Manejadores de eventos para el Viento
    $('.fa-wind').on("dragstart", function (event) {
        event.originalEvent.dataTransfer.setData('text', 'Viento');
        ciudad=$(this).attr("id")
    });

    // Manejadores de eventos para el Lluvia
    $('.fa-cloud-rain').on("dragstart", function (event) {
        event.originalEvent.dataTransfer.setData('text', 'Lluvia');
        ciudad=$(this).attr("id")
    });

    // Manejadores de eventos para el temperatura
    $('.fa-temperature-high').on("dragstart", function (event) {
        event.originalEvent.dataTransfer.setData('text', 'temperatura');
        ciudad=$(this).attr("id")
    });

    // Manejadores de eventos para el humedad
    $('.fa-droplet').on("dragstart", function (event) {
        event.originalEvent.dataTransfer.setData('text', 'humedad');
        ciudad=$(this).attr("id")
    });

    // Manejadores de eventos para el direccionViento
    $('.fa-compass').on("dragstart", function (event) {
        event.originalEvent.dataTransfer.setData('text', 'direccionViento');
        ciudad=$(this).attr("id")
    });

    // Manejadores de eventos comunes para el "drag" y "datos"
    $(`.drop-container,.drag-container`).on("dragover dragenter dragleave", function (event) {
        event.preventDefault();
    });

    $('.drop-container').on("drop", function (event) {
        event.preventDefault();
        let data = event.originalEvent.dataTransfer.getData('text')
        const ciudadTarjeta = $(this).parent().parent()[0].className.split(' ')[1];
        const draggedItem =document.querySelector(`.${data}${ciudadTarjeta}`);
        console.log(event.target.tagName)
        if(ciudad == ciudadTarjeta && event.target.tagName != "I" && event.target.tagName != "A" && event.target.tagName != "P"){
            event.target.appendChild(draggedItem)
        }
    });
});


function mostrarGrafico() {
    const grafico = document.getElementById('grafico')

    if (grafico.style.display == 'none') {
        grafico.style.display = 'block'
    } else grafico.style.display = 'none'




    const xValues = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    let yValues1 = [13, 8, 5, 2, 13, 17, 14];
    let yValues2 = [8, 5, 2, 13, 17, 14, 10];

    function generarNumerosRandom() {
        const nuevosNumeros1 = [];
        const nuevosNumeros2 = [];

        for (let i = 0; i < 7; i++) {
            const numeroRandom1 = Math.floor(Math.random() * (30 - (-10) + 1)) + (-10);
            const numeroRandom2 = Math.floor(Math.random() * (100 - (0) + 1)) + (0);

            nuevosNumeros1.push(numeroRandom1);
            nuevosNumeros2.push(numeroRandom2);
        }

        console.log("Nuevos números generados para Dataset 1:", nuevosNumeros1);
        console.log("Nuevos números generados para Dataset 2:", nuevosNumeros2);

        yValues1 = nuevosNumeros1;
        yValues2 = nuevosNumeros2;

        actualizarGrafico();
    }

    function actualizarGrafico() {
        myChart.data.datasets[0].data = yValues1;
        myChart.data.datasets[1].data = yValues2;
        myChart.update();
    }

    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [
                {
                    label: 'Temperatura',
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgb(218, 52, 52)",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: yValues1
                },
                {
                    label: 'Humedad',
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "aqua",
                    borderColor: "rgba(255,0,0,0.1)",
                    data: yValues2
                }
            ]
        },
        options: {
            legend: { display: true },
            scales: {
                y: {
                    min: -10,
                    max: 100,
                    ticks: {
                        stepSize: 10,
                    },
                }
            }
        }
    });

    generarNumerosRandom();

    const intervalo = setInterval(generarNumerosRandom, 10000);

}




