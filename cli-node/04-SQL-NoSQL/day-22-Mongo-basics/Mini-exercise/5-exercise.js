/*
Ejercicio 5 (ES):
- Elimina un usuario específico.
Exercise 5 (EN):
- Delete a specific user.
*/

const database = 'blogDB';
use(database);

db.user.deleteOne({ username: "Manolo" });