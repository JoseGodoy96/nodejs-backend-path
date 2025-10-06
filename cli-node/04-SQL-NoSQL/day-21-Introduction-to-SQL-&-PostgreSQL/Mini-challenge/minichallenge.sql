/*
Mini-Challenge (ES):
- Crea las tablas "users", "posts" y "comments" en PostgreSQL.
- Define claves primarias y foráneas para relacionarlas.
- Inserta datos de ejemplo y haz consultas JOIN para:
	1. Listar todos los posts con el nombre del autor.
	2. Listar todos los comentarios de un post específico.

Mini-Challenge (EN):
- Create "users", "posts", and "comments" tables in PostgreSQL.
- Define primary and foreign keys to relate them.
- Insert sample data and perform JOIN queries to:
	1. List all posts with the author's name.
	2. List all comments of a specific post.
*/

CREATE DATABASE blogdb;

\c blogdb;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	user VARCHAR(50) UNIQUE NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(200) NOT NULL
);

CREATE TABLE posts (
	post_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	title VARCHAR(200) NOT NULL,
	content TEXT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (post_id) REFERENCES posts(post_id),
    FOREIGN KEY (user_id) REFERENCES users(id)    
);

SELECT posts.title, users.user
FROM posts
INNER JOIN users ON posts.user_id = users.id;

SELECT comments.comment_text, users.user
FROM comments
INNER JOIN users ON comments.user_id = users.id
WHERE comments.post_id = 1;