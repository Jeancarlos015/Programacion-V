import * as repo from "../repositories/recordatorio.repository.js";

export const listarRecordatorios = (userId) => repo.listarRecordatorios(userId);
export const consultarRecordatorio = (id, userId) => repo.obtenerPorId(id, userId);
export const crearRecordatorio = (data) => repo.crear(data);
export const reemplazarRecordatorio = (id, data) => repo.actualizarCompleto(id, data);
export const actualizarCampos = (id, data) => repo.actualizarCampos(id, data);
export const eliminarRecordatorio = (id) => repo.eliminar(id);
