# 📅 Day 22 – MongoDB Basics / Conceptos básicos de MongoDB

## 📌 Conceptos clave / Key Concepts

**ES:**  
- Base de datos NoSQL / NoSQL database  
- Colección / Collection  
- Documento / Document  
- Campos / Fields  
- _id como identificador único / _id as unique identifier  

**EN:**  
- NoSQL database  
- Collection  
- Document  
- Fields  
- _id as unique identifier  

---

## 🛠️ Operaciones básicas / Basic Operations

```javascript
// Conectar a MongoDB usando Mongo Shell
use blogDB;

// Crear colección e insertar documentos / Create collection and insert documents
db.users.insertMany([
  { username: "Jose", email: "jose@example.com", password: "hashedpassword" },
  { username: "Ana", email: "ana@example.com", password: "hashedpassword" }
]);

// Buscar documentos / Find documents
db.users.find(); // todos los usuarios
db.users.find({ username: "Jose" }); // filtrando por username

// Actualizar documentos / Update documents
db.users.updateOne(
  { username: "Jose" },
  { $set: { email: "newemail@example.com" } }
);

// Eliminar documentos / Delete documents
db.users.deleteOne({ username: "Ana" });
