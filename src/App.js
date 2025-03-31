import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './bootstrap.css';
import Login from './screens/Login';
import Home from './screens/Home';
import ModalRegister from './components/ModalRegister';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="ModalRegister" element={<ModalRegister />} />

        {/* Redirigir cualquier otra URL a la página principal */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
