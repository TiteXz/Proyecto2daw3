function CrearBalizas() {
    fetch(`http://${urlActual}:8081/api/lugares`)
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

                    if (localStorage.getItem(ciudad.ubicacion)) {
                        ciudades.push(ciudad.ubicacion)
                    }
                    

                };

                // Manejar el evento de clic en el marcador
                marcador.on('click', () => {
                    const ciudadSeleccionada = ciudades.find(ciudadSel => ciudadSel.ubicacion === ciudad.ubicacion);
                    if (ciudadSeleccionada) {
                        // Si la ciudad ya está seleccionada, quitarla de las seleccionadas
                        ciudades = ciudades.filter(ciudadSel => ciudadSel.ubicacion !== ciudad.ubicacion);
                        localStorage.removeItem(ciudad.ubicacion); // Eliminar del localStorage
                    } else {
                        // Si la ciudad no está seleccionada, agregarla a las seleccionadas
                        ciudades.push(ciudad);
                        if (!localStorage.getItem(ciudad.ubicacion)) {
                            localStorage.setItem(ciudad.ubicacion, ciudad.ubicacion);
                            // Si no está en localStorage, guárdalo
                        } else {
                            localStorage.removeItem(ciudad.ubicacion); // Si ya está, elimínalo
                        }
                    }

                    // Cambiar el color del marcador
                    huechange();

                    // Mostrar las tarjetas correspondientes a las ciudades seleccionadas
                    mostrarTarjeta(ciudad.ubicacion);

                });

                // Verificar si la ciudad está almacenada en localStorage y cambiar el color del marcador
                tarjeta = document.querySelector(`.${ciudad.ubicacion}`)
                if (localStorage.getItem(ciudad.ubicacion)) {
                    huechange();
                    tarjeta.style.display = 'block';
                }

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
