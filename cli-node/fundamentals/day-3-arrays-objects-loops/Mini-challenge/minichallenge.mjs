/*
Mini-Challenge – Library System

Enunciado:
1. Crea un array llamado "library" que contenga al menos 3 objetos "book".  
	Cada libro debe tener: title, author, year, y pages.  
2. Recorre el array con un loop y muestra el título y autor de cada libro.  
3. Usa filter para obtener solo los libros publicados después del año 2010.  
4. Usa reduce para calcular el total de páginas de todos los libros de la librería.  
5. (Opcional) Crea una función findBook(title) que busque un libro por su título dentro del array y lo devuelva.

Statement:
1. Create an array called "library" that contains at least 3 "book" objects.  
	Each book should have: title, author, year, and pages.  
2. Loop through the array and display the title and author of each book.  
3. Use filter to get only the books published after the year 2010.  
4. Use reduce to calculate the total number of pages of all the books in the library.  
5. (Optional) Create a function findBook(title) that searches for a book by its title in the array and returns it.
*/

let book1 = {
	title: "libro1",
	author: "autor1",
	year: 1996,
	pages: 500
};

let book2 = {
	title: "libro2",
	author: "autor2",
	year: 2000,
	pages: 300
};

let book3 = {
	title: "libro3",
	author: "autor3",
	year: 2011,
	pages: 200
};

let library = [book1, book2, book3];

console.log("Estos son todos los libros");
for (let books of library)
{
	console.log(books);
}


let oldBooks = library.filter(book => book.year < 2010);

console.log("Libros de antes de 2010");
for (let antiguo of oldBooks)
{
	console.log(antiguo);
}

let totalPages;
totalPages = library.reduce((acumulador, book) => acumulador + book.pages, 0);
console.log("total de paginas ", totalPages);

import readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question("Introduzca el nombre de un libro: ", (tituloLibro) => {
	let thisTitle;
	let normalizetitle = tituloLibro.toLowerCase();
	thisTitle = library.filter(book => book.title.toLowerCase() === normalizetitle);
	if (thisTitle.length > 0){
		console.log("Este libro esta en la libreria ", thisTitle);
	}
	else
		console.log("no esta ese libro");
	rl.close();
});
