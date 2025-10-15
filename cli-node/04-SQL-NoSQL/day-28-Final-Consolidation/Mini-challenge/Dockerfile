# Dockerfile
FROM node:20-alpine

WORKDIR /home/txemita/Repositorios/Roadmapbackend/cli-node/04-SQL-NoSQL/day-28-Final-Consolidation/Mini-challenge

# Copiamos todo el proyecto
COPY . .

# Instalamos dependencias
RUN npm install express pg mongodb joi

EXPOSE 3000

CMD ["node", "index/minichallenge.mjs"]
