import { makeStyles } from 'tss-react/mui';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import styleSecciones from './styleSecciones'
const useStyles = makeStyles()(styleSecciones);

export default function CompTransmisor(props) {
  const { classes } = useStyles()
  const { transmisor } = props

  return (
    <Grid size={12}>
      <Grid container spacing={1}>
        <Grid style={{ textAlign: 'center' }} size={12}>
          <Typography className={classes.tituloSubSeccion}>TRANSMISOR(ES)</Typography>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 2
          }}>
          <Typography className={classes.cardTitle}>TIPO PERSONA</Typography>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 3
          }}>
          <Typography className={classes.cardTitle}>RFC</Typography>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 3
          }}>
          <Typography className={classes.cardTitle}>NOMBRE O RAZÓN SOCIAL DEL TRANSMISOR DE LA PROPIEDAD</Typography>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 4
          }}>
          <Typography className={classes.cardTitle}>RELACIÓN DEL TRANSMISOR DE LA PROPIEDAD CON EL TITULAR</Typography>
        </Grid>
        {typeof transmisor !== 'undefined' &&
          transmisor.map((transmisor, idx) => {
            return (
              <Grid key={'ter-' + idx} size={12}>
                {transmisor.tipoPersona === 'MORAL' ? (
                  <Grid container spacing={1}>
                    <Grid
                      size={{
                        xs: 12,
                        md: 2
                      }}>
                      <Typography className={classes.card}>MORAL</Typography>
                    </Grid>
                    <Grid
                      size={{
                        xs: 12,
                        md: 3
                      }}>
                      <Typography className={classes.card}>{transmisor.rfc}</Typography>
                    </Grid>
                    <Grid
                      size={{
                        xs: 12,
                        md: 3
                      }}>
                      <Typography className={classes.card}>{transmisor.nombreRazonSocial}</Typography>
                    </Grid>
                    <Grid
                      size={{
                        xs: 12,
                        md: 4
                      }}>
                      <Typography className={classes.cardReserved}>NO PÚBLICO</Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={1}>
                    <Grid
                      size={{
                        xs: 12,
                        md: 2
                      }}>
                      <Typography className={classes.card}>FÍSICA</Typography>
                    </Grid>
                    <Grid
                      size={{
                        xs: 12,
                        md: 3
                      }}>
                      <Typography className={classes.cardReserved}>NO PÚBLICO</Typography>
                    </Grid>
                    <Grid
                      size={{
                        xs: 12,
                        md: 3
                      }}>
                      <Typography className={classes.cardReserved}>NO PÚBLICO</Typography>
                    </Grid>
                    <Grid
                      size={{
                        xs: 12,
                        md: 4
                      }}>
                      <Typography className={classes.cardReserved}>NO PÚBLICO</Typography>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            );
          })}
      </Grid>
    </Grid>
  );
}
