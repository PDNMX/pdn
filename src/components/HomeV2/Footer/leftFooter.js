import { Grid } from '@mui/material';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

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
        <Link href='https://www.facebook.com/SESNAOficial/' target='_blank'>
          <figure className={classes.figure}>
            <img alt='Facebook' src={icon_facebook} className={classes.image} />
          </figure>
        </Link>
        <Link href='https://twitter.com/SESNAOficial' target='_blank'>
          <figure className={classes.figure}>
            <img alt='Twitter' src={icon_twitter} className={classes.image} />
          </figure>
        </Link>
        <Link href='https://www.youtube.com/channel/UCRUpiHth_WRkNo2sBmZIyfQ/featured' target='_blank'>
          <figure className={classes.figure}>
            <img alt='YouTube' src={icon_youtube} className={classes.image} />
          </figure>
        </Link>
        <Link href='mailto:pdn@sesna.gob.mx' target='_blank' underline='none' className={classes.emailContacto} variant='subtitle1'>
          pdn@sesna.gob.mx
        </Link>
      </Grid>
      <Grid item className={classes.acercade}>
        <Grid container spacing={0} direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
          <Grid item>
            <figure className={classes.figure}>
              <img alt='Libre Uso MX' src={icon_libreuso} style={{ width: 180, marginRight: 40 }} />
            </figure>
          </Grid>
          <Grid item>
            <RouterLink to={'/about'} className={classes.enlaces} style={{ marginRight: 20, color: '#666' }}>
              Acerca de la PDN
            </RouterLink>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Link href='https://github.com/orgs/PDNMX/' target='_blank'>
          <figure className={classes.figure}>
            <img alt='GitHub' src={icon_github} className={classes.image} style={{ marginTop: '10px', width: '80px' }} />
          </figure>
        </Link>
      </Grid>
    </Grid>
  );
};
