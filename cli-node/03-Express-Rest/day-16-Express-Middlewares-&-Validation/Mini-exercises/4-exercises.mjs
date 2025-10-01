/*
Ejercicio 4 (ES):
- Implementa un middleware global de manejo de errores que devuelva 500 en caso de error.
Exercise 4 (EN):
- Implement a global error handling middleware that returns 500 on error.
*/

import express from "express";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
	res.send("Bienvenido a express.js");
});

app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send("Error");
})

app.listen(PORT, () => {
	console.log(`Servidor activo http://localhost:${PORT}`);
});