import React from 'react';

const LinkProcessoProjudi = ({ processo }) => {
  const urlPadrao = 'https://projudi.tjgo.jus.br/BuscaProcesso?PaginaAtual=-2&ProcessoNumero=';
  const formatacaoRegex = /^\d+-\d{2}\.\d{4}$/;

  const criarLink = (processo) => {
    return `${urlPadrao}${processo}`;
  };

  return (
    <div>
      {formatacaoRegex.test(processo) ? (
        <a href={criarLink(processo)} target="_blank" rel="noopener noreferrer">
          {processo}
        </a>
      ) : (
        processo
      )}
    </div>
  );
};

export default LinkProcessoProjudi;
