/*
Mini-Challenge (ES):
- Construye un servidor Express con:
	1. Router "users" con validación Joi para POST "/users".
	2. Router "products" con validación Joi para POST "/products".
	3. Middleware de validación reutilizable (validate(schema)).
	4. Middleware global de errores que maneje tanto validaciones como errores internos.

Mini-Challenge (EN):
- Build an Express server with:
	1. "users" router with Joi validation for POST "/users".
	2. "products" router with Joi validation for POST "/products".
	3. Reusable validation middleware (validate(schema)).
	4. Global error handling middleware for validation and internal errors.
*/

import express from "express";
import Joi from "joi";
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
	{ user: "jose", password: 1234 },
	{ user: "jesus", password: 1234 },
	{ user: "antonio", password: 1234 }
];

let products = [
	{ name: "manzana", price: 1 },
	{ name: "limon", price: 2 },
	{ name: "naranja", price: 3 }
];

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}]`)
	next();
});

const routerUsers = express.Router();

const validate = (schema) => (req, res, next) => {
	const { error } = schema.validate(req.body);
	if (error)
		return next(error);
	next();
};

routerUsers.get("/", (req, res) => {
	res.json(users);
})

const usersScheme = Joi.object({
	user: Joi.string().min(3).required(),
	password: Joi.number().required()
});

routerUsers.post("/", validate(usersScheme), (req, res) => {
	res.status(201).json({ message: "Usuario creado", data: req.body });
});

app.use("/users", routerUsers);


const routerProducts = express.Router();

routerProducts.get("/", (req, res) => {
	res.json(products);
})

const productsScheme = Joi.object({
	name: Joi.string().min(3).required(),
	price: Joi.number().positive().required()
});

routerProducts.post("/", validate(productsScheme), (req, res) => {
	res.status(201).json({ message: "Producto creado", data: req.body });
});

app.use("/products", routerProducts);

app.get("/", (req, res) => {
	res.send("Bienvenido a express y Joi");
})

app.get("/error", (req, res, next) => {
	const error = new Error("Algo salio mal");
	next(error);
})

app.use((req, res) => {
	res.status(404).send("Ruta no encontrada");
})

app.use((err, req, res, next) => {
	console.error(err.message);
	if (err.isJoi) {
		return res.status(400).json({ error: err.details[0].message });
	}
	res.status(500).json({ error: "Error interno de servidor" });
});

app.listen(PORT, () => {
	console.log(`El servidor esta activo: http://localhost:${PORT}`);
});