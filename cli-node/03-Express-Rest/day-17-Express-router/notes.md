# 📅 Day 17 – Express Router / Router y organización de rutas

## 🔀 ¿Qué es express.Router? / What is express.Router?
**ES:**  
- `express.Router()` permite crear rutas separadas y luego integrarlas al servidor principal.  
- Ideal para dividir rutas por recurso o funcionalidad.  

**EN:**  
- `express.Router()` allows creating separate route modules to plug into the main server.  
- Ideal for splitting routes by resource or functionality.

---

## 🛠️ Ejemplo básico / Basic example

**users.js**
```js
const express = require("express");
const router = express.Router();

const users = [
  { id: 1, name: "Jose" },
  { id: 2, name: "Ana" }
];

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(user);
});

module.exports = router;
