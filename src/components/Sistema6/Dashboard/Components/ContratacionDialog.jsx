import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  Typography,
  Box 
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
  }
});

const ContratacionDialog = ({ classes, open, handleClose, data }) => {
  if (!data) return null;

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
            ID de Contratación
          </Typography>
          <Typography variant="body1">
            {data.id}
          </Typography>
        </Box>
        <Box className={classes.detailRow}>
          <Typography variant="subtitle2" color="textSecondary">
            Dependencia
          </Typography>
          <Typography variant="body1">
            {data.dependencia}
          </Typography>
        </Box>
        <Box className={classes.detailRow}>
          <Typography variant="subtitle2" color="textSecondary">
            Monto Total
          </Typography>
          <Typography variant="body1">
            ${data.monto.toLocaleString('es-MX')}
          </Typography>
        </Box>
        <Box className={classes.detailRow}>
          <Typography variant="subtitle2" color="textSecondary">
            Descripción
          </Typography>
          <Typography variant="body1">
            {data.descripcion}
          </Typography>
        </Box>
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
