import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalRegister from '../components/ModalRegister'; // Importar el componente ModalRegister

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false); // Estado para mostrar el modal de registro
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/.netlify/functions/getData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      console.log('Usuarios:', data.users);
      navigate('/home', { state: { users: data.users } });
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleRegister = (user) => {
    // Puedes redirigir o actualizar el estado si es necesario
    console.log('Usuario registrado:', user);
    // Aquí puedes agregar lógica después de que el usuario se registre exitosamente
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
                {error && <div className="mt-3 text-danger">{error}</div>}
              </form>
              <div className="mt-3 text-center">
                <button
                  className="btn btn-link"
                  onClick={() => setShowRegisterModal(true)} // Mostrar el modal de registro
                >
                  ¿No tienes una cuenta? Regístrate aquí
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de registro */}
      <ModalRegister
        showModal={showRegisterModal}
        handleClose={() => setShowRegisterModal(false)} // Cerrar el modal
        handleRegister={handleRegister} // Manejar el registro
      />
    </div>
  );
};

export default Login;
