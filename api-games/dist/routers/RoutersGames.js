"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerUsers_1 = require("../controllers/ControllerUsers");
const ControllerVenta_1 = require("../controllers/ControllerVenta");
const router = (0, express_1.Router)();
//usuarios
router.get("/", ControllerUsers_1.getUsers);
router.get("/:username/:password", ControllerUsers_1.searchUser);
router.post("/", ControllerUsers_1.createUser);
router.put("/:username", ControllerUsers_1.updateUser);
//ventas
router.get("/:codigoSucursal", ControllerVenta_1.getVentasPorSucursal);
exports.default = router;
