import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";

const router = express.Router();

const registerScheme = Joi.object({
	username: Joi.string().min(3).max(20).required(),
	password: Joi.string().required()
});

router.get("/", (req: Request, res: Response) => {
	res.send("Bienvenido a la ruta de registro");
});

interface User {
	username: string;
	passwordHash: string;
}

export const users: User[] = [];

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { error } = registerScheme.validate(req.body);
		if (error)
			return res.status(400).json({ error: error.details[0].message });
		const { username, password } = req.body;
		const passwordHash = await bcrypt.hash(password, 10);
		users.push({ username, passwordHash });
		res.status(201).json({ message: "Usuario registrado correctamente" });
	} catch (err) {
		next(err);
	}
});

export default router;