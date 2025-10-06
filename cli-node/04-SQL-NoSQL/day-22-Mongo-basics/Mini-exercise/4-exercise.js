/*
Ejercicio 4 (ES):
- Actualiza el email de un usuario específico.
Exercise 4 (EN):
- Update the email of a specific user.
*/

const database = 'blogDB';
use(database);

db.users.updateOne(
	{username: "Jose"},
	{ $set: {email: "newemail@example.com"}}
);