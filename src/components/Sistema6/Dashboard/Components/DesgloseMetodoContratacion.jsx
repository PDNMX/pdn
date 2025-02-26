import React from 'react';
import { Paper, Typography, Box, Chip, Divider, Grid, Card, CardContent, CardHeader } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import CountUp from 'react-countup';
import LoadingComponent from './LoadingComponent';

const styles = theme => ({
  paper: {
    height: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
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
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '2.5rem'
  },
  currencySection: {
    marginBottom: theme.spacing(1),
  },
  currencyLabel: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#55575A',
  },
  currencyAmount: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#0494ce',
    marginBottom:'2px',
    lineHeight: 1,
  },
  mxnTotal: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#3f94b8',
    marginBottom: theme.spacing(2),
    borderBottom: '1px solid #81d2f2',
    paddingBottom: theme.spacing(0),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  // Estilos para las tarjetas
  detalleContainer: {
    maxWidth: '100%',
    margin: '0 auto',
    marginTop: theme.spacing(1),
  },
  detalleTitle: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: '#3f94b8',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  // Estilos para las cards
  card: {
    height: '100%',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
  },
  cardHeader: {
    paddingBottom: 0,
    '& .MuiCardHeader-content': {
      overflow: 'hidden',
    },
  },
  cardContent: {
    paddingTop: theme.spacing(1),
  },
  methodTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#3f94b8',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  contractCount: {
    backgroundColor: '#e1f5fe',
    color: '#0277bd',
    fontWeight: 'bold',
  },
  currencyItem: {
    padding: theme.spacing(1),
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
    marginLeft: theme.spacing(1),
  },
  amount: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#0494ce',
  },
  contractChip: {
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
    minHeight: '100px',
  }
});

export const spanishProcurementMethod = {
  'open': 'Pública',
  'selective': 'Restringida',
  'limited': 'A cuando menos tres personas',
  'direct': 'Directa',
  'not-specified': 'No especificado',
  'no-specified': 'No especificado',
};

export const spanishCurrency = {
  'no-specified': 'No especificado',
};

const DesgloseMetodoContratacion = ({ classes, totalMonto, setTotalMonto, montoProcurementMethodCurrency, currency, isLoading }) => {
  // Depuración - Mostrar las props recibidas
  console.log("TotalMonto - Props recibidas:", {
    montoProcurementMethodCurrency,
    currency,
    isLoading
  });

  // Función para obtener el nombre traducido solo en el caso especial
  const getCurrencyDisplay = (currencyCode) => {
    // Solo traducimos el caso especial "not-specified"
    return spanishCurrency[currencyCode] || currencyCode;
  };

  const shouldShowCurrency = (currencyCode) => {
    return currencyCode !== 'no-specified';
  };

  // Ordenar las monedas para que MXN aparezca primero
  const sortedCurrency = currency ? [...currency].sort((a, b) => {
    if (a.currency === 'MXN') return -1;
    if (b.currency === 'MXN') return 1;
    return a.currency.localeCompare(b.currency);
  }) : [];

  // Verificar si hay datos de métodos de contratación
  const hasMethodData = montoProcurementMethodCurrency && montoProcurementMethodCurrency.length > 0;
  console.log("¿Tiene datos de métodos?", hasMethodData);

  return (
    <Paper className={classes.paper} elevation={3}>
      
      {/* Sección de Desglose por Método */}
      <Box className={classes.detalleContainer}>
        <Typography variant="h6" className={classes.detalleTitle}>
          Monto Total por Método de Contratación
        </Typography>
        
        {isLoading ? (
          <Box className={classes.loadingContainer}>
            <LoadingComponent />
          </Box>
        ) : hasMethodData ? (
          <Grid container spacing={2}>
            {montoProcurementMethodCurrency.map((method, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.cardHeader}
                    title={
                      <Typography className={classes.methodTitle}>
                        {spanishProcurementMethod[method._id] || method._id}
                      </Typography>
                    }
                    action={
                      <Chip 
                        label={`${method.numero_contratos} contrato${method.numero_contratos !== 1 ? 's' : ''}`} 
                        className={classes.contractCount}
                        size="medium"
                      />
                    }
                  />
                  <CardContent className={classes.cardContent}>
                    <Divider style={{ marginBottom: '12px' }} />
                    
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
                          {getCurrencyDisplay(currencyItem.currency)}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography className={classes.noData}>
            No hay datos disponibles de métodos de contratación.
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default withStyles(styles)(DesgloseMetodoContratacion);