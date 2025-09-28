/*
Ejercicio 1 (ES):
- Instala Express y crea un servidor básico que responda en "/" con "Bienvenido a Express".

Exercise 1 (EN):
- Install Express and create a basic server that responds at "/" with "Welcome to Express".
*/

import express from "express";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => res.send("Bienvenido a Express"));

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});