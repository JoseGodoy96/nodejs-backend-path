/*
Ejercicio 1 (ES):
- Instala Joi y crea un esquema de validación para "users" con {name, email}.
Exercise 1 (EN):
- Install Joi and create a validation schema for "users" with {name, email}.
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

const userSchema = Joi.object({
	name: Joi.string().min(3).required(),
	email: Joi.string().email().required()
});

app.post("/users", (req, res, next) => {
	const { error } = userSchema.validate(req.body);
	if (error)
		return res.status(400).json({ error: error.details[0].message });
	res.status(201).json({ message: "User created", data: req.body });
});

app.get("/", (req, res) => {
	res.send("Bienvenido en express.js");
});

app.use((req, res) => {
	res.status(404).send("Ruta no encontrada");
});

app.listen(PORT, () => {
	console.log(`El servidor esta activo en: http://localhost:${PORT}`);
});