import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

// Importamos los componentes
import TotalParticulares from './components/TotalParticulares';
import TotalMultas from './components/TotalMultas';
import SancionesVigentes from './components/SancionesVigentes';
import TipoPersona from './components/TipoPersona';
import FooterPage from './components/FooterPage';
import SancionesResueltasAnio from './components/SancionesResueltasAnio';

const DashboardParticulares = ({ providers }) => {
  const [totals, setTotals] = useState({
    totalResolvedSanctions: 0,
    totalCases: 0,
    uniqueInstitutions: 0
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (providers && providers.length > 0) {
      setIsReady(true);
    }
  }, [providers]);

  const handleDataUpdate = (data) => {
    setTotals(data);
  };

  // Formatear la fecha actual como DD/MM/YYYY
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!isReady) {
    return null; // o un componente de carga
  }

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={4}>
        <TotalParticulares totalCases={totals.totalCases} />
      </Grid>
      <Grid item xs={4}>
        <TotalMultas providers={providers} />
      </Grid>
      <Grid item xs={4}>
        <SancionesVigentes providers={providers} />
      </Grid>
      <Grid item xs={12}>
        <TipoPersona
          providers={providers}
          onDataUpdate={handleDataUpdate}
        />
      </Grid>
      <Grid item xs={12}>
        <SancionesResueltasAnio providers={providers} />
      </Grid>
      <Grid item xs={12}>
        <FooterPage
          dataSet="Sistema nacional de servidores públicos y particulares sancionados"
          provider="Plataforma Digital Nacional"
          referenceDate={getCurrentDate()}
        />
      </Grid>
    </Grid>
  );
};

DashboardParticulares.propTypes = {
  providers: PropTypes.array.isRequired,
};

export default DashboardParticulares;