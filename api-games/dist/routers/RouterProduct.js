"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerProducto_1 = require("../controllers/ControllerProducto");
const router = (0, express_1.Router)();
//customers
router.get("/", ControllerProducto_1.getProducts);
router.post("/insert", ControllerProducto_1.insertProduct);
exports.default = router;
