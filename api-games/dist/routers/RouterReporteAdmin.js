"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerReporteAdmin_1 = require("../controllers/ControllerReporteAdmin");
const router = (0, express_1.Router)();
//customers
router.get("/:fecha1/:fecha2", ControllerReporteAdmin_1.getTop10Ventas);
router.get("/topSucursales", ControllerReporteAdmin_1.getTopSucursales);
router.get("/topArticulos", ControllerReporteAdmin_1.getTop10Productos);
router.get("/topClientes", ControllerReporteAdmin_1.getTop10Clientes);
router.get("/historial/:fecha1/:fecha2", ControllerReporteAdmin_1.historalDescuento);
exports.default = router;
