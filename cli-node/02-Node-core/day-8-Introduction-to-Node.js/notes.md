# 📅 Day 8 – Node.js Core Introduction / Introducción a Node.js Core

## 🎯 Objetivos del día / Goals
**ES:**  
- Entender qué es Node.js y cómo funciona internamente (event loop, single-thread, non-blocking I/O).  
- Aprender a usar módulos nativos (`fs`, `path`, `os`, `http`).  
- Crear un primer servidor HTTP básico.  
- Diferenciar entre CommonJS y ES Modules.

**EN:**  
- Understand what Node.js is and how it works internally (event loop, single-thread, non-blocking I/O).  
- Learn to use core modules (`fs`, `path`, `os`, `http`).  
- Create a first basic HTTP server.  
- Differentiate between CommonJS and ES Modules.

---

## 🌍 Qué es Node.js / What is Node.js
**ES:** Node.js es un entorno de ejecución para JavaScript construido sobre el motor V8 de Chrome. Permite ejecutar JS fuera del navegador y crear aplicaciones escalables y en tiempo real.  
**EN:** Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows running JS outside the browser and building scalable, real-time applications.

- Event-driven / Non-blocking I/O  
- Single-threaded, pero eficiente en operaciones asíncronas / Single-threaded but efficient for asynchronous operations

---

## 🔄 Event Loop
**ES:** Permite que Node.js maneje múltiples operaciones asíncronas sin bloquear el hilo principal.  
**EN:** Allows Node.js to handle multiple asynchronous operations without blocking the main thread.

- Callbacks, Promises y async/await funcionan sobre este loop.  

---

## 📦 Módulos nativos / Core Modules
**ES:**  
- `fs` → operaciones con archivos / file system operations  
- `path` → manejo de rutas / path handling  
- `os` → información del sistema / system info  
- `http` → crear servidores / create HTTP servers  

**EN:**  
- `fs` → file system operations  
- `path` → path handling  
- `os` → system info  
- `http` → create HTTP servers  

---

## 📂 CommonJS vs ES Modules
**ES:**  
- CommonJS (CJS): `const fs = require("fs");`  
- ES Modules (ESM): `import fs from "fs";`  
- ESM requiere `"type": "module"` en package.json

**EN:**  
- CommonJS (CJS): `const fs = require("fs");`  
- ES Modules (ESM): `import fs from "fs";`  
- ESM requires `"type": "module"` in package.json

---

## 🖥️ Servidor HTTP básico / Basic HTTP Server
**ES:**
```js
import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Hola Node.js!");
});

server.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
