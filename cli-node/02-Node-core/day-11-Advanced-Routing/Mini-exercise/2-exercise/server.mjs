/*
Ejercicio 2 (ES):
- Crea una ruta "/users/:id" que devuelva un JSON con { id: <valor>, name: "User <id>" }.

Exercise 2 (EN):
- Create a "/users/:id" route that returns JSON with { id: <value>, name: "User <id>" }.
*/

import { server } from "./routes.mjs";


server.listen(3000, () => {
	console.log("Servidor activado pulse aqui -> http://localhost:3000");
});