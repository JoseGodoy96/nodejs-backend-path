"use strict";
/*
Ejercicio 1 (ES):
- Crear proyecto Node.js con TypeScript y carpetas /src, /routes, /controllers, /middlewares.
Exercise 1 (EN):
- Create Node.js project with TypeScript and folders /src, /routes, /controllers, /middlewares.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
// === Middlewares ===
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
// === Routes ===
app.get("/", (req, res) => res.send("Bienvenido a node.js con typescript"));
// === Error handling ===
app.use((req, res) => res.status(404).json({ error: "Error ruta no encontrada" }));
app.use((err, req, res, next) => res.status(500).json({ error: "Error del servidor" }));
// === start localhost ===
app.listen(PORT, () => { console.log(`El puerto esta abierto en http://localhost:${PORT}`); });
//# sourceMappingURL=index.js.map