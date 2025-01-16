import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const DashboardServidores = ({ providers }) => {
  return (
    <Box p={3}>
      Visor de servidores públicos sancionados
    </Box>
  );
};

DashboardServidores.propTypes = {
  providers: PropTypes.array.isRequired,
};

export default DashboardServidores;