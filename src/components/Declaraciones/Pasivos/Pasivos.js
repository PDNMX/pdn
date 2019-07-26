/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import { Grid } from "@material-ui/core";

// PASIVOS
import PasivosResume from "./resume-pasivos";
import PasivosDeudas from "./deudas";
import PasivosObligaciones from "./otras-obligaciones";

import { withStyles } from "@material-ui/core/styles";
import MenuInformacion from "../MenuLaterlal";

import styles from "../style";

let menu = ["Resumen", "Deudas", "Otras obligaciones"];

/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class Pasivos extends Component {
  /*
   * R E N D E R
   * ----------------------------------------------------------------------
   */
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
            {value === 0 && <PasivosResume profile={this.props.profile} />}
            {value === 1 && <PasivosDeudas profile={this.props.profile} />}
            {value === 2 && (
              <PasivosObligaciones profile={this.props.profile} />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default withStyles(styles)(Pasivos);
