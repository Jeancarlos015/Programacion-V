import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import materiasRoutes from "./routes/materias.routes.js";
import recordatorioRoutes from "./routes/recordatorio.routes.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import { attachTemporaryUser } from "./middlewares/request-context.middleware.js";
    
const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(attachTemporaryUser);

// Rutas
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/materias", materiasRoutes);
app.use("/api/v1/recordatorios", recordatorioRoutes);

// Alias para que tu frontend viejo siga funcionando
app.use("/api/materias", materiasRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/recordatorios", recordatorioRoutes);

// Ruta raíz para probar
app.get("/", (req, res) => {
  res.json({ success: true, message: "StudentFlow API corriendo" });
});

// Handlers de error (siempre al final)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
