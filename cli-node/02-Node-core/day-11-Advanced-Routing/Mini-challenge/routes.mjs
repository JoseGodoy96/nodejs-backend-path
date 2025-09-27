import http from "http";

const products = [
	{ id: 1, name: "Laptop", price: 1200 },
	{ id: 2, name: "Teclado", price: 50 },
	{ id: 3, name: "Mouse", price: 30 }
];

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
	} else if (pathname.startsWith("/products/")) {
		const parts = pathname.split("/");
		const productId = Number(parts[2]);
		const product = products.find(p => p.id === productId);

		if (product) {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(product));
		} else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ error: "Producto no encontrado" }));
		}
	} else {
		res.writeHead(404, { "Content-Type": "text/html" });
		res.end("<h1>404 - Página no encontrada</h1>");
	}
});