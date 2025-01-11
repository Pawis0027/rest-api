# Usar una imagen base oficial de Node.js
FROM node:18-alpine

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package.json package-lock.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto donde corre la API
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
