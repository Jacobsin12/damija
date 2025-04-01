import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import ModalAgregar from '../components/ModalAgregar';
import ModalEditar from '../component/ModalEditar';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { users } = location.state || {}; // Recibir los usuarios desde el navigate

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleDeleteUser = (userId) => {
    console.log('Eliminar usuario con id:', userId);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
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

          {/* Botones Agregar Usuario y Cerrar Sesión en la misma línea */}
          <div className="d-flex justify-content-between mb-3">
            <Button variant="success" onClick={() => setShowAddModal(true)}>
              Agregar Usuario
            </Button>
            <Button variant="danger" onClick={handleLogout}>
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
                    <Button variant="warning" className="me-2 mb-1 mb-md-0" onClick={() => handleEditUser(user)}>
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
        </Col>
      </Row>

      {/* Modales */}
      <ModalAgregar show={showAddModal} handleClose={() => setShowAddModal(false)} />
      <ModalEditar show={showEditModal} handleClose={() => setShowEditModal(false)} user={selectedUser} />
    </Container>
  );
};

export default Home;
