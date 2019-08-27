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
      <Grid container spacing={0} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>Dependientes económicos</strong>
          </Typography>
          <Grid container spacing={3}>
            {this.items().map((dependiente, i) => (
              <Grid item xs={12} md={6} key={"dependientes-" + i}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.expansion}
                  >
                    <Typography>{dependiente.tipo_relacion.valor}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    className={classes.expansionpaneldetails}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Sector / Industria
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {dependiente.sector_industria.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Proveedor o contratista de Gobierno
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {!dependiente.proveedor_contratista_gobierno
                                ? "No"
                                : "Sí"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Intereses en el mismo sector/industria
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {!dependiente.tiene_intereses_mismo_sector_declarante
                                ? "No"
                                : "Sí"}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Desarrolla actividades de cabildeo en el mismo
                              sector/industria
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {!dependiente.desarrolla_cabildeo_sector_declarante
                                ? "No"
                                : "Sí"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Typography className={classes.tituloCard}>
                          Observaciones
                        </Typography>
                        <Typography className={classes.dataCard}>
                          {dependiente.observaciones}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        {dependiente.beneficiario_programa_publico.map(
                          (programa, j) => (
                            <Grid
                              container
                              spacing={3}
                              key={"programa-" + i + "-" + j}
                            >
                              <Grid item xs={12} className={classes.lineCard}>
                                <Grid container spacing={3}>
                                  <Grid item xs={6}>
                                    <Typography className={classes.tituloCard}>
                                      Beneficiaro de programa
                                    </Typography>
                                    <Typography className={classes.dataCard}>
                                      {programa.nombre_programa}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography className={classes.tituloCard}>
                                      Orden de Gobierno que otorga el apoyo
                                    </Typography>
                                    <Typography className={classes.dataCard}>
                                      {programa.institucion_otorga_apoyo}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={12}>
                                <Grid container spacing={3}>
                                  <Grid item xs={6}>
                                    <Typography className={classes.tituloCard}>
                                      Tipo de apoyo
                                    </Typography>
                                    <Typography className={classes.dataCard}>
                                      {programa.tipo_apoyo.valor}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography className={classes.tituloCard}>
                                      Valor del apoyo
                                    </Typography>
                                    <Typography className={classes.dataCard}>
                                      {new Intl.NumberFormat("es-MX", {
                                        style: "currency",
                                        currency: "MXN"
                                      }).format(programa.valor_apoyo)}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          )
                        )}
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
    return this.props.profile.informacion_personal.dependientes_economicos;
  }
}

export default withStyles(styles)(InfoDependientes);
