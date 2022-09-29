import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styleSecciones from '../styleSecciones';

import DatosNoRegistrados from '../DatosNoRegistrados';
import DatosReservados from '../DatosReservados';
import { sumary, expansion, getMoneda, Divider, Ubicacion } from '../utils';

import { BoxAccordion, BoxAccordionSummary, BoxAccordionDetails } from '../common/BoxAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles(styleSecciones);

function Clientes(props) {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();
  const { cliente } = props;
  return cliente.map((obj, idx) => {
    return (
      <BoxAccordion key={'par-' + idx}>
        <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          <Typography className={exp.heading}>
            <strong>{obj.empresa.nombreEmpresaServicio}</strong>
          </Typography>
        </BoxAccordionSummary>
        <BoxAccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={12} md={9}>
              <Typography className={classes.cardTitle}>¿REALIZA ALGUNA ACTIVIDAD LUCRATIVA INDEPENDIENTE AL EMPLEO, CARGO O COMISIÓN?:</Typography>
              <Typography className={classes.card}>{obj.realizaActividadLucrativa ? 'SÍ' : 'NO'}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography className={classes.cardTitle}>RELACIÓN:</Typography>
              <Typography className={classes.card}>{obj.tipoRelacion}</Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography className={classes.cardTitle}>NOMBRE DE LA EMPRESA O SERVICIO QUE PROPORCIONA:</Typography>
              <Typography className={classes.card}>{obj.empresa.nombreEmpresaServicio}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography className={classes.cardTitle}>RFC:</Typography>
              <Typography className={classes.card}>{obj.empresa.rfc}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>SECTOR PRODUCTIVO:</Typography>
              <Typography className={classes.card}>{obj.sector.valor}</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography className={classes.cardTitle}>MONTO APROXIMADO DEL BENEFICIO O GANANCIA MENSUAL QUE OBTIENE DEL CLIENTE PRINCIPAL:</Typography>
              <Typography className={classes.card}>
                {getMoneda(obj.montoAproximadoGanancia.valor)} {obj.montoAproximadoGanancia.moneda}
              </Typography>
            </Grid>
            <Divider />
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography className={classes.tituloSubSeccion}>CLIENTE PRINCIPAL</Typography>
            </Grid>
            {obj.clientePrincipal.tipoPersona === 'FISICA' ? (
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={3}>
                    <Typography className={classes.cardTitle}>TIPO PERSONA:</Typography>
                    <Typography className={classes.cardReserved}>FÍSICA</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.cardTitle}>SEÑALE NOMBRE O RAZÓN SOCIAL DEL CLIENTE PRINCIPAL:</Typography>
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
                    <Typography className={classes.cardTitle}>SEÑALE NOMBRE O RAZÓN SOCIAL DEL CLIENTE PRINCIPAL:</Typography>
                    <Typography className={classes.card}>{obj.clientePrincipal.nombreRazonSocial}</Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography className={classes.cardTitle}>RFC:</Typography>
                    <Typography className={classes.card}>{obj.clientePrincipal.rfc}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Divider />
            <Ubicacion ubicacion={obj.ubicacion} />
          </Grid>
        </BoxAccordionDetails>
      </BoxAccordion>
    );
  });
}

const Cliente = props => {
  const classes = useStyles();
  const { data } = props;

  // const cliente = data.cliente.filter((i) => i.tipoRelacion === 'DECLARANTE');
  const cliente = data?.cliente;

  return (
    <Grid container spacing={2} className={classes.rootPrincipal}>
      <Grid item xs={12}>
        <Typography className={classes.tituloSeccion} align='center'>
          5. CLIENTES PRINCIPALES (HASTA LOS 2 ÚLTIMOS AÑOS)
        </Typography>
      </Grid>
      <Grid item xs={12}>
      {typeof data === 'undefined' || data.ninguno ? <DatosNoRegistrados /> : cliente.length ? <Clientes cliente={cliente} /> : <DatosReservados />}
      </Grid>
    </Grid>
  );
};
export default Cliente;
