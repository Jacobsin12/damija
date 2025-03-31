const { Client } = require('pg');

exports.handler = async function(event, context) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL, // Asegúrate de tener la URL en las variables de entorno
  });

  await client.connect();

  try {
    const result = await client.query('SELECT * FROM your_table');
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
  } finally {
    await client.end();
  }
};
