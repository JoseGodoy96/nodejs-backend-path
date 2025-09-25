/*
Ejercicio 3 (ES):
- Crea un pequeño servidor HTTP que devuelva "Hola desde Node.js"
	cuando entres a http://localhost:3000

Exercise 3 (EN):
- Create a small HTTP server that responds with "Hello from Node.js"
	when you visit http://localhost:3000
*/

import http from "http";

const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-type": "text/plain" });
	res.end("Hola desde Node.js");
});

server.listen(3000, () => {
	console.log("Servidor activado pulse aqui -> http://localhost:3000");
});