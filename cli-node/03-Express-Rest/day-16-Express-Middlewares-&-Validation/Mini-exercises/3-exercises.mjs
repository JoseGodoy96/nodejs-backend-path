/*
Ejercicio 3 (ES):
- Crea una ruta POST "/users" que valide que `name` y `email` existen en el body.
Exercise 3 (EN):
- Create a POST "/users" route that validates that `name` and `email` exist in the body.
*/

import express, { json } from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [];

app.post("/users", (req, res) => {
	const { name, email } = req.body;
	if (!name || !email)
		return res.status(400).json({ error: "Faltan name o email" });
	const newUser = { id: users.length + 1, name, email };
	users.push(newUser);
	res.status(201).json(newUser);
});

app.get("/", (req, res) => {
	res.send("Bienvenido a express.js");
});

app.get("/users", (req, res) => {
	res.json(users);
});

app.use((req, res) => {
	res.status(404).send("404 - No encontrada");
});

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});