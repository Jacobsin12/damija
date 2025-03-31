import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalRegister = ({ showModal, handleClose, handleRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos antes de enviar
    if (!name || !email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Realizar la solicitud para registrar al usuario
    try {
      const response = await fetch('/.netlify/functions/registerUser', { // Aquí va la ruta de la función serverless para el registro
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      // Llamar la función handleRegister para actualizar el estado
      handleRegister(data.user); // Pasar el usuario registrado a la función handleRegister (puedes redirigir o hacer lo que desees)
      handleClose(); // Cerrar el modal
    } catch (error) {
      setError(error.message);
      console.error(error);
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
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          {error && <div className="text-danger mt-2">{error}</div>}
          <Button variant="primary" type="submit" className="mt-3">
            Registrarse
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRegister;
