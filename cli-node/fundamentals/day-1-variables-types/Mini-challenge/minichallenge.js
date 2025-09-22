/*
Enunciado:
Crea un programa que pida al usuario su nombre y su año de nacimiento
(puedes usar prompt en el navegador o readline en Node.js).
El programa debe calcular la edad actual del usuario y mostrar un mensaje como:
"Hola [nombre], tienes [edad] años."

Statement:
Create a program that asks the user for their name and year of birth
(you can use prompt in the browser or readline in Node.js).
The program should calculate the user’s current age and display a message like:
"Hello [name], you are [age] years old."
*/

import readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question("Cual es tu nombre? ", (yourName) => {
	rl.question("Cual es el año de tu nacimiento? ", (birthdate) => {
		let year = new Date().getFullYear();
		let years = year - Number(birthdate);
		console.log(`Tu nombre es ${yourName} y tienes ${years} años.`);
		rl.close();
	});
});