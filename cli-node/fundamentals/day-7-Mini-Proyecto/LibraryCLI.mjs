/*
Mini-Challenge – Consolidación
- Combinar ejercicios importantes en un solo script
- Documentar en README provisional
- Testear todas las funciones
*/

import { resolve } from "path";
import readline from "readline";
import { loadData, saveData } from "./Data.mjs";
import {
    delay,
    findUserByUsername,
    validateUserPassword,
    validateNewUsername,
    validateNewBookTitle,
    validateNewAdminPassword,
} from "./Functions.mjs";

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let { administrators, libraryBooks } = loadData();

async function authenticateUser() {
    console.log("========== User Menu ==========");
    readlineInterface.question("Enter username: ", async (inputUsername) => {
        try {
            const authenticatedUser = await findUserByUsername(inputUsername);
            readlineInterface.question("Enter password: ", async (inputPassword) => {
                try {
                    await validateUserPassword(inputPassword);
                    console.log(`Welcome, ${authenticatedUser.username}`);
                    await delay(1000);
                    displayMainMenu();
                } catch (error) {
                    console.error(error);
                    readlineInterface.close();
                }
            });
        } catch (error) {
            console.error(error);
            readlineInterface.close();
        }
    });
}

async function displayMainMenu() {
    console.log("=== Library Management Menu ===");
    console.log("1. Add user");
    console.log("2. Remove last user");
    console.log("3. Add book");
    console.log("4. Remove last book");
    console.log("5. View all books");
    console.log("6. Exit");
	console.log("===============================");
    readlineInterface.setPrompt("Select an option (1-6): ");
    readlineInterface.prompt();

    readlineInterface.removeAllListeners('line');
    readlineInterface.on("line", (userInput) => {
        if (userInput === "1") {
            readlineInterface.question("Enter new username: ", async (newUsername) => {
                try {
                    await validateNewUsername(newUsername);
                    readlineInterface.question("Enter password (numeric values only, more than 3 digits): ", async (newPassword) => {
                        try {
                            await validateNewAdminPassword(newPassword);
                            let newAdministrator = {
                                username: newUsername,
                                password: Number(newPassword)
                            };
                            administrators.push(newAdministrator);
							saveData({ administrators, libraryBooks });
                            console.log("User added successfully");
                            authenticateUser();
                        } catch {
                            console.log("Invalid password!");
                            readlineInterface.prompt();
                        }
                    })
                } catch {
                    console.log("Invalid username!");
                    readlineInterface.prompt();
                }
            })
        } else if (userInput === "2") {
            if (administrators.length === 1) {
                console.log("There must be at least one user");
                readlineInterface.prompt();
            } else {
                console.log("User removed successfully");
                administrators.pop();
				saveData({ administrators, libraryBooks });
                authenticateUser();
            }
        } else if (userInput === "3") {
            readlineInterface.question("Enter book title: ", async (newBookTitle) => {
                try {
                    await validateNewBookTitle(newBookTitle);
                    readlineInterface.question("Enter author name: ", (newBookAuthor) => {
                        readlineInterface.question("Enter number of pages: ", (newBookPages) => {
                            let newBookToAdd = {
                                title: newBookTitle,
                                author: newBookAuthor,
                                pages: Number(newBookPages)
                            };
                            libraryBooks.push(newBookToAdd);
                            console.log("Book added successfully!");
							saveData({ administrators, libraryBooks });
                            readlineInterface.prompt();
                        })
                    })
                } catch {
                    console.log("Title already in use!");
                    readlineInterface.prompt();
                }
            })
        } else if (userInput === "4") {
            if (libraryBooks.length === 0) {
                console.log("No books to remove.");
            } else {
                libraryBooks.pop();
				saveData({ administrators, libraryBooks });
                console.log("Last book removed.");
            }
            readlineInterface.prompt();
        } else if (userInput === "5") {
            console.log("Current books:");
            libraryBooks.forEach(book => console.log(`- ${book.title} by ${book.author} (${book.pages} pages)`));
            readlineInterface.prompt();
        } else if (userInput === "6") {
            console.log("Exiting application...");
            readlineInterface.close();
        } else {
            console.log("Invalid option. Please select 1-6.");
            readlineInterface.prompt();
        }
    });
}

authenticateUser();