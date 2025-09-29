/*
Mini-Challenge (ES):
- Crea un servidor Express con:
	1. "/" → devuelve "Servidor con manejo de errores"
	2. "/random" → si el número aleatorio < 0.5 lanza error "Número demasiado bajo"
	3. "/user/:id" → si el id no es numérico lanza error 400 "ID inválido"
- Middleware de errores global:
- Devuelve { error: mensaje, status: código } en formato JSON.

Mini-Challenge (EN):
- Create an Express server with:
	1. "/" → returns "Server with error handling"
	2. "/random" → if random number < 0.5 throw error "Number too low"
	3. "/user/:id" → if id is not numeric throw 400 "Invalid ID"
- Global error middleware:
- Returns { error: message, status: code } in JSON format.
*/

import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());

const numRandom = (req, res, next) => {
	const number = Math.random();
	if (number >= 0.5) {
		next();
	} else {
		const err = new Error("Numero demasiado bajo");
		err.status = 401;
		next(err);
	}
};

app.get("/", (req, res) => res.send("Servidor con manejo de errores"));
app.get("/random", numRandom, (req, res) => {
	res.send("Numero aceptable! Bienvenido!");
});
app.get("/user/:id", (req, res) => {
	const numId = Number(req.params.id);
	if (isNaN(numId)) {
		const err = new Error("Id invalido");
		err.status = 400;
		return next(err);
	} else {
		res.send(`Bienvenido usuario ${numId}`);
	}
});

app.use((err, req, res, next) => {
	console.error(err.message);
	res.status(err.status || 500).json({ error: err.message, status: err.status });
});

app.use((req, res) => res.status(404).send("404 - No encontrada"));

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});