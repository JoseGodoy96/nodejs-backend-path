/*
⚡ Mini-Challenge – Simulación de API con Async/Await

1. Crea un array de objetos llamado "users" con al menos 3 usuarios.
   Cada usuario debe tener: id, name, email.

2. Escribe una función async getUserById(id) que simule obtener un usuario:
   - Usa setTimeout dentro de una Promise para simular un delay de 1 segundo.
   - Si encuentra el usuario, la Promise se resuelve con el objeto.
   - Si no lo encuentra, la Promise se rechaza con un mensaje de error.

3. Llama a getUserById() con un id válido y muestra el resultado en consola usando async/await.

4. Llama a getUserById() con un id que no exista y captura el error usando try/catch, mostrando el mensaje en consola.

5. (Opcional) Crea una función async getAllUsers() que recorra el array y muestre todos los usuarios con un delay de 0.5 segundos entre cada uno.
*/
