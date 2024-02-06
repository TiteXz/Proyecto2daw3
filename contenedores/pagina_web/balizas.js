function CrearBalizas() {
    fetch(`http://localhost:8081/api/lugares`)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {

            let ciudades = [];

            // Añadir marcadores para cada ciudad y crear tarjetas dinámicamente
            data.forEach(ciudad => {
                const marcador = L.marker([ciudad.latitud, ciudad.longitud]).addTo(mapa);

                const huechange = () => {
                    const icono = marcador._icon;
                    if (icono.classList.contains("huechange")) {
                        icono.style.filter = "hue-rotate(0deg)";
                        icono.classList.remove("huechange");
                    } else {
                        icono.style.filter = "hue-rotate(120deg)";
                        icono.classList.add("huechange");
                    }
                };

                // Manejar el evento de clic en el marcador
                marcador.on('click', () => {
                    const ciudadSeleccionada = ciudades.find(ciudadSel => ciudadSel.ubicacion === ciudad.ubicacion);
                    if (ciudadSeleccionada) {
                        // Si la ciudad ya está seleccionada, quitarla de las seleccionadas
                        ciudades = ciudades.filter(ciudadSel => ciudadSel.ubicacion !== ciudad.ubicacion);
                    } else {
                        // Si la ciudad no está seleccionada, agregarla a las seleccionadas
                        ciudades.push(ciudad);
                    }

                    // Cambiar el color del marcador
                    huechange();

                    // Mostrar las tarjetas correspondientes a las ciudades seleccionadas
                    mostrarTarjeta(ciudad.ubicacion);
                });

                // Añadir tooltip al marcador
                marcador.bindTooltip(ciudad.ubicacion, { direction: 'top' });

                // Cerrar el tooltip inmediatamente después de agregar el marcador
                marcador.closeTooltip();
            });

        })
        .catch(error => {
            console.error("Error:", error);
        });
}

CrearBalizas();
