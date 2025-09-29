/*
Ejercicio 3 (ES):
- Crea una ruta "/protected" que siempre lance un error "No autorizado".
- Maneja el error en el middleware global con status 401.

Exercise 3 (EN):
- Create a "/protected" route that always throws an error "Unauthorized".
- Handle the error in the global middleware with status 401.
*/

import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/", (req, res) => res.send("Servidor con middlewares"));
app.get("/protected", (req, res, next) => {
	const err = new Error("No autorizado");
	err.status = 401;
	return next(err);
});

app.use((req, res) => res.status(404).send("404 - No encontrada"));

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({ error: err.message || "Algo salió mal" });
});

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});