/*
Ejercicio 2 (ES):
- Usando 'path', construye rutas relativas y absolutas para un archivo "data.json".
- Imprime basename, dirname y extensión del archivo.

Exercise 2 (EN):
- Using 'path', build relative and absolute paths for a "data.json" file.
- Log the basename, dirname, and file extension.
*/

import path from "path";

const newPath = path.format({
	dirname: "/home/txemita/Repositorios/Roadmapbackend/cli-node/02-Node-core/Día-9-Sistema-de-Archivos-y-Rutas/Mini-exercise",
	basename: "data",
	extension: ".json"
});

console.log("Ruta absoluta: ", newPath);

const relativePath = path.join("Mini-exercise", "data.json");
console.log("Ruta relativa:", relativePath);

console.log("basename:", path.basename(newPath));
console.log("dirname:", path.dirname(newPath));
console.log("extname:", path.extname(newPath));