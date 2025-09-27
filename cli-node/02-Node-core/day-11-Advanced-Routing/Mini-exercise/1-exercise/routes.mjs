import http from "http";

export const server = http.createServer((req, res) => {
	if (req.url === "/") {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end("<h1>Bienvenido a la página principal</h1>");
	} else if (req.url === "/about") {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end("<h1>Acerca de nosotros</h1>");
	} else if (req.url === "/data") {
		const data = {
			message: "Hola desde el servidor",
			users: [
				{ id: 1, name: "Jose" },
				{ id: 2, name: "Ana" }
			]
		};
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(data));
	} else {
		res.writeHead(404, { "Content-Type": "text/html" });
		res.end("<h1>404 - Página no encontrada</h1>");
	}
});