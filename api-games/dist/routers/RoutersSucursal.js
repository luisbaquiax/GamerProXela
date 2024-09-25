"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerSucursalProductos_1 = require("../controllers/ControllerSucursalProductos");
const ControllerSucursalUsuarios_1 = require("../controllers/ControllerSucursalUsuarios");
const ControllerSucursales_1 = require("../controllers/ControllerSucursales");
const router = (0, express_1.Router)();
//usuarios
router.get("/list", ControllerSucursales_1.listSucursales);
router.get("/:username", ControllerSucursalProductos_1.getSucursalProductos);
router.get("/search/:username", ControllerSucursalUsuarios_1.getSucursalByUser);
router.get("/sucursalProducto/:codigoSucursal/:codigoProducto", ControllerSucursalProductos_1.search);
router.put("/sucursalUpdateProducto/:codigoSucursal/:codigoProducto", ControllerSucursalProductos_1.updateProductoSucursal);
router.post("/insert", ControllerSucursalProductos_1.createProductoSucursal);
router.post("/createUser", ControllerSucursalUsuarios_1.createUserSucursal);
exports.default = router;
