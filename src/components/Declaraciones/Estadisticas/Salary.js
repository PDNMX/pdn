import React, { Component } from "react";
import { Grid } from "@material-ui/core";

import SalarioTotal from "./Salarios/SalarioTotal";

import { withStyles } from "@material-ui/core/styles";

import styles from "../style";

class Salary extends Component {
  render() {
    let { classes } = this.props;

    return (
      <div className={classes.rootSeccion}>
        <Grid container spacing={0}>
          <Grid item xs={12} style={{ padding: 15 }}>
            <SalarioTotal />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Salary);
