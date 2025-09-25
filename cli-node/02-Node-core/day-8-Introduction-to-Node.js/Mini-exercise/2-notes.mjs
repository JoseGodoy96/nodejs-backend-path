

// Leer archivos

// Sincrónico (bloquea el programa hasta terminar):
const data = fs.readFileSync("archivo.txt", "utf8");
console.log(data);

// Asíncrono con callback:
fs.readFile("archivo.txt", "utf8", (err, data) => {
	if (err) throw err;
	console.log(data);
});

// Asíncrono con Promises (mejor práctica moderna):
import { promises as fsp } from "fs";

const contenido = await fsp.readFile("archivo.txt", "utf8");
console.log(contenido);

// Escribir archivos

// Sobrescribe el archivo
fs.writeFileSync("archivo.txt", "Hola mundo");

// Con callback
fs.writeFile("archivo.txt", "Hola mundo", (err) => {
	if (err) throw err;
	console.log("Archivo escrito correctamente");
});

// Con Promises
await fsp.writeFile("archivo.txt", "Hola con Promises");

// Agregar contenido a un archivo

fs.appendFileSync("archivo.txt", "\nNueva línea agregada");

// Con Promises
await fsp.appendFile("archivo.txt", "\nOtra línea agregada");


// Eliminar archivos

fs.unlinkSync("archivo.txt");

// Con Promises
await fsp.unlink("archivo.txt");

// Trabajar con directorios

// Crear directorio
fs.mkdirSync("mi_carpeta");

// Listar contenido de un directorio
const files = fs.readdirSync(".");
console.log(files);

// Eliminar directorio vacío
fs.rmdirSync("mi_carpeta");

// Comprobar si un archivo existe

if (fs.existsSync("archivo.txt")) {
	console.log("El archivo existe");
} else {
	console.log("El archivo no existe");
}

