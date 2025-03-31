import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap.css'; // Asegúrate de que bootstrap esté correctamente importado
import App from './App'; // Importa el componente App
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
