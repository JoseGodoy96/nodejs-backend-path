/*
⚡ Mini-Challenge – Simulación de API con Async/Await

1. Crea un array de objetos llamado "users" con al menos 3 usuarios.
	Cada usuario debe tener: id, name, email.

2. Escribe una función async getUserById(id) que simule obtener un usuario:
	- Usa setTimeout dentro de una Promise para simular un delay de 1 segundo.
	- Si encuentra el usuario, la Promise se resuelve con el objeto.
	- Si no lo encuentra, la Promise se rechaza con un mensaje de error.

3. Llama a getUserById() con un id válido y muestra el resultado en consola usando async/await.

4. Llama a getUserById() con un id que no exista y captura el error usando try/catch, mostrando el mensaje en consola.

5. (Opcional) Crea una función async getAllUsers() que recorra el array y muestre todos los usuarios con un delay de 0.5 segundos entre cada uno.
*/

import readline from "readline";

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

function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function getUserById(id) {
	console.log("Loading...");
	await wait(1000);
	return new Promise((resolve, reject) => {
		const user = users.find(user => user.id === id)
		if (user) {
			resolve(user); 
		} else {
			reject("Error: no se pudo encontrar al usuario");
		}
	})
}

async function main(id) {
    try {
        const user = await getUserById(id);
        console.log(user);
    } catch(error) {
        console.error(error);
    }
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question("Introduzca un numero de id: ", (id) => {
	let thisid = Number(id);
	main(thisid);
	rl.close();
});