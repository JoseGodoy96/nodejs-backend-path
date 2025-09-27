/*
Ejercicio 1 (ES):
- Refactoriza el servidor del día anterior para mover las rutas a un archivo separado (routes.js).
- Importa ese archivo en server.js y usa las funciones.

Exercise 1 (EN):
- Refactor the previous day's server to move routes into a separate file (routes.js).
- Import that file in server.js and use the functions.
*/

import { server } from "./routes.mjs";


server.listen(3000, () => {
	console.log("Servidor activado pulse aqui -> http://localhost:3000");
});