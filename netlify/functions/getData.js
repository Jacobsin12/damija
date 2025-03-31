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
    const { email, password, action, name } = JSON.parse(event.body);

    if (action === 'login') {
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
    }

    if (action === 'register') {
      // Verificar si ya existe un usuario con el mismo correo
      const checkUserResult = await client.query('SELECT * FROM usuarios WHERE correo = $1', [email]);

      if (checkUserResult.rows.length > 0) {
        // Si ya existe un usuario con ese correo
        return {
          statusCode: 400,
          body: JSON.stringify({ success: false, message: 'El correo ya está registrado' }),
        };
      }

      // Si el correo no existe, insertar el nuevo usuario
      const insertResult = await client.query(
        'INSERT INTO usuarios (nombre, correo, contrasena) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
      );

      // Devuelve el usuario insertado
      return {
        statusCode: 201,
        body: JSON.stringify({ success: true, message: 'Usuario registrado exitosamente', user: insertResult.rows[0] }),
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
