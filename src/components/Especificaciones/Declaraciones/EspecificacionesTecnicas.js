import { Link, Typography } from '@mui/material';
import React from 'react';
import withStyles from '@mui/styles/withStyles';
import ButtonPDN from "../../Compartidos/ButtonPDN";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  ul: {
    listStyle: 'none',
    paddingLeft: '20px',
    color: theme.palette.primario.contrastText
  },
  li: {
    '&:before': {
      content: '"•"',
      color: '#5fb1e6',
      fontWeight: 'bold',
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em'
    },
    'paddingBottom': theme.spacing(1)
  },
});

class EspecificacionesTecnicas extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant='h4' paragraph>
          Especificaciones técnicas
        </Typography>

        <Typography paragraph variant='h5'>
          Diccionario de datos
        </Typography>

        <Typography paragraph>
          <ButtonPDN  target='_blank' href='https://docs.google.com/spreadsheets/d/19Kyq46YwJk9wM7znYLQdLEKfAF8jTF4WmGJINXd9Lwg/edit?ts=5d88f08f#gid=0' variant='contained'>
            Más información
          </ButtonPDN>
        </Typography>

        <Typography paragraph variant='h5'>
          Catálogos de códigos y valores
        </Typography>

        <Typography paragraph>
          <ButtonPDN  target='_blank'  href='https://github.com/PDNMX/catalogos/tree/master/S1%20-%20Declaraciones'>
            Más información
          </ButtonPDN>
        </Typography>

        <Typography paragraph variant='h5'>
          Especificaciones en formato Open API Specification
        </Typography>

        <ul className={classes.ul}>
          <li className={classes.li}>
            <Link href='https://www.plataformadigitalnacional.org/oas/ui/?urls.primaryName=S1%20-%20Inicial' target='_blank'>
              <b>Formato de inicio</b>
            </Link>
          </li>
          <li className={classes.li}>
            <Link href='https://www.plataformadigitalnacional.org/oas/ui/?urls.primaryName=S1%20-%20Modificaci%C3%B3n' target='_blank'>
              <b>Formato de modificación</b>
            </Link>
          </li>
          <li className={classes.li}>
            <Link href='https://www.plataformadigitalnacional.org/oas/ui/?urls.primaryName=%20S1%20-%20Conclusi%C3%B3n' target='_blank'>
              <b>Formato de conclusión</b>
            </Link>
          </li>
        </ul>

        <Typography paragraph variant='h5'>
          Seguridad
        </Typography>
        <Typography paragraph>
          <ButtonPDN  target='_blank'  href='https://drive.google.com/file/d/1-IvF3KYa5rups73BmVV4W8glT9csVGY9/view'>
            Más información
          </ButtonPDN>
        </Typography>

        <Typography paragraph variant='h5'>
          Versionado
        </Typography>
        <Typography paragraph>
          <ButtonPDN  target='_blank' href='https://drive.google.com/file/d/1xIPoMa-xKlCi9OZs_Uc7ffvANImaKWnK/view'>
            Más información
          </ButtonPDN>
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(EspecificacionesTecnicas);
