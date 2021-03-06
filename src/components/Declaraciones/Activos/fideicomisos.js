import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { withStyles, lighten } from "@material-ui/core/styles";
import styles from "../style";

import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles({
  root: {
    height: 19,
    backgroundColor: lighten("#808080", 0.5)
  },
  bar: {
    borderRadius: 20
  }
})(LinearProgress);

class ActivosFideicomisos extends Component {
  render() {
    let { classes } = this.props;

    return (
      <Grid container spacing={0} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>Fideicomisos</strong>
          </Typography>
          <Grid container spacing={3}>
            {this.items().map((fideicomiso, i) => (
              <Grid item xs={12} md={6} key={"fideicomiso-" + i}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.expansion}
                  >
                    <Typography>Declarante</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    className={classes.expansionpaneldetails}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Tipo de fideicomiso
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {fideicomiso.tipo_fideicomiso.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Ingreso monetario obtenido
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {new Intl.NumberFormat("es-MX", {
                                style: "currency",
                                currency: "MXN"
                              }).format(
                                fideicomiso.ingreso_monetario_obtenido
                              )}{" "}
                              {fideicomiso.moneda.moneda}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Identificador del fideicomiso
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {fideicomiso.identificador_fideicomiso}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Fecha de creación
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {fideicomiso.fecha_creacion}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Vigencia
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {fideicomiso.vigencia}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Objetivo del fideicomiso
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {fideicomiso.objetivo}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Tipo de operación
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {fideicomiso.tipo_operacion.valor}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Residencia (México / extranjero)
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {fideicomiso.residencia.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Porcentaje de la propiedad
                            </Typography>
                            <Typography
                              component="div"
                              className={classes.dataCard}
                            >
                              {
                                fideicomiso.porcentaje_propiedad_derechos_fiduciarios
                              }
                              %
                              <BorderLinearProgress
                                className={classes.marginProgressbar}
                                variant="determinate"
                                color="primary"
                                value={
                                  fideicomiso.porcentaje_propiedad_derechos_fiduciarios
                                }
                              />
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Institución fiduciaria
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {fideicomiso.institucion_fiduciaria}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Fideicomisario
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {fideicomiso.fideicomisario.nombre}
                              <br />
                              {
                                fideicomiso.fideicomisario.domicilio.vialidad
                                  .tipo_vial
                              }{" "}
                              {
                                fideicomiso.fideicomisario.domicilio.vialidad
                                  .nom_vial
                              }{" "}
                              #{fideicomiso.fideicomisario.domicilio.numExt}
                              {fideicomiso.fideicomisario.domicilio.numInt
                                ? ", int. #" +
                                  fideicomiso.fideicomisario.domicilio.numInt
                                : ""}
                              <br />
                              {
                                fideicomiso.fideicomisario.domicilio.localidad
                                  .nom_loc
                              }
                              ,{" "}
                              {
                                fideicomiso.fideicomisario.domicilio.municipio
                                  .nom_mun
                              }
                              <br />
                              {
                                fideicomiso.fideicomisario.domicilio
                                  .entidad_federativa.nom_agee
                              }
                              . C.P. {fideicomiso.fideicomisario.domicilio.cp}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <Typography className={classes.tituloCard}>
                                  R.F.C.
                                </Typography>
                                <Typography className={classes.dataCard}>
                                  {fideicomiso.fideicomisario.rfc}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography className={classes.tituloCard}>
                                  CURP
                                </Typography>
                                <Typography className={classes.dataCard}>
                                  {fideicomiso.fideicomisario.curp}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography className={classes.tituloCard}>
                                  Constitución
                                </Typography>
                                <Typography className={classes.dataCard}>
                                  {
                                    fideicomiso.fideicomisario
                                      .fecha_constitucion
                                  }
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Fideicomitente
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {fideicomiso.fideicomitente.nombre}
                              <br />
                              {
                                fideicomiso.fideicomitente.domicilio.vialidad
                                  .tipo_vial
                              }{" "}
                              {
                                fideicomiso.fideicomitente.domicilio.vialidad
                                  .nom_vial
                              }{" "}
                              #{fideicomiso.fideicomitente.domicilio.numExt}
                              {fideicomiso.fideicomitente.domicilio.numInt
                                ? ", int. #" +
                                  fideicomiso.fideicomitente.domicilio.numInt
                                : ""}
                              <br />
                              {
                                fideicomiso.fideicomitente.domicilio.localidad
                                  .nom_loc
                              }
                              ,{" "}
                              {
                                fideicomiso.fideicomitente.domicilio.municipio
                                  .nom_mun
                              }
                              <br />
                              {
                                fideicomiso.fideicomitente.domicilio
                                  .entidad_federativa.nom_agee
                              }
                              . C.P. {fideicomiso.fideicomitente.domicilio.cp}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <Typography className={classes.tituloCard}>
                                  R.F.C.
                                </Typography>
                                <Typography className={classes.dataCard}>
                                  {fideicomiso.fideicomitente.rfc}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography className={classes.tituloCard}>
                                  CURP
                                </Typography>
                                <Typography className={classes.dataCard}>
                                  {fideicomiso.fideicomitente.curp}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography className={classes.tituloCard}>
                                  Constitución
                                </Typography>
                                <Typography className={classes.dataCard}>
                                  {
                                    fideicomiso.fideicomitente
                                      .fecha_constitucion
                                  }
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Fiduciario
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {fideicomiso.fiduciario.nombre}
                              <br />
                              {
                                fideicomiso.fiduciario.domicilio.vialidad
                                  .tipo_vial
                              }{" "}
                              {
                                fideicomiso.fiduciario.domicilio.vialidad
                                  .nom_vial
                              }{" "}
                              #{fideicomiso.fiduciario.domicilio.numExt}
                              {fideicomiso.fiduciario.domicilio.numInt
                                ? ", int. #" +
                                  fideicomiso.fiduciario.domicilio.numInt
                                : ""}
                              <br />
                              {
                                fideicomiso.fiduciario.domicilio.localidad
                                  .nom_loc
                              }
                              ,{" "}
                              {
                                fideicomiso.fiduciario.domicilio.municipio
                                  .nom_mun
                              }
                              <br />
                              {
                                fideicomiso.fiduciario.domicilio
                                  .entidad_federativa.nom_agee
                              }
                              . C.P. {fideicomiso.fiduciario.domicilio.cp}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <Typography className={classes.tituloCard}>
                                  R.F.C.
                                </Typography>
                                <Typography className={classes.dataCard}>
                                  {fideicomiso.fiduciario.rfc}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography className={classes.tituloCard}>
                                  CURP
                                </Typography>
                                <Typography className={classes.dataCard}>
                                  {fideicomiso.fiduciario.curp}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography className={classes.tituloCard}>
                                  Constitución
                                </Typography>
                                <Typography className={classes.dataCard}>
                                  {fideicomiso.fiduciario.fecha_constitucion}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className={classes.tituloCard}>
                          Observaciones
                        </Typography>
                        <Typography className={classes.dataCard}>
                          {fideicomiso.observaciones}
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
    return this.props.profile.activos.fideicomisos;
  }
}

export default withStyles(styles)(ActivosFideicomisos);
