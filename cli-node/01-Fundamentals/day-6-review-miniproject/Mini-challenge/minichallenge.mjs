/*
Mini-Challenge – Consolidación
- Combinar ejercicios importantes en un solo script
- Documentar en README provisional
- Testear todas las funciones
*/

import { resolve } from "path";
import readline from "readline";

const book1 = {
	titulo: "libro1",
	autor: "autor1",
	paginas: 350
};

const book2 = {
	titulo: "libro2",
	autor: "autor2",
	paginas: 400
};

const book3 = {
	titulo: "libro3",
	autor: "autor3",
	paginas: 250
};

const user1 = {
	usuario: "Jose",
	contraseña: 1234
};

let books = [book1, book2, book3];
let admin = [user1];

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function getUser(usuarioIn) {
	console.log("Loading...");
	await wait(1000);
	return new Promise((resolve, reject) => {
		const user = admin.find(user => user.usuario === usuarioIn)
		if (user) {
			resolve(user); 
		} else {
			reject("Error: no se pudo encontrar al usuario");
		}
	});
}

async function getPassword(passwordIn) {
	console.log("Loading...");
	await wait(1000);
	return new Promise((resolve, reject) => {
		const pass = admin.find(admin => admin.contraseña === Number(passwordIn))
		if (pass) {
			resolve(pass); 
		} else {
			reject("Error: contraseña invalida");
		}
	});
}

async function newadmin(newUser) {
	return new Promise((resolve, reject) => {
		const addAdmin = admin.find(admin => admin.usuario === newUser);
		if (addAdmin) {
			reject("Nombre de usuario en uso");
		} else {
			resolve("Nombre usuario valido");
		}
	});
}

async function newBook(newTitle){
	return new Promise((resolve, reject) => {
		const addBook = Books.find(Books => Books.title === newTitle);
		if (addBook) {
			reject("Titulo en uso");
		} else {
			resolve("Titulo valido");
		}
	});
}

async function main() {
	console.log("^^^^ Menu de usuario ^^^^");
	rl.question("Introduzca usuario: ", async (usuarioIn) => {
		try {
			const user = await getUser(usuarioIn);
			rl.question("Introduzca contraseña: ", async (passwordIn) => {
				try {
					await getPassword(passwordIn);
					console.log(`Bienvenido, ${user.usuario}`);
					await wait(1000);
					showMenu();
				} catch (error) {
					console.error(error);
					rl.close();
				}
			});
		} catch (error) {
			console.error(error);
			rl.close();
		}
	});
}

async function showMenu() {
	console.log("=== Menu de la librería ===");
	console.log("1. Agregar usuario");
	console.log("2. Eliminar último usuario");
	console.log("3. Agregar libro");
	console.log("4. Eliminar último libro");
	console.log("5. Ver todos los libros");
	console.log("6. Salir");

	rl.setPrompt("Seleccione una opción (1-6): ");
	rl.prompt();

	rl.on("line", (input) => {
		if (input === "1") {
			rl.question("Introduce el nuevo nombre de usuario: ", async (newusuario) => {
				try {
					await newadmin(newusuario);
					rl.question("Introduce la contraseña (solo valores numericos y mas de 3 numeros): ", async (newContraseña) => {
						try {
							await newAdminPassword(newContraseña);
							let introducirAdmin = {
								usuario: newusuario,
								contraseña: Number(newContraseña)
							};
							admin.push(introducirAdmin);
							console.log("Usuario añadido correctamente");
							main();
						} catch {
							console.log("Contraseña incorrecta!!");
							rl.prompt();
						}
					})
				} catch {
					console.log("Nombre de usuario no valido!");
					rl.prompt();
				}
			})
		} else if (input === "2") {
			if (admin.length === 1) {
				console.log("Debe de haber al menos un usuario");
				rl.prompt();
			} else {
				console.log("Usuario eliminado exitosamente");
				admin.pop();
				main();
			}
		} else if (input === "3") {
			rl.question("Introducir titulo del libro: ", async (newBookTitle) => {
				try {
					await newBook(newBookTitle);
					rl.question("Introducir el nombre del autor: ", (newBookauthor) => {
						rl.question("Introducir el numero de paginas: ", (newBookPages) => {
							let newBookAdd = {
								titulo: newBookTitle,
								autor: newBookauthor,
								paginas: newBookPages
							};
							books.push(newBookAdd);
							console.log("Libro introducido correctamente!");
							rl.prompt();
						})
					})
				} catch {
					console.log("Titulo ya en uso!");
					rl.prompt();
				}
			})
		} else if (input === "4") {
			if (books.length === 0) {
				console.log("No hay libros para eliminar.");
			} else {
				books.pop();
				console.log("Último libro eliminado.");
			}
			rl.prompt();
		} else if (input === "5") {
			console.log("Libros actuales:");
			books.forEach(book => console.log(`- ${book.titulo} (${book.autor})`));
			rl.prompt();
		} else if (input === "6") {
			console.log("Saliendo de la aplicación...");
			rl.close();
		} else {
			console.log("Opción inválida");
		}
	});
}

main();
