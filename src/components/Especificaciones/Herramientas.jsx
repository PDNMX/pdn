import { Typography, Link } from '@mui/material'
import { withStyles } from 'tss-react/mui';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  ul: {
    listStyle: 'none',
    paddingLeft: '20px'
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
});

const Herramientas = props => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <Typography variant='h5' className={classes.title} sx={{
        marginBottom: "16px"
      }}>Desarrollo web</Typography>
      <Typography className={classes.text} sx={{
        marginBottom: "16px"
      }}>
        La interoperabilidad entre los sistemas informáticos de las Instituciones y la PDN se establece a través de servicios web o APIs que intercambian información a través de Internet.
      </Typography>
      <Typography className={classes.text} sx={{
        marginBottom: "16px"
      }}>
        La comunicación con la PDN se realiza a través de servicios basados en el modelo REST (REpresentational State Transfer), una tecnología ampliamente usada para el desarrollo de aplicaciones web.
      </Typography>
      <Typography className={classes.text} sx={{
        marginBottom: "16px"
      }}>
        Existe gran variedad de herramientas de código abierto que facilitan el desarrollo de APIs REST, usando diversos lenguajes de programación y tecnologías de bases de datos.
        No es posible proporcionar una lista exhaustiva, pero a continuación se citan algunos ejemplos:
      </Typography>
      <ul className={classes.ul}>
        <li className={classes.li}>
          <Link href='https://expressjs.com/' target='_blank' className={classes.link} rel='noreferrer' sx={{
            display: 'inline'
          }}>
            Express JS
          </Link>
          <Typography className={classes.text}>Lenguaje de programación: JavaScript</Typography>
        </li>
        <li className={classes.li}>
          <Link href='https://www.djangoproject.com/' target='_blank' className={classes.link} rel='noreferrer' sx={{
            display: 'inline'
          }}>
            Django
          </Link>
          <Typography className={classes.text}>Lenguaje de programación: Python</Typography>
        </li>
        <li className={classes.li}>
          <Link href='https://flask-restful.readthedocs.io/en/latest/quickstart.html' target='_blank' className={classes.link} rel='noreferrer' sx={{
            display: 'inline'
          }}>
            Flask
          </Link>
          <Typography className={classes.text}>Lenguaje de programación: Python</Typography>
        </li>
        <li className={classes.li}>
          <Link href='https://spring.io/guides/gs/rest-service/' target='_blank' className={classes.link} rel='noreferrer' sx={{
            display: 'inline'
          }}>
            Spring
          </Link>
          <Typography className={classes.text}>Lenguaje de programación: Java</Typography>
        </li>
        <li className={classes.li}>
          <Link href='https://www.microsoft.com/net/learn/dotnet/hello-world-tutorial' target='_blank' className={classes.link} rel='noreferrer' sx={{
            display: 'inline'
          }}>
            .NET Core
          </Link>
          <Typography className={classes.text}>Lenguajes de programación: C#, Visual Basic, F# </Typography>
        </li>
        <li className={classes.li}>
          <Link href='https://apigility.org/' target='_blank' className={classes.link} rel='noreferrer' sx={{
            display: 'inline'
          }}>
            Apigility
          </Link>
          <Typography className={classes.text}>
            Lenguaje de programación: PHP
          </Typography>
        </li>
      </ul>
    </div>
  );
}

export default withStyles(Herramientas, styles);
