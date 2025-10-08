/*
Ejercicio 4 (ES):
- Crear función para obtener todos los usuarios.
Exercise 4 (EN):
- Create a function to get all users.
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

async function getUser(name) {
	try {
        let res;
        if (name) {
            const query = 'SELECT * FROM users WHERE name = $1';
            res = await pool.query(query, [name]);
        } else {
            res = await pool.query('SELECT * FROM users');
        }
		console.log(res.rows);
	} catch (err) {
		console.error(err);
	} finally {
		await pool.end();
	}
};

getUser('Juan');