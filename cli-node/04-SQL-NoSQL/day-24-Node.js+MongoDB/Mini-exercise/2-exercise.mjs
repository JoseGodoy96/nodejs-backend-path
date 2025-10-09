/*
Ejercicio 2 (ES):
- Crear colección "users" e insertar 3 usuarios de ejemplo.
Exercise 2 (EN):
- Create a "users" collection and insert 3 sample users.
*/

import { MongoClient } from "mongodb";

const username = encodeURIComponent("josemariagodoy1996_db_user");
const password = encodeURIComponent("micontraseña1234");

const uri = `mongodb+srv://${username}:${password}@cluster0.is9fdnf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

async function run() {
	try {
		await client.connect();
		console.log("Conectado a MongoDB");
		const db = client.db('blogDB');
		const collection = db.collection('users');
		const insert = await collection.insertMany([
			{ username: "Jose", email: "jose@example.com", password: "hashedpassword" },
			{ username: "Jesus", email: "jesus@example.com", password: "hashedpassword" },
			{ username: "Ana", email: "ana@example.com", password: "hashedpassword" }
		]);
		const users = await collection.find().toArray();
		console.log(users);
	} catch (err) {
		console.error(err);
	} finally {
		await client.close();
	}
}

run();
