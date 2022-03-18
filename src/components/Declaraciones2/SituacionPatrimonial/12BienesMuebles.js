import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
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

function BienMueble(props) {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();
  const { bienMueble } = props;
  return bienMueble.map((obj, idx) => {
    return (
      <BoxAccordion key={'veh-' + idx}>
        <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          <Typography className={exp.heading}>
            <strong>TIPO DEL BIEN: {obj.tipoBien.valor}</strong>
          </Typography>
        </BoxAccordionSummary>
        <BoxAccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
              <Typography className={classes.cardTitle}>TIPO DEL BIEN:</Typography>
              <Typography className={classes.card}>{obj.tipoBien.valor}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TITULAR DEL BIEN:</Typography>
              <Typography className={classes.card}>
                {obj.titular.map((tit, idx) => {
                  return <span key={'tit-' + idx}>{tit.valor}</span>;
                })}
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>DESCRIPCIÓN GENERAL DEL BIEN:</Typography>
              <Typography className={classes.card}>{obj.descripcionGeneralBien}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>FORMA DE ADQUISICIÓN:</Typography>
              <Typography className={classes.card}>{obj.formaAdquisicion.valor}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>FORMA DE PAGO:</Typography>
              <Typography className={classes.card}>{obj.formaPago}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>VALOR DE ADQUISICIÓN DEL MUEBLE:</Typography>
              <Typography className={classes.card}>{getMoneda(obj.valorAdquisicion.valor)}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TIPO DE MONEDA:</Typography>
              <Typography className={classes.card}>{obj.valorAdquisicion.moneda}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>FECHA DE ADQUISICIÓN:</Typography>
              <Typography className={classes.card}>{obj.fechaAdquisicion}</Typography>
            </Grid>

            {obj.motivoBaja && (
              <Grid item xs={12} md={4}>
                <Typography className={classes.cardTitle}>EN CASO DE BAJA DEL MUEBLE INCLUIR MOTIVO:</Typography>
                <Typography className={classes.card}>{obj.motivoBaja.valor}</Typography>
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

const BienesMuebles = ({ data, titulo }) => {
  const classes = useStyles();

  let bienMueble;

  if (data.ninguno) {
    bienMueble = [];
  } else {
    bienMueble = data.bienMueble ? data.bienMueble.filter(i => i.titular.length === 1 && i.titular[0].clave === 'DEC') : [];
  }

  // const bienMueble = data.ninguno
  // 	? []
  // 	: data.bienMueble.filter((i) => i.titular.length === 1 && i.titular[0].clave === 'DEC');

  return (
    <Grid container spacing={2} className={classes.rootPrincipal}>
      <Grid item xs={12}>
        <Typography className={classes.tituloSeccion} align='center'>
          {titulo}
        </Typography>
      </Grid>
      {data ? (
        <Grid item xs={12}>
          {data.ninguno ? <DatosNoRegistrados /> : bienMueble.length ? <BienMueble bienMueble={bienMueble} /> : <DatosReservados />}
        </Grid>
      ) : (
        <Disclaimer />
      )}
    </Grid>
  );
};
export default BienesMuebles;
