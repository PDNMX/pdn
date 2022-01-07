import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import withStyles from '@mui/styles/withStyles';
import { CardHeader } from '@mui/material';

import logo from '../../../assets/cards/logo_mda.svg';

const style = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#3E5866',
    color: '#55575a',
    borderRadius: '25px',
    margin: '30px 10px',
    width: '400px'
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

const Cards = props => {
  const { classes } = props;
  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}></CardHeader>
      <CardContent className={classes.body}>
        <Typography variant='body2' color='text.secondary'>
          El <strong>Mercado Digital Anticorrupción (MDA)</strong> es un espacio en el que se encuentran disponibles <strong>herramientas de uso libre</strong> con las que se busca facilitar el desarrollo y conexión con los sistemas que conforman la Plataforma Digital Nacional
        </Typography>
        <br />
        <Typography variant='body2' color='text.secondary'>
          Cuenta con herramientas que fueron desarrolladas por diversas instituciones y que cumplen los objetivos de la PDN
        </Typography>
      </CardContent>
      <CardActions className={classes.body}>
        <Button className={classes.boton} size='medium'>
          <Typography>CONOCE MÁS ...</Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(style)(Cards);
