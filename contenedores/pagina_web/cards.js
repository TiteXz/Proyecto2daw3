function CrearCards() {
    fetch(`http://localhost:8081/api/historico-lugares`)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {

            // Crear tarjeta dinámicamente
            const contenedorTarjetas = document.getElementById('cards');
            let nombreCiudades = {}

            data.forEach(ciudad => {

                const tarjeta = document.createElement('div');
                tarjeta.classList.add('card', ciudad.ubicacion); // Agregar clase con el nombre de la ciudad
                tarjeta.style.display = 'none'
                tarjeta.innerHTML = `
                    <a id="ubicacion">${ciudad.ubicacion}</a>
                    <center>
                        <div class="drag-container ${ciudad.ubicacion}" id="drag">
                            <p>SELECCIONABLES</p>
                            <i id="${ciudad.ubicacion}" class="fa-solid fa-wind Viento${ciudad.ubicacion}" style="color: #ffffff;"><a class="dato-icon">${ciudad.velocidad_viento}m/s</a></i>
                            <i id="${ciudad.ubicacion}" class="fa-solid fa-cloud-rain Lluvia${ciudad.ubicacion}" style="color: #ffffff;"><a class="dato-icon">${ciudad.precipitaciones}%</a></i>
                            <i id="${ciudad.ubicacion}" class="fa-solid fa-temperature-arrow-up temperatura_max${ciudad.ubicacion}" style="color: #ffffff;"><a class="dato-icon">${ciudad.temperatura_max}ºC</a></i>
                            <i id="${ciudad.ubicacion}" class="fa-solid fa-temperature-arrow-down temperatura_min${ciudad.ubicacion}" style="color: #ffffff;"><a class="dato-icon">${ciudad.temperatura_min}ºC</a></i>
                        </div>
                        <div class="drop-container ${ciudad.ubicacion}" id="datos">
                            <p>SELECCIONADOS</p>
                            <i id="" class="fa-solid fa-temperature-high temperatura${ciudad.ubicacion}" style="color: #ffffff;"><a class="dato-icon">${ciudad.temperatura}ºC</a></i>
                            <i id="" class="fa-solid fa-droplet humedad${ciudad.ubicacion}" style="color: #ffffff;"><a class="dato-icon">${ciudad.humedad}%</a></i>
                        </div>
                    </center>
                    <div id="botonGrafico" onclick="mostrarGrafico()"><a>Gráfico</a></div>
                `;

                // Agregar la tarjeta al contenedor
                contenedorTarjetas.appendChild(tarjeta);
                nombreCiudades += ciudad.ubicacion


            });

            // Hacer los elementos arrastrables después de agregar todas las tarjetas
            makeElementsDraggable();
        })
        .catch(error => {
            console.error("Error:", error);
        });
}


// Esta función hace los elementos arrastrables y maneja los eventos
function makeElementsDraggable() {
    let ciudad = "";

    // Hacer los elementos arrastrables
    $('.fa-wind, .fa-cloud-rain, .fa-temperature-high, .fa-temperature-arrow-up, .fa-temperature-arrow-down, .fa-droplet').attr('draggable', true);

    // Manejadores de eventos para el Viento
    $('.fa-wind').on("dragstart", function (event) {
        event.originalEvent.dataTransfer.setData('text', 'Viento');
        ciudad = $(this).attr("id");
    });

    // Manejadores de eventos para la Lluvia
    $('.fa-cloud-rain').on("dragstart", function (event) {
        event.originalEvent.dataTransfer.setData('text', 'Lluvia');
        ciudad = $(this).attr("id");
    });

    // Manejadores de eventos para la Temperatura
    $('.fa-temperature-high').on("dragstart", function (event) {
        event.originalEvent.dataTransfer.setData('text', 'temperatura');
        ciudad = $(this).attr("id");
    });

    // Manejadores de eventos para la Temperatura Máxima
    $('.fa-temperature-arrow-up').on("dragstart", function (event) {
        event.originalEvent.dataTransfer.setData('text', 'temperatura_max');
        ciudad = $(this).attr("id");
    });

    // Manejadores de eventos para la Temperatura Mínima
    $('.fa-temperature-arrow-down').on("dragstart", function (event) {
        event.originalEvent.dataTransfer.setData('text', 'temperatura_min');
        ciudad = $(this).attr("id");
    });

    // Manejadores de eventos para la Humedad
    $('.fa-droplet').on("dragstart", function (event) {
        event.originalEvent.dataTransfer.setData('text', 'humedad');
        ciudad = $(this).attr("id");
    });

    // Manejadores de eventos comunes para el "drag" y "datos"
    $(`.drop-container,.drag-container`).on("dragover dragenter dragleave", function (event) {
        event.preventDefault();
    });

    $('.drop-container').on("drop", function (event) {
        event.preventDefault();
        let data = event.originalEvent.dataTransfer.getData('text');
        const ciudadTarjeta = $(this).parent().parent()[0].className.split(' ')[1];
        const draggedItem = document.querySelector(`.${data}${ciudadTarjeta}`);

        if (ciudad == ciudadTarjeta && event.target.tagName != "I" && event.target.tagName != "A" && event.target.tagName != "P") {
            event.target.appendChild(draggedItem);
        }
    });
}

// Llamar a la función para crear tarjetas y hacer elementos arrastrables
CrearCards();
