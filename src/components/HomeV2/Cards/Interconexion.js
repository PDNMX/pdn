import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader } from '@mui/material';

import logo from '../../../assets/CardsHome/logo_interconexion.svg';

import { makeStyles } from '@mui/styles';
import cssCards from './cssCards.js';

const useStyles = makeStyles(cssCards);

export default function (props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header} style={{ backgroundImage: `url(${logo})` }} />
      <CardContent>
        <Typography>
          Este tablero muestra los avances trimestrales de las Secretarias Ejecutivas de los Sistemas Locales Anticorrupción en el desarrollo de los <strong>sistemas 2 y 3</strong>
        </Typography>
        <br />
        <Typography>
          A través de un cuestionario elaborado por la SESNA, es posible conocer el progreso en las siguientes categorías: <strong>Normatividad, Infraestructura, Capital humano, Mapeo y grestión de datos y Desarrollo de mecanismos de comunicación.</strong>
        </Typography>
      </CardContent>
      <CardActions>
        <Button className={classes.boton} size='medium'>
          CONOCE MÁS <span className={classes.boton_span}>...</span>
        </Button>
      </CardActions>
    </Card>
  );
}
