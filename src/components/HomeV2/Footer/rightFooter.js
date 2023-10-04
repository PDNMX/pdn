import { Grid } from '@mui/material';

import logoSESNA from '../../../assets/rediseno2023/imgs/iconos/logotipos/logo-sesna.svg';
import logoPDN from '../../../assets/rediseno2023/imgs/iconos/logotipos/logo-pdn.svg';
import logoSNA from '../../../assets/rediseno2023/imgs/iconos/logotipos/logo-sna.svg';

import { makeStyles } from '@mui/styles';
import css from './cssFooter';

//const useStyles = makeStyles(css);

const RightFooter = props => {
  //const classes = useStyles();

  return (
    <Grid className='columna-logos' item xs={4} container direction={'row'} justifyContent={'center'} alignContent={'center'}>
      <Grid item>
        <figure>
          <img alt='Logo SNA' src={logoSNA}  />
        </figure>
      </Grid>
      <Grid item>
        <figure>
          <img alt='Logo SESNA' src={logoSESNA}  />
        </figure>
      </Grid>
      <Grid item>
        <figure>
          <img alt='Logo PDN' src={logoPDN} />
        </figure>
      </Grid>

    </Grid>
  );
};

export default RightFooter;
