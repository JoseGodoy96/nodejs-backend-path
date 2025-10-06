/*
Ejercicio 5 (ES):
- Actualiza el email de un usuario específico.
Exercise 5 (EN):
- Update the email of a specific user.
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

UPDATE users SET email = 'new@example.com' WHERE id = 2;