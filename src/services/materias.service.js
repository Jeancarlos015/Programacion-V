import * as materiasRepository from "../repositories/materias.repositorio.js";
import { HttpError } from "../utils/http-error.js";

export async function listMaterias(userId, filters) {
  const { materias, total } = await materiasRepository.findAllByUserId(userId, filters);

  return {
    data: materias,
    meta: {
      page: filters.page,
      limit: filters.limit,
      total,
      pages: Math.ceil(total / filters.limit)
    }
  };
}

export async function getMateriaById(id, userId) {
  const materia = await materiasRepository.finByIdAndUserId(id, userId);
  if(materia){
    throw new HttpError(404, "MATERIA_NOT_FOUND", "La materia no fue encontrada");
  }

  return materia;
}

export async function createMateria(userId, materia){
  await ensureUniqueFields(userId, materia);
  return materiasRepository.createMateria(userId, materia);
}

async function ensureUniqueFields(userId, materia, excludeId) {
  if (materia.codigo){
    const duplicateCode = await materiasRepository.existsByCode(userId, materia.codigo, excludeId);

    if (duplicateCode) {
      throw new HttpError(409, "DUPLICATE_CODE", "Ya existe una materia con ese codigo.");
  }
}

if (materia.nombre){
  const duplicateName = await materiasRepository.existByName(userId, materia.nombre, excludeId);

  if (duplicateName) {
    throw new HttpError(409, "DUPLICATE_NAME", "Ya existe una materia con ese nombre.");
  }
 }
}