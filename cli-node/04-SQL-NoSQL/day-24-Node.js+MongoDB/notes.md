# 📅 Day 24 – Node.js + MongoDB / Node.js + MongoDB

## 🔌 Conexión con MongoDB / Connecting to MongoDB

**ES:**  
- Instalar MongoDB driver: `npm install mongodb`  
- Alternativa: usar Mongoose: `npm install mongoose`  
- Crear cliente y conectar a la base de datos.

**EN:**  
- Install MongoDB driver: `npm install mongodb`  
- Alternative: use Mongoose: `npm install mongoose`  
- Create client and connect to the database.

---

## 🛠️ Ejemplo básico con driver oficial / Basic Example with MongoDB Driver

```javascript
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('blogDB');
    const users = db.collection('users');

    // Insertar usuario / Insert user
    await users.insertOne({ username: 'Jose', email: 'jose@example.com' });

    // Leer usuarios / Read users
    const allUsers = await users.find().toArray();
    console.log(allUsers);

    // Actualizar usuario / Update user
    await users.updateOne({ username: 'Jose' }, { $set: { email: 'newemail@example.com' } });

    // Eliminar usuario / Delete user
    await users.deleteOne({ username: 'Jose' });
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
