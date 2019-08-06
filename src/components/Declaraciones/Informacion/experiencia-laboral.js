/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import styles from "../style";

class InfoExperiencia extends Component {
  render() {
    let { classes } = this.props;
    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>Experiencia laboral</strong>
          </Typography>
          <Grid container spacing={3}>
            {this.props.items.map((job, index) => (
              <Grid item xs={12} md={6} key={"funciones-" + index}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.expansion}
                  >
                    <Typography>
                      {job.cargo_puesto}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    className={classes.expansionpaneldetails}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
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
                        </Typography>
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
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
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
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
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
                          </Grid>
                          <Grid item xs={6}>
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
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
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
                          </Grid>{" "}
                        </Grid>
                      </Grid>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
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
