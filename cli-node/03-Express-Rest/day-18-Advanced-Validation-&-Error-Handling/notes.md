# 📅 Day 18 – Advanced Validation & Error Handling / Validación avanzada y manejo de errores

## 📦 Instalación de Joi / Joi installation
```bash
npm install joi


// Ejemplo de validacioon con Joi

const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required()
});

app.post("/users", (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  res.status(201).json({ message: "User created", data: req.body });
});

// Middleware de validacion

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}

// uso de rutas

app.post("/products", validate(productSchema), (req, res) => {
  res.json({ message: "Product created", data: req.body });
});

// Middleware global de errores

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Internal Server Error" });
});
