import { useState, useEffect } from 'react';
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
  
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (providers && providers.length > 0 && isMounted) {
      setIsReady(true);
    }

    return () => {
      isMounted = false;
    };
  }, [providers]);

  const handleDataUpdate = (data) => {
    setTotals(prevTotals => ({
      ...prevTotals,
      ...data
    }));
  };

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!isReady) {
    return null;
  }

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12} sm={12} md={4}>
        <TotalRows totalCases={totals.totalCases} />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TotalInstituciones totalInstitutions={totals.uniqueInstitutions} />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TotalRamos key={`total-ramos-${providers.length}`} providers={providers} />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
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
          dataSet="Sistema nacional de servidores públicos y particulares sancionados"
          provider="Plataforma Digital Nacional"
          referenceDate={getCurrentDate()}
        />
      </Grid>
    </Grid>
  );
};

DashboardServidores.propTypes = {
  providers: PropTypes.array.isRequired,
};

export default DashboardServidores;
