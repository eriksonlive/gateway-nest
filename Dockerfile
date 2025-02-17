# Usa una imagen oficial de Node (puedes usar la versión LTS o la que prefieras)
FROM node:22-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias (puedes usar --production si no necesitas instalar dependencias de desarrollo)
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto en el que corre la aplicación (ajusta según el microservicio)
EXPOSE 3000

# Comando para iniciar la aplicación (asegúrate de que en package.json tengas un "start" definido)
CMD ["npm", "start"]
