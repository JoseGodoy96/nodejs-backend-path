import jwt from "jsonwebtoken";

const JWT_SECRET = "mi_contraseña_secreta";

export function authenticateToken (req, res, next) {
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