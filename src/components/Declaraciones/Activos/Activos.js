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

class Activos extends Component {
  render() {
    let { classes, path, value, change } = this.props;
    let {
      bienes_inmuebles,
      bienes_intangibles,
      bienes_muebles_no_registrables,
      bienes_muebles_registrables,
      cuentas_por_cobrar,
      efectivo_metales,
      fideicomisos,
      inversiones_cuentas_valores,
      uso_especie_propiedad_tercero
    } = this.props.profile.activos;

    let menu = [
      { name: "Resumen" },
      { name: "Bienes inmuebles", value: bienes_inmuebles.length },
      {
        name: "Bienes muebles registrables",
        value: bienes_muebles_registrables.length
      },
      {
        name: "Bienes muebles no registrables",
        value: bienes_muebles_no_registrables.length
      },
      { name: "Inversiones", value: inversiones_cuentas_valores.length },
      { name: "Efectivo y metales", value: efectivo_metales.length },
      { name: "Fideicomisos", value: fideicomisos.length },
      { name: "Bienes intangibles", value: bienes_intangibles.length },
      { name: "Cuentas por cobrar", value: cuentas_por_cobrar.length },
      {
        name: "Uso o beneficios en especie propiedad de un tercero",
        value: uso_especie_propiedad_tercero.length
      }
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
            {value === 4 && <ActivosInversiones profile={this.props.profile} />}
            {value === 5 && <ActivosEfectivo profile={this.props.profile} />}
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
