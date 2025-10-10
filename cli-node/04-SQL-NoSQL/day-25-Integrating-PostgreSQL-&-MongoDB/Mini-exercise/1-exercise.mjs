/*
Ejercicio 1 (ES):
- Conectar Node.js a PostgreSQL y MongoDB en el mismo proyecto.
Exercise 1 (EN):
- Connect Node.js to PostgreSQL and MongoDB in the same project.
*/

import pkg from 'pg';
const { Pool } = pkg;
import { MongoClient } from 'mongodb';

const pool = new Pool ({
	user: 'txemita',
	host: 'localhost',
	database: 'blogdb',
	password: 'mi_contraseña',
	port: 5432,
});

const username = encodeURIComponent("josemariagodoy1996_db_user");
const password = encodeURIComponent("micontraseña1234");

const uri = `mongodb+srv://${username}:${password}@cluster0.is9fdnf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

async function connectDatabases() {
	try {
		const pgClient = await pool.connect();
		console.log("Conectado a PostgreSQL");
		await client.connect();
		console.log("Conectado a MongoDB");
		const dbList = await client.db().admin().listDatabases();
		console.log("Bases en MongoDB:", dbList.databases.map(db => db.name));
		pgClient.release();
	} catch (error) {
		console.error("Error conectando a las bases de datos:", error);
	} finally {
		await client.close();
	}
}

connectDatabases();