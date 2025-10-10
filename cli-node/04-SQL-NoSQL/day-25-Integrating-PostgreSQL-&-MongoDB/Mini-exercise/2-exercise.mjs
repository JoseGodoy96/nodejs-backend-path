/*
Ejercicio 2 (ES):
- Crear función para listar usuarios de PostgreSQL.
Exercise 2 (EN):
- Create a function to list users from PostgreSQL.
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

async function getUser() {
	try {
		const res = await pool.query('SELECT * FROM users');
		console.log(res.rows);
	} catch (err) {
		console.error(err);
	}
}

async function connectDatabases() {
	try {
		const pgClient = await pool.connect();
		console.log("Conectado a PostgreSQL");
		await client.connect();
		console.log("Conectado a MongoDB");
		await getUser();
		pgClient.release();
	} catch (err) {
		console.error(err);
	} finally {
		await client.close();
	}
};

connectDatabases();