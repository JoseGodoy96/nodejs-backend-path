/*
Ejercicio 3 (ES):
- Crear función para insertar un usuario en la tabla "users".
Exercise 3 (EN):
- Create a function to insert a user into the "users" table.
*/

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'blogdb',
	password: 'mi_contraseña',
	port: 5432,
});

async function insertUser() {
	try {
		const text = 'INSERT INTO users (name, email) VALUES ($1, $2);';
		const values = ['Juan', 'juan@example.com'];
		const res = await pool.query(text, values);
		console.log("Usuario insertado correctamente");
	} catch (err) {
		console.error(err);
	} finally {
		await pool.end();
	}
};

insertUser();