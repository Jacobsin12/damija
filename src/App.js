import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './bootstrap.css';  // Asegúrate de que la ruta sea correcta
import Login from './screens/Login';  // Asegúrate de que este componente exista
import Home from './screens/Home';    // Asegúrate de que este componente exista
import ModalRegister from './components/ModalRegister';

function App() {
  return (
    <Router>  {/* Usamos Router para envolver nuestras rutas */}
      <Routes>
        {/* Ruta principal para el Login */}
        <Route path="/" element={<Login />} />  {/* Cambié la ruta raíz a Login */}

        {/* Ruta para el Home, que se cargará después de un login exitoso */}
        <Route path="home" element={<Home />} />
        <Route path="ModalRegister" element={<ModalRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
