const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
require('dotenv').config();

const app = express();

// 🛠️ CONFIGURACIÓN CORRECTA DE CORS 🛠️
app.use(cors({
  origin: ['http://localhost:3000', 'https://damija.netlify.app'], // Agrega los dominios permitidos
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

// Conexión con la base de datos
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
client.connect();

// Ruta de Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await client.query(
      'SELECT * FROM usuarios WHERE correo = $1 AND contrasena = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login exitoso', user: result.rows[0] });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (err) {
    console.error('Error en la consulta:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
