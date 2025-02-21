// Components/TotalMonto.jsx
import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import CountUp from 'react-countup';
import LoadingComponent from './LoadingComponent';

const styles = theme => ({
  paper: {
    height: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    background:'linear-gradient(0deg, hsl(197deg 80% 91% / 86%) 43%, hsl(0deg 0% 100% / 80%) 100%)',
    boxShadow: 'none',
    borderTop: '2px solid #81d2f2',
  },
  montoTotal: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#5abbe3',
    textAlign: 'center',
    marginBottom: theme.spacing(3)
  },
  montoItem: {
    textAlign: 'center',
    padding: theme.spacing(0),
  },
  h6: {
    fontSize: '1.25rem',
    lineHeight: .6,
    fontWeight: 'bold',
    color: '#55575A',
    background:'#ffffff82',
    padding: '12px',
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    borderRadius: 25,
  },
  subtitle: {
    lineHeight: .6,
  },
  number: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#5abbe3',
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    minHeight: '2.5rem'
  }
});

export const spanishProcurementMethod = {
  'open': 'Pública',
  'selective': 'Restringida',
  'limited': 'A cuando menos tres personas',
  'direct': 'Directa',
  'not-specified': 'No especificado',
};

const TotalMonto = ({ classes, totalMonto, montoProcurementMethod, isLoading }) => (
  <Paper className={classes.paper} elevation={3}>
    <Typography variant="h6" gutterBottom align="center">
      Monto Total de Contrataciones
    </Typography>
    <Box className={classes.number}>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className={classes.montoTotal}>
          $<CountUp end={totalMonto || 0} separator="," duration={2.5} decimals={2} />
        </div>
      )}
    </Box>
    
    <Grid container spacing={3}>
      {!isLoading && montoProcurementMethod && montoProcurementMethod.length > 0 && 
        montoProcurementMethod.map((item, index) => (
          <Grid item xs={12} key={index}>
            <div className={classes.montoItem}>
              <Typography className={classes.subtitle} variant="subtitle1" gutterBottom>
                {spanishProcurementMethod[item.procurementMethod] || item.procurementMethod}:
              </Typography>
              <Typography className={classes.h6} variant="h6">
                $<CountUp end={item.total} separator="," duration={2.5} decimals={2} />
              </Typography>
            </div>
          </Grid>
        ))
      }
    </Grid>
  </Paper>
);

export default withStyles(styles)(TotalMonto);