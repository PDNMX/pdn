/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 15
  },
  titulo: {
    color: "#34b3eb",
    fontWeight: 500,
    fontSize: 20,
    marginBottom: 30
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  tituloCard: {
    fontSize: 13,
    color: "#cccccc",
    fontWeight: 400,
    marginBottom: 0
  },
  dataCard: {
    fontSize: 14,
    borderBottom: "1px solid #f2f2f2",
    paddingBottom: 10,
    marginBottom: 10
  },
  tituloGeneralCard: {
    fontWeight: 600,
    fontSize: 16,
    color: "#606060",
    borderBottom: "1px solid #f2f2f2",
    paddingBottom: 10,
    marginBottom: 10
  }
});

class InfoPuesto extends Component {
  render() {
    let { classes } = this.props;
    return (
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>Puesto actual</strong>
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.tituloGeneralCard}>
                  {
                    this.props.profile.informacion_personal
                      .datos_encargo_actual.empleo_cargo_comision
                  }
                </Typography>
                <Typography className={classes.tituloCard}>
                  Área de adscripción
                </Typography>
                <Typography component={"span"} className={classes.dataCard}>
                  <ul>
                    <li>
                      <strong>
                        {
                          this.props.profile.informacion_personal
                            .datos_encargo_actual.area_adscripcion
                        }
                      </strong>
                      <br />
                      {
                        this.props.profile.informacion_personal
                          .datos_encargo_actual.direccion_encargo.vialidad
                          .tipo_vial
                      }{" "}
                      {
                        this.props.profile.informacion_personal
                          .datos_encargo_actual.direccion_encargo.vialidad
                          .nom_vial
                      }{" "}
                      #
                      {
                        this.props.profile.informacion_personal
                          .datos_encargo_actual.direccion_encargo.numExt
                      }
                      <span>
                        {this.props.profile.informacion_personal
                          .datos_encargo_actual.direccion_encargo.numInt
                          ? ", int. #" +
                            this.props.profile.informacion_personal
                              .datos_encargo_actual.direccion_encargo.numInt
                          : ""}
                      </span>
                      <br />
                      {
                        this.props.profile.informacion_personal
                          .datos_encargo_actual.direccion_encargo.localidad
                          .nom_loc
                      }
                      ,{" "}
                      {
                        this.props.profile.informacion_personal
                          .datos_encargo_actual.direccion_encargo.municipio
                          .nom_mun
                      }
                      <br />
                      {
                        this.props.profile.informacion_personal
                          .datos_encargo_actual.direccion_encargo
                          .entidad_federativa.nom_agee
                      }
                      . C.P.{" "}
                      {
                        this.props.profile.informacion_personal
                          .datos_encargo_actual.direccion_encargo.cp
                      }
                    </li>
                  </ul>
                </Typography>
                <Typography className={classes.tituloCard}>
                  Dependencia
                </Typography>
                <Typography component={"span"} className={classes.dataCard}>
                  <ul>
                    <li>
                      {
                        this.props.profile.informacion_personal
                          .datos_encargo_actual.ente_publico
                      }
                    </li>
                  </ul>
                </Typography>
                <Typography className={classes.tituloCard}>
                  Nivel de gobierno
                </Typography>
                <Typography component={"span"} className={classes.dataCard}>
                  <ul>
                    <li>
                      {
                        this.props.profile.informacion_personal
                          .datos_encargo_actual.nivel_gobierno.valor
                      }
                    </li>
                  </ul>
                </Typography>
                <Typography className={classes.tituloCard}>
                  Poder
                </Typography>
                <Typography component={"span"} className={classes.dataCard}>
                  <ul>
                    <li>
                      {
                        this.props.profile.informacion_personal
                          .datos_encargo_actual.poder_juridico.valor
                      }
                    </li>
                  </ul>
                </Typography>
                <Typography className={classes.tituloCard}>
                  Sector/Industria
                </Typography>
                <Typography component={"span"} className={classes.dataCard}>
                  <ul>
                    <li>
                      {
                        this.props.profile.informacion_personal
                          .datos_encargo_actual.sector_industria.valor
                      }
                    </li>
                  </ul>
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.tituloGeneralCard}>
                  {!this.props.items.contratado_honorarios
                    ? "Sin contrato por honorarios"
                    : "Contrato por honorarios"}
                </Typography>
                <Typography className={classes.tituloCard}>
                  Nivel de encargo
                </Typography>
                <Typography component={"span"} className={classes.dataCard}>
                  <ul>
                    <li>{this.props.items.nivel_encargo}</li>
                  </ul>
                </Typography>
                <Typography className={classes.tituloCard}>
                  Funciones
                </Typography>
                <Typography component={"span"} className={classes.dataCard}>
                  <ul>
                    {this.props.items.funciones_principales.map((d, i) => (
                      <li key={"funciones-" + i}>{d.valor}</li>
                    ))}
                  </ul>
                </Typography>
                <Typography className={classes.tituloCard}>
                  Fecha de ingreso
                </Typography>
                <Typography component={"span"} className={classes.dataCard}>
                  <ul>
                    <li>{this.props.items.fecha_posesion}</li>
                  </ul>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  items() {
    return this.props.profile.informacion_personal.datos_encargo_actual;
  }
}

export default withStyles(styles)(InfoPuesto);
