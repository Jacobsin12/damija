import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';  // Asegúrate de que este componente exista
import Home from './screens/Home';    // Asegúrate de que este componente exista

function App() {
  return (
    <Router>  {/* Usamos Router para envolver nuestras rutas */}
      <Routes>
        {/* Ruta para el Login */}
        <Route path="/" element={<Login />} />

        {/* Ruta para el Home, que se cargará después de un login exitoso */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
