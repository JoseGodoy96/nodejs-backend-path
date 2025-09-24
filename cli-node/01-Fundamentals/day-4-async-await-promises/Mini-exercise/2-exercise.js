/*
Ejercicio 2 – Promesa condicional
- Crea una Promise que se resuelva si una variable es mayor a 10.
- En caso contrario, debe rechazarse.
- Maneja ambos casos con then y catch.

- Create a Promise that resolves if a variable is greater than 10.
- Otherwise, it should be rejected.
- Handle both cases using then and catch.
*/

const promise = new Promise((resolve, reject) => {
	let num = 10;
	if (num > 10) {
		resolve("El numero es mayor de 10");
	} else if (num === 10) {
		reject("El numero es igual a 10");
	} else {
		reject("el numero es menor a 10")
	}
});

promise.then(result => console.log(result))
.catch(error => console.error(error));