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

class InteresesSocios extends Component {
  render() {
    let { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>Socios comerciales ({this.items().length})</strong>
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
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Nombre de actividad
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.nombre_actividad}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              R.F.C.
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.rfc_entidad}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Tipo de vínculo
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.tipo_vinculo}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Antigüedad de vínculo
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.antiguedad_vinculo}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Typography className={classes.tituloCard}>
                          Sector o industria
                        </Typography>
                        <Typography className={classes.dataCard}>
                          {interes.sector_industria.valor}
                        </Typography>
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
    return this.props.profile.intereses.socios_comerciales;
  }
}

export default withStyles(styles)(InteresesSocios);
