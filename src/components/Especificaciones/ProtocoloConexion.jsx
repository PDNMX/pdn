import React from 'react';
import { Typography } from '@mui/material';
//import IconButton from '@mui/material/IconButton';
//import GetAppIcon from '@mui/icons-material/GetApp';
import withStyles from '@mui/styles/withStyles';
import { Link } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import ButtonPDN from '../Compartidos/ButtonPDN';

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

const ProtocoloConexion = props => {
  const { classes } = props;
  const { urlPlan } = props;
  return (
    <div className={classes.root}>
      <Typography variant='h5' paragraph>
        Protocolo de conexión
      </Typography>
      <Typography paragraph>La Plataforma Digital Nacional (PDN) basa su funcionamiento en el uso de APIs, por medio de las cuales, se comunica con sus proveedores de información para obtener exclusivamente los datos necesarios.</Typography>

      <Typography paragraph>
        Las Instituciones públicas interesadas en ser proveedores de información de la PDN deben establecer sus APIs de acuerdo con las{' '}
        <Link to='/especificaciones' className={classes.link}>
          Especificaciones técnicas
        </Link>{' '}
        para cada Sistema y solicitar a la USTPDN, el inicio del proceso de conexión con la PDN a través del envío del{' '}
        <MuiLink href='https://drive.google.com/file/d/1ANQG3f1Q7aO4soQR9__2FvHEi_-UwvBe/view' target='_blank' className={classes.link}>
          Formato de solicitud de conexión
        </MuiLink>{' '}
        a través del correo pdn@sesna.gob.mx.
      </Typography>

      <Typography paragraph>Asimismo, el proceso de conexión con la PDN contempla un protocolo para verificar el funcionamiento de las APIs, mismo que consiste en la ejecución de conjuntos de pruebas para cada Sistema de la PDN. Cada conjunto de pruebas se divide a su vez en tres categorías:</Typography>
      <ul>
        <li>Pruebas de seguridad;</li>
        <li>Pruebas funcionales; y</li>
        <li>Pruebas de estrés.</li>
      </ul>

      <Typography paragraph>Estas pruebas se ejecutan en dos ambientes: 1) desarrollo y 2) productivo. En cada uno de ellos, se verifica el funcionamiento de la API, usando datos sintéticos (falsos) y reales (omitiendo datos reservados) de manera correspondiente.</Typography>

      <Typography>Las pruebas para la verificación de las APIs, se encuentran descritas en documentos denominados Planes de pruebas, que podrás encontrar en el siguiente enlace.</Typography>
      {Array.isArray(urlPlan) ? (
        urlPlan.map(url => {
          console.log(url);
          return (
            <ButtonPDN href={url.url} target='_blank'>
              {url.nombre}
            </ButtonPDN>
          );
        })
      ) : (
        <ButtonPDN href={urlPlan} target='_blank'>
          Plan de pruebas
        </ButtonPDN>
      )}

      <Typography paragraph>En caso de que los resultados no sean aprobatorios, se notificará a la institución para que realice los ajustes necesarios y solicite una nueva revisión.</Typography>

      <Typography paragraph>
        Como apoyo para verificar el cumplimiento de los esquemas de datos de las diferentes API 's, ponemos a su disposición un{' '}
        <Link to='/validador' className={classes.link}>
          Validador
        </Link>
        .
      </Typography>

      <Typography>
        Asimismo, te invitamos a probar{' '}
        <MuiLink href='https://www.plataformadigitalnacional.org/validapi/' target='_blank' className={classes.link}>
          ValidAPI
        </MuiLink>{' '}
        una aplicación web que te permitirá ejecutar de manera automatizada las validaciones de seguridad y de funcionalidad incluidas en los planes de pruebas de los sistemas 1, 2 y 3; recibiendo retroalimentación de una forma rápida. Esta herramienta se encuentra en una etapa de pilotaje, por lo que el resultado obtenido debe considerarse una prevalidación y no como un resultado final.
      </Typography>

      {/* <ButtonPDN to='/validador' component={Link}>
        Validador
      </ButtonPDN> */}
      <br />
    </div>
  );
};

export default withStyles(styles)(ProtocoloConexion);
