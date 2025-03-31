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
    const { email, password, name, action } = JSON.parse(event.body);

    // Si la acción es "register", insertar el nuevo usuario
    if (action === 'registerUser') {
      // Validar que los campos no estén vacíos
      if (!email || !password || !name) {
        return {
          statusCode: 400,
          body: JSON.stringify({ success: false, message: 'Todos los campos son obligatorios' }),
        };
      }

      // Verificar si el correo ya está registrado
      const existingUser = await client.query('SELECT * FROM usuarios WHERE correo = $1', [email]);
      if (existingUser.rows.length > 0) {
        return {
          statusCode: 409,
          body: JSON.stringify({ success: false, message: 'El correo ya está registrado' }),
        };
      }

      // Insertar el nuevo usuario en la base de datos
      await client.query(
        'INSERT INTO usuarios (correo, contrasena, nombre) VALUES ($1, $2, $3)',
        [email, password, name]
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Usuario registrado exitosamente' }),
      };
    }

    // Si la acción no es "register", proceder con la autenticación
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
