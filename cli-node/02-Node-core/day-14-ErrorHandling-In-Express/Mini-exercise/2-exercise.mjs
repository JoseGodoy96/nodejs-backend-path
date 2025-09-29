/*
Ejercicio 2 (ES):
- Crea una ruta "/divide/:a/:b" que divida a entre b.
- Si b es 0 → lanza un error "División por cero no permitida".

Exercise 2 (EN):
- Create a "/divide/:a/:b" route that divides a by b.
- If b is 0 → throw an error "Division by zero not allowed".
*/

import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/", (req, res) => res.send("Servidor con middlewares"));
app.get("/divide/:a/:b", (req, res, next) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);

    if (b === 0) {
        const err = new Error("División por cero no permitida");
        err.status = 400;
        return next(err);
    }

    res.json({ result: a / b });
});

app.use((req, res) => res.status(404).send("404 - No encontrada"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || "Algo salió mal" });
});

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});