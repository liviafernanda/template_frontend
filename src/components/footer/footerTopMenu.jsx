import React from 'react';

const data = new Date();
const anoAtual = data.getFullYear();

export default function FooterTopMenu() {
    return (
      <div id="footerTop" className="app-footerTop d-flex justify-content-between p-3">
        <div><b>&copy; {anoAtual}</b> Corregedoria-Geral da Justiça do Estado de Goiás</div> 
        <div>Diretoria de Tecnologia da Informação</div>
      </div>
    );
}

