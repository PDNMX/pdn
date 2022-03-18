import React from 'react';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import style from '../styleSecciones';
// import DatosCamposPrivados from '../DatosCamposPrivados';
import basicInicial from './00_basic_incial';

const useStyles = makeStyles(style);
// const camposPrivados = [
// 	'CURP',
// 	'RFC',
// 	'HOMOCLAVE',
// 	'CORREO ELECTRÓNICO PERSONAL/ALTERNO',
// 	'NÚMERO TELEFÓNICO DE CASA',
// 	'NÚMERO CELULAR PERSONAL',
// 	'SITUACIÓN PERSONAL/ESTADO CIVIL',
// 	'RÉGIMEN MATRIMONIAL',
// 	'PAÍS DE NACIMIENTO',
// 	'NACIONALIDAD'
// ];

const DatosGenerales = ({ data: info, titulo }) => {
  const classes = useStyles();

  const data = {
    ...basicInicial.datosGenerales,
    ...info
  };

  return (
    <Grid container spacing={2} className={classes.rootPrincipal}>
      <Grid item xs={12}>
        <Typography className={classes.tituloSeccion} align='center'>
          {titulo}
        </Typography>
      </Grid>
      {/* <Grid item xs={12}>
				<DatosCamposPrivados campos={camposPrivados} />
			</Grid> */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>NOMBRES(S)</Typography>
              <Typography className={classes.card}>{data.nombre}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>PRIMER APELLIDO</Typography>
              <Typography className={classes.card}>{data.primerApellido}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>SEGUNDO APELLIDO</Typography>
              <Typography className={classes.card}>{data.segundoApellido}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>CURP</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>RFC</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>HOMOCLAVE</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>CORREO ELECTRÓNICO INSTITUCIONAL</Typography>
              <Typography className={classes.card}>{data.correoElectronico.institucional}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>CORREO ELECTRÓNICO PERSONAL/ALTERNO</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>NÚMERO TELEFÓNICO DE CASA</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>NÚMERO CELULAR PERSONAL</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>SITUACIÓN PERSONAL/ESTADO CIVIL</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>RÉGIMEN MATRIMONIAL</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>PAÍS DE NACIMIENTO</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>NACIONALIDAD</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default DatosGenerales;
