# Day 3 – Arrays, Objects & Loops / Arrays, Objetos y Bucles

## 📚 Key Concepts / Conceptos Clave

### 🔹 Arrays
Una **lista ordenada** de elementos. Se pueden recorrer y manipular con métodos nativos.

```javascript
let numbers = [10, 20, 30];
console.log(numbers[0]); // 10

- Métodos comunes:

push() → agrega al final.
pop() → elimina el último.
shift() → elimina el primero.
unshift() → agrega al inicio.
map() → transforma cada elemento en un nuevo array.
filter() → devuelve elementos que cumplen una condición.
reduce() → acumula valores en un solo resultado.

let nums = [1, 2, 3, 4];
console.log(nums.map(n => n * 2));     // [2,4,6,8]
console.log(nums.filter(n => n % 2));  // [1,3]
console.log(nums.reduce((a, b) => a + b, 0)); // 10

- Objects:

let user = {
  name: "Ana",
  age: 25,
  isDeveloper: true
};

console.log(user.name);  // Ana
console.log(user["age"]); // 25

Features útiles:

- Destructuring

const { name, age } = user;
console.log(name, age);

- Spread / Rest

let newUser = { ...user, country: "Spain" };
console.log(newUser);

🔹 Loops / Bucles

- Formas de recorrer arrays y objetos.

for clásico:

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

for...of (arrays, strings, iterables):

for (let num of numbers) {
  console.log(num);
}

forEach (solo arrays):

numbers.forEach(num => console.log(num));

for...in (objetos):

for (let key in user) {
  console.log(key, user[key]);
}
