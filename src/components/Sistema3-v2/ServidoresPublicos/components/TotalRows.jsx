import React from 'react';
import { Paper, Typography } from '@mui/material';

const TotalRows = () => {
  return (
    <Paper elevation={0} sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6">Total de Registros</Typography>
    </Paper>
  );
};

export default TotalRows;