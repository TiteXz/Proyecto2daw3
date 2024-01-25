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

function mirarToken() {
    if (localStorage.getItem("token")){
        window.location.href = "logeado.html"
    }
}





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
        email: document.getElementById("email").value,
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

    fetch("http://localhost:8081/api/register", config)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("token", data["data"]["token"])
            mirarToken()
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
        fetch("http://localhost:8081/api/login", config)
            .then(response => {
                if (!response.ok) {
                    throw new Error("La solicitud no se pudo completar correctamente.");
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem("token", data["data"]["token"])
                mirarToken()
            })
}

function logout() {
    let token = localStorage.getItem("token");

    let config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }

    fetch("http://localhost:8081/api/logout", config)
        .then(response => {
            if (!response.ok) {
                throw new Error(`La solicitud no se pudo completar correctamente: ${response.status} - ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            localStorage.removeItem("token")
            window.location.href = "index.html"
        })
        .catch(error => {
            console.error("Error during logout:", error);
        });
}