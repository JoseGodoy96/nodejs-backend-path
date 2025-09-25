import path from "path";

// Une varias partes de una ruta, normalizando los separadores según el sistema.

const fullPath = path.join("folder", "subfolder", "file.txt");
console.log(fullPath);
// Linux/Mac: folder/subfolder/file.txt
// Windows: folder\subfolder\file.txt

// Construye una ruta absoluta a partir de las partes que le pases.

const absolutePath = path.resolve("folder", "file.txt");
console.log(absolutePath);
// Ejemplo: /Users/tuUsuario/proyecto/folder/file.txt

// Devuelve el nombre del archivo con extensión.

const filename = path.basename("/user/docs/notes.txt");
console.log(filename); // "notes.txt"

// Devuelve el directorio de una ruta.

const dir = path.dirname("/user/docs/notes.txt");
console.log(dir); // "/user/docs"

// Devuelve la extensión del archivo.

const ext = path.extname("notes.txt");
console.log(ext); // ".txt"

// Devuelve un objeto con toda la información de la ruta.

const info = path.parse("/user/docs/notes.txt");
console.log(info);
/*
{
	root: '/',
	dir: '/user/docs',
	base: 'notes.txt',
	ext: '.txt',
	name: 'notes'
}
*/

// Hace lo inverso a parse, construye una ruta desde un objeto.

const newPath = path.format({
	dir: "/user/docs",
	name: "notes",
	ext: ".txt"
});
console.log(newPath); // "/user/docs/notes.txt"
