import express, { Request, Response } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { users } from "./register";


const router = express.Router();

const loginScheme = Joi.object({
	username: Joi.string().min(3).max(10).required(),
	password: Joi.string().required()
});

router.get("/", (req: Request, res: Response) => {
	res.send("Bienvenido a la ruta del login");
});

router.post("/", async (req: Request, res: Response) => {
	const { error, value } = loginScheme.validate(req.body);
	if (error)
		return res.status(400).json({error: "login invalido"})
	const { username, password } = value;
	const user = users.find(u => u.username === username);
	if (!user)
		return res.status(401).json({ error: "Usuario no encontrado" });
	const isValid = await bcrypt.compare(password, user.passwordHash);
	if (!isValid)
		return res.status(401).json({ error: "Contraseña incorrecta" });
	const token = jwt.sign(
		{ username: user.username }, 
		process.env.JWT_SECRET || "claveSecreta", 
		{ expiresIn: "1h" }
	);
	res.json({ message: "Login correcto", token });
})

export default router;