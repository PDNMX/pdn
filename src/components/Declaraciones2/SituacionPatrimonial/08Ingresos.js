import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import IngresosInicial from './08IngresosInicial';
import IngresosModificacion from './08IngresosModificacion';
import IngresosConclusion from './08IngresosConclusion';

import styleSecciones from '../styleSecciones';
import { sumary, expansion, getMoneda } from '../utils';

import { BoxAccordion, BoxAccordionSummary, BoxAccordionDetails } from '../common/BoxAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { info } from '../utils';

const useStyles = makeStyles(styleSecciones);

export function ActividadFinanciera({ actividadFinanciera }) {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();

  return (
    <BoxAccordion>
      <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Typography className={exp.heading}>
              <strong>II.2.- POR ACTIVIDAD FINANCIERA (RENDIMIENTOS O GANANCIAS) (DESPUÉS DE IMPUESTOS)</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={exp.heading}>
              <strong>
                {getMoneda(actividadFinanciera.remuneracionTotal?.valor)} {actividadFinanciera.remuneracionTotal?.moneda}
              </strong>
            </Typography>
          </Grid>
        </Grid>
      </BoxAccordionSummary>
      <BoxAccordionDetails>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Typography className={classes.cardTitle}>TIPO DE INSTRUMENTO QUE GENERÓ EL RENDIMIENTO O GANANCIA</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.cardTitle}>INGRESO:</Typography>
          </Grid>
          {actividadFinanciera.actividades.map((act, idx) => {
            return (
              <Grid container spacing={1} key={'act-' + idx}>
                <Grid item xs={12} md={9}>
                  <Typography className={classes.card}>{act.tipoInstrumento?.valor}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography className={classes.card}>
                    {getMoneda(act.remuneracion.valor)} {act.remuneracion?.moneda}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </BoxAccordionDetails>
    </BoxAccordion>
  );
}

export function ServiciosProfesionales({ serviciosProfesionales }) {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();

  return (
    <BoxAccordion>
      <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Typography className={exp.heading}>
              <strong>II.3.- POR SERVICIOS PROFESIONALES, CONSEJOS, CONSULTORÍAS Y/O ASESORÍAS (DESPUÉS DE IMPUESTOS)</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={exp.heading}>
              <strong>
                {getMoneda(serviciosProfesionales.remuneracionTotal?.valor)} {serviciosProfesionales.remuneracionTotal?.moneda}
              </strong>
            </Typography>
          </Grid>
        </Grid>
      </BoxAccordionSummary>
      <BoxAccordionDetails>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Typography className={classes.cardTitle}>TIPO DE SERVICIO PRESTADO</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.cardTitle}>INGRESO:</Typography>
          </Grid>
          {serviciosProfesionales.servicios.map((serv, idx) => {
            return (
              <Grid container spacing={1} key={'act-' + idx}>
                <Grid item xs={12} md={9}>
                  <Typography className={classes.card}>{serv.tipoServicio}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography className={classes.card}>
                    {getMoneda(serv.remuneracion.valor)} {serv.remuneracion.moneda}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </BoxAccordionDetails>
    </BoxAccordion>
  );
}

export function EnajenacionBienes({ enajenacionBienes }) {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();

  return (
    <BoxAccordion>
      <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Typography className={exp.heading}>
              <strong>II.4.- POR ENAJENACIÓN DE BIENES (DESPUÉS DE IMPUESTOS)</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={exp.heading}>
              <strong>
                {getMoneda(enajenacionBienes?.remuneracionTotal?.valor)} {enajenacionBienes?.remuneracionTotal?.moneda}
              </strong>
            </Typography>
          </Grid>
        </Grid>
      </BoxAccordionSummary>
      <BoxAccordionDetails>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Typography className={classes.cardTitle}>TIPO DE BIEN ENAJENADO</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.cardTitle}>INGRESO:</Typography>
          </Grid>
          {enajenacionBienes?.bienes.map((ing, idx) => {
            return (
              <Grid container spacing={1} key={'act-' + idx}>
                <Grid item xs={12} md={9}>
                  <Typography className={classes.card}>{ing.tipoBienEnajenado}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography className={classes.card}>
                    {getMoneda(ing.remuneracion.valor)} {ing.remuneracion.moneda}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </BoxAccordionDetails>
    </BoxAccordion>
  );
}

export function OtrosIngresos({ otrosIngresos }) {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();

  return (
    <BoxAccordion>
      <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Typography className={exp.heading}>
              <strong>II.5.- OTROS INGRESOS NO CONSIDERADOS A LOS ANTERIORES (DESPUÉS DE IMPUESTOS)</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={exp.heading}>
              <strong>
                {getMoneda(otrosIngresos.remuneracionTotal?.valor)} {otrosIngresos.remuneracionTotal?.moneda}
              </strong>
            </Typography>
          </Grid>
        </Grid>
      </BoxAccordionSummary>
      <BoxAccordionDetails>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Typography className={classes.cardTitle}>TIPO DE INGRESO (ARRENDAMIENTO, REGALÍA, SORTEOS, CONCURSOS, DONACIONES, SEGUROS DE VIDA, ETC.)</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.cardTitle}>INGRESO:</Typography>
          </Grid>
          {otrosIngresos.ingresos.map((ing, idx) => {
            return (
              <Grid container spacing={1} key={'act-' + idx}>
                <Grid item xs={12} md={9}>
                  <Typography className={classes.card}>{ing.tipoIngreso}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography className={classes.card}>
                    {getMoneda(ing.remuneracion.valor)} {ing.remuneracion.moneda}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </BoxAccordionDetails>
    </BoxAccordion>
  );
}

const Ingresos = ({ data, tipo, titulo }) => {
  switch (tipo) {
    case 'INICIAL':
      return <IngresosInicial data={data} titulo={titulo} />;
    case 'MODIFICACIÓN':
      return <IngresosModificacion data={data} titulo={titulo} />;
    case 'CONCLUSIÓN':
      return <IngresosConclusion data={data} titulo={titulo} />;
    default:
      info('Tipo declaración: ' + tipo);
      break;
  }
};

export default Ingresos;
