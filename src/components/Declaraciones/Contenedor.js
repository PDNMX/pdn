import React from "react";

import Header from "./Header";
import Footer from "../Home/Footer";

import Busqueda from "./Busqueda";
import PerfilMaterialUI from "./PerfilMaterialUI";
import Stats from "./Estadisticas/Stats";

import { Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import classNames from "classnames";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import imgBuscar from "../../assets/declaraciones/servidores_declaraciones.svg";
import imgEstadisticas from "../../assets/declaraciones/estadisticas.svg";

//header data
import S3 from "../../assets/iconos_azul/1_icono.svg";
import background from "../../assets/img/pdn_sis1.jpeg";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

const titulo = "Declaraciones";
const copy =
  "Consulta y visualiza los datos <b>públicos</b> de las declaraciones patrimoniales, y de intereses, así como la constancia de declaración anual de impuestos de las y los servidores públicos.";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  whiteText: {
    color: "#fff", //theme.palette.titleBanner.color,
    color: theme.palette.textGrey.color,
    padding: "10px"
  },
  sectionT: {
    color: theme.palette.textGrey.color
  },
  image: {
    width: "60px",
    padding: 0,
    margin: 0,
    border: 0
  },
  bgContainer: {
    backgroundColor: "#34b3eb", //theme.palette.azul.color,
    backgroundColor: theme.palette.pestanas.bg
  },
  card: {
    backgroundColor: "#34b3eb", //theme.palette.azul.color,
    backgroundColor: theme.palette.pestanas.bg,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: 0
  },
  cardSeleccionada: {
    backgroundColor: "grey", //theme.palette.white.color,
    backgroundColor: theme.palette.pestanas.activa,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: 0
  },
  figure: {
    display: "inline-block",
    float: "left",
    margin: 0,
    padding: 0,
    paddingRight: "8px"
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  contenedor: {
    padding: "100px 50px"
  }
});

function AlertDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Plataforma Digital Nacional"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{ textAlign: "justify" }}
        >
          La información contenida en esta sección{" "}
          <span
            style={{
              fontWeight: "bold",
              backgroundColor: "red",
              color: "#FFF",
              padding: "3px 10px"
            }}
          >
            NO ES REAL
          </span>
          , fue generada de forma aleatoria y sirve unicamente para poder
          visualizar las diferentes funcionalidades propuestas para este
          sistema.
        </DialogContentText>
        <DialogContentText style={{ textAlign: "justify" }}>
          <b>
            El formato actual está basado en la última versión de las
            especificaciones técnicas publicadas en este sitio, mismas que
            fueron elaboradas bajo los últimos formatos publicados en el Diario
            Oficial de la Federación. Estos formatos actualmente se encuentran
            en revisión por el Comité Coordinador del Sistema Nacional
            Anticorrupción, por lo que estos no serán los formatos finales de la
            información.
          </b>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={props.handleClose}
          style={{ background: "#ffe01b" }}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

class Contenedor extends React.Component {
  state = {
    open: true
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={0} className={classes.root}>
        <Header logo={S3} titulo={titulo} copy={copy} background={background} />
        <Grid container spacing={0} className={classes.bgContainer}>
          <Grid item xs={12} style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Grid container spacing={0}>
              <Grid
                item
                md={6}
                xs={12}
                className={classNames(
                  !this.props.location.pathname.includes("estadistica")
                    ? classes.cardSeleccionada
                    : classes.card,
                  "tab"
                )}
              >
                <Link className={classes.link} to="/declaraciones">
                  <figure className={classes.figure}>
                    <img
                      alt="Buscar un servidor público"
                      src={imgBuscar}
                      className={classes.image}
                    />
                  </figure>
                  <Typography variant="subtitle1" className={classes.whiteText}>
                    Buscar un servidor público
                  </Typography>
                </Link>
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
                className={classNames(
                  this.props.location.pathname.includes("estadistica")
                    ? classes.cardSeleccionada
                    : classes.card,
                  "tab"
                )}
              >
                <Link className={classes.link} to="/declaraciones/estadisticas">
                  <figure className={classes.figure}>
                    <img
                      alt="Estadísticas"
                      src={imgEstadisticas}
                      className={classes.image}
                    />
                  </figure>
                  <Typography variant="subtitle1" className={classes.whiteText}>
                    Estadísticas
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* fin menu */}
        <Grid container spacing={0}>
          <Grid item xs={12} className={classes.sectionT}>
            <Switch>
              <Route exact path="/declaraciones" component={Busqueda} />
              <Route
                path="/declaraciones/perfil/:id?"
                component={PerfilMaterialUI}
              />
              <Route path="/declaraciones/estadisticas" component={Stats} />
            </Switch>
          </Grid>
        </Grid>
        <Footer />
        <AlertDialog open={this.state.open} handleClose={this.handleClose} />
      </Grid>
    );
  }
}

export default withStyles(styles)(Contenedor);
