/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";

import Informacion from "./Informacion/Informacion";
import Pasivos from "./Pasivos";
import Intereses from "./Intereses";
import Activos from "./Activos";
import Ingresos from "./Ingresos";

import JSONButton from "./single-components/json-button";

import email from "../../assets/declaraciones/cbimage.svg";
import MenuSuperior from "./MenuSuperior";

import { withStyles } from "@material-ui/core/styles";

/*
import Ingresos from "./Ingresos";
*/

import * as ConstClass from "./ConstValues.js";
import { Typography } from "@material-ui/core";

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  h1: {
    fontSize: 21,
    fontWeight: 700
  },
  mail: {
    fontSize: 11,
    color: "#c6c6c6",
    paddingLeft: 21,
    marginBottom: 20
  },
  titulo: {
    fontSize: 12,
    color: "#c6c6c6"
  },
  contenido: {
    fontSize: 14,
    color: "#313233",
    fontWeight: 500,
    marginBottom: 20
  }
});

/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class PerfilMaterialUI extends Component {
  /*
   * C O N S T R U C T O R
   * ----------------------------------------------------------------------
   */
  constructor(props) {
    super(props);
    this.state = {
      profile: null
    };

    this.getProfile = this.getProfile.bind(this);
    this.ingresosAnualesNetos = this.ingresosAnualesNetos.bind(this);

    this.getProfile(this.props.match.params.id);

    // console.log(this.props);
  }

  /*
   * R E N D E R
   * ----------------------------------------------------------------------
   */

  render() {
    if (!this.state.profile) {
      // console.log("nel");
      return null;
    }

    // shortcut para el valor de la sección
    // let section = this.props.match.params.section;
    let { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <img
                  alt="avatar2"
                  src={`${process.env.PUBLIC_URL}/img/avatar.svg`}
                  style={{ width: "100%", margin: "0 auto" }}
                />
              </Grid>
              <Grid item xs={8} style={{ fontSize: 21 }}>
                <Typography className={classes.h1}>
                  {
                    this.state.profile.informacion_personal.informacion_general
                      .nombres
                  }{" "}
                  {
                    this.state.profile.informacion_personal.informacion_general
                      .primer_apellido
                  }{" "}
                  {
                    this.state.profile.informacion_personal.informacion_general
                      .segundo_apellido
                  }
                </Typography>
                <img alt="email" src={email} style={{ width: 18, float: "left" }} />
                <Typography className={classes.mail}>
                  {
                    this.state.profile.informacion_personal.informacion_general
                      .correo_electronico.laboral
                  }
                </Typography>
                <Typography className={classes.titulo}>
                  ENCARGO ACTUAL
                </Typography>
                <Typography className={classes.contenido}>
                  {
                    this.state.profile.informacion_personal.datos_encargo_actual
                      .empleo_cargo_comision
                  }
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.titulo}>
              ÁREA DE ADSCRIPCIÓN
            </Typography>
            <Typography className={classes.contenido}>
              {
                this.state.profile.informacion_personal.datos_encargo_actual
                  .area_adscripcion
              }
            </Typography>

            <Typography className={classes.titulo}>DEPENDENCIA</Typography>
            <Typography className={classes.contenido}>
              <strong>
                {
                  this.state.profile.informacion_personal.datos_encargo_actual
                    .ente_publico
                }
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "right" }}>
            <Typography className={classes.titulo}>
              INGRESOS ANUALES NETOS
            </Typography>
            <Typography className={classes.contenido}>
              <strong style={{ fontSize: 25 }}>
                ${this.ingresosAnualesNetos()}
              </strong>
            </Typography>
            <Typography className={classes.titulo}>
              <small>
                Actualización:{" "}
                {
                  this.state.profile.informacion_personal.informacion_general
                    .fecha_declaracion
                }{" "}
              </small>
            </Typography>
          </Grid>
        </Grid>
        {/* barra de navegacion superior */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MenuSuperior id={this.props.match.params.id} />
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Switch>
              <Route
                path="/declaraciones/perfil/:id/informacion"
                render={() => (
                  <Informacion
                    section={this.props.match.params.subsection}
                    profile={this.state.profile}
                    path={this.props.location.pathname}
                  />
                )}
              />
              <Route
                path="/declaraciones/perfil/:id/pasivos"
                render={() => (
                  <Pasivos
                    section={this.props.match.params.subsection}
                    profile={this.state.profile}
                    path={this.props.location.pathname}
                  />
                )}
              />
              <Route
                path="/declaraciones/perfil/:id/intereses"
                render={() => (
                  <Intereses
                    section={this.props.match.params.subsection}
                    profile={this.state.profile}
                    path={this.props.location.pathname}
                  />
                )}
              />
              <Route
                path="/declaraciones/perfil/:id/activos"
                render={() => (
                  <Activos
                    section={this.props.match.params.subsection}
                    profile={this.state.profile}
                    path={this.props.location.pathname}
                  />
                )}
              />
              <Route
                path="/declaraciones/perfil/:id/ingresos"
                render={() => (
                  <Ingresos
                    section={this.props.match.params.subsection}
                    profile={this.state.profile}
                    path={this.props.location.pathname}
                  />
                )}
              />
            </Switch>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} align="right">
            <JSONButton
              text={"descargar perfil"}
              profile={this.state.profile}
            />
          </Grid>
        </Grid>
      </div>
    );
  }

  /*
   * M E T H O D S
   * ----------------------------------------------------------------------
   */

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  hace el llamado al api para obtener la info
  /  de un servidor público
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  getProfile(id) {
    let conf = Object.assign({}, ConstClass.fetchObj);

    conf.body = JSON.stringify({ id: id });

    fetch(ConstClass.endpoint, conf)
      .then(response => response.json())
      .then(d => {
        // console.log("yaaaa:", d);
        this.setState({ profile: d });
      });
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  ingresosAnualesNetos() {
    let i,
      all = [];
    for (i = 0; i < ConstClass.Incomefields.length; i++) {
      if (this.state.profile.ingresos[ConstClass.Incomefields[i]].length) {
        all = all.concat(
          this.state.profile.ingresos[ConstClass.Incomefields[i]].map(
            d => d.ingreso_bruto_anual
          )
        );
      }
    }

    all = all.filter(d => d.moneda.codigo === "MXN").map(d => d.valor);

    return all
      .reduce(reducer)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }
}

/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default withStyles(styles)(PerfilMaterialUI);
