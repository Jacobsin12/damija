import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalRegister from '../components/ModalRegister';
import { Modal, Button } from 'react-bootstrap'; // Importar Bootstrap Modal

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false); // Estado para mostrar el modal de error
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@damija\.com$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      setError('El correo debe pertenecer al dominio asociado');
      setShowErrorModal(true);
      return;
    }

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

      localStorage.setItem('user', JSON.stringify(data.users[0]));
      navigate('/home', { state: { users: data.users } });
    } catch (error) {
      setError(error.message);
      setShowErrorModal(true);
    }
  };

  const handleRegister = (user) => {
    console.log('Usuario registrado:', user);
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
              <div className="mt-3 text-center">
                <button className="btn btn-link" onClick={() => setShowRegisterModal(true)}>
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
        handleClose={() => setShowRegisterModal(false)}
        handleRegister={handleRegister}
      />

      {/* Modal de error */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowErrorModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;