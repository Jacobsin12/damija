import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap.css'; // Importa tu archivo bootstrap.css
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // Importar React Router
import reportWebVitals from './reportWebVitals';

// Importar tus componentes

import Home from './screens/Home'; // Suponiendo que tu Home está en screens

// Componente Login
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Usar useNavigate para redirigir

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de autenticación

    // Redirigir a la página de inicio después de hacer login
    navigate('/home');
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente App (Definir las rutas)
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Ruta para Login */}
        <Route path="/home" element={<Home />} /> {/* Ruta para Home */}
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

// Si quieres empezar a medir el rendimiento en tu app, puedes pasar una función
// para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o enviarlos a un endpoint de análisis. Aprende más: https://bit.ly/CRA-vitals
reportWebVitals();
