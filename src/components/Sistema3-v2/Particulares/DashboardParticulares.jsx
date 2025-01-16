import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

// Importamos los componentes
import TotalParticulares from './components/TotalParticulares';
import TotalMultas from './components/TotalMultas';
import SancionesVigentes from './components/SancionesVigentes';

const DashboardParticulares = ({ providers }) => {
  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={4}>
        <TotalParticulares />
      </Grid>
      <Grid item xs={4}>
        <TotalMultas />
      </Grid>
      <Grid item xs={4}>
        <SancionesVigentes />
      </Grid>
      {/* Aquí puedes agregar más componentes para el dashboard */}
    </Grid>
  );
};

DashboardParticulares.propTypes = {
  providers: PropTypes.array.isRequired,
};

export default DashboardParticulares;