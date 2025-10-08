CREATE DATABASE blogdb;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);

INSERT INTO users (name, email) VALUES 
('Juan', 'juan@example.com'),
('Ana', 'ana@example.com');
