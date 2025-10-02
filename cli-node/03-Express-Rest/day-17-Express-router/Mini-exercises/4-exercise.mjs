/*
Ejercicio 4 (ES):
- Integra el router de "products" en el servidor principal con app.use("/products", productRouter).
Exercise 4 (EN):
- Integrate the "products" router into the main server with app.use("/products", productRouter).
*/

import express, { json } from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
	{ id: 1, name: "manzana" },
	{ id: 2, name: "pera" },
	{ id: 3, name: "limon" }
];

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
})

const routesProducts = express.Router();

routesProducts.get("/", (req, res) => {
	res.json(products);
});

routesProducts.get("/:id", (req, res) => {
	const product = products.find(u => u.id === Number(req.params.id));
	if (!product)
		return res.status(404).json({err: "no existe ese producto"});
	res.json(product);
});

app.use("/products", routesProducts);

app.get("/", (req, res) => {
	res.send("Bienvenido a express.js");
});

app.use((req, res) => {
	res.status(404).send("No se encuentra la pagina");
});

app.listen(PORT, () => {
	console.log(`El servidor esta abierto en: http://localhost:${PORT}`);
});