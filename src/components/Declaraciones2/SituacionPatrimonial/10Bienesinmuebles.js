import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styleSecciones from '../styleSecciones';

import DatosNoRegistrados from '../DatosNoRegistrados';
import DatosReservados from '../DatosReservados';
import Transmisor from '../CompTransmisor';
import { getUnidad, getMoneda } from '../utils';
import { sumary, expansion, Divider } from '../utils';

import { BoxAccordion, BoxAccordionSummary, BoxAccordionDetails } from '../common/BoxAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Disclaimer } from '../utils';

const useStyles = makeStyles(styleSecciones);

function BienInmuble(props) {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();
  const { inmuebles } = props;

  return inmuebles.map((inm, idx) => {
    return (
      <BoxAccordion key={'inm-' + idx}>
        <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          <Typography className={exp.heading}>
            <strong>TIPO DE INMUEBLE: {inm.tipoInmueble.valor}</strong>
          </Typography>
        </BoxAccordionSummary>
        <BoxAccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TIPO DE INMUEBLE:</Typography>
              <Typography className={classes.card}>{inm.tipoInmueble.valor}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TITULAR DEL INMUEBLE:</Typography>
              <Typography className={classes.card}>
                {inm.titular.map((tit, idx) => {
                  return <span key={'tit-' + idx}>{tit.valor}</span>;
                })}
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>SUPERFICIE DEL TERRENO</Typography>
              <Typography className={classes.card}>
                {inm.superficieTerreno.valor} {getUnidad(inm.superficieTerreno.unidad)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>SUPERFICIE DE CONSTRUCCIÓN</Typography>
              <Typography className={classes.card}>
                {inm.superficieConstruccion?.valor} {getUnidad(inm.superficieConstruccion?.unidad)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>FORMA DE ADQUISICIÓN</Typography>
              <Typography className={classes.card}>{inm.formaAdquisicion.valor}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>FORMA DE PAGO</Typography>
              <Typography className={classes.card}>{inm.formaPago}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>VALOR DE ADQUISICIÓN</Typography>
              <Typography className={classes.card}>{getMoneda(inm.valorAdquisicion.valor)} </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TIPO DE MONEDA</Typography>
              <Typography className={classes.card}>{inm.valorAdquisicion.moneda}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>FECHA DE ADQUISICIÓN DEL INMUEBLE</Typography>
              <Typography className={classes.card}>{inm.fechaAdquiscion}</Typography>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography className={classes.cardTitle}>DATOS DEL REGISTRO PÚBLICO DE LA PROPIEDAD: FOLIO REAL U OTRO DATO QUE PERMITA SU IDENTIFICACIÓN</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>¿EL VALOR DE ADQUISICIÓN DEL INMUEBLE ES CONFORME A?</Typography>
              <Typography className={classes.card}>{inm.valorConformeA}</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography className={classes.cardTitle}>PORCENTAJE DE PROPIEDAD DEL DECLARANTE CONFORME A ESCRITURACIÓN O CONTRATO:</Typography>
              <Typography className={classes.card}>{inm.porcentajePropiedad}%</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>UBICACIÓN DEL INMUEBLE</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>

            {inm.motivoBaja && (
              <Grid item xs={12} md={4}>
                <Typography className={classes.cardTitle}>EN CASO DE BAJA DEL INMUEBLE INCLUIR MOTIVO</Typography>
                <Typography className={classes.card}>{inm.motivoBaja.valor}</Typography>
              </Grid>
            )}
            <Divider />

            {inm.transmisor && <Transmisor transmisor={inm.transmisor} />}
          </Grid>
        </BoxAccordionDetails>
      </BoxAccordion>
    );
  });
}

const BienesInmuebles = ({ data, titulo }) => {
  const classes = useStyles();

  let inmuebles;

  if (data.ninguno) {
    inmuebles = [];
  } else {
    inmuebles = data.bienInmueble ? data.bienInmueble.filter(i => i.titular.length === 1 && i.titular[0].clave === 'DEC') : [];
  }

  // const inmuebles = data.ninguno
  // 	? []
  // 	: data.bienInmueble.filter((i) => i.titular.length === 1 && i.titular[0].clave === 'DEC');

  return (
    <Grid container spacing={2} className={classes.rootPrincipal}>
      <Grid item xs={12}>
        <Typography className={classes.tituloSeccion} align='center'>
          {titulo}
        </Typography>
      </Grid>
      {data ? (
        <Grid item xs={12}>
          {data.ninguno ? <DatosNoRegistrados /> : inmuebles.length ? <BienInmuble inmuebles={inmuebles} /> : <DatosReservados />}
        </Grid>
      ) : (
        <Disclaimer />
      )}
    </Grid>
  );
};
export default BienesInmuebles;
