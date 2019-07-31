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

class InfoDependientes extends Component {
  render() {
    let { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>Dependientes económicos ({this.items().length})</strong>
          </Typography>
          <Grid container spacing={3}>
            {this.items().map((dependiente, i) => (
              <Grid item xs={12} md={6} key={"dependientes-" + i}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.tituloGeneralCard}>
                      <span className={classes.tituloFondo}>
                        {dependiente.tipo_relacion.valor}
                      </span>
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Sector / Industria
                            </Typography>
                            <Typography
                              component={"span"}
                              className={classes.dataCard}
                            >
                              <ul>
                                <li>{dependiente.sector_industria.valor}</li>
                              </ul>
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Proveedor o Contratista de Gobierno
                            </Typography>
                            <Typography
                              component={"span"}
                              className={classes.dataCard}
                            >
                              <ul>
                                <li>
                                  {!dependiente.proveedor_contratista_gobierno
                                    ? "No"
                                    : "Sí"}
                                </li>
                              </ul>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Intereses en el mismo Sector/Industria
                            </Typography>
                            <Typography
                              component={"span"}
                              className={classes.dataCard}
                            >
                              <ul>
                                <li>
                                  {!dependiente.tiene_intereses_mismo_sector_declarante
                                    ? "No"
                                    : "Sí"}
                                </li>
                              </ul>
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Desarrolla actividades de cabildeo en el mismo
                              Sector/Industria
                            </Typography>
                            <Typography
                              component={"span"}
                              className={classes.dataCard}
                            >
                              <ul>
                                <li>
                                  {!dependiente.desarrolla_cabildeo_sector_declarante
                                    ? "No"
                                    : "Sí"}
                                </li>
                              </ul>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12}>
                            <Typography className={classes.tituloCard}>
                              Observaciones
                            </Typography>
                            <Typography
                              component={"span"}
                              className={classes.dataCard}
                            >
                              <ul>
                                <li>{dependiente.observaciones}</li>
                              </ul>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      {dependiente.beneficiario_programa_publico.map(
                        (programa, j) => (
                          <div key={"programa-" + i + "-" + j}>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6}>
                                <Typography className={classes.tituloCard}>
                                  Beneficiaro de programa
                                </Typography>
                                <Typography
                                  component={"span"}
                                  className={classes.dataCard}
                                >
                                  <ul>
                                    <li>{programa.nombre_programa}</li>
                                  </ul>
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography className={classes.tituloCard}>
                                  Orden de Gobierno que otorga el apoyo
                                </Typography>
                                <Typography
                                  component={"span"}
                                  className={classes.dataCard}
                                >
                                  <ul>
                                    <li>{programa.institucion_otorga_apoyo}</li>
                                  </ul>
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6}>
                                <Typography className={classes.tituloCard}>
                                  Tipo de apoyo
                                </Typography>
                                <Typography
                                  component={"span"}
                                  className={classes.dataCard}
                                >
                                  <ul>
                                    <li>{programa.tipo_apoyo.valor}</li>
                                  </ul>
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography className={classes.tituloCard}>
                                  Valor del Apoyo
                                </Typography>
                                <Typography
                                  component={"span"}
                                  className={classes.dataCard}
                                >
                                  <ul>
                                    <li>
                                      {new Intl.NumberFormat("es-MX", {
                                        style: "currency",
                                        currency: "MXN"
                                      }).format(programa.valor_apoyo)}
                                    </li>
                                  </ul>
                                </Typography>
                              </Grid>
                            </Grid>
                          </div>
                        )
                      )}
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
    return this.props.profile.informacion_personal.dependientes_economicos;
  }
}

export default withStyles(styles)(InfoDependientes);
