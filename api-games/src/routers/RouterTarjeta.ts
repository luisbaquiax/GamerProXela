import { Router } from "express"
import { createSolicitud, createTarjeta, getSolicitudById, getTarjetaByClient, listSolicitudes, listTarjetas, updateSolicitud, updateTarjeta } from "../controllers/ControllerTarjeta";

const router = Router();

router.post("/solicitud", createSolicitud);
router.get("/list", listSolicitudes);
router.put("/solicitud/:id", updateSolicitud);
router.get("/solicitud/:id", getSolicitudById);
router.post("/tarjeta", createTarjeta);
router.put("/tarjeta/:id", updateTarjeta);
router.get("/tarjeta/:nit", getTarjetaByClient);
router.get("/tarjeta/list", listTarjetas);


export default router;