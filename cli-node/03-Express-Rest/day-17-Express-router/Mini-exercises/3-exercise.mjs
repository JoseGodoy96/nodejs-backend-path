/*
Ejercicio 3 (ES):
- Crea un router para "products" con rutas GET "/" y POST "/".
Exercise 3 (EN):
- Create a "products" router with routes GET "/" and POST "/".
*/

import express from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

let product = [
	{ id: 1, name: "naranja" },
	{ id: 2, name: "limon" },
	{ id: 3, name: "manzana" }
];

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
});

const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
	res.json(product);
});

productsRouter.post("/", (req, res) => {
	const { name } = req.body;
	if (!name)
		return res.status(400).json({ error: "Faltan name" });
	const newProduct = { id: product.length + 1, name };
	users.push(newProduct);
	res.status(201).json(newProduct);
});

app.use("/products", productsRouter);

app.get("/", (req, res) => {
	res.send("Bienvenido a express.js");
});

app.use((req, res) => {
	res.status(404).send("Pagina no encontrada");
})

app.listen(PORT, () => {
	console.log(`El sevidor ya esta activo http://localhost:${PORT}`);
});