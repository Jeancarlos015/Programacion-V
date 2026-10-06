import * as materiasService from "../services/materias.service.js";
import { sendSuccess } from "../utils/api-response.js";
import { validateMateriaId } from "../validators/materias.validator.js";

export async function listMaterias(request, response, next) {
  try {
    const result = await materiasService.listMaterias(request.user?.id || request.user_id, request.query);
    return sendSuccess(response, result.data, 200, result.meta);
  } catch (error) { return next(error); }
}

export async function getMateria(request, response, next) {
  try {
    const materia = await materiasService.getMateriaById(request.params.id, request.user?.id || request.user_id);
    return sendSuccess(response, materia);
  } catch (error) { return next(error); }
}

export async function createMateria(request, response, next) {
  try {
    const materia = await materiasService.createMateria(request.user?.id || request.user_id, request.body);
    return sendSuccess(response, materia, 201);
  } catch (error) { return next(error); }
}

export async function replaceMateria(request, response, next) {
  try {
    const materia = await materiasService.replaceMateria(request.params.id, request.user?.id || request.user_id, request.body);
    return sendSuccess(response, materia, 200);
  } catch (error) { return next(error); }
}

export async function updateMateria(request, response, next) {
  try {
    const materia = await materiasService.updateMateria(request.params.id, request.user?.id || request.user_id, request.body);
    return sendSuccess(response, materia, 200);
  } catch (error) { return next(error); }
}

export async function deleteMateria(request, response, next) {
  try {
    await materiasService.deleteMateria(request.params.id, request.user?.id || request.user_id);
    return sendSuccess(response, { id: request.params.id }, 200);
  } catch (error) { return next(error); }
}

// CLASE 5 
export async function listTareasByMateria(request, response, next) {
  try {
    const id = validateMateriaId(request.params.id);
    const tareas = await materiasService.listTareasByMateria(id, request.user?.id || request.user_id);
    return sendSuccess(response, tareas);
  } catch (error) { return next(error); }
}

export async function listEventosByMateria(request, response, next) {
  try {
    const id = validateMateriaId(request.params.id);
    const eventos = await materiasService.listEventosByMateria(id, request.user?.id || request.user_id);
    return sendSuccess(response, eventos);
  } catch (error) { return next(error); }
}
