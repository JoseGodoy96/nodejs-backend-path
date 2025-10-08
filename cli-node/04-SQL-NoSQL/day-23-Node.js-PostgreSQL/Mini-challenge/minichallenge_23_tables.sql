DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
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

INSERT INTO users (username, email, password)
VALUES
	('jose', 'jose@example.com', '1234'),
	('jesus', 'jesus@example.com', '1234'),
	('antonio', 'antonio@example.com', '1234');

INSERT INTO posts (user_id, title, content)
VALUES
	(1, 'Post_1', 'Este es el texto del primer post'),
	(2, 'Post_2', 'Este es el texto del segundo post'),
	(3, 'Post_3', 'Este es el texto del tercer post'),
	(1, 'Post_4', 'Este es el texto del cuarto post'),
	(2, 'Post_5', 'Este es el texto del quinto post');