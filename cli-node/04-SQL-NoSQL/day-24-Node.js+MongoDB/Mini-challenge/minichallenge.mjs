/*
Mini-Challenge (ES):
- Crear colecciones "users", "posts" y "comments".
- Insertar 2-3 documentos en cada colección.
- Crear funciones Node.js para:
	1. Listar todos los posts con su autor.
	2. Insertar un nuevo post.
	3. Actualizar un comentario.
	4. Eliminar un usuario.

Mini-Challenge (EN):
- Create "users", "posts", and "comments" collections.
- Insert 2-3 documents in each collection.
- Create Node.js functions to:
	1. List all posts with their author.
	2. Insert a new post.
	3. Update a comment.
	4. Delete a user.
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
		const users = db.collection("users");
		const posts = db.collection("posts");
		const comments = db.collection("comments");
		const jose = await users.insertOne({ username: "Jose", email: "Jose@example.com", password: "1234" });
		const ana = await users.insertOne({ username: "Ana", email: "Ana@example.com", password: "1234" });
		const maria = await users.insertOne({ username: "Maria", email: "Maria@example.com", password: "1234" });
		const post1 = await posts.insertOne({ user_id: ana.insertedId, title: "Primer post", content: "Hola mundo!" });
		const post2 = await posts.insertOne({ user_id: maria.insertedId, title: "Segundo post", content: "Mi segundo post" });
		await comments.insertMany([
			{ post_id: post1.insertedId, user_id: ana.insertedId, comment_text: "Buen post!" },
			{ post_id: post1.insertedId, user_id: maria.insertedId, comment_text: "Gracias por comentar" },
			{ post_id: post2.insertedId, user_id: jose.insertedId, comment_text: "Menudo pedazo de post" }
		]);
		const showPostsWithAuthor = await posts.aggregate([
			{
				$lookup: {
					from: "users",
					localField: "user_id",
					foreignField: "_id",
					as: "author"
				}
			}]).toArray();
		console.log(showPostsWithAuthor);
		const newpost = await posts.insertOne({ user_id: jose.insertedId, title: "Tercer post", content: "Mi tercer post" });
		const editComment = await comments.updateOne(
			{ user_id: ana.insertedId },
			{ $set: { comment_text: "El nuevo comentario"}}
		);
		const deleteUser = await users.deleteOne({username: "Maria"});
		const deletePosts = await posts.deleteMany({ user_id: maria.insertedId});
		const deleteComments = await comments.deleteMany({user_id: maria.insertedId});
	} catch (err) {
		console.error(err);
	} finally {
		await client.close();
	}
}

run();