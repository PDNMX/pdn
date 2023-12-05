import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styleSecciones from '../styleSecciones';

import DatosReservados from '../DatosReservados';

const useStyles = makeStyles(styleSecciones);

const DatosPareja = ({ titulo }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.rootPrincipal}>
      <Grid item xs={12}>
        <Typography className={classes.tituloSeccion} align='center'>
          {titulo}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <DatosReservados />
      </Grid>
    </Grid>
  );
};

export default DatosPareja;
