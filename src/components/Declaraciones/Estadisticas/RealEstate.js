import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import "../css/chartist.min.css";

import PropiedadTotal from "./Bienes/PropiedadTotal";
import ConstruccionTotal from "./Bienes/ConstruccionTotal";

import { withStyles } from "@material-ui/core/styles";
// import MenuInformacion from "../MenuLaterlal";

import styles from "../style";

// let menu = ["Bienes inmuebles"];

class RealEstate extends Component {
  render() {
    let { classes, value } = this.props;

    return (
      <div className={classes.rootSeccion}>
        <Grid container spacing={0}>
          {/* <Grid item xs={4} md={2} className={classes.sidebar}>
            <MenuInformacion menu={menu} value={value} change={change} />
          </Grid> */}
          <Grid
            item
            xs={12}
            style={{  padding: 15 }}
          >
            {value === 0 && (
              <div>
                <PropiedadTotal />
                <ConstruccionTotal />
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(RealEstate);
