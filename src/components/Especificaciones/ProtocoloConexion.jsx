import { Typography } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
// import IconButton from '@mui/material/IconButton';
// import GetAppIcon from '@mui/icons-material/GetApp';
import withStyles from "@mui/styles/withStyles";
import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import ButtonPDN from "../Compartidos/ButtonPDN";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.linkColor,
    wordBreak: "break-word",
  },
  ul: {
    listStyle: "none",
    paddingLeft: "20px",
    color: theme.palette.primary.contrastText,
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
  text: {
    color: theme.palette.text.primary,
    textAlign: "justify",
  },
  title: {
    color: theme.palette.primary.main,
  },
});

const ProtocoloConexion = (props) => {
  const { classes } = props;
  const { urlPlan } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title} sx={{
        marginBottom: "16px"
      }}>
        Protocolo de conexión
      </Typography>
      {/* Descripción principal */}
      <Typography variant="body1" sx={{
        marginBottom: "16px"
      }}>
        La Plataforma Digital Nacional (PDN) opera mediante el uso de APIs, a
        través de las cuales se comunica con sus proveedores de información para
        obtener exclusivamente los datos necesarios.
      </Typography>
      {/* Pasos para las instituciones */}
      <Typography variant="body1" sx={{
        marginBottom: "16px"
      }}>
        Las instituciones públicas interesadas en convertirse en proveedores de
        información para la PDN deben:
      </Typography>
      <List sx={{ listStyle: "number", pl: 4 }}>
        <ListItem sx={{ display: "list-item", color: "#713972" }}>
          <ListItemText primary="Configurar sus APIs de acuerdo con las Especificaciones Técnicas establecidas para cada Sistema." />
        </ListItem>
        <ListItem sx={{ display: "list-item", color: "#713972" }}>
          <ListItemText
            primary={
              <>
                Enviar la solicitud de conexión a la USTPDN al correo{" "}
                <MuiLink href="mailto:pdn@sesna.gob.mx" underline="hover">
                  pdn@sesna.gob.mx
                </MuiLink>
                .
              </>
            }
          />
        </ListItem>
      </List>
      {/* Opciones de conexión */}
      <Typography variant="body1" sx={{
        marginBottom: "16px"
      }}>
        La Solicitud de Conexión se podrá realizar a través de dos opciones:
      </Typography>
      <List sx={{ listStyleType: "disc", pl: 4 }}>
        <ListItem sx={{ display: "list-item", color: "#713972" }}>
          <Typography variant="body1">
            <MuiLink
              href="https://docs.google.com/document/d/1hgyXtQS6UCWsr2slVfdegjSXHtGPcg6w/edit?usp=sharing&ouid=101622192735279312244&rtpof=true&sd=true"
              target="_blank"
              rel="noopener"
              underline="hover"
            >
              Formato de solicitud de conexión a la Plataforma Digital Nacional
              a través de servicio web API
            </MuiLink>
            : Para aquellas instituciones que elijan establecer una conexión
            directa a las APIs.
            <MuiLink
              href="https://drive.google.com/file/d/11IgN0xD7eL7e518XQY_oS5h0SFS8k88r/view?usp=sharing"
              target="_blank"
              rel="noopener"
              underline="hover"
            >
              {" "}
              Consulte la guía de llenado.
            </MuiLink>
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "list-item", color: "#713972" }}>
          <Typography variant="body1">
            <MuiLink
              href="https://docs.google.com/document/d/1KTQodfsfH2wJEgk4Ldj0LS6_s9yWgyzJ/edit?usp=sharing&ouid=101622192735279312244&rtpof=true&sd=true"
              target="_blank"
              rel="noopener"
              underline="hover"
            >
              Formato de solicitud de conexión a la Plataforma Digital Nacional
              por servicio web API mediante la Red Virtual Privada (VPN)
            </MuiLink>
            : Para aquellas instituciones que opten por establecer una conexión
            de la API con una VPN.
            <MuiLink
              href="https://drive.google.com/file/d/1M9K7TWEw7klIXwshm66FqpjxhGXWGbgh/view?usp=sharing"
              target="_blank"
              rel="noopener"
              underline="hover"
            >
              {" "}
              Consulte la guía de llenado.
            </MuiLink>
          </Typography>
        </ListItem>
      </List>
      <Typography className={classes.text} sx={{
        marginBottom: "16px"
      }}>
        Asimismo, el proceso de conexión con la PDN contempla un protocolo para
        verificar el funcionamiento de las APIs, mismo que consiste en la
        ejecución de conjuntos de pruebas para cada Sistema de la PDN. Cada
        conjunto de pruebas se divide a su vez en tres categorías:
      </Typography>
      <ul>
        <li className={classes.li}>
          <Typography className={classes.title} variant="h6" sx={{
            display: "inline"
          }}>
            Pruebas de seguridad;
          </Typography>
        </li>
        <li className={classes.li}>
          <Typography className={classes.title} variant="h6" sx={{
            display: "inline"
          }}>
            Pruebas funcionales;
          </Typography>
        </li>
        <li className={classes.li}>
          <Typography className={classes.title} variant="h6" sx={{
            display: "inline"
          }}>
            Pruebas de estrés;
          </Typography>
        </li>
      </ul>
      <Typography className={classes.text} sx={{
        marginBottom: "16px"
      }}>
        Estas pruebas se ejecutan en dos ambientes: 1) desarrollo y 2)
        productivo. En cada uno de ellos, se verifica el funcionamiento de la
        API, usando datos sintéticos (falsos) y reales (omitiendo datos
        reservados) de manera correspondiente.
      </Typography>
      <Typography className={classes.text}>
        Las pruebas para la verificación de las APIs, se encuentran descritas en
        documentos denominados Planes de pruebas, que podrás encontrar en el
        siguiente enlace.
      </Typography>
      <p />
      {Array.isArray(urlPlan) ? (
        urlPlan.map((url) => {
          console.log(url);
          return (
            <ButtonPDN
              href={url.url}
              target="_blank"
              key="btn-ProtocoloConexion"
            >
              {url.nombre}
            </ButtonPDN>
          );
        })
      ) : (
        <ButtonPDN href={urlPlan} target="_blank" style={{ color: "white" }}>
          Plan de pruebas
        </ButtonPDN>
      )}
      <p />
      <Typography className={classes.text} sx={{
        marginBottom: "16px"
      }}>
        En caso de que los resultados no sean aprobatorios, se notificará a la
        institución para que realice los ajustes necesarios y solicite una nueva
        revisión.
      </Typography>
      <Typography className={classes.text} sx={{
        marginBottom: "16px"
      }}>
        Como apoyo para poder verificar el cumplimiento de los esquemas de datos
        de las diferentes API&apos;s, ponemos a su disposición un {""}
        <Link to="/validador" className={classes.link}>
          Validador
        </Link>
        .
      </Typography>
      <Typography className={classes.text}>
        Asimismo, te invitamos a probar{" "}
        <MuiLink href="/validapi/" target="_blank" className={classes.link}>
          ValidAPI
        </MuiLink>{" "}
        una aplicación web que te permitirá ejecutar de manera automatizada las
        validaciones de seguridad y de funcionalidad incluidas en los planes de
        pruebas de los sistemas 1, 2 y 3; recibiendo retroalimentación de una
        forma rápida. Esta herramienta se encuentra en una etapa de pilotaje,
        por lo que el resultado obtenido debe considerarse una prevalidación y
        no como un resultado final.
      </Typography>
      {/* <ButtonPDN to='/validador' component={Link}>
        Validador
      </ButtonPDN> */}
      <br />
    </div>
  );
};

export default withStyles(styles)(ProtocoloConexion);
