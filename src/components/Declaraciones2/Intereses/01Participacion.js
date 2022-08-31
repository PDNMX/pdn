import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styleSecciones from '../styleSecciones';

import DatosNoRegistrados from '../DatosNoRegistrados';
import DatosReservados from '../DatosReservados';
import { sumary, expansion, Divider, getMoneda, Porcentaje, Ubicacion } from '../utils';

import { BoxAccordion, BoxAccordionSummary, BoxAccordionDetails } from '../common/BoxAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles(styleSecciones);

function Participacion(props) {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();
  const { participaciones } = props;
  return participaciones.map((obj, idx) => {
    return (
      <BoxAccordion key={'par-' + idx}>
        <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          <Typography className={exp.heading}>
            <strong>
              {obj.tipoParticipacion.valor} DE {obj.nombreEmpresaSociedadAsociacion}
            </strong>
          </Typography>
        </BoxAccordionSummary>
        <BoxAccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>PARTICIPA:</Typography>
              <Typography className={classes.card}>{obj.tipoRelacion}</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography className={classes.cardTitle}>NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN:</Typography>
              <Typography className={classes.card}>{obj.nombreEmpresaSociedadAsociacion}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>RFC:</Typography>
              <Typography className={classes.card}>{obj.rfc}</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TIPO DE PARTICIPACIÓN:</Typography>
              <Typography className={classes.card}>{obj.tipoParticipacion.valor}</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>SECTOR PRODUCTIVO AL QUE PERTENECE:</Typography>
              <Typography className={classes.card}>{obj.sector?.valor}</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography className={classes.cardTitle}>¿RECIBE REMUNERACIÓN POR SU PARTICIPACIÓN?:</Typography>
              <Typography className={classes.card}>{obj.recibeRemuneracion ? 'SÍ' : 'NO'}</Typography>
            </Grid>
            {obj.recibeRemuneracion && (
              <Grid item xs={12} md={4}>
                <Typography className={classes.cardTitle}>MONTO MENSUAL NETO:</Typography>
                <Typography className={classes.card}>
                  {getMoneda(obj.montoMensual.valor)} {obj.montoMensual.moneda}
                </Typography>
              </Grid>
            )}
            <Porcentaje porcentaje={obj.porcentajeParticipacion || 0} titulo='PORCENTAJE DE PARTICIPACIÓN DE ACUERDO A ESCRITURA' />
            <Divider />
            <Ubicacion ubicacion={obj.ubicacion} />
          </Grid>
        </BoxAccordionDetails>
      </BoxAccordion>
    );
  });
}

const Participaciones = props => {
  const classes = useStyles();
  const { data } = props;

  const participaciones = data.participacion;

  return (
    <Grid container spacing={2} className={classes.rootPrincipal}>
      <Grid item xs={12}>
        <Typography className={classes.tituloSeccion} align='center'>
          1. PARTICIPACIÓN EN EMPRESAS, SOCIEDADES O ASOCIACIONES (HASTA LOS 2 ÚLTIMOS AÑOS)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {data.ninguno ? <DatosNoRegistrados /> : participaciones.length ? <Participacion participaciones={participaciones} /> : <DatosReservados />}
      </Grid>
    </Grid>
  );
};
export default Participaciones;
