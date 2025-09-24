/*
Ejercicio 1 – Arrays
- Crear un array de números.
- Agregar y eliminar elementos con push, pop, shift, unshift.
- Transformar el array usando map.
- Filtrar solo números pares con filter.
- Calcular la suma de todos los elementos con reduce.

- Create an array of numbers.
- Add and remove elements using push, pop, shift, and unshift.
- Transform the array using map.
- Filter only even numbers using filter.
- Calculate the sum of all elements using reduce.

*/


let animals = ["mono", "raton", "gato", "perro"];
animals.push("delfin");
console.log(animals[4]);

let ultimo;
ultimo = animals.pop();
console.log(ultimo);

let primero;
primero = animals.shift();
console.log(primero);

console.log(animals[0]);
animals.unshift("pez");
console.log(animals[0]);

function plus(n){
	return n * 2;
}

let numeros = [1, 2, 3, 4, 5];
let plustwo;
plustwo = numeros.map(plus);

console.log(plustwo);

function divide(n){
	if (n % 2 === 0)
		return n;
}

let div;
div = numeros.filter(divide);
console.log(div);

let total;
total = numeros.reduce((acumulador, n) => acumulador + n, 0);
console.log(total);