
const formSignup = document.getElementById("signup-form");
const formLogin = document.getElementById("login-form");

const signup = async (firstName, lastName, age, email, password) => {
    const response = await fetch(`/api/sessions/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, age, email, password }),
    })

    if (response.ok) {
        return true
    } else {
        const error = await response.json()
        console.log(error);
        return error.message
    }
}

const login = async (email, password) => {
    try {
        const response = await fetch(`/api/sessions/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        if (response.ok) {
            return true
        } else {
            const error = response.json()
            return error.message
        }

    }
    catch (error) {
        console.log(error);
    }

}

if (formSignup) {

    formSignup.addEventListener("submit", async (event) => {
        event.preventDefault();

        const firstName = document.getElementById("first_name").value
        const lastName = document.getElementById("last_name").value
        const age = document.getElementById("age").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        const result = await signup(firstName, lastName, age, email, password)

        console.log(result);


        if (result === true) {
            Toastify({
                text: `✅`,
                duration: 2000,
                className: "info",
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast()

            setTimeout(() => {
                window.location.href = `/`;
            }, 2000)

        } else {
            Toastify({
                text: `${result}`,
                duration: 3000,
                className: "info",
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to left, #b00017, #5e1f21)",
                }
            }).showToast()
        }


    });
} else {

    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        const result = await login(email, password)

        if (result) {
            window.location.href = `/products`;
        } else {
            Toastify({
                text: `No se encontro el usuario`,
                duration: 3000,
                className: "info",
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to left, #b00017, #5e1f21)",
                }
            }).showToast()
        }
    });
}

