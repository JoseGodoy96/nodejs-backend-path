/*
Mini-Challenge (ES):
- Crea un servidor Express modularizado:
	1. Rutas CRUD completas para "/users" con GET, POST, PUT, DELETE.
	2. Middleware para parsear JSON.
	3. Devuelve errores 404 si el usuario no existe.
	4. Mantén los usuarios en un array en memoria.

Mini-Challenge (EN):
- Create a modularized Express server:
	1. Full CRUD routes for "/users" with GET, POST, PUT, DELETE.
	2. Middleware to parse JSON.
	3. Return 404 errors if user does not exist.
	4. Keep users in an in-memory array.
*/

import express from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
	{ id: 1, name: "Jose", email: "jose@example.com" },
	{ id: 2, name: "Ana", email: "ana@example.com" },
	{ id: 3, name: "Luis", email: "luis@example.com" }
];

app.get("/users", (req, res) => {
	res.json(users);
});

app.get("/users/:id", (req, res) => {
	const user = users.find(u => u.id === Number(req.params.id));
	if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
	res.json(user);
});

app.post("/users", (req, res) => {
	const { name, email } = req.body;
	const newUser = { id: users.length + 1, name, email };
	users.push(newUser);
	res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
	const userIndex = users.findIndex(u => u.id === Number(req.params.id));
	if (userIndex === -1) return res.status(404).json({ error: "Usuario no encontrado" });

	const { name, email } = req.body;
	users[userIndex] = { ...users[userIndex], name, email };
	res.json(users[userIndex]);
});

app.delete("/users/:id", (req, res) => {
	const userIndex = users.findIndex(u => u.id === Number(req.params.id));
	if (userIndex === -1) return res.status(404).json({ error: "Usuario no encontrado" });

	const deletedUser = users.splice(userIndex, 1);
	res.json(deletedUser[0]); 
});

app.use((req, res) => res.status(404).send("404 - No encontrada"));

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});