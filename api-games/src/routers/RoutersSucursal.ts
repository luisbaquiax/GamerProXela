import { Router } from "express";
import { getSucursalProductos } from "../controllers/ControllerSucursalProductos";

const router = Router();

//usuarios
router.get("/:username", getSucursalProductos);

export default router;