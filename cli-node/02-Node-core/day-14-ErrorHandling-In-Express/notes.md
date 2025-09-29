# 📅 Day 14 – Error Handling in Express / Manejo de errores en Express

## ⚠️ Flujo de errores / Error flow
**ES:**  
- Express pasa los errores a un middleware especial que tiene **4 parámetros**: `(err, req, res, next)`.  
- Si no se maneja, Express devolverá un error genérico.  

**EN:**  
- Express forwards errors to a special middleware with **4 parameters**: `(err, req, res, next)`.  
- If not handled, Express will return a generic error.  

---

## 🛠️ Middleware de errores / Error middleware
```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
