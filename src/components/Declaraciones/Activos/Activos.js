/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import { Grid } from "@material-ui/core";

// ACTIVOS
import ActivosResume from "./resume-activos";
import ActivosBienesInmuebles from "./bienes-inmuebles";
import ActivosBienesMuebles from "./bienes-muebles";
import ActivosBienesMueblesNoRegistrables from "./bienes-muebles-no-registrables";
import ActivosInversiones from "./inversiones";
import ActivosEfectivo from "./efectivo-y-metales";
import ActivosFideicomisos from "./fideicomisos";
import ActivosBienesIntangibles from "./bienes-intangibles";
import ActivosCuentasPorCobrar from "./cuentas-por-cobrar";
import ActivosBeneficiosEnEspecie from "./beneficios-en-especie";

import { withStyles } from "@material-ui/core/styles";
import MenuInformacion from "../MenuLaterlal";

import styles from "../style";

let menu = [
  "Resumen",
  "Bienes inmuebles",
  "Bienes muebles registrables",
  "Bienes muebles no registrables",
  "Inversiones",
  "Efectivo y metales",
  "Fideicomisos",
  "Bienes intangibles",
  "Cuentas por cobrar",
  "Uso o Beneficios en Especie Propiedad de un Tercero"
];

class Activos extends Component {
  render() {
    let { classes, path, value, change } = this.props;

    return (
      <div className={classes.rootSeccion}>
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
            {value === 0 && <ActivosResume profile={this.props.profile} />}
            {value === 1 && (
              <ActivosBienesInmuebles profile={this.props.profile} />
            )}
            {value === 2 && (
              <ActivosBienesMuebles profile={this.props.profile} />
            )}
            {value === 3 && (
              <ActivosBienesMueblesNoRegistrables
                profile={this.props.profile}
              />
            )}
            {value === 4 && (
              <ActivosInversiones profile={this.props.profile} />
            )}
            {value === 5 && (
              <ActivosEfectivo profile={this.props.profile} />
            )}
            {value === 6 && (
              <ActivosFideicomisos profile={this.props.profile} />
            )}
            {value === 7 && (
              <ActivosBienesIntangibles profile={this.props.profile} />
            )}
            {value === 8 && (
              <ActivosCuentasPorCobrar profile={this.props.profile} />
            )}
            {value === 9 && (
              <ActivosBeneficiosEnEspecie profile={this.props.profile} />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Activos);
