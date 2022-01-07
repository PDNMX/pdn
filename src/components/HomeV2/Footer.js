import { Grid, Typography } from '@mui/material';
import React from 'react';
import withStyles from '@mui/styles/withStyles';

//iconos
import icon_youtube from '../../assets/footer/ico_youtube.svg';
import icon_twitter from '../../assets/footer/ico_twitter.svg';
import icon_facebook from '../../assets/footer/ico_facebook.svg';
import icon_github from '../../assets/footer/ico_github.svg';

import icon_libreuso from '../../assets/footer/libre_uso.png';

import logoSESNA from '../../assets/footer/logo_sna.svg';
import logoPDN from '../../assets/footer/logotipo_pdn.svg';

const style = theme => ({
  root: {
    flexGrow: 1,
    height: '200px',
    color: '#FFF',
    backgroundColor: '#0d3b49',
    opacity: 0.8
  },
  emailContacto: {
    display: 'inline-block',
    float: 'right',
    marginRight: '10px'
  },
  figure: {
    display: 'inline-block',
    float: 'right',
    margin: '0 5px',
    padding: 0,
    paddingRight: '8px'
  },
  image: {
    width: '30px',
    padding: 0,
    margin: 0,
    border: 0
  },
  lsesna: {
    width: '130px',
    marginTop: '35px',
    padding: 0,
    margin: 0,
    border: 0
  },
  lpdn: {
    width: '150px',
    marginTop: '35px',
    padding: 0,
    margin: 0,
    border: 0
  },
  acercade: {
    display: 'inline-block',
    color: '#3e5866',
    backgroundColor: '#bae3f7',
    with: '100%',
    height: '50px',
    marginTop: '10px'
  }
});

const Footer = props => {
  const { classes } = props;
  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid item lg={3}>
        <Grid container style={{ marginTop: '35px' }}>
          <Grid item justifyContent='right' xs={12}>
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
          <Grid item className={classes.acercade} xs={12}>
            <Grid container spacing={0} alignContent={'center'} style={{ padding: '15px 0' }} textAlign={'center'}>
              <Grid item xs={6} textAlign={'center'}>
                {/* <figure className={classes.figure}> */}
                <img alt='Libre Uso MX' src={icon_libreuso} style={{ width: '120px' }} />
                {/* </figure> */}
              </Grid>
              <Grid item xs={6}>
                Acerca de la PDN
              </Grid>
            </Grid>
          </Grid>
          <Grid item className='' xs={12}>
            <figure className={classes.figure}>
              <img alt='GitHub' src={icon_github} className={classes.image} style={{ marginTop: '10px', width: '80px' }} />
            </figure>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={5}>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={2} textAlign={'right'} style={{ paddingRight: '10px' }}>
            <Typography style={{ marginTop: '10px', fontSize: '12px' }}>
              <strong>Sistemas PDN</strong>
            </Typography>
            <Typography style={{ marginTop: '10px', fontSize: '12px' }}>Avances de Interconexion</Typography>
            <Typography style={{ marginTop: '10px', fontSize: '12px' }}>Mercado Digital Anticorrupción</Typography>
          </Grid>
          <Grid item xs={1} style={{ color: '#FFF', backgroundColor: '#3ab0e5', height: '200px', fontWeight: 'bolder', fontSize: '25px', padding: '0 5px' }}>
            ...
          </Grid>
          <Grid item xs={5} style={{ paddingLeft: '10px', verticalAlign: 'bottom' }}>
            <Typography style={{ marginTop: '10px', fontSize: '12px' }}>Preguntas frecuentes</Typography>
            <Typography style={{ marginTop: '10px', fontSize: '12px' }}>Boletines y prensa</Typography>
            <Typography style={{ marginTop: '10px', fontSize: '12px' }}>Suscribete</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4}>
        <Grid container>
          <Grid item xs={6} textAlign={'center'}>
            <figure>
              <img alt='Logo SESNA' src={logoSESNA} className={classes.lsesna} />
            </figure>
          </Grid>
          <Grid item xs={6}>
            <figure>
              <img alt='Logo PDN' src={logoPDN} className={classes.lpdn} />
            </figure>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(Footer);
