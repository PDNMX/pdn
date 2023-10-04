import { Grid } from '@mui/material';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

// icons
import icon_youtube from '../../../assets/rediseno2023/imgs/iconos/social/ico_youtube.svg';
import icon_twitter from '../../../assets/rediseno2023/imgs/iconos/social/ico_twitter.svg';
import icon_facebook from '../../../assets/rediseno2023/imgs/iconos/social/ico_facebook.svg';

import icon_github from '../../../assets/rediseno2023/imgs/iconos/social/ico_git.svg';
import icon_cc from '../../../assets/rediseno2023/imgs/iconos/social/88x31.png';

//import { makeStyles } from '@mui/styles';
//import css from './cssFooter';

import ReactGA from "react-ga4";

//const useStyles = makeStyles(css);

const LeftFooter = props => {
//const classes = useStyles();

  return (
    <Grid container direction='column' justifyContent='flex-end' alignItems='stretch'>
      <Grid container direction='row' justifyContent='right' className='redes'>
        <Link href='https://www.facebook.com/SESNAOficial/' target='_blank' onClick={()=>ReactGA.event({ category: 'facebook-sesna', action: 'click' })}>
          <figure >
            <img alt='Facebook' src={icon_facebook}  />
          </figure>
        </Link>
        <Link href='https://twitter.com/SESNAOficial' target='_blank' onClick={()=>ReactGA.event({ category: 'twitter-sesna', action: 'click' })}>
          <figure >
            <img alt='Twitter' src={icon_twitter} />
          </figure>
        </Link>
        <Link href='https://www.youtube.com/channel/UCRUpiHth_WRkNo2sBmZIyfQ/featured' target='_blank' onClick={()=>ReactGA.event({ category: 'youtube-sesna', action: 'click' })}>
          <figure >
            <img alt='YouTube' src={icon_youtube}  />
          </figure>
        </Link>
        <Link href='mailto:pdn@sesna.gob.mx' target='_blank' underline='none' variant='subtitle1'>
          pdn@sesna.gob.mx
        </Link>
      </Grid>
      <Grid item className='acerca'>
        <Grid container spacing={0} direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
          
          <Grid item>
            <RouterLink to={'/about'} >
              Acerca de la PDN
            </RouterLink>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction='row' className='cc-license'>
        <Grid>
          <Link href='https://creativecommons.org/licenses/by-nc/4.0/deed.es' rel='license' target='_blank' onClick={()=>ReactGA.event({ category: 'licencia-creative-commons', action: 'click' })}>
            <figure >
              <img alt='Creative Commons License'  src={icon_cc} />
            </figure>
          </Link>
        </Grid>
        <Link href='https://github.com/orgs/PDNMX/' target='_blank' onClick={()=>ReactGA.event({ category: 'github-pdn', action: 'click' })}>
          <figure >
            <img alt='GitHub' src={icon_github} />
          </figure>
        </Link>
      </Grid>
    </Grid>
  );
};

export default LeftFooter;
