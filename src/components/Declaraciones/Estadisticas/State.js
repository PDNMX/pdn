import React, { Component } from "react";

import { Grid } from "@material-ui/core";
import FuncionariosPorEntidadTotal from "./Entidad/FuncionariosPorEntidadTotal";
// import FuncionariosPorEntidadPorcentaje from "./Entidad/FuncionariosPorEntidadPorcentaje";
// import FuncionariosPorEntidadEdad from "./Entidad/FuncionariosPorEntidadEdad";
// import FuncionariosPorEntidadEdadPorcentaje from "./Entidad/FuncionariosPorEntidadEdadPorcentaje";
// import FuncionariosPorEntidadEducacion from "./Entidad/FuncionariosPorEntidadEducacion";
// import FuncionariosPorEntidadEducacionPorcentaje from "./Entidad/FuncionariosPorEntidadEducacionPorcentaje";

import { withStyles } from "@material-ui/core/styles";
import styles from "../style";

class State extends Component {
  render() {
    let { classes } = this.props;

    return (
      <div className={classes.rootSeccion}>
        <Grid container spacing={0}>
          <Grid item xs={12} style={{ padding: 15 }}>
            <FuncionariosPorEntidadTotal />
            {/* <FuncionariosPorEntidadPorcentaje /> */}
            {/* <FuncionariosPorEntidadEdad /> */}
            {/* <FuncionariosPorEntidadEdadPorcentaje /> */}
            {/* <FuncionariosPorEntidadEducacion /> */}
            {/* <FuncionariosPorEntidadEducacionPorcentaje /> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(State);
