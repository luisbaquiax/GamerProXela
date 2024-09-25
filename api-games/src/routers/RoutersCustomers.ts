import { Router } from "express";
import { createCustomer, getCustomers, getCustomersByEstado, searchCustomer, updateCustomer } from "../controllers/ControllerCustomers";

const router = Router();

//customers
router.get("/", getCustomers);
router.get("/estado/:estado", getCustomersByEstado);
router.post("/", createCustomer);
router.put("/:nit", updateCustomer);
router.get("/:nit", searchCustomer);

export default router;