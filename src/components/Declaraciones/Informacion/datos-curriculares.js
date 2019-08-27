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
      <Grid container spacing={0} className={classes.rootSubseccion}>
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
                    className={classes.expansion}
                  >
                    <Typography>
                      {grado.grado_obtenido.valor} en{" "}
                      <strong>{grado.carrera}</strong>
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    className={classes.expansionpaneldetails}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Typography className={classes.tituloCard}>
                          Institución Educativa
                        </Typography>
                        <Typography className={classes.dataCard}>
                          {grado.institucion_educativa}
                          <br />
                          {
                            grado.lugar_institucion_educativa.entidad_federativa
                              .nom_agee
                          }
                          , {grado.lugar_institucion_educativa.pais.valor}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Estatus
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {grado.estatus.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Año de conclusión
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {grado.ano_conclusion}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Documento obtenido
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {grado.documento_obtenido.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Cédula profesional
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {grado.cedula_profesional}
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
    return this.props.profile.informacion_personal.datos_curriculares;
  }
}

export default withStyles(styles)(InfoCurriculum);
