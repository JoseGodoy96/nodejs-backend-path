/*
Ejercicio 3 (ES):
- Inserta 3 usuarios de ejemplo.
Exercise 3 (EN):
- Insert 3 example users.
*/

CREATE DATABASE blogdb;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(250) NOT NULL
);

INSERT INTO users (username, email, password)
VALUES 
	('Jose', 'Jose@example.com', '1234'),
	('Jesus', 'Jesus@example.com', '1234'),
	('Antonio', 'Antonio@example.com', '1234');