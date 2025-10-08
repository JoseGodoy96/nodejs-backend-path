/*
Ejercicio 2 (ES):
- Conectar Node.js con PostgreSQL usando 'pg'.
Exercise 2 (EN):
- Connect Node.js to PostgreSQL using 'pg'.
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

async function getUser() {
	try {
		const res = await pool.query('SELECT * FROM users');
		console.log(res.rows);
	} catch (err) {
		console.error(err);
	}
}

getUser();