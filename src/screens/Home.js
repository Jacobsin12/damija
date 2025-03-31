import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ListGroup, Modal, Form } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ nombre: '', correo: '' });
  const [error, setError] = useState('');

  // Verificar si el usuario está autenticado al cargar la página
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/'); // Redirigir al login si no hay usuario autenticado
    } else {
      setUsers([JSON.parse(user)]); // Si está autenticado, obtener el usuario desde localStorage

      // Obtener todos los usuarios desde la API
      fetch('/.netlify/functions/getdata')  // Suponiendo que esta es tu API
        .then(response => {
          if (!response.ok) {
            // Si la respuesta no es 2xx, lanzar error
            throw new Error('Network response was not ok');
          }
          return response.json();  // Intentamos parsear como JSON
        })
        .then(data => {
          console.log('Usuarios obtenidos:', data);  // Verifica la respuesta en la consola
          setUsers(data.users); // Aquí actualizas el estado con todos los usuarios
        })
        .catch(error => {
          console.error("Error fetching users:", error);
          setError('Error al obtener los usuarios. Intenta de nuevo más tarde.');
        });
    }
  }, [navigate]);

  const handleAddUser = () => {
    if (!newUser.nombre || !newUser.correo) {
      setError('Todos los campos son obligatorios');
      return;
    }
    console.log('Nuevo usuario agregado:', newUser);
    setShowAddModal(false);
    setNewUser({ nombre: '', correo: '' });
  };

  const handleDeleteUser = (userId) => {
    console.log('Eliminar usuario con id:', userId);
  };

  const handleEditUser = (userId) => {
    console.log('Editar usuario con id:', userId);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Eliminar el usuario del localStorage
    navigate('/'); // Redirigir al login
  };

  return (
    <div className="container mt-5">
      <h4>Usuarios Registrados</h4>
      <Button variant="danger" onClick={handleLogout} className="mb-3">
        Cerrar Sesión
      </Button>

      {error && <div className="text-danger mb-3">{error}</div>} {/* Mostrar error si hay */}

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

      <div className="mt-3">
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          Agregar Usuario
        </Button>
      </div>

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
