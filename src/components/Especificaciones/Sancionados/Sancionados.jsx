// Sancionados.jsx
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";
import Estandar from "./DescripcionEstandar";
import Licencia from "../Licencia";
import Implementacion from "./Implementacion";
import { Typography, Paper, Box, Grid, Divider } from "@mui/material";
import Herramientas from "../Herramientas";
import pdnRoutes from "../../../routes";
import HeaderV2 from "../../HomeV2/HeaderV2";
import ProtocoloConexion from "../ProtocoloConexion";
import ServiceAgreement from "../ServiceAgreement";
import RecursosTecnicos from "./RecursosTecnicos";

const styles = (theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  item: {
    maxWidth: 1200,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  container: {
    background: "#fff",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  ul: {
    listStyle: "none",
    paddingLeft: "20px",
    color: theme.palette.text.primary,
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
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(2),
  },
  rootItem: {
    maxWidth: "1200px",
    padding: theme.spacing(1),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  paper: {
    backgroundColor: theme.palette.background.opaque,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.palette.background.border,
    borderRadius: "10px 10px 10px 10px",
    display: "flex",
    justifyContent: "center",
  },
  box: {
    maxWidth: "900px",
    paddingTop: "50px",
    paddingBottom: "50px",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.linkColor,
    wordBreak: "break-word",
  },
  text: {
    color: theme.palette.text.primary,
    textAlign: "justify",
  },
  title: {
    color: theme.palette.primary.main,
  },
});

const protocolos = [
  { nombre: 'Planes de Prueba', url: 'https://drive.google.com/drive/folders/163iT_uFwHbx86maYOa-gyCtRvRD61rpo' }
];

const Sancionados = (props) => {
  const { classes } = props;
  const section = pdnRoutes.find(
    (route) => route.path === "/especificaciones/s3"
  );

  return (
    <div className={classes.root}>
      <HeaderV2 section={section} />
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={12} className={classes.rootItem}>
          <Paper className={classes.paper} elevation={15}>
            <Box className={classes.box}>
              <Estandar />

              <Divider className={classes.divider} />

              <Implementacion />

              <Divider className={classes.divider} />

              <RecursosTecnicos classes={classes} />

              <ProtocoloConexion urlPlan={protocolos} />

              <Divider className={classes.divider} />

              <ServiceAgreement />

              <Divider className={classes.divider} />

              <Licencia />

              <Divider className={classes.divider} />

              <Herramientas />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

Sancionados.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sancionados);
