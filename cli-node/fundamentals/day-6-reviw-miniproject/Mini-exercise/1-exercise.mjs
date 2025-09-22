/*
Ejercicio 1 – Repaso de funciones, arrays y objetos / Exercise 1 – Review of Functions, Arrays, and Objects

Enunciado:
- Reescribe 3–4 ejercicios de los días anteriores aplicando buenas prácticas

- Calculadora simple (add, subtract, multiply, divide).
- Funcion promedio.
- Recorrer objetos.
- Recorrer arrays. 

Statement:
- Rewrite 3–4 exercises from previous days, applying best practices.

- Simple calculator (add, subtract, multiply, divide).
- Average function.
- Looping through objects.
- Looping through arrays.
*/

const calculator = {
	sum: (a, b) => (a + b),
	subtract: (a, b) => (a - b),
	multiply: (a, b) => (a * b),
	divide: (a, b) => b === 0 ? "Error: no se puede dividir por 0" : (a / b)
};

function average(numbers) {
	if (numbers.length === 0){
		return "Error: el arreglo esta vacio"
	}
	const sum = numbers.reduce((acumulator, num) => acumulator + num, 0);
	return sum / numbers.length; 
};

const user = {
	name: "jose",
	age: 23,
	country: "españa"
};

const colores = ["rojo", "verde", "amarillo"];

for (const key in user){
	console.log(key, user[key]);
}

for (const color of colores){
	console.log(color);
}

console.log(calculator.sum(5, 3));
console.log(average([20, 20, 20, 20]));