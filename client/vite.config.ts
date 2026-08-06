import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],

  /* 
  ===================================================================
  CONFIGURACIÓN DE LA RUTA BASE (`base`)
  ===================================================================
  
  Opción A: DESPLIEGUE EN GITHUB PAGES
  ------------------------------------
  GitHub Pages aloja tu app en una subruta con el nombre del repositorio:
  `https://tu-usuario.github.io/MasterXVIII-cloud-manual-deploy/`
  Por eso necesita la subruta explícita:
  */
  // base: "/MasterXVIII-cloud-manual-deploy/",

  /*
  Opción B: DESPLIEGUE EN RENDER (O CUALQUIER SERVIDOR PROPIO / DOCKER)
  ---------------------------------------------------------------------
  Render (y la mayoría de PaaS) sirve la aplicación directamente desde la raíz 
  del dominio (`https://tu-app.onrender.com/`). 
  Por eso la ruta base debe ser "/" (o simplemente omitir la propiedad `base`):
  */
  base: "/",

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
