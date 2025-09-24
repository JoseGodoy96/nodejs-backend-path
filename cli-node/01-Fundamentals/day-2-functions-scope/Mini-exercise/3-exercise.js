/*
Ejercicio 3 – Práctica de scope

Crea una variable global llamada message.
Dentro de una función, declara otra variable con el mismo nombre message pero con un valor distinto.
Imprime ambas variables para mostrar la diferencia entre scope global y local.

Create a global variable called message.
Inside a function, declare another variable with the same name message but with a different value.
Print both variables to show the difference between global and local scope.
*/

let message = "hola soy global";

function showMessage(){
	let message = "hola soy variable local";
	console.log("esta es variable local->", message);
}

showMessage();
console.log("hola soy global", message);

