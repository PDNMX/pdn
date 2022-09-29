import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { BoxAccordion, BoxAccordionSummary, BoxAccordionDetails } from '../../common/BoxAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { sumary, expansion, getMoneda } from '../../utils';
import styleSecciones from '../../styleSecciones';
const useStyles = makeStyles(styleSecciones);

const ActividadIndustrial = ({ actividadIndustrialComercialEmpresarial }) => {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();

  return (
    <BoxAccordion>
      <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Typography className={exp.heading}>
              <strong>II.1.- POR ACTIVIDAD INDUSTRIAL, COMERCIAL Y/O EMPRESARIAL (DESPUÉS DE IMPUESTOS)</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={exp.heading}>
              <strong>
                {getMoneda(actividadIndustrialComercialEmpresarial.remuneracionTotal?.valor)} {actividadIndustrialComercialEmpresarial.remuneracionTotal?.moneda}
              </strong>
            </Typography>
          </Grid>
        </Grid>
      </BoxAccordionSummary>
      <BoxAccordionDetails>
        <Grid container spacing={1}>
          <Grid item xs={12} md={5}>
            <Typography className={classes.cardTitle}>NOMBRE O RAZÓN SOCIAL:</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography className={classes.cardTitle}>TIPO DE NEGOCIO:</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.cardTitle}>INGRESO:</Typography>
          </Grid>
          {actividadIndustrialComercialEmpresarial.actividades &&
            actividadIndustrialComercialEmpresarial.actividades.map((act, idx) => {
              return (
                <Grid container spacing={1} key={'act-' + idx}>
                  <Grid item xs={12} md={5}>
                    <Typography className={classes.card}>{act.nombreRazonSocial}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography className={classes.card}>{act.tipoNegocio}</Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography className={classes.card}>
                      {getMoneda(act.remuneracion.valor)} {act.remuneracion.moneda}
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
export default ActividadIndustrial;
