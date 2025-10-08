/*
Ejercicio 6 (ES):
- Crear función para eliminar un usuario por id.
Exercise 6 (EN):
- Create a function to delete a user by id.
*/

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'blogdb',
	password: "mi_contraseña",
	port: 5432,
});

async function delUser(id) {
	try {
		let res;
		if (!id) {
			console.log("ID necesario");
		} else {
		const query = ('DELETE FROM users WHERE id = $1;')
		res = await pool.query(query, [id]);
		console.log(`Usuario borrado: ${res.rowCount}`);
		}
	} catch (err) {
		console.error(err);
	} finally {
		await pool.end();
	}
};

delUser(4);