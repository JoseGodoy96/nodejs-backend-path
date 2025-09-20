/*
Ejercicio 3 – Recorrer objetos
- Crear un objeto user con varias propiedades.
- Recorrer el objeto usando for...in.
- Imprimir todas las claves y valores.
*/

let user = {
	name: "jose",
	age: 23,
	country: "españa"
};

for (let key in user){
	console.log(key, user[key]);
}