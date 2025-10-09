/*
Ejercicio 5 (ES):
- Eliminar un usuario por username.
Exercise 5 (EN):
- Delete a user by username.
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
		const db = client.db('blogdb');
		const collection = db.collection('users');
		const result = await collection.deleteOne({username: "Jose"});
		const users = await collection.find().toArray();
		console.log(users);
	} catch (err) {
		console.error(err);
	} finally {
		await client.close();
	}
}

run();