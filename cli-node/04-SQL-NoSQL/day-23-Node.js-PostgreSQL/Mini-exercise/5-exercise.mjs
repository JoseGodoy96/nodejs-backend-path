/*
Ejercicio 5 (ES):
- Crear función para actualizar el email de un usuario específico.
Exercise 5 (EN):
- Create a function to update a specific user's email.
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

async function newEmail(email, id) {
	try {
		let res;
		if (!email || !id) {
			console.log("Es necesario Email e ID");
		} else {
			const query = 'UPDATE users SET email = $1 WHERE id = $2;';
			res = await pool.query(query, [email, id]);
			console.log(`Filas actualizadas: ${res.rowCount}`);
		}
	} catch (err) {
		console.error(err);
	} finally {
		await pool.end();
	}
};

newEmail('new@email.com', 1);