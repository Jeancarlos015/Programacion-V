import { pool } from "../config/database.js";

export async function listarRecordatorios(userId) {
  const [rows] = await pool.execute(
    `SELECT
       r.id_recordatorio AS id,
       r.id_tarea AS tareaId,
       r.mensaje,
       r.fecha_hora AS fechaHora,
       r.canal,
       r.leido,
       t.titulo AS tareaTitulo,
       m.nombre AS materiaNombre,
       r.created_at AS createdAt
     FROM recordatorio r
     JOIN tarea t ON t.id_tarea = r.id_tarea
     JOIN materia m ON m.id_materia = t.id_materia
     WHERE m.id_usuario = ?
     ORDER BY r.fecha_hora ASC
     LIMIT 20`,
    [userId]
  );
  return rows;
}

export async function obtenerPorId(id, userId) {
  const [rows] = await pool.execute(
    `SELECT 
       r.id_recordatorio AS id,
       r.id_tarea AS tareaId,
       r.mensaje,
       r.fecha_hora AS fechaHora,
       r.canal,
       r.leido,
       t.titulo AS tareaTitulo,
       m.nombre AS materiaNombre
     FROM recordatorio r
     JOIN tarea t ON t.id_tarea = r.id_tarea
     JOIN materia m ON m.id_materia = t.id_materia
     WHERE r.id_recordatorio = ? AND m.id_usuario = ?`,
    [id, userId]
  );
  return rows[0];
}

export async function crear({ id_tarea, mensaje, fecha_hora }) {
  const [res] = await pool.execute(
    `INSERT INTO recordatorio (id_tarea, mensaje, fecha_hora, canal, leido) 
     VALUES (?, ?, ?, 'in_app', 0)`,
    [id_tarea, mensaje, fecha_hora]
  );
  return res.insertId;
}

export async function actualizarCompleto(id, { mensaje, fecha_hora, leido }) {
  await pool.execute(
    `UPDATE recordatorio SET mensaje = ?, fecha_hora = ?, leido = ? WHERE id_recordatorio = ?`,
    [mensaje, fecha_hora, leido, id]
  );
}

export async function actualizarCampos(id, campos) {
  const sets = [];
  const valores = [];
  if (campos.mensaje !== undefined) {
    sets.push("mensaje = ?");
    valores.push(campos.mensaje);
  }
  if (campos.fecha_hora !== undefined) {
    sets.push("fecha_hora = ?");
    valores.push(campos.fecha_hora);
  }
  if (campos.leido !== undefined) {
    sets.push("leido = ?");
    valores.push(campos.leido);
  }
  if (sets.length === 0) return;
  valores.push(id);
  await pool.execute(`UPDATE recordatorio SET ${sets.join(", ")} WHERE id_recordatorio = ?`, valores);
}

export async function eliminar(id) {
  await pool.execute(`DELETE FROM recordatorio WHERE id_recordatorio = ?`, [id]);
}
