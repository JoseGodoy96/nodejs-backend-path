/*
Ejercicio 2 (ES):
- Crea una tabla "users" con columnas: id, username, email, password.
Exercise 2 (EN):
- Create a "users" table with columns: id, username, email, password.
*/

CREATE DATABASE blogdb;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(250) NOT NULL
);