/*
Mini-Challenge (ES):
- Construye un servidor Express con:
	1. Middleware logger (muestra método y URL).
	2. Middleware que mida el tiempo de ejecución.
	3. Ruta POST "/products" que valide que vengan {name, price}.
	4. Middleware global para capturar errores.

Mini-Challenge (EN):
- Build an Express server with:
	1. Logger middleware (logs method and URL).
	2. Middleware that measures execution time.
	3. POST "/products" route that validates {name, price}.
	4. Global middleware to catch errors.
*/

import express from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
});

app.use((req, res, next) => {
	const start = Date.now();
	res.on("finish", () => {
		const time = Date.now() - start;
		console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${time}ms`);
	});
	next();
})

let products = [];

app.post("/products", (req, res) => {
	const { name, price } = req.body;
	if (!name || price === undefined)
			return res.status(400).send("Falta name o price");
		const newProduct = { name, price };
		products.push(newProduct);
		res.status(201).json(newProduct);
});

app.get("/", (req, res) => {
	res.send("Bienvenido a express.js");
});

app.get("/products", (req, res) => {
	res.json(products);
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({ error: err.message || "Algo salió mal" });
});

app.use((req, res) => {
	res.status(404).send("404 - No encontrada");
});

app.listen(PORT, () => {
	console.log(`Servidor activo: http://localhost:${PORT}`);
});