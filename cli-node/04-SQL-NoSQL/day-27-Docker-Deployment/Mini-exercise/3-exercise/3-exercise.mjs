/*
Ejercicio 3 (ES):
- Levantar contenedores y probar rutas de la API.
Exercise 3 (EN):
- Start containers and test API routes.
*/

import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import { MongoClient } from 'mongodb';

const app = express();
const PORT = 3000;

// === PostgreSQL

const pool = new Pool({
	user: 'txemita',
	host: 'postgres',
	database: 'txemita',
	password: 'mi_contraseña',
	port: 5432,
});

async function getAllUsers() {
	try {
	  const res = await pool.query('SELECT * FROM users');
		return res.rows;
	} catch (err) {
		console.error("Error al obtener usuarios:", err.message);
		throw err;
	}
}

// === MongoDB ===

const username = encodeURIComponent("josemariagodoy1996_db_user");
const password = encodeURIComponent("micontraseña1234");

const uri = `mongodb+srv://${username}:${password}@cluster0.is9fdnf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);
let db;

async function connectMongo() {
	try {
		await client.connect();
		db = client.db('example');
		console.log('Conectado a MongoDB');
	} catch (err) {
		console.error('Error al conectar con MongoDB:', err);
		process.exit(1);
	}
}

async function getAllPosts() {
	try {
		const posts = await db.collection('posts').find().toArray();
		return posts
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Error al obtener los posts' });
	}
}

// === Middleware ===

app.use(express.json());
app.use((req, res, next) => {
	console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
	next();
})

// === Rutas ===

app.get("/", (req, res) => {
	res.send("Bienvenido a node.js y express");
});

// --- Ruta Users ---

const routerUsers = express.Router();

routerUsers.get("/", async (req, res) => {
	const users = await getAllUsers();
	res.json(users);
});

app.use("/users", routerUsers);

// --- Ruta Posts

const routerPosts = express.Router();

routerPosts.get("/", async (req, res) => {
	const posts = await getAllPosts();
	res.json(posts);
});

app.use("/posts", routerPosts);

// === Errores ===

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({error: "error interno de servidor"});
});

app.use((req, res) => {
	res.status(404).send("Ruta desconocida");
});

// === Servidor ===

async function startServer() {
	await connectMongo();
	console.log("Conectado PostgresSQL");
	app.listen(PORT, () => {
	console.log(`El servidor esta activo en http://localhost:${PORT}`);
	});
}

startServer();