import { Link, Typography } from '@mui/material';
import MuiLink from '@mui/material/Link';

import makeStyles from '@mui/styles/makeStyles';
import ButtonPDN from '../Compartidos/ButtonPDN';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.linkColor,
    wordBreak: 'break-all'
  },
  ul: {
    listStyle: 'none'
    //paddingLeft: '20px'
  },
  li: {
    '&:before': {
      content: '"•"',
      color: '#5fb1e6',
      fontWeight: 'bold',
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em'
    }
  }
}));

const planesPrueba = [
  {
    id: 1,
    nombre: 'Plan de Pruebas S1',
    url: 'https://drive.google.com/open?id=1HZailvIOV77By1JwQKWXGTungYRBFmHi'
  },
  {
    id: 2,
    nombre: 'Plan de Pruebas S2',
    url: 'https://drive.google.com/file/d/1ooAuvc1kNMiftE_R1yRglC6OK9bIIx8U/view'
  },
  {
    id: 3,
    nombre: 'Plan de Pruebas S3',
    url: 'https://drive.google.com/drive/folders/163iT_uFwHbx86maYOa-gyCtRvRD61rpo'
  },
];

export default function ProtocoloConexion() {
  const classes = useStyles();

  return (
    <div>
      <Typography sx={{
        marginBottom: "16px"
      }}>La Plataforma Digital Nacional (PDN) basa su funcionamiento en el uso de APIs, por medio de las cuales, se comunica con sus proveedores de información para obtener exclusivamente los datos necesarios.</Typography>
      <Typography sx={{
        marginBottom: "16px"
      }}>
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
      <Typography sx={{
        marginBottom: "16px"
      }}>Asimismo, el proceso de conexión con la PDN contempla un protocolo para verificar el funcionamiento de las APIs, mismo que consiste en la ejecución de conjuntos de pruebas para cada Sistema de la PDN. Cada conjunto de pruebas se divide a su vez en tres categorías:</Typography>
      <ul>
        <li>Pruebas de seguridad;</li>
        <li>Pruebas funcionales; y</li>
        <li>Pruebas de estrés.</li>
      </ul>
      <Typography sx={{
        marginBottom: "16px"
      }}>Estas pruebas se ejecutan en dos ambientes: 1) desarrollo y 2) productivo. En cada uno de ellos, se verifica el funcionamiento de la API, usando datos sintéticos (falsos) y reales (omitiendo datos reservados) de manera correspondiente.</Typography>
      <Typography>Las pruebas para la verificación de las APIs, se encuentran descritas en documentos denominados Planes de pruebas, que podrás encontrar en la sección de Especificaciones de cada uno de los Sistemas de la PDN.</Typography>
      {planesPrueba.map(plan => (
        <ButtonPDN key={plan.id} href={plan.url} target='_blank'>
          {plan.nombre}
        </ButtonPDN>
      ))}
      <Typography sx={{
        marginBottom: "16px"
      }}>En caso de que los resultados no sean aprobatorios, se notificará a la institución para que realice los ajustes necesarios y solicite una nueva revisión.</Typography>
      <Typography sx={{
        marginBottom: "16px"
      }}>
        Como apoyo para verificar el cumplimiento de los esquemas de datos de las diferentes APIs, ponemos a su disposición un{' '}
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
    </div>
  );
}
