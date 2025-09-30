/*
Ejercicio 3 (ES):
- Crea la ruta POST "/users" que reciba un JSON con {name, email} y lo agregue a tu array de usuarios.
Exercise 3 (EN):
- Create a POST "/users" route that receives JSON {name, email} and adds it to your users array.
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

app.post("/users", (req, res) => {
	const { name, email } = req.body;
	if (!name || !email) {
		return res.status(400).json({ error: "Faltan datos (name, email)" });
	}
	const newUser = {
		id: users.length + 1,
		name,
		email
	};
	users.push(newUser);
	res.status(201).json(newUser);
});

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});