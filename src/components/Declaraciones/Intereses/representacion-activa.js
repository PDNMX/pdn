import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { withStyles } from "@material-ui/core/styles";
import styles from "../style";

class InteresesRepActiva extends Component {
  render() {
    let { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>Representación activa</strong>
          </Typography>
          <Grid container spacing={3}>
            {this.items().map((interes, i) => (
              <Grid item xs={12} md={6} key={"interes-" + i}>
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
                          <Grid item xs={8}>
                            <Typography className={classes.tituloCard}>
                              Tipo de representación
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.tipo_representacion.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Pagado
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.pagado ? "Sí" : "No"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={8}>
                            <Typography className={classes.tituloCard}>
                              Sector o industria
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.sector_industria.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Fecha de inicio
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.fecha_inicio}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className={classes.tituloCard}>
                          Observaciones
                        </Typography>
                        <Typography className={classes.dataCard}>
                          {interes.observaciones}
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
    return this.props.profile.intereses.representacion_activa;
  }
}

export default withStyles(styles)(InteresesRepActiva);
