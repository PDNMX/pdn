import React from 'react';
import { Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import ReactGA from "react-ga";
// icons
import icon_youtube from '../../../assets/footer/ico_youtube.svg';
import icon_twitter from '../../../assets/footer/ico_twitter.svg';
import icon_facebook from '../../../assets/footer/ico_facebook.svg';

import icon_github from '../../../assets/footer/ico_git.svg';

import logoSESNA from '../../../assets/footer/logo_sna.svg';
import logoPDN from '../../../assets/footer/logotipo_pdn.svg';

import { makeStyles } from '@mui/styles';
import css from './cssFooter';
const useStyles = makeStyles(css);



const MobileFooter = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container spacing={2} direction={'row'} justifyContent={'center'} alignContent={'center'} className={classes.footerMobileSeccEnlaces}>
        <Grid item>
          <Typography variant='subtitle1'>
            <RouterLink to={'/faq'} className={classes.linkMobile}>
              Preguntas frecuentes
            </RouterLink>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='subtitle1'>
            <Link href='https://drive.google.com/drive/folders/1t_vGUfagr75TAZ8-E4NZfL-fU0BcsPlZ' target='_blank' underline='none' className={classes.linkMobile} onClick={()=>ReactGA.event({ category: 'boletines-prensa', action: 'click' })}>
              Boletines y prensa
            </Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='subtitle1'>
            <Link href='https://www.youtube.com/channel/UCJ0nWmB2-ADfn95r5cjmLJA/' target='_blank' underline='none' className={classes.linkMobile} onClick={()=>ReactGA.event({ category: 'youtube-pdn', action: 'click' })}>
              Videos
            </Link>
          </Typography>
        </Grid>
        {/* <Grid item>
          <Typography variant='subtitle1'>
            <RouterLink to={'#'} className={classes.linkMobile}>
              Mapa de sitio
            </RouterLink>
          </Typography>
        </Grid> */}
      </Grid>
      <Grid container direction={'row'} justifyContent={'center'} alignContent={'center'} className={classes.footerMobileSeccLogos}>
        <Grid item>
          <img alt='Logo SESNA' src={logoSESNA} className={classes.mobileSESNA} />
        </Grid>
        <Grid item>
          <img alt='Logo PDN' src={logoPDN} className={classes.mobilePDN} />
        </Grid>
      </Grid>
      <Grid container direction={'row'} justifyContent={'center'} alignContent={'center'} className={classes.footerMobileSeccLogos}>
        <Grid item>
          <Link href='https://github.com/orgs/PDNMX/' target='_blank'>
            <figure className={classes.figure}>
              <img alt='GitHub' src={icon_github} className={classes.image} />
            </figure>
          </Link>
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
        </Grid>
      </Grid>
      <Grid container direction={'column'} justifyContent={'center'} alignContent={'center'} className={classes.footerMobileSeccLogos}>
        <Grid item>
          <Link href='https://creativecommons.org/licenses/by-nc/4.0/deed.es' rel='license' target='_blank'>
            <figure className={classes.figure} style={{ maring: 0, padding: 0 }}>
              <img alt='Creative Commons License' style={{ marginBottom: 10, borderWidth: 0, width: 120 }} src='https://i.creativecommons.org/l/by-nc/4.0/80x15.png' />
            </figure>
          </Link>
        </Grid>
        <Grid item>
          <Link href='mailto:pdn@sesna.gob.mx' target='_blank' underline='none' className={classes.emailContacto} variant='subtitle1' style={{ marginRight: 0 }}>
            pdn@sesna.gob.mx
          </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MobileFooter;
