import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

import TotalRows from './components/TotalRows';
import TotalInstituciones from './components/TotalInstituciones';
import TotalRamos from './components/TotalRamos';
import Ejercicio from './components/Ejercicio';
import SancionesResueltas from './components/SancionesResueltas';
import FooterPage from './components/FooterPage';

const DashboardServidores = ({ providers }) => {
  const [totals, setTotals] = useState({
    totalCases: 0,
    uniqueInstitutions: 0
  });

  const handleDataUpdate = (data) => {
    setTotals(data);
  };

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={4}>
        <TotalRows totalCases={totals.totalCases} />
      </Grid>
      <Grid item xs={4}>
        <TotalInstituciones totalInstitutions={totals.uniqueInstitutions} />
      </Grid>
      <Grid item xs={4}>
        <TotalRamos />
      </Grid>
      <Grid item xs={12}>
        <Ejercicio
          providers={providers}
          onDataUpdate={handleDataUpdate}
        />
      </Grid>
      <Grid item xs={12}>
        <SancionesResueltas providers={providers} />
      </Grid>
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