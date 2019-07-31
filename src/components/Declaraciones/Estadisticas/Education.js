import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import "../css/chartist.min.css";

import EducacionTotal from "../single-components/stats/education/EducacionTotal";
import EducacionPorcentaje from "../single-components/stats/education/EducacionPorcentaje";

import EducacionEdad from "../single-components/stats/education/EducacionEdad";
import EducacionEdadPorcentaje from "../single-components/stats/education/EducacionEdadPorcentaje";

import EducacionNivelGobierno from "../single-components/stats/education/EducacionNivelGobierno";
import EducacionNivelGobiernoPorcentaje from "../single-components/stats/education/EducacionNivelGobiernoPorcentaje";

import { withStyles } from "@material-ui/core/styles";
import MenuInformacion from "../MenuLaterlal";

import styles from "../style";

let menu = [
  "Funcionarios por nivel educativo",
  "Funcionarios por nivel educativo y edad",
  "Funcionarios por nivel educativo y nivel de gobierno"
];

class Education extends Component {
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
                <EducacionTotal />
                <EducacionPorcentaje />
              </div>
            )}
            {value === 1 && (
              <div>
                <EducacionEdad />
                <EducacionEdadPorcentaje />
              </div>
            )}
            {value === 2 && (
              <div>
                <EducacionNivelGobierno />
                <EducacionNivelGobiernoPorcentaje />
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Education);
