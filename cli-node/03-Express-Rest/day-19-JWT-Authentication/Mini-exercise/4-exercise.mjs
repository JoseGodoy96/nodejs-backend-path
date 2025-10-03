/*
Ejercicio 4 (ES):
- Protege una ruta GET "/protected" usando el middleware de autenticación.
Exercise 4 (EN):
- Protect a GET "/protected" route using the authentication middleware.
*/

import express from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3000;
const JWT_SECRET = "mi_contraseña_secreta";

app.use(express.json());

let users = [
	{ user: "jose", password: bcrypt.hashSync("1234", 10)}
];

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
});

const usersScheme = Joi.object({
	user: Joi.string().required(),
	password: Joi.string().required()
});

function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token)
		return res.status(401).json({error: "Token requerido"});
	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err)
			return res.status(403).json({error: "token invalido o expirado"});
		req.user = user;
		next();
	});
}

app.post("/register", async (req, res) => {
	const { error } = usersScheme.validate(req.body);
	if (error)
		return res.status(400).json({error: error.details[0].message});
	const { user, password } = req.body;
	const userRegister = users.find(u => u.user === user);
	if (userRegister)
		return res.status(400).json({error: "El usuario ya existe"});
	const passwordRegister = await bcrypt.hash(password, 10);
	users.push({ user, password: passwordRegister});
	res.status(201).json({message: "Usuario registrado correctamente"});
});

app.post("/login", async (req, res) => {
	const { error } = usersScheme.validate(req.body);
	if (error)
		return res.status(400).json({error: error.details[0].message});
	const { user, password } = req.body;
	const userLogin = users.find(u => u.user === user);
	if (!userLogin)
		return res.status(401).json({error: "Usuario o contraseña incorrecta"});
	const passwordLogin = await bcrypt.compare(password, userLogin.password);
	if (!passwordLogin)
		return res.status(401).json({error: "Usuario o contraseña incorrecta"});
	const token = jwt.sign({user: userLogin.user}, JWT_SECRET, {expiresIn: "1h"});
	res.json({message: "login correcto", token});
});

app.get("/protected", authenticateToken, (req, res) => {
	res.json({message: "Accediste a tu perfil", token});
});

app.get("/", (req, res) => {
	res.send("Bienvenido en express, joi, jwt y bcrypt");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({error: "Error interno de servidor"});
});

app.use((req, res) => {
	res.status(404).send("Ruta no encontrada");
});

app.listen(PORT, () => {
	console.log(`El servidor esta activo: http://localhost:${PORT}`);
});