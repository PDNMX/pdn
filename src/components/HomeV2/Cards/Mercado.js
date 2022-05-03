import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardHeader, Grid } from '@mui/material';

import logo from '../../../assets/CardsHome/logo_mda.svg';
import ReactGA from "react-ga";
import { makeStyles } from '@mui/styles';
import cssCards from './cssCards.js';
import ButtonPDN from '../../Compartidos/ButtonPDN';
const useStyles = makeStyles(cssCards);

const CardMercardo = props => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header} style={{ backgroundImage: `url(${logo})` }} />
      <CardContent>
        <Typography>
          El <strong>Mercado Digital Anticorrupción (MDA)</strong> es un espacio en el que se encuentran disponibles <strong>herramientas de uso libre</strong> con las que se busca facilitar el desarrollo y conexión con los sistemas que conforman la Plataforma Digital Nacional.
        </Typography>
        <br />
        <Typography>Cuenta con herramientas que fueron desarrolladas por diversas instituciones y que cumplen los objetivos de la PDN.</Typography>
      </CardContent>
      <CardActions>
        <Grid container direction={'row-reverse'}>
          <ButtonPDN text={''} href={'https://mda.plataformadigitalnacional.org/'} onClick={()=>ReactGA.pageview('/mda')}>
            CONOCE MÁS
          </ButtonPDN>
        </Grid>
      </CardActions>
    </Card>
  );
};
export default CardMercardo;
