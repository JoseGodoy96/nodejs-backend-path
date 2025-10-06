/*
Mini-Challenge (ES):
- Crea las colecciones "users", "posts" y "comments".
- Inserta 2-3 documentos de ejemplo en cada colección.
- Realiza consultas:
	1. Obtener todos los posts con su autor.
	2. Obtener todos los comentarios de un post específico.
	3. Actualizar un comentario.
	4. Eliminar un usuario.

Mini-Challenge (EN):
- Create "users", "posts", and "comments" collections.
- Insert 2-3 sample documents in each collection.
- Perform queries:
	1. Get all posts with their author.
	2. Get all comments for a specific post.
	3. Update a comment.
	4. Delete a user.
*/

const database = 'blogDB';
use(database);

const ana = db.users.insertOne({ username: "Ana", email: "ana@example.com", password: "1234" });
const maria = db.users.insertOne({ username: "Maria", email: "maria@example.com", password: "1234" });

const post1 = db.posts.insertOne({ user_id: ana.insertedId, title: "Primer post", content: "Hola mundo!" });
db.posts.insertOne({ user_id: maria.insertedId, title: "Segundo post", content: "Mi segundo post" });

db.comments.insertMany([
	{ post_id: post1.insertedId, user_id: ana.insertedId, comment_text: "Buen post!" },
	{ post_id: post1.insertedId, user_id: maria.insertedId, comment_text: "Gracias por comentar" }
]);

db.posts.find();
db.comments.find({ post_id: post1.insertedId }).pretty();

db.comments.updateOne(
	{ user_id: ana.insertedId },
	{ $set: { comment_text : "nuevo comentario"}}
);

db.users.deleteOne({ username: "Ana" });
db.comments.deleteMany({ user_id: ana.insertedId });
db.posts.deleteMany({ user_id: ana.insertedId });
