import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalEditar = ({ show, handleClose, handleEdit, user }) => {
  const [updatedUser, setUpdatedUser] = useState({ id: '', nombre: '', correo: '', contrasena: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setUpdatedUser({ id: user.id, nombre: user.nombre, correo: user.correo, contrasena: user.contrasena || '' });
    }
  }, [user]);

  const handleSubmit = () => {
    if (!updatedUser.nombre || !updatedUser.correo || !updatedUser.contrasena) {
      setError('Todos los campos son obligatorios');
      return;
    }
    handleEdit(updatedUser);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={updatedUser.nombre} onChange={(e) => setUpdatedUser({ ...updatedUser, nombre: e.target.value })} />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" value={updatedUser.correo} onChange={(e) => setUpdatedUser({ ...updatedUser, correo: e.target.value })} />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" value={updatedUser.contrasena} onChange={(e) => setUpdatedUser({ ...updatedUser, contrasena: e.target.value })} />
          </Form.Group>
          {error && <div className="text-danger mt-2">{error}</div>}
          <Button variant="success" className="mt-3 w-100" onClick={handleSubmit}>Guardar Cambios</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEditar;
