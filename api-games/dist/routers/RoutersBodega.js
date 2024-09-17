"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerBodegaProductos_1 = require("../controllers/ControllerBodegaProductos");
const router = (0, express_1.Router)();
//customers
router.get("/:username", ControllerBodegaProductos_1.productosBodega);
exports.default = router;
