/*
Ejercicio 4 (ES):
- Crea la ruta GET "/users/:id" que devuelva el usuario correspondiente según el índice del array.
Exercise 4 (EN):
- Create a GET "/users/:id" route that returns the user according to the array index.
*/

import express from "express";
const app = express();
const PORT = 3000;

let users = [
	{ id: 1, name: "Jose", email: "jose@example.com" },
	{ id: 2, name: "Ana", email: "ana@example.com" },
	{ id: 3, name: "Luis", email: "luis@example.com" }
];

app.get("/users/:id", (req, res) => {
	const { id } = req.params;
	const user = users.find(u => u.id === Number(id));
	if (!user) {
		return res.status(404).json({ error: "Usuario no encontrado" });
	}
	res.json(user);
});

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});