/*
Ejercicio 1 (ES):
- Crea un servidor HTTP que responda:
	"/" → "Página principal"
	"/about" → "Página sobre nosotros"
	Otros → 404 "No encontrado"

Exercise 1 (EN):
- Create an HTTP server that responds:
	"/" → "Home page"
	"/about" → "About page"
	Others → 404 "Not Found"
*/

import http from "http";

const server = http.createServer((req, res) => {
	if (req.url === "/") {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end("<h1>Bienvenido a la página principal</h1>");
	} else if (req.url === "/about") {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end("<h1>Acerca de nosotros</h1>");
	} else {
		res.writeHead(404, { "Content-Type": "text/html" });
		res.end("<h1>404 - Página no encontrada</h1>");
	}
});

server.listen(3000, () => {
	console.log("Servidor activado pulse aqui -> http://localhost:3000");
});