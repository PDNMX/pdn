import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  IconButton,
  Box
} from '@mui/material';
import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';

const styles = theme => ({
  dialogTitle: {
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  section: {
    marginBottom: theme.spacing(3),
  },
  sectionTitle: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
    fontWeight: 600,
  },
  label: {
    fontWeight: 600,
    color: '#666',
  },
  value: {
    color: '#333',
  },
});

const DetailDialog = ({ open, onClose, data, classes }) => {
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className={classes.dialogTitle}>
        Detalles del Registro
        <IconButton className={classes.closeButton} onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.section}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Datos Generales
          </Typography>
          {renderField('Nombre', `${data.datosGenerales?.nombres || ''} ${data.datosGenerales?.primerApellido || ''} ${data.datosGenerales?.segundoApellido || ''}`)}
          {renderField('Sexo', data.datosGenerales?.sexo)}
          {renderField('Expediente', data.expediente)}
          {renderField('Fecha', new Date(data.fecha).toLocaleDateString('es-MX'))}
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Empleo, Cargo o Comisión
          </Typography>
          {renderField('Ente Público', data.empleoCargoComision?.nombreEntePublico)}
          {renderField('Siglas', data.empleoCargoComision?.siglasEntePublico)}
          {renderField('Nivel Jerárquico', data.empleoCargoComision?.nivelJerarquico?.valor)}
          {renderField('Área de Adscripción', data.empleoCargoComision?.areaAdscripcion)}
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Falta Cometida
          </Typography>
          {data.faltaCometida?.map((falta, index) => (
            <Box key={index} mb={1}>
              {renderField('Tipo', falta.valor)}
              {renderField('Descripción', falta.descripcionHechos)}
            </Box>
          ))}
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Resolución
          </Typography>
          {renderField('Autoridad Resolutora', data.resolucion?.autoridadResolutora)}
          {renderField('Fecha de Resolución', data.resolucion?.fechaResolucion &&
            new Date(data.resolucion.fechaResolucion).toLocaleDateString('es-MX'))}
          {data.resolucion?.urlResolucion && (
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <Typography className={classes.label}>URL de Resolución:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <a href={data.resolucion.urlResolucion} target="_blank" rel="noopener noreferrer">
                  Ver resolución
                </a>
              </Grid>
            </Grid>
          )}
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Sanciones
          </Typography>
          {data.tipoSancion?.map((sancion, index) => (
            <Box key={index} mb={2}>
              {renderField('Tipo', sancion.clave)}
              {sancion.inhabilitacion && (
                <>
                  {renderField('Plazo', `${sancion.inhabilitacion.plazoAnios} años, ${sancion.inhabilitacion.plazoMeses} meses, ${sancion.inhabilitacion.plazoDias} días`)}
                  {renderField('Periodo', `Del ${new Date(sancion.inhabilitacion.fechaInicial).toLocaleDateString('es-MX')} al ${new Date(sancion.inhabilitacion.fechaFinal).toLocaleDateString('es-MX')}`)}
                </>
              )}
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

DetailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailDialog);
