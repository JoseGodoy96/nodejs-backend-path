/*
Ejercicio 4 (ES):
- Insertar un usuario en ambas bases de datos.
Exercise 4 (EN):
- Insert a user into both databases.
*/

import pkg from 'pg';
const { Pool } = pkg;
import { MongoClient } from 'mongodb';

const pool = new Pool({
	user: 'txemita',
	host: 'localhost',
	database: 'txemita',
	password: 'mi_contraseña',
	port: 5432,
});

const username = encodeURIComponent("josemariagodoy1996_db_user");
const password = encodeURIComponent("micontraseña1234");

const uri = `mongodb+srv://${username}:${password}@cluster0.is9fdnf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

async function insertUserPost(name, password) {
	try {
		const text = 'INSERT INTO users (username, password) VALUES ($1, $2)';
        const values = [name, password];
        await pool.query(text, values);
		console.log("Usuario insertado correctamente en PostgreSQL");
	} catch (err) {
		console.error(err);
	}
}

async function insertUserMon(name, password) {
	try {
		const db = client.db('example');
		const collection = db.collection('users');
		await collection.insertOne({ username: name, password: password });
		console.log("Usuario insertado correctamente en MongoDB");
	} catch (err) {
		console.error(err);
	}
}

async function main() {
	try {
		await client.connect();
		console.log("Conectado a MongoDB");	
		await insertUserPost("isabel", "1234");
		await insertUserMon("isabel", "1234");
	} finally {
		await client.close();
		await pool.end();
	}
}

main();