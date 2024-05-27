import React from 'react';
import { Outlet } from 'react-router-dom';

import App from '../App.jsx';

import Formulario from '../pages/formularios/formulario.jsx';
import AcompanhamentoProtocolo from '../pages/protocolos/acompanhamento.jsx';


const AppRoute = [
  {
    path: '*',
    element: <App />,
    children: [
      {
        path: '',
        element: <Formulario />
      },
      {
        path: 'home',
        element: <Formulario />
      },
      { path: 'protocolo', 
        element: <AcompanhamentoProtocolo /> 
      },
    ]
  }
];

export default AppRoute;
