import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  IconButton,
  Box,
  Link
} from '@mui/material';
import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import commonStyles from '../commonStyles';

const styles = theme => ({
  ...commonStyles(theme),
});

const DetailDialogParticulares = ({ open, onClose, data, tipoPersona, classes }) => {
  if (!data) return null;

  const renderField = (label, value) => {
    if (!value) return null;
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <Typography className={classes.label}>{label}:</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography className={classes.value}>{value}</Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle className={classes.dialogTitle}>
      <strong>Detalles del Registro</strong>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.dialogSection}>
          <Typography variant="h6" className={classes.dialogSectionTitle}>
            {tipoPersona === 'fisica' ? 'Datos de la Persona Física' : 'Datos de la Persona Moral'}
          </Typography>
          {tipoPersona === 'fisica' ? (
            <>
              {renderField('Nombre', data.datosGenerales?.nombres)}
              {renderField('Primer Apellido', data.datosGenerales?.primerApellido)}
              {renderField('Segundo Apellido', data.datosGenerales?.segundoApellido)}
            </>
          ) : (
            <>
              {renderField('RFC', data.datosGenerales?.rfc)}
              {renderField('Razón Social', data.datosGenerales?.nombreRazonSocial)}
            </>
          )}
        </Box>

        <Box className={classes.dialogSection}>
          <Typography variant="h6" className={classes.dialogSectionTitle}>
            Faltas Cometidas
          </Typography>
          {data.faltaCometida?.map((falta, index) => (
            <Box key={index} mb={1}>
              {renderField('Tipo', falta.valor)}
              {renderField('Descripción', falta.descripcionHechos)}
            </Box>
          ))}
        </Box>

        <Box className={classes.dialogSection}>
          <Typography variant="h6" className={classes.dialogSectionTitle}>
            Resolución
          </Typography>
          {renderField('Expediente', data.expediente)}
          {renderField('Fecha', new Date(data.fecha).toLocaleDateString('es-MX'))}
          {renderField('Autoridad Sancionadora', data.autoridadSancionadora)}
          {data.resolucion?.urlResolucion && (
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <Typography className={classes.label}>URL de Resolución:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Link variant="body1" href={data.resolucion.urlResolucion} underline="hover" target="_blank" rel="noopener noreferrer">
                  Ver resolución
                </Link>
              </Grid>
            </Grid>
          )}
        </Box>

        <Box className={classes.dialogSection}>
          <Typography variant="h6" className={classes.dialogSectionTitle}>
            Sanciones
          </Typography>
          {data.tipoSancion?.map((sancion, index) => (
            <Box key={index} mb={2}>
              {renderField('Tipo', sancion.valor)}
              {sancion.descripcion && renderField('Descripción', sancion.descripcion)}
              {sancion.monto && renderField('Monto', `$${sancion.monto.toLocaleString('es-MX')}`)}
              {sancion.plazo && renderField('Plazo', sancion.plazo)}
              {sancion.fechaInicial && renderField('Fecha Inicial', new Date(sancion.fechaInicial).toLocaleDateString('es-MX'))}
              {sancion.fechaFinal && renderField('Fecha Final', new Date(sancion.fechaFinal).toLocaleDateString('es-MX'))}
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

DetailDialogParticulares.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  tipoPersona: PropTypes.oneOf(['fisica', 'moral']).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailDialogParticulares);
