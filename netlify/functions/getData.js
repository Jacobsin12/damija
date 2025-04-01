const { Client } = require('pg');

let client;

const connectToDatabase = async () => {
  if (!client) {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();
  }
  return client;
};

exports.handler = async function (event) {
  try {
    const client = await connectToDatabase();
    const { email, password, name, action, userId } = JSON.parse(event.body);

    if (action === 'registerUser') {
      if (!email || !password || !name) {
        return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Todos los campos son obligatorios' }) };
      }

      const existingUser = await client.query('SELECT * FROM usuarios WHERE correo = $1', [email]);
      if (existingUser.rows.length > 0) {
        return { statusCode: 409, body: JSON.stringify({ success: false, message: 'El correo ya está registrado' }) };
      }

      await client.query('INSERT INTO usuarios (correo, contrasena, nombre) VALUES ($1, $2, $3)', [email, password, name]);

      return { statusCode: 200, body: JSON.stringify({ success: true, message: 'Usuario registrado exitosamente' }) };
    }

    if (action === 'updateUser') {
      if (!userId || !email || !password || !name) {
        return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Todos los campos son obligatorios' }) };
      }

      await client.query('UPDATE usuarios SET correo = $1, contrasena = $2, nombre = $3 WHERE id = $4', [email, password, name, userId]);

      return { statusCode: 200, body: JSON.stringify({ success: true, message: 'Usuario actualizado correctamente' }) };
    }

    const result = await client.query('SELECT * FROM usuarios WHERE correo = $1 AND contrasena = $2', [email, password]);

    if (result.rows.length > 0) {
      const users = await client.query('SELECT * FROM usuarios');
      return { statusCode: 200, body: JSON.stringify({ success: true, users: users.rows }) };
    } else {
      return { statusCode: 401, body: JSON.stringify({ success: false, message: 'Credenciales incorrectas' }) };
    }

  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Error en el servidor' }) };
  }
};
