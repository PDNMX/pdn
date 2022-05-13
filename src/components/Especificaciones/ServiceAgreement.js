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
  }
});

const ServiceAgreement = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant='h5' paragraph>
        Niveles de servicio y protocolo de notificación de incidencias.
      </Typography>
      <Typography paragraph>
        Una vez que las API´s de las instituciones hayan superado las validaciones de seguridad, funcionalidad, y que se haya establecido la conexión con la PDN, las instituciones adquieren la responsabilidad de monitorear y en su caso, dar mantenimiento preventivo y correctivo a las mismas, además de garantizar niveles de servicio mínimos de acuerdo al siguiente documento:
      </Typography>

      <ButtonPDN href={url_doc} target='_blank'>
        Más información
      </ButtonPDN>
      <br />
    </div>
  );
};

export default withStyles(styles)(ServiceAgreement);
