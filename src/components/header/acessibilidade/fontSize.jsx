import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';

const Escolha = styled.button`
  color: var(--app-sidebar-component-color);
  letter-spacing: 1px;
  line-height: 15px;
  border: 1px solid rgb(var(--app-sidebar-component-color-rgb), 0.4);
  border-radius: 40px;
  background: transparent;
  transition: all 0.3s ease 0s;
  font-size: 10px;
  font-weight: 700;
  width: 30px;
  &:hover {
    color: #000;
    background: rgba(243, 243, 243, 0.75);
    border: 1px solid rgba(243, 243, 243, 0.7);
  }
`;

const FontSizeAdjust = () => {
  const increaseSize = () => {
    const root = document.documentElement;
    let oldpx = parseInt(
      getComputedStyle(root).getPropertyValue('--bs-body-font-size').replace('px', ''),
      10
    );
    let oldpxlg = parseInt(
      getComputedStyle(root).getPropertyValue('--bs-body-font-size-lg').replace('px', ''),
      10
    );
    let oldpxsm = parseInt(
      getComputedStyle(root).getPropertyValue('--bs-body-font-size-sm').replace('px', ''),
      10
    );
    root.style.setProperty('--bs-body-font-size-sm', oldpxsm + 1 + 'px');
    root.style.setProperty('--bs-body-font-size', oldpx + 1 + 'px');
    root.style.setProperty('--bs-body-font-size-lg', oldpxlg + 1 + 'px');
  };

  const decreaseSize = () => {
    const root = document.documentElement;
    let oldpx = parseInt(
      getComputedStyle(root).getPropertyValue('--bs-body-font-size').replace('px', ''),
      10
    );
    let oldpxlg = parseInt(
      getComputedStyle(root).getPropertyValue('--bs-body-font-size-lg').replace('px', ''),
      10
    );
    let oldpxsm = parseInt(
      getComputedStyle(root).getPropertyValue('--bs-body-font-size-sm').replace('px', ''),
      10
    );
    root.style.setProperty('--bs-body-font-size-sm', oldpxsm - 1 + 'px');
    root.style.setProperty('--bs-body-font-size-lg', oldpxlg - 1 + 'px');
    root.style.setProperty('--bs-body-font-size', oldpx - 1 + 'px');
  };

  const normalSize = () => {
    const root = document.documentElement;
    root.style.setProperty('--bs-body-font-size-sm', 12 + 'px');
    root.style.setProperty('--bs-body-font-size', 13 + 'px');
    root.style.setProperty('--bs-body-font-size-lg', 14 + 'px');
  };

  return (
    <div>
      <div className="me-2 ms-4">
        <Escolha className="me-1" title="Aumentar fonte" onClick={increaseSize} accessKey={5}>
          {' '}
          A+{' '}
        </Escolha>
        <Escolha className="me-1" title="Fonte normal" onClick={normalSize} accessKey={6}>
          {' '}
          A{' '}
        </Escolha>
        <Escolha title="Diminuir fonte" onClick={decreaseSize} accessKey={7}>
          {' '}
          A-{' '}
        </Escolha>
      </div>
    </div>
  );
};

export default FontSizeAdjust;
