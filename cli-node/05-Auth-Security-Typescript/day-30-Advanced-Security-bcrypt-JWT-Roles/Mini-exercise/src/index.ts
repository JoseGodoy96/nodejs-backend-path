/*
Ejercicio 1 (ES):
- Crear proyecto Node.js con TypeScript y carpetas /src, /routes, /controllers, /middlewares.
Exercise 1 (EN):
- Create Node.js project with TypeScript and folders /src, /routes, /controllers, /middlewares.
*/

import express, { Request, Response, NextFunction } from "express";

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


// === Error handling ===

app.use((req: Request, res: Response) => res.status(404).json({error: "Error ruta no encontrada"}));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => res.status(500).json({error: "Error del servidor"}));

// === start localhost ===

app.listen(PORT, () => {console.log(`El puerto esta abierto en http://localhost:${PORT}`);});