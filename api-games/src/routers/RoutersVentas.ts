import { Router } from "express";
import { getVentasPorSucursal } from "../controllers/ControllerVenta";
import { productosPorVenta } from "../controllers/ControllerVentaProductos";

const router = Router();

//ventas y productos por venta
router.get("/:codigoSucursal", getVentasPorSucursal);
router.get("/ventaProducto/:codigoVenta", productosPorVenta);


export default router;