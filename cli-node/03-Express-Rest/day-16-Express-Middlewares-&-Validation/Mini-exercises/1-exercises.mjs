/*
Ejercicio 1 (ES):
- Crea un middleware logger que muestre el método y la URL de cada request.
Exercise 1 (EN):
- Create a logger middleware that logs the method and URL of each request.
*/

import express from "express";
const app = express();
const PORT = 3000;


app.use(express.json());

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
});

app.get("/", (req, res) => {
	res.send("Bienvenido a express");
});

app.use((req, res) => {
	res.status(404).send("404 - No encontrada");
});

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});