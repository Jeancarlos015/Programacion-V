import * as materiasService from "../services/materias.service.js";
import { sendSuccess } from "../utils/api-response.js";
import {
  validateMateriaListQuery,
  validateCreateMateria,
  validateMateriaId,
} from "../validators/materias.validator.js";

export async function listMaterias(request, response, next) {
  try {
    const filters = request.query;
    const result = await materiasService.listMaterias(request.user_id, filters);
    return sendSuccess(response, result.data, 200, result.meta);
  } catch (error) {
    return next(error);
  }
}

export async function getMateria(request, response, next) {
  try {
    const id = request.params.id;
    const materia = await materiasService.getMateriaById(id, request.user_id);
    return sendSuccess(response, materia);
  } catch (error) {
    return next(error);
  }
}

export async function createMateria(request, response, next) {
  try {
    const payload = request.body;
    const materia = await materiasService.createMateria(request.user_id, payload);
    return sendSuccess(response, materia, 201);
  } catch (error) {
    return next(error);
  }
}

export async function replaceMateria(request, response, next) {
  try {
    const id = request.params.id;
    const payload = request.body;
    const materia = await materiasService.replaceMateria(id, request.user_id, payload);
    return sendSuccess(response, materia, 200);
  } catch (error) {
    return next(error);
  }
}

export async function updateMateria(request, response, next) {
  try {
    const id = request.params.id;
    const payload = request.body;
    const materia = await materiasService.updateMateria(id, request.user_id, payload);
    return sendSuccess(response, materia, 200);
  } catch (error) {
    return next(error);
  }
}

export async function deleteMateria(request, response, next) {
  try {
    const id = request.params.id;
    await materiasService.deleteMateria(id, request.user_id);
    return sendSuccess(response, { id }, 200);
  } catch (error) {
    return next(error);
  }
}

export async function getTareasPorMateria(request, response, next) {
  try {
    const idMateria = request.params.id;
    const idUsuario = request.headers['x-user-id'] || request.user_id;
    if (!idUsuario) {
      return response.status(400).json({ error: "Debes pasar el USERID" });
    }
    const tareas = await materiasService.getTareasByMateria(idMateria, idUsuario);
    return sendSuccess(response, tareas, 200);
  } catch (error) {
    return next(error);
  }
}
