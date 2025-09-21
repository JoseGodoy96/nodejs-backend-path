/*
Ejercicio 1 – Callback básico
- Escribe una función que reciba un callback.
- La función debe simular la carga de datos con setTimeout (1 segundo).
- Una vez cargados, debe ejecutar el callback mostrando un mensaje en consola.
*/

function fetchData(callback) {
	setTimeout(() => {
		callback("Datos cargados: hola un segundo despues");
	}, 1000);
}

fetchData((mensaje) => {
	console.log(mensaje);
})