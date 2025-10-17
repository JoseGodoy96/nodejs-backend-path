import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateBody = (schema: Joi.ObjectSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
	const { error } = schema.validate(req.body, { abortEarly: false });
	if (error) {
		const details = error.details.map((d) => d.message);
			return res.status(400).json({ error: "Datos inválidos", details });
	}
	next();
	};
};
