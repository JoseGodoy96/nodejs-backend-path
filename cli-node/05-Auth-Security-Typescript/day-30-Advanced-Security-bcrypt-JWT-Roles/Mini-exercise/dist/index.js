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
const express_1 = __importDefault(require("express"));
const register_1 = __importDefault(require("./routes/register"));
const login_1 = __importDefault(require("./routes/login"));
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
app.use("/register", register_1.default);
app.use("/login", login_1.default);
// === Error handling ===
app.use((req, res) => res.status(404).json({ error: "Error ruta no encontrada" }));
app.use((err, req, res, next) => res.status(500).json({ error: "Error del servidor" }));
// === start localhost ===
app.listen(PORT, () => { console.log(`El puerto esta abierto en http://localhost:${PORT}`); });
//# sourceMappingURL=index.js.map