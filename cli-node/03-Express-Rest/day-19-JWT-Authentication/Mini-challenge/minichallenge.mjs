/*
Mini-Challenge (ES):
- Construye un servidor Express con:
	1. Router "users" con login POST "/login" que genere JWT.
	2. Middleware de autenticación para rutas protegidas.
	3. Ruta GET "/profile" protegida que devuelva info del usuario.
	4. Hasheo de contraseñas con bcrypt.

Mini-Challenge (EN):
- Build an Express server with:
	1. "users" router with POST "/login" that generates JWT.
	2. Authentication middleware for protected routes.
	3. GET "/profile" route protected, returning user info.
	4. Password hashing with bcrypt.
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
]

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
})

const usersScheme = Joi.object({
	user: Joi.string().required(),
	password: Joi.string().required()
});

function authenticateToken (req, res, next) {
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
	const userReg = users.find(u => u.user === user);
	if (userReg)
		return res.status(400).json({error: "El usuario ya existe"});
	const passwordLog = await bcrypt.hash(password, 10);
	users.push({ user, password: passwordLog});
	res.status(201).json({error: "Registro completado con exito"});
});

app.post("/login", async (req, res) => {
	const { error } = usersScheme.validate(req.body);
	if (error)
		return res.status(400).json({error: error.details[0].message});
	const { user, password } = req.body;
	const userLog = users.find(u => u.user === user);
	if (!userLog)
		return res.status(401).json({error: "El usuario o contraseña es incorrecto"});
	const passwordLog = await bcrypt.compare(password, userLog.password);
	if (!passwordLog)
		return res.status(401).json({error: "El usuario o contraseña es incorrecto"});
	const token = jwt.sign({user: userLog.user}, JWT_SECRET, {expiresIn: "1h"});
	res.json({message: "Login correcto", token});
});

app.get("/protected", authenticateToken, (req, res) => {
	res.json({message: "Accediste a tu perfil", user: req.user});
});

app.get("/", (req, res) => {
	res.send("Bienvenido a express, joi, jwt y bcrypt");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({error: "Error interno del servidor"});
});

app.use((req, res) => {
	res.status(404).send("Ruta no encontrada");
});

app.listen(PORT, () => {
	console.log(`El servidor esta abierto: http://localhost:${PORT}`);
});