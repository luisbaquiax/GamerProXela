import { Router } from "express";
import { createUser, getUsers, searchByUsername, searchUser, updateUser } from "../controllers/ControllerUsers";

const router = Router();

//usuarios
router.get("/", getUsers);
router.get("/searchUser/:username", searchByUsername);
router.get("/:username/:password", searchUser)
router.post("/", createUser)
router.put("/:username", updateUser)

export default router;
