import { Router } from "express";
import { createVenta, getVentas, getVentasPorSucursal, historialDescuetos } from "../controllers/ControllerVenta";
import { agregarProducto, detallVenta, productosPorVenta, ventasPorCliente, ventasPorSucursal } from "../controllers/ControllerVentaProductos";

const router = Router();

//ventas y productos por venta
router.get("/:codigoSucursal", getVentasPorSucursal);
router.get("/ventaProducto/:codigoVenta", productosPorVenta);
router.get("/detalleVenta/:codigoVenta", detallVenta);
router.get("/ventasCliente/:nitCliente", ventasPorCliente);
router.get("/ventasSucursal/:codigoSucursal", ventasPorSucursal);
router.get("/",getVentas);  
router.post("/",createVenta);
router.post("/addDetalle", agregarProducto) 
router.get("/historialDescuento/historial", historialDescuetos);  


export default router;