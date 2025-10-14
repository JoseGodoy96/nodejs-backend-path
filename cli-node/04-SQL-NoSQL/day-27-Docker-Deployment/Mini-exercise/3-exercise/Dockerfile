# Dockerfile
FROM node:20-alpine

WORKDIR /home/txemita/Repositorios/Roadmapbackend/cli-node/04-SQL-NoSQL/day-27-Docker-Deployment/Mini-exercise/3-exercise

RUN npm install express pg mongodb

COPY . .

EXPOSE 3000

CMD ["node", "3-exercise.mjs"]
