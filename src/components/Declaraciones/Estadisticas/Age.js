import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import "../css/chartist.min.css";

import EdadTotal from "./Edad/EdadTotal";
import EdadTotalPorcentaje from "./Edad/EdadTotalPorcentaje";

import EdadTotalEducacion from "./Edad/EdadTotalEducacion";
import EdadTotalEducacionPorcentaje from "./Edad/EdadTotalEducacionPorcentaje";

import EdadTotalNivelGobierno from "./Edad/EdadTotalNivelGobierno";
import EdadTotalNivelGobiernoPorcentaje from "./Edad/EdadTotalNivelGobiernoPorcentaje";

import { withStyles } from "@material-ui/core/styles";
import MenuInformacion from "../MenuLaterlal";

import styles from "../style";

let menu = [
  "Rango de edad",
  "Rango de edad y nivel de gobierno",
  "Rango de edad y nivel educativo"
];

class Age extends Component {
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
                <EdadTotal />
                <EdadTotalPorcentaje />
              </div>
            )}
            {value === 1 && (
              <div>
                <EdadTotalNivelGobierno />
                <EdadTotalNivelGobiernoPorcentaje />
              </div>
            )}
            {value === 2 && (
              <div>
                <EdadTotalEducacion />
                <EdadTotalEducacionPorcentaje />
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Age);
