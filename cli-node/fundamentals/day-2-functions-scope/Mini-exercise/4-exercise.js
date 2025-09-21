/*
Ejercicio 4 – Closure contador

Crea una función createCounter() que devuelva otra función.
Cada vez que llames a esa función interna, debe incrementar y devolver el valor de un contador que se inicializa en 0.

Create a function createCounter() that returns another function.
Each time you call the inner function, it should increment and return the value of a counter initialized at 0.
*/

function createCounter(){
	let count = 0;
	return function (){
		count++;
		return count;
	}
}

const sum = createCounter();

console.log(sum());
console.log(sum());
console.log(sum());