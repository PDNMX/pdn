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

class InfoCurriculum extends Component {
  render() {
    let { classes } = this.props;
    return (
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>Datos curriculares</strong>
          </Typography>
          <Grid container spacing={3}>
            {this.props.items.grados_academicos.map((grado, i) => (
              <Grid item xs={12} md={6} key={"grados-" + i}>
                <Paper className={classes.paper}>
                  <Typography className={classes.tituloGeneralCard}>
                    {grado.grado_obtenido.valor} en{" "}
                    <strong>{grado.carrera}</strong>
                  </Typography>
                  <Typography className={classes.tituloCard}>
                    Institución Educativa
                  </Typography>
                  <Typography
                    component={"span"}
                    className={classes.dataCard}
                  >
                    <ul>
                      <li>
                        {grado.institucion_educativa}
                        <br />
                        {
                          grado.lugar_institucion_educativa
                            .entidad_federativa.nom_agee
                        }
                        , {grado.lugar_institucion_educativa.pais.valor}
                      </li>
                    </ul>
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Typography className={classes.tituloCard}>
                        Estatus
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.dataCard}
                      >
                        <ul>
                          <li>{grado.estatus.valor}</li>
                        </ul>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classes.tituloCard}>
                        Año de conclusión
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.dataCard}
                      >
                        <ul>
                          <li>{grado.ano_conclusion}</li>
                        </ul>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classes.tituloCard}>
                        Documento obtenido
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.dataCard}
                      >
                        <ul>
                          <li>{grado.documento_obtenido.valor}</li>
                        </ul>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classes.tituloCard}>
                        Cédula Profesional
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.dataCard}
                      >
                        <ul>
                          <li>{grado.cedula_profesional}</li>
                        </ul>
                      </Typography>
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
    return this.props.profile.informacion_personal.datos_curriculares;
  }
}

export default withStyles(styles)(InfoCurriculum);
