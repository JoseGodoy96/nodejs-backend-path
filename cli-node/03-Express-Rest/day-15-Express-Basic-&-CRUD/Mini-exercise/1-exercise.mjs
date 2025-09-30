/*
Ejercicio 1 (ES):
- Configura un servidor Express que escuche en el puerto 3000.
Exercise 1 (EN):
- Set up an Express server listening on port 3000.
*/

import express from "express";
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});