import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styleSecciones from '../styleSecciones';

import DatosNoRegistrados from '../DatosNoRegistrados';
import DatosReservados from '../DatosReservados';
import { sumary, expansion, getMoneda, Divider } from '../utils';

import { BoxAccordion, BoxAccordionSummary, BoxAccordionDetails } from '../common/BoxAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles(styleSecciones);

function BeneficiosPrivados(props) {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();
  const { beneficio } = props;
  return beneficio.map((obj, idx) => {
    return (
      <BoxAccordion key={'par-' + idx}>
        <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          <Typography className={exp.heading}>
            <strong>{obj.tipoBeneficio.valor}</strong>
          </Typography>
        </BoxAccordionSummary>
        <BoxAccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TIPO DE BENEFICIO:</Typography>
              <Typography className={classes.card}>{obj.tipoBeneficio.valor}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>BENEFICIARIO:</Typography>
              <Typography className={classes.card}>{obj.beneficiario[0].valor}</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>FORMA DE RECEPCIÓN DEL BENEFICIO:</Typography>
              <Typography className={classes.card}>{obj.formaRecepcion}</Typography>
            </Grid>

            {obj.formaRecepcion === 'MONETARIO' ? (
              <Grid item xs={8}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.cardTitle}>MONTO MENSUAL APROXIMADO:</Typography>
                    <Typography className={classes.card}>{getMoneda(obj.montoMensualAproximado.valor)}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.cardTitle}>TIPO DE MONEDA:</Typography>
                    <Typography className={classes.card}>{obj.montoMensualAproximado.moneda}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12} md={8}>
                <Typography className={classes.cardTitle}>ESPECIFIQUE EL BENEFICIO:</Typography>
                <Typography className={classes.card}>{obj.especifiqueBeneficio}</Typography>
              </Grid>
            )}

            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>SECTOR PRODUCTIVO:</Typography>
              <Typography className={classes.card}>{obj.sector.valor}</Typography>
            </Grid>
            <Divider />
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography className={classes.tituloSubSeccion}>OTORGANTE</Typography>
            </Grid>
            {obj.otorgante.tipoPersona === 'FISICA' ? (
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={3}>
                    <Typography className={classes.cardTitle}>TIPO PERSONA:</Typography>
                    <Typography className={classes.cardReserved}>FÍSICA</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.cardTitle}>NOMBRE O RAZÓN SOCIAL DEL OTORGANTE:</Typography>
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
                    <Typography className={classes.cardTitle}>NOMBRE O RAZÓN SOCIAL DEL OTORGANTE: </Typography>
                    <Typography className={classes.card}>{obj.otorgante.nombreRazonSocial}</Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography className={classes.cardTitle}>RFC:</Typography>
                    <Typography className={classes.card}>{obj.otorgante.rfc}</Typography>
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

const BeneficioPrivado = props => {
  const classes = useStyles();
  const { data } = props;

  // const beneficio = data.beneficio.filter((i) => i.beneficiario.length === 1 && i.beneficiario[0].clave === 'DC');
  const beneficio = data?.beneficio;

  return (
    <Grid container spacing={2} className={classes.rootPrincipal}>
      <Grid item xs={12}>
        <Typography className={classes.tituloSeccion} align='center'>
          6. BENEFICIOS PRIVADOS (HASTA LOS 2 ÚLTIMOS AÑOS)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {typeof data === 'undefined' || data.ninguno ? <DatosNoRegistrados /> : beneficio.length ? <BeneficiosPrivados beneficio={beneficio} /> : <DatosReservados />}
      </Grid>
    </Grid>
  );
};
export default BeneficioPrivado;
