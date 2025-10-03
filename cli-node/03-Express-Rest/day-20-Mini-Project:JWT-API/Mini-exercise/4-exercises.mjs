/*
Ejercicio 4 (ES):
- Protege una ruta GET "/profile" que solo devuelva datos del usuario si el token es válido.
Exercise 4 (EN):
- Protect a GET "/profile" route that only returns user data if the token is valid.
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

function authenticateToken (req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token)
		return res.status(401).json({error: "token requerido"});
	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err)
			return res.status(403).json({error: "token invalido o expirado"});
		req.user = user;
		next();
	});
};

app.post("/register", async (req, res) => {
	const { error } = usersScheme.validate(req.body);
	if (error)
		return res.status(400).json({error: error.details[0].message});
	const { user, password } = req.body;
	const userReg = users.find(u => u.user === user);
	if (userReg)
		return res.status(401).json({error: "El usuario ya existe"});
	const passwordReg = await bcrypt.hash(password, 10);
	users.push({ user, password: passwordReg });	
	res.status(201).json({message: "Registro completado con exito"});
});

app.post("/login", async (req, res) => {
	const { error } = usersScheme.validate(req.body);
	if (error)
		return res.status(400).json({error: error.details[0].message});
	const { user, password } = req.body;
	const userLog = users.find(u => u.user === user);
	if (!userLog)
		return res.status(401).json({error: "El usuario o la contraseña es incorrecto"});
	const passwordLog = await bcrypt.compare(password, userLog.password);
	if (!passwordLog)
		return res.status(401).json({error: "El usuario o la contraseña es incorrecto"});
	const token = jwt.sign({user: userLog.user}, JWT_SECRET, {expiresIn: "1h"});
	res.json({message: "Login correcto", token});
});

app.get("/profile", authenticateToken, (req, res) => {
    res.json({message: "Perfil del usuario", user: req.user});
});

app.get("/", (req, res) => {
	res.send("Bienvenido a express, Joi, jwt y bcrypt");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({error: "Error indefinido del servidor"});
});

app.use((req, res) => {
	res.status(404).send("Ruta desconocida");
});

app.listen(PORT, () => {
	console.log(`El servidor esta abierto en: http://localhost:${PORT}`);
});