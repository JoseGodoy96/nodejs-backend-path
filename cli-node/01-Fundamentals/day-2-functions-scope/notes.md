# Day 2 – Functions & Scope / Funciones y Alcance

## 📚 Key Concepts / Conceptos Clave

### 🔹 Declared Functions / Funciones declaradas
Se definen con la palabra clave `function`.  
Pueden llamarse antes de ser declaradas gracias al **hoisting**.

- Arrow Functions:

const greet = (name) => `Hola ${name}`;
console.log(greet("Juan"));

- Parameters & Return / Parámetros y Retorno:

function add(a, b) {
  return a + b;
}

console.log(add(5, 3));

- Scope / Alcance de Variables:

let globalVar = "Soy global";

function testScope() {
  let localVar = "Soy local";
  console.log(globalVar);
  console.log(localVar); 
}

testScope();
console.log(globalVar);  
// console.log(localVar); 

- Closures:

function counter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const myCounter = counter();

console.log(myCounter());
console.log(myCounter());
console.log(myCounter());

- Modularization in Node.js / Modularización en Node.js:

function add(a, b) {
  return a + b;
}

module.exports = { add };

const { add } = require('./math');
console.log(add(2, 3)); // 5



```javascript
function greet(name) {
  return `Hola ${name}`;
}

console.log(greet("Ana")); // Hola Ana
