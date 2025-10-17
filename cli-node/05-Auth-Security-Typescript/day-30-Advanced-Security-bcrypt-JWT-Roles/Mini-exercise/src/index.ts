/*
Ejercicio 1 (ES):
- Crear proyecto Node.js con TypeScript y carpetas /src, /routes, /controllers, /middlewares.
Exercise 1 (EN):
- Create Node.js project with TypeScript and folders /src, /routes, /controllers, /middlewares.
*/

/*
Ejercicio 2 (ES):
- Instalar y configurar bcrypt para hashear contraseñas al registrar usuarios.
Exercise 2 (EN):
- Install and configure bcrypt to hash passwords when registering users.
*/

/*
Ejercicio 3 (ES):
- Instalar y configurar JWT para generar tokens al hacer login.
Exercise 3 (EN):
- Install and configure JWT to generate tokens at login.
*/

import express, { Request, Response, NextFunction } from "express";
import registerRouter from './routes/register';
import loginRouter from './routes/login';

const app = express();
const PORT = 3000;

app.use(express.json());

// === Middlewares ===

app.use((req: Request, res: Response, next: NextFunction) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
})

// === Routes ===

app.get("/", (req, res) => res.send("Bienvenido a node.js con typescript"));

app.use("/register", registerRouter);
app.use("/login", loginRouter);

// === Error handling ===

app.use((req: Request, res: Response) => res.status(404).json({error: "Error ruta no encontrada"}));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => res.status(500).json({error: "Error del servidor"}));

// === start localhost ===

app.listen(PORT, () => {console.log(`El puerto esta abierto en http://localhost:${PORT}`);});