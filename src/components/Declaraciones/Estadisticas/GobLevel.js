import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import NivelGobiernoTotal from "./NivelGobierno/NivelGobiernoTotal";
import NivelGobiernoPorcentaje from "./NivelGobierno/NivelGobiernoPorcentaje";

import NivelGobiernoEducacion from "./NivelGobierno/NivelGobiernoEducacion";
import NivelGobiernoEducacionPorcentaje from "./NivelGobierno/NivelGobiernoEducacionPorcentaje";

import NivelGobiernoEdad from "./NivelGobierno/NivelGobiernoEdad";
import NivelGobiernoEdadPorcentaje from "./NivelGobierno/NivelGobiernoEdadPorcentaje";

import { withStyles } from "@material-ui/core/styles";
import MenuInformacion from "../MenuLaterlal";

import styles from "../style";

let menu = [
  "Nivel de gobierno",
  "Nivel de gobierno y edad",
  "Nivel de gobierno y educación"
];

class GobLevel extends Component {
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
                <NivelGobiernoTotal />
                <NivelGobiernoPorcentaje />
              </div>
            )}
            {value === 1 && (
              <div>
                <NivelGobiernoEdad />
                <NivelGobiernoEdadPorcentaje />
              </div>
            )}
            {value === 2 && (
              <div>
                <NivelGobiernoEducacion />
                <NivelGobiernoEducacionPorcentaje />
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(GobLevel);
