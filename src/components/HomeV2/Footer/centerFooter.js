import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

import { makeStyles } from '@mui/styles';
import css from './cssFooter';

const useStyles = makeStyles(css);

export default props => {
  const classes = useStyles();

  return (
    <Grid container className={classes.centerFoot}>
      <Grid item xs={12} className={classes.centerFoot_padding}>
        <Grid container direction={'row'} justifyContent={'center'} alignItems={'stretch'}>
          <Grid item xs={4}>
            <Grid container direction='column' justifyContent='flex-start' alignItems='flex-end' className={classes.centerFoot_left}>
              <Grid item style={{ textAlign: 'right' }}>
                <Typography variant='subtitle1' style={{ color: '#FFF' }}>
                  <strong>Sistemas PDN</strong>
                </Typography>
                <Typography variant='subtitle1'>Avances de Interconexion</Typography>
                <Typography variant='subtitle1'>Mercado Digital Anticorrupción</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid container direction='column' justifyContent='flex-start' alignItems='flex-start' className={classes.centerFoot_center}>
              <Grid item>
                <Typography variant='subtitle1' style={{ fontSize: 26 }}>
                  <strong>...</strong>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction='column' justifyContent='flex-start' alignItems='flex-start' className={classes.centerFoot_right}>
              <Grid item>
                <Typography variant='subtitle1'>Preguntas frecuentes</Typography>
                <Typography variant='subtitle1'>Videos</Typography>
                <Typography variant='subtitle1'>Boletines y prensa</Typography>
                <Typography variant='subtitle1'>Suscribete</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
