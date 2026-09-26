# StudentFlow Backend

Backend base en Node.js + Express + MySQL para el proyecto StudentFlow.

## Requisitos previos

* **Node.js** instalado
* **MySQL** corriendo (por ejemplo, vía XAMPP)
* Base de datos `studentflow` creada con los scripts de la carpeta `BD`

## Cómo arrancar

1. Copiar `.env.example` a `.env` y ajustar las credenciales locales.
2. Instalar dependencias: `npm install`
3. Iniciar en modo desarrollo: `npm run dev`
4. Verificar que responde: `http://localhost:3000/api/v1/health`

## Estructura

```
src/
  config/         Conexión a MySQL
  controllers/    Lógica que responde cada endpoint
  routes/         Definición de rutas
  middlewares/    Middlewares (usuario temporal, errores)
  repositories/   Acceso a datos (por implementar)
  services/       Lógica de negocio (por implementar)
  validators/     Validaciones de entrada (por implementar)
  utils/          Utilidades (respuestas estandarizadas)
  app.js          Instancia de Express
  server.js       Punto de arranque
```

