import React from 'react';

export default function FooterSidebar() {
  const data = new Date;
  const anoAtual = data.getFullYear();
  return (
    <div id="footerSidebar" className="app-footerSidebar">
      <b>&copy; {anoAtual}</b> Corregedoria-Geral da Justiça do Estado de Goiás <br></br>Diretoria de
      Tecnologia da Informação
    </div>
  );
}
