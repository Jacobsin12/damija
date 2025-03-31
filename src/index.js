import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP
import reportWebVitals from './reportWebVitals';

import Home from './screens/Home';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // Para mostrar errores de login
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Aquí ponemos directamente la URL de Heroku
      const backendUrl = 'https://damija-7623a9162735.herokuapp.com/'; // Cambia por tu URL de Heroku

      // Hacemos la solicitud al backend para verificar las credenciales
      const response = await axios.post(`${backendUrl}/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        // Si el login es exitoso, redirigimos al Home
        navigate('/home');
      }
    } catch (err) {
      // Si ocurre un error, mostramos el mensaje de error
      setError(err.response?.data?.message || 'Error al iniciar sesión');
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
              </form>
              {error && <div className="alert alert-danger mt-3">{error}</div>} {/* Mostrar el error */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
