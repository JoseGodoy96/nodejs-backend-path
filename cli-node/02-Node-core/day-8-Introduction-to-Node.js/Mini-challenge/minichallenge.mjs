/*
Mini-Challenge (ES):
- Crea un servidor HTTP que tenga dos rutas:
	1. "/time" → Devuelve la hora actual.
	2. "/greet" → Devuelve un saludo personalizado usando query params (ej: ?name=Jose).

Mini-Challenge (EN):
- Create an HTTP server with two routes:
	1. "/time" → Returns the current time.
	2. "/greet" → Returns a personalized greeting using query params (e.g., ?name=Jose).
*/

import http from "http";

const server = http.createServer((req, res) => {
	const myURL = new URL(req.url, `http://${req.headers.host}`);
	const pathname = myURL.pathname;

	if (pathname === "/") {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end("<h1>Bienvenido a la página principal</h1>");
	} else if (pathname === "/time") {
		const fecha = new Date();
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(`<h1>Devuelve la hora ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}</h1>`);
	} else if (pathname === "/greet") {
		const name = myURL.searchParams.get("name") || "invitado";
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(`<h1>Un saludo ${name}</h1>`);
	} else {
		res.writeHead(404, { "Content-Type": "text/html" });
		res.end("<h1>404 - Página no encontrada</h1>");
	}
});

server.listen(3000, () => {
	console.log("Servidor activado pulse aqui -> http://localhost:3000");
});