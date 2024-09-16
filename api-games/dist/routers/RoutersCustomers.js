"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerCustomers_1 = require("../controllers/ControllerCustomers");
const router = (0, express_1.Router)();
//customers
router.get("/", ControllerCustomers_1.getCustomers);
exports.default = router;
