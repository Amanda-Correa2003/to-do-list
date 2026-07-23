import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// A linha abaixo é obrigatória para carregar o Tailwind
import './App.css'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);