/*
Ejercicio 6 (ES):
- Eliminar un usuario de ambas bases de datos.
Exercise 6 (EN):
- Delete a user from both databases.
*/

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

async function deleteUserPost(id) {
	try {
		let res;
		if (!id) {
			console.log("ID necesario");
		} else {
		const query = ('DELETE FROM users WHERE id = $1;')
		res = await pool.query(query, [id]);
		console.log(`Usuario borrado: ${res.rowCount}`);
		}
	} catch (err) {
		console.error(err);
	}
}

async function deleteUserMon(username) {
	try {
		const db = client.db('example');
		const collection = db.collection('users');
		const result = await collection.deleteOne({username: username});
	} catch (err) {
		console.error(err);
	} 
}

async function main() {
	try {
		await client.connect();
		console.log("Conectado a MongoDB");	
		await deleteUserPost(4);
		await deleteUserMon("isabel");
	} finally {
		await client.close();
		await pool.end();
	}
}

main();
