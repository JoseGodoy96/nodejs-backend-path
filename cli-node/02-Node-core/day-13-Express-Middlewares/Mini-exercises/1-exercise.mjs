/*
Ejercicio 1 (ES):
- Configura express.json() como middleware global y crea una ruta POST "/echo" que devuelva el JSON recibido.

Exercise 1 (EN):
- Set up express.json() as a global middleware and create a POST "/echo" route that returns the received JSON.
*/

import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());

app.post("/echo", (req, res) => {
    res.json(req.body);
});

app.use((req, res) => res.status(404).send("404 - No encontrada"));

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});