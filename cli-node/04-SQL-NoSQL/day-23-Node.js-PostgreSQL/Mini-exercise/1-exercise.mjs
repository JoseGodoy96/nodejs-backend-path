/*
Ejercicio 1 (ES):
- Crear un proyecto Node.js y configurar PostgreSQL con la base de datos "blogdb".
Exercise 1 (EN):
- Create a Node.js project and configure PostgreSQL with database "blogdb".
*/

import pkg from "pg";
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