/*
Ejercicio 2 (ES):
- Crea una colección "users" e inserta 3 documentos.
Exercise 2 (EN):
- Create a "users" collection and insert 3 documents.
*/

const database = 'blogDB';
use(database);

db.createCollection("users");

db.users.insertMany([
	{ username: "Jose", email: "jose@example.com", password: "hashedpassword" },
    { username: "Jesus", email: "jesus@example.com", password: "hashedpassword" },
	{ username: "Ana", email: "ana@example.com", password: "hashedpassword" }
]);