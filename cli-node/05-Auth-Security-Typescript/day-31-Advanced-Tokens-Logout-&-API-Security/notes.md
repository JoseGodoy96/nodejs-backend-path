# 📘 Día 31 – Tokens Avanzados, Logout y Seguridad en APIs / Advanced Tokens, Logout & API Security

## 🎯 Objetivo / Goal

**ES:**  
Aprenderás a manejar **refresh tokens**, implementar **logout seguro**, y aplicar **buenas prácticas de seguridad** en tu API (headers, CORS, rate limiting, helmet, etc).

**EN:**  
Learn how to handle **refresh tokens**, implement **secure logout**, and apply **security best practices** in your API (headers, CORS, rate limiting, helmet, etc).

---

## 🔐 Conceptos Clave / Key Concepts

### 🔸 Access Token vs Refresh Token

| Tipo | Duración | Propósito (ES) | Purpose (EN) |
|------|-----------|----------------|--------------|
| **Access Token** | Corta (15min–1h) | Acceso rápido a recursos. | Quick access to resources. |
| **Refresh Token** | Larga (días o semanas) | Permite obtener un nuevo Access Token sin volver a logearse. | Used to get a new Access Token without re-login. |

**Flujo básico:**
1. Usuario hace login → recibe **Access Token + Refresh Token**  
2. Access Token expira rápido → el cliente usa Refresh Token para renovar  
3. En logout, el Refresh Token se invalida (se borra del servidor o DB)

---

### 🔸 Logout seguro / Secure Logout

**ES:**  
- Invalidar el refresh token (eliminarlo de DB o lista de válidos).  
- Nunca almacenar tokens en `localStorage`, preferir `httpOnly cookies`.  
- Revocar tokens si se detecta actividad sospechosa.

**EN:**  
- Invalidate refresh token (delete from DB or whitelist).  
- Never store tokens in `localStorage`, prefer `httpOnly cookies`.  
- Revoke tokens if suspicious activity is detected.

---

### 🔸 Seguridad en APIs / API Security

**Middleware útiles:**
```ts
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

app.use(helmet());
app.use(cors({ origin: "https://yourfrontend.com" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
