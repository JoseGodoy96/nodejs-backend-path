import http from "http";

export const server = http.createServer((req, res) => {
	const myURL = new URL(req.url, `http://${req.headers.host}`);
	const pathname = myURL.pathname;

	if (pathname === "/") {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end("<h1>Bienvenido a la página principal</h1>");
	} else if (pathname === "/about") {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end("<h1>Acerca de nosotros</h1>");
	} else if (pathname === "/data") {
		const data = {
			message: "Hola desde el servidor",
			users: [
				{ id: 1, name: "Jose" },
				{ id: 2, name: "Ana" }
			]
		};
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(data));
	} else if (pathname.startsWith("/users/")) {
		const parts = pathname.split("/");
		const userId = parts[2];
		const userData = { id: userId, name: `User ${userId}` };

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(userData));
	} else {
		res.writeHead(404, { "Content-Type": "text/html" });
		res.end("<h1>404 - Página no encontrada</h1>");
	}
});