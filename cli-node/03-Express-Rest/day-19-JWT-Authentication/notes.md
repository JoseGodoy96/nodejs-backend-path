# 📅 Day 19 – JWT Authentication / Autenticación JWT

## 📦 Instalación / Installation
```bash
npm install jsonwebtoken bcrypt


// Ejemplo de las librerias:
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const users = [{ id: 1, username: "jose", password: "$2b$10$..." }]; // hashed password

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ error: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user.id, username: user.username }, "secretKey", { expiresIn: "1h" });
  res.json({ token });
});

// Middleware de autenticación
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, "secretKey");
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
}

// Ruta protegida
app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: `Hola ${req.user.username}, esta ruta está protegida` });
});
