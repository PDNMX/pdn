import React from "react";

import Header from "./Header";
import Footer from "./Footer";

import Busqueda from "./Busqueda";
import PerfilMaterialUI from "./PerfilMaterialUI";
import Stats from "./Stats";

import {  Route, Switch } from "react-router-dom";
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

const titulo = "Declaraciones";
const copy =
  "Consulta, visualiza y descarga los datos de las declaraciones patrimoniales, de intereses y las constancias de la declaración fiscal de los servidores públicos.";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  whiteText: {
    color: "#fff", //theme.palette.titleBanner.color,
    padding: "17px"
  },
  bgPanelTable: {
    backgroundColor: theme.palette.white.color,
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(30)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(10)
    }
  },
  section: {
    // maxWidth: "1200px"
  },
  sectionT: {
    // maxWidth: "1200px",
    overflowX: "auto",
    color: theme.palette.textGrey.color
  },
  image: {
    width: "60px",
    padding: 0,
    margin: 0,
    border: 0
  },
  bgContainer: {
    backgroundColor: "#34b3eb" //theme.palette.azul.color,
  },
  links: {
    backgroundColor: theme.palette.grisTenue.color
  },
  card: {
    backgroundColor: "#34b3eb", //theme.palette.azul.color,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: 0
  },
  cardSeleccionada: {
    backgroundColor: "grey", //theme.palette.white.color,
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

class Contenedor extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header
          logo={S3}
          titulo={titulo}
          copy={copy}
          background={background}
        />
        <Grid container spacing={0} className={classes.bgContainer}>
          <Grid item xs={12} className={classes.section}>
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
                  <Typography
                    variant="subtitle1"
                    className={classes.whiteText}
                  >
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
                <Link
                  className={classes.link}
                  to="/declaraciones/estadistica/edad"
                >
                  <figure className={classes.figure}>
                    <img
                      alt="Estadísticas"
                      src={imgEstadisticas}
                      className={classes.image}
                    />
                  </figure>
                  <Typography
                    variant="subtitle1"
                    className={classes.whiteText}
                  >
                    Estadísticas
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* fin menu */}
        <Grid container spacing={0}>
          <Grid item xs={12} className={classes.contenedor}>
            <Switch>
              <Route exact path="/declaraciones" component={Busqueda} />
              <Route
                path="/declaraciones/perfil/:id/:section/:subsection?"
                component={PerfilMaterialUI}
              />
              <Route
                path="/declaraciones/estadistica/:section"
                component={Stats}
              />
            </Switch>
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(Contenedor);
