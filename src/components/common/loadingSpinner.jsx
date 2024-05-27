import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner = () => {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50px' }}>
      <CircularProgress size={20} color="primary" style={{ marginRight: '8px' }} />
      Carregando...
    </div>
  );
};

export default LoadingSpinner;
