/*
Ejercicio 2 – Función promedio

Escribe una función average(numbers) que reciba un array de números y devuelva su promedio.

Exercise 2 – Average Function

Write a function average(numbers) that takes an array of numbers and returns their average.

*/

function average(numbers) {
	if (numbers.length === 0) {
    	return "Error: el array está vacío";
	}
	let sum = 0;
	for (let num of numbers) {
    	sum += num;
	}
	return sum / numbers.length;
}

console.log(average([10, 20, 30, 40]));