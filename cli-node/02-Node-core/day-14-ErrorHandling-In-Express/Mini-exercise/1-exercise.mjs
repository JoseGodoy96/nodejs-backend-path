/*
Ejercicio 1 (ES):
- Crea un middleware de errores global que devuelva { error: "Algo salió mal" } con status 500.

Exercise 1 (EN):
- Create a global error middleware that returns { error: "Something went wrong" } with status 500.
*/

import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/", (req, res) => res.send("Servidor con middlewares"));
app.get("/dashboard", (req, res) => res.send("Bienvenido al dashboard"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Algo salió mal" });
});

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});