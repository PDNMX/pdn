import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import withStyles from '@mui/styles/withStyles';
import { CardHeader } from '@mui/material';

import logo from '../../../assets/CardsHome/logo_interconexion.svg';

const style = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#3E5866',
    color: '#55575a',
    // borderRadius: '25px',
    margin: '30px auto',
    width: '90%'
  },
  header: {
    backgroundColor: '#3E5866',
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '67%',
    backgroundPosition: 'center center',
    // width: '300px',
    padding: '20%'
  },
  body: {
    backgroundColor: '#FFF'
  },
  boton: {
    color: '#55575a',
    borderRadius: '50px',
    backgroundColor: '#edf2f9',
    padding: '5px 10px'
  }
});

const Interconexion = props => {
  const { classes } = props;
  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}></CardHeader>
      <CardContent className={classes.body}>
        <Typography color='text.secondary'>
          Este tablero muestra los avances trimestrales de las Secretarias Ejecutivas de los Sistemas Locales Anticorrupción en el desarrollo de los <strong>sistemas 2 y 3</strong>
        </Typography>
        <br />
        <Typography color='text.secondary'>
          A través de un cuestionario elaborado por la SESNA, es posible conocer el progreso en las siguientes categorías: <strong>Normatividad, Infraestructura, Capital humano, Mapeo y grestión de datos y Desarrollo de mecanismos de comunicación.</strong>
        </Typography>
      </CardContent>
      <CardActions className={classes.body}>
        <Button className={classes.boton} size='medium'>
          CONOCE MÁS ...
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(style)(Interconexion);
