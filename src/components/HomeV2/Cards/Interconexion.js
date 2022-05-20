import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardHeader, Grid } from '@mui/material';

import logo from '../../../assets/CardsHome/logo_interconexion.svg';
import ReactGA from "react-ga";
import { makeStyles } from '@mui/styles';
import cssCards from './cssCards.js';
import ButtonPDN from '../../Compartidos/ButtonPDN';
const useStyles = makeStyles(cssCards);

const CardInterconexion = props => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header} style={{ backgroundImage: `url(${logo})` }} />
      <CardContent>
        <Typography>
          Este tablero muestra los avances trimestrales de las Secretarias Ejecutivas de los Sistemas Locales Anticorrupción en el desarrollo de los <strong>sistemas 2 y 3</strong>.
        </Typography>
        <br />
        <Typography>
          A través de un cuestionario elaborado por la SESNA, es posible conocer el progreso en las siguientes categorías: <strong>Normatividad, Infraestructura, Capital humano, Mapeo y gestión de datos y Desarrollo de mecanismos de comunicación.</strong>
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container direction={'row-reverse'}>
          <ButtonPDN text={''} href={'https://www.plataformadigitalnacional.org/mapa-avance/'} onClick={()=>ReactGA.pageview('/mapa-avance')}>
            CONOCE MÁS
          </ButtonPDN>
        </Grid>
      </CardActions>
    </Card>
  );
};
export default CardInterconexion;
