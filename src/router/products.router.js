import { Router } from "express";
import { productsController } from "../controllers/product.controller.js"

//import ProductManager from "../manager/ProductManager.js"

const router = Router()
/*

//FS

let miProducto = new ProductManager.ProductManager("productos.json")

router.get("/", async (req, res) => {
    const productos = await miProducto.getProducts()
    const { limit } = req.query
    const response = await productos.slice(0, limit)
    try {
        if (limit) {
            res.json(response)
        } else {
            res.json(productos)
        }
    }
    catch (err) {
        res.status(err.statusCode).send(` ${err}`);
    }
})


router.get("/:pid", async (req, res) => {
    const { pid } = req.params

    try {
        res.send(await miProducto.getProductsById(Number(pid)))
    }
    catch (err) {
        res.status(err.statusCode).send(` ${err}`);
    }
})


router.post("/", async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(401).json({ message: "Faltan datos" });
    }
    if (!thumbnails) {
        req.body.thumbnail = "";
    }
    if (status === undefined) {
        req.body.status = true
    }

    req.body.code = req.body.code.toString()
    try {
        await miProducto.addProduct(req.body)
        res.json({ status: 200, mensaje: "PRODUCTO CARGADO EXITOSAMENTE", data: req.body })
    }
    catch (err) {
        res.status(err.statusCode).send(` ${err}`);
    }
})

router.put("/", (req, res) => {
    res.json({ status: 400, mensaje: "INGRESE EL ID DEL PRODUCTO A MODIFICAR" })
})

router.put("/:pid", async (req, res) => {
    const { pid } = req.params
    if (req.body.code) {
        req.body.code = req.body.code.toString()
    }

    try {
        await miProducto.updateProduct(Number(pid), req.body),
            res.json({ status: 200, mensaje: "PRODUCTO ACTUALIZADO CORRECTAMENTE", data: req.body })
    }
    catch (err) {
        res.status(err.statusCode).send(` ${err}`);
    }
})

router.delete("/", (req, res) => {
    res.json({ status: 400, mensaje: "INGRESE EL ID DEL PRODUCTO A ELIMINAR " })
})

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params

    try {
        await miProducto.deleteProduct(Number(pid)),
            res.json({ status: 200, mensaje: "PRODUCTO ELIMINADO" })
    }
    catch (err) {
        res.status(err.statusCode).send(` ${err}`);
    }
})
*/

//DB

router.get("/", productsController.getProducts)

router.get("/:pid", productsController.getProductById)

router.post("/", productsController.addProduct)

router.delete("/:pid", productsController.deleteProduct)

router.put("/:pid", productsController.updateProduct)


export default router