import { Router } from "express";
import { sessionsController } from "../controllers/sessions.controller.js";
const router = Router()

//Ruta para obtener el usuario de la sesion actual
router.get("/", sessionsController.session)

//Ruta para comprobar en base de datos si el usuario existe o si es un admin y setearlo a su respectiva sesion
router.post("/login", sessionsController.login)

//Ruta para crear un usuario en base de datos
router.post("/signup", sessionsController.signup)

//Ruta para eliminar la sesion actual
router.get("/logout", sessionsController.logout)

export default router