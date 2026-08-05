import express from "express";
import type { Request, Response } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

// Resolución de ruta nativa y multiplataforma (Windows/Linux)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticFilesPath = path.resolve(__dirname, "../../client/dist");

// 1. Middleware estático: Sirve HTML, JS, CSS e imágenes del cliente
app.use(express.static(staticFilesPath));

export interface ResourceItem {
  id: number;
  name: string;
  description: string;
}

// 2. Rutas de la API
app.get("/api/list", (req: Request, res: Response<ResourceItem[]>) => {
  res.json([
    { id: 1, name: "Render", description: "Despliegue PaaS sin Docker" },
    { id: 2, name: "Azure App Service", description: "Despliegue con CI/CD" },
    { id: 3, name: "Amazon EC2", description: "Infraestructura IaaS" },
  ]);
});

// 3. Fallback SPA: Redirige cualquier ruta desconocida al index.html de React
// Por la sintaxis compatible con Express moderno / path-to-regexp v8+:
app.get("{*path}", (req: Request, res: Response) => {
  res.sendFile(path.resolve(staticFilesPath, "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor TS corriendo en http://localhost:${PORT}`);
});
