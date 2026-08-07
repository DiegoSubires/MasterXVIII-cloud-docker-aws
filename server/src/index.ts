import express from "express";
import type { Request, Response } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";

const app = express();

// Middleware necesario al envíar datos en formato JSON desde el cliente (ej. al guardar la frase)
app.use(express.json());

// Middleware necesario al envíar datos de un dominio (Render) a otro distinto (GitHub Pages), dando permsiso explícito.
// Habilitar todas las peticiones CORS para desarrollo y pruebas, para evitar bloqueos iniciales.
app.use(cors());

/* 
===================================================================
1. RESOLUCIÓN DE RUTAS PARA ARCHIVOS ESTÁTICOS (FRONTEND)
===================================================================
- En GitHub Pages: Este código NO SE EJECUTA (GitHub sirve client/dist directamente).
- En Render (Servicio Monolítico Fullstack): Express sirve la app de React (client/dist).
- En Render (Servicios Separados API/Frontend): Si deshabilitas estas líneas, 
  Express solo respondería a las rutas de /api.
*/

// Obtenemos __dirname compatible con ES Modules (type: "module")
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Apuntamos a la carpeta estática construida por Vite ( client/dist )
const staticFilesPath = path.resolve(__dirname, "../../client/dist");

// Sirve los assets estáticos (JS, CSS, imágenes) creados en el build del frontend
app.use(express.static(staticFilesPath));

/* 
===================================================================
2. RUTAS DE LA API (BACKEND)
===================================================================
Funciona igual en desarrollo local y en el Web Service de Render.
*/
export interface ResourceItem {
  id: number;
  name: string;
  description: string;
}

app.get("/api/list", (req: Request, res: Response<ResourceItem[]>) => {
  res.json([
    { id: 1, name: "Render", description: "Despliegue PaaS sin Docker" },
    { id: 2, name: "Azure App Service", description: "Despliegue con CI/CD" },
    { id: 3, name: "Amazon EC2", description: "Infraestructura IaaS" },
  ]);
});

/* 
===================================================================
3. FALLBACK SPA (SOPORTE PARA CLIENT-SIDE ROUTING / REACT ROUTER)
===================================================================
- En Render (Monolito): Si la petición no es a la API ni a un asset estático,
  devuelve el index.html de React para que React Router capture la ruta.
- Nota de Sintaxis: En Express 5+, se usa "{*path}" o "(.*)" para capturar todo.
*/

// ==========================================
// RUTAS DE LA API (FRASES Y PERSONAJES)
// ==========================================

// Simulación de base de datos en memoria o consulta
let bestSentences: Record<string, string> = {
  "1": "Wubba Lubba Dub Dub!",
  "2": "Aw geez, Rick!",
  "3": "I just want to die!",
  "4": "I'm a heart surgeon, I save lives!",
  "5": "Hungry for Apples",
  "6": "Bow down before me, mortals!",
};

// Endpoint para obtener la frase célebre
app.get("/api/character/:id/sentence", (req: Request, res: Response) => {
  const id = String(req.params.id);
  const sentence = bestSentences[id] || "";
  res.json({ sentence });
});

// Endpoint para guardar/actualizar la frase célebre
app.post("/api/character/:id/sentence", (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { sentence } = req.body;
  bestSentences[id] = sentence;
  res.json({ success: true, sentence });
});

// Fallback SPA, para React Router, al final de las rutas
app.get("{*path}", (req: Request, res: Response) => {
  res.sendFile(path.resolve(staticFilesPath, "index.html"));
});

/* 
===================================================================
4. INICIALIZACIÓN DEL SERVIDOR
===================================================================
- Render asigna automáticamente una variable de entorno `process.env.PORT` (ej. 10000).
- En local usará el puerto por defecto (8080).
*/
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor TS corriendo en http://localhost:${PORT}`);
});
