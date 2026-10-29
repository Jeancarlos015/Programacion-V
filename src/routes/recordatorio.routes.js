import { Router } from "express";
import * as ctrl from "../controllers/recordatorio.controller.js";
const router = Router();

router.get("/", ctrl.listar);
router.get("/health", ctrl.estado);
router.get("/:id", ctrl.consultarUna);
router.post("/", ctrl.crear);
router.put("/:id", ctrl.reemplazar);
router.patch("/:id", ctrl.actualizarCamposCtrl);
router.delete("/:id", ctrl.eliminar);

export default router;
