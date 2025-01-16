import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const DashboardParticulares = ({ providers }) => {
  return (
    <Box p={3}>
      Visor de particulares sancionados
    </Box>
  );
};

DashboardParticulares.propTypes = {
  providers: PropTypes.array.isRequired,
};

export default DashboardParticulares;