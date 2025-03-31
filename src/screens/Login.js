import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Para manejar errores
  const navigate = useNavigate(); // Usar useNavigate para redirigir

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realiza la solicitud a la función serverless para obtener los datos o validar el usuario
    fetch('/.netlify/functions/getData')  // Asegúrate de que la ruta sea correcta
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Datos obtenidos:', data);  // Puedes usar los datos obtenidos como quieras

        // Aquí agregas tu lógica de autenticación, como verificar email y password

        // Si la autenticación es exitosa, redirige a la página de inicio
        navigate('/home');
      })
      .catch((error) => {
        setError(error.message); // Si ocurre un error, lo mostramos
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Iniciar Sesión</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                {error && <div className="mt-3 text-danger">{error}</div>} {/* Muestra error si lo hay */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
