# Day 4 – Advanced Functions & Async JavaScript  
Funciones avanzadas y programación asíncrona en JavaScript.

---

## 📚 Key Concepts / Conceptos Clave

### 🔹 Higher-Order Functions (Funciones de orden superior)
Una función que puede **recibir funciones como parámetros** o **devolver funciones**.

```javascript
function greet(name) {
  return `Hello, ${name}`;
}

function executor(fn, value) {
  return fn(value);
}

console.log(executor(greet, "Ana"));

- Callbacks:

function fetchData(callback) {
  setTimeout(() => {
    callback("Datos cargados");
  }, 1000);
}

fetchData(data => console.log(data));

- Promises:

const promise = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("Éxito!");
  } else {
    reject("Error!");
  }
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));


- Async / Await:

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadData() {
  console.log("Loading...");
  await wait(1000);
  console.log("Data loaded!");
}

loadData();

- Manejo de errores en async/await:

async function getData() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
