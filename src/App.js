import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './bootstrap.css';  
import Login from './screens/Login';
import Home from './screens/Home';
import ModalRegister from './components/ModalRegister';
import NotFound from './screens/NotFound';

// Simulación de autenticación (puedes reemplazarlo con un contexto o Redux)
const isAuthenticated = false;  // Cambia esto para simular el inicio de sesión

// Componente para rutas protegidas
const PrivateRoute = ({ element }) => {
  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ModalRegister" element={<ModalRegister />} />
        
        {/* Ruta protegida para Home */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        
        {/* Página 404 para rutas no existentes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
