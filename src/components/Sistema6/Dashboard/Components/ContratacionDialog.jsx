// Components/Dialog.jsx
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
      <DialogTitle>
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
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(ContratacionDialog);