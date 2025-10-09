/*
Ejercicio 4 (ES):
- Actualizar el email de un usuario específico.
Exercise 4 (EN):
- Update the email of a specific user.
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
		const update = await collection.updateOne(
			{username: "Ana"},
			{ $set: {email: "newemail@example.com"}}
		);
		const users = await collection.find().toArray();
		console.log(users);
	} catch (err) {
		console.error(err);
	} finally {
		await client.close();
	}
}

run();