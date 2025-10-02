/*
Mini-Challenge (ES):
- Construye un servidor Express modularizado:
	1. Router "users" → GET "/", GET "/:id", POST "/"
	2. Router "products" → GET "/", POST "/"
	3. Middleware global logger
	4. Middleware global de errores

Mini-Challenge (EN):
- Build a modularized Express server:
	1. "users" router → GET "/", GET "/:id", POST "/"
	2. "products" router → GET "/", POST "/"
	3. Global logger middleware
	4. Global error handling middleware
*/

import express from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
	{ id: 1, user: "jose" , password: 1234 },
	{ id: 2, user: "antonio" , password: 1234 },
	{ id: 3, user: "jesus" , password: 1234 }
];

let products = [
	{ id: 1, name: "manzana" },
	{ id: 2, name: "pera" },
	{ id: 3, name: "limon" }
];

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
});

const routerUsers = express.Router();

routerUsers.get("/", (req, res) => {
	res.json(users);
});

routerUsers.post("/", (req, res) => {
	const { user, password } = req.body;
	if (!user || !password)
		return res.status(400).json({error: "user o password incorrecto"});
	const newUser = { id: users.length + 1, user, password };
	users.push(newUser);
	res.status(201).json(newUser);
});

routerUsers.get("/:id", (req, res) => {
	const idUser = users.find(u => u.id === Number(req.params.id));
	if (!idUser)
		return res.status(404).json({ error: "id incorrecto" });
	res.json(idUser);
});

app.use("/users", routerUsers);

const routesProducts = express.Router();

routesProducts.get("/", (req, res) => {
	res.json(products);
});

routesProducts.post("/", (req, res) => {
	const { name } = req.body;
	if (!name)
		return res.status(400).json({error: "name incorrecto"});
	const newProduct = { id: products.length + 1, name };
	products.push(newProduct);
	res.status(201).json(newProduct);
})

app.use("/products", routesProducts);

app.get("/", (req, res) => {
	res.send("Bienvenido a express.js");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
});

app.use((req, res) => {
	res.status(404).send("Ruta no encontrada");
});

app.listen(PORT, () => {
	console.log(`El servidor ya esta activo http://localhost:${PORT}`);
});