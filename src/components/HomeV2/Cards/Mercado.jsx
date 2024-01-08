import React from 'react';
import {Typography} from "@mui/material";
import { Grid } from '@mui/material';

import logoMDA from '../../../assets/rediseno2023/imgs/iconos/logotipos/logo_mda.svg';
import ReactGA from "react-ga4";
import { makeStyles } from '@mui/styles';
import cssCards from './cssCards';
import ButtonPDN from '../../Compartidos/ButtonPDN';
const useStyles = makeStyles(cssCards);

const CardMercardo = props => {
  const classes = useStyles();
  return (
    
      <Grid container className='mda-home'>
        <Grid item xs={6} className="img-mda">
          <figure>
            <img alt='Logo MDA' src={logoMDA} />
          </figure>
        </Grid>
        <Grid item xs={6}>

          <Typography variant="h6" style={{ marginTop: '30px', textAlign: 'justify' }} paragraph>
            El <strong>Mercado Digital Anticorrupción (MDA)</strong> es un espacio en el que se encuentran disponibles <strong>
              herramientas de uso libre</strong> con las que se busca facilitar el desarrollo y conexión con los sistemas que conforman la 
              Plataforma Digital Nacional.
          </Typography>
          <Typography variant="h6" style={{ textAlign: 'justify' }} paragraph>
            Cuenta con herramientas que fueron desarrolladas por diversas instituciones y que cumplen los objetivos de la PDN.
          </Typography>
          <Grid container direction={'row-reverse'}>
            <ButtonPDN text={''} href={'https://mda.plataformadigitalnacional.org/'} onClick={()=>ReactGA.pageview('/mda')} style={{ color: 'white' }}>
              CONOCE MÁS
            </ButtonPDN>
          </Grid>
        </Grid>
        
      </Grid>
    
  );
};
export default CardMercardo;
