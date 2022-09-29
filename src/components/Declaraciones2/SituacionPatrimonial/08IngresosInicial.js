import React from 'react';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styleSecciones from '../styleSecciones';
import { sumary, expansion, Divider, getMoneda } from '../utils';

import { BoxAccordion, BoxAccordionSummary, BoxAccordionDetails } from '../common/BoxAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { ActividadFinanciera, ServiciosProfesionales } from './08Ingresos';
import ActividadIndustrial from './08Ingresos/ActividadIndustrial';
import basicInicial from './00_basic_incial';

const useStyles = makeStyles(styleSecciones);

const OtrosIngresos = ({ otrosIngresos }) => {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();

  return (
    <BoxAccordion>
      <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Typography className={exp.heading}>
              <strong>II.4.- OTROS INGRESOS NO CONSIDERADOS A LOS ANTERIORES (DESPUÉS DE IMPUESTOS)</strong>
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
};

const IngresosIniciales = ({ data: info, titulo }) => {
  const classes = useStyles();
  const data = {
    ...basicInicial.ingresos,
    ...info
  };
  return (
    <Grid container spacing={2} className={classes.rootPrincipal}>
      <Grid item xs={12}>
        <Typography className={classes.tituloSeccion} align='center'>
          {titulo}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={9}>
              <Typography className={classes.cardTitle}>I.- REMUNERACIÓN MENSUAL NETA DEL DECLARANTE POR SU CARGO PÚBLICO (POR CONCEPTO DE SUELDOS, HONORARIOS, COMPENSACIONES, BONOS Y OTRAS PRESTACIONES) (CANTIDADES NETAS DESPUÉS DE IMPUESTOS)</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography className={classes.card}>
                {getMoneda(data.remuneracionMensualCargoPublico.valor)} {data.remuneracionMensualCargoPublico.moneda}
              </Typography>
            </Grid>
            <Divider />
            <Grid item xs={12} md={9}>
              <Typography className={classes.cardTitle}>II.- OTROS INGRESOS MENSUALES DEL DECLARANTE (SUMA DEL II.1 AL II.4)</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography className={classes.card}>
                {getMoneda(data.otrosIngresosMensualesTotal.valor)} {data.otrosIngresosMensualesTotal.moneda}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <ActividadIndustrial actividadIndustrialComercialEmpresarial={data.actividadIndustialComercialEmpresarial || data.actividadIndustrialComercialEmpresarial} />
              <ActividadFinanciera actividadFinanciera={data.actividadFinanciera} />
              <ServiciosProfesionales serviciosProfesionales={data.serviciosProfesionales} />
              <OtrosIngresos otrosIngresos={data.otrosIngresos} />
            </Grid>
            <Divider />
            <Grid item xs={12} md={9}>
              <Typography className={classes.cardTitle}>A.- INGRESO MENSUAL NETO DEL DECLARANTE (SUMA DEL NUMERAL I Y II)</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography className={classes.card}>
                {getMoneda(data.ingresoMensualNetoDeclarante.valor)} {data.ingresoMensualNetoDeclarante.moneda}
              </Typography>
            </Grid>

            <Grid item xs={12} md={9}>
              <Typography className={classes.cardTitle}>B.- INGRESO MENSUAL NETO DE LA PAREJA Y/O DEPENDIENTES ECONÓMICOS (DESPUÉS DE IMPUESTOS)</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>

            <Grid item xs={12} md={9}>
              <Typography className={classes.cardTitle}>C.- TOTAL DE INGRESOS MENSUALES NETOS PERCIBIDOS POR EL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS (SUMA DE LOS APARTADOS A Y B)</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography className={classes.card}>
                {getMoneda(data.totalIngresosMensualesNetos.valor)} {data.totalIngresosMensualesNetos.moneda}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default IngresosIniciales;
