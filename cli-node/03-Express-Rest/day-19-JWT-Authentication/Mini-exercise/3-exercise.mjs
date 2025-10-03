/*
Ejercicio 3 (ES):
- Crea un middleware que verifique el token JWT en el header Authorization.
Exercise 3 (EN):
- Create a middleware that verifies the JWT token in the Authorization header.
*/

import express, { json } from "express";
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
		return res.status(401).json({ error: "Token requerido" });	
	jwt.verify(token, JWT_SECRET, (err, user) => {
	if (err) 
		return res.status(403).json({ error: "Token inválido o expirado" });
	req.user = user;
	next();
	});
};

app.post("/register", async (req, res) => {
	const { error } = usersScheme.validate(req.body);
	if (error)
		return res.status(400).json({error: error.details[0].message});
	const { user, password } = req.body;
	const userRegister = users.find(u => u.user === user);
	if (userRegister)
		return res.status(401).json({error: "usuario o contraseña incorrecta"});
	const hashedPassword = await bcrypt.hash(password, 10);
	users.push({ user, password: hashedPassword });
	res.status(201).json({message: "Usuario registrado exitosamente"});
});

app.post("/login", async (req, res) => {
	const { error } = usersScheme.validate(req.body);
	if (error)
		return res.status(400).json({error: error.details[0].message});
	const { user, password } = req.body;
	const validUser = users.find(u => u.user === user);
	if (!validUser)
		return res.status(401).json({error: "usuario o contraseña incorrecta"});
	const validPassword = await bcrypt.compare(password, validUser.password);
	if (!validPassword)
		return res.status(401).json({error: "usuario o contraseña incorrecta"});
	const token = jwt.sign({user: validUser.user}, JWT_SECRET, {expiresIn: "1h"});
	res.json({message: "login correcto", token});
});

app.get("/perfil", authenticateToken, (req, res) => {
	res.json({ message: "Accediste a tu perfil privado", user: req.user });
});

app.get("/", (req, res) => {
	res.send("Bienvenido a express, joi, jwt y bcrypt");
})

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({error: "Error interno de servidor"});
});

app.use((req, res) => {
	res.status(404).send("Ruta no encontrada");
});

app.listen(PORT, () => {
	console.log(`El servidor esta activo en: http://localhost:${PORT}`);
});