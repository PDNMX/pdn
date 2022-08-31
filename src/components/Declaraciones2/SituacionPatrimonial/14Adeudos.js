import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styleSecciones from '../styleSecciones';
import { Divider } from '../utils';

import DatosNoRegistrados from '../DatosNoRegistrados';
import DatosReservados from '../DatosReservados';
import { sumary, expansion, getMoneda } from '../utils';

import { BoxAccordion, BoxAccordionSummary, BoxAccordionDetails } from '../common/BoxAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Disclaimer } from '../utils';

const useStyles = makeStyles(styleSecciones);

function Adeudos({ adeudos, tipo }) {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();
  return adeudos.map((obj, idx) => {
    return (
      <BoxAccordion key={'adeudo-' + idx}>
        <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          <Typography className={exp.heading}>
            <strong>TIPO DE ADEUDO: {obj.tipoAdeudo.valor}</strong>
          </Typography>
        </BoxAccordionSummary>
        <BoxAccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TIPO DE ADEUDO:</Typography>
              <Typography className={classes.card}>{obj.tipoAdeudo.valor}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TITULAR DEL ADEUDO:</Typography>
              <Typography className={classes.card}>
                {obj.titular.map((tit, idx) => {
                  return <span key={'tit-' + idx}>{tit.valor}</span>;
                })}
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>NÚMERO DE CUENTA O CONTRATO:</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>FECHA DE ADQUISICIÓN DEL ADEUDO/PASIVO</Typography>
              <Typography className={classes.card}>{obj.fechaAdquision}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>MONTO ORIGINAL DEL ADEUDO/PASIVO</Typography>
              <Typography className={classes.card}>{getMoneda(obj.montoOriginal.valor)}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>TIPO DE MONEDA</Typography>
              <Typography className={classes.card}>{obj.montoOriginal.moneda}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>SALDO INSOLUTO (SITUACIÓN ACTUAL)</Typography>
              <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography className={classes.cardTitle}>¿DÓNDE SE LOCALIZA EL ADEUDO?</Typography>
              <Typography className={classes.card}>{obj.localizacionAdeudo.pais === 'MX' ? 'EN MÉXICO' : 'EN EL EXTRANJERO'}</Typography>
            </Grid>

            {obj.localizacionAdeudo.pais !== 'MX' && (
              <Grid item xs={12} md={4}>
                <Typography className={classes.cardTitle}>PAÍS DÓNDE SE LOCALIZA</Typography>
                <Typography className={classes.card}>{obj.localizacionAdeudo.pais}</Typography>
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
            <Divider />

            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography className={classes.tituloSubSeccion}>OTORGANTE DEL CRÉDITO</Typography>
            </Grid>
            {obj.otorganteCredito && obj.otorganteCredito.tipoPersona === 'MORAL' ? (
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={4}>
                    <Typography className={classes.cardTitle}>TIPO PERSONA:</Typography>
                    <Typography className={classes.card}>{obj.otorganteCredito.tipoPersona}</Typography>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Typography className={classes.cardTitle}>NOMBRE/INSTITUCIÓN O RAZÓN SOCIAL</Typography>
                    <Typography className={classes.card}>{obj.otorganteCredito.nombreInstitucion}</Typography>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Typography className={classes.cardTitle}>RFC </Typography>
                    <Typography className={classes.card}>{obj.otorganteCredito.rfc}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={4}>
                    <Typography className={classes.cardTitle}>TIPO PERSONA:</Typography>
                    <Typography className={classes.cardReserved}>FÍSICA</Typography>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Typography className={classes.cardTitle}>NOMBRE/INSTITUCIÓN O RAZÓN SOCIAL</Typography>
                    <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Typography className={classes.cardTitle}>RFC </Typography>
                    <Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
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

const Adeudo = ({ data, tipo, titulo }) => {
  const classes = useStyles();

  let adeudos;

  if (typeof data === 'undefined' || data.ninguno) {
    adeudos = [];
  } else {
    adeudos = data.adeudo ? data.adeudo.filter(i => i.titular.length === 1 && i.titular[0].clave === 'DEC') : [];
  }

  // const adeudos = data.ninguno
  // 	? []
  // 	: data.adeudo.filter((i) => i.titular.length === 1 && i.titular[0].clave === 'DEC');

  return (
    <Grid container spacing={2} className={classes.rootPrincipal}>
      <Grid item xs={12}>
        <Typography className={classes.tituloSeccion} align='center'>
          {titulo}
        </Typography>
      </Grid>
      {data ? (
        <Grid item xs={12}>
          {data.ninguno ? <DatosNoRegistrados /> : adeudos.length ? <Adeudos adeudos={adeudos} tipo={tipo} /> : <DatosReservados />}
        </Grid>
      ) : (
        <Disclaimer />
      )}
    </Grid>
  );
};
export default Adeudo;
