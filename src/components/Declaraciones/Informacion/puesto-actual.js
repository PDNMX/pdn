import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import styles from "../style";

class InfoPuesto extends Component {
  render() {
    let { classes } = this.props;
    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>Puesto actual</strong>
          </Typography>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.lineCard}>
                <Typography className={classes.tituloGeneralCard}>
                  {
                    this.props.profile.informacion_personal.datos_encargo_actual
                      .empleo_cargo_comision
                  }
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.lineCard}>
                <Typography className={classes.tituloCard}>
                  Área de adscripción
                </Typography>
                <Typography className={classes.dataCard}>
                  <strong>
                    {
                      this.props.profile.informacion_personal
                        .datos_encargo_actual.area_adscripcion
                    }
                  </strong>
                  <br />
                  {
                    this.props.profile.informacion_personal.datos_encargo_actual
                      .direccion_encargo.vialidad.tipo_vial
                  }{" "}
                  {
                    this.props.profile.informacion_personal.datos_encargo_actual
                      .direccion_encargo.vialidad.nom_vial
                  }{" "}
                  #
                  {
                    this.props.profile.informacion_personal.datos_encargo_actual
                      .direccion_encargo.numExt
                  }
                  <span>
                    {this.props.profile.informacion_personal
                      .datos_encargo_actual.direccion_encargo.numInt
                      ? ", int. #" +
                        this.props.profile.informacion_personal
                          .datos_encargo_actual.direccion_encargo.numInt
                      : ""}
                  </span>
                  {
                    this.props.profile.informacion_personal.datos_encargo_actual
                      .direccion_encargo.localidad.nom_loc
                  }
                  ,{" "}
                  {
                    this.props.profile.informacion_personal.datos_encargo_actual
                      .direccion_encargo.municipio.nom_mun
                  }
                  {
                    this.props.profile.informacion_personal.datos_encargo_actual
                      .direccion_encargo.entidad_federativa.nom_agee
                  }
                  . C.P.{" "}
                  {
                    this.props.profile.informacion_personal.datos_encargo_actual
                      .direccion_encargo.cp
                  }
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.lineCard}>
                <Typography className={classes.tituloCard}>
                  Dependencia
                </Typography>
                <Typography className={classes.dataCard}>
                  {" "}
                  {
                    this.props.profile.informacion_personal.datos_encargo_actual
                      .ente_publico
                  }
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Typography className={classes.tituloCard}>
                      Nivel de gobierno
                    </Typography>
                    <Typography className={classes.dataCard}>
                      {
                        this.props.profile.informacion_personal
                          .datos_encargo_actual.nivel_gobierno.valor
                      }
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes.tituloCard}>
                      Poder
                    </Typography>
                    <Typography className={classes.dataCard}>
                      {
                        this.props.profile.informacion_personal
                          .datos_encargo_actual.poder_juridico.valor
                      }
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes.tituloCard}>
                      Sector/Industria
                    </Typography>
                    <Typography className={classes.dataCard}>
                      {
                        this.props.profile.informacion_personal
                          .datos_encargo_actual.sector_industria.valor
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.lineCard}>
                <Typography className={classes.tituloGeneralCard}>
                  {!this.props.items.contratado_honorarios
                    ? "Sin contrato por honorarios"
                    : "Contrato por honorarios"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Typography className={classes.tituloCard}>
                      Nivel de encargo
                    </Typography>
                    <Typography className={classes.dataCard}>
                      {this.props.items.nivel_encargo}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes.tituloCard}>
                      Funciones
                    </Typography>
                    <Typography
                      component="span"
                      className={classes.dataCard}
                      style={{ fontSize: 14, paddingLeft: 0 }}
                    >
                      <ul>
                        {this.props.items.funciones_principales.map((d, i) => (
                          <li key={"funciones-" + i}>{d.valor}</li>
                        ))}
                      </ul>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes.tituloCard}>
                      Fecha de ingreso
                    </Typography>
                    <Typography className={classes.dataCard}>
                      {this.props.items.fecha_posesion}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  items() {
    return this.props.profile.informacion_personal.datos_encargo_actual;
  }
}

export default withStyles(styles)(InfoPuesto);
