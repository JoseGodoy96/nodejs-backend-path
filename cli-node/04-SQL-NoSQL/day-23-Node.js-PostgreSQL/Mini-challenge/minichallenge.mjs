/*
Mini-Challenge (ES):
- Crear tablas "users" y "posts".
- Insertar 3 usuarios y 5 posts.
- Crear funciones Node.js para:
	1. Obtener todos los posts con el nombre del autor (JOIN).
	2. Insertar un nuevo post.
	3. Actualizar un post existente.
	4. Eliminar un post por id.

Mini-Challenge (EN):
- Create "users" and "posts" tables.
- Insert 3 users and 5 posts.
- Create Node.js functions to:
	1. Get all posts with author's name (JOIN).
	2. Insert a new post.
	3. Update an existing post.
	4. Delete a post by id.
*/

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'minichallenge_23',
	password: 'mi_contraseña',
	port: 5432,
});

async function getPosts() {
	try {
		const query = `
			SELECT posts.post_id, posts.title, posts.content, users.username
			FROM posts
			JOIN users ON posts.user_id = users.id;
		`;
		const res = await pool.query(query);
		console.log(res.rows);
	} catch (err) {
		console.error(err);
	}
};

async function newPost(user_id, title, content) {
	try {
		if (!user_id || !title || !content) {
			console.log("Es necesario user_id, title o content");
		} else {
			const query = 'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3);';
			const res = await pool.query(query, [user_id, title, content]);
			console.log("Post nuevo insertado correctamente");
		}
	} catch (err) {
		console.error(err);
	}
};

async function updPostTitle(post_id, title) {
	try {
		if (!post_id || !title) {
			console.log("Es necesario post_id y title");
			return;
		}
		const query = 'UPDATE posts SET title = $1 WHERE post_id = $2;';
		const res = await pool.query(query, [title, post_id]);
		console.log(`Filas actualizadas: ${res.rowCount}`);
	} catch (err) {
		console.error(err);
	}
};

async function delPost(post_id) {
	try {
		if (!post_id) {
			console.log("Es necesario post_id");
			return;
		}
		const query = 'DELETE FROM posts WHERE post_id = $1;';
		const res = await pool.query(query, [post_id]);
		console.log(`Post eliminado: ${res.rowCount}`);
	} catch (err) {
		console.error(err);
	}
};

async function closePool() {
	await pool.end();
};

async function main() {
	await getPosts();
	await newPost(1, 'Nuevo post', 'Contenido del post');
	await updPostTitle(2, 'Título actualizado');
	await delPost(3);
	await closePool();
};

main();