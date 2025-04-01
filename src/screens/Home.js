import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import ModalAgregar from '../components/ModalAgregar';
import ModalEditar from '../components/ModalEditar';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState(location.state?.users || []);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleEditUser = async (updatedUser) => {
    try {
      const response = await fetch('/.netlify/functions/getData', {
        method: 'POST',
        body: JSON.stringify({ action: 'updateUser', userId: updatedUser.id, email: updatedUser.correo, password: updatedUser.contrasena, name: updatedUser.nombre }),
      });

      const result = await response.json();
      if (result.success) {
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  return (
    <Container fluid className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h4 className="text-center">Usuarios Registrados</h4>

          <div className="d-flex justify-content-between mb-3">
            <Button variant="success" onClick={() => setShowAddModal(true)}>Agregar Usuario</Button>
            <Button variant="danger" onClick={() => { localStorage.removeItem('user'); navigate('/login'); }}>Cerrar Sesión</Button>
          </div>

          {users.length > 0 ? (
            <ListGroup>
              {users.map(user => (
                <ListGroup.Item key={user.id} className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                  <div className="text-center text-md-start"><strong>{user.nombre}</strong> - {user.correo}</div>
                  <div className="mt-2 mt-md-0">
                    <Button variant="warning" className="me-2 mb-1 mb-md-0" onClick={() => { setSelectedUser(user); setShowEditModal(true); }}>Editar</Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-center">No hay usuarios disponibles.</p>
          )}
        </Col>
      </Row>

      <ModalAgregar show={showAddModal} handleClose={() => setShowAddModal(false)} />
      <ModalEditar show={showEditModal} handleClose={() => setShowEditModal(false)} user={selectedUser} handleEdit={handleEditUser} />
    </Container>
  );
};

export default Home;
