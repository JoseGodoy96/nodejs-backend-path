/*
Ejercicio 2 – Mini-desafío integrador
- Combina arrays y objetos en un pequeño script CLI

Exercise 2 – Mini-Integration Challenge
- Combine arrays and objects in a small CLI script
*/

import readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const user1 = {
	nombre: "juan",
	telefono: 697239943,
	email: "juan@gmail.com"
}

const user2 = {
	nombre: "manolo",
	telefono: 697879456,
	email: "manolo@gmail.com"
}

const user3 = {
	nombre: "ivan",
	telefono: 697123897,
	email: "ivan@gmail.com"
}

const users = [user1, user2, user3];

rl.setPrompt("Elige una opcion (1-3): ");

rl.question("Hola, como te llamas? ", (nombre) => {
	console.log(`Hola, ${nombre}`);
	console.log("=== Menu de contactos ===");
	console.log("1. Agregar contacto");
	console.log("2. Ver todos los contactos");
	console.log("3. Salir");
	rl.prompt();
	rl.on("line", (input) => {
		if (input === "1") {
			rl.question("Nombre del contacto: ", (nombreContacto) => {
				rl.question("Numero de telefono: ", (telefonoContacto) => {
					rl.question("Introduzca un email: ", (emailContacto) => {
						let newNumber = Number(telefonoContacto);
						let newUser = {
							nombre: nombreContacto,
							telefono: newNumber,
							email: emailContacto
						};
						users.push(newUser);
						console.log("Contacto añadido satisfactoriamente. Regresando al menu de contactos.");
						rl.prompt();
					})
				});
			})
		} else if (input === "2") {
			for (const user of users) {
				console.log(`${user.nombre} - ${user.telefono} - ${user.email}`);
			}
			console.log("Esos son todos los contactos.");
			rl.prompt();
		} else if (input === "3") {
			console.log("Saliendo del menu de contactos.");
			rl.close();
			return;
		} else {
			console.log("Opcion invalida");
		}
	})
	rl.prompt();
})