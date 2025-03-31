const { Client } = require('pg');

// Declaramos el cliente de la base de datos fuera de la función handler
let client;

const connectToDatabase = async () => {
  if (!client) {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    await client.connect();
  }
  return client;
};

exports.handler = async function(event, context) {
  try {
    const { name, email, password } = JSON.parse(event.body);

    if (!name || !email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Todos los campos son obligatorios' }),
      };
    }

    const client = await connectToDatabase();

    // Insertar el nuevo usuario en la base de datos
    const result = await client.query(
      'INSERT INTO usuarios (nombre, correo, contrasena) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, user: result.rows[0] }),
    };
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Error al registrar el usuario' }),
    };
  }
};
