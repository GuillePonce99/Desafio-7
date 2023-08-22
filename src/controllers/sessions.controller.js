import UserModel from "../dao/models/users.model.js"

export class sessionsController {

    static session = async (req, res) => {
        try {
            if (req.session?.role === "admin") {

                req.session.firstName = "admin"
                req.session.lastName = "coder"
                req.session.user = "adminCoder@coder.com"
                req.session.role = "admin"

                const admin = {
                    isAdmin: true,
                    counter: req.session.counter++
                }

                return res.status(200).json({ message: "Admin", admin })

            } else {

                const user = await UserModel.findOne({ email: req.session.user })

                const data = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    age: user.age,
                    role: req.session.role,
                    counter: req.session.counter++
                }

                return res.status(200).json({ message: "User", user: data })
            }
        }
        catch (error) {
            res.status(500).json({
                message: "error",
                error: error
            })
            console.log(error);
        }
    }

    static login = async (req, res) => {
        const { email, password } = req.body


        try {
            const user = await UserModel.findOne({ email, password })

            if (email === "adminCoder@coder.com" && password === "adminCod3r123") {

                req.session.user = email
                req.session.role = "admin"
                req.session.counter = 1

                console.log("Welcome Admin");
                return res.status(200).json({ message: "Welcome Admin" })

            } else {
                if (user) {
                    req.session.user = email
                    req.session.role = "usuario"
                    req.session.counter = 1

                    console.log("Welcome User");
                    return res.status(200).json({ message: "Welcome User" })

                } else {

                    return res.status(404).json({ message: "Not Found" })

                }
            }
        }
        catch (error) {
            res.status(500).json({
                message: "error",
                error: error
            })
        }
    }

    static signup = async (req, res) => {
        const { firstName, lastName, age, email, password } = req.body

        try {
            const repetedEmail = await UserModel.findOne({ "email": req.body.email })

            if (repetedEmail) {
                return res.status(404).json({ message: `Ya existe el usuario con el Email: ${req.body.email}` });
            }

            if (age <= 0 || age >= 100) {
                return res.status(404).json({ message: `Ingrese una edad valida` });
            }

            const user = {
                firstName,
                lastName,
                age,
                email,
                password
            }

            const result = await UserModel.create(user)

            res.status(200).json({ message: "USUARIO CREADO", data: result })
        }
        catch (error) {
            res.status(500).json({
                message: "error",
                error: error
            })
        }
    }

    static logout = async (req, res) => {
        req.session.destroy((error) => {
            if (error) {
                res.status(500).send("ERROR")
            } else {
                res.status(200).send("OK")
            }
        })
    }
}