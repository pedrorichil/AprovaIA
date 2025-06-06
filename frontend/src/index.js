// Em src/index.js ou src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importa os estilos!
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);