# 📅 Day 23 – Node.js + PostgreSQL / Node.js + PostgreSQL

## 🔌 Conexión a PostgreSQL / Connecting to PostgreSQL

**ES:**  
- Instalar driver oficial: `npm install pg`  
- Crear pool de conexiones para ejecutar queries.  

**EN:**  
- Install official driver: `npm install pg`  
- Create a connection pool to execute queries.

---

## 🛠️ Ejemplo básico con `pg` / Basic Example with `pg`

```javascript
import pkg from 'pg';
const { Pool } = pkg;

// Crear pool de conexiones / Create connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blogdb',
  password: 'tu_contraseña',
  port: 5432,
});

// Función para consultar usuarios / Function to query users
async function getUsers() {
  try {
    const res = await pool.query('SELECT * FROM users');
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  }
}

getUsers();
