/*
Ejercicio 3 (ES):
- Crea un middleware "auth.js" que valide el token JWT del header.
Exercise 3 (EN):
- Create an "auth.js" middleware to validate the JWT token from the header.
*/

import express from "express";
import Joi, { func } from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3000;
const JWT_SECRET = "mi_contraseña_secreta";

app.use(express.json());

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
});

let users = [
	{ user: "jose", password:bcrypt.hashSync("1234", 10) }
]

const usersScheme = Joi.object({
	user: Joi.string().required(),
	password: Joi.string().required()
});

function authenticateToken (req, res, next) {
	const authHeader = req.headers("authorization");
	const token = authHeader && authHeader.split(" ")[1];
	if (!token)
		return res.status(401).json({error: "token requerido"});
	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err)
			return res.status(403).json({error: "token invalido o expirado"});
		req.user = user;
		next();
	})
}

app.post("/signup", async (req, res) => {
	const { error } = usersScheme.validate(req.body);
	if (error)
		return res.status(400).json({error: error.details[0].message});
	const { user, password } = req.body;
	const userSign = users.find(u => u.user === user);
	if (userSign)
		return res.status(409).json({error: "el usuario ya existe"});
	const passwordSign = await bcrypt.hash(password, 10);
	users.push({ user, password: passwordSign });
	res.status(201).json({message: "El usuario ha sido registrado con exito"});
})

app.post("/login", async (req, res) => {
	const { error } = usersScheme.validate(req.body);
	if (error)
		return res.status(400).json({error: error.details[0].message});
	const { user, password } = req.body;
	const userLog = users.find(u => u.user === user);
	if (!userLog)
		return res.status(401).json({error: "usuario o contraseña incorrecto"});
	const passwordLog = await bcrypt.compare(password, userLog.password);
	if (!passwordLog)
		return res.status(401).json({error: "usuario o contraseña incorrecto"});
	const token = jwt.sign({user: userLog.user}, JWT_SECRET, {expiresIn: "1h"});
	res.status(201).json({message: "Login realizado con exito", token});
})

app.get("/", (req, res) => {
	res.send("Bienvenido a express");
});

app.get("/profile", authenticateToken, (req, res) => {
	res.json({message: "Bienvenido a tu perfil", user: req.user});
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({error: "Error indefinido"});
});

app.listen(PORT, () => {
	console.log(`El servidor esta activo en http://localhost:${PORT}`);
});