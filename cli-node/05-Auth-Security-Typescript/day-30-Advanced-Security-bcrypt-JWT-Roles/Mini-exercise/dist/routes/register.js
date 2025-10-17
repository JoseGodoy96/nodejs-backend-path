"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
const registerScheme = joi_1.default.object({
    username: joi_1.default.string().min(3).max(20).required(),
    password: joi_1.default.string().required()
});
router.get("/", (req, res) => {
    res.send("Bienvenido a la ruta de registro");
});
exports.users = [];
router.post("/", async (req, res, next) => {
    try {
        const { error } = registerScheme.validate(req.body);
        if (error)
            return res.status(400).json({ error: error.details[0].message });
        const { username, password } = req.body;
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        exports.users.push({ username, passwordHash });
        res.status(201).json({ message: "Usuario registrado correctamente" });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
//# sourceMappingURL=register.js.map