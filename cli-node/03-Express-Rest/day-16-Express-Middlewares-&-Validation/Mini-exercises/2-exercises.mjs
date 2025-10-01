/*
Ejercicio 2 (ES):
- Crea un middleware que mida el tiempo de ejecución de cada request.
Exercise 2 (EN):
- Create a middleware that measures execution time of each request.
*/

import express from "express";
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
	const start = Date.now();
	res.on("finish", () => {
		const time = Date.now() - start;
		console.log(`[${new Date().toISOString()} ${req.method} ${req.url}] - ${time}ms`);
	})
	next();
})

app.get("/", (req, res) => {
	res.send("Bienvenido a express.js");
})

app.use((req, res) => {
	res.status(404).send("404 - No encontrada");
})

app.listen(PORT, () => {
	console.log (`Servidor activo en http://localhost:${PORT}`);
});