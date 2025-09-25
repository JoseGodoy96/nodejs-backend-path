/*
Mini-Challenge (ES):
- Crea un script que administre un archivo JSON de usuarios:
	1. Leer usuarios existentes desde "users.json".
	2. Agregar un nuevo usuario al array.
	3. Guardar el archivo actualizado.
- Usa async/await y fs/promises.

Mini-Challenge (EN):
- Create a script that manages a JSON file of users:
	1. Read existing users from "users.json".
	2. Add a new user to the array.
	3. Save the updated file.
- Use async/await and fs/promises.
*/

import readline from "readline";
import fs from "fs";

const readlineInterface = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const DATA_FILE = "./users.json";

function loadData() {
	if (!fs.existsSync(DATA_FILE)) {
		return { usuarios: [] };
	}
	const rawData = fs.readFileSync(DATA_FILE, "utf-8");
	return JSON.parse(rawData);
}

function saveData(data) {
	fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

let { usuarios } = loadData();

async function mainMenu() {
	console.log("=============== Menu ===============");
	console.log("1. Leer usuarios");
	console.log("2. Agregar un nuevo usuario");
	console.log("3. Guardar el archivo actualizado");
	console.log("4. Salir de la app");
	console.log("====================================");
	readlineInterface.setPrompt("Seleccionar de la (1 - 4): ");
	readlineInterface.prompt();

	readlineInterface.removeAllListeners("line");
	readlineInterface.on("line", (input) => {
		if (input === "1") {
			for (let key in usuarios) {
				console.log(usuarios[key]);
			};
			readlineInterface.prompt();
		} else if (input === "2") {
			readlineInterface.question("Nombre del usuario: ", (nuevoNombreUsurario) => {
				readlineInterface.question("Contraseña del nuevo usuario: ", (nuevaContraUsuario) => {
					let nuevoUsuario = {
						nombre: nuevoNombreUsurario,
						contra: nuevaContraUsuario
					};
					usuarios.push(nuevoUsuario);
					console.log("Usuario añadido satisfactoriamente!");
					readlineInterface.prompt();
				})
			})
		} else if (input === "3") {
			console.log("Datos guardados correctamente!");
			readlineInterface.prompt();
			saveData( {usuarios} );
		} else if (input === "4") {
			console.log("Hasta luego!");
			readlineInterface.close();
		} else {
			console.log("Opcion no valida");
			readlineInterface.prompt();
		}
	});
};

mainMenu();