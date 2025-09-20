/*
Ejercicio 2 – Objetos
- Crear un objeto book con propiedades title, author, year.
- Acceder a las propiedades con dot notation y bracket notation.
- Usar destructuring para obtener title y author.
- Crear un nuevo objeto que copie book y agregue pages.
*/

let	book = {
	title: "48 leyes del poder",
	author: "antonio",
	year: 1997
};

console.log(book.title);
console.log(book["author"]);

const { title, author }= book;
console.log(title, author);

let newBook = {...book, pages: 30};
console.log(newBook);