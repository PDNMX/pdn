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

import { Disclaimer } from '../utils';

const useStyles = makeStyles(styleSecciones);

function Inversiones({ inversiones, tipo }) {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();
  return inversiones.map((obj, idx) => {
    return (
      <BoxAccordion key={'veh-' + idx}>
        <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          <Typography className={exp.heading}>
            <strong>
              {obj.tipoInversion && obj.tipoInversion.valor} ({obj.subTipoInversion && obj.subTipoInversion.valor})
            </strong>
          </Typography>
        </BoxAccordionSummary>
        <BoxAccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TIPO DE INVERSIÓN/ACTIVO:</Typography>
              <Typography className={classes.card}>
                {obj.tipoInversion && obj.tipoInversion.valor} <strong>({obj.subTipoInversion && obj.subTipoInversion.valor})</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>NÚMERO DE CUENTA, CONTRATO O PÓLIZA</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TIPO DE MONEDA</Typography>
              <Typography className={classes.card}>{obj.saldoSituacionActual && obj.saldoSituacionActual.moneda}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography className={classes.cardTitle}>TITULAR DE LA INVERSIÓN, CUENTA BANCARIA Y OTRO TIPO DE VALORES:</Typography>
              <Typography className={classes.card}>
                {obj.titular.map((tit, idx) => {
                  return <span key={'tit-' + idx}>{tit.valor}</span>;
                })}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography className={classes.cardTitle}>¿DÓNDE SE LOCALIZA LA INVERSIÓN, CUENTA BANCARIA Y OTRO TIPO DE VALORES/ACTIVOS ?</Typography>
              <Typography className={classes.card}>{obj.localizacionInversion.pais === 'MX' ? 'EN MÉXICO' : 'EN EL EXTRANJERO'}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>INSTITUCIÓN O RAZÓN SOCIAL</Typography>
              <Typography className={classes.card}>{obj.localizacionInversion.institucionRazonSocial}</Typography>
            </Grid>

            {obj.localizacionInversion.pais === 'MX' ? (
              <Grid item xs={12} md={4}>
                <Typography className={classes.cardTitle}>RFC</Typography>
                <Typography className={classes.card}>{obj.localizacionInversion.rfc}</Typography>
              </Grid>
            ) : (
              <Grid item xs={12} md={4}>
                <Typography className={classes.cardTitle}>PAÍS DÓNDE SE LOCALIZA</Typography>
                <Typography className={classes.card}>{obj.localizacionInversion.pais}</Typography>
              </Grid>
            )}

            {tipo !== 'INICIAL' && (
              <Grid item xs={12} md={4}>
                <Typography className={classes.cardTitle}>PORCENTAJES DE INCREMENTO O DECREMENTO</Typography>
                <Typography className={classes.card}>{obj.porcentajeIncrementoDecremento}</Typography>
              </Grid>
            )}

            {typeof obj.tercero !== 'undefined' && (
              <React.Fragment>
                <Divider />
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Typography className={classes.tituloSubSeccion}>TERCERO</Typography>
                </Grid>
              </React.Fragment>
            )}
            {typeof obj.tercero !== 'undefined' &&
              obj.tercero.map(tercero => {
                return tercero.tipoPersona !== 'MORAL' ? (
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={3}>
                        <Typography className={classes.cardTitle}>TIPO PERSONA:</Typography>
                        <Typography className={classes.cardReserved}>FÍSICA</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography className={classes.cardTitle}>NOMBRE DEL TERCERO O TERCEROS:</Typography>
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
                        <Typography className={classes.cardTitle}>NOMBRE DEL TERCERO O TERCEROS:</Typography>
                        <Typography className={classes.card}>{tercero.nombreRazonSocial}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography className={classes.cardTitle}>RFC:</Typography>
                        <Typography className={classes.card}>{tercero.rfc}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
        </BoxAccordionDetails>
      </BoxAccordion>
    );
  });
}

const Inversion = ({ data, tipo, titulo }) => {
  const classes = useStyles();

  let inversiones;

  if (typeof data === 'undefined' || data.ninguno) {
    inversiones = [];
  } else {
    inversiones = data.inversion ? data.inversion.filter(i => i.titular.length === 1 && i.titular[0].clave === 'DEC') : [];
  }

  // const inversiones = data.ninguno
  // 	? []
  // 	: data.inversion.filter((i) => i.titular.length === 1 && i.titular[0].clave === 'DEC');

  return (
    <Grid container spacing={2} className={classes.rootPrincipal}>
      <Grid item xs={12}>
        <Typography className={classes.tituloSeccion} align='center'>
          {titulo}
        </Typography>
      </Grid>
      {data ? (
        <Grid item xs={12}>
          {data.ninguno ? <DatosNoRegistrados /> : inversiones.length ? <Inversiones inversiones={inversiones} tipo={tipo} /> : <DatosReservados />}
        </Grid>
      ) : (
        <Disclaimer />
      )}
    </Grid>
  );
};
export default Inversion;
