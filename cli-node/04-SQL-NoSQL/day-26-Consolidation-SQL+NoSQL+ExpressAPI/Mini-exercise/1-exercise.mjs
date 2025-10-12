/*
Ejercicio 1 (ES):
- Crear un proyecto Express que maneje rutas para "users" y "posts".
Exercise 1 (EN):
- Create an Express project handling routes for "users" and "posts".
*/

import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
	console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
	next();
})

app.get("/", (req, res) => {
	res.send("Bienvenido a node.js y express");
});

const routerUsers = express.Router();

routerUsers.get("/", (req, res) => {
	res.send("Ruta de users");
});

app.use("/users", routerUsers);

const routerPosts = express.Router();

routerPosts.get("/", (req, res) => {
	res.send("Ruta de posts");
});

app.use("/posts", routerPosts);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({error: "error interno de servidor"});
});

app.use((req, res) => {
	res.status(404).send("Ruta desconocida");
});

app.listen(PORT, () => {
	console.log(`El servidor esta activo en http://localhost:${PORT}`);
});