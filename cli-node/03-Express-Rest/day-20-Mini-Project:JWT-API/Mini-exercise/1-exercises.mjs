/*
Ejercicio 1 (ES):
- Crea un router "users" con POST "/signup" para registrar usuarios (usa bcrypt).
Exercise 1 (EN):
- Create a "users" router with POST "/signup" to register users (use bcrypt).
*/

import express from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3000;
const JWT_SECRET = "mi_contraseña_correcta";

app.use(express.json());

let users = [
	{user: "jose", password: bcrypt.hashSync("1234", 10)}
];

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
});

const usersScheme = Joi.object({
	user: Joi.string().required(),
	password: Joi.string().required()
});

const usersRouter = express.Router();

usersRouter.post("/signup", async (req, res) => {
	
});

app.use("/users", usersRouter);

app.get("/", (req, res) => {
	res.send("Bienvenido a express, joi, jwt y bcrypt");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({error: "Error interno del servidor"});
});

app.use((req, res) => {
	res.status(404).send("Ruta desconocida");
});

app.listen(PORT, () => {
	console.log(`El servidor esta activo en: http://localhost:${PORT}`);
});