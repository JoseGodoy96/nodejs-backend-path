/*
Ejercicio 1 – Callback básico
- Escribe una función que reciba un callback.
- La función debe simular la carga de datos con setTimeout (1 segundo).
- Una vez cargados, debe ejecutar el callback mostrando un mensaje en consola.

- Write a function that receives a callback.
- The function should simulate data loading using setTimeout (1 second).
- Once loaded, it should execute the callback, displaying a message in the console.
*/

function fetchData(callback) {
	setTimeout(() => {
		callback("Datos cargados: hola un segundo despues");
	}, 1000);
}

fetchData((mensaje) => {
	console.log(mensaje);
})