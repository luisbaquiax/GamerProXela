import { Router } from "express";
import { productosInventario } from "../controllers/ControllerInventarioProductos";

const router =  Router();

router.get("/:codigoBodega", productosInventario);

export default router;