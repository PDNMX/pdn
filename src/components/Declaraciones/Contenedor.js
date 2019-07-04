import React from "react";

import Header from "./Header";
import Footer from "./Footer";

import Busqueda from "./Busqueda";
import PerfilMaterialUI from "./PerfilMaterialUI";
import Stats from "./Stats";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";

import "./style.css";

// MATERIAL UI THEME STUFF
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

//header data
import S3 from "../../assets/iconos_azul/1_icono.svg";
import background from "../../assets/img/pdn_sis1.jpeg";

const titulo = "Declaraciones";
const copy =
  "Consulta, visualiza y descarga los datos de las declaraciones patrimoniales, de intereses y las constancias de la declaración fiscal de los servidores públicos.";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#34b3eb",
      contrastText: "white"
    },
    secondary: {
      main: grey[500]
    }
  }
});

class Contenedor extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Header
            logo={S3}
            titulo={titulo}
            copy={copy}
            background={background}
          />
          <section className="pdn_sis_nav">
            <div className="container">
              <Grid container spacing={1}>
                <Grid item sm={12}>
                  <ul className="pdn_cont_nav">
                    <li
                      className={
                        !this.props.location.pathname.includes("estadistica")
                          ? "current"
                          : ""
                      }
                    >
                      <a href={`${process.env.PUBLIC_URL}/declaraciones`}>
                        <figure>
                          <img
                            src={`${
                              process.env.PUBLIC_URL
                            }/img/servidores_declaraciones.svg`}
                            width="60px"
                            alt=""
                          />
                        </figure>
                        Buscar un servidor público
                      </a>
                    </li>
                    <li
                      className={
                        this.props.location.pathname.includes("estadistica")
                          ? "current"
                          : ""
                      }
                    >
                      <a
                        href={`${
                          process.env.PUBLIC_URL
                        }/declaraciones/estadistica/edad`}
                      >
                        <figure>
                          <img
                            src={`${
                              process.env.PUBLIC_URL
                            }/img/estadisticas.svg`}
                            width="60px"
                            alt=""
                          />
                        </figure>
                        Estadísticas
                      </a>
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </div>
          </section>
          <section className="pdn_m">
            <div className="container">
              <Switch>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/declaraciones`}
                  component={Busqueda}
                />
                <Route
                  path={`${
                    process.env.PUBLIC_URL
                  }/declaraciones/perfil/:id/:section/:subsection?`}
                  component={PerfilMaterialUI}
                />
                <Route
                  path={`${
                    process.env.PUBLIC_URL
                  }/declaraciones/estadistica/:section`}
                  component={Stats}
                />
              </Switch>
            </div>
          </section>
          <Footer />
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default Contenedor;
