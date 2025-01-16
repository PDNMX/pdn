import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

// Importamos todos los componentes
import TotalRows from './components/TotalRows';
import TotalInstituciones from './components/TotalInstituciones';
import TotalRamos from './components/TotalRamos';
import Ejercicio from './components/Ejercicio';
import Procedimientos from './components/Procedimientos';
import Agrupaciones from './components/Agrupaciones';
import Tops from './components/Tops';
import FooterPage from './components/FooterPage';

const DashboardServidores = ({ providers }) => {
  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={4}>
        <TotalRows />
      </Grid>
      <Grid item xs={4}>
        <TotalInstituciones />
      </Grid>
      <Grid item xs={4}>
        <TotalRamos />
      </Grid>
      {/* <Grid item xs={12} md={6}>
        <Ejercicio />
      </Grid>
      <Grid item xs={12} md={6}>
        <Procedimientos />
      </Grid>
      <Grid item xs={12}>
        <Agrupaciones />
      </Grid>
      <Grid item xs={12}>
        <Tops />
      </Grid> */}
      <Grid item xs={12}>
        <FooterPage 
          dataSet="Registro de servidores públicos que intervienen en contrataciones públicas"
          provider="Secretaría de la Función Pública"
          referenceDate="17/05/2022"
        />
      </Grid>
    </Grid>
  );
};

DashboardServidores.propTypes = {
  providers: PropTypes.array.isRequired,
};

export default DashboardServidores;