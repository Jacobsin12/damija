import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalAgregar = ({ show, handleClose, handleAdd }) => {
  const [newUser, setNewUser] = useState({ nombre: '', correo: '', contrasena: '' });
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!newUser.nombre || !newUser.correo || !newUser.contrasena) {
      setError('Todos los campos son obligatorios');
      return;
    }
    handleAdd(newUser);
    setNewUser({ nombre: '', correo: '', contrasena: '' });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre"
              value={newUser.nombre}
              onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese el correo"
              value={newUser.correo}
              onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese la contraseña"
              value={newUser.contrasena}
              onChange={(e) => setNewUser({ ...newUser, contrasena: e.target.value })}
            />
          </Form.Group>
          {error && <div className="text-danger mt-2">{error}</div>}
          <Button variant="primary" className="mt-3 w-100" onClick={handleSubmit}>
            Agregar Usuario
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAgregar;
