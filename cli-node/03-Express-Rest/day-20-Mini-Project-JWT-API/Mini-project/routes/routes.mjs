import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loadData, saveData } from "../data/data.mjs";
import { authenticateToken } from "../middlewares/auth.mjs";

const router = express.Router();
const JWT_SECRET = "mi_contraseña_secreta";

const usersScheme = Joi.object({
	user: Joi.string().required(),
	password: Joi.string().required()
});

router.post("/signup", async (req, res) => {
	const { error } = usersScheme.validate(req.body);
	if (error) 
		return res.status(400).json({ error: error.details[0].message });	
	const { user, password } = req.body;
	const data = loadData();	
	if (data.users.find(u => u.user === user))
		return res.status(409).json({ error: "Usuario ya existente" });	
	const passwordHash = await bcrypt.hash(password, 10);
	data.users.push({ user, password: passwordHash });
	saveData(data);	
	res.status(201).json({ message: "Usuario registrado con éxito" });
});

router.post("/login", async (req, res) => {
	const { error } = usersScheme.validate(req.body);
	if (error) 
		return res.status(400).json({ error: error.details[0].message });	
	const { user, password } = req.body;
	const data = loadData();
	const userLog = data.users.find(u => u.user === user);	
	if (!userLog) 
		return res.status(401).json({ error: "Usuario o contraseña incorrecto" });	
	const passwordMatch = await bcrypt.compare(password, userLog.password);
	if (!passwordMatch)
		return res.status(401).json({ error: "Usuario o contraseña incorrecto" });	
	const token = jwt.sign({ user: userLog.user }, JWT_SECRET, { expiresIn: "1h" });
	res.json({ message: "Login correcto", token });
});

router.get("/profile", authenticateToken, (req, res) => {
	res.json({ message: "Perfil del usuario", user: req.user });
});

export default router;