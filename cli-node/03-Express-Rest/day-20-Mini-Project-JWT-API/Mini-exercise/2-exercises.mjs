/*
Ejercicio 2 (ES):
- Implementa POST "/login" que devuelva un JWT si las credenciales son correctas.
Exercise 2 (EN):
- Implement POST "/login" that returns a JWT if credentials are correct.
*/

import express from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { memo } from "react";

const app = express();
const PORT = 3000;
const JWT_SECRET = "mi_contraseña_secreta";

app.use(express.json());

let users = [
	{ user: "jose", password: bcrypt.hashSync("1234", 10) }
];

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
});

const usersScheme = Joi.object({
	user: Joi.string().required(),
	password: Joi.string().required()
});

function authenticateToken (req, res, next)  {
	const autHeader = res.headers("authorization");
	const token = autHeader && autHeader.split(" ")[1];
	if (!token)
		return res.status(401).json({error: "token requerido"});
	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err)
			return res.status(403).json({error: "token invalido o expirado"});
		req.user = user;
		next();
	});
};

app.post("/signup", async (req, res) => {
	const { error } = usersScheme.validate(req.body);
	if (error)
		return res.status(400).json({error: error.details[0].message});
	const { user, password } = req.body;
	const userSig = users.find(u => u.user === user);
	if (userSig)
		return res.status(409).json({error: "el usuario ya existe"});
	const passwordSig = await bcrypt.hash(password, 10);
	users.push({user, password: passwordSig});
	res.status(201).json({message: "Registro correcto"});
});

app.post("/login", async (req, res) => {
	const { error } = usersScheme.validate(req.body);
	if (error)
		return res.status(400).json({error: error.details[0].message});
	const { user, password } = req.body;
	const userLog = users.find(u => u.user === user);
	if (!userLog)
		return res.status(401).json({error: "usuario o contraseña incorrecta"});
	const passwordLog = await bcrypt.compare(password, userLog.password);
	if (!passwordLog)
		return res.status(401).json({error: "usuario o contraseña incorrecta"});
	const token = jwt.sign({user: userLog.user}, JWT_SECRET, {expiresIn: "1h"});
	res.status(200).json({message: "login con exito", token});
});

app.get("/profile", authenticateToken, (req, res) => {
	res.json({message: "Bienvenido a tu perfil", user: req.user});
});

app.get("/", (req, res) => {
	res.send("Bienvenido a express, Joi, jwt y bcrypt");
});

app.use((req, res, next) => {
	console.error(err.stack);
	res.status(500).json({error: "Error interno del servidor"});
});

app.use((req, res) => {
	res.status(404).send("Ruta desconocida");
});

app.listen(PORT, () => {
	console.log(`El servidor esta activo en: http://localhost:${PORT}`);
});