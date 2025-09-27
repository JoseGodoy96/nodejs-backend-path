/*
Mini-Challenge (ES):
- Crea un servidor modularizado con archivo "routes.js".
- Debe tener:
	1. "/" → mensaje de bienvenida
	2. "/users/:id" → devuelve un JSON con información simulada de usuario
	3. "/products/:id" → devuelve un JSON con información simulada de producto
- Si la ruta no existe → devolver { error: "Ruta no encontrada" } con status 404.

Mini-Challenge (EN):
- Create a modularized server with "routes.js".
- It should have:
	1. "/" → welcome message
	2. "/users/:id" → return JSON with mock user information
	3. "/products/:id" → return JSON with mock product information
- If the route does not exist → return { error: "Route not found" } with status 404.
*/

import { server } from "./routes.mjs";


server.listen(3000, () => {
	console.log("Servidor activado pulse aqui -> http://localhost:3000");
});