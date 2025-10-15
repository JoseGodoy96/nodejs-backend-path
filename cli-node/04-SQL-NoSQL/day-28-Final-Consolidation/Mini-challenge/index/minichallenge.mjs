/*
Mini-Challenge (ES):
- Construir una API completa con Express + PostgreSQL + MongoDB + Docker.
- Endpoints:
	- /users → CRUD PostgreSQL
	- /posts → CRUD MongoDB
- Validaciones con Joi o función personalizada.
- Ejecutable con un solo comando: `docker-compose up --build`.

Mini-Challenge (EN):
- Build a complete API with Express + PostgreSQL + MongoDB + Docker.
- Endpoints:
	- /users → CRUD PostgreSQL
	- /posts → CRUD MongoDB
- Validations using Joi or custom logic.
- Run with a single command: `docker-compose up --build`.
*/

import express from 'express';
import userRouter from '../routes/users.mjs';
import postRouter from '../routes/posts.mjs';
import { connectMongo } from '../db/mongo.mjs';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}, ${req.method}, ${req.url}]`);
	next();
});

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
	res.send("Bienvenido al nuevo miniproyecto con docker");
});

app.use((req, res) => {
	res.status(404).json({error: "Ruta no encontrada"});
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({error: "Error interno del servidor"});
});


async function startServer () {
	await connectMongo();
	app.listen(PORT, () => {
	console.log(`El servidor esta activo en http://localhost:${PORT}`);
	});
}

startServer();