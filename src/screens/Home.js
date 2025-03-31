import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ListGroup, Modal, Form, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { users } = location.state || {}; // Recibir los usuarios desde el navigate

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ nombre: '', correo: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
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
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Container fluid className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h4 className="text-center">Usuarios Registrados</h4>

          {/* Botón de cerrar sesión */}
          <div className="d-flex justify-content-end">
            <Button variant="danger" onClick={handleLogout} className="mb-3">
              Cerrar Sesión
            </Button>
          </div>

          {/* Lista de usuarios */}
          {users && users.length > 0 ? (
            <ListGroup>
              {users.map((user) => (
                <ListGroup.Item key={user.id} className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                  <div className="text-center text-md-start">
                    <strong>{user.nombre}</strong> - {user.correo}
                  </div>
                  <div className="mt-2 mt-md-0">
                    <Button variant="warning" className="me-2 mb-1 mb-md-0" onClick={() => handleEditUser(user.id)}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                      Eliminar
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-center">No hay usuarios disponibles.</p>
          )}

          {/* Botón para agregar un nuevo usuario */}
          <div className="mt-3 text-center">
            <Button variant="success" onClick={() => setShowAddModal(true)}>
              Agregar Usuario
            </Button>
          </div>
        </Col>
      </Row>

      {/* Modal para agregar un nuevo usuario */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
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
            <Button variant="primary" className="mt-3 w-100" onClick={handleAddUser}>
              Agregar Usuario
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Home;
