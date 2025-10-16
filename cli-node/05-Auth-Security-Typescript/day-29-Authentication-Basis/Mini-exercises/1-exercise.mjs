/*
Ejercicio 1 (ES):
- Implementar registro de usuario con contraseña "hash" simulada o simple.
Exercise 1 (EN):
- Implement user registration with simple or simulated password hash.
*/

import express from 'express';
import Joi from 'joi';
import crypto from 'crypto';
import pkg from 'pg';
const { Pool } = pkg;

// === Postgres ===

const pool = new Pool({
	user: 'txemita',
	host: 'localhost',
	database: 'txemita',
	password: 'mi_contraseña',
	port: 5432,
});

async function insertUser(username, password) {
	if (!username || !password)
		throw (new Error("El username o la password son necesarios"));
	try {
		const res = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
		return (res.rows[0]);
	} catch (err) {
		console.error("Error al insertar usuario", err.message);
		throw (err);
	}
};

const app = express();
const PORT = 3000;

app.use(express.json());

const userSchema = Joi.object({
	username: Joi.string().min(3).max(30).required(),
	password: Joi.string().min(5).required(),
});

app.get("/", (req, res) => {
	res.send("Bienvenido a node.js con express");
});

app.post("/register", async (req, res) => {
	try {
		const { error, value } = userSchema.validate(req.body);
		if (error)
			return res.status(400).json({error: error.details[0].message});
		const { username, password } = value;
		const simulatedHash = crypto.createHash('sha256').update(password).digest('hex');
		const newUser = await insertUser(username, simulatedHash);
		res.status(201).json({
			message: "Usuario registrado correctamente",
			user: newUser,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({error: "Error al registrar usuario"});
	}
});

app.use((req, res) => {
	res.status(404).json({error: "Ruta no encontrada"});
});

app.use((err, req, res, next) => {
	res.status(500).json({error: "Error no identificado de servidor"})
});

app.listen(PORT, () => {
	console.log(`El servidor esta habierto en http://localhost:${PORT}`);
});