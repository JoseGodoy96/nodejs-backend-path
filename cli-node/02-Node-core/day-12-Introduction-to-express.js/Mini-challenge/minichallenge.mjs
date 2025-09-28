/*
Mini-Challenge (ES):
- Crea un servidor Express con las siguientes rutas:
	1. "/" → devuelve "Bienvenido al servidor Express".
	2. "/users" → devuelve un array JSON de usuarios simulados.
	3. "/status" → devuelve { status: "ok", serverTime: <hora actual> }.

Mini-Challenge (EN):
- Create an Express server with the following routes:
	1. "/" → return "Welcome to Express server".
	2. "/users" → return a mock JSON array of users.
	3. "/status" → return { status: "ok", serverTime: <current time> }.
*/

import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());

const users = [
	{ usuario: "1", contraseña: 1234 },
	{ usuario: "2", contraseña: 1234 },
	{ usuario: "3", contraseña: 1234 }
];

app.get("/", (req, res) => res.send("Bienvenido a Express"));
app.get("/users", (req, res) => {
	res.json(users);
});
app.get("/status", (req, res) => {
	const fecha = new Date();
	res.json({ staus: "ok", time: `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}` });
});

app.use((req, res) => res.status(404).send("404 - No encontrada"));

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});