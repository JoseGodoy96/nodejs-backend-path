# Roadmapbackend

## ES — Presentación
Roadmapbackend es un proyecto personal para aprender y practicar desarrollo backend con Node.js. Incluye una pequeña CLI de gestión de biblioteca que demuestra lectura/escritura persistente, validación básica, y una estructura modular sencilla (datos, funciones y main).

Características principales:
- CLI interactiva para administrar usuarios y libros.
- Persistencia en JSON (`storage.json`).
- Código modularizado en 3 módulos: datos, funciones y archivo principal.
- Validaciones básicas y mensajes amigables en inglés.
- Fácil de ejecutar y extender para aprendizaje y pruebas.

Requisitos
- Node.js (v14+ recomendado)

Cómo ejecutar
1. Desde la raíz del repositorio:
   - node cli-node/fundamentals/day-7-Mini-Proyecto/LibraryCLI.mjs
2. El archivo `storage.json` contiene los datos iniciales y se actualiza automáticamente.

Estructura relevante
- cli-node/fundamentals/day-7-Mini-Proyecto/
  - LibraryCLI.mjs        — Entrada (main)
  - Data.mjs              — Carga/guardado de datos (storage.json)
  - Functions.mjs         — Lógica y utilidades
  - storage.json          — Datos persistentes (administradores y libros)

Contribuir
- Abre un issue describiendo la mejora o bug.
- Envía pull requests con cambios pequeños y pruebas cuando sea posible.

Licencia
- Añade una licencia si deseas compartirlo públicamente (por ejemplo MIT).

---

## EN — Presentation
Roadmapbackend is a personal project for learning and practicing backend development with Node.js. It includes a small CLI library management app demonstrating persistent JSON storage, basic validation, and a simple three-module layout (data, functions, main).

Key features:
- Interactive CLI to manage users and books.
- JSON persistence (`storage.json`).
- Modular structure with three modules: data, functions and main.
- Basic validations and user-friendly English messages.
- Easy to run and extend for learning and testing.

Requirements
- Node.js (v14+ recommended)

How to run
1. From the repository root run:
   - node cli-node/fundamentals/day-7-Mini-Proyecto/LibraryCLI.mjs
2. `storage.json` holds initial data and is updated automatically.

Project layout (relevant)
- cli-node/fundamentals/day-7-Mini-Proyecto/
  - LibraryCLI.mjs        — Entry point (main)
  - Data.mjs              — Data load/save (storage.json)
  - Functions.mjs         — Logic and helpers
  - storage.json          — Persistent data (admins & books)

Contributing
- Open an issue describing the enhancement or bug.
- Send small pull requests and include tests when possible.

License
- Add a license file (e.g., MIT) if you plan to publish this repository.
