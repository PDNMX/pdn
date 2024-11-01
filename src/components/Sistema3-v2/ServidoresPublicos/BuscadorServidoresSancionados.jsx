import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import BusquedaServidor from './BusquedaServidor';
import { Typography, Box } from '@mui/material';

const styles = theme => ({
  root: {
    width: '100%',
  },
  mainContent: {
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
  },
  ul: {
    listStyle: 'none',
    paddingLeft: theme.spacing(3),
  },
  li: {
    '&:before': {
      content: '"•"',
      color: theme.palette.primary.main,
      fontWeight: 'bold',
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em',
    },
    color: theme.palette.text.primary,
  },
  infoSection: {
    padding: theme.spacing(3),
  },
  formSection: {
    padding: theme.spacing(0, 3, 3, 3),
  },
  descargaWrapper: {
    maxWidth: 1200,
    margin: '40px auto 0', // Aumentado el margen superior para mayor separación
    padding: theme.spacing(0, 2), // Solo padding horizontal
    backgroundColor: 'transparent',
    '& > div': {
      // Targeting el contenedor interno del componente Descarga
      boxShadow: 'none',
      backgroundColor: 'transparent',
      border: 'none',
      '& h2': {
        // Estilo para el título "Descarga todos los datos"
        color: '#663399',
        textAlign: 'center',
        fontSize: '2rem',
        marginBottom: theme.spacing(2),
      },
    },
  },
});

function BuscadorServidoresSancionados(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      {/* Contenido principal con el buscador */}
      <Box className={classes.mainContent}>
        <Box className={classes.infoSection}>
          <Typography>
            <b>Aquí puedes consultar:</b>
          </Typography>
          <ul className={classes.ul}>
            <li className={classes.li}>
              <Typography display="inline">
                Datos de la sanción firme impuesta a la persona servidora pública como: plazo, tipo de falta y la causa.
              </Typography>
            </li>
            <li className={classes.li}>
              <Typography display="inline">
                Información de la persona servidora pública sancionada como: nombre, puesto e institución en donde se
                realizó la falta o hecho de corrupción.
              </Typography>
            </li>
          </ul>
        </Box>

        <Box className={classes.formSection}>
          <BusquedaServidor />
        </Box>
      </Box>
    </div>
  );
}

BuscadorServidoresSancionados.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BuscadorServidoresSancionados);
