# Day 1 – Variables & Types / Variables y Tipos

## 📚 Conceptos Clave / Key Concepts
- `let` → variable que puede cambiar
- `const` → constante, no se puede reasignar
- Tipos de datos: string, number, boolean, null, undefined, object
- Operadores: aritméticos (+, -, *, /, %), lógicos (&&, ||, !), comparación (==, ===, !=, !==, <, >)

- Operadores aritméticos
+ → suma → 10 + 3 // 13
- → resta → 10 - 3 // 7
* → multiplicación → 10 * 3 // 30
/ → división → 10 / 3 // 3.33
% → módulo (resto de la división) → 10 % 3 // 1

- Operadores lógicos
&& (AND) → devuelve true si ambas condiciones son verdaderas. true && false // false
|| (OR) → devuelve true si al menos una condición es verdadera. true || false // true
! (NOT) → invierte el valor lógico. !true // false

- Operadores de comparación
== → compara solo el valor (no el tipo). 5 == "5" // true
=== → compara valor y tipo (estricto). 5 === "5" // false
!= → distinto en valor. 5 != "5" // false
!== → distinto en valor o tipo. 5 !== "5" // true 
< → menor que. 5 < 10 // true
> → mayor que. 5 > 10 // false

---

## 📝 Ejemplos / Examples
```javascript
let name = "Juan";
const year = 1995;
let isDeveloper = true;

let age = 2025 - year;
console.log(`Hola, mi nombre es ${name} y tengo ${age} años.`);
