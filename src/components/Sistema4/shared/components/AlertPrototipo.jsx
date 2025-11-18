import React from 'react';
import { Chip } from '@mui/material';
import { styled } from '@mui/system';

const FloatingChip = styled(Chip)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(12),
  right: theme.spacing(2),
  zIndex: 1200,
  boxShadow: theme.shadows[4],
  fontWeight: 600,
  fontSize: '0.875rem',
  padding: theme.spacing(2, 1.5),
  height: 'auto',
}));

const AlertPrototipo = () => {
  return (
    <FloatingChip label="Prototipo Beta versión 0.4" color="primary" />
  );
};

export default AlertPrototipo;
