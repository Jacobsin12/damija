const express = require('express');  // Asegúrate de importar Express
const { Client } = require('pg');
const cors = require('cors');  // Si no lo has hecho ya, instala e importa CORS
require('dotenv').config();  // Para cargar las variables de entorno

const app = express();  // Aquí inicializas tu app de Express

// Middleware para parsear el JSON
app.use(express.json());

// Configuración de CORS para permitir solicitudes desde Netlify
const allowedOrigins = ['https://damija.netlify.app'];  // Cambia esto por tu dominio de Netlify

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Si la solicitud proviene del dominio permitido
    } else {
      callback(new Error('No permitido por CORS')); // Si no, rechaza la solicitud
    }
  },
}));

// Configuración de la base de datos
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Conectar a la base de datos
client.connect();

// Ruta para manejar el login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;  // Recibimos el correo y la contraseña desde el frontend

  try {
    // Consultar si existe un usuario con ese correo y contraseña
    const result = await client.query(
      'SELECT * FROM usuarios WHERE correo = $1 AND contrasena = $2',  // Cambié "contraseña" por "contrasena"
      [email, password]
    );

    if (result.rows.length > 0) {
      // Si encontramos el usuario, devolvemos un mensaje de éxito
      res.status(200).json({ message: 'Login exitoso', user: result.rows[0] });
    } else {
      // Si no, devolvemos un error
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (err) {
    console.error('Error en la consulta:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Puerto en el que la API escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
