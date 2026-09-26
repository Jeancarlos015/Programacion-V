import * as materiasRepository from "../repositories/materias.repository.js";
import { pool } from "../config/database.js";
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
  const materia = await materiasRepository.findByIdAndUserId(id, userId);
  if (!materia) {
    throw new HttpError(404, "MATERIA_NOT_FOUND", "La materia no fue encontrada");
  }
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

/**
 * Valida que el codigo y el nombre sean unicos por usuario
 * @async
 * @function ensureUniqueFields
 * @param {string|number} userId - ID del usuario
 * @param {Object} materia - Datos de la materia
 * @param {string|number} [excludeId] - ID a excluir en la validacion
 * @returns {Promise<void>}
 * @throws {HttpError} 409 si hay duplicado
 */
async function ensureUniqueFields(userId, materia, excludeId) {
  if (materia.codigo) {
    const duplicatedCode = await materiasRepository.existsByCode(userId, materia.codigo, excludeId);
    if (duplicatedCode) {
      throw new HttpError(409, "DUPLICATE_CODE", "Ya existe una materia con ese codigo.");
    }
  }
  if (materia.nombre) {
    const duplicatedName = await materiasRepository.existsByName(userId, materia.nombre, excludeId);
    if (duplicatedName) {
      throw new HttpError(409, "DUPLICATE_NAME", "Ya existe una materia con ese nombre.");
    }
  }
}

/**
 * CLASE 5 - Obtiene todas las tareas de una materia especifica
 * @async
 * @function getTareasByMateria
 * @param {number} idMateria - ID de la materia
 * @param {number} idUsuario - ID del usuario (USERID obligatorio)
 * @returns {Promise<Array>} Lista de tareas filtradas
 */
export async function getTareasByMateria(idMateria, idUsuario) {
  const [rows] = await pool.query(
    'SELECT * FROM tarea WHERE id_materia =? AND id_usuario =? ORDER BY fecha_entrega ASC',
    [idMateria, idUsuario]
  );
  return rows;
}
