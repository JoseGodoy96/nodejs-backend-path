CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
	email VARCHAR(100),
    password VARCHAR(50)
);

INSERT INTO users (username, email, password) VALUES
('Txemita', 'txemita@example.com', '1234'),
('Juan', 'Juan@example.com', '1234'),
('Ana', 'Ana@example.com', '1234'),
('Maria', 'Maria@example.com', '1234');