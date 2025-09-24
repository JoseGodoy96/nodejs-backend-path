/*
Español:
Refactoriza el ejercicio anterior para usar async/await en lugar de .then() y .catch(). 
Maneja los errores con try...catch y asegúrate de que el flujo de operaciones sea el mismo:
primero obtener el usuario y después sus tareas.

English:
Refactor the previous exercise to use async/await instead of .then() and .catch(). 
Handle errors with try...catch and ensure the flow of operations remains the same: 
first fetch the user and then their tasks.
*/

let user1 = {
	id: 1,
	name: "antonio",
	email: "antonio@gmail.com"
};

let user2 = {
	id: 2,
	name: "manolo",
	email: "manolo@gmail.com"
};

let user3 = {
	id: 3,
	name: "agos",
	email: "agos@gmail.com"
};

let users = [user1, user2, user3];

function wait(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function getUserById(id) {
	console.log("Loading...");
	await wait(2000);
	return new Promise((resolve, reject) => {
		const user = users.find(user => user.id === id);
		if (user) {
			resolve(user);
		} else {
			reject("Error: no hay usuario con ese id");
		}
	});
}

async function main(id) {
    try {
        const user = await getUserById(id);
        console.log(user);
    } catch(error) {
        console.error(error);
    }
}

main(1);