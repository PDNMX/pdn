import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import "../css/chartist.min.css";

import EducacionTotal from "./Educacion/EducacionTotal";
// import EducacionPorcentaje from "./Educacion/EducacionPorcentaje";

// import EducacionEdad from "./Educacion/EducacionEdad";
// import EducacionEdadPorcentaje from "./Educacion/EducacionEdadPorcentaje";

// import EducacionNivelGobierno from "./Educacion/EducacionNivelGobierno";
// import EducacionNivelGobiernoPorcentaje from "./Educacion/EducacionNivelGobiernoPorcentaje";

import { withStyles } from "@material-ui/core/styles";

import styles from "../style";

class Education extends Component {
  render() {
    let { classes } = this.props;

    return (
      <div className={classes.rootSeccion}>
        <Grid container spacing={0}>
          <Grid item xs={12} style={{ padding: 15 }}>
            <EducacionTotal />
            {/* <EducacionPorcentaje /> */}
            {/* <EducacionEdad /> */}
            {/* <EducacionEdadPorcentaje /> */}
            {/* <EducacionNivelGobierno /> */}
            {/* <EducacionNivelGobiernoPorcentaje /> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Education);
