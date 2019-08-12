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

class ActivosInversiones extends Component {
  render() {
    let { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>
              Inversiones, cuentas y valores ({this.items().length})
            </strong>
          </Typography>
          <Grid container spacing={3}>
            {this.items().map((inversion, i) => (
              <Grid item xs={12} md={6} key={"inversion-" + i}>
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
                              Tipo de inversión
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {inversion.tipo_inversion.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Tipo especifico de inversión
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {inversion.tipo_especifico_inversion.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Nombre de la Institución
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {inversion.nombre_institucion}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Inversión Nacional o Extranjera
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {inversion.nacional_extranjero.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Tipo de moneda
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {inversion.tipo_moneda.moneda}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Tipo de operación
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {inversion.tipo_operacion.valor}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Forma de adquisición
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {inversion.forma_adquisicion.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Porcentaje de inversión del funcionario
                            </Typography>
                            <Typography
                              component="div"
                              className={classes.dataCard}
                            >
                              {inversion.porcentaje_inversion}%
                              <BorderLinearProgress
                                className={classes.marginProgressbar}
                                variant="determinate"
                                color="primary"
                                value={inversion.porcentaje_inversion}
                              />
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Sector o industria
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {inversion.sector_industria.valor}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className={classes.tituloCard}>
                          Observaciones
                        </Typography>
                        <Typography className={classes.dataCard}>
                          {inversion.observaciones}
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
    return this.props.profile.activos.inversiones_cuentas_valores;
  }
}

export default withStyles(styles)(ActivosInversiones);
