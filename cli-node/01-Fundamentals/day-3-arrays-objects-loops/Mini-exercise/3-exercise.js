/*
Ejercicio 3 – Recorrer objetos
- Crear un objeto user con varias propiedades.
- Recorrer el objeto usando for...in.
- Imprimir todas las claves y valores.

- Create a user object with several properties.
- Iterate over the object using for...in.
- Print all keys and values.
*/

let user = {
	name: "jose",
	age: 23,
	country: "españa"
};

for (let key in user){
	console.log(key, user[key]);
}