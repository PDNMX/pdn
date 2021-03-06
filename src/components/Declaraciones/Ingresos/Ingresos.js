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

import styles from "../style";

class Ingresos extends Component {
  render() {
    let { classes, path, value, change } = this.props;
    let {
      actividad_economica_menor,
      actividad_empresarial,
      actividad_profesional,
      arrendamiento,
      enajenacion_bienes,
      intereses,
      otros_ingresos,
      premios,
      sueldos_salarios_otros_empleos,
      sueldos_salarios_publicos
    } = this.props.profile.ingresos;

    let menu = [
      { name: "Resumen" },
      {
        name: "Sueldos y Salarios por el Encargo Público",
        value: sueldos_salarios_publicos.length
      },
      {
        name: "Sueldos y Salarios por otros empleos",
        value: sueldos_salarios_otros_empleos.length
      },
      {
        name: "Actividad profesional",
        value: actividad_profesional.length
      },
      {
        name: "Actividad empresarial",
        value: actividad_empresarial.length
      },
      {
        name: "Actividad económica menor",
        value: actividad_economica_menor.length
      },
      { name: "Arrendamiento", value: arrendamiento.length },
      { name: "Intereses", value: intereses.length },
      { name: "Premios", value: premios.length },
      { name: "Otros ingresos", value: otros_ingresos.length },
      { name: "Enajenación de bienes", value: enajenacion_bienes.length }
    ];

    return (
      <div className={classes.rootSeccion}>
        <Grid container spacing={0}>
          <Grid item xs={4} md={3} className={classes.sidebar}>
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
            md={9}
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
            {value === 7 && <IngresosIntereses profile={this.props.profile} />}
            {value === 8 && <IngresosPremios profile={this.props.profile} />}
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
