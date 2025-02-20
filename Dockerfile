# -----------------------------
# Etapa 1: Build de la aplicación Nest
# -----------------------------
    FROM node:22-alpine AS builder
    WORKDIR /app
    
    # Copia los archivos de configuración de dependencias
    COPY package*.json ./
    
    # Instala las dependencias (puedes incluir --production en la imagen final)
    RUN npm install
    
    # Copia el resto de la fuente del proyecto
    COPY . .
    
    # Ejecuta el proceso de build (asegúrate de que en package.json tengas un script "build" que genere la carpeta dist)
    RUN npm run build
    
    # -----------------------------
    # Etapa 2: Imagen de producción para la aplicación Nest
    # -----------------------------
    FROM node:22-alpine
    WORKDIR /app
    
    # Copia los archivos de configuración de dependencias
    COPY package*.json ./
    
    # Instala solo las dependencias de producción
    RUN npm install --production
    
    # Copia el código compilado de la etapa anterior
    COPY --from=builder /app/dist ./dist
    
    # Expone el puerto en el que corre la aplicación Nest (ajusta si es necesario)
    EXPOSE 3000
    
    # Comando para iniciar la aplicación (asegúrate de que dist/main.js sea el punto de entrada)
    CMD ["node", "dist/main.js"]
    
