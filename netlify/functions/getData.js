const { Client } = require('pg');

// Declaramos el cliente de la base de datos fuera de la función handler
let client;

const connectToDatabase = async () => {
  // Solo creamos la conexión si no existe ya
  if (!client) {
    client = new Client({
      connectionString: process.env.DATABASE_URL, // URL de la base de datos
      ssl: {
        rejectUnauthorized: false, // Esto es necesario para evitar errores de autenticación
      },
    });
    await client.connect();
  }
  return client;
};

exports.handler = async function(event, context) {
  try {
    // Usamos la conexión reutilizada
    const client = await connectToDatabase();

    const result = await client.query('SELECT * FROM usuarios');
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al obtener los datos' }),
    };
  }
};
