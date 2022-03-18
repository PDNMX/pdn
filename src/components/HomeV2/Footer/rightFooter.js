import { Grid } from '@mui/material';

import logoSESNA from '../../../assets/footer/logo_sna.svg';
import logoPDN from '../../../assets/footer/logotipo_pdn.svg';

import { makeStyles } from '@mui/styles';
import css from './cssFooter';

const useStyles = makeStyles(css);

const RightFooter = props => {
  const classes = useStyles();

  return (
    <Grid container direction={'row'} justifyContent={'center'} alignContent={'baseline'}>
      <Grid item>
        <figure>
          <img alt='Logo SESNA' src={logoSESNA} className={classes.lsesna} />
        </figure>
      </Grid>
      <Grid item>
        <figure>
          <img alt='Logo PDN' src={logoPDN} className={classes.lpdn} />
        </figure>
      </Grid>
    </Grid>
  );
};

export default RightFooter;
