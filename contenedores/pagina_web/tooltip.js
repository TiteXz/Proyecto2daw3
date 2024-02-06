function cogerCodigosEuskalmet() {

    fetch(`http://localhost:8081/api/lugares`)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            let nombreYcod = {}
            data.forEach(elemento => {
                nombreYcod[elemento.ubicacion] = elemento.cod_zona_euskalmet;
            });
            crearTooltips(nombreYcod)
           

        })
        .catch(error => {
            console.error(error);
        });
}
cogerCodigosEuskalmet()

function crearTooltips(nombreYcods) {
    let fechaActual = new Date()
    let fechaManana = new Date()
    fechaManana.setDate(parseInt(fechaActual.getDate()) + 1)
    let fechaActualSeparada = fechaActual.toISOString().split('T')[0].split('-')
    let fechaMananaSeparada = fechaManana.toISOString().split('T')[0].split('-')


    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZmlAcGxhaWF1bmRpLm5ldCJ9.f6kRRsGk7PufFrZrSoaZrcmO3TCj7nIL1GWThyGjfisaphOSXNPhK9uEc2DyLLobXCpZPcuXEtY71JvciGQpWNQZWofLdXWYI3DqJwo30OsardXsbuvvZQ0YgzH5kP8z2_Dar-SO-IaJplBeqXYvdJnxgsinptq1tIflM_TyskPtrANa6PgBEPdOjwXaUoMgrOkVGoOSvN_PCsg-fvKG8K-x-OpfS1bmUIfwnnXi06biabaA1kZ5XmheP1D0aI6u65I8DA36Ai0O0JyieXwRM4OSgtAwn75bqnWOmVFDK0xemRYiajtE0wVL5igTLy6aak4Vaoh3JwnFnKQmA_7dBA',
        }
    }

    for (const key in nombreYcods) {

        fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/${nombreYcods[key]}/locations/${key.toLowerCase()}/forecast/at/${fechaActualSeparada[0]}/${fechaActualSeparada[1]}/${fechaActualSeparada[2]}/for/${fechaMananaSeparada[0]}${fechaMananaSeparada[1]}${fechaMananaSeparada[2]}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error("La solicitud no se pudo completar correctamente.");
                }
                return response.json();
            })
            .then(data => {
                const tarjeta = document.querySelector(`.${key}`)
                tarjeta.title = data["forecastText"]["SPANISH"]
               
            })
            .catch(error => {
                console.error(`Error en la ciudad ${key}:`, error);
            });

    }
}

crearTooltips()