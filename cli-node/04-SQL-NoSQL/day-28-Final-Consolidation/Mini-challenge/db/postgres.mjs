import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
	user: 'txemita',
	host: 'postgres',
	database: 'txemita',
	password: 'mi_contraseña',
	port: 5432,
});

export async function getUsers() {
	try {
		const res = await pool.query('SELECT * FROM users');
		return (res.rows);
	} catch (err) {
		console.error("Error al obtener usuarios", err.message);
		throw (err);
	}
};

export async function insertUser(username, email, password) {
	if (!username || !email || !password)
		throw (new Error("El username el email y la password son necesarios"));
	try {
		const res = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
		return (res.rows[0]);
	} catch (err) {
		console.error("Error al insertar usuario", err.message);
		throw (err);
	}
};

export async function updateUser(id, username, email, password) {
	if (!id || !username || !email || !password)
		throw (new Error("El id, username, mail o password son requeridos"));
	try {
		const res = await pool.query('UPDATE users SET username=$1, email=$2, password=$3 WHERE id=$4 RETURNING *', [username, email, password, id]);
		return (res.rows[0]);
	} catch (err) {
		console.error("Error al insertar usuario", err.message);
		throw (err);
	}
};

export async function deleteUser(id) {
	if (!id)
		throw (new Error("El id es requerido para eliminar un usuario"));
	try {
		await pool.query('DELETE FROM users WHERE id=$1', [id]);
		return { message: 'Usuario eliminado' };
	} catch (err) {
		console.error("Error al eliminar usuario:", err.message);
		throw (err);
	}
};