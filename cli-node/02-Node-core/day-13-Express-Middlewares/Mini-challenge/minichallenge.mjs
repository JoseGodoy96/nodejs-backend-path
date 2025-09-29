/*
Mini-Challenge (ES):
- Crea un servidor Express con middlewares personalizados:
	1. logger → registra método y URL.
	2. auth → bloquea acceso a "/dashboard" si falta un query param ?token=123.
	3. errorHandler → middleware que capture errores y devuelva un JSON { error: mensaje }.
- Rutas:
	- "/" → "Servidor con middlewares"
	- "/dashboard" → "Bienvenido al dashboard" (solo si el token es correcto)

Mini-Challenge (EN):
- Create an Express server with custom middlewares:
	1. logger → logs method and URL.
	2. auth → blocks access to "/dashboard" if ?token=123 is missing.
	3. errorHandler → middleware that catches errors and returns JSON { error: message }.
- Routes:
	- "/" → "Server with middlewares"
	- "/dashboard" → "Welcome to dashboard" (only if token is correct)
*/
