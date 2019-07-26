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

class InfoCurriculum extends Component {
  render() {
    let { classes } = this.props;
    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>Datos curriculares</strong>
          </Typography>
          <Grid container spacing={3}>
            {this.props.items.grados_academicos.map((grado, i) => (
              <Grid item xs={12} md={6} key={"grados-" + i}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.tituloGeneralCard}>
                      {grado.grado_obtenido.valor} en{" "}
                      <strong>{grado.carrera}</strong>
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
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
                      </Grid>
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
    return this.props.profile.informacion_personal.datos_curriculares;
  }
}

export default withStyles(styles)(InfoCurriculum);
