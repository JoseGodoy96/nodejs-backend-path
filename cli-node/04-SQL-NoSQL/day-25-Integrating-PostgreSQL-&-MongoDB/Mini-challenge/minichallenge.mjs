/*
Mini-Challenge (ES):
- Crear API REST en Node.js que maneje "users" y "posts".
- "users" → PostgreSQL, "posts" → MongoDB.
- Implementar rutas CRUD:
	1. Listar todos los usuarios (PostgreSQL)
	2. Listar todos los posts (MongoDB)
	3. Insertar nuevo usuario y post
	4. Actualizar usuario y post
	5. Eliminar usuario y post

Mini-Challenge (EN):
- Create a REST API in Node.js handling "users" and "posts".
- "users" → PostgreSQL, "posts" → MongoDB.
- Implement CRUD routes:
	1. List all users (PostgreSQL)
	2. List all posts (MongoDB)
	3. Insert a new user and post
	4. Update a user and a post
	5. Delete a user and a post
*/

import express from 'express';
import usersRouter from './routes/users.mjs';
import postsRouter from './routes/posts.mjs';
import { connectMongo } from './db/mongo.mjs';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
	res.send("Bienvenido al uso de MongoDB y PostgreSQL");
});

app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Error interno del servidor' });
});

async function startServer() {
	await connectMongo();
	app.listen(PORT, () => console.log(`Servidor activo en http://localhost:${PORT}`));
}

startServer();
