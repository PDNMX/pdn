import React from 'react';
import { Box, Chip } from '@mui/material';
import { styled } from '@mui/system';

const ChipContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const AlertPrototipo = () => {
  return (
    <ChipContainer>
      <Chip label="Prototipo Beta versión 0.4" color="primary" />
    </ChipContainer>
  );
};

export default AlertPrototipo;
