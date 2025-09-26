/*
Mini-Challenge (ES):
- Crea un servidor HTTP con estas rutas:
	1. "/" → mensaje de bienvenida
	2. "/time" → devuelve la hora actual en JSON { "time": "HH:MM:SS" }
	3. "/greet" → devuelve un saludo personalizado con query param "name"
- Maneja correctamente rutas inexistentes con 404

Mini-Challenge (EN):
- Create an HTTP server with these routes:
	1. "/" → welcome message
	2. "/time" → return current time in JSON { "time": "HH:MM:SS" }
	3. "/greet" → return personalized greeting with query param "name"
- Properly handle non-existent routes with 404
*/

import http from "http";


function getFormattedTime() {
	const fecha = new Date();
	const hours = String(fecha.getHours()).padStart(2, "0");
	const minutes = String(fecha.getMinutes()).padStart(2, "0");
	const seconds = String(fecha.getSeconds()).padStart(2, "0");
	return `${hours}:${minutes}:${seconds}`;
}

const server = http.createServer((req, res) => {
	const myURL = new URL(req.url, `http://${req.headers.host}`);
	const pathname = myURL.pathname;

	if (pathname === "/") {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end("<h1>Bienvenido a la página principal</h1>");
	} else if (pathname === "/time") {
		const data = { time: getFormattedTime() };
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(data));
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