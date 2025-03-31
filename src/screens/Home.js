import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, ListGroup, Modal, Form } from 'react-bootstrap';

const Home = () => {
  const location = useLocation();
  const { users } = location.state || {}; // Recibir los usuarios desde el navigate

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ nombre: '', correo: '' });
  const [error, setError] = useState('');

  // Función para manejar el agregar usuario
  const handleAddUser = () => {
    if (!newUser.nombre || !newUser.correo) {
      setError('Todos los campos son obligatorios');
      return;
    }
    // Lógica para agregar el usuario a la lista
    // Por ejemplo, actualizar el estado de usuarios (si fuera un estado de backend)
    console.log('Nuevo usuario agregado:', newUser);
    setShowAddModal(false);
    setNewUser({ nombre: '', correo: '' });
  };

  // Función para eliminar un usuario
  const handleDeleteUser = (userId) => {
    // Lógica para eliminar al usuario (actualización en el backend o estado)
    console.log('Eliminar usuario con id:', userId);
  };

  // Función para editar un usuario
  const handleEditUser = (userId) => {
    // Lógica para editar el usuario (actualización en el backend o estado)
    console.log('Editar usuario con id:', userId);
  };

  return (
    <div className="container mt-5">
      <h4>Usuarios Registrados</h4>

      {/* Lista de usuarios */}
      {users ? (
        <ListGroup>
          {users.map((user) => (
            <ListGroup.Item key={user.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{user.nombre}</strong> - {user.correo}
              </div>
              <div>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEditUser(user.id)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Eliminar
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No hay usuarios disponibles.</p>
      )}

      {/* Botón para agregar un nuevo usuario */}
      <div className="mt-3">
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          Agregar Usuario
        </Button>
      </div>

      {/* Modal para agregar un nuevo usuario */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Usuario</Modal.Title>
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
                placeholder="Ingrese el correo electrónico"
                value={newUser.correo}
                onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })}
              />
            </Form.Group>
            {error && <div className="text-danger mt-2">{error}</div>}
            <Button variant="primary" className="mt-3" onClick={handleAddUser}>
              Agregar Usuario
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
