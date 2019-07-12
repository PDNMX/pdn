/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 15
  },
  titulo: {
    color: "#34b3eb",
    fontWeight: 500,
    fontSize: 20,
    marginBottom: 30
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  tituloCard: {
    fontSize: 13,
    color: "#cccccc",
    fontWeight: 400,
    marginBottom: 0    
  },
  dataCard: {
    fontSize: 14,
    borderBottom: "1px solid #f2f2f2",
    paddingBottom: 10,
    marginBottom: 10
  }
});

class InfoGeneralMaterialUI extends Component {
  render() {
	  let { classes } = this.props;
    return (
      <div>
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={12}>
            <Typography className={classes.titulo}>
              <strong>Información general</strong>
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                  <Typography className={classes.tituloCard}>
                    Nacionalidades
                  </Typography>
                  <Typography component={"span"} className={classes.dataCard}>
                    <ul>
                      {this.props.items.nacionalidades.map((d, i) => (
                        <li key={"nacionalidad-"+i}>{d.valor}</li>
                      ))}
                    </ul>
                  </Typography>
                  <Typography className={classes.tituloCard}>
                    Lugar de nacimiento
                  </Typography>
                  <Typography component={"span"} className={classes.dataCard}>
                    <ul>
                      <li>
                        {
                          this.props.items.entidad_federativa_nacimiento
                            .nom_agee
                        }
                      </li>
                    </ul>
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                  <Typography className={classes.tituloCard}>
                    Estado Civil
                  </Typography>
                  <Typography component={"span"} className={classes.dataCard}>
                    <ul>
                      <li>{this.props.items.estado_civil.valor}</li>
                    </ul>
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>       
      </div>
    );
  }

  items() {
    return this.props.profile.informacion_personal.informacion_general;
  }
}

export default withStyles(styles)(InfoGeneralMaterialUI);
