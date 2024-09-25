import { Router } from "express";
import { getVentasPorSucursal } from "../controllers/ControllerVenta";
import { detallVenta, productosPorVenta, ventasPorCliente, ventasPorSucursal } from "../controllers/ControllerVentaProductos";

const router = Router();

//ventas y productos por venta
router.get("/:codigoSucursal", getVentasPorSucursal);
router.get("/ventaProducto/:codigoVenta", productosPorVenta);
router.get("/detalleVenta/:codigoVenta", detallVenta);
router.get("/ventasCliente/:nitCliente", ventasPorCliente);
router.get("/ventasSucursal/:codigoSucursal", ventasPorSucursal);   


export default router;