// ContainerContract.jsx
import React from 'react';
import { Grid, Typography } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import TotalProcedimientos from './Components/TotalProcedimientos';
import TotalPorEstado from './Components/TotalPorEstado';
import TotalTipo from './Components/TotalTipo';
import TotalMonto from './Components/TotalMonto';
import TablaResultados from './Components/TablaResultados';
import FooterPage from './FooterPage';
import { estadosData, getTotalData } from './mockData';

const styles = theme => ({
  root: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #F5F7FA 0%, #c8e2f0 100%)',
    // Alternativas de degradado que puedes probar:
    // background: 'linear-gradient(135deg, #E3FDF5 0%, #FFE6FA 100%)',
    // background: 'linear-gradient(135deg, #F5F7FA 0%, #B8C6DB 100%)',
    // background: 'linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)',
  },
  title: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(4),
    fontWeight: 500,
    // Opcional: añadir sombra al texto para mejor contraste
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
  },
  gridContainer: {
    // Opcional: añadir un poco de padding al contenedor de la grid
    padding: theme.spacing(2)
  }
});

const ContainerContract = ({ classes }) => {
  const [selectedState, setSelectedState] = React.useState('todos');
  
  const getData = () => {
    if (selectedState === 'todos') {
      return getTotalData();
    }
    return estadosData.find(estado => estado.id === selectedState) || getTotalData();
  };

  const currentData = getData();

  return (
    <div className={classes.root}>
      <Typography 
        variant="h4" 
        align="center" 
        className={classes.title}
      >
        Tablero de Contrataciones
      </Typography>
      
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={12} sm={12} md={3}>
          <TotalProcedimientos 
            totalCases={currentData.totalCases}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            estados={estadosData}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <TotalMonto totalMonto={currentData.monto} />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <TotalPorEstado totalEstado={currentData.uniqueEstado} />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <TotalTipo totalTipo={currentData.uniqueTipo} />
        </Grid>
        <Grid item xs={12}>
          <TablaResultados 
            selectedState={selectedState}
            currentData={currentData}
          />
        </Grid>
        <Grid item xs={12}>
          <FooterPage
            dataSet="Sistema de información pública de contrataciones"
            provider="Plataforma Digital Nacional"
            referenceDate={new Date().toLocaleDateString('es-MX')}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(ContainerContract);