/*
Ejercicio 3 (ES):
- Crea una ruta "/time" que devuelva la hora actual en formato JSON.

Exercise 3 (EN):
- Create a "/time" route that returns the current time in JSON format.
*/

import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/", (req, res) => res.send("Bienvenido a Express"));
app.get("/json", (req, res) => {
	res.json({ message: `Hola desde JSON` });
});
app.get("/time", (req, res) => {
	const fecha = new Date();
	res.json({ time: `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}` });
});

app.use((req, res) => res.status(404).send("404 - No encontrada"));

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});

