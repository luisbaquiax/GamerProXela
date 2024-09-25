import { Router } from "express";
import { createCustomer, getCustomers, searchCustomer, updateCustomer } from "../controllers/ControllerCustomers";

const router = Router();

//customers
router.get("/", getCustomers);
router.post("/", createCustomer);
router.put("/:nit", updateCustomer);
router.get("/:nit", searchCustomer);

export default router;