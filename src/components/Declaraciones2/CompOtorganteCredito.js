import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styleSecciones from './styleSecciones';
const useStyles = makeStyles(styleSecciones);

const OtorganteCredito = props => {
  const classes = useStyles();
  const { otorganteCredito } = props;

  return otorganteCredito.map((otorgante, idx) => {
    return (
      <Grid item xs={12} key={'oc-' + idx}>
        {otorgante.tipoPersona === 'MORAL' ? (
          <Grid container space={1}>
            <Grid item xs={12} md={2}>
              <Typography className={classes.cardTitle}>TIPO PERSONA:</Typography>
              <Typography className={classes.card}>MORAL</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography className={classes.cardTitle}>RFC</Typography>
              <Typography className={classes.card}>{otorgante.rfc}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography className={classes.cardTitle}>NOMBRE O RAZÓN SOCIAL DEL TRANSMISOR DE LA PROPIEDAD</Typography>
              <Typography className={classes.card}>{otorgante.nombreRazonSocial}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>RELACIÓN DEL TRANSMISOR DE LA PROPIEDAD CON EL TITULAR</Typography>
              <Typography className={classes.card}>DATO RESERVADO</Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid container space={1}>
            <Grid item xs={12} md={2}>
              <Typography className={classes.cardTitle}>TIPO PERSONA:</Typography>
              <Typography className={classes.card}>FÍSICA</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography className={classes.cardTitle}>RFC</Typography>
              <Typography className={classes.card}>DATO RESERVADO</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography className={classes.cardTitle}>NOMBRE O RAZÓN SOCIAL DEL TRANSMISOR DE LA PROPIEDAD</Typography>
              <Typography className={classes.card}>DATO RESERVADO</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>RELACIÓN DEL TRANSMISOR DE LA PROPIEDAD CON EL TITULAR</Typography>
              <Typography className={classes.card}>DATO RESERVADO</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  });
};
export default OtorganteCredito;
