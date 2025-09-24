import { loadData, saveData } from "./Data.mjs";

let { administrators, libraryBooks } = loadData();

export function delay(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export async function findUserByUsername(inputUsername) {
	console.log("Loading...");
	await delay(1000);
	return new Promise((resolve, reject) => {
		const foundUser = administrators.find(user => user.username === inputUsername)
		if (foundUser) {
			resolve(foundUser); 
		} else {
			reject("Error: User not found");
		}
	});
}

export async function validateUserPassword(inputPassword) {
	console.log("Loading...");
	await delay(1000);
	return new Promise((resolve, reject) => {
		const validPassword = administrators.find(admin => admin.password === Number(inputPassword))
		if (validPassword) {
			resolve(validPassword); 
		} else {
			reject("Error: Invalid password");
		}
	});
}

export async function validateNewUsername(newUsername) {
	return new Promise((resolve, reject) => {
		const existingAdmin = administrators.find(admin => admin.username === newUsername);
		if (existingAdmin) {
			reject("Username already in use");
		} else {
			resolve("Valid username");
		}
	});
}

export async function validateNewBookTitle(newTitle){
	return new Promise((resolve, reject) => {
		const existingBook = libraryBooks.find(book => book.title === newTitle);
		if (existingBook) {
			reject("Title already in use");
		} else {
			resolve("Valid title");
		}
	});
}

export async function validateNewAdminPassword(newPassword) {
	return new Promise((resolve, reject) => {
		if (newPassword.length > 3 && !isNaN(Number(newPassword))) {
			resolve("Valid password");
		} else {
			reject("Invalid password");
		}
	});
}