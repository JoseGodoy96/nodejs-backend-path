import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
	username: string;
	role: string;
	iat: number;
	exp: number;
}

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const authHeader = req.headers["authorization"];
		if (!authHeader)
			return res.status(401).json({ error: "Token no proporcionado" });
		const token = authHeader.split(" ")[1];
		if (!token)
			return res.status(401).json({ error: "Formato de token inválido" });
		const secret = process.env.JWT_SECRET || "claveSecreta";
		const decoded = jwt.verify(token, secret) as JwtPayload;
		(req as any).user = decoded;
		next();
	} catch (err) {
		return res.status(403).json({ error: "Token inválido o expirado" });
	}
};
