import express from "express";
import usersRouter from "./routes/routes.mjs";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
});

app.use("/users", usersRouter);

app.get("/", (req, res) => {
	res.send("Bienvenido a la API modularizada");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Error interno del servidor" });
});

app.use((req, res) => {
	res.status(404).send("Ruta no encontrada");
});

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});
