import { Router } from "express";
import { getTop10Clientes, getTop10Productos, getTop10Ventas, getTopSucursales } from "../controllers/ControllerReporteAdmin";

const router = Router();

//customers
router.get("/:fecha1/:fecha2", getTop10Ventas);
router.get("/topSucursales", getTopSucursales);
router.get("/topArticulos", getTop10Productos);
router.get("/topClientes", getTop10Clientes);

export default router;