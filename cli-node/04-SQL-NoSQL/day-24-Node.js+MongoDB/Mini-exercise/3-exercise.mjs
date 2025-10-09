/*
Ejercicio 3 (ES):
- Leer todos los usuarios y mostrarlos en consola.
Exercise 3 (EN):
- Read all users and print them to the console.
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
		const users = await collection.find().toArray();
		console.log(users);
	} catch (err) {
		console.error(err);
	} finally {
		await client.close();
	}
}

run();