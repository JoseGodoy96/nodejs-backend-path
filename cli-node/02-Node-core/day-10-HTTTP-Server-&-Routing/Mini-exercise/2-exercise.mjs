/*
Ejercicio 2 (ES):
- Añade una ruta "/greet" que lea un query param "name" y devuelva "Hola, {name}".

Exercise 2 (EN):
- Add a "/greet" route that reads a query param "name" and returns "Hello, {name}".
*/

import http from "http";

const server = http.createServer((req, res) => {
	const myURL = new URL(req.url, `http://${req.headers.host}`);
	const pathname = myURL.pathname;

	if (pathname === "/") {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end("<h1>Bienvenido a la página principal</h1>");
	} else if (pathname === "/about") {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end("<h1>Acerca de nosotros</h1>");
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