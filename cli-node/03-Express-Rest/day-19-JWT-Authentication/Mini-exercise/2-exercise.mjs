/*
Ejercicio 2 (ES):
- Hashea contraseñas con bcrypt antes de guardarlas en el array de usuarios.
Exercise 2 (EN):
- Hash passwords with bcrypt before storing them in the users array.
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

const loginSchema = Joi.object({
	user: Joi.string().required(),
	password: Joi.string().required()
});

app.post("/register", async (req, res) => {
	const { error } = loginSchema.validate(req.body);
	if (error)
		return res.status(400).json({ error: error.details[0].message });	
	const { user, password } = req.body;
	const existingUser = users.find(u => u.user === user);
	if (existingUser)
		return res.status(400).json({ error: "Usuario ya existe" });	
	const hashedPassword = await bcrypt.hash(password, 10);
	users.push({ user, password: hashedPassword });	
	res.status(201).json({ message: "Usuario registrado exitosamente" });
});

app.post("/login", async (req, res) => {
	const { error } = loginSchema.validate(req.body);
	if (error)
		return res.status(400).json({error: error.details[0].message});
	const { user, password } = req.body;
	const userLogin = users.find(u => u.user === user);
	if (!userLogin)
		return res.status(401).json({error: "usuario o contraseña incorrecta"});
	const passwordLogin = await bcrypt.compare(password, userLogin.password);
	if (!passwordLogin)
		return res.status(401).json({error: "usuario o contraseña incorrecto"});
	const token = jwt.sign({user: userLogin.user}, JWT_SECRET, {expiresIn: "1h"});
	res.json({message: "login exitoso", token});
})

app.get("/", (req, res) => {
	res.send("Bienvenido a express, joi, jcw y bcrypt");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({error: "error interno de servidor"});
})

app.use((req, res) => {
	res.status(404).send("Ruta inexistente");
})

app.listen(PORT, () => {
	console.log(`El servidor esta activo http://localhost:${PORT}`);
});