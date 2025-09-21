/*
Ejercicio 3 – Async/Await con temporizador
- Escribe una función async que espere 2 segundos usando una Promise con setTimeout.
- Luego debe mostrar un mensaje en consola indicando que el tiempo terminó.

- Write an async function that waits 2 seconds using a Promise with setTimeout.
- Then it should display a message in the console indicating that the time is up.
*/

function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadData() {
	console.log("Loading...");
	await wait(2000);
	console.log("charge finished");
}

loadData();