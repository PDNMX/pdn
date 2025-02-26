import React from 'react';
import { Typography, Grid, Box, Card, CardContent, Chip, Divider } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import CountUp from 'react-countup';
import LoadingComponent from './LoadingComponent';

const styles = theme => ({
  modalContainer: {
    padding: theme.spacing(3),
    maxWidth: '800px',
    margin: '0 auto',
  },
  modalTitle: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    color: '#3f94b8',
    fontWeight: 'bold',
  },
  methodCard: {
    marginBottom: theme.spacing(3),
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      transform: 'translateY(-2px)',
    },
  },
  methodHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  methodTitle: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#3f94b8',
  },
  contractCount: {
    backgroundColor: '#e1f5fe',
    color: '#0277bd',
    fontWeight: 'bold',
  },
  currencyItem: {
    padding: theme.spacing(1.5),
    margin: theme.spacing(1, 0),
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  currencyName: {
    fontWeight: 'bold',
    color: '#555',
    fontSize: '1.1rem',
  },
  amount: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#0494ce',
  },
  contractChip: {
    marginLeft: theme.spacing(1),
    backgroundColor: '#f1f8e9',
    color: '#558b2f',
    height: '20px',
  },
  noData: {
    textAlign: 'center',
    padding: theme.spacing(4),
    color: '#555',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
  }
});

const TotalMontoMetodo = ({ classes, montoProcurementMethodCurrency, isLoading, spanishProcurementMethod }) => {
  console.log("TotalMontoMetodo recibió:", montoProcurementMethodCurrency);
  
  // Si los datos son undefined o tienen una estructura antigua, mostrar mensaje
  if (!montoProcurementMethodCurrency && !isLoading) {
    return (
      <Box className={classes.modalContainer}>
        <Typography variant="h5" className={classes.modalTitle}>
          Desglose por Método de Contratación
        </Typography>
        <Typography className={classes.noData}>
          No hay datos disponibles de métodos de contratación.
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box className={classes.modalContainer}>
      <Typography variant="h5" className={classes.modalTitle}>
        Desglose por Método de Contratación
      </Typography>
      
      {isLoading ? (
        <Box className={classes.loadingContainer}>
          <LoadingComponent />
        </Box>
      ) : montoProcurementMethodCurrency && montoProcurementMethodCurrency.length > 0 ? (
        montoProcurementMethodCurrency.map((method, index) => (
          <Card key={index} className={classes.methodCard}>
            <CardContent>
              <Box className={classes.methodHeader}>
                <Typography className={classes.methodTitle}>
                  {spanishProcurementMethod[method._id] || method._id}
                </Typography>
                <Chip 
                  label={`${method.numero_contratos} contrato${method.numero_contratos !== 1 ? 's' : ''}`} 
                  className={classes.contractCount}
                  size="medium"
                />
              </Box>
              
              <Divider />
              
              {method.totales && method.totales.map((currencyItem, currencyIndex) => (
                <Box key={currencyIndex} className={classes.currencyItem}>
                  <Box display="flex" justifyContent="flex-start" alignItems="center">
                    <Chip 
                      label={`${currencyItem.numero_contratos} contrato${currencyItem.numero_contratos !== 1 ? 's' : ''}`} 
                      size="small" 
                      className={classes.contractChip}
                    />
                  </Box>
                  <Box display="flex" justifyContent="flex-end" alignItems="center"> 
                    <Typography className={classes.amount}>
                      $<CountUp end={currencyItem.total || 0} separator="," duration={1.5} decimals={2} />
                    </Typography>
                    <Typography className={classes.currencyName}>
                        {currencyItem.currency}
                      </Typography>
                  </Box>
                  
                </Box>
              ))}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography className={classes.noData}>
          No hay datos disponibles de métodos de contratación.
        </Typography>
      )}
    </Box>
  );
};

export default withStyles(styles)(TotalMontoMetodo);