import { Router } from "express";
import { createProductoSucursal, getSucursalProductos, search, updateProductoSucursal } from "../controllers/ControllerSucursalProductos";
import { createUserSucursal, getSucursalByUser } from "../controllers/ControllerSucursalUsuarios";
import { listSucursales } from "../controllers/ControllerSucursales";

const router = Router();

//usuarios
router.get("/list", listSucursales);
router.get("/:username", getSucursalProductos);
router.get("/search/:username", getSucursalByUser);
router.get("/sucursalProducto/:codigoSucursal/:codigoProducto", search);
router.put("/sucursalUpdateProducto/:codigoSucursal/:codigoProducto", updateProductoSucursal);
router.post("/insert", createProductoSucursal);
router.post("/createUser", createUserSucursal);

export default router;