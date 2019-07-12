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

class InfoExperiencia extends Component {
  render() {
    let { classes } = this.props;
    return (
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>Experiencia laboral</strong>
          </Typography>
          <Grid container spacing={3}>
            {this.props.items.map((job, index) => (
              <Grid item xs={12} md={6} key={"funciones-" + index}>
                <Paper className={classes.paper}>
                  <Typography className={classes.tituloGeneralCard}>
                    Del {job.fecha_ingreso} al {job.fecha_salida}
                    <span
                      style={{
                        float: "right",
                        backgroundColor: "#f7d116",
                        color: "white",
                        padding: "5px 10px"
                      }}
                    >
                      Ámbito {job.ambito.valor}
                    </span>
                    <br />
                    <br />
                    <br />
                    {job.cargo_puesto}
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography className={classes.tituloCard}>
                        Institución
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.dataCard}
                      >
                        <ul>
                          <li>
                            {job.nombre_institucion}
                            <br />
                            {job.direccion.vialidad.tipo_vial}{" "}
                            {job.direccion.vialidad.nom_vial} #
                            {job.direccion.numExt}
                            {job.direccion.numInt
                              ? ", int. #" + job.direccion.numInt
                              : ""}
                            <br />
                            {job.direccion.localidad.nom_loc},{" "}
                            {job.direccion.municipio.nom_mun}
                            <br />
                            {job.direccion.entidad_federativa.nom_agee}. C.P.{" "}
                            {job.direccion.cp}
                          </li>
                        </ul>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classes.tituloCard}>
                        Nivel de gobierno
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.dataCard}
                      >
                        <ul>
                          <li>{job.nivel_gobierno.valor}</li>
                        </ul>
                      </Typography>
                      <Typography className={classes.tituloCard}>
                        Sector/Industria
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.dataCard}
                      >
                        <ul>
                          <li>{job.sector_industria.valor}</li>
                        </ul>
                      </Typography>
                      <Typography className={classes.tituloCard}>
                        Jerarquia/Rango
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.dataCard}
                      >
                        <ul>
                          <li>{job.jerarquia_rango}</li>
                        </ul>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classes.tituloCard}>
                        Unidad Administrativa / Área
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.dataCard}
                      >
                        <ul>
                          <li>{job.unidad_administrativa}</li>
                        </ul>
                      </Typography>
                      <Typography className={classes.tituloCard}>
                        Poder
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.dataCard}
                      >
                        <ul>
                          <li>{job.poder_ente.valor}</li>
                        </ul>
                      </Typography>
                      <Typography className={classes.tituloCard}>
                        Funciones principales
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.dataCard}
                      >
                        <ul>
                          {job.funciones_principales.map((d, index) => (
                            <li key={"funciones-" + index}>{d.valor}</li>
                          ))}
                        </ul>
                      </Typography>

                      <p className="pdn_label" />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  items() {
    return this.props.profile.informacion_personal.experiencia_laboral;
  }
}

export default withStyles(styles)(InfoExperiencia);
