import React from 'react';
import { Paper, Typography, Box, Chip, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import CountUp from 'react-countup';
import LoadingComponent from './LoadingComponent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const styles = theme => ({
  paper: {
    height: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0),
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
    marginBottom: theme.spacing(0),
    // borderBottom: '1px solid #81d2f2',
    paddingBottom: theme.spacing(0),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  // Estilos para el acordeón y desglose
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
  accordion: {
    marginBottom: theme.spacing(1.5),
    borderRadius: '6px',
    '&.Mui-expanded': {
      marginBottom: theme.spacing(1.5),
    },
    '&:before': {
      display: 'none',
    },
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
  },
  accordionSummary: {
    minHeight: '48px',
    '&.Mui-expanded': {
      minHeight: '48px',
    },
    padding: theme.spacing(0, 1.5),
  },
  accordionDetails: {
    padding: theme.spacing(0, 1.5, 1.5, 1.5),
  },
  accordionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  methodTitle: {
    fontSize: '1.2rem',
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
    fontSize: '1.1rem',
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

const TotalMonto = ({ classes, totalMonto, setTotalMonto, montoProcurementMethodCurrency, currency, isLoading }) => {
  // Depuración - Mostrar las props recibidas
 /*  console.log("TotalMonto - Props recibidas:", {
    montoProcurementMethodCurrency,
    currency,
    isLoading
  }); */

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
      <Typography variant="h6" gutterBottom align="center">
        Monto Total de Contrataciones
      </Typography>
      
      {/* Sección de Resumen */}
      <Box className={classes.number}>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <div>
            {currency && currency.length > 0 && (
              <Box>
                {sortedCurrency.map((item, index) => (
                  <Box key={index} className={classes.currencySection}>
                    <>
                      <Typography className={classes.currencyLabel}>
                        { `Total ${item.currency === 'MXN' ? 'MXN' : getCurrencyDisplay(item.currency)}:`}
                      </Typography>
                      <Typography className={item.currency === 'MXN' ? classes.mxnTotal : classes.currencyAmount}>
                        $<CountUp end={item.total || 0} separator="," duration={2.5} decimals={2} /> 
                        {item.currency !== 'MXN' && shouldShowCurrency(item.currency) && ` ${item.currency}`}
                      </Typography>
                    </>
                  </Box>
                ))}
              </Box>
            )}
          </div>
        )}
      </Box>
    </Paper>
  );
};

export default withStyles(styles)(TotalMonto);