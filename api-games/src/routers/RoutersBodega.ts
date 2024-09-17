import { Router } from "express";
import { productosBodega } from "../controllers/ControllerBodegaProductos";

const router = Router();

//customers
router.get("/:username", productosBodega);

export default router;