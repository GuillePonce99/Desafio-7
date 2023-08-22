
export const auth = async (req, res, next) => {
    if (req.session?.role === "usuario") {
        console.log("usuarioAuth");
        next()
    } else if (req.session?.role === "admin") {
        console.log("adminAuth");
        next()
    } else {
        res.redirect("/")
    }
}




