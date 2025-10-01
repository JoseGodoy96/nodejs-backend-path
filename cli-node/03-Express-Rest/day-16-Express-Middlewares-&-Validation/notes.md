# 📅 Day 16 – Express Middlewares & Validation / Middlewares y validación

## 🔄 ¿Qué es un middleware? / What is a middleware?
**ES:**  
Un middleware en Express es una función que recibe `req`, `res`, y `next`.  
Se ejecuta antes de que la petición llegue a la ruta final o a otro middleware.  

**EN:**  
A middleware in Express is a function that receives `req`, `res`, and `next`.  
It runs before the request reaches the final route or another middleware.  

---

## 🛠️ Ejemplo básico / Basic example
```js
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);
