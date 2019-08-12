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

class ActivosCuentasPorCobrar extends Component {
  render() {
    let { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>Cuentas por cobrar ({this.items().length})</strong>
          </Typography>
          <Grid container spacing={3}>
            {this.items().map((cuentas, i) => (
              <Grid item xs={12} md={6} key={"cuentas-" + i}>
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
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Número de registro
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {cuentas.numero_registro}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Fecha de préstamo
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {cuentas.fecha_prestamo}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Fecha de vencimiento
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {cuentas.fecha_vencimiento}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Tasa de interés
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {cuentas.tasa_interes}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Porcentaje de copropiedad
                            </Typography>
                            <Typography
                              component="div"
                              className={classes.dataCard}
                            >
                              {cuentas.porcentaje_copropiedad}%
                              <BorderLinearProgress
                                className={classes.marginProgressbar}
                                variant="determinate"
                                color="primary"
                                value={cuentas.porcentaje_copropiedad}
                              />
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Sector o industria
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {cuentas.sector_industria.valor}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className={classes.tituloCard}>
                          Observaciones
                        </Typography>
                        <Typography className={classes.dataCard}>
                          {cuentas.observaciones}
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
    return this.props.profile.activos.cuentas_por_cobrar;
  }
}

export default withStyles(styles)(ActivosCuentasPorCobrar);
