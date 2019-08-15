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
              <Grid item xs={12} md={6} key={"job-" + index}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.expansion}
                  >
                    <Typography>{job.cargo_puesto}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    className={classes.expansionpaneldetails}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={8}>
                            <Typography className={classes.tituloGeneralCard}>
                              Del {job.fecha_ingreso} al {job.fecha_salida}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
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
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Typography className={classes.tituloCard}>
                          Institución
                        </Typography>
                        <Typography className={classes.dataCard}>
                          {job.nombre_institucion}
                          <br />
                          {job.direccion.vialidad.tipo_vial}{" "}
                          {job.direccion.vialidad.nom_vial} #
                          {job.direccion.numExt}
                          {job.direccion.numInt
                            ? ", int. #" + job.direccion.numInt
                            : ""}
                          {job.direccion.localidad.nom_loc},{" "}
                          {job.direccion.municipio.nom_mun}
                          {job.direccion.entidad_federativa.nom_agee}. C.P.{" "}
                          {job.direccion.cp}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Nivel de gobierno
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {job.nivel_gobierno.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Unidad Administrativa / Área
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {job.unidad_administrativa}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Sector/Industria
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {job.sector_industria.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Poder
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {job.poder_ente.valor}
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
                            <Typography className={classes.dataCard}>
                              {job.jerarquia_rango}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Funciones principales
                            </Typography>
                            <Typography
                              component="div"
                              className={classes.dataCard}
                              style={{ fontSize: 14, paddingLeft: 0 }}
                            >
                              <ul>
                                {job.funciones_principales.map((d, index) => (
                                  <li key={"funciones-" + index}>{d.valor}</li>
                                ))}
                              </ul>
                            </Typography>
                          </Grid>
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
