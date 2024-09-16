import { Router } from "express";
import { getCustomers } from "../controllers/ControllerCustomers";

const router = Router();

//customers
router.get("/", getCustomers);

export default router;