# 📅 Day 25 – Integrating PostgreSQL & MongoDB / Integrando PostgreSQL y MongoDB

## 🔹 Conceptos clave / Key Concepts

**ES:**  
- Cada base de datos tiene su modelo: SQL relacional vs NoSQL documento.  
- PostgreSQL → datos estructurados, tablas y relaciones.  
- MongoDB → documentos flexibles, colecciones sin esquema rígido.  
- Node.js puede conectarse simultáneamente a ambos.  

**EN:**  
- Each database has its own model: SQL relational vs NoSQL document.  
- PostgreSQL → structured data, tables, and relationships.  
- MongoDB → flexible documents, collections without strict schema.  
- Node.js can connect to both simultaneously.

---

## 🔌 Ejemplo de conexión simultánea / Example: Connecting Both

```javascript
import pkg from 'pg';
const { Pool } = pkg;
import { MongoClient } from 'mongodb';

// PostgreSQL
const pgPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blogdb',
  password: 'tu_contraseña',
  port: 5432,
});

// MongoDB
const mongoClient = new MongoClient('mongodb://localhost:27017');
await mongoClient.connect();
const mongoDB = mongoClient.db('blogDB');
const mongoUsers = mongoDB.collection('users');

// Ejemplo de función combinada / Example function
async function getCombinedUsers() {
  try {
    // SQL
    const pgUsers = await pgPool.query('SELECT id, username, email FROM users');
    
    // NoSQL
    const mongoUsersList = await mongoUsers.find().toArray();
    
    console.log('PostgreSQL users:', pgUsers.rows);
    console.log('MongoDB users:', mongoUsersList);
  } catch (err) {
    console.error(err);
  }
}

getCombinedUsers();
