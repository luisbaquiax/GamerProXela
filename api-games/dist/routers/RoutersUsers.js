"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerUsers_1 = require("../controllers/ControllerUsers");
const router = (0, express_1.Router)();
//usuarios
router.get("/", ControllerUsers_1.getUsers);
router.get("/searchUser/:username", ControllerUsers_1.searchByUsername);
router.get("/:username/:password", ControllerUsers_1.searchUser);
router.post("/", ControllerUsers_1.createUser);
router.put("/:username", ControllerUsers_1.updateUser);
exports.default = router;
