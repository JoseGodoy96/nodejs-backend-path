/*
Ejercicio 1 – Calculadora simple

Crea 4 funciones: add, subtract, multiply, divide.
Cada una debe recibir 2 números y devolver el resultado.
La función divide debe manejar el caso de división entre 0.
*/

let a = 5;
let b = 3;

function add(a, b){
	return a + b;
}

function subtract(a, b){
	return a - b;
}

function multiply(a, b){
	return a * b;
}

function divide(a, b){
	if (b === 0) {
		return "Error no se puede dividir entre 0";
	}
	return a / b;
}

console.log(`Esta es la suma ${a} + ${b} = ${add(a, b)}`);
console.log(`Esta es la resta ${a} - ${b} = ${subtract(a, b)}`);
console.log(`Esta es la multiplicacion ${a} * ${b} = ${multiply(a, b)}`);
console.log(`Esta es la division ${a} / ${b} = ${divide(a, b)}`);