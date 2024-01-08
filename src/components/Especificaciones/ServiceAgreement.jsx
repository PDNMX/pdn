import React from 'react';
import { Typography } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import ButtonPDN from '../Compartidos/ButtonPDN';

const url_doc = 'https://drive.google.com/file/d/1f6E1HYEf3EBcqe9iPDdS27eJcyPYuPiO/view?usp=sharing';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: '5px 0'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.linkColor,
    wordBreak: 'break-all'
  },
  text: {
    color: theme.palette.text.primary,
    textAlign: 'justify',
  },
  title: {
    color: theme.palette.primary.main
  },
});

const ServiceAgreement = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant='h5' className={classes.title} paragraph>
        Niveles de servicio y protocolo de notificación de incidencias.
      </Typography>
      <Typography paragraph className={classes.text}>
        Una vez que las API´s de las instituciones hayan superado las validaciones de seguridad, funcionalidad, y que se haya establecido la conexión con la PDN, las instituciones adquieren la responsabilidad de monitorear y en su caso, dar mantenimiento preventivo y correctivo a las mismas, además de garantizar niveles de servicio mínimos de acuerdo al siguiente documento:
      </Typography>

      <Typography className={classes.text} paragraph>
      <ButtonPDN href={url_doc} target='_blank' style={{ color: 'white' }}>
        Más información
      </ButtonPDN>
      </Typography>
      <br />
    </div>
  );
};

export default withStyles(styles)(ServiceAgreement);
