/*
Ejercicio 3 (ES):
- Crear middleware para proteger rutas privadas (verificar usuario logueado).
Exercise 3 (EN):
- Create middleware to protect private routes (check logged-in user).
*/

import express from 'express';
import Joi from 'joi';
import crypto from 'crypto';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const PORT = 3000;

app.use(express.json());


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

async function verifyUser(username, password) {
	if (!username || !password)
		throw new Error("El username y la password son requeridos");
	try {
		const res = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
		const user = res.rows[0];
		if (!user)
			return (null);
		const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
		if (hashedPassword === user.password) {
			return (user);
		} else {
			return (null);
		}
	} catch (err) {
		console.error("Error al verificar usuario", err.message);
		throw err;
	}
}

// === Middlewares ===

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
})

async function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
        return res.status(401).json({ error: "No autorizado, falta token" });
    const token = authHeader.replace("Bearer ", "");
    try {
        const resDb = await pool.query('SELECT * FROM users WHERE username=$1', [token]);
        const user = resDb.rows[0];
        if (!user)
            return res.status(401).json({ error: "Token inválido" });
        req.user = { id: user.id, username: user.username };
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al verificar usuario" });
    }
}

// === Joi schemas ===

const userSchema = Joi.object({
	username: Joi.string().min(3).max(30).required(),
	password: Joi.string().min(5).required(),
});

const loginSchema = Joi.object({
	username: Joi.string().min(3).max(30).required(),
	password: Joi.string().min(5).required(),
});


// === Routes ===

app.get("/", (req, res) => {
	res.send("Bienvenido a node.js con express");
});

app.get("/private", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Ruta privada accesible",
        user: req.user
    });
});

app.post("/login", async (req, res) => {
	try {
		const { error, value } = loginSchema.validate(req.body);
		if (error)
			return res.status(400).json({ error: error.details[0].message });
		const { username, password } = value;
		const user = await verifyUser(username, password);
		if (!user) 
			return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
		res.status(200).json({
			message: "Login exitoso",
			user: {
				id: user.id,
				username: user.username,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Error en login" });
	}
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

// === Error handling ===

app.use((req, res) => {
	res.status(404).json({error: "Ruta no encontrada"});
});

app.use((err, req, res, next) => {
	res.status(500).json({error: "Error no identificado de servidor"})
});

// === Start server ===

app.listen(PORT, () => {
	console.log(`El servidor esta abierto en http://localhost:${PORT}`);
});