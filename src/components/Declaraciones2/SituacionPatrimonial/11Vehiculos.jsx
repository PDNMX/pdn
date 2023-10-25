import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styleSecciones from '../styleSecciones';

import DatosNoRegistrados from '../DatosNoRegistrados';
import DatosReservados from '../DatosReservados';
import Transmisor from '../CompTransmisor';
import { sumary, expansion, Divider, getMoneda } from '../utils';

import { BoxAccordion, BoxAccordionSummary, BoxAccordionDetails } from '../common/BoxAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Disclaimer } from '../utils';

const useStyles = makeStyles(styleSecciones);

function Vehiculo(props) {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();
  const { vehiculos } = props;
  return vehiculos.map((obj, idx) => {
    return (
      <BoxAccordion key={'veh-' + idx}>
        <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          <Typography className={exp.heading}>
            <strong>{obj.tipoVehiculo && obj.tipoVehiculo.valor}</strong>
          </Typography>
        </BoxAccordionSummary>
        <BoxAccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TIPO DE VEHÍCULO:</Typography>
              <Typography className={classes.card}>{obj.tipoVehiculo && obj.tipoVehiculo.valor}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TITULAR DEL VEHÍCULO:</Typography>
              <Typography className={classes.card}>
                {obj.titular.map((tit, idx) => {
                  return <span key={'tit-' + idx}>{tit.valor}</span>;
                })}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>MARCA:</Typography>
              <Typography className={classes.card}>{obj.marca}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>MODELO:</Typography>
              <Typography className={classes.card}>{obj.modelo}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>AÑO:</Typography>
              <Typography className={classes.card}>{obj.anio}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>NÚMERO DE SERIE O REGISTRO:</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>¿DÓNDE SE ENCUENTRA REGISTRADO?:</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>FORMA DE ADQUISICIÓN:</Typography>
              <Typography className={classes.card}>{obj.formaAdquisicion && obj.formaAdquisicion.valor}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>FORMA DE PAGO:</Typography>
              <Typography className={classes.card}>{obj.formaPago}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>VALOR DE ADQUISICIÓN DEL VEHÍCULO:</Typography>
              <Typography className={classes.card}>{getMoneda(obj.valorAdquisicion.valor)}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TIPO DE MONEDA:</Typography>
              <Typography className={classes.card}>{obj.valorAdquisicion && obj.valorAdquisicion.moneda}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>FECHA DE ADQUISICIÓN DEL VEHÍCULO:</Typography>
              <Typography className={classes.card}>{obj.fechaAdquisicion}</Typography>
            </Grid>
            {obj.motivoBaja && (
              <Grid item xs={12} md={4}>
                <Typography className={classes.cardTitle}>EN CASO DE BAJA DEL VEHÍCULO INCLUIR MOTIVO:</Typography>
                <Typography className={classes.card}>{obj.motivoBaja && obj.motivoBaja.valor}</Typography>
              </Grid>
            )}
            <Divider />
            {obj.transmisor && <Transmisor transmisor={obj.transmisor} />}
          </Grid>
        </BoxAccordionDetails>
      </BoxAccordion>
    );
  });
}

const Vehiculos = ({ data, titulo }) => {
  const classes = useStyles();

  let vehiculos;

  if (data.ninguno) {
    vehiculos = [];
  } else {
    vehiculos = data.vehiculo ? data.vehiculo.filter(i => i.titular.length === 1 && i.titular[0].clave === 'DEC') : [];
  }

  // const vehiculos = data.ninguno
  // 	? []
  // 	: data.vehiculo.filter((i) => i.titular.length === 1 && i.titular[0].clave === 'DEC');

  return (
    <Grid container spacing={2} className={classes.rootPrincipal}>
      <Grid item xs={12}>
        <Typography className={classes.tituloSeccion} align='center'>
          {titulo}
        </Typography>
      </Grid>
      {data ? (
        <Grid item xs={12}>
          {data.ninguno ? <DatosNoRegistrados /> : vehiculos.length ? <Vehiculo vehiculos={vehiculos} /> : <DatosReservados />}
        </Grid>
      ) : (
        <Disclaimer />
      )}
    </Grid>
  );
};
export default Vehiculos;
