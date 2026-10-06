import * as materiasRepository from "../repositories/materias.repositorio.js";
import { HttpError } from "../utils/http-error.js";

export async function listMaterias(userId, filters) {
  const { materias, total } = await materiasRepository.findAllByUserId(userId, filters);
  return {
    data: materias,
    meta: { page: filters.page, limit: filters.limit, total, pages: Math.ceil(total / filters.limit) }
  };
}

export async function getMateriaById(id, userId) {
  const materia = await materiasRepository.findByIdAndUserId(id, userId);
  if (!materia) throw new HttpError(404, "MATERIA_NOT_FOUND", "La materia no fue encontrada");
  return materia;
}

export async function createMateria(userId, materia) {
  await ensureUniqueFields(userId, materia);
  return materiasRepository.createMateria(userId, materia);
}
export async function replaceMateria(id, userId, materia) {
  await ensureUniqueFields(userId, materia, id);
  return materiasRepository.replaceMateria(id, userId, materia);
}
export async function updateMateria(id, userId, materia) {
  await ensureUniqueFields(userId, materia, id);
  return materiasRepository.updateMateria(id, userId, materia);
}
export async function deleteMateria(id, userId) {
  return materiasRepository.deleteMateria(id, userId);
}

async function ensureUniqueFields(userId, materia, excludeId) {
  if (materia.codigo) {
    const dup = await materiasRepository.existsByCode(userId, materia.codigo, excludeId);
    if (dup) throw new HttpError(409, "DUPLICATE_CODE", "Ya existe una materia con ese codigo.");
  }
  if (materia.nombre) {
    const dup = await materiasRepository.existsByName(userId, materia.nombre, excludeId);
    if (dup) throw new HttpError(409, "DUPLICATE_NAME", "Ya existe una materia con ese nombre.");
  }
}

// CLASE 5
export async function listTareasByMateria(id, userId) {
  return materiasRepository.findTareasByMateriaAndUserId(id, userId);
}
export async function listEventosByMateria(id, userId) {
  return materiasRepository.findEventosByMateriaAndUserId(id, userId);
}
