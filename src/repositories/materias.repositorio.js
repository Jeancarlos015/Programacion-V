import { pool } from "../config/database.js";

const sortableFields = {
    id: "m.id_materia",
    nombre: "m.nombre",
    codigo: "m.codigo",
    creditos: "m.creditos",
    color: "m.color",
    activa: "m.activa",
    createdAt : "m.created_at",
    updatedAt: "m.updated_at"
};

function normalizeSort(sort, order){
    const column = sortableFields[sort] || sortableFields.nombre;
    const direction = String(order).toLocaleLowerCase === "desc" ? "DESC": "ASC";

    return `${column} ${direction}`
}

function mapMateria(row) {
    return {
        id: row.id,
        nombre: row.nombre,
        codigo: row.codigo,
        creditos: row.creditos,
        color: row.color,
        activa: row.activa,
        createdAt : row.created_at,
        updatedAt : row.created_at       
    };
}

export async function findAllByUserId(userId, filters = {}) {
  const conditions = ["m.id_usuario = ?"];
  const params = [userId];

  if (typeof filters.activa === "boolean") {
    conditions.push("m.activa = ?");
    params.push(filters.activa ? 1 : 0);
  }

  if (filters.search) {
    conditions.push("(m.nombre LIKE ? OR m.codigo LIKE ?)");
    params.push(`%${filters.search}%`, `%${filters.search}%`);
  }

  const [countRows] = await pool.execute(
    `SELECT COUNT(*) AS total
     FROM materia m
     WHERE ${conditions.join(" AND ")}`,
    params
  );

  const orderBy = normalizeSort(filters.sort, filters.order);
  const limit = filters.limit;
  const offset = (filters.page - 1) * limit;

  const [rows] = await pool.execute(
    `SELECT
       m.id_materia AS id,
       m.id_usuario AS usuarioId,
       m.nombre,
       m.codigo,
       m.color,
       m.creditos,
       m.activa,
       m.created_at AS createdAt,
       m.updated_at AS updatedAt
     FROM materia m
     WHERE ${conditions.join(" AND ")}
     ORDER BY ${orderBy}
     LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  return {
    materias: rows.map(mapMateria),
    total: countRows[0].total
  };
}

export async function finByIdAndUserId(id, userId) {
  const [rows] = await pool.execute(
    `SELECT
       m.id_materia AS id,
       m.id_usuario AS usuarioId,
       m.nombre,
       m.codigo,
       m.color,
       m.creditos,
       m.activa,
       m.created_at AS createdAt,
       m.updated_at AS updatedAt
     FROM materia m
     WHERE m.id_materia = ? AND m.id_usuario = ?`,
    [id, userId]
  );

  return rows[0] ? mapMateria(rows[0]) : null; 
}

export async function createMateria(userId, materia){
  cons [result] = await pool.execute(
    `INSERT INTO materia (id_usuario, nombre, codigo, color, credistos, activa)
    VALUES(?, ?, ?, ?, ?, ?)`,
    [
      userId,
      materia.nombre,
      materia.codigo,
      materia.color,
      materia.creditos,
      materia.activa ? 1 : 0
    ]
  );
  return finByIdAndUserId(result.insertId, userId);
}