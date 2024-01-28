import { withStyles } from '@mui/styles'
import { Typography, Link } from '@mui/material'
import Grid from '@mui/material/Grid'
import ModeloComunicacion from '../ModeloComunicacion'

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  diagrama: {
    maxWidth: 900
  },
  ul: {
    listStyle: 'none',
    paddingLeft: '20px'
    // color: theme.palette.text.primary
  },
  li: {
    '&:before': {
      content: '"•"',
      color: '#7A3D71',
      fontWeight: 'bold',
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em'
    },
    paddingBottom: theme.spacing(1)
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.linkColor,
    wordBreak: 'break-word'
  },
  text: {
    color: theme.palette.text.primary,
    textAlign: 'justify'
  },
  title: {
    color: theme.palette.primary.main
  }
})

const Implementacion = props => {
  const { classes } = props
  return (
    <div className={classes.root}>

      <Grid container spacing={0}>

        <Grid item xs={12}>
          <Typography variant='h5' className={classes.title} paragraph>Implementación del estándar</Typography>
          <Typography paragraph className={classes.text}>
            La implementación del estándar de Datos de Servidores
            Públicos que Intervienen en Contrataciones representará esfuerzos de diferente magnitud
            dependiendo del nivel de adopción tecnológica de cada Institución. Suponiendo que una cierta
            Institución ya cuenta con un sistema de captura de Servidores
            Públicos que Intervienen en Contrataciones, el proceso de implementación
            del API de  de Servidores Públicos que Intervienen en Contrataciones puede ser dividido en los siguientes pasos:
          </Typography>

          <ul className={classes.ul}>
            <li className={classes.li}>
              <Typography paragraph className={classes.text} display='inline'>
                <b>Diagnóstico:</b> Revisar y comparar los datos contenidos en su base de datos con
                los especificados en <Link className={classes.link} target='_blank' href='https://docs.google.com/spreadsheets/d/1fRhDfHtrBPYyR36zxpenXWind9FP1pLAQJOVS69QwUM/edit?usp=sharing' rel='noopener noreferrer'> Diccionario de Datos del Formato de Datos de Servidores Públicos que Intervienen en Contrataciones </Link>, es importante contar con todos los datos solicitados
                en el nuevo formato, sin embargo, esto no imposibilita a las Instituciones para realizar pruebas de adopción del estándar usando los datos con los que se cuenta.
              </Typography>
            </li>
            <li className={classes.li}>
              <Typography paragraph className={classes.text} display='inline'>
                <b>Diseño de arquitectura:</b> Se deberá evaluar las capacidades del sistema de información o base de datos de Servidores
                Públicos que Intervienen en Contrataciones, a fin de diagnosticar su capacidad para soportar la carga de trabajo actual y al mismo tiempo la tarea de resolver las consultas que serán realizadas por la PDN a través del API.
                <br />
                En el caso de contar con gran cantidad de usuarios y como medida de seguridad, se recomienda implementar alguna solución de replicación de la información en el sistema de base de datos; de tal manera que se divida la carga de trabajo en dos o más bases de datos.
              </Typography>
            </li>
            <li className={classes.li}>
              <Typography paragraph className={classes.text} display='inline'>
                <b>Desarrollo:</b> El desarrollo del API de Servidores Públicos que Intervienen en Contrataciones podrá realizarse en el lenguaje de programación que se considere más apropiado con apego a las especificaciones que se proporcionan en las siguientes secciones de la presente guía. Dichas especificaciones son agnósticas a la tecnología, es decir, el resultado de la comunicación deberá ser el mismo, siempre que se respeten las reglas, formatos de datos y la sintaxis de los mensajes.
              </Typography>
            </li>
          </ul>
        </Grid>
        <ModeloComunicacion />
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Implementacion)
