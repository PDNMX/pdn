/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import { Grid } from "@material-ui/core";

// INGRESOS
import IngresosSueldosResume from "./resume";
import IngresosSueldosPublicos from "./sueldos-publicos";
import IngresosSueldosOtros from "./sueldos-otros";
import IngresosActividadProfesional from "./actividad-profesional";
import IngresosActividadEmpresarial from "./actividad-empresarial";
import IngresosActividadEconomica from "./actividad-economica";
import IngresosArrendamiento from "./arrendamiento";
import IngresosIntereses from "./intereses";
import IngresosPremios from "./premios";
import IngresosOtros from "./otros";
import IngresosEnajenacion from "./enajenacion";

import { withStyles } from "@material-ui/core/styles";
import MenuInformacion from "../MenuLaterlal";
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  sidebar: {
    background: "#34b3eb"
  }
});

let menu = [
  "Resumen",
  "Sueldos y Salarios por el Encargo Público",
  "Sueldos y Salarios por otros empleos",
  "Actividad profesional",
  "Actividad empresarial",
  "Actividad económica menor",
  "Arrendamiento",
  "Intereses",
  "Premios",
  "Otros ingresos",
  "Enajenación de bienes"
];

class Ingresos extends Component {
  render() {
    let section = this.props.section;
    let { classes, path, value, change } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={4} md={2} className={classes.sidebar}>
            <MenuInformacion
              menu={menu}
              id={this.props.profile._id}
              path={path}
              value={value}
              change={change}
            />
          </Grid>
          <Grid
            item
            xs={8}
            md={10}
            style={{ backgroundColor: "#f2f2f2", padding: 15 }}
          >
            {value === 0 && (
              <IngresosSueldosResume profile={this.props.profile} />
            )}
            {value === 1 && (
              <IngresosSueldosPublicos profile={this.props.profile} />
            )}
            {value === 2 && (
              <IngresosSueldosOtros profile={this.props.profile} />
            )}
            {value === 3 && (
              <IngresosActividadProfesional profile={this.props.profile} />
            )}
            {value === 4 && (
              <IngresosActividadEmpresarial profile={this.props.profile} />
            )}
            {value === 5 && (
              <IngresosActividadEconomica profile={this.props.profile} />
            )}
            {value === 6 && (
              <IngresosArrendamiento profile={this.props.profile} />
            )}
            {value === 7 && (
              <IngresosIntereses profile={this.props.profile} />
            )}
            {value === 8 && (
              <IngresosPremios profile={this.props.profile} />
            )}
            {value === 9 && <IngresosOtros profile={this.props.profile} />}
            {value === 10 && (
              <IngresosEnajenacion profile={this.props.profile} />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Ingresos);
