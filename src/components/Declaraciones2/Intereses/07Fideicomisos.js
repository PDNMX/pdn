import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styleSecciones from '../styleSecciones';

import DatosNoRegistrados from '../DatosNoRegistrados';
import DatosReservados from '../DatosReservados';
import { sumary, expansion, Divider } from '../utils';

import { BoxAccordion, BoxAccordionSummary, BoxAccordionDetails } from '../common/BoxAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles(styleSecciones);

function Fideicomisos(props) {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();
  const { fideicomiso } = props;
  return fideicomiso.map((obj, idx) => {
    return (
      <BoxAccordion key={'par-' + idx}>
        <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          <Typography className={exp.heading}>
            <strong>{obj.tipoRelacion}</strong>
          </Typography>
        </BoxAccordionSummary>
        <BoxAccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>PARTICIPACIÓN:</Typography>
              <Typography className={classes.card}>{obj.tipoRelacion}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TIPO DE FIDEICOMISO:</Typography>
              <Typography className={classes.card}>{obj.tipoFideicomiso}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TIPO DE PARTICIPACIÓN:</Typography>
              <Typography className={classes.card}>{obj.tipoParticipacion}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>RFC DEL FIDEICOMISO:</Typography>
              <Typography className={classes.card}>{obj.rfcFideicomiso}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>SECTOR PRODUCTIVO:</Typography>
              <Typography className={classes.card}>{obj.sector.valor}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>¿DÓNDE SE LOCALIZA EL FIDEICOMISO?</Typography>
              <Typography className={classes.card}>{obj.extanjero === 'MX' ? 'EN MÉXICO' : 'EN EL EXTRANJERO'}</Typography>
            </Grid>
            <Divider />
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography className={classes.tituloSubSeccion}>FIDEICOMITENTE</Typography>
            </Grid>
            {obj.fideicomitente.tipoPersona === 'FISICA' && obj.tipoParticipacion !== 'FIDEICOMITENTE' ? (
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={3}>
                    <Typography className={classes.cardTitle}>TIPO PERSONA:</Typography>
                    <Typography className={classes.cardReserved}>FÍSICA</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.cardTitle}>NOMBRE O RAZÓN SOCIAL DEL FIDEICOMITENTE:</Typography>
                    <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography className={classes.cardTitle}>RFC:</Typography>
                    <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={3}>
                    <Typography className={classes.cardTitle}>TIPO PERSONA:</Typography>
                    <Typography className={classes.card}>MORAL</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.cardTitle}>NOMBRE O RAZÓN SOCIAL DEL FIDEICOMITENTE:</Typography>
                    <Typography className={classes.card}>{obj.fideicomitente.nombreRazonSocial}</Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography className={classes.cardTitle}>RFC:</Typography>
                    <Typography className={classes.card}>{obj.fideicomitente.rfc}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Divider />
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography className={classes.tituloSubSeccion}>FIDUCIARIO</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={8}>
                  <Typography className={classes.cardTitle}>NOMBRE O RAZÓN SOCIAL DEL FIDUCIARIO:</Typography>
                  <Typography className={classes.card}>{obj.fiduciario.nombreRazonSocial}</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography className={classes.cardTitle}>RFC:</Typography>
                  <Typography className={classes.card}>{obj.fiduciario.rfc}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography className={classes.tituloSubSeccion}>FIDEICOMISARIO</Typography>
            </Grid>
            {obj.fideicomitente.tipoPersona === 'FISICA' && obj.tipoParticipacion !== 'FIDEICOMISARIO' ? (
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={3}>
                    <Typography className={classes.cardTitle}>TIPO PERSONA:</Typography>
                    <Typography className={classes.cardReserved}>FÍSICA</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.cardTitle}>NOMBRE O RAZÓN SOCIAL DEL FIDEICOMISARIO:</Typography>
                    <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography className={classes.cardTitle}>RFC:</Typography>
                    <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={3}>
                    <Typography className={classes.cardTitle}>TIPO PERSONA:</Typography>
                    <Typography className={classes.card}>MORAL</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.cardTitle}>NOMBRE O RAZÓN SOCIAL DEL FIDEICOMISARIO:</Typography>
                    <Typography className={classes.card}>{obj.fideicomisario.nombreRazonSocial}</Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography className={classes.cardTitle}>RFC:</Typography>
                    <Typography className={classes.card}>{obj.fideicomisario.rfc}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </BoxAccordionDetails>
      </BoxAccordion>
    );
  });
}

const Fideicomiso = props => {
  const classes = useStyles();
  const { data } = props;

  // const fideicomiso = data.fideicomiso.filter((i) => i.tipoRelacion === 'DECLARANTE');
  const fideicomiso = data?.fideicomiso;

  return (
    <Grid container spacing={2} className={classes.rootPrincipal}>
      <Grid item xs={12}>
        <Typography className={classes.tituloSeccion} align='center'>
          7. FIDEICOMISOS (HASTA LOS 2 ÚLTIMOS AÑOS)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {typeof data === 'undefined' || data.ninguno ? <DatosNoRegistrados /> : fideicomiso.length ? <Fideicomisos fideicomiso={fideicomiso} /> : <DatosReservados />}
      </Grid>
    </Grid>
  );
};
export default Fideicomiso;
