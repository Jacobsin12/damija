import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, ListGroup } from 'react-bootstrap'; // Importar componentes de Bootstrap

const Home = () => {
  const location = useLocation();
  const { users } = location.state || {}; // Recibir los usuarios desde el navigate

  return (
    <div className="container mt-5">
      <h4>Usuarios Registrados</h4>
      {users ? (
        <div className="row">
          {users.map((user) => (
            <div className="col-md-4 mb-3" key={user.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{user.nombre}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{user.correo}</Card.Subtitle>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Button variant="primary" className="me-2">
                        Editar
                      </Button>
                      <Button variant="success">
                        Agregar
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay usuarios disponibles.</p>
      )}
    </div>
  );
};

export default Home;
