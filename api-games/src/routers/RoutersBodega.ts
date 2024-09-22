import { Router } from "express";
import { insertProduct, productosBodega, updateProductoBodega } from "../controllers/ControllerBodegaProductos";

const router = Router();

//customers
router.get("/:username", productosBodega);
router.put("/:codigoBodega/:codigoProducto", updateProductoBodega);
router.post("/insertar", insertProduct);

export default router;