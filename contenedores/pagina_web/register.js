let formRegister = document.getElementById("registerform")
formRegister.addEventListener("submit", event => {
    event.preventDefault()
    register()
})

let formLogin = document.getElementById("loginform")
formLogin.addEventListener("submit", event => {
    event.preventDefault()
    login()
})




function registrarAbrir() {
    let register = document.getElementById("registerform");
    let login = document.getElementById("loginform");

    register.style.display = "block"
    login.style.display = "none"

}

function abrirFormLogin() {
    let register = document.getElementById("registerform");
    let login = document.getElementById("loginform");

    register.style.display = "none"
    login.style.display = "block"

}


function register() {
    let data = {
        name: document.getElementById("usuario").value,
        email: document.getElementById("correo").value,
        password: document.getElementById("contrasena").value,
        c_password: document.getElementById("confcontrasena").value
    }

    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    console.log(config)
    console.log(data)

    fetch("http://localhost:8081/api/register", config)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
        })
}

function login() {
    let data = {
        email: document.getElementById("correo").value,
        password: document.getElementById("contrasena").value,
    }
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    console.log(config)
    console.log(data)
    setTimeout(() => {
        fetch("http://localhost:8081/api/login", config)
            .then(response => {
                if (!response.ok) {
                    throw new Error("La solicitud no se pudo completar correctamente.");
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem("token",data["data"]["token"])
                
            })
    }, 2000);


}


function logout() {
    let data = {
        name: document.getElementById("usuario").value,
    }

    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch("http://localhost:8081/api/logout", config)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            localStorage.clear("token")
        })
}