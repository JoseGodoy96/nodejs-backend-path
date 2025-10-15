# 📘 Día 29 – Introducción a la Autenticación / Authentication Basics

## 🎯 Objetivo / Goal

**ES:**  
Comprender los fundamentos de la **autenticación en aplicaciones backend**.  
Aprenderás las diferencias entre autenticación y autorización, los flujos más comunes (login, registro, logout) y las bases para proteger rutas privadas.

**EN:**  
Understand the fundamentals of **authentication in backend applications**.  
You will learn the differences between authentication and authorization, common flows (login, signup, logout), and the basics of protecting private routes.

---

## 🔐 Conceptos Clave / Key Concepts

### 🔸 Autenticación vs Autorización / Authentication vs Authorization

| Concepto | Descripción (ES) | Description (EN) |
|-----------|------------------|------------------|
| **Autenticación** | Verifica quién eres. | Verifies who you are. |
| **Autorización** | Define qué puedes hacer. | Defines what you can do. |

---

### 🔸 Métodos comunes de autenticación / Common authentication methods
- **Tokens (JWT)**: se envían con cada request HTTP.  
- **Sesiones y cookies**: el servidor mantiene el estado.  
- **OAuth2**: delega autenticación en servicios externos (Google, GitHub, etc).  

---

### 🔸 Flujo básico de autenticación / Basic authentication flow

1. El usuario se **registra** → se guarda su contraseña **encriptada**.  
2. El usuario se **logea** → el servidor valida sus credenciales.  
3. El servidor devuelve un **token o sesión**.  
4. El usuario envía ese token con cada request para acceder a rutas privadas.

---

## 🧩 Ejemplo visual / Visual Example

```text
[Registro] ---> [Encriptar contraseña] ---> [Base de datos]
[Login] ---> [Validar credenciales] ---> [Token o Sesión]
[Rutas protegidas] <--- [Token enviado en headers]
