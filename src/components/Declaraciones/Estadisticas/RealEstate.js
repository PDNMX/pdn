import React, { Component } from "react";
import { Grid } from "@material-ui/core";

import PropiedadTotal from "./Bienes/PropiedadTotal";
import ConstruccionTotal from "./Bienes/ConstruccionTotal";

import { withStyles } from "@material-ui/core/styles";

import styles from "../style";

class RealEstate extends Component {
  render() {
    let { classes } = this.props;

    return (
      <div className={classes.rootSeccion}>
        <Grid container spacing={0}>
          <Grid item xs={12} style={{ padding: 15 }}>
            <PropiedadTotal />
            <ConstruccionTotal />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(RealEstate);
