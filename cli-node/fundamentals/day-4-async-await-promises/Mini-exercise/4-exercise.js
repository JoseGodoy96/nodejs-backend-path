/*
Ejercicio 4 – getUser simulado
- Crea una función getUser(id) que simule obtener datos de usuario después de 1.5 segundos.
- Primero implementa con callbacks.
- Luego reescribe usando Promises.
- Finalmente reescribe usando async/await.
*/

function getUserCallback(id, callback) {
	setTimeout(() => {
		callback({ id, name: "José", country: "España" });
	}, 1500);
}

getUserCallback(1, (user) => {
	console.log("Con callback:", user);
});


function getUserPromise(id) {
	return new Promise((resolve, reject) => {
    setTimeout(() => {
		let success = true;
		if (success) {
			resolve({ id, name: "José", country: "España" });
		} else {
			reject("Error: no se pudo obtener el usuario");
		}
	}, 1500);
	});
}

getUserPromise(2)
.then(user => console.log("Con Promise:", user))
.catch(error => console.error(error));

function getUserAsync(id) {
	return new Promise((resolve, reject) => {
	setTimeout(() => {
		let success = true;
		if (success) {
		resolve({ id, name: "José", country: "España" });
		} else {
		reject("Error: no se pudo obtener el usuario");
		}
	}, 1500);
	});
}

async function loadUser() {
	try {
		console.log("Cargando...");
		const user = await getUserAsync(3);
		console.log("Con async/await:", user);
	} catch (error) {
		console.error(error);
	}
}

loadUser();
