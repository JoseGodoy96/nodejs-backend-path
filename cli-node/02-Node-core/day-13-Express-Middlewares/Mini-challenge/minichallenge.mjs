/*
Mini-Challenge (ES):
- Crea un servidor Express con middlewares personalizados:
	1. logger → registra método y URL.
	2. auth → bloquea acceso a "/dashboard" si falta un query param ?token=123.
	3. errorHandler → middleware que capture errores y devuelva un JSON { error: mensaje }.
- Rutas:
	- "/" → "Servidor con middlewares"
	- "/dashboard" → "Bienvenido al dashboard" (solo si el token es correcto)

Mini-Challenge (EN):
- Create an Express server with custom middlewares:
	1. logger → logs method and URL.
	2. auth → blocks access to "/dashboard" if ?token=123 is missing.
	3. errorHandler → middleware that catches errors and returns JSON { error: message }.
- Routes:
	- "/" → "Server with middlewares"
	- "/dashboard" → "Welcome to dashboard" (only if token is correct)
*/

import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
});

const auth = (req, res, next) => {
	const token = req.query.token;
	if (token === "123") {
		next();
	} else {
		const err = new Error("Token inválido o ausente");
		err.status = 403;
		next(err);
	}
};

app.get("/", (req, res) => res.send("Servidor con middlewares"));
app.get("/dashboard", auth, (req, res) => {
	res.send("Bienvenido al dashboard");
});

app.use((err, req, res, next) => {
	console.error(err.message);
	res.status(err.status || 500).json({ error: err.message });
});

app.use((req, res) => res.status(404).send("404 - No encontrada"));

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});