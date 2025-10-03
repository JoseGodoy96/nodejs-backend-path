/*
Ejercicio 1 (ES):
- Instala jsonwebtoken y bcrypt. Crea un endpoint POST "/login" que genere un JWT.
Exercise 1 (EN):
- Install jsonwebtoken and bcrypt. Create a POST "/login" endpoint that generates a JWT.
*/

import express from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const app = express();
const PORT = 3000;
const JWT_SECRET = "mi_clave_secreta";

app.use(express.json());

let users = [
	{ user: "jose", password: bcrypt.hashSync("1234", 10)}
];

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
});

const loginSchema = Joi.object({
	user: Joi.string().min(3).required(),
	password: Joi.string().required()
});

app.post("/login", async (req, res) => {
	const { error } = loginSchema.validate(req.body);
	if (error)
		return res.status(400).json( { error: error.details[0].message });
	const { user, password } = req.body;
	const existingUser = users.find(u => u.user === user);
	if (!existingUser)
		return res.status(401).json( { error: "Usuario o contraseña incorrecta" });
	const validPassword = await bcrypt.compare(password, existingUser.password);
	if (!validPassword)
		return res.status(401).json( { error: "Usuario o contraseña incorrecta"} );
	const token = jwt.sign( { user: existingUser.user }, JWT_SECRET, { expiresIn: "1h" });
	res.json( { message: "login exitoso", token } );
})

app.get("/", (req, res) => {
	res.send("Bienvenido a express, Joi, jwt y bcrypt");
})

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({error: "error interno de servidor"});
})

app.use((req, res) => {
	res.status(404).send("Ruta equivocada");
});

app.listen(PORT, () => {
	console.log(`el servidor esta activo: http://localhost:${PORT}`);
});