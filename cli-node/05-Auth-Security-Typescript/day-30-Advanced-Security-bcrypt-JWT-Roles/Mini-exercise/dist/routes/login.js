"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const register_1 = require("./register");
const router = express_1.default.Router();
const loginScheme = joi_1.default.object({
    username: joi_1.default.string().min(3).max(10).required(),
    password: joi_1.default.string().required()
});
router.get("/", (req, res) => {
    res.send("Bienvenido a la ruta del login");
});
router.post("/", async (req, res) => {
    const { error, value } = loginScheme.validate(req.body);
    if (error)
        return res.status(400).json({ error: "login invalido" });
    const { username, password } = value;
    const user = register_1.users.find(u => u.username === username);
    if (!user)
        return res.status(401).json({ error: "Usuario no encontrado" });
    const isValid = await bcrypt_1.default.compare(password, user.passwordHash);
    if (!isValid)
        return res.status(401).json({ error: "Contraseña incorrecta" });
    const token = jsonwebtoken_1.default.sign({ username: user.username }, process.env.JWT_SECRET || "claveSecreta", { expiresIn: "1h" });
    res.json({ message: "Login correcto", token });
});
exports.default = router;
//# sourceMappingURL=login.js.map