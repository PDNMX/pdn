import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

import styles from "../style";

class InfoGeneralMaterialUI extends Component {
  render() {
    let { classes } = this.props;
    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>Información general</strong>
          </Typography>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.lineCard}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography className={classes.tituloCard}>
                      Nacionalidades
                    </Typography>
                    <Typography
                      component={"span"}
                      className={classes.dataCard}
                      style={{ fontSize: 14, paddingLeft: 0 }}
                    >
                      <ul>
                        {this.props.items.nacionalidades.map((d, i) => (
                          <li key={"nacionalidad-" + i}>{d.valor}</li>
                        ))}
                      </ul>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.tituloCard}>
                      Lugar de nacimiento
                    </Typography>
                    <Typography className={classes.dataCard}>
                      {this.props.items.entidad_federativa_nacimiento.nom_agee}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.tituloCard}>
                  Estado Civil
                </Typography>
                <Typography className={classes.dataCard}>
                  {this.props.items.estado_civil.valor}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  items() {
    return this.props.profile.informacion_personal.informacion_general;
  }
}

export default withStyles(styles)(InfoGeneralMaterialUI);
