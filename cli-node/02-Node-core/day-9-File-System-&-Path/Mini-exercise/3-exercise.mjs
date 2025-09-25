/*
Ejercicio 3 (ES):
- Crea una función async que lea un archivo y maneje errores si no existe.

Exercise 3 (EN):
- Create an async function that reads a file and handles errors if it does not exist.
*/

import { promises as fsp } from "fs";

async function readFileSafe(filePath) {
	try {
    	const content = await fsp.readFile(filePath, "utf8");
    	console.log(content);
	} catch (error) {
    	console.error("Error al leer el archivo:", error.message);
	}
}

readFileSafe("test.txt");
