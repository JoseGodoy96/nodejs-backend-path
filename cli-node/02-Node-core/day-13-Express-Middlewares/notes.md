# 📅 Day 13 – Express Middlewares / Middlewares en Express

## 🧩 ¿Qué es un middleware? / What is a middleware?
**ES:**  
Un middleware es una función que se ejecuta en la cadena de peticiones antes de llegar a la ruta final.  
Ejemplo de usos: logs, parseo de JSON, autenticación, validaciones.  

**EN:**  
A middleware is a function that runs in the request pipeline before reaching the final route.  
Use cases: logging, JSON parsing, authentication, validations.  

---

## 🛠️ Middlewares incorporados / Built-in middlewares
```js
app.use(express.json());       // Parsear JSON
app.use(express.urlencoded()); // Parsear datos de formularios
