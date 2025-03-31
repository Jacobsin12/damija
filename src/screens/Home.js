import React from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const { users } = location.state || {}; // Recibir los usuarios desde el navigate

  return (
    <div className="container mt-5">
      <h4>Usuarios Registrados</h4>
      {users ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.nombre} - {user.correo}</li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios disponibles.</p>
      )}
    </div>
  );
};

export default Home;
