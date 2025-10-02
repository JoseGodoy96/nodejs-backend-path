/*
Ejercicio 3 (ES):
- Crea un esquema de validación para "products" con {name, price}.
Exercise 3 (EN):
- Create a validation schema for "products" with {name, price}.
*/

import express from "express";
import Joi from "joi";
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
});

const productsSchema = Joi.object({
	name: Joi.string().min(3).required(),
	price: Joi.number().required()
});

app.post("/products", (req, res, next) => {
	const { error } = productsSchema.validate(req.body);
	if (error)
		return res.status(400).json({ error: error.details[0].message });
	res.status(201).json({ message: "Productos creado", data: req.body });
});

app.get("/", (req, res) => {
	res.send("BIenvenido a express y Joi");
});

app.use((req, res) => {
	res.status(404).send("Ruta desconocida");
});

app.listen(PORT, () => {
	console.log(`El servidor esta en activo: http://localhost:${PORT}`);
});