import { makeStyles } from 'tss-react/mui';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import styleSecciones from '../styleSecciones'

import DatosReservados from '../DatosReservados'

const useStyles = makeStyles()(styleSecciones);

const DatosPareja = ({ titulo }) => {
  const { classes } = useStyles()

  return (
    <Grid container spacing={2} className={classes.rootPrincipal}>
      <Grid size={12}>
        <Typography className={classes.tituloSeccion} align='center'>
          {titulo}
        </Typography>
      </Grid>
      <Grid size={12}>
        <DatosReservados />
      </Grid>
    </Grid>
  );
}

export default DatosPareja
