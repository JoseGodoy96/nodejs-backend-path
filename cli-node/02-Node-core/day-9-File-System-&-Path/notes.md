# 📅 Day 9 – File System & Path / Sistema de Archivos y Rutas

## 📂 Módulo fs / fs Module
**ES:** Permite interactuar con el sistema de archivos: leer, escribir, eliminar y modificar archivos.  
**EN:** Allows interaction with the file system: read, write, delete, and modify files.

### Métodos principales
- `fs.readFile()` / `fs.readFileSync()` → Leer archivos
- `fs.writeFile()` / `fs.writeFileSync()` → Escribir archivos
- `fs.appendFile()` → Añadir contenido a archivos existentes
- `fs.unlink()` → Eliminar archivos

### Ejemplo async/await
```js
import { readFile, writeFile } from "fs/promises";

async function main() {
  await writeFile("example.txt", "Hola Node.js!");
  const data = await readFile("example.txt", "utf-8");
  console.log(data);
}

main();
