import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import { validateBody } from "../middlewares/validate";

const router = express.Router();

const registerSchema = Joi.object({
	username: Joi.string().alphanum().min(3).max(20).required(),
	password: Joi.string().min(6).max(50).required(),
	email: Joi.string().email().required(),
	role: Joi.string().valid("user", "admin").default("user")
});

router.get("/", (req: Request, res: Response) => {
	res.send("Bienvenido a la ruta de registro");
});

interface User {
	username: string;
	email: string;
	passwordHash: string;
	role: string;
}

export const users: User[] = [];

router.post("/", validateBody(registerSchema), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, password, email, role } = req.body;
		const exists = users.some((u) => u.username === username || u.email === email);
		if (exists)
			return res.status(409).json({ error: "Usuario o email ya registrados" });
		const passwordHash = await bcrypt.hash(password, 10);
		users.push({ username, email, passwordHash, role });
		res.status(201).json({ message: "Usuario registrado correctamente" });
	} catch (err) {
		next(err);
	}
});

export default router;