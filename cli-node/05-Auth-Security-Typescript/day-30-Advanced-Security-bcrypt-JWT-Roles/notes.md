# 📘 Día 30 – Seguridad Avanzada: bcrypt, JWT, Roles / Advanced Security: bcrypt, JWT, Roles

## 🎯 Objetivo / Goal

**ES:**  
Aprender a proteger contraseñas con **bcrypt**, implementar **JWT** para autenticación y autorización, manejar **roles de usuario**, y validar datos con **Joi/Zod**. Introducción al uso de **TypeScript** en proyectos Node.js para mayor seguridad y autocompletado.

**EN:**  
Learn how to secure passwords with **bcrypt**, implement **JWT** for authentication and authorization, manage **user roles**, and validate data with **Joi/Zod**. Introduction to using **TypeScript** in Node.js projects for better safety and autocomplete.

---

## 🔐 Conceptos Clave / Key Concepts

### 🔸 bcrypt / Password Hashing

| Concepto | Descripción (ES) | Description (EN) |
|-----------|-----------------|-----------------|
| **hash** | `bcrypt.hash(password, saltRounds)` → encripta la contraseña antes de guardar. | Encrypts the password before storing. |
| **compare** | `bcrypt.compare(password, hash)` → compara contraseña ingresada con hash guardado. | Compares entered password with stored hash. |

---

### 🔸 JWT / JSON Web Token

| Concepto | Descripción (ES) | Description (EN) |
|-----------|-----------------|-----------------|
| **sign** | `jwt.sign(payload, secret, options)` → crea un token con información (ej: userId, role). | Creates a token with info (e.g., userId, role). |
| **verify** | `jwt.verify(token, secret)` → valida el token recibido. | Validates the received token. |

---

### 🔸 Roles y Middleware / Roles & Middleware

- Middleware para proteger rutas según rol:
```ts
const authorize = (roles: string[]) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).send("Forbidden");
  next();
};
