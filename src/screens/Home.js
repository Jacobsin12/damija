import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hacer la solicitud a la función serverless con los datos del usuario
    try {
      const response = await fetch('/.netlify/functions/getData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message); // Si las credenciales son incorrectas
      }

      // Si la autenticación es exitosa, redirigir a la página de usuarios
      console.log('Usuarios:', data.users);
      navigate('/home', { state: { users: data.users } }); // Pasar los usuarios como estado
    } catch (error) {
      setError(error.message); // Manejar el error
      console.error(error);
    }
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
                {error && <div className="mt-3 text-danger">{error}</div>} {/* Mostrar error */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
