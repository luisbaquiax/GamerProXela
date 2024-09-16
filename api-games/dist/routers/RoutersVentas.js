"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerVenta_1 = require("../controllers/ControllerVenta");
const ControllerVentaProductos_1 = require("../controllers/ControllerVentaProductos");
const router = (0, express_1.Router)();
//ventas y productos por venta
router.get("/:codigoSucursal", ControllerVenta_1.getVentasPorSucursal);
router.get("/ventaProducto/:codigoVenta", ControllerVentaProductos_1.productosPorVenta);
exports.default = router;
