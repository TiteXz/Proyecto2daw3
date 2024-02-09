function mostrarGrafico(nombreCiudad) {
    const grafico = document.getElementById('grafico')


    if (grafico.style.display == 'none' || grafico.style.display == '') {
        grafico.style.display = 'block'
    } else grafico.style.display = 'none'

    fetch(`http://` + urlActual + `:8081/api/historico-ano-pasado`)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            const temperaturas = [];
            const humedades = [];
            data.forEach(elemento => {
                if (elemento["ubicacion"] == nombreCiudad) {
                    temperaturas.push(elemento["temperatura"]);
                    humedades.push(elemento["humedad"]);
                }
            });
            const xValues = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'semptiembre', 'octubre', 'noviembre', 'diciembre'];
            let yValues1 = temperaturas;
            let yValues2 = humedades;

            const ctx = document.getElementById("myChart").getContext("2d");
            new Chart(ctx, {
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
            crearGráficoAnoPasado(nombreCiudad)
            crearGráficoMesPasado(nombreCiudad)
            crearGráficoAyer(nombreCiudad)
            crearGráficoHoy(nombreCiudad)

        })
        .catch(error => {
            console.error("Error:", error);
        });


}

function crearGráficoAnoPasado(nombreCiudad) {
    fetch(`http://` + urlActual + `:8081/api/historico-ano-pasado`)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            const temperaturas = [];
            const humedades = [];
            data.forEach(elemento => {
                if (elemento["ubicacion"] == nombreCiudad) {
                    temperaturas.push(elemento["temperatura"]);
                    humedades.push(elemento["humedad"]);
                }
            });
            const xValues = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'semptiembre', 'octubre', 'noviembre', 'diciembre'];
            let yValues1 = temperaturas;
            let yValues2 = humedades;

            const ctx = document.getElementById("myChart").getContext("2d");
            new Chart(ctx, {
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

        })
        .catch(error => {
            console.error("Error:", error);
        });

}

function crearGráficoMesPasado(nombreCiudad) {
    fetch(`http://` + urlActual + `:8081/api/historico-mes-pasado`)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            const temperaturas = [];
            const humedades = [];
            data.forEach(elemento => {
                if (elemento["ubicacion"] == nombreCiudad) {
                    temperaturas.push(elemento["temperatura"]);
                    humedades.push(elemento["humedad"]);
                }
            });
            const xValues = ['semana1', 'semana2', 'semana3'];
            let yValues1 = temperaturas;
            let yValues2 = humedades;

            const ctx = document.getElementById("myChart2").getContext("2d");
            new Chart(ctx, {
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
        })
        .catch(error => {
            console.error("Error:", error);
        });

}

function crearGráficoAyer(nombreCiudad) {

    fetch(`http://` + urlActual + `:8081/api/historico-ayer`)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            const temperaturas = [];
            const humedades = [];
            data.forEach(elemento => {
                if (elemento["ubicacion"] == nombreCiudad) {
                    temperaturas.push(elemento["temperatura"]);
                    humedades.push(elemento["humedad"]);
                }
            });
            const xValues = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
            let yValues1 = temperaturas;
            let yValues2 = humedades;

            const ctx = document.getElementById("myChart3").getContext("2d");
            new Chart(ctx, {
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
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function crearGráficoHoy(nombreCiudad) {

    fetch(`http://` + urlActual + `:8081/api/historico-hoy`)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            const temperaturas = [];
            const humedades = [];
            data.forEach(elemento => {
                if (elemento["ubicacion"] == nombreCiudad) {
                    temperaturas.push(elemento["temperatura"]);
                    humedades.push(elemento["humedad"]);
                }
            });
            const xValues = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
            let yValues1 = temperaturas;
            let yValues2 = humedades;

            const ctx = document.getElementById("myChart4").getContext("2d");
            new Chart(ctx, {
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


        })
        .catch(error => {
            console.error("Error:", error);
        });


}



function mostrarGraficoAnoPasado() {
    const canvas = document.getElementById("myChart");
    
    if (canvas.style.display == 'none' || canvas.style.display == '') {
        canvas.style.display = 'block'
    } else canvas.style.display = 'none'
}

function mostrarGraficoMesPasado() {
    const canvas = document.getElementById("myChart2");
    
    if (canvas.style.display == 'none' || canvas.style.display == '') {
        canvas.style.display = 'block'
    } else canvas.style.display = 'none'
}

function mostrarGraficoAyer() {
    const canvas = document.getElementById("myChart3");
    
    if (canvas.style.display == 'none' || canvas.style.display == '') {
        canvas.style.display = 'block'
    } else canvas.style.display = 'none'

}

function mostrarGraficoHoy() {
    const canvas = document.getElementById("myChart4");
    
    if (canvas.style.display == 'none' || canvas.style.display == '') {
        canvas.style.display = 'block'
    } else canvas.style.display = 'none'


}

// generarNumerosRandom();

// setInterval(generarNumerosRandom, 10000);


// function generarNumerosRandom() {
//     const nuevosNumeros1 = [];
//     const nuevosNumeros2 = [];

//     for (let i = 0; i < 7; i++) {
//         const numeroRandom1 = Math.floor(Math.random() * (30 - (-10) + 1)) + (-10);
//         const numeroRandom2 = Math.floor(Math.random() * (100 - (0) + 1)) + (0);

//         nuevosNumeros1.push(numeroRandom1);
//         nuevosNumeros2.push(numeroRandom2);
//     }

//     yValues1 = nuevosNumeros1;
//     yValues2 = nuevosNumeros2;

//     actualizarGrafico();
// }

// function actualizarGrafico() {
//     myChart.data.datasets[0].data = yValues1;
//     myChart.data.datasets[1].data = yValues2;
//     myChart.update();
// }

