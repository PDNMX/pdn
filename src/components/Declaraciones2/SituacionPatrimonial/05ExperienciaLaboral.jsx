import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import style from '../styleSecciones';
import { sumary, expansion } from '../utils';
import DatosNoRegistrados from '../DatosNoRegistrados';

import { BoxAccordion, BoxAccordionSummary, BoxAccordionDetails } from '../common/BoxAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles(style);

const ExperienciaLaboral = ({ data, titulo }) => {
  const classes = useStyles();
  const exp = expansion();
  const sum = sumary();

  const experiencia = data.experiencia ? data.experiencia : [];

  return (
    <Grid container spacing={2} className={classes.rootPrincipal}>
      <Grid item xs={12}>
        <Typography className={classes.tituloSeccion} align='center'>
          {titulo}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {data.ninguno ? (
          <DatosNoRegistrados />
        ) : (
          experiencia.map((expe, index) => {
            return (
              <BoxAccordion key={'exp-' + index}>
                <BoxAccordionSummary classes={sum} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                  <Typography className={exp.heading}>
                    <strong>
                      {expe.ambitoSector.clave === 'PUB' ? (
                        <span>
                          {expe.empleoCargoComision} {' EN '}
                          {expe.nombreEntePublico}
                        </span>
                      ) : (
                        <span>
                          {expe.puesto} {' EN '} {expe.nombreEmpresaSociedadAsociacion}
                        </span>
                      )}
                      {' ('}
                      {expe.fechaIngreso}
                      {' - '}
                      {expe.fechaEgreso}
                      {')'}
                    </strong>
                  </Typography>
                </BoxAccordionSummary>
                <BoxAccordionDetails>
                  {expe.ambitoSector.clave === 'PUB' && (
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>ÁMBITO/SECTOR EN EL QUE LABORASTE:</Typography>
                        <Typography className={classes.card}>{expe.ambitoSector.valor}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>NIVEL/ORDEN DE GOBIERNO</Typography>
                        <Typography className={classes.card}>{expe.nivelOrdenGobierno === 'MUNICIPAL_ALCALDIA' ? 'MUNICIPAL/ALCALDÍA' : expe.nivelOrdenGobierno}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>ÁMBITO PÚBLICO</Typography>
                        <Typography className={classes.card}>{expe.ambitoPublico}</Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography className={classes.cardTitle}>NOMBRE DEL ENTE PÚBLICO/NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN</Typography>
                        <Typography className={classes.card}>{expe.nombreEntePublico}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>ÁREA DE ADSCRIPCIÓN/ÁREA</Typography>
                        <Typography className={classes.card}>{expe.areaAdscripcion}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>EMPLEO, CARGO O COMISIÓN/PUESTO</Typography>
                        <Typography className={classes.card}>{expe.empleoCargoComision}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>ESPECIFIQUE FUNCIÓN PRINCIPAL</Typography>
                        <Typography className={classes.card}>{expe.funcionPrincipal}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>FECHA DE INGRESO</Typography>
                        <Typography className={classes.card}>{expe.fechaIngreso}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>FECHA DE EGRESO</Typography>
                        <Typography className={classes.card}>{expe.fechaEgreso}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>LUGAR DONDE SE UBICA</Typography>
                        <Typography className={classes.card}>{expe.ubicacion === 'MX' ? 'MÉXICO' : 'EXTRANJERO'}</Typography>
                      </Grid>
                    </Grid>
                  )}
                  {expe.ambitoSector.clave !== 'PUB' && (
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>ÁMBITO/SECTOR EN EL QUE LABORASTE:</Typography>
                        <Typography className={classes.card}>{expe.ambitoSector.valor}</Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography className={classes.cardTitle}>NOMBRE DEL ENTE PÚBLICO/NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN</Typography>
                        <Typography className={classes.card}>{expe.nombreEmpresaSociedadAsociacion}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>RFC</Typography>
                        <Typography className={classes.card}>{expe.rfc}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>ÁREA DE ADSCRIPCIÓN/ÁREA</Typography>
                        <Typography className={classes.card}>{expe.area}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>EMPLEO, CARGO O COMISIÓN/PUESTO</Typography>
                        <Typography className={classes.card}>{expe.puesto}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>SECTOR AL QUE PERTENECE</Typography>
                        <Typography className={classes.card}>{expe.sector && expe.sector.valor}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>FECHA DE INGRESO</Typography>
                        <Typography className={classes.card}>{expe.fechaIngreso}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>FECHA DE EGRESO</Typography>
                        <Typography className={classes.card}>{expe.fechaEgreso}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.cardTitle}>LUGAR DONDE SE UBICA</Typography>
                        <Typography className={classes.card}>{expe.ubicacion === 'MX' ? 'MÉXICO' : 'EXTRANJERO'}</Typography>
                      </Grid>
                    </Grid>
                  )}
                </BoxAccordionDetails>
              </BoxAccordion>
            );
          })
        )}
      </Grid>
    </Grid>
  );
};
export default ExperienciaLaboral;
