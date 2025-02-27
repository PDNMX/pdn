import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
  content: {
    padding: theme.spacing(2),
  },
  detailRow: {
    marginBottom: theme.spacing(2),
  },
  dialogTitle: {
    backgroundColor: '#42a5cc',
    color: '#fff',
    marginBottom: theme.spacing(2),
  },
  dialogActions: {
    padding: theme.spacing(1, 2),
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    color: '#42a5cc',
    borderColor: '#42a5cc',
    '&:hover': {
      backgroundColor: '#42a5cc',
      color: '#fff',
      border: '1px solid #38aeff',
    }
  },
  card: {
    minWidth: 275,
    margin: theme.spacing(1),
  },
  cardContent: {
    textAlign: 'center',
  }
});

const ContratacionDialog = ({ classes, open, handleClose, data }) => {
  // Depuración - Mostrar las props recibidas
  console.log("DatosDialog - Props recibidas:", {
    data,
  });
  if (!data) return null;

  // Función para formatear el valor según la moneda
  const formatCurrency = (value, currency) => {
    const options = {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };

    return new Intl.NumberFormat('es-MX', options).format(value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle className={classes.dialogTitle}>
        Detalle de Contratación
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Box className={classes.detailRow}>
          <Typography variant="subtitle2" color="textSecondary">
            Descripción
          </Typography>
          <Typography variant="body1">
            {data.tender.description}
          </Typography>
        </Box> 
        <Box className={classes.detailRow}>
          <Typography variant="subtitle2" color="textSecondary">
            ID de Contratación
          </Typography>
          <Typography variant="body1">
            {data.id}
          </Typography>
        </Box>
        <Box className={classes.detailRow}>
          <Typography variant="subtitle2" color="textSecondary">
            OCID
          </Typography>
          <Typography variant="body1">
            {data.ocid}
          </Typography>
        </Box>
        <Box className={classes.detailRow}>
          <Typography variant="subtitle2" color="textSecondary">
            Monto de los contratos
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {data.contracts && data.contracts.map((contract, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6">
                    {formatCurrency(contract.value.amount, contract.value.currency)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {contract.value.currency}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
       {/*  <Box className={classes.detailRow}>
          <Typography variant="subtitle2" color="textSecondary">
            Estatus
          </Typography>
          <Typography variant="body1">
            {data.contracts[0]?.status}
          </Typography>
        </Box>  */}
        
         {/**/}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleClose} variant="outlined" className={classes.button}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(ContratacionDialog);
