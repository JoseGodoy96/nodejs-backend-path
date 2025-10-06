/*
Ejercicio 4 (ES):
- Haz consultas SELECT para obtener todos los usuarios.
Exercise 4 (EN):
- Perform SELECT queries to get all users.
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
	('Jose', 'Jose@example.com', '1234'),
	('J', 'J@example.com', '1234'),
	('Jo', 'Jo@example.com', '1234');

SELECT * FROM users;