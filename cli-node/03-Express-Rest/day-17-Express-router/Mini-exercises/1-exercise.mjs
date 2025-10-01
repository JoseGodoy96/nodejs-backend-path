/*
Ejercicio 1 (ES):
- Crea un router para "users" con rutas GET "/" y GET "/:id".
Exercise 1 (EN):
- Create a "users" router with routes GET "/" and GET "/:id".
*/

import express from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
	{ id: 1, name: "Jose" },
	{ id: 2, name: "Antonio" },
	{ id: 3, name: "Manuel" }
];

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
})

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
	res.json(users);
});

usersRouter.get("/:id", (req, res) => {
	const user = users.find(u => u.id === Number(req.params.id));
	if (!user) {
		return res.status(404).json({ error: "Usuario no encontrado" });
	}
	res.json(user);
});

app.use("/users", usersRouter);

app.get("/", (req, res) => {
	res.send("Bienvenido a express.js");
});

app.use((req, res) => {
	res.status(404).send("404 - Ruta no encontrada");
});

app.listen(PORT, () => {
	console.log(`Servidor activado: http://localhost:${PORT}`);
});