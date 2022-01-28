import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

// icons
import icon_youtube from '../../../assets/footer/ico_youtube.svg';
import icon_twitter from '../../../assets/footer/ico_twitter.svg';
import icon_facebook from '../../../assets/footer/ico_facebook.svg';

import icon_libreuso from '../../../assets/footer/libre_uso.png';
import icon_github from '../../../assets/footer/ico_github.svg';

import { makeStyles } from '@mui/styles';
import css from './cssFooter';

const useStyles = makeStyles(css);

export default props => {
  const classes = useStyles();

  return (
    <Grid container spacing={1} direction='column' justifyContent='flex-end' alignItems='stretch'>
      <Grid item justifyContent='right'>
        <figure className={classes.figure}>
          <img alt='Facebook' src={icon_facebook} className={classes.image} />
        </figure>
        <figure className={classes.figure}>
          <img alt='Twitter' src={icon_twitter} className={classes.image} />
        </figure>
        <figure className={classes.figure}>
          <img alt='YouTube' src={icon_youtube} className={classes.image} />
        </figure>
        <Typography className={classes.emailContacto} variant='subtitle1'>
          pdn@sesna.gob.mx
        </Typography>
      </Grid>
      <Grid item className={classes.acercade}>
        <Grid container spacing={0} direction={'row'} justifyContent={'flex-end'} style={{ padding: '10px' }}>
          <Grid item>
            <figure className={classes.figure}>
              <img alt='Libre Uso MX' src={icon_libreuso} style={{ width: '120px', marginRight: 100 }} />
            </figure>
          </Grid>
          <Grid item>Acerca de la PDN</Grid>
        </Grid>
      </Grid>
      <Grid item>
        <figure className={classes.figure}>
          <img alt='GitHub' src={icon_github} className={classes.image} style={{ marginTop: '10px', width: '80px' }} />
        </figure>
      </Grid>
    </Grid>
  );
};
