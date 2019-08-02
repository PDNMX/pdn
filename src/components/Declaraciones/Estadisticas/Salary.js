import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import "../css/chartist.min.css";

import SalarioTotal from "./Salarios/SalarioTotal";

import { withStyles } from "@material-ui/core/styles";
import MenuInformacion from "../MenuLaterlal";

import styles from "../style";

let menu = ["Ingresos"];
class Salary extends Component {
  render() {
    let { classes, value, change } = this.props;

    return (
      <div className={classes.rootSeccion}>
        <Grid container spacing={0}>
          <Grid item xs={4} md={2} className={classes.sidebar}>
            <MenuInformacion menu={menu} value={value} change={change} />
          </Grid>
          <Grid
            item
            xs={8}
            md={10}
            style={{ backgroundColor: "#f2f2f2", padding: 15 }}
          >
            {value === 0 && (
              <div>
                <SalarioTotal />
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Salary);
