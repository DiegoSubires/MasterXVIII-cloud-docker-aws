# ==========================================
# ETAPA 1: Compilación del Frontend (Client)
# ==========================================
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# ==========================================
# ETAPA 2: Compilación del Backend (Server)
# ==========================================
FROM node:20-alpine AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ ./
RUN npm run build

# ==========================================
# ETAPA 3: Entorno de Producción Final
# ==========================================
FROM node:20-alpine AS production
WORKDIR /app

# Exponer el puerto que usará Express
EXPOSE 8080

# Copiar solo lo necesario del servidor compilado
COPY --from=server-builder /app/server/dist ./server/dist
COPY --from=server-builder /app/server/package*.json ./server/
COPY --from=server-builder /app/server/node_modules ./server/node_modules

# Copiar el frontend estático generado por Vite al lugar donde Express lo busca
COPY --from=client-builder /app/client/dist ./client/dist

WORKDIR /app/server

# Variable de entorno por defecto para producción
ENV PORT=8080
ENV NODE_ENV=production

# Comando para arrancar la aplicación
CMD ["node", "dist/index.js"]