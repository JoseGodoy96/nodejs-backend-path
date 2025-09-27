/*
Ejercicio 3 (ES):
- Añade una ruta "/products/:id" que devuelva el producto correspondiente de un array simulado.

Exercise 3 (EN):
- Add a "/products/:id" route that returns the corresponding product from a mock array.
*/

import { server } from "./routes.mjs";


server.listen(3000, () => {
	console.log("Servidor activado pulse aqui -> http://localhost:3000");
});