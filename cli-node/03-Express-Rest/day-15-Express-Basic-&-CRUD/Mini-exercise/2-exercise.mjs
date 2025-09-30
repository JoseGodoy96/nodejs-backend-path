/*
Ejercicio 2 (ES):
- Crea la ruta GET "/users" que devuelva un array de usuarios simulados en JSON.
Exercise 2 (EN):
- Create a GET "/users" route that returns a mock array of users in JSON.
*/

import express from "express";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => res.send("Bienvenido a express"));
app.get("/users", (req, res) => {
	const users = [
		{ id: 1, user: "Jose", password: 1234 },
		{ id: 2, user: "Ana", password: 5678 },
		{ id: 3, user: "Luis", password: 9876 }
	];
	res.json(users)
});

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});