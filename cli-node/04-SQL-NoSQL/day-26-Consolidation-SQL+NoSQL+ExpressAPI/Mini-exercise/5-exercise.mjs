/*
Ejercicio 5 (ES):
- Validar datos de entrada y manejar errores en rutas.
Exercise 5 (EN):
- Validate input data and handle errors in routes.
*/

import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const PORT = 3000;

// === PostgreSQL

const pool = new Pool({
	user: 'txemita',
	host: 'localhost',
	database: 'txemita',
	password: 'mi_contraseña',
	port: 5432,
});

async function testPostgres() {
	try {
		await pool.query('SELECT NOW()');
		console.log('Conectado a PostgreSQL');
	} catch (err) {
		console.error('Error al conectar con PostgreSQL:', err.message);
		process.exit(1);
	}
}

async function getAllUsers() {
	try {
	  const res = await pool.query('SELECT * FROM users');
		return res.rows;
	} catch (err) {
		console.error("Error al obtener usuarios:", err.message);
		throw err;
	}
}

async function insertUser(username, password) {
	if (!username || !password) {
		throw new Error("El username y password son requeridos");
	}
	try {
		const res = await pool.query(
		'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
		[username, password]
	);
		return res.rows[0];
	} catch (err) {
		console.error("Error al insertar usuario:", err.message);
		throw err;
	}
}

async function updateUser(id, username, password) {
	if (!id || !username || !password) {
		throw new Error("El id, username y password son requeridos");
	}	
	try {
		const res = await pool.query(
		'UPDATE users SET username=$1, password=$2 WHERE id=$3 RETURNING *',
		[username, password, id]
		);
		return res.rows[0];
	} catch (err) {
		console.error("Error al actualizar usuario:", err.message);
		throw err;
	}
}

async function deleteUser(id) {
	if (!id) {
		throw new Error("El id es requerido para eliminar un usuario");
	}	
	try {
		await pool.query('DELETE FROM users WHERE id=$1', [id]);
		return { message: 'Usuario eliminado' };
	} catch (err) {
		console.error("Error al eliminar usuario:", err.message);
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

function getPostsCollection() {
	return db.collection('posts');
}

async function getAllPosts() {
	try {
		const posts = await db.collection('posts').find().toArray();
		return posts;
	} catch (err) {
		console.error("Error al obtener posts:", err.message);
		throw err;
	}
}

async function insertPost(post) {
	if (!post || typeof post !== 'object') {
		throw new Error("El cuerpo del post es inválido");
	}
	const res = await getPostsCollection().insertOne(post);
	return res.insertedId;
}

async function updatePost(id, post) {
	await getPostsCollection().updateOne(
		{ _id: new ObjectId(id) },
		{ $set: post }
	);
	return { message: 'Post actualizado' };
}

async function deletePost(id) {
	await getPostsCollection().deleteOne({ _id: new ObjectId(id) });
	return { message: 'Post eliminado' };
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

routerUsers.get("/", async (req, res, next) => {
	try {
		const users = await getAllUsers();
		res.json(users);
	} catch (err) {
		next(err);
	}
});

routerUsers.post('/', async (req, res, next) => {
	try {
		const { username, password } = req.body;	
	if (!username || !password) {
		return res.status(400).json({ error: 'username y password son requeridos' });
	}	
		const user = await insertUser(username, password);
		res.status(201).json(user);
	} catch (err) {
	next(err);
	}
});

routerUsers.put('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const { username, password } = req.body;	
		if (!username || !password) {
			return res.status(400).json({ error: 'username y password son requeridos' });
		}	
		const user = await updateUser(id, username, password);
		res.json(user);
	} catch (err) {
		next(err);
	}
});

routerUsers.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await deleteUser(id);
		res.json(result);
	} catch (err) {
		next(err);
	}
});


app.use("/users", routerUsers);

// --- Ruta Posts

const routerPosts = express.Router();

routerPosts.get("/", async (req, res, next) => {
	try {
		const posts = await getAllPosts();
		res.json(posts);
	} catch (err) {
		next(err);
	}
});

routerPosts.post('/', async (req, res, next) => {
	try {
		const id = await insertPost(req.body);
		res.status(201).json({ _id: id });
	} catch (err) {
		next(err);
	}
});

routerPosts.put('/:id', async (req, res) => {
	const { id } = req.params;
	const result = await updatePost(id, req.body);
	res.json(result);
});

routerPosts.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const result = await deletePost(id);
	res.json(result);
});

app.use("/posts", routerPosts);

// === Errores ===

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: err.message || "Error interno de servidor" });
});

app.use((req, res) => {
	res.status(404).send("Ruta desconocida");
});

// === Servidor ===

async function startServer() {
	await connectMongo();
	await testPostgres();
	app.listen(PORT, () => {
	console.log(`El servidor esta activo en http://localhost:${PORT}`);
	});
}

startServer();