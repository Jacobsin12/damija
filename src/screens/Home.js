import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ListGroup, Modal, Form } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const { users: locationUsers } = location.state || {}; // Recibir los usuarios desde el navigate
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ nombre: '', correo: '' });
  const [error, setError] = useState('');

  // Comprobamos si el usuario está autenticado
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login'); // Si no está autenticado, redirige al login
    }
  }, [navigate]);

  // Escuchar cambios en el localStorage y actualizar el estado de los usuarios
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  // Función para manejar el agregar usuario
  const handleAddUser = () => {
    if (!newUser.nombre || !newUser.correo) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Actualiza los usuarios en localStorage

    setShowAddModal(false);
    setNewUser({ nombre: '', correo: '' });
  };

  // Función para eliminar un usuario
  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Actualiza los usuarios en localStorage
  };

  // Función para editar un usuario
  const handleEditUser = (userId) => {
    console.log('Editar usuario con id:', userId);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('user'); // Eliminar el usuario del localStorage
    navigate('/login'); // Redirigir al login
  };

  return (
    <div className="container mt-5">
      <h4>Usuarios Registrados</h4>

      {/* Botón de cerrar sesión */}
      <Button variant="danger" onClick={handleLogout} className="mb-3">
        Cerrar Sesión
      </Button>

      {/* Lista de usuarios */}
      {users.length > 0 ? (
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
