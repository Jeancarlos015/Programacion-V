import { Router } from "express";
import * as materiasController from "../controllers/materias.controller.js";

const router = Router();

// Listar todas
router.get("/", materiasController.listMaterias);

// NUEVO - CLASE 5 - Tareas por materia
router.get("/:id/tareas", materiasController.getTareasPorMateria);

// Obtener una por ID
router.get("/:id", materiasController.getMateria);

// Crear
router.post("/", materiasController.createMateria);

// Reemplazar (PUT)
router.put("/:id", materiasController.replaceMateria);

// Actualizar parcial (PATCH)
router.patch("/:id", materiasController.updateMateria);

// Eliminar
router.delete("/:id", materiasController.deleteMateria);

export default router;
