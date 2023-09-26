import { Grid } from '@mui/material';

import logoSESNA from '../../../assets/rediseno2023/imgs/iconos/logotipos/logo-sesna.svg';
import logoPDN from '../../../assets/rediseno2023/imgs/iconos/logotipos/logo-pdn.svg';
import logoSNA from '../../../assets/rediseno2023/imgs/iconos/logotipos/logo-sna.svg';

import { makeStyles } from '@mui/styles';
import css from './cssFooter';

const useStyles = makeStyles(css);

const RightFooter = props => {
  const classes = useStyles();

  return (
    <Grid container direction={'row'} justifyContent={'center'} alignContent={'baseline'}>
      <Grid item>
        <figure>
          <img alt='Logo SNA' src={logoSNA} className={classes.linstitucion} />
        </figure>
      </Grid>
      <Grid item>
        <figure>
          <img alt='Logo SESNA' src={logoSESNA} className={classes.linstitucion} />
        </figure>
      </Grid>
      <Grid item>
        <figure>
          <img alt='Logo PDN' src={logoPDN} className={classes.linstitucion} />
        </figure>
      </Grid>

    </Grid>
  );
};

export default RightFooter;
