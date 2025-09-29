/*
Mini-Challenge (ES):
- Crea un servidor Express con:
	1. "/" → devuelve "Servidor con manejo de errores"
	2. "/random" → si el número aleatorio < 0.5 lanza error "Número demasiado bajo"
	3. "/user/:id" → si el id no es numérico lanza error 400 "ID inválido"
- Middleware de errores global:
- Devuelve { error: mensaje, status: código } en formato JSON.

Mini-Challenge (EN):
- Create an Express server with:
	1. "/" → returns "Server with error handling"
	2. "/random" → if random number < 0.5 throw error "Number too low"
	3. "/user/:id" → if id is not numeric throw 400 "Invalid ID"
- Global error middleware:
- Returns { error: message, status: code } in JSON format.
*/