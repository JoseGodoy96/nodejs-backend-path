import { Request, Response, NextFunction } from "express";

export const checkRole = (allowedRoles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user)
		return res.status(401).json({ error: "Usuario no autenticado" });
    if (!allowedRoles.includes(user.role))
		return res.status(403).json({ error: "Acceso denegado: rol insuficiente" });
    next();
	};
};
