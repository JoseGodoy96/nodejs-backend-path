/*
	Mini-desafío opcional – Average con readline:

Enunciado:
1. Pide al usuario 3 números desde la terminal utilizando el módulo readline de Node.js.  
2. Almacena esos números en un array.  
3. Usa la función average(numbers) (del ejercicio 2) para calcular el promedio.  
4. Muestra el resultado en consola en un mensaje como:  
	"El promedio de [n1, n2, n3] es: X"

Statement:
1. Ask the user for 3 numbers from the terminal using Node.js' readline module.  
2. Store those numbers in an array.  
3. Use the average(numbers) function (from exercise 2) to calculate the average.  
4. Display the result in the console with a message like:  
	"The average of [n1, n2, n3] is: X"

*/

import readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question("Introduzca tres valores. primer valor: ", (primerValor) => {
	rl.question("Segundo valor: ", (segundoValor) => {
		rl.question("Tercer valor: ", (tercerValor) => {
			function average(numbers) {
				let sum = 0;
				for (let num of numbers) {
			    	sum += num;
				}
				return sum / numbers.length;
			}
			let n1 = parseFloat(primerValor);
			let n2 = parseFloat(segundoValor);
			let n3 = parseFloat(tercerValor);v
			console.log(average([n1, n2, n3]));
			rl.close();
		})
	})
});

