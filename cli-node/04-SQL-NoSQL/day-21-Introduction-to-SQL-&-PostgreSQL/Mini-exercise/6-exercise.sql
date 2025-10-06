/*
Ejercicio 6 (ES):
- Elimina un usuario específico.
Exercise 6 (EN):
- Delete a specific user.
*/

CREATE DATABASE blogdb;

\c blogdb;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	user VARCHAR(50) UNIQUE NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(200) NOT NULL
);

INSERT INTO users (user, email, password)
VALUES
	('jose', 'jose@example.com', '1234'),
	('jesus', 'jesus@example.com', '1234'),
	('antonio', 'antonio@example.com', '1234');

DELETE FROM users WHERE id = 2;