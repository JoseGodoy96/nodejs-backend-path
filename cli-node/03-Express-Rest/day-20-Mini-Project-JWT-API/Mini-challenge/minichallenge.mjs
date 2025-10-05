/*
Mini-Challenge (ES):
- Construye una API con Express que tenga:
	1. Registro de usuarios (POST "/signup").
	2. Login con JWT (POST "/login").
	3. Middleware de autenticación (auth.js).
	4. Ruta protegida GET "/profile".
	5. Organización modular: routers, middlewares, data.
	6. Manejo de errores global.

Mini-Challenge (EN):
- Build an Express API with:
	1. User signup (POST "/signup").
	2. Login with JWT (POST "/login").
	3. Authentication middleware (auth.js).
	4. Protected route GET "/profile".
	5. Modular organization: routers, middlewares, data.
	6. Global error handling.
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
	{ user: "jose", password: bcrypt.hashSync("1234", 10) }
]

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
			return res.status(403).json({error: "el token es invalido o expiro"});
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
		return res.status(409).json({error: "usuario ya existente"});
	const passwordSign = await bcrypt.hash(password, 10);
	users.push({ user, password: passwordSign});
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
	res.status(201).json({message: "El login se ha realizado con exito", token});
})

app.get("/profile", authenticateToken, (req, res) => {
	res.json({message: "Bienvenido al perfil del usuario", user: req.user});
});

app.get("/", (req, res) => {
	res.send("Bienvenido a minichallenge del dia 20");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({error: "Error indefinido"});
});

app.use((req, res) => {
	res.status(404).send("Ruta desconocida");
});

app.listen(PORT, () => {
	console.log(`El servidor esta activo en http://localhost:${PORT}`);
});