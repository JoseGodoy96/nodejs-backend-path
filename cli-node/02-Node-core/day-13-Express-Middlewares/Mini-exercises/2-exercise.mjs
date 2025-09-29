/*
Ejercicio 2 (ES):
- Crea un middleware logger que muestre en consola el método y la URL de cada petición.

Exercise 2 (EN):
- Create a logger middleware that prints the method and URL of each request to the console.
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
	res.send("Bienvenido al servidor con logger!");
});

app.get("/about", (req, res) => {
	res.send("Página acerca de nosotros");
});

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});