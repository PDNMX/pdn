import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { Typography, Link, Box, Paper, Grid } from "@mui/material";
import ModeloComunicacion from "../ModeloComunicacion";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  diagrama: {
    maxWidth: 900,
  },
  ul: {
    listStyle: "none",
    paddingLeft: "20px",
  },
  li: {
    "&:before": {
      content: '"•"',
      color: "#7A3D71",
      fontWeight: "bold",
      display: "inline-block",
      width: "1em",
      marginLeft: "-1em",
    },
    paddingBottom: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.linkColor,
    wordBreak: "break-word",
    display: "block",
    padding: theme.spacing(1.5),
    fontSize: "0.9rem",
  },
  text: {
    color: theme.palette.text.primary,
    textAlign: "justify",
  },
  title: {
    color: theme.palette.primary.main,
  },
  stepTitle: {
    display: "inline-block",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  formatSection: {
    marginBottom: theme.spacing(2),
  },
  formatTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1.5),
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
    fontWeight: "medium",
  },
  linksContainer: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(2),
  },
  linkItem: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    transition: "background-color 0.2s ease-in-out",
    "&:last-child": {
      borderBottom: "none",
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
});

const formatosLinks = {
  servidoresPublicos: [
    {
      title: "Sanciones firmes por faltas administrativas graves",
      url:
        "https://docs.google.com/spreadsheets/d/1HIFQpR1O26c2rjYKATm15-0AsxyyPn1JOSwHfKQ29Tk/edit?gid=507089592#gid=507089592",
    },
    {
      title: "Sanciones firmes por faltas administrativas no graves",
      url:
        "https://docs.google.com/spreadsheets/d/1HIFQpR1O26c2rjYKATm15-0AsxyyPn1JOSwHfKQ29Tk/edit?gid=1952845386#gid=1952845386",
    },
  ],
  particulares: [
    {
      title: "Sanciones firmes a personas físicas",
      url:
        "https://docs.google.com/spreadsheets/d/1HIFQpR1O26c2rjYKATm15-0AsxyyPn1JOSwHfKQ29Tk/edit?gid=2049381043#gid=2049381043",
    },
    {
      title: "Sanciones firmes a personas morales",
      url:
        "https://docs.google.com/spreadsheets/d/1HIFQpR1O26c2rjYKATm15-0AsxyyPn1JOSwHfKQ29Tk/edit?gid=521740190#gid=521740190",
    },
  ],
};

const FormatSection = ({ title, links, classes }) => (
  <div className={classes.linksContainer}>
    <Typography variant="subtitle1" className={classes.formatTitle}>
      {title}
    </Typography>
    {links.map((link, index) => (
      <div key={index} className={classes.linkItem}>
        <Link
          className={classes.link}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.title}
        </Link>
      </div>
    ))}
  </div>
);

const Implementacion = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          {" "}
          <Typography variant="h5" className={classes.title} paragraph>
            Procedimiento de implementación del estándar
          </Typography>
          <Typography paragraph className={classes.text}>
            La implementación del Estándar para la Interoperabilidad de datos de
            Servidores Públicos y Particulares Sancionados requiere un enfoque
            sistemático que variará según el nivel de madurez tecnológica de
            cada Institución. A continuación se detallan los pasos esenciales:
          </Typography>
          <ul className={classes.ul}>
            <li className={classes.li}>
              <Typography component="span" className={classes.stepTitle}>
                Diagnóstico:
              </Typography>
              <Typography paragraph className={classes.text}>
                Revisar y comparar los datos del sistema actual con los
                requeridos por el nuevo estándar. Consultar los siguientes
                formatos oficiales:
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormatSection
                    title="Servidores Públicos"
                    links={formatosLinks.servidoresPublicos}
                    classes={classes}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormatSection
                    title="Particulares Sancionados"
                    links={formatosLinks.particulares}
                    classes={classes}
                  />
                </Grid>
              </Grid>

              <Typography
                paragraph
                className={classes.text}
                style={{ marginTop: "24px" }}
              >
                Si bien es importante disponer de todos los campos requeridos,
                la ausencia de algunos datos no impide iniciar las pruebas de
                adopción del estándar. Es recomendable comenzar la
                implementación con los datos disponibles mientras se trabaja en
                completar la información faltante.
              </Typography>
            </li>

            <li className={classes.li}>
              <Typography component="span" className={classes.stepTitle}>
                Diseño de arquitectura:{" "}
              </Typography>
              <Typography paragraph className={classes.text}>
                Es necesario evaluar la capacidad de la infraestructura actual
                para mantener la operación normal del sistema y gestionar las
                consultas adicionales de la PDN, garantizando tiempos de
                respuesta óptimos. Para sistemas con alto volumen de usuarios,
                es recomendable implementar una estrategia de replicación de
                datos para distribuir la carga de trabajo entre múltiples bases
                de datos.
              </Typography>
            </li>

            <li className={classes.li}>
              <Typography component="span" className={classes.stepTitle}>
                Desarrollo:{" "}
              </Typography>
              <Typography paragraph className={classes.text}>
                El desarrollo del API puede realizarse en cualquier lenguaje de
                programación, siempre que se respeten las especificaciones
                técnicas detalladas en esta guía. Las especificaciones son
                tecnológicamente agnósticas, lo que permite garantizar la
                correcta comunicación y formato de datos, independientemente de
                las herramientas utilizadas.
              </Typography>
            </li>
          </ul>
        </Grid>
        <ModeloComunicacion />
      </Grid>
    </div>
  );
};

Implementacion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Implementacion);
