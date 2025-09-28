/*
Ejercicio 2 (ES):
- Crea una ruta "/json" que responda con un objeto JSON { message: "Hola desde JSON" }.

Exercise 2 (EN):
- Create a "/json" route that responds with JSON { message: "Hello from JSON" }.
*/

import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/", (req, res) => res.send("Bienvenido a Express"));

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});
app.get("/json", (req, res) => {
	res.json({ message: `Hola desde JSON` });
});