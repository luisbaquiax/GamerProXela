"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerSucursalProductos_1 = require("../controllers/ControllerSucursalProductos");
const router = (0, express_1.Router)();
//usuarios
router.get("/:username", ControllerSucursalProductos_1.getSucursalProductos);
exports.default = router;
