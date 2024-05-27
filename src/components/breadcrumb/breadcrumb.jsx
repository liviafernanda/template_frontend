import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const capitalizeFirstLetter = (string) => {
  const palavraHifen = string.split('-');
  const palavraCompleta = palavraHifen.map(palavraHifen => palavraHifen.charAt(0).toUpperCase() + palavraHifen.slice(1));
  return palavraCompleta.join(' ');
};

const Breadcrumb = (props) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter((segment) => segment !== '');
  const [isLastLinkActive, setIsLastLinkActive] = useState(true);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    //const breadcrumbText = breadcrumbMapping[segment] || segment; // Usa o mapeamento ou o segmento original
    const formattedText =
      index === pathSegments.length - 1 ? props.nome : capitalizeFirstLetter(segment);
    const isActiveLink = index === pathSegments.length - 1 && isLastLinkActive;
    return (
      <li key={index} className={isActiveLink ? 'breadcrumb-item active' : 'breadcrumb-item'}>
        {isActiveLink ? (
          <React.Fragment>{formattedText}</React.Fragment>
        ) : (
          <Link to={path}>{formattedText}</Link>
        )}
        {index < pathSegments.length - 1}
      </li>
    );
  });

  return (
    <>
      <ol className="breadcrumb float-xl-end">
        <li className="breadcrumb-item">
          <Link to="/home">Home</Link>
        </li>
        {breadcrumbs}
      </ol>
      <h1 className="page-header" dangerouslySetInnerHTML={{ __html: props.titulo }}></h1>
    </>
  );
};

export default Breadcrumb;
