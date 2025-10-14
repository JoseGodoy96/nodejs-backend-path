# Imagen base de Node.js (ligera)
FROM node:20-alpine

# Crear carpeta de trabajo dentro del contenedor
WORKDIR /home/txemita/Repositorios/Roadmapbackend/cli-node/04-SQL-NoSQL/day-27-Docker-Deployment/Mini-exercise/1-exercise

# Copiamos todo el código al contenedor
COPY . .

# Instalamos manualmente las dependencias necesarias
RUN npm install express pg mongodb

# Exponemos el puerto de la API
EXPOSE 3000

# Ejecutamos tu archivo principal
CMD ["node", "1-exercise.mjs"]
