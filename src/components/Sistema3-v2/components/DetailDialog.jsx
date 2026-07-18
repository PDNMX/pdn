import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  IconButton,
  Link,
  Box
} from '@mui/material';
import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { withStyles } from 'tss-react/mui';
import commonStyles from '../commonStyles';

const styles = theme => ({
  ...commonStyles(theme),
});

const DetailDialog = ({ open, onClose, data, classes, tipoFalta }) => {
  if (!data) return null;

  const renderField = (label, value) => {
    if (!value) return null;
    return (
      <Grid container spacing={1}>
        <Grid
          size={{
            xs: 12,
            sm: 4
          }}>
          <Typography className={classes.label}>{label}:</Typography>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 8
          }}>
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
            Datos Generales
          </Typography>
          {tipoFalta === 'grave' && (renderField('Nombre', `${data.datosGenerales?.nombres || ''} ${data.datosGenerales?.primerApellido || ''} ${data.datosGenerales?.segundoApellido || ''}`))}
          {renderField('Sexo', data.datosGenerales?.sexo)}
          {tipoFalta === 'grave' && (renderField('Expediente', data.expediente))}
          {renderField('Fecha', data.fecha)}
        </Box>

        <Box className={classes.dialogSection}>
          <Typography variant="h6" className={classes.dialogSectionTitle}>
            Empleo, Cargo o Comisión
          </Typography>
          {renderField('Ente Público', data.empleoCargoComision?.nombreEntePublico)}
          {renderField('Siglas', data.empleoCargoComision?.siglasEntePublico)}
          {renderField('Nivel Jerárquico', data.empleoCargoComision?.nivelJerarquico?.valor)}
          {renderField('Área de Adscripción', data.empleoCargoComision?.areaAdscripcion)}
        </Box>

        <Box className={classes.dialogSection}>
          <Typography variant="h6" className={classes.dialogSectionTitle}>
            Falta Cometida
          </Typography>
          {data.faltaCometida?.map((falta, index) => (
            <Box key={index} sx={{
              mb: 1
            }}>
              {renderField('Tipo', falta.valor)}
              {renderField('Descripción', falta.descripcionHechos)}
            </Box>
          ))}
        </Box>

        <Box className={classes.dialogSection}>
          <Typography variant="h6" className={classes.dialogSectionTitle}>
            Resolución
          </Typography>
          {renderField('Autoridad Resolutora', data.resolucion?.autoridadResolutora)}
          {renderField('Fecha de Resolución', data.resolucion?.fechaResolucion)}
          {data.resolucion?.urlResolucion && (
            <Grid container spacing={1}>
              <Grid
                size={{
                  xs: 12,
                  sm: 4
                }}>
                <Typography className={classes.label}>URL de Resolución:</Typography>
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 8
                }}>
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
            <Box key={index} sx={{
              mb: 2
            }}>
              {renderField('Tipo', sancion.clave)}
              {sancion.inhabilitacion && (
                <>
                  {renderField('Plazo', `${sancion.inhabilitacion.plazoAnios} años, ${sancion.inhabilitacion.plazoMeses} meses, ${sancion.inhabilitacion.plazoDias} días`)}
                  {renderField('Periodo', `Del ${sancion.inhabilitacion.fechaInicial} al ${sancion.inhabilitacion.fechaFinal}`)}
                </>
              )}
              {sancion.otro && (
                <>
                  {renderField('Denominación', `${sancion.otro.denominacionSancion}`)}
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

export default withStyles(DetailDialog, styles);
