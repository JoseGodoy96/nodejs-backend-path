/*
Ejercicio 5 (ES):
- Crea la ruta DELETE "/users/:id" que elimine el usuario correspondiente del array.
Exercise 5 (EN):
- Create a DELETE "/users/:id" route that deletes the corresponding user from the array.
*/

import express from "express";
const app = express();
const PORT = 3000;

let users = [
	{ id: 1, name: "Jose", email: "jose@example.com" },
	{ id: 2, name: "Ana", email: "ana@example.com" },
	{ id: 3, name: "Luis", email: "luis@example.com" }
];

app.delete("/users/:id", (req, res) => {
	const { id } = req.params;
	const userIndex = users.findIndex(u => u.id === Number(id));
	if (userIndex === -1) {
		return res.status(404).json({ error: "Usuario no encontrado" });
	}
	const deletedUser = users.splice(userIndex, 1);
	res.json({
		message: "Usuario eliminado correctamente",
		deleted: deletedUser[0],
		remaining: users
	});
});

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});