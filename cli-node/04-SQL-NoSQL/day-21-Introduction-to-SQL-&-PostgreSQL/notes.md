# 📅 Day 21 – SQL & PostgreSQL Basics / Conceptos básicos SQL y PostgreSQL

## 📌 Conceptos clave / Key Concepts

**ES:**  
- Base de datos relacional / Relational database  
- Tabla / Table  
- Fila / Row  
- Columna / Column  
- Primary Key, Foreign Key  
- Relaciones 1:1, 1:N, N:N  

**EN:**  
- Relational database  
- Table  
- Row  
- Column  
- Primary Key, Foreign Key  
- Relationships 1:1, 1:N, N:N  

---

## 🛠️ Comandos SQL básicos / Basic SQL Commands

```sql
-- Crear base de datos / Create database
CREATE DATABASE blogdb;

-- Crear tabla usuarios / Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Insertar datos / Insert data
INSERT INTO users (username, email, password)
VALUES ('Jose', 'jose@example.com', 'hashedpassword');

-- Seleccionar datos / Select data
SELECT * FROM users;

-- Actualizar datos / Update data
UPDATE users SET email = 'newemail@example.com' WHERE id = 1;

-- Eliminar datos / Delete data
DELETE FROM users WHERE id = 1;
