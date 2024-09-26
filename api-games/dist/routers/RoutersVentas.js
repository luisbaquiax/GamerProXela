"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerVenta_1 = require("../controllers/ControllerVenta");
const ControllerVentaProductos_1 = require("../controllers/ControllerVentaProductos");
const router = (0, express_1.Router)();
//ventas y productos por venta
router.get("/:codigoSucursal", ControllerVenta_1.getVentasPorSucursal);
router.get("/ventaProducto/:codigoVenta", ControllerVentaProductos_1.productosPorVenta);
router.get("/detalleVenta/:codigoVenta", ControllerVentaProductos_1.detallVenta);
router.get("/ventasCliente/:nitCliente", ControllerVentaProductos_1.ventasPorCliente);
router.get("/ventasSucursal/:codigoSucursal", ControllerVentaProductos_1.ventasPorSucursal);
router.get("/", ControllerVenta_1.getVentas);
router.post("/", ControllerVenta_1.createVenta);
router.post("/addDetalle", ControllerVentaProductos_1.agregarProducto);
router.get("/historialDescuento/historial", ControllerVenta_1.historialDescuetos);
exports.default = router;
