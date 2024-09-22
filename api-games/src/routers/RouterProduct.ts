import { Router } from "express";
import { getProducts, insertProduct } from "../controllers/ControllerProducto";

const router = Router();

//customers
router.get("/", getProducts);
router.post("/insert", insertProduct);

export default router;