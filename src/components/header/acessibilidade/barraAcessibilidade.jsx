import React, { useState } from 'react';
import styled from 'styled-components';
import FontSizeAdjust from './fontSize';
import Dark from './dark';

const EstiloBarra = styled.div`
  position: relative;
  top: 0;
  right: 0;
  padding: 3px 0;
  background-color: var(--app-sidebar-bg);
  color: var(--app-sidebar-component-color);
  border-top-left-radius: 5px;
  z-index: 1002;
  display: flex;
`;

const Botoes = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1;
  justify-content: flex-end;
  align-items: center;
  color: var(--app-sidebar-component-color);
`;
const BtnEscolha = styled.a`
  color: var(--app-sidebar-component-color);
  letter-spacing: 1px;
  line-height: 15px;
  border: 1px solid rgb(var(--app-sidebar-component-color-rgb), 0.4);
  border-radius: 25px;
  background: transparent;
  transition: all 0.3s ease 0s;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;

  padding: 1px 8px;
  -webkit-appearance: button;
  text-decoration: none;
  &:hover {
    color: var(--app-sidebar-component-color);
    background: rgba(243, 243, 243, 0.75);
    border: 1px solid rgba(243, 243, 243, 0.7);
  }
`;

const scrollElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.setAttribute('tabindex', '-1');
    window.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth'
    });
    element.focus();
  }
};

const BarraAcessibilidade = () => {
  const [barraInvisivel, setBarraInvisivel] = useState(false);

  const toggleVisibilidade = () => {
    const goHeader = document.getElementById('header');
    setBarraInvisivel(!barraInvisivel);
    goHeader.setAttribute('tabindex', '-1');
    window.scrollTo(0, 0);
    goHeader.focus();
  };

  return (
    <>
      <EstiloBarra className={`barraAcessibilidade ${barraInvisivel ? 'invisivel' : 'visivel'}`}>
        <div className="conteudos ms-5 mt-1">
          <span>
            Ir para o menu{' '}
            <BtnEscolha onClick={() => scrollElement('menu-header')} accessKey={1}>
              1
            </BtnEscolha>
          </span>
          <span className="ms-4">
            Ir para o conteúdo{' '}
            <BtnEscolha onClick={() => scrollElement('content-wrap')} accessKey={2}>
              2
            </BtnEscolha>
          </span>
        </div>
        <Botoes>
          {/* <BtnEscolha href="https://www.tjgo.jus.br/index.php/sustentabilidade-e-acessibilidade/transp-acessibilidade/acessibilidade" accessKey={4} target="_blank" className="ms-4">
                <i className="fa fa-wheelchair me-2"></i>Acessibilidade 
            </BtnEscolha> */}
          <FontSizeAdjust />
          <Dark iconColor={'text-color-800'} tamanhoMargin={'mt-1'} />
          {!barraInvisivel && (
            <a
              style={{ position: 'relative', zIndex: '100000' }}
              onClick={toggleVisibilidade}
              className="mx-3 text-color-800">
              <i className="fa fa-times" title="Ocultar barra de acessibilidade"></i>
            </a>
          )}
        </Botoes>
      </EstiloBarra>
      {barraInvisivel && (
        <a
          style={{
            position: 'absolute',
            top: '95px',
            zIndex: '1011',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
          onClick={toggleVisibilidade}
          className="mx-3 text-color-800">
          <i className="fa fa-wheelchair me-2" title="Mostrar a barra de acessibilidade"></i>
          Acessibilidade
        </a>
      )}
    </>
  );
};

export default BarraAcessibilidade;
