# 📅 Day 11 – Advanced Routing & Modularization / Routing avanzado y modularización

## 🗂️ Modularización de rutas / Route modularization
**ES:**  
- En lugar de tener todo en un solo archivo, separa el manejo de rutas en funciones o módulos.  
- Esto facilita el mantenimiento y escalabilidad.  

**EN:**  
- Instead of having everything in a single file, separate route handling into functions or modules.  
- This improves maintainability and scalability.  

---

## 🔢 Parámetros dinámicos / Dynamic parameters
**ES:**  
- Podemos extraer valores de la URL, por ejemplo `/users/123`.  
- Usar `req.url.split("/")` o la clase `URL` para analizarlos.  

**EN:**  
- We can extract values from the URL, e.g. `/users/123`.  
- Use `req.url.split("/")` or the `URL` class to parse them.  

### Ejemplo
```js
const server = http.createServer((req, res) => {
  const parts = req.url.split("/");
  if (parts[1] === "users" && parts[2]) {
    const userId = parts[2];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ id: userId, name: "User " + userId }));
  }
});
