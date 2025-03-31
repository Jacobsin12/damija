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
    const client = await connectToDatabase();

    // Leer los datos del cuerpo de la solicitud
    const { email, password } = JSON.parse(event.body);

    // Consultar la base de datos para verificar la autenticación
    const result = await client.query('SELECT * FROM usuarios WHERE correo = $1 AND contrasena = $2', [email, password]);

    if (result.rows.length > 0) {
      // Si el usuario existe y las credenciales son correctas, devolver la lista de usuarios
      const users = await client.query('SELECT * FROM usuarios');
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, users: users.rows }),
      };
    } else {
      // Si no se encuentra el usuario o las credenciales son incorrectas
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false, message: 'Credenciales incorrectas' }),
      };
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al obtener los datos' }),
    };
  }
};
