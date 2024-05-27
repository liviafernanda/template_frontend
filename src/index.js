import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, useRoutes } from 'react-router-dom';
import AppRoute from './config/app-route.jsx';

// arquivos/libs de estilo globais
import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './index.css';
import './scss/react.scss';

function App() {
  let element = useRoutes(AppRoute);
  return element;
}

function carregarAppReact() {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(
    <HashRouter>
      <App />
    </HashRouter>
  );
}

carregarAppReact();
