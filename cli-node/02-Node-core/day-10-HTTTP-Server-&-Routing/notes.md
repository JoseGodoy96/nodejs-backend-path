# 📅 Day 10 – HTTP Server & Routing / Servidor HTTP y Rutas

## 🌐 Servidor HTTP básico / Basic HTTP Server
**ES:**  
- Crear un servidor HTTP usando el módulo `http`.  
- Escuchar en un puerto específico y responder al navegador o terminal.

**EN:**  
- Create an HTTP server using the `http` module.  
- Listen on a specific port and respond to browser or terminal requests.

### Ejemplo
```js
import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Node.js HTTP Server!");
});

server.listen(3000, () => console.log("Server running at http://localhost:3000"));
