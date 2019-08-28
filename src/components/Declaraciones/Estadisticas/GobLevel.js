import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import NivelGobiernoTotal from "./NivelGobierno/NivelGobiernoTotal";
import NivelGobiernoPorcentaje from "./NivelGobierno/NivelGobiernoPorcentaje";

import NivelGobiernoEducacion from "./NivelGobierno/NivelGobiernoEducacion";
import NivelGobiernoEducacionPorcentaje from "./NivelGobierno/NivelGobiernoEducacionPorcentaje";

import NivelGobiernoEdad from "./NivelGobierno/NivelGobiernoEdad";
import NivelGobiernoEdadPorcentaje from "./NivelGobierno/NivelGobiernoEdadPorcentaje";

import { withStyles } from "@material-ui/core/styles";

import styles from "../style";

class GobLevel extends Component {
  render() {
    let { classes } = this.props;

    return (
      <div className={classes.rootSeccion}>
        <Grid container spacing={0}>
          <Grid item xs={12} style={{ padding: 15 }}>
            <NivelGobiernoTotal />
            {/* <NivelGobiernoPorcentaje /> */}
            <NivelGobiernoEdad />
            {/* <NivelGobiernoEdadPorcentaje /> */}
            <NivelGobiernoEducacion />
            {/* <NivelGobiernoEducacionPorcentaje /> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(GobLevel);
