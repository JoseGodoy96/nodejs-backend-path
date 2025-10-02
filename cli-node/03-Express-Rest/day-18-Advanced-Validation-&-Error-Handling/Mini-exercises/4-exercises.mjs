/*
Ejercicio 4 (ES):
- Implementa un middleware global que capture errores y devuelva status 500.
Exercise 4 (EN):
- Implement a global middleware that catches errors and returns status 500.
*/

import express from "express";
import Joi from "joi";
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Bienvenido a express y joi");
});

app.get("/error", (req, res, next) => {
	const error = new Error("Algo salió mal!");
	next(error);
});

app.use((req, res) => {
	res.status(404).send("ruta no encontrada");
});

app.use((err, req, res, next) => {
	console.error(err.message);
	res.status(500).json( { error: "Error interno de servidor"} );
});

app.listen(PORT, () => {
	console.log(`El servidor esta en activo en: http://localhost:${PORT}`);
});