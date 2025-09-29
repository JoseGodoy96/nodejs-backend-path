/*
Ejercicio 3 (ES):
- Aplica un middleware solo a la ruta "/admin" que bloquee la petición (res.send("Acceso denegado")).

Exercise 3 (EN):
- Apply a middleware only to the "/admin" route that blocks the request (res.send("Access denied")).
*/

import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());

const adminBlocker = (req, res, next) => {
	res.send("Acceso denegado");
};

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

app.use("/admin", adminBlocker);

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});