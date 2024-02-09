function DatosCards() {
    fetch(`http://${urlActual}:8081/api/historico-lugares`)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            CrearCards(data); // Llamar a CrearCards con los datos obtenidos
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
DatosCards();

function RecogerDatosCards() {
    fetch(`http://${urlActual}:8081/api/historico-lugares`)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            actualizarDatosCards(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function actualizarDatosCards(data) {
    data.forEach(elemento => {
        viento = document.querySelector(`.Viento${elemento["ubicacion"]}`)
        lluvia = document.querySelector(`.Lluvia${elemento["ubicacion"]}`)
        temperatura = document.querySelector(`.temperatura${elemento["ubicacion"]}`)
        temperatura_max = document.querySelector(`.temperatura_max${elemento["ubicacion"]}`)
        temperatura_min = document.querySelector(`.temperatura_min${elemento["ubicacion"]}`)
        humedad = document.querySelector(`.humedad${elemento["ubicacion"]}`)

        // Modificar el innerHTML de los elementos .dato-icon dentro de los contenedores
        viento.querySelector('.dato-icon').innerHTML=`${elemento["velocidad_viento"]}k/h`;
        lluvia.querySelector('.dato-icon').innerHTML=`${elemento["precipitaciones"]}%`;
        temperatura.querySelector('.dato-icon').innerHTML=`${elemento["temperatura"]}ºC`;
        temperatura_max.querySelector('.dato-icon').innerHTML=`${elemento["temperatura_max"]}ºC`;
        temperatura_min.querySelector('.dato-icon').innerHTML=`${elemento["temperatura_min"]}ºC`;
        humedad.querySelector('.dato-icon').innerHTML=`${elemento["humedad"]}%`;

       

    });
}

setInterval(RecogerDatosCards, 15000);

function CrearCards(data) {
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
                    <i id="${ciudad.ubicacion}" class="fa-solid fa-wind Viento${ciudad.ubicacion}" style="color: #ffffff;"><a class="dato-icon">${ciudad.velocidad_viento}k/h</a></i>
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
            <div id="botonGrafico" onclick="mostrarGrafico('${ciudad.ubicacion}')"><a>Gráfico</a></div>
        `;

        // Agregar la tarjeta al contenedor
        contenedorTarjetas.appendChild(tarjeta);
        nombreCiudades += ciudad.ubicacion;
    });

    // Hacer los elementos arrastrables después de agregar todas las tarjetas
    makeElementsDraggable();
}

// Esta función hace los elementos arrastrables y maneja los eventos
function makeElementsDraggable() {
    let draggedItem = null;
    let origenContainer = null;

    // Hacer los elementos arrastrables
    $('.fa-wind, .fa-cloud-rain, .fa-temperature-high, .fa-temperature-arrow-up, .fa-temperature-arrow-down, .fa-droplet').attr('draggable', true);

    // Manejadores de eventos para el inicio del arrastre
    $('.drag-container i, .drop-container i').on("dragstart", function (event) {
        draggedItem = event.target;
        origenContainer = $(this).parent().hasClass('drag-container') ? 'drag-container' : 'drop-container';
    });

    // Manejadores de eventos comunes para el "drag" y "drop"
    $('.drag-container, .drop-container').on("dragover dragenter dragleave", function (event) {
        event.preventDefault();
    });

    // Manejador de eventos drop para el contenedor drop-container
    $('.drop-container').on("drop", function (event) {
        event.preventDefault();
        if (draggedItem) {
            const dropContainer = $(this);
            const targetContainer = dropContainer.hasClass('drag-container') ? 'drag-container' : 'drop-container';
            if (origenContainer !== targetContainer) {
                dropContainer.append(draggedItem);
            }
            draggedItem = null;
            origenContainer = null;
        }
    });

    // Manejador de eventos drop para el contenedor drag-container
    $('.drag-container').on("drop", function (event) {
        event.preventDefault();
        if (draggedItem) {
            const dropContainer = $(this);
            const targetContainer = dropContainer.hasClass('drag-container') ? 'drag-container' : 'drop-container';
            if (origenContainer !== targetContainer) {
                dropContainer.append(draggedItem);
            }
            draggedItem = null;
            origenContainer = null;
        }
    });
}

makeElementsDraggable();

CrearCards();
