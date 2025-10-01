/*
Ejercicio 2 (ES):
- Integra el router de "users" en el servidor principal con app.use("/users", userRouter).
Exercise 2 (EN):
- Integrate the "users" router into the main server with app.use("/users", userRouter).
*/

import express from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
	{ id: 1, name: "Jose" },
	{ id: 2, name: "Jesus" },
	{ id: 3, name: "Antonio" }
]

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
	if (!user)
		return res.status(404).json({ error: "Usuario no encontrado" });
	res.json(user);
});

app.use()

app.get("/", (req, res) => {
	res.send("Bienvenido a express.js");
})

app.use((req, res) => {
	res.status(404).send("No se encontro la ruta");
})

app.listen(PORT, () => {
	console.log(`Servidor activado http://localhost:${PORT}`);
});