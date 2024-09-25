"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerInventarioProductos_1 = require("../controllers/ControllerInventarioProductos");
const router = (0, express_1.Router)();
router.get("/:codigoBodega", ControllerInventarioProductos_1.productosInventario);
exports.default = router;
