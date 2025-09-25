
// Crear un servidor
import http from "http";

// Crear servidor
const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" }); // Cabecera
	res.end("Hola desde el servidor con Node.js! 🚀");     // Respuesta
});

// Escuchar en un puerto
server.listen(3000, () => {
	console.log("Servidor corriendo en http://localhost:3000");
});

// Diferenciar rutas (muy basico)

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
	console.log("Servidor corriendo en http://localhost:3000");
});

// Manejo de JSON

const server = http.createServer((req, res) => {
	if (req.url === "/api") {
    	res.writeHead(200, { "Content-Type": "application/json" });
    	const data = { mensaje: "Hola desde la API", fecha: new Date() };
    	res.end(JSON.stringify(data));
	}
});

server.listen(3000, () => {
	console.log("Servidor API en http://localhost:3000/api");
});

/*

Con http puedes construir un servidor desde cero.
Pero en proyectos reales casi siempre usamos Express.js porque simplifica
muchísimo la creación de rutas, middlewares y manejo de peticiones.

*/