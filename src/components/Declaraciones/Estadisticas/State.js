import React, { Component } from "react";

import { Grid } from "@material-ui/core";
import FuncionariosPorEntidadTotal from "./Entidad/FuncionariosPorEntidadTotal";
import FuncionariosPorEntidadPorcentaje from "./Entidad/FuncionariosPorEntidadPorcentaje";

import FuncionariosPorEntidadEdad from "./Entidad/FuncionariosPorEntidadEdad";
import FuncionariosPorEntidadEdadPorcentaje from "./Entidad/FuncionariosPorEntidadEdadPorcentaje";

import FuncionariosPorEntidadEducacion from "./Entidad/FuncionariosPorEntidadEducacion";
import FuncionariosPorEntidadEducacionPorcentaje from "./Entidad/FuncionariosPorEntidadEducacionPorcentaje";

import { withStyles } from "@material-ui/core/styles";
import MenuInformacion from "../MenuLaterlal";

import styles from "../style";

let menu = [
  "Funcionarios por entidad",
  "Funcionarios por entidad y edad",
  "Funcionarios por entidad y educación"
];

class State extends Component {
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
                <FuncionariosPorEntidadTotal />
                <FuncionariosPorEntidadPorcentaje />
              </div>
            )}
            {value === 1 && (
              <div>
                <FuncionariosPorEntidadEdad />
                <FuncionariosPorEntidadEdadPorcentaje />
              </div>
            )}
            {value === 2 && (
              <div>
                <FuncionariosPorEntidadEducacion />
                <FuncionariosPorEntidadEducacionPorcentaje />
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(State);
