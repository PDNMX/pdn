import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import "../css/chartist.min.css";

import EdadTotal from "./Edad/EdadTotal";
// import EdadTotalPorcentaje from "./Edad/EdadTotalPorcentaje";

import EdadTotalEducacion from "./Edad/EdadTotalEducacion";
// import EdadTotalEducacionPorcentaje from "./Edad/EdadTotalEducacionPorcentaje";

import EdadTotalNivelGobierno from "./Edad/EdadTotalNivelGobierno";
// import EdadTotalNivelGobiernoPorcentaje from "./Edad/EdadTotalNivelGobiernoPorcentaje";

import { withStyles } from "@material-ui/core/styles";
// import MenuInformacion from "../MenuLaterlal";

import styles from "../style";

class Age extends Component {
  render() {
    let { classes } = this.props;

    return (
      <Grid container spacing={0} className={classes.rootSeccion}>
        <Grid item xs={12} style={{ padding: 15 }}>
          <EdadTotal />
          <EdadTotalNivelGobierno />
          <EdadTotalEducacion />
          {/* <EdadTotalPorcentaje /> */}
          {/* <EdadTotalNivelGobiernoPorcentaje /> */}
          {/* <EdadTotalEducacionPorcentaje /> */}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Age);
