/*
Ejercicio 1 (ES):
- Usa el módulo 'os' para imprimir en consola información sobre tu sistema operativo:
  plataforma, arquitectura y memoria libre.

Exercise 1 (EN):
- Use the 'os' module to log information about your OS:
  platform, architecture, and free memory.
*/

import os from "os"; 

// Informacion basica del sistema
console.log("Nombre del host:", os.hostname());      // Nombre del equipo
console.log("Sistema operativo:", os.type());        // Tipo de SO (Linux, Windows_NT, Darwin)
console.log("Plataforma:", os.platform());           // 'win32', 'linux', 'darwin'
console.log("Arquitectura:", os.arch());             // 'x64', 'arm', etc.
console.log("Versión:", os.release());               // Versión del SO

// CPU y memoria
console.log("CPUs:", os.cpus());                     // Info de los núcleos
console.log("Número de CPUs:", os.cpus().length);    // Cantidad de núcleos
console.log("Memoria libre:", os.freemem());         // En bytes
console.log("Memoria total:", os.totalmem());        // En bytes
console.log("Memoria libre (MB):", os.freemem() / 1024 / 1024); // Convertido en MB

// Informacion de red
console.log("Interfaces de red:", os.networkInterfaces());

// Directorios importantes
console.log("Directorio home:", os.homedir());       // Carpeta del usuario
console.log("Directorio temporal:", os.tmpdir());    // Carpeta de archivos temporales

// Tiempo del sistema
console.log("Tiempo activo (segundos):", os.uptime());
console.log("Tiempo activo (horas):", os.uptime() / 3600);
