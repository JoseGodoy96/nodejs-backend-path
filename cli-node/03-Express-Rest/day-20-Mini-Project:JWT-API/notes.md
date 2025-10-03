# 📅 Day 20 – Mini-Project: JWT API

## 🚀 Objetivo / Goal
**ES:** Crear una API en Express con autenticación JWT, registro de usuarios y rutas protegidas.  
**EN:** Build an Express API with JWT authentication, user signup, and protected routes.  

---

## 🛠️ Funcionalidades mínimas / Minimum features
1. **Registro de usuario / User signup**  
   - Endpoint: POST `/signup`  
   - Guarda usuario en memoria con contraseña hasheada (bcrypt).  

2. **Login de usuario / User login**  
   - Endpoint: POST `/login`  
   - Verifica credenciales y devuelve un JWT válido.  

3. **Ruta protegida / Protected route**  
   - Endpoint: GET `/profile`  
   - Requiere token válido en el header Authorization.  

---

## 📦 Dependencias
```bash
npm install express jsonwebtoken bcrypt
