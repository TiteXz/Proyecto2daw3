var mapa = L.map('mapa').setView([43.3404, -1.7921], 13);

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

function mostrarGrafico() {
    const grafico = document.getElementById('grafico')


    if (grafico.style.display == 'none' || grafico.style.display == '') {
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