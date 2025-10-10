import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
	user: 'txemita',
	host: 'localhost',
	database: 'txemita',
	password: 'mi_contraseña',
	port: 5432,
});

export async function getAllUsers() {
	try {
	  const res = await pool.query('SELECT * FROM users');
		return res.rows;
	} catch (err) {
		console.error("Error al obtener usuarios:", err.message);
		throw err;
	}
}

export async function insertUser(username, password) {
	if (!username || !password) {
		throw new Error("El username y password son requeridos");
	}
	try {
		const res = await pool.query(
	    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
		[username, password]
	);
		return res.rows[0];
	} catch (err) {
		console.error("Error al insertar usuario:", err.message);
		throw err;
	}
}

export async function updateUser(id, username, password) {
	if (!id || !username || !password) {
		throw new Error("El id, username y password son requeridos");
	}	
	try {
		const res = await pool.query(
		'UPDATE users SET username=$1, password=$2 WHERE id=$3 RETURNING *',
		[username, password, id]
		);
		return res.rows[0];
	} catch (err) {
		console.error("Error al actualizar usuario:", err.message);
		throw err;
	}
}

export async function deleteUser(id) {
	if (!id) {
		throw new Error("El id es requerido para eliminar un usuario");
	}	
	try {
		await pool.query('DELETE FROM users WHERE id=$1', [id]);
		return { message: 'Usuario eliminado' };
	} catch (err) {
		console.error("Error al eliminar usuario:", err.message);
		throw err;
	}
}
