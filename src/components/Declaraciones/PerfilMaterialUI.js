/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import { Grid } from "@material-ui/core";

import Informacion from "./Informacion/Informacion";
import Pasivos from "./Pasivos/Pasivos";
import Intereses from "./Intereses/Intereses";
import Activos from "./Activos/Activos";
import Ingresos from "./Ingresos/Ingresos";

import JSONButton from "./single-components/json-button";

import email from "../../assets/declaraciones/cbimage.svg";
import MenuSuperior from "./MenuSuperior";

import { withStyles } from "@material-ui/core/styles";

import * as ConstClass from "./ConstValues.js";
import { Typography, Paper } from "@material-ui/core";
import styles from "./style";

const reducer = (accumulator, currentValue) => accumulator + currentValue;

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
      profile: null,
      menu_superior: 0,
      menu_informacion: 4,
      menu_interes: 0,
      menu_ingresos: 0,
      menu_activos: 0,
      menu_pasivos: 0
    };

    this.getProfile = this.getProfile.bind(this);
    this.ingresosAnualesNetos = this.ingresosAnualesNetos.bind(this);

    this.getProfile(this.props.match.params.id);

    // console.log(this.props);
  }

  change_menuSuperior = valor => {
    this.setState({
      menu_superior: valor
    });
  };

  change_menuInformacion = valor => {
    this.setState({
      menu_informacion: valor
    });
  };

  change_menuInteres = valor => {
    this.setState({
      menu_interes: valor
    });
  };

  change_menuIngresos = valor => {
    this.setState({
      menu_ingresos: valor
    });
  };

  change_menuActivos = valor => {
    this.setState({
      menu_activos: valor
    });
  };

  change_menuPasivos = valor => {
    this.setState({
      menu_pasivos: valor
    });
  };

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
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
                {/* <Grid item xs={3}>
                  <img
                    alt="avatar2"
                    src={`${process.env.PUBLIC_URL}/img/avatar.svg`}
                    style={{ width: "100%", margin: "0 auto" }}
                  />
                </Grid> */}
                <Grid item xs={12} style={{ textAlign: "right" }}>
                  <Typography>
                    <span
                      style={{
                        color: "#FFF",
                        backgroundColor: "Red",
                        fontWeight: "bold",
                        padding: "5px 10px"
                      }}
                    >
                      Actualización:{" "}
                      {
                        this.state.profile.informacion_personal
                          .informacion_general.fecha_declaracion
                      }
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={7}>
                      <Typography className={classes.h1}>
                        {
                          this.state.profile.informacion_personal
                            .informacion_general.nombres
                        }{" "}
                        {
                          this.state.profile.informacion_personal
                            .informacion_general.primer_apellido
                        }{" "}
                        {
                          this.state.profile.informacion_personal
                            .informacion_general.segundo_apellido
                        }
                      </Typography>
                      <img
                        alt="email"
                        src={email}
                        style={{ width: 18, float: "left" }}
                      />
                      <Typography className={classes.mail}>
                        {
                          this.state.profile.informacion_personal
                            .informacion_general.correo_electronico.laboral
                        }
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.tituloCard}>
                        INGRESOS ANUALES NETOS:
                      </Typography>
                      <Typography className={classes.dataCard}>
                        <strong style={{ fontSize: 25 }}>
                          ${this.ingresosAnualesNetos()}
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={4}>
                          <Typography className={classes.tituloCard}>
                            ENCARGO ACTUAL:
                          </Typography>
                          <Typography className={classes.dataCard}>
                            {
                              this.state.profile.informacion_personal
                                .datos_encargo_actual.empleo_cargo_comision
                            }
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography className={classes.tituloCard}>
                            ÁREA DE ADSCRIPCIÓN:
                          </Typography>
                          <Typography className={classes.dataCard}>
                            {
                              this.state.profile.informacion_personal
                                .datos_encargo_actual.area_adscripcion
                            }
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography className={classes.tituloCard}>
                            DEPENDENCIA:
                          </Typography>
                          <Typography className={classes.dataCard}>
                            <strong>
                              {
                                this.state.profile.informacion_personal
                                  .datos_encargo_actual.ente_publico
                              }
                            </strong>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        {/* barra de navegacion superior */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MenuSuperior
              id={this.props.match.params.id}
              menu_superior={this.state.menu_superior}
              change={this.change_menuSuperior}
            />
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          {this.state.menu_superior === 0 && (
            <Grid item xs={12}>
              <Informacion
                section={this.props.match.params.subsection}
                profile={this.state.profile}
                path={this.props.location.pathname}
                value={this.state.menu_informacion}
                change={this.change_menuInformacion}
              />
            </Grid>
          )}
          {this.state.menu_superior === 1 && (
            <Grid item xs={12}>
              <Intereses
                section={this.props.match.params.subsection}
                profile={this.state.profile}
                path={this.props.location.pathname}
                value={this.state.menu_interes}
                change={this.change_menuInteres}
              />
            </Grid>
          )}
          {this.state.menu_superior === 2 && (
            <Grid item xs={12}>
              <Ingresos
                section={this.props.match.params.subsection}
                profile={this.state.profile}
                path={this.props.location.pathname}
                value={this.state.menu_ingresos}
                change={this.change_menuIngresos}
              />
            </Grid>
          )}
          {this.state.menu_superior === 3 && (
            <Grid item xs={12}>
              <Activos
                section={this.props.match.params.subsection}
                profile={this.state.profile}
                path={this.props.location.pathname}
                value={this.state.menu_activos}
                change={this.change_menuActivos}
              />
            </Grid>
          )}
          {this.state.menu_superior === 4 && (
            <Grid item xs={12}>
              <Pasivos
                section={this.props.match.params.subsection}
                profile={this.state.profile}
                path={this.props.location.pathname}
                value={this.state.menu_pasivos}
                change={this.change_menuPasivos}
              />
            </Grid>
          )}
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
