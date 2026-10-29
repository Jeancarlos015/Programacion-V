export function attachTemporaryUser(req, res, next) {
  // Usuario temporal para pruebas sin login
  req.user = { id: 1, id_usuario: 1 };
  next();
}

// Alias por si tu app.js usa el otro nombre
export const requestContextMiddleware = attachTemporaryUser;
