// Inicializacion

import express from "express";
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});


// Rutas basicas

app.get("/", (req, res) => res.send("GET en /"));
app.post("/", (req, res) => res.send("POST en /"));
app.put("/", (req, res) => res.send("PUT en /"));
app.delete("/", (req, res) => res.send("DELETE en /"));


// Respuestas

res.send("Texto o HTML");       // Envía texto o HTML
res.json({ name: "Jose" });     // Envía JSON
res.status(404).send("Error");  // Establece código de estado

// Parametros de ruta

app.get("/users/:id", (req, res) => {
	const { id } = req.params;
	res.json({ id, name: `User ${id}` });
});

// Query params

app.get("/greet", (req, res) => {
	const { name = "invitado" } = req.query;
	res.send(`Hola ${name}`);
});

// Middleware

app.use((req, res, next) => {
	console.log(`Petición: ${req.method} ${req.url}`);
	next(); // Continúa
});

// Express ya trae middlewares utiles:

app.use(express.json());       // Parsear JSON en el body
app.use(express.urlencoded({ extended: true })); // Formularios

// Manejo de archivos estaticos

app.use(express.static("public"));

// Routers (modularizacion)

import express from "express";
const router = express.Router();

router.get("/", (req, res) => res.send("Lista de productos"));
router.get("/:id", (req, res) => res.send(`Producto ${req.params.id}`));

app.use("/products", router);

// Errores

app.use((req, res) => {
	res.status(404).send("Ruta no encontrada");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Error interno del servidor");
});

// Ejemplo completo

import express from "express";
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Bienvenido 🚀"));
app.get("/time", (req, res) => {
	const fecha = new Date();
	res.json({ time: `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}` });
});
app.get("/greet", (req, res) => {
	const { name = "invitado" } = req.query;
	res.send(`Hola ${name}`);
});
app.get("/users/:id", (req, res) => {
	const { id } = req.params;
	res.json({ id, name: `User ${id}` });
});

app.use((req, res) => res.status(404).send("404 - No encontrada"));

app.listen(3000, () => console.log("http://localhost:3000"));
