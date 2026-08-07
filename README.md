# 🚀 Rick & Morty - Proyecto de Despliegues Manuales (GitHub Pages & Render)

Este repositorio recoge la evolución de la práctica de despliegue, pasando de una arquitectura estática (Frontend-Only) a una solución integrada Fullstack (Monolito con Node.js, Express y React), gestionada mediante despliegues manuales controlados.

---

## 🎯 Hitos Conseguidos

1. **Despliegue Estático Manual en GitHub Pages**:
   - Configuración y empaquetado (_build_) de la aplicación SPA de React.
   - Servido de assets estáticos independientes consumiendo directamente la API externa de Rick y Morty.

2. **Migración a Monolito Fullstack con Node.js + Express en Render**:
   - Desarrollo de un servidor Express en TypeScript que asume doble función:
     - **Servidor de Assets**: Entrega la compilación del frontend (`client/dist`).
     - **API REST en Node.js**: Endpoints para consulta (`GET`) y guardado (`POST`) de frases célebres personalizadas por ID.
     - **Fallback SPA**: Gestión de enrutado del lado del cliente (`React Router`) evitando errores 404 al recargar páginas.

3. **Estrategia de Despliegues Manuales**:
   - Desactivación de los despliegues automáticos (**`Auto-Deploy: No`**) en la plataforma Render. El flujo de subida de versiones se ejecuta exclusivamente bajo demanda (_Manual Deploy_ > _Deploy latest commit_).

---

## ⚠️ Problemas Encontrados y Soluciones Aplicadas

### 1. Cambio de Paradigma: Estático (Frontend Only) vs. Fullstack (Express + React)

- **Problema:** En GitHub Pages sólo servíamos código cliente. Al pasar a Render, necesitábamos que el servidor Node.js fuera el responsable tanto de entregar la web como de gestionar los endpoints del backend en el mismo puerto.
- **Solución:** Estructuramos el servidor Express para que levante los recursos estáticos del directorio compilado empleando `express.static()` y capture las rutas globales de la SPA.

### 2. Orden de Rutas en Express e Intercepción del Fallback SPA

- **Problema:** Al consultar la API `/api/character/:id/sentence` devolvía HTML (el `index.html` de React) o un error 404 debido a que el _middleware_ comodín del fallback SPA (`app.get("{*path}", ...)`) interceptaba las peticiones antes de alcanzar los endpoints REST.
- **Solución:** Reorganizamos secuencialmente el archivo del servidor garantizando que **todas las rutas de la API (`/api/...`) se declaren estrictamente ARRIBA** del fallback de la SPA.

### 3. Persistencia de Frases y Conexión Frontend-Backend

- **Problema:** El cliente original realizaba peticiones locales (`http://localhost:3000/characters` vía `json-server`), provocando fallos de conexión inmediata en producción.
- **Solución:**
  1. Adaptamos las peticiones en el cliente combinando la API externa junto a llamadas relativas `/api/character/:id/sentence` dirigidas a nuestro Express.
  2. Implementamos un diccionario en memoria (`bestSentences`) con claves iniciales predefinidas (ej: ID `2` para Morty: _"Aw geez, Rick!"_ o ID `6` para Abadango Cluster Princess: _"Bow down before me, mortals!"_).

---

## 📝 Trazabilidad de Código Comentado (Desarrollo vs. Producción)

Para conservar la visibilidad de cómo operaba la aplicación en entornos locales frente a producción, se ha mantenido el código de desarrollo comentado en los siguientes puntos clave:

### 1. En el Cliente (`client/src/.../character-detail.api.ts`)

- **Código Comentado:** La lógica de consulta y persistencia en local hacia `json-server` usando verbos `axios.patch` / `axios.post`.
- **Código Activo:** El flujo unificado que compone datos del personaje con las llamadas relativas en Render para inyectar/salvar las frases célebres.

### 2. En el Servidor (`server/src/index.ts`)

- **Código Documentado:** Explicaciones paso a paso de las secciones estructurales del monolito:
  1. Resolución de rutas físicas (`fileURLToPath` / `path.resolve` hacia `client/dist`).
  2. Endpoints API REST de consulta y guardado bajo el prefijo `/api`.
  3. Fallback SPA posicionado al cierre para redirigir tráfico no controlado al `index.html`.
  4. Escucha del servidor respetando el puerto dinámico (`process.env.PORT`) provisto por Render.

# 🤖 Rick & Morty - Proyecto de Despliegue Automatizado (GitHub Actions y Arquitectura Distribuida en Render)

Este repositorio contiene la evolución de la práctica hacia una **arquitectura distribuida con automatización CI/CD**.

El frontend de la aplicación se ha migrado para ser servido de forma estática en **GitHub Pages**, mientras que el backend (API REST) sigue operando de manera independiente en **Render**.

---

## 🎯 Hitos de la Práctica

1. **Separación de Servicios (Arquitectura Distribuida)**:
   - **Frontend**: Desacoplado del servidor Express y configurado como una SPA (Single Page Application) estática en GitHub Pages.
   - **Backend**: Alojado en Render, actuando puramente como una API REST para la gestión de los recursos (frases célebres).

2. **Automatización CI/CD con GitHub Actions**:
   - Creación de un flujo de trabajo automatizado (`deploy.yml`) que se dispara tras cualquier evento de `push` o `merge` a la rama `main`.
   - La 'pipeline' se encarga de configurar el entorno de Node.js, instalar las dependencias del cliente, compilar los assets estáticos (`vite build`) y publicar el resultado en la rama de despliegue de GitHub Pages de forma transparente.

3. **Configuración de CORS (Cross-Origin Resource Sharing)**:
   - Integración del middleware `cors` en el servidor Express del backend para permitir explícitamente las peticiones cruzadas provenientes del dominio de producción de GitHub Pages (`*.github.io`).

---

## ⚙️ Ajustes Técnicos Realizados

### 1. Consumo de API con Ruta Absoluta

- **Desafío**: El frontend ya no puede realizar peticiones relativas (`/api/...`) al no estar alojado en el mismo servidor.
- **Solución**: Se ha modificado la capa de datos del cliente (`character-detail.api.ts`) para apuntar dinámicamente a la URL absoluta del Web Service en Render.

### 2. Configuración del Directorio de Trabajo en el Workflow

- **Desafío**: Al tener el proyecto una estructura dividida en subcarpetas, el runner de GitHub Actions no encontraba los archivos en la raíz.
- **Solución**: Se ha configurado el workflow utilizando las directivas `working-directory: ./client` y `cache-dependency-path` para guiar al proceso de instalación y compilación dentro de la subcarpeta del frontend.
