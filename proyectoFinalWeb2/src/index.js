const express = require('express');
const { Pool } = require('pg');
const app = express();
const path = require('path');

app.use(express.json());

// Conexión a la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});


async function inicializarBaseDeDatos() {
    let conectado = false;
    
    while (!conectado) {
        try {
            await pool.query('SELECT 1');
            conectado = true;
            console.log("🔌 Conexión exitosa con PostgreSQL. Creando tablas...");
        } catch (err) {
            console.log("⏳ Esperando a que la base de datos esté lista... (Reintentando en 3s)");
            await new Promise(resolve => setTimeout(resolve, 3000)); // Espera 3 segundos
        }
    }

    try {
        // Crear tabla de bici taxis
        await pool.query(`
            CREATE TABLE IF NOT EXISTS bicis (
                id SERIAL PRIMARY KEY,
                modelo VARCHAR(255) NOT NULL,
                fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Crear tabla de usuarios
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);

        // Insertar datos de prueba solo si la tabla está vacía
        const resBicis = await pool.query('SELECT COUNT(*) FROM bicis');
        if (parseInt(resBicis.rows[0].count) === 0) {
            await pool.query("INSERT INTO bicis (modelo) VALUES ('Bici Taxi Cute - Rosa');");
        }

        const resUsuarios = await pool.query('SELECT COUNT(*) FROM usuarios');
        if (parseInt(resUsuarios.rows[0].count) === 0) {
            await pool.query("INSERT INTO usuarios (username, password) VALUES ('lauu', 'churrito');");
            await pool.query("INSERT INTO usuarios (username, password) VALUES ('churro', 'lauu');");
            console.log("✨ Tablas creadas y usuarios inyectados con éxito ✨");
        }
    } catch (err) {
        console.error("❌ Error al crear las tablas:", err.message);
    }
}

// Ejecutar la inicialización automáticamente al arrancar
inicializarBaseDeDatos();

// Variable global de sesión
let usuarioAutenticado = false;

// rutas publicas

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE username = $1 AND password = $2', [username, password]);
        if (result.rows.length > 0) {
            usuarioAutenticado = true;
            return res.json({ mensaje: 'Bienvenido' });
        } else {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
    } catch (err) {
        console.error("Error en Login:", err);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
});

//proteccion

app.use('/api', (req, res, next) => {
    if (!usuarioAutenticado) {
        return res.status(401).json({ error: 'No autorizado' });
    }
    next();
});


// proteccion de rutas

app.get('/index.html', (req, res) => {
    if (!usuarioAutenticado) {
        return res.redirect('/login.html');
    }
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/', (req, res) => {
    if (usuarioAutenticado) {
        res.redirect('/index.html');
    } else {
        res.redirect('/login.html');
    }
});

app.post('/api/logout', (req, res) => {
    usuarioAutenticado = false;
    res.json({ mensaje: 'Sesión cerrada' });
});

app.use(express.static(path.join(__dirname, '../public')));


app.get('/api/bicis', async (req, res) => {
  const { search } = req.query;
  try {
    let query = 'SELECT * FROM bicis';
    let params = [];
    if (search && search.trim() !== '') {
      query = 'SELECT * FROM bicis WHERE modelo ILIKE $1';
      params = [`%${search}%`];
    }
    query += ' ORDER BY id DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

app.post('/api/bicis', async (req, res) => {
  const { modelo } = req.body;
  try {
    await pool.query('INSERT INTO bicis (modelo) VALUES ($1)', [modelo]);
    res.json({ mensaje: '🌸 Bici registrada 🌸' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al registrar' });
  }
});

app.delete('/api/bicis/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM bicis WHERE id = $1', [id]);
        res.json({ mensaje: 'Bici eliminada' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar' });
    }
});

app.put('/api/bicis/:id', async (req, res) => {
    const { id } = req.params;
    const { modelo } = req.body;
    try {
        await pool.query('UPDATE bicis SET modelo = $1 WHERE id = $2', [modelo, id]);
        res.json({ mensaje: 'Bici actualizada' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor activo en http://localhost:${PORT}`));