/*
Ejercicio 2 (ES):
- Aplica el middleware de validación en la ruta POST "/users".
Exercise 2 (EN):
- Apply the validation middleware in the POST "/users" route.
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
})

const validateUser = (req, res, next) => {
	const { error } = userSchema.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });
	next();
};

app.post("/users", validateUser, (req, res) => {
	res.status(201).json({ message: "User created", data: req.body });
});

app.get("/", (req, res) => {
	res.send("Bienvenido a express y Joi");
});

app.use((req, res) => {
	res.status(404).send("Ruta no encontrada");
});

app.listen(PORT, () => {
	console.log(`El servidor se encuentra en: http://localhost:${PORT}`);
});