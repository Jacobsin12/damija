import React, { useState } from 'react';
import { Modal, Button, Form, ProgressBar, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ModalRegister = ({ showModal, handleClose, handleRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => {
    const strength =
      (password.length >= 8) +
      /[A-Z]/.test(password) +
      /\d/.test(password) +
      /[^\w]/.test(password); 
    setPasswordStrength(strength * 25);
    return strength === 4;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (!validateEmail(email)) {
      setError('Ingrese un correo electrónico válido');
      return;
    }
    if (!validatePassword(password)) {
      setError('La contraseña debe cumplir con los requisitos');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/getData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, action: 'registerUser' }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      handleRegister(data.user);
      handleClose();
    } catch (error) {
      setError(error.message || 'Ocurrió un error al registrar el usuario.');
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrarse</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                required
              />
              <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
            <ProgressBar now={passwordStrength} variant={passwordStrength === 100 ? 'success' : passwordStrength >= 50 ? 'warning' : 'danger'} className="mt-2" />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Repetir Contraseña</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button variant="outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>
          {error && <div className="text-danger mt-2">{error}</div>}
          <Button variant="primary" type="submit" className="mt-3">Registrarse</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRegister;