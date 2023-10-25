import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styleSecciones from '../styleSecciones';

import DatosNoRegistrados from '../DatosNoRegistrados';
import DatosReservados from '../DatosReservados';
import { sumary, expansion, getMoneda } from '../utils';

import { BoxAccordion, BoxAccordionSummary, BoxAccordionDetails } from '../common/BoxAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles(styleSecciones);

function Apoyo(props) {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();
  const { apoyo } = props;
  return apoyo.map((obj, idx) => {
    return (
      <BoxAccordion key={'par-' + idx}>
        <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          <Typography className={exp.heading}>
            <strong>{obj.nombrePrograma}</strong>
          </Typography>
        </BoxAccordionSummary>
        <BoxAccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>BENEFICIARIO:</Typography>
              <Typography className={classes.card}>{obj.beneficiarioPrograma.valor}</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>NOMBRE DEL PROGRAMA:</Typography>
              <Typography className={classes.card}>{obj.nombrePrograma}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>INSTITUCIÓN QUE OTORGA EL APOYO:</Typography>
              <Typography className={classes.card}>{obj.institucionOtorgante}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>NIVEL U ORDEN DE GOBIERNO:</Typography>
              <Typography className={classes.card}>{obj.nivelOrdenGobierno}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TIPO DE APOYO:</Typography>
              <Typography className={classes.card}>{obj.tipoApoyo.valor}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>FORMA DE RECEPCIÓN DEL APOYO:</Typography>
              <Typography className={classes.card}>{obj.formaRecepcion}</Typography>
            </Grid>
            {obj.formaRecepcion === 'MONETARIO' ? (
              <Grid item xs={12} md={4}>
                <Typography className={classes.cardTitle}>MONTO APROXIMADO DEL APOYO MENSUAL:</Typography>
                <Typography className={classes.card}>
                  {getMoneda(obj.montoApoyoMensual.valor)} {obj.montoApoyoMensual.moneda}
                </Typography>
              </Grid>
            ) : (
              <Grid item xs={12} md={4}>
                <Typography className={classes.cardTitle}>ESPECIFIQUE EL APOYO:</Typography>
                <Typography className={classes.card}>{obj.especifiqueApoyo}</Typography>
              </Grid>
            )}
          </Grid>
        </BoxAccordionDetails>
      </BoxAccordion>
    );
  });
}

const ApoyosBeneficios = props => {
  const classes = useStyles();
  const { data } = props;

  // const apoyo = data.apoyo.filter((i) => i.beneficiarioPrograma.clave === 'DEC');
  const apoyo = data?.apoyo;

  return (
    <Grid container spacing={2} className={classes.rootPrincipal}>
      <Grid item xs={12}>
        <Typography className={classes.tituloSeccion} align='center'>
          3. APOYOS O BENEFICIOS PÚBLICOS (HASTA LOS 2 ÚLTIMOS AÑOS)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {typeof data === 'undefined' || data.ninguno ? <DatosNoRegistrados /> : apoyo.length ? <Apoyo apoyo={apoyo} /> : <DatosReservados />}
      </Grid>
    </Grid>
  );
};

export default ApoyosBeneficios;
