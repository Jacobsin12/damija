// Importamos el cliente de PostgreSQL
const { Client } = require('pg');

// Conexión a la base de datos de Heroku usando la URL proporcionada
const connectionString = process.env.DATABASE_URL || 'postgres://uflr1o25h28aih:p826d7977c98e2dd620019614cb7604cc882d49fc3489f4d2ffe2875b354fdc90@c1i13pt05ja4ag.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/da3sjnnk6tqagv';

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

exports.handler = async (event, context) => {
  try {
    // Conectar a la base de datos
    await client.connect();

    // Realizar una consulta (cambiar la consulta según lo que necesites)
    const res = await client.query('SELECT * usuarios'); // Cambia 'your_table_name' por tu nombre de tabla real

    // Retornar los resultados de la consulta
    return {
      statusCode: 200,
      body: JSON.stringify(res.rows),  // Devolver los datos como JSON
    };
  } catch (err) {
    console.error(err);
    // Si hay un error, retornar el error
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching data' }),
    };
  } finally {
    // Cerrar la conexión
    await client.end();
  }
};
