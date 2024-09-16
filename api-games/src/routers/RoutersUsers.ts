import { Router } from "express";
import { createUser, getUsers, searchUser, updateUser } from "../controllers/ControllerUsers";

const router = Router();

//usuarios
router.get("/", getUsers);
router.get("/:username/:password", searchUser)
router.post("/", createUser)
router.put("/:username", updateUser)

export default router;
