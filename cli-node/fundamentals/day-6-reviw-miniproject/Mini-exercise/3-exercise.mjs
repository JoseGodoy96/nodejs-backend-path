/*
Español:
Crea un programa que simule la obtención de datos de un usuario desde una base de datos y,
a continuación, la obtención de sus tareas. Implementa las funciones usando Promises y
encadena las operaciones con .then() y .catch().

English:
Create a program that simulates fetching user data from a database and then retrieving
the user’s tasks. Implement the functions using Promises and chain
the operations with .then() and .catch().
*/

import { resourceLimits } from "worker_threads";

let user1 = {
	id: 1,
	name: "antonio",
	email: "antonio@gmail.com"
};

let user2 = {
	id: 2,
	name: "manolo",
	email: "manolo@gmail.com"
};

let user3 = {
	id: 3,
	name: "agos",
	email: "agos@gmail.com"
};

let users = [user1, user2, user3];

function wait(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

function getUserById(id) {
	console.log("Loading...");
	return wait(2000).then(() => {
		return new Promise((resolve, reject) => {
			const user = users.find(user => user.id === id);
			if (user) {
				resolve(user);
			} else {
				reject("Error: no hay usuario con ese id");
			}
		});
	});
}

getUserById(2)
	.then(user => {
		console.log("Usuario encontrado:", user);
	})
	.catch(err => {
		console.error(err);
	});