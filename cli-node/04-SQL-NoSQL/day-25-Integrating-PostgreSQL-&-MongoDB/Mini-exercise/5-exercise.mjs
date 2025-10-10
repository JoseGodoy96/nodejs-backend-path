/*
Ejercicio 5 (ES):
- Actualizar el email de un usuario en PostgreSQL y MongoDB.
Exercise 5 (EN):
- Update a user's email in PostgreSQL and MongoDB.
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

async function updateUserPost(username, id) {
	try {
		let res;
		if (!username || !id) {
			console.log("Es necesario username e ID");
		} else {
			const query = 'UPDATE users SET username = $1 WHERE id = $2;';
			res = await pool.query(query, [username, id]);
			console.log(`Filas actualizadas: ${res.rowCount}`);
		}
	} catch (err) {
		console.error(err);
	} 
}

async function updateUserMon(username, password) {
	try {
		const db = client.db('example');
		const collection = db.collection('users');
		const update = await collection.updateOne(
			{username: username},
			{ $set: {password: password}}
		);
	} catch (err) {
		console.error(err);
	} 
}

async function main() {
	try {
		await client.connect();
		console.log("Conectado a MongoDB");	
		await updateUserPost("new user", 3);
		await updateUserMon("isabel", "new password");
	} finally {
		await client.close();
		await pool.end();
	}
}

main();