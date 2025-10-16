/*
Mini-Challenge (ES):
- Crear endpoints /auth/register, /auth/login, /profile, /admin.
- Proteger rutas privadas con middleware.
- Guardar usuarios en un array simulado (no DB obligatorio).
Mini-Challenge (EN):
- Create endpoints /auth/register, /auth/login, /profile, /admin.
- Protect private routes with middleware.
- Store users in a simulated array (DB not required).
*/

import express from 'express';
import Joi from 'joi';
import crypto from 'crypto';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const PORT = 3000;

app.use(express.json());

// === PostgreSQL ===
const pool = new Pool({
    user: 'txemita',
    host: 'localhost',
    database: 'txemita',
    password: 'mi_contraseña',
    port: 5432,
});

// === Funciones de usuario ===
async function insertUser(username, password, role = 'user') {
    if (!username || !password)
		throw new Error("Username y password son requeridos");
    const password_hash = crypto.createHash('sha256').update(password).digest('hex');
    const res = await pool.query(
        'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
        [username, password_hash, role]
    );
    return res.rows[0];
}

async function verifyUser(username, password) {
    if (!username || !password)
		throw new Error("Username y password son requeridos");
    const password_hash = crypto.createHash('sha256').update(password).digest('hex');
    const res = await pool.query('SELECT * FROM users WHERE username=$1 AND password=$2', [username, password_hash]);
    return res.rows[0] || null;
}

// === Joi Schemas ===
const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(5).required(),
});

const loginSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(5).required(),
});

// === Middleware de autenticación ===
async function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
		return res.status(401).json({ error: "No autorizado" });
    const token = authHeader.replace("Bearer ", "");
    try {
        const resDb = await pool.query('SELECT id, username, role FROM users WHERE username=$1', [token]);
        const user = resDb.rows[0];
        if (!user)
			return res.status(401).json({ error: "Token inválido" });
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error en autenticación" });
    }
}

// Middleware para rutas admin
function adminMiddleware(req, res, next) {
    if (req.user.role !== 'admin')
		return res.status(403).json({ error: "Acceso denegado" });
    next();
}

// === Rutas ===

// Ruta raíz
app.get('/', (req, res) => res.send("Bienvenido a Node.js con Express"));

// Registro
app.post('/auth/register', async (req, res) => {
    try {
        const { error, value } = userSchema.validate(req.body);
        if (error)
			return res.status(400).json({ error: error.details[0].message });
        const { username, password } = value;
        const newUser = await insertUser(username, password);
        res.status(201).json({ message: "Usuario registrado correctamente", user: newUser });
    } catch (err) {
        console.error(err);
        if (err.code === '23505') { 
            res.status(400).json({ error: "El username ya existe" });
        } else {
            res.status(500).json({ error: "Error al registrar usuario" });
        }
    }
});

// Login
app.post('/auth/login', async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) 
			return res.status(400).json({ error: error.details[0].message });
        const { username, password } = value;
        const user = await verifyUser(username, password);
        if (!user) 
			return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        res.json({ message: "Login exitoso", token: user.username });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error en login" });
    }
});

// Perfil (privado)
app.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: "Perfil del usuario", user: req.user });
});

// Admin (solo admin)
app.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: "Área de admin", user: req.user });
});

// Error 404
app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

// Error 500
app.use((err, req, res, next) => res.status(500).json({ error: "Error del servidor" }));

// Start server
app.listen(PORT, () => console.log(`Servidor abierto en http://localhost:${PORT}`));
