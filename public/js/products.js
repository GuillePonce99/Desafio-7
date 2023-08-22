const btnAdd = document.querySelectorAll(".btn-addToCart")
const profile = document.getElementById("form-user")
const profileUl = document.getElementById("ul-profile")

let cartBody

//Funcion para setear la informacion mostrada en el perfil
const setProfile = async () => {

    const response = await fetch("/api/sessions").catch((e) => { console.log(e) })

    const data = await response.json()
    const { user, admin, message } = data

    let element = ""
    let ul = ""

    if (message === "Admin") {
        //Mensaje de bienvenida
        console.log(admin.counter);
        if (admin.counter === 1) {
            Toastify({
                text: `Bienvenido Admin!`,
                duration: 3000,
                className: "info",
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast()
        }


        //Render del perfil para admin
        element += `
                <ul class="ul-profile-2">
                    <li class="profile-role">"Admin"</li>
                    <li>admin</li>
                    <li>Coder</li>
                    <li><strong>adminCoder@coder.com</strong></li>
                    <button class="btn-logout" id="btn-logout">SALIR</button>
                </ul>
            `
        ul += `
                <li class="li-titles">Rol</li>
                <li class="li-titles">Nombre</li>
                <li class="li-titles">Apellido</li>
                <li class="li-titles">Email</li>
            `
        profile.innerHTML = element
        profileUl.innerHTML = ul
        profileUl.className = "ul-profile-2"

    } else {
        console.log(user);
        //Mensaje de bienvenida para usuarios por primera vez
        if (user.counter === 1) {
            Toastify({
                text: `Bienvenido ${user.firstName}!`,
                duration: 3000,
                className: "info",
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast()
        }

        //Render del perfil para usuarios
        element += `
                <ul class="ul-profile">
                    <li class="profile-role">${user.role}</li>
                    <li>${user.firstName}</li>
                    <li>${user.lastName}</li>
                    <li><strong>${user.email}</strong></li>
                    <li>${user.age}</li>
                    <button class="btn-logout" id="btn-logout">SALIR</button>
                </ul>
            `
        ul += `
                <li class="li-titles">Rol</li>
                <li class="li-titles">Nombre</li>
                <li class="li-titles">Apellido</li>
                <li class="li-titles">Email</li>
                <li class="li-titles">Edad</li>
            `
        profile.innerHTML = element
        profileUl.innerHTML = ul
    }

    //Ejecuto funcion en caso que ya exista un carrito y lo muestre en el DOM
    updateCartNumber()
}

//Funcion que una vez generado el perfil, podre cerrar sesion mediante su respectivo boton
const logOut = async () => {

    await setProfile()

    const btnLogout = document.getElementById("btn-logout")

    if (btnLogout) {
        btnLogout.addEventListener("click", async (e) => {
            const response = await fetch("/api/sessions/logout")
            if (response.ok) {
                Toastify({
                    text: `Se ha cerrado la sesion`,
                    duration: 3000,
                    className: "info",
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast()
                setTimeout(() => {
                    window.location.href = `/`;
                }, 3000)
            } else {
                Toastify({
                    text: `Error al cerrar sesion`,
                    duration: 3000,
                    className: "info",
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to left, #b00017, #5e1f21)"
                    }
                }).showToast();
            }
        })
    }
}

logOut()

//Funcion para setear la estructura del carrito
const updateCart = (cid, products) => {
    cartBody = {
        "cartId": cid,
        "products": products
    }

}

//Funcion para obtener del LS el Id el carrito
const getCartId = () => {

    let ls = localStorage.cart
    let data

    if (ls === undefined) {
        return ls
    } else {
        data = JSON.parse(ls)
        return data.cartId
    }
}

//Funcion para guardar la estructura del carrito en el localStorage
const setCart = () => {
    localStorage.setItem("cart", JSON.stringify(cartBody))
}

//Funcion para actualizar en el DOM el numero de cantidad de productos
const updateCartNumber = () => {
    const btnCart = document.getElementById("container-cart")
    let ls = localStorage.cart
    let data
    let price = []
    let quantity = []
    let element = ``
    if (ls === undefined) {
        return 0
    } else {
        data = JSON.parse(ls)
        //count += data.products.length
        data.products.map((product) => {
            price.push(product.product.price * product.quantity)
            quantity.push(product.quantity)
        })
        let total = price.reduce((acc, currentValue) => acc + currentValue, 0);
        let count = quantity.reduce((acc, currentValue) => acc + currentValue, 0)

        element += `
        <h1>LISTA DE PRODUCTOS</h1>
        <a href="/carts/${data.cartId}" class="btn-cart" id="btn-cart">
            <div>🛒</div>
            <p  class="counter">${count}</p>
            <p  class="total">$${total}</p>
        </a>
        `
        return btnCart.innerHTML = element
    }
}


//Funcion creada para setear el perfil del usuario


btnAdd.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        const ul = e.target.closest('ul')

        const productId = ul.dataset.id

        let cartId = getCartId()
        let products = []

        if (cartId === undefined) {

            await fetch(`/api/carts`, {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' }

            }).then(res => res.json()).then(data => {

                const { id } = data

                cid = id

                updateCart(cid, products)

                setCart();

                Toastify({
                    text: `CARRITO N°: ${cid} creado con exito `,
                    duration: 3000,
                    className: "info",
                    close: true,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast()
            }).catch((error) => {

                if (error) {

                    Toastify({
                        text: `Error al crear un carrito`,
                        duration: 3000,
                        className: "info",
                        close: true,
                        gravity: "top",
                        position: "center",
                        stopOnFocus: true,
                        style: {
                            background: "linear-gradient(to left, #b00017, #5e1f21)"
                        }
                    }).showToast();

                }
            })
        }

        cartId = await getCartId()

        await fetch(`/api/carts/${cartId}/product/${productId}`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }),

        }).then(res => res.json()).then(data => {

            updateCart(cartId, data.data.products)

            setCart()

            updateCartNumber()

            Toastify({
                text: `Agregado exitosamente!`,
                duration: 3000,
                className: "info",
                close: true,
                gravity: "bottom",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }

            }).showToast()

        }).catch((error) => {
            if (error) {

                Toastify({
                    text: 'Error al agregar el producto al carrito',
                    className: "success",
                    close: true,
                    gravity: "bottom",
                    position: "center",
                    style: {
                        background: "linear-gradient(to left, #b00017, #5e1f21)",
                    }
                }).showToast();

            }
        })
    })
})

